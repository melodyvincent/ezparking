CREATE TABLE payments (
    id SERIAL PRIMARY KEY,
    cash BOOLEAN,
    credit BOOLEAN,
    venmo BOOLEAN,
    pay_pal BOOLEAN,
    apple_pay BOOLEAN,
    listing_id INTEGER REFERENCES listings (id) ON DELETE CASCADE
)