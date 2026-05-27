import { Telegraf } from "telegraf";

export class TelegramService {
  private bot: Telegraf;

  constructor() {
    const token = process.env.BOT_TOKEN;

    if (!token) {
      throw new Error("Falta BOT_TOKEN en el archivo .env");
    }

    this.bot = new Telegraf(token);
  }

  async enviarFoto(buffer: Buffer): Promise<void> {
    const chatId = process.env.CHAT_ID;

    if (!chatId) {
      throw new Error("Falta CHAT_ID en el archivo .env");
    }

    await this.bot.telegram.sendPhoto(chatId, {
      source: buffer,
      filename: "comprobante.png",
    });
  }
}