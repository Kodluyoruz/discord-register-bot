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
      addCodes: async function (guildId, roleId, codes, callback) {
        // Çakışan kodları getir
        const allreadyExistCodes = await this.find({
          guildId: guildId,
          roleId: roleId,
          codeId: { $in: codes.map((code) => code.codeId) },
        }).select("codeId");

        // Çakışan kodları filtrele
        const codeIds = codes.filter(
          (code) => !allreadyExistCodes.some((c) => c.codeId === code.codeId)
        );

        // Çakışan kodların isimlerini güncelle
        allreadyExistCodes.forEach((c) => {
          if (codes.some((code) => code.codeId === c.codeId)) {
            c.userName = codes.find(
              (code) => code.codeId === c.codeId
            ).userName;
          }
        });
        this.bulkSave(allreadyExistCodes);

        const reformattedArrayCode = codeIds.map((code) => ({
          guildId,
          roleId,
          ...code,
        }));

        const inserted = await this.insertMany(reformattedArrayCode, callback);
        return { inserted: inserted, updated: allreadyExistCodes };
      },
      getByRole: function (guildId, roleId, callback) {
        return this.find(
          {
            guildId: guildId,
            roleId: roleId,
          },
          callback
        );
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
