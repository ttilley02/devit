const knex = require('knex')
const bcrypt = require('bcryptjs')
const app = require('../src/app')
const { makeUsersArray } = require("./fixtures/user.fixtures");
const { makeProfilesArray } = require("./fixtures/profiles.fixtures");
const { makeSkillsArray } = require("./fixtures/skills.fixtures");
const { makeUserSkillsArray } = require("./fixtures/userSkills.fixtures");
const authHelper = require("./authHelper");

describe('Users Endpoints', function() {
  let db

  const  testUsers  = makeUsersArray()
  const testUser = testUsers[0]

  before("make knex instance", () => {
    db = knex({
      client: "pg",
      connection: process.env.TEST_DATABASE_URL,
    });
    app.set("db", db);
  });
  
  after("disconnect from db", () => db.destroy());

  before("clean the table", () =>
    db.raw(
      "TRUNCATE developit_users, developit_profiles, developit_skills, developit_user_skills RESTART IDENTITY CASCADE"
    )
  );

  afterEach("cleanup", () =>
    db.raw(
      "TRUNCATE developit_users, developit_profiles, developit_skills, developit_user_skills RESTART IDENTITY CASCADE"
    )
  );


  describe(`POST /api/users`, () => {
    context(`User Validation`, () => {
      beforeEach('insert users', () =>
        authHelper.seedUsers(
          db,
          testUsers,
        )
      )

      const requiredFields = ['nickname', 'password',]

      requiredFields.forEach(field => {
        const registerAttemptBody = {
          nickname: 'test nickname',
          password: 'test password',
          nickname: 'test nickname',
        }

        it(`responds with 400 required error when '${field}' is missing`, () => {
          delete registerAttemptBody[field]

          return supertest(app)
            .post('/api/users')
            .send(registerAttemptBody)
            .expect(400, {
              error: `Missing '${field}' in request body`,
            })
        })
      })
      it(`responds 400 'Password must be longer than 8 characters' when empty password`, () => {
             const userShortPassword = {
               nickname: 'test nickname',
               password: '1234567',

             }
             return supertest(app)
               .post('/api/users')
               .send(userShortPassword)
               .expect(400, { error: `Password must be longer than 8 characters` })
           })
        it(`responds 400 'Password must be less than 56 characters' when long password`, () => {
            const userLongPassword = {
                nickname: 'test nickname',
                password: '*'.repeat(73),

            }

            return supertest(app)
                .post('/api/users')
                .send(userLongPassword)
                .expect(400, { error: `Password must be less than 56 characters` })
            })
        it(`responds 400 error when password starts with spaces`, () => {
            const userPasswordStartsSpaces = {
                nickname: 'test nickname',
                password: ' 1Aa!2Bb@',
    
            }
            return supertest(app)
                .post('/api/users')
                .send(userPasswordStartsSpaces)
                .expect(400, { error: `Password must not start or end with empty spaces` })
            })
        it(`responds 400 error when password ends with spaces`, () => {
            const userPasswordEndsSpaces = {
                nickname: 'test nickname',
                password: '1Aa!2Bb@ ',

            }
            return supertest(app)
                .post('/api/users')
                .send(userPasswordEndsSpaces)
                .expect(400, { error: `Password must not start or end with empty spaces` })
            })
        it(`responds 400 error when password isn't complex enough`, () => {
            const userPasswordNotComplex = {
                nickname: 'test nickname',
                password: '11AAaabb',

            }
            return supertest(app)
                .post('/api/users')
                .send(userPasswordNotComplex)
                .expect(400, { error: `Password must contain 1 upper case, lower case, number and special character` })
            })

        it(`responds 400 'User name already taken' when nickname isn't unique`, () => {
            const duplicateUser = {
            nickname: testUser.nickname,
            password: '11AAaa!!',
  
            }
            return supertest(app)
            .post('/api/users')
            .send(duplicateUser)
            .expect(400, { error: `nickname already taken` })
        })
      })
      context('Happy path', () =>{
        it('responds 201, serialized user, storing bcryped password', () =>{
        const newUser = {
            nickname: 'test nickname',
            password: '11AAaa!!',

            }
            return supertest(app)
            .post('/api/users')
            .send(newUser)
            .expect(201)
            .expect(res => {
                expect(res.body).to.have.property('id')
               
                expect(res.body).to.not.have.property('password')
                expect(res.headers.location).to.eql(`/api/users/${res.body.id}`)
                const expectedDate = new Date().toLocaleString('en', { timeZone: 'America/New_York' })
                const actualDate = new Date(res.body.date_created).toLocaleString()
                expect(actualDate).to.eql(expectedDate)
            })
            .expect(res =>
                db
                .from('developit_users')
                .select('*')
                .where({ id: res.body.id })
                .first()
                .then(row => {
                    const expectedDate = new Date().toLocaleString('en', { timeZone: 'America/New_York' })
                    const actualDate = new Date(row.date_created).toLocaleString()
                    expect(actualDate).to.eql(expectedDate)
                    return bcrypt.compare(newUser.password, row.password)
                })
                    .then(compareMatch => {
                    expect(compareMatch).to.be.true
                    })
                )
          })
        })
    })
})