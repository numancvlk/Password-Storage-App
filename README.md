# 🚀 REACT NATIVE - Password Storage App 🚀

## 🚀 Proje Hakkında 
Bu proje, kullanıcıların kolay bir şekilde kullanıcı adlarını ve şifrelerini defterler yerine kendi telefonunda saklaması için tasarlanmıştır. TypeScript, React Native ve MONGODB kullanarak sıfırdan geliştirdim.

## ✨ Özellikler 
* **✅ Yeni Şifre Ekleme:** Basit ve kullanıcı dostu arayüzle hızla yeni şifrelerinizi oluşturun.
* **🗑️ Şifreleri Silme:** İhtiyacınız olmayan kullanıcı adlarını ve şifrelerinizi kolayca kaldırın.
* **✏️ Şifreleri Düzenleme:** Var olan şfirelerinizi anında güncelleyin.
* **🔒 Tüm Şifreleriniz Tek Ekranda:** Uygulamaya eklemiş olduğunuz tüm kullanıcı adlarınız ve şifreleriniz tek ekranda.
* **🔑 Şifrelerinizi Tüm Detaylarıyla Görüntüleyin:** Uygulama eklediğiniz tüm şifrelerinizi detaylıca görüntüleyin.

### 📸 Ekran Görüntüleri 
| Login Ekranı | Kayıt Ekranı | 
| :---------------------------------: | :------------------------: |
| <img width="540" height="1110" alt="1LoginScreen" src="https://github.com/user-attachments/assets/75c61bf1-9b0a-4d96-942c-33ae9418536a" /> | <img width="540" height="1110" alt="2RegisterScreen" src="https://github.com/user-attachments/assets/db5d0060-908b-4840-bf1d-0d78789017bc" />

| Passwords Ekranı | New Password Ekranı | 
| :---------------------------------: | :------------------------: |
|<img width="540" height="1110" alt="3PasswordsScreen" src="https://github.com/user-attachments/assets/bdd0fad5-be53-4160-8dbb-db018f196247" /> | <img width="540" height="1110" alt="4NewPasswordScreen" src="https://github.com/user-attachments/assets/438b746f-6082-4965-8c39-33daea73afd1" />

| Edit Password Ekranı | Password Details Ekranı | 
| :---------------------------------: | :------------------------: |
| <img width="540" height="1110" alt="5EditPassword" src="https://github.com/user-attachments/assets/994448f1-f8ee-4831-9318-bae9cb3e5737" /> | <img width="540" height="1110" alt="6PasswordDetails" src="https://github.com/user-attachments/assets/7ee6243f-41b2-4199-b374-a4d1c28addae" />

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
