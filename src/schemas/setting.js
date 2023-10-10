import { Schema, model } from "mongoose";

const settingSchema = new Schema(
  {
    guildId: String,
    key: String,
    value: String,
  },
  {
    statics: {
      async getValueByKey(guildId, key) {
        return this.findOne({ guildId, key }).lean();
      },
      async setValueByKey(guildId, key, value) {
        return this.findOneAndUpdate({ guildId, key }, { value }, { upsert: true }).lean();
      },
    },
  }
);

export default model("Setting", settingSchema);
