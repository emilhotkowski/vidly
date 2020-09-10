import Joi from 'joi'

const genreSchema = Joi.object({
    name: Joi.string()
        .alphanum()
        .min(3)
        .max(30)
        .required()
})

export {
    genreSchema
}