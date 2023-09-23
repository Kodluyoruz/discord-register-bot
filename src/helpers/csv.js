/**
 * @param {string[]} roleIds
 * @param {import("discord.js").Guild} discordGuild
 * @param {string} arraySeparator
 */
function getRoleNames(roleIds, discordGuild, arraySeparator) {
  return roleIds
    .map((roleId) => discordGuild.roles.cache.get(roleId).name)
    .join(arraySeparator);
}

/**
 * @param {import("discord.js").Client} discordClient
 * @param {import("discord.js").Guild} discordGuild
 * @param {{ addedRoleIds: string[]; removedRoleIds: string[]; notUpdatedRoleIds: string[]; userId: string; codeId: string; }[]} newCodeList
 * @param {{ addedRoleIds: string[]; removedRoleIds: string[]; notUpdatedRoleIds: string[]; userId: string; codeId: string; }[]} updatedCodeList
 * @param {{ addedRoleIds: string[]; removedRoleIds: string[]; notUpdatedRoleIds: string[]; userId: string; codeId: string; }[]} updatedUserList
 */
async function generateCsv(
  discordClient,
  discordGuild,
  newCodeList,
  updatedCodeList,
  updatedUserList,
  options = {}
) {
  const { delimiter = ",", quotechar = '"', arraySeparator = "|" } = options;

  const headers = [
    "CODE_ID",
    "USER_TAG",
    "USER_NAME",
    "ADDED_ROLE_IDS",
    "REMOVED_ROLE_IDS",
    "NOT_UPDATED_ROLE_IDS",
  ];

  /**
   * @param {{ addedRoleIds: string[]; removedRoleIds: string[]; notUpdatedRoleIds: string[]; userId: string; codeId: string; data: { userName: string} }} code
   */
  async function getRowData(code) {
    const addedRoles = getRoleNames(
      code.addedRoleIds,
      discordGuild,
      arraySeparator
    );
    const removedRoles = getRoleNames(
      code.removedRoleIds,
      discordGuild,
      arraySeparator
    );
    const notUpdatedRoles = getRoleNames(
      code.notUpdatedRoleIds,
      discordGuild,
      arraySeparator
    );

    const member = code.userId
      ? discordGuild.members.cache.get(code.userId) ||
      (await discordGuild.members.fetch(code.userId))
      : null;
    const userTag = member?.user.tag || "";
    const userName = member?.displayName || code.data?.userName || "";

    return [
      code.codeId,
      userTag,
      userName,
      addedRoles,
      removedRoles,
      notUpdatedRoles,
    ];
  }

  const rows = await Promise.all([
    ...newCodeList.map(getRowData),
    ...updatedCodeList.map(getRowData),
    ...updatedUserList.map(getRowData),
  ]);

  const csvArray = [headers, ...rows];

  return csvArray
    .map((row) =>
      row.map((cell) => `${quotechar}${cell}${quotechar}`).join(delimiter)
    )
    .join("\n");
}

export default generateCsv;
