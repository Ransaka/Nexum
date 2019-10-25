const mongoose = require('mongoose')

/**
 * Data model for Rates.
 */

const complainschema = mongoose.Schema({
    complain:{
        type: String,
        //required: true
    },
    id:{
        type: String,
        //required: true
    },
    seller:{
        type: String,
    },
    item:{
        type: String
    }
});
module.exports = mongoose.model('complains', complainschema)
    Complain: String,
    // date: Date
})
module.exports = mongoose.model('complain', complainschema, 'Complain')
