import mineflayer from "mineflayer";
import chalk from "chalk";
import mineflayerPathfinder from "mineflayer-pathfinder";
import pkg from 'mineflayer-pathfinder';
const { Pathfinder, goals } = pkg;
const { pathfinder, Movements, GoalNear, GoalBlock, GoalXZ, GoalY, GoalInvert, GoalFollow, GoalBreakBlock } = mineflayerPathfinder;
import { getChatEvents } from './utils/getChatEvents.mjs';
import { getLocation } from './utils/getLocation.mjs';
import { readFile } from "fs/promises";
import readline from "readline";
const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
});

// Setup global bot arguments
let botArgs = {
    host: 'mc.hypixel.net',
    version: '1.8.9'
};

var pi = 3.14159;


function getRandomArbitrary(min, max) {
    return Math.random() * (max - min) + min;

}

var moveinterval = 1; // 2 second movement interval
var maxrandom = 5; // 0-5 seconds added to movement interval (randomly)


class MCBot {

    // Constructor
    constructor(username, password, auth) {
        this.username = username;
        this.password = password;
        this.auth = auth;
        this.host = botArgs["host"];
        this.port = botArgs["port"];
        this.version = botArgs["version"];

        this.botLocation = {
            "server": null,
            "gametype": null,
            "lobbyname": null,
            "map": null
        };

        // Initialize the bot
        this.initBot();

        // Import external functions
        this.getChatEvents = getChatEvents;
        this.getLocation = getLocation;
    }

    // Init bot instance
    initBot() {
        this.bot = mineflayer.createBot({
            "username": this.username,
            "password": this.password,
            "auth": this.auth,
            "host": this.host,
            "port": this.port,
            "version": this.version,
            "hideErrors": true
        });

        // Initialize bot events
        this.initEvents();
        this.listenToUserInput();
    }

    // Logger
    log(...msg) {

        // Show masked name
        if (params["showName"] && params["showMask"]) {
            console.log(this.mask(`[${this.bot.username}] ` + msg[0]));
        }

        // Show name
        else if (params["showName"]) {
            console.log(`[${this.bot.username}] ` + msg[0]);
        }

        // Don't show name
        else {
            console.log(msg[0]);
        }
    }

    // Mask
    mask(msg) {
      //   Mask
        for (const key in MASK) {
            msg = msg.replace(new RegExp(key, "gi"), MASK[key]);
        }
        return msg;
    }



    // Event for console input
    listenToUserInput() {
        rl.prompt(true)
        rl.on('line', async (input) => {
            switch (input) {
                case "get location":
                    this.log(`Current location: {${this.botLocation["server"]}${this.botLocation["lobbyname"] ? `, ${this.botLocation["lobbyname"]}` : ""}${this.botLocation["gametype"] ? `, ${this.botLocation["gametype"]}` : ""}${this.botLocation["map"] ? `, ${this.botLocation["map"]}` : ""}}`);
                    break;
                case "get task":
                    this.log(`Current Task: ${currentTask}`);
                    break;
                case "end task":
                    currentTask = null;
                    break;
                case "/limbo":
                    this.bot.chat("§");
                    break;
                default:
                    this.bot.chat(input);
                    break;
                case "murdbot":
                    const currentTask = "MM BOT"
                    this.bot.chat("/play murder_classic")
                    
                    while (2 > 1) {
                        await this.bot.waitForTicks(240);
                        this.bot.setControlState('forward', true);
                        this.bot.setControlState('jump', true);
                        await this.bot.waitForTicks(240);
                        this.bot.clearControlStates()
                        this.bot.setControlState('left', true);
                        await this.bot.waitForTicks(40);
                        this.bot.clearControlStates()
                        await this.bot.waitForTicks(46);
                        this.bot.setControlState('forward', true);
                        await this.bot.waitForTicks(230);
                        this.bot.clearControlStates()
                        await this.bot.waitForTicks(32);
                        this.bot.setControlState('back', true);
                        await this.bot.waitForTicks(140);
                        this.bot.clearControlStates()
                        await this.bot.waitForTicks(20);
                        this.bot.setControlState('forward', true);
                        await this.bot.waitForTicks(230);
                        this.bot.clearControlStates()
                        await this.bot.waitForTicks(46);
                        this.bot.setControlState('forward', true);
                        this.bot.setControlState('jump', true);
                        await this.bot.waitForTicks(230);
                        this.bot.clearControlStates()
                        await this.bot.waitForTicks(32);
                        this.bot.setControlState('left', true);
                        await this.bot.waitForTicks(140);
                        this.bot.clearControlStates()
                        await this.bot.waitForTicks(46);
                        this.bot.setControlState('back', true);
                        await this.bot.waitForTicks(140);
                        this.bot.clearControlStates()
                    }
                    this.bot.on('messagestr', (message) => {
                        if(message.includes("Detective:")) this.bot.chat("/play murder_classic") 
                        if(message.includes("DIED")) this.bot.chat("/play murder_classic") 
                        if(message.includes("dynamiclobby")) this.bot.chat("/play murder_classic") 
                        if(message.includes("You get your")) this.bot.chat("/play murder_classic")
                        return;
                      })

                case "sbcheck":
                    console.log(this.bot.scoreboard)
                
                case "rq":
                    this.bot.chat("/play murder_classic")

                case "fail":
                    this.bot.on('messagestr', (message) => {
                        if(message.includes("Detective:")) this.bot.chat("/play murder_classic") 
                        if(message.includes("DIED")) this.bot.chat("/play murder_classic") 
                        if(message.includes("dynamiclobby")) this.bot.chat("/play murder_classic") 
                        if(message.includes("You get your")) this.bot.chat("/play murder_classic")
                        return;
                      })

            }
        });
    }

    // Init bot events
    initEvents() {

        this.bot.on('login', async () => {

            // Display connection info
            let botSocket = this.bot._client.socket;
            this.log(chalk.ansi256(34)(`Logged in to ${botSocket.server ? botSocket.server : botSocket._host}`));

            // Add name to list
            botNames.push(this.bot.username);
        });

        this.bot.on('end', async (reason) => {
            this.log(chalk.red(`Disconnected: ${reason}`));

            // Bot peacefully disconnected
            if (reason == "disconnect.quitting") {
                return
            }
            // Unhandled disconnections
            else {
                //
            }

            // Attempt to reconnect
            setTimeout(() => this.initBot(), 5000);
        });

        this.bot.on('spawn', async () => {
            this.log(chalk.ansi256(46)(`Spawned in`));
            await this.bot.waitForChunksToLoad();
            await this.bot.waitForTicks(12);

            this.bot.chat("/locraw");

            // await this.bot.waitForTicks(8);

            switch(currentTask) {
                case "murdbot":
                    this.bot.on('messagestr', (message) => {
                        if(message.includes("Detective:")) this.bot.chat("/play murder_classic") 
                        if(message.includes("DIED")) this.bot.chat("/play murder_classic") 
                        if(message.includes("dynamiclobby")) this.bot.chat("/play murder_classic") 
                        if(message.includes("You get your")) this.bot.chat("/play murder_classic")
                        return;
                      })
                    

                    break;

                default:
                this.bot.on('messagestr', (message) => {
                    if(message.includes("Detective:")) this.bot.chat("/play murder_classic") 
                    if(message.includes("DIED")) this.bot.chat("/play murder_classic") 
                    if(message.includes("dynamiclobby")) this.bot.chat("/play murder_classic") 
                    if(message.includes("You get your")) this.bot.chat("/play murder_classic")
                    return;
                  })
                  
                    break;
            }
        });

        this.bot.on('message', async (jsonMsg) => {

            // Avoid Hypixel Cancer
            if (jsonMsg["extra"] && jsonMsg["extra"].length === 100) { return }

            let ansiText = this.mask(jsonMsg.toAnsi());
            let rawText = jsonMsg.toString();

            // Anti "Slow down"
            if(rawText == "Woah there, slow down!") {
                await this.bot.waitForTicks(200);
                switch(currentTask) {
                    case "lobby_override_example":
                        //
                        break;
                    default:
                        this.bot.chat(`/lobby ${defaultLobby}`);
                        break;
                }
            }

            // Check for location JSON
            let [newBotLocation, validJSON] = this.getLocation(rawText);

            if (JSON.stringify(this.botLocation) != JSON.stringify(newBotLocation) && validJSON) {

                // Update location
                this.botLocation = newBotLocation;
                this.log(`Current location: {${this.botLocation["server"]}${this.botLocation["lobbyname"] ? `, ${this.botLocation["lobbyname"]}` : ""}${this.botLocation["gametype"] ? `, ${this.botLocation["gametype"]}` : ""}${this.botLocation["map"] ? `, ${this.botLocation["map"]}` : ""}}`);
                
                // Anti Limbo
                if(this.botLocation["server"] == "limbo") {
                    switch(currentTask) {
                        case "lobby_override_example":
                            //
                            break;
                        default:
                            this.bot.chat(`/lobby ${defaultLobby}`);
                            this.bot.waitForTicks(5);
                            break;
                    }
                }
            }

            // Don't show messages if JSON
            if (validJSON) { return }

            // Show messages
            if (params["showName"] && params["showMask"]) {
                process.stdout.write(this.mask(`[${this.bot.username}] ${ansiText}`));
            }
            else if (params["showName"]) {
                process.stdout.write(`[${this.bot.username}] ${ansiText}`);
            }
            else { process.stdout.write(ansiText); }

            // Get events
            let [messageClickEvents, messageHoverEvents] = this.getChatEvents(jsonMsg);

            if (this.botLocation["server"] == "limbo") {
                this.bot.chat("/lobby duels");
            }

            // Click and Hover events
            let clickEvents = params["showClickEvents"] && messageClickEvents.length;
            let hoverEvents = params["showHoverEvents"] && messageHoverEvents.length;

            if (clickEvents && hoverEvents) { console.log(messageClickEvents, messageHoverEvents); }
            else if (clickEvents) { console.log(messageClickEvents); }
            else if (hoverEvents) { console.log(messageHoverEvents); }
            else { console.log(); }
        });

        this.bot.on('error', async (err) => {

            // Connection error
            if (err.code == 'ECONNREFUSED') {
                this.log(`Failed to connect to ${err.address}:${err.port}`)
            }
            // Unhandled errors
            else {
                this.log(`Unhandled error: ${err}`);
            }


        });
    }
}

// Import accounts
const ACCOUNT = JSON.parse(
    await readFile(
        new URL('./secrets/ACCOUNT.json', import.meta.url)
    )
);

// Init containers and params
let bots = [];
let botNames = [];
let MASK = {};
let params = {
    showClickEvents: true,
    showHoverEvents: false,
    showName: false,
    showMask: false
};
let currentTask = null;
let defaultLobby = "duels";

// Create bots
for(let i = 0; i < ACCOUNT.length; i++) {
    let ACC = ACCOUNT[i];
    let newBot = new MCBot(ACC.username, ACC.password, ACC.auth);
    bots.push(newBot);
      //MASK[ACC.ign] = `murdbot_nr${String(i+1).padStart(3, '0')}`;
};