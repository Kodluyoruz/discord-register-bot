import mongoose from "mongoose";
import {registerCodeSchema} from "./registerCode.js";
import guildStatics from "./statics/guild.js";

const guildSchema = new mongoose.Schema({
        guildId: {type: String, required: true, unique: true},
        registerChannelId: {type: String},
        modChannelId: {type: String},
        createdDate: {type: Date, default: Date.now()},
        codes: {
            type: [registerCodeSchema],
            default: [],
        }
    },
    {
        statics: guildStatics
    });

export const Guild = mongoose.model("Guild", guildSchema);
