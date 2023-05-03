import {model, Schema} from "mongoose";

export const registerCodeRoleSchema = new Schema({
    roleId: { type: String, required: true }
});


export const RegisterCodeRole = model("RegisterCodeRole", registerCodeRoleSchema);