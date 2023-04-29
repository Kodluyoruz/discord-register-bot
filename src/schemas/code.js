const {Schema,model} = require("mongoose");

const codeSchema= new Schema({
    guildId:String,
    codeId:String,
    roleId:String,
    userId:String,
    note:String
},{
    statics: {
        getByRoleId: function(id, callback)  {
            return this.findOne({roleId:id}, callback);
        },
        getByCodeId: function(id, callback) {
            return this.findOne({codeId:id}, callback);
        },
        getByUserId: function(id, callback) {
            return this.findOne({userId:id}, callback);
        },
        getAllData: function() {
            return this.find();
        },
        getAllDataByFilter: function(filter={},callback) {
            return this.find(filter,callback);
        }
    }
});

module.exports=model("Code",codeSchema);