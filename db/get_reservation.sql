SELECT * FROM reservations
JOIN listings ON listings.id = reservations.listing_id
WHERE reservations.user_id = $1