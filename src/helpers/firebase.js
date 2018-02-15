import { initializeApp } from 'firebase'


const app = initializeApp({
    apiKey: "AIzaSyDHwnI8uoPg5m2E2HfecybOz3tGSApx-o0",
    authDomain: "donde-gladys.firebaseapp.com",
    databaseURL: "https://donde-gladys.firebaseio.com",
    projectId: "donde-gladys",
    storageBucket: "donde-gladys.appspot.com",
    messagingSenderId: "872361554200"
})

export const db = app.database()
export const dbRefProductos = db.ref('data').child('productos')
export const dbRefVentas = db.ref('data').child('ventas')