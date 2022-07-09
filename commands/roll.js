const { SlashCommandBuilder } = require('@discordjs/builders');

function roll(num, sides, mod) {
    var mod_symbol = (mod > 1) ? "+" : "";
    var output = "Rolling " + num + "d" + sides;
    if (mod) output += mod_symbol + mod;
    output += ": "
    var sum = 0;
    var roll = Math.floor(Math.random() * sides) + 1;
    output += roll;
    sum += roll;
    for (let i = 1; i < num; i++) {
        roll = Math.floor(Math.random() * sides) + 1;
        output += " + " + roll;
        sum += roll;
    }
    if (mod) {
        output += " + " + mod;
        sum += mod;
    }
    if (num > 1 || mod) {
        output += " = " + sum;
    }
    return output;
}

module.exports = {
	data: new SlashCommandBuilder()
		.setName('roll')
		.setDescription('Rolls a d20')
        .addIntegerOption(option =>
            option.setName('num')
                  .setDescription('Number of dice rolled'))
        .addIntegerOption(option =>
            option.setName('sides')
                  .setDescription('Number of sides on the dice rolled'))
        .addIntegerOption(option =>
            option.setName('mod')
                  .setDescription('Modifier on the total roll')),
	async execute(interaction) {
        var num = interaction.options.getInteger('num') || 1;
        var sides = interaction.options.getInteger('sides') || 20;
        var mod = interaction.options.getInteger('mod');
		await interaction.reply(roll(num, sides, mod));
	},
};
