const blacklist = require('../../models/blacklist')
const { Message } = require('discord.js')
const { ownerid } = require('../config.json')

module.exports = {
  name: 'blacklist-remove',
  description: 'Removes a user from the blacklist. Owner Locked.',
  async execute(message, client, args) {
    if (message.author.id != `${ownerid}`) return message.channel.send('This is an owner only command.')
    const User = message.guild.members.cache.get(args[0])
    if (!User) return message.channel.send('User is not valid.')

    blacklist.findOne({ id: User.user.id }, async(err, data) => {
      if(err) throw err;
      if(data) {
        await blacklist.findOneAndDelete({ id: User.user.id })
          .catch(err => console.log(err))
          message.channel.send(`**${User.displayName}** has been removed from blacklist.`)
      } else {
        message.channel.send(`**${User.displayName} is not blacklisted.`)
      }

    })
  }
}
