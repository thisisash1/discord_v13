const client = require("../index")
const comma = require('comma-number')
const Schema = require("../models/도박")

module.exports = {
    name: "콩즈월렛",
    async execute(message, args){
        if(message.channel.id !== '1080046448923660319') return
        const user = message.mentions.users.first() || client.users.cache.get(args[0]) || message.author
        const wjdqh = await Schema.findOne({ userid: user.id })
        if (!wjdqh) return message.reply("**ERROR) 등록되지 않은 유저입니다.**")
        const t = new Date()
        const date = "" + t.getFullYear() + t.getMonth() + t.getDate();
        let i
        if (wjdqh.date == date) i = "채굴 완료"
        else i = "채굴 가능"
        const embed = new (require("discord.js")).MessageEmbed()
            .setTitle(`${user.tag || user.user.tag}님의 KONGZ WALLET`)
            .addFields({ name: `보유수량 : **${comma(wjdqh.money)}MKC**`, value: `\u200b` }
            )
            .addFields({name: `금일 채굴여부 : **${i}**`, value: `\u200b`})
            .setThumbnail(user.displayAvatarURL())
            .setColor("YELLOW")
            .setFooter('Made by 애쉬');
        message.channel.send({ embeds: [embed] })
        
    }
}