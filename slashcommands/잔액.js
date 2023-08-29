const client = require("../index");
const comma = require("comma-number");
const Schema = require("../models/도박");
const { SlashCommandBuilder } = require("@discordjs/builders");

module.exports = {
  data: new SlashCommandBuilder()
    .setName("콩즈월렛")
    .setDescription("보유하신 MKC 수량을 확인합니다")
    .addUserOption((option) =>
      option
        .setName("target")
        .setDescription("유저를 선택해주세요")
        .setRequired(false)
    ),
  async execute(interaction) {
    if (interaction.channelId !== "1087779685666144266") return;
    const user = interaction.options.getUser("target") || interaction.user;
    const wjdqh = await Schema.findOne({ userid: user.id });
    if (!wjdqh) return interaction.reply("ERROR) 등록되지 않은 유저입니다.");
    const t = new Date();
    const hours =
      "" + t.getFullYear() + t.getMonth() + t.getDate() + t.getHours();
    let i;
    if (wjdqh.hour == hours) i = "수령 완료";
    else i = "수령 가능";
    const embed = new (require("discord.js").MessageEmbed)()
      .setTitle(`${user.tag || user.user.tag}님의 KONGZ WALLET`)
      .addFields({
        name: `토큰 수량 : **${comma(wjdqh.money)}MKC**`,
        value: `\u200b`,
      })
      .addFields({ name: `겟코인 여부 : **${i}**`, value: `\u200b` })
      .setThumbnail(user.displayAvatarURL())
      .setColor("ORANGE")
      .setFooter("Made by 애쉬");

    interaction.reply({ embeds: [embed] });
  },
};
