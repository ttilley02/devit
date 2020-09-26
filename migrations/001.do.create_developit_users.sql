CREATE TABLE developit_users
(
    id SERIAL PRIMARY KEY,
    nickname TEXT NOT NULL UNIQUE,
    password TEXT NOT NULL,
    profile BOOLEAN,
    date_created TIMESTAMPTZ NOT NULL DEFAULT now(),
    date_modified TIMESTAMPTZ

);