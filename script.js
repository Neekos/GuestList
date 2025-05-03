import { initializeApp } from "https://www.gstatic.com/firebasejs/9.6.0/firebase-app.js";
import { getDatabase, ref, set, get } from "https://www.gstatic.com/firebasejs/9.6.0/firebase-database.js";

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

document.addEventListener('DOMContentLoaded', async () => {
    const urlParams = new URLSearchParams(window.location.search);
    const guestId = urlParams.get('guestId');

    if (guestId) {
        try {
            const guestRef = ref(db, 'guests/' + guestId);
            const snapshot = await get(guestRef);

            if (snapshot.exists()) {
                const guestData = snapshot.val();
                const name1 = guestData.name1;
                const name2 = guestData.name2 || '';
                const gender = guestData.gender; // 'm', 'f', 'mf'

                // Определяем обращение
                let greeting;
                if (name2) {
                    greeting = `Дорогие ${name1} и ${name2}`;
                } else {
                    switch (gender) {
                        case 'm': greeting = `Дорогой ${name1}`; break;
                        case 'f': greeting = `Дорогая ${name1}`; break;
                        default: greeting = `Дорогой(ая) ${name1}`;
                    }
                }

                const invitationHTML = `
                    <p class="couple-names">Андрей & Ксения</p>
                    <div class="divider">❤</div>    
                    <p class="greeting">${greeting}</p>
                    <p class="invitation-line">Приглашаем на торжественную церемонию бракосочетания</p>
                    
                    <div class="details">
                        <div class="date-container">
                            <span class="weekday">пятница</span>
                            <span class="day">27</span>
                            <span class="month">июня</span>
                        </div>
                        <div class="time-container">
                            <span class="time-text">начало регистрации в</span>
                            <span class="time-value">13:00</span>
                        </div>
                        
                        <div class="address-container">
                            <span class="address-text">ЗАГС: Щетинкина</span>
                            <span class="address-number">75</span>
                        </div>
                        <p class="waiting">Ждём вас!</p>
                    </div>
                `;

                document.getElementById('invitationText').innerHTML = invitationHTML;

                // Передаем информацию о количестве гостей в обработчики
                const isPlural = !!name2; // true если два гостя
                document.getElementById('comingBtn').addEventListener('click', () =>
                    saveResponse(guestId, name1, name2, true, isPlural));
                document.getElementById('notComingBtn').addEventListener('click', () =>
                    saveResponse(guestId, name1, name2, false, isPlural));
            }
        } catch (error) {
            console.error('Ошибка:', error);
        }
    }
});

async function saveResponse(guestId, name1, name2, isComing, isPlural) {
    const guestName = name2 ? `${name1} и ${name2}` : name1;
    const messageDiv = document.getElementById('message');

    // Формируем правильное окончание для ответа
    let responseMessage;
    if (isPlural) {
        responseMessage = isComing
            ? `Спасибо! ${guestName}, мы вас ждём!`
            : `Жаль, что ${guestName} не сможете прийти`;
    } else {
        responseMessage = isComing
            ? `Спасибо! ${guestName}, мы тебя ждём!`
            : `Жаль, что ${guestName} не сможешь прийти`;
    }

    try {
        await set(ref(db, 'responses/' + Date.now()), {
            guestId: guestId,
            name: guestName,
            status: isComing ? 'Приду' : 'Не приду',
            isPlural: isPlural,
            timestamp: Date.now()
        });
        showMessage(responseMessage, 'success');
    } catch (error) {
        showMessage('Ошибка: ' + error.message, 'error');
    }

    function showMessage(text, type) {
        messageDiv.textContent = text;
        messageDiv.className = `message ${type}`;
        setTimeout(() => messageDiv.textContent = '', 3000);
    }
}