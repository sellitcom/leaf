/* -------------------------------------------
   SIMPLE LOCALSTORAGE DB (EASY USE)
   Auto-init + Add/Update/Delete/Create
-------------------------------------------- */

const DB_NAME = "DB";

// Initialize database (auto if not exists)
function db_init(defaultObj = {}) {
	if (!localStorage.getItem(DB_NAME)) {
		localStorage.setItem(DB_NAME, JSON.stringify(defaultObj));
	}
}

// Get full DB
function db_getDB() {
	try {
		return JSON.parse(localStorage.getItem(DB_NAME)) || {};
	} catch (e) {
		console.error("DB parse error:", e);
		return {};
	}
}

// Save DB
function db_saveDB(db) {
	localStorage.setItem(DB_NAME, JSON.stringify(db));
}

// Internal helper: convert path string to array
function db_path(path) {
	return path.split(".").filter(Boolean);
}

// Check if path exists
function db_exists(path) {
	let db = db_getDB();
	let ref = db;
	for (let key of db_path(path)) {
		if (!ref || !ref.hasOwnProperty(key)) return false;
		ref = ref[key];
	}
	return true;
}

// Get value (returns fallback if not exists)
function db_get(path, fallback = null) {
	let db = db_getDB();
	let ref = db;
	for (let key of db_path(path)) {
		if (!ref || !ref.hasOwnProperty(key)) return fallback;
		ref = ref[key];
	}
	return ref;
}

// Create object (only if not exists)
function db_create(path, value = {}) {
	if (!db_exists(path)) {
		db_set(path, value);
	}
}

// Add / Set value (creates path if missing)
function db_set(path, value) {
	let db = db_getDB();
	let keys = db_path(path);
	let ref = db;

	keys.forEach((key, i) => {
		if (i === keys.length - 1) {
			ref[key] = value;
		} else {
			if (!ref[key] || typeof ref[key] !== "object") ref[key] = {};
			ref = ref[key];
		}
	});

	db_saveDB(db);
}

// Update value (only if exists)
function db_update(path, value) {
	if (db_exists(path)) {
		db_set(path, value);
	} else {
		console.warn("db_update: path does not exist", path);
	}
}

// Delete value or object
function db_delete(path) {
	let db = db_getDB();
	let keys = db_path(path);
	let ref = db;

	for (let i = 0; i < keys.length - 1; i++) {
		if (!ref[keys[i]]) return; // nothing to delete
		ref = ref[keys[i]];
	}

	delete ref[keys[keys.length - 1]];
	db_saveDB(db);
}

// Reset entire DB
function db_reset() {
	localStorage.removeItem(DB_NAME);
}

// ========================
// Example Auto-init (optional)
db_init({
	users: {},
	settings: {},
});
