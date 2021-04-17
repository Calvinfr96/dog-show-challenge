//Fetch data from API
function fetchDogsInfo() {
    return fetch('http://localhost:3000/dogs').then(resp => resp.json())
}

function addDogsToDom() {
    fetchDogsInfo().then(dogs => console.log(dogs))
    fetchDogsInfo().then(dogs => dogs.forEach(dog => {
        const dogRow = createDogRow(dog)
        addEventToEdit(dogRow, dog)
        appendRowToDom(dogRow, dog)
    }))
}
addDogsToDom()

//Create table row for dog in API
function createDogRow(dog) {
    const dogRow = document.createElement('tr');
    const nameCell = document.createElement('td');
    const breedCell = document.createElement('td');
    const sexCell = document.createElement('td');
    const editdogCell = document.createElement('td');
    const button = document.createElement('button');
    nameCell.innerText = dog.name
    breedCell.innerText = dog.breed
    sexCell.innerText = dog.sex
    button.innerText = 'Edit'
    editdogCell.appendChild(button)
    dogRow.appendChild(nameCell)
    dogRow.appendChild(breedCell)
    dogRow.appendChild(sexCell)
    dogRow.appendChild(editdogCell)
    return dogRow
}

//Append the table row to the DOM
function appendRowToDom(dogRow) {
    const tableBody = document.getElementById('table-body');
    tableBody.appendChild(dogRow)
}

//Add event listener to edit button
function addEventToEdit(dogRow, dog) {
    const button = dogRow.getElementsByTagName('button')[0];
    const name = document.getElementById('name');
    const breed = document.getElementById('breed');
    const sex = document.getElementById('sex');
    const submit = document.getElementsByClassName('submit')[0]
    button.addEventListener('click', function () {
        name.value = dog.name;
        breed.value = dog.breed;
        sex.value = dog.sex;
        submit.id = dog.id
    })
}

//Add event listener to subit button
function addEventToSubmit() {
    const submit = document.getElementsByClassName('submit')[0]
    const tableBody = document.getElementById('table-body')
    submit.addEventListener('click', function (e) {
        e.preventDefault()
        changeDog(submit.id)
        tableBody.innerHTML = ''
        addDogsToDom()
    })
}
addEventToSubmit()

//Make patch request to server changing dog info
function changeDog(id) {
    const name = document.getElementById('name');
    const breed = document.getElementById('breed');
    const sex = document.getElementById('sex');
    const configObj = {
        method: 'PATCH',
        headers: {
            'Content-type': 'application/json'
        },
        body: JSON.stringify({
            name: name.value,
            breed: breed.value,
            sex: sex.value
        })
    }
    fetch(`http://localhost:3000/dogs/${id}`, configObj)
        .then(resp => resp.json())
        .then(data => console.log(data))
}