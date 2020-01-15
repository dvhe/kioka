const klaw = require("klaw");
const pathM = require("path");
require("./Command.js");

module.exports = class commandHandler {
    constructor(client) {
        this.client = client;
        this.client.commands = new Discord.Collection();
        this.client.aliases = new Discord.Collection();
    }

    load() {
        return new Promise((resolve, reject) => { // eslint-disable-line no-unused-vars
            klaw(pathM.join(__dirname, "../commands/"))
                .on("data", item => {
                    const path = item.path.includes("/") ? item.path.split(/\//gi) : item.path.split(/\\/gi);
                    if (!path[path.length - 1].includes(".")) return;

                    item.path = item.path.replace(/\\/gi, "/");
                    const category = path[path.length - 2] !== "commands" ? path[path.length - 2] : false;

                    const fileName = path[path.length - 1];

                    try {
                        const File = require(item.path);
                        const isClass = File.toString().startsWith("class");
                        const file = isClass ? new File(this.client) : File;
                        file.category = category;
                        file.fileName = fileName;
                        file.cooldownQueue = new Map();
                        this.client.commands.set(file.name, file);
                        if (!file.aliases) return;
                        file.aliases.forEach(aliase => {
                            this.client.aliases.set(aliase, file.name);
                        });
                    } catch (e) {
                        console.log(e);
                    }
                }).on("end", () => {
                    resolve();
                })
                .on("error", console.log);
        });
    }
};