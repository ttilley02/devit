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
        ('DemoFreelancer', '$2a$12$JzJ9BY1KtVLCgZNCrEBUpOCuEkukq.fdQ1CqFTn0p0ftOVOYToQI2', true ),
        ('DemoBusiness', '$2a$12$JzJ9BY1KtVLCgZNCrEBUpOCuEkukq.fdQ1CqFTn0p0ftOVOYToQI2', false );

    INSERT INTO developit_profiles
        (dev_blurb, emp_blurb, image, user_id )
    VALUES
        ('cool guy looking for work', '', 'https://i.imgur.com/1iP19yP.jpg', 1),
        ('test', 'looking to hire someone for my team', 'https://i.imgur.com/2GRjjkh.jpg', 2);

    INSERT INTO developit_offers
        (employer_id, dev_id, payrate, offer_info, offer_detail, image , emp_name)
    VALUES
        (2, 1, 60, 'Database Administrator Position', 'Im looking to hire a front end dev.', 'https://i.imgur.com/2GRjjkh.jpg', 'DemoBusiness');


    INSERT INTO developit_messages
        (sender_id, receiver_id, message , image)
    VALUES
        (2, 1, 'I have an Web app job for you...', 'https://i.imgur.com/2GRjjkh.jpg'),
        (1, 2, 'Hi I am a frontend developer! can you tell me more about the job.', 'https://i.imgur.com/1iP19yP.jpg'),
        (2, 1, 'Yes!Looking for a modern front end for a statistics app!  Sound interesting?', 'https://i.imgur.com/2GRjjkh.jpg');


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
        ('C'),
        ('C++'),
        ('Javascript'),
        ('MongoDB'),
        ('CSS'),
        ('Angular'),
        ('C Sharp'),
        ('Swift'),
        ('PHP'),
        ('MATLAB'),
        ('Assembly'),
        ('Ruby'),
        ('Rust'),
        ('Visual Basic'),
        ('SQL'),
        ('dummy');

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
        (1, 'Node.js', 'entry'),
        (1, 'Java', 'expert'),
        (1, 'Drupal', 'mid'),
        (2, 'C++', 'expert');


    INSERT INTO developit_user_reviews
        (sender_id, receiver_id, review, rating)
    VALUES
        (2, 1, 'Great Coder, please hire', 5);

    COMMIT;    
    