import { initializeApp } from 'firebase/app';
import { getAuth } from 'firebase/auth';

const firebaseConfig = {
  apiKey: 'AIzaSyDdDek5zxaArstXg9vgz9b3hcFO1v3YW0M',
  authDomain: 'dia-diary-b6d59.firebaseapp.com',
  projectId: 'dia-diary-b6d59',
  storageBucket: 'dia-diary-b6d59.firebasestorage.app',
  messagingSenderId: '938354523655',
  appId: '1:938354523655:web:59593d94520208b4e4f4a2',
};

const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
