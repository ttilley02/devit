BEGIN;

TRUNCATE
    developit_users,
    developit_profiles,
    developit_offers,
    developit_messages,
    developit_skills,
    developit_user_skills,
    developit_user_reviews
    RESTART IDENTITY CASCADE;

INSERT INTO developit_users (nickname, password, profile)
VALUES
    ('Demo', 'password', true ),
    ('Testname1', 'Testpass@1', false),
    ('Testname2', 'Testpass@2', true),
    ('Testname3', 'Testpass@3', false),
    ('Testname4', 'Testpass@4', true),
    ('Testname5', 'Testpass@5', false);

INSERT INTO developit_profiles (blurb, projects, user_id) 
VALUES
    ('I AM THE DEMO ACCOUNT IM A CODER', 'I AM LOOKING TO ACCEPT CODER JOBS', 1),
    ('test 1 employer', 'im looking to hire developers', 2),
    ('test 2 dev', 'im looking for work', 3),
    ('test 3 employer', 'im looking to hire', 4),
    ('test 4 dev', 'im looking for work', 5),
    ('test 5 employer', 'im looking to hire devs', 6);

INSERT INTO developit_offers (employer_id, dev_id, payrate, offer_info, offer_detail)
VALUES
    (2, 1, 60, 'Database Administrator Position', 'Im looking to hire a SQL dev.'),
    (4, 3, 55, 'Mission Critical Java Work', 'Im looking to hire a Java dev.'),
    (6, 5, 50, 'Entry Level C++ Dev', 'Im looking to hire a C++ dev.'),
    (4, 1, 45, 'E-Commerce System Node/React', 'Im looking to hire a Node dev.');

INSERT INTO developit_messages (sender_id, receiver_id, message)    
VALUES 
    (2, 1, 'I have an SQL job for you.'),
    (3, 4, 'Hi i am a Java Dev can you tell me more about the job.'),
    (5, 6, 'Hi i am a C++ Dev, can i work remote?'),
    (1, 4, 'I would like the Node position.');

INSERT INTO developit_skills (skill_name)
VALUES
    ('Node.js'),
    ('React'),
    ('Postgres'),
    ('Python'),
    ('HTML'),
    ('OAuth'),
    ('Shopify'),
    ('Java'),
    ('Drupal'),
    ('C++'),
    ('SQL');

INSERT INTO developit_user_skills (user_id, skill_name, skill_level)  
VALUES
    (1, 'React', 'entry'),
    (2, 'Node.js', 'entry'),
    (3, 'Java', 'expert'),
    (3, 'Drupal', 'mid'),
    (3, 'C++', 'mid'),
    (5, 'C++', 'entry'),
    (5, 'Postgres', 'expert'),
    (5, 'Python', 'entry'),
    (5, 'HTML', 'expert');     

INSERT INTO developit_user_reviews (sender_id, receiver_id, review, rating)
VALUES
    (2, 1, 'Great Coder, please hire', 5),
    (4, 5, 'Good at some stuff, please hire', 3),
    (6, 3, 'Bad experience, would not contract again', 1);

COMMIT;    
    