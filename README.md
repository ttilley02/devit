# Developit

ENDPOINTS:

## Profiles

GET
#### all profiles
/api/profiles    
#### search profiles
/api/profiles/:skill/:skill2/:skill3    
/api/profiles/user/:user_id    

POST
#### add a profile
/api/profiles/add    

PATCH
#### update a profile
/api/profiles/:user_id    

## Skills
GET
#### search skills by user ID
api/skills/:skill_id(will be changing to user_id in revision)  

POST
#### add skills to a user
api/skills/add/:user_id  

DELETE
#### delete a users skill
api/skills/delete/:user_id/:skill  

PATCH
IN PROGRESS  

## Messages
GET
#### get messages
/api/messages/myMessages  
POST
#### send message
/api/messages/  


## Users
POST
#### adds a standard user profile with credentials
/api/users  

## Offers

### Seeker/Employer View

#### GET /api/offers/:offer_id

Retrieves a specific offer by its id

#### POST /api/offers

Creates a new offer

#### GET /api/offers/emp

Retrieves all offers according to the logged in users id & the offers employer id

#### PATCH /api/offers/:offer_id

Will edit the offer details of a specified offer (payrate, info & details)

#### DELETE /api/offers/:offer_id

Will delete a specified offer

### Freelancer/Dev View

#### GET /api/offers/:offer_id

Retrieves a specific offer by its id

#### GET /api/offers/dev

Retrieves all offers according to the logged in users id & the offers dev id

#### PATCH /api/offers/dev/:offer_id

Will alter the response field only (Boolean)

## Ratings

In progres

prototype deployment via heroku:
https://mysterious-island-88920.herokuapp.com/
