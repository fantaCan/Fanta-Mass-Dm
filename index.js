const readline = require('readline-sync');
const chalk = require('chalk');
const massDm = require("./src/src.js");
const botConfigs = require("./bot.settings.js");
const messages = botConfigs.messages; 
const tokens = botConfigs.tokens; 
const ASCIIArt = botConfigs.ASCIIArt;
console.clear();
console.log(" ");



console.log(chalk.blue(ASCIIArt));
console.log(chalk.bgRed("Made by fanta#1337!"), chalk.blue("Logs displaying in title.."));


async function main(){
for (var x = 0; x < tokens.length; x++){
    const bot = new massDm(tokens[x]);
    await bot.start(messages);
}
}

main();