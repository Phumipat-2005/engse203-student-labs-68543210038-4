# Campus Service — Full-Stack (Week 11 · starter)

## 1. ภาพรวม (Overview)

แอปพลิเคชันจัดการคำร้องแบบ Full-Stack ประกอบด้วย 3 ส่วนหลัก:

- **Frontend:** React + Vite (Single Page Application)
- **Backend API:** Express.js บน Node.js (เวอร์ชัน 22.13.0 ขึ้นไป)
- **Database:** SQLite (จัดการผ่านโมดูล `node:sqlite`)
- **คุณสมบัติเด่น:** มีระบบ Health Check ตรวจสอบสถานะการเชื่อมต่อฐานข้อมูล, รองรับการทำงาน CRUD ครบวงจร, และสามารถ Build เป็น Production ให้เสิร์ฟผ่านพอร์ตเดียวได้

---

## 2. สถาปัตยกรรม 3 ชั้น (3-Tier Architecture)

ระบบแยกความรับผิดชอบออกเป็น 3 ชั้นอย่างชัดเจน (Separation of Concerns):

```
┌───────────────┐ HTTP / REST ┌───────────────┐ SQL ┌───────────────┐
│ Frontend │ ──────────────────► │ Backend API │ ────────────────► │ Database │
│ (React + Vite)│ ◄────────────────── │ (Express) │ ◄──────────────── │ (SQLite) │
└───────────────┘ JSON └───────────────┘ Rows └───────────────┘
```

| ชั้น         | หน้าที่                                                                           | โฟลเดอร์    |
| :----------- | :-------------------------------------------------------------------------------- | :---------- |
| **Frontend** | หน้าจอติดต่อผู้ใช้, จัดการ UI/State, เรียกใช้ REST API                            | `frontend/` |
| **API**      | จัดการเส้นทาง (Routes), ตรวจสอบความถูกต้อง (Validation), Controllers และ Services | `api/src/`  |
| **Database** | จัดเก็บข้อมูลถาวร (Data Persistence) ด้วยไฟล์ SQLite                              | `api/data/` |

---

## 3. วิธีรันโหมดพัฒนา (Development Run)

การรันโหมด Dev จะต้องเปิดทำงานแยกกัน 2 Terminal:

### 1) เตรียมฐานข้อมูล (ทำครั้งแรก)

```bash
cd api
npm install
cp .env.example .env
npm run db:setup
```

### 2) รันเซิร์ฟเวอร์ทั้งสองฝั่ง

- **Terminal 1 — API Server (พอร์ต 3001):**
  ```bash
  cd api
  npm run dev
  ```
- **Terminal 2 — Frontend Client (พอร์ต 5173):**
  ```bash
  cd frontend
  npm install
  npm run dev
  ```

---

## 4. วิธีรันโหมดพร้อมใช้งานจริง (Production Run)

ในโหมด Production ระบบจะรันผ่านพอร์ตเดียว (Single Port) โดยให้ Express เสิร์ฟทั้ง REST API และไฟล์ Static HTML/JS ของ Frontend:

```bash
# รันที่ root โฟลเดอร์ (labs/week-11/source)
npm run build
NODE_ENV=production PORT=3001 npm start
```

- เปิดใช้งานผ่านเบราว์เซอร์ที่: `http://localhost:3001/`
- หน้าเว็บ React จะถูกเสิร์ฟที่ root path `/` และ API จะทำงานที่ `/api/...`

---

## 5. ตาราง Environment Variables

### ฝั่ง Backend (`api/.env`)

| ตัวแปร        | หน้าที่                                        | ค่าเริ่มต้น (Default)   | จำเป็นบน Production        |
| :------------ | :--------------------------------------------- | :---------------------- | :------------------------- |
| `PORT`        | พอร์ตที่ API รัน                               | `3001`                  | ไม่จำเป็น (Cloud กำหนดให้) |
| `NODE_ENV`    | สภาพแวดล้อมระบบ (`development` / `production`) | `development`           | จำเป็น (`production`)      |
| `CORS_ORIGIN` | Origin ของ Frontend ที่อนุญาต                  | `http://localhost:5173` | ปรับตามโดเมนจริง           |
| `DB_FILE`     | พาธไฟล์ฐานข้อมูล SQLite                        | `./data/campus.db`      | ใช้ค่าเริ่มต้น             |

### ฝั่ง Frontend (`frontend/.env.production`)

| ตัวแปร              | หน้าที่                     | ค่าที่ต้องกำหนด                                        |
| :------------------ | :-------------------------- | :----------------------------------------------------- |
| `VITE_API_BASE_URL` | URL ของ API สำหรับการ Build | ปล่อยว่าง (เพื่อให้เรียกผ่าน relative path `/api/...`) |

---

## 6. การตัดสินใจออกแบบ (Design Decisions)

1. **ทำไมต้องแยกสถาปัตยกรรมเป็น 3 ชั้น?**
   - เพื่อลดการผูกติดกันของโค้ด (Decoupling) การแก้ไข Business Logic หรือการเปลี่ยนเทคโนโลยีฐานข้อมูลที่ชั้น Backend Service จะไม่กระทบต่อส่วน UI บนหน้าเว็บ
2. **ทำไมถึงเลือกใช้ SQLite แทน MongoDB?**
   - ข้อมูลคำร้องภายในระบบมีโครงสร้าง Schema ที่ชัดเจนและมีความสัมพันธ์แบบเชิงสัมพันธ์ (Relational Data)
   - SQLite เป็น Serverless Database ที่จัดเก็บในไฟล์เครื่องโดยตรง ไม่ต้องต่อเน็ตภายนอก ประสิทธิภาพสูงสำหรับการทดสอบ และทำงานแบบ Synchronous ได้อย่างเสถียร
