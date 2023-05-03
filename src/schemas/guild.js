

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
        }
    }
});

module.exports=model("Guild",guildSchema);

