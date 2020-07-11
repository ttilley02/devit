const express = require('express')
const NoteService = require('../noteServices')
// const xss = require('xss')
const NoteRouter = express.Router()
const jsonParser = express.json()


NoteRouter
    .route('/')
    .get((req, res, next) => {
        NoteService.getNotes(
            req.app.get('db')
        )
            .then(articles => {
                res.json(articles)
            })
            .catch(next)

    })
    .post(jsonParser, (req, res, next) => {
        const { name, folderid, content } = req.body
        const newNote = { name, folderid, content }

        for (const [key, value] of Object.entries(newNote)) {
            if (value == null) {
                return res.status(400).json({
                    error: { message: `Missing '${key}' in request body` }
                })
            }
        }
        NoteService.insertNotes(
            req.app.get('db'),
            newNote
        )
            .then(article => {
                res
                    .status(201)
                    .json(article)
            })
            .catch(next)
    })

NoteRouter
    .route('/:note_id')
    .all((req, res, next) => {
        NoteService.getById(
            req.app.get('db'),
            req.params.note_id
        )
            .then(article => {
                if (!article) {
                    return res.status(404).json({
                        error: { message: `Article doesn't exist` }
                    })
                }
                res.article = article // save the article for the next middleware
                next() // don't forget to call next so the next middleware happens!
            })
            .catch(next)
          })
          .get((req, res, next) => {
            console.log('im here')
            res.json({
              id: res.article.id,
              name: (res.article.name),
              folderid: (res.article.folderid),
              content: (res.article.content),
            //   title: xss(res.article.title), // sanitize title
            })
    })
    .delete((req, res, next) => {
        NoteService.deleteArticle(
          req.app.get('db'),
          req.params.note_id
        )
          .then(() => {
            res.status(204).end()
          })
          .catch(next)
        })

        .patch(jsonParser, (req, res, next) => {
            const { name, content,} = req.body
            const notesToUpdate = { name, content,}
        
            const numberOfValues = Object.values(notesToUpdate).filter(Boolean).length
            if (numberOfValues === 0)
              return res.status(400).json({
                error: {
                  message: `Request body must content either 'name','content'`
                }
              })
        
              NoteService.updateArticle(
              req.app.get('db'),
              req.params.note_id,
              notesToUpdate
            )
              .then(numRowsAffected => {
                res.status(204).end()
              })
              .catch(next)
          })


module.exports = NoteRouter