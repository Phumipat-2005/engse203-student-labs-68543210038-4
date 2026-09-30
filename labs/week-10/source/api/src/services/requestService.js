import { readFile } from "node:fs/promises";
import path from "node:path";
import { fileURLToPath } from "node:url";
import { DatabaseSync } from "node:sqlite";
import { readFileSync, existsSync } from "node:fs";
import { AppError } from "../middleware/errorHandler.js";

let db;
/**
 * Week 10 — เปลี่ยน service จากอ่านไฟล์ JSON เป็นฐานข้อมูล SQLite
 *
 * ตอนนี้ยังเป็นเวอร์ชัน Week 07 (อ่านไฟล์ JSON) อยู่
 * งานของสัปดาห์นี้คือเปลี่ยนให้ใช้ node:sqlite
 *
 * ⚠ กฎเหล็ก: signature ของทุกฟังก์ชันต้องเหมือนเดิมทุกตัว
 *   → controller และ frontend จะได้ไม่ต้องแก้เลย
 */

// ตำแหน่งของ "ไฟล์นี้" ไม่ใช่ตำแหน่งที่รันคำสั่ง
const HERE = path.dirname(fileURLToPath(import.meta.url));
const API_ROOT = path.resolve(HERE, "../..");
const DB_FILE = process.env.DB_FILE ?? path.join(API_ROOT, "data", "campus.db");
const SCHEMA_FILE = path.join(API_ROOT, "data", "schema.sql");

export async function loadSeed() {
  db = new DatabaseSync(DB_FILE);
  db.exec("PRAGMA foreign_keys = ON"); // ⚠ ต้องสั่งทุกครั้ง

  try {
    const ready = db
      .prepare(
        "SELECT COUNT(*) c FROM sqlite_master WHERE type='table' AND name='requests'",
      )
      .get().c;
    if (!ready && existsSync(SCHEMA_FILE)) {
      db.exec(readFileSync(SCHEMA_FILE, "utf8"));
    }

    // requests = JSON.parse(await readFile(DATA, 'utf8'));
  } catch {
    // requests = [];
  }
}

const SELECT_SHAPE = `
  SELECT r.id,
         u.name          AS requesterName,
         r.request_type  AS requestType,
         r.location,
         r.details,
         r.priority,
         r.status
  FROM requests r
  JOIN users u ON u.id = r.requester_id`;

export function findAll({ status } = {}) {
  /**
   * TODO W10-3 (CP28) · เปลี่ยนเป็น SELECT จากฐานข้อมูล
   *   - ใช้ JOIN กับตาราง users เพื่อคืน requesterName (ไม่ใช่ requester_id)
   *   - ตั้งชื่อคอลัมน์ด้วย AS ให้ตรงกับที่ frontend ใช้
   *   - ถ้ามี status ให้เติม WHERE r.status = ?
   *   คำใบ้: คัดลอก query จาก queries.sql ที่ทำสัปดาห์ที่แล้วมาปรับ
   */

  return status
    ? db.prepare(`${SELECT_SHAPE} WHERE r.status = ? ORDER BY r.id`).all(status)
    : db.prepare(`${SELECT_SHAPE} ORDER BY r.id`).all();
}

export function findById(id) {
  /** TODO W10-4 (CP28) · SELECT ... WHERE r.id = ?  · ไม่พบให้คืน null */
  return db.prepare(`${SELECT_SHAPE} WHERE r.id = ?`).get(id) ?? null;
}

/** แปลงชื่อผู้แจ้งเป็น id — ถ้ายังไม่มีในระบบก็สร้างให้ */
function resolveUserId(name) {
  const found = db.prepare("SELECT id FROM users WHERE name = ?").get(name);
  if (found) return found.id; // มีแล้ว — ใช้ id เดิม

  const slug = Date.now().toString(36);
  return db
    .prepare("INSERT INTO users (name, department, email) VALUES (?, ?, ?)")
    .run(name, "ไม่ระบุ", `user-${slug}@rmutl.ac.th`).lastInsertRowid;
}

function nextId() {
  const row = db
    .prepare(
      "SELECT id FROM requests WHERE id LIKE 'REQ-%' ORDER BY id DESC LIMIT 1",
    )
    .get();
  const n = row ? Number(String(row.id).replace("REQ-", "")) + 1 : 1;
  return `REQ-${String(n).padStart(3, "0")}`;
}

function toAppError(err) {
  const m = err.message ?? "";
  if (m.includes("FOREIGN KEY")) return new AppError("อ้างถึงข้อมูลที่ไม่มีอยู่จริง", 400);
  if (m.includes("CHECK"))       return new AppError("ค่าที่ส่งมาไม่อยู่ในรายการที่กำหนด", 400);
  if (m.includes("UNIQUE"))      return new AppError("ข้อมูลนี้มีอยู่แล้วในระบบ", 409);
  return err; // error อื่นปล่อยผ่าน → errorHandler ตอบ 500
}

export function create(input) {
  const id = nextId();
  try {
    db.prepare(
      `INSERT INTO requests (id, requester_id, request_type, location, details, priority)
       VALUES (?, ?, ?, ?, ?, ?)`,
    ).run(
      id,
      resolveUserId(input.requesterName.trim()),
      input.requestType,
      input.location.trim(),
      input.details.trim(),
      input.priority ?? "normal",
    );
  } catch (err) {
    throw toAppError(err);
  }
  return findById(id);
}

export function updateStatus(id, status) {
  try {
    const result = db
      .prepare("UPDATE requests SET status = ? WHERE id = ?")
      .run(status, id);
    return result.changes ? findById(id) : null;
  } catch (err) {
    throw toAppError(err);
  }
}

export function remove(id) {
  const target = findById(id); // ① หาก่อน
  if (!target) return null; // ② ไม่พบ → null
  db.prepare("DELETE FROM requests WHERE id = ?").run(id);
  return target; // ③ คืนของที่ลบ
}
