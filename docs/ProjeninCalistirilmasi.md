# Proje Nasıl Çalıştırılır?
* Terminal üzerinden **git clone "https://github.com/Kodluyoruz/discord-register-bot.git"** komutunu çalıştırarak repo local'e indirilir. 

![gorsel21](images/gorsel21.png)
* **cd discord-register-code** komutu kullanılarak projenin bulunduğu klasöre geçilir.
* **code .** komutu kullanılarak proje Visual Studio Code'ta açılır.

![gorsel22](images/gorsel22.png)
* Visual Studio Code'ta ilk açıldığında proje main branch'indedir. 

![gorsel23](images/gorsel23.png)
* Branch değiştirmek için code editörünün sol alt tarafında yazılı bulunan **main** yazısına tıklanarak editör içerisinde branch isimlerinin olduğu bir pencere açılır.

![gorsel24](images/gorsel24.png)
* Bu pencere içerisinde **origin/development** isimli branch seçilerek. Branch değişikliği yapılmış olunur.

![gorsel25](images/gorsel25.png)
* Editör içerisinden veya daha önce kullandığınız terminal ekranından **npm install** komutu çalıştırılarak proje kütüphaneleri indirilir.

![gorsel31](images/gorsel31.png)
* **.env** isimli bir dosya açarak **.env.sample** dosyasının içerisindekiler kopyalanır.

![gorsel26](images/gorsel26.png)
* **https://discord.com/developers/applications** sayfasına giriş yaptığınızda daha önce oluşturmuş olduğunuz aplikasyonlara ulaşabilirsiniz.

![gorsel16](images/gorsel16.png)
* Bu sayfa içerisinden aplikasyon seçerek tıklayınız.

![gorsel27](images/gorsel27.png)
* Aplikasyon sayfasına girdiğinizde sol çubuktaki **Bot** butonuna tıklanarak sayfa içerisinde **Reset Token** butonuna tıklanarak token oluşturulur. 

![gorsel28](images/gorsel28.png)
* Oluşturulan token altında bulunan **Copy** butonuna tıklanarak token kopyalanır.

![gorsel29](images/gorsel29.png)
* Kopyalanan token **.env** içerisindeki token değişkeninin yanına yapıştırılır.

![gorsel30](images/gorsel30.png)
* Terminal ekranından **node .** komutu çalıştırılarak proje ayağa kaldırılmış olur.

![gorsel32](images/gorsel32.png)
* Bot sunucuda aktifleşmiş ve ilk mesajını göndermiş olur. **Kayıt olmak için tıkla** butonuna tıklayarak botun **Selam Dünya!** yazdırılması sağlanır.

![gorsel33](images/gorsel33.png)
![gorsel34](images/gorsel34.png)