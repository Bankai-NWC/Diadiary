import { readFile } from 'fs/promises';
import path from 'path';
import { fileURLToPath } from 'url';
import admin from 'firebase-admin';

// путь к текущей директории
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// асинхронно читаем JSON-файл
const serviceAccountPath = path.join(__dirname, 'serviceAccountKey.json');
const serviceAccountJSON = await readFile(serviceAccountPath, 'utf-8');
const serviceAccount = JSON.parse(serviceAccountJSON);

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
});

export default admin;
