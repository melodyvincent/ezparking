INSERT INTO availabilities (monday, tuesday, wednesday, thursday, friday, saturday, sunday, listing_id)
VALUES ($1, $2, $3, $4, $5, $6, $7, $8)
RETURNING *;