SELECT address, space_size, num_spaces, covered, lit, charging, camera, fenced, guarded FROM listings
JOIN features ON features.listing_id = listings.id
WHERE listings.id = $1 