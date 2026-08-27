# ENGSE203 LAB05 — Student Test Report

**ชื่อ–รหัส:** นายภูมิพัฒน์ วงศ์ดาว-68543210038-4  
**OS / Browser / Node:** Windows WSL-Ubuntu24.04, Edge, Node 22.23.2 <br>
**Branch / Commit:** `lab/week-05` / fect(week05): 05B

กรอก Actual result จากการรันจริง ใช้ `PASS`, `FAIL` หรือ `NOT RUN` และอ้างหลักฐานแบบ relative path

| Test ID | Preconditions / procedure summary | Actual result | Status | Evidence / Notes |
|---|---|---|---|---|
| TC-L5-01 | เปิด `#/` | แสดงหน้า Dashboard พร้อมรายการคำร้องและแผงสรุปสถานะครบถ้วน | PASS | `images/route-dashboard.png` |
| TC-L5-02 | ใช้ navigation 3 รายการ | สลับหน้าระหว่าง Dashboard, New Request และ About ได้ถูกต้อง URL เปลี่ยนตาม hash | PASS | Navigation bar ทำงานถูกต้อง |
| TC-L5-03 | เปิด/refresh `#/requests/new` | แสดงฟอร์มสร้างคำร้องใหม่อย่างถูกต้อง รีเฟรชหน้าแล้วไม่หลุดไปหน้าอื่น | PASS | Form rendering ปกติ |
| TC-L5-04 | เปิด `#/requests/REQ-001` | แสดงรายละเอียดของคำร้องรหัส REQ-001 ครบถ้วนถูกต้อง | PASS | `images/route-detail-found.png` |
| TC-L5-05 | เปิด `#/requests/REQ-999` | แสดงสถานะ Not Found แจ้งว่าไม่พบข้อมูลคำร้องที่ระบุ | PASS | `images/route-detail-not-found.png` |
| TC-L5-06 | เปิด `#/unknown` | แสดงหน้า 404 Not Found Page พร้อมปุ่มนำทางกลับหน้าหลัก | PASS | `images/route-not-found.png` |
| TC-L5-07 | ลบ LAB05 key แล้วเปิด Dashboard | ระบบตรวจไม่พบ key จึงดึง seed data มาบันทึกลง localStorage ให้อัตโนมัติ | PASS | Initial data fallback สำเร็จ |
| TC-L5-08 | สังเกตช่วง latency | แสดง LoadingState ชัดเจนระหว่างรอหน่วงเวลาจำลอง 420ms | PASS | `images/state-loading.png` |
| TC-L5-09 | เปิด `#/?scenario=error` | แสดง ErrorState แจ้งเตือนข้อผิดพลาดพร้อมปุ่มกด Retry | PASS | `images/state-error-retry.png` |
| TC-L5-10 | กด Retry | ระบบทำการโหลดข้อมูลใหม่อีกครั้งตามที่กำหนด | PASS | Retry trigger ทำงานปกติ |
| TC-L5-11 | เปิด `#/?scenario=empty` | แสดง EmptyState แจ้งว่าไม่พบรายการคำร้องในระบบ | PASS | `images/state-empty.png` |
| TC-L5-12 | รัน public checker | รัน `npm run check` ผ่านครบทุกเงื่อนไข 100% | PASS | `images/npm-run-check.png` passed all suites |
| TC-L5-13 | submit form ผิด validation | แสดงข้อความแจ้งเตือนข้อผิดพลาดใต้ช่องกรอก และไม่อนุญาตให้ส่งฟอร์ม | PASS | Validation schema ทำงานถูกต้อง |
| TC-L5-14 | เพิ่ม valid request แล้ว refresh | คำร้องใหม่ถูกบันทึกลง localStorage และคงอยู่หลังรีเฟรชหน้าเว็บ | PASS | `images/persistence-add-refresh.png` |
| TC-L5-15 | ทดสอบ filters ทุกค่า | กรองข้อมูลตามคำค้นหา, ประเภท, ความเร่งด่วน และสถานะได้ถูกต้อง | PASS | Filter & Search state ทำงานปกติ |
| TC-L5-16 | ลบ request แล้ว refresh | คำร้องถูกลบออกจากรายการและ localStorage รีเฟรชแล้วข้อมูลไม่กลับมา | PASS | `images/persistence-delete-refresh.png` |
| TC-L5-17 | Reset Demo Data | ล้างข้อมูลเดิมและเขียน seed requests ทับลงไปใหม่อย่างถูกต้อง | PASS | Reset storage สำเร็จ |
| TC-L5-18 | malformed + wrong schema แล้ว reload | ตรวจจับข้อมูลเสียหาย กู้คืนเป็น seed data และแจ้งเตือนผ่าน onRecovery | PASS | `images/storage-recovery.png` |
| TC-L5-19 | เทียบ summary กับ data | ตัวเลขสรุปบน SummaryPanel ตรงกับจำนวนการ์ดคำร้องจริงทุกสถานะ | PASS | Data summary sync ตรงกัน |
| TC-L5-20 | viewport 375px ทุก page | หน้าเว็บจัด layout แบบ Responsive รองรับหน้าจอมือถือโดยไม่ล้นจอ | PASS | `images/responsive-375.png` |
| TC-L5-21 | keyboard only | สามารถใช้ปุ่ม Tab, Enter และ Spacebar ควบคุมการทำงานได้ครบถ้วน | PASS | `images/keyboard-accessibility.png` |
| TC-L5-22 | checker/build/preview | สั่งรันคำสั่ง check, build และ preview ผ่านฉลุยโดยไม่มีข้อผิดพลาด | PASS | `npm run build` completed successfully |
| TC-L5-23 | Pages Incognito + hash refresh | เปิดดูบน GitHub Pages ในโหมดไม่ระบุตัวตนและกดรีเฟรชหน้า hash ได้ปกติ | PASS | `images/pages-incognito.png` + https://Phumipat-2005.github.io/engse203-student-labs-68543210038-4/labs/week-05/ |
| TC-L5-24 | merged PR + tag | รวม Pull Request เข้ากิ่งหลักและสร้าง Git Tag ส่งงานเรียบร้อย | PASS | PR #5 merged / tag: `lab-05-submission-v1` |

## Rerun log

เก็บร่องรอย FAIL เดิม แล้วเพิ่มบรรทัด rerun แทนการลบประวัติ

| Test ID | เวลา | Fix | Actual result | Status |
|---|---|---|---|---|
| TC-L5-18 | 21:30 | แก้ไข `requestStorage.js` ให้ตรวจ schemaVersion และส่งต่อ `onRecovery` ใน `requestService.js` | กู้คืนข้อมูลสำเร็จและ UI แจ้งเตือนถูกต้อง | PASS |
