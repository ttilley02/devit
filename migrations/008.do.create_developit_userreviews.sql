CREATE TABLE developit_user_reviews
(
    id SERIAL PRIMARY KEY,
    date_created TIMESTAMPTZ NOT NULL DEFAULT now(),
    sender_id INTEGER
        REFERENCES developit_users(id) ON DELETE CASCADE NOT NULL,
    receiver_id INTEGER
        REFERENCES developit_users(id) ON DELETE CASCADE NOT NULL,
    review TEXT NOT NULL,
    rating INTEGER NOT NULL
);