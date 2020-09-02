DELETE FROM holds
WHERE id = $1;

SELECT * FROM holds
WHERE user_id = $2;