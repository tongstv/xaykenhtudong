
CREATE TABLE admin_users (id INTEGER PRIMARY KEY AUTOINCREMENT, username TEXT, password_hash TEXT, created_at TEXT);
CREATE TABLE admin_sessions (id INTEGER PRIMARY KEY AUTOINCREMENT, admin_id INTEGER, token TEXT, expired_at TEXT);
CREATE TABLE tiktok_accounts (id INTEGER PRIMARY KEY AUTOINCREMENT, tiktok_id TEXT, username TEXT, password TEXT, cookie TEXT, status TEXT DEFAULT 'idle', created_at TEXT);
CREATE TABLE tasks (id INTEGER PRIMARY KEY AUTOINCREMENT, tiktok_account_id INTEGER, task_type TEXT, payload TEXT, status TEXT DEFAULT 'pending', created_at TEXT);
CREATE TABLE browser_history (id INTEGER PRIMARY KEY AUTOINCREMENT, task_id INTEGER, result TEXT, log TEXT, started_at TEXT, finished_at TEXT);
CREATE TABLE schedules (id INTEGER PRIMARY KEY AUTOINCREMENT, tiktok_account_id INTEGER, task_type TEXT, payload TEXT, run_at TEXT, status TEXT DEFAULT 'pending', created_at TEXT);
