import { model, Schema } from "mongoose";

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
      updateCodeUserId: async function (guildId, codeId, newUserId) {
        const updateResult = await this.updateOne(
          { guildId, codeId },
          { userId: newUserId }
        );

        return updateResult.nModified === 1;
      },
      getByCodeId: async function (guildId, codeId) {
        const code = await this.findOne({ guildId, codeId });
        if (code) {
          const { roleIds, userId, data } = code;
          return { roleIds, userId, data };
        }
        return null;
      },
      /**
       * Adds or updates guild codes.
       *
       * @async
       * @function
       * @param {string} guildId - The ID of the guild to update codes for.
       * @param {Array} codes - An array of codes to add or update.
       * @param {boolean} [confirm=true] - Whether to confirm the changes.
       * @param {boolean} [addRoles=true] - Whether to add roles.
       * @returns {Object} An object containing the results of the operation.
       *    @property {boolean} needConfirm - Whether confirmation is needed.
       *    @property {Array} updatedCodes - An array of updated codes.
       *    @property {Array} newCodes - An array of new codes.
       *    @property {Array} updatedUsers - An array of updated users.
       */
      addOrUpdateGuildCodes: async function (
        guildId,
        codes,
        confirm = true,
        addRoles = true
      ) {
        const updatedCodes = [];
        const newCodes = [];
        const updatedUsers = [];

        let needConfirm = !confirm;

        for (const code of codes) {
          const { codeId, roleIds, data } = code;

          let existingGuildCode = await this.findOne({
            guildId,
            codeId,
          });

          if (existingGuildCode) {
            const oldRoleIds = existingGuildCode.roleIds.slice();
            const newRoleIds = roleIds.slice();
            const addedRoleIds = newRoleIds.filter(
              (id) => !oldRoleIds.includes(id)
            );
            const removedRoleIds = addRoles
              ? []
              : oldRoleIds.filter((id) => !newRoleIds.includes(id));
            const notUpdatedRoleIds = oldRoleIds.filter(
              (id) => !newRoleIds.includes(id) && !addedRoleIds.includes(id)
            );

            // addRoles seçeneği varsa mevcut rolleri silme
            if (addRoles) {
              existingGuildCode.roleIds = oldRoleIds.concat(addedRoleIds);
            } else {
              existingGuildCode.roleIds = newRoleIds;
            }

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
          } else {
            const newCode = {
              guildId,
              codeId,
              roleIds,
              data,
            };

            const newGuildCode = new this(newCode);
            newGuildCode.save();
            newCodes.push(newCode);
          }
        }

        return {
          needConfirm,
          updatedCodes,
          newCodes,
          updatedUsers,
        };
      },
    },
  }
);

codeSchema.index({ guildId: 1, codeId: 1 }, { unique: true });

export default model("Code", codeSchema);
