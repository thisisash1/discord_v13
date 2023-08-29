const { MessageEmbed } = require("discord.js");

const Schema = require("../models/도박");
const comma = require("comma-number");

module.exports = {
  name: "매수",
  async execute(message,args){
    if(message.channel.id !== '1080046448923660319') return
    const user = message.author;

    const ehqkrduqn = await Schema.findOne({
      userid: user.id,
    });

    if (!ehqkrduqn) {
      return message.reply({
        content: "/겟코인 으로 콩즈낸스에 먼저 가입해 주세요!**",
      });
    }

    if (isNaN(args[0])) {
      return message.reply({ content: "매수 하실 금액을 입력해 주세요.**" });
    }

    let money = parseInt(args[0]);

    if (money < 1) {
      return message.reply({ content: "**최소 매수금액은 1MKC입니다.**" });
    }

    if (money > ehqkrduqn.money) {
      return message.reply({
        content: "**보유하신 MKC보다 많은 토큰을 매수할 순 없습니다.**",
      });
    }

    const random = Math.floor(Math.random() * 101);

    let embed;

    if (random < 50) {
      embed = new MessageEmbed()
        .setTitle("숏! 청산 당하셨습니다.")
        .addFields({
          name: "청산 금액",
          value: `${comma(money)}MKC`,
          
        })
        .setColor("RED")
        .setThumbnail(user.displayAvatarURL())
        .setFooter('Made by 애쉬');
      money = -money;
    } else {
      embed = new MessageEmbed()
        .setTitle("롱! 매도 성공!")
        .addFields({
          name: "매도 금액",
          value: `${comma(money)}MKC`,
        })
        .setColor("GREEN")
        .setThumbnail(user.displayAvatarURL())
        .setFooter('Made by 애쉬');
    }

    await Schema.findOneAndUpdate(
      { userid: user.id },
      {
        $inc: {
          money,
        },
        date: new Date(),
      }
    );

    message.reply({ embeds: [embed] });
  },
};