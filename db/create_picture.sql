INSERT INTO pictures (pic_one, pic_two, pic_three, pic_four, listing_id)
VALUES ($1, $2, $3, $4, $5)
RETURNING *;