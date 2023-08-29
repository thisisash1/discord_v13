const Schema = require("../models/도박");
const client = require("../index");
const comma = require("comma-number");

module.exports = {
  name: "콩즈스캔",
  execute(message) {
    Schema.find()
      .sort([["money", "descending"]])
      .limit(10)
      .exec((error, res) => {
        const embed = new (require("discord.js").MessageEmbed)()
          .setTitle("MKC AMOUNT")
          .setColor("BLUE")
          .setFooter("Made by 애쉬");
        for (let i = 0; i < res.length; i++) {
          let searchuser = client.users.cache.get(res[i].userid);
          const user = searchuser || "Delete User";

          embed.addField(
            `${i + 1}. @${user.tag || user}`,
            `${comma(res[i].money)}MKC`
          ); //몰라요
        }
        message.channel.send({ embeds: [embed] }); // 채널에 임베드를 전송
      });
  },
};
