const fs = require('fs');
const { Client, GatewayIntentBits } = require('discord.js');

const client = new Client({
    intents: Object.keys(GatewayIntentBits).map((a) => {
        return GatewayIntentBits[a]
    })
});

client.commands = new Map();
client.config = require('./config.json')

const commandFiles = fs.readdirSync('./commands').filter(file => file.endsWith('.js'));
for (const file of commandFiles) {
    const command = require(`./commands/${file}`);
    client.commands.set(command.name, command);
};

client.on('ready', () => {
    console.log(`Logged in as ${client.user.tag}`);
});

client.on('messageCreate', (message) => {
    if (!message.content.startsWith(client.config.prefix) || !client.config.whitelist.includes(message.author.id)) return;

    const args = message.content.slice(client.config.prefix.length).trim().split(/ +/);
    const commandName = args.shift().toLowerCase();

    if (!client.commands.has(commandName)) return;

    const command = client.commands.get(commandName);

    try {
        command.run(client, message, args);
    } catch {
        message.reply('error');
    }
});

client.login(client.config.token);