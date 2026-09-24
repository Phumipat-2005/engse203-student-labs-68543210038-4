import { test, before, describe } from 'node:test';
import assert from 'node:assert/strict';
import request from 'supertest';
import { createApp } from '../src/app.js';
import { loadSeed } from '../src/services/requestService.js';

let app;
before(async () => {
  await loadSeed();
  app = createApp();
});

const validRequest = {
  requesterName: 'ทดสอบ ระบบ',
  requestType: 'แจ้งซ่อม',
  location: 'C3-401',
  details: 'รายละเอียดยาวพอสมควรจริง',
  priority: 'normal',
};

describe('API Automated Tests (CP16)', () => {
  test('1. GET /api/requests คืนรายการทั้งหมด พร้อม status 200 และได้ array', async () => {
    const res = await request(app).get('/api/requests');
    assert.equal(res.status, 200);
    assert.ok(Array.isArray(res.body));
  });

  test('2. GET /api/requests/:id ที่มีอยู่ คืนข้อมูลคำร้อง พร้อม status 200', async () => {
    const res = await request(app).get('/api/requests/REQ-001');
    assert.equal(res.status, 200);
    assert.equal(res.body.id, 'REQ-001');
  });

  test('3. GET /api/requests/:id ที่ไม่มี คืน status 404', async () => {
    const res = await request(app).get('/api/requests/REQ-999');
    assert.equal(res.status, 404);
    assert.ok(res.body.error);
  });

  test('4. POST ข้อมูลถูกต้อง คืน status 201 และมีสถานะเริ่มต้นเป็น pending', async () => {
    const res = await request(app)
      .post('/api/requests')
      .send(validRequest);
    assert.equal(res.status, 201);
    assert.equal(res.body.status, 'pending');
    assert.ok(res.body.id);
  });

  test('5. POST ข้อมูลไม่ครบ คืน status 400 พร้อมข้อความแจ้งเตือน', async () => {
    const res = await request(app)
      .post('/api/requests')
      .send({ requesterName: 'ก' }); // ชื่อสั้นเกินไปและขาดฟิลด์จำเป็น
    assert.equal(res.status, 400);
    assert.ok(res.body.error);
  });

  test('6. CORS header ตอบ Access-Control-Allow-Origin ตรงตาม origin ที่อนุญาต', async () => {
    const res = await request(app)
      .get('/api/requests')
      .set('Origin', 'http://localhost:5173');
    assert.equal(res.headers['access-control-allow-origin'], 'http://localhost:5173');
  });
});
