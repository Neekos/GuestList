document.getElementById('saveButton').addEventListener('click', function () {
    // Получение данных из формы
    var name = document.getElementById('name').value;
    var answer = document.getElementById('answer').value;

    // Создание ссылки на базу данных
    const ref = firebase.database().ref('responses');

    // Создание нового объекта данных
    const newResponse = {
        name: name,
        answer: answer,
        timestamp: new Date().getTime()
    };

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
