BEGIN;

    TRUNCATE
    developit_users,
    developit_profiles,
    developit_offers,
    developit_messages,
    developit_levels,
    developit_skills,
    developit_user_skills,
    developit_user_reviews
    RESTART IDENTITY CASCADE;

    INSERT INTO developit_users
        (nickname, password, profile)
    VALUES
        ('Demo', '$2a$12$JzJ9BY1KtVLCgZNCrEBUpOCuEkukq.fdQ1CqFTn0p0ftOVOYToQI2', true ),
        ('Testname1', '$2a$12$Rnk30PlaoMJC2X3XdU0vDuqmS7qghoCaVzjAv91EaEri1FEnl1STi', false),
        ('Testname2', '$2a$12$dsEVWnhGBVRt8V1cwTxXMOC9Q/0IU7B1m1orWGKoon7OeCYrAt5SK', true),
        ('Testname3', '$2a$12$CYn.l7TSgHiYBugpfDLZTuq.24ngR2m46UyTZltZUbwnk2o2J5vuS', false),
        ('Testname4', '$2a$12$L8VxUlB7AMrBTc.5IA8gT.FrDJx2d2H9EgFnO4cyl2878evL.iq8u', true),
        ('Testname5', '$2a$12$R4jTdJbeRZPENyoB/h3IDO3CEptCxggct3y2sHYhRpKe4/udpbnR6', false);


    INSERT INTO developit_profiles
        (blurb, projects, image, user_id )
    VALUES
        ('test 1 employer', 'https://i.imgur.com/2GRjjkh.jpg', 1),
        ('test 2 employer', 'im looking to hire developers', 'tests.jpeg4', 2),
        ('test 3 dev', 'im looking for work', 'https://i.imgur.com/g2bIsjB.jpeg', 3),
        ('test 4 employer', 'im looking to hire', 'https://i.imgur.com/1iP19yP.jpg', 4),
        ('test 5 dev', 'im looking for work', 'tests.jpeg6', 5),
        ('test 6 employer', 'im looking to hire devs', 'https://i.imgur.com/lKZb6wy.jpg', 6);

    INSERT INTO developit_offers
        (employer_id, dev_id, payrate, offer_info, offer_detail)
    VALUES
        (2, 1, 60, 'Database Administrator Position', 'Im looking to hire a SQL dev.'),
        (4, 3, 55, 'Mission Critical Java Work', 'Im looking to hire a Java dev.'),
        (6, 5, 50, 'Entry Level C++ Dev', 'Im looking to hire a C++ dev.'),
        (4, 1, 45, 'E-Commerce System Node/React', 'Im looking to hire a Node dev.');

    INSERT INTO developit_messages
        (sender_id, receiver_id, message , image)
    VALUES
        (2, 1, 'I have an SQL job for you.', 'https://i.imgur.com/lKZb6wy.jpg'),
        (3, 4, 'Hi i am a Java Dev can you tell me more about the job.', 'https://i.imgur.com/2GRjjkh.jpg'),
        (5, 6, 'Hi i am a C++ Dev, can i work remote?', 'https://i.imgur.com/g2bIsjB.jpeg'),
        (1, 4, 'I would like the Node position.', 'https://i.imgur.com/1iP19yP.jpg'),
        (6, 1, 'I have an SQL job for you.', 'https://i.imgur.com/lKZb6wy.jpg'),
        (3, 4, 'Hi i am a Java Dev can you tell me more about the job.', 'https://i.imgur.com/2GRjjkh.jpg'),
        (4, 6, 'Hi i am a C++ Dev, can i work remote?', 'https://i.imgur.com/g2bIsjB.jpeg'),
        (1, 4, 'I would like the Node position.', 'https://i.imgur.com/1iP19yP.jpg');

    INSERT INTO developit_skills
        (skill_name)
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

    INSERT INTO developit_levels
        (skill_level)
    VALUES
        ('entry'),
        ('mid'),
        ('expert');



    INSERT INTO developit_user_skills
        (user_id, skill_name, skill_level)
    VALUES
        (1, 'React', 'entry'),
        (2, 'Node.js', 'entry'),
        (3, 'Java', 'expert'),
        (3, 'Drupal', 'mid'),
        (3, 'C++', 'mid'),
        (5, 'C++', 'entry'),
        (5, 'Postgres', 'expert'),
        (5, 'Python', 'entry'),
        (4, 'C++', 'entry'),
        (4, 'OAuth', 'entry'),
        (6, 'SQL', 'expert'),
        (6, 'Drupal', 'entry'),
        (5, 'HTML', 'expert');


    INSERT INTO developit_user_reviews
        (sender_id, receiver_id, review, rating)
    VALUES
        (2, 1, 'Great Coder, please hire', 5),
        (4, 5, 'Good at some stuff, please hire', 3),
        (6, 3, 'Bad experience, would not contract again', 1);

    COMMIT;    
    