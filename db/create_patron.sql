INSERT INTO patron (first_name, last_name, email, password, pin, resident)
VALUES ($1, $2, $3, $4, $5, $6)
RETURNING *;