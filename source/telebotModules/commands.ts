import bot from './bot'
import dictionary from '../locales/dictionary';

export default function commands() {
  bot.on('/start', (msg) => {
    msg.reply.text(dictionary.greeting);
  });

  bot.on('/help', (msg) => {
    msg.reply.text(dictionary.help);
  });
}
