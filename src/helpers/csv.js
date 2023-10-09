/**
 * @param {string[]} roleIds
 * @param {import("discord.js").Guild} discordGuild
 * @param {string} arraySeparator
 */
function getRoleNames(roleIds, discordGuild, arraySeparator) {
  return roleIds.map((roleId) => discordGuild.roles.cache.get(roleId)?.name).join(arraySeparator);
}

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
 * @param {import("discord.js").Client} discordClient
 * @param {import("discord.js").Guild} discordGuild
 * @param {Array<UserCodeData>} newCodeList
 * @param {Array<UserCodeData>} updatedCodeList
 * @param {Array<UserCodeData>} updatedUserList
 * @param {Object} [options] - The options for the CSV.:
 * @param {string} [options.delimiter] - The delimiter for the CSV.
 * @param {string} [options.quoteChar] - The quote char for the CSV.
 * @param {string} [options.arraySeparator] - The separator for arrays in the CSV.
 * @returns {Promise<string>}
 */
async function generateCsv(
  discordClient,
  discordGuild,
  newCodeList,
  updatedCodeList,
  updatedUserList,
  options = {}
) {
  const { delimiter = ",", quoteChar = '"', arraySeparator = "|" } = options;

  const headers = [
    "CODE_ID",
    "USER_TAG",
    "USER_ID",
    "USER_NAME",
    "ROLE_IDS",
    "REMOVED_ROLE_IDS",
    "EXSISTED_ROLE_IDS",
  ];

  /**
   * @param {UserCodeData} code
   */
  const getRowData = async (code) => {
    const addedRoles = getRoleNames(code.addedRoleIds || [], discordGuild, arraySeparator);
    const removedRoles = getRoleNames(code.removedRoleIds || [], discordGuild, arraySeparator);
    const notUpdatedRoles = getRoleNames(
      code.notUpdatedRoleIds || [],
      discordGuild,
      arraySeparator
    );

    const member = code.userId
      ? discordGuild.members.cache.get(code.userId) ||
        (await discordGuild.members.fetch(code.userId).catch(() => null))
      : null;
    const userTag = member?.user.tag || "";
    const userId = member?.id || "";
    const userName = member?.displayName || code.data?.userName || "";

    return [code.codeId, userTag, userId, userName, addedRoles, removedRoles, notUpdatedRoles];
  };

  const rows = await Promise.all([
    ...newCodeList.map(getRowData),
    ...updatedCodeList.map(getRowData),
    ...updatedUserList.map(getRowData),
  ]);

  const csvArray = [headers, ...rows];

  return csvArray
    .map((row) => row.map((cell) => `${quoteChar}${cell}${quoteChar}`).join(delimiter))
    .join("\n");
}

export default generateCsv;
