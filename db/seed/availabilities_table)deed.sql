CREATE TABLE availabilities (
    id SERIAL PRIMARY KEY,
    monday BOOLEAN,
    tuesday BOOLEAN,
    wednesday BOOLEAN,
    thursday BOOLEAN,
    friday BOOLEAN,
    saturday BOOLEAN,
    sunday BOOLEAN,
    listing_id INTEGER REFERENCES listings (id) ON DELETE CASCADE
)