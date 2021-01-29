//Stable DOM Elements
const mainBox = document.getElementById("main-box")
const navBar = document.querySelector(".topnav")

//Session Variables
let selectedUser = ""
let selectedGuide = ""
let allGuides = []
let userGuideArray = []

//Helpers & Toggles
const removeHighlightsFromNav = () => {
    document.querySelectorAll(".left-nav-items").forEach(el => el.classList.remove('active'))
    document.querySelectorAll(".right-nav-items").forEach(el => el.classList.remove('active'))
}

const highlightNavItem = (navItem) => {
    navBar.querySelector(navItem).classList.add("active")
}

const removeHighlight = (navItem) => {
    navBar.querySelector(navItem).classList.remove("active")
}

const activateTarget = (element) => {
    element.classList.add("active")
}

const addWalletToNav = (selectedUser) => {
    let walletArea = navBar.querySelector(".wallet-area")
    console.log(walletArea)
    if (walletArea) {
        walletArea.getElementsByTagName("p")[0].innerText = `${selectedUser.tokens.length} Tokens`
    } else {
        walletArea = document.createElement("div")
        walletArea.classList.add("wallet-area")
        walletArea.classList.add("right-nav-items")
        const wallet = document.createElement("h4")
        wallet.innerText = "Wallet: "
        const walletAmount = document.createElement("p")
        walletAmount.innerText = `${selectedUser.tokens.length} Tokens`
        walletArea.append(wallet, walletAmount)
        navBar.append(walletArea)
    }
}


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

const addLike = (likeObj) => {
    return fetch(`http://localhost:3000/likes`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(likeObj)
    })
        .then(resp => resp.json())
}

const addComment = (commentObj) => {
    return fetch(`http://localhost:3000/comments`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(commentObj)
    })
        .then(resp => resp.json())
}

const deleteComment = (id) => {
    return fetch(`http://localhost:3000/comments/${id}`, {
        method: 'DELETE'
    })
        .then(resp => resp.json())
}

const addTokenToUser = (tokenObj) => {
    return fetch(`http://localhost:3000/tokens`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(tokenObj)
    })
        .then(resp => resp.json())
}

const removeTokenFromUser = (id) => {
    return fetch(`http://localhost:3000/tokens/${id}`, {
        method: 'DELETE'
    })
        .then(resp => resp.json())
}

const purchaseGuide = (purchasedGuideObj) => {
    return fetch(`http://localhost:3000/purchased_guides`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(purchasedGuideObj)
    })
        .then(resp => resp.json())
}

//Event Listener
document.addEventListener("DOMContentLoaded", function() {
    highlightNavItem("#home")
    getGuides()
        .then(guideArray => {
            allGuides = guideArray
            renderGuides(allGuides)
        })
})

navBar.addEventListener("click", function (e) {
    if (e.target.id === "home") {
        e.preventDefault()
        removeHighlightsFromNav()
        activateTarget(e.target)
        mainBox.innerHTML = null
        getGuides()
            .then(guideArray => {
                allGuides = guideArray
                renderGuides(guideArray)
            })
        
        
    } else if (e.target.id === "write-guide") {
        e.preventDefault()
        if (!selectedUser) {
            window.alert("Login or Sign Up to Post a Guide")
            removeHighlightsFromNav()
            highlightNavItem("#login")
            renderLoginPage()
        } else {
            removeHighlightsFromNav()
            activateTarget(e.target)
            renderNewGuideForm()
        }
    } else if (e.target.id === "how-it-works") {
        e.preventDefault()
        removeHighlightsFromNav()
        activateTarget(e.target)
        renderHowItWorksPage()
    } else if (e.target.id === "sign-up") {
        if (e.target.innerText === "Logout") {
            e.preventDefault()
            logoutUser()
            removeHighlightsFromNav()
            highlightNavItem("#home")
            console.log("Signed out!")
        } else {
            e.preventDefault()
            removeHighlightsFromNav()
            activateTarget(e.target)
            renderSignupPage()
        }
    } else if (e.target.id === "login") {
        if (e.target.innerText === "Login") {
            e.preventDefault()
            removeHighlightsFromNav()
            activateTarget(e.target)
            renderLoginPage()
        } else {
            e.preventDefault()
            removeHighlightsFromNav()
            activateTarget(e.target)
            getUsers(selectedUser.id)
                .then(user => {
                    selectedUser = user
                    
                })
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
                getGuides()
                    .then(guideArray => {
                        allGuides = guideArray
                        userGuideArray = guideArray.filter(guide => {
                            return guide.user_id === selectedUser.id
                        })
                    })
                // debugger
                removeHighlight("#login")
                navBar.querySelector("#login").innerText = `${selectedUser.username}'s Profile`
                navBar.querySelector("#sign-up").innerText = "Logout"
                highlightNavItem("#home")
                // const walletArea = document.createElement("div")
                // walletArea.classList.add("wallet-area")
                // walletArea.classList.add("right-nav-items")
                // const wallet = document.createElement("h4")
                // wallet.innerText = "Wallet: "
                // const walletAmount = document.createElement("p")
                // walletAmount.innerText = `${selectedUser.tokens.length} Tokens`
                // walletArea.append(wallet, walletAmount)
                // navBar.append(walletArea)
                addWalletToNav(selectedUser)
                renderGuides(allGuides)
                // getGuides()
                //     .then(guideArray => {
                //         renderGuides(guideArray)
                //     })

            } else {
                window.alert("No User with that Username was found!")
                renderLoginPage()
            }
        })
}

const logoutUser = () => {
    selectedUser = ""
    userGuideArray = []
    selectedGuide = ""
    allGuides = []
    navBar.querySelector("#sign-up").innerText = `Sign Up`
    navBar.querySelector("#login").innerText = "Login"
    navBar.querySelector(".wallet-area").remove()
    mainBox.innerHTML = null
    getGuides()
        .then(guideArray => {
            renderGuides(guideArray)
        })
}

const replenishUser = (id) => {
    getUsers()
        .then(usersArray => {
            let user = usersArray.filter(user => {
                return user.id === id
            })
            if (user[0]) {
                selectedUser = user[0]
                userGuideArray = selectedUser.guides
            }
        })
}


//Renders
const renderGuide = (guideObj) => {
    const card = document.createElement("div")
    const title = document.createElement("h2")
    const author = document.createElement("h3")
    title.innerText = guideObj.title
    author.innerText = `By: ${guideObj.user.username}`
    card.className = "card"
    card.dataset.id = guideObj.id
    if (selectedUser) {
            if (selectedUser.purchased_guides.length > 0) {
                const isGuidePurchased = selectedUser.purchased_guides.find(guide => {
                    return guide.guide_id === guideObj.id
                })
                
                if (isGuidePurchased) {
                    const greenCheck = document.createElement("span")
                    greenCheck.innerHTML = `&#10003` 
                    greenCheck.classList.add("green-check")
                    card.append(greenCheck)
                }
            }
            
            card.addEventListener("click", function() {
                let userPurchasedGuides = selectedUser.purchased_guides.filter(guide => {
                    return guide.guide_id === guideObj.id
                })
                selectedGuide = guideObj
                if (guideObj.user_id === selectedUser.id || userPurchasedGuides.length > 0) {
                    renderGuideShow(guideObj)
                } else {
                    
                    if (selectedUser.tokens.length > 1) {
                        
                        if (window.confirm(`You have ${selectedUser.tokens.length} Tokens. Would you like to read this Guide for 1 Token?`)) {
                            selectedUser.tokens.pop()
                            const newPurchasedGuide = {
                                user_id: selectedUser.id,
                                guide_id: selectedGuide.id
                            }
                            
                            purchaseGuide(newPurchasedGuide)
                                .then(purchasedGuideObject => {
                                    getGuides()
                                        .then(guideArray => {
                                            allGuides = guideArray
                                        })
                                })
                            removeTokenFromUser(selectedUser.tokens[0].id)
                                .then(removedToken => {
                                    const newToken = {
                                        user_id: selectedGuide.user_id
                                    }
                                    addTokenToUser(newToken)
                                        .then(returnedToken => {
                                            getUsers(selectedUser.id)
                                                .then(userObj => {
                                                    selectedUser = userObj
                                                    addWalletToNav(selectedUser)
                                                    renderGuideShow(selectedGuide)
                                                })
                                        })
                                }) 
                        }
                        
                                                
                    } else if (selectedUser.tokens.length === 1) {
                        if (window.confirm(`You have ${selectedUser.tokens.length} Tokens. Would you like to read this Guide for 1 Token?`)) {
                            // const greenCheck = document.createElement("span")
                            // greenCheck.innerHTML = `&#10003` 
                            // greenCheck.classList.add("green-check")
                            // card.append(greenCheck)
                            const newPurchasedGuide = {
                                user_id: selectedUser.id,
                                guide_id: selectedGuide.id
                            }
                            
                            purchaseGuide(newPurchasedGuide)
                            const greenCheck = document.createElement("span")
                            greenCheck.innerHTML = `&#10003` 
                            greenCheck.classList.add("green-check")
                            card.append(greenCheck)
                            removeTokenFromUser(selectedUser.tokens[0].id)
                                .then(removedToken => {
                                    const newToken = {
                                        user_id: selectedGuide.user_id
                                    }
                                    addTokenToUser(newToken)
                                        .then(returnedToken => {
                                            getUsers(selectedUser.id)
                                                .then(userObj => {
                                                    selectedUser = userObj
                                                    addWalletToNav(selectedUser)
                                                    renderGuideShow(selectedGuide)
                                                })
                                        })
                                })    
                        }            
                    } else {
                        console.log("No Money!")
                        window.alert("You're out of Tokens! Write new Guides to earn more Tokens!")
                    }
                }
            })
    } else {
        card.addEventListener("click", function() {
            selectedGuide = ""
            renderLoginPage()
        } )
    }
    card.append(title, author)
    mainBox.append(card)
}


function renderGuides(guidesArray) {
    mainBox.innerHTML = null
    getUsers(selectedUser.id)
        .then(upToDateUser => {
            console.log(upToDateUser)
            if (upToDateUser.id) {
                selectedUser = upToDateUser
            }
            guidesArray.forEach(renderGuide)
    })
 
}

const renderGuideShow = (guideObj) => {
    mainBox.innerHTML = null
    removeHighlightsFromNav()
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
        const newLikeObj = {
            user_id: selectedUser.id,
            guide_id: showGuide.dataset.id
        }
        addLike(newLikeObj)
            .then(returnedNewLikeObj => {
                guideObj.likes.push(returnedNewLikeObj)
                likesAmount.innerText = `${guideObj.likes.length} Likes`
                likeButton.disabled = true
            })
    })
    const commentArea = document.createElement("div")
    commentArea.className = "comment-area"
    const commentsLabel = document.createElement("h3")
    commentsLabel.innerText = "Comments"
    const commentsList = document.createElement("ul")
    commentsList.id = "comments"
    const newP = document.createElement("p")
    if (guideObj.comments.length === 0) {
        newP.innerText = "No Comments Yet"
    } else {
        guideObj.comments.forEach((comment) => {
            const newLi = document.createElement("li")
            newLi.dataset.id = comment.id
            const date = new Date(comment.created_at).toLocaleDateString('en-US')
            newLi.innerText = `${comment.user.username} (${date}): ${comment.comment}`
            if (selectedUser.id === comment.user.id) {
                const deleteButton = document.createElement("button")
                deleteButton.innerText = "X"
                deleteButton.addEventListener("click", (e) => {
                    deleteComment(newLi.dataset.id)
                        .then(deletedObj => {
                            deleteButton.closest("li").remove()
                        })
                })
                newLi.append(deleteButton)
            }
            commentsList.append(newLi)
        })
    }
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
        const newCommentObj = {
            user_id: selectedUser.id,
            guide_id: showGuide.dataset.id,
            comment: e.target.comment.value
        }
        commentArea.querySelector("p").remove()
        addComment(newCommentObj)
            .then(returnedNewCommentObj => {
                const newLi = document.createElement("li")
                newLi.dataset.id = returnedNewCommentObj.id
                const date = new Date(returnedNewCommentObj.created_at).toLocaleDateString('en-US')
                newLi.innerText = `${returnedNewCommentObj.user.username} (${date}): ${returnedNewCommentObj.comment}`
                if (selectedUser.id === returnedNewCommentObj.user.id) {
                    const deleteButton = document.createElement("button")
                    deleteButton.innerText = "X"
                    deleteButton.addEventListener("click", (e) => {
                        deleteComment(newLi.dataset.id)
                            .then(deletedObj => {
                                deleteButton.closest("li").remove()
                                getUsers(selectedUser.id)
                                    .then(updatedUser => {
                                        selectedUser = updatedUser
                                    })
                            })
                    })
                    newLi.append(deleteButton)
                }
                commentsList.append(newLi)
                e.target.reset()
                commentForm.style.display = "none"

            })
    })
    commentForm.append(commentInput, commentSubmit)
    commentArea.append(commentsLabel, newP, commentsList, toggleCommentFormButton, commentForm)
    likesArea.append(likesAmount, likeButton)
    showGuide.append(showImage, title, author, content, likesArea, commentArea)
    let likesArray = guideObj.likes.filter(like => {
        return like.user_id === selectedUser.id
    })
    // debugger
    if (selectedUser.id === guideObj.user_id || likesArray.length > 0) {
        likeButton.disabled = true
    }
    mainBox.append(showGuide)

}

const renderLoginPage = () => {
    mainBox.innerHTML = null
    const loginForm = document.createElement("form")
    loginForm.id = "login-form"
    const usernameLabel = document.createElement("label")
    usernameLabel.innerText = "Username: "
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
    loginForm.append(usernameLabel, usernameInput, loginButton)
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
    // const walletArea = document.createElement("div")
    // walletArea.classList.add("wallet-area")
    // walletArea.classList.add("right-nav-items")
    // const wallet = document.createElement("h3")
    // wallet.innerText = "Wallet: "
    // const walletAmount = document.createElement("p")
    // walletAmount.innerText = `${selectedUser.tokens.length} Tokens`
    // walletArea.append(wallet, walletAmount)
    userBox.append( editButton, deleteButton, name, userImage)
    
    
    userGuideArray.forEach(function (guide) {
        
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
                removeHighlight("#login")
                renderEditGuideForm()
            } else if (e.target.id === "delete-guide-button") {
                e.target.closest(".user-card").remove()
                selectedGuide = guide
                deleteGuide(selectedGuide.id)
                allGuides = allGuides.filter(el => el.id !== guide.id)
                selectedGuide = ""
                getUsers(selectedUser.id)
                    .then(updatedUser => {
                        selectedUser = updatedUser
                        let freshGuideArray = selectedUser.guides.filter(guide => {
                            return guide.id === userGuideCard.dataset.id
                        })
                        selectedUser.guides = freshGuideArray
                    })
            } else {
                getGuides(guide.id)
                    .then(updatedGuide => {
                        selectedGuide = updatedGuide
                        renderGuideShow(selectedGuide)
                    })
            }
        } )
        userGuideCard.append(editGuideButton, deleteGuideButton, title)
        guidesBox.append(userGuideCard)
        userBox.append(guidesBox)
    })
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
                removeHighlight("#sign-up")
                navBar.querySelector("#login").innerText = `${selectedUser.username}'s Profile`
                navBar.querySelector("#sign-up").innerText = "Logout"
                highlightNavItem("#login")
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
                removeHighlight("#sign-up")
                navBar.querySelector("#login").innerText = `${selectedUser.username}'s Profile`
                navBar.querySelector("#sign-up").innerText = "Logout"
                highlightNavItem("#login")
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
                selectedGuide = createdGuide
                allGuides.push(createdGuide)
                userGuideArray.push(createdGuide)
                renderGuideShow(selectedGuide)
                setTimeout(() => window.alert("Congratulations! By posting a new Guide, you've earned 1 Token!"), 500)
                const newToken = {
                    user_id: selectedUser.id
                }
                addTokenToUser(newToken)
                selectedUser.tokens.push(newToken)
                addWalletToNav(selectedUser)
                
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
    const contentInput = document.createElement("TEXTAREA")
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

const renderHowItWorksPage = () => {
    mainBox.innerHTML = null
    const aboutBox = document.createElement("div")
    aboutBox.classList.add("show")
    const aboutImage = document.createElement("img")
    aboutImage.classList.add("show-image")
    aboutImage.src = "https://lh3.googleusercontent.com/proxy/0eDBQOyYcah2qoahtjVmak8FEFbHuA9Kg9goW-9bMrYE-t2y-2Ex92YK2R6qTFzi5bZScrr8zPQqa9kIOJ55IGurD5frvBCD1eP2P2UwLQWCT1De3TQpbhytyL74"
    aboutImage.alt = "iSherpa"
    const aboutTitle = document.createElement("h1")
    aboutTitle.innerText = "iSherpa - How It Works"
    const aboutParagraph = document.createElement("p")
    aboutParagraph.innerText = "Welcome to iSherpa! A community to read and share guides on any subject! To read another user's guide, you need to pay with a token. How do you earn tokens? By writing your own guide! Also, if another user reads your guide, you'll earn a token! Your token wallet is visible on the navigation bar once you log in." 
    const bottomH2 = document.createElement("h2")
    bottomH2.innerText = "Keep reading, writing, and sharing guides! Enjoy! -The iSherpa Team"
    aboutBox.append(aboutImage, aboutTitle, aboutParagraph, bottomH2)
    mainBox.append(aboutBox)
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