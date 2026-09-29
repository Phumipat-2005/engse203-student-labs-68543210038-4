## ผลการทดสอบ Constraint (CP25)

**คำสั่ง SQL ที่ใช้ทดสอบ 5 สิ่งที่ต้องทำ และผล Error ที่ได้จริง:**

```sql
-- ① Foreign Key: ใส่คำร้องที่ requester_id = 99999
INSERT INTO requests (id, requester_id, request_type, location, details)
VALUES ('REQ-TEST-1', 99999, 'แจ้งซ่อม', 'ห้อง 101', 'ทดสอบ FK');
-- ผลที่ได้: FOREIGN KEY constraint failed ✓ ถูกปฏิเสธตามที่ควร

-- ② CHECK: ใส่ status = 'ยกเลิก'
INSERT INTO requests (id, requester_id, request_type, location, details, status)
VALUES ('REQ-TEST-2', 1, 'แจ้งซ่อม', 'ห้อง 101', 'ทดสอบ CHECK', 'ยกเลิก');
-- ผลที่ได้: CHECK constraint failed ✓ ถูกปฏิเสธตามที่ควร

-- ③ UNIQUE: ใส่อีเมลซ้ำกับคนที่มีอยู่ (somchai@rmutl.ac.th)
INSERT INTO users (name, department, email)
VALUES ('สมชาย สอง', 'วิศวกรรมซอฟต์แวร์', 'somchai@rmutl.ac.th');
-- ผลที่ได้: UNIQUE constraint failed: users.email ✓ ถูกปฏิเสธตามที่ควร

-- ④ UNIQUE: ใส่รหัสคำร้อง id ซ้ำ (REQ-001)
INSERT INTO requests (id, requester_id, request_type, location, details)
VALUES ('REQ-001', 1, 'แจ้งซ่อม', 'ห้อง 101', 'ทดสอบ id ซ้ำ');
-- ผลที่ได้: UNIQUE constraint failed: requests.id ✓ ถูกปฏิเสธตามที่ควร

-- ⑤ NOT NULL: ใส่คำร้องโดยไม่ระบุ location
INSERT INTO requests (id, requester_id, request_type, details)
VALUES ('REQ-TEST-5', 1, 'แจ้งซ่อม', 'ทดสอบ NOT NULL');
-- ผลที่ได้: NOT NULL constraint failed: requests.location ✓ ถูกปฏิเสธตามที่ควร
```