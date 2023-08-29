// ㅇㅇ
const comma = require("comma-number");
const schema = require("../models/도박");
const { SlashCommandBuilder } = require("@discordjs/builders");

module.exports = {
  data: new SlashCommandBuilder()
    .setName("겟코인")
    .setDescription("MKC를 채굴합니다"),

  async execute(interaction) {
    if (interaction.channelId !== "1087779685666144266") return;

    const t = new Date();
    const hours =
      "" + t.getFullYear() + t.getMonth() + t.getDate() + t.getHours();

    const ehqkrduqn = await schema.findOne({
      userid: interaction.user.id,
    });
    if (!ehqkrduqn) {
      let newData = new schema({
        money: parseInt(100),
        userid: interaction.user.id,
        hour: hours,
      });
      newData.save();
      interaction.reply({
        embeds: [
          new (require("discord.js").MessageEmbed)()
            .setTitle("채굴 완료")
            .setDescription(`**100MKC 채굴 완료**`)
            .setColor("GREEN")
            .setFooter("Made by 애쉬"),
        ],
        ephemeral: true,
      });
    } else {
      if (ehqkrduqn.hour == hours)
        return interaction.reply({
          embeds: [
            new (require("discord.js").MessageEmbed)()
              .setTitle("채굴 완료")
              .setDescription(`**1시간마다 채굴이 가능합니다**`)
              .setThumbnail(
                interaction.member.user.displayAvatarURL({ dynamic: true })
              )

              .setFooter("Made by 애쉬"),
          ],
          ephemeral: true,
        });

      //("**1시간마다 채굴이 가능하니 잠시 후 다시 시도해 주세요!**")
      const money = parseInt(ehqkrduqn.money);
      await schema.findOneAndUpdate(
        { userid: interaction.user.id },
        {
          money: money + 100,
          userid: interaction.user.id,
          hour: hours,
        }
      );
      const f = money + 100;
      //return interaction.reply(`**10MKC를 에어드랍 해드렸습니다. \n현재보유수량 : ${comma(f)}MKC**`)
      return interaction.reply({
        embeds: [
          new (require("discord.js").MessageEmbed)()
            .setTitle("겟코인 완료")
            .setDescription(
              `**100MKC를 채굴하셨습니다. \n현재보유수량 : ${comma(f)}MKC**`
            )
            .setThumbnail(
              interaction.member.user.displayAvatarURL({ dynamic: true })
            )
            .setColor("#2F3136"),
        ],
        ephemeral: true,
      });
    }
  },
};
