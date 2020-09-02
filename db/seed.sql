CREATE TABLE branch(
    id SERIAL PRIMARY KEY,
    name VARCHAR(40)
);

CREATE TABLE patron(
    card_num SERIAL PRIMARY KEY,
    pin TEXT,
    first_name VARCHAR(40),
    last_name VARCHAR(40),
    email VARCHAR(40) UNIQUE,
    password TEXT,
    resident BOOLEAN,
    phone_num VARCHAR(13),
    img TEXT,
    branch_id INT REFERENCES branch(id),
    branch_display BOOLEAN
);

CREATE TABLE holds(
    id SERIAL PRIMARY KEY,
    user_id INT REFERENCES patron(card_num) NOT NULL,
    book_id INT NOT NULL,
    title TEXT,
    author_fl VARCHAR(45),
    cover TEXT,
    isbn TEXT
);