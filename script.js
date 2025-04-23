alert(123)
// Firebase configuration (Замените на ваши данные!)
const firebaseConfig = {
    apiKey: "AIzaSyAt3VdtvCexC5DcuvDv7ZXc-D1XoWXh0qM",
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
    const name = document.getElementById('nameInput').value;
    const answer = document.getElementById('answer').value;

    // Сохранение данных в Firestore
    db.collection("responses").add({
        name: name,
        answer: answer,
        timestamp: firebase.firestore.FieldValue.serverTimestamp() // Добавляем timestamp
    })
        .then((docRef) => {
            console.log("Document written with ID: ", docRef.id);
            alert('Данные сохранены!');
            document.getElementById('nameInput').value = ''; // Очистка поля
        })
        .catch((error) => {
            console.error("Error adding document: ", error);
            alert('Ошибка сохранения данных!');
        });
});
