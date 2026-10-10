# หลักฐานการสาธิต (A4) — CP42

## ช่วง A — สาธิตระบบทำงานครบวงจร
🔗 ลิงก์วิดีโอ: https://drive.google.com/file/d/1KmsZdGHvK9Qb1Mgr5AWE8gJ9kUUOGU-Y/view?usp=sharing
- [x] เปิดระบบครบ 3 ชั้น (React + API + DB)
- [x] สาธิต CRUD ครบวงจร (ดู, เพิ่ม, เปลี่ยนสถานะ, ลบ)
- [x] ทดสอบ GET /api/health แสดงสถานะ ok และ DB connected
- [x] พิสูจน์ข้อมูลถาวร (ปิด-เปิดเซิร์ฟเวอร์ใหม่ ข้อมูลยังอยู่)
- [x] สาธิต Production Mode บน Single Port

## ช่วง B — อธิบาย Source Code
🔗 ลิงก์วิดีโอ: https://drive.google.com/file/d/1sTknga7_JQHnoSeR-uCI5JfNnZlonI95/view?usp=sharing
- [x] Frontend เรียก API อย่างไร (services/apiClient.js)
- [x] Request Flow (Route → Controller → Service → Database)
- [x] Service คุยกับ SQLite ผ่าน Prepared Statements
- [x] การรวมศูนย์อ่าน Config จาก Environment Variables
- [x] การทำงานของ Health Check ลึกถึงระดับฐานข้อมูล
- [x] ความแตกต่างระหว่างโหมด Development และ Production Build

### 🔗 https://campus-service-68543210038-4.onrender.com/
ฐานข้อมูล: SQLite ไฟล์ (รีเซ็ตเมื่อ restart) / Turso (ข้อมูลถาวร)