const { MessageEmbed } = require("discord.js");
const ms = require("ms");
module.exports = {
  name: "start",
  description: "Egy nyereményjáték",
  usage: "<idő> <szoba> <nyeremény>",
  category: "fun",
  run: async (bot, message, args) => {
    if (!args[0]) return message.channel.send(`❌Nem írtál időt a nyereményjátékhoz!❌`);
    if (
      !args[0].endsWith("d") &&
      !args[0].endsWith("h") &&
      !args[0].endsWith("m")
    )
      return message.channel.send(`❌HIBA:Nem jól írtad az időt!❌`);
    if (isNaN(args[0][0])) return message.channel.send(`❌Ez nem egy szám!❌`);
    let channel = message.mentions.channels.first();
    if (!channel)
      return message.channel.send(`❌Nem találom a szobát ahol a nyereményjátékot akarod indítani a szerveren!❌`);
    let prize = args.slice(2).join(" ");
    if (!prize) return message.channel.send(`❌Nincs megadva nyeremény!❌`);
    message.channel.send(`🎉*Nyereményjáték elkészítve itt: ${channel}*🎉`);
    let Embed = new MessageEmbed()
      .setTitle(`🎉Új nyereményjáték!🎉`)
      .setDescription(`🎉A felhasználó ${message.author} létrehozott egy nyereményjátékot és a nyeremény nem más mint: **${prize}**🎉`)
      .setTimestamp(Date.now() + ms(args[0]))
      .setColor(`BLUE`)
      .setFooter("[HUN] Gamer Community");
    let m = await channel.send(Embed);
    m.react(":tada:");
    setTimeout(() => {
      if (m.reactions.cache.get(":tada:").count <= 1) {
        message.channel.send(`🎉Reagálj erre hogy részt vegyél a nyereményjátékban!: ${m.reactions.cache.get("🎉").count}`);
        return message.channel.send(`🎉Nem reagált elég ember hogy kiválasszam a győztest!🎉`);
      }

      let winner = m.reactions.cache
        .get(":tada:")
        .users.cache.filter((u) => !u.bot)
        .random();
      channel.send(`🎉A győztes a ebben nyereményjátékban: **${prize}**🎉\n🎉Nem más mint... ${winner}🎉\n🎉Gratulálok!🎉`);
    }, ms(args[0]));
  },
};