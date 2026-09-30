const REQUEST_TYPES = [
  "แจ้งซ่อม",
  "บริการบัญชีผู้ใช้",
  "ขอใช้อุปกรณ์",
  "อื่น ๆ",
];
const PRIORITIES = ["normal", "urgent"];

/** ตัวช่วยอ่านข้อความอย่างปลอดภัย — ให้มาแล้ว */
function readText(value) {
  return typeof value === "string" ? value.trim() : "";
}

/**
 * TODO W06-M2 (CP04) · ตรวจ body ก่อนถึง controller
 *
 * เกณฑ์ที่ต้องตรวจ
 *   requesterName  ต้องยาวอย่างน้อย 2 ตัวอักษร
 *   requestType    ต้องอยู่ใน REQUEST_TYPES
 *   location       ต้องไม่ว่าง
 *   details        ต้องยาวอย่างน้อย 10 ตัวอักษร
 *   priority       ต้องอยู่ใน PRIORITIES
 *
 * ถ้าไม่ผ่าน → res.status(400).json({ error: '...', details: [รายการที่ผิด] })
 * ถ้าผ่าน   → next()
 *
 * ⚠ ใช้ readText() ตรวจ อย่าใช้ input.requesterName?.trim().length < 2
 *    เพราะถ้าค่าเป็น undefined จะได้ false แล้วหลุดผ่านไป
 */
const requestSchema = {
  requesterName: (val) =>
    readText(val).length >= 2 || "ชื่อผู้แจ้งต้องมีอย่างน้อย 2 ตัวอักษร",
  requestType: (val) => REQUEST_TYPES.includes(val) || "ประเภทคำร้องไม่ถูกต้อง",
  location: (val) => Boolean(readText(val)) || "กรุณาระบุสถานที่",
  details: (val) =>
    readText(val).length >= 10 || "รายละเอียดต้องมีอย่างน้อย 10 ตัวอักษร",
  priority: (val) =>
    PRIORITIES.includes(val) || "ความเร่งด่วนต้องเป็น normal หรือ urgent",
};

export function createValidator(schema) {
  return function (req, res, next) {
    const input = req.body;

    if (!input || typeof input !== "object") {
      return res.status(400).json({ error: "ต้องส่งข้อมูลคำร้องมาด้วย" });
    }

    const errors = [];

    for (const [field, validator] of Object.entries(schema)) {
      const result = validator(input[field]);
      if (result !== true) {
        errors.push(result);
      }
    }

    if (errors.length > 0) {
      return res
        .status(400)
        .json({ error: "ข้อมูลคำร้องไม่ถูกต้อง", details: errors });
    }

    next();
  };
}

export const validateRequest = createValidator(requestSchema);
