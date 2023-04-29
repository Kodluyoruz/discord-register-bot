const fs = require("fs");
const {connection}=require("mongoose");
//todo burada mongo event handlerları için ayrı bir dosyada olması daha iyi
// olabilir çünkü ben mesela kodlara ilk baktığımda burayı inlemeden önce
// mongo eventlerinin burada yüklendiğini bilemezdim çünkü burası bot için bir
// handler dosyası. Mongo eventlerini mongoEventHandler.js gibi bir dosyada
// yükleyip onu index'te çalıştırmak daha daha okunaklı, temiz olabilir.
module.exports = (client) => {
  client.handleEvents = async () => {
    const eventFolders = fs.readdirSync(`./src/events`);
    for (const folder of eventFolders) {
      const eventFiles = fs
        .readdirSync(`./src/events/${folder}`)
        .filter((file) => file.endsWith(".js"));
      switch (folder) {
        case "client":
          for (const file of eventFiles) {
            const event = require(`../../events/${folder}/${file}`);
            if (event.once)
              client.once(event.name, (...args) =>
                event.execute(...args, client)
              );
            else
              client.on(event.name, (...args) =>
                event.execute(...args, client)
              );
          }
          break;
        case "mongo":
          for(const file of eventFiles){
            const event=require(`../../events/${folder}/${file}`);
            if(event.once) connection.once(event.name,(...args)=>event.execute(...args,client))
            else connection.on(event.name,(...args)=>event.execute(...args,client));
          }
          break;
        default: //todo switch case yapısında defualt bir işlem
          // yapmayacaksak yazmak zorunda değiliz. Bu yüzden silnebilir bu kısım
          break;
      }
    }
  };
};
