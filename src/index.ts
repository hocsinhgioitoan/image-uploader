import { Client } from "discord.js-selfbot-v13";
import axios from "axios";
import { config } from "dotenv";
config()
const client = new Client({ checkUpdate: false });
client
    .on("ready", (c) => {
        console.log(`${c.user.username} is ready`);
    })
    .on("messageCreate", async (message) => {
        if (message.author.id !== client.user?.id) return;
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

            axios(config)
                .then(function (response) {
                })
                .catch(function (error) {
                    console.log(error);
                });
        }
    })
    .login(
       process.env.c
    );
