CREATE TABLE developit_profiles
(
    id SERIAL PRIMARY KEY,
    blurb TEXT,
    projects TEXT,
    image TEXT,
    user_id INTEGER
        REFERENCES developit_users(id) ON DELETE CASCADE
);