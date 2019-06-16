CREATE TABLE listings (
    id SERIAL PRIMARY KEY,
    address VARCHAR(80),
    building_type VARCHAR(40),
    space_type VARCHAR(40),
    num_spaces INTEGER,
    space_size VARCHAR(40),
    about TEXT,
    instructions TEXT,
    price INTEGER,
    host_id INTEGER
)