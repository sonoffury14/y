const Discord = require("discord.js");
module.exports = {
    name: "clear",
    catgory: "moderátor",
    description: "üzeneteket töröl",
    run: async (client, message, args) => {
        let prefix = "?"

        if(!message.member.hasPermission("MANAGE_MESSAGES")) return message.reply("Nincs Jogod Ehhez!").then(m => m.delete({ timeout: 5000}))
            
            if(!args[0]) return message.reply("Add meg hány üzenetet szeretnél törölni!").then(m => m.delete({ timeout: 5000}))
            
            if(args[0] > 100) return message.reply("Maximum 100 üzenetet törölhetek egyszerre!").then(m => m.delete({ timeout: 5000}))
            
            if(args[0] < 1) return message.reply("Nem törölhetek 0-t!").then(m => m.delete({ timeout: 5000}))
            
            if(isNaN(parseInt(args[0]))) return message.reply("Ez nem egy szám!").then(m => m.delete({ timeout: 5000}))
            
            await message.channel.messages.fetch({ limit: args[0]}).then(messages => {
                message.channel.bulkDelete(messages)
            })
            
            let embed = new Discord.MessageEmbed()
            .setTitle("Üzenetek Törölve!")
            .setDescription(`Törölve lett ${args[0]} üzenet!`)
            .setThumbnail(message.author.displayAvatarURL())
            .setFooter("[HUN] Gamer Community bot | Készítő: Son of Fury")
            .setTimestamp()
            message.channel.send(embed).then(m => m.delete({ timeout: 5000}))
        }
    }