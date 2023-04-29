const {Schema,model} = require("mongoose");

const guildSchema= new Schema({
    guildId:String,
    guildName:String,
    guildIcon:{
        type:String,
        required:false
    },
},{
    statics: {
        getByGuildId: function(id, callback)  {
            return this.findOne({guildId:id}, callback);
        },
        getByName: function(name, callback) {
            return this.findOne({guildName:name}, callback);
        },
        getAllData: function() {
            return this.find();
        },
        getAllDataByFilter: function(filter={},callback) {
            return this.find(filter,callback);
        }
    }
});

module.exports=model("Guild",guildSchema);

