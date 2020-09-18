# Developit

ENDPOINTS:

## Profiles

### GET

### all profiles

/api/profiles

### search profiles

/api/profiles/

### POST

### add a profile

/api/profiles/add

### PATCH

### update a profile

/api/profiles

## Messages

### POST

### post a message

/api/messages

### GET

### get messages specific to dev/recipient

/api/messages/myMessages

## Users

### POST

### adds a standard user profile with credentials

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

Will edit the offer details of a specified offer

#### DELETE /api/offers/:offer_id

Will delete a specified offer

### Freelancer/Dev View

#### GET /api/offers/:offer_id

Retrieves a specific offer by its id

#### GET /api/offers/dev

Retrieves all offers according to the logged in users id & the offers dev id

#### PATCH /api/offers/dev/:offer_id

Will alter the response field only

## Ratings

In progres

prototype deployment via heroku:
https://mysterious-island-88920.herokuapp.com/
