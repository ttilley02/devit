CREATE TABLE developit_user_skills (
    user_id INTEGER
        REFERENCES developit_users(id) ON DELETE CASCADE,
    skill_name text ARRAY NOT NULL,
    PRIMARY KEY(user_id, skill_name)     
);