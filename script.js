// Firebase configuration (Замените на ваши данные!)
const firebaseConfig = {
    apiKey: "YOUR_API_KEY",
    authDomain: "YOUR_PROJECT_ID.firebaseapp.com",
    projectId: "YOUR_PROJECT_ID",
    storageBucket: "YOUR_PROJECT_ID.appspot.com",
    messagingSenderId: "YOUR_MESSAGING_SENDER_ID",
    appId: "YOUR_APP_('answer').value;

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