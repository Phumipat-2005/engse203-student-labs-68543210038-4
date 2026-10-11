# บันทึกการไล่ปัญหา (Debug Log)

🏫 **TODO W12-LOG (CP45 · CP47)** — แต่ละ bug ตอบ 6 ข้อ · เขียนสั้น ๆ แต่ต้องชัด

---

## BUG #0 · ค่าขอบรายละเอียด 10 ตัวอักษร (test เจอ — ไม่มีผู้ใช้แจ้ง)

- **อาการ:** ส่งรายละเอียด 10 ตัวอักษรพอดี ถูกปฏิเสธ ทั้งที่ข้อความบอกว่า "อย่างน้อย 10"
- **วิธีทำซ้ำ:** unit test `validateRequestInput({ ...valid, details: '1234567890' })`
- **เครื่องมือ:** unit test ค่าขอบ (TC-03) — fail ทันทีที่เขียน
- **สาเหตุ (ไฟล์:บรรทัด):** `api/src/validators/requestValidator.js` เงื่อนไข `length <= MIN_DETAILS`
- **วิธีแก้:** เปลี่ยนเป็น `length < MIN_DETAILS`
- **test ที่กัน:** `tests/unit/requestValidator.test.js` → "10 ตัวอักษร → ผ่าน (ตรงขอบพอดี)"

## BUG #1 · ลบคำร้องแล้วเพิ่มใหม่ ได้ 500

- **อาการ:** หลังลบคำร้องที่อยู่กลางรายการ การสร้างคำร้องใหม่ตอบ 500
- **วิธีทำซ้ำ:** ลบ `REQ-002` แล้วส่ง `POST /api/requests` ด้วยข้อมูลที่ถูกต้อง
- **เครื่องมือ:** integration test ด้วย Supertest และดู error จาก SQLite
- **สาเหตุ (ไฟล์:บรรทัด):** `api/src/services/requestService.js` ฟังก์ชัน `nextId()` ใช้จำนวนแถว + 1 จึงนำรหัสที่ยังมีอยู่มาใช้ซ้ำ
- **วิธีแก้:** หาเลขรหัสที่มากที่สุดซึ่งยังอยู่ในตาราง แล้วบวก 1
- **test ที่กัน:** `tests/integration/requests.api.test.js` → ลบ `REQ-002` แล้วสร้างคำร้องใหม่ คาดหวัง `201` และ `REQ-006`

## BUG #2 · Dashboard แสดง "กำลังดำเนินการ 0"

- **อาการ:** Dashboard แสดงจำนวนกำลังดำเนินการเป็น 0 ทั้งที่มีคำร้องสถานะ `in-progress`
- **วิธีทำซ้ำ:** เปิด Dashboard แล้วเทียบการ์ดสรุปกับสถานะจาก `GET /api/requests`
- **เครื่องมือ:** ตรวจค่า response ใน Network/DevTools และเพิ่ม unit test ให้ pure function สรุปข้อมูล
- **สาเหตุ (ไฟล์:บรรทัด):** `frontend/src/utils/requestSummary.js` ฟังก์ชัน `summarizeRequests()` กรองคำว่า `in progress` ซึ่งไม่ตรงกับค่าจริง `in-progress`
- **วิธีแก้:** ใช้ค่า status `in-progress` ให้ตรงกับ API และฐานข้อมูล
- **test ที่กัน:** `frontend/src/utils/requestSummary.test.js` → ข้อมูล `in-progress` สองรายการต้องได้ `inProgress: 2`

## BUG #3 · เปลี่ยนสถานะคำร้องที่ไม่มีอยู่ ได้ 500

- **อาการ:** การเปลี่ยนสถานะคำร้องที่ไม่มีอยู่ตอบ 500 แทน 404
- **วิธีทำซ้ำ:** ส่ง `PUT /api/requests/REQ-999` พร้อม `{ "status": "completed" }`
- **เครื่องมือ:** integration test ด้วย Supertest แล้วตรวจ stack trace ที่ได้จาก API
- **สาเหตุ (ไฟล์:บรรทัด):** `api/src/controllers/requestController.js` เดิมอ่าน `updated.id` ก่อนตรวจว่า service คืน `null` สำหรับรหัสที่ไม่มีอยู่
- **วิธีแก้:** ตรวจ `updated` ก่อนใช้งาน แล้วตอบ 404 เมื่อไม่พบคำร้อง
- **test ที่กัน:** `tests/integration/requests.api.test.js` → PUT รหัส `REQ-999` ต้องตอบ 404
