"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const discord_js_1 = require("discord.js");
const axios_1 = __importDefault(require("axios"));
const dotenv_1 = require("dotenv");
(0, dotenv_1.config)();
const client = new discord_js_1.Client({
    intents: ["Guilds", "GuildMessages", "MessageContent"],
});
client
    .on("ready", (c) => {
    console.log(`${c.user.username} is ready`);
    c.guilds.cache.forEach((g) => {
        g.commands.set([
            {
                name: "upload",
                description: "hehe",
            },
        ]);
    });
})
    .on("interactionCreate", async (i) => {
    if (i.isChatInputCommand()) {
        const modal = new discord_js_1.ModalBuilder()
            .setTitle("Upload ảnh")
            .setCustomId("modal");
        const op1 = new discord_js_1.TextInputBuilder()
            .setCustomId("desc")
            .setLabel("Mô tả")
            .setStyle(discord_js_1.TextInputStyle.Short);
        const op2 = new discord_js_1.TextInputBuilder()
            .setCustomId("author")
            .setLabel("Người up")
            .setStyle(discord_js_1.TextInputStyle.Short);
        const op3 = new discord_js_1.TextInputBuilder()
            .setCustomId("link")
            .setLabel("link ảnh")
            .setStyle(discord_js_1.TextInputStyle.Short);
        const row1 = new discord_js_1.ActionRowBuilder().addComponents(op1);
        const row2 = new discord_js_1.ActionRowBuilder().addComponents(op2);
        const row3 = new discord_js_1.ActionRowBuilder().addComponents(op3);
        modal.addComponents(row1, row2, row3);
        await i.showModal(modal);
    }
    else if (i.isModalSubmit()) {
        if (i.customId === "modal") {
            const desc = i.fields.getTextInputValue("desc");
            const author = i.fields.getTextInputValue("author");
            const link = i.fields.getTextInputValue("link");
            try {
                const m = await i.channel?.send({
                    files: [
                        {
                            attachment: link,
                        },
                    ],
                });
                const imgLink = m?.attachments.at(0)?.url;
                const url = `https://ablum-lalz.onrender.com`;
                var data = JSON.stringify({
                    imgLink: imgLink,
                    originalImgLink: link,
                    imgDescription: desc,
                    owner: {
                        name: author,
                        service: "idk",
                        id: "0",
                    },
                });
                var config = {
                    method: "post",
                    url: `${url}/api/newpin`,
                    headers: {
                        "Content-Type": "application/json",
                    },
                    data: data,
                };
                (0, axios_1.default)(config)
                    .then(function (response) { });
                i.reply({
                    content: `done!`,
                });
                return;
            }
            catch (e) {
                i.reply({
                    content: `${e}`,
                });
                return;
            }
        }
    }
})
    .login(process.env.c);
