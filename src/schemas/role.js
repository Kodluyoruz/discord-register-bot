import { model, Schema } from "mongoose";

const roleSchema = new Schema(
  {
    guildId: String,
    roleId: String,
    channelId: String,
    prefix: String,
    suffix: String,
  },
  {
    statics: {
      getByRoleId: function (id, callback) {
        return this.findOne({ roleId: id }, callback);
      },
      getByCode: function (id, callback) {
        return this.findOne({ codeId: id }, callback);
      },
      getAllData: function () {
        return this.find();
      },
      getAllDataByFilter: function (filter = {}, callback) {
        return this.find(filter, callback);
      },
    },
  }
);

export default model("Role", roleSchema);