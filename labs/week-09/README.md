# week-09 — sql-fundamentals

## วัตถุประสงค์

ออกแบบและใช้งานฐานข้อมูล SQLite สำหรับระบบ Campus Service Request โดยฝึกสร้างตาราง กำหนด Primary Key และ Foreign Key ใช้ข้อกำหนดของคอลัมน์เพื่อรักษาความถูกต้องของข้อมูล และเขียน SQL สำหรับค้นหาและสรุปผล

## โจทย์

- ออกแบบตาราง `users` และ `requests` ให้สัมพันธ์กันแบบหนึ่งต่อหลาย โดย `requests.requester_id` อ้างอิง `users.id`
- สร้างตารางและข้อมูลตั้งต้นด้วย `schema.sql` ซึ่งต้องรันซ้ำได้
- เขียนคำสั่ง SELECT อย่างน้อย 8 ข้อ ครอบคลุม `WHERE`, `ORDER BY`, `JOIN` และการค้นหาด้วย `LIKE`
- อธิบายการออกแบบตารางและเหตุผลที่แยกข้อมูลผู้ใช้กับคำร้องใน `DATA_MODEL.md`
- ทดลองข้อกำหนดฐานข้อมูล เช่น Foreign Key, CHECK, UNIQUE และ NOT NULL พร้อมบันทึกผลในหลักฐาน
- ทำ Challenge เพิ่มเติมด้วย `GROUP BY`, ฟังก์ชันรวม และ INDEX

## โครงสร้างข้อมูล

- `users`: ข้อมูลผู้แจ้ง ได้แก่ชื่อ ภาควิชา และอีเมลที่ไม่ซ้ำกัน
- `requests`: รายละเอียดคำร้อง โดยเก็บ `requester_id` เพื่อเชื่อมกับผู้แจ้ง ไม่คัดลอกชื่อผู้ใช้มาเก็บซ้ำ
- `requests` จำกัดประเภทคำร้อง ความเร่งด่วน และสถานะด้วย CHECK; ใช้ค่าเริ่มต้นสำหรับ `priority`, `status` และ `created_at`

ดูรายละเอียดและตัวอย่างผล JOIN ได้ที่ [`source/DATA_MODEL.md`](source/DATA_MODEL.md)

## ไฟล์งาน

- [`source/schema.sql`](source/schema.sql): สร้างตารางและเพิ่มข้อมูลเริ่มต้น การรันไฟล์นี้จะลบตารางเดิมก่อนสร้างใหม่
- [`source/queries.sql`](source/queries.sql): คำสั่งค้นหาและ Challenge
- [`source/campus.db`](source/campus.db): ฐานข้อมูล SQLite ที่ checker ใช้ตรวจ
- [`source/check-week09.mjs`](source/check-week09.mjs): สคริปต์ตรวจโครงสร้าง ข้อมูล และไฟล์งาน
- [`evidence/CONSTRAINT_TEST.md`](evidence/CONSTRAINT_TEST.md): SQL และผลทดสอบข้อกำหนดฐานข้อมูล

## วิธีรัน

ต้องมี SQLite CLI สำหรับเปิดฐานข้อมูล และ Node.js ที่รองรับโมดูล `node:sqlite` สำหรับใช้ checker

จากโฟลเดอร์ `source` เปิดฐานข้อมูลและรันคำสั่ง SQL:

```sh
cd labs/week-09/source
sqlite3 campus.db
```

ที่พรอมต์ `sqlite>` สามารถรัน schema ใหม่หรือชุด query ได้ด้วยคำสั่ง:

```text
.read schema.sql
.read queries.sql
```

การรัน `.read schema.sql` จะสร้างตารางและข้อมูลตั้งต้นใหม่ ส่วน `.read queries.sql` จะแสดงผล query ใน terminal

## วิธีตรวจ

จากโฟลเดอร์หลักของ repository รัน:

```sh
node labs/week-09/source/check-week09.mjs
```

ตรวจเฉพาะงานในห้อง (CP17–CP21) ได้ด้วย:

```sh
node labs/week-09/source/check-week09.mjs --inclass
```

ผลตรวจล่าสุด: ผ่าน `30/30` รายการ รวมงานในห้อง `11/11`, งานที่บ้าน `16/16` และ Challenge `3/3` รายการ Checker ตรวจไฟล์ โครงสร้าง และข้อมูลบางส่วน แต่ไม่สามารถยืนยันความเข้าใจหรือทดแทนการทดสอบ query ด้วยตนเองได้

## หลักฐาน

รายละเอียดการทดลอง Foreign Key, CHECK, UNIQUE และ NOT NULL พร้อม error ที่เกิดขึ้นจริงอยู่ใน [`evidence/CONSTRAINT_TEST.md`](evidence/CONSTRAINT_TEST.md)

## ผลงานที่เผยแพร่

สัปดาห์นี้เป็นงานฐานข้อมูล SQL ไม่มีหน้าเว็บสำหรับเผยแพร่ โดยโฟลเดอร์ `publish/` มีเพียงไฟล์ placeholder ตามโครงสร้าง repository
