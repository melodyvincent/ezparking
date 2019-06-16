UPDATE features
SET covered = $1,
    lit = $2,
    charging = $3,
    camera = $4,
    fenced = $5,
    guarded = $6
WHERE listing_id = $7