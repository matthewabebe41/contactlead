async function renderLoginContent() {
    const smallSidebar = document.querySelector("#small-sidebar");
    const largeSidebar = document.querySelector("#large-sidebar");
    smallSidebar.style.display = "none";
    largeSidebar.style.display = "none";

    const loginUserButton = document.querySelector("#login-user-button");
    loginUserButton.addEventListener("click", async function(event) {
        event.preventDefault();

        const allUsers = await getAllUsers();
        const loginUserObject = await handleLoginInput();

        console.log(allUsers)
        let matchingUser;
        for (let i = 0; i < allUsers.length; i++) {
            console.log(allUsers[i].emailaddress)
            console.log(loginUserObject.emailAddress)
            if (allUsers[i].emailaddress[0] === loginUserObject.emailAddress && allUsers[i].user_password === loginUserObject.password) {
                matchingUser = allUsers[i]
                sessionStorage.setItem("user", matchingUser.user_id)
                window.location.href = "http://localhost:3000/";
            }
        }

    })

    const navigateRegisterPageButton = document.querySelector("#navigate-to-register-view-button");
    navigateRegisterPageButton.addEventListener("click", function(event) {
    event.preventDefault()
    window.location.href = "http://localhost:3000/register";
    });
};

async function handleLoginInput() {
    const loginEmaiElement = document.querySelector("#user-email-address-element");
    const loginPasswordElement = document.querySelector("#user-password-element");

    const loginUserObject = {
        emailAddress: loginEmaiElement.value,
        password: loginPasswordElement.value
    };

    console.log(loginUserObject);

    return loginUserObject
}


async function renderRegisterContent() {
    const smallSidebar = document.querySelector("#small-sidebar");
    const largeSidebar = document.querySelector("#large-sidebar");
    smallSidebar.style.display = "none";
    largeSidebar.style.display = "none";

    const navigateLoginPageButton = document.querySelector("#navigate-to-login-view-button");
    navigateLoginPageButton.addEventListener("click", function(event) {
        event.preventDefault();
        window.location.href = "http://localhost:3000/login";
    });

    const registerUserButton = document.querySelector("#register-user-button");
    registerUserButton.addEventListener("click", function (event) {
        event.preventDefault();
        postNewUser()
    })
};

async function handleRegisterInput() {
    // event.preventDefault()

    const registerUserFirstNameElement = document.querySelector("#register-user-first-name");
    const registerUserLastNameElement = document.querySelector("#register-user-last-name");
    const registerUserEmailElement = document.querySelector("#register-user-email");
    // const registerUserPhonenumberElement = document.querySelector("#register-user-phonenumber")
    const registerUserPasswordElement = document.querySelector("#register-user-password");
    const registerUserConfirmPasswordElement = document.querySelector("#register-user-confirm-password");

    const confirmationPassword = registerUserConfirmPasswordElement.value;

    const allUsers = await getAllUsers()

    const registerUserObject = {
        userId: allUsers.length + 1,
        firstName: registerUserFirstNameElement.value,
        lastName: registerUserLastNameElement.value,
        emailAddress: [registerUserEmailElement.value],
        password: registerUserPasswordElement.value,
    };

    // console.log(registerUserObject)

    if (registerUserObject.password !== confirmationPassword) {
        alert("Passwords do not match.")
    }

    return registerUserObject
};

async function renderContactsListContent() {
    const userId = sessionStorage.getItem("user");
    const user = await getUser(userId);

    const navigateContactsListPageIcon = document.querySelector("#navigate-contacts-list-page-icon");
    navigateContactsListPageIcon.style.display = "none";

    const navigateUserPageIcon = document.querySelector("#navigate-user-page-icon");
    navigateUserPageIcon.addEventListener("click", function() {
        console.log("navigate user page")
        console.log(user)

        // window.location.href = "http://localhost:3000/"
         function saveDataToURL(url, data) {
                const urlObject = new URL(url);
                const params = new URLSearchParams(urlObject.search);
            
                for (const key in data) {
                    if (data.hasOwnProperty(key)) {
                        params.set(key, data[key]);
                    }
                }
                urlObject.search = params.toString();
                return urlObject.toString();
            }
                
            const myURL = "http://localhost:3000/user"
            const myData = {
                user_id: user.user_id,
                name: `${user.firstname} ${user.lastname}`,
                // age: 30,
                // city: "New York"
            };
                
                let newURL = saveDataToURL(myURL, myData);

                if (newURL.charAt(newURL.length - 1) === '+') {
                    console.log(newURL)
                    let editedurl = newURL.slice(0, -1)
                    newURL = editedurl
                }
               
                // // Expected output: "https://example.com/page?name=John+Doe&age=30&city=New+York"
                window.location.href = newURL
    })
};

async function renderUserContent() {
    const userId = sessionStorage.getItem("user");
    const user = await getUser(userId);

    const userImageContainer = document.querySelector("#user-image-container");
    // const userImage = new Image();

    const navigateUserPageIcon = document.querySelector("#navigate-user-page-icon");
    navigateUserPageIcon.style.display = "none"

    const navigateContactsListPageIcon = document.querySelector("#navigate-contacts-list-page-icon");
    navigateContactsListPageIcon.addEventListener("click", function() {
        window.location.href = "http://localhost:3000"
    })

    const userNameElement = document.querySelector("#user-name");
    const userEmailElement = document.querySelector("#user-email")
    userNameElement.innerHTML = `${user.firstname} ${user.lastname}`
    userEmailElement.innerHTML = `${user.emailaddress}`

    console.log(user)
}

async function getAllUsers() {
    try {
    const response = await fetch("http://localhost:3000/users");
    const jsonData = await response.json();
    return jsonData;   
    } catch (err) {
    console.error(err.message)
    }
};

async function getUser(user_id) {
    try {
    const response = await fetch(`http://localhost:3000/users/${user_id}`);
    const jsonData = await response.json();
    return jsonData; 
    } catch (err) {
    console.error(err.message);
    }
};

async function postNewUser() {
    const registerUserObject = await handleRegisterInput();

    const user_id = registerUserObject.userId;
    const firstname = registerUserObject.firstName;
    const lastname = registerUserObject.lastName;
    const emailaddress = registerUserObject.emailAddress;
    const user_password = registerUserObject.password;

    console.log(registerUserObject)

    const body = { user_id, firstname, lastname, emailaddress, user_password };
    try {
        const response = await fetch("http://localhost:3000/users", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(body)
        });
        console.log(response)
    } catch (err) {
        console.error(err)
    }

    window.location.href = "http://localhost:3000/login"
};

async function domReady(cb) {
    document.readyState === 'interactive' || document.readyState === 'complete'
    ? cb
    : document.addEventListener("DOMContentLoaded", cb)
};

async function setInitialURLAsLogin() {
    const userId = sessionStorage.getItem("user");
    console.log(userId);

    const appName = document.querySelector("#app-name");

    if (userId !== null) {
        appName.style.left = "32%"
        return
    }

    if (window.location.href === "http://localhost:3000/login") {
        return
    };

    if (userId === null && window.location.href !== "http://localhost:3000/register") {
        window.location.href = "http://localhost:3000/login"
        return
    };
};

domReady(async () => {
    
    await setInitialURLAsLogin()
    const loginViewElement = document.querySelector("#login-view")
    if (window.location.href === "http://localhost:3000/login") {
        loginViewElement.style.display = "block"
        await renderLoginContent()
        document.body.style.display = "block"
    } else {
        loginViewElement.style.display = "none"
    };

    const registerViewElement = document.querySelector("#register-view")
    if (window.location.href === "http://localhost:3000/register") {
        registerViewElement.style.display = "block";
        await renderRegisterContent()
        document.body.style.display = "block"
    } else {
        registerViewElement.style.display = "none"
    };

    const contactsListViewElement = document.querySelector("#contacts-list-view");
    if (window.location.href === "http://localhost:3000/") {
        contactsListViewElement.style.display = "block";
        await renderContactsListContent()
        document.body.style.display = "block"
    } else {
        contactsListViewElement.style.display = "none"
    };

    const userViewElement = document.querySelector("#user-view");
    if (window.location.href.startsWith("http://localhost:3000/user")) {
        userViewElement.style.display = "block";
        await renderUserContent()
        document.body.style.display = "block"
    } else {
        userViewElement.style.display = "none"
    };
});
   