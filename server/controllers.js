// Added for nodemailer
const nodemailer = require('nodemailer');


module.exports = {
    //GET CONTROLLERS
    getAllListings: (req, res) => {
        const db = req.app.get('db');

        db.get_all_listings()
            .then(listings => res.status(200).send(listings))
            .catch((err) => res.status(500).send(console.log(err)))
    },
    getUserListings: (req, res) => {
        const db = req.app.get('db');
        const { id } = req.params

        db.get_user_listings([id])
            .then(listings => res.status(200).send(listings))
            .catch((err) => res.status(500).send(console.log(err)))
    },
    getListingById: (req, res) => {
        const db = req.app.get('db')
        const { id } = req.params

        db.get_listing_by_id([id])
            .then(listing => res.status(200).send(listing))
            .catch((err) => res.status(500).send(console.log(err)))
    },
    getListingPreview: (req, res) => {
        const db = req.app.get('db');
        const { id } = req.params

        db.get_listing_preview([id])
            .then(preview => res.status(200).send(preview))
            .catch(() => res.status(500).send())
    },
    getFeatures: (req, res) => {
        const db = req.app.get('db')
        const { id } = req.params

        db.get_features([id])
            .then(features => res.status(200).send(features))
            .catch(() => res.status(500).send())
    },
    getReservations: (req, res) => {
        const db = req.app.get('db');
        const { id } = req.params

        db.get_reservation([id])
            .then(reservations => res.status(200).send(reservations))
            .catch(() => res.status(500).send())
    },
    getVehicles: (req, res) => {
        const db = req.app.get('db');
        const { id } = req.params

        db.get_vehicles([id])
            .then(vehicles => res.status(200).send(vehicles))
            .catch((err) => res.status(500).send(console.log(err)))
    },
    getHost: (req, res) => {
        const db = req.app.get('db')
        const { id } = req.params

        db.get_host([id])
            .then(user => res.status(200).send(user))
            .catch(() => res.status(500).send())
    },


    //CREATE CONTROLLERS
    createListing: (req, res) => {
        const db = req.app.get('db');
        const {
            address,
            building_type,
            space_type,
            num_spaces,
            space_size,
            about,
            instructions,
            price,
            host_id,
            lat,
            lng
        } = req.body
        // console.log(req.body)

        db.create_listing([
            address,
            building_type,
            space_type,
            num_spaces,
            space_size,
            about,
            instructions,
            price,
            host_id,
            lat,
            lng
        ])
            .then(listing => res.status(200).send(listing))
            .catch((err) => res.status(500).send(console.log(err)))
    },

    createFeatures: (req, res) => {
        const db = req.app.get('db');
        const {
            covered,
            lit,
            charging,
            camera,
            fenced,
            guarded,
            listing_id
        } = req.body
        // console.log(req.body)

        db.create_features([
            covered,
            lit,
            charging,
            camera,
            fenced,
            guarded,
            listing_id])
            .then(() => res.status(200).send())
            .catch(() => res.status(500).send())
    },

    createPictures: (req, res) => {
        const db = req.app.get('db');
        const { pic_one, pic_two, pic_three, pic_four, listing_id } = req.body
        // console.log(req.body)

        db.create_picture([pic_one, pic_two, pic_three, pic_four, listing_id])
            .then(pictures => res.status(200).send(pictures))
            .catch(() => res.status(500).send())
    },

    createReservation: (req, res) => {
        const db = req.app.get('db');
        const { user_id, vehicle_id, start_time, end_time, payment_type, total, listing_id } = req.body

        db.create_reservation([user_id, vehicle_id, start_time, end_time, payment_type, total, listing_id])
            .then(reservation => res.status(200).send(reservation))
            .catch(() => res.status(500).send())
    },

    createAvailability: (req, res) => {
        const db = req.app.get('db');
        const { monday, tuesday, wednesday, thursday, friday, saturday, sunday, listing_id } = req.body
        // console.log(req.body)

        db.create_availability([monday, tuesday, wednesday, thursday, friday, saturday, sunday, listing_id])
            .then(() => res.status(200).send())
            .catch(() => res.status(500).send())
    },

    createVehicle: (req, res) => {
        const db = req.app.get('db');
        const { user_id, car_pic, year, make, model, color, size, plate } = req.body

        db.create_vehicle([user_id, car_pic, year, make, model, color, size, plate])
            .then(vehicle => res.status(200).send(vehicle))
            .catch(() => res.status(500).send())
    },

    createPayment: (req, res) => {
        const db = req.app.get('db');
        const { cash, credit, venmo, pay_pal, apple_pay, listing_id } = req.body;


        db.create_payments([cash, credit, venmo, pay_pal, apple_pay, listing_id])
            .then(() => res.status(200).send())
            .catch(() => res.status(500).send())
    },
    // Added for nodemailer
    createMail: (req, res) => {
        console.log('creatMail ', req.body)

        const transporter = nodemailer.createTransport({
            service: 'gmail',
            auth: {
                user: process.env.EMAIL,
                pass: process.env.PASSWORD
            }
        });
        var mailOptions = {
            from: process.env.EMAIL,
            from: req.body.emailFrom,
            to: req.body.emailTo,
            subject: req.body.subject,
            html: `${req.body.message} <br /> <br /> - from ${req.body.name} <br /> ${req.body.emailFrom}`
        };
        transporter.sendMail(mailOptions, function (error, info) {
            if (error) {
                console.log(error);
            } else {
                console.log('Email sent: ' + info.response);
            }
        })
        res.status(200).send()
    },


    //UPDATE CONTROLLERS
    updateFeatures: (req, res) => {
        const db = req.app.get('db');
        const { id } = req.params
        const {
            covered,
            lit,
            charging,
            camera,
            fenced,
            guarded
        } = req.body

        db.update_features([
            covered,
            lit,
            charging,
            camera,
            fenced,
            guarded,
            id
        ])
            .then(() => res.status(200).send())
            .catch((err) => {
                console.log(err);
                res.status(500).send();
            })
    },
    updateListing: (req, res) => {
        const db = req.app.get('db');
        const { id } = req.params
        const {
            address,
            lat,
            lng,
            building_type,
            space_type,
            num_spaces,
            space_size,
            about,
            instructions,
            price
        } = req.body

        db.update_listing([
            address,
            lat,
            lng,
            building_type,
            space_type,
            num_spaces,
            space_size,
            about,
            instructions,
            price,
            id
        ])
            .then(() => res.status(200).send())
            .catch(() => res.status(500).send())
    },
    updatePictures: (req, res) => {
        const db = req.app.get('db');
        const { id } = req.params
        const { pic_one, pic_two, pic_three, pic_four } = req.body

        db.update_picture([pic_one, pic_two, pic_three, pic_four, id])
            .then(() => res.status(200).send())
            .catch(() => res.status(500).send())
    },
    updateAvailability: (req, res) => {
        const db = req.app.get('db');
        const { id } = req.params
        const { monday, tuesday, wednesday, thursday, friday, saturday, sunday } = req.body

        db.update_availability([monday, tuesday, wednesday, thursday, friday, saturday, sunday, id])
            .then(() => res.status(200).send())
            .catch((err) => {
                console.log(err);
                res.status(500).send();
            })
    },
    updateVehicle: (req, res) => {
        const db = req.app.get('db');
        const { id } = req.params
        const { car_pic, year, make, model, color, size, plate } = req.body

        db.update_vehicle([car_pic, year, make, model, color, size, plate, id])
            .then((vehicles) => res.status(200).send(vehicles))
            .catch(() => res.status(500).send())
    },

    updatePayment: (req, res) => {
        const db = req.app.get('db');
        const { id } = req.params
        const { cash, credit, venmo, pay_pal, apple_pay } = req.body
        db.update_payments([cash, credit, venmo, pay_pal, apple_pay, id])

            .then((payments) => res.status(200).send(payments))
            .catch(() => res.status(500).send())
    },
    //DELETE CONTROLLERS
    deleteListing: (req, res) => {
        const db = req.app.get('db');
        const { id } = req.params

        db.delete_listing([id])
            .then(() => res.status(200).send())
            .catch(() => res.status(500).send())
    },
    deleteVehicle: (req, res) => {
        const db = req.app.get('db');
        const { id } = req.params

        db.delete_vehicle([id])
            .then(() => res.status(200).send())
            .catch(() => res.status(500).send())
    },
    deleteReservation: (req, res) => {
        const db = req.app.get('db');
        const { id } = req.params

        db.delete_reservation([id])
            .then(() => res.status(200).send())
            .catch(() => res.status(500).send())
    },
}