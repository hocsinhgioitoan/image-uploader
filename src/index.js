"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const discord_js_selfbot_v13_1 = require("discord.js-selfbot-v13");
const axios_1 = __importDefault(require("axios"));
const dotenv_1 = require("dotenv");
(0, dotenv_1.config)();
const client = new discord_js_selfbot_v13_1.Client({ checkUpdate: false });
client
    .on("ready", (c) => {
    console.log(`${c.user.username} is ready`);
})
    .on("messageCreate", async (message) => {
    if (message.author.id !== client.user?.id)
        return;
    if (message.content.startsWith("!upload")) {
        const args = message.content.split(" ").slice(1);
        const desc = args[0];
        const imageLink = args[1];
        const m = await message.channel.send({
            files: [
                {
                    attachment: imageLink,
                    name: "chart.png",
                },
            ],
        });
        setTimeout(async () => {
            await m.delete();
        }, 1000);
        const originalImgLink = m.attachments.at(0)?.url;
        const author = args[2];
        const url = `https://ablum-lalz.onrender.com`;
        var data = JSON.stringify({
            imgLink: originalImgLink,
            originalImgLink: imageLink,
            imgDescription: desc,
            owner: {
                name: author,
                service: 'idk',
                id: '0',
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
            .then(function (response) {
        })
            .catch(function (error) {
            console.log(error);
        });
    }
})
    .login(process.env.c);
