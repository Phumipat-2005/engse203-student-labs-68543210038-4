# Pre-LAB 04 Reflection — CP07

ชื่อ–นามสกุล: นายภูมิพัฒน์ วงศ์ดาว
รหัสนักศึกษา: 68543210038-4

1. Component ใดเป็น state owner ของ tasks และ statusFilter เพราะเหตุใด?

   App เป็นเจ้าของ state ของ `requests` และ `statusFilter` เพราะ state ทั้งสองต้องใช้ร่วมกันระหว่าง component หลายตัว เช่น SummaryPanel, FilterBar และ RequestList จึงต้องเก็บไว้ที่ App แล้วส่งค่าเป็น props ลงไป.

2. ระบุตัวอย่าง Props ลงอย่างน้อย 2 จุด และ callback event ขึ้นอย่างน้อย 1 จุด

   - `SummaryPanel` รับ props `summary` จาก App.
   - `FilterBar` รับ props `value={statusFilter}` และ callback `onFilterChange={setStatusFilter}` จาก App.
   - `RequestList` รับ props `requests` และ callback `onDeleteRequest` จาก App.
   - เมื่อ RequestCard กดปุ่มลบ จะเรียก `onDeleteRequest(request.id)` เพื่อแจ้งให้ App ลบคำร้อง.

3. เมื่อนำ pattern ไปใช้ LAB 4 ต้องเปลี่ยน data contract, validation และ component responsibility อย่างไร?

   - data contract เปลี่ยนจาก task object เป็น request object ที่มี `requesterName`, `requestType`, `location`, `details`, `priority`, และ `status`.
   - validation ต้องเป็นไปตามโจทย์คำร้อง เช่น ชื่อผู้แจ้งอย่างน้อย 2 ตัวอักษร, เลือกประเภทคำร้อง, สถานที่ต้องไม่ว่าง, รายละเอียดอย่างน้อย 10 ตัวอักษร, priority ต้องเป็น `normal` หรือ `urgent`.
   - component responsibility ต้องแยกชัดเจน: App ดูแล state หลัก, RequestForm ดูแล form state และ error feedback, FilterBar ไม่มี state ของตัวเอง, RequestList/RequestCard รับ props เพื่อแสดงรายการ และ RequestCard ส่ง callback กลับ App เมื่อมีการลบ.

