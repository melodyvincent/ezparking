SELECT * FROM listings
JOIN features ON features.listing_id = listings.id
JOIN pictures ON pictures.listing_id = listings.id
JOIN availabilities ON availabilities.listing_id = listings.id
JOIN payments ON payments.listing_id = listings.id
WHERE listings.id = $1