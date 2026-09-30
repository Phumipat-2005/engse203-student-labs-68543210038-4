# AI_USAGE — LAB 10

บันทึกการใช้ AI ระหว่างทำงาน · **ใช้ AI ได้ แต่ต้องเป็นเจ้าของโค้ดที่ส่ง**

---

## ครั้งที่ 1

**ถามอะไร**
* แนวทางการทดสอบและพิสูจน์การป้องกัน SQL Injection ด้วย Parameterized Query ใน CP31, การแปลง Error จากฐานข้อมูล SQLite (Foreign Key, CHECK, UNIQUE) ให้ตอบกลับเป็น HTTP Status 400/409 ผ่าน `AppError` ใน CP32, การแก้ไขปัญหาการรัน Automated Test ใน `tests/api.test.js` (การแก้ไข import `createApp` และการ Clean up ข้อมูล) ใน CP33, รวมถึงการอัปเดต Data Model และพฤติกรรม Auto-provisioning ของผู้ใช้ใน `API_CONTRACT.md` สำหรับ CP34

**AI ตอบว่าอย่างไร (สรุปสั้น)**
* แนะนำการใช้ Parameterized Query (`?`) แทนการต่อสตริงตรง ๆ พร้อมชุดคำสั่ง `curl` ยิงทดสอบ 3 รูปแบบ, แนะนำฟังก์ชัน `toAppError` ใน Service Layer เพื่อแปลง Error จากฐานข้อมูลเป็นข้อความภาษาไทยและส่งรหัส 4xx, ชี้แนะแนวทางการเขียน Test 6 เคสและการแก้ปัญหา Module Error ด้วยการนำเข้า `createApp` จาก `app.js`, และให้โครงสร้างรายละเอียด Data Model สำหรับบันทึกข้อแตกต่างระหว่างโครงสร้าง DB กับ API Response ในสัญญา

**ใช้ส่วนไหน / แก้เองตรงไหน**
* ตรวจสอบและใช้ Parameterized Query ใน `requestService.js` ทุกจุด, นำ `toAppError` ไปครอบ `try-catch` ในฟังก์ชัน `create` และ `updateStatus`, แก้ไขการ import `createApp` และเขียนคำสั่งลบข้อมูลทดสอบใน `api.test.js` ด้วยตนเองจนเทสต์ผ่านทั้ง 6 เคส, บันทึกผลการทดสอบความปลอดภัยใน `SECURITY_TEST.md` และเรียบเรียงเนื้อหา Data Model ลงใน `API_CONTRACT.md`

**เข้าใจโค้ดที่ได้มาไหม** ☑ เข้าใจทั้งหมด ☐ เข้าใจบางส่วน ☐ ยังไม่เข้าใจ

---

## สรุป

- เข้าใจหลักการป้องกันช่องโหว่ SQL Injection ด้วย Parameterized Query และข้อจำกัดที่ไม่สามารถใช้ `?` กับชื่อคอลัมน์ได้
- เข้าใจการแปลง Database Error เป็น HTTP Status Code (400, 409) ที่สื่อความหมาย แทนที่จะปล่อยให้กลายเป็น 500
- เข้าใจการทำ Integration Test บนฐานข้อมูลจริง พร้อมการดูแลไม่ให้เกิดข้อมูลขยะตกค้าง (Idempotency)
- เข้าใจหน้าที่ของ Service Layer ในการเป็นตัวแปลงข้อมูลระหว่าง Relational Schema (`requester_id`) กับ API Payload (`requesterName`) และความสำคัญของการระบุพฤติกรรม Auto-provisioning ใน API Contract