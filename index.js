//Stable DOM Elements
const mainBox = document.getElementById("main-box")
const navBar = document.querySelector(".topnav")

//Session Variables
let selectedUser = {}
let selectedGuide = {}

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
            .then(guideArray => {
                renderGuides(guideArray)
            })
    } else {
        return fetch(`http://localhost:3000/guides/${id}`)
            .then(resp => resp.json())
    }
}

//Event Listener
document.addEventListener("DOMContentLoaded", function() {
    navBar.querySelector("#home").classList.add("active")
    getGuides()
})

navBar.addEventListener("click", function (e) {
    if (e.target.id === "home") {
        e.preventDefault()
        document.querySelectorAll(".left-nav-items").forEach(el => el.classList.remove('active'))
        document.querySelectorAll(".right-nav-items").forEach(el => el.classList.remove('active'))
        e.target.classList.add("active")
        mainBox.innerHTML = null
        getGuides()
    } else if (e.target.id === "write-guide") {
        e.preventDefault()
        document.querySelectorAll(".left-nav-items").forEach(el => el.classList.remove('active'))
        document.querySelectorAll(".right-nav-items").forEach(el => el.classList.remove('active'))
        e.target.classList.add("active")
        console.log("Wrote a Guide!")
    } else if (e.target.id === "how-it-works") {
        e.preventDefault()
        document.querySelectorAll(".left-nav-items").forEach(el => el.classList.remove('active'))
        document.querySelectorAll(".right-nav-items").forEach(el => el.classList.remove('active'))
        e.target.classList.add("active")
        console.log("This is how it works!")
    } else if (e.target.id === "sign-up") {
        e.preventDefault()
        document.querySelectorAll(".left-nav-items").forEach(el => el.classList.remove('active'))
        document.querySelectorAll(".right-nav-items").forEach(el => el.classList.remove('active'))
        e.target.classList.add("active")
        console.log("Signed up!")
    } else if (e.target.id === "login") {
        e.preventDefault()
        document.querySelectorAll(".left-nav-items").forEach(el => el.classList.remove('active'))
        document.querySelectorAll(".right-nav-items").forEach(el => el.classList.remove('active'))
        e.target.classList.add("active")
        renderLoginPage()
        console.log("Logged in!")
    }
})


//Event Handlers


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
        console.log("Logged in!!!")
    })
    loginForm.append(usernameInput, loginButton)
    mainBox.append(loginForm)
    
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