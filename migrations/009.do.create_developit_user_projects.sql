CREATE TABLE developit_user_projects
(
        id SERIAL PRIMARY KEY,
        dev_id INTEGER
                REFERENCES developit_users(id) ON DELETE CASCADE NOT NULL,
        details TEXT
);

