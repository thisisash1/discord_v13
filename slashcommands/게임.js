const Schema = require("../models/도박");
const comma = require("comma-number");
const { SlashCommandBuilder } = require("@discordjs/builders");
const cooldown = new Set();

function rand(min, max) {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

module.exports = {
  data: new SlashCommandBuilder()
    .setName("매수")
    .setDescription("해당 명령어로는 도박을 할 수 있어요!")
    .addSubcommand((subcommand) =>
      subcommand
        .setName("토큰")
        .setDescription("MKC 매수")
        .addIntegerOption((f) =>
          f
            .setName("수량")
            .setDescription("매수하실 수량을 입력해 주세요")
            .setRequired(true)
            .setMinValue(10)
        )
    )
    .addSubcommand((subcommand) =>
      subcommand
        .setName("레버리지")
        .setDescription("MKC 1.5배 매수")
        .addIntegerOption((f) =>
          f
            .setName("수량")
            .setDescription("매수하실 수량을 입력해 주세요")
            .setRequired(true)
            .setMinValue(10)
        )
    )
    .addSubcommand((subcommand) =>
      subcommand
        .setName("레버리지2")
        .setDescription("MKC 2배 매수")
        .addIntegerOption((f) =>
          f
            .setName("수량")
            .setDescription("매수하실 수량을 입력해 주세요")
            .setRequired(true)
            .setMinValue(10)
        )
    )
    .addSubcommand((subcommand) =>
      subcommand.setName("풀매수").setDescription("풀매수 합니다.")
    ),
  async execute(interaction) {
    if (interaction.channelId !== "1087779685666144266") return;
    await interaction.deferReply();
    if (interaction.options.getSubcommand() === "토큰") {
      const money = interaction.options.getInteger("수량");
      const ehqkrduqn = await Schema.findOne({ userid: interaction.user.id });
      if (!ehqkrduqn)
        return interaction.editReply({
          embeds: [
            new (require("discord.js").MessageEmbed)()
              .setTitle("SYSTEM API ERROR")
              .setDescription(`등록 되지 않은 사용자입니다. [ /가입 ]`)
              .setColor("#2F3136"),
          ],
          ephemeral: true,
        });
      if (money > ehqkrduqn.money)
        return interaction.editReply({
          embeds: [
            new (require("discord.js").MessageEmbed)()
              .setTitle("SYSTEM API ERROR")
              .setDescription(
                `소유하고 있는 MKC보다 더 많은 MKC를 배팅할 수 없습니다.`
              )
              .setColor("#2F3136"),
          ],
          ephemeral: true,
        });
      const user = interaction.user;
      const wjdqh = await Schema.findOne({ userid: user.id });
      if (!wjdqh)
        return interaction.editReply({
          embeds: [
            new (require("discord.js").MessageEmbed)()
              .setTitle("SYSTEM API ERROR")
              .setDescription(`등록 되지 않은 사용자입니다.`)
              .setColor("#2F3136"),
          ],
          ephemeral: true,
        });
      const random = Math.floor(Math.random() * 101);
      if (random <= 50) {
        await Schema.findOneAndUpdate(
          { userid: user.id },
          {
            money: ehqkrduqn.money - money,
            userid: user.id,
            date: ehqkrduqn.date,
          }
        );
        const f = ehqkrduqn.money - money;
        const embed = new (require("discord.js").MessageEmbed)()
          .setTitle(`${interaction.member.user.username}님 매수 실패`)
          .setDescription(
            `**\`\`\`ansi
[0;31m청산 금액 : [0;37m-${comma(money)}MKC\n[0;31m보유 수량 : [0;37m${comma(f)}MKC\`\`\`**`
          )
          .setColor("#2F3136")
          .setThumbnail(
            interaction.member.user.displayAvatarURL({ dynamic: true })
          )
          .setFooter("Made by 애쉬");

        await interaction.editReply({ embeds: [embed] });
      } else {
        await Schema.findOneAndUpdate(
          { userid: user.id },
          {
            money: ehqkrduqn.money + money,
            userid: user.id,
            date: ehqkrduqn.date,
          }
        );

        const f = ehqkrduqn.money + money;
        const embed = new (require("discord.js").MessageEmbed)()
          .setTitle(`${interaction.member.user.username}님의 매도 성공`)
          .setDescription(
            `**\`\`\`ansi
[0;31m매도 금액 : [0;37m+${comma(money)}MKC\n[0;31m보유 수량 : [0;37m${comma(f)}MKC\`\`\`**`
          )
          .setColor("#2F3136")
          .setThumbnail(
            interaction.member.user.displayAvatarURL({ dynamic: true })
          )
          .setFooter("Made by 애쉬");

        await interaction.editReply({ embeds: [embed] });
      }
    }

    if (interaction.options.getSubcommand() === "레버리지") {
      const money = interaction.options.getInteger("수량");
      const ehqkrduqn = await Schema.findOne({ userid: interaction.user.id });
      if (!ehqkrduqn)
        return interaction.editReply({
          embeds: [
            new (require("discord.js").MessageEmbed)()
              .setTitle("SYSTEM API ERROR")
              .setDescription(`등록 되지 않은 사용자입니다. [ /가입 ]`)
              .setColor("#2F3136")
              .setFooter("Made by 애쉬"),
          ],
          ephemeral: true,
        });
      if (money > ehqkrduqn.money)
        return interaction.editReply({
          embeds: [
            new (require("discord.js").MessageEmbed)()
              .setTitle("SYSTEM API ERROR")
              .setDescription(
                `소유하고 있는 MKC보다 더 큰 금액을 배팅할 수 없습니다.`
              )
              .setColor("#2F3136")
              .setFooter("Made by 애쉬"),
          ],
          ephemeral: true,
        });
      const user = interaction.user;
      const wjdqh = await Schema.findOne({ userid: user.id });
      if (!wjdqh)
        return interaction.editReply({
          embeds: [
            new (require("discord.js").MessageEmbed)()
              .setTitle("SYSTEM API ERROR")
              .setDescription(`등록 되지 않은 사용자입니다.`)
              .setColor("#2F3136")
              .setFooter("Made by 애쉬"),
          ],
          ephemeral: true,
        });

      const random = Math.floor(Math.random() * 101);
      if (random < 70) {
        await Schema.findOneAndUpdate(
          { userid: user.id },
          {
            money: ehqkrduqn.money - money * 1.5,
            userid: user.id,
            date: ehqkrduqn.date,
          }
        );
        const f = ehqkrduqn.money - money * 1.5;
        const embed = new (require("discord.js").MessageEmbed)()
          .setTitle(`${interaction.member.user.username}님 매수 실패`)
          .setDescription(
            `**\`\`\`ansi
[0;31m청산 금액 : [0;37m-${comma(money * 1.5)}MKC\n[0;31m보유 수량 : [0;37m${comma(f)}MKC\`\`\`**`
          )
          .setColor("#2F3136")
          .setThumbnail(
            interaction.member.user.displayAvatarURL({ dynamic: true })
          )
          .setFooter("Made by 애쉬");
        setTimeout(() => interaction.editReply({ embeds: [embed] }), 100);
      } else {
        await Schema.findOneAndUpdate(
          { userid: user.id },
          {
            money: ehqkrduqn.money + money * 1.5,
            userid: user.id,
            date: ehqkrduqn.date,
          }
        );

        const f = ehqkrduqn.money + money * 1.5;
        const embed = new (require("discord.js").MessageEmbed)()
          .setTitle(`${interaction.member.user.username}님 매도 성공`)
          .setDescription(
            `**\`\`\`ansi
[0;31m매도 금액 : [0;37m+${comma(money * 1.5)}MKC\n[0;31m보유 수량 : [0;37m${comma(f)}MKC\`\`\`**`
          )
          .setColor("#2F3136")
          .setThumbnail(
            interaction.member.user.displayAvatarURL({ dynamic: true })
          )
          .setFooter("Made by 애쉬");
        setTimeout(() => interaction.editReply({ embeds: [embed] }), 100);
      }
    }

    if (interaction.options.getSubcommand() === "레버리지2") {
      const money = interaction.options.getInteger("수량");
      const ehqkrduqn = await Schema.findOne({ userid: interaction.user.id });
      if (!ehqkrduqn)
        return interaction.editReply({
          embeds: [
            new (require("discord.js").MessageEmbed)()
              .setTitle("SYSTEM API ERROR")
              .setDescription(`등록 되지 않은 사용자입니다. [ /가입 ]`)
              .setColor("#2F3136")
              .setFooter("Made by 애쉬"),
          ],
          ephemeral: true,
        });
      if (money > ehqkrduqn.money)
        return interaction.editReply({
          embeds: [
            new (require("discord.js").MessageEmbed)()
              .setTitle("SYSTEM API ERROR")
              .setDescription(
                `소유하고 있는 머니보다 더 큰 금액을 배팅할 수 없습니다.`
              )
              .setColor("#2F3136")
              .setFooter("Made by 애쉬"),
          ],
          ephemeral: true,
        });
      const user = interaction.user;
      const wjdqh = await Schema.findOne({ userid: user.id });
      if (!wjdqh)
        return interaction.editReply({
          embeds: [
            new (require("discord.js").MessageEmbed)()
              .setTitle("SYSTEM API ERROR")
              .setDescription(`등록 되지 않은 사용자입니다.`)
              .setColor("#2F3136")
              .setFooter("Made by 애쉬"),
          ],
          ephemeral: true,
        });

      const random = Math.floor(Math.random() * 101);
      if (random < 90) {
        await Schema.findOneAndUpdate(
          { userid: user.id },
          {
            money: ehqkrduqn.money - money * 2,
            userid: user.id,
            date: ehqkrduqn.date,
          }
        );
        const f = ehqkrduqn.money - money * 2;
        const embed = new (require("discord.js").MessageEmbed)()
          .setTitle(`${interaction.member.user.username}님 매수 실패`)
          .setDescription(
            `**\`\`\`ansi
[0;31m청산 금액 : [0;37m-${comma(money * 2)}MKC\n[0;31m보유 수량 : [0;37m${comma(f)}MKC\`\`\`**`
          )
          .setColor("#2F3136")
          .setThumbnail(
            interaction.member.user.displayAvatarURL({ dynamic: true })
          )
          .setFooter("Made by 애쉬");
        await interaction.editReply({ embeds: [embed] });
      } else {
        await Schema.findOneAndUpdate(
          { userid: user.id },
          {
            money: ehqkrduqn.money + money * 2,
            userid: user.id,
            date: ehqkrduqn.date,
          }
        );

        const f = ehqkrduqn.money + money * 2;
        const embed = new (require("discord.js").MessageEmbed)()
          .setTitle(`${interaction.member.user.username} 매도 성공`)
          .setDescription(
            `**\`\`\`ansi
[0;31m매도 금액 : [0;37m+${comma(money * 2)}MKC\n[0;31m보유 수량 : [0;37m${comma(f)}MKC\`\`\`**`
          )
          .setColor("#2F3136")
          .setThumbnail(
            interaction.member.user.displayAvatarURL({ dynamic: true })
          )
          .setFooter("Made by 애쉬");
        await interaction.editReply({ embeds: [embed] });
      }
    }
    if (interaction.options.getSubcommand() === "풀매수") {
      const ehqkrduqn = await Schema.findOne({
        userid: interaction.user.id,
      });
      if (!ehqkrduqn)
        return interaction.editReply({
          embeds: [
            new (require("discord.js").MessageEmbed)()
              .setTitle("SYSTEM API ERROR")
              .setDescription(`등록 되지 않은 사용자입니다. [ /가입 ]`)
              .setColor("#2F3136"),
          ],
        });

      if (1 > ehqkrduqn.money)
        return interaction.editReply({
          embeds: [
            new (require("discord.js").MessageEmbed)()
              .setTitle("SYSTEM API ERROR")
              .setDescription(
                `소유하고 있는 머니보다 더 큰 금액을 배팅할 수 없습니다.`
              )
              .setColor("#2F3136")
              .setFooter("Made by 애쉬"),
          ],
        });
      const user = interaction.user;
      const wjdqh = await Schema.findOne({ userid: user.id });
      if (!wjdqh)
        return interaction.editReply({
          embeds: [
            new (require("discord.js").MessageEmbed)()
              .setTitle("SYSTEM API ERROR")
              .setDescription(`등록 되지 않은 사용자입니다.`)
              .setColor("#2F3136"),
          ],
        });
      if (cooldown.has(interaction.user.id)) {
        return interaction.editReply({
          embeds: [
            new (require("discord.js").MessageEmbed)()
              .setTitle("SYSTEM API ERROR")
              .setDescription(`이미 올인을 시도 하였습니다. [ 쿨타임 1분 ]`)
              .setColor("#2F3136"),
          ],
          content: " ",
        });
      } else {
        cooldown.add(interaction.user.id);
        setTimeout(() => {
          cooldown.delete(interaction.user.id);
        }, 60000);
      }
      var money = ehqkrduqn.money;
      const random = Math.floor(Math.random() * 101);
      if (random < 50) {
        await Schema.findOneAndUpdate(
          { userid: interaction.user.id },
          {
            money: ehqkrduqn.money - money,
            userid: interaction.user.id,
            date: ehqkrduqn.date,
          }
        );
        const f = ehqkrduqn.money - money;
        const embed = new (require("discord.js").MessageEmbed)()
          .setTitle(`${interaction.user.username}님의 올인 실패`)
          .setDescription(
            `**\`\`\`ansi
[0;31m금액회수 완료 : [0;37m-${comma(money)}MKC\n[0;31m현재잔액 : [0;37m${comma(f)}MKC\`\`\`**`
          )
          .setColor("#2F3136")
          .setThumbnail(interaction.user.displayAvatarURL({ dynamic: true }))
          .setFooter("Made by 애쉬");
        interaction.editReply({ embeds: [embed] });
      } else {
        await Schema.findOneAndUpdate(
          { userid: interaction.user.id },
          {
            money: ehqkrduqn.money + money,
            userid: interaction.user.id,
            date: ehqkrduqn.date,
          }
        );

        const f = ehqkrduqn.money + money;
        const embed = new (require("discord.js").MessageEmbed)()
          .setTitle(`${interaction.user.username}님의 올인 성공`)
          .setDescription(
            `**\`\`\`ansi
[0;31m금액지급 완료 : [0;37m+${comma(money)}MKC\n[0;31m현재잔액 : [0;37m${comma(f)}MKC\`\`\`**`
          )
          .setColor("#2F3136")
          .setThumbnail(interaction.user.displayAvatarURL({ dynamic: true }))
          .setFooter("Made by 애쉬");
        interaction.editReply({ embeds: [embed] });
      }
    }
  },
};
