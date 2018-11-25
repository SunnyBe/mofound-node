// The Item Schema used in generating the item model, to store items information

// Require Mongoose
var mongoose = require('mongoose');

// Define a schema
var Schema = mongoose.Schema;

var LostItemSchema = new Schema(
    {
        item: {type: Schema.Types.ObjectId, ref: "Item"},
        reporter: {
            type: Schema.Types.ObjectId, ref: "User"
        },
        location: {
            type: String,
            default: 'Unspecified'
        },
        status: {
            type: String,
            enum: ['B', 'NB', 'R'],
            default: 'NB'
        },
    }
);

//--- Virtual methods

// Virtual for user name
LostItemSchema.virtual('itemKindAndStatus')
    .get(function(){
        return 'Lost & '+this.status;
    });
LostItemSchema.virtual('getCode')
    .get(function(){
        return this.code;
    });
LostItemSchema.virtual('url')
    .get(function(){
        return '/item/lost/'+this.item._id;
    });


// Compile the model from schema
module.exports = mongoose.model('LostItem', LostItemSchema);