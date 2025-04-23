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
// Initialize Firebase
const app = firebase.initializeApp(firebaseConfig);
const db = firebase.firestore();

const dataContainer = document.getElementById("dataContainer");

db.collection("responses").orderBy("timestamp", "desc").get()
  .then((querySnapshot) => {
    dataContainer.innerHTML = ''; // Очистка контейнера

    querySnapshot.forEach((doc) => {
      const data = doc.data();
      const div = document.createElement('div');
      div.textContent = `ФИО: ${data.name}, Ответ: ${data.answer}`;
      dataContainer.appendChild(div);
    });
  })
  .catch((error) => {
    console.log("Error getting documents: ", error);
    dataContainer.textContent = 'Ошибка загрузки данных.';
  });
