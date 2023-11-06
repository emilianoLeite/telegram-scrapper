import TelegramBot from "node-telegram-bot-api";

export const bot = new TelegramBot(process.env.TELEGRAM_TOKEN ?? "", {
  polling: true,
});

// function handleError(chatId: number, errorMessage: string): void {
//   bot.sendMessage(chatId, `ERROR: ${errorMessage}`);
//   console.error(errorMessage);
// }

export function startupBot() {
  console.log("Starting up bot polling...");

  bot.onText(/\/start/, (msg) => {
    bot.sendMessage(
      msg.chat.id,
      "Welcome! Send me a receipt and I will process it for you."
    );
  });

  bot.on("message", async (msg) => {
    console.log(`got message from chat ${msg.chat.id}`);
  });
}