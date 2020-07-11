const NoteServies = {
    getNotes(knex) {
        return knex.select('*').from('notes')
    },
    insertNotes(knex, newNote) {
        return knex
            .insert(newNote)
            .into('notes')
            .returning('*')
            .then(rows => {
                return rows[0]
            })
    },
    getById(knex, id) {
        return knex.from('notes').select('*').where('id', id).first()
    },

    deleteArticle(knex, id) {
        return knex('notes')
            .where({ id })
            .delete()
    },
    updateArticle(knex, id, newNoteFields) {
        return knex('notes')
          .where({ id })
          .update(newNoteFields)
      },

    
    // // updateArticle(knex, id, newArticleFields) {
    // //        return knex('Noteful-Database')
    // //          .where({ id })
    // //          .update(newArticleFields)
    // //      },
}

module.exports = NoteServies