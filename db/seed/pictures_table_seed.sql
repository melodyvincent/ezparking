CREATE TABLE pictures (
    id SERIAL PRIMARY KEY,
    pic_one TEXT,
    pic_two TEXT,
    pic_three TEXT,
    pic_four TEXT,
    listing_id INTEGER REFERENCES listings (id) ON DELETE CASCADE
)