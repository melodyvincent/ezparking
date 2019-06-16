INSERT INTO reservations (user_id, vehicle_id, start_time, end_time, payment_type, total, listing_id)
VALUES ($1, $2, $3, $4, $5, $6, $7)
RETURNING *;