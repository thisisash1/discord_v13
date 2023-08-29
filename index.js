const { Client, Intents, Collection, Interaction } = require("discord.js");
const client = new Client({ intents: 32767 });
module.exports = client;
const fs = require("fs");
const { prefix, token } = require("./config.json");

const mongoose = require("mongoose");
const { collection } = require("./models/도박");

mongoose.set("strictQuery", false);
mongoose.connect("MONGO HERE", {}).then(console.log("db connect"));

client.once("ready", () => {
  let number = 0;
  setInterval(() => {
    const list = ["THE METAKONGZ FOREVER"];
    if (number == list.length) number = 0;
    client.user.setActivity(list[number], {
      type: "PLAYING",
    });
    number++;
  }); //몇초마다 상태메세지를 바꿀지 정해주세요 (1000 = 1초)
  console.log("봇이 준비되었습니다");
});

const { REST } = require("@discordjs/rest");
const { Routes } = require("discord-api-types/v9");

// 슬래시 커맨드 핸들러
client.on("ready", async () => {
  const rest = new REST({ version: "9" }).setToken(token);

  await rest
    .put(Routes.applicationCommands(client.user.id), {
      body: commands,
    })
    .then(() => {
      console.log("Slashcommands Update Complete [ 슬래시커맨드 ]"); // 슬래시커맨드 등록 완료
    })
    .catch(console.error);
});

// 슬래시 커맨드 핸들러
client.slashcommands = new Collection();
let commands = [];
const commandsfile1 = fs
  .readdirSync("./slashcommands")
  .filter((file) => file.endsWith(".js"));
for (const file of commandsfile1) {
  const command = require(`./slashcommands/${file}`);
  client.slashcommands.set(command.data.name, command);
  commands.push(command.data.toJSON());
}

// 슬래시 커맨드 핸들러
client.on("interactionCreate", async (interaction) => {
  if (!interaction.isCommand()) return;

  const command = client.slashcommands.get(interaction.commandName);

  if (!command) return;

  try {
    await command.execute(interaction, client);
  } catch (error) {
    console.error(error);
    await interaction.reply({
      content: "There was an error while executing this command!",
      ephemeral: true,
    });
  }
});

// 슬래시 커맨드 에러
process.on("unhandledRejection", (err) => {
  if (err == "DiscordAPIError: Missing Access")
    return console.log(
      "봇에게 슬래쉬 커맨드를 서버에 푸쉬 할 권한이 없어서 서버에 슬래쉬 커맨드를 푸쉬하지 못하였습니다."
    );
  console.error(err);
});
client.once("ready", () => {
  console.log("봇이 준비되었습니다");
});

client.on("messageCreate", (message) => {
  if (message.content == "핑") {
    message.reply("퐁");
  }
});

client.commands = new Collection();

const commandsfile = fs
  .readdirSync("./commands")
  .filter((file) => file.endsWith(".js"));

for (const file of commandsfile) {
  const command = require(`./commands/${file}`);
  client.commands.set(command.name, command);
}

client.on("messageCreate", (message) => {
  if (!message.content.startsWith(prefix)) return;
  const args = message.content.slice(prefix.length).trim().split(/ +/);
  const commandName = args.shift();
  const command = client.commands.get(commandName);
  if (!command) return;
  try {
    command.execute(message, args);
  } catch (error) {
    console.error(error);
  }
});

client.login("TOKEN HERE");
