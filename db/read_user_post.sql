SELECT * FROM Posts
WHERE id = $1 AND user_id = $2
LIMIT 1;