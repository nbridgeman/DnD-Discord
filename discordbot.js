// Initialize dotenv
require('dotenv').config();

// Discord.js versions ^13.0 require us to explicitly define client intents
const { Client, Intents } = require('discord.js');
const { token } = require('./config.json');
const client = new Client({ intents: [Intents.FLAGS.GUILDS, Intents.FLAGS.GUILD_MESSAGES] });

function roll() {
    return Math.floor(Math.random() * 6) + 1;
}

client.on('ready', () => {
 console.log(`Logged in as ${client.user.tag}!`);
});


client.on('interactionCreate', async interaction => {
	if (!interaction.isCommand()) return;

	const { commandName } = interaction;

	if (commandName === 'roll') {
		await interaction.reply(roll().toString());
	}
});

client.login(process.env.CLIENT_TOKEN);
