# 🚀 REACT NATIVE - Password Storage App 🚀

## 🚀 Proje Hakkında 
Bu proje, kullanıcıların kolay bir şekilde kullanıcı adlarını ve şifrelerini defterler yerine kendi telefonunda saklaması için tasarlanmıştır. TypeScript, React Native ve MONGODB kullanarak sıfırdan geliştirdim.

## ✨ Özellikler 
* **✅ Yeni Şifre Ekleme:** Basit ve kullanıcı dostu arayüzle hızla yeni şifrelerinizi oluşturun.
* **🗑️ Şifreleri Silme:** İhtiyacınız olmayan kullanıcı adlarını ve şifrelerinizi kolayca kaldırın.
* **✏️ Şifreleri Düzenleme:** Var olan şfirelerinizi anında güncelleyin.
* **🔒 Tüm Şifreleriniz Tek Ekranda:** Uygulamaya eklemiş olduğunuz tüm kullanıcı adlarınız ve şifreleriniz tek ekranda.
* **🔑 Şifrelerinizi Tüm Detaylarıyla Görüntüleyin:** Uygulama eklediğiniz tüm şifrelerinizi detaylıca görüntüleyin.
  
## 🚀 Kurulum ve Çalıştırma 

1.  **Gereksinimler:**
    * Bilgisayarınızda **Node.js**'in kurulu olması gerekmektedir.

### Adımlar 

1.  **Bağımlılıkları Yükleyin:**
      **Frontend ve backend klasörleri için ayrı ayrı bu adımı uygulamanız gerekmektedir**
    ```bash
    npm install
    ```

3.  **Ortam Değişkenlerini Ayarlayın:**
    Bu proje, database bağlantı stringleri gibi hassas bilgiler kullanır. Bu bilgileri doğrudan kodunuza yazmaktan kaçınmalısınız.
    Projenin backend klasöründe ve frontend klasörününe, **`.env`** dosyanızı oluşturun.
    
    **BACKEND .env dosyası**
      - PORT = Uygulamanın backend'e istek göndereceği adres.
      - MONGO_URI = MongoDB üzerinden aldığınız size özel olan connection string.
      - JWT_SECRET = Kimlik doğrulama işlemleri için gereklidir.
      - CRYPTO_SECRET_KEY = 32 karakterlik kullanıcı şifrelerinin veritabanında güvenli bir şekilde saklanması için kullanılan gizli bir şifreleme anahtarıdır.

    **FRONTEND .env dosyası**
      - API_URL = Uygulamanızın kendi BACKEND SUNUCUSUNA bağlanacağı ana adres (API_URL/api şeklinde)
      
5.  **Uygulamayı Başlatın:**
        **Backend klasörüne gidip sunucuyu başlatın.**
    ```bash
    npm run dev
    ```
    
      **Frontend klasörüne gidip uygulamayı başlatın.**
    ```bash
    npx expo
    ```
    * Uygulama başarıyla başlatıldığında, emülatörde çalışmaya başlayacaktır. 🎉
---

## 📺 Uygulama Videosu
▶️ [Watch Project Video on YouTube](https://www.youtube.com/watch?v=HNabMaJXh2k&list=PLaSpFRq997qkS7FKvSbqHG7zZSuFrEIb2&index=6)

  
### Bu proje, sadece portföy amacıyla ve ticari bir amaç gütmeden paylaşılmaktadır.
### This project is shared solely for portfolio purposes and without any commercial intent.
