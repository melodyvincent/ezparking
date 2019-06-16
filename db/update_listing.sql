UPDATE listings
SET address = $1,
    lat=$2,
    lng = $3,
    building_type = $4,
    space_type = $5,
    num_spaces = $6,
    space_size = $7,
    about = $8,
    instructions = $9,
    price = $10
WHERE id = $11;

