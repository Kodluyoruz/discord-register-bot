require("dotenv").config();
const { token,DB_URI} = process.env;
const { connect } = require("mongoose");
const {
    Client,
    Collection,
    GatewayIntentBits
} = require("discord.js");
const fs = require('fs');

//todo client'e ait ilk başlatma işlemleri botInit.js(bot Initialization)
// altında yapılıp requier ile dahil edip daha sonra
// await botInit(); şekilde çağırıp daha sonra dönen client ile login işlemi
// yapılabilir. Böylece daha okunaklı, anlaşılır, temiz olabilir kodlar.
// botInit dosayası ayrı bir klasörde olmasına gerek yok direkt src altında
// olabilir

const client = new Client({
  intents: [
    GatewayIntentBits.Guilds,
    GatewayIntentBits.GuildMembers,
    GatewayIntentBits.GuildMessages,
  ],
});

client.commands = new Collection();
client.buttons = new Collection();
client.selectMenus = new Collection();
client.modals = new Collection();
client.commandArray = []; //todo sanırım bu bir tek bot komutlarını kayıt
// ederken kullanıclacak bu yüzden client bojecsine eklememize gerek
// olmayabilir. Direkt handleCommands fonksiyonu içinde tanımlanabilir.
// hem ayrıca böyle bir şey olması kafa karıştırıcı oluyor değişken ismi
// böyle genel bir yerde tanımlamak için yeterli bir isim değil gibi

require("./utils/logger")(client);

client.createLogger();

//todo aşağıdaki tarzda her şeyi handlers klasörü altında yaptığımız için
// aşağıdaki kodları da handlers klasörü altında bir dosyaya taşıyabiliriz
const functionFolders = fs.readdirSync(`./src/functions`);
for (const folder of functionFolders) {
  const functionFiles = fs
    .readdirSync(`./src/functions/${folder}`)
    .filter((file) => file.endsWith(".js")); // todo funcsitons klasöründe
    // başka uzantılı dosyalar tutmamız gerektiği için bu kontrol gereksiz
    // olabilir
  for (const file of functionFiles)
    require(`./functions/${folder}/${file}`)(client);
}

client.handleEvents(); //todo bu fonksiyonları bir sefer sadece bot
// başlatılırken kullanacağımız için bunları client objesinde tutmamıza
// gerek olmayabilir direkt burada çalıştırabiliriz. Components hariç tabii
client.handleCommands(); // bu fonksiyonlar ascyn olduğu için bunları
// bunların yüklenmesi bekleyelim login olmadan önce eğer beklenmedik bir
// gecikme olur da bot login olursa ve işlemler yapılmaya başlanırsa hata
// oluşur bunlara ulaşamayabilir. Yani bot hazır olmadan çalışmaya başlamış
// olur.
client.handleComponents();
client.login(token);

(async()=>{
  await connect(DB_URI).catch(console.error);
  //todo burada bir hata olursa hiç başlatılamasın bot yani direkt
    // durduracak bir hata fırlatılmalı çünkü hiçbir işlem yapamayız
    // veritabanı olmazsa. Çalışmaya başlamasın bile
    //todo bot buranın then bloğunda çalıştırılmalı ki tam her şeyi hazır
    // olsun ve sonra login olup çalışmaya başlasın bu durumda veritabanı
    // bağlantısı olmadan çalışmaya başlayabilir.

    //2. olarak burada neden async kullandık tek bir işlem ve bunun
    // bitiminde veya öncesinde bir işlem beklenmiyor tek bu var bu yüzden
    // planlandığı gibi çalışmayabilir. Tam anlayamadım. Eğer bu kısmı yazan
    // için sorun yoksa bu şekilde bırakabiliriz.
})();