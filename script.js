import { initializeApp } from "https://www.gstatic.com/firebasejs/9.6.0/firebase-app.js";
import { getDatabase, ref, set } from "https://www.gstatic.com/firebasejs/9.6.0/firebase-database.js";

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

const app = initializeApp(firebaseConfig);
const db = getDatabase(app);

document.addEventListener('DOMContentLoaded', () => {
    const nameInput = document.getElementById('nameInput');
    const comingBtn = document.getElementById('comingBtn');
    const notComingBtn = document.getElementById('notComingBtn');
    const messageDiv = document.getElementById('message');

    comingBtn.addEventListener('click', () => saveResponse(true));
    notComingBtn.addEventListener('click', () => saveResponse(false));

    function saveResponse(isComing) {
        const name = nameInput.value.trim();

        if (!name) {
            showMessage('Пожалуйста, введите ваше ФИО', 'error');
            return;
        }

        const responseData = {
            name: name,
            status: isComing ? 'Приду' : 'Не приду',
            timestamp: Date.now()
        };

        const responseRef = ref(db, 'responses/' + Date.now());

        set(responseRef, responseData)
            .then(() => {
                showMessage(`Спасибо, ${name}! Ваш ответ "${responseData.status}" сохранён.`, 'success');
                nameInput.value = '';
            })
            .catch((error) => {
                showMessage('Ошибка сохранения: ' + error.message, 'error');
            });
    }

    function showMessage(text, type) {
        messageDiv.textContent = text;
        messageDiv.className = `message ${type}`;
        setTimeout(() => messageDiv.textContent = '', 3000);
    }
});
// Добавьте в обработчики кнопок:
comingBtn.addEventListener('click', function () {
    this.classList.add('click-effect');
    setTimeout(() => this.classList.remove('click-effect'), 300);
    saveResponse(true);
});

notComingBtn.addEventListener('click', function () {
    this.classList.add('click-effect');
    setTimeout(() => this.classList.remove('click-effect'), 300);
    saveResponse(false);
});