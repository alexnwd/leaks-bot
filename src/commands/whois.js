const Command = require('../extends/commands.js');
const { RichEmbed } = require('discord.js');
const { getNiceTime } = require('../utilities/msg.js');

class Whois extends Command {
    constructor(client) {
        super(client, {
            name: 'whois',
            description:
                'Afișează statisticile contului dvs. sau pe ale membrului menționat',
            category: 'Diverse',
            usage: 'whois <@target>',
            aliases: ['userinfo']
        });
    }

    async run(message, args) {
        let target = message.mentions.users.first() || message.author;
        const user = message.guild.member(target);

        var currentDate = new Date();
        var _createdAt = new Date(target.createdAt);
        var _joinedAt = new Date(user.joinedAt);

        let userEmbed = new RichEmbed()
            .setTitle(`Utilizator ${target.tag}`)
            .setColor('#0071ff')
            .setDescription(
                `ID: ${user.id}\n\nUsername: ${
                    user.nickname !== null ? user.nickname : 'None'
                }\nCont înregistrat acum ${getNiceTime(
                    _createdAt,
                    currentDate,
                    3,
                    true
                )}\nPe server de ${getNiceTime(
                    _joinedAt,
                    currentDate,
                    3,
                    true
                )}\nRoluri deținute: ${user.roles
                    .map(roles => roles.name)
                    .join(', ')}\nStatus: ${target.presence.status}`
            )
            .setThumbnail(target.displayAvatarURL);
        message.channel.send(userEmbed);
    }
}

module.exports = Whois;
