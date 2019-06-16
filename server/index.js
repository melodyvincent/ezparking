const express = require("express");
const bodyParser = require("body-parser");
const ctrl = require("./controllers");
const massive = require("massive");
const session = require("express-session");
const passport = require("passport");
const Auth0Strategy = require("passport-auth0");
require("dotenv").config();
// dotenv must be above stripe because stripe requires it in the line below
const stripe = require("stripe")(process.env.STRIPE_SECRET_KEY);

const {
  SESSION_SECRET,
  DOMAIN,
  CLIENT_ID,
  CLIENT_SECRET,
  CALLBACK_URL,
  CONNECTION_STRING
} = process.env;

massive(CONNECTION_STRING).then(db => {
  // app.set stores info by putting it on a key:value pair
  app.set("db", db);
});

const app = express();
app.use(express.static(`${__dirname}/../build`));
app.use(bodyParser.json());
app.use(
  session({
    secret: SESSION_SECRET,
    resave: false,
    saveUninitialized: true
  })
);

app.use(passport.initialize());
// stores user info in the session store/memory
// use req.session to access the person's session we are interacting with
app.use(passport.session());

passport.use(
  new Auth0Strategy(
    {
      domain: DOMAIN,
      clientID: CLIENT_ID,
      clientSecret: CLIENT_SECRET,
      callbackURL: CALLBACK_URL,
      scope: "openid email profile"
      // when the user authenticates, this is what we will get back
    },
    (accessToken, refreshToken, extraParams, profile, done) => {
      // this is where auth0 sends info back from google
      const db = app.get("db");
      // here, we are asking passport to retrieve the value of db, which is set above
      let { displayName, picture, id, emails } = profile;

      // the id used here is the auth_id from the database
      db.find_user([id]).then(user => {
        // console.log("this is the user:", user)
        // here, we query our sql database to see if there is a user with the passed in id
        // the info we are getting back is an object that is nested in an array
        if (user[0]) {
          done(null, user[0].id);
        } else {
          db.create_user([displayName, id, picture, emails[0].value]).then(
            createdUser => {
              done(null, createdUser[0].id);
            }
          );
        }
      });
    }
  )
);

passport.serializeUser((primaryKeyId, done) => {
  // the profile from above is an object that is added to the session store here
  done(null, primaryKeyId);
});

passport.deserializeUser((primaryKeyId, done) => {
  // deserializeUser runs as middleware
  // goes into the session store, grabs any value tied to the session(profile) and injects info into the callback
  app
    .get("db")
    .find_session_user([primaryKeyId])
    .then(user => {
      // whatever we pass out of deserializeUser get added to req.user
      done(null, user[0]);
    });
});

app.get("/auth", passport.authenticate("auth0"));
app.get(
  "/auth/callback",
  passport.authenticate("auth0", {
    // this redirects the user back to the front end where they started the login process
    successRedirect: `${process.env.FRONTEND_URL}#/search`
    // user the hash symbol above because we are using Hashrouter
  })
);

app.get("/auth/user", (req, res) => {
  if (req.user) {
    res.status(200).send(req.user);
    // console.log("this is req.user:", req.user)
  } else {
    res.status(401).send("Unauthorized user");
  }
});

app.get("/auth/logout", (req, res) => {
  req.logOut();
  // this is a built in method in passport that kills the session and resets the user property
  res.redirect(process.env.FRONTEND_URL);
});

// User
app.get("/api/host/:id", ctrl.getHost);

//Listing
app.get("/api/listing", ctrl.getAllListings);
app.get("/api/listing/:id", ctrl.getListingById);
app.get("/api/userlisting/:id", ctrl.getUserListings);
app.get("/api/preview/:id", ctrl.getListingPreview);
app.post("/api/listing", ctrl.createListing);
app.put("/api/listing/:id", ctrl.updateListing);
app.delete("/api/listing/:id", ctrl.deleteListing);

//Features
app.get("/api/feature/:id", ctrl.getFeatures);
app.post("/api/feature", ctrl.createFeatures);
app.put("/api/feature/:id", ctrl.updateFeatures);

//Pictures
app.post("/api/picture", ctrl.createPictures);
app.put("/api/picture/:id", ctrl.updatePictures);

//Vehicles
app.get("/api/vehicle/:id", ctrl.getVehicles);
app.post("/api/vehicle", ctrl.createVehicle);
app.put("/api/vehicle/:id", ctrl.updateVehicle);
app.delete("/api/vehicle/:id", ctrl.deleteVehicle);

//Reservations
app.get("/api/reservation/:id", ctrl.getReservations);
app.post("/api/reservation", ctrl.createReservation);
app.delete("/api/reservation/:id", ctrl.deleteReservation);

// Availability
app.post("/api/availability", ctrl.createAvailability);
app.put("/api/availability/:id", ctrl.updateAvailability);

// Payment
app.post("/api/payment", ctrl.createPayment);
app.put("/api/payment/:id", ctrl.updatePayment);

// Nodemailer Send
app.post("/api/sendmail", ctrl.createMail);

const port = 4000;
app.listen(port, () => {
  console.log(`Server listening on port ${port}`);
});
