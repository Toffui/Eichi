require("dotenv").config()
const Discord = require("discord.js")
const fs = require("fs")
const client = new Discord.Client()

fs.readdir("./events/", (err, files) => {
    files.forEach((file) => {
      const eventHandler = require(`./events/${file}`)
      const eventName = file.split(".")[0]
    client.on(eventName, (arg) => eventHandler(client, arg))
    })
  })

client.on("ready", () => {
  console.log(`Logged in as ${client.user.tag}!`)
})

client.on("message", (msg) => {
  if (msg.content === "ping") {
    msg.reply("Pong!")
  }
})

client.on("guildMemberAdd", (member) => {
    member.send(
      `Welcome on the server! Please be aware that we won't tolerate troll, spam or harassment. Have fun 😀`
    )
  })

  client.on("message", (message) => {
    if (message.content.startsWith("!kick")) {
      const member = message.mentions.members.first()
      if (!member) {
        return message.reply(
          `Who are you trying to kick? You must mention a user.`
        )
      }
      if (!member.kickable) {
        return message.reply(`I can't kick this user. Sorry!`)
      }
      return member
        .kick()
        .then(() => message.reply(`${member.user.tag} was kicked.`))
        .catch((error) => message.reply(`Sorry, an error occured.`))
    }
  })
  

client.login("ODI3MzE3MzAwMzU2MDU1MDk5.YGZRRw.zQryPN1doXTTYkqSM12ZcfXhCdQ")
