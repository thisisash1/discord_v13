// ㅇㅇ
const comma = require("comma-number")

module.exports = {
    name: "겟코인",
    async execute(message,args){
        
        
        const t = new Date()
        const hours = "" + t.getFullYear() + t.getMonth() + t.getDate()+ t.getHours();
        const schema = require("../models/도박")
        const ehqkrduqn = await schema.findOne({
            userid: message.author.id
        })
        if (!ehqkrduqn) {
            let newData = new schema({
                money: parseInt(1000),
                userid: message.author.id,
                hour: hours,
            })
            newData.save()
            message.channel.send("**GET COIN! 10MKC 채굴 완료**")
        } else {
            if (ehqkrduqn.hour == hours) return message.channel.send("**1시간마다 채굴이 가능하니 잠시 후 다시 시도해 주세요!**")
            const money = parseInt(ehqkrduqn.money)
            await schema.findOneAndUpdate({ userid: message.author.id }, {
                money: money + 1000,
                userid: message.author.id,
                hour: hours,
            })
            const f = money + 1000
            message.channel.send(`**10MKC를 에어드랍 해드렸습니다. \n현재보유수량 : ${comma(f)}MKC**`)
        }
    }
}