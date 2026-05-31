#!/usr/bin/env node
import fetch from 'node-fetch';

const API = process.env.API_ORIGIN || 'http://localhost:4000';
const ADMIN_EMAIL = process.env.ADMIN_EMAIL || 'tuancreations.africa@gmail.com';
const ADMIN_PASSWORD = process.env.ADMIN_PASSWORD || 'AdminPass123!';

const waitFor = async (url, timeout = 20000) => {
  const start = Date.now();
  while (Date.now() - start < timeout) {
    try {
      const r = await fetch(url);
      if (r.ok) return true;
    } catch {
      // ignore
    }
    await new Promise((r) => setTimeout(r, 500));
  }
  return false;
};

const json = (r) => r.json().catch(() => ({}));

async function run() {
  console.log('Waiting for backend at', API);
  const ok = await waitFor(`${API}/api/health`, 30000);
  if (!ok) {
    console.error('Backend not responding at', API);
    process.exit(2);
  }

  // Ensure admin password is set to known value via dev endpoint (non-production)
  try {
    const resp = await fetch(`${API}/__dev/set-admin-password`, {
      method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify({ password: ADMIN_PASSWORD }),
    });
    const body = await json(resp);
    console.log('Dev: set admin password response:', resp.status, body);
  } catch (e) {
    // ignore if endpoint missing
  }

  // Log current admin contacts for debugging
  try {
    const adm = await fetch(`${API}/api/support/admins`);
    const admJson = await json(adm);
    console.log('Current admin contacts:', JSON.stringify(admJson, null, 2));
  } catch (e) {
    console.log('Failed to fetch admin contacts', e && e.message ? e.message : e);
  }

  // If there's a different admin email, set the password for that admin
  try {
    const adm = await fetch(`${API}/api/support/admins`);
    const admJson = await json(adm);
    const firstEmail = admJson?.contacts?.[0]?.email;
    if (firstEmail) {
      const resp2 = await fetch(`${API}/__dev/set-admin-password`, { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify({ email: firstEmail, password: ADMIN_PASSWORD }) });
      const body2 = await json(resp2);
      console.log('Dev: set admin password for', firstEmail, resp2.status, body2);
      // use returned email as ADMIN_EMAIL for login
      process.env.ADMIN_EMAIL = firstEmail;
    }
  } catch (e) {
    // ignore
  }

  console.log('Logging in as admin...');
  // determine which email to use for login (prefers seeded admin email if present)
  const adminContactsResp = await fetch(`${API}/api/support/admins`);
  const adminContacts = await json(adminContactsResp);
  const loginEmail = (adminContacts?.contacts?.[0]?.email) || ADMIN_EMAIL;

  const loginRes = await fetch(`${API}/api/auth/login`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ name: 'Platform Admin', email: loginEmail, role: 'admin', password: ADMIN_PASSWORD }),
  });
  const loginBody = await json(loginRes);
  if (!loginRes.ok || !loginBody.token) {
    console.error('Admin login failed', loginBody);
    process.exit(3);
  }
  const token = loginBody.token;
  console.log('Admin token acquired');

  const auth = { Authorization: `Bearer ${token}`, 'Content-Type': 'application/json' };

  console.log('Fetching site config...');
  const cfgRes = await fetch(`${API}/api/admin/config`, { headers: auth });
  const cfg = await json(cfgRes);
  console.log('Config keys:', Object.keys(cfg).slice(0, 10));

  console.log('Updating contact.email to test+ci@example.com');
  const updRes = await fetch(`${API}/api/admin/config`, { method: 'POST', headers: auth, body: JSON.stringify({ 'contact.email': 'test+ci@example.com' }) });
  const updBody = await json(updRes);
  if (!updRes.ok) {
    console.error('Failed to update config', updBody);
    process.exit(4);
  }
  console.log('Config updated');

  console.log('Creating support knowledge item...');
  const newItem = { title: 'CI Test Item', type: 'text', summary: 'CI test', contentText: 'This is a test', keywords: ['ci', 'test'], order: 999, isActive: true };
  const createRes = await fetch(`${API}/api/admin/support-knowledge`, { method: 'POST', headers: auth, body: JSON.stringify(newItem) });
  const createBody = await json(createRes);
  if (!createRes.ok) {
    console.error('Failed to create support item', createBody);
    process.exit(5);
  }
  const created = createBody.item;
  console.log('Created support item id', created._id || created.id);

  console.log('Listing support knowledge...');
  const listRes = await fetch(`${API}/api/admin/support-knowledge`, { headers: auth });
  const listBody = await json(listRes);
  if (!listRes.ok) {
    console.error('Failed to list support knowledge', listBody);
    process.exit(6);
  }
  console.log('Support items count:', (listBody.items || []).length);

  console.log('Creating a support handoff (public API)');
  const handoffRes = await fetch(`${API}/api/support/handoff`, {
    method: 'POST', headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ summary: 'CI created handoff', messages: [{ role: 'user', text: 'Help me with CI' }], userName: 'CI Tester' }),
  });
  const handoffBody = await json(handoffRes);
  if (!handoffRes.ok) {
    console.error('Failed to create handoff', handoffBody);
    process.exit(7);
  }
  console.log('Handoff created', handoffBody.conversationId);

  console.log('Getting admin users');
  const usersRes = await fetch(`${API}/api/admin/users`, { headers: auth });
  const usersBody = await json(usersRes);
  const users = usersBody.users || [];
  console.log('User count:', users.length);
  if (users.length === 0) {
    console.error('No users found, unexpected');
    process.exit(8);
  }

  const adminUser = users.find((u) => u.role === 'admin') || users[0];
  console.log('Updating phone for', adminUser.email);
  const updateUserRes = await fetch(`${API}/api/admin/users/${adminUser.id}`, { method: 'PUT', headers: auth, body: JSON.stringify({ phone: '+10000000000' }) });
  const updateUserBody = await json(updateUserRes);
  if (!updateUserRes.ok) {
    console.error('Failed to update user', updateUserBody);
    process.exit(9);
  }
  console.log('User phone updated');

  console.log('All tests passed');
  process.exit(0);
}

run().catch((err) => {
  console.error('Test runner error', err);
  process.exit(1);
});
