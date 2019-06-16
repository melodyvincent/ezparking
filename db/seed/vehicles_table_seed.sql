CREATE TABLE vehicles (
    id SERIAL PRIMARY KEY,
    user_id INTEGER,
    car_pic TEXT,
    year INTEGER,
    make VARCHAR(40),
    model VARCHAR(40),
    color VARCHAR(40),
    size VARCHAR(40),
    plate VARCHAR(40)
)