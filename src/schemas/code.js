import { Schema, model } from "mongoose";

const codeSchema = new Schema(
  {
    guildId: {
      type: String,
      required: true,
    },
    codeId: {
      type: String,
      required: true,
    },
    roleIds: [
      {
        type: String,
        required: true,
      },
    ],
    userId: {
      type: String,
    },
    data: {
      userName: String,
    },
  },
  {
    timestamps: true,
    statics: {
      async updateCodeUserId(guildId, codeId, newUserId) {
        const updateResult = await this.updateOne({ guildId, codeId }, { userId: newUserId });

        return updateResult.modifiedCount === 1;
      },
      async getByCodeId(guildId, codeId) {
        const code = await this.findOne({ guildId, codeId });
        if (code) {
          const { roleIds, userId, data } = code;
          return { roleIds, userId, data };
        }
        return null;
      },
      /**
       * @typedef {Object} UserCodeData
       * @property {string} codeId - The ID of the code.
       * @property {Array<string>} addedRoleIds - The IDs of the roles added to the user.
       * @property {Array<string>} removedRoleIds - The IDs of the roles removed from the user.
       * @property {Array<string>} notUpdatedRoleIds - The IDs of the roles that were not updated.
       * @property {{userName: string | undefined}} [data] - The data of the code.
       * @property {string} [userId] - The ID of the user.
       */

      /**
       * Adds or updates guild codes.
       *
       * @async
       * @function
       * @param {string} guildId - The ID of the guild to update codes for.
       * @param {Array<{codeId: string, roleIds: Array<string>, data: {userName: string}}>} codes - The codes to add or update.
       * @param {boolean} [confirm=true] - Whether to confirm the changes.
       * @param {boolean} [addRoles=true] - Whether to add roles.
       * @returns {Promise<{needConfirm: boolean, updatedCodes: Array<UserCodeData>, newCodes: Array<UserCodeData>, updatedUsers: Array<UserCodeData>}>} - The result of the operation.
       */
      async addOrUpdateGuildCodes(guildId, codes, confirm = true, addRoles = true) {
        const updatedCodes = [];
        /** @type {Array<UserCodeData>} */
        const newCodes = [];
        const updatedUsers = [];

        let needConfirm = !confirm;

        for (const code of codes) {
          const { codeId, roleIds, data } = code;

          const existingGuildCode = await this.findOne({
            guildId,
            codeId,
          });

          if (existingGuildCode) {
            const oldRoleIds = existingGuildCode.roleIds.slice();
            const newRoleIds = roleIds.slice();
            const addedRoleIds = newRoleIds.filter((id) => !oldRoleIds.includes(id));
            const removedRoleIds = addRoles
              ? []
              : oldRoleIds.filter((id) => !newRoleIds.includes(id));
            const notUpdatedRoleIds = oldRoleIds.filter(
              (id) => !newRoleIds.includes(id) && !addedRoleIds.includes(id)
            );

            // addRoles seçeneği varsa mevcut rolleri silme
            existingGuildCode.roleIds = addRoles ? oldRoleIds.concat(addedRoleIds) : newRoleIds;

            existingGuildCode.data = data;

            const updatedCode = {
              codeId,
              addedRoleIds,
              removedRoleIds,
              notUpdatedRoleIds,
              data,
              userId: existingGuildCode.userId,
            };

            if (existingGuildCode.userId) {
              updatedUsers.push(updatedCode);
            } else {
              updatedCodes.push(updatedCode);
            }

            if (confirm) {
              existingGuildCode.save();
            } else {
              needConfirm = true;
            }
          }
          const newCode = {
            guildId,
            codeId,
            roleIds,
            data,
          };

          const newGuildCode = new this(newCode);
          newGuildCode.save();
          newCodes.push({
            codeId,
            addedRoleIds: roleIds.slice(),
            removedRoleIds: [],
            notUpdatedRoleIds: [],
            data,
          });
        }

        return {
          needConfirm,
          updatedCodes,
          newCodes,
          updatedUsers,
        };
      },
      /**
       * Gets guild codes by role ID.
       *
       * @async
       * @function
       * @param {string} guildId - The ID of the guild to get codes for.
       * @param {string} roleId - The ID of the role to get codes for.
       * @returns {Promise<{usersCodes: Array<UserCodeData>, unusedCodes: Array<UserCodeData>}>} - The result of the operation.
       */
      async getByRoleId(guildId, roleId) {
        const guildCodes = await this.find({ guildId, roleIds: roleId });
        const unusedCodes = [];
        const usersCodes = [];

        guildCodes.forEach((code) => {
          /** @type {UserCodeData} */
          const codeData = {
            codeId: code.codeId,
            addedRoleIds: code.roleIds.slice(),
            removedRoleIds: [],
            notUpdatedRoleIds: [],
            data: {
              userName: code.data?.userName,
            },
            userId: code.userId,
          };

          if (code.userId) {
            usersCodes.push(codeData);
          } else {
            unusedCodes.push(codeData);
          }
        });

        return {
          usersCodes,
          unusedCodes,
        };
      },
    },
  }
);

codeSchema.index({ guildId: 1, codeId: 1 }, { unique: true });

export default model("Code", codeSchema);
