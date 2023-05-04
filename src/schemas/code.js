import { model, Schema } from "mongoose";

const codeSchema = new Schema(
  {
    guildId: String,
    codeId: String,
    roleId: String,
    userId: String,
    userName: String,
  },
  {
    statics: {
      addCode: async function (guildId, roleId, codeIds, callback) {
        // Çakışan kodları getir
        const allreadyExistCodes = await this.find({
          guildId: guildId,
          roleId: roleId,
          codeId: { $in: codeIds },
        }).select("codeId");

        // Çakışan kodları filtrele
        codeIds = codeIds.filter(
          (codeId) => !allreadyExistCodes.some((c) => c.codeId === codeId)
        );

        const reformattedArrayCode = codeIds.map((codeId) => ({
          guildId,
          roleId,
          codeId,
        }));

        return this.insertMany(reformattedArrayCode, callback);
      },
      getByCode: function (guildId, codeId, callback) {
        return this.findOne({ guildId: guildId, codeId: codeId }, callback);
      },
      saveCodeToUser: function (guildId, codeId, userId, callback) {
        return this.findOneAndUpdate(
          { guildId: guildId, codeId: codeId },
          { userId: userId },
          callback
        );
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

export default model("Code", codeSchema);
