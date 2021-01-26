//Stable DOM Elements
const mainBox = document.getElementById("main-box")
const navBar = document.querySelector(".topnav")

//Session Variables
let selectedUser = ""
let selectedGuide = ""

//Fetches
const getUsers = (id) => {
    if (!id) {
        return fetch(`http://localhost:3000/users`)
            .then(resp => resp.json())
    } else {
        return fetch(`http://localhost:3000/users/${id}`)
            .then(resp => resp.json())
    }
}

const getGuides = (id) => {
    if (!id) {
        return fetch(`http://localhost:3000/guides`)
            .then(resp => resp.json())
    } else {
        return fetch(`http://localhost:3000/guides/${id}`)
            .then(resp => resp.json())
    }
}

const signupUser = (newUserObj) => {
    return fetch(`http://localhost:3000/users`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(newUserObj)
    })
        .then(resp => resp.json())
}

const editUser = (id, editedUserObj) => {
    return fetch(`http://localhost:3000/users/${id}`, {
        method: 'PATCH',
        headers: {
            "Content-Type": "application/json"
            
        },
        body: JSON.stringify(editedUserObj)
    })
        .then(resp => resp.json())
}

const createGuide = (newGuideObj) => {
    return fetch(`http://localhost:3000/guides`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(newGuideObj)
    })
    .then(resp => resp.json())
}

const editGuide = (id, editedGuideObj) => {
    return fetch(`http://localhost:3000/guides/${id}`, {
        method: 'PATCH',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(editedGuideObj)
    })
        .then(resp => resp.json())
}



const deleteGuide = (id) => {
    return fetch(`http://localhost:3000/guides/${id}`, {
        method: 'DELETE'
    })
        .then(resp => resp.json())
}

//Event Listener
document.addEventListener("DOMContentLoaded", function() {
    navBar.querySelector("#home").classList.add("active")
    getGuides()
        .then(guideArray => {
            renderGuides(guideArray)
        })
})

navBar.addEventListener("click", function (e) {
    if (e.target.id === "home") {
        e.preventDefault()
        document.querySelectorAll(".left-nav-items").forEach(el => el.classList.remove('active'))
        document.querySelectorAll(".right-nav-items").forEach(el => el.classList.remove('active'))
        e.target.classList.add("active")
        mainBox.innerHTML = null
        getGuides()
            .then(guideArray => {
                renderGuides(guideArray)
            })
    } else if (e.target.id === "write-guide") {
        e.preventDefault()
        if (!selectedUser) {
            // document.querySelectorAll(".left-nav-items").forEach(el => el.classList.remove('active'))
            // document.querySelectorAll(".right-nav-items").forEach(el => el.classList.remove('active'))
            // e.target.classList.add("active")
            window.alert("Login or Sign Up to Post a Guide")
            renderLoginPage()
        } else {
            document.querySelectorAll(".left-nav-items").forEach(el => el.classList.remove('active'))
            document.querySelectorAll(".right-nav-items").forEach(el => el.classList.remove('active'))
            e.target.classList.add("active")
            renderNewGuideForm()
        }
    } else if (e.target.id === "how-it-works") {
        e.preventDefault()
        document.querySelectorAll(".left-nav-items").forEach(el => el.classList.remove('active'))
        document.querySelectorAll(".right-nav-items").forEach(el => el.classList.remove('active'))
        e.target.classList.add("active")
        console.log("This is how it works!")
    } else if (e.target.id === "sign-up") {
        if (e.target.innerText === "Logout") {
            e.preventDefault()
            logoutUser()
            document.querySelectorAll(".left-nav-items").forEach(el => el.classList.remove('active'))
            document.querySelectorAll(".right-nav-items").forEach(el => el.classList.remove('active'))
            document.querySelector("#home").classList.add("active")
            getGuides()
                .then(guidesArray => {
                    renderGuides(guidesArray)
                })
            console.log("Signed out!")
        } else {
            e.preventDefault()
            document.querySelectorAll(".left-nav-items").forEach(el => el.classList.remove('active'))
            document.querySelectorAll(".right-nav-items").forEach(el => el.classList.remove('active'))
            e.target.classList.add("active")
            renderSignupPage()
        }
    } else if (e.target.id === "login") {
        if (e.target.innerText === "Login") {
            e.preventDefault()
            document.querySelectorAll(".left-nav-items").forEach(el => el.classList.remove('active'))
            document.querySelectorAll(".right-nav-items").forEach(el => el.classList.remove('active'))
            e.target.classList.add("active")
            renderLoginPage()
        } else {
            e.preventDefault()
            document.querySelectorAll(".left-nav-items").forEach(el => el.classList.remove('active'))
            document.querySelectorAll(".right-nav-items").forEach(el => el.classList.remove('active'))
            e.target.classList.add("active")
            renderUserPage(selectedUser)
            console.log("My Profile!")
        }
    }
})


//Event Handlers
const loginUser = (username) => {
    getUsers()
        .then(usersArray => {
            let user = usersArray.filter(user => {
                return user.username === username
            })
            if (user[0]) {
                selectedUser = user[0]
                navBar.querySelector("#login").classList.remove("active")
                navBar.querySelector("#login").innerText = `${selectedUser.username}'s Profile`
                navBar.querySelector("#sign-up").innerText = "Logout"
                navBar.querySelector("#home").classList.add("active")
                getGuides()
                    .then(guideArray => {
                        renderGuides(guideArray)
                    })

            } else {
                window.alert("No User with that Username was found!")
                renderLoginPage()
            }
        })
}

const logoutUser = () => {
    selectedUser = ""
    navBar.querySelector("#sign-up").innerText = `Sign Up`
    navBar.querySelector("#login").innerText = "Login"
}


//Renders
const renderGuide = (guideObj) => {
    const card = document.createElement("div")
    const title = document.createElement("h2")
    const author = document.createElement("h3")
    title.innerText = guideObj.title
    author.innerText = guideObj.user.name
    card.className = "card"
    card.dataset.id = guideObj.id
    card.addEventListener("click", function() {
        selectedGuide = guideObj
        renderGuideShow(guideObj)
    } )
    card.append(title, author)
    mainBox.append(card)
}


function renderGuides(guidesArray) {
    mainBox.innerHTML = null
    guidesArray.forEach(renderGuide)
}

const renderGuideShow = (guideObj) => {
    mainBox.innerHTML = null
    document.querySelectorAll(".left-nav-items").forEach(el => el.classList.remove('active'))
    document.querySelectorAll(".right-nav-items").forEach(el => el.classList.remove('active'))
    // navBar.querySelector("#home").classList.remove("active")
    // navBar.querySelector("#home").classList = ("left-nav-items")
    const showGuide = document.createElement("div")
    showGuide.className = "show"
    showGuide.dataset.id = guideObj.id
    const showImage = document.createElement("img")
    showImage.className = "show-image"
    showImage.src = guideObj.img_url
    showImage.alt = guideObj.title
    const title = document.createElement("h1")
    title.innerText = guideObj.title
    const author = document.createElement("h2")
    author.innerText = `By: ${guideObj.user.name}`
    const content = document.createElement("p")
    content.innerText = guideObj.content
    const likesArea = document.createElement("div")
    likesArea.className = "likes-area"
    const likesAmount = document.createElement("p")
    likesAmount.innerText = `${guideObj.likes.length} Likes`
    const likeButton = document.createElement("button")
    likeButton.innerText = "Like"
    likeButton.addEventListener("click", function () {
        console.log("Liked!")
    })
    const commentArea = document.createElement("div")
    commentArea.className = "comment-area"
    const commentsLabel = document.createElement("h3")
    commentsLabel.innerText = "Comments"
    const commentsList = document.createElement("ul")
    commentsList.id = "comments"
    const toggleCommentFormButton = document.createElement("button")
    toggleCommentFormButton.innerText = "Comment"
    const commentForm = document.createElement("form")
    commentForm.id = "new-comment-form"
    commentForm.style.display = "none"
    const commentInput = document.createElement("input")
    commentInput.type = "text"
    commentInput.name = "comment"
    commentInput.id = "comment"
    commentInput.placeholder = "New Comment"
    const commentSubmit = document.createElement("input")
    commentSubmit.type = "submit"
    commentSubmit.value = "Add Comment"
    toggleCommentFormButton.addEventListener("click", function () {
        if (commentForm.style.display === "none") {
            commentForm.style.display = "block"
        } else {
            commentForm.style.display = "none"
        }
    })
    commentForm.addEventListener("submit", function (e) {
        e.preventDefault()
        console.log("Commented!")
    })
    commentForm.append(commentInput, commentSubmit)
    commentArea.append(commentsLabel, commentsList, toggleCommentFormButton, commentForm)
    likesArea.append(likesAmount, likeButton)
    showGuide.append(showImage, title, author, content, likesArea, commentArea)
    mainBox.append(showGuide)

}

const renderLoginPage = () => {
    mainBox.innerHTML = null
    const loginForm = document.createElement("form")
    loginForm.id = "login-form"
    const usernameInput = document.createElement("input")
    usernameInput.type = "text"
    usernameInput.name = "username"
    usernameInput.id = "username"
    const loginButton = document.createElement("input")
    loginButton.type = "submit"
    loginButton.value = "Login"
    loginForm.addEventListener("submit", function (e) {
        e.preventDefault()
        loginUser(e.target.username.value)
    })
    loginForm.append(usernameInput, loginButton)
    mainBox.append(loginForm)
    
}

const renderUserPage = (selectedUser) => {
    mainBox.innerHTML = null
    const userBox = document.createElement("div")
    userBox.className = "user-box"
    userBox.dataset.id = selectedUser.id
    const userImage = document.createElement("img")
    userImage.className = "user-image"
    userImage.src = selectedUser.img_url
    userImage.alt = selectedUser.name
    const editButton = document.createElement("button")
    editButton.innerText = "Edit"
    editButton.addEventListener("click", function() {
        mainBox.innerHTML = null
        renderEditUserPage()
    })
    const deleteButton = document.createElement("button")
    deleteButton.innerText = "Delete"
    deleteButton.addEventListener("click", function() {
        console.log("Delete!")
    })
    const name = document.createElement("h1")
    name.innerText = selectedUser.name
    const guidesBox = document.createElement("div")
    const guidesLabel = document.createElement("h2")
    guidesLabel.innerText = "Guides: "
    guidesBox.append(guidesLabel)
    getGuides()
        .then(guidesArray => {
            let userGuides = guidesArray.filter(guide => {
                return guide.user_id === selectedUser.id
            })
            userGuides.forEach(function (guide) {
                const userGuideCard = document.createElement("div")
                userGuideCard.className = "user-card"
                const title = document.createElement("h2")
                const editGuideButton = document.createElement("button")
                editGuideButton.innerText = "Edit"
                editGuideButton.id = "edit-guide-button"
                const deleteGuideButton = document.createElement("button")
                deleteGuideButton.innerText = "Delete"
                deleteGuideButton.id = "delete-guide-button"
                title.innerText = guide.title
                userGuideCard.dataset.id = guide.id
                userGuideCard.addEventListener("click", function(e) {
                    if (e.target.id === "edit-guide-button" ){
                        selectedGuide = guide
                        navBar.querySelector("#login").classList.remove(".active")
                        renderEditGuideForm()
                    } else if (e.target.id === "delete-guide-button") {
                        selectedGuide = guide
                        deleteGuide(selectedGuide.id)
                        selectedGuide = ""
                        e.target.closest(".user-card").remove()
                    } else {
                        selectedGuide = guide
                        renderGuideShow(guide)
                    }
                } )
                userGuideCard.append(editGuideButton, deleteGuideButton, title)
                guidesBox.append(userGuideCard)
                userBox.append(guidesBox)
            })
    })
    
    const wallet = document.createElement("h3")
    wallet.innerText = "Wallet: "
    const walletAmount = document.createElement("p")
    walletAmount.innerText = "3 Tokens"
    userBox.append(userImage, editButton, deleteButton, name, wallet, walletAmount)
    mainBox.append(userBox)
}

const renderSignupPage = () => {
    mainBox.innerHTML = null
    const signupForm = document.createElement("form")
    signupForm.id = "signup-form"
    const nameLabel = document.createElement("label")
    nameLabel.innerText = "Name: "
    const nameInput = document.createElement("input")
    nameInput.type = "text"
    nameInput.name = "name"
    nameInput.id = "name"
    const emailLabel = document.createElement("label")
    emailLabel.innerText = "Email: "
    const emailInput = document.createElement("input")
    emailInput.type = "text"
    emailInput.name = "email"
    emailInput.id = "email"
    const imgLabel = document.createElement("label")
    imgLabel.innerText = "Image: "
    const imgInput = document.createElement("input")
    imgInput.type = "text"
    imgInput.name = "img_url"
    imgInput.id = "img_url"
    const usernameLabel = document.createElement("label")
    usernameLabel.innerText = "Username: "
    const usernameInput = document.createElement("input")
    usernameInput.type = "text"
    usernameInput.name = "username"
    usernameInput.id = "username"
    const signupButton = document.createElement("input")
    signupButton.type = "submit"
    signupButton.value = "Sign Up"
    signupForm.addEventListener("submit", function (e) {
        e.preventDefault()
        let newUserObj = {
            name: e.target.name.value,
            email: e.target.email.value,
            img_url: e.target.img_url.value,
            username: e.target.username.value
        }
        signupUser(newUserObj)
            .then(userObj => {
                selectedUser = userObj
                navBar.querySelector("#sign-up").classList.remove("active")
                navBar.querySelector("#login").innerText = `${selectedUser.username}'s Profile`
                navBar.querySelector("#sign-up").innerText = "Logout"
                navBar.querySelector("#login").classList.add("active")
                renderUserPage(selectedUser)

            })
    })
    signupForm.append(usernameLabel, usernameInput, nameLabel, nameInput, emailLabel, emailInput, imgLabel, imgInput, signupButton)
    mainBox.append(signupForm)
    
}

const renderEditUserPage = () => {
    mainBox.innerHTML = null
    const editUserArea = document.createElement("div")
    editUserArea.classList.add("edit-users-form-area")
    editUserArea.dataset.id = selectedUser.id
    const editFormTitle = document.createElement("h1")
    editFormTitle.innerText = `Edit ${selectedUser.username}`
    const editUserForm = document.createElement("form")
    editUserForm.id = "edit-user-form"
    const nameLabel = document.createElement("label")
    nameLabel.innerText = "Name: "
    const nameInput = document.createElement("input")
    nameInput.type = "text"
    nameInput.name = "name"
    nameInput.id = "name"
    nameInput.value = `${selectedUser.name}`
    const emailLabel = document.createElement("label")
    emailLabel.innerText = "Email: "
    const emailInput = document.createElement("input")
    emailInput.type = "text"
    emailInput.name = "email"
    emailInput.id = "email"
    emailInput.value = `${selectedUser.email}`
    const imgLabel = document.createElement("label")
    imgLabel.innerText = "Image: "
    const imgInput = document.createElement("input")
    imgInput.type = "text"
    imgInput.name = "img_url"
    imgInput.id = "img_url"
    imgInput.value = `${selectedUser.img_url}`
    const usernameLabel = document.createElement("label")
    usernameLabel.innerText = "Username: "
    const usernameInput = document.createElement("input")
    usernameInput.type = "text"
    usernameInput.name = "username"
    usernameInput.id = "username"
    usernameInput.value = `${selectedUser.username}`
    const editUserButton = document.createElement("input")
    editUserButton.type = "submit"
    editUserButton.value = "Edit User"
    editUserForm.addEventListener("submit", (e) => {
        e.preventDefault()
        const editedUserObj = {
            name: e.target.name.value,
            username: e.target.username.value,
            email: e.target.email.value,
            img_url: e.target.img_url.value
        }
        editUser(selectedUser.id, editedUserObj)
            .then(returnedEditedUserObj => {
                selectedUser = returnedEditedUserObj
                navBar.querySelector("#sign-up").classList.remove("active")
                navBar.querySelector("#login").innerText = `${selectedUser.username}'s Profile`
                navBar.querySelector("#sign-up").innerText = "Logout"
                navBar.querySelector("#login").classList.add("active")
                renderUserPage(selectedUser)
            })
    })
    editUserForm.append(nameLabel, nameInput, emailLabel, emailInput, imgLabel, imgInput, usernameLabel, usernameInput, editUserButton)
    editUserArea.append(editFormTitle, editUserForm)
    mainBox.append(editUserArea)
}

const renderNewGuideForm = () => {
    mainBox.innerHTML = null
    const newGuideFormArea = document.createElement("div")
    newGuideFormArea.classList.add("new-guide-form-area")
    newGuideFormArea.dataset.id = selectedUser.id
    const newGuideFormTitle = document.createElement("h1")
    newGuideFormTitle.innerText = "Write a Guide"
    const newGuideForm = document.createElement("form")
    newGuideForm.id = "new-guide-form"
    const titleLabel = document.createElement("label")
    titleLabel.innerText = "Title: "
    const titleInput = document.createElement("input")
    titleInput.type = "text"
    titleInput.name = "title"
    titleInput.id = "title"
    const categoryLabel = document.createElement("label")
    categoryLabel.innerText = "Category: "
    const categoryInput = document.createElement("input")
    categoryInput.type = "text"
    categoryInput.name = "category"
    categoryInput.id = "category"
    const contentLabel = document.createElement("label")
    contentLabel.innerText = "Content: "
    const contentInput = document.createElement("TEXTAREA")
    contentInput.name = "content"
    contentInput.id = "content"
    const imgLabel = document.createElement("label")
    imgLabel.innerText = "Image: "
    const imgInput = document.createElement("input")
    imgInput.type = "text"
    imgInput.name = "img_url"
    imgInput.id = "img_url"
    const postGuideButton = document.createElement("input")
    postGuideButton.type = "submit"
    postGuideButton.value = "Post Guide"
    newGuideForm.addEventListener("submit", (e) => {
        e.preventDefault()
        const newGuideObj = {
            user_id: selectedUser.id,
            title: e.target.title.value,
            category: e.target.category.value,
            content: e.target.content.value,
            img_url: e.target.img_url.value
        }
        createGuide(newGuideObj)
            .then(createdGuide => {
                console.log(createdGuide)
                selectedGuide = createdGuide
                renderGuideShow(selectedGuide)
            })
    })
    newGuideForm.append(titleLabel, titleInput, categoryLabel, categoryInput, contentLabel, contentInput, imgLabel, imgInput, postGuideButton)
    newGuideFormArea.append(newGuideFormTitle, newGuideForm)
    mainBox.append(newGuideFormArea)
}

const renderEditGuideForm = () => {
    mainBox.innerHTML = null
    const editGuideFormArea = document.createElement("div")
    editGuideFormArea.classList.add("edit-guide-form-area")
    editGuideFormArea.dataset.id = selectedUser.id
    const editGuideFormTitle = document.createElement("h1")
    editGuideFormTitle.innerText = "Edit Guide"
    const editGuideForm = document.createElement("form")
    editGuideForm.id = "edit-guide-form"
    const titleLabel = document.createElement("label")
    titleLabel.innerText = "Title: "
    const titleInput = document.createElement("input")
    titleInput.type = "text"
    titleInput.name = "title"
    titleInput.id = "title"
    titleInput.value = `${selectedGuide.title}`
    const categoryLabel = document.createElement("label")
    categoryLabel.innerText = "Category: "
    const categoryInput = document.createElement("input")
    categoryInput.type = "text"
    categoryInput.name = "category"
    categoryInput.id = "category"
    categoryInput.value = `${selectedGuide.category}`
    const contentLabel = document.createElement("label")
    contentLabel.innerText = "Content: "
    const contentInput = document.createElement("input")
    contentInput.type = "text-area"
    contentInput.name = "content"
    contentInput.id = "content"
    contentInput.value = `${selectedGuide.content}`
    const imgLabel = document.createElement("label")
    imgLabel.innerText = "Image: "
    const imgInput = document.createElement("input")
    imgInput.type = "text"
    imgInput.name = "img_url"
    imgInput.id = "img_url"
    imgInput.value = `${selectedGuide.img_url}`
    const editGuideButton = document.createElement("input")
    editGuideButton.type = "submit"
    editGuideButton.value = "Post Guide"
    editGuideForm.addEventListener("submit", (e) => {
        e.preventDefault()
        const editedGuideObj = {
            user_id: selectedUser.id,
            title: e.target.title.value,
            category: e.target.category.value,
            content: e.target.content.value,
            img_url: e.target.img_url.value
        }
        editGuide(selectedGuide.id, editedGuideObj)
            .then(returnedEditedGuideObj => {
                console.log(returnedEditedGuideObj)
                selectedGuide = returnedEditedGuideObj
                renderGuideShow(selectedGuide)
            })
    })
    editGuideForm.append(titleLabel, titleInput, categoryLabel, categoryInput, contentLabel, contentInput, imgLabel, imgInput, editGuideButton)
    editGuideFormArea.append(editGuideFormTitle, editGuideForm)
    mainBox.append(editGuideFormArea)
}























// const test = document.getElementById("test")
// const testList = document.getElementById("test-list")

// function getUsers() {
//     fetch(`http://localhost:3000/users`)
//         .then(resp => resp.json())
//         .then(usersArray => {
//             renderUsers(usersArray)
//         })
// }

// function renderUsers(usersArray) {
//     usersArray.forEach(function (user) {
//         const newLi = document.createElement("li")
//         newLi.innerText = user.name
//         testList.append(newLi)
//     })
    
// }

// getUsers()