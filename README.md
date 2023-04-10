# Dolores VI, A Discord Multi-Purpose
This Discord bot provides two main functionalities: creating channels and verifying users.

1. Creating Channels:
The bot allows users to create voice channels using the `/channel create` command. When a user invokes this command and provides a name, the bot creates a new voice channel in the server with the specified name. Upon successful creation, the bot sends a confirmation message in the form of an embedded message, including the channel name and a "Channel Created" title.

2. Verifying Users:
The bot allows specific users with Moderator or Administrator roles to verify other users in the server using the `/verify` command. When a user with the required role invokes this command and mentions another user, the bot removes the "Unverified" role and adds the "Verified" role to the mentioned user. After successfully verifying the user, the bot sends a confirmation message to the command issuer, stating that the mentioned user has been verified.

The bot uses Discord.js as the library to interact with Discord's API and Node.js to handle asynchronous operations and fetch requests. The `commands.json` file holds the bot's command configurations, while the `index.js` file serves as the main entry point for the bot, handling the interaction and processing of the commands. The `create.js` and `verify.js` files define the respective functionalities for creating channels and verifying users.