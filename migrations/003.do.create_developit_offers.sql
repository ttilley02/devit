CREATE TABLE developit_offers (
    id SERIAL PRIMARY KEY,
    employer_id INTEGER
        REFERENCES developit_users(id) ON DELETE CASCADE NOT NULL,
    dev_id INTEGER
        REFERENCES developit_users(id) ON DELETE CASCADE,
    offer_detail TEXT NOT NULL,
    response TEXT,
    date_created TIMESTAMPTZ NOT NULL DEFAULT now()         
);