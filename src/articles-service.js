const ArticlesService = {
    getAllArticles(knex) {
        return knex.select('*').from('folders')
    },
    insertArticle(knex, newArticle) {
        return knex
            .insert(newArticle)
            .into('folders')
            .returning('*')
            .then(rows => {
                return rows[0]
            })
    },
    getById(knex, id) {
        return knex.from('folders').select('*').where('id', id).first()
    },

    deleteArticle(knex, id) {
        return knex('folders')
            .where({ id })
            .delete()
    },

    // updateArticle(knex, id, newArticleFields) {
    //        return knex('Noteful-Database')
    //          .where({ id })
    //          .update(newArticleFields)
    //      },
}

module.exports = ArticlesService