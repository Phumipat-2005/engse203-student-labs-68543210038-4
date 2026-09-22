# API_TEST — LAB 07

**ชื่อ–รหัส:** นายภูมิพัฒน์ วงศ์ดาว **วันที่ทดสอบ:** 22/09/2026

> บันทึก **ผลจริง** ที่เห็น ไม่ใช่ผลที่ควรได้ · ถ้าไม่ผ่านให้เขียนว่าไม่ผ่าน

| # | หัวข้อ / สิ่งที่ทดสอบ | ไฟล์ที่เกี่ยวข้อง | วิธีทดสอบ / คำสั่ง | ผลการทดสอบจริงที่พบ | หลักฐานอ้างอิง | ผ่าน |
|---|---|---|---|---|---|:---:|
| 9 | เจอ CORS error ด้วยตาตัวเอง | `frontend/src/services/requestService.js` | เรียก `fetch` ไปยัง port 3001 จากหน้า Dashboard (5173) | Console แจ้งเตือน CORS blocked แต่ Terminal API ฝั่งขวาได้รับคำขอ (200 OK) | DevTools Console | ☑ |
| 10 | เปิด CORS + Environment Config | `api/src/config.js`, `app.js`, `server.js` | ใส่ `cors()` บนสุด และสลับค่า `PORT` ใน `.env` | CORS error หายไป, Terminal เปลี่ยนพอร์ตตาม `.env` จริง | `images/network-cors-ok.png` | ☑ |
| 11 | API Client + แก้ Service Layer | `apiClient.js`, `requestService.js` | ทดสอบเปิด Dashboard, เพิ่ม/ลบคำร้อง, และเข้า `REQ-999` | หน้าเว็บโหลดข้อมูลจาก API ได้, ลบ/เพิ่มบันทึกจริง, `REQ-999` ขึ้น "ไม่พบคำร้อง" | `images/app-with-api.png` | ☑ |
| 12 | Loading และ Error State | `frontend/src/pages/DashboardPage.jsx` | ปิด API (Ctrl+C) แล้วกดรีเฟรชหน้าเว็บ | แสดงกล่องข้อความภาษาไทย "ติดต่อเซิร์ฟเวอร์ไม่ได้..." พร้อมปุ่มลองใหม่ | `images/error-state.png` | ☑ |
| 13 | PUT เปลี่ยนสถานะ — ทั้งสองฝั่ง | `requestService.js`, `RequestDetailPage.jsx` | ยิง Postman `PUT` (200/400/404) และกดปุ่ม Change Status บนหน้าเว็บ | สถานะบนหน้าเว็บเปลี่ยนจริง, รีเฟรชแล้วค่ายังอยู่, ปุ่ม disabled ระหว่างรอ API | Postman + หน้าเว็บจริง | ☑ |
| 14 | Logging & Error ระดับ Production | `api/src/app.js`, `errorHandler.js` | สลับ `NODE_ENV=production` แล้วยิง error route ใน Postman | Terminal แสดง log แบบ combined และ JSON error ไม่เปิดเผย stack trace | Terminal + Postman | ☑ |
| 15 | เขียน API Contract | `API_CONTRACT.md` | ตรวจสอบ contract ครบทั้ง 5-6 endpoints | ระบุ schema, ตัวอย่าง JSON จากการยิงจริง, CORS, และ env ครบถ้วน | ไฟล์ `API_CONTRACT.md` | ☑ |
| 16 | Automated Test | `api/tests/api.test.js` | รันคำสั่ง `npm test` ในโฟลเดอร์ `api` | ผ่านครบทั้ง 6 เคส (`pass 6 / fail 0`) ตามเกณฑ์ CP16 | Terminal `npm test` | ☑ |

## ⭐ Challenge (ถ้าทำ)

| # | หัวข้อ / สิ่งที่ทดสอบ | ไฟล์ที่เกี่ยวข้อง | วิธีทดสอบ / คำสั่ง | ผลการทดสอบจริงที่พบ | หลักฐานอ้างอิง | ผ่าน |
|---|---|---|---|---|---|:---:|
| 17 | AppError — กำหนด status เองได้ | | | | | ☐ |
| 18 | asyncHandler — ห่อ handler ที่เป็น async | | | | | ☐ |
| 19 | Retry อัตโนมัติฝั่ง React | | | | | ☐ |

## ทดสอบว่าหน้าเว็บเรียกหาข้อมูลจากหลังบ้านจริง (CP10 / CP11)

| ขั้น | ทำอะไร | ผลที่เห็น |
|---|---|---|
| 1 | POST เพิ่มคำร้องใหม่ผ่าน Postman | ได้ status 201 พร้อม object ข้อมูลและรหัส ID ใหม่ |
| 2 | เปิดหน้าเว็บ Dashboard (`http://localhost:5173`) | เห็นคำร้องใหม่ที่เพิ่งเพิ่มแสดงบนหน้าจอทันที และ Network tab เห็นคำขอ GET ได้ status 200 |
| 3 | ปิดเซิร์ฟเวอร์ API แล้วกดรีเฟรชหน้า Dashboard | หน้าเว็บโหลดไม่สำเร็จและแสดงข้อความ "ติดต่อเซิร์ฟเวอร์ไม่ได้ — ตรวจว่าเปิด API ที่พอร์ต 3001 แล้วหรือยัง" พิสูจน์ว่าไม่ได้อ่านจาก localStorage |
| 4 | เปิดเซิร์ฟเวอร์ API กลับมา แล้วกดปุ่ม "ลองอีกครั้ง" | หน้าเว็บกลับมาดึงข้อมูลคำร้องจาก API และแสดงผลสำเร็จตามปกติ |

## สรุปผล

- ผ่าน 8 / 8 (+ Challenge 0 / 3)
- รายการที่ไม่ผ่านและสาเหตุ:

## Screenshot ที่แนบ

- [x] `images/network-cors-ok.png`
- [x] `images/app-with-api.png`
- [x] `images/error-state.png`
