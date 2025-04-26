// Archivo temporal para resolver el conflicto de guardado

import { browser } from '$app/environment';
import { writable } from 'svelte/store';
import { initializeApp } from 'firebase/app';
import { getFirestore } from 'firebase/firestore';
import { getAuth, setPersistence, browserLocalPersistence } from 'firebase/auth';

// Store para controlar qué base de datos usamos
const createDbToggleStore = () => {
  // Inicializar desde localStorage si está disponible
  const initialValue = browser ? 
    localStorage.getItem('useTestDb') === 'true' : 
    false;
  
  const { subscribe, set, update } = writable<boolean>(initialValue);
  
  return {
    subscribe,
    enable: () => {
      set(true);
      if (browser) {
        localStorage.setItem('useTestDb', 'true');
        window.location.reload();
      }
    },
    disable: () => {
      set(false);
      if (browser) {
        localStorage.setItem('useTestDb', 'false');
        window.location.reload();
      }
    },
    toggle: () => {
      update(value => {
        const newValue = !value;
        if (browser) {
          localStorage.setItem('useTestDb', String(newValue));
          window.location.reload();
        }
        return newValue;
      });
    }
  };
};

export const useTestDb = createDbToggleStore();

// Función para determinar qué configuración de Firebase usar
function getFirebaseConfig() {
  // Verificar si estamos usando la base de datos de prueba
  const isUsingTestDb = browser ? localStorage.getItem('useTestDb') === 'true' : false;
  
  if (isUsingTestDb) {
    // Configuración de base de datos de prueba (Curso Svelte)
    return {
      apiKey: import.meta.env.VITE_TEST_FIREBASE_API_KEY,
      authDomain: import.meta.env.VITE_TEST_FIREBASE_AUTH_DOMAIN,
      projectId: import.meta.env.VITE_TEST_FIREBASE_PROJECT_ID,
      databaseURL: import.meta.env.VITE_TEST_FIREBASE_DATA_BASE_URL,
      storageBucket: import.meta.env.VITE_TEST_FIREBASE_STORAGE_BUCKET,
      messagingSenderId: import.meta.env.VITE_TEST_FIREBASE_MESSAGING_SENDER_ID,
      appId: import.meta.env.VITE_TEST_FIREBASE_APP_ID
    };
  } else {
    // Configuración de base de datos principal (Match Home)
    return {
      apiKey: import.meta.env.VITE_FIREBASE_API_KEY,
      authDomain: import.meta.env.VITE_FIREBASE_AUTH_DOMAIN,
      projectId: import.meta.env.VITE_FIREBASE_PROJECT_ID,
      databaseURL: import.meta.env.VITE_FIREBASE_DATA_BASE_URL,
      storageBucket: import.meta.env.VITE_FIREBASE_STORAGE_BUCKET,
      messagingSenderId: import.meta.env.VITE_FIREBASE_MESSAGING_SENDER_ID,
      appId: import.meta.env.VITE_FIREBASE_APP_ID
    };
  }
}

// Inicializar Firebase con la configuración adecuada
const firebaseConfig = getFirebaseConfig();
const app = initializeApp(firebaseConfig);
const db = getFirestore(app);
const auth = getAuth(app);

// Configurar persistencia para mejorar la experiencia del usuario
if (browser) {
  setPersistence(auth, browserLocalPersistence)
    .catch((error) => {
      console.error("Error al configurar la persistencia:", error);
    });
    
  // Mostrar información sobre qué base de datos estamos usando
  const dbName = localStorage.getItem('useTestDb') === 'true' ? 
    'Curso Svelte (Gratuita)' : 
    'Match Home (Producción)';
  console.log(`Firebase inicializado usando base de datos: ${dbName}`);
}

export { app, db, auth };
