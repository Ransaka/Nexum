const mongoose = require('mongoose')

/**
 * Data model for Rates.
 */

const complainschema = mongoose.Schema({
    complain:{
        type: String,
        //required: true
    },

    seller:{
        type: String,
    },
    date:{
        type: Date,
        default: Date.now
    },
    actionTaken:{
        type: Boolean,
        default: 0
    },
    warningSent:{
        type:Boolean,
        default:0 
    }
});
// module.exports = mongoose.model('complains', complainschema)
//     Complain: String
//     // date: Date
// })
module.exports = mongoose.model('complain', complainschema, 'Complain')
