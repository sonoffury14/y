const Discord = require("discord.js");
const tokenfile = require("./tokenfile.json");
const botconfig = require("./botconfig.json");
const bot = new Discord.Client({disableEveryone: true});
var weather = require(`weather-js`);
const money = require("./money.json")
const { Player, Queue } = require("discord-player")
const player = new Player(bot);
const DisTube = require("distube");
const distube = new DisTube(bot, { searchSongs: true});
const fs = require("fs");
const ms = require("ms");
const { error } = require("console");
const { attachCookies } = require("superagent");
const mongoose = require("mongoose")
const superagent = require("superagent")

bot.player = player;
bot.player.on("trackStart", (message, track) => message.channel.send(`Most megy: ${track.title}`))
bot.player.on("trackAdd", (message, track, Queue) => message.channel.send(`${message.content.split(" ").slice(1).join(" ")} hozzá lett adva a várólistához!`))


bot.commands = new Discord.Collection();
bot.aliases = new Discord.Collection();

bot.categories = fs.readdirSync("./commands/");

["command"].forEach(handler => {
    require(`./handlers/${handler}`)(bot)
});

bot.on("message", async message => {
    let prefix = botconfig.prefix;

    if(message.author.bot) return;
    if(!message.guild) return;
    if(!message.content.startsWith(prefix)) return;
    if(!message.member) message.member = await message.guild.fetchMember(message)

    const args = message.content.slice(prefix.length).trim().split(/ +/g);
    const cmd = args.shift().toLowerCase();

    if(cmd.length === 0) return;

    let command = bot.commands.get(cmd);
    if(!command) command = bot.commands.get(bot.aliases.get(cmd));

    if(command)
    command.run(bot, message, args);
});

let botname = "[HUN] Gamer Community bot"

bot.on("ready", async() => {
     console.log(`${bot.user.username} Elindult!`)

     let státuszok = [
         "Prefix: ?",
         "Készítő: Son of Fury",
         "[HUN] Gamer Community bot",
         "Csatlakozz a szerverhez: https://discord.gg/tnENFEfuvJ"
     ]

     setInterval(function() {
        let status = státuszok[Math.floor(Math.random()* státuszok.length)]

        bot.user.setActivity(status, {type: "WATCHING"})
     }, 3000)
})

bot.on("message", async (message) => {
    let MessageArray = message.content.split(" ");
    let cmd = MessageArray[0];
    let args = MessageArray.slice(1);
    let prefix = botconfig.prefix;

    if(cmd === `${prefix}készül`){
        message.channel.send("A bot még készülőben van, amint készen van jelezni fogjuk! Készítő: Son of Fury");
    }

    if(cmd === `${prefix}botinfo`){
        let infoEmbed = new Discord.MessageEmbed()
        .setColor("RED")
        .setTitle("Bot információk:")
        .addField("A botot készítette:", "Son of Fury")
        .addField("A botot tesztelte:", "Aklime, Son of Fury, KBence")
        .addField("A bot help parancsa:", "?help")
        .setThumbnail(message.author.displayAvatarURL())
        .setDescription(`Prefix: \`${prefix}\``)
        .setFooter("[HUN] Gamer Community | Készítő: Son of Fury")
        .setTimestamp()

        message.channel.send(infoEmbed)

    }

    if(cmd === `${prefix}help`){
        let helpEmbed = new Discord.MessageEmbed()
        .setColor("RED")
        .setTitle("Bot Parancsai:")
        .addField("Moderáció Parancsok:", "?ban, ?kick, ?report, ?mute, ?warn, ?clear" )
        .addField("Economy Parancsok:", "?bal, ?daily, ?bolt, ?lb, ?pay, ?work, ?slot")
        .addField("Fun Parancsok:","?meme, ?cica, ?kutya, ?ship, ?számológép, ?szavazás, ?nyereményjáték, ?8ball")
        .addField("Egyéb Parancsok:", "?weather, ?szavazás, ?teszt, ?este, ?reggel, ?nappal, ?alkohol, ?drog")
        .setThumbnail(message.author.displayAvatarURL())
        .setDescription(`Prefix: \`${prefix}\``)
        .setFooter("[HUN] Gamer Community | Készítő: Son of Fury")
        .setTimestamp()

        message.channel.send(helpEmbed)

    }

    if(cmd === `${prefix}este`){
        let esteEmbed = new Discord.MessageEmbed()
        .setColor("BLUE")
        .setTitle("🌃Este van gyerekek!🌃")
        .addField("🌃Mindenkinek kellemes, szép estét!🌃", "🌃Álmodjátok ki magatokat holnap reméljük jó nap lesz!🌃")
        .setThumbnail(message.author.displayAvatarURL())
        .setFooter("[HUN] Gamer Community | Készítő: Son of Fury")
        .setTimestamp()

        message.channel.send(esteEmbed)
    }

    if(cmd === `${prefix}reggel`){
        let reggelEmbed = new Discord.MessageEmbed()
        .setColor("YELLOW")
        .setTitle("🌆Reggel van gyerekek!🌆")
        .addField("🌆Mindenkinek kellemes, szép reggelt!🌆", "🌆Remélem mindenki jól fogja érezni magát!🌆")
        .setThumbnail(message.author.displayAvatarURL())
        .setFooter("[HUN] Gamer Community | Készítő: Son of Fury")
        .setTimestamp()

        message.channel.send(reggelEmbed)
    }

    if(cmd === `${prefix}nappal`){
        let nappalEmbed = new Discord.MessageEmbed()
        .setColor("ORANGE")
        .setTitle("🌇Nappal van gyerekek!🌇")
        .addField("🌇Mindenkinek kellemes, szép napot!🌇", "🌇Remélem mindenki jól érzi magát!🌇")
        .setThumbnail(message.author.displayAvatarURL())
        .setFooter("[HUN] Gamer Community | Készítő: Son of Fury")
        .setTimestamp()

        message.channel.send(nappalEmbed)
    }

    if(cmd === `${prefix}alkohol`){
        let alkoholEmbed = new Discord.MessageEmbed()
        .setColor("GREEN")
        .setTitle("🍷Ne igyatok alkoholt az rossz!🍷")
        .addField("☠️Tönkreteszi a tüdőt!☠️")
        .setThumbnail(message.author.displayAvatarURL())
        .setFooter("[HUN] Gamer Community | Készítő: Son of Fury")
        .setTimestamp()

        message.channel.send(alkoholEmbed)
    }

    if(cmd === `${prefix}drog`){
        let reggelEmbed = new Discord.MessageEmbed()
        .setColor("YELLOW")
        .setTitle("💊Ne drogozzatok!💊")
        .addField("☠️Tönkreteszi a szervezetedet!☠️")
        .setThumbnail(message.author.displayAvatarURL())
        .setFooter("[HUN] Gamer Community | Készítő: Son of Fury")
        .setTimestamp()

        message.channel.send(reggelEmbed)
    }

    if(cmd === `${prefix}report`){
        let reportEmbed = new Discord.MessageEmbed()
        .setColor("WHITE")
        .setTitle("📄Report📄")
        .addField("\`A report Kevesebb mint 24 órán belül elbírálásra kerül! Ha a report csak hülyeségből lett létrehozva akkor töröljük a reportot és szankcionáljuk az illetőt! Ha a report csak véletlen volt akkor nem szankcionálunk de figyelmeztetést adunk!\`", "Köszönjük reportod!")
        .setThumbnail(message.author.displayAvatarURL())
        .setFooter("[HUN] Gamer Community | Készítő: Son of Fury")
        .setTimestamp()

        message.channel.send(reportEmbed)
    }

////////////////|| ECONOMY ||///////////////////// 

if(!money[message.author.id]) {
    money[message.author.id] = {
        money: 1000,
        user_id: message.author.id

    };
}
fs.writeFile("./money.json", JSON.stringify(money), (err) => {
    if(err) console.log(err);
});
let selfMoney = money[message.author.id].money
    if(cmd === `${prefix}bal`){ //EGYENLEG LEKÉRDEZÉS
        let profkep = message.author.displayAvatarURL();
        let balanceEmbed = new Discord.MessageEmbed() //EGYENLEG EMBED KIKÜLDÉSE
        .setAuthor(message.author.username)
        .setColor("#fcdb03")
        .addField("A te egyenleged:", `${selfMoney} FT`)
        .setImage(message.guild.iconURL())
        .setFooter("[HUN] Gamer Community | Egyenleg lekérdezés | Készítő: Son of Fury")
        message.channel.send(balanceEmbed)
    }

if(cmd === `${prefix}daily`){
    let cd_role_id = "861990644623736872";
let cooldown_time = "86400"; //mp

if(message.member.roles.cache.has(cd_role_id)) return message.reply(`Ezt a parancsot ${cooldown_time} másodpercenként (24 óra) használhatod!`)

message.member.roles.add(cd_role_id)
    message.channel.send("Itt a napi ajándékod amit egy bokor alatt találtál: 1500 FT")

    money[message.author.id] = {
        money: selfMoney + 1500,
        user_id: message.author.id
    }
}

if(message.guild){
    let drop_money = Math.floor(Math.random()*50 + 1)
    let random_money = Math.floor(Math.random()*900 + 1)

    if(drop_money === 2){
        let üzenetek = ["Kiraboltál egy csövest.", "Elloptál egy biciklit!", "Kiraboltál egy boltot!"]
        let random_üzenet_szam = Math.floor(Math.random()*üzenetek.length)

        let DropMoneyEmbed = new Discord.MessageEmbed()
        .setAuthor(message.author.username)
        .addField("Szerencséd volt!", `${üzenetek[random_üzenet_szam]} Ezért kaptál: ${random_money}FT-ot!`)
        .setColor("RANDOM")
        .setThumbnail(message.author.displayAvatarURL())
        .setFooter("[HUN] Gamer Community | szerencse | Készítő: Son of Fury")
        message.channel.get(DropMonexEmbed);
        message.channel.get(DropMonexEmbed).then(m => m.delete({ timeout: 5000}))

        money[message.author.id] = {
            money: selfMoney + 600,
            user_id: message.author.id
        }

    }
}

if(cmd === `${prefix}bolt`){
    let ShopEmbed = new Discord.MessageEmbed()
        .setAuthor(message.author.username)
        .addField("?vasarol-bicikli", "(ÁR: 3000FT)")
        .setDescription(`Bolt`)
        .addField("?vasarol-autó", "(ÁR: 25000FT)")
        .setColor("RANDOM")
        .setFooter("[HUN] Gamer Community | bolt | Készítő: Son of Fury")
        .setThumbnail(bot.user.displayAvatarURL())

        message.channel.send(ShopEmbed);
}


if(cmd === `${prefix}vasarol-bicikli`){
    let biciklirang_id = "859043002453327882"

    let price = "3000";
    if(message.member.roles.cache.has(biciklirang_id)) return message.reply("*Ezt a rangot már megvetted!*");
    if(selfMoney < price) return message.reply(`Erre a rangra nincs pénzed! Egyenleged: ${selfMoney}FT.`)

    money[message.author.id] = {
        money: selfMoney - parseInt(price),
        user_id: message.author.id
    }

    message.guild.member(message.author.id).roles.add(biciklirang_id);

    message.reply("**Köszönöm a vásárlást! További szép napot!**")

}

if(cmd === `${prefix}vasarol-autó`){
    let autórang_id = "858724540435791903"

    let price = "25000";
    if(message.member.roles.cache.has(autórang_id)) return message.reply("*Ezt a rangot már megvetted!*");
    if(selfMoney < price) return message.reply(`Erre a rangra nincs pénzed! Egyenleged: ${selfMoney}FT.`)

    money[message.author.id] = {
        money: selfMoney - parseInt(price),
        user_id: message.author.id
    }

    message.guild.member(message.author.id).roles.add(autórang_id);

    message.reply("**Köszönöm a vásárlást! További szép napot!**")

}

if(cmd === `${prefix}slot`){
    let min_money = 50;
    if(selfMoney < min_money) return message.reply(`Túl kevés pénzed van! (Minimum ${min_money}FT-nak kell lennie a számládon!) Egyenleged: ${selfMoney}.`)

    let tét = Math.round(args[0] *100)/100
    if(isNaN(tét)) return message.reply("Kérlek adj meg egy összeget! (Pl: 50)")
    if(tét > selfMoney) return message.reply("Az egyenlegednél több pénzt nem rakhatsz fel a slotra!")

    let slots = ["🍌", "🍎", "🍍", "🥒", "🍇"]
    let result1 = Math.floor(Math.random() * slots.length)
    let result2 = Math.floor(Math.random() * slots.length)
    let result3 = Math.floor(Math.random() * slots.length)

    if(slots[result1] === slots[result2] && slots[result3]){
        let wEmbed = new Discord.MessageEmbed()
        .setTitle('🎉 Szerencse játék | slot machine 🎉')
        .addField(message.author.username, `Nyertél! Ennyit kaptál: ${tét*1.6}ft.`)
        .addField("Eredmény:", slots[result1] + slots[result2] + slots[result3])
        .setColor("RANDOM")
        .setTimestamp(message.createdAt)
        .setFooter("[HUN] Gamer Community | Készítő: Son of Fury")
        message.channel.send(wEmbed)

        money[message.author.id] = {
            money: selfMoney + tét*1.6,
            user_id: message.author.id
        }
    } else {
        let wEmbed = new Discord.MessageEmbed()
        .setTitle('🎉 Szerencse játék | slot machine 🎉')
        .addField(message.author.username, `Vesztettél! Ennyit buktál: ${tét}ft.`)
        .addField("Eredmény:", slots[result1] + slots[result2] + slots[result3])
        .setColor("RANDOM")
        .setTimestamp(message.createdAt)
        .setFooter("[HUN] Gamer Community | Készítő: Son of Fury")
        message.channel.send(wEmbed)

        money[message.author.id] = {
            money: selfMoney - tét,
            user_id: message.author.id
        }
    }
}


if(cmd === `${prefix}lb`){
    let toplist = Object.entries(money)
    .map(v => `${v[1].money}FT <@${v[1].user_id}>`)
    .sort((a, b) => b.split("FT")[0] - a.split("FT")[0])
    .slice(0, 10)

    let LbEmbed = new Discord.MessageEmbed()
    .setTitle("Leaderboard")
    .setColor("RANDOM")
    .addField("Pénz top lista | TOP10", toplist, true)
    .setTimestamp(message.createdAt)
    .setFooter("[HUN] Gamer Community | Készítő: Son of Fury")
 
    message.channel.send(LbEmbed)
}

if(cmd === `${prefix}pay`){
    let pay_money = Math.round(args[0]*100)/100
    if(isNaN(pay_money)) return message.reply(`A parancs helyes használata: ${prefix}pay <összeg> <@név>`)
    if(pay_money > selfMoney) return message.reply("Az egyenlegednél több pénzt nem adhatsz meg!")

    let pay_user = message.mentions.members.first();

    if(args[1] && pay_user){
        if(!money[pay_user.id]) {
            money[pay_user.id] = {
                money: 100,
                user_id: pay_user.id
            }
        }

        money[pay_user.id] = {
            money: money[pay_user.id].money + pay_money,
            user_id: pay_user.id
        }

        money[message.author.id] = {
            money: selfMoney - pay_money,
            user_id: message.author.id
    }

    message.channel.send(`Sikeresen átutaltál <@${pay_user.id}> számlájára ${pay_money}FT-ot!`)

    fs.writeFile("./money.json", JSON.stringify(money), (err) => {
        if(err) console.log(err);
    });
} else {
    message.reply(`A parancs helyes használata: ${prefix}pay <összeg> <@név>`)
}
}

if(cmd === `${prefix}work`){
let cd_role_id = "861555616342605854";
let cooldown_time = "7200"; //mp

if(message.member.roles.cache.has(cd_role_id)) return message.reply(`Ezt a parancsot ${cooldown_time} másodpercenként (2 óra) használhatod!`)

message.member.roles.add(cd_role_id)

let üzenetek = ["Jó munkát végeztél!", "A főnököd adott egy kis borravalót!"]
let random_üzenet_szam = Math.floor(Math.random()*üzenetek.length)

let random_money = Math.floor(Math.random()*1900 +1)

let workEmbed = new Discord.MessageEmbed()
.setTitle("Munka!")
.addField(`${üzenetek[random_üzenet_szam]}`, `A számládhoz került: ${random_money}FT!`)
.setColor("RANDOM")
.setTimestamp(message.createdAt)
.setFooter("[HUN] Gamer Community | Készítő: Son of Fury")
message.channel.send(workEmbed)

money[message.author.id] = {
    money: selfMoney + random_money,
    user_id: message.author.id
}

setTimeout(() => {
message.member.roles.remove(cd_role_id)
}, 1000 * cooldown_time)
}
///////////////////|| ECONOMY ||////////////////////// 

if(cmd === `${prefix}kutya`) {
    let msg = await message.channel.send('Generálás... ')

var dog;

dog = await superagent
   .get("https://random.dog/woof.json");

while (dog.body.url.endsWith(".webm") || dog.body.url.endsWith(".mp4")) {
   dog = await superagent
       .get("https://random.dog/woof.json");
   console.log(dog.body)
}
msg.delete()
var embed = new Discord.MessageEmbed()
   .setColor("#ff0000")
   .setImage(dog.body.url)
   .addField("Ugye milyen cuki?", ":3")
   .setFooter(`[HUN] Gamer Community | Készítő: Son of Fury`)
message.channel.send(embed);
}
if(cmd === `${prefix}Kutya`) {
 let msg = await message.channel.send('Generálás... ')

var dog;

dog = await superagent
.get("https://random.dog/woof.json");

while (dog.body.url.endsWith(".webm") || dog.body.url.endsWith(".mp4")) {
dog = await superagent
    .get("https://random.dog/woof.json");
console.log(dog.body)
}
msg.delete()
var embed = new Discord.MessageEmbed()
.setColor("#ff0000")
.setImage(dog.body.url)
.addField("Ugye milyen cuki?", ":3")
.setFooter(`[HUN] Gamer Community | Készítő: Son of Fury`)
message.channel.send(embed);
}

bot.on("ready", async () => {
    const dbOptions = {
        useNewUrlParser: true,
        useUnifiedTopology: true,
        useFindAndModify: true
    }
 await mongoose.connect(` mongodb+srw://Son-of-Fury:${botconfig.dbpw}@discordbot `, dbOptions).then(
      console.log("ONLINE!")
  )
})






})

bot.login(tokenfile.token);
