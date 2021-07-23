const Discord = require("discord.js");
const superagent = require(`superagent`);
const randomPuppy = require(`random-puppy`)
module.exports = {
    name: "dogggggg",
    category: "fun",
    description: "Lekér egy cuki kutyát! :D",
    run: async (bot, message, args) => {
            let prefix = "?"

            let msg = await message.channel.send("*Kutya betöltése...*")

            let {body} = await superagent
            .get(`https://random.dog/woof.json`)

            if(!{body}) return message.channel.send("A file betöltésekor hiba lépett fel!")

            let dogEmbed = new Discord.MessageEmbed()
            .setColor("RANDOM")
            .addField("Ugye milyen cuki?", ":3")
            .setImage(body.file)
            .setTimestamp(message.createdAt)
            .setFooter("[HUN] Gamer Community")

            message.channel.send(dogEmbed)

    }
}