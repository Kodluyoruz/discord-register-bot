export default {
    getByGuildId: function (id) {
        return new Promise((resolve, reject) => {
            this.findOne({guildId: id}, (err, guild) => {
                if (err) {
                    //todo hata loglanacak bir önceki review'da belirtmiştim
                    //logger nasıl olmalı?
                    reject(err);
                } else {
                    resolve(guild);
                }
            });
        });
    },
    getByRegisterCode: function (code) {
        return this.findOne({guildId, 'codes.code': code}, {
            _id: 1,
            owner_id: 1,
            dc_guild_id: 1,
            dc_register_channel_id: 1,
            dc_mod_channel_id: 1,
            'codes.$': 1
        });
    },
        createGuild: function (guild) {
            return this.create(guild);
        }
    ,
        updateGuild: function (guild) {
            return this.updateOne({_id: guild._id}, guild);
        }
    ,
        deleteGuild: function (guild) {
            return this.deleteOne({_id: guild._id});
        }
    ,
        addRegisterCode: async function (guildId, code) {
            const guild = await this.findOne({guildId});
            guild.codes.push(code);
            return guild.save();
        }
    ,
    }