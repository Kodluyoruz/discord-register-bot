import {model, Schema} from "mongoose";
import {registerCodeRoleSchema} from "./registerCodeRole.js";

const DEFAULT_CODE_LIFETIME = 1000 * 60 * 60 * 24 * 7; // 7 gün

export const REGISTER_CODE_STATUS = {
    PENDING: 1, // kullanılması bekleniyor
    USED: 2, // kullanıcı kodu kullandı
    ACCEPTED: 3, // modereatörler onayladı
    REJECTED: 4, // modereatörler reddetti
    IGNORE: 5, // bu kod iptal edildi
    BANNED: 6, // hem bu kod iptal edildi hem de bu kodla kayıt olmuş
    // kullanıcının rolleri geri alındı
}

export const registerCodeSchema = new Schema({
    code: { type: String, required: true, unique: true },
    createdMemberId: { type: String, required: true },
    memberId: { type: String },
    startDate: { type: Date, required: true, default: Date.now() },
    endDate: { type: Date, required: true, default: Date.now() + DEFAULT_CODE_LIFETIME },
    usedDate: { type: Date },
    status: {
        type: Number,
        required: true,
        default: REGISTER_CODE_STATUS.PENDING,
        enum: [
            REGISTER_CODE_STATUS.PENDING,
            REGISTER_CODE_STATUS.USED,
            REGISTER_CODE_STATUS.ACCEPTED,
            REGISTER_CODE_STATUS.REJECTED,
            REGISTER_CODE_STATUS.IGNORE,
        ],
    },
    decisionDescription: { type: String },
    note: { type: String },
    createdDate: { type: Date, required: true, default: Date.now() },
    roles: [registerCodeRoleSchema]
});

export default model("RegisterCode", registerCodeSchema);