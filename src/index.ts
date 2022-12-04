import {
    ActionRowBuilder,
    Client,
    ModalActionRowComponentBuilder,
    ModalBuilder,
    TextInputBuilder,
    TextInputStyle,
} from "discord.js";
import axios from "axios";
import { config } from "dotenv";
config();
const client = new Client({
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
            const modal = new ModalBuilder()
                .setTitle("Upload ảnh")
                .setCustomId("modal");
            const op1 = new TextInputBuilder()
                .setCustomId("desc")
                .setLabel("Mô tả")
                .setStyle(TextInputStyle.Short);
            const op2 = new TextInputBuilder()
                .setCustomId("author")
                .setLabel("Người up")
                .setStyle(TextInputStyle.Short);
            const op3 = new TextInputBuilder()
                .setCustomId("link")
                .setLabel("link ảnh")
                .setStyle(TextInputStyle.Short);
            const row1 =
                new ActionRowBuilder<ModalActionRowComponentBuilder>().addComponents(
                    op1
                );
            const row2 =
                new ActionRowBuilder<ModalActionRowComponentBuilder>().addComponents(
                    op2
                );
            const row3 =
                new ActionRowBuilder<ModalActionRowComponentBuilder>().addComponents(
                    op3
                );
            modal.addComponents(row1, row2, row3);
            await i.showModal(modal);
        } else if (i.isModalSubmit()) {
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
                    axios(config)
                        .then(function (response) {})
                        i.reply({
                            content: `done!`,
                        });
                        return
                } catch (e) {
                    i.reply({
                        content: `${e}`,
                    });
                    return;
                }
            }
        }
    })

    .login(process.env.c);
