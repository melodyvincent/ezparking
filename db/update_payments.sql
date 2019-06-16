UPDATE payments
SET cash = $1,
    credit = $2,
    venmo = $3,
    pay_pal = $4,
    apple_pay = $5
WHERE listing_id = $6