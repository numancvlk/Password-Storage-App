//KÜTÜPHANELER
import express from "express";
import mongoose from "mongoose";
import dotenv from "dotenv";

dotenv.config();

const app = express();
const PORT = process.env.PORT;
const MONGO_URI = process.env.MONGO_URI;

app.use(express.json());

if (!MONGO_URI) {
  console.log("MONGO_URI tanımlı değil.");
  process.exit(1);
}

mongoose
  .connect(MONGO_URI)
  .then(() => console.log("MongoDB bağlantısı başarılı."))
  .catch((err) => console.error("MongoDB bağlantı hatası:", err));

app.get("/", (req, res) => {
  res.send("Password Manager Backend Sunucusu Çalışıyor!");
});

// Sunucuyu başlat
app.listen(PORT, () => {
  console.log("Sunucu çalışıyor.");
});
