module.exports={
    name:"err",
    execute(client, err){
        client.logger.error(`Veritabanı: hata oluştu -> ${err}`);
    },
};