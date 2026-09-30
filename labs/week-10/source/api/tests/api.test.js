import { test, describe, before } from 'node:test';
import assert from 'node:assert/strict';
import request from 'supertest';
import { createApp } from '../src/app.js';
import { loadSeed } from '../src/services/requestService.js';

const app = createApp();

describe('Campus Service API Tests (CP33)', () => {
  before(async () => {
    await loadSeed();
  });

  // ① GET /api/requests → 200 และได้ array
  test('① GET /api/requests → 200 และได้ array', async () => {
    const r = await request(app).get('/api/requests');
    assert.equal(r.status, 200);
    assert.ok(Array.isArray(r.body));
  });

  // ② คืน requesterName ไม่ใช่ requester_id
  test('② คืน requesterName ไม่ใช่ requester_id', async () => {
    const r = await request(app).get('/api/requests');
    assert.ok(r.body.length > 0);
    assert.ok('requesterName' in r.body[0]);
    assert.ok(!('requester_id' in r.body[0]));
  });

  // ③ GET /:id พบ → 200 · ไม่พบ → 404
  test('③ GET /:id พบ → 200 · ไม่พบ → 404', async () => {
    const found = await request(app).get('/api/requests/REQ-001');
    assert.equal(found.status, 200);
    assert.equal(found.body.id, 'REQ-001');

    const notFound = await request(app).get('/api/requests/REQ-999');
    assert.equal(notFound.status, 404);
  });

  // ④ POST ถูกต้อง → 201 (พร้อมลบทิ้งเพื่อไม่ให้ข้อมูลสะสม)
  test('④ POST ถูกต้อง → 201', async () => {
    const newReq = {
      requesterName: 'สมชาย ใจดี',
      requestType: 'แจ้งซ่อม',
      location: 'ห้องทดสอบ 404',
      details: 'ทดสอบส่งคำร้องอัตโนมัติ',
      priority: 'normal'
    };
    const r = await request(app).post('/api/requests').send(newReq);
    assert.equal(r.status, 201);
    assert.equal(r.body.requesterName, newReq.requesterName);

    // ลบข้อมูลที่สร้างทิ้งทันที เพื่อให้รัน test ซ้ำกี่รอบก็ไม่สะสมใน DB
    if (r.body.id) {
      await request(app).delete(`/api/requests/${r.body.id}`);
    }
  });

  // ⑤ POST ไม่ครบ → 400
  test('⑤ POST ไม่ครบ → 400', async () => {
    const r = await request(app).post('/api/requests').send({
      requesterName: 'สมชาย ใจดี'
      // ขาด requestType, location, details
    });
    assert.equal(r.status, 400);
  });

  // ⑥ ยิง SQL injection ผ่าน ?status= แล้วไม่หลุด
  test('⑥ SQL injection ผ่าน ?status= ไม่หลุด', async () => {
    const evil = encodeURIComponent("x' OR '1'='1");
    const r = await request(app).get(`/api/requests?status=${evil}`);
    assert.equal(r.status, 200);
    assert.equal(r.body.length, 0);
  });
});