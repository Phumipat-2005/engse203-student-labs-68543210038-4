# ENGSE203 LAB 4 — Student Evidence README

## ผู้จัดทำ

- ชื่อ–นามสกุล: นายภูมิพัฒน์ วงศ์ดาว
- รหัสนักศึกษา: 68543210038-4
- Section: SEC2

## URLs

- Repository: https://github.com/Phumipat-2005/engse203-student-labs-68543210038-4
- Pull Request: https://github.com/Phumipat-2005/engse203-student-labs-68543210038-4/pull/4
- GitHub Pages: https://phumipat-2005.github.io/engse203-student-labs-68543210038-4/

## โครงสร้าง Component

```
App (เป็นเจ้าของ state ของ requests และ statusFilter)
├── AppHeader
├── SummaryPanel (รับ props summary)
├── RequestForm (รับ callback onAddRequest, เป็นเจ้าของ formData, errors, feedback)
├── FilterBar (รับ props value และ callback onFilterChange)
└── RequestList (รับ props requests และ callback onDeleteRequest)
    └── RequestCard (รับ props request และ callback onDeleteRequest)
```

## การติดตั้งและรัน

```bash
nvm use
npm install
npm run dev
npm run check
npm run build
npm run preview
```

## อธิบาย State / Props / Callback

- `App` เป็นเจ้าของ state ของ `requests` และ `statusFilter`
- `RequestForm` เป็นเจ้าของ state ท้องถิ่น `formData`, `errors`, และ `feedback`
- `SummaryPanel` รับ props `summary` จาก App
- `FilterBar` รับ props `value={statusFilter}` และ callback `onFilterChange={setStatusFilter}` จาก App
- `RequestList` รับ props `requests` และ callback `onDeleteRequest` จาก App
- `RequestCard` รับ props `request` และเรียก `onDeleteRequest(request.id)` เมื่อกดปุ่มลบ

## หลักฐานการทดสอบ

| รหัส TC | ผลลัพธ์จริง | ผล | หลักฐาน/ภาพ |
|---|---|---|---|
| TC-01 Initial | หน้าเริ่มต้นแสดงคำร้องและสรุปถูกต้อง | ผ่าน | `../evidence/desktop.png` |
| TC-02 Controlled input | ฟิลด์ของฟอร์มอัปเดตตาม state | ผ่าน | `../evidence/validationState.png` |
| TC-03 Invalid | submit ผิดไม่เพิ่มคำร้อง และแสดง error | ผ่าน | `../evidence/validationState.png` |
| TC-04 Valid add | submit ถูกเพิ่มคำร้อง pending, สรุปเพิ่ม, ฟอร์ม reset | ผ่าน | `../evidence/validationState.png` |
| TC-05 Filter | แสดงเฉพาะสถานะที่เลือก | ผ่าน | `../evidence/desktop.png` |
| TC-06 All | เลือก all แล้วเห็นทุกสถานะ | ผ่าน | `../evidence/desktop.png` |
| TC-07 Empty | แสดงข้อความเมื่อไม่มีรายการ | ผ่าน | `../evidence/emptyState.png` |
| TC-08 Delete | ลบคำร้องตาม id และสรุป/รายการเปลี่ยน | ผ่าน | `../evidence/desktop.png` |
| TC-09 Mobile | responsive 375px ไม่มี horizontal scroll | ผ่าน | `../evidence/mobile-375.png` |
| TC-10 Keyboard | keyboard focus/label/error/feedback works | ผ่าน | `../evidence/validation-state.png` |
| TC-11 Build | `npm run build` ผ่าน | ผ่าน | `../evidence/desktop.png` |
| TC-12 Pages | preview Pages โหลด assets ได้ครบ | ผ่าน | `../evidence/desktop.png` |

## รูปภาพ

![Desktop screenshot](../evidence/desktop.png)

![Mobile 375 screenshot](../evidence/mobile-375.png)

![Validation state](../evidence/validation-state.png)

![Empty state](../evidence/empty-state.png)

## สรุป Week 03 → Week 04

Week 03 เราได้สร้างหน้าเว็บโดยใช้ HTML และ CSS เป็นหลักในการวางโครงสร้างและตกแต่งหน้าเว็บ ส่วนการเปลี่ยนแปลงข้อมูลหรือสถานะจะเขียนโค้ดปรับ DOM โดยตรงหรืออาศัย JavaScript แบบธรรมดา แต่ Week 04 เราได้ใช้ React ซึ่งทำให้เราเก็บข้อมูลคำร้องใน state และให้ component ทำงานเป็นตัวแสดงผล ถ้า state เปลี่ยน React จะ render UI ใหม่ให้เอง ทำให้โค้ดแยกเป็นส่วน ๆ ชัดเจนขึ้นและหลีกเลี่ยงการแก้ไข DOM โดยตรง

## เปิดเผยการใช้ AI / แหล่งข้อมูลภายนอก

ระบุเครื่องมือหรือแหล่งที่ใช้, prompt/คำถามสำคัญ, ส่วนที่นำมาปรับ และวิธีที่ตรวจสอบความถูกต้อง หากไม่ได้ใช้ให้เขียนว่า “ไม่ได้ใช้” <p>
Windows WSL Ubuntu-24.04 <p>
AI : Gemini, Copilot <p>
Browser : Edge <p>
document : https://github.com/se-rmutl/engse203-lab/blob/main/labs/week-04-react-components-state/lab04/README.md
