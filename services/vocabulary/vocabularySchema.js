const Joi = require('joi')

const schemas = {
    vocabularyPOST: Joi.object().keys({
        english: Joi.string().required(),
        spanish: Joi.string().required(),
        pronunciation: Joi.string().required()
    })
}

module.exports = schemas