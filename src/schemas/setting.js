import { Schema, model } from "mongoose";

const settingSchema = new Schema(
  {
    guildId: String,
    key: String,
    value: String,
  },
  {
    statics: {
      getValueByKey(guildId, key) {
        return this.findOne({ guildId, key });
      },
      setValueByKey(guildId, key, value) {
        return this.findOneAndUpdate({ guildId, key }, { value }, { upsert: true });
      },
      getAllData() {
        return this.find();
      },
      getAllDataByFilter(filter = {}) {
        return this.find(filter);
      },
    },
  }
);

export default model("Setting", settingSchema);
