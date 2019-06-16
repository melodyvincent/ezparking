INSERT INTO vehicles (user_id, car_pic, year, make, model, color, size, plate)
VALUES ($1, $2, $3, $4, $5, $6, $7, $8)
RETURNING *;