CREATE TABLE developit_offers
(
    id SERIAL PRIMARY KEY,
    employer_id INTEGER
        REFERENCES developit_users(id) ON DELETE CASCADE
        NOT NULL,
    dev_id INTEGER
        REFERENCES developit_users
    (id) ON
    DELETE CASCADE,
    payrate INTEGER,
    offer_info TEXT
        NOT NULL,
    offer_detail TEXT NOT NULL,
    response BOOLEAN DEFAULT false,
    image text,
    emp_name text,
    date_created TIMESTAMPTZ NOT NULL DEFAULT now
    ()
);