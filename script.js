// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyAt3VdtvCexC5DcuuDv7ZXc-D1XoWXh0qM",
  authDomain: "guestlist-345f8.firebaseapp.com",
  databaseURL: "https://guestlist-345f8-default-rtdb.firebaseio.com",
  projectId: "guestlist-345f8",
  storageBucket: "guestlist-345f8.firebasestorage.app",
  messagingSenderId: "195999212818",
  appId: "1:195999212818:web:11f8d4a149b7a2cb4d7fcb",
  measurementId: "G-2MPWYBQ8LR"
};
document.getElementById('saveButton').addEventListener('click', function () {
    console.log("Save button clicked!"); // Добавлено

    // Получение данных из формы
    var name = document.getElementById('name').value;
    var answer = document.getElementById('answer').value;

    console.log("Name:", name, "Answer:", answer); // Добавлено

    // Создание ссылки на базу данных
    const ref = firebase.database().ref('responses');

    // Создание нового объекта данных
    const newResponse = {
        name: name,
        answer: answer,
        timestamp: new Date().getTime()
    };

    console.log("Data to be saved:", newResponse); // Добавлено

    // Добавление данных в базу данных
    ref.push(newResponse)
        .then(() => {
            console.log("Data saved successfully!");
            alert('Данные сохранены!');
        })
        .catch((error) => {
            console.error("Error saving ", error);
            alert('Ошибка сохранения данных!');
        });
});
