# API Contract — Campus Service Request API

**เวอร์ชัน:** 2.1.0 · **Base URL:** `http://localhost:3001`
**รูปแบบข้อมูล:** JSON (`Content-Type: application/json`)

---

## โครงสร้างข้อมูล Request

| field | ชนิด | คำอธิบาย | ตัวอย่าง |
|---|---|---|---|
| `id` | string | รหัสคำร้อง · ขึ้นต้นด้วย `REQ-` · เซิร์ฟเวอร์สร้างให้ | `"REQ-001"` |
| `requesterName` | string | ชื่อผู้แจ้ง · อย่างน้อย 2 ตัวอักษร | `"สมชาย ใจดี"` |
| `requestType` | string | ประเภท · 1 ใน 4 ค่าที่กำหนด | `"แจ้งซ่อม"` |
| `location` | string | สถานที่ · ห้ามว่าง | `"ห้องปฏิบัติการ 301"` |
| `details` | string | รายละเอียด · อย่างน้อย 10 ตัวอักษร | `"เครื่องปรับอากาศไม่ทำงาน"` |
| `priority` | string | `"normal"` หรือ `"urgent"` | `"urgent"` |
| `status` | string | `"pending"` · `"in-progress"` · `"completed"` | `"pending"` |

**ค่าที่ยอมรับของ `requestType`** — `แจ้งซ่อม` · `บริการบัญชีผู้ใช้` · `ขอใช้อุปกรณ์` · `อื่น ๆ`

---

## Endpoints

| Method | Endpoint | คำอธิบาย | Request body | สำเร็จ | ผิดพลาด |
|---|---|---|---|---|---|
| `GET` | `/api/requests` | ดูคำร้องทั้งหมด | — | `200` + array | — |
| `GET` | `/api/requests?status=` | กรองตามสถานะ | — | `200` + array | — |
| `GET` | `/api/requests/:id` | ดูคำร้องใบเดียว | — | `200` + object | `404` ไม่พบ |
| `POST` | `/api/requests` | สร้างคำร้องใหม่ | Request (ไม่ต้องมี `id`, `status`) | `201` + object ที่สร้าง | `400` ข้อมูลไม่ถูกต้อง |
| `PUT` | `/api/requests/:id` | เปลี่ยนสถานะ | `{ "status": "..." }` | `200` + object ที่แก้แล้ว | `400` สถานะผิด · `404` ไม่พบ |
| `DELETE` | `/api/requests/:id` | ลบคำร้อง | — | `204` ไม่มี body | `404` ไม่พบ |

---

## ตัวอย่างการเรียกใช้

### GET /api/requests

```http
GET /api/requests HTTP/1.1
Host: localhost:3001
```

```json
[
  {
    "id": "REQ-001",
    "requesterName": "สมชาย ใจดี",
    "requestType": "แจ้งซ่อม",
    "location": "ห้องปฏิบัติการ 301",
    "details": "เครื่องปรับอากาศไม่ทำงานตั้งแต่เช้า",
    "priority": "urgent",
    "status": "pending"
  }
]
```

### POST /api/requests

```http
POST /api/requests HTTP/1.1
Content-Type: application/json

{
  "requesterName": "สุภาวดี รักเรียน",
  "requestType": "ขอใช้อุปกรณ์",
  "location": "ห้องประชุม 2",
  "details": "ขอยืมโปรเจกเตอร์สำหรับนำเสนอ",
  "priority": "normal"
}
```

**201 Created**

```json
{
  "id": "REQ-MTYOA3MX-YEX9",
  "requesterName": "สุภาวดี รักเรียน",
  "requestType": "ขอใช้อุปกรณ์",
  "location": "ห้องประชุม 2",
  "details": "ขอยืมโปรเจกเตอร์สำหรับนำเสนอ",
  "priority": "normal",
  "status": "pending"
}
```

**400 Bad Request** — เมื่อข้อมูลไม่ถูกต้อง

```json
{
  "error": "ข้อมูลคำร้องไม่ถูกต้อง",
  "details": [
    "ชื่อผู้แจ้งต้องมีอย่างน้อย 2 ตัวอักษร",
    "รายละเอียดต้องมีอย่างน้อย 10 ตัวอักษร"
  ]
}
```

### PUT /api/requests/:id

```http
PUT /api/requests/REQ-001 HTTP/1.1
Content-Type: application/json

{ "status": "in-progress" }
```

**200 OK** — คืนคำร้องที่อัปเดตแล้ว

### DELETE /api/requests/:id

**204 No Content** — ไม่มี body ส่งกลับ

---

## รูปแบบ Error

ทุก error ตอบเป็น JSON ที่มี field `error` เสมอ

```json
{ "error": "ข้อความที่ผู้ใช้ทั่วไปอ่านเข้าใจ" }
```

กรณี validation จะมี `details` เพิ่มมาเป็น array บอกว่าผิดตรงไหนบ้าง

| Status | เมื่อไหร่ | ฝั่งไหนผิด |
|---|---|---|
| `400` | ข้อมูลที่ส่งมาไม่ถูกต้อง | ผู้ใช้ |
| `404` | ไม่พบทรัพยากรที่ขอ | ผู้ใช้ |
| `500` | โค้ดเซิร์ฟเวอร์ผิดพลาด | เซิร์ฟเวอร์ |

> **ตอน production จะไม่ส่ง stack trace กลับไป** — เปิดเผยโครงสร้างภายในให้คนภายนอกเห็นไม่ได้

---

## CORS

API อนุญาตให้เรียกจาก origin ที่กำหนดใน `CORS_ORIGIN` เท่านั้น

```
Access-Control-Allow-Origin: http://localhost:5173
```

**ถ้าเรียกจาก origin อื่น** เบราว์เซอร์จะบล็อกก่อนที่โค้ดจะได้เห็น response — จะเห็น error ใน Console ว่าถูกบล็อกโดย CORS policy

---

## Environment Variables

### ฝั่ง API (`api/.env`)

| ตัวแปร | ค่าเริ่มต้น | คำอธิบาย |
|---|---|---|
| `PORT` | `3001` | พอร์ตที่ API รับคำขอ |
| `CORS_ORIGIN` | `http://localhost:5173` | origin ที่อนุญาตให้เรียก |
| `NODE_ENV` | `development` | `production` จะเปลี่ยนรูปแบบ log และซ่อน stack trace |

### ฝั่ง Frontend (`frontend/.env.local`)

| ตัวแปร | ค่าเริ่มต้น | คำอธิบาย |
|---|---|---|
| `VITE_API_BASE_URL` | `http://localhost:3001` | ที่อยู่ของ API |

---

## การรันทั้งระบบ

ต้องเปิด **2 terminal** พร้อมกัน

```bash
# Terminal 1 — API
cd api && npm run dev          # http://localhost:3001

# Terminal 2 — Frontend
cd frontend && npm run dev     # http://localhost:5173
```

**ลำดับสำคัญ** — เปิด API ก่อนเสมอ ไม่งั้น frontend จะขึ้นข้อความว่าติดต่อเซิร์ฟเวอร์ไม่ได้
---

## สถาปัตยกรรมข้อมูล (Data Model)

ในสัปดาห์ที่ 10 ระบบได้เปลี่ยนผ่านจากการเก็บข้อมูลชั่วคราวในหน่วยความจำมาเป็นฐานข้อมูลเชิงสัมพันธ์ **SQLite (`campus.db`)** โดยแบ่งออกเป็น 2 ตารางเพื่อขจัดความซ้ำซ้อนของข้อมูล (Data Redundancy):

### 1. Data Model

| คอลัมน์ | ชนิดข้อมูล | ข้อกำหนด (Constraints) | คำอธิบาย |
|---|---|---|---|
| `id` | `INTEGER` | `PRIMARY KEY AUTOINCREMENT` | รหัสผู้ใช้ภายในระบบ |
| `name` | `TEXT` | `NOT NULL` | ชื่อ-นามสกุลของผู้แจ้ง |
| `department` | `TEXT` | `NOT NULL` | ภาควิชาหรือสังกัดหน่วยงาน |
| `email` | `TEXT` | `NOT NULL UNIQUE` | อีเมลสถาบัน (ห้ามซ้ำ) |

### 2. ตาราง `requests` (คำร้อง)

| คอลัมน์ | ชนิดข้อมูล | ข้อกำหนด (Constraints) | คำอธิบาย |
|---|---|---|---|
| `id` | `TEXT` | `PRIMARY KEY` | รหัสคำร้อง เช่น `REQ-001` |
| `requester_id` | `INTEGER` | `NOT NULL, FOREIGN KEY REFERENCES users(id)` | รหัสผู้แจ้ง อ้างอิงไปยังตาราง `users` |
| `request_type` | `TEXT` | `NOT NULL, CHECK (request_type IN (...))` | ประเภทคำร้อง (แจ้งซ่อม, บริการบัญชีผู้ใช้, ขอใช้อุปกรณ์, อื่น ๆ) |
| `location` | `TEXT` | `NOT NULL` | สถานที่เกิดเหตุ |
| `details` | `TEXT` | `NOT NULL` | รายละเอียดคำร้อง |
| `priority` | `TEXT` | `NOT NULL DEFAULT 'normal', CHECK (...)` | ความเร่งด่วน (`normal`, `urgent`) |
| `status` | `TEXT` | `NOT NULL DEFAULT 'pending', CHECK (...)` | สถานะ (`pending`, `in-progress`, `completed`) |
| `created_at` | `TEXT` | `NOT NULL DEFAULT (datetime('now','localtime'))` | วันเวลาที่สร้างคำร้อง |

---

## 2. ข้อสังเกตเรื่องรูปแบบ

โครงสร้างข้อมูลที่จัดเก็บในฐานข้อมูลจริง มีความแตกต่างจากรูปแบบ JSON Payload ที่ API ส่งออกไปยัง Frontend:
* **ในฐานข้อมูล:** จัดเก็บเป็น `requester_id` (ตัวเลขจำนวนเต็ม) เพื่อไม่ให้ข้อมูลชื่อหรือสังกัดถูกบันทึกซ้ำซ้อน
* **ใน API Response:** ส่งคืนฟิลด์ชื่อ `requesterName` (ข้อความชื่อผู้แจ้ง) เพราะฝั่ง Frontend (React) ต้องการนำไปเรนเดอร์แสดงผลทันที
* **การแปลงข้อมูล:** ชั้น Service (`requestService.js`) ทำหน้าที่เป็นตัวแปลงข้อมูล โดยใช้คำสั่ง SQL `JOIN users u ON u.id = r.requester_id` และตั้งชื่อเล่นคอลัมน์ด้วย `u.name AS requesterName` ทำให้หน้าบ้านไม่ต้องแก้ไขโค้ดใด ๆ ทั้งสิ้น

---

## 3. พฤติกรรมของ POST ⭐ สำคัญที่สุด

* **การสร้างผู้ใช้งานใหม่อัตโนมัติ (Auto-provisioning):**
  * เมื่อมีการส่งคำร้องผ่าน `POST /api/requests` โดยระบุ `requesterName` เข้ามา
  * หากชื่อผู้ใช้นั้น **มีอยู่แล้วในระบบ:** ระบบจะดึง `id` เดิมมาใช้เป็น `requester_id` ให้ทันที
  * หากชื่อผู้ใช้นั้น **ยังไม่มีอยู่ในระบบ:** เซิร์ฟเวอร์จะทำการสร้างระเบียนผู้ใช้ใหม่ในตาราง `users` ให้อัตโนมัติ (`INSERT INTO users`) โดยกำหนดสังกัดเป็น `'ไม่ระบุ'` และสร้างอีเมลชั่วคราวให้
  * **เหตุผลที่ต้องระบุพฤติกรรมนี้ไว้ในสัญญา:** พฤติกรรมนี้ไม่สามารถคาดเดาได้จากการดูแค่คำอธิบาย Endpoint หากไม่บันทึกไว้ ผู้พัฒนาที่นำ API ไปใช้งานต่ออาจไม่ทราบว่าการส่งคำร้องอาจส่งผลข้างเคียง (Side Effect) เป็นการสร้างผู้ใช้ขยะขึ้นในระบบได้

---

## ประวัติการเปลี่ยนแปลง (Changelog)

| เวอร์ชัน | วันที่ | รายละเอียดการเปลี่ยนแปลง |
|---|---|---|
| `1.0.0` | สัปดาห์ที่ 6 | กำหนดสัญญา API พื้นฐานสำหรับการส่งข้อมูล In-memory |
| `2.0.0` | สัปดาห์ที่ 7 | รองรับ CORS, เพิ่มการจำลอง Network delay และ Error Handling |
| `2.1.0` | สัปดาห์ที่ 10 | อัปเกรดระบบจัดเก็บข้อมูลเบื้องหลังเป็นฐานข้อมูล SQLite (`campus.db`), เพิ่มสถาปัตยกรรม Data Model, การแปลง `requester_id` เป็น `requesterName` ด้วย JOIN และระบุพฤติกรรมสร้าง User อัตโนมัติของ `POST` |
