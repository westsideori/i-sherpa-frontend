const test = document.getElementById("test")
const testList = document.getElementById("test-list")

function getUsers() {
    fetch(`http://localhost:3000/users`)
        .then(resp => resp.json())
        .then(usersArray => {
            renderUsers(usersArray)
        })
}

function renderUsers(usersArray) {
    usersArray.forEach(function (user) {
        const newLi = document.createElement("li")
        newLi.innerText = user.name
        testList.append(newLi)
    })
    
}

getUsers()