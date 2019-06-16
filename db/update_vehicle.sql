UPDATE vehicles
SET car_pic = $1,
    year = $2,
    make = $3,
    model = $4,
    color = $5,
    size = $6,
    plate = $7
WHERE id = $8;
