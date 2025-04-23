// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyAt3VdtvCexC5DcuuDv7ZXc-D1XoWXh0qM",
  authDomain: "guestlist-345f8.firebaseapp.com",
  projectId: "guestlist-345f8",
  storageBucket: "guestlist-345f8.firebasestorage.app",
  messagingSenderId: "195999212818",
  appId: "1:195999212818:web:11f8d4a149b7a2cb4d7fcb",
  measurementId: "G-2MPWYBQ8LR"
};
firebase.initializeApp(firebaseConfig);

firebase.auth().signInAnonymously()
  .then(() => {
    console.log("Firebase initialized and signed in anonymously");
  })
  .catch((error) => {
    console.error("Error signing in anonymously: ", error);
  });

// Initialize Firebase
firebase.initializeApp(firebaseConfig);

// Получаем ссылку на Firestore
const db = firebase.firestore();

document.getElementById('saveButton').addEventListener('click', function () {
    // Сохранение данных в Firestore
    db.collection("responses").add({
        name: "Test Name",
        answer: "Test Answer",
        timestamp: firebase.firestore.FieldValue.serverTimestamp()
    })
        .then((docRef) => {
            console.log("Document written with ID: ", docRef.id);
            alert('Данные сохранены!');
        })
        .catch((error) => {
            console.error("Error adding document: ", error);
            alert('Ошибка сохранения данных!');
        });
});
