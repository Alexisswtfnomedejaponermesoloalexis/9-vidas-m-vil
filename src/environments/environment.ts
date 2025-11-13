// Archivo de configuración del entorno de desarrollo
// Aquí se definen variables globales, como la conexión a Firebase

export const environment = {
  // Indica si la app está en modo producción o desarrollo (módulo de pruebas activo para mostrar errores detalaldos en consola.)
  // cuando se vaya a cambiar a true, se debera editar el environment.prod.ts
  production: false,

  // Configuración del proyecto Firebase utilizado para almacenar datos de:
  // contacto, soporte, calificaciones (ratings) y galería
  firebaseConfig: {
    apiKey: "AIzaSyAUBTElqmaIPlojdx5BM8COmV4bMPTpRQE",
    authDomain: "vidas-movil.firebaseapp.com",
    projectId: "vidas-movil",
    storageBucket: "vidas-movil.firebasestorage.app",
    messagingSenderId: "751698081221",
    appId: "1:751698081221:web:3dccbfa8d8116c199547ac"
  }
};
