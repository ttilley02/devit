CREATE TABLE developit_messages
(
    id SERIAL PRIMARY KEY,
    date_created TIMESTAMPTZ NOT NULL DEFAULT now(),
    sender_id INTEGER
        REFERENCES developit_users(id) ON DELETE CASCADE NOT NULL,
    receiver_id INTEGER
        REFERENCES developit_users(id) ON DELETE CASCADE NOT NULL,
    message TEXT NOT NULL,
    image TEXT NOT NULL
);            