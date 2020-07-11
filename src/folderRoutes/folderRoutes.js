const express = require('express')
const ArticlesService = require('../articles-service')
// const xss = require('xss')
const articlesRouter = express.Router()
const jsonParser = express.json()



articlesRouter
  .route('/')
  .get((req, res, next) => {
    ArticlesService.getAllArticles(
      req.app.get('db')
    )
      .then(articles => {
        res.json(articles)
      })
      .catch(next)
      
  })
  .post(jsonParser, (req, res, next) => {
    const { title } = req.body
    const newArticle = { title }

    for (const [key, value] of Object.entries(newArticle)) {
      if (value == null) {
        return res.status(400).json({
          error: { message: `Missing '${key}' in request body` }
        })
      }
    }
    ArticlesService.insertArticle(
      req.app.get('db'),
      newArticle
    )
      .then(article => {
        res
          .status(201)
          .json(article)
      })
      .catch(next)
  
})

articlesRouter
  .route('/:article_id')
  .all((req, res, next) => {
    ArticlesService.getById(
      req.app.get('db'),
      req.params.article_id
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
    res.json({
      id: res.article.id,
      title: (res.article.title),
    //   title: xss(res.article.title), // sanitize title
    })
  })
  .delete((req, res, next) => {
    ArticlesService.deleteArticle(
      req.app.get('db'),
      req.params.article_id
    )
      .then(() => {
        res.status(204).end()
      })
      .catch(next)
  })
 

module.exports = articlesRouter