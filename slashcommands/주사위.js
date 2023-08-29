const comma = require("comma-number");
const { SlashCommandBuilder } = require("@discordjs/builders");

module.exports = {
  data: new SlashCommandBuilder()
    .setName("주사위")
    .setDescription("돈을 걸고 봇과 주사위를 굴립니다")
    .addIntegerOption((f) =>
      f
        .setName("배팅액")
        .setDescription("수량을 입력해 주세요")
        .setRequired(true)
        .setMinValue(10)
    ),
  async execute(interaction) {
    if (interaction.channelId !== "1087779685666144266") return;
    const randommsg = ["1", "2", "3", "4", "5", "6"];
    const random = Math.floor(Math.random() * randommsg.length);
    const randommsg2 = ["1", "2", "3", "4", "5", "6"];
    const random2 = Math.floor(Math.random() * randommsg2.length);
    const randommsg3 = ["1", "2", "3", "4", "5", "6"];
    const random3 = Math.floor(Math.random() * randommsg3.length);
    const randommsg4 = ["1", "2", "3", "4", "5", "6"];
    const random4 = Math.floor(Math.random() * randommsg4.length);
    const 배팅액 = interaction.options.getInteger("배팅액");
    const discord = require("discord.js");
    const embed = new discord.MessageEmbed()
      .setTitle("주사위를 굴리는중...")
      .setDescription("**유저 :\n\n콩즈봇 :**")
      .setColor("RED")
      .setFooter("Made by 애쉬");
    const embed1 = new discord.MessageEmbed()
      .setTitle("주사위를 굴리는중...")
      .setDescription(`**유저 : ${random}\n\n콩즈봇 : ${random3}**`)
      .setColor("RED")
      .setFooter("Made by 애쉬");
    const embed2 = new discord.MessageEmbed()
      .setTitle("주사위를 굴리는중...")
      .setDescription(
        `**유저 : ${random} + ${random2}\n\n콩즈봇 : ${random3} + ${random4}**`
      )
      .setColor("RED")
      .setFooter("Made by 애쉬");
    const Schema = require("../models/도박");
    const ehqkrduqn = await Schema.findOne({
      userid: interaction.user.id,
    });
    if (!ehqkrduqn) interaction.reply("**먼저 가입해주세요.");
    if (ehqkrduqn.money < 0) interaction.reply("**MKC가 부족합니다.**");
    if (배팅액 < 10) interaction.reply("**10MKC이상 배팅 가능합니다.**");
    if (배팅액 > ehqkrduqn.money) interaction.reply("**MKC가 부족합니다.**");
    else {
      interaction.reply({ embeds: [embed] });
      setTimeout(function () {
        interaction.editReply({ embeds: [embed1] });
      }, 1500);
      setTimeout(function () {
        interaction.editReply({ embeds: [embed2] });
      }, 3000);
      const hi = random + random2;
      const hello = random3 + random4;
      if (hi > hello) {
        const embed3 = new discord.MessageEmbed()
          .setTitle("YOU WIN!")
          .setDescription(
            `**유저 : ${random} + ${random2}\n\n콩즈 : ${random3} + ${random4}\n\n결과 : + ${comma(
              배팅액
            )}MKC**`
          )
          .setColor("RED")
          .setThumbnail(
            interaction.member.user.displayAvatarURL({ dynamic: true })
          )
          .setFooter("Made by 애쉬");
        await Schema.findOneAndUpdate(
          { userid: interaction.user.id },
          {
            money: ehqkrduqn.money + 배팅액,
            userid: interaction.user.id,
            date: ehqkrduqn.date,
          }
        );
        setTimeout(function () {
          interaction.editReply({ embeds: [embed3] });
        }, 4500);
      }
      if (hi < hello) {
        const embed3 = new discord.MessageEmbed()
          .setTitle("KONGZ BOT WIN!")
          .setDescription(
            `**유저 : ${random} + ${random2}\n\n콩즈봇 : ${random3} + ${random4}\n\n결과 : - ${comma(
              배팅액
            )}MKC**`
          )
          .setColor("RED")
          .setThumbnail(
            interaction.member.user.displayAvatarURL({ dynamic: true })
          )
          .setFooter("Made by 애쉬");
        await Schema.findOneAndUpdate(
          { userid: interaction.user.id },
          {
            money: ehqkrduqn.money - 배팅액,
            userid: interaction.user.id,
            date: ehqkrduqn.date,
          }
        );
        setTimeout(function () {
          interaction.editReply({ embeds: [embed3] });
        }, 4500);
      }
      if (hi == hello) {
        const embed3 = new discord.MessageEmbed()
          .setTitle("DRAW!")
          .setDescription(
            `**유저 : ${random} + ${random2}\n\n콩즈봇 : ${random3} + ${random4}\n\n결과 : DRAW!**`
          )
          .setColor("RED")
          .setThumbnail(
            interaction.member.user.displayAvatarURL({ dynamic: true })
          )
          .setFooter("Made by 애쉬");
        setTimeout(function () {
          interaction.editReply({ embeds: [embed3] });
        }, 4500);
      }
    }
  },
};
