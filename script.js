import { initializeApp } from "https://www.gstatic.com/firebasejs/9.6.0/firebase-app.js";
import { getDatabase, ref, set } from "https://www.gstatic.com/firebasejs/9.6.0/firebase-database.js";

// Конфигурация Firebase
const firebaseConfig = {
    apiKey: "AIzaSyAt3VdtvCexC5DcuuDv7ZXc-D1XoWXh0qM",
    authDomain: "guestlist-345f8.firebaseapp.com",
    databaseURL: "https://guestlist-345f8-default-rtdb.firebaseio.com",
    projectId: "guestlist-345f8",
    storageBucket: "guestlist-345f8.firebasestorage.app",
    messagingSenderId: "195999212818",
    appId: "1:195999212818:web:30c4495da1514b034d7fcb",
    measurementId: "G-J8QF77NDQ3"
};

// Инициализация Firebase
const app = initializeApp(firebaseConfig);
const db = getDatabase(app);

document.getElementById("surveyForm").addEventListener("submit", (e) => {
    e.preventDefault();

    const name = document.getElementById('nameInput').value.trim();
    const answer = document.getElementById('answer').value.trim();
    const hiddenId = document.getElementById('hiddenId').value;

    // Валидация
    if (!name || !answer || !['да', 'нет'].includes(answer.toLowerCase())) {
        alert("Пожалуйста, заполните все поля корректно (ответ только 'Да' или 'Нет')");
        return;
    }

    const id = hiddenId || Date.now().toString();

    set(ref(db, `responses/${id}`), {
        name: name,
        answer: answer.toLowerCase(),
        createdAt: Date.now()
    })
        .then(() => {
            alert("Данные сохранены!");
            document.getElementById("surveyForm").reset();
        })
        .catch((error) => {
            console.error("Ошибка:", error);
            alert("Ошибка сохранения: " + error.message);
        });
});