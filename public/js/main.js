const rootUrl = window.location.origin;

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
        let found = false;
        
        for (let i = 0; i < allUsers.length; i++) {
            if (allUsers[i].emailaddress === loginUserObject.emailAddress) {
                found = true;
                matchingUser = allUsers[i]
                sessionStorage.setItem("user", matchingUser.session_id)
            }
        }

        // if (allUsers.emailaddress === loginUserObject.emailAddress) {
        //     found = true;
        //     matchingUser = allUsers
        //     sessionStorage.setItem("user", matchingUser.user_id)
        // }

        if (!found) {
            alert("user not found")
            return
        }

        let matchingPass = false

        if (matchingUser.user_password === loginUserObject.password) {
            matchingPass = true;
            // sessionStorage.setItem("user", matchingUser.user_id)
            window.location.href = `${rootUrl}/contacts`;
            // break
        }
    
        console.log(matchingPass)
        if (!matchingPass) {
            alert("incorrect password")
            return
        } 
    })

    const navigateRegisterPageButton = document.querySelector("#navigate-to-register-view-button");
    navigateRegisterPageButton.addEventListener("click", function(event) {
    event.preventDefault()
    window.location.href = `${rootUrl}/register`;
    });
};

async function renderMobileLoginContent() {
    const smallSidebar = document.querySelector("#small-sidebar");
    const largeSidebar = document.querySelector("#large-sidebar");
    smallSidebar.style.display = "none";
    largeSidebar.style.display = "none";

      const mobileLoginUserButton = document.querySelector("#mobile-login-user-button");
      mobileLoginUserButton.addEventListener("click", async function(event) {
        event.preventDefault();

        const allUsers = await getAllUsers();
        const loginUserObject = await handleMobileLoginInput();

        console.log(allUsers)
        let matchingUser;
        let found = false;
        
        for (let i = 0; i < allUsers.length; i++) {
            if (allUsers[i].emailaddress === loginUserObject.emailAddress) {
                found = true;
                matchingUser = allUsers[i]
                sessionStorage.setItem("user", matchingUser.session_id)
            }
        }

        // if (allUsers.emailaddress === loginUserObject.emailAddress) {
        //     found = true;
        //     matchingUser = allUsers
        //     sessionStorage.setItem("user", matchingUser.user_id)
        // }

        if (!found) {
            alert("user not found")
            return
        }

        let matchingPass = false

        if (matchingUser.user_password === loginUserObject.password) {
            matchingPass = true;
            // sessionStorage.setItem("user", matchingUser.user_id)
            window.location.href = `${rootUrl}/contacts`;
            // break
        }
    
        console.log(matchingPass)
        if (!matchingPass) {
            alert("incorrect password")
            return
        } 
    })

    const mobileNavigateRegisterPageButton = document.querySelector("#mobile-navigate-to-register-view-button");
    mobileNavigateRegisterPageButton.addEventListener("click", function(event) {
    event.preventDefault()
    window.location.href = `${rootUrl}/register`;
    });
}

async function handleLoginInput() {
    const loginEmaiElement = document.querySelector("#user-email-address-element");
    const loginPasswordElement = document.querySelector("#user-password-element");

    const loginUserObject = {
        emailAddress: loginEmaiElement.value,
        password: loginPasswordElement.value
    };

    return loginUserObject
};

async function handleMobileLoginInput() {
    const mobileLoginEmailElement = document.querySelector("#mobile-user-email-address-element");
    const mobileLoginPasswordElement = document.querySelector("#mobile-user-password-element");

    const loginUserObject = {
        emailAddress: mobileLoginEmailElement.value,
        password: mobileLoginPasswordElement.value
    };

    return loginUserObject
}

async function renderRegisterContent() {
    const smallSidebar = document.querySelector("#small-sidebar");
    const largeSidebar = document.querySelector("#large-sidebar");
    smallSidebar.style.display = "none";
    largeSidebar.style.display = "none";

    const registerUserPhoneNumberElement = document.querySelector("#register-user-phonenumber");
    // const phonenumber = newContactPhoneNumberElement.value
    // console.log(phonenumber)
    registerUserPhoneNumberElement.addEventListener("keydown", disableNonNumericKeys)
    registerUserPhoneNumberElement.addEventListener("blur", function() {
        formatPhoneNumberForData(registerUserPhoneNumberElement)
    });
    registerUserPhoneNumberElement.addEventListener("focus", function() {
        resetPhoneNumberFormatOnFocus(registerUserPhoneNumberElement)
    });
    registerUserPhoneNumberElement.addEventListener("paste", function(event) {
        // event.preventDefault()
        const clipboard = event.clipboardData;
        const pastedText = clipboard.getData("Text")
        // let pastedText = (event.clipboardData || window.clipboardData).getData('text');
        pastedText.replace(/[^0-9]/g, '')
        event.target.value = pastedText;
        // removeNonNumericCharacters(pastedText)
    }, false);
    registerUserPhoneNumberElement.addEventListener("input", function() {
        resetPhoneNumberFormatOnFocus(registerUserPhoneNumberElement)
    });
    

    const navigateLoginPageButton = document.querySelector("#navigate-to-login-view-button");
    navigateLoginPageButton.addEventListener("click", function(event) {
        event.preventDefault();
        window.location.href = `${rootUrl}/login`;
    });

    const registerUserPasswordElement = document.querySelector("#register-user-password");
    const registerUserConfirmPasswordElement = document.querySelector("#register-user-confirm-password");
    const matchingPasswordsContainer = document.querySelector("#matching-passwords")
  
    registerUserPasswordElement.addEventListener("input", function() {

        if (registerUserPasswordElement.value.length === 0) {
            matchingPasswordsContainer.children[0].style.visibility = "hidden"
        } else {
            if (registerUserPasswordElement.value !== registerUserConfirmPasswordElement.value) {
                matchingPasswordsContainer.children[0].style.visibility = "visible"
                matchingPasswordsContainer.children[0].innerHTML = "Passwords do not match"
                matchingPasswordsContainer.children[0].style.color = "red"
            }    
            if (registerUserPasswordElement.value === registerUserConfirmPasswordElement.value) {
                 matchingPasswordsContainer.children[0].style.visibility = "visible"
                 matchingPasswordsContainer.children[0].innerHTML = "Passwords match"
                 matchingPasswordsContainer.children[0].style.color = "green"
            }
        }
    });

    registerUserConfirmPasswordElement.addEventListener("input", function() {

        if (registerUserPasswordElement.value.length === 0) {
            matchingPasswordsContainer.children[0].style.visibility = "hidden"
        } else {

            if (registerUserPasswordElement.value !== registerUserConfirmPasswordElement.value) {
                matchingPasswordsContainer.children[0].style.visibility = "visible"
                matchingPasswordsContainer.children[0].innerHTML = "Passwords do not match"
                matchingPasswordsContainer.children[0].style.color = "red"
            }
            
            if (registerUserPasswordElement.value === registerUserConfirmPasswordElement.value) {
                 matchingPasswordsContainer.children[0].style.visibility = "visible"
                 matchingPasswordsContainer.children[0].innerHTML = "Passwords match"
                 matchingPasswordsContainer.children[0].style.color = "green"
            }
        }
    });

    const registerUserButton = document.querySelector("#register-user-button");
    registerUserButton.addEventListener("click", function (event) {
        event.preventDefault();
        postNewUser()
    });
};

async function renderMobileRegisterContent() {
    const smallSidebar = document.querySelector("#small-sidebar");
    const largeSidebar = document.querySelector("#large-sidebar");
    smallSidebar.style.display = "none";
    largeSidebar.style.display = "none";

     const registerUserPhoneNumberElement = document.querySelector("#mobile-register-user-phonenumber");
    // const phonenumber = newContactPhoneNumberElement.value
    // console.log(phonenumber)
    registerUserPhoneNumberElement.addEventListener("keydown", disableNonNumericKeys)
    registerUserPhoneNumberElement.addEventListener("blur", function() {
        formatPhoneNumberForData(registerUserPhoneNumberElement)
    });
    registerUserPhoneNumberElement.addEventListener("focus", function() {
        resetPhoneNumberFormatOnFocus(registerUserPhoneNumberElement)
    });

    const navigateLoginPageButton = document.querySelector("#mobile-navigate-to-login-view-button");
    navigateLoginPageButton.addEventListener("click", function(event) {
        event.preventDefault();
        window.location.href = `${rootUrl}/login`;
    });

    const registerUserPasswordElement = document.querySelector("#mobile-register-user-password");
    const registerUserConfirmPasswordElement = document.querySelector("#mobile-register-user-confirm-password");
    const matchingPasswordsContainer = document.querySelector("#mobile-matching-passwords")
  
    registerUserPasswordElement.addEventListener("input", function() {

        if (registerUserPasswordElement.value.length === 0) {
            matchingPasswordsContainer.children[0].style.visibility = "hidden"
        } else {
            if (registerUserPasswordElement.value !== registerUserConfirmPasswordElement.value) {
                matchingPasswordsContainer.children[0].style.visibility = "visible"
                matchingPasswordsContainer.children[0].innerHTML = "Passwords do not match"
                matchingPasswordsContainer.children[0].style.color = "red"
            }    
            if (registerUserPasswordElement.value === registerUserConfirmPasswordElement.value) {
                 matchingPasswordsContainer.children[0].style.visibility = "visible"
                 matchingPasswordsContainer.children[0].innerHTML = "Passwords match"
                 matchingPasswordsContainer.children[0].style.color = "green"
            }
        }
    });

    registerUserConfirmPasswordElement.addEventListener("input", function() {

        if (registerUserPasswordElement.value.length === 0) {
            matchingPasswordsContainer.children[0].style.visibility = "hidden"
        } else {

            if (registerUserPasswordElement.value !== registerUserConfirmPasswordElement.value) {
                matchingPasswordsContainer.children[0].style.visibility = "visible"
                matchingPasswordsContainer.children[0].innerHTML = "Passwords do not match"
                matchingPasswordsContainer.children[0].style.color = "red"
            }
            
            if (registerUserPasswordElement.value === registerUserConfirmPasswordElement.value) {
                 matchingPasswordsContainer.children[0].style.visibility = "visible"
                 matchingPasswordsContainer.children[0].innerHTML = "Passwords match"
                 matchingPasswordsContainer.children[0].style.color = "green"
            }
        }
    });

    const registerUserButton = document.querySelector("#mobile-register-user-button");
    registerUserButton.addEventListener("click", function (event) {
        event.preventDefault();
        mobilePostNewUser()
    });
};

async function generateSessionId(length) {
    const allUsers = await getAllUsers()
    let allUserSessionIds = [];

    for (let i = 0; i < allUsers.length; i++) {
        allUserSessionIds.push(allUsers[i].session_id)
    }

    console.log(allUserSessionIds)
    const lowercaseChars = "abcdefghijklmnopqrstuvwxyz";
    const uppercaseChars = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
    const numberChars = "0123456789";
    const symbolChars = "!@#$%^&*()_+=-`~[]\{}|;':\",./<>?";
    const allChars = lowercaseChars + uppercaseChars + numberChars + symbolChars;
    let sessionId = "";
    do {
        for (let i = 0; i < length; i++) {
          const randomIndex = Math.floor(Math.random() * allChars.length);
          sessionId += allChars.charAt(randomIndex);
        }
    } while (allUserSessionIds.includes(sessionId))

    return sessionId;
};

async function handleRegisterInput(event) {
    const registerUserFirstNameElement = document.querySelector("#register-user-first-name");
    const registerUserLastNameElement = document.querySelector("#register-user-last-name");
    const registerUserEmailElement = document.querySelector("#register-user-email");
    const registerUserPhonenumberElement = document.querySelector("#register-user-phonenumber")
    const registerUserPasswordElement = document.querySelector("#register-user-password");
    const registerUserConfirmPasswordElement = document.querySelector("#register-user-confirm-password");

    const confirmationPassword = registerUserConfirmPasswordElement.value;

    const allUsers = await getAllUsers()
    const registerUserEmailInput = registerUserEmailElement.value;

    for (let i = 0; i < allUsers.length; i++) {
        if (registerUserEmailInput === "") {
            // event.preventDefault()
            alert("Email is a required field. Please provide an email address.")
            return
        }

        if (allUsers[i].emailaddress === registerUserEmailInput) {
            // event.preventDefault()
            alert("This email address is already in use. Please try again.")
            return
        }
    }

    let userIdArr = []
    for (let i = 0; i < allUsers.length; i++) {
        userIdArr.push(allUsers[i].user_id)
    }

    let maxId = -Infinity;
    for (let i = 0; i < userIdArr.length; i++) {
        if (userIdArr[i] > maxId) {
            maxId = userIdArr[i];
        }
    }

    console.log(maxId)
    if (maxId === -Infinity) {
        maxId = 0
    }

    const registerUserObject = {
        userId: maxId + 1,
        sessionId: await generateSessionId(30),
        firstName: registerUserFirstNameElement.value,
        lastName: registerUserLastNameElement.value,
        emailAddress: registerUserEmailElement.value,
        phonenumber: registerUserPhonenumberElement.value,
        password: registerUserPasswordElement.value,
    };

    if (registerUserObject.password !== confirmationPassword) {
        alert("Passwords do not match.")
        return
    }

    console.log(registerUserObject)

    return registerUserObject
};

async function handleMobileRegisterInput(event) {
    const registerUserFirstNameElement = document.querySelector("#mobile-register-user-first-name");
    const registerUserLastNameElement = document.querySelector("#mobile-register-user-last-name");
    const registerUserEmailElement = document.querySelector("#mobile-register-user-email");
    const registerUserPhonenumberElement = document.querySelector("#mobile-register-user-phonenumber")
    const registerUserPasswordElement = document.querySelector("#mobile-register-user-password");
    const registerUserConfirmPasswordElement = document.querySelector("#mobile-register-user-confirm-password");

    const confirmationPassword = registerUserConfirmPasswordElement.value;

    const allUsers = await getAllUsers()
    const registerUserEmailInput = registerUserEmailElement.value;

    for (let i = 0; i < allUsers.length; i++) {
        if (registerUserEmailInput === "") {
            // event.preventDefault()
            alert("Email is a required field. Please provide an email address.")
            return
        }

        if (allUsers[i].emailaddress === registerUserEmailInput) {
            // event.preventDefault()
            alert("This email address is already in use. Please try again.")
            return
        }
    }

    let userIdArr = []
    for (let i = 0; i < allUsers.length; i++) {
        userIdArr.push(allUsers[i].user_id)
    }

    let maxId = -Infinity;
    for (let i = 0; i < userIdArr.length; i++) {
        if (userIdArr[i] > maxId) {
            maxId = userIdArr[i];
        }
    }

    console.log(maxId)
    if (maxId === -Infinity) {
        maxId = 0
    }

    const registerUserObject = {
        userId: maxId + 1,
        sessionId: await generateSessionId(30),
        firstName: registerUserFirstNameElement.value,
        lastName: registerUserLastNameElement.value,
        emailAddress: registerUserEmailElement.value,
        phonenumber: registerUserPhonenumberElement.value,
        password: registerUserPasswordElement.value,
    };

    if (registerUserObject.password !== confirmationPassword) {
        alert("Passwords do not match.")
        return
    }

    return registerUserObject
};

const forgotPasswordLabel = document.querySelector("#forgot-password-label");
forgotPasswordLabel.addEventListener("mouseover", function() {
    forgotPasswordLabel.style.color = "blue"
});
forgotPasswordLabel.addEventListener("mouseout", function() {
    forgotPasswordLabel.style.color = "grey"
});
forgotPasswordLabel.addEventListener("click", function() {
    window.location.href =`${rootUrl}/recover-password`
})

const mobileForgotPasswordLabel = document.querySelector("#mobile-forgot-password-label");
mobileForgotPasswordLabel.addEventListener("mouseover", function() {
    mobileForgotPasswordLabel.style.color = "blue"
});
mobileForgotPasswordLabel.addEventListener("mouseout", function() {
    mobileForgotPasswordLabel.style.color = "grey"
});
mobileForgotPasswordLabel.addEventListener("click", function() {
    window.location.href =`${rootUrl}/recover-password`
})

async function renderRecoverPassword() {
    const smallSidebar = document.querySelector("#small-sidebar");
    const largeSidebar = document.querySelector("#large-sidebar");
    smallSidebar.style.display = "none";
    largeSidebar.style.display = "none";

    const recoverUserPasswordPhoneNumberElement = document.querySelector("#recover-password-phone-number-element")
    recoverUserPasswordPhoneNumberElement.addEventListener("keydown", disableNonNumericKeys)
    recoverUserPasswordPhoneNumberElement.addEventListener("blur", function() {
        formatPhoneNumberForData(recoverUserPasswordPhoneNumberElement)
    });
    recoverUserPasswordPhoneNumberElement.addEventListener("focus", function() {
        resetPhoneNumberFormatOnFocus(recoverUserPasswordPhoneNumberElement)
    });
    recoverUserPasswordPhoneNumberElement.addEventListener("paste", function(event) {
        // event.preventDefault()
        const clipboard = event.clipboardData;
        const pastedText = clipboard.getData("Text")
        // let pastedText = (event.clipboardData || window.clipboardData).getData('text');
        pastedText.replace(/[^0-9]/g, '')
        event.target.value = pastedText;
        // removeNonNumericCharacters(pastedText)
    }, false);
    recoverUserPasswordPhoneNumberElement.addEventListener("input", function() {
        resetPhoneNumberFormatOnFocus(recoverUserPasswordPhoneNumberElement)
    });

    const navigateToLoginFromRecoverPasswordButton = document.querySelector("#navigate-to-login-view-from-recover-password-button");
    navigateToLoginFromRecoverPasswordButton.addEventListener("click", function() {
        window.location.href = `${rootUrl}/login`;
    });

    const recoverPasswordSendButton = document.querySelector("#recover-password-send-button");
    recoverPasswordSendButton.addEventListener("click", async function(event) {
        event.preventDefault()
        recoverUserAccount()
    })
}

async function renderMobileRecoverPassword() {
    const smallSidebar = document.querySelector("#small-sidebar");
    const largeSidebar = document.querySelector("#large-sidebar");
    smallSidebar.style.display = "none";
    largeSidebar.style.display = "none";

    const recoverUserPasswordPhoneNumberElement = document.querySelector("#mobile-recover-password-phone-number-element")
    recoverUserPasswordPhoneNumberElement.addEventListener("keydown", disableNonNumericKeys)
    recoverUserPasswordPhoneNumberElement.addEventListener("blur", function() {
        formatPhoneNumberForData(recoverUserPasswordPhoneNumberElement)
    });
    recoverUserPasswordPhoneNumberElement.addEventListener("focus", function() {
        resetPhoneNumberFormatOnFocus(recoverUserPasswordPhoneNumberElement)
    });

    const navigateToLoginFromRecoverPasswordButton = document.querySelector("#mobile-navigate-to-login-view-from-recover-password-button");
    navigateToLoginFromRecoverPasswordButton.addEventListener("click", function(event) {
        event.preventDefault()
        window.location.href = `${rootUrl}/login`;
    });

    const recoverPasswordSendButton = document.querySelector("#mobile-recover-password-send-button");
    recoverPasswordSendButton.addEventListener("click", async function(event) {
        event.preventDefault()
        mobileRecoverUserAccount()
    })
}

async function handleRecoverPasswordInput() {
    const allUsers = await getAllUsers();
    const emailElement = document.querySelector("#recover-password-email-address-element")
    const email = emailElement.value;

    const generatedPassword = await generateRandomPassword(12);

    let matchingUser;
    for (let i = 0; i < allUsers.length; i++) {
        if (allUsers[i].emailaddress === email) {
            matchingUser = allUsers[i];
        }
    }

    console.log(allUsers)

    const matchingUserObject = {
       userId: matchingUser.user_id,
       sessionId: matchingUser.session_id,
       firstname: matchingUser.firstname,
       lastname: matchingUser.lastname,
       emailaddress: matchingUser.emailaddress,
       phonenumber: matchingUser.phonenumber,
       password: generatedPassword,
       userImage: matchingUser.user_image, 
    }

    const newUserPasswordElement = document.querySelector("#new-user-password");
        newUserPasswordElement.style.visibility = "visible";
        newUserPasswordElement.value = matchingUserObject.password;

    return matchingUserObject
}

async function mobileHandleRecoverPasswordInput() {
    const allUsers = await getAllUsers();
    const emailElement = document.querySelector("#mobile-recover-password-email-address-element")
    const email = emailElement.value;

    const generatedPassword = await generateRandomPassword(12);

    let matchingUser;
    for (let i = 0; i < allUsers.length; i++) {
        if (allUsers[i].emailaddress === email) {
            matchingUser = allUsers[i];
        }
    }

    console.log(allUsers)

    const matchingUserObject = {
       sessionId: matchingUser.session_id,
       userId: matchingUser.user_id,
       firstname: matchingUser.firstname,
       lastname: matchingUser.lastname,
       emailaddress: matchingUser.emailaddress,
       phonenumber: matchingUser.phonenumber,
       password: generatedPassword,
       userImage: matchingUser.user_image, 
    }

    const newUserPasswordElement = document.querySelector("#mobile-new-user-password");
        newUserPasswordElement.style.visibility = "visible";
        newUserPasswordElement.value = matchingUserObject.password;

    return matchingUserObject
}

async function generateRandomPassword(length) {
    const lowercaseChars = "abcdefghijklmnopqrstuvwxyz";
    const uppercaseChars = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
    const numberChars = "0123456789";
    const symbolChars = "!@#$%^&*()_+=-`~[]\{}|;':\",./<>?";
    const allChars = lowercaseChars + uppercaseChars + numberChars + symbolChars;
    let password = "";
    for (let i = 0; i < length; i++) {
      const randomIndex = Math.floor(Math.random() * allChars.length);
      password += allChars.charAt(randomIndex);
    }

    return password;
};

async function sendPasswordRecoveryEmail() {
    const allUsers = await getAllUsers();
    const sessionId = sessionStorage.getItem("user");
    let matchingUser;
    for (let i = 0; i < allUsers.length; i++) {
        if (allUsers[i].session_id === sessionId) {
            matchingUser = allUsers[i]
        }
    }
    const userId = matchingUser.user_id;
    const user = await getUser(userId);
    const recipient = user.emailaddress;

    console.log(recipient)
};

const mobileListMenuIcon = document.querySelector("#mobile-list-menu-icon");
const mobileCloseMenuIcon = document.querySelector("#mobile-close-list-menu-icon")
const mobileListMenuElement = document.querySelector("#mobile-menu");
mobileListMenuIcon.addEventListener("click", function() {
    mobileListMenuIcon.style.display = "none";
    mobileCloseMenuIcon.style.display = "block"
    mobileListMenuElement.style.display = "flex";
});

async function navigateUserFromMobileMenuList() {
const allUsers = await getAllUsers();
    const sessionId = sessionStorage.getItem("user");
    let matchingUser;
    for (let i = 0; i < allUsers.length; i++) {
        if (allUsers[i].session_id === sessionId) {
            matchingUser = allUsers[i]
        }
    }
    const userId = matchingUser.user_id;
    const user = await getUser(userId)
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
        const myURL = `${rootUrl}/user`
        const myData = {
            user_id: user.user_id,
            name: `${user.firstname} ${user.lastname}`,
        };
            
        let newURL = saveDataToURL(myURL, myData);

        if (newURL.charAt(newURL.length - 1) === '+') {
            console.log(newURL)
            let editedurl = newURL.slice(0, -1)
            newURL = editedurl
        }
        window.location.href = newURL
    };

mobileCloseMenuIcon.addEventListener("click", function() {
    mobileListMenuIcon.style.display = "block";
    mobileCloseMenuIcon.style.display = "none";
    mobileListMenuElement.style.display = "none";
})

const mobileAccountMenuItem = document.querySelector("#mobile-account-menu-item");
mobileAccountMenuItem.addEventListener("click", function() {
    mobileAccountMenuItem.style.backgroundColor = "lightgrey";
    mobileAccountMenuItem.style.color = "white";
    navigateUserFromMobileMenuList()
});
// mobileAccountMenuItem.addEventListener("mouseout", function() {
//     mobileAccountMenuItem.style.backgroundColor = "none";
//     mobileAccountMenuItem.style.color = "black";
// })
const mobileContactsListMenuItem = document.querySelector("#mobile-contacts-list-menu-item");
mobileContactsListMenuItem.addEventListener("click", function() {
    mobileContactsListMenuItem.style.backgroundColor = "lightgrey";
    mobileContactsListMenuItem.style.color = "white";
    window.location.href = `${rootUrl}/contacts`;
});
const mobileFavoritesListMenuItem = document.querySelector("#mobile-favorites-list-menu-item");
mobileFavoritesListMenuItem.addEventListener("click", function() {
    mobileFavoritesListMenuItem.style.backgroundColor = "lightgrey";
    mobileFavoritesListMenuItem.style.color = "white";
    window.location.href = `${rootUrl}/favorite_contacts`;
});
// const mobileSearchContactsMenuItem = document.querySelector("#mobile-search-contacts-menu-item");
// mobileSearchContactsMenuItem.addEventListener("click", function() {
//     mobileSearchContactsMenuItem.style.backgroundColor = "lightgrey";
//     mobileSearchContactsMenuItem.style.color = "white";
//     window.location.href = `${rootUrl}/search-contacts`
// });
const mobileNewContactMenuItem = document.querySelector("#mobile-new-contact-menu-item");
mobileNewContactMenuItem.addEventListener("click", function() {
    mobileNewContactMenuItem.style.backgroundColor = "lightgrey";
    mobileNewContactMenuItem.style.color = "white";
    window.location.href = `${rootUrl}/new_contact`
});

const navigateUserPageIcon = document.querySelector("#navigate-user-page-icon");
navigateUserPageIcon.addEventListener("click", navigateUserPageFromSidePanel)
async function navigateUserPageFromSidePanel() {
const allUsers = await getAllUsers();
    const sessionId = sessionStorage.getItem("user");
    let matchingUser;
    for (let i = 0; i < allUsers.length; i++) {
        if (allUsers[i].session_id === sessionId) {
            matchingUser = allUsers[i]
        }
    }
    const userId = matchingUser.user_id;
    const user = await getUser(userId)
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
        const myURL = `${rootUrl}/user`
        const myData = {
            user_id: user.user_id,
            name: `${user.firstname} ${user.lastname}`,
        };
            
        let newURL = saveDataToURL(myURL, myData);

        if (newURL.charAt(newURL.length - 1) === '+') {
            console.log(newURL)
            let editedurl = newURL.slice(0, -1)
            newURL = editedurl
        }
        window.location.href = newURL
    };
    const navigateContactsListPageIcon = document.querySelector("#navigate-contacts-list-page-icon");
    navigateContactsListPageIcon.addEventListener("click", function() {
        window.location.href = `${rootUrl}/contacts`
    })
    const navigateFavoritesListPageIcon = document.querySelector("#navigate-favorites-list-page-icon");
    navigateFavoritesListPageIcon.addEventListener("click", function() {
        window.location.href = `${rootUrl}/favorite_contacts`
    })
    const navigateGroupsListPageIcon = document.querySelector("#navigate-groups-list-page-icon");
    navigateGroupsListPageIcon.addEventListener("click", function() {
        window.location.href = `${rootUrl}/groups`
    })
    const navigateNewContactPageIcon = document.querySelector("#navigate-add-contacts-page-icon");
    navigateNewContactPageIcon.addEventListener("click", function() {
        window.location.href = `${rootUrl}/new_contact`
    })

const mobileNavigateSearchContactsIcon = document.querySelector("#mobile-search-icon");
mobileNavigateSearchContactsIcon.addEventListener("click", function() {
    window.location.href = `${rootUrl}/search-contacts`
})
const mobileNavigateUserPageIcon = document.querySelector("#mobile-navigate-user-page-icon");
mobileNavigateUserPageIcon.addEventListener("click", navigateUserPageFromFooterPanel)
async function navigateUserPageFromFooterPanel() {
const allUsers = await getAllUsers();
    const sessionId = sessionStorage.getItem("user");
    let matchingUser;
    for (let i = 0; i < allUsers.length; i++) {
        if (allUsers[i].session_id === sessionId) {
            matchingUser = allUsers[i]
        }
    }
    const userId = matchingUser.user_id;
    const user = await getUser(userId)
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
        const myURL = `${rootUrl}/user`
        const myData = {
            user_id: user.user_id,
            name: `${user.firstname} ${user.lastname}`,
        };
            
        let newURL = saveDataToURL(myURL, myData);

        if (newURL.charAt(newURL.length - 1) === '+') {
            console.log(newURL)
            let editedurl = newURL.slice(0, -1)
            newURL = editedurl
        }
        window.location.href = newURL
    };
    const mobileNavigateContactsListPageIcon = document.querySelector("#mobile-navigate-contacts-list-page-icon");
    mobileNavigateContactsListPageIcon.addEventListener("click", function() {
        window.location.href = `${rootUrl}/contacts`
    })
    const mobileNavigateFavoritesListPageIcon = document.querySelector("#mobile-navigate-favorites-list-page-icon");
    mobileNavigateFavoritesListPageIcon.addEventListener("click", function() {
        window.location.href = `${rootUrl}/favorite_contacts`
    })
    const mobileNavigateNewContactPageIcon = document.querySelector("#mobile-navigate-add-contacts-page-icon");
    mobileNavigateNewContactPageIcon.addEventListener("click", function() {
        window.location.href = `${rootUrl}/new_contact`
    })

async function renderSmallSidePanelContent() {
const allUsers = await getAllUsers();
    const sessionId = sessionStorage.getItem("user");
    let matchingUser;
    for (let i = 0; i < allUsers.length; i++) {
        if (allUsers[i].session_id === sessionId) {
            matchingUser = allUsers[i]
        }
    }

    console.log(matchingUser)
    const userId = matchingUser.user_id;
    const user = await getUser(userId);

    const navigateUserPageIcon = document.querySelector("#navigate-user-page-icon");
    if (user.user_image !== null && user.user_image !== './images/user-5-svgrepo-com.svg') {
        navigateUserPageIcon.setAttribute("src", user.user_image)
    }

    // console.log(navigateUserPageIcon.parentElement)
    const navigateUserPageIconParentElement = navigateUserPageIcon.parentElement;
    navigateUserPageIconParentElement.style.borderRadius = "5px";
    navigateUserPageIconParentElement.addEventListener("mouseover", function() {
        navigateUserPageIconParentElement.style.backgroundColor = "#7393B3";
        navigateUserPageIconParentElement.children[1].style.color = "white"
    })
    navigateUserPageIconParentElement.addEventListener("mouseout", function() {
        navigateUserPageIconParentElement.style.backgroundColor = "";
        navigateUserPageIconParentElement.children[1].style.color = "black";
    })

    const navigateContactsListPageIconParentElement = navigateContactsListPageIcon.parentElement;
    navigateContactsListPageIconParentElement.style.borderRadius = "5px";
    navigateContactsListPageIconParentElement.addEventListener("mouseover", function() {
        navigateContactsListPageIconParentElement.style.backgroundColor = "#7393B3";
        navigateContactsListPageIconParentElement.children[1].style.color = "white";
    })
    navigateContactsListPageIconParentElement.addEventListener("mouseout", function() {
        navigateContactsListPageIconParentElement.style.backgroundColor = "";
        navigateContactsListPageIconParentElement.children[1].style.color = "black";
    })

    const navigateFavoritesListIconParentElement = navigateFavoritesListPageIcon.parentElement;
    navigateFavoritesListIconParentElement.style.borderRadius = "5px";
    navigateFavoritesListIconParentElement.addEventListener("mouseover", function() {
        navigateFavoritesListIconParentElement.style.backgroundColor = "#7393B3";
        navigateFavoritesListIconParentElement.children[1].style.color = "white"
    })
    navigateFavoritesListIconParentElement.addEventListener("mouseout", function() {
        navigateFavoritesListIconParentElement.style.backgroundColor = "";
        navigateFavoritesListIconParentElement.children[1].style.color = "black"
    })

    const navigateGroupsListIconParentElement = navigateGroupsListPageIcon.parentElement;
    navigateGroupsListIconParentElement.style.borderRadius = "5px";
    navigateGroupsListIconParentElement.addEventListener("mouseover", function() {
        navigateGroupsListIconParentElement.style.backgroundColor = "#7393B3";
        navigateGroupsListIconParentElement.children[1].style.color = "white"
    })
    navigateGroupsListIconParentElement.addEventListener("mouseout", function() {
        navigateGroupsListIconParentElement.style.backgroundColor = "";
        navigateGroupsListIconParentElement.children[1].style.color = "black"
    })

    const navigateNewContactPageIconParentElement = navigateNewContactPageIcon.parentElement;
    navigateNewContactPageIconParentElement.style.borderRadius = "5px";
    navigateNewContactPageIconParentElement.addEventListener("mouseover", function() {
        navigateNewContactPageIconParentElement.style.backgroundColor = "#7393B3";
        navigateNewContactPageIconParentElement.children[1].style.color = "white";
    })
    navigateNewContactPageIconParentElement.addEventListener("mouseout", function() {
        navigateNewContactPageIconParentElement.style.backgroundColor = "";
        navigateNewContactPageIconParentElement.children[1].style.color = "black";
    });

    const logoutIcon = document.querySelector("#logout-icon");
    const logoutIconParentElement = logoutIcon.parentElement;
    logoutIconParentElement.style.borderRadius = "5px";
    logoutIconParentElement.addEventListener("mouseover", function() {
        logoutIconParentElement.style.backgroundColor = "#7393B3";
        logoutIconParentElement.children[1].style.color = "white";
    })
    logoutIconParentElement.addEventListener("mouseout", function() {
        logoutIconParentElement.style.backgroundColor = "";
        logoutIconParentElement.children[1].style.color = "black";
    });
};

async function renderLargeSidePanelContent() {
const allUsers = await getAllUsers();
    const sessionId = sessionStorage.getItem("user");
    let matchingUser;
    for (let i = 0; i < allUsers.length; i++) {
        if (allUsers[i].session_id === sessionId) {
            matchingUser = allUsers[i]
        }
    }
    const userId = matchingUser.user_id;
    const userContacts = await getUserContacts(userId);

    requestAnimationFrame(() => {
        const contactsListContainer = document.querySelector("#sidebar-contacts-list-container");
        const searchContactsElementContainer = document.querySelector("#search-contacts-elements-container")
        const searchContactsElementContainerHeight = searchContactsElementContainer.clientHeight;
        console.log(searchContactsElementContainer.clientHeight)
        const computedStyle = window.getComputedStyle(searchContactsElementContainer);
        const heightInPx = computedStyle.height
        console.log(heightInPx)

         const screenHeight = window.innerHeight;
         console.log(screenHeight)

         const elementHeight = screenHeight * 0.093;
         const roundedElementHeightStr = elementHeight.toString() + "px"
         console.log(elementHeight.toString())
        
        const contactsListContainerMarginTop = searchContactsElementContainerHeight + 10;
        const contactsListContainerMarginTopStr = contactsListContainerMarginTop.toString() + "px"

        contactsListContainer.style.marginTop = roundedElementHeightStr
    });

    const contactsListElement = document.querySelector("#sidebar-contacts-list");

      userContacts.sort(function(a, b) {
        if (a.firstname < b.firstname) {
            return -1;
        }
        if (a.firstname < b.firstname) {
            return 1;
        }

        var aFirstChar = a.firstname.charAt(0);
        var bFirstChar = b.firstname.charAt(0);
        if (aFirstChar > bFirstChar) {
          return 1;
        } else if (aFirstChar < bFirstChar) {
          return -1;
        } else {
          var aLastChar = a.lastname.charAt(0);
          var bLastChar = b.lastname.charAt(0);
          if (aLastChar === "") {
            aLastChar = "z"
          }
          if (bLastChar === "") {
            bLastChar = "z"
          }
          if (aLastChar > bLastChar) {
            return 1;
          } else if (aLastChar < bLastChar) {
            return -1;
          } else {
            return 0;
          }    
        }
      });

    userContacts.forEach(contact => {
        const contactListItem = document.createElement("div");
        contactListItem.style.display = "flex"
        contactListItem.style.justifyContent = "space-between"
        contactListItem.style.alignItems = "center"
        contactListItem.style.height = "38px"
        // contactListItem.style.width = "295px"
        contactListItem.style.marginBottom = "4px"
        contactListItem.style.border = "1px solid grey"
        contactListItem.style.borderRadius = "5px"
        contactListItem.style.padding = "5px"
        contactListItem.style.backgroundColor = "ghostwhite"
        contactListItem.style.overflow = "hidden"
        contactListItem.style.border = "2px solid black";
        contactListItem.style.boxShadow = "1px 1px 1px";
        contactListItem.addEventListener("mouseover", function() {
            contactListItem.style.backgroundColor = "lightgreen";
        });
        // contactListItem.addEventListener("mouseover", function() {
        //     contactListItem.style.backgroundColor = "powderblue";
        // });
        contactListItem.addEventListener("mouseout", function() {
            contactListItem.style.backgroundColor = "ghostwhite";
        })
        const contactImageItem = document.createElement("img");
        contactImageItem.style.width = "35px";
        // contactImageItem.style.height = "100%";
        contactImageItem.style.border = "0.5px solid black";
        contactImageItem.style.borderRadius = "50%";
        contactImageItem.style.backgroundColor = "gainsboro";
        contactImageItem.style.objectFit = "cover";
        contactImageItem.setAttribute("src", contact.contact_image);
        const contactListItemNameContainer = document.createElement("div");
        contactListItemNameContainer.style.display = "flex";
        contactListItemNameContainer.style.height = "100%"
        const contactFavoriteIconContainer = document.createElement("div");
        const contactFavoriteIcon = document.createElement("img");
        contactFavoriteIcon.setAttribute("src", "./images/star-gold-svgrepo-com.svg");
        contactFavoriteIcon.style.width = "25px";
        // contactFavoriteIcon.style.display = "none";
        if (contact.favorite !== true) {
            contactFavoriteIcon.style.visibility = "hidden"
        }
        const contactListItemNameElementContainer = document.createElement("div");
        contactListItemNameElementContainer.style.display = "flex";
        contactListItemNameElementContainer.style.flexDirection = "column";
        const contactNameElement = document.createElement("p");
        // contactNameElement.style.fontFamily = "sans-serif";
        contactNameElement.style.fontSize = "small"
        contactNameElement.style.margin = "0px 0px 0px 10px"
        contactNameElement.innerHTML = `${contact.firstname} ${contact.lastname}`
        const contactEmailElement = document.createElement("p");
        // contactEmailElement.style.width = "220px";
        contactEmailElement.setAttribute("id", `contact-email-element-${contact.contact_id}`)
        contactEmailElement.classList.add("contact-email-element")
        // contactEmailElement.style.fontFamily = "sans-serif"
        contactEmailElement.style.fontSize = "small"
        contactEmailElement.style.margin = "0px 0px 0px 10px";
        contactEmailElement.innerHTML = contact.emailaddress
        const contactOrganizationAndRoleElement = document.createElement("p");
        contactOrganizationAndRoleElement.style.fontSize = "0px"
        contactOrganizationAndRoleElement.style.margin = "0px"
        contactOrganizationAndRoleElement.innerHTML = `${contact.organization} || ${contact.organization_role}`

        const contactFullNameText = `${contact.firstname} ${contact.lastname}`
        const ellipsis = "..."
        let contactFullNameTextSlice = contactFullNameText.slice(0, 23) + ellipsis
        // console.log(contactEmailAddressText.length)
        if (contactFullNameText.length > 23) {
            contactNameElement.innerHTML = contactFullNameTextSlice
        } else {
            contactNameElement.innerHTML = `${contact.firstname} ${contact.lastname}`
        }

        const contactNameElementWidth = contactNameElement.clientWidth;
        console.log(contactNameElementWidth)

    requestAnimationFrame(() => {
        // const screenWidth = window.innerWidth;
        // const screenHeight = window.innerHeight;
        // const contactNameElHeightPercent = (16 / screenHeight) * 100;
        // const contactNameElHeightPercentRounded = Number(contactNameElHeightPercent.toFixed(2))
        // const contactNameElementHeight = contactNameElement.clientHeight
        
        // // console.log(Number(contactNameElHeightPercent.toFixed(2)))
        
        // const contactFullNameText = `${contact.firstname} ${contact.lastname}`
        // const ellipsis = "..."
        // let contactFullNameTextSlice = contactFullNameText.slice(0, 33) + ellipsis
        
        // console.log(contactNameElement.clientHeight)
        // if (contactNameElHeightPercentRounded > 2.53) {
        //     contactNameElement.innerHTML = contactFullNameTextSlice     
        // } else {
        //     contactNameElement.innerHTML = `${contact.firstname} ${contact.lastname}`     
        // }
        const contactNameElementWidth = contactNameElement.clientWidth;
        console.log(contactNameElementWidth)
    });

        const contactEmailAddressText = contact.emailaddress;
        // const ellipsis = "..."
        let contactEmailAddressTextSlice = contactEmailAddressText.slice(0, 35) + ellipsis
        // console.log(contactEmailAddressText.length)
        if (contactEmailAddressText.length > 35) {
            contactEmailElement.innerHTML = contactEmailAddressTextSlice
        } else {
            contactEmailElement.innerHTML = contact.emailaddress
        }

        if (contact.organization !== null && contact.organization !== "" && contact.organization_role !== null && contact.organization_role !== "") {
            contactOrganizationAndRoleElement.innerHTML = `${contact.organization} || ${contact.organization_role}`
        } else if (contact.organization !== null && contact.organization !== "" || contact.organization_role === null && contact.organization_role === "") {
            contactOrganizationAndRoleElement.innerHTML = `${contact.organization}`
        } else if (contact.organization === null && contact.organization === "" || contact.organization_role !== null && contact.organization_role !== "") {
            contactOrganizationAndRoleElement.innerHTML = `${contact.organization_role}`
        } else {
            contactOrganizationAndRoleElement.innerHTML = "text"
            contactOrganizationAndRoleElement.style.visibility = "hidden"
        }

        contactListItem.classList.add("contact-list-item");
        contactListItem.style.cursor = "default"
        // contactListItem.style.height = "200px"
        const contactId = contact.contact_id.toString();
        contactListItem.setAttribute("id", `${contactId}`)
        contactListItem.setAttribute("data", `${rootUrl}/contact_${contactId}`);
        contactListItem.setAttribute("name", `${contact.firstname} ${contact.lastname}`)

        contactListItemNameContainer.appendChild(contactImageItem)
        contactListItemNameElementContainer.appendChild(contactNameElement)
        contactListItemNameElementContainer.appendChild(contactEmailElement)
        contactFavoriteIconContainer.appendChild(contactFavoriteIcon)
        // contactListItemNameContainer.appendChild(contactOrganizationAndRoleElement)
        contactListItemNameContainer.appendChild(contactImageItem);
        contactListItemNameContainer.appendChild(contactListItemNameElementContainer)
        // contactListItem.appendChild(contactListItemImageContainer);
        // contactListItem.appendChild(contactListItemNameContainer);
        contactListItem.appendChild(contactListItemNameContainer)
        contactListItem.appendChild(contactFavoriteIconContainer)
        contactListItem.appendChild(contactFavoriteIcon)
        contactsListElement.appendChild(contactListItem)
    });

    const contactListItems = Array.from(contactsListElement.children);
    contactListItems.forEach(element => {
        element.addEventListener("click", (event) => {
            if (window.location.href === element.getAttribute("data")) {
                event.preventDefault()
            } else {
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
                console.log(element)
                
                const myURL = element.getAttribute("data");
                console.log(myURL)

                const str = element.children[1].innerText;
                let char = "%";
                let index = str.indexOf(char)

                if (index !== -1) {
                    str = str.split(char)[0]
                }

                const myData = {
                    name: element.getAttribute("name"),
                    // age: 30,
                    // city: "New York"
                };
                
                let newURL = saveDataToURL(myURL, myData);

                if (newURL.charAt(newURL.length - 1) === '+') {
                    console.log(newURL)
                    let editedurl = newURL.slice(0, -1)
                    newURL = editedurl
                }
               
                // Expected output: "https://example.com/page?name=John+Doe&age=30&city=New+York"
                window.location.href = newURL
            }
        });
    });
  
const searchContactsElement = document.querySelector("#search-contacts-input");
searchContactsElement.addEventListener("input", contactsAutocompleteSearch)
async function contactsAutocompleteSearch() {
    const contactsList = document.querySelector("#sidebar-contacts-list");
    let searchContactsInputValue = searchContactsElement.value.toLowerCase().trimEnd();
    let filteredContacts = [];

    userContacts.filter(function(contact) {
        let contactFirstName = contact.firstname;
        let contactLastName = contact.lastname;
        let contactName = `${contact.firstname} ${contact.lastname}`

        console.log(searchContactsInputValue.length)

        if (searchContactsInputValue === "") {
            for (let i = 0; i < userContacts.length; i++) {
                filteredContacts.push(userContacts[i])
            }
        }

        // if (contactFirstName.toLowerCase().startsWith(searchContactsInputValue)) {
        //     for (let i = 0; i < userContacts.length; i++) {
        //         let matchContactName = `${userContacts[i].firstname} ${userContacts[i].lastname}`
        //         if (contactName.toLowerCase() === matchContactName.toLowerCase()) {
        //             filteredContacts.push(userContacts[i])
        //             // console.log(filteredContacts)
        //         }
        //     }
        // }

        // if (contactLastName.toLowerCase().startsWith(searchContactsInputValue)) {
        //     for (let i = 0; i < userContacts.length; i++) {
        //         let matchContactName = `${userContacts[i].firstname} ${userContacts[i].lastname}`
        //         if (contactName.toLowerCase() === matchContactName.toLowerCase()) {
        //             filteredContacts.push(userContacts[i])
        //             // console.log(filteredContacts)
        //         }
        //     }
        // }

        if (contactName.toLowerCase().startsWith(searchContactsInputValue)) {
            for (let i = 0; i < userContacts.length; i++) {
                let matchContactName = `${userContacts[i].firstname} ${userContacts[i].lastname}`
                if (contactName.toLowerCase() === matchContactName.toLowerCase()) {
                    filteredContacts.push(userContacts[i])
                    // console.log(filteredContacts)
                }
            }
        }
    });

    const searchContactsAutocompleteList = document.querySelector("#autocomplete-contacts-list");

    searchContactsAutocompleteList.innerHTML = '';

    // searchContactsElement.addEventListener('input', function() {
    //     if (this.value === '') {
    //       // Input is cleared, perform your desired action
    //       window.location.reload()
    //       // Example: Reset search results
    //       // resetSearchResults();
    //     }
    //   });

      function removeDuplicates(arr) {
        return arr.reduce((unique, item) => {
          if (!unique.includes(item)) {
            unique.push(item);
          }
          return unique;
        }, []);
      }
      
      const originalArray = [1, 2, 2, 3, 4, 4, 5];
      const uniqueArray = removeDuplicates(filteredContacts);
      console.log(uniqueArray); // Output: [1, 2, 3, 4, 5]

    // if (filteredContacts.length > 0) {
        searchContactsAutocompleteList.style.display = 'block';
        contactsList.style.display = "none"
        uniqueArray.forEach(contact => {
            const contactsAutoCompleteListItem = document.createElement('div');
            contactsAutoCompleteListItem.style.display = "flex";
            contactsAutoCompleteListItem.style.justifyContent = "space-between";
            contactsAutoCompleteListItem.style.alignItems = "center";
            contactsAutoCompleteListItem.style.height = "35px";
            // contactsAutoCompleteListItem.style.width = "295px";
            contactsAutoCompleteListItem.style.border = "1px solid grey";
            contactsAutoCompleteListItem.style.borderRadius = "5px"
            contactsAutoCompleteListItem.style.marginBottom = "4px";
            contactsAutoCompleteListItem.style.padding = "5px";
            contactsAutoCompleteListItem.style.backgroundColor = "ghostwhite";
            contactsAutoCompleteListItem.style.overflow = "hidden";
            contactsAutoCompleteListItem.style.border = "2px solid black";
            contactsAutoCompleteListItem.style.boxShadow = "1px 1px 1px";
            contactsAutoCompleteListItem.addEventListener("mouseover", function() {
            contactsAutoCompleteListItem.style.backgroundColor = "lightgreen";
            });
            // contactsAutoCompleteListItem.addEventListener("mouseover", function() {
            // contactsAutoCompleteListItem.style.backgroundColor = "lightgray";
            // });
            contactsAutoCompleteListItem.addEventListener("mouseout", function() {
            contactsAutoCompleteListItem.style.backgroundColor = "ghostwhite";
            })
            const contactAutoCompleteImage = document.createElement("img");
            contactAutoCompleteImage.style.width = "35px";
            contactAutoCompleteImage.style.height = "100%";
            contactAutoCompleteImage.style.border = "0.5px solid black";
            contactAutoCompleteImage.style.borderRadius = "50%";
            contactAutoCompleteImage.style.backgroundColor = "gainsboro";
            contactAutoCompleteImage.style.objectFit = "cover";
            contactAutoCompleteImage.setAttribute("src", contact.contact_image);
            const contactListItemAutocompleteNameContainer = document.createElement("div");
            contactListItemAutocompleteNameContainer.style.display = "flex";
            contactListItemAutocompleteNameContainer.style.height = "100%"
            const contactAutocompleteFavoriteContainer = document.createElement("div");
            const contactAutocompleteFavoriteIcon = document.createElement("img");
            contactAutocompleteFavoriteIcon.setAttribute("src", "./images/star-gold-svgrepo-com.svg");
            contactAutocompleteFavoriteIcon.style.width = "25px";
            // contactAutocompleteFavoriteIcon.style.display = "none";
            if (contact.favorite !== true) {
                contactAutocompleteFavoriteIcon.style.visibility = "hidden"
            }
            const contactListItemAutocompleteNameElementContainer = document.createElement("div");
            contactListItemAutocompleteNameElementContainer.style.display = "flex";
            contactListItemAutocompleteNameElementContainer.style.flexDirection = "column";
            const contactAutoCompleteNameElement = document.createElement("p");
            // contactAutoCompleteNameElement.style.fontFamily = "sans-serif";
            contactAutoCompleteNameElement.style.fontSize = "small"
            contactAutoCompleteNameElement.style.margin = "0px 0px 0px 10px"
            contactAutoCompleteNameElement.innerHTML = `${contact.firstname} ${contact.lastname}`
            const contactAutoCompleteEmailElement = document.createElement("p");
            // contactAutoCompleteEmailElement.style.fontFamily = "sans-serif"
            contactAutoCompleteEmailElement.style.fontSize = "small"
            contactAutoCompleteEmailElement.style.margin = "0px 0px 0px 10px";
            contactAutoCompleteEmailElement.innerHTML = contact.emailaddress
        
        const contactFullNameText = `${contact.firstname} ${contact.lastname}`
        const ellipsis = "..."
        let contactFullNameTextSlice = contactFullNameText.slice(0, 23) + ellipsis
        // console.log(contactEmailAddressText.length)
        if (contactFullNameText.length > 23) {
            contactAutoCompleteNameElement.innerHTML = contactFullNameTextSlice
        } else {
            contactAutoCompleteNameElement.innerHTML = `${contact.firstname} ${contact.lastname}`
        }

            
        const contactEmailAddressText = contact.emailaddress;
        // const ellipsis = "..."
        let contactEmailAddressTextSlice = contactEmailAddressText.slice(0, 35) + ellipsis
        console.log(contactEmailAddressText.length)
        if (contactEmailAddressText.length > 35) {
            contactAutoCompleteEmailElement.innerHTML = contactEmailAddressTextSlice
        } else {
            contactAutoCompleteEmailElement.innerHTML = contact.emailaddress
        }

            contactsAutoCompleteListItem.classList.add("contact-list-item");
            contactsAutoCompleteListItem.style.cursor = "default"
            // contactsAutoCompleteListItem.style.height = "200px"
            const contactId = contact.contact_id.toString();
            contactsAutoCompleteListItem.setAttribute("id", `${contactId}`)
            contactsAutoCompleteListItem.setAttribute("data", `${rootUrl}/contact_${contactId}`);
            contactsAutoCompleteListItem.setAttribute("name", `${contact.firstname} ${contact.lastname}`)

            contactsAutoCompleteListItem.addEventListener("click", function(event) {
                if (window.location.href === contactsAutoCompleteListItem.getAttribute("data")) {
                    event.preventDefault()
                } else {
                    window.location.href = contactsAutoCompleteListItem.getAttribute("data");
                }
            })

            contactListItemAutocompleteNameContainer.appendChild(contactAutoCompleteImage);
            contactListItemAutocompleteNameElementContainer.appendChild(contactAutoCompleteNameElement);
            contactListItemAutocompleteNameElementContainer.appendChild(contactAutoCompleteEmailElement);
            contactAutocompleteFavoriteContainer.appendChild(contactAutocompleteFavoriteIcon);
            contactListItemAutocompleteNameContainer.appendChild(contactAutoCompleteImage);
            contactListItemAutocompleteNameContainer.appendChild(contactListItemAutocompleteNameElementContainer);
            contactsAutoCompleteListItem.appendChild(contactListItemAutocompleteNameContainer);
            contactsAutoCompleteListItem.appendChild(contactAutocompleteFavoriteContainer)
            searchContactsAutocompleteList.appendChild(contactsAutoCompleteListItem);
        });
    // }
};
};

async function renderMobileContactsSearchContent() {
    const allUsers = await getAllUsers();
    const sessionId = sessionStorage.getItem("user");
    let matchingUser;
    for (let i = 0; i < allUsers.length; i++) {
        if (allUsers[i].session_id === sessionId) {
            matchingUser = allUsers[i]
        }
    }
    const userId = matchingUser.user_id;
    const userContacts = await getUserContacts(userId);

    console.log(userContacts)

    const contactsListElement = document.querySelector("#mobile-contacts-search-list");
    const mobileContactsSearchListContainer = document.createElement("div");
    mobileContactsSearchListContainer.setAttribute("id", "mobile-contacts-search-list-container")
    mobileContactsSearchListContainer.style.position = "absolute";
    mobileContactsSearchListContainer.style.width = "100%"
    mobileContactsSearchListContainer.style.top = "18%"
    const mobileContactsSearchListElement = document.createElement("ul");
    mobileContactsSearchListElement.style.position = "relative";
    mobileContactsSearchListElement.style.margin = "0px 0px 10px";
    mobileContactsSearchListElement.style.padding = "0px"
    const searchContactsAutocompleteList = document.createElement("ul");
    searchContactsAutocompleteList.setAttribute("id", "mobile-autocomplete-contacts-list")
    searchContactsAutocompleteList.style.position = "relative";
    searchContactsAutocompleteList.style.margin = "0px 0px 10px";
    searchContactsAutocompleteList.style.padding = "0px"

      userContacts.sort(function(a, b) {
        if (a.firstname < b.firstname) {
            return -1;
        }
        if (a.firstname < b.firstname) {
            return 1;
        }

        var aFirstChar = a.firstname.charAt(0);
        var bFirstChar = b.firstname.charAt(0);
        if (aFirstChar > bFirstChar) {
          return 1;
        } else if (aFirstChar < bFirstChar) {
          return -1;
        } else {
          var aLastChar = a.lastname.charAt(0);
          var bLastChar = b.lastname.charAt(0);
          if (aLastChar === "") {
            aLastChar = "z"
          }
          if (bLastChar === "") {
            bLastChar = "z"
          }
          if (aLastChar > bLastChar) {
            return 1;
          } else if (aLastChar < bLastChar) {
            return -1;
          } else {
            return 0;
          }    
        }
      });

    userContacts.forEach(contact => {
        const contactListItem = document.createElement("div");
        contactListItem.style.display = "flex"
        contactListItem.style.justifyContent = "space-between"
        contactListItem.style.alignItems = "center"
        contactListItem.style.height = "38px"
        // contactListItem.style.width = "295px"
        contactListItem.style.marginBottom = "2px"
        contactListItem.style.border = "1px solid grey"
        contactListItem.style.borderRadius = "5px"
        contactListItem.style.padding = "5px"
        contactListItem.style.backgroundColor = "ghostwhite"
        contactListItem.style.overflow = "hidden"
        contactListItem.addEventListener("mouseover", function() {
            contactListItem.style.backgroundColor = "lightgreen";
        });
        // contactListItem.addEventListener("mouseover", function() {
        //     contactListItem.style.backgroundColor = "powderblue";
        // });
        contactListItem.addEventListener("mouseout", function() {
            contactListItem.style.backgroundColor = "ghostwhite";
        })
        const contactImageItem = document.createElement("img");
        contactImageItem.style.width = "35px";
        // contactImageItem.style.height = "100%";
        contactImageItem.style.border = "0.5px solid grey";
        contactImageItem.style.borderRadius = "50%";
        contactImageItem.style.backgroundColor = "gainsboro";
        contactImageItem.style.objectFit = "cover";
        contactImageItem.setAttribute("src", contact.contact_image);
        const contactListItemNameContainer = document.createElement("div");
        contactListItemNameContainer.style.display = "flex";
        contactListItemNameContainer.style.height = "100%"
        const contactFavoriteIconContainer = document.createElement("div");
        const contactFavoriteIcon = document.createElement("img");
        contactFavoriteIcon.setAttribute("src", "./images/star-gold-svgrepo-com.svg");
        contactFavoriteIcon.style.width = "35px";
        if (contact.favorite !== true) {
            contactFavoriteIcon.style.visibility = "hidden"
        }
        const contactListItemNameElementContainer = document.createElement("div");
        contactListItemNameElementContainer.style.display = "flex";
        contactListItemNameElementContainer.style.flexDirection = "column";
        const contactNameElement = document.createElement("p");
        // contactNameElement.style.fontFamily = "sans-serif";
        contactNameElement.style.fontSize = "small"
        contactNameElement.style.margin = "0px 0px 0px 10px"
        contactNameElement.innerHTML = `${contact.firstname} ${contact.lastname}`
        const contactEmailElement = document.createElement("p");
        // contactEmailElement.style.width = "220px";
        contactEmailElement.setAttribute("id", `contact-email-element-${contact.contact_id}`)
        contactEmailElement.classList.add("contact-email-element")
        // contactEmailElement.style.fontFamily = "sans-serif"
        contactEmailElement.style.fontSize = "small"
        contactEmailElement.style.margin = "0px 0px 0px 10px";
        contactEmailElement.innerHTML = contact.emailaddress
        const contactOrganizationAndRoleElement = document.createElement("p");
        contactOrganizationAndRoleElement.style.fontSize = "0px"
        contactOrganizationAndRoleElement.style.margin = "0px"
        contactOrganizationAndRoleElement.innerHTML = `${contact.organization} || ${contact.organization_role}`

        const contactEmailAddressText = contact.emailaddress;
        const ellipsis = "..."
        let contactEmailAddressTextSlice = contactEmailAddressText.slice(0, 45) + ellipsis
        console.log(contactEmailAddressText.length)
        if (contactEmailAddressText.length > 45) {
            contactEmailElement.innerHTML = contactEmailAddressTextSlice
        } else {
            contactEmailElement.innerHTML = contact.emailaddress
        }

        if (contact.organization !== null && contact.organization !== "" && contact.organization_role !== null && contact.organization_role !== "") {
            contactOrganizationAndRoleElement.innerHTML = `${contact.organization} || ${contact.organization_role}`
        } else if (contact.organization !== null && contact.organization !== "" || contact.organization_role === null && contact.organization_role === "") {
            contactOrganizationAndRoleElement.innerHTML = `${contact.organization}`
        } else if (contact.organization === null && contact.organization === "" || contact.organization_role !== null && contact.organization_role !== "") {
            contactOrganizationAndRoleElement.innerHTML = `${contact.organization_role}`
        } else {
            contactOrganizationAndRoleElement.innerHTML = "text"
            contactOrganizationAndRoleElement.style.visibility = "hidden"
        }

        contactListItem.classList.add("contact-list-item");
        contactListItem.style.cursor = "default"
        // contactListItem.style.height = "200px"
        const contactId = contact.contact_id.toString();
        contactListItem.setAttribute("id", `${contactId}`)
        contactListItem.setAttribute("data", `${rootUrl}/contact_${contactId}`);
        contactListItem.setAttribute("name", `${contact.firstname} ${contact.lastname}`)

        contactListItemNameContainer.appendChild(contactImageItem)
        contactListItemNameElementContainer.appendChild(contactNameElement)
        contactListItemNameElementContainer.appendChild(contactEmailElement)
        contactFavoriteIconContainer.appendChild(contactFavoriteIcon)
        // contactListItemNameContainer.appendChild(contactOrganizationAndRoleElement)
        contactListItemNameContainer.appendChild(contactImageItem);
        contactListItemNameContainer.appendChild(contactListItemNameElementContainer)
        // contactListItem.appendChild(contactListItemImageContainer);
        // contactListItem.appendChild(contactListItemNameContainer);
        contactListItem.appendChild(contactListItemNameContainer)
        contactListItem.appendChild(contactFavoriteIconContainer)
        // contactListItem.appendChild(contactFavoriteIcon)
        mobileContactsSearchListElement.appendChild(contactListItem)
        mobileContactsSearchListContainer.appendChild(mobileContactsSearchListElement)
        document.body.appendChild(mobileContactsSearchListContainer)
    });

    const contactListItems = Array.from(mobileContactsSearchListElement.children);
    contactListItems.forEach(element => {
        element.addEventListener("click", (event) => {
            if (window.location.href === element.getAttribute("data")) {
                event.preventDefault()
            } else {
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
                console.log(element)
                
                const myURL = element.getAttribute("data");
                console.log(myURL)

                const str = element.children[1].innerText;
                let char = "%";
                let index = str.indexOf(char)

                if (index !== -1) {
                    str = str.split(char)[0]
                }

                const myData = {
                    name: element.getAttribute("name"),
                    // age: 30,
                    // city: "New York"
                };
                
                let newURL = saveDataToURL(myURL, myData);

                if (newURL.charAt(newURL.length - 1) === '+') {
                    console.log(newURL)
                    let editedurl = newURL.slice(0, -1)
                    newURL = editedurl
                }
               
                // Expected output: "https://example.com/page?name=John+Doe&age=30&city=New+York"
                window.location.href = newURL
            }
        });
    });
  
const searchContactsElement = document.querySelector("#mobile-search-contacts-input");
searchContactsElement.addEventListener("input", contactsAutocompleteSearch)
async function contactsAutocompleteSearch() {
    const contactsList = document.querySelector("#mobile-contacts-search-list");
    let searchContactsInputValue = searchContactsElement.value.toLowerCase().trimEnd();
    let filteredContacts = [];

    userContacts.filter(function(contact) {
        let contactFirstName = contact.firstname;
        let contactLastName = contact.lastname;
        let contactName = `${contact.firstname} ${contact.lastname}`

        console.log(searchContactsInputValue.length)

        if (searchContactsInputValue === "") {
            for (let i = 0; i < userContacts.length; i++) {
                filteredContacts.push(userContacts[i])
            }
        }

        // if (contactFirstName.toLowerCase().startsWith(searchContactsInputValue)) {
        //     for (let i = 0; i < userContacts.length; i++) {
        //         let matchContactName = `${userContacts[i].firstname} ${userContacts[i].lastname}`
        //         if (contactName.toLowerCase() === matchContactName.toLowerCase()) {
        //             filteredContacts.push(userContacts[i])
        //             // console.log(filteredContacts)
        //         }
        //     }
        // }

        // if (contactLastName.toLowerCase().startsWith(searchContactsInputValue)) {
        //     for (let i = 0; i < userContacts.length; i++) {
        //         let matchContactName = `${userContacts[i].firstname} ${userContacts[i].lastname}`
        //         if (contactName.toLowerCase() === matchContactName.toLowerCase()) {
        //             filteredContacts.push(userContacts[i])
        //             // console.log(filteredContacts)
        //         }
        //     }
        // }

        if (contactName.toLowerCase().startsWith(searchContactsInputValue)) {
            for (let i = 0; i < userContacts.length; i++) {
                let matchContactName = `${userContacts[i].firstname} ${userContacts[i].lastname}`
                if (contactName.toLowerCase() === matchContactName.toLowerCase()) {
                    filteredContacts.push(userContacts[i])
                    // console.log(filteredContacts)
                }
            }
        }
    });

    // const searchContactsAutocompleteList = document.querySelector("#mobile-autocomplete-contacts-list");



    searchContactsAutocompleteList.innerHTML = '';

    // searchContactsElement.addEventListener('input', function() {
    //     if (this.value === '') {
    //       // Input is cleared, perform your desired action
    //       window.location.reload()
    //       // Example: Reset search results
    //       // resetSearchResults();
    //     }
    //   });

      function removeDuplicates(arr) {
        return arr.reduce((unique, item) => {
          if (!unique.includes(item)) {
            unique.push(item);
          }
          return unique;
        }, []);
      }
      
      const originalArray = [1, 2, 2, 3, 4, 4, 5];
      const uniqueArray = removeDuplicates(filteredContacts);
      console.log(uniqueArray); // Output: [1, 2, 3, 4, 5]

    if (filteredContacts.length > 0) {
        searchContactsAutocompleteList.style.display = 'block';
        mobileContactsSearchListElement.style.display = "none"
        uniqueArray.forEach(contact => {
            const contactsAutoCompleteListItem = document.createElement('div');
            contactsAutoCompleteListItem.style.display = "flex";
            contactsAutoCompleteListItem.style.justifyContent = "space-between";
            contactsAutoCompleteListItem.style.alignItems = "center";
            contactsAutoCompleteListItem.style.height = "35px";
            // contactsAutoCompleteListItem.style.width = "295px";
            contactsAutoCompleteListItem.style.border = "1px solid grey";
            contactsAutoCompleteListItem.style.borderRadius = "5px"
            contactsAutoCompleteListItem.style.marginBottom = "2px";
            contactsAutoCompleteListItem.style.padding = "5px";
            contactsAutoCompleteListItem.style.backgroundColor = "ghostwhite"
            contactsAutoCompleteListItem.addEventListener("mouseover", function() {
            contactsAutoCompleteListItem.style.backgroundColor = "lightgreen";
            });
            // contactsAutoCompleteListItem.addEventListener("mouseover", function() {
            // contactsAutoCompleteListItem.style.backgroundColor = "lightgray";
            // });
            contactsAutoCompleteListItem.addEventListener("mouseout", function() {
            contactsAutoCompleteListItem.style.backgroundColor = "ghostwhite";
            })
            const contactAutoCompleteImage = document.createElement("img");
            contactAutoCompleteImage.style.width = "35px";
            contactAutoCompleteImage.style.height = "100%";
            contactAutoCompleteImage.style.border = "0.5px solid grey";
            contactAutoCompleteImage.style.borderRadius = "50%";
            contactAutoCompleteImage.style.backgroundColor = "gainsboro";
            contactAutoCompleteImage.style.objectFit = "cover";
            contactAutoCompleteImage.setAttribute("src", contact.contact_image);
            const contactListItemAutocompleteNameContainer = document.createElement("div");
            contactListItemAutocompleteNameContainer.style.display = "flex";
            contactListItemAutocompleteNameContainer.style.height = "100%"
            const contactAutocompleteFavoriteContainer = document.createElement("div");
            const contactAutocompleteFavoriteIcon = document.createElement("img");
            contactAutocompleteFavoriteIcon.setAttribute("src", "./images/star-gold-svgrepo-com.svg");
            contactAutocompleteFavoriteIcon.style.width = "20px";
            if (contact.favorite !== true) {
                contactAutocompleteFavoriteIcon.style.visibility = "hidden"
            }
            const contactListItemAutocompleteNameElementContainer = document.createElement("div");
            contactListItemAutocompleteNameElementContainer.style.display = "flex";
            contactListItemAutocompleteNameElementContainer.style.flexDirection = "column";
            const contactAutoCompleteNameElement = document.createElement("p");
            // contactAutoCompleteNameElement.style.fontFamily = "sans-serif";
            contactAutoCompleteNameElement.style.fontSize = "small"
            contactAutoCompleteNameElement.style.margin = "0px 0px 0px 10px"
            contactAutoCompleteNameElement.innerHTML = `${contact.firstname} ${contact.lastname}`
            const contactAutoCompleteEmailElement = document.createElement("p");
            // contactAutoCompleteEmailElement.style.fontFamily = "sans-serif"
            contactAutoCompleteEmailElement.style.fontSize = "small"
            contactAutoCompleteEmailElement.style.margin = "0px 0px 0px 10px";
            contactAutoCompleteEmailElement.innerHTML = contact.emailaddress

            
        const contactEmailAddressText = contact.emailaddress;
        const ellipsis = "..."
        let contactEmailAddressTextSlice = contactEmailAddressText.slice(0, 35) + ellipsis
        console.log(contactEmailAddressText.length)
        if (contactEmailAddressText.length > 35) {
            contactAutoCompleteEmailElement.innerHTML = contactEmailAddressTextSlice
        } else {
            contactAutoCompleteEmailElement.innerHTML = contact.emailaddress
        }

            contactsAutoCompleteListItem.classList.add("contact-list-item");
            contactsAutoCompleteListItem.style.cursor = "default"
            // contactsAutoCompleteListItem.style.height = "200px"
            const contactId = contact.contact_id.toString();
            contactsAutoCompleteListItem.setAttribute("id", `${contactId}`)
            contactsAutoCompleteListItem.setAttribute("data", `${rootUrl}/contact_${contactId}`);
            contactsAutoCompleteListItem.setAttribute("name", `${contact.firstname} ${contact.lastname}`)

            contactsAutoCompleteListItem.addEventListener("click", function(event) {
                if (window.location.href === contactsAutoCompleteListItem.getAttribute("data")) {
                    event.preventDefault()
                } else {
                    window.location.href = contactsAutoCompleteListItem.getAttribute("data");
                }
            })

            contactListItemAutocompleteNameContainer.appendChild(contactAutoCompleteImage);
            contactListItemAutocompleteNameElementContainer.appendChild(contactAutoCompleteNameElement);
            contactListItemAutocompleteNameElementContainer.appendChild(contactAutoCompleteEmailElement);
            contactAutocompleteFavoriteContainer.appendChild(contactAutocompleteFavoriteIcon);
            contactListItemAutocompleteNameContainer.appendChild(contactAutoCompleteImage);
            contactListItemAutocompleteNameContainer.appendChild(contactListItemAutocompleteNameElementContainer);
            contactsAutoCompleteListItem.appendChild(contactListItemAutocompleteNameContainer);
            contactsAutoCompleteListItem.appendChild(contactAutocompleteFavoriteContainer)
            searchContactsAutocompleteList.appendChild(contactsAutoCompleteListItem);
            mobileContactsSearchListContainer.appendChild(searchContactsAutocompleteList)
        });
    }};
}
   
async function renderUserContent() {
const allUsers = await getAllUsers();
    const sessionId = sessionStorage.getItem("user");
    let matchingUser;
    for (let i = 0; i < allUsers.length; i++) {
        if (allUsers[i].session_id === sessionId) {
            matchingUser = allUsers[i]
        }
    }
    const userId = matchingUser.user_id;
    const user = await getUser(userId);
    const userContacts = await getUserContacts(userId);
    console.log(user)

    const userImageContainer = document.querySelector("#user-image-container");
    // const userImage = new Image();

    const userImage = document.querySelector("#user-image");
    if (user.user_image !== null && user.user_image !== './images/user-5-svgrepo-com.svg') {
        userImage.setAttribute("src", user.user_image)
        userImage.style.borderRadius = "50%"
    }
    
    const userHeaderNameElement = document.querySelector("#header-user-name");
    userHeaderNameElement.innerHTML = `${user.firstname} ${user.lastname}`;
    const userHeaderEmailElement = document.querySelector("#header-user-email");
    userHeaderEmailElement.innerHTML = user.emailaddress;

    const userHeaderElement = document.querySelector("#user-name");
    userHeaderElement.innerHTML = `${user.firstname}'s Account`;
    // userHeaderElement.style.fontSize = "xx-large";
    userHeaderElement.style.fontFamily = "Arial";
    // userHeaderEmailElement.innerHTML = `${user.emailaddress}`;

    const userInfoFullNameElement = document.querySelector("#profile-full-name");
    userInfoFullNameElement.value = `${user.firstname} ${user.lastname}`;
    const userInfoEmailElement = document.querySelector("#profile-email-address");
    userInfoEmailElement.value = user.emailaddress;
    const userInfoPhoneElement = document.querySelector("#profile-phone-number");
    userInfoPhoneElement.value = user.phonenumber;
    const userNumberOfContactsElement = document.querySelector("#profile-number-of-contacts");
    userNumberOfContactsElement.value = userContacts.length;
    const userPasswordElement = document.querySelector("#profile-password");

    function replaceWithAsterisks(str) {
        if (!str) {
          return '';
        }
        return str.charAt(0) + '●'.repeat(str.length - 1);
      }

    userPasswordElement.value = replaceWithAsterisks(user.user_password)


    console.log(user)

    const navigateEditUserPageButton = document.querySelector("#navigate-edit-user-page-button");
    navigateEditUserPageButton.addEventListener("click", function(event) {
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
            
        const myURL = `${rootUrl}/edit_user`
        const myData = {
            user_id: user.user_id,
            name: `${user.firstname} ${user.lastname}`,
        };   
            let newURL = saveDataToURL(myURL, myData);

            if (newURL.charAt(newURL.length - 1) === '+') {
                console.log(newURL)
                let editedurl = newURL.slice(0, -1)
                newURL = editedurl
            }  
            window.location.href = newURL
    });
};

async function renderMobileUserContent() {
const allUsers = await getAllUsers();
    const sessionId = sessionStorage.getItem("user");
    let matchingUser;
    for (let i = 0; i < allUsers.length; i++) {
        if (allUsers[i].session_id === sessionId) {
            matchingUser = allUsers[i]
        }
    }
    const userId = matchingUser.user_id;
    const user = await getUser(userId);
    const userContacts = await getUserContacts(userId);
    console.log(user)

    const userImageContainer = document.querySelector("#mobile-user-image-container");
    // const userImage = new Image();

    const userImage = document.querySelector("#mobile-user-image");
    if (user.user_image !== null && user.user_image !== './images/user-5-svgrepo-com.svg') {
        userImage.setAttribute("src", user.user_image)
        userImage.style.borderRadius = "50%"
    }
    
    // const userHeaderNameElement = document.querySelector("#mobile-header-user-name");
    // userHeaderNameElement.innerHTML = `${user.firstname} ${user.lastname}`;
    // const userHeaderEmailElement = document.querySelector("#mobile-header-user-email");
    // userHeaderEmailElement.innerHTML = user.emailaddress;

    const userHeaderElement = document.querySelector("#mobile-user-name");
    userHeaderElement.innerHTML = `${user.firstname} ${user.lastname}`;
    // userHeaderElement.style.fontSize = "xx-large";
    userHeaderElement.style.fontFamily = "Arial";
    // userHeaderEmailElement.innerHTML = `${user.emailaddress}`;

    requestAnimationFrame(() => {
        const screenWidth = window.innerWidth;
        const screenHeight = window.innerHeight;
        const mobileUserHeaderElement = document.querySelector("#mobile-user-header-container");
        const mobileUserHeaderElementHeight = mobileUserHeaderElement.clientHeight;
        console.log(mobileUserHeaderElementHeight)
        const mobileUserImageCircleElement = document.querySelector("#mobile-user-image-circle");
        const mobileUserFavoriteSquareElement = document.querySelector("#mobile-user-favorite-square")
        const newWidth = (80 / 100) * mobileUserHeaderElementHeight
        const newWidthStr = newWidth.toString() + "px"

        mobileUserImageCircleElement.style.width = newWidthStr
        mobileUserFavoriteSquareElement.style.width = newWidthStr

        // const elOrg = contactOrganizationAndRoleElement;
        // const elOrgHeight = elOrg.clientHeight;
        // const elOrgText = elOrg.innerText;
        // const ellipsis = "..."
        // const elOrgTextSlice = elOrgText.slice(0, 22) + ellipsis
        // if (elOrgHeight > 22) {
        //     elOrg.innerHTML = elOrgTextSlice
        // }
    });

    const userInfoFullNameElement = document.querySelector("#mobile-profile-full-name");
    userInfoFullNameElement.value = `${user.firstname} ${user.lastname}`;
    const userInfoEmailElement = document.querySelector("#mobile-profile-email-address");
    userInfoEmailElement.value = user.emailaddress;
    const userInfoPhoneElement = document.querySelector("#mobile-profile-phone-number");
    userInfoPhoneElement.value = user.phonenumber;
    const userNumberOfContactsElement = document.querySelector("#mobile-profile-number-of-contacts");
    userNumberOfContactsElement.value = userContacts.length;
    const userPasswordElement = document.querySelector("#mobile-profile-password");

    function replaceWithAsterisks(str) {
        if (!str) {
          return '';
        }
        return str.charAt(0) + '●'.repeat(str.length - 1);
      }

    userPasswordElement.value = replaceWithAsterisks(user.user_password)


    console.log(user)

    const navigateEditUserPageButton = document.querySelector("#mobile-navigate-edit-user-page-button");
    navigateEditUserPageButton.addEventListener("click", function(event) {
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
            
        const myURL = `${rootUrl}/edit_user`
        const myData = {
            user_id: user.user_id,
            name: `${user.firstname} ${user.lastname}`,
        };   
            let newURL = saveDataToURL(myURL, myData);

            if (newURL.charAt(newURL.length - 1) === '+') {
                console.log(newURL)
                let editedurl = newURL.slice(0, -1)
                newURL = editedurl
            }  
            window.location.href = newURL
    });

    document.body.style.overflow = "hidden"
};

async function renderEditUserContent() {
const allUsers = await getAllUsers();
    const sessionId = sessionStorage.getItem("user");
    let matchingUser;
    for (let i = 0; i < allUsers.length; i++) {
        if (allUsers[i].session_id === sessionId) {
            matchingUser = allUsers[i]
        }
    }
    const userId = matchingUser.user_id;
    const user = await getUser(userId);

    const editUserImage = document.querySelector("#edit-user-image");
    if (user.user_image !== null && user.user_image !== './images/user-5-svgrepo-com.svg') {
        editUserImage.setAttribute("src", user.user_image);
        editUserImage.style.borderRadius = "50%"
    };

    const editUserRemovePhotoButton = document.querySelector("#edit-user-remove-photo-button");
    editUserRemovePhotoButton.addEventListener("click", function() {
        const editUserAddPhotoInputElement = document.querySelector("#edit-user-add-photo");
        editUserAddPhotoInputElement.value = "";
        
        if (editUserImage.getAttribute("src") === user.user_image) {
            editUserImage.setAttribute("src", "./images/user-5-svgrepo-com.svg")
        } else {
            editUserImage.setAttribute("src", user.user_image);
        }
    })
    const editUserAddPhotoButton = document.querySelector("#edit-user-add-photo-button");
    if (user.user_image !== null && user.user_image !== './images/user-5-svgrepo-com.svg') {
        editUserAddPhotoButton.innerHTML = "Change Photo"
    }

    editUserAddPhotoButton.addEventListener("click", function() {
        const editUserAddPhotoInputContainerElement = document.querySelector("#edit-user-add-photo-input-container")
        editUserAddPhotoInputContainerElement.style.display = "none";
        if (editUserAddPhotoButton.innerHTML === "Save Photo") {
            updateUserImage()
        }
    })

    const editUserAddPhotoInputContainerElement = document.querySelector("#edit-user-add-photo-input-container")
    editUserAddPhotoButton.addEventListener("click", function() {
        console.log("edit photo")
        if (editUserAddPhotoButton.innerHTML !== "Save Photo") {
            editUserAddPhotoInputContainerElement.style.display = "flex";
        }
    });
    const closeEditUserAddPhotoIcon = document.querySelector("#close-edit-user-add-photo-icon");
    closeEditUserAddPhotoIcon.addEventListener("click", function(event) {
        // window.location.reload()
        editUserImage.setAttribute("src", user.user_image);
        const editUserAddPhotoInputElement = document.querySelector("#edit-user-add-photo");
        editUserAddPhotoInputElement.value = "";
        const editUserAddPhotoInputContainerElement = document.querySelector("#edit-user-add-photo-input-container")
        editUserAddPhotoInputContainerElement.style.display = "none";
        editUserAddPhotoButton.innerHTML = "Change Photo"
      
    })
    const editUserAddPhotoSaveButton = document.querySelector("#edit-user-add-photo-insert-button");
    editUserAddPhotoSaveButton.addEventListener("click", function() {
        // editUserAddPhotoInputContainerElement.style.display = "none";
        const editUserAddPhotoInputElement = document.querySelector("#edit-user-add-photo")
        console.log(editUserAddPhotoInputElement.files[0])

        if (editUserAddPhotoInputElement.files[0] !== undefined) {
            editUserAddPhotoButton.innerHTML = "Save Photo"
            handleEditUserImage()
        }
    }, false)

    const editUserFirstNameElement = document.querySelector("#edit-user-firstname");
    const editUserLastNameElement = document.querySelector("#edit-user-lastname");
    const editUserEmailElement = document.querySelector("#edit-user-email");
    const editUserPhoneElement = document.querySelector("#edit-user-phonenumber");
    const editUserPasswordElement = document.querySelector("#edit-user-password");
    const editUserConfirmPasswordElement = document.querySelector("#edit-user-confirm-password");
    const editUserMatchingPasswordsContainer = document.querySelector("#edit-matching-passwords")

    editUserFirstNameElement.value = user.firstname;
    editUserLastNameElement.value = user.lastname;
    editUserEmailElement.value = user.emailaddress;
    editUserPhoneElement.value = user.phonenumber;
    editUserPasswordElement.value = user.user_password;

    // const newContactPhoneNumberElement = document.querySelector("#new-contact-phonenumber");
    // const phonenumber = newContactPhoneNumberElement.value
    // console.log(phonenumber)
    editUserPhoneElement.addEventListener("keydown", disableNonNumericKeys)
    editUserPhoneElement.addEventListener("blur", function() {
        formatPhoneNumberForData(editUserPhoneElement)
    });
    editUserPhoneElement.addEventListener("focus", function() {
        resetPhoneNumberFormatOnFocus(editUserPhoneElement)
    });

    const editUserInformationRowFive = document.querySelector("#edit-user-information-row-five");
    const editUserInformationRowSix = document.querySelector("#edit-user-information-row-six");
    const editUserChangePasswordButton = document.querySelector("#edit-user-change-password-button");
    const editUserHidePasswordButton = document.querySelector("#edit-user-hide-password-button");
    editUserChangePasswordButton.addEventListener("click", function(event) {
        event.preventDefault()
        editUserInformationRowFive.style.visibility = "visible";
        editUserInformationRowSix.style.visibility = "visible";
        editUserChangePasswordButton.style.display = "none";
        editUserHidePasswordButton.style.display = "block";

        if (editUserPasswordElement.value !== editUserConfirmPasswordElement.value && editUserInformationRowFive.style.visibility !== "hidden") {
            editUserMatchingPasswordsContainer.children[0].style.visibility = "visible"
            editUserMatchingPasswordsContainer.children[0].innerHTML = "Passwords do not match"
            editUserMatchingPasswordsContainer.children[0].style.color = "red"
        }
    });

    editUserHidePasswordButton.addEventListener("click", function(event) {
        event.preventDefault()
        editUserInformationRowFive.style.visibility = "hidden";
        editUserInformationRowSix.style.visibility = "hidden";
        editUserPasswordElement.value = user.user_password;
        editUserConfirmPasswordElement.value = ""
        editUserHidePasswordButton.style.display = "none";
        editUserChangePasswordButton.style.display = "block";
        editUserMatchingPasswordsContainer.children[0].style.visibility = "hidden"
    });

    if (editUserPasswordElement.value !== editUserConfirmPasswordElement.value && editUserInformationRowFive.style.visibility !== "hidden") {
        editUserMatchingPasswordsContainer.children[0].style.visibility = "visible"
        editUserMatchingPasswordsContainer.children[0].innerHTML = "Passwords do not match"
        editUserMatchingPasswordsContainer.children[0].style.color = "red"
    }

    editUserPasswordElement.addEventListener("input", function() {
        if (editUserPasswordElement.value.length === 0) {
            editUserMatchingPasswordsContainer.children[0].style.visibility = "hidden"
        } else {
            if (editUserPasswordElement.value !== editUserConfirmPasswordElement.value) {
                editUserMatchingPasswordsContainer.children[0].style.visibility = "visible"
                editUserMatchingPasswordsContainer.children[0].innerHTML = "Passwords do not match"
                editUserMatchingPasswordsContainer.children[0].style.color = "red"
            };   
            if (editUserPasswordElement.value === editUserConfirmPasswordElement.value) {
                 editUserMatchingPasswordsContainer.children[0].style.visibility = "visible"
                 editUserMatchingPasswordsContainer.children[0].innerHTML = "Passwords match"
                 editUserMatchingPasswordsContainer.children[0].style.color = "green"
            };
        };

    })

    editUserConfirmPasswordElement.addEventListener("input", function() {
        if (editUserPasswordElement.value.length === 0) {
            editUserMatchingPasswordsContainer.children[0].style.visibility = "hidden"
        } else {
            if (editUserPasswordElement.value !== editUserConfirmPasswordElement.value) {
                editUserMatchingPasswordsContainer.children[0].style.visibility = "visible"
                editUserMatchingPasswordsContainer.children[0].innerHTML = "Passwords do not match"
                editUserMatchingPasswordsContainer.children[0].style.color = "red"
            };     
            if (editUserPasswordElement.value === editUserConfirmPasswordElement.value) {
                 editUserMatchingPasswordsContainer.children[0].style.visibility = "visible"
                 editUserMatchingPasswordsContainer.children[0].innerHTML = "Passwords match"
                 editUserMatchingPasswordsContainer.children[0].style.color = "green"
            };
        };
    });

    // const editUserButtons = document.querySelectorAll(".edit-user-button")
    // // const editUserButtonsHTMLArr = Array.from(editUserButtons)
    // editUserButtons.forEach(button => {
    //     button.addEventListener("click", function(event) {
    //         event.preventDefault()
    //         updateUser()
    //     }, false)
    // })

    const submitEditUserButton = document.querySelector("#submit-edit-user-button");
    submitEditUserButton.addEventListener("click", function(event) {
        event.preventDefault()
        updateUser()
    }, false)

    const updateUserPasswordButton = document.querySelector("#update-user-password-button");
    updateUserPasswordButton.addEventListener("click", function(event) {
        event.preventDefault()
        const editUserMatchingPasswordsContainer = document.querySelector("#edit-matching-passwords")
        editUserMatchingPasswordsContainer.style.visibility = "hidden"
        updateUserPassword()
    }, false)

    const deleteUserButton = document.querySelector("#delete-user-button");
    deleteUserButton.addEventListener("click", function() {
        if (confirm("Are you sure you want to delete your account?")) {
            // Code to execute if the user clicks OK
            console.log("User clicked OK");
          } else {
            // Code to execute if the user clicks Cancel
            console.log("User clicked Cancel");
            return
            // You might want to return from a function here to stop further execution
          }

        deleteContacts();
        deleteUser();
    })
};

async function renderMobileEditUserContent() {
const allUsers = await getAllUsers();
    const sessionId = sessionStorage.getItem("user");
    let matchingUser;
    for (let i = 0; i < allUsers.length; i++) {
        if (allUsers[i].session_id === sessionId) {
            matchingUser = allUsers[i]
        }
    }
    const userId = matchingUser.user_id;
    const user = await getUser(userId);

    const editUserImage = document.querySelector("#mobile-edit-user-image");
    if (user.user_image !== null && user.user_image !== './images/user-5-svgrepo-com.svg') {
        editUserImage.setAttribute("src", user.user_image);
        editUserImage.style.borderRadius = "50%"
    };

    const editUserRemovePhotoButton = document.querySelector("#mobile-edit-user-remove-photo-button");
    const editUserAddPhotoButton = document.querySelector("#mobile-edit-user-add-photo-button");
    editUserRemovePhotoButton.addEventListener("click", function() {
        const editUserAddPhotoInputElement = document.querySelector("#mobile-edit-user-add-photo")
        editUserAddPhotoInputElement.value = ""
        // editUserImage.setAttribute("src", "./images/user-5-svgrepo-com.svg")
        if (editUserImage.getAttribute("src") !== "./images/user-5-svgrepo-com.svg") {
            editUserAddPhotoButton.innerHTML = "Save Photo";
        }
        editUserImage.setAttribute("src", "./images/user-5-svgrepo-com.svg")
    });

    if (user.user_image !== null && user.user_image !== './images/user-5-svgrepo-com.svg') {
        editUserAddPhotoButton.innerHTML = "Change Photo"
    };

    editUserAddPhotoButton.addEventListener("click", function() {
        const editUserAddPhotoInputContainerElement = document.querySelector("#mobile-edit-user-add-photo-input-container")
        editUserAddPhotoInputContainerElement.style.display = "none";
        if (editUserAddPhotoButton.innerHTML === "Save Photo") {
            mobileUpdateUserImage()
        }
    });

    const editUserAddPhotoInputContainerElement = document.querySelector("#mobile-edit-user-add-photo-input-container")
    editUserAddPhotoButton.addEventListener("click", function() {
        console.log("edit photo")
        if (editUserAddPhotoButton.innerHTML !== "Save Photo") {
            editUserAddPhotoInputContainerElement.style.display = "flex";
        }
    });
    const closeEditUserAddPhotoIcon = document.querySelector("#mobile-close-edit-user-add-photo-icon");
    closeEditUserAddPhotoIcon.addEventListener("click", function(event) {
        window.location.reload()
      
    })
    const editUserAddPhotoSaveButton = document.querySelector("#mobile-edit-user-add-photo-insert-button");
    editUserAddPhotoSaveButton.addEventListener("click", function() {
        // editUserAddPhotoInputContainerElement.style.display = "none";
        const editUserAddPhotoInputElement = document.querySelector("#mobile-edit-user-add-photo")
        console.log(editUserAddPhotoInputElement.files[0])

        if (editUserAddPhotoInputElement.files[0] !== undefined) {
            editUserAddPhotoButton.innerHTML = "Save Photo"
            handleMobileEditUserImage()
        }
    }, false)

       requestAnimationFrame(() => {
        const screenWidth = window.innerWidth;
        const screenHeight = window.innerHeight;
        const mobileEditUserHeaderElement = document.querySelector("#mobile-edit-user-header-container");
        const mobileEditUserHeaderElementHeight = mobileEditUserHeaderElement.clientHeight;
        const mobileEditUserImageCircleElement = document.querySelector("#mobile-edit-user-image-circle");
        const mobileEditUserFavoriteSquareElement = document.querySelector("#mobile-edit-user-favorite-square")
        const newWidth = (80 / 100) * mobileEditUserHeaderElementHeight
        const newWidthStr = newWidth.toString() + "px"

        mobileEditUserImageCircleElement.style.width = newWidthStr
        mobileEditUserFavoriteSquareElement.style.width = newWidthStr
                
        const mobileEditUserAddPhotoButtonContainerMarginLeft = mobileEditUserImageCircleElement.clientWidth + 5;
        const mobileEditUserAddPhotoButtonContainerMarginLeftStr =  mobileEditUserAddPhotoButtonContainerMarginLeft.toString() + "px"
        const mobileEditUserAddPhotoButtonContainer = document.querySelector("#mobile-edit-user-add-photo-button-container")
        mobileEditUserAddPhotoButtonContainer.style.marginLeft = mobileEditUserAddPhotoButtonContainerMarginLeftStr;
    });

    const editUserFirstNameElement = document.querySelector("#mobile-edit-user-firstname");
    const editUserLastNameElement = document.querySelector("#mobile-edit-user-lastname");
    const editUserEmailElement = document.querySelector("#mobile-edit-user-email");
    const editUserPhoneElement = document.querySelector("#mobile-edit-user-phonenumber");
    const editUserPasswordElement = document.querySelector("#mobile-edit-user-password");
    const editUserConfirmPasswordElement = document.querySelector("#mobile-edit-user-confirm-password");
    const editUserMatchingPasswordsContainer = document.querySelector("#mobile-edit-matching-passwords")

    editUserFirstNameElement.value = user.firstname;
    editUserLastNameElement.value = user.lastname;
    editUserEmailElement.value = user.emailaddress;
    editUserPhoneElement.value = user.phonenumber;
    editUserPasswordElement.value = user.user_password;

    // const newContactPhoneNumberElement = document.querySelector("#new-contact-phonenumber");
    // const phonenumber = newContactPhoneNumberElement.value
    // console.log(phonenumber)
    editUserPhoneElement.addEventListener("keydown", disableNonNumericKeys)
    editUserPhoneElement.addEventListener("blur", function() {
        formatPhoneNumberForData(editUserPhoneElement)
    });
    editUserPhoneElement.addEventListener("focus", function() {
        resetPhoneNumberFormatOnFocus(editUserPhoneElement)
    });

    const editUserInformationRowFive = document.querySelector("#mobile-edit-user-information-row-five");
    const editUserInformationRowSix = document.querySelector("#mobile-edit-user-information-row-six");
    const editUserChangePasswordButton = document.querySelector("#mobile-edit-user-change-password-button");
    const editUserHidePasswordButton = document.querySelector("#mobile-edit-user-hide-password-button");
    editUserChangePasswordButton.addEventListener("click", function(event) {
        event.preventDefault()
        editUserInformationRowFive.style.visibility = "visible";
        editUserInformationRowSix.style.visibility = "visible";
        editUserChangePasswordButton.style.display = "none";
        editUserHidePasswordButton.style.display = "block";

        if (editUserPasswordElement.value !== editUserConfirmPasswordElement.value && editUserInformationRowFive.style.visibility !== "hidden") {
            editUserMatchingPasswordsContainer.children[0].style.visibility = "visible"
            editUserMatchingPasswordsContainer.children[0].innerHTML = "Passwords do not match"
            editUserMatchingPasswordsContainer.children[0].style.color = "red"
        }
    });

    editUserHidePasswordButton.addEventListener("click", function(event) {
        event.preventDefault()
        editUserInformationRowFive.style.visibility = "hidden";
        editUserInformationRowSix.style.visibility = "hidden";
        editUserPasswordElement.value = user.user_password;
        editUserConfirmPasswordElement.value = ""
        editUserHidePasswordButton.style.display = "none";
        editUserChangePasswordButton.style.display = "block";
        editUserMatchingPasswordsContainer.children[0].style.visibility = "hidden"
    });

    if (editUserPasswordElement.value !== editUserConfirmPasswordElement.value && editUserInformationRowFive.style.visibility !== "hidden") {
        editUserMatchingPasswordsContainer.children[0].style.visibility = "visible"
        editUserMatchingPasswordsContainer.children[0].innerHTML = "Passwords do not match"
        editUserMatchingPasswordsContainer.children[0].style.color = "red"
    }

    editUserPasswordElement.addEventListener("input", function() {
        if (editUserPasswordElement.value.length === 0) {
            editUserMatchingPasswordsContainer.children[0].style.visibility = "hidden"
        } else {
            if (editUserPasswordElement.value !== editUserConfirmPasswordElement.value) {
                editUserMatchingPasswordsContainer.children[0].style.visibility = "visible"
                editUserMatchingPasswordsContainer.children[0].innerHTML = "Passwords do not match"
                editUserMatchingPasswordsContainer.children[0].style.color = "red"
            };   
            if (editUserPasswordElement.value === editUserConfirmPasswordElement.value) {
                 editUserMatchingPasswordsContainer.children[0].style.visibility = "visible"
                 editUserMatchingPasswordsContainer.children[0].innerHTML = "Passwords match"
                 editUserMatchingPasswordsContainer.children[0].style.color = "green"
            };
        };

    })

    editUserConfirmPasswordElement.addEventListener("input", function() {
        if (editUserPasswordElement.value.length === 0) {
            editUserMatchingPasswordsContainer.children[0].style.visibility = "hidden"
        } else {
            if (editUserPasswordElement.value !== editUserConfirmPasswordElement.value) {
                editUserMatchingPasswordsContainer.children[0].style.visibility = "visible"
                editUserMatchingPasswordsContainer.children[0].innerHTML = "Passwords do not match"
                editUserMatchingPasswordsContainer.children[0].style.color = "red"
            };     
            if (editUserPasswordElement.value === editUserConfirmPasswordElement.value) {
                 editUserMatchingPasswordsContainer.children[0].style.visibility = "visible"
                 editUserMatchingPasswordsContainer.children[0].innerHTML = "Passwords match"
                 editUserMatchingPasswordsContainer.children[0].style.color = "green"
            };
        };
    });

    // const editUserButtons = document.querySelectorAll(".edit-user-button")
    // // const editUserButtonsHTMLArr = Array.from(editUserButtons)
    // editUserButtons.forEach(button => {
    //     button.addEventListener("click", function(event) {
    //         event.preventDefault()
    //         updateUser()
    //     }, false)
    // })

    const submitEditUserButton = document.querySelector("#mobile-submit-edit-user-button");
    submitEditUserButton.addEventListener("click", function(event) {
        event.preventDefault()
        mobileUpdateUser()
    }, false)

    const updateUserPasswordButton = document.querySelector("#mobile-update-user-password-button");
    updateUserPasswordButton.addEventListener("click", function(event) {
        event.preventDefault()
        const editUserMatchingPasswordsContainer = document.querySelector("#mobile-edit-matching-passwords")
        editUserMatchingPasswordsContainer.style.visibility = "hidden"
        mobileUpdateUserPassword()
    }, false)

    const deleteUserButton = document.querySelector("#mobile-delete-user-button");
    deleteUserButton.addEventListener("click", function() {
        if (confirm("Are you sure you want to delete your account?")) {
            // Code to execute if the user clicks OK
            console.log("User clicked OK");
          } else {
            // Code to execute if the user clicks Cancel
            console.log("User clicked Cancel");
            return
            // You might want to return from a function here to stop further execution
          }

        deleteContacts();
        deleteUser();
    });

    document.body.style.overflow = "hidden"
};

async function handleEditUserImage() {
const allUsers = await getAllUsers();
    const sessionId = sessionStorage.getItem("user");
    let matchingUser;
    for (let i = 0; i < allUsers.length; i++) {
        if (allUsers[i].session_id === sessionId) {
            matchingUser = allUsers[i]
        }
    }
    const userId = matchingUser.user_id;
    const user = await getUser(userId);
    const newUserImageElement = document.querySelector("#edit-user-image");
    let newUserImageFile;
    let newUserImage;
    const editUserAddPhotoInputElement = document.querySelector("#edit-user-add-photo")

        newUserImageFile = editUserAddPhotoInputElement.files[0];
        let reader = new FileReader()

        console.log(newUserImageFile)

        reader.onload = function () {
            base64string = reader.result.split(',')[1]
            newUserImage = reader.result;
            newUserImageElement.setAttribute("src", reader.result);
            newUserImageElement.style.borderRadius = "50%"
        };

        if (newUserImageFile !== undefined) {
            reader.readAsDataURL(newUserImageFile)
        } else {
            newUserImageElement.setAttribute("src", './images/user-5-svgrepo-com.svg')
        }
    
        const editUserImageObject = {
            firstname: user.firstname,
            lastname: user.lastname,
            emailaddress: user.emailaddress,
            phonenumber: user.phonenumber,
            password: user.user_password,
            userImage: newUserImageElement.getAttribute("src")
        };

        console.log(editUserImageObject)

        return editUserImageObject
};

async function handleMobileEditUserImage() {
const allUsers = await getAllUsers();
    const sessionId = sessionStorage.getItem("user");
    let matchingUser;
    for (let i = 0; i < allUsers.length; i++) {
        if (allUsers[i].session_id === sessionId) {
            matchingUser = allUsers[i]
        }
    }
    const userId = matchingUser.user_id;
    const user = await getUser(userId);
    const newUserImageElement = document.querySelector("#mobile-edit-user-image");
    let newUserImageFile;
    let newUserImage;
    const editUserAddPhotoInputElement = document.querySelector("#mobile-edit-user-add-photo")

        newUserImageFile = editUserAddPhotoInputElement.files[0];
        let reader = new FileReader()

        console.log(newUserImageFile)

        reader.onload = function () {
            base64string = reader.result.split(',')[1]
            newUserImage = reader.result;
            newUserImageElement.setAttribute("src", reader.result);
            newUserImageElement.style.borderRadius = "50%"
        };

        if (newUserImageFile !== undefined) {
            reader.readAsDataURL(newUserImageFile)
        } else {
            newUserImageElement.setAttribute("src", './images/user-5-svgrepo-com.svg')
        }
    
        const editUserImageObject = {
            firstname: user.firstname,
            lastname: user.lastname,
            emailaddress: user.emailaddress,
            phonenumber: user.phonenumber,
            password: user.user_password,
            userImage: newUserImageElement.getAttribute("src")
        };

        console.log(editUserImageObject)

        return editUserImageObject
}

async function handleEditUserInput(event) {
const allUsers = await getAllUsers();
    const sessionId = sessionStorage.getItem("user");
    let matchingUser;
    for (let i = 0; i < allUsers.length; i++) {
        if (allUsers[i].session_id === sessionId) {
            matchingUser = allUsers[i]
        }
    }
    const userId = matchingUser.user_id;
    const user = await getUser(userId);

    const editUserImageElement = document.querySelector("#edit-user-image")
    const editUserFirstNameElement = document.querySelector("#edit-user-firstname");
    const editUserLastNameElement = document.querySelector("#edit-user-lastname");
    const editUserEmailAddressElement = document.querySelector("#edit-user-email");
    const editUserPhoneNumberElement = document.querySelector("#edit-user-phonenumber");
    const editUserPasswordElement = document.querySelector("#edit-user-password");
    const editUserConfirmPasswordElement = document.querySelector("#edit-user-confirm-password");
    const editUserChangePasswordButton = document.querySelector("#edit-user-change-password-button");

    // if (editUserPasswordElement.value !== editUserConfirmPasswordElement.value && editUserChangePasswordButton.style.display === "none") {
    //     alert("Your passwords do not match. Please try again.");
    //     return
    // };

    const editUserMatchingPasswordsContainer = document.querySelector("#edit-matching-passwords")
    editUserMatchingPasswordsContainer.style.visibility = "hidden"

    const editUserObject = {
        firstname: editUserFirstNameElement.value,
        lastname: editUserLastNameElement.value,
        emailaddress: editUserEmailAddressElement.value,
        phonenumber: editUserPhoneNumberElement.value,
        password: editUserPasswordElement.value,
        userImage: editUserImageElement.getAttribute("src")
    };

    // if (editUserObject.userImage === "./images/user-5-svgrepo-com.svg") {
    //     editUserObject.setAttribute("src", null)
    // }

    return editUserObject;
};

async function handleMobileEditUserInput() {
const allUsers = await getAllUsers();
    const sessionId = sessionStorage.getItem("user");
    let matchingUser;
    for (let i = 0; i < allUsers.length; i++) {
        if (allUsers[i].session_id === sessionId) {
            matchingUser = allUsers[i]
        }
    }
    const userId = matchingUser.user_id;
    const user = await getUser(userId);

    const editUserImageElement = document.querySelector("#mobile-edit-user-image")
    const editUserFirstNameElement = document.querySelector("#mobile-edit-user-firstname");
    const editUserLastNameElement = document.querySelector("#mobile-edit-user-lastname");
    const editUserEmailAddressElement = document.querySelector("#mobile-edit-user-email");
    const editUserPhoneNumberElement = document.querySelector("#mobile-edit-user-phonenumber");
    const editUserPasswordElement = document.querySelector("#mobile-edit-user-password");
    const editUserConfirmPasswordElement = document.querySelector("#mobile-edit-user-confirm-password");
    const editUserChangePasswordButton = document.querySelector("#mobile-edit-user-change-password-button");

    // if (editUserPasswordElement.value !== editUserConfirmPasswordElement.value && editUserChangePasswordButton.style.display === "none") {
    //     alert("Your passwords do not match. Please try again.");
    //     return
    // };

    const editUserMatchingPasswordsContainer = document.querySelector("#mobile-edit-matching-passwords")
    editUserMatchingPasswordsContainer.style.visibility = "hidden"

    const editUserObject = {
        firstname: editUserFirstNameElement.value,
        lastname: editUserLastNameElement.value,
        emailaddress: editUserEmailAddressElement.value,
        phonenumber: editUserPhoneNumberElement.value,
        password: editUserPasswordElement.value,
        userImage: editUserImageElement.getAttribute("src")
    };

    // if (editUserObject.userImage === "./images/user-5-svgrepo-com.svg") {
    //     editUserObject.setAttribute("src", null)
    // }

    return editUserObject;
}

async function handleEditUserPasswordInput() {
const allUsers = await getAllUsers();
    const sessionId = sessionStorage.getItem("user");
    let matchingUser;
    for (let i = 0; i < allUsers.length; i++) {
        if (allUsers[i].session_id === sessionId) {
            matchingUser = allUsers[i]
        }
    }
    const userId = matchingUser.user_id;
    const user = await getUser(userId);

    const editUserPasswordElement = document.querySelector("#edit-user-password");
    const editUserConfirmPasswordElement = document.querySelector("#edit-user-confirm-password");
    const editUserChangePasswordButton = document.querySelector("#edit-user-change-password-button");

    if (editUserPasswordElement.value !== editUserConfirmPasswordElement.value && editUserChangePasswordButton.style.display === "none") {
        alert("Your passwords do not match. Please try again.");
        return
    };

    const editUserPasswordObject = {
        firstname: user.firstname,
        lastname: user.lastname,
        emailaddress: user.emailaddress,
        phonenumber: user.phonenumber,
        password: editUserPasswordElement.value,
        userImage: user.user_image
    };

    console.log(editUserPasswordObject)

    return editUserPasswordObject
}

async function renderContactsListContent() {
const allUsers = await getAllUsers();
    const sessionId = sessionStorage.getItem("user");
    let matchingUser;
    for (let i = 0; i < allUsers.length; i++) {
        if (allUsers[i].session_id === sessionId) {
            matchingUser = allUsers[i]
        }
    }
    const userId = matchingUser.user_id;
    const user = await getUser(userId);
    const userContacts = await getUserContacts(userId)

    const contactsListUserImage = document.querySelector("#contacts-user-image");
    if (user.user_image !== null && user.user_image !== './images/user-5-svgrepo-com.svg') {
        contactsListUserImage.setAttribute("src", user.user_image);
        contactsListUserImage.style.borderRadius = "50%";
    }

    const contactsUserHeaderNameContainer = document.querySelector("#contacts-user-header-name-container");
    // contactsUserHeaderNameContainer.style.margin = "0px 0px 0px 10px"
    const contactsHeaderUserNameElement = document.querySelector("#contact-header-user-name");
    contactsHeaderUserNameElement.style.margin = "0px";
    const contactsHeaderUserEmailAddressElement = document.querySelector("#contact-header-user-email")
    // contactsHeaderUserEmailAddressElement.style.margin = "0px 0px 16px 0px";

    const contactsUserNameElement = document.querySelector("#contacts-user-name");
    contactsUserNameElement.style.margin = "0px";
    const contactsUserEmailAddressElement = document.querySelector("#contacts-user-email");
    contactsUserEmailAddressElement.style.margin = "0px";
    contactsUserNameElement.innerHTML = `${user.firstname}'s Contacts`;
    // contactsUserNameElement.style.fontSize = "xx-large"
    contactsUserNameElement.style.fontFamily = "Arial"
    // contactsUserEmailAddressElement.innerHTML = `${user.emailaddress}`

    contactsHeaderUserNameElement.innerHTML = `${user.firstname} ${user.lastname}`;
    contactsHeaderUserEmailAddressElement.innerHTML = user.emailaddress;

    console.log(userContacts)

    userContacts.sort(function(a, b) {
        if (a.firstname < b.firstname) {
            return -1;
        }
        if (a.firstname < b.firstname) {
            return 1;
        }
        
        var aFirstChar = a.firstname.charAt(0);
        var bFirstChar = b.firstname.charAt(0);
        if (aFirstChar > bFirstChar) {
          return 1;
        } else if (aFirstChar < bFirstChar) {
          return -1;
        } else {
          var aLastChar = a.lastname.charAt(0);
          var bLastChar = b.lastname.charAt(0);
          if (aLastChar === "") {
            aLastChar = "z"
          }
          if (bLastChar === "") {
            bLastChar = "z"
          }
          if (aLastChar > bLastChar) {
            return 1;
          } else if (aLastChar < bLastChar) {
            return -1;
          } else {
            return 0;
          }    
        }
      });

    const contactsListContainer = document.createElement("div");
    const contactsHeaderContainer = document.createElement("div");
    contactsHeaderContainer.style.display = "flex";
    // contactsHeaderContainer.style.justifyContent = "space-between"
    contactsHeaderContainer.style.alignItems = "center"
    // contactsHeaderContainer.style.width = "25%";
    contactsHeaderContainer.style.backgroundColor = "ghostwhite"
    // contactsHeaderContainer.style.marginBottom = "5px"
    contactsHeaderContainer.style.borderTop = "3px solid black";
    contactsHeaderContainer.style.borderBottom = "3px solid black";
    contactsHeaderContainer.style.padding = "5px"
    const myContactsHeaderElement = document.createElement("h2");
    myContactsHeaderElement.innerHTML = "My Contacts"
    myContactsHeaderElement.style.width = "140px"
    myContactsHeaderElement.style.margin = "0"
    myContactsHeaderElement.style.marginLeft = "5px";
    // myContactsHeaderElement.style.marginRight = "10px"
    const numberOfContactsElement = document.createElement("h2");
    numberOfContactsElement.innerHTML = userContacts.length;
    numberOfContactsElement.style.display = "inline-flex";
    numberOfContactsElement.style.justifyContent = "center";
    numberOfContactsElement.style.alignItems = "center";
    numberOfContactsElement.style.width = "15px";
    numberOfContactsElement.style.height = "15px";
    numberOfContactsElement.style.backgroundColor = "navy";
    numberOfContactsElement.style.color = "white"
    numberOfContactsElement.style.padding = "10px";
    numberOfContactsElement.style.borderRadius = "50%";
    numberOfContactsElement.style.margin = "0";
    contactsListContainer.style.position = "absolute";
    contactsListContainer.style.top = "28.2%"
    contactsListContainer.style.left = "31.5%"
    contactsListContainer.style.width = "68.5%"
    const contactsList = document.createElement("ul");
    contactsList.style.listStyle = "none";
    contactsList.style.padding = "0"
    contactsList.style.margin = "0";
    // contactsList.style.height = "100%";
    // contactsList.style.overflow = "auto"
    // contactsList.style.zIndex = "5"
    userContacts.forEach(contact => {
        const contactListItem = document.createElement("div");
        contactListItem.style.display = "flex";
        contactListItem.style.flexDirection = "row";
        contactListItem.style.height = "70px"
        contactListItem.style.borderTop = "2px solid black";
        contactListItem.style.borderBottom = "2px solid black";
        contactListItem.style.backgroundColor = "ghostwhite"
        contactListItem.style.marginTop = "1px";
        contactListItem.style.marginBottom = "1px";
        // contactListItem.style.padding = "5px"
        contactListItem.setAttribute("contactId", contact.contact_id)

        contactListItem.addEventListener("mouseover", function() {
            contactListItem.style.backgroundColor = "lightgreen";
        });

        contactListItem.addEventListener("mouseout", function() {
            contactListItem.style.backgroundColor = "ghostwhite";
        });

        contactListItem.addEventListener("click", function(event) {
            
                // contactListItem.style.backgroundColor = "green";
                
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
                
                const myURL = `${rootUrl}/contact_${contact.contact_id}`;
                const myData = {
                    name: `${contact.firstname} ${contact.lastname}`,
                    // age: 30,
                    // city: "New York"
                };
                
                const newURL = saveDataToURL(myURL, myData);
                console.log(newURL);
                // Expected output: "https://example.com/page?name=John+Doe&age=30&city=New+York"
                window.location.href = newURL
        })

        const contactListItemImageContainer = document.createElement("div");
        contactListItemImageContainer.style.display = "flex";
        contactListItemImageContainer.style.alignItems = "center";
        // contactListItemImageContainer.style.width = "10%"
        contactListItemImageContainer.style.padding = "10px"
        const contactListItemImage = document.createElement("img");
        contactListItemImage.style.width = "57px";
        contactListItemImage.style.height = "57px";
        contactListItemImage.style.border = "0.5px solid grey";
        contactListItemImage.style.borderRadius = "50%"
        contactListItemImage.style.backgroundColor = "gainsboro";
        contactListItemImage.style.boxShadow = "2px 2px 2px";
        contactListItemImage.style.objectFit = "cover";
        
        if (contact.contact_image !== null && contact.contact_image !== "./images/user-2-svgrepo-com.svg") {
            contactListItemImage.setAttribute("src", contact.contact_image);
        } else {
            contactListItemImage.setAttribute("src", "./images/user-2-svgrepo-com.svg");
        }

        // contactListItem.innerHTML = `${contact.firstname} ${contact.lastname}`;
        const contactListNameContainer = document.createElement("div");
        contactListNameContainer.style.position = "relative";
        contactListNameContainer.style.display = "flex";
        contactListNameContainer.style.flexDirection = "column"
        contactListNameContainer.style.justifyContent = "center";
        contactListNameContainer.style.alignItems = "center";
        contactListNameContainer.style.width = "100%"
        const contactListNameElement = document.createElement("h3");
        contactListNameElement.style.margin = "0";
        contactListNameElement.innerHTML = `${contact.firstname} ${contact.lastname}`;
        const contactListEmailElement = document.createElement("p");
        contactListEmailElement.style.fontStyle = "italic"
        contactListEmailElement.style.margin = "0"

        
        console.log(contact)
        
        if (contact.emailaddress !== null && contact.emailaddress !== "") {
            contactListEmailElement.innerHTML = contact.emailaddress;
        } else {
            contactListEmailElement.innerHTML = "text";
            contactListEmailElement.style.visibility = "hidden";
        }

        const contactListOrganizationAndRoleElement = document.createElement("p");
        contactListOrganizationAndRoleElement.style.fontWeight = "bolder";
        contactListOrganizationAndRoleElement.style.margin = "0";
    
        if (contact.organization !== null && contact.organization !== "" && contact.organization_role !== null && contact.organization_role !== "") {
            contactListOrganizationAndRoleElement.innerHTML = `${contact.organization} || ${contact.organization_role}`
        } else if (contact.organization !== null && contact.organization !== "" || contact.organization_role === null && contact.organization_role === "") {
            contactListOrganizationAndRoleElement.innerHTML = `${contact.organization}`
        } else if (contact.organization === null && contact.organization === "" || contact.organization_role !== null && contact.organization_role !== "") {
            contactListOrganizationAndRoleElement.innerHTML = `${contact.organization_role}`
        } else {
            contactListOrganizationAndRoleElement.innerHTML = "text"
            contactListOrganizationAndRoleElement.style.visibility = "hidden"
        }

        const contactListFavoritesStarIconContainer = document.createElement("div");
        contactListFavoritesStarIconContainer.style.display = "flex";
        contactListFavoritesStarIconContainer.style.justifyContent = "center";
        contactListFavoritesStarIconContainer.style.alignItems = "center"
        // contactListFavoritesStarIconContainer.style.width = "10%";
        contactListFavoritesStarIconContainer.style.padding = "10px"
        const contactListFavoriteStarImg = document.createElement("img");
        contactListFavoriteStarImg.classList.add("contact-favorite-icon")
        contactListFavoriteStarImg.style.width = "50px"
        // contactListFavoriteStarImg.style.visibility = "hidden";

        console.log(contact.favorite)

        // contactListFavoriteStarImg.addEventListener("click", function(event) {
        //     // event.preventDefault()
        //     updateContactFavorite()
        // }, false)
        
        contactListFavoriteStarImg.setAttribute("src", "./images/star-gold-svgrepo-com.svg");
        if (contact.favorite === null || contact.favorite === false) {
            contactListFavoriteStarImg.style.visibility = "hidden"
        } else {
            contactListFavoriteStarImg.style.display = "block"
            // contactListFavoriteStarImg.style.visibility = "hidden";
        }
        
        requestAnimationFrame(() => {
            const contactListNameElementWidth = contactListNameElement.clientWidth;
            const contactListNameElementText = contactListNameElement.innerHTML;
            const firstContactListNameElementSlice = contactListNameElementText.slice(0, 31);
            const secondContactListNameElementSlice = contactListNameElementText.slice(0, 26);
            const thirdContactListNameElementSlice = contactListNameElementText.slice(0, 21);
            const fourthContactListNameElementSlice = contactListNameElementText.slice(0, 16);
            const contactListEmailElementWidth = contactListEmailElement.clientWidth;
            const contactListEmailElementText = contactListEmailElement.innerHTML;
            const contactListEmailElementTextSlice = contactListEmailElementText.slice(0, 60);
            const contactListEmailElementTextSecondSlice = contactListEmailElementText.slice(0, 50);
            const contactListOrganizationAndRoleElementWidth = contactListOrganizationAndRoleElement.clientWidth;

            const ellipsis = '...'

            console.log(contactListNameElementWidth)

            if (contactListNameElementWidth > 400) {
                contactListNameElement.innerHTML = firstContactListNameElementSlice + ellipsis;
            };
            if (contactListNameElementWidth > 400) {
                contactListNameElement.innerHTML = secondContactListNameElementSlice + ellipsis;
            };
            if (contactListNameElementWidth > 400) {
                contactListNameElement.innerHTML = thirdContactListNameElementSlice + ellipsis;
            };
            if (contactListNameElementWidth > 400) {
                contactListNameElement.innerHTML = fourthContactListNameElementSlice + ellipsis;
            };

            console.log(contactListEmailElementWidth)
            if (contactListEmailElementWidth > 400) {
                contactListEmailElement.innerHTML = contactListEmailElementTextSlice + ellipsis;
            };
            if (contactListEmailElementWidth > 400) {
                contactListEmailElement.innerHTML = contactListEmailElementTextSecondSlice + ellipsis;
            };

            const contactListOrganizationAndRoleElementText = contactListOrganizationAndRoleElement.innerHTML;
            const contactListOrganizationAndRoleElementTextSlice = contactListOrganizationAndRoleElementText.slice(0, 40);
            console.log(contactListOrganizationAndRoleElementWidth)
            if (contactListOrganizationAndRoleElementWidth > 400) {
                contactListOrganizationAndRoleElement.innerHTML = contactListOrganizationAndRoleElementTextSlice + ellipsis;
            };
        });
        
        contactListItemImageContainer.appendChild(contactListItemImage);
        contactListNameContainer.appendChild(contactListNameElement);
        contactListNameContainer.appendChild(contactListEmailElement);
        contactListNameContainer.appendChild(contactListOrganizationAndRoleElement)
        contactListItem.appendChild(contactListItemImageContainer)
        contactListItem.appendChild(contactListNameContainer)
        contactListFavoritesStarIconContainer.appendChild(contactListFavoriteStarImg);
        contactListItem.appendChild(contactListFavoritesStarIconContainer);
        contactsList.appendChild(contactListItem)
    });
    contactsHeaderContainer.append(myContactsHeaderElement)
    contactsHeaderContainer.appendChild(numberOfContactsElement)
    contactsListContainer.appendChild(contactsHeaderContainer)
    contactsListContainer.appendChild(contactsList)
    document.body.appendChild(contactsListContainer)
};

async function renderMobileContactsListContent() {
const allUsers = await getAllUsers();
    const sessionId = sessionStorage.getItem("user");
    let matchingUser;
    for (let i = 0; i < allUsers.length; i++) {
        if (allUsers[i].session_id === sessionId) {
            matchingUser = allUsers[i]
        }
    }
    const userId = matchingUser.user_id;
    const user = await getUser(userId);
    const userContacts = await getUserContacts(userId)

    const contactsListUserImage = document.querySelector("#mobile-contacts-user-image");
    if (user.user_image !== null && user.user_image !== './images/user-5-svgrepo-com.svg') {
        contactsListUserImage.setAttribute("src", user.user_image);
        contactsListUserImage.style.borderRadius = "50%";
    }

    // const contactsUserHeaderNameContainer = document.querySelector("#contacts-user-header-name-container");
    // contactsUserHeaderNameContainer.style.margin = "0px 0px 0px 10px"
    // const contactsHeaderUserNameElement = document.querySelector("#mobile-contact-header-user-name");
    // contactsHeaderUserNameElement.style.margin = "0px";
    // const contactsHeaderUserEmailAddressElement = document.querySelector("#mobile-contact-header-user-email")
    // contactsHeaderUserEmailAddressElement.style.margin = "0px 0px 16px 0px";

    const contactsUserNameElement = document.querySelector("#mobile-contacts-user-name");
    const contactsUserEmailAddressElement = document.querySelector("#mobile-contacts-user-email");
    contactsUserEmailAddressElement.style.margin = "0px";
    contactsUserNameElement.innerHTML = `${user.firstname} ${user.lastname}`;
    // contactsUserNameElement.style.fontSize = "xx-large"
    contactsUserNameElement.style.fontFamily = "Arial"
    // contactsUserEmailAddressElement.innerHTML = `${user.emailaddress}`

    // contactsHeaderUserNameElement.innerHTML = `${user.firstname} ${user.lastname}`;
    // contactsHeaderUserEmailAddressElement.innerHTML = user.emailaddress;

       requestAnimationFrame(() => {
        const screenWidth = window.innerWidth;
        const screenHeight = window.innerHeight;
        const mobileContactsListHeaderElement = document.querySelector("#mobile-contacts-list-user-header-container");
        const mobileContactsListHeaderElementHeight = mobileContactsListHeaderElement.clientHeight;
        const mobileContactsListHeaderImageCircleElement = document.querySelector("#mobile-contacts-list-header-user-image-circle");
        const mobileContactsListFavoriteSquareElement = document.querySelector("#mobile-contacts-list-header-user-favorite-square")
        const newWidth = (80 / 100) * mobileContactsListHeaderElementHeight
        const newWidthStr = newWidth.toString() + "px"

        mobileContactsListHeaderImageCircleElement.style.width = newWidthStr
        mobileContactsListFavoriteSquareElement.style.width = newWidthStr
    });

    // console.log(userContacts)

    userContacts.sort(function(a, b) {
        if (a.firstname < b.firstname) {
            return -1;
        }
        if (a.firstname < b.firstname) {
            return 1;
        }
        
        var aFirstChar = a.firstname.charAt(0);
        var bFirstChar = b.firstname.charAt(0);
        if (aFirstChar > bFirstChar) {
          return 1;
        } else if (aFirstChar < bFirstChar) {
          return -1;
        } else {
          var aLastChar = a.lastname.charAt(0);
          var bLastChar = b.lastname.charAt(0);
          if (aLastChar === "") {
            aLastChar = "z"
          }
          if (bLastChar === "") {
            bLastChar = "z"
          }
          if (aLastChar > bLastChar) {
            return 1;
          } else if (aLastChar < bLastChar) {
            return -1;
          } else {
            return 0;
          }    
        }
      });

    const contactsListContainer = document.createElement("div");
    const contactsHeaderContainer = document.createElement("div");
    contactsHeaderContainer.style.display = "flex";
    // contactsHeaderContainer.style.justifyContent = "space-between"
    contactsHeaderContainer.style.alignItems = "center"
    // contactsHeaderContainer.style.width = "25%";
    contactsHeaderContainer.style.backgroundColor = "ghostwhite"
    // contactsHeaderContainer.style.marginBottom = "5px"
    contactsHeaderContainer.style.padding = "5px"
    const myContactsHeaderElement = document.createElement("h2");
    myContactsHeaderElement.innerHTML = "My Contacts"
    myContactsHeaderElement.style.width = "140px"
    myContactsHeaderElement.style.margin = "0"
    myContactsHeaderElement.style.marginLeft = "5px"
    // myContactsHeaderElement.style.marginRight = "10px"
    const numberOfContactsElement = document.createElement("h2");
    numberOfContactsElement.innerHTML = userContacts.length;
    numberOfContactsElement.style.display = "inline-flex";
    numberOfContactsElement.style.justifyContent = "center";
    numberOfContactsElement.style.alignItems = "center";
    numberOfContactsElement.style.width = "15px";
    numberOfContactsElement.style.height = "15px";
    numberOfContactsElement.style.backgroundColor = "navy";
    numberOfContactsElement.style.color = "white"
    numberOfContactsElement.style.padding = "10px";
    numberOfContactsElement.style.borderRadius = "50%";
    numberOfContactsElement.style.margin = "0"
    contactsListContainer.style.position = "absolute";
    contactsListContainer.style.top = "23.2%"
    contactsListContainer.style.width = "100%"
    const contactsList = document.createElement("ul");
    contactsList.style.position = "relative";
    contactsList.style.listStyle = "none";
    contactsList.style.padding = "0"
    contactsList.style.margin = "0px 0px 2px 0px"
    userContacts.forEach(contact => {
        const contactListItem = document.createElement("div");
        contactListItem.style.display = "flex";
        contactListItem.style.flexDirection = "row";
        contactListItem.style.justifyContent = "space-between";
        contactListItem.style.height = "80px"
        contactListItem.style.borderTop = "1px solid gray";
        contactListItem.style.borderBottom = "1px solid gray";
        contactListItem.style.backgroundColor = "ghostwhite"
        contactListItem.style.marginTop = "1px";
        // contactListItem.style.marginBottom = "2px";
        contactListItem.setAttribute("contactId", contact.contact_id)

        contactListItem.addEventListener("mouseover", function() {
            contactListItem.style.backgroundColor = "lightgreen";
        });

        contactListItem.addEventListener("mouseout", function() {
            contactListItem.style.backgroundColor = "ghostwhite";
        });

        contactListItem.addEventListener("click", function(event) {
            
                // contactListItem.style.backgroundColor = "green";
                
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
                
                const myURL = `${rootUrl}/contact_${contact.contact_id}`;
                const myData = {
                    name: `${contact.firstname} ${contact.lastname}`,
                    // age: 30,
                    // city: "New York"
                };
                
                let newURL = saveDataToURL(myURL, myData);
                // console.log(newURL);

                if (newURL.charAt(newURL.length - 1) === '+') {
                    console.log(newURL)
                    let editedurl = newURL.slice(0, -1)
                    newURL = editedurl
                }
                // Expected output: "https://example.com/page?name=John+Doe&age=30&city=New+York"
                window.location.href = newURL
        })

        const contactListItemImageContainer = document.createElement("div");
        contactListItemImageContainer.style.display = "flex";
        contactListItemImageContainer.style.alignItems = "center";
        contactListItemImageContainer.style.width = "20%"
        contactListItemImageContainer.style.padding = "5px"
        const contactListItemImage = document.createElement("img");
        contactListItemImage.style.width = "60px";
        contactListItemImage.style.height = "60px";
        contactListItemImage.style.border = "0.5px solid grey";
        contactListItemImage.style.borderRadius = "50%"
        contactListItemImage.style.backgroundColor = "gainsboro";
        contactListItemImage.style.objectFit = "cover";
        
        if (contact.contact_image !== null && contact.contact_image !== "./images/user-2-svgrepo-com.svg") {
            contactListItemImage.setAttribute("src", contact.contact_image);
        } else {
            contactListItemImage.setAttribute("src", "./images/user-2-svgrepo-com.svg");
        }

        // contactListItem.innerHTML = `${contact.firstname} ${contact.lastname}`;
        const contactListNameContainer = document.createElement("div");
        contactListNameContainer.style.position = "relative";
        contactListNameContainer.style.display = "flex";
        contactListNameContainer.style.flexDirection = "column"
        contactListNameContainer.style.justifyContent = "center";
        contactListNameContainer.style.alignItems = "center";
        contactListNameContainer.style.width = "54.5%"
        const contactListNameElement = document.createElement("h3");
        contactListNameElement.style.margin = "0";
        contactListNameElement.innerHTML = `${contact.firstname} ${contact.lastname}`;
        const contactListEmailElement = document.createElement("p");
        contactListEmailElement.style.fontStyle = "italic"
        contactListEmailElement.style.margin = "0"
        
        // console.log(contact)
        
        if (contact.emailaddress !== null && contact.emailaddress !== "") {
            contactListEmailElement.innerHTML = contact.emailaddress;
        } else {
            contactListEmailElement.innerHTML = "text";
            contactListEmailElement.style.visibility = "hidden";
        }

        const contactListOrganizationAndRoleElement = document.createElement("p");
        contactListOrganizationAndRoleElement.setAttribute("id", "contact-org-role-text")
        contactListOrganizationAndRoleElement.style.fontWeight = "bolder";
        contactListOrganizationAndRoleElement.style.margin = "0";
    
        if (contact.organization !== null && contact.organization !== "" && contact.organization_role !== null && contact.organization_role !== "") {
            contactListOrganizationAndRoleElement.innerHTML = `${contact.organization} || ${contact.organization_role}`
        } else if (contact.organization !== null && contact.organization !== "" || contact.organization_role === null && contact.organization_role === "") {
            contactListOrganizationAndRoleElement.innerHTML = `${contact.organization}`
        } else if (contact.organization === null && contact.organization === "" || contact.organization_role !== null && contact.organization_role !== "") {
            contactListOrganizationAndRoleElement.innerHTML = `${contact.organization_role}`
        } else {
            contactListOrganizationAndRoleElement.innerHTML = "text"
            contactListOrganizationAndRoleElement.style.visibility = "hidden"
        }

    requestAnimationFrame(() => {     
        const ellipsis = "..."
        const contactListItemNameElement = contactListNameElement;
        const contactListItemNameElementText = contactListItemNameElement.textContent;
        const contactListNameElementHeight = contactListNameElement.clientHeight;
        // console.log(contactListNameElementHeight)
        const contactLlistNameTextSlice = contactListItemNameElementText.slice(0, 12) + ellipsis;
        if (contactListNameElementHeight > 22) {
            contactListNameElement.innerHTML = contactLlistNameTextSlice
        }

        const contactListNameContainerWidth = contactListNameContainer.clientWidth;
        console.log(contactListItemNameElement.clientWidth)
        const contactEmailAddressText = contact.emailaddress;
        const contactEmailAddressElementWidth = contactListEmailElement.clientWidth;
        let contactEmailAddressTextSlice = contactEmailAddressText.slice(0, 25) + ellipsis
        if (contactEmailAddressElementWidth > contactListNameContainerWidth) {
            contactListEmailElement.innerHTML = contactEmailAddressTextSlice
        } else {
            contactListEmailElement.innerHTML = contact.emailaddress
        }
        
        const elOrg = contactListOrganizationAndRoleElement;
        const elOrgHeight = elOrg.clientHeight;
        const elOrgText = elOrg.innerText;
        const elOrgTextSlice = elOrgText.slice(0, 22) + ellipsis
        const elOrgSecondTextSlice = elOrgText.slice(0, 18) + ellipsis
        if (elOrgHeight > 22) {
            elOrg.innerHTML = elOrgTextSlice
        }
         if (elOrgHeight > 22) {
            elOrg.innerHTML = elOrgSecondTextSlice
        }
    });

        const contactListFavoritesStarIconContainer = document.createElement("div");
        contactListFavoritesStarIconContainer.style.display = "flex";
        contactListFavoritesStarIconContainer.style.justifyContent = "flex-end";
        contactListFavoritesStarIconContainer.style.alignItems = "center"
        contactListFavoritesStarIconContainer.style.width = "20%";
        contactListFavoritesStarIconContainer.style.padding = "5px"
        const contactListFavoriteStarImg = document.createElement("img");
        contactListFavoriteStarImg.classList.add("contact-favorite-icon")
        contactListFavoriteStarImg.style.width = "60px"
          contactListFavoriteStarImg.style.height = "60px"

        const contactsListContainer = document.querySelector("#contacts-list-container");
        console.log(contactsListContainer.style.height)

        // console.log(contact.favorite)

        // contactListFavoriteStarImg.addEventListener("click", function(event) {
        //     // event.preventDefault()
        //     updateContactFavorite()
        // }, false)
        
        contactListFavoriteStarImg.setAttribute("src", "./images/star-gold-svgrepo-com.svg");
        if (contact.favorite === null || contact.favorite === false) {
            contactListFavoriteStarImg.style.visibility = "hidden"
        } else {
            contactListFavoriteStarImg.style.display = "block"
        }
        
        contactListItemImageContainer.appendChild(contactListItemImage);
        contactListNameContainer.appendChild(contactListNameElement);
        contactListNameContainer.appendChild(contactListEmailElement);
        contactListNameContainer.appendChild(contactListOrganizationAndRoleElement)
        contactListItem.appendChild(contactListItemImageContainer)
        contactListItem.appendChild(contactListNameContainer)
        contactListFavoritesStarIconContainer.appendChild(contactListFavoriteStarImg);
        contactListItem.appendChild(contactListFavoritesStarIconContainer);
        contactsList.appendChild(contactListItem)
    });
    // const mobileSmallSidebar = document.querySelector("#mobile-footer")
    // mobileSmallSidebar.style.position = "fixed";
    // mobileSmallSidebar.style.marginTop = "10px"
    // mobileSmallSidebar.style.top = "100%";
    // mobileSmallSidebar.style.transform = "translate(0px, 2px)"
    contactsHeaderContainer.append(myContactsHeaderElement)
    contactsHeaderContainer.appendChild(numberOfContactsElement)
    contactsListContainer.appendChild(contactsHeaderContainer)
    contactsListContainer.appendChild(contactsList)
    // contactsListContainer.appendChild(mobileSmallSidebar)
    document.body.appendChild(contactsListContainer)
}

async function handleContactFavorite() {
const allUsers = await getAllUsers();
    const sessionId = sessionStorage.getItem("user");
    let matchingUser;
    for (let i = 0; i < allUsers.length; i++) {
        if (allUsers[i].session_id === sessionId) {
            matchingUser = allUsers[i]
        }
    }
    const user_id = matchingUser.user_id;
    const url = window.location.href.toString()
    const urlBeforeQuery = url.split('?')[0];
    // const contact_id = urlBeforeQuery.charAt(urlBeforeQuery.length - 1);
    const contact_id = urlBeforeQuery.split('_')[1]
    const contact = await getUserContact(user_id, contact_id)

    let favorite = contact.favorite;

    if (favorite === null || favorite === false) {
        favorite = true
    } else {
        favorite = false
    }

    const favoriteObject = {
        contactId: contact_id,
        favorite: favorite
    }
    
    
    return favoriteObject
};

async function renderContactContent() {
const allUsers = await getAllUsers();
    const sessionId = sessionStorage.getItem("user");
    let matchingUser;
    for (let i = 0; i < allUsers.length; i++) {
        if (allUsers[i].session_id === sessionId) {
            matchingUser = allUsers[i]
        }
    }
    const user_id = matchingUser.user_id;
    const url = window.location.href.toString()
    const urlBeforeQuery = url.split('?')[0];
    // const contact_id = urlBeforeQuery.charAt(urlBeforeQuery.length - 1);
    const contact_id = urlBeforeQuery.split('_')[1]
    const contact = await getUserContact(user_id, contact_id);

    const addToFavoritesButton = document.querySelector("#add-to-favorites-button");

    if (contact.favorite === true) {
        addToFavoritesButton.innerHTML = "Remove favorite";
        addToFavoritesButton.style.backgroundColor = "indianred";
    };

    addToFavoritesButton.addEventListener("click", function() {
        console.log("change favorite status")
        updateContactFavorite()
    }, false)

    console.log(contact)

    const contactFavoriteIcon = document.querySelector("#contact-favorite-icon");
    if (contact.favorite === true) {
        contactFavoriteIcon.style.display = "block";
    } else {
        contactFavoriteIcon.style.display = "none";
    }

    const userImageContainer = document.querySelector("#user-image-container");
    // const userImage = new Image();

    const contactHeaderFullNameElement = document.querySelector("#contact-name");
    const contactHeaderEmailElement = document.querySelector("#contact-email");
    const contactOrganizationAndRoleElement = document.querySelector("#contact-organization-and-role")
    contactHeaderFullNameElement.innerHTML = `${contact.firstname} ${contact.lastname}`;
    // contactHeaderFullNameElement.style.fontFamily = "sans-serif";
    // contactHeaderEmailElement.style.fontFamily = "sans-serif";
    // contactOrganizationAndRoleElement.style.fontFamily = "sans-serif"

    const contactHeaderFullNameElementText = contactHeaderFullNameElement.innerHTML;
    const ellipsis = "..."
    const contactHeaderFullNameShortElement = contactHeaderFullNameElementText.slice(0, 12) + ellipsis
    
    // if (contactHeaderFullNameElementText.length > 12) {
    //     contactHeaderFullNameElement.innerHTML = contactHeaderFullNameShortElement;
    // }
    
    if (contact.emailaddress !== null && contact.emailaddress !== "") {
        contactHeaderEmailElement.innerHTML = `${contact.emailaddress}`;
    } else {
        contactHeaderEmailElement.innerHTML = "text";
        contactHeaderEmailElement.style.visibility = "hidden";
    }
    
    if (contact.emailaddress !== null && contact.emailaddress !== "") {
        contactHeaderEmailElement.innerHTML = `${contact.emailaddress}`;
    } else {
        contactHeaderEmailElement.innerHTML = "text";
        contactHeaderEmailElement.style.visibility = "hidden";
    }

    if (contact.organization !== null && contact.organization !== "" && contact.organization_role !== null && contact.organization_role !== "") {
        contactOrganizationAndRoleElement.innerHTML = `${contact.organization} || ${contact.organization_role}`
    } else if (contact.organization !== null && contact.organization !== "" || contact.organization_role === null && contact.organization_role === "") {
        contactOrganizationAndRoleElement.innerHTML = `${contact.organization}`
    } else if (contact.organization === null && contact.organization === "" || contact.organization_role !== null && contact.organization_role !== "") {
        contactOrganizationAndRoleElement.innerHTML = `${contact.organization_role}`
    } else {
        contactOrganizationAndRoleElement.innerHTML = "text"
        contactOrganizationAndRoleElement.style.visibility = "hidden"
    }

    requestAnimationFrame(() => {
        const contactHeaderFullNameElementWidth = contactHeaderFullNameElement.clientWidth;
        const contactHeaderFullNameElementText = contactHeaderFullNameElement.innerHTML;
        const firstContactHeaderFullNameElementSlice = contactHeaderFullNameElementText.slice(0, 31);
        const secondContactHeaderFullNameElementSlice = contactHeaderFullNameElementText.slice(0, 26);
        const thirdContactHeaderFullNameElementSlice = contactHeaderFullNameElementText.slice(0, 21);
        const fourthContactHeaderFullNameElementSlice = contactHeaderFullNameElementText.slice(0, 16);
        const contactHeaderEmailElementWidth = contactHeaderEmailElement.clientWidth;
        const contactHeaderEmailElementText = contactHeaderEmailElement.innerHTML;
        const contactHeaderEmailElementTextSlice = contactHeaderEmailElementText.slice(0, 60);
        const contactHeaderEmailElementTextSecondSlice = contactHeaderEmailElementText.slice(0, 50);
        const contactHeaderOrganizationAndRoleElementWidth = contactOrganizationAndRoleElement.clientWidth;

        const ellipsis = '...'

        console.log(contactHeaderFullNameElementWidth)

        if (contactHeaderFullNameElementWidth > 400) {
            contactHeaderFullNameElement.innerHTML = firstContactHeaderFullNameElementSlice + ellipsis;
        };
        if (contactHeaderFullNameElementWidth > 400) {
            contactHeaderFullNameElement.innerHTML = secondContactHeaderFullNameElementSlice + ellipsis;
        };
        if (contactHeaderFullNameElementWidth > 400) {
            contactHeaderFullNameElement.innerHTML = thirdContactHeaderFullNameElementSlice + ellipsis;
        };
        if (contactHeaderFullNameElementWidth > 400) {
            contactHeaderFullNameElement.innerHTML = fourthContactHeaderFullNameElementSlice + ellipsis;
        };

        console.log(contactHeaderEmailElementWidth)
        if (contactHeaderEmailElementWidth > 400) {
            contactHeaderEmailElement.innerHTML = contactHeaderEmailElementTextSlice + ellipsis;
        };
        if (contactHeaderEmailElementWidth > 400) {
            contactHeaderEmailElement.innerHTML = contactHeaderEmailElementTextSecondSlice + ellipsis;
        };

        const contactHeaderOrganizationAndRoleElementText = contactOrganizationAndRoleElement.innerHTML;
        const contactHeaderOrganizationAndRoleElementTextSlice = contactHeaderOrganizationAndRoleElementText.slice(0, 40);
        console.log(contactHeaderOrganizationAndRoleElementWidth)
        if (contactHeaderOrganizationAndRoleElementWidth > 400) {
            contactOrganizationAndRoleElement.innerHTML = contactHeaderOrganizationAndRoleElementTextSlice + ellipsis;
        };
    });

   const contactImageElement = document.querySelector("#contact-image")
   const contactFullNameElement = document.querySelector("#contact-full-name");
   const contactGenderElement = document.querySelector("#contact-gender");
   const contactBirthdayElement = document.querySelector("#contact-birthday");
   const contactEmailAddressElement = document.querySelector("#contact-emailaddress");
   const contactPhoneNumberElement = document.querySelector("#contact-phonenumber");
   const contactAddressElement = document.querySelector("#contact-address");
   const contactOrganizationElement = document.querySelector("#contact-organization");
   const contactOrganizationRoleElement = document.querySelector("#contact-organization-role");
   const contactSocialMediaElement = document.querySelector("#contact-social-media");
   const contactNotesElement = document.querySelector("#contact-notes");

   if (contact.contact_image !== null) {
    contactImageElement.style.borderRadius = "50%"
    contactImageElement.setAttribute("src", contact.contact_image)
   }
   
   contactFullNameElement.innerHTML =  `${contact.firstname} ${contact.lastname}`;
   contactFullNameElement.style.fontFamily = "sans-serif";
   contactFullNameElement.style.fontSize = "small";
   contactGenderElement.innerHTML = contact.gender;
   contactGenderElement.style.fontFamily = "sans-serif";
   contactGenderElement.style.fontSize = "small";
   contactBirthdayElement.innerHTML = contact.birthday;
   contactBirthdayElement.style.fontFamily = "sans-serif";
   contactBirthdayElement.style.fontSize = "small";
   contactEmailAddressElement.innerHTML = contact.emailaddress;
   contactEmailAddressElement.style.fontFamily = "sans-serif";
   contactEmailAddressElement.style.fontSize = "small";
   contactPhoneNumberElement.innerHTML = contact.phonenumber;
   contactPhoneNumberElement.style.fontFamily = "sans-serif";
   contactPhoneNumberElement.style.fontSize = "small";
   contactAddressElement.innerHTML = contact.homeaddress;
   contactAddressElement.style.fontFamily = "sans-serif";
   contactAddressElement.style.fontSize = "small";
   contactOrganizationElement.innerHTML = contact.organization;
   contactOrganizationElement.style.fontFamily = "sans-serif";
   contactOrganizationElement.style.fontSize = "small";
   contactOrganizationRoleElement.innerHTML = contact.organization_role;
   contactOrganizationRoleElement.style.fontFamily = "sans-serif";
   contactOrganizationRoleElement.style.fontSize = "small";
   contactSocialMediaElement.innerHTML = contact.social_media;
   contactSocialMediaElement.style.fontFamily = "sans-serif";
   contactSocialMediaElement.style.fontSize = "small";
   contactNotesElement.innerHTML = contact.notes;
   contactNotesElement.style.fontFamily = "sans-serif";
//    contactNotesElement.style.fontSize = "small";

   const navigateManageContactGroupsPageButton = document.querySelector("#manage-contact-groups-button");
   navigateManageContactGroupsPageButton.addEventListener("click", function() {
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
        
        const myURL = `${rootUrl}/manage_groups_contact_${contact_id}`;
        const myData = {
            name: `${contact.firstname} ${contact.lastname}`,
            // age: 30,
            // city: "New York"
        };
        
        const newURL = saveDataToURL(myURL, myData);
        console.log(newURL);
        // Expected output: "https://example.com/page?name=John+Doe&age=30&city=New+York"
        window.location.href = newURL
    });

    const navigateEditContactPageButton = document.querySelector("#navigate-edit-contact-page-button");
    navigateEditContactPageButton.addEventListener("click", function() {
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
        
        const myURL = `${rootUrl}/edit_contact_${contact_id}`;
        const myData = {
            name: `${contact.firstname} ${contact.lastname}`,
            // age: 30,
            // city: "New York"
        };
        
        const newURL = saveDataToURL(myURL, myData);
        console.log(newURL);
        // Expected output: "https://example.com/page?name=John+Doe&age=30&city=New+York"
        window.location.href = newURL
    });
};

async function renderMobileContactContent() {
const allUsers = await getAllUsers();
    const sessionId = sessionStorage.getItem("user");
    let matchingUser;
    for (let i = 0; i < allUsers.length; i++) {
        if (allUsers[i].session_id === sessionId) {
            matchingUser = allUsers[i]
        }
    }
    const user_id = matchingUser.user_id;
    const url = window.location.href.toString()
    const urlBeforeQuery = url.split('?')[0];
    const contact_id = urlBeforeQuery.split('_')[1]
    // const contact_id = urlBeforeQuery.charAt(urlBeforeQuery.length - 1);
    const contact = await getUserContact(user_id, contact_id);

    const userImageContainer = document.querySelector("#mobile-user-image-container");
    // const userImage = new Image();

    
    const contactFavoriteIcon = document.querySelector("#mobile-contact-favorite-icon");
    console.log(contact_id)
    if (contact.favorite === true) {
        contactFavoriteIcon.style.display = "block";
    } else {
        contactFavoriteIcon.style.display = "none";
    }

    const contactHeaderFullNameElement = document.querySelector("#mobile-contact-name");
    const contactHeaderEmailElement = document.querySelector("#mobile-contact-email");
    const contactOrganizationAndRoleElement = document.querySelector("#mobile-contact-organization-and-role")
    contactHeaderFullNameElement.innerHTML = `${contact.firstname} ${contact.lastname}`;
    // contactHeaderFullNameElement.style.fontFamily = "sans-serif";
    // contactHeaderEmailElement.style.fontFamily = "sans-serif";
    // contactOrganizationAndRoleElement.style.fontFamily = "sans-serif"

    const contactHeaderFullNameElementText = contactHeaderFullNameElement.innerHTML;
    const ellipsis = "..."
    const contactHeaderFullNameShortElement = contactHeaderFullNameElementText.slice(0, 12) + ellipsis
    
    if (contactHeaderFullNameElementText.length > 12) {
        contactHeaderFullNameElement.innerHTML = contactHeaderFullNameShortElement;
    }
    
    if (contact.emailaddress !== null && contact.emailaddress !== "") {
        contactHeaderEmailElement.innerHTML = `${contact.emailaddress}`;
    } else {
        contactHeaderEmailElement.innerHTML = "text";
        contactHeaderEmailElement.style.visibility = "hidden";
    }

    if (contact.organization !== null && contact.organization !== "" && contact.organization_role !== null && contact.organization_role !== "") {
        contactOrganizationAndRoleElement.innerHTML = `${contact.organization} || ${contact.organization_role}`
    } else if (contact.organization !== null && contact.organization !== "" || contact.organization_role === null && contact.organization_role === "") {
        contactOrganizationAndRoleElement.innerHTML = `${contact.organization}`
    } else if (contact.organization === null && contact.organization === "" || contact.organization_role !== null && contact.organization_role !== "") {
        contactOrganizationAndRoleElement.innerHTML = `${contact.organization_role}`
    } else {
        contactOrganizationAndRoleElement.innerHTML = "text"
        contactOrganizationAndRoleElement.style.visibility = "hidden"
    }

    requestAnimationFrame(() => {
        const screenWidth = window.innerWidth;
        const screenHeight = window.innerHeight;
        const mobileContactHeaderElement = document.querySelector("#mobile-contact-header-container");
        const mobileContactHeaderElementHeight = mobileContactHeaderElement.clientHeight;
        const mobileContactImageCircleElement = document.querySelector("#mobile-contact-image-circle");
        const mobileContactFavoriteSquareElement = document.querySelector("#mobile-contact-favorite-square")
        const newWidth = (80 / 100) * mobileContactHeaderElementHeight
        const newWidthStr = newWidth.toString() + "px"

        mobileContactImageCircleElement.style.width = newWidthStr
        mobileContactFavoriteSquareElement.style.width = newWidthStr

        const ellipsis = "..."
        const mobileContactHeaderNameContainer = document.querySelector("#mobile-contact-name-container");
        const mobileContactHeaderNameContainerWidth = mobileContactHeaderNameContainer.clientWidth;
        const contactHeaderEmailElementWidth = contactHeaderEmailElement.clientWidth
        const contactHeaderEmailElementText = contactHeaderEmailElement.textContent;
        const contactHeaderEmailTextSlice = contactHeaderEmailElementText.slice(0, 20) + ellipsis;
        if (contactHeaderEmailElementWidth > mobileContactHeaderNameContainerWidth) {
            contactHeaderEmailElement.innerHTML = contactHeaderEmailTextSlice;
        }

        // console.log(mobileContactHeaderElement.clientHeight)

        const elOrg = contactOrganizationAndRoleElement;
        const elOrgHeight = elOrg.clientHeight;
        const elOrgWidth = elOrg.clientWidth;
        const elOrgText = elOrg.innerText;
        const elOrgTextSlice = elOrgText.slice(0, 22) + ellipsis;
        const elOrgSecondTextSlice = elOrgText.slice(0, 18) + ellipsis;
        const elOrgThirdTextSlice = elOrgText.slice(0, 14) + ellipsis;
        if (elOrgHeight > 22) {
            elOrg.innerHTML = elOrgTextSlice
        }
        if (elOrgHeight > 22) {
            elOrg.innerHTML = elOrgSecondTextSlice
        }

        if (elOrgWidth > mobileContactHeaderNameContainerWidth) {
            elOrg.innerHTML = elOrgTextSlice
        }
        if (elOrgWidth > mobileContactHeaderNameContainerWidth) {
            elOrg.innerHTML = elOrgSecondTextSlice
        }
        if (elOrgWidth > mobileContactHeaderNameContainerWidth) {
            elOrg.innerHTML = elOrgThirdTextSlice
        }
        console.log(elOrgHeight)
    });
    
    const mobileContactImageElement = document.querySelector("#mobile-contact-image")
    const mobileContactInformationContainer = document.createElement("div");
    mobileContactInformationContainer.setAttribute("id", "mobile-contact-information-container")
    mobileContactInformationContainer.style.position = "absolute";
    mobileContactInformationContainer.style.display = "flex";
    mobileContactInformationContainer.style.top = "24.3%";
    mobileContactInformationContainer.style.width = "100%";
    const mobileContactInformationColumn = document.createElement("div");
    mobileContactInformationColumn.style.display = "flex";
    mobileContactInformationColumn.style.flexDirection = "column";
    // mobileContactInformationColumn.style.justifyContent = "space-around"
    mobileContactInformationColumn.style.alignItems = "center";
    mobileContactInformationColumn.style.width = "100%";
    mobileContactInformationColumn.style.marginTop = "1%"
    // mobileContactInformationColumn.style.height = "600px";

    const mobileContactFullNameContainer = document.createElement("div");
    mobileContactFullNameContainer.style.display = "flex";
    mobileContactFullNameContainer.style.flexDirection = "column";
    mobileContactFullNameContainer.style.width = "95%";
    mobileContactFullNameContainer.style.marginBottom = "10px"
    const moblieContactFullNameLabelElement = document.createElement("label");
    moblieContactFullNameLabelElement.style.fontWeight = "bold";
    moblieContactFullNameLabelElement.innerHTML = "Name";
    const mobileContactFullNameTextElement = document.createElement("textarea");
    mobileContactFullNameTextElement.readOnly = "true";
    mobileContactFullNameTextElement.style.fontSize = "16px";
    mobileContactFullNameTextElement.style.fontFamily = "sans serif"
    mobileContactFullNameTextElement.style.border = "1px solid grey";
    mobileContactFullNameTextElement.style.boxShadow = "2px 2px 2px";
    mobileContactFullNameTextElement.style.height = "36px"
    mobileContactFullNameTextElement.style.outline = "none";
    mobileContactFullNameTextElement.style.resize = "none";
    mobileContactFullNameTextElement.innerHTML = `${contact.firstname} ${contact.lastname}`

    const mobileContactGenderContainer = document.createElement("div");
    mobileContactGenderContainer.style.display = "flex";
    mobileContactGenderContainer.style.flexDirection = "column";
    mobileContactGenderContainer.style.width = "95%";
    mobileContactGenderContainer.style.marginBottom = "10px"
    const mobileContactGenderLabelElement = document.createElement("label");
    mobileContactGenderLabelElement.style.fontWeight = "bold";
    mobileContactGenderLabelElement.innerHTML = "Gender";
    const mobileContactGenderTextElement = document.createElement("textarea");
    mobileContactGenderTextElement.readOnly = "true";
    mobileContactGenderTextElement.style.fontSize = "16px";
    mobileContactGenderTextElement.style.fontFamily = "sans serif"
    mobileContactGenderTextElement.style.border = "1px solid grey";
    mobileContactGenderTextElement.style.boxShadow = "2px 2px 2px";
    mobileContactGenderTextElement.style.height = "36px"
    mobileContactGenderTextElement.style.outline = "none";
    mobileContactGenderTextElement.style.resize = "none";
    mobileContactGenderTextElement.innerHTML = `${contact.gender}`

    const mobileContactBirthdayContainer = document.createElement("div");
    mobileContactBirthdayContainer.style.display = "flex";
    mobileContactBirthdayContainer.style.flexDirection = "column";
    mobileContactBirthdayContainer.style.width = "95%";
    mobileContactBirthdayContainer.style.marginBottom = "10px";
    const mobileContactBirthdayLabelElement = document.createElement("label");
    mobileContactBirthdayLabelElement.style.fontWeight = "bold";
    mobileContactBirthdayLabelElement.innerHTML = "Birthday";
    const mobileContactBirthdayTextElement = document.createElement("textarea");
    mobileContactBirthdayTextElement.readOnly = "true";
    mobileContactBirthdayTextElement.style.fontSize = "16px";
    mobileContactBirthdayTextElement.style.fontFamily = "sans serif"
    mobileContactBirthdayTextElement.style.border = "1px solid grey";
    mobileContactBirthdayTextElement.style.boxShadow = "2px 2px 2px";
    mobileContactBirthdayTextElement.style.height = "36px";
    mobileContactBirthdayTextElement.style.outline = "none";
    mobileContactBirthdayTextElement.style.resize = "none";
    mobileContactBirthdayTextElement.innerHTML = `${contact.birthday}`

    const mobileContactEmailContainer = document.createElement("div");
    mobileContactEmailContainer.style.display = "flex";
    mobileContactEmailContainer.style.flexDirection = "column";
    mobileContactEmailContainer.style.width = "95%";
    mobileContactEmailContainer.style.marginBottom = "10px"
    const mobileContactEmailLabelElement = document.createElement("label");
    mobileContactEmailLabelElement.style.fontWeight = "bold";
    mobileContactEmailLabelElement.innerHTML = "Email";
    const mobileContactEmailTextElement = document.createElement("textarea");
    mobileContactEmailTextElement.readOnly = "true";
    mobileContactEmailTextElement.style.fontSize = "16px";
    mobileContactEmailTextElement.style.fontFamily = "sans serif"
    mobileContactEmailTextElement.style.border = "1px solid grey";
    mobileContactEmailTextElement.style.boxShadow = "2px 2px 2px";
    mobileContactEmailTextElement.style.height = "36px";
    mobileContactEmailTextElement.style.outline = "none";
    mobileContactEmailTextElement.style.resize = "none";
    mobileContactEmailTextElement.innerHTML = `${contact.emailaddress}`

    const mobileContactPhonenumberContainer = document.createElement("div");
    mobileContactPhonenumberContainer.style.display = "flex";
    mobileContactPhonenumberContainer.style.flexDirection = "column";
    mobileContactPhonenumberContainer.style.width = "95%";
    mobileContactPhonenumberContainer.style.marginBottom = "10px";
    const mobileContactPhonenumberLabelElement = document.createElement("label");
    mobileContactPhonenumberLabelElement.style.fontWeight = "bold";
    mobileContactPhonenumberLabelElement.innerHTML = "Phone Number";
    const mobileContactPhonenumberTextElement = document.createElement("textarea");
    mobileContactPhonenumberTextElement.readOnly = "true";
    mobileContactPhonenumberTextElement.style.fontSize = "16px";
    mobileContactPhonenumberTextElement.style.fontFamily = "sans serif"
    mobileContactPhonenumberTextElement.style.border = "1px solid grey";
    mobileContactPhonenumberTextElement.style.boxShadow = "2px 2px 2px";
    mobileContactPhonenumberTextElement.style.height = "36px";
    mobileContactPhonenumberTextElement.style.outline = "none";
    mobileContactPhonenumberTextElement.style.resize = "none";
    mobileContactPhonenumberTextElement.innerHTML = `${contact.phonenumber}`

    const mobileContactAddressContainer = document.createElement("div");
    mobileContactAddressContainer.style.display = "flex";
    mobileContactAddressContainer.style.flexDirection = "column";
    mobileContactAddressContainer.style.width = "95%";
    mobileContactAddressContainer.style.marginBottom = "10px";
    const mobileContactAddressLabelElement = document.createElement("label");
    mobileContactAddressLabelElement.style.fontWeight = "bold";
    mobileContactAddressLabelElement.innerHTML = "Address";
    const mobileContactAddressTextElement = document.createElement("textarea");
    mobileContactAddressTextElement.readOnly = "true";
    mobileContactAddressTextElement.style.fontSize = "16px";
    mobileContactAddressTextElement.style.fontFamily = "sans serif"
    mobileContactAddressTextElement.style.border = "1px solid grey";
    mobileContactAddressTextElement.style.boxShadow = "2px 2px 2px";
    mobileContactAddressTextElement.style.height = "36px";
    mobileContactAddressTextElement.style.outline = "none";
    mobileContactAddressTextElement.style.resize = "none";
    mobileContactAddressTextElement.innerHTML = `${contact.homeaddress}`

    const mobileContactOrganizationContainer = document.createElement("div");
    mobileContactOrganizationContainer.style.display = "flex";
    mobileContactOrganizationContainer.style.flexDirection = "column";
    mobileContactOrganizationContainer.style.width = "95%";
    mobileContactOrganizationContainer.style.marginBottom = "10px";
    const mobileContactOrganizationLabelElement = document.createElement("label");
    mobileContactOrganizationLabelElement.style.fontWeight = "bold";
    mobileContactOrganizationLabelElement.innerHTML = "Organization";
    const mobileContactOrganizationTextElement = document.createElement("textarea");
    mobileContactOrganizationTextElement.readOnly = "true";
    mobileContactOrganizationTextElement.style.fontSize = "16px";
    mobileContactOrganizationTextElement.style.fontFamily = "sans serif"
    mobileContactOrganizationTextElement.style.border = "1px solid grey";
    mobileContactOrganizationTextElement.style.boxShadow = "2px 2px 2px";
    mobileContactOrganizationTextElement.style.height = "36px";
    mobileContactOrganizationTextElement.style.outline = "none";
    mobileContactOrganizationTextElement.style.resize = "none";
    mobileContactOrganizationTextElement.innerHTML = `${contact.organization}`;

    const mobileContactOrganizationRoleContainer = document.createElement("div");
    mobileContactOrganizationRoleContainer.style.display = "flex";
    mobileContactOrganizationRoleContainer.style.flexDirection = "column";
    mobileContactOrganizationRoleContainer.style.width = "95%";
    mobileContactOrganizationRoleContainer.style.marginBottom = "10px";
    const mobileContactOrganizationRoleLabelElement = document.createElement("label");
    mobileContactOrganizationRoleLabelElement.style.fontWeight = "bold";
    mobileContactOrganizationRoleLabelElement.innerHTML = "Role";
    const mobileContactOrganizationRoleTextElement = document.createElement("textarea");
    mobileContactOrganizationRoleTextElement.readOnly = "true";
    mobileContactOrganizationRoleTextElement.style.fontSize = "16px";
    mobileContactOrganizationRoleTextElement.style.fontFamily = "sans serif"
    mobileContactOrganizationRoleTextElement.style.border = "1px solid grey";
    mobileContactOrganizationRoleTextElement.style.boxShadow = "2px 2px 2px";
    mobileContactOrganizationRoleTextElement.style.height = "36px";
    mobileContactOrganizationRoleTextElement.style.outline = "none";
    mobileContactOrganizationRoleTextElement.style.resize = "none";
    mobileContactOrganizationRoleTextElement.innerHTML = `${contact.organization_role}`

    const mobileContactSocialMediaContainer = document.createElement("div");
    mobileContactSocialMediaContainer.style.display = "flex";
    mobileContactSocialMediaContainer.style.flexDirection = "column";
    mobileContactSocialMediaContainer.style.width = "95%";
    mobileContactSocialMediaContainer.style.marginBottom = "10px";
    const mobileContactSocialMediaLabelElement = document.createElement("label");
    mobileContactSocialMediaLabelElement.style.fontWeight = "bold";
    mobileContactSocialMediaLabelElement.innerHTML = "Social Media";
    const mobileContactSocialMediaTextElement = document.createElement("textarea");
    mobileContactSocialMediaTextElement.readOnly = "true";
    mobileContactSocialMediaTextElement.style.fontSize = "16px";
    mobileContactSocialMediaTextElement.style.fontFamily = "sans serif";
    mobileContactSocialMediaTextElement.style.border = "1px solid grey";
    mobileContactSocialMediaTextElement.style.boxShadow = "2px 2px 2px";
    mobileContactSocialMediaTextElement.style.height = "36px";
    mobileContactSocialMediaTextElement.style.outline = "none";
    mobileContactSocialMediaTextElement.style.resize = "none";
    mobileContactSocialMediaTextElement.innerHTML = `${contact.social_media}`

    const mobileContactNotesContainer = document.createElement("div");
    // mobileContactNotesContainer.style.position = "absolute";
    mobileContactNotesContainer.style.display = "flex";
    mobileContactNotesContainer.style.flexDirection = "column";
    mobileContactNotesContainer.style.justifyContent = "center";
    mobileContactNotesContainer.style.alignItems = "center";
    mobileContactNotesContainer.style.width = "95%";
    mobileContactNotesContainer.style.height = "6%";
    mobileContactNotesContainer.style.marginTop = "15px"
    // mobileContactNotesContainer.style.top = "84%";
    const mobileContactNotesLabelContainer = document.createElement("div");
    mobileContactNotesLabelContainer.style.display = "flex";
    mobileContactNotesLabelContainer.style.justifyContent = "flex-start";
    mobileContactNotesLabelContainer.style.width = "100%";
    const mobileContactNotesLabelElement = document.createElement("label");
    mobileContactNotesLabelElement.style.fontWeight = "bold";
    mobileContactNotesLabelElement.innerHTML = "Notes";
    const mobileContactNotesTextContainer = document.createElement("div");
    mobileContactNotesTextContainer.style.display = "flex";
    mobileContactNotesTextContainer.style.justifyContent = "flex-start";
    mobileContactNotesTextContainer.style.width = "100%"
    const mobileContactNotesTextElement = document.createElement("textarea");
    mobileContactNotesTextElement.readOnly = "true";
    mobileContactNotesTextElement.style.fontFamily = "sans serif";
    mobileContactNotesTextElement.style.fontSize = "16px";
    mobileContactNotesTextElement.style.width = "100%";
    mobileContactNotesTextElement.style.height = "40px";
    mobileContactNotesTextElement.style.boxShadow = "2px 2px 2px";
    mobileContactNotesTextElement.style.outline = "none";
    mobileContactNotesTextElement.style.resize = "none";
    mobileContactNotesTextElement.innerHTML = contact.notes;

    const mobileEditContactButtonContainer = document.createElement("div");
    // mobileEditContactButtonContainer.style.position = "absolute";
    mobileEditContactButtonContainer.style.display = "flex";
    mobileEditContactButtonContainer.style.alignItems = "center";
    mobileEditContactButtonContainer.style.width = "95%";
    // mobileEditContactButtonContainer.style.top = "86.5%"
    mobileEditContactButtonContainer.style.marginTop = "30px"
    const mobileEditContactButtonDiv = document.createElement("div");
    // mobileEditContactButtonDiv.style.position = "absolute";
    mobileEditContactButtonDiv.style.display = "flex";
    mobileEditContactButtonDiv.style.justifyContent = "space-between";
    mobileEditContactButtonDiv.style.width = "100%";
    const mobileAddContactFavoritesButton = document.createElement("button");
    mobileAddContactFavoritesButton.setAttribute("id", "mobile-add-to-favorites-button");
    mobileAddContactFavoritesButton.innerHTML = "Add to favorites";
    mobileAddContactFavoritesButton.style.backgroundColor = "green";
    mobileAddContactFavoritesButton.style.color = "white";
    const mobileEditContactButtonElement = document.createElement("button");
    mobileEditContactButtonElement.setAttribute("id", "mobile-navigate-edit-contact-page-button");
    mobileEditContactButtonElement.style.width = "50px";
    // mobileEditContactButtonElement.style.marginRight = "1.5%";
    mobileEditContactButtonElement.innerHTML = "Edit";

    if (contact.favorite === true) {
        mobileAddContactFavoritesButton.innerHTML = "Remove favorite";
        mobileAddContactFavoritesButton.style.backgroundColor = "indianred";
    };

    mobileAddContactFavoritesButton.addEventListener("click", function() {
        updateContactFavorite()
    }, false)

    mobileContactFullNameContainer.appendChild(moblieContactFullNameLabelElement);
    mobileContactFullNameContainer.appendChild(mobileContactFullNameTextElement);
    mobileContactInformationColumn.appendChild(mobileContactFullNameContainer);

    mobileContactGenderContainer.appendChild(mobileContactGenderLabelElement);
    mobileContactGenderContainer.appendChild(mobileContactGenderTextElement);
    mobileContactInformationColumn.appendChild(mobileContactGenderContainer);

    mobileContactBirthdayContainer.appendChild(mobileContactBirthdayLabelElement);
    mobileContactBirthdayContainer.appendChild(mobileContactBirthdayTextElement);
    mobileContactInformationColumn.appendChild(mobileContactBirthdayContainer);

    mobileContactEmailContainer.appendChild(mobileContactEmailLabelElement);
    mobileContactEmailContainer.appendChild(mobileContactEmailTextElement);
    mobileContactInformationColumn.appendChild(mobileContactEmailContainer);

    mobileContactPhonenumberContainer.appendChild(mobileContactPhonenumberLabelElement);
    mobileContactPhonenumberContainer.appendChild(mobileContactPhonenumberTextElement);
    mobileContactInformationColumn.appendChild(mobileContactPhonenumberContainer);

    mobileContactAddressContainer.appendChild(mobileContactAddressLabelElement);
    mobileContactAddressContainer.appendChild(mobileContactAddressTextElement);
    mobileContactInformationColumn.appendChild(mobileContactAddressContainer);

    mobileContactOrganizationContainer.appendChild(mobileContactOrganizationLabelElement);
    mobileContactOrganizationContainer.appendChild(mobileContactOrganizationTextElement);
    mobileContactInformationColumn.appendChild(mobileContactOrganizationContainer);

    mobileContactOrganizationRoleContainer.appendChild(mobileContactOrganizationRoleLabelElement);
    mobileContactOrganizationRoleContainer.appendChild(mobileContactOrganizationRoleTextElement);
    mobileContactInformationColumn.appendChild(mobileContactOrganizationRoleContainer);

    mobileContactSocialMediaContainer.appendChild(mobileContactSocialMediaLabelElement);
    mobileContactSocialMediaContainer.appendChild(mobileContactSocialMediaTextElement);
    mobileContactInformationColumn.appendChild(mobileContactSocialMediaContainer);

    mobileContactNotesLabelContainer.appendChild(mobileContactNotesLabelElement);
    mobileContactNotesContainer.appendChild(mobileContactNotesLabelContainer);
    mobileContactNotesTextContainer.appendChild(mobileContactNotesTextElement);
    mobileContactNotesContainer.appendChild(mobileContactNotesTextContainer);

    mobileEditContactButtonDiv.appendChild(mobileAddContactFavoritesButton);
    mobileEditContactButtonDiv.appendChild(mobileEditContactButtonElement);
    mobileEditContactButtonContainer.appendChild(mobileEditContactButtonDiv);

    mobileContactInformationContainer.appendChild(mobileContactInformationColumn);
    mobileContactInformationColumn.appendChild(mobileContactNotesContainer);
    mobileContactInformationColumn.appendChild(mobileEditContactButtonContainer)
    document.body.appendChild(mobileContactInformationContainer)

     if (contact.contact_image !== null) {
    mobileContactImageElement.style.borderRadius = "50%"
    mobileContactImageElement.setAttribute("src", contact.contact_image)
   }

    const navigateEditContactPageButton = document.querySelector("#mobile-navigate-edit-contact-page-button");
    navigateEditContactPageButton.addEventListener("click", function() {
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
        
        const myURL = `${rootUrl}/edit_contact_${contact_id}`;
        const myData = {
            name: `${contact.firstname} ${contact.lastname}`,
            // age: 30,
            // city: "New York"
        };
        
        const newURL = saveDataToURL(myURL, myData);
        console.log(newURL);
        // Expected output: "https://example.com/page?name=John+Doe&age=30&city=New+York"
        window.location.href = newURL
    })
};

async function renderEditContactContent() {
const allUsers = await getAllUsers();
    const sessionId = sessionStorage.getItem("user");
    let matchingUser;
    for (let i = 0; i < allUsers.length; i++) {
        if (allUsers[i].session_id === sessionId) {
            matchingUser = allUsers[i]
        }
    }
    const user_id = matchingUser.user_id;
    const url = window.location.href.toString()
    const urlBeforeQuery = url.split('?')[0];
    // const contact_id = urlBeforeQuery.charAt(urlBeforeQuery.length - 1);
    const contact_id = urlBeforeQuery.split('contact_')[1]
    const contact = await getUserContact(user_id, contact_id);

    const addToFavoritesButton = document.querySelector("#add-to-favorites-button");

    if (contact.favorite === true) {
        addToFavoritesButton.innerHTML = "Remove favorite";
        addToFavoritesButton.style.backgroundColor = "indianred";
    };

    // addToFavoritesButton.addEventListener("click", function() {
    //     updateContactFavorite()
    // }, false)

    const editContactImage = document.querySelector("#edit-contact-image");
    if (contact.contact_image !== null && contact.contact_image !== './images/user-2-svgrepo-com.svg') {
        editContactImage.setAttribute("src", contact.contact_image);
        editContactImage.style.borderRadius = "50%"
    };

    const editContactRemovePhotoButton = document.querySelector("#edit-contact-remove-photo-button");
    editContactRemovePhotoButton.addEventListener("click", function() {
        const editContactAddPhotoInputElement = document.querySelector("#edit-contact-add-photo")
        editContactAddPhotoInputElement.value = ""
        editContactImage.setAttribute("src", "./images/user-2-svgrepo-com.svg")

            if (editContactImage.getAttribute("src") === contact.contact_image) {
                editContactImage.setAttribute("src", "./images/user-2-svgrepo-com.svg")
            } else {
                editContactImage.setAttribute("src", contact.contact_image);
            }
    });

    const editContactAddPhotoButton = document.querySelector("#edit-contact-add-photo-button");
        if (contact.contact_image !== null && contact.contact_image !== './images/user-2-svgrepo-com.svg') {
            editContactAddPhotoButton.innerHTML = "Change Photo";
        };

    editContactAddPhotoButton.addEventListener("click", function() {
        const editContactAddPhotoInputContainerElement = document.querySelector("#edit-contact-add-photo-input-container");
        editContactAddPhotoInputContainerElement.style.display = "none";
        if (editContactAddPhotoButton.innerHTML === "Save Photo") {
            updateContactImage()
        }
    })

    const editContactAddPhotoInputContainerElement = document.querySelector("#edit-contact-add-photo-input-container")
    editContactAddPhotoButton.addEventListener("click", function() {
        console.log("edit photo")
        if (editContactAddPhotoButton.innerHTML !== "Save Photo") {
            editContactAddPhotoInputContainerElement.style.display = "flex";
        }
    });
    const closeEditContactAddPhotoIcon = document.querySelector("#close-edit-contact-add-photo-icon");
    closeEditContactAddPhotoIcon.addEventListener("click", function(event) {
        // window.location.reload()
        editContactImage.setAttribute("src", contact.contact_image);
        const editContactAddPhotoInputElement = document.querySelector("#edit-contact-add-photo");
        editContactAddPhotoInputElement.value = "";
        const editContactAddPhotoInputContainerElement = document.querySelector("#edit-contact-add-photo-input-container")
        editContactAddPhotoInputContainerElement.style.display = "none";
        editContactAddPhotoButton.innerHTML = "Change Photo";
    })
    const editContactAddPhotoSaveButton = document.querySelector("#edit-contact-add-photo-insert-button");
    editContactAddPhotoSaveButton.addEventListener("click", function() {
        // editContactAddPhotoInputContainerElement.style.display = "none";
        const editContactAddPhotoInputElement = document.querySelector("#edit-contact-add-photo");
        console.log(editContactAddPhotoInputElement.files[0])
        if (editContactAddPhotoInputElement.files[0] !== undefined) {
            editContactAddPhotoButton.innerHTML = "Save Photo"
            handleEditContactImage()
        }
    }, false)

    const editContactFirstNameElement = document.querySelector("#edit-contact-firstname");
    const editContactLastNameElement = document.querySelector("#edit-contact-lastname");
    const editContactGenderElement = document.querySelector("#edit-contact-gender")
    const editContactBirthdayElement = document.querySelector("#edit-contact-birthday");
    const editContactEmailAddressElement = document.querySelector("#edit-contact-emailaddress");
    const editContactPhoneNumberElement = document.querySelector("#edit-contact-phonenumber");
    const editContactAddressElement = document.querySelector("#edit-contact-address");
    const editContactOrganizationElement = document.querySelector("#edit-contact-organization");
    const editContactRoleElement = document.querySelector("#edit-contact-role");
    const editContactSocialMediaElement = document.querySelector("#edit-contact-social-media");
    const editContactNotesElement = document.querySelector("#edit-contact-notes");
    editContactNotesElement.style.fontFamily = "sans-serif"

    // const newContactPhoneNumberElement = document.querySelector("#new-contact-phonenumber");
    // const phonenumber = newContactPhoneNumberElement.value
    // console.log(phonenumber)
    editContactPhoneNumberElement.addEventListener("keydown", disableNonNumericKeys)
    editContactPhoneNumberElement.addEventListener("blur", function() {
        formatPhoneNumberForData(editContactPhoneNumberElement)
    });
    editContactPhoneNumberElement.addEventListener("focus", function() {
        resetPhoneNumberFormatOnFocus(editContactPhoneNumberElement)
    });
    editContactPhoneNumberElement.addEventListener("paste", function(event) {
        // event.preventDefault()
        const clipboard = event.clipboardData;
        const pastedText = clipboard.getData("Text")
        // let pastedText = (event.clipboardData || window.clipboardData).getData('text');
        pastedText.replace(/[^0-9]/g, '')
        event.target.value = pastedText;
        // removeNonNumericCharacters(pastedText)
    }, false);
    editContactPhoneNumberElement.addEventListener("input", function() {
        resetPhoneNumberFormatOnFocus(editContactPhoneNumberElement)
    });
    
    editContactFirstNameElement.value = contact.firstname;
    editContactLastNameElement.value = contact.lastname;
    editContactGenderElement.value = contact.gender;
    editContactBirthdayElement.value = contact.birthday;
    editContactEmailAddressElement.value = contact.emailaddress;
    editContactPhoneNumberElement.value = contact.phonenumber;
    editContactAddressElement.value = contact.homeaddress;
    editContactOrganizationElement.value = contact.organization;
    editContactRoleElement.value = contact.organization_role;
    editContactSocialMediaElement.value = contact.social_media;
    editContactNotesElement.value = contact.notes;
    editContactNotesElement.style.fontFamily = "sans-serif";


    const selectGenderElement = document.querySelector("#edit-contact-select-gender");
    const genderOpitonsData = [
        { text: "None", value: "None"},
        { text: "Female", value: "Female" },
        { text: "Male", value: "Male" }
      ];

      const newContactGenderElement = document.querySelector("#edit-contact-gender")
      for (let i = 0; i < genderOpitonsData.length; i++) {
        const option = document.createElement("option");
        // genderOpitonsData[0].style.borderBottom = "1px solid gray"
        option.text = genderOpitonsData[i].text;
        option.value = genderOpitonsData[i].value;

        if (option.text === contact.gender) {
            option.setAttribute("selected", true)
        }

        selectGenderElement.appendChild(option);
      }

      const editContactGenderInputElement = document.querySelector("#edit-contact-gender");
      selectGenderElement.addEventListener('click', function(event) {
        const selectedOptionValue = event.target.value;
        const selectedOptionText = event.target.options[event.target.selectedIndex].text;
        editContactGenderInputElement.value = selectedOptionText;
        // editContactGenderInputElement.style.display = "block"
        // selectGenderElement.style.display = "none"
      
        // Perform actions based on the selected option
        console.log('Selected option value:', selectedOptionValue);
        console.log('Selected option text:', selectedOptionText);
        const enterCustomGenderInputElement = document.querySelector("#enter-custom-gender")
      });

      editContactGenderInputElement.addEventListener("click", function() {
        editContactGenderInputElement.style.display = "none"
        selectGenderElement.style.display = "block";
      });

    //   selectGenderElement.addEventListener("blur", function() {
    //     editContactGenderInputElement.style.display = "block";
    //     selectGenderElement.style.display = "none";
    //   })

    const editContactButton = document.querySelector("#edit-contact-button");
    editContactButton.addEventListener("click", updateContact, false);

    const allUserContactGroupings = await getUserContactGroupings(user_id);
    let removeContactGroupingsArr = []
    for (let i = 0; i < allUserContactGroupings.length; i++) {
        // console.log(allUserContactGroupings[i].contact_id)
        if (allUserContactGroupings[i].contact_id === Number(contact_id)) {
            const contactGroupingObj = {
                userId: user_id,
                contactId: Number(contact_id),
                groupId: allUserContactGroupings[i].group_id
            }
            removeContactGroupingsArr.push(contactGroupingObj)
        }
    };

    console.log(contact_id)
    const deleteContactButton = document.querySelector("#delete-contact-button");
    deleteContactButton.addEventListener("click", function() {
        deleteContact()
        removeContactDeleteContactGroupings(removeContactGroupingsArr)
    }, false);
};

async function renderMobileEditContactContent() {
const allUsers = await getAllUsers();
    const sessionId = sessionStorage.getItem("user");
    let matchingUser;
    for (let i = 0; i < allUsers.length; i++) {
        if (allUsers[i].session_id === sessionId) {
            matchingUser = allUsers[i]
        }
    }
    const user_id = matchingUser.user_id;
    const url = window.location.href.toString()
    const urlBeforeQuery = url.split('?')[0];
    // const contact_id = urlBeforeQuery.charAt(urlBeforeQuery.length - 1);
    const contact_id = urlBeforeQuery.split('contact_')[1]
    const contact = await getUserContact(user_id, contact_id);

    console.log(contact_id)

    const addToFavoritesButton = document.querySelector("#add-to-favorites-button");

    if (contact.favorite === true) {
        addToFavoritesButton.innerHTML = "Remove favorite";
        addToFavoritesButton.style.backgroundColor = "indianred";
    };

    // addToFavoritesButton.addEventListener("click", function() {
    //     updateContactFavorite()
    // }, false)

    const editContactImage = document.querySelector("#mobile-edit-contact-image");
    if (contact.contact_image !== null && contact.contact_image !== './images/user-2-svgrepo-com.svg') {
        editContactImage.setAttribute("src", contact.contact_image);
        editContactImage.style.borderRadius = "50%"
    };

    const editContactAddPhotoButton = document.querySelector("#mobile-edit-contact-add-photo-button");
    const editContactRemovePhotoButton = document.querySelector("#mobile-edit-contact-remove-photo-button");
    editContactRemovePhotoButton.addEventListener("click", function() {
        const editContactAddPhotoInputElement = document.querySelector("#mobile-edit-contact-add-photo")
        editContactAddPhotoInputElement.value = ""
        if (editContactImage.getAttribute("src") !== "./images/user-2-svgrepo-com.svg") {
            editContactAddPhotoButton.innerHTML = "Save Photo"
        }
        editContactImage.setAttribute("src", "./images/user-2-svgrepo-com.svg")
    })

    if (contact.contact_image !== null && contact.contact_image !== './images/user-2-svgrepo-com.svg') {
        editContactAddPhotoButton.innerHTML = "Change Photo"
    }

    editContactAddPhotoButton.addEventListener("click", function() {
        const editContactAddPhotoInputContainerElement = document.querySelector("#mobile-edit-contact-add-photo-input-container");
        editContactAddPhotoInputContainerElement.style.display = "none";
        if (editContactAddPhotoButton.innerHTML === "Save Photo") {
            mobileUpdateContactImage()
        }
    })

    const editContactAddPhotoInputContainerElement = document.querySelector("#mobile-edit-contact-add-photo-input-container")
    editContactAddPhotoButton.addEventListener("click", function() {
        console.log("edit photo")
        if (editContactAddPhotoButton.innerHTML !== "Save Photo") {
            editContactAddPhotoInputContainerElement.style.display = "flex";
        }
    });
    const closeEditContactAddPhotoIcon = document.querySelector("#mobile-close-edit-contact-add-photo-icon");
    closeEditContactAddPhotoIcon.addEventListener("click", function(event) {
        window.location.reload()
    })
    const editContactAddPhotoSaveButton = document.querySelector("#mobile-edit-contact-add-photo-insert-button");
    editContactAddPhotoSaveButton.addEventListener("click", function() {
        // editContactAddPhotoInputContainerElement.style.display = "none";
        const editContactAddPhotoInputElement = document.querySelector("#mobile-edit-contact-add-photo");
        console.log(editContactAddPhotoInputElement.files[0])
        if (editContactAddPhotoInputElement.files[0] !== undefined) {
            editContactAddPhotoButton.innerHTML = "Save Photo"
            handleMobileEditContactImage()
        }
    }, false)

    requestAnimationFrame(() => {
        const screenWidth = window.innerWidth;
        const screenHeight = window.innerHeight;
        const mobileEditContactHeaderElement = document.querySelector("#mobile-edit-contact-header-container");
        const mobileEditContactHeaderElementHeight = mobileEditContactHeaderElement.clientHeight;
        const mobileEditContactImageCircleElement = document.querySelector("#mobile-edit-contact-image-circle");
        const mobileEditContactFavoriteSquareElement = document.querySelector("#mobile-edit-contact-favorite-square")
        const newWidth = (80 / 100) * mobileEditContactHeaderElementHeight
        const newWidthStr = newWidth.toString() + "px"

        mobileEditContactImageCircleElement.style.width = newWidthStr
        mobileEditContactFavoriteSquareElement.style.width = newWidthStr

        const mobileEditContactAddPhotoButtonContainerMarginLeft = mobileEditContactImageCircleElement.clientWidth + 5;
        const  mobileEditContactAddPhotoButtonContainerMarginLeftStr =  mobileEditContactAddPhotoButtonContainerMarginLeft.toString() + "px"
        const mobileEditContactAddPhotoButtonContainer = document.querySelector("#mobile-edit-contact-add-photo-button-container")
        mobileEditContactAddPhotoButtonContainer.style.marginLeft = mobileEditContactAddPhotoButtonContainerMarginLeftStr;
    });

    const editContactFirstNameElement = document.querySelector("#mobile-edit-contact-firstname");
    const editContactLastNameElement = document.querySelector("#mobile-edit-contact-lastname");
    const editContactGenderElement = document.querySelector("#mobile-edit-contact-gender")
    const editContactBirthdayElement = document.querySelector("#mobile-edit-contact-birthday");
    const editContactEmailAddressElement = document.querySelector("#mobile-edit-contact-emailaddress");
    const editContactPhoneNumberElement = document.querySelector("#mobile-edit-contact-phonenumber");
    const editContactAddressElement = document.querySelector("#mobile-edit-contact-address");
    const editContactOrganizationElement = document.querySelector("#mobile-edit-contact-organization");
    const editContactRoleElement = document.querySelector("#mobile-edit-contact-role");
    const editContactSocialMediaElement = document.querySelector("#mobile-edit-contact-social-media");
    const editContactNotesElement = document.querySelector("#mobile-edit-contact-notes");
    editContactNotesElement.style.fontFamily = "sans-serif"

    // const newContactPhoneNumberElement = document.querySelector("#new-contact-phonenumber");
    // const phonenumber = newContactPhoneNumberElement.value
    // console.log(phonenumber)
    editContactPhoneNumberElement.addEventListener("keydown", disableNonNumericKeys)
    editContactPhoneNumberElement.addEventListener("blur", function() {
        formatPhoneNumberForData(editContactPhoneNumberElement)
    });
    editContactPhoneNumberElement.addEventListener("focus", function() {
        resetPhoneNumberFormatOnFocus(editContactPhoneNumberElement)
    });
    
    editContactFirstNameElement.value = contact.firstname;
    editContactLastNameElement.value = contact.lastname;
    editContactGenderElement.value = contact.gender;
    editContactBirthdayElement.value = contact.birthday;
    editContactEmailAddressElement.value = contact.emailaddress;
    editContactPhoneNumberElement.value = contact.phonenumber;
    editContactAddressElement.value = contact.homeaddress;
    editContactOrganizationElement.value = contact.organization;
    editContactRoleElement.value = contact.organization_role;
    editContactSocialMediaElement.value = contact.social_media;
    editContactNotesElement.value = contact.notes;
    editContactNotesElement.style.fontFamily = "sans-serif";

    const selectGenderElement = document.querySelector("#mobile-edit-contact-select-gender");
    const genderOpitonsData = [
        { text: "None", value: "None"},
        { text: "Female", value: "Female" },
        { text: "Male", value: "Male" }
      ];

      const newContactGenderElement = document.querySelector("#mobile-edit-contact-gender")
      for (let i = 0; i < genderOpitonsData.length; i++) {
        const option = document.createElement("option");
        // genderOpitonsData[0].style.borderBottom = "1px solid gray"
        option.text = genderOpitonsData[i].text;
        option.value = genderOpitonsData[i].value;

        if (option.text === contact.gender) {
            option.setAttribute("selected", true)
        }

        selectGenderElement.appendChild(option);
      }

      const editContactGenderInputElement = document.querySelector("#mobile-edit-contact-gender");
      selectGenderElement.addEventListener('click', function(event) {
        const selectedOptionValue = event.target.value;
        const selectedOptionText = event.target.options[event.target.selectedIndex].text;
        editContactGenderInputElement.value = selectedOptionText;
        // editContactGenderInputElement.style.display = "block"
        // selectGenderElement.style.display = "none"
      
        // Perform actions based on the selected option
        console.log('Selected option value:', selectedOptionValue);
        console.log('Selected option text:', selectedOptionText);
        const enterCustomGenderInputElement = document.querySelector("#mobile-enter-custom-gender")
      });

      editContactGenderInputElement.addEventListener("click", function() {
        editContactGenderInputElement.style.display = "none"
        selectGenderElement.style.display = "block";
      });

    //   selectGenderElement.addEventListener("blur", function() {
    //     editContactGenderInputElement.style.display = "block";
    //     selectGenderElement.style.display = "none";
    //   })

    const editContactButton = document.querySelector("#mobile-edit-contact-button");
    editContactButton.addEventListener("click", mobileUpdateContact, false);

    const deleteContactButton = document.querySelector("#mobile-delete-contact-button");
    deleteContactButton.addEventListener("click", deleteContact, false);

    document.body.style.overflow = "hidden"
}

async function handleEditContactImage() {
const allUsers = await getAllUsers();
    const sessionId = sessionStorage.getItem("user");
    let matchingUser;
    for (let i = 0; i < allUsers.length; i++) {
        if (allUsers[i].session_id === sessionId) {
            matchingUser = allUsers[i]
        }
    }
    const user_id = matchingUser.user_id;
    const url = window.location.href.toString()
    const urlBeforeQuery = url.split('?')[0];
    const contact_id = urlBeforeQuery.split('contact_')[1]
    // const contact_id = urlBeforeQuery.charAt(urlBeforeQuery.length - 1);
    const contact = await getUserContact(user_id, contact_id)
    const editContactImageElement = document.querySelector("#edit-contact-image");
    let editContactImageFile;
    let editContactImage;
    const editUserAddPhotoInputElement = document.querySelector("#edit-contact-add-photo")
    // editUserAddPhotoInputElement.addEventListener("change", function(event) {
        // event.preventDefault();

        editContactImageFile = editUserAddPhotoInputElement.files[0];
        let reader = new FileReader()

        reader.onload = function () {
            base64string = reader.result.split(',')[1]
            editContactImage = reader.result;
            editContactImageElement.setAttribute("src", reader.result);
            editContactImageElement.style.borderRadius = "50%"
        };

        if (editContactImageFile !== undefined) {
            reader.readAsDataURL(editContactImageFile)
        } else {
            editContactImageElement.setAttribute("src", './images/user-2-svgrepo-com.svg')
        }

        const editContactImageObject = {
            // userId: contact.user_id,
            // contactId: contact.contact_id,
            firstname: contact.firstname,
            lastname: contact.lastname,
            gender: contact.gender,
            birthday: contact.birthday,
            emailaddress: contact.emailaddress,
            phonenumber: contact.phonenumber,
            address: contact.homeaddress,
            organization: contact.organization,
            role: contact.organization_role,
            socialMedia: contact.social_media,
            notes: contact.notes,
            favorite: contact.favorite,
            contactImage: editContactImageElement.getAttribute("src")
        };

        return editContactImageObject
    // })
};

async function handleMobileEditContactImage() {
const allUsers = await getAllUsers();
    const sessionId = sessionStorage.getItem("user");
    let matchingUser;
    for (let i = 0; i < allUsers.length; i++) {
        if (allUsers[i].session_id === sessionId) {
            matchingUser = allUsers[i]
        }
    }
    const user_id = matchingUser.user_id;
    const url = window.location.href.toString()
    const urlBeforeQuery = url.split('?')[0];
    const contact_id = urlBeforeQuery.split('contact_')[1]
    // const contact_id = urlBeforeQuery.charAt(urlBeforeQuery.length - 1);
    const contact = await getUserContact(user_id, contact_id)
    const editContactImageElement = document.querySelector("#mobile-edit-contact-image");
    let editContactImageFile;
    let editContactImage;
    const editUserAddPhotoInputElement = document.querySelector("#mobile-edit-contact-add-photo")
    // editUserAddPhotoInputElement.addEventListener("change", function(event) {
        // event.preventDefault();

        editContactImageFile = editUserAddPhotoInputElement.files[0];
        let reader = new FileReader()

        reader.onload = function () {
            base64string = reader.result.split(',')[1]
            editContactImage = reader.result;
            editContactImageElement.setAttribute("src", reader.result);
            editContactImageElement.style.borderRadius = "50%"
        };

        if (editContactImageFile !== undefined) {
            reader.readAsDataURL(editContactImageFile)
        } else {
            editContactImageElement.setAttribute("src", './images/user-2-svgrepo-com.svg')
        }

        const editContactImageObject = {
            // userId: contact.user_id,
            // contactId: contact.contact_id,
            firstname: contact.firstname,
            lastname: contact.lastname,
            gender: contact.gender,
            birthday: contact.birthday,
            emailaddress: contact.emailaddress,
            phonenumber: contact.phonenumber,
            address: contact.homeaddress,
            organization: contact.organization,
            role: contact.organization_role,
            socialMedia: contact.social_media,
            notes: contact.notes,
            favorite: contact.favorite,
            contactImage: editContactImageElement.getAttribute("src")
        };

        return editContactImageObject
    // })
}

async function handleEditContactInput() {
const allUsers = await getAllUsers();
    const sessionId = sessionStorage.getItem("user");
    let matchingUser;
    for (let i = 0; i < allUsers.length; i++) {
        if (allUsers[i].session_id === sessionId) {
            matchingUser = allUsers[i]
        }
    }
    const user_id = matchingUser.user_id;
    const url = window.location.href.toString()
    const urlBeforeQuery = url.split('?')[0];
    const contact_id = urlBeforeQuery.split('contact_')[1]
    // const contact_id = urlBeforeQuery.charAt(urlBeforeQuery.length - 1);
    const contact = await getUserContact(user_id, contact_id);

    const editContactImageElement = document.querySelector("#edit-contact-image");
    const editContactFirstNameElement = document.querySelector("#edit-contact-firstname");
    const editContactLastNameElement = document.querySelector("#edit-contact-lastname");
    const editContactGenderElement = document.querySelector("#edit-contact-gender")
    const editContactBirthdayElement = document.querySelector("#edit-contact-birthday");
    const editContactEmailAddressElement = document.querySelector("#edit-contact-emailaddress");
    const editContactPhoneNumberElement = document.querySelector("#edit-contact-phonenumber");
    const editContactAddressElement = document.querySelector("#edit-contact-address");
    const editContactOrganizationElement = document.querySelector("#edit-contact-organization");
    const editContactRoleElement = document.querySelector("#edit-contact-role");
    const editContactSocialMediaElement = document.querySelector("#edit-contact-social-media");
    const editContactNotesElement = document.querySelector("#edit-contact-notes")

    const editContactObject = {
        // userId: contact.user_id,
        // contactId: contact.contact_id,
        firstname: editContactFirstNameElement.value,
        lastname: editContactLastNameElement.value,
        gender: editContactGenderElement.value,
        birthday: editContactBirthdayElement.value,
        emailaddress: editContactEmailAddressElement.value,
        phonenumber: editContactPhoneNumberElement.value,
        address: editContactAddressElement.value,
        organization: editContactOrganizationElement.value,
        role: editContactRoleElement.value,
        socialMedia: editContactSocialMediaElement.value,
        favorite: contact.favorite,
        notes: editContactNotesElement.value,
        contactImage: editContactImageElement.getAttribute("src")
    };

    return editContactObject
};

async function handleMobileEditContactInput() {
const allUsers = await getAllUsers();
    const sessionId = sessionStorage.getItem("user");
    let matchingUser;
    for (let i = 0; i < allUsers.length; i++) {
        if (allUsers[i].session_id === sessionId) {
            matchingUser = allUsers[i]
        }
    }
    const user_id = matchingUser.user_id;
    const url = window.location.href.toString()
    const urlBeforeQuery = url.split('?')[0];
    const contact_id = urlBeforeQuery.split('contact_')[1]
    // const contact_id = urlBeforeQuery.charAt(urlBeforeQuery.length - 1);
    const contact = await getUserContact(user_id, contact_id);

    const editContactImageElement = document.querySelector("#mobile-edit-contact-image");
    const editContactFirstNameElement = document.querySelector("#mobile-edit-contact-firstname");
    const editContactLastNameElement = document.querySelector("#mobile-edit-contact-lastname");
    const editContactGenderElement = document.querySelector("#mobile-edit-contact-select-gender")
    const editContactBirthdayElement = document.querySelector("#mobile-edit-contact-birthday");
    const editContactEmailAddressElement = document.querySelector("#mobile-edit-contact-emailaddress");
    const editContactPhoneNumberElement = document.querySelector("#mobile-edit-contact-phonenumber");
    const editContactAddressElement = document.querySelector("#mobile-edit-contact-address");
    const editContactOrganizationElement = document.querySelector("#mobile-edit-contact-organization");
    const editContactRoleElement = document.querySelector("#mobile-edit-contact-role");
    const editContactSocialMediaElement = document.querySelector("#mobile-edit-contact-social-media");
    const editContactNotesElement = document.querySelector("#mobile-edit-contact-notes")

    const editContactObject = {
        // userId: contact.user_id,
        // contactId: contact.contact_id,
        firstname: editContactFirstNameElement.value,
        lastname: editContactLastNameElement.value,
        gender: editContactGenderElement.value,
        birthday: editContactBirthdayElement.value,
        emailaddress: editContactEmailAddressElement.value,
        phonenumber: editContactPhoneNumberElement.value,
        address: editContactAddressElement.value,
        organization: editContactOrganizationElement.value,
        role: editContactRoleElement.value,
        socialMedia: editContactSocialMediaElement.value,
        favorite: contact.favorite,
        notes: editContactNotesElement.value,
        contactImage: editContactImageElement.getAttribute("src")
    };

    return editContactObject
}

async function renderFavoriteContactsListContent() {
const allUsers = await getAllUsers();
    const sessionId = sessionStorage.getItem("user");
    let matchingUser;
    for (let i = 0; i < allUsers.length; i++) {
        if (allUsers[i].session_id === sessionId) {
            matchingUser = allUsers[i]
        }
    }
    const userId = matchingUser.user_id;
    const user = await getUser(userId);
    const userContacts = await getUserContacts(userId);

    const favoritesListUserImage = document.querySelector("#favorites-user-image");
    if (user.user_image !== null && user.user_image !== './images/user-5-svgrepo-com.svg') {
        favoritesListUserImage.setAttribute("src", user.user_image);
        favoritesListUserImage.style.borderRadius = "50%"
    }

    const favoritesHeaderUserName = document.querySelector("#favorites-header-user-name");
    favoritesHeaderUserName.innerHTML = `${user.firstname} ${user.lastname}`;
    const favaoritesHeaderUserEmail = document.querySelector("#favorites-header-user-email");
    favaoritesHeaderUserEmail.innerHTML = user.emailaddress;

    const favoriteContactsUserNameElement = document.querySelector("#favorites-user-name");
    const favoriteContactsUserEmailAddressElement = document.querySelector("#favorits-user-email")
    favoriteContactsUserNameElement.innerHTML = `${user.firstname}'s Favorites`;
    favoriteContactsUserNameElement.style.fontFamily = "Arial";
    // favoriteContactsUserNameElement.style.fontSize = "xx-large"
    // favoriteContactsUserEmailAddressElement.innerHTML = `${user.emailaddress}`

    console.log(userContacts)

    let favoriteContacts = [];
    for (let i = 0; i < userContacts.length; i++) {
        if (userContacts[i].favorite === true) {
            favoriteContacts.push(userContacts[i])
        }
    }

    favoriteContacts.sort(function(a, b) {
        if (a.firstname < b.firstname) {
            return -1;
        }
        if (a.firstname < b.firstname) {
            return 1;
        }
        
        var aFirstChar = a.firstname.charAt(0);
        var bFirstChar = b.firstname.charAt(0);
        if (aFirstChar > bFirstChar) {
          return 1;
        } else if (aFirstChar < bFirstChar) {
          return -1;
        } else {
          var aLastChar = a.lastname.charAt(0);
          var bLastChar = b.lastname.charAt(0);
          if (aLastChar === "") {
            aLastChar = "z"
          }
          if (bLastChar === "") {
            bLastChar = "z"
          }
          if (aLastChar > bLastChar) {
            return 1;
          } else if (aLastChar < bLastChar) {
            return -1;
          } else {
            return 0;
          }    
        }
      });

    const favoriteContactsListContainer = document.createElement("div");
    const favoriteContactsHeaderContainer = document.createElement("div");
    favoriteContactsHeaderContainer.style.display = "flex";
    // favoriteContactsHeaderContainer.style.justifyContent = "space-between"
    favoriteContactsHeaderContainer.style.alignItems = "center"
    // favoriteContactsHeaderContainer.style.width = "25%";
    favoriteContactsHeaderContainer.style.backgroundColor = "ghostwhite";
    favoriteContactsHeaderContainer.style.borderTop = "3px solid black";
    favoriteContactsHeaderContainer.style.borderBottom = "3px solid black";
    // favoriteContactsHeaderContainer.style.marginBottom = "5px"
    favoriteContactsHeaderContainer.style.padding = "5px"
    const myFavoriteContactsHeaderElement = document.createElement("h2");
    myFavoriteContactsHeaderElement.innerHTML = "My Favorites";
    myFavoriteContactsHeaderElement.style.width = "140px";
    myFavoriteContactsHeaderElement.style.margin = "0";
    myFavoriteContactsHeaderElement.style.marginLeft = "5px";
    // myFavoriteContactsHeaderElement.style.marginRight = "10px"
    const numberOfFavoriteContactsElement = document.createElement("h2");
    numberOfFavoriteContactsElement.innerHTML = favoriteContacts.length;
    numberOfFavoriteContactsElement.style.display = "inline-flex";
    numberOfFavoriteContactsElement.style.justifyContent = "center";
    numberOfFavoriteContactsElement.style.alignItems = "center";
    numberOfFavoriteContactsElement.style.width = "15px";
    numberOfFavoriteContactsElement.style.height = "15px";
    numberOfFavoriteContactsElement.style.backgroundColor = "navy";
    numberOfFavoriteContactsElement.style.color = "white"
    numberOfFavoriteContactsElement.style.padding = "10px";
    numberOfFavoriteContactsElement.style.borderRadius = "50%";
    numberOfFavoriteContactsElement.style.margin = "0"
    favoriteContactsListContainer.style.position = "absolute";
    favoriteContactsListContainer.style.top = "28.2%"
    favoriteContactsListContainer.style.left = "31.5%"
    favoriteContactsListContainer.style.width = "68.5%"
    const favoriteContactsList = document.createElement("ul");
    favoriteContactsList.style.listStyle = "none";
    favoriteContactsList.style.padding = "0"
    favoriteContactsList.style.margin = "0"
    favoriteContacts.forEach(contact => {
        const favoriteContactListItem = document.createElement("div");
        favoriteContactListItem.style.display = "flex";
        favoriteContactListItem.style.flexDirection = "row";
        favoriteContactListItem.style.height = "70px"
        favoriteContactListItem.style.borderTop = "2px solid black";
        favoriteContactListItem.style.borderBlock = "2px solid black";
        favoriteContactListItem.style.backgroundColor = "ghostwhite";
        favoriteContactListItem.style.marginTop = "1px";
        favoriteContactListItem.style.marginBottom = "1px";
        favoriteContactListItem.setAttribute("contactId", contact.contact_id)

        favoriteContactListItem.addEventListener("mouseover", function() {
            favoriteContactListItem.style.backgroundColor = "lightgreen";
        });

        favoriteContactListItem.addEventListener("mouseout", function() {
            favoriteContactListItem.style.backgroundColor = "ghostwhite";
        });

        favoriteContactListItem.addEventListener("click", function(event) {
            
            if (!event.target.classList.contains("contact-favorite-icon")) {
                // favoriteContactListItem.style.backgroundColor = "green";
                
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
                
                const myURL = `${rootUrl}/contact_${contact.contact_id}`;
                const myData = {
                    name: `${contact.firstname} ${contact.lastname}`,
                    // age: 30,
                    // city: "New York"
                };
                
                const newURL = saveDataToURL(myURL, myData);
                console.log(newURL);
                // Expected output: "https://example.com/page?name=John+Doe&age=30&city=New+York"
                window.location.href = newURL
            }
        })

        const favoriteContactListItemImageContainer = document.createElement("div");
        favoriteContactListItemImageContainer.style.display = "flex";
        favoriteContactListItemImageContainer.style.alignItems = "center";
        // favoriteContactListItemImageContainer.style.width = "15%"
        favoriteContactListItemImageContainer.style.padding = "10px"
        const favoriteContactListItemImage = document.createElement("img");
        favoriteContactListItemImage.style.width = "57px";
        favoriteContactListItemImage.style.height = "57px";
        favoriteContactListItemImage.style.border = "0.5px solid grey";
        favoriteContactListItemImage.style.borderRadius = "50%";
        favoriteContactListItemImage.style.backgroundColor = "gainsboro";
        favoriteContactListItemImage.style.boxShadow = "2px 2px 2px";
        favoriteContactListItemImage.style.objectFit = "cover"

        if (contact.contact_image !== null) {
            favoriteContactListItemImage.setAttribute("src", contact.contact_image);
        } else {
            favoriteContactListItemImage.setAttribute("src", "./images/user-2-svgrepo-com.svg");
        }

        // contactListItem.innerHTML = `${contact.firstname} ${contact.lastname}`;
        const favoriteContactListNameContainer = document.createElement("div");
        favoriteContactListNameContainer.style.display = "flex";
        favoriteContactListNameContainer.style.flexDirection = "column"
        favoriteContactListNameContainer.style.justifyContent = "center";
        favoriteContactListNameContainer.style.alignItems = "center";
        favoriteContactListNameContainer.style.width = "100%"
        const favoriteContactListNameElement = document.createElement("h3");
        favoriteContactListNameElement.style.margin = "0";
        favoriteContactListNameElement.innerHTML = `${contact.firstname} ${contact.lastname}`;
        const favoriteContactListEmailElement = document.createElement("p");
        favoriteContactListEmailElement.style.fontStyle = "italic"
        favoriteContactListEmailElement.style.margin = "0"

        
        console.log(contact)
        
        if (contact.emailaddress !== null && contact.emailaddress !== "") {
            favoriteContactListEmailElement.innerHTML = contact.emailaddress;
        } else {
            favoriteContactListEmailElement.innerHTML = "text";
            favoriteContactListEmailElement.style.visibility = "hidden";
        }

        const favoriteContactListOrganizationAndRoleElement = document.createElement("p");
        favoriteContactListOrganizationAndRoleElement.style.fontWeight = "bolder";
        favoriteContactListOrganizationAndRoleElement.style.margin = "0";
    
        if (contact.organization !== null && contact.organization !== "" && contact.organization_role !== null && contact.organization_role !== "") {
            favoriteContactListOrganizationAndRoleElement.innerHTML = `${contact.organization} || ${contact.organization_role}`
        } else if (contact.organization !== null && contact.organization !== "" || contact.organization_role === null && contact.organization_role === "") {
            favoriteContactListOrganizationAndRoleElement.innerHTML = `${contact.organization}`
        } else if (contact.organization === null && contact.organization === "" || contact.organization_role !== null && contact.organization_role !== "") {
            favoriteContactListOrganizationAndRoleElement.innerHTML = `${contact.organization_role}`
        } else {
            favoriteContactListOrganizationAndRoleElement.innerHTML = "text"
            favoriteContactListOrganizationAndRoleElement.style.visibility = "hidden"
        }
    
        const favoriteContactListFavoritesStarIconContainer = document.createElement("div");
        favoriteContactListFavoritesStarIconContainer.style.display = "flex";
        favoriteContactListFavoritesStarIconContainer.style.justifyContent = "center";
        favoriteContactListFavoritesStarIconContainer.style.alignItems = "center"
        favoriteContactListFavoritesStarIconContainer.style.padding = "10px"
        // favoriteContactListFavoritesStarIconContainer.style.width = "15%";
        const favoriteContactListFavoriteStarImg = document.createElement("img");
        favoriteContactListFavoriteStarImg.classList.add("contact-favorite-icon")
        favoriteContactListFavoriteStarImg.style.width = "50px"

        // contactListFavoriteStarImg.addEventListener("click", function(event) {
        //     // event.preventDefault()
        //     updateContactFavorite()
        // }, false)
        
        favoriteContactListFavoriteStarImg.setAttribute("src", "./images/star-gold-svgrepo-com.svg");
        if (contact.favorite === null || contact.favorite === false) {
            favoriteContactListFavoriteStarImg.style.display = "none"
        } else {
            favoriteContactListFavoriteStarImg.style.display = "block"
        };

        requestAnimationFrame(() => {
            const favoriteContactListNameElementWidth = favoriteContactListNameElement.clientWidth;
            const favoriteContactListNameElementText = favoriteContactListNameElement.innerHTML;
            const firstFavoriteContactListNameElementSlice = favoriteContactListNameElementText.slice(0, 31);
            const secondFavoriteContactListNameElementSlice = favoriteContactListNameElementText.slice(0, 26);
            const thirdFavoriteContactListNameElementSlice = favoriteContactListNameElementText.slice(0, 21);
            const fourthFavoriteContactListNameElementSlice = favoriteContactListNameElementText.slice(0, 16);
            const favoriteContactListEmailElementWidth = favoriteContactListEmailElement.clientWidth;
            const favoriteContactListEmailElementText = favoriteContactListEmailElement.innerHTML;
            const favoriteContactListEmailElementTextSlice = favoriteContactListEmailElementText.slice(0, 60);
            const favoriteContactListEmailElementTextSecondSlice = favoriteContactListEmailElementText.slice(0, 50);
            const favoriteContactListOrganizationAndRoleElementWidth = favoriteContactListOrganizationAndRoleElement.clientWidth;

            const ellipsis = '...'

            if (favoriteContactListNameElementWidth > 400) {
                favoriteContactListNameElement.innerHTML = firstFavoriteContactListNameElementSlice + ellipsis;
            };
            if (favoriteContactListNameElementWidth > 400) {
                favoriteContactListNameElement.innerHTML = secondFavoriteContactListNameElementSlice + ellipsis;
            };
            if (favoriteContactListNameElementWidth > 400) {
                favoriteContactListNameElement.innerHTML = thirdFavoriteContactListNameElementSlice + ellipsis;
            };
            if (favoriteContactListNameElementWidth > 400) {
                favoriteContactListNameElement.innerHTML = fourthFavoriteContactListNameElementSlice + ellipsis;
            };

            // console.log(favoriteContactListEmailElementWidth)
            if (favoriteContactListEmailElementWidth > 400) {
                favoriteContactListEmailElement.innerHTML = favoriteContactListEmailElementTextSlice + ellipsis;
            };
            if (favoriteContactListEmailElementWidth > 400) {
                favoriteContactListEmailElement.innerHTML = favoriteContactListEmailElementTextSecondSlice + ellipsis;
            };

            const favoriteContactListOrganizationAndRoleElementText = favoriteContactListOrganizationAndRoleElement.innerHTML;
            const favoriteContactListOrganizationAndRoleElementTextSlice = favoriteContactListOrganizationAndRoleElementText.slice(0, 40);
            // console.log(favoriteContactListOrganizationAndRoleElementWidth)
            if (favoriteContactListOrganizationAndRoleElementWidth > 400) {
                favoriteContactListOrganizationAndRoleElement.innerHTML = favoriteContactListOrganizationAndRoleElementTextSlice + ellipsis;
            };
        });
        
        favoriteContactListItemImageContainer.appendChild(favoriteContactListItemImage);
        favoriteContactListNameContainer.appendChild(favoriteContactListNameElement);
        favoriteContactListNameContainer.appendChild(favoriteContactListEmailElement);
        favoriteContactListNameContainer.appendChild(favoriteContactListOrganizationAndRoleElement);
        favoriteContactListItem.appendChild(favoriteContactListItemImageContainer)
        favoriteContactListItem.appendChild(favoriteContactListNameContainer)
        favoriteContactListFavoritesStarIconContainer.appendChild(favoriteContactListFavoriteStarImg);
        favoriteContactListItem.appendChild(favoriteContactListFavoritesStarIconContainer);
        favoriteContactsList.appendChild(favoriteContactListItem)
    });
    favoriteContactsHeaderContainer.append(myFavoriteContactsHeaderElement)
    favoriteContactsHeaderContainer.appendChild(numberOfFavoriteContactsElement)
    favoriteContactsListContainer.appendChild(favoriteContactsHeaderContainer)
    favoriteContactsListContainer.appendChild(favoriteContactsList)
    document.body.appendChild(favoriteContactsListContainer)
}

async function renderMobileFavoriteContactsListContent() {
const allUsers = await getAllUsers();
    const sessionId = sessionStorage.getItem("user");
    let matchingUser;
    for (let i = 0; i < allUsers.length; i++) {
        if (allUsers[i].session_id === sessionId) {
            matchingUser = allUsers[i]
        }
    }
    const userId = matchingUser.user_id;
    const user = await getUser(userId);
    const userContacts = await getUserContacts(userId);

    const favoritesListUserImage = document.querySelector("#mobile-favorites-user-image");
    if (user.user_image !== null && user.user_image !== './images/user-5-svgrepo-com.svg') {
        favoritesListUserImage.setAttribute("src", user.user_image);
        favoritesListUserImage.style.borderRadius = "50%"
    }

    // const favoritesHeaderUserName = document.querySelector("#mobile-favorites-header-user-name");
    // favoritesHeaderUserName.innerHTML = `${user.firstname} ${user.lastname}`;
    // const favaoritesHeaderUserEmail = document.querySelector("#mobile-favorites-header-user-email");
    // favaoritesHeaderUserEmail.innerHTML = user.emailaddress;

    const favoriteContactsUserNameElement = document.querySelector("#mobile-favorites-user-name");
    const favoriteContactsUserEmailAddressElement = document.querySelector("#mobile-favorits-user-email")
    favoriteContactsUserNameElement.innerHTML = `${user.firstname} ${user.lastname}`;
    favoriteContactsUserNameElement.style.fontFamily = "Arial";
    // favoriteContactsUserNameElement.style.fontSize = "xx-large"
    // favoriteContactsUserEmailAddressElement.innerHTML = `${user.emailaddress}`

       requestAnimationFrame(() => {
        const screenWidth = window.innerWidth;
        const screenHeight = window.innerHeight;
        const mobileFavoritesListHeaderElement = document.querySelector("#mobile-favorites-list-header-user-container");
        const mobileFavoritesListHeaderElementHeight = mobileFavoritesListHeaderElement.clientHeight;
        const mobileFavoritesListImageCircleElement = document.querySelector("#mobile-favorites-list-header-user-image-circle");
        const mobileFavoritesListSquareElement = document.querySelector("#mobile-favorites-list-header-user-favorite-square")
        const newWidth = (80 / 100) * mobileFavoritesListHeaderElementHeight
        const newWidthStr = newWidth.toString() + "px"

        mobileFavoritesListImageCircleElement.style.width = newWidthStr
        mobileFavoritesListSquareElement.style.width = newWidthStr
    });

    // console.log(userContacts)

    let favoriteContacts = [];
    for (let i = 0; i < userContacts.length; i++) {
        if (userContacts[i].favorite === true) {
            favoriteContacts.push(userContacts[i])
        }
    }

    favoriteContacts.sort(function(a, b) {
        if (a.firstname < b.firstname) {
            return -1;
        }
        if (a.firstname < b.firstname) {
            return 1;
        }
        
        var aFirstChar = a.firstname.charAt(0);
        var bFirstChar = b.firstname.charAt(0);
        if (aFirstChar > bFirstChar) {
          return 1;
        } else if (aFirstChar < bFirstChar) {
          return -1;
        } else {
          var aLastChar = a.lastname.charAt(0);
          var bLastChar = b.lastname.charAt(0);
          if (aLastChar === "") {
            aLastChar = "z"
          }
          if (bLastChar === "") {
            bLastChar = "z"
          }
          if (aLastChar > bLastChar) {
            return 1;
          } else if (aLastChar < bLastChar) {
            return -1;
          } else {
            return 0;
          }    
        }
      });

    const favoriteContactsListContainer = document.createElement("div");
    const favoriteContactsHeaderContainer = document.createElement("div");
    favoriteContactsHeaderContainer.style.display = "flex";
    // favoriteContactsHeaderContainer.style.justifyContent = "space-between"
    favoriteContactsHeaderContainer.style.alignItems = "center"
    // favoriteContactsHeaderContainer.style.width = "25%";
    favoriteContactsHeaderContainer.style.backgroundColor = "ghostwhite"
    // favoriteContactsHeaderContainer.style.marginBottom = "5px"
    favoriteContactsHeaderContainer.style.padding = "5px"
    const myFavoriteContactsHeaderElement = document.createElement("h2");
    myFavoriteContactsHeaderElement.innerHTML = "My Favorites"
    myFavoriteContactsHeaderElement.style.width = "140px"
    myFavoriteContactsHeaderElement.style.margin = "0"
    myFavoriteContactsHeaderElement.style.marginLeft = "5px"
    // myFavoriteContactsHeaderElement.style.marginRight = "10px"
    const numberOfFavoriteContactsElement = document.createElement("h2");
    numberOfFavoriteContactsElement.innerHTML = favoriteContacts.length;
    numberOfFavoriteContactsElement.style.display = "inline-flex";
    numberOfFavoriteContactsElement.style.justifyContent = "center";
    numberOfFavoriteContactsElement.style.alignItems = "center";
    numberOfFavoriteContactsElement.style.width = "15px";
    numberOfFavoriteContactsElement.style.height = "15px";
    numberOfFavoriteContactsElement.style.backgroundColor = "navy";
    numberOfFavoriteContactsElement.style.color = "white"
    numberOfFavoriteContactsElement.style.padding = "10px";
    numberOfFavoriteContactsElement.style.borderRadius = "50%";
    numberOfFavoriteContactsElement.style.margin = "0"
    favoriteContactsListContainer.style.position = "absolute";
    favoriteContactsListContainer.style.top = "23.2%"
    // favoriteContactsListContainer.style.left = "31.5%"
    favoriteContactsListContainer.style.width = "100%"
    const favoriteContactsList = document.createElement("ul");
    favoriteContactsList.style.position = "relative";
    favoriteContactsList.style.listStyle = "none";
    favoriteContactsList.style.padding = "0"
    favoriteContactsList.style.margin = "0px 0px 2px 0px"
    favoriteContacts.forEach(contact => {
        const favoriteContactListItem = document.createElement("div");
        favoriteContactListItem.style.display = "flex";
        favoriteContactListItem.style.flexDirection = "row";
        favoriteContactListItem.style.justifyContent = "space-between";
        favoriteContactListItem.style.height = "80px"
        favoriteContactListItem.style.borderTop = "1px solid gray";
        favoriteContactListItem.style.borderBottom = "1px solid gray";
        favoriteContactListItem.style.backgroundColor = "ghostwhite"
        favoriteContactListItem.style.marginTop = "1px";
        // favoriteContactListItem.style.marginBottom = "2px";
        favoriteContactListItem.setAttribute("contactId", contact.contact_id)

        favoriteContactListItem.addEventListener("mouseover", function() {
            favoriteContactListItem.style.backgroundColor = "lightgreen";
        });

        favoriteContactListItem.addEventListener("mouseout", function() {
            favoriteContactListItem.style.backgroundColor = "ghostwhite";
        });

        favoriteContactListItem.addEventListener("click", function(event) {
            
            if (!event.target.classList.contains("contact-favorite-icon")) {
                // favoriteContactListItem.style.backgroundColor = "green";
                
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
                
                const myURL = `${rootUrl}/contact_${contact.contact_id}`;
                const myData = {
                    name: `${contact.firstname} ${contact.lastname}`,
                    // age: 30,
                    // city: "New York"
                };
                
                const newURL = saveDataToURL(myURL, myData);
                console.log(newURL);
                // Expected output: "https://example.com/page?name=John+Doe&age=30&city=New+York"
                window.location.href = newURL
            }
        })

        const favoriteContactListItemImageContainer = document.createElement("div");
        favoriteContactListItemImageContainer.style.display = "flex";
        favoriteContactListItemImageContainer.style.alignItems = "center";
        favoriteContactListItemImageContainer.style.width = "20%"
        favoriteContactListItemImageContainer.style.padding = "5px"
        const favoriteContactListItemImage = document.createElement("img");
        favoriteContactListItemImage.style.width = "60px";
        favoriteContactListItemImage.style.height = "60px";
        favoriteContactListItemImage.style.border = "0.5px solid grey";
        favoriteContactListItemImage.style.borderRadius = "50%";
        favoriteContactListItemImage.style.backgroundColor = "gainsboro"
        favoriteContactListItemImage.style.objectFit = "cover"

        if (contact.contact_image !== null) {
            favoriteContactListItemImage.setAttribute("src", contact.contact_image);
        } else {
            favoriteContactListItemImage.setAttribute("src", "./images/user-2-svgrepo-com.svg");
        }

        // contactListItem.innerHTML = `${contact.firstname} ${contact.lastname}`;
        const favoriteContactListNameContainer = document.createElement("div");
        favoriteContactListNameContainer.style.display = "flex";
        favoriteContactListNameContainer.style.flexDirection = "column"
        favoriteContactListNameContainer.style.justifyContent = "center";
        favoriteContactListNameContainer.style.alignItems = "center";
        favoriteContactListNameContainer.style.width = "54.5%"
        const favoriteContactListNameElement = document.createElement("h3");
        favoriteContactListNameElement.style.margin = "0";
        favoriteContactListNameElement.innerHTML = `${contact.firstname} ${contact.lastname}`;
        const favoriteContactListEmailElement = document.createElement("p");
        favoriteContactListEmailElement.style.fontStyle = "italic"
        favoriteContactListEmailElement.style.margin = "0"
        
        console.log(contact)
        if (contact.emailaddress !== null && contact.emailaddress !== "") {
            favoriteContactListEmailElement.innerHTML = contact.emailaddress;
        } else {
            favoriteContactListEmailElement.innerHTML = "text";
            favoriteContactListEmailElement.style.visibility = "hidden";
        }

        console.log(contact)

        const favoriteContactListOrganizationAndRoleElement = document.createElement("p");
        favoriteContactListOrganizationAndRoleElement.style.fontWeight = "bolder";
        favoriteContactListOrganizationAndRoleElement.style.margin = "0";
    
        if (contact.organization !== null && contact.organization !== "" && contact.organization_role !== null && contact.organization_role !== "") {
            favoriteContactListOrganizationAndRoleElement.innerHTML = `${contact.organization} || ${contact.organization_role}`
        } else if (contact.organization !== null && contact.organization !== "" || contact.organization_role === null && contact.organization_role === "") {
            favoriteContactListOrganizationAndRoleElement.innerHTML = `${contact.organization}`
        } else if (contact.organization === null && contact.organization === "" || contact.organization_role !== null && contact.organization_role !== "") {
            favoriteContactListOrganizationAndRoleElement.innerHTML = `${contact.organization_role}`
        } else {
            favoriteContactListOrganizationAndRoleElement.innerHTML = "text"
            favoriteContactListOrganizationAndRoleElement.style.visibility = "hidden"
        }

    requestAnimationFrame(() => {     
    const ellipsis = "..."
    const favoritesListItemNameElementText = favoriteContactListNameElement.textContent;
    const favoritesListItemNameElementHeight = favoriteContactListNameElement.clientHeight;
    // console.log(contactListNameElementHeight)
    const favoriteListNameTextSlice = favoritesListItemNameElementText.slice(0, 12) + ellipsis;
    if (favoritesListItemNameElementHeight > 22) {
        favoriteContactListNameElement.innerHTML = favoriteListNameTextSlice
    }

    const favoriteContactListNameContainerWidth = favoriteContactListNameContainer.clientWidth;
    const contactEmailAddressText = contact.emailaddress;
    const favoriteContactEmailAddressElementWidth = favoriteContactListEmailElement.clientWidth;
    let favoriteContactEmailAddressTextSlice = contactEmailAddressText.slice(0, 25) + ellipsis
    if (favoriteContactEmailAddressElementWidth > favoriteContactListNameContainerWidth) {
        favoriteContactListEmailElement.innerHTML = favoriteContactEmailAddressTextSlice
    } else {
        favoriteContactListEmailElement.innerHTML = contact.emailaddress
    }

    const elOrg = favoriteContactListOrganizationAndRoleElement;
    const elOrgHeight = elOrg.clientHeight;
    const elOrgText = elOrg.innerText;
    const elOrgTextSlice = elOrgText.slice(0, 22) + ellipsis
    if (elOrgHeight > 22) {
        elOrg.innerHTML = elOrgTextSlice
    }
});
    
        const favoriteContactListFavoritesStarIconContainer = document.createElement("div");
        favoriteContactListFavoritesStarIconContainer.style.display = "flex";
        favoriteContactListFavoritesStarIconContainer.style.justifyContent = "flex-end";
        favoriteContactListFavoritesStarIconContainer.style.alignItems = "center"
        favoriteContactListFavoritesStarIconContainer.style.padding = "5px"
        favoriteContactListFavoritesStarIconContainer.style.width = "20%";
        const favoriteContactListFavoriteStarImg = document.createElement("img");
        favoriteContactListFavoriteStarImg.classList.add("contact-favorite-icon")
        favoriteContactListFavoriteStarImg.style.width = "60px"

        // console.log(contact.favorite)

        // contactListFavoriteStarImg.addEventListener("click", function(event) {
        //     // event.preventDefault()
        //     updateContactFavorite()
        // }, false)
        
        favoriteContactListFavoriteStarImg.setAttribute("src", "./images/star-gold-svgrepo-com.svg");
        if (contact.favorite === null || contact.favorite === false) {
            favoriteContactListFavoriteStarImg.style.display = "none"
        } else {
            favoriteContactListFavoriteStarImg.style.display = "block"
        }
        
        favoriteContactListItemImageContainer.appendChild(favoriteContactListItemImage);
        favoriteContactListNameContainer.appendChild(favoriteContactListNameElement);
        favoriteContactListNameContainer.appendChild(favoriteContactListEmailElement);
        favoriteContactListNameContainer.appendChild(favoriteContactListOrganizationAndRoleElement);
        favoriteContactListItem.appendChild(favoriteContactListItemImageContainer)
        favoriteContactListItem.appendChild(favoriteContactListNameContainer)
        favoriteContactListFavoritesStarIconContainer.appendChild(favoriteContactListFavoriteStarImg);
        favoriteContactListItem.appendChild(favoriteContactListFavoritesStarIconContainer);
        favoriteContactsList.appendChild(favoriteContactListItem)
    });
    favoriteContactsHeaderContainer.append(myFavoriteContactsHeaderElement)
    favoriteContactsHeaderContainer.appendChild(numberOfFavoriteContactsElement)
    favoriteContactsListContainer.appendChild(favoriteContactsHeaderContainer)
    favoriteContactsListContainer.appendChild(favoriteContactsList)
    document.body.appendChild(favoriteContactsListContainer)
};

async function renderGroupsListContent() {
    const allUsers = await getAllUsers();
    const sessionId = sessionStorage.getItem("user");
    let matchingUser;
    for (let i = 0; i < allUsers.length; i++) {
        if (allUsers[i].session_id === sessionId) {
            matchingUser = allUsers[i]
        }
    }
    const userId = matchingUser.user_id;
    const userGroups = await getUserGroups(userId)
    console.log(userGroups)
    userGroups.sort(function(a, b) {
        if (a.group_id < b.group_id) {
            return -1;
        }
        if (a.group_id < b.group_id) {
            return 1;
        }
    })

    const userContactGroupings = await getUserContactGroupings(userId)
    console.log(userContactGroupings)

     requestAnimationFrame(() => {
        const groupsListContainer = document.querySelector("#groups-list-container");
        const screenHeight = window.innerHeight;
        const elementHeight = screenHeight * 0.093;
        const roundedElementHeightStr = elementHeight.toString() + "px"

         console.log(screenHeight)

         console.log(elementHeight.toString())
         

        groupsListContainer.style.marginTop = roundedElementHeightStr
    });

    const groupsList = document.querySelector("#groups-list");
    groupsList.style.display = "block";
    // groupsList.style.flexDirection = "row";
    // groupsList.style.justifyContent = "space-around"
    
    userGroups.forEach(group => {
        const groupListItem = document.createElement("div");
        groupListItem.setAttribute("groupId", group.group_id)
        groupListItem.setAttribute("groupName", `${group.groupname}`)
        groupListItem.setAttribute("data", `${rootUrl}/group_${group.group_id}`);
        groupListItem.style.display = "inline-flex";
        groupListItem.style.flexDirection = "column";
        groupListItem.style.width = "30%";
        groupListItem.style.height = "30%";
        groupListItem.style.margin = "10px 10px 10px 10px"
        groupListItem.style.backgroundColor = "#ededed";
        groupListItem.style.border = "2px solid black";

        groupListItem.addEventListener("mouseover", function() {
            groupListItem.style.backgroundColor = "lightgreen"
        });
        
        groupListItem.addEventListener("mouseout", function() {
            groupListItem.style.backgroundColor = "#ededed"
        });

        groupListItem.addEventListener("click", (event) => {
            if (event.target.id === "group-list-item-edit-icon") {
                event.preventDefault()
                return
            };

            if (event.target.id === "group-list-item-delete-icon") {
                event.preventDefault()
                return
            };

            const groupListItemEditModalContainer = document.querySelector("#group-list-item-edit-modal-container")
            if (groupListItemEditModalContainer.style.display !== "none") {
                event.preventDefault()
                return
            }

            if (window.location.href === groupListItem.getAttribute("data")) {
                event.preventDefault()
            } else {
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
                console.log(groupListItem)
                
                const myURL = groupListItem.getAttribute("data");
                console.log(myURL)

                const str = groupListItem.children[1].innerText;
                let char = "%";
                let index = str.indexOf(char)

                if (index !== -1) {
                    str = str.split(char)[0]
                }

                const myData = {
                    name: groupListItem.getAttribute("groupName"),
                    // age: 30,
                    // city: "New York"
                };
                
                let newURL = saveDataToURL(myURL, myData);

                if (newURL.charAt(newURL.length - 1) === '+') {
                    console.log(newURL)
                    let editedurl = newURL.slice(0, -1)
                    newURL = editedurl
                }
               
                // Expected output: "https://example.com/page?name=John+Doe&age=30&city=New+York"
                window.location.href = newURL
            }
        });
        
        const groupListItemHeaderElement = document.createElement("div");
        // groupListItemHeaderElement.style.position = "relative"
        groupListItemHeaderElement.style.display = "flex"
        groupListItemHeaderElement.style.justifyContent = "space-between"
        groupListItemHeaderElement.style.width = "100%"
        groupListItemHeaderElement.style.padding = "7px 0px"
        groupListItemHeaderElement.style.borderBottom = "2px solid black"
        // groupListItemHeaderElement.style.top = "2%"
        const groupListItemEditIcon = document.createElement("img");
        groupListItemEditIcon.setAttribute("id", "group-list-item-edit-icon")
        groupListItemEditIcon.setAttribute("src", "./images/edit-svgrepo-com.svg")
        groupListItemEditIcon.style.width = "20px";
        
        groupListItemEditIcon.addEventListener("click", function(event) {
            const clickedGroupListItemElement = event.target;
            const clickedGroupListItemElementParentElement = clickedGroupListItemElement.parentElement;
            const groupListItemToEdit = clickedGroupListItemElementParentElement.parentElement;
            groupListItemToEdit.classList.remove("edit-inactive");
            groupListItemToEdit.classList.add("edit-active")
            console.log("open edit modal")
            groupListItemEditModalContainer.style.display = "flex"
        })
        const groupListItemTextElement = document.createElement("h4");
        groupListItemTextElement.setAttribute("id", "group-list-item-text-element");
        groupListItemTextElement.style.margin = "0px"
        groupListItemTextElement.innerHTML = group.groupname;
        const groupListItemDeleteIcon = document.createElement("img");
        groupListItemDeleteIcon.setAttribute("id", "group-list-item-delete-icon")
        groupListItemDeleteIcon.setAttribute("src", "./images/delete-2-svgrepo-com.svg")
        groupListItemDeleteIcon.style.width = "20px";

        groupListItemDeleteIcon.addEventListener("click", function() {
            deleteUserGroup(group.group_id)
            deleteContactGrouping(group.group_id)
        })

        // groupListItem.innerHTML = group.groupname;
        let numberOfContactsInGroup = 0;
        userContactGroupings.forEach(grouping => {
            if (grouping.group_id === group.group_id) {
                console.log(group.groupname);
                numberOfContactsInGroup++
            }
        })
        console.log(numberOfContactsInGroup)
        const numberOfContactsInGroupContainer = document.createElement("div");
        numberOfContactsInGroupContainer.style.display = "flex";
        numberOfContactsInGroupContainer.style.justifyContent = "center";
        numberOfContactsInGroupContainer.style.alignItems = "center";
        numberOfContactsInGroupContainer.style.width = "100%"
        numberOfContactsInGroupContainer.style.height = "100%"
        const numberOfContactsInGroupElement = document.createElement("h2");
        numberOfContactsInGroupElement.innerHTML = numberOfContactsInGroup;
        numberOfContactsInGroupElement.style.margin = "0px"
        requestAnimationFrame(() => {
            const groupListItemHeaderElementHeight = groupListItemHeaderElement.clientHeight.toString();
            console.log(groupListItemHeaderElementHeight)
            numberOfContactsInGroupElement.style.marginBottom = groupListItemHeaderElementHeight + "px"
        });



        groupListItemHeaderElement.appendChild(groupListItemEditIcon)
        groupListItemHeaderElement.appendChild(groupListItemTextElement)
        groupListItemHeaderElement.appendChild(groupListItemDeleteIcon)
        groupListItem.appendChild(groupListItemHeaderElement)
        numberOfContactsInGroupContainer.appendChild(numberOfContactsInGroupElement)
        groupListItem.appendChild(numberOfContactsInGroupContainer)
        groupsList.appendChild(groupListItem)
    });

    const groupsListViewElement = document.querySelector("#groups-list-view")
        const groupListItemEditModalContainer = document.createElement("div");
        groupListItemEditModalContainer.setAttribute("id", "group-list-item-edit-modal-container");
        groupListItemEditModalContainer.classList.add("edit-inactive");
        groupListItemEditModalContainer.style.position = "absolute";
        groupListItemEditModalContainer.style.flexDirection = "column";
        groupListItemEditModalContainer.style.width = "40%";
        groupListItemEditModalContainer.style.height = "25%";
        groupListItemEditModalContainer.style.top = "40%";
        groupListItemEditModalContainer.style.left = "50%";
        groupListItemEditModalContainer.style.transform = "translate(-50%, -50%)"
        groupListItemEditModalContainer.style.backgroundColor = "lightgrey";
        groupListItemEditModalContainer.style.display = "none";
        groupListItemEditModalContainer.style.padding = "10px"
        const groupListItemEditModalHeaderContainer = document.createElement("div");
        groupListItemEditModalHeaderContainer.setAttribute("id", "group-list-item-edit-modal-header-container")
        groupListItemEditModalHeaderContainer.style.display = "flex";
        groupListItemEditModalHeaderContainer.style.justifyContent = "space-between";
        groupListItemEditModalHeaderContainer.style.width = "100%";
        groupListItemEditModalHeaderContainer.style.height = "15%"
        const groupListItemEditModalHeaderElement = document.createElement("h4");
        groupListItemEditModalHeaderElement.setAttribute("id", "group-list-item-edit-modal-header-element");
        groupListItemEditModalHeaderElement.style.margin = "0px"
        groupListItemEditModalHeaderElement.innerHTML = "Edit Group Name";
        const groupListItemEditModalCloseIcon = document.createElement("img");
        groupListItemEditModalCloseIcon.setAttribute("src", "./images/close-md-svgrepo-com.svg");
        groupListItemEditModalCloseIcon.style.width = "20px";
        groupListItemEditModalCloseIcon.addEventListener("click", function() {
            groupListItemEditModalContainer.style.display = "none";
        });
        const groupListItemEditModalInputContainer = document.createElement("div");
        groupListItemEditModalInputContainer.setAttribute("id", "group-list-item-edit-modal-input-container")
        groupListItemEditModalInputContainer.style.display = "flex";
        groupListItemEditModalInputContainer.style.flexDirection = "column";
        groupListItemEditModalInputContainer.style.height = "50%";
        groupListItemEditModalInputContainer.style.marginTop = "20px";
        const groupListItemEditModalInputLabelElement = document.createElement("label");
        groupListItemEditModalInputLabelElement.setAttribute("id", "group-list-item-edit-modal-input-label-element")
        groupListItemEditModalInputLabelElement.innerHTML = "Enter Name";
        const groupListItemEditModalInputElement = document.createElement("input");
        groupListItemEditModalInputElement.setAttribute("id", "group-list-item-edit-modal-input-element")
        const groupListItemEditModalButtonContainer = document.createElement("div");
        groupListItemEditModalButtonContainer.setAttribute("id", "group-list-item-edit-modal-button-container");
        groupListItemEditModalButtonContainer.style.display = "flex";
        groupListItemEditModalButtonContainer.style.justifyContent = "flex-end";
        groupListItemEditModalButtonContainer.style.width = "100%";
        groupListItemEditModalButtonContainer.style.height = "15%";
        const groupListItemEditModalButtonElement = document.createElement("button");
        groupListItemEditModalButtonElement.setAttribute("id", "group-list-item-edit-modal-button-element")
        groupListItemEditModalButtonElement.innerHTML = "Done";
        groupListItemEditModalHeaderContainer.appendChild(groupListItemEditModalHeaderElement);
        groupListItemEditModalHeaderContainer.appendChild(groupListItemEditModalCloseIcon);
        groupListItemEditModalInputContainer.appendChild(groupListItemEditModalInputLabelElement);
        groupListItemEditModalInputContainer.appendChild(groupListItemEditModalInputElement);
        groupListItemEditModalButtonContainer.appendChild(groupListItemEditModalButtonElement);
        groupListItemEditModalContainer.appendChild(groupListItemEditModalHeaderContainer);
        groupListItemEditModalContainer.appendChild(groupListItemEditModalInputContainer);
        groupListItemEditModalContainer.appendChild(groupListItemEditModalButtonContainer)
        groupsListViewElement.appendChild(groupListItemEditModalContainer)
        
        window.addEventListener("click", function(event) {
            if (groupListItemEditModalContainer.style.display !== "none" && event.target.id !== 
                "group-list-item-edit-icon" && event.target.id !== "group-autocomplete-list-item-edit-icon" 
                && event.target.id !== "group-list-item-edit-modal-container" 
                && event.target.id !== "group-list-item-edit-modal-header-container"
                && event.target.id !== "group-list-item-edit-modal-header-element" 
                && event.target.id !== "group-list-item-edit-modal-input-container"
                && event.target.id !== "group-list-item-edit-modal-input-label-element"
                && event.target.id !== "group-list-item-edit-modal-input-element"
                && event.target.id !== "group-list-item-edit-modal-button-container"
                && event.target.id !== "group-list-item-edit-modal-button-element"
            ) {
                groupListItemEditModalContainer.style.display = "none";
            }
        })

    groupListItemEditModalButtonElement.addEventListener("click", function(event) {
        console.log(event.target)
    })

    const searchGroupsElement = document.querySelector("#search-groups-input");
    searchGroupsElement.addEventListener("input", groupsAutocompleteSearch)
    async function groupsAutocompleteSearch() {
    const groupsList = document.querySelector("#groups-list");
    let searchGroupsInputValue = searchGroupsElement.value.toLowerCase().trimEnd();
    let filteredGroups = [];

    userGroups.filter(function(group) {
        let groupName = group.groupname

        console.log(searchGroupsInputValue.length)

        if (searchGroupsInputValue === "") {
            for (let i = 0; i < userGroups.length; i++) {
                filteredGroups.push(userGroups[i])
            }
        }

        // if (contactFirstName.toLowerCase().startsWith(searchContactsInputValue)) {
        //     for (let i = 0; i < userContacts.length; i++) {
        //         let matchContactName = `${userContacts[i].firstname} ${userContacts[i].lastname}`
        //         if (contactName.toLowerCase() === matchContactName.toLowerCase()) {
        //             filteredContacts.push(userContacts[i])
        //             // console.log(filteredContacts)
        //         }
        //     }
        // }

        // if (contactLastName.toLowerCase().startsWith(searchContactsInputValue)) {
        //     for (let i = 0; i < userContacts.length; i++) {
        //         let matchContactName = `${userContacts[i].firstname} ${userContacts[i].lastname}`
        //         if (contactName.toLowerCase() === matchContactName.toLowerCase()) {
        //             filteredContacts.push(userContacts[i])
        //             // console.log(filteredContacts)
        //         }
        //     }
        // }

        if (groupName.toLowerCase().startsWith(searchGroupsInputValue)) {
            for (let i = 0; i < userGroups.length; i++) {
                let matchGroupName = userGroups[i].groupname
                if (groupName.toLowerCase() === matchGroupName.toLowerCase()) {
                    filteredGroups.push(userGroups[i])
                    // console.log(filteredContacts)
                }
            }
        }
    });

    const searchGroupsAutocompleteList = document.querySelector("#autocomplete-groups-list");

    searchGroupsAutocompleteList.innerHTML = '';

    // searchContactsElement.addEventListener('input', function() {
    //     if (this.value === '') {
    //       // Input is cleared, perform your desired action
    //       window.location.reload()
    //       // Example: Reset search results
    //       // resetSearchResults();
    //     }
    //   });

      function removeDuplicates(arr) {
        return arr.reduce((unique, item) => {
          if (!unique.includes(item)) {
            unique.push(item);
          }
          return unique;
        }, []);
      }
      
      const originalArray = [1, 2, 2, 3, 4, 4, 5];
      const uniqueArray = removeDuplicates(filteredGroups);
    //   console.log(uniqueArray); // Output: [1, 2, 3, 4, 5]

    // if (filteredGroups.length > 0) {
        searchGroupsAutocompleteList.style.display = 'block';
        groupsList.style.display = "none"
        uniqueArray.forEach(group => {
            const groupsAutoCompleteListItem = document.createElement('div');
            groupsAutoCompleteListItem.setAttribute("groupId", group.group_id)
            groupsAutoCompleteListItem.setAttribute("groupName", `${group.groupname}`)
            groupsAutoCompleteListItem.setAttribute("data", `${rootUrl}/group_${group.group_id}`);
            groupsAutoCompleteListItem.setAttribute("groupId", group.group_id)
            groupsAutoCompleteListItem.style.display = "inline-flex";
            groupsAutoCompleteListItem.style.flexDirection = "column";
            groupsAutoCompleteListItem.style.width = "30%";
            groupsAutoCompleteListItem.style.height = "30%";
            groupsAutoCompleteListItem.style.margin = "10px 10px 10px 10px";
            groupsAutoCompleteListItem.style.backgroundColor = "lightgrey"
            groupsAutoCompleteListItem.style.border = "2px solid black";

        groupsAutoCompleteListItem.addEventListener("mouseover", function() {
            groupsAutoCompleteListItem.style.backgroundColor = "lightgreen"
        });
        
        groupsAutoCompleteListItem.addEventListener("mouseout", function() {
            groupsAutoCompleteListItem.style.backgroundColor = "#ededed"
        });

            groupsAutoCompleteListItem.addEventListener("click", (event) => {

            if (event.target.id === "group-autocomplete-list-item-edit-icon") {
                event.preventDefault()
                return
            };

                if (event.target.id === "group-autocomplete-list-item-delete-icon") {
                event.preventDefault()
                return
            };

            const groupListItemEditModalContainer = document.querySelector("#group-list-item-edit-modal-container")
            if (groupListItemEditModalContainer.style.display !== "none") {
                event.preventDefault()
                return
            }
            // console.log(group)
            if (window.location.href === groupsAutoCompleteListItem.getAttribute("data")) {
                event.preventDefault()
            } else {
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
                console.log(groupsAutoCompleteListItem)
                
                const myURL = groupsAutoCompleteListItem.getAttribute("data");
                console.log(myURL)

                const str = groupsAutoCompleteListItem.children[1].innerText;
                let char = "%";
                let index = str.indexOf(char)

                if (index !== -1) {
                    str = str.split(char)[0]
                }

                const myData = {
                    name: groupsAutoCompleteListItem.getAttribute("groupName"),
                    // age: 30,
                    // city: "New York"
                };
                
                let newURL = saveDataToURL(myURL, myData);

                if (newURL.charAt(newURL.length - 1) === '+') {
                    console.log(newURL)
                    let editedurl = newURL.slice(0, -1)
                    newURL = editedurl
                }
               
                // Expected output: "https://example.com/page?name=John+Doe&age=30&city=New+York"
                window.location.href = newURL
            }
        });

            const groupAutoCompleteListItemHeaderElement = document.createElement("div");
            // groupAutoCompleteListItemHeaderElement.style.position = "relative"
            groupAutoCompleteListItemHeaderElement.style.display = "flex"
            groupAutoCompleteListItemHeaderElement.style.justifyContent = "space-between"
            groupAutoCompleteListItemHeaderElement.style.width = "100%"
            groupAutoCompleteListItemHeaderElement.style.padding = "7px 0px"
            groupAutoCompleteListItemHeaderElement.style.borderBottom = "2px solid black"
            // groupAutoCompleteListItemHeaderElement.style.top = "2%"
            const groupAutoCompleteListItemEditIcon = document.createElement("img");
            groupAutoCompleteListItemEditIcon.setAttribute("id", "group-autocomplete-list-item-edit-icon")
            groupAutoCompleteListItemEditIcon.setAttribute("src", "./images/edit-svgrepo-com.svg")
            groupAutoCompleteListItemEditIcon.style.width = "20px"
            const groupListItemEditModalContainer = document.querySelector("#group-list-item-edit-modal-container")
            groupAutoCompleteListItemEditIcon.addEventListener("click", function(event) {
                const clickedGroupListItemElement = event.target;
                const clickedGroupListItemElementParentElement = clickedGroupListItemElement.parentElement;
                const groupListItemToEdit = clickedGroupListItemElementParentElement.parentElement;
                groupListItemToEdit.classList.remove("edit-inactive");
                groupListItemToEdit.classList.add("edit-active")
                console.log("open edit modal")
                groupListItemEditModalContainer.style.display = "flex"
            })
            const groupAutoCompleteListItemTextElement = document.createElement("h4");
            groupAutoCompleteListItemTextElement.style.margin = "0px"
            groupAutoCompleteListItemTextElement.innerHTML = group.groupname;
            const groupAutoCompleteListItemDeleteIcon = document.createElement("img")
            groupAutoCompleteListItemDeleteIcon.setAttribute("id", "group-autocomplete-list-item-delete-icon")
            groupAutoCompleteListItemDeleteIcon.setAttribute("src", "./images/delete-2-svgrepo-com.svg")
            groupAutoCompleteListItemDeleteIcon.style.width = "20px"
            groupAutoCompleteListItemDeleteIcon.addEventListener("click", function() {
                deleteUserGroup(group.group_id)
                deleteContactGrouping(group.group_id)
            })

            let autoCompleteNumberOfContactsInGroup = 0;
            userContactGroupings.forEach(grouping => {
            if (grouping.group_id === group.group_id) {
                console.log(group.groupname);
                autoCompleteNumberOfContactsInGroup++
            }
        })
        console.log(autoCompleteNumberOfContactsInGroup)
        const autoCompleteNumberOfContactsInGroupContainer = document.createElement("div");
        autoCompleteNumberOfContactsInGroupContainer.style.display = "flex";
        autoCompleteNumberOfContactsInGroupContainer.style.justifyContent = "center";
        autoCompleteNumberOfContactsInGroupContainer.style.alignItems = "center";
        autoCompleteNumberOfContactsInGroupContainer.style.width = "100%"
        autoCompleteNumberOfContactsInGroupContainer.style.height = "100%"
        const autoCompleteNumberOfContactsInGroupElement = document.createElement("h2");
        autoCompleteNumberOfContactsInGroupElement.innerHTML = autoCompleteNumberOfContactsInGroup;
        autoCompleteNumberOfContactsInGroupElement.style.margin = "0px"
        requestAnimationFrame(() => {
            const groupAutoCompleteListItemHeaderElementHeight = groupAutoCompleteListItemHeaderElement.clientHeight.toString();
            console.log(groupAutoCompleteListItemHeaderElementHeight)
            autoCompleteNumberOfContactsInGroupElement.style.marginBottom = groupAutoCompleteListItemHeaderElementHeight + "px"
        });

            groupAutoCompleteListItemHeaderElement.appendChild(groupAutoCompleteListItemEditIcon)
            groupAutoCompleteListItemHeaderElement.appendChild(groupAutoCompleteListItemTextElement)
            groupAutoCompleteListItemHeaderElement.appendChild(groupAutoCompleteListItemDeleteIcon)
            autoCompleteNumberOfContactsInGroupContainer.appendChild(autoCompleteNumberOfContactsInGroupElement)
            groupsAutoCompleteListItem.appendChild(groupAutoCompleteListItemHeaderElement)
            groupsAutoCompleteListItem.appendChild(autoCompleteNumberOfContactsInGroupContainer)
           
            searchGroupsAutocompleteList.appendChild(groupsAutoCompleteListItem)
     });
};

    groupListItemEditModalButtonElement.addEventListener("click", editUserGroup)

    const navigateCreateGroupPageButton = document.querySelector("#navigate-create-group-page-button")
    navigateCreateGroupPageButton.addEventListener("click", function() {
        window.location.href = `${rootUrl}/create-group`
    })
};

async function handleEditGroupNameInput() {
    const allUsers = await getAllUsers();
    const sessionId = sessionStorage.getItem("user");
    let matchingUser;
    for (let i = 0; i < allUsers.length; i++) {
        if (allUsers[i].session_id === sessionId) {
            matchingUser = allUsers[i]
        }
    }
    const userId = matchingUser.user_id;
    const groupListItemEditModalInputElement = document.querySelector("#group-list-item-edit-modal-input-element");
    const groupListItemEditModalInputElementValue = groupListItemEditModalInputElement.value;
    console.log(groupListItemEditModalInputElementValue)

        const groupsList = document.querySelector("#groups-list");
        const groupsListChildren = groupsList.children;
        const groupsListArr = Array.from(groupsListChildren)
        const searchGroupsAutocompleteList = document.querySelector("#autocomplete-groups-list");
        const searchGroupsAutocompleteListChildren = searchGroupsAutocompleteList.children;
        const searchGroupsAutocompleteListArr = Array.from(searchGroupsAutocompleteListChildren)
        console.log(searchGroupsAutocompleteList)
        console.log(groupsList)

        let groupToEdit;
        groupsListArr.forEach(group => {
            if (group.classList.contains("edit-active")) {
                groupToEdit = group;
            };

            if (groupToEdit === undefined) {
                searchGroupsAutocompleteListArr.forEach(autoCompleteGroup => {
                    if (autoCompleteGroup.classList.contains("edit-active")) {
                        groupToEdit = autoCompleteGroup;
                    };
                })
            };   
        });
    console.log(groupToEdit.getAttribute("groupId"))
    const grouptoEditId = Number(groupToEdit.getAttribute("groupId")) 
    
     const groupToEditObj = {
        userId: userId,
        groupId: grouptoEditId,
        groupName: groupListItemEditModalInputElementValue
    }

    console.log(groupToEditObj)

    return groupToEditObj
};

async function renderGroupContactsListContent() {
    const allUsers = await getAllUsers();
    const sessionId = sessionStorage.getItem("user");
    let matchingUser;
    for (let i = 0; i < allUsers.length; i++) {
        if (allUsers[i].session_id === sessionId) {
            matchingUser = allUsers[i]
        }
    }
    const userId = matchingUser.user_id;

    const currentUrl = window.location.href.toString();

    const userGroupContacts = await getUserContactGroupings(userId);
    const groupIdUrl = currentUrl.split("group_")[1];
    const queryCharIndex = groupIdUrl.indexOf("?")
    const groupId = Number(groupIdUrl.slice(0, queryCharIndex));
    const group = await getAUserGroup(userId, groupId)
    console.log(group)

    const groupContacts = [];
    for (let i = 0; i < userGroupContacts.length; i++) {
        if (userGroupContacts[i].group_id === groupId) {
            groupContacts.push(userGroupContacts[i])
        }
    }

    const groupsContactsListUserImage = document.querySelector("#groups-contacts-list-user-image");
    if (matchingUser.user_image !== null && matchingUser.user_image !== './images/user-5-svgrepo-com.svg') {
        groupsContactsListUserImage.setAttribute("src", matchingUser.user_image);
        groupsContactsListUserImage.style.borderRadius = "50%";
    }

    const groupsContactsListUserHeaderNameContainer = document.querySelector("#groups-contacts-list-user-header-name-container");
    // groupContactsUserHeaderNameContainer.style.margin = "0px 0px 0px 10px"
    const groupsContactsListHeaderUserNameElement = document.querySelector("#groups-contacts-list-header-user-name");
    groupsContactsListHeaderUserNameElement.style.margin = "0px";
    const groupsContactsListHeaderUserEmailAddressElement = document.querySelector("#groups-contacts-list-header-user-email")
    // groupsContactsHeaderUserEmailAddressElement.style.margin = "0px 0px 16px 0px";

    const groupsContactsListUserNameElement = document.querySelector("#groups-contacts-list-user-name");
    groupsContactsListUserNameElement.style.margin = "0px";
    const groupsContactsListUserEmailAddressElement = document.querySelector("#groups-contacts-list-user-email");
    groupsContactsListUserEmailAddressElement.style.margin = "0px";
    groupsContactsListUserNameElement.innerHTML = `${group.groupname} Contacts`;
    // contactsUserNameElement.style.fontSize = "xx-large"
    groupsContactsListUserNameElement.style.fontFamily = "Arial"
    // contactsUserEmailAddressElement.innerHTML = `${user.emailaddress}`

    groupsContactsListHeaderUserNameElement.innerHTML = `${matchingUser.firstname} ${matchingUser.lastname}`;
    groupsContactsListHeaderUserEmailAddressElement.innerHTML = matchingUser.emailaddress;


    console.log(groupContacts)

    const allUserContacts = await getUserContacts(userId);

    const finalGroupContacts = []
    groupContacts.forEach(contact => {
        // console.log(allUserContacts)
        for (let i = 0; i < allUserContacts.length; i++) {
            if (allUserContacts[i].contact_id === contact.contact_id) {
                finalGroupContacts.push(allUserContacts[i])
            }
        }
    })

    console.log(finalGroupContacts)

    finalGroupContacts.sort(function(a, b) {
        if (a.firstname < b.firstname) {
            return -1;
        }
        if (a.firstname < b.firstname) {
            return 1;
        }
        
        var aFirstChar = a.firstname.charAt(0);
        var bFirstChar = b.firstname.charAt(0);
        if (aFirstChar > bFirstChar) {
          return 1;
        } else if (aFirstChar < bFirstChar) {
          return -1;
        } else {
          var aLastChar = a.lastname.charAt(0);
          var bLastChar = b.lastname.charAt(0);
          if (aLastChar === "") {
            aLastChar = "z"
          }
          if (bLastChar === "") {
            bLastChar = "z"
          }
          if (aLastChar > bLastChar) {
            return 1;
          } else if (aLastChar < bLastChar) {
            return -1;
          } else {
            return 0;
          }    
        }
      });

    const groupContactsListContainer = document.createElement("div");
    const groupContactsHeaderContainer = document.createElement("div");
    groupContactsHeaderContainer.style.display = "flex";
    // groupContactsHeaderContainer.style.justifyContent = "space-between"
    groupContactsHeaderContainer.style.alignItems = "center"
    // groupContactsHeaderContainer.style.width = "25%";
    groupContactsHeaderContainer.style.backgroundColor = "ghostwhite";
    groupContactsHeaderContainer.style.borderTop = "3px solid black";
    groupContactsHeaderContainer.style.borderBottom = "3px solid black";
    // groupContactsHeaderContainer.style.marginBottom = "5px"
    groupContactsHeaderContainer.style.padding = "5px"
    const myGroupContactsHeaderElement = document.createElement("h2");
    myGroupContactsHeaderElement.innerHTML = `${group.groupname} Contacts`
    // myGroupContactsHeaderElement.style.width = "140px"
    myGroupContactsHeaderElement.style.margin = "0"
    myGroupContactsHeaderElement.style.marginLeft = "5px"
    // myContactsHeaderElement.style.marginRight = "10px"
    const numberOfGroupContactsElement = document.createElement("h2");
    numberOfGroupContactsElement.innerHTML = finalGroupContacts.length;
    numberOfGroupContactsElement.style.display = "inline-flex";
    numberOfGroupContactsElement.style.justifyContent = "center";
    numberOfGroupContactsElement.style.alignItems = "center";
    numberOfGroupContactsElement.style.width = "15px";
    numberOfGroupContactsElement.style.height = "15px";
    numberOfGroupContactsElement.style.backgroundColor = "navy";
    numberOfGroupContactsElement.style.color = "white"
    numberOfGroupContactsElement.style.padding = "10px";
    numberOfGroupContactsElement.style.borderRadius = "50%";
    numberOfGroupContactsElement.style.margin = "0";
    numberOfGroupContactsElement.style.marginLeft = "5px";
    groupContactsListContainer.style.position = "absolute";
    groupContactsListContainer.style.top = "28.2%"
    groupContactsListContainer.style.left = "31.5%"
    groupContactsListContainer.style.width = "68.5%"
    const groupContactsList = document.createElement("ul");
    groupContactsList.style.listStyle = "none";
    groupContactsList.style.padding = "0"
    groupContactsList.style.margin = "0"
    // groupContactsList.style.height = "100%";
    // groupContactsList.style.overflow = "auto"
    // groupContactsList.style.zIndex = "5"
    finalGroupContacts.forEach(contact => {
        const groupContactListItem = document.createElement("div");
        groupContactListItem.style.display = "flex";
        groupContactListItem.style.flexDirection = "row";
        groupContactListItem.style.height = "70px"
        groupContactListItem.style.borderTop = "2px solid black";
        groupContactListItem.style.borderBottom = "2px solid black";
        groupContactListItem.style.backgroundColor = "ghostwhite"
        groupContactListItem.style.marginTop = "1px";
        groupContactListItem.style.marginBottom = "1px";
        // groupContactListItem.style.padding = "5px"
        groupContactListItem.setAttribute("contactId", contact.contact_id)

        groupContactListItem.addEventListener("mouseover", function() {
            groupContactListItem.style.backgroundColor = "lightgreen";
        });

        groupContactListItem.addEventListener("mouseout", function() {
            groupContactListItem.style.backgroundColor = "ghostwhite";
        });

        groupContactListItem.addEventListener("click", function(event) {
            
                // groupContactListItem.style.backgroundColor = "green";
                
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
                
                const myURL = `${rootUrl}/contact_${contact.contact_id}`;
                const myData = {
                    name: `${contact.firstname} ${contact.lastname}`,
                    // age: 30,
                    // city: "New York"
                };
                
                const newURL = saveDataToURL(myURL, myData);
                console.log(newURL);
                // Expected output: "https://example.com/page?name=John+Doe&age=30&city=New+York"
                window.location.href = newURL
        })

        const groupContactListItemImageContainer = document.createElement("div");
        groupContactListItemImageContainer.style.display = "flex";
        groupContactListItemImageContainer.style.alignItems = "center";
        // groupContactListItemImageContainer.style.width = "10%"
        groupContactListItemImageContainer.style.padding = "10px"
        const groupContactListItemImage = document.createElement("img");
        groupContactListItemImage.style.width = "57px";
        groupContactListItemImage.style.height = "57px";
        groupContactListItemImage.style.border = "0.5px solid grey";
        groupContactListItemImage.style.borderRadius = "50%"
        groupContactListItemImage.style.backgroundColor = "gainsboro";
        groupContactListItemImage.style.boxShadow = "2px 2px 2px";
        groupContactListItemImage.style.objectFit = "cover";
        
        if (contact.contact_image !== null && contact.contact_image !== "./images/user-2-svgrepo-com.svg") {
            groupContactListItemImage.setAttribute("src", contact.contact_image);
        } else {
            groupContactListItemImage.setAttribute("src", "./images/user-2-svgrepo-com.svg");
        }

        // contactListItem.innerHTML = `${contact.firstname} ${contact.lastname}`;
        const groupContactListNameContainer = document.createElement("div");
        groupContactListNameContainer.style.position = "relative";
        groupContactListNameContainer.style.display = "flex";
        groupContactListNameContainer.style.flexDirection = "column"
        groupContactListNameContainer.style.justifyContent = "center";
        groupContactListNameContainer.style.alignItems = "center";
        groupContactListNameContainer.style.width = "100%"
        const groupContactListNameElement = document.createElement("h3");
        groupContactListNameElement.style.margin = "0";
        groupContactListNameElement.innerHTML = `${contact.firstname} ${contact.lastname}`;
        const groupContactListEmailElement = document.createElement("p");
        groupContactListEmailElement.style.fontStyle = "italic"
        groupContactListEmailElement.style.margin = "0"
        
        if (contact.emailaddress !== null && contact.emailaddress !== "") {
            groupContactListEmailElement.innerHTML = contact.emailaddress;
        } else {
            groupContactListEmailElement.innerHTML = "text";
            groupContactListEmailElement.style.visibility = "hidden";
        }

        const groupContactListOrganizationAndRoleElement = document.createElement("p");
        groupContactListOrganizationAndRoleElement.style.fontWeight = "bolder";
        groupContactListOrganizationAndRoleElement.style.margin = "0";
    
        if (contact.organization !== null && contact.organization !== "" && contact.organization_role !== null && contact.organization_role !== "") {
            groupContactListOrganizationAndRoleElement.innerHTML = `${contact.organization} || ${contact.organization_role}`
        } else if (contact.organization !== null && contact.organization !== "" || contact.organization_role === null && contact.organization_role === "") {
            groupContactListOrganizationAndRoleElement.innerHTML = `${contact.organization}`
        } else if (contact.organization === null && contact.organization === "" || contact.organization_role !== null && contact.organization_role !== "") {
            groupContactListOrganizationAndRoleElement.innerHTML = `${contact.organization_role}`
        } else {
            groupContactListOrganizationAndRoleElement.innerHTML = "text"
            groupContactListOrganizationAndRoleElement.style.visibility = "hidden"
        }

        const contactListFavoritesStarIconContainer = document.createElement("div");
        contactListFavoritesStarIconContainer.style.display = "flex";
        contactListFavoritesStarIconContainer.style.justifyContent = "center";
        contactListFavoritesStarIconContainer.style.alignItems = "center"
        // contactListFavoritesStarIconContainer.style.width = "10%";
        contactListFavoritesStarIconContainer.style.padding = "10px"
        const contactListFavoriteStarImg = document.createElement("img");
        contactListFavoriteStarImg.classList.add("contact-favorite-icon")
        contactListFavoriteStarImg.style.width = "50px"
        // contactListFavoriteStarImg.style.visibility = "hidden";

        console.log(contact.favorite)

        // contactListFavoriteStarImg.addEventListener("click", function(event) {
        //     // event.preventDefault()
        //     updateContactFavorite()
        // }, false)
        
        contactListFavoriteStarImg.setAttribute("src", "./images/star-gold-svgrepo-com.svg");
        if (contact.favorite === null || contact.favorite === false) {
            contactListFavoriteStarImg.style.visibility = "hidden"
        } else {
            contactListFavoriteStarImg.style.display = "block"
            // contactListFavoriteStarImg.style.visibility = "hidden";
        }

        requestAnimationFrame(() => {
            const groupContactListNameElementWidth = groupContactListNameElement.clientWidth;
            const groupContactListNameElementText = groupContactListNameElement.innerHTML;
            const firstGroupContactListNameElementSlice = groupContactListNameElementText.slice(0, 31);
            const secondGroupContactListNameElementSlice = groupContactListNameElementText.slice(0, 26);
            const thirdGroupContactListNameElementSlice = groupContactListNameElementText.slice(0, 21);
            const fourthGroupContactListNameElementSlice = groupContactListNameElementText.slice(0, 16);
            const groupContactListEmailElementWidth = groupContactListEmailElement.clientWidth;
            const groupContactListEmailElementText = groupContactListEmailElement.innerHTML;
            const groupContactListEmailElementTextSlice = groupContactListEmailElementText.slice(0, 60);
            const groupContactListEmailElementTextSecondSlice = groupContactListEmailElementText.slice(0, 50);
            const groupContactListOrganizationAndRoleElementWidth = groupContactListOrganizationAndRoleElement.clientWidth;

            const ellipsis = '...'

            if (groupContactListNameElementWidth > 400) {
                groupContactListNameElement.innerHTML = firstGroupContactListNameElementSlice + ellipsis;
            };
            if (groupContactListNameElementWidth > 400) {
                groupContactListNameElement.innerHTML = secondGroupContactListNameElementSlice + ellipsis;
            };
            if (groupContactListNameElementWidth > 400) {
                groupContactListNameElement.innerHTML = thirdGroupContactListNameElementSlice + ellipsis;
            };
            if (groupContactListNameElementWidth > 400) {
                groupContactListNameElement.innerHTML = fourthGroupContactListNameElementSlice + ellipsis;
            };

            console.log(groupContactListEmailElementWidth)
            if (groupContactListEmailElementWidth > 400) {
                groupContactListEmailElement.innerHTML = groupContactListEmailElementTextSlice + ellipsis;
            };
            if (groupContactListEmailElementWidth > 400) {
                groupContactListEmailElement.innerHTML = groupContactListEmailElementTextSecondSlice + ellipsis;
            };

            const groupContactListOrganizationAndRoleElementText = groupContactListOrganizationAndRoleElement.innerHTML;
            const groupContactListOrganizationAndRoleElementTextSlice = groupContactListOrganizationAndRoleElementText.slice(0, 40);
            console.log(groupContactListOrganizationAndRoleElementWidth)
            if (groupContactListOrganizationAndRoleElementWidth > 400) {
                groupContactListOrganizationAndRoleElement.innerHTML = groupContactListOrganizationAndRoleElementTextSlice + ellipsis;
            };
        });
        
        groupContactListItemImageContainer.appendChild(groupContactListItemImage);
        groupContactListNameContainer.appendChild(groupContactListNameElement);
        groupContactListNameContainer.appendChild(groupContactListEmailElement);
        groupContactListNameContainer.appendChild(groupContactListOrganizationAndRoleElement)
        groupContactListItem.appendChild(groupContactListItemImageContainer)
        groupContactListItem.appendChild(groupContactListNameContainer)
        contactListFavoritesStarIconContainer.appendChild(contactListFavoriteStarImg);
        groupContactListItem.appendChild(contactListFavoritesStarIconContainer);
        groupContactsList.appendChild(groupContactListItem)
    });
    groupContactsHeaderContainer.append(myGroupContactsHeaderElement)
    groupContactsHeaderContainer.appendChild(numberOfGroupContactsElement)
    groupContactsListContainer.appendChild(groupContactsHeaderContainer)
    groupContactsListContainer.appendChild(groupContactsList)
    document.body.appendChild(groupContactsListContainer)

    console.log(groupContacts)
};

async function renderCreateGroupsContent() {

    const groupsSelectionList = document.querySelector("#groups-selection-list");
    const groupsSelectionListChildren = groupsSelectionList.children;
    const groupsSelectionListArr = Array.from(groupsSelectionListChildren);
    console.log(groupsSelectionListArr)

    groupsSelectionListArr.forEach(item => {
        item.addEventListener("mouseover", function() {
            item.style.backgroundColor = "lightgreen"
        });

        item.addEventListener("mouseout", function() {
            if (!item.classList.contains("active"))
            item.style.backgroundColor = "ghostwhite"
        });

        item.addEventListener("click", function(event) {
        const clickedItem = event.target
        console.log(clickedItem)

        const customGroupInputContainer = document.querySelector("#custom-group-input-container");
        customGroupInputContainer.classList.remove("active");
        customGroupInputContainer.classList.add("inactive");
        customGroupInputContainer.style.backgroundColor = "ghostwhite"

        groupsSelectionListArr.forEach(item => {
            if (item !== event.target) {
                item.classList.remove("active");
                item.classList.add("inactive")
                item.style.backgroundColor = "ghostwhite"
            }
        })

        if (clickedItem.classList.contains("inactive")) {
                clickedItem.classList.remove("inactive")
                clickedItem.classList.add("active")
                clickedItem.style.backgroundColor = "lightgreen"
            } else if(clickedItem.classList.contains("active")) {
                clickedItem.classList.remove("active")
                clickedItem.classList.add("inactive")
                clickedItem.style.backgroundColor = "ghostwhite"
            }
        })
    });

    const customGroupInputContainer = document.querySelector("#custom-group-input-container");
    const customGroupInputElement = document.querySelector("#custom-group-input-element");
    customGroupInputElement.addEventListener("focus", function() {
        customGroupInputContainer.classList.remove("inactive")
        customGroupInputContainer.classList.add("active")
        customGroupInputContainer.style.backgroundColor = "lightgreen";
    });
    customGroupInputElement.addEventListener("blur", function(event) {
        const createGroupButton = document.querySelector("#create-group-button")
        if (event.relatedTarget !== createGroupButton) {
            customGroupInputContainer.classList.remove("active")
            customGroupInputContainer.classList.add("inactive")
            customGroupInputContainer.style.backgroundColor = "ghostwhite";
        }
    })

    const createGroupButton = document.querySelector("#create-group-button")
    document.addEventListener("click", function(event) {
        console.log(event.target.tagName)
        if (event.target.tagName !== "LI" && event.target !== createGroupButton) {
            groupsSelectionListArr.forEach(item => {
                item.classList.remove("active");
                item.classList.add("inactive")
                item.style.backgroundColor = "ghostwhite"
                console.log(item)
            })
        };
    });

    createGroupButton.addEventListener("click", postNewUserGroup)
};

async function handleCreateGroupInput() {
    const allUsers = await getAllUsers();
    const sessionId = sessionStorage.getItem("user");
    let matchingUser;
    for (let i = 0; i < allUsers.length; i++) {
        if (allUsers[i].session_id === sessionId) {
            matchingUser = allUsers[i]
        }
    }
    const userId = matchingUser.user_id;

    const userGroups = await getUserGroups(userId)

    const groupsSelectionList = document.querySelector("#groups-selection-list");
    const groupsSelectionListChildren = groupsSelectionList.children;
    const groupsSelectionListArr = Array.from(groupsSelectionListChildren);
    const customGroupInputContainer = document.querySelector("#custom-group-input-container");
    const customGroupInputElement = document.querySelector("#custom-group-input-element");

    // console.log(groupsSelectionListArr)
    let activeElement;
    groupsSelectionListArr.forEach(item => {
        if (item.classList.contains("active")) {
            activeElement = item;
        }
    });

    if (activeElement === undefined && customGroupInputContainer.classList.contains("active")) {
        activeElement = customGroupInputElement;
    }

    // console.log(activeElement)
    console.log(userGroups)

     let groupIdsArr = []
    for (let i = 0; i < userGroups.length; i++) {
        groupIdsArr.push(userGroups[i].group_id)
    }

    let maxId = -Infinity;
    for (let i = 0; i < groupIdsArr.length; i++) {
        if (groupIdsArr[i] > maxId) {
            maxId = groupIdsArr[i];
        }
    }

    console.log(maxId)
    if (maxId === -Infinity) {
        maxId = 0
    }

    let groupName;

    if (activeElement === undefined) {
        alert("Please select a group or enter a custom group name before creating a group.")
        return
    }

    if (activeElement === customGroupInputElement) {
        groupName = activeElement.value
    } else {
        groupName = activeElement.textContent
    }

    const newGroupObject = {
        userId: userId,
        groupId: maxId + 1,
        groupName: groupName
    };

    console.log(newGroupObject)
    if (newGroupObject.groupName === '') {
        alert("Please select a group or enter a custom group name before creating a group.")
        return
    };

    for (let i = 0; i < userGroups.length; i++) {
        if (userGroups[i].groupname === newGroupObject.groupName) {
            alert("Cannot create a duplicate group name.");
            return
        }
    }

    return newGroupObject;
};

async function renderManageContactGroupsContent() {
    const allUsers = await getAllUsers();
    const sessionId = sessionStorage.getItem("user");
    let matchingUser;
    for (let i = 0; i < allUsers.length; i++) {
        if (allUsers[i].session_id === sessionId) {
            matchingUser = allUsers[i]
        }
    }
    const userId = matchingUser.user_id;
    const userContacts = await getUserContacts(userId);
    const userGroups = await getUserGroups(userId);

    const currentUrl = window.location.href;
    const urlContactId = currentUrl.split("contact_")[1];
    const queryCharIndex = urlContactId.indexOf("?")
    const contactId = Number(urlContactId.slice(0, queryCharIndex))
    
    console.log(userGroups)

    const userContactGroupings = await getUserContactGroupings(userId)

    const currentContactGroupings = [];
    userContactGroupings.forEach(grouping => {
        if (grouping.contact_id === contactId) {
            currentContactGroupings.push(grouping)
        }
    });

    console.log(currentContactGroupings)

    userGroups.forEach(group => {
        const manageContactGroupsSelectionList = document.querySelector("#manage-contact-groups-selection-list");
        const groupListItem = document.createElement("div");
        groupListItem.setAttribute("groupId", group.group_id)
        groupListItem.classList.add("inactive")
        groupListItem.style.display = "flex";
        groupListItem.style.justifyContent = "space-between";
        groupListItem.style.alignItems = "center";
        groupListItem.style.height = "40px";
        groupListItem.style.border = "1px solid black";
        groupListItem.style.margin = "1px 0px 1px 0px"
        groupListItem.style.backgroundColor = "ghostwhite";
        groupListItem.style.padding = "4px";
        const groupListItemTextElement = document.createElement("p")
        groupListItemTextElement.innerHTML = group.groupname;
        const groupListItemCheckboxElement = document.createElement("input");
        groupListItemCheckboxElement.setAttribute("groupId", group.group_id)
        groupListItemCheckboxElement.setAttribute("type", "checkbox");

        for (let i = 0; i < currentContactGroupings.length; i++) {
            if (group.group_id === currentContactGroupings[i].group_id) {
                groupListItem.classList.remove("inactive");
                groupListItem.classList.add("active");
                if (groupListItemCheckboxElement.getAttribute("groupId") === groupListItem.getAttribute("groupId")) {
                    groupListItemCheckboxElement.checked = true;
                }
            }

        }

        console.log(groupListItem)
        console.log(groupListItem.children[0])
        // if (groupListItem.classList.contains("active")) {
        //     groupListItem.children[1].checked = true;
        // }

        groupListItemCheckboxElement.addEventListener("input", function() {
            const groupListItemCheckboxElementParentElement = groupListItemCheckboxElement.parentElement;
            if (groupListItemCheckboxElement.checked) {
                groupListItemCheckboxElementParentElement.classList.remove("inactive");
                groupListItemCheckboxElementParentElement.classList.add("active")
            } else {
                groupListItemCheckboxElementParentElement.classList.remove("active");
                groupListItemCheckboxElementParentElement.classList.add("inactive")
            }

            console.log(groupListItemCheckboxElementParentElement)
        })

        groupListItem.appendChild(groupListItemTextElement);
        groupListItem.appendChild(groupListItemCheckboxElement);
        manageContactGroupsSelectionList.appendChild(groupListItem);  
    });

    const contactGroupsSelectionList = document.querySelector("#manage-contact-groups-selection-list");
    const contactGroupsSelectionListChildren = contactGroupsSelectionList.children;
    const contactGroupsSelectionListArr = Array.from(contactGroupsSelectionListChildren);
    console.log(contactGroupsSelectionListArr)

    contactGroupsSelectionListArr.forEach(item => {
        if (item.classList.contains("active")) {
            item.style.backgroundColor = "lightgreen"
        };

        item.addEventListener("mouseover", function() {
            item.style.backgroundColor = "lightgreen"
        });

        item.addEventListener("mouseout", function() {
            if (!item.classList.contains("active"))
            item.style.backgroundColor = "ghostwhite"
        });

        item.addEventListener("click", function(event) {
        const clickedItem = event.target
        console.log(clickedItem)

        // const customGroupInputContainer = document.querySelector("#custom-group-input-container");
        // customGroupInputContainer.classList.remove("active");
        // customGroupInputContainer.classList.add("inactive");
        // customGroupInputContainer.style.backgroundColor = "ghostwhite"

        // contactGroupsSelectionListArr.forEach(item => {
        //     if (item !== event.target) {
        //         item.classList.remove("active");
        //         item.classList.add("inactive")
        //         item.style.backgroundColor = "ghostwhite"
        //     }
        // })

        const clickedItemInput = clickedItem.children[1]
        console.log(clickedItemInput)

        if (clickedItem.classList.contains("inactive")) {
                clickedItem.classList.remove("inactive")
                clickedItem.classList.add("active")
                clickedItemInput.classList.remove("inactive")
                clickedItemInput.classList.add("active")
                clickedItem.style.backgroundColor = "lightgreen"
            } else if(clickedItem.classList.contains("active")) {
                clickedItem.classList.remove("active")
                clickedItem.classList.add("inactive")
                clickedItemInput.classList.remove("active")
                clickedItemInput.classList.add("inactive")
                clickedItem.style.backgroundColor = "ghostwhite"
            }
            
            if (clickedItemInput.classList.contains("active")) {
                clickedItemInput.checked = true
            } else {
                clickedItemInput.checked = false
            }
        });

        // let scrollTimeout;
        // contactGroupsSelectionList.addEventListener("scroll", function() {
        //     document.body.style.contactsUserHeaderNameContainer = "none"
        //     clearTimeout(scrollTimeout);

        //     scrollTimeout = setTimeout(function() {
        //         document.body.style.cursor = "default"
        //     }, 100)
        // })

    });

      const addContactToGroupsButton = document.querySelector("#add-contact-to-groups-button");
      addContactToGroupsButton.addEventListener("click", async function(event) {
        await deleteAContactGrouping()
        await postNewContactGrouping()

         const manageContactGroupsSelectionList = document.querySelector("#manage-contact-groups-selection-list");
    const groupsListItems = manageContactGroupsSelectionList.children;
    const groupsListItemsArr = Array.from(groupsListItems);


    // console.log(groupsListItemsArr)
        
    let addGroupsArr = []
    let removeGroupsArr = []
    groupsListItemsArr.forEach(group => {
    const groupName = group.children[0].innerHTML
    const groupId = Number(group.getAttribute("groupId"))
        if (group.classList.contains("active")) {
            const addGroupObj = {
                userId: userId,
                contactId: contactId,
                groupId: groupId,
                groupName: groupName
            }
            addGroupsArr.push(addGroupObj)
        } else {
             const removeGroupObj = {
                userId: userId,
                contactId: contactId,
                groupId: groupId,
                groupName: groupName
            }
            removeGroupsArr.push(removeGroupObj)
        }
    });

    let uniqueAddGroupsArr = []
    addGroupsArr.forEach(group => {

        const isIncluded = userContactGroupings.some(currentGroup => currentGroup.group_id === group.groupId && currentGroup.contact_id === group.contactId)
        if (!isIncluded) {
            uniqueAddGroupsArr.push(group)
        }
    })

    let uniqueRemoveGroupsArr = []
    removeGroupsArr.forEach(group => {

        const isIncluded = userContactGroupings.some(currentGroup => currentGroup.group_id === group.groupId && currentGroup.contact_id === group.contactId)
        if (isIncluded) {
            uniqueRemoveGroupsArr.push(group)
        }
    })

    if (uniqueAddGroupsArr.length === 0 && uniqueRemoveGroupsArr.length === 0) {
        event.preventDefault()
        alert("Please make a change to your contact's groups before updating.")
        return
    }
        // handleManageContactGroupsInput()
        window.location.href = `${rootUrl}/groups`
    });
};

async function handleManageContactGroupsInput(event) {
    const allUsers = await getAllUsers();
    const sessionId = sessionStorage.getItem("user");
    let matchingUser;
    for (let i = 0; i < allUsers.length; i++) {
        if (allUsers[i].session_id === sessionId) {
            matchingUser = allUsers[i]
        }
    }
    const userId = matchingUser.user_id;
    const userContacts = await getUserContacts(userId);
    const userGroups = await getUserGroups(userId);
    const userContactGroupings = await getUserContactGroupings(userId);

    const currentUrl = window.location.href;
    const urlContactId = currentUrl.split("contact_")[1];
    const queryCharIndex = urlContactId.indexOf("?")
    const contactId = Number(urlContactId.slice(0, queryCharIndex))
    // console.log(contactId)
    const manageContactGroupsSelectionList = document.querySelector("#manage-contact-groups-selection-list");
    const groupsListItems = manageContactGroupsSelectionList.children;
    const groupsListItemsArr = Array.from(groupsListItems);


    // console.log(groupsListItemsArr)
        
    let addGroupsArr = []
    let removeGroupsArr = []
    groupsListItemsArr.forEach(group => {
    const groupName = group.children[0].innerHTML
    const groupId = Number(group.getAttribute("groupId"))
        if (group.classList.contains("active")) {
            const addGroupObj = {
                userId: userId,
                contactId: contactId,
                groupId: groupId,
                groupName: groupName
            }
            addGroupsArr.push(addGroupObj)
        } else {
             const removeGroupObj = {
                userId: userId,
                contactId: contactId,
                groupId: groupId,
                groupName: groupName
            }
            removeGroupsArr.push(removeGroupObj)
        }
    });

    let uniqueAddGroupsArr = []
    addGroupsArr.forEach(group => {

        const isIncluded = userContactGroupings.some(currentGroup => currentGroup.group_id === group.groupId && currentGroup.contact_id === group.contactId)
        if (!isIncluded) {
            uniqueAddGroupsArr.push(group)
        }
    })

    let uniqueRemoveGroupsArr = []
    removeGroupsArr.forEach(group => {

        const isIncluded = userContactGroupings.some(currentGroup => currentGroup.group_id === group.groupId && currentGroup.contact_id === group.contactId)
        if (isIncluded) {
            uniqueRemoveGroupsArr.push(group)
        }
    })

    // for (let i = 0; i < removeGroupsArr.length; i++) {
    //     deleteAContactGrouping(removeGroupsArr[i].contactId, removeGroupsArr[i].groupId)
    // }

    console.log(addGroupsArr)
    console.log(removeGroupsArr)
    console.log(userContactGroupings)
    console.log(uniqueAddGroupsArr)
    console.log(uniqueRemoveGroupsArr)

    return { uniqueAddGroupsArr, uniqueRemoveGroupsArr, userContactGroupings, addGroupsArr }
};


async function renderNewContactContent() {
const allUsers = await getAllUsers();
    const sessionId = sessionStorage.getItem("user");
    let matchingUser;
    for (let i = 0; i < allUsers.length; i++) {
        if (allUsers[i].session_id === sessionId) {
            matchingUser = allUsers[i]
        }
    }
    const userId = matchingUser.user_id;
    const userContacts = await getUserContacts(userId);
    console.log(userContacts.length)

    const newContactImage = document.querySelector("#new-contact-image");
    const newContactRemovePhotoButton = document.querySelector("#new-contact-remove-photo-button");
    newContactRemovePhotoButton.addEventListener("click", function() {
        const newContactAddPhotoInputElement = document.querySelector("#new-contact-add-photo")
        newContactAddPhotoInputElement.value = ""
        newContactImage.setAttribute("src", "./images/user-2-svgrepo-com.svg")
    });

    const newContactAddPhotoButton = document.querySelector("#new-contact-add-photo-button");
    const newContactAddPhotoInputContainerElement = document.querySelector("#new-contact-add-photo-input-container")
    newContactAddPhotoButton.addEventListener("click", function() {
        console.log("add new contact photo")
        newContactAddPhotoInputContainerElement.style.display = "flex";
    });
    const closeNewContactAddPhotoIcon = document.querySelector("#close-new-contact-add-photo-icon");
    closeNewContactAddPhotoIcon.addEventListener("click", function() {
        newContactAddPhotoInputContainerElement.style.display = "none";
    })
    const newContactAddPhotoSaveButton = document.querySelector("#new-contact-add-photo-insert-button");
    newContactAddPhotoSaveButton.addEventListener("click", function() {
        // newContactAddPhotoInputContainerElement.style.display = "none";
        handleNewContactImage()
    }, false)

    const newContactGenderElement = document.querySelector("#new-contact-gender")
    // newContactGenderElement.value = user.gender;
    const selectGenderElement = document.querySelector("#new-contact-select-gender");
    const genderOpitonsData = [
        { text: "None", value: "None"},
        { text: "Female", value: "Female" },
        { text: "Male", value: "Male" }
      ];

      for (let i = 0; i < genderOpitonsData.length; i++) {
        const option = document.createElement("option");
        option.text = genderOpitonsData[i].text;
        option.value = genderOpitonsData[i].value;

        // if (option.text === user.gender) {
        //     option.setAttribute("selected", true)
        // }

        selectGenderElement.appendChild(option);
      }

      selectGenderElement.addEventListener('click', function(event) {
        // const selectedOptionValue = event.target.value;
        const selectedOptionText = event.target.options[event.target.selectedIndex].text;
        newContactGenderElement.value = selectedOptionText;
        // console.log('Selected option value:', selectedOptionValue);
        // console.log('Selected option text:', selectedOptionText);
      });

      newContactGenderElement.addEventListener("click", function() {
        newContactGenderElement.style.display = "none"
        selectGenderElement.style.display = "block";
      });

      selectGenderElement.addEventListener("blur", function() {
        newContactGenderElement.style.display = "block";
        selectGenderElement.style.display = "none";
      });

    const newContactPhoneNumberElement = document.querySelector("#new-contact-phonenumber");
    // const phonenumber = newContactPhoneNumberElement.value
    // console.log(phonenumber)
    newContactPhoneNumberElement.addEventListener("keydown", disableNonNumericKeys)
    newContactPhoneNumberElement.addEventListener("blur", function() {
        formatPhoneNumberForData(newContactPhoneNumberElement)
    });
    newContactPhoneNumberElement.addEventListener("focus", function() {
        resetPhoneNumberFormatOnFocus(newContactPhoneNumberElement)
    });
    newContactPhoneNumberElement.addEventListener("paste", function(event) {
        // event.preventDefault()
        const clipboard = event.clipboardData;
        const pastedText = clipboard.getData("Text")
        // let pastedText = (event.clipboardData || window.clipboardData).getData('text');
        pastedText.replace(/[^0-9]/g, '')
        event.target.value = pastedText;
        // removeNonNumericCharacters(pastedText)
    }, false);
    newContactPhoneNumberElement.addEventListener("input", function() {
        resetPhoneNumberFormatOnFocus(newContactPhoneNumberElement)
    });

    const createNewContactButton = document.querySelector("#create-new-contact-button")
    createNewContactButton.addEventListener("click", function() {
        postNewContact()
    });
};

async function renderMobileNewContactContent() {
const allUsers = await getAllUsers();
    const sessionId = sessionStorage.getItem("user");
    let matchingUser;
    for (let i = 0; i < allUsers.length; i++) {
        if (allUsers[i].session_id === sessionId) {
            matchingUser = allUsers[i]
        }
    }
    const userId = matchingUser.user_id;
    const userContacts = await getUserContacts(userId);
    console.log(userContacts.length)

   requestAnimationFrame(() => {
        const screenWidth = window.innerWidth;
        const screenHeight = window.innerHeight;
        const mobileNewContactHeaderElement = document.querySelector("#mobile-new-contact-header-container");
        const mobileNewContactHeaderElementHeight = mobileNewContactHeaderElement.clientHeight;
        const mobileNewContactImageCircleElement = document.querySelector("#mobile-new-contact-image-circle");
        const mobileContactFavoriteSquareElement = document.querySelector("#mobile-new-contact-favorite-square")
        const newWidth = (80 / 100) * mobileNewContactHeaderElementHeight
        const newWidthStr = newWidth.toString() + "px"

        mobileNewContactImageCircleElement.style.width = newWidthStr
        mobileContactFavoriteSquareElement.style.width = newWidthStr

        
        const mobileNewContactAddPhotoButtonContainerMarginLeft = mobileNewContactImageCircleElement.clientWidth + 5;
        const mobileNewContactAddPhotoButtonContainerMarginLeftStr =  mobileNewContactAddPhotoButtonContainerMarginLeft.toString() + "px"
        const mobileNewContactAddPhotoButtonContainer = document.querySelector("#mobile-new-contact-add-photo-button-container")
        mobileNewContactAddPhotoButtonContainer.style.marginLeft = mobileNewContactAddPhotoButtonContainerMarginLeftStr;
    });

    const newContactImage = document.querySelector("#mobile-new-contact-image");
    const newContactRemovePhotoButton = document.querySelector("#mobile-new-contact-remove-photo-button");
    newContactRemovePhotoButton.addEventListener("click", function() {
        const newContactAddPhotoInputElement = document.querySelector("#mobile-new-contact-add-photo")
        newContactAddPhotoInputElement.value = ""
        newContactImage.setAttribute("src", "./images/user-2-svgrepo-com.svg")
    })

    const newContactAddPhotoButton = document.querySelector("#mobile-new-contact-add-photo-button");
    const newContactAddPhotoInputContainerElement = document.querySelector("#mobile-new-contact-add-photo-input-container")
    newContactAddPhotoButton.addEventListener("click", function() {
        console.log("add new contact photo")
        newContactAddPhotoInputContainerElement.style.display = "flex";
    });
    const closeNewContactAddPhotoIcon = document.querySelector("#mobile-close-new-contact-add-photo-icon");
    closeNewContactAddPhotoIcon.addEventListener("click", function() {
        newContactAddPhotoInputContainerElement.style.display = "none";
    })
    const newContactAddPhotoSaveButton = document.querySelector("#mobile-new-contact-add-photo-insert-button");
    newContactAddPhotoSaveButton.addEventListener("click", function() {
        // newContactAddPhotoInputContainerElement.style.display = "none";
        handleMobileNewContactImage()
    }, false)

    const newContactGenderElement = document.querySelector("#mobile-new-contact-gender")
    // newContactGenderElement.value = user.gender;
    const selectGenderElement = document.querySelector("#mobile-new-contact-select-gender");
    const genderOpitonsData = [
        { text: "None", value: "None"},
        { text: "Female", value: "Female" },
        { text: "Male", value: "Male" }
      ];

      for (let i = 0; i < genderOpitonsData.length; i++) {
        const option = document.createElement("option");
        option.text = genderOpitonsData[i].text;
        option.value = genderOpitonsData[i].value;

        // if (option.text === user.gender) {
        //     option.setAttribute("selected", true)
        // }

        selectGenderElement.appendChild(option);
      }

      selectGenderElement.addEventListener('click', function(event) {
        // const selectedOptionValue = event.target.value;
        const selectedOptionText = event.target.options[event.target.selectedIndex].text;
        newContactGenderElement.value = selectedOptionText;
        // console.log('Selected option value:', selectedOptionValue);
        console.log('Selected option text:', selectedOptionText);
      });

      newContactGenderElement.addEventListener("click", function() {
        newContactGenderElement.style.display = "none"
        selectGenderElement.style.display = "block";
      });

      selectGenderElement.addEventListener("blur", function() {
        const selectedOptionText = event.target.options[event.target.selectedIndex].text;
        newContactGenderElement.value = selectedOptionText;
        console.log('Selected option text:', selectedOptionText);
        newContactGenderElement.style.display = "block";
        selectGenderElement.style.display = "none";
      });

    const newContactPhoneNumberElement = document.querySelector("#mobile-new-contact-phonenumber");
    // const phonenumber = newContactPhoneNumberElement.value
    // console.log(phonenumber)
    newContactPhoneNumberElement.addEventListener("keydown", disableNonNumericKeys)
    newContactPhoneNumberElement.addEventListener("blur", function() {
        formatPhoneNumberForData(newContactPhoneNumberElement)
    });
    newContactPhoneNumberElement.addEventListener("focus", function() {
        resetPhoneNumberFormatOnFocus(newContactPhoneNumberElement)
    });

    const createNewContactButton = document.querySelector("#mobile-create-new-contact-button")
    createNewContactButton.addEventListener("click", function() {
        mobilePostNewContact()
    });

    function disableTouchMove(event) {
        event.preventDefault();
    }

    const newContactFirstNameElement = document.querySelector("#mobile-new-contact-firstname");
    newContactFirstNameElement.addEventListener("focus", function () {
        document.addEventListener('touchmove', disableTouchMove, { passive: false });
    })
    newContactFirstNameElement.addEventListener("blur", function () {
        window.scrollTo(0, 0)
    })
    const newContactLastNameElement = document.querySelector("#mobile-new-contact-lastname");
     newContactLastNameElement.addEventListener("blur", function () {
        window.scrollTo(0, 0)
    })
    newContactLastNameElement.addEventListener("focus", function () {
        document.addEventListener('touchmove', disableTouchMove, { passive: false });
    })
    // const newContactGenderElement = document.querySelector("#mobile-new-contact-select-gender");
     newContactGenderElement.addEventListener("blur", function () {
        window.scrollTo(0, 0)
    })
    newContactGenderElement.addEventListener("focus", function () {
        document.addEventListener('touchmove', disableTouchMove, { passive: false });
    })
    const newContactBirthdayElement = document.querySelector("#mobile-new-contact-birthday")
     newContactBirthdayElement.addEventListener("blur", function () {
        window.scrollTo(0, 0)
    })
    newContactBirthdayElement.addEventListener("focus", function () {
        document.addEventListener('touchmove', disableTouchMove, { passive: false });
    })
    const newContactEmailAddressElement = document.querySelector("#mobile-new-contact-email");
     newContactEmailAddressElement.addEventListener("blur", function () {
        window.scrollTo(0, 0)
    })
    newContactEmailAddressElement.addEventListener("focus", function () {
        document.addEventListener('touchmove', disableTouchMove, { passive: false });
    })
    // const newContactPhoneNumberElement = document.querySelector("#mobile-new-contact-phonenumber");
     newContactPhoneNumberElement.addEventListener("blur", function () {
        window.scrollTo(0, 0)
    })
    newContactPhoneNumberElement.addEventListener("focus", function () {
        document.addEventListener('touchmove', disableTouchMove, { passive: false });
    })
    const newContactAddressElement = document.querySelector("#mobile-new-contact-address");
     newContactAddressElement.addEventListener("blur", function () {
        window.scrollTo(0, 0)
    })
    newContactAddressElement.addEventListener("focus", function () {
        document.addEventListener('touchmove', disableTouchMove, { passive: false });
    })
    const newContactOrganizationElement = document.querySelector("#mobile-new-contact-organization");
     newContactOrganizationElement.addEventListener("blur", function () {
        window.scrollTo(0, 0)
    })
    newContactOrganizationElement.addEventListener("focus", function () {
        document.addEventListener('touchmove', disableTouchMove, { passive: false });
    })
    const newContactRoleElement = document.querySelector("#mobile-new-contact-role")
     newContactRoleElement.addEventListener("blur", function () {
        window.scrollTo(0, 0)
    })
    newContactRoleElement.addEventListener("focus", function () {
        document.addEventListener('touchmove', disableTouchMove, { passive: false });
    })
    const newContactSocialMediaElement = document.querySelector("#mobile-new-contact-social-media");
     newContactSocialMediaElement.addEventListener("blur", function () {
        window.scrollTo(0, 0)
    })
    newContactSocialMediaElement.addEventListener("focus", function () {
        document.addEventListener('touchmove', disableTouchMove, { passive: false });
    })
    const newContactNotesElement = document.querySelector("#mobile-new-contact-notes")
     newContactNotesElement.addEventListener("blur", function () {
        window.scrollTo(0, 0)
    })
    newContactNotesElement.addEventListener("focus", function () {
        document.addEventListener('touchmove', disableTouchMove, { passive: false });
    })
    const newContactImageElement = document.querySelector("#mobile-new-contact-image");

    document.body.style.overflow = "hidden"
}

async function handleNewContactImage() {
    const newContactImageElement = document.querySelector("#new-contact-image");
    let newContactImageFile;
    let newContactImage;
    const newContactAddPhotoInputElement = document.querySelector("#new-contact-add-photo")
    // editUserAddPhotoInputElement.addEventListener("change", function(event) {
        // event.preventDefault();

        newContactImageFile = newContactAddPhotoInputElement.files[0];
        let reader = new FileReader()

        reader.onload = function () {
            base64string = reader.result.split(',')[1]
            newContactImage = reader.result;
            newContactImageElement.setAttribute("src", reader.result);
            newContactImageElement.style.borderRadius = "50%";
        };

        reader.readAsDataURL(newContactImageFile)
    // })
};

async function handleMobileNewContactImage() {
     const newContactImageElement = document.querySelector("#mobile-new-contact-image");
    let newContactImageFile;
    let newContactImage;
    const newContactAddPhotoInputElement = document.querySelector("#mobile-new-contact-add-photo")
    // editUserAddPhotoInputElement.addEventListener("change", function(event) {
        // event.preventDefault();

        newContactImageFile = newContactAddPhotoInputElement.files[0];
        let reader = new FileReader()

        reader.onload = function () {
            base64string = reader.result.split(',')[1]
            newContactImage = reader.result;
            newContactImageElement.setAttribute("src", reader.result);
            newContactImageElement.style.borderRadius = "50%";
        };

        reader.readAsDataURL(newContactImageFile)
    // })
}

async function handleNewContactInput() {
const allUsers = await getAllUsers();
    const sessionId = sessionStorage.getItem("user");
    let matchingUser;
    for (let i = 0; i < allUsers.length; i++) {
        if (allUsers[i].session_id === sessionId) {
            matchingUser = allUsers[i]
        }
    }
    const userId = matchingUser.user_id;
    const userContacts = await getUserContacts(userId);
    console.log(userContacts.length)
    

    const newContactFirstNameElement = document.querySelector("#new-contact-firstname");
    const newContactLastNameElement = document.querySelector("#new-contact-lastname");
    const newContactGenderElement = document.querySelector("#new-contact-gender");
    const newContactBirthdayElement = document.querySelector("#new-contact-birthday")
    const newContactEmailAddressElement = document.querySelector("#new-contact-email");
    const newContactPhoneNumberElement = document.querySelector("#new-contact-phonenumber");
    const newContactAddressElement = document.querySelector("#new-contact-address");
    const newContactOrganizationElement = document.querySelector("#new-contact-organization");
    const newContactRoleElement = document.querySelector("#new-contact-role")
    const newContactSocialMediaElement = document.querySelector("#new-contact-social-media");
    const newContactNotesElement = document.querySelector("#new-contact-notes")
    const newContactImageElement = document.querySelector("#new-contact-image");

    let contactIdsArr = []
    for (let i = 0; i < userContacts.length; i++) {
        contactIdsArr.push(userContacts[i].contact_id)
    }

    let maxId = -Infinity;
    for (let i = 0; i < contactIdsArr.length; i++) {
        if (contactIdsArr[i] > maxId) {
            maxId = contactIdsArr[i];
        }
    }

    console.log(maxId)
    if (maxId === -Infinity) {
        maxId = 0
    }

    const newContactObject = {
        userId: userId,
        contactId: maxId + 1,
        firstname: newContactFirstNameElement.value,
        lastname: newContactLastNameElement.value,
        gender: newContactGenderElement.value,
        birthday: newContactBirthdayElement.value,
        emailaddress: newContactEmailAddressElement.value,
        phonenumber: newContactPhoneNumberElement.value,
        organization: newContactOrganizationElement.value,
        role: newContactRoleElement.value,
        address: newContactAddressElement.value,
        socialMedia: newContactSocialMediaElement.value,
        notes: newContactNotesElement.value,
        contactImage: newContactImageElement.getAttribute("src")
    };

    console.log(newContactObject)

    return newContactObject;
};

async function handleMobileNewContactInput() {
const allUsers = await getAllUsers();
    const sessionId = sessionStorage.getItem("user");
    let matchingUser;
    for (let i = 0; i < allUsers.length; i++) {
        if (allUsers[i].session_id === sessionId) {
            matchingUser = allUsers[i]
        }
    }
    const userId = matchingUser.user_id;
    const userContacts = await getUserContacts(userId);
    console.log(userContacts.length)
    

    const newContactFirstNameElement = document.querySelector("#mobile-new-contact-firstname");
    const newContactLastNameElement = document.querySelector("#mobile-new-contact-lastname");
    const newContactGenderElement = document.querySelector("#mobile-new-contact-select-gender");
    const newContactBirthdayElement = document.querySelector("#mobile-new-contact-birthday")
    const newContactEmailAddressElement = document.querySelector("#mobile-new-contact-email");
    const newContactPhoneNumberElement = document.querySelector("#mobile-new-contact-phonenumber");
    const newContactAddressElement = document.querySelector("#mobile-new-contact-address");
    const newContactOrganizationElement = document.querySelector("#mobile-new-contact-organization");
    const newContactRoleElement = document.querySelector("#mobile-new-contact-role")
    const newContactSocialMediaElement = document.querySelector("#mobile-new-contact-social-media");
    const newContactNotesElement = document.querySelector("#mobile-new-contact-notes")
    const newContactImageElement = document.querySelector("#mobile-new-contact-image");

    let contactIdsArr = []
    for (let i = 0; i < userContacts.length; i++) {
        contactIdsArr.push(userContacts[i].contact_id)
    }

    let maxId = -Infinity;
    for (let i = 0; i < contactIdsArr.length; i++) {
        if (contactIdsArr[i] > maxId) {
            maxId = contactIdsArr[i];
        }
    }

    console.log(maxId)
    if (maxId === -Infinity) {
        maxId = 0
    }

    const newContactObject = {
        userId: userId,
        contactId: maxId + 1,
        firstname: newContactFirstNameElement.value,
        lastname: newContactLastNameElement.value,
        gender: newContactGenderElement.value,
        birthday: newContactBirthdayElement.value,
        emailaddress: newContactEmailAddressElement.value,
        phonenumber: newContactPhoneNumberElement.value,
        organization: newContactOrganizationElement.value,
        role: newContactRoleElement.value,
        address: newContactAddressElement.value,
        socialMedia: newContactSocialMediaElement.value,
        notes: newContactNotesElement.value,
        contactImage: newContactImageElement.getAttribute("src")
    };

    console.log(newContactObject)

    return newContactObject;
}
   

async function getAllUsers() {
    try {
    const response = await fetch(`/users`);
    const jsonData = await response.json();
    return jsonData;   
    } catch (err) {
    console.error(err.message)
    }
};

async function getUser(user_id) {
    try {
    const response = await fetch(`/users/${user_id}`);
    const jsonData = await response.json();
    return jsonData; 
    } catch (err) {
    console.error(err.message);
    }
};

async function postNewUser() {
    const registerUserObject = await handleRegisterInput();

    const user_id = registerUserObject.userId;
    const session_id = registerUserObject.sessionId;
    const firstname = registerUserObject.firstName;
    const lastname = registerUserObject.lastName;
    const emailaddress = registerUserObject.emailAddress;
    const phonenumber = registerUserObject.phonenumber;
    const user_password = registerUserObject.password;

    console.log(registerUserObject)

    const body = { user_id, session_id, firstname, lastname, emailaddress, phonenumber, user_password };
    try {
        const response = await fetch(`/users`, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(body)
        });
        console.log(response)
    } catch (err) {
        console.error(err)
    }

    window.location.href = `${rootUrl}/login`
};

async function mobilePostNewUser() {
    const registerUserObject = await handleMobileRegisterInput();

    const user_id = registerUserObject.userId;
    const session_id = registerUserObject.sessionId;
    const firstname = registerUserObject.firstName;
    const lastname = registerUserObject.lastName;
    const emailaddress = registerUserObject.emailAddress;
    const phonenumber = registerUserObject.phonenumber;
    const user_password = registerUserObject.password;

    console.log(registerUserObject)

    const body = { user_id, session_id, firstname, lastname, emailaddress, phonenumber, user_password };
    try {
        const response = await fetch(`/users`, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(body)
        });
        console.log(response)
    } catch (err) {
        console.error(err)
    }

    window.location.href = `${rootUrl}/login`
};

async function updateUser(event) {
    const url = window.location.href;
    const allUsers = await getAllUsers();
    const sessionId = sessionStorage.getItem("user");
    let matchingUser;
    for (let i = 0; i < allUsers.length; i++) {
        if (allUsers[i].session_id === sessionId) {
            matchingUser = allUsers[i]
        }
    }
    const user_id = matchingUser.user_id;
    const user = await getUser(user_id)
    const editUserObject = await handleEditUserInput();

    const editUserChangePasswordButton = document.querySelector("#edit-user-change-password-button");
    console.log(editUserObject)
    if (user.firstname === editUserObject.firstname && user.lastname === editUserObject.lastname && user.emailaddress === editUserObject.emailaddress && user.phonenumber === editUserObject.phonenumber && user.user_image === editUserObject.userImage && editUserChangePasswordButton.style.display !== "none") {
        // event.preventDefault()
        window.location.reload()
        return
    }

    const session_id = sessionId;
    const firstname = editUserObject.firstname;
    const lastname = editUserObject.lastname;
    const emailaddress = editUserObject.emailaddress;
    const phonenumber = editUserObject.phonenumber;
    const password = user.user_password;
    const user_image = editUserObject.userImage;

    const body = { firstname, lastname, emailaddress, phonenumber, password, user_image, session_id };
    try {
        const response = await fetch(`/users/${user_id}`, {
            method: "PUT",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(body)
        });
        console.log(response)
    } catch (error) {
        console.error(error)
    }
    
    if (user.firstname === editUserObject.firstname && user.lastname === editUserObject.lastname && user.emailaddress === editUserObject.emailaddress && user.phonenumber === editUserObject.phonenumber && user.user_image === editUserObject.userImage) {
        window.location.href = url
    } else {
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
                
        const myURL = `${rootUrl}/user`
        const myData = {
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
    
        window.location.href = newURL;
    }
};

async function mobileUpdateUser() {
    const url = window.location.href;
    const allUsers = await getAllUsers();
    const sessionId = sessionStorage.getItem("user");
    let matchingUser;
    for (let i = 0; i < allUsers.length; i++) {
        if (allUsers[i].session_id === sessionId) {
            matchingUser = allUsers[i]
        }
    }
    const user_id = matchingUser.user_id;
    const user = await getUser(user_id)
    const editUserObject = await handleMobileEditUserInput();

    const editUserChangePasswordButton = document.querySelector("#mobile-edit-user-change-password-button");
    console.log(editUserObject)
    if (user.firstname === editUserObject.firstname && user.lastname === editUserObject.lastname && user.emailaddress === editUserObject.emailaddress && user.phonenumber === editUserObject.phonenumber && user.user_image === editUserObject.userImage && editUserChangePasswordButton.style.display !== "none") {
        // event.preventDefault()
        window.location.reload()
        return
    }

    const session_id = sessionId;
    const firstname = editUserObject.firstname;
    const lastname = editUserObject.lastname;
    const emailaddress = editUserObject.emailaddress;
    const phonenumber = editUserObject.phonenumber;
    const password = user.user_password;
    const user_image = editUserObject.userImage;

    const body = { firstname, lastname, emailaddress, phonenumber, password, user_image, session_id };
    try {
        const response = await fetch(`/users/${user_id}`, {
            method: "PUT",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(body)
        });
        console.log(response)
    } catch (error) {
        console.error(error)
    }
    
    if (user.firstname === editUserObject.firstname && user.lastname === editUserObject.lastname && user.emailaddress === editUserObject.emailaddress && user.phonenumber === editUserObject.phonenumber && user.user_image === editUserObject.userImage) {
        window.location.href = url
    } else {
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
                
        const myURL = `${rootUrl}/user`
        const myData = {
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
    
        window.location.href = newURL;
    }
}

async function updateUserImage(event) {
    const url = window.location.href;
    const allUsers = await getAllUsers();
    const sessionId = sessionStorage.getItem("user");
    let matchingUser;
    for (let i = 0; i < allUsers.length; i++) {
        if (allUsers[i].session_id === sessionId) {
            matchingUser = allUsers[i]
        }
    }
    const user_id = matchingUser.user_id;
    const user = await getUser(user_id)
    const editUserImageObject = await handleEditUserImage();

    const editUserChangePasswordButton = document.querySelector("#edit-user-change-password-button");

    // if (user.firstname === editUserObject.firstname && user.lastname === editUserObject.lastname && user.emailaddress === editUserObject.emailaddress && user.phonenumber === editUserObject.phonenumber && user.user_image === editUserObject.userImage && editUserChangePasswordButton.style.display !== "none") {
    //     // event.preventDefault()
    //     window.location.reload()
    //     return
    // }

    const session_id = sessionId;
    const firstname = editUserImageObject.firstname;
    const lastname = editUserImageObject.lastname;
    const emailaddress = editUserImageObject.emailaddress;
    const phonenumber = editUserImageObject.phonenumber;
    const password = editUserImageObject.password;
    const user_image = editUserImageObject.userImage;

    const body = { firstname, lastname, emailaddress, phonenumber, password, user_image, session_id };
    try {
        const response = await fetch(`/users/${user_id}`, {
            method: "PUT",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(body)
        });
        console.log(response)
    } catch (error) {
        console.error(error)
    }

    
//    alert("Updated your profile picture.")
   window.location.reload()

};

async function mobileUpdateUserImage() {
     const url = window.location.href;
     const allUsers = await getAllUsers();
    const sessionId = sessionStorage.getItem("user");
    let matchingUser;
    for (let i = 0; i < allUsers.length; i++) {
        if (allUsers[i].session_id === sessionId) {
            matchingUser = allUsers[i]
        }
    }
    const user_id = matchingUser.user_id;
    const user = await getUser(user_id)
    const editUserImageObject = await handleMobileEditUserImage();

    const editUserChangePasswordButton = document.querySelector("#edit-user-change-password-button");

    // if (user.firstname === editUserObject.firstname && user.lastname === editUserObject.lastname && user.emailaddress === editUserObject.emailaddress && user.phonenumber === editUserObject.phonenumber && user.user_image === editUserObject.userImage && editUserChangePasswordButton.style.display !== "none") {
    //     // event.preventDefault()
    //     window.location.reload()
    //     return
    // }

    const session_id = sessionId;
    const firstname = editUserImageObject.firstname;
    const lastname = editUserImageObject.lastname;
    const emailaddress = editUserImageObject.emailaddress;
    const phonenumber = editUserImageObject.phonenumber;
    const password = editUserImageObject.password;
    const user_image = editUserImageObject.userImage;

    const body = { firstname, lastname, emailaddress, phonenumber, password, user_image, session_id };
    try {
        const response = await fetch(`/users/${user_id}`, {
            method: "PUT",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(body)
        });
        console.log(response)
    } catch (error) {
        console.error(error)
    }

    
//    alert("Updated your profile picture.")
   window.location.reload()
};

async function recoverUserAccount() {
    // const url = window.location.href;
    // const user_id = sessionStorage.getItem("user");
    // const user = await getUser(user_id)
    // const editUserPasswordObject = await handleEditUserPasswordInput();
    const recoverUserObject = await handleRecoverPasswordInput()

    const editUserChangePasswordButton = document.querySelector("#edit-user-change-password-button");

    // if (user.firstname === editUserObject.firstname && user.lastname === editUserObject.lastname && user.emailaddress === editUserObject.emailaddress && user.phonenumber === editUserObject.phonenumber && user.user_image === editUserObject.userImage && editUserChangePasswordButton.style.display !== "none") {
    //     // event.preventDefault()
    //     window.location.reload()
    //     return
    // }
    const session_id = recoverUserObject.sessionId;
    const user_id = recoverUserObject.userId;
    const firstname = recoverUserObject.firstname;
    const lastname = recoverUserObject.lastname;
    const emailaddress = recoverUserObject.emailaddress;
    const phonenumber = recoverUserObject.phonenumber;
    const password = recoverUserObject.password;
    const user_image = recoverUserObject.userImage;

    const body = { firstname, lastname, emailaddress, phonenumber, password, user_image, session_id };
    try {
        const response = await fetch(`/users/${user_id}`, {
            method: "PUT",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(body)
        });
        console.log(response)
    } catch (error) {
        console.error(error)
    }

    
   alert("Password changed.")
//    window.location.reload()

}

async function mobileRecoverUserAccount() {
    // const url = window.location.href;
    // const user_id = sessionStorage.getItem("user");
    // const user = await getUser(user_id)
    // const editUserPasswordObject = await handleEditUserPasswordInput();
    const recoverUserObject = await mobileHandleRecoverPasswordInput()

    const editUserChangePasswordButton = document.querySelector("#edit-user-change-password-button");

    // if (user.firstname === editUserObject.firstname && user.lastname === editUserObject.lastname && user.emailaddress === editUserObject.emailaddress && user.phonenumber === editUserObject.phonenumber && user.user_image === editUserObject.userImage && editUserChangePasswordButton.style.display !== "none") {
    //     // event.preventDefault()
    //     window.location.reload()
    //     return
    // }
    const session_id = recoverUserObject.sessionId;
    const user_id = recoverUserObject.userId;
    const firstname = recoverUserObject.firstname;
    const lastname = recoverUserObject.lastname;
    const emailaddress = recoverUserObject.emailaddress;
    const phonenumber = recoverUserObject.phonenumber;
    const password = recoverUserObject.password;
    const user_image = recoverUserObject.userImage;

    const body = { firstname, lastname, emailaddress, phonenumber, password, user_image };
    try {
        const response = await fetch(`/users/${user_id}`, {
            method: "PUT",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(body)
        });
        console.log(response)
    } catch (error) {
        console.error(error)
    }

    
   alert("Password changed.")
//    window.location.reload()

}

async function updateUserPassword(event) {
    const url = window.location.href;
    const allUsers = await getAllUsers();
    const sessionId = sessionStorage.getItem("user");
    let matchingUser;
    for (let i = 0; i < allUsers.length; i++) {
        if (allUsers[i].session_id === sessionId) {
            matchingUser = allUsers[i]
        }
    }
    const user_id = matchingUser.user_id;
    const user = await getUser(user_id)
    const editUserPasswordObject = await handleEditUserPasswordInput();

    const editUserChangePasswordButton = document.querySelector("#edit-user-change-password-button");

    // if (user.firstname === editUserObject.firstname && user.lastname === editUserObject.lastname && user.emailaddress === editUserObject.emailaddress && user.phonenumber === editUserObject.phonenumber && user.user_image === editUserObject.userImage && editUserChangePasswordButton.style.display !== "none") {
    //     // event.preventDefault()
    //     window.location.reload()
    //     return
    // }

    const session_id = sessionId;
    const firstname = user.firstname;
    const lastname = user.lastname;
    const emailaddress = user.emailaddress;
    const phonenumber = user.phonenumber;
    const password = editUserPasswordObject.password;
    const user_image = user.user_image;

    const body = { firstname, lastname, emailaddress, phonenumber, password, user_image, session_id };
    try {
        const response = await fetch(`/users/${user_id}`, {
            method: "PUT",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(body)
        });
        console.log(response)
    } catch (error) {
        console.error(error)
    }

    
   alert("Updated your password.")
   window.location.reload()

};

async function mobileUpdateUserPassword() {
    const url = window.location.href;
    const allUsers = await getAllUsers();
    const sessionId = sessionStorage.getItem("user");
    let matchingUser;
    for (let i = 0; i < allUsers.length; i++) {
        if (allUsers[i].session_id === sessionId) {
            matchingUser = allUsers[i]
        }
    }
    const user_id = matchingUser.user_id;
    const user = await getUser(user_id)
    const editUserPasswordObject = await handleMobileEditUserInput();

    const editUserChangePasswordButton = document.querySelector("#mobile-edit-user-change-password-button");

    // if (user.firstname === editUserObject.firstname && user.lastname === editUserObject.lastname && user.emailaddress === editUserObject.emailaddress && user.phonenumber === editUserObject.phonenumber && user.user_image === editUserObject.userImage && editUserChangePasswordButton.style.display !== "none") {
    //     // event.preventDefault()
    //     window.location.reload()
    //     return
    // }

    const session_id = sessionId;
    const firstname = user.firstname;
    const lastname = user.lastname;
    const emailaddress = user.emailaddress;
    const phonenumber = user.phonenumber;
    const password = editUserPasswordObject.password;
    const user_image = user.user_image;

    const body = { firstname, lastname, emailaddress, phonenumber, password, user_image, session_id };
    try {
        const response = await fetch(`/users/${user_id}`, {
            method: "PUT",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(body)
        });
        console.log(response)
    } catch (error) {
        console.error(error)
    }

    
   alert("Updated your password.")
   window.location.reload()

}

async function deleteUser() {
const allUsers = await getAllUsers();
    const sessionId = sessionStorage.getItem("user");
    let matchingUser;
    for (let i = 0; i < allUsers.length; i++) {
        if (allUsers[i].session_id === sessionId) {
            matchingUser = allUsers[i]
        }
    }
    const user_id = matchingUser.user_id;
    try {
        const response = await fetch(`/users/${user_id}`, {
            method: "DELETE",
            headers: { "Content-Type": "application/json" },
        });
        console.log(response)
    } catch (error) {
        console.error(error)
    }

    sessionStorage.clear();

    window.location.href = `${rootUrl}/login`
};

async function getUserContacts(user_id) {
    try {
    const response = await fetch(`/contacts/${user_id}`);
    const jsonData = await response.json();
    return jsonData; 
    } catch (err) {
    console.error(err.message);
    }
};

async function postNewContact() {
    const newContactObject = await handleNewContactInput();

    const user_id = newContactObject.userId;
    const contact_id = newContactObject.contactId;
    const firstname = newContactObject.firstname;
    const lastname = newContactObject.lastname;
    const emailaddress = newContactObject.emailaddress;
    const phonenumber = newContactObject.phonenumber;
    const gender = newContactObject.gender;
    const birthday = newContactObject.birthday;
    const homeaddress = newContactObject.address;
    const organization = newContactObject.organization;
    const organization_role = newContactObject.role;
    const social_media = newContactObject.socialMedia;
    const notes = newContactObject.notes;
    const contact_image = newContactObject.contactImage;

    // if (firstname === null || firstname.toString().trim().length === 0) {
    //     alert("First Name is a required input field. Please enter a first name.");
    //     return
    // }

    // if (emailaddress === null || emailaddress.toString().trim().length === 0) {
    //     alert("Email is a required input field. Please enter an email.");
    //     return
    // }

    const body = { user_id, contact_id, firstname, lastname, phonenumber, emailaddress, gender, birthday, homeaddress, organization, organization_role, social_media, notes, contact_image };
    try {
        const response = await fetch(`/contacts`, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(body)
        });
        console.log(response)
    } catch (err) {
        console.error(err)
    }

    window.location.href = `${rootUrl}/contacts`
};

async function mobilePostNewContact() {
    const newContactObject = await handleMobileNewContactInput();

    const user_id = newContactObject.userId;
    const contact_id = newContactObject.contactId;
    const firstname = newContactObject.firstname;
    const lastname = newContactObject.lastname;
    const emailaddress = newContactObject.emailaddress;
    const phonenumber = newContactObject.phonenumber;
    const gender = newContactObject.gender;
    const birthday = newContactObject.birthday;
    const homeaddress = newContactObject.address;
    const organization = newContactObject.organization;
    const organization_role = newContactObject.role;
    const social_media = newContactObject.socialMedia;
    const notes = newContactObject.notes;
    const contact_image = newContactObject.contactImage;

    // if (firstname === null || firstname.toString().trim().length === 0) {
    //     alert("First Name is a required input field. Please enter a first name.");
    //     return
    // }

    // if (emailaddress === null || emailaddress.toString().trim().length === 0) {
    //     alert("Email is a required input field. Please enter an email.");
    //     return
    // }

    const body = { user_id, contact_id, firstname, lastname, phonenumber, emailaddress, gender, birthday, homeaddress, organization, organization_role, social_media, notes, contact_image };
    try {
        const response = await fetch(`/contacts`, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(body)
        });
        console.log(response)
    } catch (err) {
        console.error(err)
    }

    window.location.href = `${rootUrl}/contacts`
}

async function getUserContact(user_id, contact_id) {
    try {
    const response = await fetch(`/contacts/${user_id}/${contact_id}`);
    const jsonData = await response.json();
    return jsonData; 
    } catch (err) {
    console.error(err.message);
    }
};

async function updateContact() {
const allUsers = await getAllUsers();
    const sessionId = sessionStorage.getItem("user");
    let matchingUser;
    for (let i = 0; i < allUsers.length; i++) {
        if (allUsers[i].session_id === sessionId) {
            matchingUser = allUsers[i]
        }
    }
    const user_id = matchingUser.user_id;
    const url = window.location.href.toString()
    const urlBeforeQuery = url.split('?')[0];
    const contact_id = urlBeforeQuery.split('contact_')[1]
    // const contact_id = urlBeforeQuery.charAt(urlBeforeQuery.length - 1);
    const editContactObject = await handleEditContactInput();
    console.log(user_id)
    console.log(contact_id)

    const firstname = editContactObject.firstname;
    const lastname = editContactObject.lastname;
    const emailaddress = editContactObject.emailaddress;
    const phonenumber = editContactObject.phonenumber;
    const birthday = editContactObject.birthday;
    const homeaddress = editContactObject.address;
    const gender = editContactObject.gender;
    const organization = editContactObject.organization;
    const organization_role = editContactObject.role;
    const social_media = editContactObject.socialMedia;
    const favorite = editContactObject.favorite;
    const notes = editContactObject.notes;
    const contact_image = editContactObject.contactImage;

    const body = { firstname, lastname, emailaddress, phonenumber, birthday, gender, birthday, homeaddress, organization, organization_role, social_media, favorite, notes, contact_image };
    try {
        const response = await fetch(`/contacts/${user_id}/${contact_id}`, {
            method: "PUT",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(body)
        });
        console.log(response)
    } catch (error) {
        console.error(error)
    }

    // if (contact.firstname === editContactObject.firstname && contact.lastname === editContactObject.lastname && contact.emailaddress === editContactObject.emailaddress && contact.phonenumber === editContactObject.phonenumber) {
    //     window.location.href = url
    // } 

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
    
    const myURL = `${rootUrl}/contact_${contact_id}`;
    const myData = {
        name: `${firstname} ${lastname}`,
        // age: 30,
        // city: "New York"
    };
    
    const newURL = saveDataToURL(myURL, myData);
    console.log(newURL);
    // Expected output: "https://example.com/page?name=John+Doe&age=30&city=New+York"
    window.location.href = newURL
};

async function mobileUpdateContact() {
const allUsers = await getAllUsers();
    const sessionId = sessionStorage.getItem("user");
    let matchingUser;
    for (let i = 0; i < allUsers.length; i++) {
        if (allUsers[i].session_id === sessionId) {
            matchingUser = allUsers[i]
        }
    }
    const user_id = matchingUser.user_id;
    const url = window.location.href.toString()
    const urlBeforeQuery = url.split('?')[0];
    const contact_id = urlBeforeQuery.split('contact_')[1]
    // const contact_id = urlBeforeQuery.charAt(urlBeforeQuery.length - 1);
    const editContactObject = await handleMobileEditContactInput();
    console.log(user_id)
    console.log(contact_id)

    const firstname = editContactObject.firstname;
    const lastname = editContactObject.lastname;
    const emailaddress = editContactObject.emailaddress;
    const phonenumber = editContactObject.phonenumber;
    const birthday = editContactObject.birthday;
    const homeaddress = editContactObject.address;
    const gender = editContactObject.gender;
    const organization = editContactObject.organization;
    const organization_role = editContactObject.role;
    const social_media = editContactObject.socialMedia;
    const favorite = editContactObject.favorite;
    const notes = editContactObject.notes;
    const contact_image = editContactObject.contactImage;

    const body = { firstname, lastname, emailaddress, phonenumber, birthday, gender, birthday, homeaddress, organization, organization_role, social_media, favorite, notes, contact_image };
    try {
        const response = await fetch(`/contacts/${user_id}/${contact_id}`, {
            method: "PUT",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(body)
        });
        console.log(response)
    } catch (error) {
        console.error(error)
    }

    // if (contact.firstname === editContactObject.firstname && contact.lastname === editContactObject.lastname && contact.emailaddress === editContactObject.emailaddress && contact.phonenumber === editContactObject.phonenumber) {
    //     window.location.href = url
    // } 

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
    
    const myURL = `${rootUrl}/contact_${contact_id}`;
    const myData = {
        name: `${firstname} ${lastname}`,
        // age: 30,
        // city: "New York"
    };
    
    const newURL = saveDataToURL(myURL, myData);
    console.log(newURL);
    // Expected output: "https://example.com/page?name=John+Doe&age=30&city=New+York"
    window.location.href = newURL
}

async function updateContactImage() {
const allUsers = await getAllUsers();
    const sessionId = sessionStorage.getItem("user");
    let matchingUser;
    for (let i = 0; i < allUsers.length; i++) {
        if (allUsers[i].session_id === sessionId) {
            matchingUser = allUsers[i]
        }
    }
    const user_id = matchingUser.user_id;
    const url = window.location.href.toString()
    const urlBeforeQuery = url.split('?')[0];
    const contact_id = urlBeforeQuery.split('contact_')[1]
    // const contact_id = urlBeforeQuery.charAt(urlBeforeQuery.length - 1);
    const editContactImageObject = await handleEditContactImage()

    const firstname = editContactImageObject.firstname;
    const lastname = editContactImageObject.lastname;
    const emailaddress = editContactImageObject.emailaddress;
    const phonenumber = editContactImageObject.phonenumber;
    const birthday = editContactImageObject.birthday;
    const homeaddress = editContactImageObject.address;
    const gender = editContactImageObject.gender;
    const organization = editContactImageObject.organization;
    const organization_role = editContactImageObject.role;
    const social_media = editContactImageObject.socialMedia;
    const notes = editContactImageObject.notes
    const favorite = editContactImageObject.favorite;
    const contact_image = editContactImageObject.contactImage;

    const body = { firstname, lastname, emailaddress, phonenumber, birthday, gender, birthday, homeaddress, organization, organization_role, social_media, notes, favorite, contact_image };
    try {
        const response = await fetch(`/contacts/${user_id}/${contact_id}`, {
            method: "PUT",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(body)
        });
        console.log(response)
    } catch (error) {
        console.error(error)
    };

   window.location.reload()
};

async function mobileUpdateContactImage() {
const allUsers = await getAllUsers();
    const sessionId = sessionStorage.getItem("user");
    let matchingUser;
    for (let i = 0; i < allUsers.length; i++) {
        if (allUsers[i].session_id === sessionId) {
            matchingUser = allUsers[i]
        }
    }
    const user_id = matchingUser.user_id;
    const url = window.location.href.toString()
    const urlBeforeQuery = url.split('?')[0];
    const contact_id = urlBeforeQuery.split('contact_')[1]
    // const contact_id = urlBeforeQuery.charAt(urlBeforeQuery.length - 1);
    const editContactImageObject = await handleMobileEditContactImage()

    const firstname = editContactImageObject.firstname;
    const lastname = editContactImageObject.lastname;
    const emailaddress = editContactImageObject.emailaddress;
    const phonenumber = editContactImageObject.phonenumber;
    const birthday = editContactImageObject.birthday;
    const homeaddress = editContactImageObject.address;
    const gender = editContactImageObject.gender;
    const organization = editContactImageObject.organization;
    const organization_role = editContactImageObject.role;
    const social_media = editContactImageObject.socialMedia;
    const notes = editContactImageObject.notes;
    const favorite = editContactImageObject.favorite;
    const contact_image = editContactImageObject.contactImage;

    const body = { firstname, lastname, emailaddress, phonenumber, birthday, gender, birthday, homeaddress, organization, organization_role, social_media, notes, favorite, contact_image };
    try {
        const response = await fetch(`/contacts/${user_id}/${contact_id}`, {
            method: "PUT",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(body)
        });
        console.log(response)
    } catch (error) {
        console.error(error)
    };

   window.location.reload()
}

async function updateContactFavorite() {
const allUsers = await getAllUsers();
    const sessionId = sessionStorage.getItem("user");
    let matchingUser;
    for (let i = 0; i < allUsers.length; i++) {
        if (allUsers[i].session_id === sessionId) {
            matchingUser = allUsers[i]
        }
    }
    const user_id = matchingUser.user_id;
    const favoriteObject = await handleContactFavorite()
    const favoriteValue = favoriteObject.favorite;
    const contact_id = favoriteObject.contactId;
    const contact = await getUserContact(user_id, contact_id);
    console.log(user_id)
    console.log(contact_id)
    console.log(favoriteValue)

    const firstname = contact.firstname;
    const lastname = contact.lastname;
    const emailaddress = contact.emailaddress;
    const phonenumber = contact.phonenumber;
    const birthday = contact.birthday;
    const homeaddress = contact.homeaddress;
    const gender = contact.gender;
    const organization = contact.organization;
    const organization_role = contact.organization_role;
    const social_media = contact.social_media;
    const favorite = favoriteValue;
    const notes = contact.notes;
    const contact_image = contact.contact_image;

    const body = { firstname, lastname, emailaddress, phonenumber, birthday, gender, birthday, homeaddress, organization, organization_role, social_media, favorite, notes, contact_image };
    try {
        const response = await fetch(`/contacts/${user_id}/${contact_id}`, {
            method: "PUT",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(body)
        });
        console.log(response)
    } catch (error) {
        console.error(error)
    };

   window.location.reload()
    
};

window.addEventListener('pageshow', function(event) {
    if (event.persisted || (window.performance && window.performance.navigation.type === 2)) {
      window.location.reload();
    }
  });
  
async function deleteContact() {
const allUsers = await getAllUsers();
    const sessionId = sessionStorage.getItem("user");
    let matchingUser;
    for (let i = 0; i < allUsers.length; i++) {
        if (allUsers[i].session_id === sessionId) {
            matchingUser = allUsers[i]
        }
    }
    const user_id = matchingUser.user_id;
    const url = window.location.href.toString()
    const urlBeforeQuery = url.split('?')[0];
    const contact_id = urlBeforeQuery.split('contact_')[1]
    // const contact_id = urlBeforeQuery.charAt(urlBeforeQuery.length - 1);
    // const contact = await getUserContact(user_id, contact_id);
    // const allUserContacts = await getUserContacts(user_id)

    try {
        const response = await fetch(`/contacts/${user_id}/${contact_id}`, {
            method: "DELETE",
            headers: { "Content-Type": "application/json" },
        });
        console.log(response)
    } catch (error) {
        console.error(error)
    }

    localStorage.clear()
    window.location.href = `${rootUrl}/contacts`
};

async function deleteContacts() {
const allUsers = await getAllUsers();
    const sessionId = sessionStorage.getItem("user");
    let matchingUser;
    for (let i = 0; i < allUsers.length; i++) {
        if (allUsers[i].session_id === sessionId) {
            matchingUser = allUsers[i]
        }
    }
    const user_id = matchingUser.user_id;
    try {
        const response = await fetch(`/contacts/${user_id}`, {
            method: "DELETE",
            headers: { "Content-Type": "application/json" },
        });
        console.log(response)
    } catch (error) {
        console.error(error)
    }

    localStorage.clear()
};


async function getUserGroups(user_id) {
    try {
    const response = await fetch(`/groups/${user_id}`);
    const jsonData = await response.json();
    return jsonData; 
    } catch (err) {
    console.error(err.message);
    }
};

async function getAUserGroup(user_id, group_id) {
    try {
    const response = await fetch(`/groups/${user_id}/${group_id}`);
    const jsonData = await response.json();
    return jsonData; 
    } catch (err) {
    console.error(err.message);
    }
};

async function postNewUserGroup() {
    const newUserGroup = await handleCreateGroupInput();

    const user_id = newUserGroup.userId;
    const group_id = newUserGroup.groupId;
    const groupName = newUserGroup.groupName

    const body = { user_id, group_id, groupName };
    try {
        const response = await fetch(`/groups`, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(body)
        });
        console.log(response)
    } catch (err) {
        console.error(err)
    }

    window.location.href = `${rootUrl}/groups`
};

async function editUserGroup() {
    const editedUserGroup = await handleEditGroupNameInput();

    const user_id = editedUserGroup.userId;
    const group_id = editedUserGroup.groupId;
    const groupName = editedUserGroup.groupName

    const body = { groupName };
    try {
        const response = await fetch(`/groups/${user_id}/${group_id}`, {
            method: "PUT",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(body)
        });
        console.log(response)
    } catch (err) {
        console.error(err)
    }

    window.location.href = `${rootUrl}/groups`
};

async function deleteUserGroup(group_id) {
const allUsers = await getAllUsers();
    const sessionId = sessionStorage.getItem("user");
    let matchingUser;
    for (let i = 0; i < allUsers.length; i++) {
        if (allUsers[i].session_id === sessionId) {
            matchingUser = allUsers[i]
        }
    }
    const user_id = matchingUser.user_id;

    try {
        const response = await fetch(`/groups/${user_id}/${group_id}`, {
            method: "DELETE",
            headers: { "Content-Type": "application/json" },
        });
        console.log(response)
    } catch (error) {
        console.error(error)
    }

    localStorage.clear()
    // window.location.href = `${rootUrl}/groups`
};

async function getUserContactGroupings(user_id) {
     try {
    const response = await fetch(`/contactGroups/${user_id}`);
    const jsonData = await response.json();
    return jsonData; 
    } catch (err) {
    console.error(err.message);
    }
}

async function postNewContactGrouping() {
    const newContactGroupings = await handleManageContactGroupsInput();
    const newContactGroupingsArr = newContactGroupings.uniqueAddGroupsArr;

    for (const grouping of newContactGroupingsArr) {
        const user_id = grouping.userId;
        const contact_id = grouping.contactId;
        const group_id = grouping.groupId;
        const groupName = grouping.groupName

        const body = { user_id, contact_id, group_id, groupName };
        try {
            const response = await fetch(`/contactGroups`, {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(body)
            });
            console.log(response)
        } catch (err) {
            console.error(err)
        }
    };

    // window.location.href = `${rootUrl}/groups`
};

async function deleteContactGrouping(group_id) {
const allUsers = await getAllUsers();
    const sessionId = sessionStorage.getItem("user");
    let matchingUser;
    for (let i = 0; i < allUsers.length; i++) {
        if (allUsers[i].session_id === sessionId) {
            matchingUser = allUsers[i]
        }
    }
    const user_id = matchingUser.user_id;

    try {
        const response = await fetch(`/contactGroups/${user_id}/${group_id}`, {
            method: "DELETE",
            headers: { "Content-Type": "application/json" },
        });
        console.log(response)
    } catch (error) {
        console.error(error)
    }

    localStorage.clear()
    window.location.href = `${rootUrl}/groups`
};

async function deleteAContactGrouping() {
// const allUsers = await getAllUsers();
//     const sessionId = sessionStorage.getItem("user");
//     let matchingUser;
//     for (let i = 0; i < allUsers.length; i++) {
//         if (allUsers[i].session_id === sessionId) {
//             matchingUser = allUsers[i]
//         }
//     }
//     const user_id = matchingUser.user_id;

    const removeContactGroupings = await handleManageContactGroupsInput();
    const removeContactGroupingsArr = removeContactGroupings.uniqueRemoveGroupsArr;

    for (const grouping of removeContactGroupingsArr) {
         const user_id = grouping.userId;
         const contact_id = grouping.contactId;
         const group_id = grouping.groupId;
        try {
            const response = await fetch(`/contactGroups/${user_id}/${contact_id}/${group_id}`, {
                method: "DELETE",
                headers: { "Content-Type": "application/json" },
            });
            console.log(response)
        } catch (error) {
            console.error(error)
        }
    }

    localStorage.clear()
    // window.location.href = `${rootUrl}/groups`
};

async function removeContactDeleteContactGroupings(removeContactGroupingsArr) {
// const allUsers = await getAllUsers();
//     const sessionId = sessionStorage.getItem("user");
//     let matchingUser;
//     for (let i = 0; i < allUsers.length; i++) {
//         if (allUsers[i].session_id === sessionId) {
//             matchingUser = allUsers[i]
//         }
//     }
//     const user_id = matchingUser.user_id;

    // const removeContactGroupings = await handleManageContactGroupsInput();
    // const removeContactGroupingsArr = removeContactGroupings.uniqueRemoveGroupsArr;

    for (const grouping of removeContactGroupingsArr) {
         const user_id = grouping.userId;
         const contact_id = grouping.contactId;
         const group_id = grouping.groupId;
        try {
            const response = await fetch(`/contactGroups/${user_id}/${contact_id}/${group_id}`, {
                method: "DELETE",
                headers: { "Content-Type": "application/json" },
            });
            console.log(response)
        } catch (error) {
            console.error(error)
        }
    }

    localStorage.clear()
    // window.location.href = `${rootUrl}/groups`
};

async function setInitialURLAsLogin() {
const allUsers = await getAllUsers();
    const sessionId = sessionStorage.getItem("user");
    // let matchingUser;
    // for (let i = 0; i < allUsers.length; i++) {
    //     if (allUsers[i].session_id === sessionId) {
    //         matchingUser = allUsers[i]
    //     }
    // }
    // const userId = matchingUser.user_id;
    // console.log(userId);

    const appName = document.querySelector("#app-name");

    // if (userId !== null) {
    //     appName.style.left = "32%"
    //     return
    // };

    if (window.location.href === `${rootUrl}/login`) {
        return
    };

    if (sessionId === null && window.location.href !== `${rootUrl}/register` && sessionId === null && window.location.href !== `${rootUrl}/recover-password`) {
        window.location.href = `${rootUrl}/login`
        return
    };
};

function disableNonNumericKeys(event) {
    const key = event.key;
    if (isNaN(key) && key !== 'Backspace' && key !== 'Tab' && key !== 'ArrowLeft' && key !== 'ArrowRight') {
        event.preventDefault();
    }
}

function removeNonNumericCharacters(inputString) {
  // The regular expression /\D/g matches any non-digit character globally.
  // Replacing these matches with an empty string effectively removes them.
  return inputString.replace(/\D/g, '');
}

let phoneNumberArr = []
function formatPhoneNumberForData(element) {
    let phonenumber = element.value;
    phonenumber = removeNonNumericCharacters(phonenumber)
    phonenumber.replace(/[\s+\-()]/g, '')
    console.log(phonenumber)

if (phonenumber.length === 10) {

    for (let i = 0; i < phonenumber.length; i++) {
        phoneNumberArr.push(phonenumber[i]);
    }
    phoneNumberArr.splice(0, 0, '(');
    phoneNumberArr.splice(4, 0, ')');
    phoneNumberArr.splice(5, 0, ' ')
    phoneNumberArr.splice(9, 0 , '-')   

    phonenumber = phoneNumberArr.join("");
    phoneNumberArr = []
}

if (phonenumber.length === 11) {

    for (let i = 0; i < phonenumber.length; i++) {
        phoneNumberArr.push(phonenumber[i]);
    }
    phoneNumberArr.splice(0, 0, '+');
    phoneNumberArr.splice(2, 0, ' ');
    phoneNumberArr.splice(3, 0, '(');
    phoneNumberArr.splice(7, 0 , ')');
    phoneNumberArr.splice(8, 0, ' ');
    phoneNumberArr.splice(12, 0, '-');    

    phonenumber = phoneNumberArr.join("")
    phoneNumberArr = []
}

if (phonenumber.length === 12) {

    for (let i = 0; i < phonenumber.length; i++) {
        phoneNumberArr.push(phonenumber[i]);
    }
    phoneNumberArr.splice(0, 0, '+');
    phoneNumberArr.splice(3, 0, ' ');
    phoneNumberArr.splice(4, 0, '(');
    phoneNumberArr.splice(8, 0 , ')');
    phoneNumberArr.splice(9, 0, ' ');
    phoneNumberArr.splice(13, 0, '-');    

    phonenumber = phoneNumberArr.join("")
    phoneNumberArr = []
}

if (phonenumber.length === 13) {

    for (let i = 0; i < phonenumber.length; i++) {
        phoneNumberArr.push(phonenumber[i]);
    }
    phoneNumberArr.splice(0, 0, '+');
    phoneNumberArr.splice(4, 0, ' ');
    phoneNumberArr.splice(5, 0, '(');
    phoneNumberArr.splice(9, 0 , ')');
    phoneNumberArr.splice(10, 0, ' ');
    phoneNumberArr.splice(14, 0, '-');    

    phonenumber = phoneNumberArr.join("")
    phoneNumberArr = []
}

    element.value = phonenumber
    return phonenumber
};

function resetPhoneNumberFormatOnFocus(element) {
    let phonenumber = element.value;
    phonenumber = removeNonNumericCharacters(phonenumber)
    phonenumber = phonenumber.replace(/[\s+\-()]/g, '')
    element.value = phonenumber
    // console.log(phonenumber)
}

async function domReady(cb) {
    document.readyState === 'interactive' || document.readyState === 'complete'
    ? cb
    : document.addEventListener("DOMContentLoaded", cb)
};

async function showPages() {
    const offsetwidth = document.body.offsetwidth;
    const clientwidth = window.innerWidth;

    // console.log(offsetwidth);
    // console.log(clientwidth);

    await setInitialURLAsLogin()

    const appName = document.querySelector("#app-name");
    
    const loginViewElement = document.querySelector("#login-view")
    if (window.location.href === `${rootUrl}/login` && clientwidth > 1070) {
        loginViewElement.style.display = "block"
        await renderLoginContent()
    } else {
        loginViewElement.style.display = "none"
    };

    const mobileLoginViewElement = document.querySelector("#mobile-login-view")
    if (window.location.href === `${rootUrl}/login` && clientwidth <= 1070) {
        mobileLoginViewElement.style.display = "block"
        await renderMobileLoginContent()
    } else {
        mobileLoginViewElement.style.display = "none"
    };

    const registerViewElement = document.querySelector("#register-view")
    if (window.location.href === `${rootUrl}/register` && clientwidth > 1070) {
        registerViewElement.style.display = "block";
        await renderRegisterContent()
    } else {
        registerViewElement.style.display = "none"
    };

    const mobileRegisterViewElement = document.querySelector("#mobile-register-view");
    if (window.location.href === `${rootUrl}/register` && clientwidth <= 1070) {
        mobileRegisterViewElement.style.display = "block";
        await renderMobileRegisterContent()
    } else {
        mobileRegisterViewElement.style.display = "none"
    };

    const recoverPasswordViewElement = document.querySelector("#recover-password-view");
    if (window.location.href === `${rootUrl}/recover-password` && clientwidth > 1070) {
        recoverPasswordViewElement.style.display = "block";
        await renderRecoverPassword();;
    } else {
        recoverPasswordViewElement.style.display = "none";
    }

    const mobileRecoverPasswordViewElement = document.querySelector("#mobile-recover-password-view");
    if (window.location.href === `${rootUrl}/recover-password` && clientwidth <= 1070) {
        mobileRecoverPasswordViewElement.style.display = "block";
        await renderMobileRecoverPassword();;
    } else {
        mobileRecoverPasswordViewElement.style.display = "none";
    }

    const smallSidebar = document.querySelector("#small-sidebar");
    const largeSidebar = document.querySelector("#large-sidebar")
    if (clientwidth <= 1070) {
        smallSidebar.style.display = "none";
        largeSidebar.style.display = "none";
    }

    const mobileSmallSidebar = document.querySelector("#mobile-footer");
    if (clientwidth > 1070) {
        mobileSmallSidebar.style.display = "none";
    }

    const topbar = document.querySelector("#topbar")
    if (window.location.href !== `${rootUrl}/login` && window.location.href !== `${rootUrl}/register` && window.location.href !== `${rootUrl}/recover-password` && clientwidth > 1070) {
        await renderSmallSidePanelContent()
        await renderLargeSidePanelContent()
        // appName.style.marginLeft = "32%"
        // topbar.style.boxShadow = "2px 2px 2px";
        // smallSidebar.style.width = "10%"
    }
    
    const mobileSearchIcon = document.querySelector("#mobile-search-icon")
    const mobileListMenuIcon = document.querySelector("#mobile-list-menu-icon")
    if (window.location.href !== `${rootUrl}/login` && window.location.href !== `${rootUrl}/register` && window.location.href !== `${rootUrl}/recover-password` && clientwidth <= 1070) {
        mobileListMenuIcon.style.display = "block";
        mobileSearchIcon.style.display = "block";
        // await renderLargeSidePanelContent()
    } else {
        mobileSmallSidebar.style.display = "none";
    }

    const mobileSearchContactsViewElement = document.querySelector("#mobile-contacts-search-view");
    if (window.location.href === `${rootUrl}/search-contacts` && clientwidth < 1070) {
        await renderMobileContactsSearchContent();
        mobileSearchContactsViewElement.style.display = "block";;
    } else {
        mobileSearchContactsViewElement.style.display = "none";
    }

    const contactsListViewElement = document.querySelector("#contacts-list-view");
    if (window.location.href === `${rootUrl}/contacts` && clientwidth > 1070) {
        contactsListViewElement.style.display = "block";
        appName.style.left = "32%"
        await renderContactsListContent()
    } else {
        contactsListViewElement.style.display = "none"
    };

    const mobileContactsListViewElement = document.querySelector("#mobile-contacts-list-view")
    if (window.location.href === `${rootUrl}/contacts` && clientwidth <= 1070) {
        mobileContactsListViewElement.style.display = "block";
        // appName.style.left = "32%"
        await renderMobileContactsListContent()
    } else {
        mobileContactsListViewElement.style.display = "none"
    };

    const contactViewElement = document.querySelector("#contact-view");
    if (window.location.href.startsWith(`${rootUrl}/contact_`) && clientwidth > 1070) {
        contactViewElement.style.display = "block";
        appName.style.left = "32%"
        await renderContactContent()
    } else {
        contactViewElement.style.display = "none"
    };

    const mobileContactViewElement = document.querySelector("#mobile-contact-view");
    if (window.location.href.startsWith(`${rootUrl}/contact_`) && clientwidth < 1070) {
        mobileContactViewElement.style.display = "block";
        await renderMobileContactContent()
    } else {
        mobileContactViewElement.style.display = "none"
    };

    const userViewElement = document.querySelector("#user-view");
    if (window.location.href.startsWith(`${rootUrl}/user`) && clientwidth > 1070) {
        userViewElement.style.display = "block";
        appName.style.left = "32%"
        await renderUserContent()
    } else {
        userViewElement.style.display = "none"
    };

    const mobileUserViewElement = document.querySelector("#mobile-user-view");
    if (window.location.href.startsWith(`${rootUrl}/user`) && clientwidth < 1070) {
        mobileUserViewElement.style.display = "block";
        await renderMobileUserContent()
    } else {
        mobileUserViewElement.style.display = "none"
    };

    const editUserViewElement = document.querySelector("#edit-user-view");
    if (window.location.href.startsWith(`${rootUrl}/edit_user`) && clientwidth > 1070) {
        editUserViewElement.style.display = "block";
        appName.style.left = "32%"
        await renderEditUserContent()
    } else {
        editUserViewElement.style.display = "none"
    };

    const mobileEditUserViewElement = document.querySelector("#mobile-edit-user-view");
    if (window.location.href.startsWith(`${rootUrl}/edit_user`) && clientwidth < 1070) {
        mobileEditUserViewElement.style.display = "block";
        await renderMobileEditUserContent()
    } else {
        mobileEditUserViewElement.style.display = "none"
    };

    const favoritesListViewElement = document.querySelector("#favorites-list-view");
    if (window.location.href === (`${rootUrl}/favorite_contacts`) && clientwidth > 1070) {
        favoritesListViewElement.style.display = "block";
        appName.style.left = "32%"
        await renderFavoriteContactsListContent()
    } else {
        favoritesListViewElement.style.display = "none"
    };

    const mobileFavoritesListViewElement = document.querySelector("#mobile-favorites-list-view");
    if (window.location.href === (`${rootUrl}/favorite_contacts`) && clientwidth < 1070) {
        mobileFavoritesListViewElement.style.display = "block";
        await renderMobileFavoriteContactsListContent()
    } else {
        mobileFavoritesListViewElement.style.display = "none"
    };

    const groupsListViewElement = document.querySelector("#groups-list-view");
        if (window.location.href === (`${rootUrl}/groups`) && clientwidth > 1070) {
        groupsListViewElement.style.display = "block";
        appName.style.left = "32%"
        await renderGroupsListContent()
    } else {
        groupsListViewElement.style.display = "none"
    };

    const createGroupsViewElement = document.querySelector("#create-groups-view");
        if (window.location.href === (`${rootUrl}/create-group`) && clientwidth > 1070) {
            createGroupsViewElement.style.display = "block";
            appName.style.left = "32%"
            await renderCreateGroupsContent()

    } else {
        createGroupsViewElement.style.display = "none"
    };

    const manageGroupsViewElement = document.querySelector("#manage-groups-view");
        if (window.location.href.startsWith(`${rootUrl}/manage_groups_contact`) && clientwidth > 1070) {
            manageGroupsViewElement.style.display = "block";
            appName.style.left = "32%"
            await renderManageContactGroupsContent()
    } else {
        manageGroupsViewElement.style.display = "none"
    };

    const groupContactsListView = document.querySelector("#group-contacts-list-view");
        if (window.location.href.startsWith(`${rootUrl}/group_`) && clientwidth > 1070) {
            groupContactsListView.style.display = "block";
            appName.style.left = "32%"
            // await renderManageContactGroupsContent()
            await renderGroupContactsListContent()
    } else {
        groupContactsListView.style.display = "none"
    };

    const newContactViewElement = document.querySelector("#new-contact-view");
    if (window.location.href === (`${rootUrl}/new_contact`) && clientwidth > 1070) {
        await renderNewContactContent()
        appName.style.left = "32%"
        newContactViewElement.style.display = "block";
    } else {
        newContactViewElement.style.display = "none"
    };

    const mobileNewContactViewElement = document.querySelector("#mobile-new-contact-view");
    const mobileFooterElement = document.querySelector("#mobile-footer");
    if (window.location.href === (`${rootUrl}/new_contact`) && clientwidth < 1070) {
        mobileNewContactViewElement.style.display = "block";
        await renderMobileNewContactContent()
        // mobileFooterElement.style.position = "absolute";
    } else {
        mobileNewContactViewElement.style.display = "none"
    };

    const editContactViewElement = document.querySelector("#edit-contact-view");
    if (window.location.href.startsWith(`${rootUrl}/edit_contact`) && clientwidth > 1070) {
        editContactViewElement.style.display = "block";
        appName.style.left = "32%"
        await renderEditContactContent()
    } else {
        editContactViewElement.style.display = "none"
    };

    const mobileEditContactViewElement = document.querySelector("#mobile-edit-contact-view");
    if (window.location.href.startsWith(`${rootUrl}/edit_contact`) && clientwidth < 1070) {
        mobileEditContactViewElement.style.display = "block";
        await renderMobileEditContactContent()
    } else {
        mobileEditContactViewElement.style.display = "none"
    };
}

domReady(async function() {
    await showPages()
    // setTimeout(function () {
    document.body.style.display = "block"
    // }, 100)
})

window.addEventListener("pageshow", function() {
    this.document.body.style.display = "none";
})

document.addEventListener("keydown", function(event) {
    if (event.key === "Enter") {
        event.preventDefault()
    }
})

const logoutIcon = document.querySelector("#logout-icon");
logoutIcon.addEventListener("click", function() {
    sessionStorage.clear();
    window.location.href = `${rootUrl}/login`
})

const mobileLogoutIcon = document.querySelector("#mobile-logout-page-button");
mobileLogoutIcon.addEventListener("click", function() {
    sessionStorage.clear();
    window.location.href = `${rootUrl}/login`
});

if ("virtualKeyboard" in navigator) {
  navigator.virtualKeyboard.overlaysContent = true;
}
