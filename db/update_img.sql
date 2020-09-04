UPDATE patron
SET img = $2
WHERE card_num = $1;