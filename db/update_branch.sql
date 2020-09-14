UPDATE patron 
SET branch_id = $2
WHERE card_num = $1;