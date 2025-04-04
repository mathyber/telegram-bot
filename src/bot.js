const { Telegraf } = require('telegraf');
const { botToken } = require('./config/config');
const startHandler = require('./handlers/commands/start');
const premiumHandler = require('./handlers/commands/premium');
const usersHandler = require('./handlers/commands/users');
const meHandler = require('./handlers/commands/me');
const helpHandler = require('./handlers/commands/help');
const webappHandler = require('./handlers/commands/webapp');
const paginationHandler = require('./handlers/actions/pagination');

const bot = new Telegraf(botToken);

bot.start(startHandler);
bot.command('premium', premiumHandler);
bot.command('users', usersHandler);
bot.command('me', meHandler);
bot.command('help', helpHandler);
bot.command('webapp', webappHandler);
bot.action(/users:(\d+)/, paginationHandler);

bot.launch()
    .then(() => console.log('Bot started'))
    .catch((err) => console.error('Bot failed to start:', err));

process.once('SIGINT', () => bot.stop('SIGINT'));
process.once('SIGTERM', () => bot.stop('SIGTERM'));

module.exports = bot;