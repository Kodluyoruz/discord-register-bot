import { AttachmentBuilder, PermissionFlagsBits, SlashCommandBuilder } from "discord.js";

import fs from "fs/promises";

import codesEmbed from "#components/embeds/codes";
import generateCsv from "#helpers/csv";
import { userRoleLog } from "#helpers/guildLogger";
import Code from "#schemas/code";

export default {
  data: new SlashCommandBuilder()
    .setName("geri-yükle")
    .setDescription("Yedek dosyasından kullanıcıları veritabanına kaydeder.")
    .setDefaultMemberPermissions(PermissionFlagsBits.Administrator),
  /**
   * Executes the Command
   * @param {import("discord.js").CommandInteraction} interaction
   * @param {import("discord.js").Client} client
   */
  async execute(interaction, client) {
    if (!client.user) {
      return;
    }

    await interaction.deferReply({ ephemeral: true });

    const constbackupFile = `backups/${interaction.guildId}.tsv`.toString();
    const codeInputText = await fs.readFile(constbackupFile, { encoding: "utf8" });

    // skip first line
    const codeInput = codeInputText
      .split("\n")
      .slice(1)
      .map((code) => {
        const codeParts = code.split("\t");
        return {
          codeId: codeParts[1].trim(),
          roleIds: [codeParts[0].trim()],
          data: {
            userName: codeParts[2]?.trim(),
          },
        };
      });

    const { updatedCodes, newCodes, updatedUsers } = await Code.addOrUpdateGuildCodes(
      interaction.guildId,
      codeInput
    );

    await Promise.all(
      updatedUsers.map(async (code) => {
        if (!code.userId) {
          return;
        }
        const member =
          interaction.guild.members.cache.get(code.userId) ||
          (await interaction.guild.members.fetch(code.userId).catch(() => null));

        if (!member) {
          return;
        }

        const { addedRoleIds = [], notUpdatedRoleIds = [] } = code;

        /**
         * @type {import("discord.js").Role[]}
         */
        const addedRoles = [];

        addedRoleIds.forEach((r) => {
          const role = interaction.guild.roles.cache.get(r);
          if (role) {
            addedRoles.push(role);
          }
        });

        notUpdatedRoleIds.forEach((r) => {
          const role = interaction.guild.roles.cache.get(r);
          if (role && !member.roles.cache.has(r)) {
            addedRoles.push(role);
          }
        });

        if (!addedRoles.length) {
          return;
        }

        userRoleLog(
          client,
          interaction.guild,
          member.displayAvatarURL(),
          member.displayName,
          addedRoles
        );

        await member.roles.add(addedRoles);
      })
    );

    const csv = await generateCsv(client, interaction.guild, newCodes, updatedCodes, updatedUsers);

    const dateString = new Date().toISOString().split("T")[0];

    const csvAttachment = new AttachmentBuilder(Buffer.from(csv), {
      name: `${interaction.guild.name}_${dateString}_codes.csv`,
      description: "Exported codes",
    });

    await interaction.editReply({
      embeds: [await codesEmbed.generate(client, updatedCodes, newCodes, updatedUsers)],
      files: [csvAttachment],
    });
  },
};
