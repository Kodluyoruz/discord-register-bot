import { model, Schema } from 'mongoose'

const settingSchema= new Schema({
    guildId:String,
    key:String,
    value:String
},{
    statics: {
        getValueByKey: function(guildId,key,callback)  {
            return this.findOne({guildId:guildId,key:key}, callback);
        },
        getAllData: function() {
            return this.find();
        },
        getAllDataByFilter: function(filter={},callback) {
            return this.find(filter,callback);
        }
    }
});

export default model("Setting", settingSchema);