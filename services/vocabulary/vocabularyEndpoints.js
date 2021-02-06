const { ErrorHandler } = require('../../helpers/error')
const { models: { vocabulary: { WORD_EXIST } } } = require('../../config/constants')

const handlers = ({ Model }) => {
    async function list ()  {
        return new Promise( (resolve, reject) => {
            let list = Model.findRandom({}, {}, { limit: 10 }, function(err, results) {
                if(err){
                    reject(new ErrorHandler(null, err.message))
                    return
                }
                resolve(results)
            });
        })
    }

    async function add(vocabulary) {
        let isExist = Model.exists({ english: vocabulary.english })
        if(isExist) {
            return WORD_EXIST
        }

        let vc = new Model(vocabulary)
        return await vc.save()
    }

    return {
        list,
        add
    }
}

module.exports = handlers