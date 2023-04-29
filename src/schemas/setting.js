const {Schema,model} = require("mongoose");

const settingSchema= new Schema({
    guildId:String,
    key:String,
    value:String
},{
    statics: {
        getByKey: function(Key, callback)  {
            return this.findOne({key:Key}, callback);
        },
        getByValue: function(value, callback) {
            return this.findOne({value:Value}, callback);
        },
        getAllData: function() {
            return this.find();
        },
        getAllDataByFilter: function(filter={},callback) {
            return this.find(filter,callback);
        }
    }
});

module.exports=model("Setting",settingSchema);