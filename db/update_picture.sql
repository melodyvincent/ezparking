UPDATE pictures
SET pic_one = $1,
    pic_two = $2,
    pic_three = $3,
    pic_four = $4
WHERE listing_id = $5