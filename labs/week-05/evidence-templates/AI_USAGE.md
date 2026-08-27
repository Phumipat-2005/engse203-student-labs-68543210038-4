# ENGSE203 LAB05 — AI / Resource Usage

| Tool / Resource | Purpose | Used portion | How I verified | My final decision |
|---|---|---|---|---|
| Gemini AI | ปรึกษาแนวทางการแก้ไข Logic LocalStorage Recovery (R14) และการจัดการสิทธิ์ Vite บน WSL | ฟังก์ชัน `readStoredRequests` ใน `requestStorage.js` และ `loadNormalRequests` ใน `requestService.js` | ตรวจสอบโค้ดทีละบรรทัด (source review) และรันคำสั่ง `npm run check` รวมทั้งทดสอบจริงบนเบราว์เซอร์ (runtime test) | นำโค้ดมาปรับใช้และทดสอบผ่านทุก Test Suite |
| Gemini AI | ตรวจทานและจัดทำแบบฟอร์ม Test Report | โครงสร้างตารางและผลการทดสอบใน `TEST_REPORT.md` | ทดสอบตามขั้นตอนจริงทุก Test Case (TC-L5-01 ถึง 24) บนเบราว์เซอร์และ GitHub Pages | บันทึกผลตามที่เกิดขึ้นจริงทั้งหมด |

คำรับรอง:

- [x] ไม่ส่ง token, password, secret หรือข้อมูลส่วนบุคคลจริงให้เครื่องมือ
- [x] ตรวจ source และรัน test ด้วยตนเอง
- [x] อธิบาย Route, Effect, Service Layer และ persistence ของ final code ได้
