CREATE TABLE features (
    id SERIAL PRIMARY KEY,
    covered BOOLEAN,
    lit BOOLEAN,
    charging BOOLEAN,
    camera BOOLEAN,
    fenced BOOLEAN,
    guarded BOOLEAN,
    listing_id INTEGER REFERENCES listings (id) ON DELETE CASCADE
)