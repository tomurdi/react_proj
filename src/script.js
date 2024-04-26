export async function getQuestions() {
    const response = await fetch("http://127.0.0.1:8000/questions");
    const items = await response.json();
    return items;
}

export async function removeQuestion(index) {
    const myHeaders = new Headers();
    myHeaders.append("Content-Type", "application/json");

    const raw = JSON.stringify({"i": index});

    const requestOptions = {
        method: "DELETE",
        headers: myHeaders,
        body: raw,
        redirect: "follow"
    }

    await fetch("http://127.0.0.1:8000/remove", requestOptions);
    console.log("removed a question");
}

export async function addQuestion(name,age,question) {
    const myHeaders = new Headers();
    myHeaders.append("Content-Type", "application/json");

    const raw = JSON.stringify({
        "name": name,
        "age": age,
        "question": question
    });

    const requestOptions = {
        method: "POST",
        headers: myHeaders,
        body: raw,
        redirect: "follow"
    };

    await fetch("http://127.0.0.1:8000/add", requestOptions)
    console.log("added a question");
}

export async function renderItems() {
    const questions = document.getElementById('question-list');
    questions.innerHTML = '';

    const items = await getQuestions();

    items.map((item,index) => {
        const li = document.createElement('li');
        li.innerHTML = `
            <p>Name: ${item.name}</p>
            <p>Age: ${item.age}</p>
            <p>Question: ${item.question}</p>
        `;
        const deleteButton = document.createElement('button');
        deleteButton.textContent = 'Delete';

        deleteButton.addEventListener('click', async () => {
            await removeQuestion(index);
            await renderItems();

        })
        li.appendChild(deleteButton);
        questions.appendChild(li);
    });
    console.log("rendered questions");
}

 window.onload = async () => {
    await renderItems();

    const addButton = document.getElementById('add-btn');
    addButton.addEventListener('click', async () => {
        let [newItemName,newItemAge,newItemQuestion] = [document.getElementById('name'),document.getElementById('age'),document.getElementById('question')];
        let [nameValue, ageValue, questionValue] = [newItemName.value,newItemAge.value,newItemQuestion.value];

        await addQuestion(nameValue,ageValue,questionValue);
        newItemName.value = '';
        newItemAge.value = '';
        newItemQuestion.value = '';
        await renderItems();
    })
}