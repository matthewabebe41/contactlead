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
            };

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

    const newUserImageElement = document.querySelector("#register-user-image");
    const newUserImageInputElement = document.querySelector("#register-user-image-input")
    const newUserImageUrl = newUserImageElement.getAttribute("src")
    fetch(newUserImageUrl)
        .then(response => response.blob()) // Get the image as a Blob
        .then(blob => {
            // Now 'blob' contains the image data as a Blob object
            // You can then create a File object from the blob if necessary:
            const filename = newUserImageUrl.substring(newUserImageUrl.lastIndexOf('/') + 1); // Extract filename from URL
            const imageFile = new File([blob], filename, { type: blob.type });

            console.log(imageFile); // This is your image file object

            let reader = new FileReader()

            reader.onload = function () {
                base64string = reader.result.split(',')[1]
                // imageFile = reader.result;
                console.log(base64string)
                newUserImageInputElement.setAttribute("src", base64string);
                // newUserImageElement.style.borderRadius = "50%"
            };

            if (imageFile !== undefined) {
                reader.readAsDataURL(imageFile)
            }; 
        })
        .catch(error => console.error('Error fetching image:', error));

    const registerUserImageInputElement = document.querySelector("#register-user-image-input");
    // registerUserImageInputElement.value = ""

    const registerUserPhoneNumberElement = document.querySelector("#register-user-phonenumber");
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
        postNewUserImage();
        postNewUser();
    });
};

async function renderMobileRegisterContent() {
    const smallSidebar = document.querySelector("#small-sidebar");
    const largeSidebar = document.querySelector("#large-sidebar");
    smallSidebar.style.display = "none";
    largeSidebar.style.display = "none";

      const newUserImageElement = document.querySelector("#register-user-image");
    const newUserImageInputElement = document.querySelector("#register-user-image-input")
    const newUserImageUrl = newUserImageElement.getAttribute("src")
    fetch(newUserImageUrl)
        .then(response => response.blob()) // Get the image as a Blob
        .then(blob => {
            // Now 'blob' contains the image data as a Blob object
            // You can then create a File object from the blob if necessary:
            const filename = newUserImageUrl.substring(newUserImageUrl.lastIndexOf('/') + 1); // Extract filename from URL
            const imageFile = new File([blob], filename, { type: blob.type });

            console.log(imageFile); // This is your image file object

            let reader = new FileReader()

            reader.onload = function () {
                base64string = reader.result.split(',')[1]
                // imageFile = reader.result;
                console.log(base64string)
                newUserImageInputElement.setAttribute("src", base64string);
                // newUserImageElement.style.borderRadius = "50%"
            };

            if (imageFile !== undefined) {
                reader.readAsDataURL(imageFile)
            }; 
        })
        .catch(error => console.error('Error fetching image:', error));

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
        mobilePostNewUserImage();
        mobilePostNewUser();
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
        userImage: null
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
        userImage: null
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
const mobileFGroupsListMenuItem = document.querySelector("#mobile-groups-list-menu-item");
mobileFGroupsListMenuItem.addEventListener("click", function() {
    mobileFGroupsListMenuItem.style.backgroundColor = "lightgrey";
    mobileFGroupsListMenuItem.style.color = "white";
    window.location.href = `${rootUrl}/groups`;
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
async function navigateUserPageFromSidePanel(event) {
// event.preventDefault()
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

        // const urlPath = newURL;
        // await fetch(newURL, { cache: 'reload' });

        // const state = {page: 'User_Content'}
        // history.pushState(state, "", newURL);
        // window.history.pushState(null, "", window.location.href);
        // window.onpopstate = function() {
            // window.history.pushState(null, "", window.location.href)
            // history.go(1)
        // }
        
        // if (event.target.tagName = "BUTTON") {
        window.location.href = newURL
        // } else {
            // return
        // }
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

    // console.log(matchingUser)
    const userId = matchingUser.user_id;
    const user = await getUser(userId);

    const userImage = await getAUserImage(userId)

    const imageString = `data:${userImage.contentType};base64,${userImage.image}`


    const navigateUserPageIcon = document.querySelector("#navigate-user-page-icon");
    navigateUserPageIcon.setAttribute("src", imageString)

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
    for (let i = 0; i < userContacts.length; i++) {
        const contactId = userContacts[i].contact_id
        const contactImage = await getAContactImage(userId, contactId);
        const contactEmailAddresses = await getAContactEmailAddresses(userId, contactId)
        const contactEmailObj = contactEmailAddresses[0];
        let contactEmail;
        if (contactEmailObj !== undefined) {
            contactEmail = contactEmailObj.emailaddress;
        }
        // console.log(contactEmail)
        const contactImageStr = `data:${contactImage.contentType};base64,${contactImage.image}`
        userContacts[i]["email"] = contactEmail;
        userContacts[i]["imageString"] = contactImageStr;
    }
    // console.log(userContacts)

    requestAnimationFrame(() => {
        const contactsListContainer = document.querySelector("#sidebar-contacts-list-container");
        const searchContactsElementContainer = document.querySelector("#search-contacts-elements-container")
        const searchContactsElementContainerHeight = searchContactsElementContainer.clientHeight;
        // console.log(searchContactsElementContainer.clientHeight)
        const computedStyle = window.getComputedStyle(searchContactsElementContainer);
        const heightInPx = computedStyle.height
        // console.log(heightInPx)

         const screenHeight = window.innerHeight;
        //  console.log(screenHeight)

         const elementHeight = screenHeight * 0.093;
         const roundedElementHeightStr = elementHeight.toString() + "px"
        //  console.log(elementHeight.toString())
        
        const contactsListContainerMarginTop = searchContactsElementContainerHeight + 10;
        const contactsListContainerMarginTopStr = contactsListContainerMarginTop.toString() + "px"

        contactsListContainer.style.marginTop = roundedElementHeightStr
    });

    const contactsListElement = document.querySelector("#sidebar-contacts-list");

      userContacts.sort(function(a, b) {
        const nameA = `${a.firstname} ${a.lastname}`
        const nameB = `${b.firstname} ${b.lastname}`;
        return nameA.localeCompare(nameB)
      });

    //   console.log(userContacts)

    userContacts.forEach(contact => {
        const contactListItem = document.createElement("div");
        contactListItem.style.display = "flex";
        contactListItem.style.flexDirection = "row";
        contactListItem.style.height = "38px";
        contactListItem.style.marginBottom = "4px";
        contactListItem.style.padding = "5px";
        contactListItem.style.backgroundColor = "#fcfcff";
        contactListItem.style.border = "2px solid black";
        contactListItem.setAttribute("imageString", contact.imageString)

        contactListItem.addEventListener("mouseover", function() {
            contactListItem.style.backgroundColor = "lightgreen";
        });
        contactListItem.addEventListener("mouseout", function() {
            contactListItem.style.backgroundColor = "#fcfcff";
        });

        const contactImageItemContainer = document.createElement("div");
        contactImageItemContainer.style.display = "flex";
        contactImageItemContainer.style.alignItems = "center";
        const contactImageItem = document.createElement("img");
        contactImageItem.style.width = "35px";
        contactImageItem.style.height = "35px";
        contactImageItem.style.border = "0.5px solid black";
        contactImageItem.style.borderRadius = "50%";
        contactImageItem.style.backgroundColor = "gainsboro";
        contactImageItem.style.objectFit = "cover";
        // const contact_id = contact.contact_id;
        // const contactImage = await getAContactImage(userId, contact_id)
        // const imageString = `data:${contactImage.contentType};base64,${contactImage.image}`
        // contactImageItem.setAttribute("src", imageString);
        const contactListItemInformationContainer = document.createElement("div");
        contactListItemInformationContainer.style.position = "relative";
        contactListItemInformationContainer.style.display = "flex";
        contactListItemInformationContainer.style.flexDirection = "column";
        contactListItemInformationContainer.style.justifyContent = "center";
        contactListItemInformationContainer.style.alignItems = "center";
        contactListItemInformationContainer.style.minWidth = "0px";
        contactListItemInformationContainer.style.width = "100%";
        const contactListItemNameElementContainer = document.createElement("div");
        contactListItemNameElementContainer.style.display = "flex";
        contactListItemNameElementContainer.style.justifyContent = "flex-start";
        contactListItemNameElementContainer.style.minWidth = "0px";
        contactListItemNameElementContainer.style.width = "100%";
        const contactNameElement = document.createElement("p");
        contactNameElement.style.fontSize = "small";
        contactNameElement.style.fontWeight = "bolder";
        contactNameElement.style.whiteSpace = "nowrap";
        contactNameElement.style.overflow = "hidden";
        contactNameElement.style.textOverflow = "ellipsis";
        contactNameElement.style.margin = "0px 0px 0px 10px"
        contactNameElement.innerHTML = `${contact.firstname} ${contact.lastname}`;
        const contactListItemEmailElementContainer = document.createElement("div");
        contactListItemEmailElementContainer.style.display = "flex";
        contactListItemEmailElementContainer.style.justifyContent = "flex-start";
        // contactListItemEmailElementContainer.style.height = "100%";
        contactListItemEmailElementContainer.style.minWidth = "0px";
        contactListItemEmailElementContainer.style.width = "100%";
        const contactEmailElement = document.createElement("p");
        contactEmailElement.setAttribute("id", `contact-email-element-${contact.contact_id}`)
        contactListItem.setAttribute("contactEmailValue", contact.email)
        contactEmailElement.classList.add("contact-email-element");
        contactEmailElement.style.fontSize = "x-small";
        contactEmailElement.style.fontWeight = "normal";
        contactEmailElement.style.whiteSpace = "nowrap";
        contactEmailElement.style.overflow = "hidden";
        contactEmailElement.style.textOverflow = "ellipsis";
        contactEmailElement.style.margin = "0px 0px 0px 10px"
        if (contact.email !== null && contact.email !== undefined) {
            contactEmailElement.innerHTML = contact.email;
        } else {
            contactEmailElement.innerHTML = "text";
        }
        if (contactEmailElement.innerHTML === "text") {
                contactEmailElement.style.visibility = "hidden";
        };
        const contactFavoriteIconContainer = document.createElement("div");
        contactFavoriteIconContainer.style.display = "flex";
        contactFavoriteIconContainer.style.justifyContent = "center";
        contactFavoriteIconContainer.style.alignItems = "center";
        // contactFavoriteIconContainer.style.padding = "4px"
        const contactFavoriteIcon = document.createElement("img");
        contactFavoriteIcon.setAttribute("src", "./images/star-gold-svgrepo-com.svg");
        contactFavoriteIcon.style.width = "25px";
        // contactFavoriteIcon.style.display = "none";
        if (contact.favorite !== true) {
            contactFavoriteIcon.style.visibility = "hidden"
        }
        // const contactListItemNameElementContainer = document.createElement("div");
        // contactListItemNameElementContainer.style.display = "flex";
        // contactListItemNameElementContainer.style.flexDirection = "column";
        // contactListItemNameElementContainer.style.justifyContent = "center";
        // contactListItemNameElementContainer.style.minWidth = "0px";
        // contactNameElement.style.fontFamily = "sans-serif";
        // const contactEmailElement = document.createElement("p");
        // contactEmailElement.style.width = "220px";
        // contactEmailElement.style.fontFamily = "sans-serif"
        // contactEmailElement.style.fontSize = "small"
        // contactEmailElement.style.margin = "0px 0px 0px 10px";
        // contactEmailElement.style.fontSize = "x-small"
        const contactOrganizationAndRoleElement = document.createElement("p");
        contactOrganizationAndRoleElement.style.fontSize = "0px"
        contactOrganizationAndRoleElement.style.margin = "0px"
        contactOrganizationAndRoleElement.innerHTML = `${contact.organization} || ${contact.organization_role}`

        // const contactFullNameText = `${contact.firstname} ${contact.lastname}`
        // const ellipsis = "..."
        // let contactFullNameTextSlice = contactFullNameText.slice(0, 16) + ellipsis
        // console.log(contactEmailAddressText.length)
        // if (contactFullNameText.length > 16) {
        //     contactNameElement.innerHTML = contactFullNameTextSlice
        // } else {
        //     contactNameElement.innerHTML = `${contact.firstname} ${contact.lastname}`
        // }

        const contactNameElementWidth = contactNameElement.clientWidth;

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

        // contactListItemImageContainer.appendChild(contactListItemImage);
        // contactListNameElementContainer.appendChild(contactListNameElement);
        // contactListEmailElementContainer.appendChild(contactListEmailElement);
        // // contactListOrganizationAndRoleElementContainer.appendChild(contactListOrganizationAndRoleElement);
        // contactListNameContainer.appendChild(contactListNameElementContainer);
        // contactListNameContainer.appendChild(contactListEmailElementContainer);
        // contactListNameContainer.appendChild(contactListOrganizationAndRoleElementContainer);
        // contactListItem.appendChild(contactListItemImageContainer);
        // contactListItem.appendChild(contactListNameContainer);
        // contactListFavoritesStarIconContainer.appendChild(contactListFavoriteStarImg);
        // contactListItem.appendChild(contactListFavoritesStarIconContainer);
        // contactsList.appendChild(contactListItem);

        contactImageItemContainer.appendChild(contactImageItem);
        contactListItemNameElementContainer.appendChild(contactNameElement);
        contactListItemEmailElementContainer.appendChild(contactEmailElement)
        contactListItemInformationContainer.appendChild(contactListItemNameElementContainer)
        contactListItemInformationContainer.appendChild(contactListItemEmailElementContainer)
        contactListItem.appendChild(contactImageItemContainer)
        contactListItem.appendChild(contactListItemInformationContainer)
        contactFavoriteIconContainer.appendChild(contactFavoriteIcon);
        contactListItem.appendChild(contactFavoriteIconContainer)
        // contactListItemNameContainer.appendChild(contactOrganizationAndRoleElement)
        // contactListItemNameContainer.appendChild(contactImageItem);
        // contactListItemNameContainer.appendChild(contactListItemNameElementContainer)
        // contactListItem.appendChild(contactListItemImageContainer);
        // contactListItem.appendChild(contactListItemNameContainer);
        // contactListItem.appendChild(contactFavoriteIconContainer)
        contactsListElement.appendChild(contactListItem)
    });

    const contactListItems = Array.from(contactsListElement.children);
    // console.log(contactsListElement.children)

    // const contactsListElementHTMLArr = contactsListElement.children;
    // const contactListItems = [];

    // contactsListElementHTMLArr.forEach(element => {
    //     if (element.classList.contains('contact-list-item')) {
    //         contactListItems.push(element)
    //     }
    // })

    // for (let i = 0; i < contactsListElementHTMLArr.length; i++) {
    //     console.log(contactsListElementHTMLArr[i])
    //      if (contactsListElementHTMLArr[i].classList.contains('contact-list-item')) {
    //         contactListItems.push(contactsListElementHTMLArr[i])
    //     }
    // }

    // console.log(contactsListElementHTMLArr.length)

    contactListItems.forEach(element => {
        // console.log(element.firstChild.firstChild)
        const contactImageElement = element.firstChild.firstChild;
        const contactId = element.getAttribute('id')
        // const contact_id = contact.contact_id;
        // const contactImage = await getAContactImage(userId, contactId)
        // const imageString = `data:${contactImage.contentType};base64,${contactImage.image}`
        contactImageElement.setAttribute("src", element.getAttribute("imageString"));
        contactImageElement.style.borderRadius = "50%";
        // console.log(element.children[1].children[1].firstChild)
        const contactEmailElement = element.children[1].children[1].firstChild
        // const contactEmailAddresses = await getAContactEmailAddresses(userId, contactId)
        // console.log(contactEmailAddresses)
        if (element.getAttribute("contactEmailValue").innerHTML !== "undefined") {
            contactEmailElement.innerHTML = element.getAttribute("contactEmailValue");
        } else {
            contactEmailElement.innerHTML = "Text";
            contactEmailElement.style.visibility = "hidden"
        }

        contactImageElement
        element.addEventListener("click", (event) => {
            console.log("clicked")
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

    // const sideBarContactsListContainer = document.querySelector("#sidebar-contacts-list-container")
    // const searchContactsAutocompleteList = document.createElement("ul");
    // searchContactsAutocompleteList.style.display = "none";
    // searchContactsAutocompleteList.setAttribute("id", "autocomplete-contacts-list")
    // searchContactsAutocompleteList.style.margin = "0px";
    // searchContactsAutocompleteList.style.padding = "10px 10px 0px 12px"
    // sideBarContactsListContainer.appendChild(searchContactsAutocompleteList)

function removeDuplicatesFromDOM(selector) {
    const elements = document.querySelectorAll(selector);
    const seenContent = new Set();
    
    // Iterate in reverse if the DOM structure might change while looping (safer)
    for (let i = elements.length - 1; i >= 0; i--) {
        const currentElement = elements[i];
        // Use textContent or another unique attribute (like a data-id) for comparison
        const content = currentElement.getAttribute("index"); 

        if (seenContent.has(content)) {
            // Duplicate found, remove from the DOM
            currentElement.parentNode.removeChild(currentElement);
        } else {
            // Not seen, add to the Set
            seenContent.add(content);
        }
    }
}

const searchContactsElement = document.querySelector("#search-contacts-input")
searchContactsElement.addEventListener("input", contactsAutocompleteSearch);

// searchContactsElement.addEventListener("keydown", function() {
//     const searchContactsAutocompleteList = document.querySelector("#autocomplete-contacts-list");
//     searchContactsAutocompleteList.innerHTML = '';
// })

async function contactsAutocompleteSearch() {
    // removeDuplicatesFromDOM('.contactAutoCompleteListItem');
    const contactsList = document.querySelector("#sidebar-contacts-list");
    let searchContactsInputValue = searchContactsElement.value.toLowerCase().trimEnd();
    let filteredContacts = [];

    userContacts.filter(function(contact) {
        let contactFirstName = contact.firstname;
        let contactLastName = contact.lastname;
        let contactName = `${contact.firstname} ${contact.lastname}`

        // console.log(searchContactsInputValue.length)

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

      const uniqueArray = removeDuplicates(filteredContacts);
        searchContactsAutocompleteList.style.display = 'block';
        contactsList.style.display = "none"
      let elementsArr = [];
      uniqueArray.forEach(contact => {
        console.log(contact)

            const contactsAutoCompleteListItem = document.createElement('div');
            contactsAutoCompleteListItem.classList.add("contactsAutoCompleteListItem");
            contactsAutoCompleteListItem.setAttribute("id", contact.contact_id)
            contactsAutoCompleteListItem.setAttribute("contactEmailValue", contact.email)
            contactsAutoCompleteListItem.style.display = "flex";
            contactsAutoCompleteListItem.style.flexDirection = "row";
            contactsAutoCompleteListItem.style.height = "38px";
            contactsAutoCompleteListItem.style.marginBottom = "4px";
            contactsAutoCompleteListItem.style.padding = "5px";
            contactsAutoCompleteListItem.style.backgroundColor = "rgb(252, 252, 255)";
            contactsAutoCompleteListItem.style.border = "2px solid black";

            contactsAutoCompleteListItem.addEventListener("mouseover", function() {
            contactsAutoCompleteListItem.style.backgroundColor = "lightgreen";
            });
            contactsAutoCompleteListItem.addEventListener("mouseout", function() {
            contactsAutoCompleteListItem.style.backgroundColor = "#fcfcff";
            });

            const contactAutocompleteImageItemContainer = document.createElement("div");
            contactAutocompleteImageItemContainer.style.display = "flex";
            contactAutocompleteImageItemContainer.style.alignItems = "center";
            const contactAutoCompleteImage = document.createElement("img");
            contactAutoCompleteImage.classList.add("contactAutoCompleteImageElement");
            contactAutoCompleteImage.setAttribute("id", contact.contact_id)
            contactAutoCompleteImage.style.width = "35px";
            contactAutoCompleteImage.style.height = "35px";
            contactAutoCompleteImage.style.border = "0.5px solid black";
            contactAutoCompleteImage.style.borderRadius = "50%";
            contactAutoCompleteImage.style.backgroundColor = "gainsboro";
            contactAutoCompleteImage.style.objectFit = "cover";
            contactAutoCompleteImage.setAttribute("src", contact.imageString)
            const contactAutocompleteListItemInformationContainer = document.createElement("div");
            contactAutocompleteListItemInformationContainer.style.position = "relative";
            contactAutocompleteListItemInformationContainer.style.display = "flex";
            contactAutocompleteListItemInformationContainer.style.flexDirection = "column";
            contactAutocompleteListItemInformationContainer.style.justifyContent = "center";
            contactAutocompleteListItemInformationContainer.style.alignItems = "center";
            contactAutocompleteListItemInformationContainer.style.minWidth = "0px";
            contactAutocompleteListItemInformationContainer.style.width = "100%";
            const contactAutocompleteListItemNameElementContainer = document.createElement("div");
            contactAutocompleteListItemNameElementContainer.style.display = "flex";
            contactAutocompleteListItemNameElementContainer.style.justifyContent = "flex-start";
            contactAutocompleteListItemNameElementContainer.style.minWidth = "0px";
            contactAutocompleteListItemNameElementContainer.style.width = "100%";
            const contactAutocompleteNameElement = document.createElement("p");
            contactAutocompleteNameElement.classList.add("contactAutoCompleteNameElement");
            contactAutocompleteNameElement.style.fontSize = "small";
            contactAutocompleteNameElement.style.fontWeight = "bolder";
            contactAutocompleteNameElement.style.whiteSpace = "nowrap";
            contactAutocompleteNameElement.style.overflow = "hidden";
            contactAutocompleteNameElement.style.textOverflow = "ellipsis";
            contactAutocompleteNameElement.style.margin = "0px 0px 0px 10px"
            contactAutocompleteNameElement.innerHTML = `${contact.firstname} ${contact.lastname}`;
            const contactAutocompleteListItemEmailElementContainer = document.createElement("div");
            contactAutocompleteListItemEmailElementContainer.style.display = "flex";
            contactAutocompleteListItemEmailElementContainer.style.justifyContent = "flex-start";
            // contactAutocompleteListItemEmailElementContainer.style.height = "100%";
            contactAutocompleteListItemEmailElementContainer.style.minWidth = "0px";
            contactAutocompleteListItemEmailElementContainer.style.width = "100%";
            const contactAutocompleteEmailElement = document.createElement("p");
            contactAutocompleteEmailElement.setAttribute("id", `contact-email-element-${contact.contact_id}`)
            contactAutocompleteEmailElement.classList.add("contact-email-element");
            contactAutocompleteEmailElement.style.fontSize = "x-small";
            contactAutocompleteEmailElement.style.fontWeight = "normal";
            contactAutocompleteEmailElement.style.whiteSpace = "nowrap";
            contactAutocompleteEmailElement.style.overflow = "hidden";
            contactAutocompleteEmailElement.style.textOverflow = "ellipsis";
            contactAutocompleteEmailElement.style.margin = "0px 0px 0px 10px"
            if (contact.email !== null && contact.email !== undefined) {
            contactAutocompleteEmailElement.innerHTML = contact.email;
            } else {
            contactAutocompleteEmailElement.innerHTML = "text";
            }
            if (contactAutocompleteEmailElement.innerHTML === "text") {
                contactAutocompleteEmailElement.style.visibility = "hidden";
            };

            const contactAutocompleteFavoriteIconContainer = document.createElement("div");
            contactAutocompleteFavoriteIconContainer.style.display = "flex";
            contactAutocompleteFavoriteIconContainer.style.justifyContent = "center";
            contactAutocompleteFavoriteIconContainer.style.alignItems = "center";
            // contactAutocompleteFavoriteIconContainer.style.padding = "4px"
            const contactAutocompleteFavoriteIcon = document.createElement("img");
            contactAutocompleteFavoriteIcon.setAttribute("src", "./images/star-gold-svgrepo-com.svg");
            contactAutocompleteFavoriteIcon.style.width = "25px";
            // contactAutocompleteFavoriteIcon.style.display = "none";
            if (contact.favorite !== true) {
            contactAutocompleteFavoriteIcon.style.visibility = "hidden"
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

            contactsAutoCompleteListItem.addEventListener("click", (event) => {
            console.log("clicked")
            if (window.location.href === contactsAutoCompleteListItem.getAttribute("data")) {
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
                console.log(contactsAutoCompleteListItem)
                
                const myURL = contactsAutoCompleteListItem.getAttribute("data");
                console.log(myURL)

                const str = contactsAutoCompleteListItem.children[1].innerText;
                let char = "%";
                let index = str.indexOf(char)

                if (index !== -1) {
                    str = str.split(char)[0]
                }

                const myData = {
                    name: contactsAutoCompleteListItem.getAttribute("name"),
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

            contactAutocompleteImageItemContainer.appendChild(contactAutoCompleteImage);
            contactAutocompleteListItemNameElementContainer.appendChild(contactAutocompleteNameElement);
            contactAutocompleteListItemEmailElementContainer.appendChild(contactAutocompleteEmailElement);
            contactAutocompleteListItemInformationContainer.appendChild(contactAutocompleteListItemNameElementContainer);
            contactAutocompleteListItemInformationContainer.appendChild(contactAutocompleteListItemEmailElementContainer);
            contactsAutoCompleteListItem.appendChild(contactAutocompleteImageItemContainer);
            contactsAutoCompleteListItem.appendChild(contactAutocompleteListItemInformationContainer);
            contactAutocompleteFavoriteIconContainer.appendChild(contactAutocompleteFavoriteIcon);
            contactsAutoCompleteListItem.appendChild(contactAutocompleteFavoriteIconContainer);

            elementsArr.push(contactsAutoCompleteListItem)
            // console.log(elementsArr)
            elementsArr.forEach(element => {
                // console.log(element)
                searchContactsAutocompleteList.appendChild(element);
            });
      });
}};

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
                    console.log(filteredContacts)
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
    };
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

    const userImage = await getAUserImage(userId)

    const userImageContainer = document.querySelector("#user-image-container");
    // const userImage = new Image();

    const userImageElement = document.querySelector("#user-image");
    const imageString = `data:${userImage.contentType};base64,${userImage.image}`
    console.log(userImage.contentType)

    userImageElement.setAttribute("src", imageString)
    userImageElement.style.borderRadius = "50%"
    
    const userHeaderNameElement = document.querySelector("#header-user-name");
    userHeaderNameElement.innerHTML = `${user.firstname} ${user.lastname}`;
    const userHeaderEmailElement = document.querySelector("#header-user-email");
    userHeaderEmailElement.innerHTML = user.emailaddress;

    const userHeaderElement = document.querySelector("#user-name");
    userHeaderElement.innerHTML = "My Account";
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

    const userImage = await getAUserImage(userId)

    const userImageContainer = document.querySelector("#user-image-container");

    const editUserImage = document.querySelector("#edit-user-image");
    const imageString = `data:${userImage.contentType};base64,${userImage.image}`
    // console.log(userImage.contentType)

    editUserImage.setAttribute("src", imageString)
    editUserImage.style.borderRadius = "50%"
    
    const editUserAddPhotoButton = document.querySelector("#edit-user-add-photo-button");

    const editUserRemovePhotoButton = document.querySelector("#edit-user-remove-photo-button");
    editUserRemovePhotoButton.addEventListener("click", function() {
    
    const editUserAddPhotoInputElement = document.querySelector("#edit-user-add-photo");
    
    let editUserImageSrcStr = editUserImage.getAttribute("src").toString();
    if (editUserImageSrcStr !== "./images/user-5-svgrepo-com.svg") {
    let startIndex = editUserImageSrcStr.indexOf('d');
    let endIndex = editUserImageSrcStr.indexOf(',');
    
    if (startIndex !== -1 && endIndex !== -1 && endIndex > startIndex) {
        let part1 = editUserImageSrcStr.slice(0, startIndex);
        let part2 = editUserImageSrcStr.slice(endIndex + 1);
        editUserImageSrcStr = part1 + part2;
    }
     
    const decodedEditUserImage = atob(editUserImageSrcStr)
    
    const checkEditUserImageElement = document.querySelector("#check-edit-user-image");
    const checkEditUserImageUrl = checkEditUserImageElement.getAttribute("src");
    const editUserAddPhotoButtonReminder = document.querySelector("#edit-user-add-photo-button-reminder");

    fetch(checkEditUserImageUrl)
        .then(response => response.blob()) // Get the image as a Blob
        .then(blob => {
            // Now 'blob' contains the image data as a Blob object
            // You can then create a File object from the blob if necessary:
            const filename = checkEditUserImageUrl.substring(checkEditUserImageUrl.lastIndexOf('/') + 1); // Extract filename from URL
            const imageFile = new File([blob], filename, { type: blob.type });

            console.log(imageFile); // This is your image file object

            let reader = new FileReader()

            reader.onload = function () {
               const base64string = reader.result.split(',')[1]
                // imageFile = reader.result;
                // console.log(base64string)
                // newUserImageInputElement.setAttribute("src", base64string);
                // newUserImageElement.style.borderRadius = "50%"

                const decodedDefaultUserImage = atob(base64string)

                // console.log(decodedEditUserImage)

                if (decodedDefaultUserImage !== decodedEditUserImage) {
                      editUserAddPhotoButton.innerHTML = "Save Photo";
                      editUserAddPhotoButtonReminder.style.display = "flex";
                }

            };

            if (imageFile !== undefined) {
                reader.readAsDataURL(imageFile)
            }; 
        })
        .catch(error => console.error('Error fetching image:', error));


        console.log(imageString)
    };
        
    //check for unecessary conditions.
        if (editUserImage.getAttribute("src") !== imageString && editUserAddPhotoInputElement.value !== "") {
            editUserAddPhotoInputElement.value = "";
            editUserImage.setAttribute("src", "./images/user-5-svgrepo-com.svg")
        } else if (editUserImage.getAttribute("src") === imageString && editUserAddPhotoInputElement.value === "") {
            editUserImage.setAttribute("src", "./images/user-5-svgrepo-com.svg")
        } else if (editUserImage.getAttribute("src") !== imageString && editUserAddPhotoInputElement.value === "") {
            editUserImage.setAttribute("src", "./images/user-5-svgrepo-com.svg")
        } else if (editUserImage.getAttribute("src") === imageString && editUserAddPhotoInputElement.value !== "") {
            editUserAddPhotoInputElement.value = "";
            editUserImage.setAttribute("src", "./images/user-5-svgrepo-com.svg")
        } else if (editUserImage.getAttribute("src") !== imageString && editUserAddPhotoInputElement.value !== "") {
            editUserAddPhotoInputElement.value = "";
            editUserImage.setAttribute("src", "./images/user-5-svgrepo-com.svg")
        } else if (editUserImage.getAttribute("src") !== "./images/user-5-svgrepo-com.svg" && editUserAddPhotoInputElement.value === "") {
            editUserImage.setAttribute("src", imageString);
            editUserAddPhotoButton.innerHTML = "Change Photo"
            editUserAddPhotoButtonReminder.style.display = "none";
        }
    });

    const editUserAddPhotoButtonReminder = document.querySelector("#edit-user-add-photo-button-reminder");
    if (userImage !== null && userImage !== undefined) {
        editUserAddPhotoButton.innerHTML = "Change Photo";
        editUserAddPhotoButtonReminder.style.display = "none";
    };
    
    editUserAddPhotoButton.formAction = `${window.currentUrl}`;
    editUserAddPhotoButton.addEventListener("click", function(event) {
        // event.preventDefault()
        if (editUserAddPhotoButton.innerHTML === "Save Photo") {
            putNewUserImage()
        } ;
    });

    const editUserAddPhotoInputContainerElement = document.querySelector("#edit-user-add-photo-input-container")
    editUserAddPhotoButton.addEventListener("click", function(event) {
        // event.preventDefault()
        if (editUserAddPhotoButton.innerHTML !== "Save Photo") {
            editUserAddPhotoInputContainerElement.style.display = "flex";
        }
    });

    const closeEditUserAddPhotoIcon = document.querySelector("#close-edit-user-add-photo-icon");
    closeEditUserAddPhotoIcon.addEventListener("click", function(event) {
        // window.location.reload()
        editUserImage.setAttribute("src", imageString);
        const editUserAddPhotoInputElement = document.querySelector("#edit-user-add-photo");
        editUserAddPhotoInputElement.value = "";
        const editUserAddPhotoInputContainerElement = document.querySelector("#edit-user-add-photo-input-container")
        editUserAddPhotoInputContainerElement.style.display = "none";
        editUserAddPhotoButton.innerHTML = "Change Photo";
        const editUserAddPhotoButtonReminder = document.querySelector("#edit-user-add-photo-button-reminder");
        editUserAddPhotoButtonReminder.style.display = "none";
      
    });

    const editUserAddPhotoSaveButton = document.querySelector("#edit-user-add-photo-insert-button");
    editUserAddPhotoSaveButton.addEventListener("click", function() {
        // editUserAddPhotoInputContainerElement.style.display = "none";
        const editUserAddPhotoInputElement = document.querySelector("#edit-user-add-photo")
        console.log(editUserAddPhotoInputElement.files[0]);
        const editUserAddPhotoButtonReminder = document.querySelector("#edit-user-add-photo-button-reminder");
        
        if (editUserAddPhotoInputElement.files[0] !== undefined) {
            editUserAddPhotoButton.innerHTML = "Save Photo";
            editUserAddPhotoButtonReminder.style.display = "flex";
            // handleEditUserImage()
            handleUploadImageInput()
        } else {
            alert("Please choose an image before inserting.")
        }
    })

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

    editUserFirstNameElement.addEventListener("focus", async function() {
        // console.log(user)

        const userFirstName = user.firstname;
        const userLastName = user.lastname;
        const userEmailAddress = user.emailaddress;
        const userPhonenumber = user.phonenumber;

        editUserLastNameElement.value = userLastName;
        editUserEmailElement.value = userEmailAddress;
        editUserPhoneElement.value = userPhonenumber;
    });

    editUserLastNameElement.addEventListener("focus", async function() {
        // console.log(user)

        const userFirstName = user.firstname;
        const userLastName = user.lastname;
        const userEmailAddress = user.emailaddress;
        const userPhonenumber = user.phonenumber;

        editUserFirstNameElement.value = userFirstName;
        editUserEmailElement.value = userEmailAddress;
        editUserPhoneElement.value = userPhonenumber;
    });

    editUserEmailElement.addEventListener("focus", async function() {
        // console.log(user)

        const userFirstName = user.firstname;
        const userLastName = user.lastname;
        const userEmailAddress = user.emailaddress;
        const userPhonenumber = user.phonenumber;

        editUserFirstNameElement.value = userFirstName;
        editUserLastNameElement.value = userLastName;
        editUserPhoneElement.value = userPhonenumber;
    });

    editUserPhoneElement.addEventListener("focus", async function() {
        // console.log(user)

        const userFirstName = user.firstname;
        const userLastName = user.lastname;
        const userEmailAddress = user.emailaddress;
        const userPhonenumber = user.phonenumber;

        editUserFirstNameElement.value = userFirstName;
        editUserLastNameElement.value = userLastName;
        editUserEmailElement.value = userEmailAddress;
    });

    //     editContactFirstNameElement.addEventListener("focus", async function() {
    //     const contactEmailAddress = await getAContactEmailAddresses(user_id, contact_id);
    //     const contactPhoneNumbers = await getAContactPhoneNumber(user_id, contact_id);
    //     const contactAddresses = await getAContactAddress(user_id, contact_id);
    //     const contactWebsites = await getAContactWebsite(user_id, contact_id);

    //     const contactFirstName = contact.firstname;
    //     const contactLastName = contact.lastname;
    //     const contactGender = contact.gender;
    //     const contactBirthday = contact.birthday;
    //     const contactEmailSelectElement = document.querySelector("#select-edit-contact-email");
    //     const contactEmailSelectElementSelectedIndex = contactEmailSelectElement.selectedIndex;
    //     const contactEmailSelectedOptionElement = contactEmailSelectElement.options[contactEmailSelectElementSelectedIndex]
    //     const contactEmailSelectedIndexId = Number(contactEmailSelectedOptionElement.getAttribute("id"))
    //     let selectedEmail;
    //     for (let i = 0; i < contactEmailAddress.length; i++) {
    //         if (contactEmailAddress[i].emailid === contactEmailSelectedIndexId) {
    //             selectedEmail = contactEmailAddress[i].emailaddress;
    //         }
    //     };
    //     const contactPhoneNumberSelectElement = document.querySelector("#select-edit-contact-phonenumber");
    //     const contactPhoneNumberSelectElementSelectedIndex = contactPhoneNumberSelectElement.selectedIndex;
    //     const contactPhoneNumberSelectedOptionElement = contactPhoneNumberSelectElement.options[contactPhoneNumberSelectElementSelectedIndex];
    //     const contactPhoneNumberSelectedIndexId = Number(contactPhoneNumberSelectedOptionElement.getAttribute("id"));
    //     let selectedPhoneNumber;
    //     for (let i = 0; i < contactPhoneNumbers.length; i++) {
    //         if (contactPhoneNumbers[i].phonenumberid === contactPhoneNumberSelectedIndexId) {
    //             selectedPhoneNumber = contactPhoneNumbers[i].phonenumber
    //         }
    //     };
    //     const contactAddressSelectElement = document.querySelector("#select-edit-contact-address");
    //     const contactAddressSelectElementSelectedIndex = contactAddressSelectElement.selectedIndex;
    //     const contactAddressSelectedOptionElement = contactAddressSelectElement.options[contactAddressSelectElementSelectedIndex];
    //     const contactAddressSelectedIndexId = Number(contactAddressSelectedOptionElement.getAttribute("id"));
    //     let selectedAddress;
    //     for (let i = 0; i < contactAddresses.length; i++) {
    //         if (contactAddresses[i].addressid === contactAddressSelectedIndexId) {
    //             selectedAddress = contactAddresses[i].address;
    //         }
    //     }
    //     const contactOrganization = contact.organization;
    //     const contactOrganizationRole = contact.organization_role;
    //     const contactWebsiteSelectElement = document.querySelector("#select-edit-contact-website");
    //     const contactWebsitesSelectedIndex = contactWebsiteSelectElement.selectedIndex;
    //     const contactWebsitesSelectedOptionElement = contactWebsiteSelectElement.options[contactWebsitesSelectedIndex]
    //     const contactWebsitesSelectedIndexId = Number(contactWebsitesSelectedOptionElement.getAttribute("id"));
    //     let selectedWebsite;
    //     for (let i = 0; i < contactWebsites.length; i++) {
    //         // console.log(contactWebsites[i].websiteid)
    //         // console.log(contactWebsitesSelectedIndexId)
    //         if (contactWebsites[i].websiteid === contactWebsitesSelectedIndexId) {
    //             selectedWebsite = contactWebsites[i].website
    //         }
    //     }
    //     const contactNotes = contact.notes;
    //     const editContactSelectGenderElement = document.querySelector("#edit-contact-select-gender");
    //     editContactSelectGenderElement.style.display = "none";
    //     editContactGenderElement.style.display = "block";

    //     editContactLastNameElement.value = contactLastName;
    //     editContactGenderElement.value = contactGender;
    //     editContactBirthdayElement.value = contactBirthday;
    //     editContactEmailAddressElement.value = selectedEmail;
    //     editContactPhoneNumberElement.value = "";
    //     editContactPhoneNumberElement.value = selectedPhoneNumber;
    //     editContactAddressElement.value = selectedAddress;
    //     editContactOrganizationElement.value = contactOrganization;
    //     editContactRoleElement.value = contactOrganizationRole;
    //     editContactSocialMediaElement.value = selectedWebsite;
    //     editContactNotesElement.value = contactNotes;
    // });

    const editUserFirstNameButton = document.querySelector("#update-user-firstname-button");
    editUserFirstNameButton.addEventListener("click", function(event) {
        event.preventDefault();
        
        // handleUpdateUserFirstnameInput()
        updateUserFirstName()
    })

    const editUserLastNameButton = document.querySelector("#update-user-lastname-button");
    editUserLastNameButton.addEventListener("click", function(event) {
        event.preventDefault();

        // handleUpdateUserLastnameInput()
        updateUserLastName()
    });

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

    const editUserEmailButton = document.querySelector("#update-user-email-button");
    editUserEmailButton.addEventListener("click", function(event) {
        event.preventDefault();

        // handleUpdateUserEmailInput()
        updateUserEmail()
    });

    const editUserPhonenumberButton = document.querySelector("#update-user-phonenumber-button");
    editUserPhonenumberButton.addEventListener("click", function(event) {
        event.preventDefault();

        // handleUpdateUserPhonenumberInput();
        updateUserPhonenumber()
    })

    const editUserInformationRowFive = document.querySelector("#edit-user-information-row-five");
    const editUserInformationRowSix = document.querySelector("#edit-user-information-row-six");
    const editUserChangePasswordButton = document.querySelector("#edit-user-change-password-button");
    const editUserHidePasswordButton = document.querySelector("#edit-user-hide-password-button");
    editUserChangePasswordButton.addEventListener("click", function(event) {
        event.preventDefault()

        const userFirstName = user.firstname;
        const userLastName = user.lastname;
        const userEmailAddress = user.emailaddress;
        const userPhonenumber = user.phonenumber;

        editUserFirstNameElement.value = userFirstName;
        editUserLastNameElement.value = userLastName;
        editUserEmailElement.value = userEmailAddress;
        editUserPhoneElement.value = userPhonenumber;

        editUserFirstNameElement.readOnly = true;
        editUserLastNameElement.readOnly = true;
        editUserEmailElement.readOnly = true;
        editUserPhoneElement.readOnly = true;

        editUserFirstNameElement.setAttribute("title", "Close change password form to continue editing.")
        editUserLastNameElement.setAttribute("title", "Close change password form to continue editing.")
        editUserEmailElement.setAttribute("title", "Close change password form to continue editing.")
        editUserPhoneElement.setAttribute("title", "Close change password form to continue editing.")

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

        editUserFirstNameElement.readOnly = false;
        editUserLastNameElement.readOnly = false;
        editUserEmailElement.readOnly = false;
        editUserPhoneElement.readOnly = false;

        editUserFirstNameElement.removeAttribute("title")
        editUserLastNameElement.removeAttribute("title")
        editUserEmailElement.removeAttribute("title")
        editUserPhoneElement.removeAttribute("title")

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

    // const submitEditUserButton = document.querySelector("#submit-edit-user-button");
    // submitEditUserButton.addEventListener("click", function(event) {
    //     event.preventDefault()
    //     updateUser()
    // }, false)

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

        deleteAllUserGroups();
        deleteAllUserContactGroupings();
        deleteContacts();
        deleteUserImage();
        deleteUser();
    })
};

async function handleUpdateUserFirstnameInput() {
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

    // console.log(user)

    const editUserFirstNameElement = document.querySelector("#edit-user-firstname");
    const editUserFirstNameValue = editUserFirstNameElement.value;

     const editUserFirstNameObj = {
        userId: userId,
        sessionId: user.session_id,
        emailaddress: user.emailaddress,
        firstname: editUserFirstNameValue,
        lastname: user.lastname,
        phonenumber: user.phonenumber,
        password: user.user_password
    };

    console.log(editUserFirstNameObj)

    return editUserFirstNameObj
};

async function handleUpdateUserLastnameInput() {
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

    // console.log(user)

    const editUserLastNameElement = document.querySelector("#edit-user-lastname");
    const editUserLastNameValue = editUserLastNameElement.value;

     const editUserLastNameObj = {
        userId: userId,
        sessionId: user.session_id,
        emailaddress: user.emailaddress,
        firstname: user.firstname,
        lastname: editUserLastNameValue,
        phonenumber: user.phonenumber,
        password: user.user_password
    };

    console.log(editUserLastNameObj)

    return editUserLastNameObj
};

async function handleUpdateUserEmailInput() {
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

    const editUserEmailElement = document.querySelector("#edit-user-email");
    const editUserEmailValue = editUserEmailElement.value;

    const editUserEmailObj = {
        userId: userId,
        sessionId: user.session_id,
        emailaddress: editUserEmailValue,
        firstname: user.firstname,
        lastname: user.lastname,
        phonenumber: user.phonenumber,
        password: user.user_password
    };

    console.log(editUserEmailObj)

    return editUserEmailObj
};

async function handleUpdateUserPhonenumberInput() {
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

    const editUserPhonenumberElement = document.querySelector("#edit-user-phonenumber");
    const editUserPhonenumberValue = editUserPhonenumberElement.value;

    const editUserPhonenumberObj = {
        userId: userId,
        sessionId: user.session_id,
        emailaddress: user.emailaddress,
        firstname: user.firstname,
        lastname: user.lastname,
        phonenumber: editUserPhonenumberValue,
        password: user.user_password
    };

    console.log(editUserPhonenumberObj)

    return editUserPhonenumberObj
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

    const userImage = await getAUserImage(userId)

    const editUserImage = document.querySelector("#mobile-edit-user-image");
    const imageString = `data:${userImage.contentType};base64,${userImage.image}`
    console.log(userImage.contentType)
    editUserImage.setAttribute("src", imageString)
    editUserImage.style.borderRadius = "50%"

    const editUserAddPhotoButton = document.querySelector("#mobile-edit-user-add-photo-button");

    const editUserRemovePhotoButton = document.querySelector("#mobile-edit-user-remove-photo-button");
    editUserRemovePhotoButton.addEventListener("click", function() {
        const editUserAddPhotoInputElement = document.querySelector("#mobile-edit-user-add-photo");
       
        let editUserImageSrcStr = editUserImage.getAttribute("src").toString();
        let startIndex = editUserImageSrcStr.indexOf('d');
        let endIndex = editUserImageSrcStr.indexOf(',');
    
        if (startIndex !== -1 && endIndex !== -1 && endIndex > startIndex) {
            let part1 = editUserImageSrcStr.slice(0, startIndex);
            let part2 = editUserImageSrcStr.slice(endIndex + 1);
            editUserImageSrcStr = part1 + part2;
        };
    
        const decodedEditUserImage = atob(editUserImageSrcStr)
        const checkEditUserImageElement = document.querySelector("#check-edit-user-image");
        const checkEditUserImageUrl = checkEditUserImageElement.getAttribute("src");

            fetch(checkEditUserImageUrl)
        .then(response => response.blob()) // Get the image as a Blob
        .then(blob => {
            // Now 'blob' contains the image data as a Blob object
            // You can then create a File object from the blob if necessary:
            const filename = checkEditUserImageUrl.substring(checkEditUserImageUrl.lastIndexOf('/') + 1); // Extract filename from URL
            const imageFile = new File([blob], filename, { type: blob.type });

            console.log(imageFile); // This is your image file object

            let reader = new FileReader()

            reader.onload = function () {
                base64string = reader.result.split(',')[1]
                // imageFile = reader.result;
                // console.log(base64string)
                // newUserImageInputElement.setAttribute("src", base64string);
                // newUserImageElement.style.borderRadius = "50%"

                const decodedDefaultUserImage = atob(base64string)

                // console.log(decodedEditUserImage)

                if (decodedDefaultUserImage !== decodedEditUserImage) {
                      editUserAddPhotoButton.innerHTML = "Save Photo"
                }

            };

            if (imageFile !== undefined) {
                reader.readAsDataURL(imageFile)
            }; 
        })
        .catch(error => console.error('Error fetching image:', error));

        if (editUserImage.getAttribute("src") !== imageString && editUserAddPhotoInputElement.value !== "") {
            editUserAddPhotoInputElement.value = "";
            editUserImage.setAttribute("src", imageString)
        } else if (editUserImage.getAttribute("src") === imageString && editUserAddPhotoInputElement.value === "") {
            editUserImage.setAttribute("src", "./images/user-5-svgrepo-com.svg")
        } else if (editUserImage.getAttribute("src") !== imageString && editUserAddPhotoInputElement.value === "") {
            editUserImage.setAttribute("src", "./images/user-5-svgrepo-com.svg")
        } else if (editUserImage.getAttribute("src") === imageString && editUserAddPhotoInputElement.value !== "") {
            editUserAddPhotoInputElement.value = "";
            editUserImage.setAttribute("src", "./images/user-5-svgrepo-com.svg")
        } else if (editUserImage.getAttribute("src") !== imageString && editUserAddPhotoInputElement.value !== "") {
            editUserAddPhotoInputElement.value = "";
            editUserImage.setAttribute("src", "./images/user-5-svgrepo-com.svg")
        } else if (editUserImage.getAttribute("src") !== "./images/user-5-svgrepo-com.svg" && editUserAddPhotoInputElement.value === "") {
            editUserImage.setAttribute("src", imageString);
            editUserAddPhotoButton.innerHTML = "Change Photo"
        }
    });

    if (userImage !== null && userImage !== undefined) {
        editUserAddPhotoButton.innerHTML = "Change Photo"
    };

    editUserAddPhotoButton.formAction = `${window.currentUrl}`
    editUserAddPhotoButton.addEventListener("click", function(event) {
        // event.preventDefault()
      
        if (editUserAddPhotoButton.innerHTML === "Save Photo") {
            mobilePutNewUserImage()
        }

    });

    const editUserAddPhotoInputContainerElement = document.querySelector("#mobile-edit-user-add-photo-input-container")
    editUserAddPhotoButton.addEventListener("click", function(event) {
        // event.preventDefault()
        if (editUserAddPhotoButton.innerHTML !== "Save Photo") {
            editUserAddPhotoInputContainerElement.style.display = "flex";
        }
    });

    const closeEditUserAddPhotoIcon = document.querySelector("#mobile-close-edit-user-add-photo-icon");
    closeEditUserAddPhotoIcon.addEventListener("click", function(event) {
        // window.location.reload()
        editUserImage.setAttribute("src", imageString);
        const editUserAddPhotoInputElement = document.querySelector("#mobile-edit-user-add-photo");
        editUserAddPhotoInputElement.value = "";
        const editUserAddPhotoInputContainerElement = document.querySelector("#mobile-edit-user-add-photo-input-container")
        editUserAddPhotoInputContainerElement.style.display = "none";
        editUserAddPhotoButton.innerHTML = "Change Photo"
      
    })
    const editUserAddPhotoSaveButton = document.querySelector("#mobile-edit-user-add-photo-insert-button");
    editUserAddPhotoSaveButton.addEventListener("click", function() {
        // editUserAddPhotoInputContainerElement.style.display = "none";
        const editUserAddPhotoInputElement = document.querySelector("#mobile-edit-user-add-photo")
        console.log(editUserAddPhotoInputElement.files[0]);
        
        if (editUserAddPhotoInputElement.files[0] !== undefined) {
            editUserAddPhotoButton.innerHTML = "Save Photo"
            // handleEditUserImage()
            mobileHandleUploadImageInput()
        } else {
            alert("Please choose a file before inserting")
        }
    })

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

        console.log(screenWidth)
        const mobileEditUserAddPhoto = document.querySelector("#mobile-edit-user-add-photo-form");
        const mobileEditUserAddPhotoButtonsContainer = document.querySelector("#mobile-edit-user-add-photo-buttons-container")

         if (screenWidth >= 340 && screenWidth < 375) {
            mobileEditUserAddPhoto.style.width = "56%";
            mobileEditUserAddPhotoButtonsContainer.style.width = "44%";
        }
        if (screenWidth >= 375 && screenWidth < 425) {
            mobileEditUserAddPhoto.style.width = "60%";
            mobileEditUserAddPhotoButtonsContainer.style.width = "40%";
        }
        // if (screenWidth >= 400 && screenWidth < 425) {
        //     mobileEditUserAddPhoto.style.width = "61%";
        //     mobileEditUserAddPhotoButtonsContainer.style.width = "39%";
        // }
        if (screenWidth >= 425 && screenWidth < 525) {
            mobileEditUserAddPhoto.style.width = "60%";
            mobileEditUserAddPhotoButtonsContainer.style.width = "40%";
        }
        // if (screenWidth >= 450 && screenWidth < 475) {
        //     mobileEditUserAddPhoto.style.width = "63%";
        //     mobileEditUserAddPhotoButtonsContainer.style.width = "37%";
        // }
        // if (screenWidth >= 475 && screenWidth < 500) {
        //     mobileEditUserAddPhoto.style.width = "64%";
        //     mobileEditUserAddPhotoButtonsContainer.style.width = "36%";
        // }
        // if (screenWidth >= 500 && screenWidth < 525) {
        //     mobileEditUserAddPhoto.style.width = "65%";
        //     mobileEditUserAddPhotoButtonsContainer.style.width = "35%";
        // }
        if (screenWidth >= 525 && screenWidth < 625) {
            mobileEditUserAddPhoto.style.width = "65%";
            mobileEditUserAddPhotoButtonsContainer.style.width = "35%";
        }
        // if (screenWidth >= 550 && screenWidth < 575) {
        //     mobileEditUserAddPhoto.style.width = "67%";
        //     mobileEditUserAddPhotoButtonsContainer.style.width = "33%";
        // }
        // if (screenWidth >= 575 && screenWidth < 600) {
        //     mobileEditUserAddPhoto.style.width = "68%";
        //     mobileEditUserAddPhotoButtonsContainer.style.width = "32%";
        // }
        // if (screenWidth >= 600 && screenWidth < 625) {
        //     mobileEditUserAddPhoto.style.width = "69%";
        //     mobileEditUserAddPhotoButtonsContainer.style.width = "31%";
        // }
        if (screenWidth >= 625 && screenWidth < 725) {
            mobileEditUserAddPhoto.style.width = "70%";
            mobileEditUserAddPhotoButtonsContainer.style.width = "30%";
        }
        // if (screenWidth >= 650 && screenWidth < 675) {
        //     mobileEditUserAddPhoto.style.width = "71%";
        //     mobileEditUserAddPhotoButtonsContainer.style.width = "29%";
        // }
        // if (screenWidth >= 675 && screenWidth < 700) {
        //     mobileEditUserAddPhoto.style.width = "72%";
        //     mobileEditUserAddPhotoButtonsContainer.style.width = "28%";
        // }
        // if (screenWidth >= 700 && screenWidth < 725) {
        //     mobileEditUserAddPhoto.style.width = "73%";
        //     mobileEditUserAddPhotoButtonsContainer.style.width = "27%";
        // }
        if (screenWidth >= 725 && screenWidth < 825) {
            mobileEditUserAddPhoto.style.width = "75%";
            mobileEditUserAddPhotoButtonsContainer.style.width = "25%";
        }
        // if (screenWidth >= 750 && screenWidth < 775) {
        //     mobileEditUserAddPhoto.style.width = "70%";
        //     mobileEditUserAddPhotoButtonsContainer.style.width = "30%";
        // }
        // if (screenWidth >= 775 && screenWidth < 800) {
        //     mobileEditUserAddPhoto.style.width = "70%";
        //     mobileEditUserAddPhotoButtonsContainer.style.width = "30%";
        // }
        // if (screenWidth >= 800 && screenWidth < 825) {
        //     mobileEditUserAddPhoto.style.width = "70%";
        //     mobileEditUserAddPhotoButtonsContainer.style.width = "30%";
        // }
        if (screenWidth >= 825 && screenWidth < 1070) {
            mobileEditUserAddPhoto.style.width = "80%";
            mobileEditUserAddPhotoButtonsContainer.style.width = "20%";
        }
        // if (screenWidth >= 850 && screenWidth < 875) {
        //     mobileEditUserAddPhoto.style.width = "79%";
        //     mobileEditUserAddPhotoButtonsContainer.style.width = "21%";
        // }
        // if (screenWidth >= 875 && screenWidth < 900) {
        //     mobileEditUserAddPhoto.style.width = "80%";
        //     mobileEditUserAddPhotoButtonsContainer.style.width = "20%";
        // }
        // if (screenWidth >= 900 && screenWidth < 925) {
        //     mobileEditUserAddPhoto.style.width = "81%";
        //     mobileEditUserAddPhotoButtonsContainer.style.width = "19%";
        // }
        // if (screenWidth >= 1000 && screenWidth < 1070) {
        //     mobileEditUserAddPhoto.style.width = "85%";
        //     mobileEditUserAddPhotoButtonsContainer.style.width = "15%";
        // }
        // if (screenWidth >= 950 && screenWidth < 975) {
        //     mobileEditUserAddPhoto.style.width = "83%";
        //     mobileEditUserAddPhotoButtonsContainer.style.width = "17%";
        // }
        // if (screenWidth >= 975 && screenWidth < 1000) {
        //     mobileEditUserAddPhoto.style.width = "84%";
        //     mobileEditUserAddPhotoButtonsContainer.style.width = "16%";
        // }
        // if (screenWidth >= 1000 && screenWidth < 1025) {
        //     mobileEditUserAddPhoto.style.width = "80%";
        //     mobileEditUserAddPhotoButtonsContainer.style.width = "20%";
        // }
        // if (screenWidth >= 1025 && screenWidth < 1050) {
        //     mobileEditUserAddPhoto.style.width = "80%";
        //     mobileEditUserAddPhotoButtonsContainer.style.width = "20%";
        // }
        // if (screenWidth >= 1050 && screenWidth < 1070) {
        //     mobileEditUserAddPhoto.style.width = "80%";
        //     mobileEditUserAddPhotoButtonsContainer.style.width = "20%";
        // }
        
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
    });

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

async function handleUploadImageInput() {

    const newUserImageElement = document.querySelector("#edit-user-image");
    let newUserImageFile;
    let newUserImage;
    const editUserAddPhotoInputElement = document.querySelector("#edit-user-add-photo")

        newUserImageFile = editUserAddPhotoInputElement.files[0];
        let reader = new FileReader()

        console.log(newUserImageFile)

        reader.onload = function () {
            const base64string = reader.result.split(',')[1]
            newUserImage = reader.result;
            newUserImageElement.setAttribute("src", reader.result);
            newUserImageElement.style.borderRadius = "50%"
        };

        if (newUserImageFile !== undefined) {
            reader.readAsDataURL(newUserImageFile)
        };

    const editUserAddPhotoFormElement = document.querySelector("#edit-user-add-photo-form");
    // const editUserAddPhotoInputElement = document.querySelector("#edit-user-add-photo");
    // console.log(editUserAddPhotoFormElement)
    let imageFile = editUserAddPhotoInputElement.files[0];

    async function createIconImageFile() {
    const editUserImageElement = document.querySelector("#edit-user-image")
    const editUserImageUrl = editUserImageElement.getAttribute("src")
    let editImageFile;
        return fetch(editUserImageUrl)
            .then(response => response.blob()) // Get the image as a Blob
            .then(async (blob) => {
            // Now 'blob' contains the image data as a Blob object
            // You can then create a File object from the blob if necessary:
            const filename = editUserImageUrl.substring(editUserImageUrl.lastIndexOf('/') + 1); // Extract filename from URL
            editImageFile = new File([blob], filename, { type: blob.type });

            console.log(editImageFile); // This is your image file object

            return editImageFile
        })
    }

    if (imageFile === undefined) {
        imageFile = await createIconImageFile()
    }
        
    console.log(imageFile)

    // editUserAddPhotoInputElement.value = ""

    return imageFile
};

async function mobileHandleUploadImageInput() {
    // let imageFile;
    // let image;
    // const newUserImageElement = document.querySelector("#edit-user-image");

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
        };

    const editUserAddPhotoFormElement = document.querySelector("#mobile-edit-user-add-photo-form");
    // const editUserAddPhotoInputElement = document.querySelector("#edit-user-add-photo");
    // console.log(editUserAddPhotoFormElement)
    let imageFile = editUserAddPhotoInputElement.files[0];

    async function createIconImageFile() {
    const editUserImageElement = document.querySelector("#mobile-edit-user-image")
    const editUserImageUrl = editUserImageElement.getAttribute("src")
    let editImageFile;
        return fetch(editUserImageUrl)
            .then(response => response.blob()) // Get the image as a Blob
            .then(async (blob) => {
            // Now 'blob' contains the image data as a Blob object
            // You can then create a File object from the blob if necessary:
            const filename = editUserImageUrl.substring(editUserImageUrl.lastIndexOf('/') + 1); // Extract filename from URL
            editImageFile = new File([blob], filename, { type: blob.type });

            console.log(editImageFile); // This is your image file object

            return editImageFile
        })
    }

    if (imageFile === undefined) {
        imageFile = await createIconImageFile()
    }
        
    console.log(imageFile)

    // editUserAddPhotoInputElement.value = ""

    return imageFile
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
        // userImage: editUserImageElement.getAttribute("src")
        userImage: null
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
    const userContacts = await getUserContacts(userId);
    for (let i = 0; i < userContacts.length; i++) {
        const contactId = userContacts[i].contact_id
        const contactImage = await getAContactImage(userId, contactId);
        const contactEmailAddresses = await getAContactEmailAddresses(userId, contactId)
        const contactEmailObj = contactEmailAddresses[0];
        let contactEmail;
        if (contactEmailObj !== undefined) {
            contactEmail = contactEmailObj.emailaddress;
        }
        // console.log(contactEmail)
        const contactImageStr = `data:${contactImage.contentType};base64,${contactImage.image}`
        userContacts[i]["email"] = contactEmail;
        userContacts[i]["imageString"] = contactImageStr;
    }

    const userImage = await getAUserImage(userId);
    const imageString = `data:${userImage.contentType};base64,${userImage.image}`
    const contactsListUserImage = document.querySelector("#contacts-user-image");
    contactsListUserImage.setAttribute("src", imageString);
    contactsListUserImage.style.borderRadius = "50%";

    const contactsUserHeaderNameContainer = document.querySelector("#contacts-user-header-name-container");
    // contactsUserHeaderNameContainer.style.margin = "0px 0px 0px 10px"
    const contactsHeaderUserNameElement = document.querySelector("#contact-header-user-name");
    contactsHeaderUserNameElement.style.margin = "0px";
    const contactsHeaderUserEmailAddressElement = document.querySelector("#contact-header-user-email")
    // contactsHeaderUserEmailAddressElement.style.margin = "0px 0px 16px 0px";

    const contactsUserNameElement = document.querySelector("#contacts-user-name");
    contactsUserNameElement.style.fontFamily = "Arial"
    // contactsUserEmailAddressElement.innerHTML = `${user.emailaddress}`

    contactsHeaderUserNameElement.innerHTML = `${user.firstname} ${user.lastname}`;
    contactsHeaderUserEmailAddressElement.innerHTML = user.emailaddress;

    const contactsListContainer = document.createElement("div");
    contactsListContainer.setAttribute("id", "my-contacts-list-container");
    contactsListContainer.style.visibility = "hidden";
    const numberOfContactsElement = document.querySelector("#my-contacts-number");
    numberOfContactsElement.innerHTML = userContacts.length;
    contactsListContainer.style.position = "absolute";
    contactsListContainer.style.top = "38.5%"
    contactsListContainer.style.left = "31.5%"
    contactsListContainer.style.width = "68.5%"
    const contactsList = document.createElement("ul");
    contactsList.setAttribute("id", "my-contacts-list")
    contactsList.style.listStyle = "none";
    contactsList.style.padding = "0"
    contactsList.style.margin = "0";

    userContacts.sort(function(a, b) {
        const nameA = `${a.firstname} ${a.lastname}`
        const nameB = `${b.firstname} ${b.lastname}`;
        return nameA.localeCompare(nameB)
      });

    userContacts.forEach(contact => {
        const contactListItem = document.createElement("div");
        contactListItem.style.display = "flex";
        contactListItem.style.flexDirection = "row";
        contactListItem.style.height = "70px"
        contactListItem.style.borderTop = "2px solid black";
        contactListItem.style.borderBottom = "2px solid black";
        contactListItem.style.backgroundColor = "#fcfcff"
        contactListItem.style.marginTop = "1px";
        contactListItem.style.marginBottom = "1px";
        contactListItem.setAttribute("contactId", contact.contact_id)

        contactListItem.addEventListener("mouseover", function() {
            contactListItem.style.backgroundColor = "lightgreen";
        });

        contactListItem.addEventListener("mouseout", function() {
            contactListItem.style.backgroundColor = "#fcfcff";
        });

        contactListItem.addEventListener("click", function(event) {
                
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
        contactListItemImageContainer.style.padding = "10px"
        const contactListItemImage = document.createElement("img");
        contactListItemImage.style.width = "57px";
        contactListItemImage.style.height = "57px";
        contactListItemImage.style.border = "0.5px solid grey";
        contactListItemImage.style.borderRadius = "50%"
        contactListItemImage.style.backgroundColor = "gainsboro";
        contactListItemImage.style.border = "1px solid black";
        contactListItemImage.style.objectFit = "cover";
        contactListItemImage.setAttribute("src", contact.imageString)
        // console.log(contact.imageString)
        const contact_id = contact.contact_id;
        // const contactImage = await getAContactImage(userId, contact_id)
        // const imageString = `data:${contactImage.contentType};base64,${contactImage.image}`
        // contactListItemImage.setAttribute("src", imageString);
        // contactListItemImage.style.borderRadius = "50%";

        const contactListNameContainer = document.createElement("div");
        contactListNameContainer.style.position = "relative";
        contactListNameContainer.style.display = "flex";
        contactListNameContainer.style.flexDirection = "column";
        contactListNameContainer.style.justifyContent = "space-around";
        contactListNameContainer.style.alignItems = "center";
        contactListNameContainer.style.minWidth = "0";
        contactListNameContainer.style.width = "100%";
        const contactListNameElementContainer = document.createElement("div");
        contactListNameElementContainer.style.display = "flex";
        contactListNameElementContainer.style.justifyContent = "center";
        contactListNameElementContainer.style.minWidth = "0";
        contactListNameElementContainer.style.width = "100%";
        const contactListNameElement = document.createElement("h3");
        contactListNameElement.style.whiteSpace = "nowrap";
        contactListNameElement.style.overflow = "hidden";
        contactListNameElement.style.textOverflow = "ellipsis";
        contactListNameElement.style.cursor = "default";
        contactListNameElement.style.margin = "0";
        contactListNameElement.innerHTML = `${contact.firstname} ${contact.lastname}`;
        const contactListEmailElementContainer = document.createElement("div");
        contactListEmailElementContainer.style.display = "flex";
        contactListEmailElementContainer.style.justifyContent = "center";
        contactListEmailElementContainer.style.minWidth = "0";
        contactListEmailElementContainer.style.width = "100%";
        const contactListEmailElement = document.createElement("p");
        contactListEmailElement.style.fontStyle = "italic";
        contactListEmailElement.style.fontSize = "small";
        contactListEmailElement.style.whiteSpace = "nowrap";
        contactListEmailElement.style.overflow = "hidden";
        contactListEmailElement.style.textOverflow = "ellipsis";
        contactListEmailElement.style.cursor = "default";
        contactListEmailElement.style.margin = "0";
        const contactEmail = contact.email;
        contactListEmailElement.innerHTML = contactEmail;
        if (contactListEmailElement.innerHTML === "undefined") {
            contactListEmailElement.style.visibility = "hidden";
        };
        const contactListOrganizationAndRoleElementContainer = document.createElement("div");
        contactListOrganizationAndRoleElementContainer.style.display = "flex";
        contactListOrganizationAndRoleElementContainer.style.justifyContent = "center";
        contactListOrganizationAndRoleElementContainer.style.minWidth = "0";
        contactListOrganizationAndRoleElementContainer.style.width = "100%";
        const contactListOrganizationAndRoleElement = document.createElement("p");
        contactListOrganizationAndRoleElement.style.fontWeight = "bolder";
        contactListOrganizationAndRoleElement.style.fontSize = "smaller"
        contactListOrganizationAndRoleElement.style.whiteSpace = "nowrap";
        contactListOrganizationAndRoleElement.style.overflow = "hidden";
        contactListOrganizationAndRoleElement.style.textOverflow = "ellipsis";
        contactListOrganizationAndRoleElement.style.cursor = "default";
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
        contactListFavoritesStarIconContainer.style.padding = "10px"
        const contactListFavoriteStarImg = document.createElement("img");
        contactListFavoriteStarImg.classList.add("contact-favorite-icon")
        contactListFavoriteStarImg.style.width = "50px"
        
        contactListFavoriteStarImg.setAttribute("src", "./images/star-gold-svgrepo-com.svg");
        if (contact.favorite === null || contact.favorite === false) {
            contactListFavoriteStarImg.style.visibility = "hidden";
        } else {
            contactListFavoriteStarImg.style.display = "block";
        };
        
        contactListItemImageContainer.appendChild(contactListItemImage);
        contactListNameElementContainer.appendChild(contactListNameElement);
        contactListEmailElementContainer.appendChild(contactListEmailElement);
        contactListOrganizationAndRoleElementContainer.appendChild(contactListOrganizationAndRoleElement);
        contactListNameContainer.appendChild(contactListNameElementContainer);
        contactListNameContainer.appendChild(contactListEmailElementContainer);
        contactListNameContainer.appendChild(contactListOrganizationAndRoleElementContainer);
        contactListItem.appendChild(contactListItemImageContainer);
        contactListItem.appendChild(contactListNameContainer);
        contactListFavoritesStarIconContainer.appendChild(contactListFavoriteStarImg);
        contactListItem.appendChild(contactListFavoritesStarIconContainer);
        contactsList.appendChild(contactListItem);
    });
    // const contactsUserHeaderContainer = document.querySelector("#contacts-user-header-container");
    // myContactsHeaderElementsContainer.appendChild(myContactsHeaderElement);
    // myContactsHeaderElementsContainer.appendChild(numberOfContactsElement);
    // contactsHeaderElementsContainer.appendChild(myContactsHeaderElementsContainer);
    // searchMyContactsElementContainer.appendChild(searchMyContactsElement);
    // contactsHeaderElementsContainer.appendChild(searchMyContactsElementContainer);
    // contactsHeaderElementsContainer.appendChild(myContactsHeaderElementsSpacingContainer);
    // contactsHeaderContainer.appendChild(contactsHeaderElementsContainer);
    // contactsUserHeaderContainer.insertAdjacentElement("afterend", contactsHeaderContainer);
    contactsListContainer.appendChild(contactsList);
    document.body.appendChild(contactsListContainer);

    // const contactUserHeaderContainerForScroll = document.querySelector("#contacts-user-header-container");
    // const contactUserHeaderContainerForScrollRect = contactUserHeaderContainerForScroll.getBoundingClientRect()
    
    // window.addEventListener("scroll", function() {
    //     const contactUserHeaderContainerForScrollX = contactUserHeaderContainerForScrollRect.left - window.scrollX;
    //     const contactUserHeaderContainerForScrollY = contactUserHeaderContainerForScrollRect.top - window.scrollY;
    //     contactUserHeaderContainerForScroll.style.transform = `translate(${contactUserHeaderContainerForScrollX}px, ${contactUserHeaderContainerForScrollX}px)`;
    //     contactUserHeaderContainerForScroll.style.top = contactUserHeaderContainerForScrollY;
        // console.log(contactUserHeaderContainerForScrollX)
    // })

    const searchContactsElement = document.querySelector("#search-my-contacts-input")
    searchContactsElement.addEventListener("input", myContactsAutocompleteSearch);

    async function myContactsAutocompleteSearch() {
        const contactsList = document.querySelector("#my-contacts-list");
        let searchContactsInputValue = searchContactsElement.value.toLowerCase().trimEnd();
        let filteredContacts = [];

        userContacts.filter(function(contact) {
        let contactFirstName = contact.firstname;
        let contactLastName = contact.lastname;
        let contactName = `${contact.firstname} ${contact.lastname}`

        // console.log(searchContactsInputValue.length)

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

    console.log(searchContactsInputValue)

    const searchContactsAutocompleteList = document.querySelector("#contacts-autocomplete-list");
    searchContactsAutocompleteList.style.listStyle = "none";
    searchContactsAutocompleteList.style.margin = "0";
    searchContactsAutocompleteList.style.padding = "0";
    // const searchContactsAutocompleteList = document.createElement("div");
    // searchContactsAutocompleteList.setAttribute("id", "my-contacts-autocomplete-list");
   
    searchContactsAutocompleteList.innerHTML = '';

    function removeDuplicates(arr) {
        return arr.reduce((unique, item) => {
          if (!unique.includes(item)) {
            unique.push(item);
          }
          return unique;
        }, []);
      }

      const uniqueArray = removeDuplicates(filteredContacts);
      searchContactsAutocompleteList.style.display = 'block';
      contactsList.style.display = "none"
      let elementsArr = [];

            uniqueArray.forEach(contact => {
                const contactsAutoCompleteListItem = document.createElement("div");
                contactsAutoCompleteListItem.style.display = "flex";
                contactsAutoCompleteListItem.style.flexDirection = "row";
                contactsAutoCompleteListItem.style.height = "70px"
                contactsAutoCompleteListItem.style.borderTop = "2px solid black";
                contactsAutoCompleteListItem.style.borderBottom = "2px solid black";
                contactsAutoCompleteListItem.style.backgroundColor = "#fcfcff"
                contactsAutoCompleteListItem.style.marginTop = "1px";
                contactsAutoCompleteListItem.style.marginBottom = "1px";
                contactsAutoCompleteListItem.setAttribute("contactId", contact.contact_id)

                contactsAutoCompleteListItem.addEventListener("mouseover", function() {
                contactsAutoCompleteListItem.style.backgroundColor = "lightgreen";
                });

                contactsAutoCompleteListItem.addEventListener("mouseout", function() {
                contactsAutoCompleteListItem.style.backgroundColor = "#fcfcff";
                });

                contactsAutoCompleteListItem.addEventListener("click", function(event) {
                
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
                });

                const contactsAutoCompleteListItemImageContainer = document.createElement("div");
                contactsAutoCompleteListItemImageContainer.style.display = "flex";
                contactsAutoCompleteListItemImageContainer.style.alignItems = "center";
                contactsAutoCompleteListItemImageContainer.style.padding = "10px"
                const contactsAutoCompleteListItemImage = document.createElement("img");
                contactsAutoCompleteListItemImage.style.width = "57px";
                contactsAutoCompleteListItemImage.style.height = "57px";
                contactsAutoCompleteListItemImage.style.border = "0.5px solid grey";
                contactsAutoCompleteListItemImage.style.borderRadius = "50%"
                contactsAutoCompleteListItemImage.style.backgroundColor = "gainsboro";
                contactsAutoCompleteListItemImage.style.border = "1px solid black";
                contactsAutoCompleteListItemImage.style.objectFit = "cover";
                contactsAutoCompleteListItemImage.setAttribute("src", contact.imageString);

                ///
                const contactAutoCompleteListNameContainer = document.createElement("div");
                contactAutoCompleteListNameContainer.style.position = "relative";
                contactAutoCompleteListNameContainer.style.display = "flex";
                contactAutoCompleteListNameContainer.style.flexDirection = "column";
                contactAutoCompleteListNameContainer.style.justifyContent = "space-around";
                contactAutoCompleteListNameContainer.style.alignItems = "center";
                contactAutoCompleteListNameContainer.style.minWidth = "0";
                contactAutoCompleteListNameContainer.style.width = "100%";
                const contactAutoCompleteListNameElementContainer = document.createElement("div");
                contactAutoCompleteListNameElementContainer.style.display = "flex";
                contactAutoCompleteListNameElementContainer.style.justifyContent = "center";
                contactAutoCompleteListNameElementContainer.style.minWidth = "0";
                contactAutoCompleteListNameElementContainer.style.width = "100%";
                const contactAutoCompleteListNameElement = document.createElement("h3");
                contactAutoCompleteListNameElement.style.whiteSpace = "nowrap";
                contactAutoCompleteListNameElement.style.overflow = "hidden";
                contactAutoCompleteListNameElement.style.textOverflow = "ellipsis";
                contactAutoCompleteListNameElement.style.margin = "0";
                contactAutoCompleteListNameElement.innerHTML = `${contact.firstname} ${contact.lastname}`;
                const contactAutoCompleteListEmailElementContainer = document.createElement("div");
                contactAutoCompleteListEmailElementContainer.style.display = "flex";
                contactAutoCompleteListEmailElementContainer.style.justifyContent = "center";
                contactAutoCompleteListEmailElementContainer.style.minWidth = "0";
                contactAutoCompleteListEmailElementContainer.style.width = "100%";
                const contactAutoCompleteListEmailElement = document.createElement("p");
                contactAutoCompleteListEmailElement.style.fontStyle = "italic"
                contactAutoCompleteListEmailElement.style.fontSize = "small";
                contactAutoCompleteListEmailElement.style.whiteSpace = "nowrap";
                contactAutoCompleteListEmailElement.style.overflow = "hidden";
                contactAutoCompleteListEmailElement.style.textOverflow = "ellipsis";
                contactAutoCompleteListEmailElement.style.margin = "0";
                const contactEmail = contact.email;
                contactAutoCompleteListEmailElement.innerHTML = contactEmail;
                if (contactAutoCompleteListEmailElement.innerHTML === "undefined") {
                    contactAutoCompleteListEmailElement.style.visibility = "hidden";
                };
                contactAutoCompleteListEmailElement.innerHTML = contactEmail;
                const contactAutoCompleteListOrganizationAndRoleElementContainer = document.createElement("div");
                contactAutoCompleteListOrganizationAndRoleElementContainer.style.display = "flex";
                contactAutoCompleteListOrganizationAndRoleElementContainer.style.justifyContent = "center";
                contactAutoCompleteListOrganizationAndRoleElementContainer.style.minWidth = "0";
                contactAutoCompleteListOrganizationAndRoleElementContainer.style.width = "100%";
                const contactAutoCompleteListOrganizationAndRoleElement = document.createElement("p");
                contactAutoCompleteListOrganizationAndRoleElement.style.fontWeight = "bolder";
                contactAutoCompleteListOrganizationAndRoleElement.style.fontSize = "smaller";
                contactAutoCompleteListOrganizationAndRoleElement.style.whiteSpace = "nowrap";
                contactAutoCompleteListOrganizationAndRoleElement.style.overflow = "hidden";
                contactAutoCompleteListOrganizationAndRoleElement.style.textOverflow = "ellipsis";
                contactAutoCompleteListOrganizationAndRoleElement.style.margin = "0";

                if (contact.organization !== null && contact.organization !== "" && contact.organization_role !== null && contact.organization_role !== "") {
                contactAutoCompleteListOrganizationAndRoleElement.innerHTML = `${contact.organization} || ${contact.organization_role}`
                } else if (contact.organization !== null && contact.organization !== "" || contact.organization_role === null && contact.organization_role === "") {
                contactAutoCompleteListOrganizationAndRoleElement.innerHTML = `${contact.organization}`
                } else if (contact.organization === null && contact.organization === "" || contact.organization_role !== null && contact.organization_role !== "") {
                contactAutoCompleteListOrganizationAndRoleElement.innerHTML = `${contact.organization_role}`
                } else {
                contactAutoCompleteListOrganizationAndRoleElement.innerHTML = "text"
                contactAutoCompleteListOrganizationAndRoleElement.style.visibility = "hidden"
                };

                const contactAutoCompleteListFavoritesStarIconContainer = document.createElement("div");
                contactAutoCompleteListFavoritesStarIconContainer.style.display = "flex";
                contactAutoCompleteListFavoritesStarIconContainer.style.justifyContent = "center";
                contactAutoCompleteListFavoritesStarIconContainer.style.alignItems = "center"
                contactAutoCompleteListFavoritesStarIconContainer.style.padding = "10px"
                const contactAutoCompleteListFavoriteStarImg = document.createElement("img");
                contactAutoCompleteListFavoriteStarImg.classList.add("contact-favorite-icon")
                contactAutoCompleteListFavoriteStarImg.style.width = "50px"
        
                contactAutoCompleteListFavoriteStarImg.setAttribute("src", "./images/star-gold-svgrepo-com.svg");
                if (contact.favorite === null || contact.favorite === false) {
                contactAutoCompleteListFavoriteStarImg.style.visibility = "hidden"
                } else {
                contactAutoCompleteListFavoriteStarImg.style.display = "block"
                };

            contactsAutoCompleteListItemImageContainer.appendChild(contactsAutoCompleteListItemImage);
            contactAutoCompleteListNameElementContainer.appendChild(contactAutoCompleteListNameElement);
            contactAutoCompleteListEmailElementContainer.appendChild(contactAutoCompleteListEmailElement);
            contactAutoCompleteListOrganizationAndRoleElementContainer.appendChild(contactAutoCompleteListOrganizationAndRoleElement)
            contactAutoCompleteListNameContainer.appendChild(contactAutoCompleteListNameElementContainer);
            contactAutoCompleteListNameContainer.appendChild(contactAutoCompleteListEmailElementContainer);
            contactAutoCompleteListNameContainer.appendChild(contactAutoCompleteListOrganizationAndRoleElementContainer);
            contactsAutoCompleteListItem.appendChild(contactsAutoCompleteListItemImageContainer);
            contactsAutoCompleteListItem.appendChild(contactAutoCompleteListNameContainer);
            contactAutoCompleteListFavoritesStarIconContainer.appendChild(contactAutoCompleteListFavoriteStarImg);
            contactsAutoCompleteListItem.appendChild(contactAutoCompleteListFavoritesStarIconContainer);
            contactsListContainer.appendChild(searchContactsAutocompleteList)
            // searchContactsAutocompleteList.style.marginTop = "51px"
            elementsArr.push(contactsAutoCompleteListItem)
            // console.log(elementsArr)
            elementsArr.forEach(element => {
                // console.log(element)
                searchContactsAutocompleteList.appendChild(element);
            });
      });
    };
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

        // console.log(mobileContactsListHeaderElementHeight)
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

    // console.log(contact)

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

    const contactEmailAddresses = await getAContactEmailAddresses(user_id, contact_id)
        // console.log(contactEmailAddresses)
    if (contactEmailAddresses.length > 0) {
        contactHeaderEmailElement.innerHTML = contactEmailAddresses[0].emailaddress
    } else {
        contactHeaderEmailElement.innerHTML = "Text";
        contactHeaderEmailElement.style.visibility = "hidden"
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

    // console.log(contactHeaderFullNameElement.clientWidth)
    const computedStyle = window.getComputedStyle(contactHeaderFullNameElement).width;
    // console.log(computedStyle)
    requestAnimationFrame(() => {
        const contactHeaderFullNameElementWidth = contactHeaderFullNameElement.clientWidth;
        const contactHeaderFullNameElementText = contactHeaderFullNameElement.innerHTML;
        const firstContactHeaderFullNameElementSlice = contactHeaderFullNameElementText.slice(0, 22);
        const secondContactHeaderFullNameElementSlice = contactHeaderFullNameElementText.slice(0, 26);
        const thirdContactHeaderFullNameElementSlice = contactHeaderFullNameElementText.slice(0, 22);
        const fourthContactHeaderFullNameElementSlice = contactHeaderFullNameElementText.slice(0, 16);
        const contactHeaderEmailElementWidth = contactHeaderEmailElement.clientWidth;
        const contactHeaderEmailElementText = contactHeaderEmailElement.innerHTML;
        const contactHeaderEmailElementTextSlice = contactHeaderEmailElementText.slice(0, 38);
        const contactHeaderEmailElementTextSecondSlice = contactHeaderEmailElementText.slice(0, 50);
        let contactHeaderOrganizationAndRoleElementWidth = contactOrganizationAndRoleElement.clientWidth;

        const ellipsis = '...'

        // console.log(contactHeaderFullNameElement.offsetwidth)
        const contactHeaderFullNameElementTextLength = contactHeaderFullNameElementText.length;
        const contactHeaderEmailElementTextLength = contactHeaderEmailElementText.length;
        const contactHeaderOrganizationAndRoleElementText = contactOrganizationAndRoleElement.innerHTML;
        const contactOrganizationAndRoleElementTextLength = contactHeaderOrganizationAndRoleElementText.length;
        const contactHeaderOrganizationAndRoleElementTextSlice = contactHeaderOrganizationAndRoleElementText.slice(0, 35);

        if (contactHeaderFullNameElementTextLength > 22) {
            contactHeaderFullNameElement.innerHTML = firstContactHeaderFullNameElementSlice + ellipsis;
        }
        // console.log(contactHeaderFullNameElementWidth)

        if (contactHeaderEmailElementTextLength > 38) {
            contactHeaderEmailElement.innerHTML = contactHeaderEmailElementTextSlice + ellipsis;
        }

        if (contactOrganizationAndRoleElementTextLength > 35) {
            contactOrganizationAndRoleElement.innerHTML = contactHeaderOrganizationAndRoleElementTextSlice + ellipsis;
        }

        const contactHeaderOrganizationAndRoleElementSecondTextSlice = contactHeaderOrganizationAndRoleElementText.slice(0, 45);
        const contactHeaderOrganizationAndRoleElementThirdTextSlice = contactHeaderOrganizationAndRoleElementText.slice(0, 40);
        const contactHeaderOrganizationAndRoleElementFourthTextSlice = contactHeaderOrganizationAndRoleElementText.slice(0, 35);
        const contactHeaderOrganizationAndRoleElementFifthTextSlice = contactHeaderOrganizationAndRoleElementText.slice(0, 30);

        // console.log("el width", contactHeaderOrganizationAndRoleElementWidth)
        // console.log(contactListOrganizationAndRoleElementWidth)
        // if (contactHeaderOrganizationAndRoleElementWidth > 400) {
        //     // console.log("el width", contactListOrganizationAndRoleElementWidth)
        //     contactOrganizationAndRoleElement.innerHTML = contactHeaderOrganizationAndRoleElementTextSlice + ellipsis;
        // };
        // contactHeaderOrganizationAndRoleElementWidth = contactOrganizationAndRoleElement.clientWidth;
        // if (contactHeaderOrganizationAndRoleElementWidth > 400) {
        //     contactOrganizationAndRoleElement.innerHTML = contactHeaderOrganizationAndRoleElementSecondTextSlice + ellipsis;
        // };
        // contactHeaderOrganizationAndRoleElementWidth = contactOrganizationAndRoleElement.clientWidth;
        // if (contactHeaderOrganizationAndRoleElementWidth > 400) {
        //     contactOrganizationAndRoleElement.innerHTML = contactHeaderOrganizationAndRoleElementThirdTextSlice + ellipsis;
        // };
        // contactHeaderOrganizationAndRoleElementWidth = contactOrganizationAndRoleElement.clientWidth;
        // if (contactHeaderOrganizationAndRoleElementWidth > 400) {
        //     contactOrganizationAndRoleElement.innerHTML = contactHeaderOrganizationAndRoleElementFourthTextSlice + ellipsis;
        // };
        // contactHeaderOrganizationAndRoleElementWidth = contactOrganizationAndRoleElement.clientWidth;
        // if (contactHeaderOrganizationAndRoleElementWidth > 400) {
        //     contactOrganizationAndRoleElement.innerHTML = contactHeaderOrganizationAndRoleElementFifthTextSlice + ellipsis;
        // };
    });

    const contactEmailSelectElement = document.querySelector("#select-view-contact-email");

    // const contactEmailAddresses = await getAContactEmailAddresses(user_id, contact_id);
    // console.log(contactEmailAddresses)
    const viewContactEmailSelectElement = document.querySelector("#select-view-contact-email");
    let viewContactEmailLabelOptionsData = []
    contactEmailAddresses.forEach(contactEmailAddressObj => {
        const emailLabelOptionsDataObj = {
            text: contactEmailAddressObj.emailaddresslabel,
            value: contactEmailAddressObj.emailaddresslabel
        }
        viewContactEmailLabelOptionsData.push(emailLabelOptionsDataObj)
    });
    // console.log(viewContactEmailLabelOptionsData)

     for (let i = 0; i < viewContactEmailLabelOptionsData.length; i++) {
        const option = document.createElement("option");
        // editContactEmailLabelOptionsData[0].style.borderBottom = "1px solid gray"
        option.text = viewContactEmailLabelOptionsData[i].text;
        option.value = viewContactEmailLabelOptionsData[i].value;

        if (option.text === contactEmailAddresses.emailaddresslabel) {
            option.setAttribute("selected", true)
        }

        viewContactEmailSelectElement.appendChild(option);
      }

    const contactPhoneNumbers = await getAContactPhoneNumber(user_id, contact_id);
    // console.log(contactPhoneNumbers)
    const viewContactPhoneNumberSelectElement = document.querySelector("#select-view-contact-phonenumber");
    let viewContactPhoneNumberLabelOptionsData = []
    contactPhoneNumbers.forEach(contactPhoneNumberAddressObj => {
        const phoneNumberLabelOptionsDataObj = {
            text: contactPhoneNumberAddressObj.phonenumberlabel,
            value: contactPhoneNumberAddressObj.phonenumberlabel
        }
        viewContactPhoneNumberLabelOptionsData.push(phoneNumberLabelOptionsDataObj)
    });
    // console.log(viewContactPhoneNumberLabelOptionsData)

     for (let i = 0; i < viewContactPhoneNumberLabelOptionsData.length; i++) {
        const option = document.createElement("option");
        // editContactEmailLabelOptionsData[0].style.borderBottom = "1px solid gray"
        option.text = viewContactPhoneNumberLabelOptionsData[i].text;
        option.value = viewContactPhoneNumberLabelOptionsData[i].value;

        if (option.text === contactPhoneNumbers.phonenumberlabel) {
            option.setAttribute("selected", true)
        }

        viewContactPhoneNumberSelectElement.appendChild(option);
      }
    
    const contactAddresses = await getAContactAddress(user_id, contact_id);
    console.log(contactAddresses)
    const viewContactAddressSelectElement = document.querySelector("#select-view-contact-address");
    let viewContactAddressLabelOptionsData = []
    contactAddresses.forEach(contactAddressObj => {
        const addressLabelOptionsDataObj = {
            text: contactAddressObj.addresslabel,
            value: contactAddressObj.addresslabel
        }
        viewContactAddressLabelOptionsData.push(addressLabelOptionsDataObj)
    });
    console.log(viewContactAddressLabelOptionsData)

     for (let i = 0; i < viewContactAddressLabelOptionsData.length; i++) {
        const option = document.createElement("option");
        // editContactEmailLabelOptionsData[0].style.borderBottom = "1px solid gray"
        option.text = viewContactAddressLabelOptionsData[i].text;
        option.value = viewContactAddressLabelOptionsData[i].value;

        if (option.text === contactAddresses.addresslabel) {
            option.setAttribute("selected", true)
        }

        viewContactAddressSelectElement.appendChild(option);
    }

    const contactWebsites = await getAContactWebsite(user_id, contact_id);
    console.log(contactWebsites)
    const viewContactWebsitesSelectElement = document.querySelector("#select-view-contact-website");
    let viewContactWebsiteLabelOptionsData = []
    contactWebsites.forEach(contactWebsiteObj => {
        const websiteLabelOptionsDataObj = {
            text: contactWebsiteObj.websitelabel,
            value: contactWebsiteObj.websitelabel
        }
        viewContactWebsiteLabelOptionsData.push(websiteLabelOptionsDataObj)
    });
    console.log(viewContactWebsiteLabelOptionsData)

     for (let i = 0; i < viewContactWebsiteLabelOptionsData.length; i++) {
        const option = document.createElement("option");
        // editContactEmailLabelOptionsData[0].style.borderBottom = "1px solid gray"
        option.text = viewContactWebsiteLabelOptionsData[i].text;
        option.value = viewContactWebsiteLabelOptionsData[i].value;

        if (option.text === contactWebsites.websitelabel) {
            option.setAttribute("selected", true)
        }

        viewContactWebsitesSelectElement.appendChild(option);
    }

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
    
    const contactImage = await getAContactImage(user_id, contact_id)
    const imageString = `data:${contactImage.contentType};base64,${contactImage.image}`
    contactImageElement.setAttribute("src", imageString);
    contactImageElement.style.borderRadius = "50%";
   
   contactFullNameElement.innerHTML =  `${contact.firstname} ${contact.lastname}`;
   contactFullNameElement.style.fontFamily = "sans-serif";
   contactFullNameElement.style.fontSize = "small";
   contactGenderElement.innerHTML = contact.gender;
   contactGenderElement.style.fontFamily = "sans-serif";
   contactGenderElement.style.fontSize = "small";
   contactBirthdayElement.innerHTML = contact.birthday;
   contactBirthdayElement.style.fontFamily = "sans-serif";
   contactBirthdayElement.style.fontSize = "small";


    // const editContactEmailSelect = document.querySelector("#select-edit-contact-email");
    const viewContactEmailLabelSelectedIndex = viewContactEmailSelectElement.selectedIndex;
    if (viewContactEmailLabelSelectedIndex !== -1) {
    let selectedEditContactEmailLabel = viewContactEmailSelectElement.options[viewContactEmailLabelSelectedIndex].text
    console.log(viewContactEmailSelectElement.options[viewContactEmailLabelSelectedIndex].text)
    const firstSelectedIndex = viewContactEmailSelectElement.options[viewContactEmailLabelSelectedIndex].text
    console.log(contactEmailAddresses)
    // let formattedContactEmailAddresses = [];

    contactEmailAddresses.forEach(contactEmailAddressObj => {
        if (firstSelectedIndex === contactEmailAddressObj.emailaddresslabel) {
             contactEmailAddressElement.value = contactEmailAddressObj.emailaddress;
        }
    })
} else {
        const option = document.createElement("option");
        option.text = "None available"
        option.value = "None available"
        viewContactEmailSelectElement.appendChild(option)
    }
    viewContactEmailSelectElement.addEventListener("change", function() {
        const selectedText = this.options[this.selectedIndex].text;
        console.log('Selected text:', selectedText);
        // if (editContactEmailLabelSelectedIndex !== -1) {
        //     console.log(editContactEmailLabelSelectedIndex)
        // }
        contactEmailAddresses.forEach(contactEmailAddressObj => {
            if (selectedText === contactEmailAddressObj.emailaddresslabel) {
                contactEmailAddressElement.value = contactEmailAddressObj.emailaddress
            }
        })
    });

    // const editContactEmailSelect = document.querySelector("#select-edit-contact-email");
    const viewContactPhoneNumberLabelSelectedIndex = viewContactPhoneNumberSelectElement.selectedIndex;
    if (viewContactPhoneNumberLabelSelectedIndex !== -1) {
    let selectedEditContactPhoneNumberLabel = viewContactPhoneNumberSelectElement.options[viewContactPhoneNumberLabelSelectedIndex].text
    console.log(viewContactPhoneNumberSelectElement.options[viewContactPhoneNumberLabelSelectedIndex].text)
    const firstSelectedIndex = viewContactPhoneNumberSelectElement.options[viewContactPhoneNumberLabelSelectedIndex].text
    console.log(contactPhoneNumbers)
    // let formattedContactEmailAddresses = [];

    contactPhoneNumbers.forEach(contactPhoneNumberObj => {
            if (firstSelectedIndex === contactPhoneNumberObj.phonenumberlabel) {
                contactPhoneNumberElement.value = contactPhoneNumberObj.phonenumber;
            }
        })
    } else {
        const option = document.createElement("option");
        option.text = "None available"
        option.value = "None available"
        viewContactPhoneNumberSelectElement.appendChild(option)
    }

    viewContactPhoneNumberSelectElement.addEventListener("change", function() {
        const selectedText = this.options[this.selectedIndex].text;
        console.log('Selected text:', selectedText);
        // if (editContactEmailLabelSelectedIndex !== -1) {
        //     console.log(editContactEmailLabelSelectedIndex)
        // }
        contactPhoneNumbers.forEach(contactPhoneNumberObj => {
            if (selectedText === contactPhoneNumberObj.phonenumberlabel) {
                contactPhoneNumberElement.value = contactPhoneNumberObj.phonenumber
            }
        })
    });

      // const editContactEmailSelect = document.querySelector("#select-edit-contact-email");
    const viewContactAddressLabelSelectedIndex = viewContactAddressSelectElement.selectedIndex;
    if (viewContactAddressLabelSelectedIndex !== -1) {
    let selectedEditContactAddressLabel = viewContactAddressSelectElement.options[viewContactAddressLabelSelectedIndex].text
    // console.log(viewContactAddressSelectElement.options[viewContactAddressLabelSelectedIndex].text)
    const firstSelectedIndex = viewContactAddressSelectElement.options[viewContactAddressLabelSelectedIndex].text
    // console.log(contactAddresses)
    // let formattedContactEmailAddresses = [];

    contactAddresses.forEach(contactAddressObj => {
        if (firstSelectedIndex === contactAddressObj.addresslabel) {
             contactAddressElement.value = contactAddressObj.address;
        }
    })
} else {
        const option = document.createElement("option");
        option.text = "None available"
        option.value = "None available"
        viewContactAddressSelectElement.appendChild(option)
    }
    viewContactAddressSelectElement.addEventListener("change", function() {
        const selectedText = this.options[this.selectedIndex].text;
        console.log('Selected text:', selectedText);
        // if (editContactEmailLabelSelectedIndex !== -1) {
        //     console.log(editContactEmailLabelSelectedIndex)
        // }
        contactAddresses.forEach(contactAddressObj => {
            if (selectedText === contactAddressObj.addresslabel) {
                contactAddressElement.value = contactAddressObj.address
            }
        })
    });

    // const editContactEmailSelect = document.querySelector("#select-edit-contact-email");
    const viewContactWebsiteLabelSelectedIndex = viewContactWebsitesSelectElement.selectedIndex;
    if (viewContactWebsiteLabelSelectedIndex !== -1) {
    let selectedEditContactWebsiteLabel = viewContactWebsitesSelectElement.options[viewContactWebsiteLabelSelectedIndex].text
    // console.log(viewContactAddressSelectElement.options[viewContactWebsiteLabelSelectedIndex].text)
    const firstSelectedIndex = viewContactWebsitesSelectElement.options[viewContactWebsiteLabelSelectedIndex].text
    // console.log(contactAddresses)
    // let formattedContactEmailAddresses = [];

    contactWebsites.forEach(contactWebsiteObj => {
        if (firstSelectedIndex === contactWebsiteObj.websitelabel) {
             contactSocialMediaElement.value = contactWebsiteObj.website;
        }
    })
} else {
        const option = document.createElement("option");
        option.text = "None available"
        option.value = "None available"
        viewContactWebsitesSelectElement.appendChild(option)
    }
    viewContactWebsitesSelectElement.addEventListener("change", function() {
        const selectedText = this.options[this.selectedIndex].text;
        console.log('Selected text:', selectedText);
        // if (editContactEmailLabelSelectedIndex !== -1) {
        //     console.log(editContactEmailLabelSelectedIndex)
        // }
        contactWebsites.forEach(contactWebsiteObj => {
            if (selectedText === contactWebsiteObj.websitelabel) {
                contactSocialMediaElement.value = contactWebsiteObj.website
            }
        })
    });


   contactEmailAddressElement.innerHTML = contact.emailaddress;
   contactEmailAddressElement.style.fontFamily = "sans-serif";
   contactEmailAddressElement.style.fontSize = "small";
   contactPhoneNumberElement.innerHTML = contact.phonenumber;
   contactPhoneNumberElement.style.fontFamily = "sans-serif";
   contactPhoneNumberElement.style.fontSize = "small";
   contactAddressElement.innerHTML = contact.address;
   contactAddressElement.style.fontFamily = "sans-serif";
   contactAddressElement.style.fontSize = "small";
   contactOrganizationElement.innerHTML = contact.organization;
   contactOrganizationElement.style.fontFamily = "sans-serif";
   contactOrganizationElement.style.fontSize = "small";
   contactOrganizationRoleElement.innerHTML = contact.organization_role;
   contactOrganizationRoleElement.style.fontFamily = "sans-serif";
   contactOrganizationRoleElement.style.fontSize = "small";
   contactSocialMediaElement.innerHTML = contact.website;
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
    mobileContactFullNameTextElement.style.height = "72px"
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
    mobileContactGenderTextElement.style.height = "72px"
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
    mobileContactBirthdayTextElement.style.height = "72px";
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
    mobileContactEmailTextElement.style.height = "72px";
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
    mobileContactPhonenumberTextElement.style.height = "72px";
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
    mobileContactAddressTextElement.style.height = "72px";
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
    mobileContactOrganizationTextElement.style.height = "72px";
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
    mobileContactOrganizationRoleTextElement.style.height = "72px";
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
    mobileContactSocialMediaTextElement.style.height = "72px";
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
    mobileContactNotesTextElement.style.height = "72px";
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
    const mobileManageAndEditContactButtonsContainer = document.createElement("div");

    const mobileEditContactButtonDiv = document.createElement("div");
    mobileEditContactButtonDiv.setAttribute("id", "mobile-edit-contact-container")
    // mobileEditContactButtonDiv.style.position = "absolute";
    mobileEditContactButtonDiv.style.display = "flex";
    mobileEditContactButtonDiv.style.justifyContent = "space-between";
    mobileEditContactButtonDiv.style.width = "100%";
    const mobileAddContactFavoritesButton = document.createElement("button");
    mobileAddContactFavoritesButton.setAttribute("id", "mobile-add-to-favorites-button");
    mobileAddContactFavoritesButton.innerHTML = "Add to favorites";
    mobileAddContactFavoritesButton.style.backgroundColor = "green";
    mobileAddContactFavoritesButton.style.color = "white";
    const mobileManageGroupsButtonElement = document.createElement("button");
    mobileManageGroupsButtonElement.setAttribute("id", "mobile-navigate-manage-contact-groups-button");
    mobileManageGroupsButtonElement.innerHTML = "Manage Groups"
    mobileManageGroupsButtonElement.style.marginRight = "2.5px"
    const mobileEditContactButtonElement = document.createElement("button");
    mobileEditContactButtonElement.setAttribute("id", "mobile-navigate-edit-contact-page-button");
    mobileEditContactButtonElement.style.width = "50px";
    mobileEditContactButtonElement.style.marginLeft = "2.5px";
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

    mobileManageAndEditContactButtonsContainer.appendChild(mobileManageGroupsButtonElement);
    mobileManageAndEditContactButtonsContainer.appendChild(mobileEditContactButtonElement);
    mobileEditContactButtonDiv.appendChild(mobileAddContactFavoritesButton);
    mobileEditContactButtonDiv.appendChild(mobileManageAndEditContactButtonsContainer);
    mobileEditContactButtonContainer.appendChild(mobileEditContactButtonDiv);

    mobileContactInformationContainer.appendChild(mobileContactInformationColumn);
    mobileContactInformationColumn.appendChild(mobileContactNotesContainer);
    mobileContactInformationColumn.appendChild(mobileEditContactButtonContainer)
    document.body.appendChild(mobileContactInformationContainer)

     if (contact.contact_image !== null) {
    mobileContactImageElement.style.borderRadius = "50%"
    mobileContactImageElement.setAttribute("src", contact.contact_image)
   }

    const navigateManageContactGroupsPageButton = document.querySelector("#mobile-navigate-manage-contact-groups-button");
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
    const editContactAddPhotoInputElement = document.querySelector("#edit-contact-add-photo")
    const contactImage = await getAContactImage(user_id, contact_id)
    const imageString = `data:${contactImage.contentType};base64,${contactImage.image}`
    editContactImage.setAttribute("src", imageString);
    editContactImage.style.borderRadius = "50%";

    const editContactAddPhotoButton = document.querySelector("#edit-contact-add-photo-button");

    const editContactRemovePhotoButton = document.querySelector("#edit-contact-remove-photo-button");
    editContactRemovePhotoButton.addEventListener("click", function() {
        // const editContactAddPhotoInputElement = document.querySelector("#edit-contact-add-photo")
          
        // let editContactImageSrcStr = editContactImage.getAttribute("src").toString();
        // let startIndex = editContactImageSrcStr.indexOf('d');
        // let endIndex = editContactImageSrcStr.indexOf(',');

        // if (startIndex !== -1 && endIndex !== -1 && endIndex > startIndex) {
        //     let part1 = editContactImageSrcStr.slice(0, startIndex);
        //     let part2 = editContactImageSrcStr.slice(endIndex + 1);
        //     editContactImageSrcStr = part1 + part2;
        // };

        // const decodedEditContactImage = atob(editContactImageSrcStr);

        // const checkEditContactImageElement = document.querySelector("#check-edit-contact-image");
        // const checkEditContactImageUrl = checkEditContactImageElement.getAttribute("src");

        // fetch(checkEditContactImageUrl)
        // .then(response => response.blob()) // Get the image as a Blob
        // .then(blob => {
        //     // Now 'blob' contains the image data as a Blob object
        //     // You can then create a File object from the blob if necessary:
        //     const filename = checkEditContactImageUrl.substring(checkEditContactImageUrl.lastIndexOf('/') + 1); // Extract filename from URL
        //     const imageFile = new File([blob], filename, { type: blob.type });

        //     // console.log(imageFile); // This is your image file object

        //     let reader = new FileReader()

        //     reader.onload = function () {
        //         base64string = reader.result.split(',')[1]
        //         // imageFile = reader.result;
        //         // console.log(base64string)
        //         // newUserImageInputElement.setAttribute("src", base64string);
        //         // newUserImageElement.style.borderRadius = "50%"

        //         const decodedDefaultContactImage = atob(base64string)

        //         // console.log(decodedEditUserImage)

        //         if (decodedDefaultContactImage !== decodedEditContactImage) {
        //               editContactAddPhotoButton.innerHTML = "Save Photo"
        //         }

        //     };

        //     if (imageFile !== undefined) {
        //         reader.readAsDataURL(imageFile)
        //     }; 
        // })
        // .catch(error => console.error('Error fetching image:', error));

        // // console.log(imageString)

        // if (editContactImage.getAttribute("src") !== imageString && editContactAddPhotoInputElement.value !== "") {
        //     editContactAddPhotoInputElement.value = "";
        //     editContactImage.setAttribute("src", imageString)
        // } else if (editContactImage.getAttribute("src") === imageString && editContactAddPhotoInputElement.value === "") {
        //     editContactImage.setAttribute("src", "./images/user-2-svgrepo-com.svg")
        // } else if (editContactImage.getAttribute("src") !== imageString && editContactAddPhotoInputElement.value === "") {
        //     editContactImage.setAttribute("src", "./images/user-2-svgrepo-com.svg")
        // } else if (editContactImage.getAttribute("src") === imageString && editContactAddPhotoInputElement.value !== "") {
        //     editContactAddPhotoInputElement.value = "";
        //     editContactImage.setAttribute("src", "./images/user-2-svgrepo-com.svg")
        // } else if (editContactImage.getAttribute("src") !== imageString && editContactAddPhotoInputElement.value !== "") {
        //     editContactAddPhotoInputElement.value = "";
        //     editContactImage.setAttribute("src", "./images/user-2-svgrepo-com.svg")
        // } else if (editContactImage.getAttribute("src") !== "./images/user-2-svgrepo-com.svg" && editContactAddPhotoInputElement.value === "") {
        //     editContactImage.setAttribute("src", imageString);
        //     editContactAddPhotoButton.innerHTML = "Change Photo"
        // }  
        console.log(contactImage.name);
        const contactImageName = contactImage.name;
        editContactAddPhotoInputElement.value = "";
        if (contactImageName !== "user-2-svgrepo-com.svg" || imageString !== editContactImage.getAttribute("src")) {
            editContactAddPhotoButton.innerHTML = "Save Photo"
            editContactImage.setAttribute("src", "./images/user-2-svgrepo-com.svg");
        }
        if (contactImageName === "user-2-svgrepo-com.svg") {
            editContactAddPhotoButton.innerHTML = "Change Photo";
        }
    });

    if (contactImage !== null && contactImage !== undefined) {
        editContactAddPhotoButton.innerHTML = "Change Photo";
    };

    editContactAddPhotoButton.formAction = `${window.currentUrl}`
    editContactAddPhotoButton.addEventListener("click", function(event) {
        //event.preventDefault()
        if (editContactAddPhotoButton.innerHTML === "Save Photo") {
            putContactImage()
        }
    });

    const editContactAddPhotoInputContainerElement = document.querySelector("#edit-contact-add-photo-input-container")
    editContactAddPhotoButton.addEventListener("click", function(event) {
         // event.preventDefault()
        if (editContactAddPhotoButton.innerHTML !== "Save Photo") {
            editContactAddPhotoInputContainerElement.style.display = "flex";
        }
    });

    const closeEditContactAddPhotoIcon = document.querySelector("#close-edit-contact-add-photo-icon");
    closeEditContactAddPhotoIcon.addEventListener("click", function(event) {
        // window.location.reload()
        editContactImage.setAttribute("src", imageString);
        const editContactAddPhotoInputElement = document.querySelector("#edit-contact-add-photo");
        editContactAddPhotoInputElement.value = "";
        const editContactAddPhotoInputContainerElement = document.querySelector("#edit-contact-add-photo-input-container")
        editContactAddPhotoInputContainerElement.style.display = "none";
        editContactAddPhotoButton.innerHTML = "Change Photo";
    });

    const editContactAddPhotoSaveButton = document.querySelector("#edit-contact-add-photo-insert-button");
    editContactAddPhotoSaveButton.addEventListener("click", function() {
        // editContactAddPhotoInputContainerElement.style.display = "none";
        const editContactAddPhotoInputElement = document.querySelector("#edit-contact-add-photo");
        console.log(editContactAddPhotoInputElement.files[0])
        const editContactImageElementCurrentImage = editContactImage.getAttribute("src")

        if (editContactImage.getAttribute("src") === "./images/user-2-svgrepo-com.svg" || editContactAddPhotoInputElement.files[0] !== undefined) {
            editContactAddPhotoButton.innerHTML = "Save Photo"
            // handleEditContactUploadImageInput()
            handleEditContactImage()
        } else {
            alert("Please choose an image before inserting.")
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
    const editContactRoleElement = document.querySelector("#edit-contact-organization-role");
    const editContactSocialMediaElement = document.querySelector("#edit-contact-website");
    const editContactNotesElement = document.querySelector("#edit-contact-notes");
    editContactNotesElement.style.fontFamily = "sans-serif";

    editContactFirstNameElement.addEventListener("focus", async function() {
        const contactEmailAddress = await getAContactEmailAddresses(user_id, contact_id);
        const contactPhoneNumbers = await getAContactPhoneNumber(user_id, contact_id);
        const contactAddresses = await getAContactAddress(user_id, contact_id);
        const contactWebsites = await getAContactWebsite(user_id, contact_id);

        const contactFirstName = contact.firstname;
        const contactLastName = contact.lastname;
        const contactGender = contact.gender;
        const contactBirthday = contact.birthday;
        const contactEmailSelectElement = document.querySelector("#select-edit-contact-email");
        const contactEmailSelectElementSelectedIndex = contactEmailSelectElement.selectedIndex;
        const contactEmailSelectedOptionElement = contactEmailSelectElement.options[contactEmailSelectElementSelectedIndex]
        const contactEmailSelectedIndexId = Number(contactEmailSelectedOptionElement.getAttribute("id"))
        let selectedEmail;
        for (let i = 0; i < contactEmailAddress.length; i++) {
            if (contactEmailAddress[i].emailid === contactEmailSelectedIndexId) {
                selectedEmail = contactEmailAddress[i].emailaddress;
            }
        };
        const contactPhoneNumberSelectElement = document.querySelector("#select-edit-contact-phonenumber");
        const contactPhoneNumberSelectElementSelectedIndex = contactPhoneNumberSelectElement.selectedIndex;
        const contactPhoneNumberSelectedOptionElement = contactPhoneNumberSelectElement.options[contactPhoneNumberSelectElementSelectedIndex];
        const contactPhoneNumberSelectedIndexId = Number(contactPhoneNumberSelectedOptionElement.getAttribute("id"));
        let selectedPhoneNumber;
        for (let i = 0; i < contactPhoneNumbers.length; i++) {
            if (contactPhoneNumbers[i].phonenumberid === contactPhoneNumberSelectedIndexId) {
                selectedPhoneNumber = contactPhoneNumbers[i].phonenumber
            }
        };
        const contactAddressSelectElement = document.querySelector("#select-edit-contact-address");
        const contactAddressSelectElementSelectedIndex = contactAddressSelectElement.selectedIndex;
        const contactAddressSelectedOptionElement = contactAddressSelectElement.options[contactAddressSelectElementSelectedIndex];
        const contactAddressSelectedIndexId = Number(contactAddressSelectedOptionElement.getAttribute("id"));
        let selectedAddress;
        for (let i = 0; i < contactAddresses.length; i++) {
            if (contactAddresses[i].addressid === contactAddressSelectedIndexId) {
                selectedAddress = contactAddresses[i].address;
            }
        }
        const contactOrganization = contact.organization;
        const contactOrganizationRole = contact.organization_role;
        const contactWebsiteSelectElement = document.querySelector("#select-edit-contact-website");
        const contactWebsitesSelectedIndex = contactWebsiteSelectElement.selectedIndex;
        const contactWebsitesSelectedOptionElement = contactWebsiteSelectElement.options[contactWebsitesSelectedIndex]
        const contactWebsitesSelectedIndexId = Number(contactWebsitesSelectedOptionElement.getAttribute("id"));
        let selectedWebsite;
        for (let i = 0; i < contactWebsites.length; i++) {
            // console.log(contactWebsites[i].websiteid)
            // console.log(contactWebsitesSelectedIndexId)
            if (contactWebsites[i].websiteid === contactWebsitesSelectedIndexId) {
                selectedWebsite = contactWebsites[i].website
            }
        }
        const contactNotes = contact.notes;
        const editContactSelectGenderElement = document.querySelector("#edit-contact-select-gender");
        editContactSelectGenderElement.style.display = "none";
        editContactGenderElement.style.display = "block";

        editContactLastNameElement.value = contactLastName;
        editContactGenderElement.value = contactGender;
        editContactBirthdayElement.value = contactBirthday;
        editContactEmailAddressElement.value = selectedEmail;
        editContactPhoneNumberElement.value = "";
        editContactPhoneNumberElement.value = selectedPhoneNumber;
        editContactAddressElement.value = selectedAddress;
        editContactOrganizationElement.value = contactOrganization;
        editContactRoleElement.value = contactOrganizationRole;
        editContactSocialMediaElement.value = selectedWebsite;
        editContactNotesElement.value = contactNotes;
    });

    editContactLastNameElement.addEventListener("focus", async function() {
        const contactEmailAddress = await getAContactEmailAddresses(user_id, contact_id);
        const contactPhoneNumbers = await getAContactPhoneNumber(user_id, contact_id);
        const contactAddresses = await getAContactAddress(user_id, contact_id);
        const contactWebsites = await getAContactWebsite(user_id, contact_id);

        const contactFirstName = contact.firstname;
        const contactLastName = contact.lastname;
        const contactGender = contact.gender;
        const contactBirthday = contact.birthday;
        const contactEmailSelectElement = document.querySelector("#select-edit-contact-email");
        const contactEmailSelectElementSelectedIndex = contactEmailSelectElement.selectedIndex;
        const contactEmailSelectedOptionElement = contactEmailSelectElement.options[contactEmailSelectElementSelectedIndex]
        const contactEmailSelectedIndexId = Number(contactEmailSelectedOptionElement.getAttribute("id"))
        let selectedEmail;
        for (let i = 0; i < contactEmailAddress.length; i++) {
            if (contactEmailAddress[i].emailid === contactEmailSelectedIndexId) {
                selectedEmail = contactEmailAddress[i].emailaddress;
            }
        };
        const contactPhoneNumberSelectElement = document.querySelector("#select-edit-contact-phonenumber");
        const contactPhoneNumberSelectElementSelectedIndex = contactPhoneNumberSelectElement.selectedIndex;
        const contactPhoneNumberSelectedOptionElement = contactPhoneNumberSelectElement.options[contactPhoneNumberSelectElementSelectedIndex];
        const contactPhoneNumberSelectedIndexId = Number(contactPhoneNumberSelectedOptionElement.getAttribute("id"));
        let selectedPhoneNumber;
        for (let i = 0; i < contactPhoneNumbers.length; i++) {
            if (contactPhoneNumbers[i].phonenumberid === contactPhoneNumberSelectedIndexId) {
                selectedPhoneNumber = contactPhoneNumbers[i].phonenumber
            }
        };
        const contactAddressSelectElement = document.querySelector("#select-edit-contact-address");
        const contactAddressSelectElementSelectedIndex = contactAddressSelectElement.selectedIndex;
        const contactAddressSelectedOptionElement = contactAddressSelectElement.options[contactAddressSelectElementSelectedIndex];
        const contactAddressSelectedIndexId = Number(contactAddressSelectedOptionElement.getAttribute("id"));
        let selectedAddress;
        for (let i = 0; i < contactAddresses.length; i++) {
            if (contactAddresses[i].addressid === contactAddressSelectedIndexId) {
                selectedAddress = contactAddresses[i].address;
            }
        }
        const contactOrganization = contact.organization;
        const contactOrganizationRole = contact.organization_role;
        const contactWebsiteSelectElement = document.querySelector("#select-edit-contact-website");
        const contactWebsitesSelectedIndex = contactWebsiteSelectElement.selectedIndex;
        const contactWebsitesSelectedOptionElement = contactWebsiteSelectElement.options[contactWebsitesSelectedIndex]
        const contactWebsitesSelectedIndexId = Number(contactWebsitesSelectedOptionElement.getAttribute("id"));
        let selectedWebsite;
        for (let i = 0; i < contactWebsites.length; i++) {
            // console.log(contactWebsites[i].websiteid)
            // console.log(contactWebsitesSelectedIndexId)
            if (contactWebsites[i].websiteid === contactWebsitesSelectedIndexId) {
                selectedWebsite = contactWebsites[i].website
            }
        }
        const contactNotes = contact.notes;
        const editContactSelectGenderElement = document.querySelector("#edit-contact-select-gender");
        editContactSelectGenderElement.style.display = "none";
        editContactGenderElement.style.display = "block";

        editContactFirstNameElement.value = contactFirstName;
        editContactGenderElement.value = contactGender;
        editContactBirthdayElement.value = contactBirthday;
        editContactEmailAddressElement.value = selectedEmail;
        editContactPhoneNumberElement.value = "";
        editContactPhoneNumberElement.value = selectedPhoneNumber;
        editContactAddressElement.value = selectedAddress;
        editContactOrganizationElement.value = contactOrganization;
        editContactRoleElement.value = contactOrganizationRole;
        editContactSocialMediaElement.value = selectedWebsite;
        editContactNotesElement.value = contactNotes;
    });

    editContactGenderElement.addEventListener("focus", async function() {
        const contactEmailAddress = await getAContactEmailAddresses(user_id, contact_id);
        const contactPhoneNumbers = await getAContactPhoneNumber(user_id, contact_id);
        const contactAddresses = await getAContactAddress(user_id, contact_id);
        const contactWebsites = await getAContactWebsite(user_id, contact_id);

        const contactFirstName = contact.firstname;
        const contactLastName = contact.lastname;
        const contactGender = contact.gender;
        const contactBirthday = contact.birthday;
        const contactEmailSelectElement = document.querySelector("#select-edit-contact-email");
        const contactEmailSelectElementSelectedIndex = contactEmailSelectElement.selectedIndex;
        const contactEmailSelectedOptionElement = contactEmailSelectElement.options[contactEmailSelectElementSelectedIndex]
        const contactEmailSelectedIndexId = Number(contactEmailSelectedOptionElement.getAttribute("id"))
        let selectedEmail;
        for (let i = 0; i < contactEmailAddress.length; i++) {
            if (contactEmailAddress[i].emailid === contactEmailSelectedIndexId) {
                selectedEmail = contactEmailAddress[i].emailaddress;
            }
        };
        const contactPhoneNumberSelectElement = document.querySelector("#select-edit-contact-phonenumber");
        const contactPhoneNumberSelectElementSelectedIndex = contactPhoneNumberSelectElement.selectedIndex;
        const contactPhoneNumberSelectedOptionElement = contactPhoneNumberSelectElement.options[contactPhoneNumberSelectElementSelectedIndex];
        const contactPhoneNumberSelectedIndexId = Number(contactPhoneNumberSelectedOptionElement.getAttribute("id"));
        let selectedPhoneNumber;
        for (let i = 0; i < contactPhoneNumbers.length; i++) {
            if (contactPhoneNumbers[i].phonenumberid === contactPhoneNumberSelectedIndexId) {
                selectedPhoneNumber = contactPhoneNumbers[i].phonenumber
            }
        };
        const contactAddressSelectElement = document.querySelector("#select-edit-contact-address");
        const contactAddressSelectElementSelectedIndex = contactAddressSelectElement.selectedIndex;
        const contactAddressSelectedOptionElement = contactAddressSelectElement.options[contactAddressSelectElementSelectedIndex];
        const contactAddressSelectedIndexId = Number(contactAddressSelectedOptionElement.getAttribute("id"));
        let selectedAddress;
        for (let i = 0; i < contactAddresses.length; i++) {
            if (contactAddresses[i].addressid === contactAddressSelectedIndexId) {
                selectedAddress = contactAddresses[i].address;
            }
        }
        const contactOrganization = contact.organization;
        const contactOrganizationRole = contact.organization_role;
        const contactWebsiteSelectElement = document.querySelector("#select-edit-contact-website");
        const contactWebsitesSelectedIndex = contactWebsiteSelectElement.selectedIndex;
        const contactWebsitesSelectedOptionElement = contactWebsiteSelectElement.options[contactWebsitesSelectedIndex]
        const contactWebsitesSelectedIndexId = Number(contactWebsitesSelectedOptionElement.getAttribute("id"));
        let selectedWebsite;
        for (let i = 0; i < contactWebsites.length; i++) {
            // console.log(contactWebsites[i].websiteid)
            // console.log(contactWebsitesSelectedIndexId)
            if (contactWebsites[i].websiteid === contactWebsitesSelectedIndexId) {
                selectedWebsite = contactWebsites[i].website
            }
        }
        const contactNotes = contact.notes;
        const editContactSelectGenderElement = document.querySelector("#edit-contact-select-gender");
        const editContactSelectGenderElementOptions = editContactSelectGenderElement.options;
        const editContactSelectGenderElementOptionsHTMLArr = Array.from(editContactSelectGenderElementOptions);
        console.log(editContactSelectGenderElementOptionsHTMLArr)
        // let editContactSelectGenderElementCurrentContactValue;
        for (let i = 0; i < editContactSelectGenderElementOptionsHTMLArr.length; i++) {
            if (editContactSelectGenderElementOptionsHTMLArr[i].text === contactGender) {
                // editContactSelectGenderElementCurrentContactValue = editContactSelectGenderElementOptionsHTMLArr[i].text;
                editContactSelectGenderElementOptionsHTMLArr[i].selected = true;
            }
        }
        // editContactSelectGenderElement.style.display = "none";
        // editContactGenderElement.style.display = "block";

        editContactFirstNameElement.value = contactFirstName;
        editContactLastNameElement.value = contactLastName;
        editContactBirthdayElement.value = contactBirthday;
        editContactEmailAddressElement.value = selectedEmail;
        editContactPhoneNumberElement.value = "";
        editContactPhoneNumberElement.value = selectedPhoneNumber;
        editContactAddressElement.value = selectedAddress;
        editContactOrganizationElement.value = contactOrganization;
        editContactRoleElement.value = contactOrganizationRole;
        editContactSocialMediaElement.value = selectedWebsite;
        editContactNotesElement.value = contactNotes;
    });

    editContactBirthdayElement.addEventListener("focus", async function() {
        const contactEmailAddress = await getAContactEmailAddresses(user_id, contact_id);
        const contactPhoneNumbers = await getAContactPhoneNumber(user_id, contact_id);
        const contactAddresses = await getAContactAddress(user_id, contact_id);
        const contactWebsites = await getAContactWebsite(user_id, contact_id);

        const contactFirstName = contact.firstname;
        const contactLastName = contact.lastname;
        const contactGender = contact.gender;
        const contactBirthday = contact.birthday;
        const contactEmailSelectElement = document.querySelector("#select-edit-contact-email");
        const contactEmailSelectElementSelectedIndex = contactEmailSelectElement.selectedIndex;
        const contactEmailSelectedOptionElement = contactEmailSelectElement.options[contactEmailSelectElementSelectedIndex]
        const contactEmailSelectedIndexId = Number(contactEmailSelectedOptionElement.getAttribute("id"))
        let selectedEmail;
        for (let i = 0; i < contactEmailAddress.length; i++) {
            if (contactEmailAddress[i].emailid === contactEmailSelectedIndexId) {
                selectedEmail = contactEmailAddress[i].emailaddress;
            }
        };
        const contactPhoneNumberSelectElement = document.querySelector("#select-edit-contact-phonenumber");
        const contactPhoneNumberSelectElementSelectedIndex = contactPhoneNumberSelectElement.selectedIndex;
        const contactPhoneNumberSelectedOptionElement = contactPhoneNumberSelectElement.options[contactPhoneNumberSelectElementSelectedIndex];
        const contactPhoneNumberSelectedIndexId = Number(contactPhoneNumberSelectedOptionElement.getAttribute("id"));
        let selectedPhoneNumber;
        for (let i = 0; i < contactPhoneNumbers.length; i++) {
            if (contactPhoneNumbers[i].phonenumberid === contactPhoneNumberSelectedIndexId) {
                selectedPhoneNumber = contactPhoneNumbers[i].phonenumber
            }
        };
        const contactAddressSelectElement = document.querySelector("#select-edit-contact-address");
        const contactAddressSelectElementSelectedIndex = contactAddressSelectElement.selectedIndex;
        const contactAddressSelectedOptionElement = contactAddressSelectElement.options[contactAddressSelectElementSelectedIndex];
        const contactAddressSelectedIndexId = Number(contactAddressSelectedOptionElement.getAttribute("id"));
        let selectedAddress;
        for (let i = 0; i < contactAddresses.length; i++) {
            if (contactAddresses[i].addressid === contactAddressSelectedIndexId) {
                selectedAddress = contactAddresses[i].address;
            }
        }
        const contactOrganization = contact.organization;
        const contactOrganizationRole = contact.organization_role;
        const contactWebsiteSelectElement = document.querySelector("#select-edit-contact-website");
        const contactWebsitesSelectedIndex = contactWebsiteSelectElement.selectedIndex;
        const contactWebsitesSelectedOptionElement = contactWebsiteSelectElement.options[contactWebsitesSelectedIndex]
        const contactWebsitesSelectedIndexId = Number(contactWebsitesSelectedOptionElement.getAttribute("id"));
        let selectedWebsite;
        for (let i = 0; i < contactWebsites.length; i++) {
            // console.log(contactWebsites[i].websiteid)
            // console.log(contactWebsitesSelectedIndexId)
            if (contactWebsites[i].websiteid === contactWebsitesSelectedIndexId) {
                selectedWebsite = contactWebsites[i].website
            }
        }
        const contactNotes = contact.notes;
        const editContactSelectGenderElement = document.querySelector("#edit-contact-select-gender");
        editContactSelectGenderElement.style.display = "none";
        editContactGenderElement.style.display = "block";

        editContactFirstNameElement.value = contactFirstName;
        editContactLastNameElement.value = contactLastName;
        editContactGenderElement.value = contactGender;
        editContactEmailAddressElement.value = selectedEmail;
        editContactPhoneNumberElement.value = "";
        editContactPhoneNumberElement.value = selectedPhoneNumber;
        editContactAddressElement.value = selectedAddress;
        editContactOrganizationElement.value = contactOrganization;
        editContactRoleElement.value = contactOrganizationRole;
        editContactSocialMediaElement.value = selectedWebsite;
        editContactNotesElement.value = contactNotes;
    });

    editContactEmailAddressElement.addEventListener("focus", async function() {
        const contactEmailAddress = await getAContactEmailAddresses(user_id, contact_id);
        const contactPhoneNumbers = await getAContactPhoneNumber(user_id, contact_id);
        const contactAddresses = await getAContactAddress(user_id, contact_id);
        const contactWebsites = await getAContactWebsite(user_id, contact_id);

        const contactFirstName = contact.firstname;
        const contactLastName = contact.lastname;
        const contactGender = contact.gender;
        const contactBirthday = contact.birthday;
        const contactEmailSelectElement = document.querySelector("#select-edit-contact-email");
        const contactEmailSelectElementSelectedIndex = contactEmailSelectElement.selectedIndex;
        const contactEmailSelectedOptionElement = contactEmailSelectElement.options[contactEmailSelectElementSelectedIndex]
        const contactEmailSelectedIndexId = Number(contactEmailSelectedOptionElement.getAttribute("id"))
        let selectedEmail;
        for (let i = 0; i < contactEmailAddress.length; i++) {
            if (contactEmailAddress[i].emailid === contactEmailSelectedIndexId) {
                selectedEmail = contactEmailAddress[i].emailaddress;
            }
        };
        const contactPhoneNumberSelectElement = document.querySelector("#select-edit-contact-phonenumber");
        const contactPhoneNumberSelectElementSelectedIndex = contactPhoneNumberSelectElement.selectedIndex;
        const contactPhoneNumberSelectedOptionElement = contactPhoneNumberSelectElement.options[contactPhoneNumberSelectElementSelectedIndex];
        const contactPhoneNumberSelectedIndexId = Number(contactPhoneNumberSelectedOptionElement.getAttribute("id"));
        let selectedPhoneNumber;
        for (let i = 0; i < contactPhoneNumbers.length; i++) {
            if (contactPhoneNumbers[i].phonenumberid === contactPhoneNumberSelectedIndexId) {
                selectedPhoneNumber = contactPhoneNumbers[i].phonenumber
            }
        };
        const contactAddressSelectElement = document.querySelector("#select-edit-contact-address");
        const contactAddressSelectElementSelectedIndex = contactAddressSelectElement.selectedIndex;
        const contactAddressSelectedOptionElement = contactAddressSelectElement.options[contactAddressSelectElementSelectedIndex];
        const contactAddressSelectedIndexId = Number(contactAddressSelectedOptionElement.getAttribute("id"));
        let selectedAddress;
        for (let i = 0; i < contactAddresses.length; i++) {
            if (contactAddresses[i].addressid === contactAddressSelectedIndexId) {
                selectedAddress = contactAddresses[i].address;
            }
        }
        const contactOrganization = contact.organization;
        const contactOrganizationRole = contact.organization_role;
        const contactWebsiteSelectElement = document.querySelector("#select-edit-contact-website");
        const contactWebsitesSelectedIndex = contactWebsiteSelectElement.selectedIndex;
        const contactWebsitesSelectedOptionElement = contactWebsiteSelectElement.options[contactWebsitesSelectedIndex]
        const contactWebsitesSelectedIndexId = Number(contactWebsitesSelectedOptionElement.getAttribute("id"));
        let selectedWebsite;
        for (let i = 0; i < contactWebsites.length; i++) {
            // console.log(contactWebsites[i].websiteid)
            // console.log(contactWebsitesSelectedIndexId)
            if (contactWebsites[i].websiteid === contactWebsitesSelectedIndexId) {
                selectedWebsite = contactWebsites[i].website
            }
        }
        const contactNotes = contact.notes;
        const editContactSelectGenderElement = document.querySelector("#edit-contact-select-gender");
        editContactSelectGenderElement.style.display = "none";
        editContactGenderElement.style.display = "block";

        editContactFirstNameElement.value = contactFirstName;
        editContactLastNameElement.value = contactLastName;
        editContactGenderElement.value = contactGender;
        editContactBirthdayElement.value = contactBirthday;
        editContactPhoneNumberElement.value = "";
        editContactPhoneNumberElement.value = selectedPhoneNumber;
        editContactAddressElement.value = selectedAddress;
        editContactOrganizationElement.value = contactOrganization;
        editContactRoleElement.value = contactOrganizationRole;
        editContactSocialMediaElement.value = selectedWebsite;
        editContactNotesElement.value = contactNotes;
    });

    editContactPhoneNumberElement.addEventListener("focus", async function() {
        const contactEmailAddress = await getAContactEmailAddresses(user_id, contact_id);
        const contactPhoneNumbers = await getAContactPhoneNumber(user_id, contact_id);
        const contactAddresses = await getAContactAddress(user_id, contact_id);
        const contactWebsites = await getAContactWebsite(user_id, contact_id);

        const contactFirstName = contact.firstname;
        const contactLastName = contact.lastname;
        const contactGender = contact.gender;
        const contactBirthday = contact.birthday;
        const contactEmailSelectElement = document.querySelector("#select-edit-contact-email");
        const contactEmailSelectElementSelectedIndex = contactEmailSelectElement.selectedIndex;
        const contactEmailSelectedOptionElement = contactEmailSelectElement.options[contactEmailSelectElementSelectedIndex]
        const contactEmailSelectedIndexId = Number(contactEmailSelectedOptionElement.getAttribute("id"))
        let selectedEmail;
        for (let i = 0; i < contactEmailAddress.length; i++) {
            if (contactEmailAddress[i].emailid === contactEmailSelectedIndexId) {
                selectedEmail = contactEmailAddress[i].emailaddress;
            }
        };
        const contactPhoneNumberSelectElement = document.querySelector("#select-edit-contact-phonenumber");
        const contactPhoneNumberSelectElementSelectedIndex = contactPhoneNumberSelectElement.selectedIndex;
        const contactPhoneNumberSelectedOptionElement = contactPhoneNumberSelectElement.options[contactPhoneNumberSelectElementSelectedIndex];
        const contactPhoneNumberSelectedIndexId = Number(contactPhoneNumberSelectedOptionElement.getAttribute("id"));
        let selectedPhoneNumber;
        for (let i = 0; i < contactPhoneNumbers.length; i++) {
            if (contactPhoneNumbers[i].phonenumberid === contactPhoneNumberSelectedIndexId) {
                selectedPhoneNumber = contactPhoneNumbers[i].phonenumber
            }
        };
        const contactAddressSelectElement = document.querySelector("#select-edit-contact-address");
        const contactAddressSelectElementSelectedIndex = contactAddressSelectElement.selectedIndex;
        const contactAddressSelectedOptionElement = contactAddressSelectElement.options[contactAddressSelectElementSelectedIndex];
        const contactAddressSelectedIndexId = Number(contactAddressSelectedOptionElement.getAttribute("id"));
        let selectedAddress;
        for (let i = 0; i < contactAddresses.length; i++) {
            if (contactAddresses[i].addressid === contactAddressSelectedIndexId) {
                selectedAddress = contactAddresses[i].address;
            }
        }
        const contactOrganization = contact.organization;
        const contactOrganizationRole = contact.organization_role;
        const contactWebsiteSelectElement = document.querySelector("#select-edit-contact-website");
        const contactWebsitesSelectedIndex = contactWebsiteSelectElement.selectedIndex;
        const contactWebsitesSelectedOptionElement = contactWebsiteSelectElement.options[contactWebsitesSelectedIndex]
        const contactWebsitesSelectedIndexId = Number(contactWebsitesSelectedOptionElement.getAttribute("id"));
        let selectedWebsite;
        for (let i = 0; i < contactWebsites.length; i++) {
            // console.log(contactWebsites[i].websiteid)
            // console.log(contactWebsitesSelectedIndexId)
            if (contactWebsites[i].websiteid === contactWebsitesSelectedIndexId) {
                selectedWebsite = contactWebsites[i].website
            }
        }
        const contactNotes = contact.notes;
        const editContactSelectGenderElement = document.querySelector("#edit-contact-select-gender");
        editContactSelectGenderElement.style.display = "none";
        editContactGenderElement.style.display = "block";

        editContactFirstNameElement.value = contactFirstName;
        editContactLastNameElement.value = contactLastName;
        editContactGenderElement.value = contactGender;
        editContactBirthdayElement.value = contactBirthday;
        editContactEmailAddressElement.value = selectedEmail;
        editContactAddressElement.value = selectedAddress;
        editContactOrganizationElement.value = contactOrganization;
        editContactRoleElement.value = contactOrganizationRole;
        editContactSocialMediaElement.value = selectedWebsite;
        editContactNotesElement.value = contactNotes;
    });

    editContactAddressElement.addEventListener("focus", async function() {
        const contactEmailAddress = await getAContactEmailAddresses(user_id, contact_id);
        const contactPhoneNumbers = await getAContactPhoneNumber(user_id, contact_id);
        const contactAddresses = await getAContactAddress(user_id, contact_id);
        const contactWebsites = await getAContactWebsite(user_id, contact_id);

        const contactFirstName = contact.firstname;
        const contactLastName = contact.lastname;
        const contactGender = contact.gender;
        const contactBirthday = contact.birthday;
        const contactEmailSelectElement = document.querySelector("#select-edit-contact-email");
        const contactEmailSelectElementSelectedIndex = contactEmailSelectElement.selectedIndex;
        const contactEmailSelectedOptionElement = contactEmailSelectElement.options[contactEmailSelectElementSelectedIndex]
        const contactEmailSelectedIndexId = Number(contactEmailSelectedOptionElement.getAttribute("id"))
        let selectedEmail;
        for (let i = 0; i < contactEmailAddress.length; i++) {
            if (contactEmailAddress[i].emailid === contactEmailSelectedIndexId) {
                selectedEmail = contactEmailAddress[i].emailaddress;
            }
        };
        const contactPhoneNumberSelectElement = document.querySelector("#select-edit-contact-phonenumber");
        const contactPhoneNumberSelectElementSelectedIndex = contactPhoneNumberSelectElement.selectedIndex;
        const contactPhoneNumberSelectedOptionElement = contactPhoneNumberSelectElement.options[contactPhoneNumberSelectElementSelectedIndex];
        const contactPhoneNumberSelectedIndexId = Number(contactPhoneNumberSelectedOptionElement.getAttribute("id"));
        let selectedPhoneNumber;
        for (let i = 0; i < contactPhoneNumbers.length; i++) {
            if (contactPhoneNumbers[i].phonenumberid === contactPhoneNumberSelectedIndexId) {
                selectedPhoneNumber = contactPhoneNumbers[i].phonenumber
            }
        };
        const contactAddressSelectElement = document.querySelector("#select-edit-contact-address");
        const contactAddressSelectElementSelectedIndex = contactAddressSelectElement.selectedIndex;
        const contactAddressSelectedOptionElement = contactAddressSelectElement.options[contactAddressSelectElementSelectedIndex];
        const contactAddressSelectedIndexId = Number(contactAddressSelectedOptionElement.getAttribute("id"));
        let selectedAddress;
        for (let i = 0; i < contactAddresses.length; i++) {
            if (contactAddresses[i].addressid === contactAddressSelectedIndexId) {
                selectedAddress = contactAddresses[i].address;
            }
        }
        const contactOrganization = contact.organization;
        const contactOrganizationRole = contact.organization_role;
        const contactWebsiteSelectElement = document.querySelector("#select-edit-contact-website");
        const contactWebsitesSelectedIndex = contactWebsiteSelectElement.selectedIndex;
        const contactWebsitesSelectedOptionElement = contactWebsiteSelectElement.options[contactWebsitesSelectedIndex]
        const contactWebsitesSelectedIndexId = Number(contactWebsitesSelectedOptionElement.getAttribute("id"));
        let selectedWebsite;
        for (let i = 0; i < contactWebsites.length; i++) {
            // console.log(contactWebsites[i].websiteid)
            // console.log(contactWebsitesSelectedIndexId)
            if (contactWebsites[i].websiteid === contactWebsitesSelectedIndexId) {
                selectedWebsite = contactWebsites[i].website
            }
        }
        const contactNotes = contact.notes;
        const editContactSelectGenderElement = document.querySelector("#edit-contact-select-gender");
        editContactSelectGenderElement.style.display = "none";
        editContactGenderElement.style.display = "block";

        editContactFirstNameElement.value = contactFirstName;
        editContactLastNameElement.value = contactLastName;
        editContactGenderElement.value = contactGender;
        editContactBirthdayElement.value = contactBirthday;
        editContactEmailAddressElement.value = selectedEmail;
        editContactPhoneNumberElement.value = "";
        editContactPhoneNumberElement.value = selectedPhoneNumber;
        editContactOrganizationElement.value = contactOrganization;
        editContactRoleElement.value = contactOrganizationRole;
        editContactSocialMediaElement.value = selectedWebsite;
        editContactNotesElement.value = contactNotes;
    });

    editContactOrganizationElement.addEventListener("focus", async function() {
        const contactEmailAddress = await getAContactEmailAddresses(user_id, contact_id);
        const contactPhoneNumbers = await getAContactPhoneNumber(user_id, contact_id);
        const contactAddresses = await getAContactAddress(user_id, contact_id);
        const contactWebsites = await getAContactWebsite(user_id, contact_id);

        const contactFirstName = contact.firstname;
        const contactLastName = contact.lastname;
        const contactGender = contact.gender;
        const contactBirthday = contact.birthday;
        const contactEmailSelectElement = document.querySelector("#select-edit-contact-email");
        const contactEmailSelectElementSelectedIndex = contactEmailSelectElement.selectedIndex;
        const contactEmailSelectedOptionElement = contactEmailSelectElement.options[contactEmailSelectElementSelectedIndex]
        const contactEmailSelectedIndexId = Number(contactEmailSelectedOptionElement.getAttribute("id"))
        let selectedEmail;
        for (let i = 0; i < contactEmailAddress.length; i++) {
            if (contactEmailAddress[i].emailid === contactEmailSelectedIndexId) {
                selectedEmail = contactEmailAddress[i].emailaddress;
            }
        };
        const contactPhoneNumberSelectElement = document.querySelector("#select-edit-contact-phonenumber");
        const contactPhoneNumberSelectElementSelectedIndex = contactPhoneNumberSelectElement.selectedIndex;
        const contactPhoneNumberSelectedOptionElement = contactPhoneNumberSelectElement.options[contactPhoneNumberSelectElementSelectedIndex];
        const contactPhoneNumberSelectedIndexId = Number(contactPhoneNumberSelectedOptionElement.getAttribute("id"));
        let selectedPhoneNumber;
        for (let i = 0; i < contactPhoneNumbers.length; i++) {
            if (contactPhoneNumbers[i].phonenumberid === contactPhoneNumberSelectedIndexId) {
                selectedPhoneNumber = contactPhoneNumbers[i].phonenumber
            }
        };
        const contactAddressSelectElement = document.querySelector("#select-edit-contact-address");
        const contactAddressSelectElementSelectedIndex = contactAddressSelectElement.selectedIndex;
        const contactAddressSelectedOptionElement = contactAddressSelectElement.options[contactAddressSelectElementSelectedIndex];
        const contactAddressSelectedIndexId = Number(contactAddressSelectedOptionElement.getAttribute("id"));
        let selectedAddress;
        for (let i = 0; i < contactAddresses.length; i++) {
            if (contactAddresses[i].addressid === contactAddressSelectedIndexId) {
                selectedAddress = contactAddresses[i].address;
            }
        }
        const contactOrganization = contact.organization;
        const contactOrganizationRole = contact.organization_role;
        const contactWebsiteSelectElement = document.querySelector("#select-edit-contact-website");
        const contactWebsitesSelectedIndex = contactWebsiteSelectElement.selectedIndex;
        const contactWebsitesSelectedOptionElement = contactWebsiteSelectElement.options[contactWebsitesSelectedIndex]
        const contactWebsitesSelectedIndexId = Number(contactWebsitesSelectedOptionElement.getAttribute("id"));
        let selectedWebsite;
        for (let i = 0; i < contactWebsites.length; i++) {
            // console.log(contactWebsites[i].websiteid)
            // console.log(contactWebsitesSelectedIndexId)
            if (contactWebsites[i].websiteid === contactWebsitesSelectedIndexId) {
                selectedWebsite = contactWebsites[i].website
            }
        }
        const contactNotes = contact.notes;
        const editContactSelectGenderElement = document.querySelector("#edit-contact-select-gender");
        editContactSelectGenderElement.style.display = "none";
        editContactGenderElement.style.display = "block";

        editContactFirstNameElement.value = contactFirstName;
        editContactLastNameElement.value = contactLastName;
        editContactGenderElement.value = contactGender;
        editContactBirthdayElement.value = contactBirthday;
        editContactEmailAddressElement.value = selectedEmail;
        editContactPhoneNumberElement.value = "";
        editContactPhoneNumberElement.value = selectedPhoneNumber;
        editContactAddressElement.value = selectedAddress;
        editContactRoleElement.value = contactOrganizationRole;
        editContactSocialMediaElement.value = selectedWebsite;
        editContactNotesElement.value = contactNotes;
    });

    editContactRoleElement.addEventListener("focus", async function() {
        const contactEmailAddress = await getAContactEmailAddresses(user_id, contact_id);
        const contactPhoneNumbers = await getAContactPhoneNumber(user_id, contact_id);
        const contactAddresses = await getAContactAddress(user_id, contact_id);
        const contactWebsites = await getAContactWebsite(user_id, contact_id);

        const contactFirstName = contact.firstname;
        const contactLastName = contact.lastname;
        const contactGender = contact.gender;
        const contactBirthday = contact.birthday;
        const contactEmailSelectElement = document.querySelector("#select-edit-contact-email");
        const contactEmailSelectElementSelectedIndex = contactEmailSelectElement.selectedIndex;
        const contactEmailSelectedOptionElement = contactEmailSelectElement.options[contactEmailSelectElementSelectedIndex]
        const contactEmailSelectedIndexId = Number(contactEmailSelectedOptionElement.getAttribute("id"))
        let selectedEmail;
        for (let i = 0; i < contactEmailAddress.length; i++) {
            if (contactEmailAddress[i].emailid === contactEmailSelectedIndexId) {
                selectedEmail = contactEmailAddress[i].emailaddress;
            }
        };
        const contactPhoneNumberSelectElement = document.querySelector("#select-edit-contact-phonenumber");
        const contactPhoneNumberSelectElementSelectedIndex = contactPhoneNumberSelectElement.selectedIndex;
        const contactPhoneNumberSelectedOptionElement = contactPhoneNumberSelectElement.options[contactPhoneNumberSelectElementSelectedIndex];
        const contactPhoneNumberSelectedIndexId = Number(contactPhoneNumberSelectedOptionElement.getAttribute("id"));
        let selectedPhoneNumber;
        for (let i = 0; i < contactPhoneNumbers.length; i++) {
            if (contactPhoneNumbers[i].phonenumberid === contactPhoneNumberSelectedIndexId) {
                selectedPhoneNumber = contactPhoneNumbers[i].phonenumber
            }
        };
        const contactAddressSelectElement = document.querySelector("#select-edit-contact-address");
        const contactAddressSelectElementSelectedIndex = contactAddressSelectElement.selectedIndex;
        const contactAddressSelectedOptionElement = contactAddressSelectElement.options[contactAddressSelectElementSelectedIndex];
        const contactAddressSelectedIndexId = Number(contactAddressSelectedOptionElement.getAttribute("id"));
        let selectedAddress;
        for (let i = 0; i < contactAddresses.length; i++) {
            if (contactAddresses[i].addressid === contactAddressSelectedIndexId) {
                selectedAddress = contactAddresses[i].address;
            }
        }
        const contactOrganization = contact.organization;
        const contactOrganizationRole = contact.organization_role;
        const contactWebsiteSelectElement = document.querySelector("#select-edit-contact-website");
        const contactWebsitesSelectedIndex = contactWebsiteSelectElement.selectedIndex;
        const contactWebsitesSelectedOptionElement = contactWebsiteSelectElement.options[contactWebsitesSelectedIndex]
        const contactWebsitesSelectedIndexId = Number(contactWebsitesSelectedOptionElement.getAttribute("id"));
        let selectedWebsite;
        for (let i = 0; i < contactWebsites.length; i++) {
            // console.log(contactWebsites[i].websiteid)
            // console.log(contactWebsitesSelectedIndexId)
            if (contactWebsites[i].websiteid === contactWebsitesSelectedIndexId) {
                selectedWebsite = contactWebsites[i].website
            }
        }
        const contactNotes = contact.notes;
        const editContactSelectGenderElement = document.querySelector("#edit-contact-select-gender");
        editContactSelectGenderElement.style.display = "none";
        editContactGenderElement.style.display = "block";

        editContactFirstNameElement.value = contactFirstName;
        editContactLastNameElement.value = contactLastName;
        editContactGenderElement.value = contactGender;
        editContactBirthdayElement.value = contactBirthday;
        editContactEmailAddressElement.value = selectedEmail;
        editContactPhoneNumberElement.value = "";
        editContactPhoneNumberElement.value = selectedPhoneNumber;
        editContactAddressElement.value = selectedAddress;
        editContactOrganizationElement.value = contactOrganization;
        editContactSocialMediaElement.value = selectedWebsite;
        editContactNotesElement.value = contactNotes;
    });

    editContactSocialMediaElement.addEventListener("focus", async function() {
        const contactEmailAddress = await getAContactEmailAddresses(user_id, contact_id);
        const contactPhoneNumbers = await getAContactPhoneNumber(user_id, contact_id);
        const contactAddresses = await getAContactAddress(user_id, contact_id);
        const contactWebsites = await getAContactWebsite(user_id, contact_id);

        const contactFirstName = contact.firstname;
        const contactLastName = contact.lastname;
        const contactGender = contact.gender;
        const contactBirthday = contact.birthday;
        const contactEmailSelectElement = document.querySelector("#select-edit-contact-email");
        const contactEmailSelectElementSelectedIndex = contactEmailSelectElement.selectedIndex;
        const contactEmailSelectedOptionElement = contactEmailSelectElement.options[contactEmailSelectElementSelectedIndex]
        const contactEmailSelectedIndexId = Number(contactEmailSelectedOptionElement.getAttribute("id"))
        let selectedEmail;
        for (let i = 0; i < contactEmailAddress.length; i++) {
            if (contactEmailAddress[i].emailid === contactEmailSelectedIndexId) {
                selectedEmail = contactEmailAddress[i].emailaddress;
            }
        };
        const contactPhoneNumberSelectElement = document.querySelector("#select-edit-contact-phonenumber");
        const contactPhoneNumberSelectElementSelectedIndex = contactPhoneNumberSelectElement.selectedIndex;
        const contactPhoneNumberSelectedOptionElement = contactPhoneNumberSelectElement.options[contactPhoneNumberSelectElementSelectedIndex];
        const contactPhoneNumberSelectedIndexId = Number(contactPhoneNumberSelectedOptionElement.getAttribute("id"));
        let selectedPhoneNumber;
        for (let i = 0; i < contactPhoneNumbers.length; i++) {
            if (contactPhoneNumbers[i].phonenumberid === contactPhoneNumberSelectedIndexId) {
                selectedPhoneNumber = contactPhoneNumbers[i].phonenumber
            }
        };
        const contactAddressSelectElement = document.querySelector("#select-edit-contact-address");
        const contactAddressSelectElementSelectedIndex = contactAddressSelectElement.selectedIndex;
        const contactAddressSelectedOptionElement = contactAddressSelectElement.options[contactAddressSelectElementSelectedIndex];
        const contactAddressSelectedIndexId = Number(contactAddressSelectedOptionElement.getAttribute("id"));
        let selectedAddress;
        for (let i = 0; i < contactAddresses.length; i++) {
            if (contactAddresses[i].addressid === contactAddressSelectedIndexId) {
                selectedAddress = contactAddresses[i].address;
            }
        }
        const contactOrganization = contact.organization;
        const contactOrganizationRole = contact.organization_role;
        const contactWebsiteSelectElement = document.querySelector("#select-edit-contact-website");
        const contactWebsitesSelectedIndex = contactWebsiteSelectElement.selectedIndex;
        const contactWebsitesSelectedOptionElement = contactWebsiteSelectElement.options[contactWebsitesSelectedIndex]
        const contactWebsitesSelectedIndexId = Number(contactWebsitesSelectedOptionElement.getAttribute("id"));
        let selectedWebsite;
        for (let i = 0; i < contactWebsites.length; i++) {
            // console.log(contactWebsites[i].websiteid)
            // console.log(contactWebsitesSelectedIndexId)
            if (contactWebsites[i].websiteid === contactWebsitesSelectedIndexId) {
                selectedWebsite = contactWebsites[i].website
            }
        }
        const contactNotes = contact.notes;
        const editContactSelectGenderElement = document.querySelector("#edit-contact-select-gender");
        editContactSelectGenderElement.style.display = "none";
        editContactGenderElement.style.display = "block";

        editContactFirstNameElement.value = contactFirstName;
        editContactLastNameElement.value = contactLastName;
        editContactGenderElement.value = contactGender;
        editContactBirthdayElement.value = contactBirthday;
        editContactEmailAddressElement.value = selectedEmail;
        editContactPhoneNumberElement.value = "";
        editContactPhoneNumberElement.value = selectedPhoneNumber;
        editContactAddressElement.value = selectedAddress;
        editContactOrganizationElement.value = contactOrganization;
        editContactRoleElement.value = contactOrganizationRole;
        editContactNotesElement.value = contactNotes;
    });

    editContactNotesElement.addEventListener("focus", async function() {
        const contactEmailAddress = await getAContactEmailAddresses(user_id, contact_id);
        const contactPhoneNumbers = await getAContactPhoneNumber(user_id, contact_id);
        const contactAddresses = await getAContactAddress(user_id, contact_id);
        const contactWebsites = await getAContactWebsite(user_id, contact_id);

        const contactFirstName = contact.firstname;
        const contactLastName = contact.lastname;
        const contactGender = contact.gender;
        const contactBirthday = contact.birthday;
        const contactEmailSelectElement = document.querySelector("#select-edit-contact-email");
        const contactEmailSelectElementSelectedIndex = contactEmailSelectElement.selectedIndex;
        const contactEmailSelectedOptionElement = contactEmailSelectElement.options[contactEmailSelectElementSelectedIndex]
        const contactEmailSelectedIndexId = Number(contactEmailSelectedOptionElement.getAttribute("id"))
        let selectedEmail;
        for (let i = 0; i < contactEmailAddress.length; i++) {
            if (contactEmailAddress[i].emailid === contactEmailSelectedIndexId) {
                selectedEmail = contactEmailAddress[i].emailaddress;
            }
        };
        const contactPhoneNumberSelectElement = document.querySelector("#select-edit-contact-phonenumber");
        const contactPhoneNumberSelectElementSelectedIndex = contactPhoneNumberSelectElement.selectedIndex;
        const contactPhoneNumberSelectedOptionElement = contactPhoneNumberSelectElement.options[contactPhoneNumberSelectElementSelectedIndex];
        const contactPhoneNumberSelectedIndexId = Number(contactPhoneNumberSelectedOptionElement.getAttribute("id"));
        let selectedPhoneNumber;
        for (let i = 0; i < contactPhoneNumbers.length; i++) {
            if (contactPhoneNumbers[i].phonenumberid === contactPhoneNumberSelectedIndexId) {
                selectedPhoneNumber = contactPhoneNumbers[i].phonenumber
            }
        };
        const contactAddressSelectElement = document.querySelector("#select-edit-contact-address");
        const contactAddressSelectElementSelectedIndex = contactAddressSelectElement.selectedIndex;
        const contactAddressSelectedOptionElement = contactAddressSelectElement.options[contactAddressSelectElementSelectedIndex];
        const contactAddressSelectedIndexId = Number(contactAddressSelectedOptionElement.getAttribute("id"));
        let selectedAddress;
        for (let i = 0; i < contactAddresses.length; i++) {
            if (contactAddresses[i].addressid === contactAddressSelectedIndexId) {
                selectedAddress = contactAddresses[i].address;
            }
        }
        const contactOrganization = contact.organization;
        const contactOrganizationRole = contact.organization_role;
        const contactWebsiteSelectElement = document.querySelector("#select-edit-contact-website");
        const contactWebsitesSelectedIndex = contactWebsiteSelectElement.selectedIndex;
        const contactWebsitesSelectedOptionElement = contactWebsiteSelectElement.options[contactWebsitesSelectedIndex]
        const contactWebsitesSelectedIndexId = Number(contactWebsitesSelectedOptionElement.getAttribute("id"));
        let selectedWebsite;
        for (let i = 0; i < contactWebsites.length; i++) {
            // console.log(contactWebsites[i].websiteid)
            // console.log(contactWebsitesSelectedIndexId)
            if (contactWebsites[i].websiteid === contactWebsitesSelectedIndexId) {
                selectedWebsite = contactWebsites[i].website
            }
        }
        const contactNotes = contact.notes;
        const editContactSelectGenderElement = document.querySelector("#edit-contact-select-gender");
        editContactSelectGenderElement.style.display = "none";
        editContactGenderElement.style.display = "block";

        editContactFirstNameElement.value = contactFirstName;
        editContactLastNameElement.value = contactLastName;
        editContactGenderElement.value = contactGender;
        editContactBirthdayElement.value = contactBirthday;
        editContactEmailAddressElement.value = selectedEmail;
        editContactPhoneNumberElement.value = "";
        editContactPhoneNumberElement.value = selectedPhoneNumber;
        editContactAddressElement.value = selectedAddress;
        editContactOrganizationElement.value = contactOrganization;
        editContactRoleElement.value = contactOrganizationRole;
        editContactSocialMediaElement.value = selectedWebsite;
    });

    const updateContactFirstnameButton = document.querySelector("#update-contact-firstname-button");
    updateContactFirstnameButton.addEventListener("click", function() {
        updateContactFirstName()
    });

    const updateContactLastNameButton = document.querySelector("#update-contact-lastname-button");
    updateContactLastNameButton.addEventListener("click", function() {
        updateContactLastName()
    });

    const updateContactGenderButton = document.querySelector("#update-contact-gender-button");
    updateContactGenderButton.addEventListener("click", function() {
        updateContactGender()
    });

    const updateContactBirthdayButton = document.querySelector("#update-contact-birthday-button");
    updateContactBirthdayButton.addEventListener("click", function() {
        updateContactBirthday()
    });

    const contactEmailAddresses = await getAContactEmailAddresses(user_id, contact_id);
    console.log(contactEmailAddresses)
    const editContactEmailSelectElement = document.querySelector("#select-edit-contact-email");
    let editContactEmailLabelOptionsData = []
    contactEmailAddresses.forEach(contactEmailAddressObj => {
        const emailLabelOptionsDataObj = {
            text: contactEmailAddressObj.emailaddresslabel,
            value: contactEmailAddressObj.emailaddresslabel,
            id: contactEmailAddressObj.emailid
        }
        editContactEmailLabelOptionsData.push(emailLabelOptionsDataObj)
    });
    console.log(editContactEmailLabelOptionsData)

     for (let i = 0; i < editContactEmailLabelOptionsData.length; i++) {
        const option = document.createElement("option");
        // editContactEmailLabelOptionsData[0].style.borderBottom = "1px solid gray"
        option.text = editContactEmailLabelOptionsData[i].text;
        option.value = editContactEmailLabelOptionsData[i].value;
        option.setAttribute("id", editContactEmailLabelOptionsData[i].id)

        if (option.text === contactEmailAddresses.emailaddresslabel) {
            option.setAttribute("selected", true)
        }

        editContactEmailSelectElement.appendChild(option);
    };

    const editContactEmailLabelModal = document.querySelector("#edit-contact-email-label-modal");
    const editEmailLabelIcon = document.querySelector("#edit-email-label-icon");
    editEmailLabelIcon.addEventListener("click", function() {

        editContactEmailLabelModal.style.display = "block";
        // console.log("open edit email label modal")
        const selectEditContactEmailElement = document.querySelector("#select-edit-contact-email");
        const selectedEditContactEmailOptionIndex = selectEditContactEmailElement.selectedIndex;
        const selectedEditContactEmailOptionElement = selectEditContactEmailElement.options[selectedEditContactEmailOptionIndex];
        const selectedEditContactEmailOptionElementId = selectedEditContactEmailOptionElement.getAttribute("id");
        console.log(selectedEditContactEmailOptionElement)

        const editContactEmailLabelCurrentValueElement = document.querySelector("#edit-contact-email-label-current-value");
        editContactEmailLabelCurrentValueElement.value = selectEditContactEmailElement.value
    });

    const editContactEmailLabelSelectElement = document.querySelector("#edit-contact-email-label-select");
    const editEmailLabelOpitonsData = [
        { text: "None", value: "None"},
        { text: "Home", value: "Home" },
        { text: "Work", value: "Work" },
        { text: "School", value: "School" },
        { text: "Other", value: "Other" }
      ];

    for (let i = 0; i < editEmailLabelOpitonsData.length; i++) {
        const option = document.createElement("option");
        // editEmailLabelOpitonsData[0].style.borderBottom = "1px solid gray"
        option.text = editEmailLabelOpitonsData[i].text;
        option.value = editEmailLabelOpitonsData[i].value;

        if (option.text === contactEmailAddresses.emailaddresslabel) {
            option.setAttribute("selected", true)
        }

        editContactEmailLabelSelectElement.appendChild(option);
    };

      const editContactEmailLabelInputElement = document.querySelector("#edit-contact-email-label-input");
      editContactEmailLabelSelectElement.addEventListener('click', function(event) {
        const selectedOptionValue = event.target.value;
        const selectedOptionText = event.target.options[event.target.selectedIndex].text;
        editContactEmailLabelInputElement.value = selectedOptionText;
        // editContactGenderInputElement.style.display = "block"
        // selectGenderElement.style.display = "none"
      
        // Perform actions based on the selected option
        console.log('Selected option value:', selectedOptionValue);
        console.log('Selected option text:', selectedOptionText);
        const enterCustomGenderInputElement = document.querySelector("#enter-custom-gender")
      });

      const editContactEmailLabelSecondInputElement = document.querySelector("#edit-contact-email-label-second-input");
      editContactEmailLabelInputElement.addEventListener("click", function() {
          editContactEmailLabelInputElement.style.display = "none";
          editContactEmailLabelSelectElement.style.display = "block";
          editContactEmailLabelSecondInputElement.value = ""
          editContactEmailLabelInputElement.setAttribute("autocomplete", "off")
          editContactEmailLabelSelectElement.setAttribute("autocomplete", "off")
      });

      editContactEmailLabelSecondInputElement.addEventListener("click", function() {
         editContactEmailLabelSelectElement.value = editContactEmailLabelSelectElement.options[0].text;
         editContactEmailLabelInputElement.style.display = "block";
         editContactEmailLabelInputElement.value = "";
         editContactEmailLabelSelectElement.style.display = "none";
      });

    // const createContactEmailButton = document.querySelector("#create-contact-email-button");
    // createContactEmailButton.addEventListener("click", function(event) {
    //     postAddNewContactEmailAddress()
    // });

    // const updateContactEmailButton = document.querySelector("#update-contact-emailaddress");
    // updateContactEmailButton.addEventListener("click", function() {
    //     updateContactEmailAddress()
    //     // handleUpdateContactEmailInput()
    // });

    // const deleteContactEmailButton = document.querySelector("#remove-contact-emailaddress");
    // deleteContactEmailButton.addEventListener("click", function() {
    //     deleteContactEmailAddress()
    //     // handleDeleteContactEmail()
    // });

    const closeEditContactEmailLabelModalIcon = document.querySelector("#close-edit-contact-email-label-modal")
    closeEditContactEmailLabelModalIcon.addEventListener("click", function() {
        editContactEmailLabelModal.style.display = "none";
    });

    const editContactEmailLabelButton = document.querySelector("#edit-contact-email-label-button");
    editContactEmailLabelButton.addEventListener("click", function() {
        updateContactEmailAddressLabel()
        // handleEditContactEmailLabelInput()
    });
    // const contactEmailAddress = await getAContactEmailAddresses(user_id, contact_id)
    // console.log(contactEmailAddress)

    const addContactEmailButton = document.querySelector("#create-contact-emailaddress");
    const addContactEmailModal = document.querySelector("#create-new-contact-email-modal");
    addContactEmailButton.addEventListener("click", function() {
        console.log("open create new email")

        addContactEmailModal.style.display = "block";
    });

    const closeAddContactEmailModalButton = document.querySelector("#close-create-new-contact-email-modal");
    closeAddContactEmailModalButton.addEventListener("click", function() {
        addContactEmailModal.style.display = "none";
    });

    const createNewContactEmailLabelSelect = document.querySelector("#create-new-contact-email-label-select");
     const emailLabelOpitonsData = [
        { text: "None", value: "None"},
        { text: "Home", value: "Home" },
        { text: "Work", value: "Work" },
        { text: "School", value: "School" },
        { text: "Other", value: "Other" }
      ];

    for (let i = 0; i < emailLabelOpitonsData.length; i++) {
        const option = document.createElement("option");
        // emailLabelOpitonsData[0].style.borderBottom = "1px solid gray"
        option.text = emailLabelOpitonsData[i].text;
        option.value = emailLabelOpitonsData[i].value;

        if (option.text === contactEmailAddresses.emailaddresslabel) {
            option.setAttribute("selected", true)
        }

        createNewContactEmailLabelSelect.appendChild(option);
    };

    const createNewContactEmailLabelInputElement = document.querySelector("#create-new-contact-email-label-input");
      createNewContactEmailLabelSelect.addEventListener('click', function(event) {
        const selectedOptionValue = event.target.value;
        const selectedOptionText = event.target.options[event.target.selectedIndex].text;
        createNewContactEmailLabelInputElement.value = selectedOptionText;
        // editContactGenderInputElement.style.display = "block"
        // selectGenderElement.style.display = "none"
      
        // Perform actions based on the selected option
        console.log('Selected option value:', selectedOptionValue);
        console.log('Selected option text:', selectedOptionText);
        const enterCustomGenderInputElement = document.querySelector("#enter-custom-gender")
      });

      const createNewContactEmailLabelSecondInputElement = document.querySelector("#create-new-contact-email-label-second-input");
      createNewContactEmailLabelInputElement.addEventListener("click", function() {
          createNewContactEmailLabelInputElement.style.display = "none";
          createNewContactEmailLabelSelect.style.display = "block";
          createNewContactEmailLabelSecondInputElement.value = ""
          createNewContactEmailLabelInputElement.setAttribute("autocomplete", "off")
          createNewContactEmailLabelSelect.setAttribute("autocomplete", "off")
      });

      createNewContactEmailLabelSecondInputElement.addEventListener("click", function() {
         createNewContactEmailLabelSelect.value = createNewContactEmailLabelSelect.options[0].text;
         createNewContactEmailLabelInputElement.style.display = "block";
         createNewContactEmailLabelInputElement.value = "";
         createNewContactEmailLabelSelect.style.display = "none";
      });

    const createContactEmailButton = document.querySelector("#create-contact-email-button");
    createContactEmailButton.addEventListener("click", function(event) {
        postAddNewContactEmailAddress()
    });

    const updateContactEmailButton = document.querySelector("#update-contact-emailaddress");
    updateContactEmailButton.addEventListener("click", function() {
        updateContactEmailAddress()
        // handleUpdateContactEmailInput()
    });

    const deleteContactEmailButton = document.querySelector("#remove-contact-emailaddress");
    deleteContactEmailButton.addEventListener("click", function() {
        deleteContactEmailAddress()
        // handleDeleteContactEmail()
    });

    const contactPhoneNumbers = await getAContactPhoneNumber(user_id, contact_id);
    console.log(contactPhoneNumbers)
    const editContactPhoneNumberSelectElement = document.querySelector("#select-edit-contact-phonenumber");
    let editContactPhoneNumberLabelOptionsData = []
    contactPhoneNumbers.forEach(contactPhoneNumberObj => {
        const emailLabelOptionsDataObj = {
            text: contactPhoneNumberObj.phonenumberlabel,
            value: contactPhoneNumberObj.phonenumberlabel,
            id: contactPhoneNumberObj.phonenumberid
        }
        editContactPhoneNumberLabelOptionsData.push(emailLabelOptionsDataObj)
    });
    console.log(editContactPhoneNumberLabelOptionsData)

    for (let i = 0; i < editContactPhoneNumberLabelOptionsData.length; i++) {
        const option = document.createElement("option");
        // editContactEmailLabelOptionsData[0].style.borderBottom = "1px solid gray"
        option.text = editContactPhoneNumberLabelOptionsData[i].text;
        option.value = editContactPhoneNumberLabelOptionsData[i].value;
        option.setAttribute("id", editContactPhoneNumberLabelOptionsData[i].id)

        if (option.text === contactPhoneNumbers.phonenumberlabel) {
            option.setAttribute("selected", true)
        };

        editContactPhoneNumberSelectElement.appendChild(option);
    };

    const editContactPhoneNumberLabelModal = document.querySelector("#edit-contact-phonenumber-label-modal");
    const editPhoneNumberLabelIcon = document.querySelector("#edit-phonenumber-label-icon");
    editPhoneNumberLabelIcon.addEventListener("click", function() {

        editContactPhoneNumberLabelModal.style.display = "block";
        // console.log("open edit email label modal")
        const selectEditContactPhoneNumberElement = document.querySelector("#select-edit-contact-phonenumber");
        const selectedEditContactPhoneNumberOptionIndex = selectEditContactPhoneNumberElement.selectedIndex;
        const selectedEditContactPhoneNumberOptionElement = selectEditContactPhoneNumberElement.options[selectedEditContactPhoneNumberOptionIndex];
        const selectedEditContactPhoneNumberOptionElementId = selectedEditContactPhoneNumberOptionElement.getAttribute("id");
        console.log(selectedEditContactPhoneNumberOptionElement)

        const editContactPhoneNumberLabelCurrentValueElement = document.querySelector("#edit-contact-phonenumber-label-current-value");
        editContactPhoneNumberLabelCurrentValueElement.value = selectEditContactPhoneNumberElement.value
    });

    const editContactPhoneNumberLabelSelectElement = document.querySelector("#edit-contact-phonenumber-label-select");
    const editPhoneNumberLabelOpitonsData = [
        { text: "None", value: "None"},
        { text: "Home", value: "Home" },
        { text: "Work", value: "Work" },
        { text: "School", value: "School" },
        { text: "Other", value: "Other" }
      ];

    for (let i = 0; i < editPhoneNumberLabelOpitonsData.length; i++) {
        const option = document.createElement("option");
        // editPhoneNumberLabelOpitonsData[0].style.borderBottom = "1px solid gray"
        option.text = editPhoneNumberLabelOpitonsData[i].text;
        option.value = editPhoneNumberLabelOpitonsData[i].value;

        if (option.text === contactPhoneNumbers.phonenumberlabel) {
            option.setAttribute("selected", true)
        }

        editContactPhoneNumberLabelSelectElement.appendChild(option);
    };

    const editContactPhoneNumberLabelInputElement = document.querySelector("#edit-contact-phonenumber-label-input");
      editContactPhoneNumberLabelSelectElement.addEventListener('click', function(event) {
        const selectedOptionValue = event.target.value;
        const selectedOptionText = event.target.options[event.target.selectedIndex].text;
        editContactPhoneNumberLabelInputElement.value = selectedOptionText;
        // editContactGenderInputElement.style.display = "block"
        // selectGenderElement.style.display = "none"
      
        // Perform actions based on the selected option
        console.log('Selected option value:', selectedOptionValue);
        console.log('Selected option text:', selectedOptionText);
        const enterCustomGenderInputElement = document.querySelector("#enter-custom-gender")
      });

      const editContactPhoneNumberLabelSecondInputElement = document.querySelector("#edit-contact-phonenumber-label-second-input");
      editContactPhoneNumberLabelInputElement.addEventListener("click", function() {
          editContactPhoneNumberLabelInputElement.style.display = "none";
          editContactPhoneNumberLabelSelectElement.style.display = "block";
          editContactPhoneNumberLabelSecondInputElement.value = ""
          editContactPhoneNumberLabelInputElement.setAttribute("autocomplete", "off")
          editContactPhoneNumberLabelSelectElement.setAttribute("autocomplete", "off")
      });

      editContactPhoneNumberLabelSecondInputElement.addEventListener("click", function() {
         editContactPhoneNumberLabelSelectElement.value = editContactPhoneNumberLabelSelectElement.options[0].text;
         editContactPhoneNumberLabelInputElement.style.display = "block";
         editContactPhoneNumberLabelInputElement.value = "";
         editContactPhoneNumberLabelSelectElement.style.display = "none";
      });

    const closeEditContactPhoneNumberLabelModalIcon = document.querySelector("#close-edit-contact-phonenumber-label-modal")
    closeEditContactPhoneNumberLabelModalIcon.addEventListener("click", function() {
        editContactPhoneNumberLabelModal.style.display = "none";
    });

    const editContactPhoneNumberLabelButton = document.querySelector("#edit-contact-phonenumber-label-button");
    editContactPhoneNumberLabelButton.addEventListener("click", function() {
        updateContactPhoneNumberLabel()
        // updateContactEmailAddressLabel()
        // handleEditContactEmailLabelInput()
    });
    // const contactEmailAddress = await getAContactEmailAddresses(user_id, contact_id)
    // console.log(contactEmailAddress)

    const addContactPhoneNumberButton = document.querySelector("#create-contact-phonenumber");
    const addContactPhoneNumberModal = document.querySelector("#create-new-contact-phonenumber-modal");
    addContactPhoneNumberButton.addEventListener("click", function() {
        console.log("open create new email")

        addContactPhoneNumberModal.style.display = "block";
    });

    const closeAddContactPhoneNumberModalButton = document.querySelector("#close-create-new-contact-phonenumber-modal");
    closeAddContactPhoneNumberModalButton.addEventListener("click", function() {
        addContactPhoneNumberModal.style.display = "none";
    });

    const createNewContactPhoneNumberLabelSelect = document.querySelector("#create-new-contact-phonenumber-label-select");
     const phoneNumberLabelOpitonsData = [
        { text: "None", value: "None"},
        { text: "Home", value: "Home" },
        { text: "Work", value: "Work" },
        { text: "School", value: "School" },
        { text: "Other", value: "Other" }
      ];

    for (let i = 0; i < phoneNumberLabelOpitonsData.length; i++) {
        const option = document.createElement("option");
        // phoneNumberLabelOpitonsData[0].style.borderBottom = "1px solid gray"
        option.text = phoneNumberLabelOpitonsData[i].text;
        option.value = phoneNumberLabelOpitonsData[i].value;

        if (option.text === contactEmailAddresses.emailaddresslabel) {
            option.setAttribute("selected", true)
        }

        createNewContactPhoneNumberLabelSelect.appendChild(option);
    };

    const createNewContactPhoneNumberLabelInputElement = document.querySelector("#create-new-contact-phonenumber-label-input");
      createNewContactPhoneNumberLabelSelect.addEventListener('click', function(event) {
        const selectedOptionValue = event.target.value;
        const selectedOptionText = event.target.options[event.target.selectedIndex].text;
        createNewContactPhoneNumberLabelInputElement.value = selectedOptionText;
        // editContactGenderInputElement.style.display = "block"
        // selectGenderElement.style.display = "none"
      
        // Perform actions based on the selected option
        console.log('Selected option value:', selectedOptionValue);
        console.log('Selected option text:', selectedOptionText);
        const enterCustomGenderInputElement = document.querySelector("#enter-custom-gender")
    });

     const createNewContactPhoneNumberLabelSecondInputElement = document.querySelector("#create-new-contact-phonenumber-label-second-input");
      createNewContactPhoneNumberLabelInputElement.addEventListener("click", function() {
          createNewContactPhoneNumberLabelInputElement.style.display = "none";
          createNewContactPhoneNumberLabelSelect.style.display = "block";
          createNewContactPhoneNumberLabelSecondInputElement.value = ""
          createNewContactPhoneNumberLabelInputElement.setAttribute("autocomplete", "off")
          createNewContactPhoneNumberLabelSelect.setAttribute("autocomplete", "off")
      });

      createNewContactPhoneNumberLabelSecondInputElement.addEventListener("click", function() {
        createNewContactPhoneNumberLabelSelect.value = createNewContactPhoneNumberLabelSelect.options[0].text;
         createNewContactPhoneNumberLabelInputElement.style.display = "block";
         createNewContactPhoneNumberLabelInputElement.value = "";
         createNewContactPhoneNumberLabelSelect.style.display = "none";
      });

    const createContactPhoneNumberButton = document.querySelector("#create-contact-phonenumber-button");
    createContactPhoneNumberButton.addEventListener("click", function(event) {
        postAddNewContactPhoneNumber()
        // handleAddNewContactPhoneNumberInput()
    });

    const updateContactPhoneNumberButton = document.querySelector("#update-contact-phonenumber");
    updateContactPhoneNumberButton.addEventListener("click", function() {
        updateContactPhoneNumber()
    });

    const deleteContactPhoneNumberButton = document.querySelector("#remove-contact-phonenumber");
    deleteContactPhoneNumberButton.addEventListener("click", function() {
        deleteContactPhoneNumber()
        // handleDeleteContactEmail()
    });

    const contactAddresses = await getAContactAddress(user_id, contact_id);
    console.log(contactAddresses)
    const editContactAddressSelectElement = document.querySelector("#select-edit-contact-address");
    let editContactAddressesLabelOptionsData = []
    contactAddresses.forEach(contactAddressObj => {
        const addressLabelOptionsDataObj = {
            text: contactAddressObj.addresslabel,
            value: contactAddressObj.addresslabel,
            id: contactAddressObj.addressid
        }
        editContactAddressesLabelOptionsData.push(addressLabelOptionsDataObj)
    });
    console.log(editContactAddressesLabelOptionsData)

    for (let i = 0; i < editContactAddressesLabelOptionsData.length; i++) {
        const option = document.createElement("option");
        // editContactEmailLabelOptionsData[0].style.borderBottom = "1px solid gray"
        option.text = editContactAddressesLabelOptionsData[i].text;
        option.value = editContactAddressesLabelOptionsData[i].value;
        option.setAttribute("id", editContactAddressesLabelOptionsData[i].id)

        if (option.text === contactAddresses.addresslabel) {
            option.setAttribute("selected", true)
        };

        editContactAddressSelectElement.appendChild(option);
    }

    const editContactAddressLabelModal = document.querySelector("#edit-contact-address-label-modal");
    const editAddressLabelIcon = document.querySelector("#edit-address-label-icon");
    editAddressLabelIcon.addEventListener("click", function() {

        editContactAddressLabelModal.style.display = "block";
        // console.log("open edit email label modal")
        const selectEditContactAddressElement = document.querySelector("#select-edit-contact-address");
        const selectedEditContactAddressOptionIndex = selectEditContactAddressElement.selectedIndex;
        const selectedEditContactAddressOptionElement = selectEditContactAddressElement.options[selectedEditContactAddressOptionIndex];
        const selectedEditContactAddressOptionElementId = selectedEditContactAddressOptionElement.getAttribute("id");
        console.log(selectedEditContactAddressOptionElement)

        const editContactAddressLabelCurrentValueElement = document.querySelector("#edit-contact-address-label-current-value");
        editContactAddressLabelCurrentValueElement.value = selectEditContactAddressElement.value
    });

    const editContactAddressLabelSelectElement = document.querySelector("#edit-contact-address-label-select");
    const editAddressLabelOpitonsData = [
        { text: "None", value: "None"},
        { text: "Home", value: "Home" },
        { text: "Work", value: "Work" },
        { text: "School", value: "School" },
        { text: "Other", value: "Other" }
      ];

    for (let i = 0; i < editAddressLabelOpitonsData.length; i++) {
        const option = document.createElement("option");
        // editAddressLabelOpitonsData[0].style.borderBottom = "1px solid gray"
        option.text = editAddressLabelOpitonsData[i].text;
        option.value = editAddressLabelOpitonsData[i].value;

        if (option.text === contactAddresses.addresslabel) {
            option.setAttribute("selected", true)
        }

        editContactAddressLabelSelectElement.appendChild(option);
    };

      const editContactAddressLabelInputElement = document.querySelector("#edit-contact-address-label-input");
      editContactAddressLabelSelectElement.addEventListener('click', function(event) {
        const selectedOptionValue = event.target.value;
        const selectedOptionText = event.target.options[event.target.selectedIndex].text;
        editContactAddressLabelInputElement.value = selectedOptionText;
        // editContactGenderInputElement.style.display = "block"
        // selectGenderElement.style.display = "none"
      
        // Perform actions based on the selected option
        console.log('Selected option value:', selectedOptionValue);
        console.log('Selected option text:', selectedOptionText);
        const enterCustomGenderInputElement = document.querySelector("#enter-custom-gender")
      });

      const editContactAddressLabelSecondInputElement = document.querySelector("#edit-contact-address-label-second-input");
      editContactAddressLabelInputElement.addEventListener("click", function() {
          editContactAddressLabelInputElement.style.display = "none";
          editContactAddressLabelSelectElement.style.display = "block";
          editContactAddressLabelSecondInputElement.value = ""
          editContactAddressLabelInputElement.setAttribute("autocomplete", "off")
          editContactAddressLabelSelectElement.setAttribute("autocomplete", "off")
      });

      editContactAddressLabelSecondInputElement.addEventListener("click", function() {
         editContactAddressLabelSelectElement.value = editContactAddressLabelSelectElement.options[0].text;
         editContactAddressLabelInputElement.style.display = "block";
         editContactAddressLabelInputElement.value = "";
         editContactAddressLabelSelectElement.style.display = "none";
      });

    // const createContactEmailButton = document.querySelector("#create-contact-email-button");
    // createContactEmailButton.addEventListener("click", function(event) {
    //     postAddNewContactEmailAddress()
    // });

    // const updateContactEmailButton = document.querySelector("#update-contact-emailaddress");
    // updateContactEmailButton.addEventListener("click", function() {
    //     updateContactEmailAddress()
    //     // handleUpdateContactEmailInput()
    // });

    // const deleteContactEmailButton = document.querySelector("#remove-contact-emailaddress");
    // deleteContactEmailButton.addEventListener("click", function() {
    //     deleteContactEmailAddress()
    //     // handleDeleteContactEmail()
    // });

    const closeEditContactAddressLabelModalIcon = document.querySelector("#close-edit-contact-address-label-modal")
    closeEditContactAddressLabelModalIcon.addEventListener("click", function() {
        editContactAddressLabelModal.style.display = "none";
    });

    const editContactAddressLabelButton = document.querySelector("#edit-contact-address-label-button");
    editContactAddressLabelButton.addEventListener("click", function() {
        updateContactAddressLabel()
        // updateContactEmailAddressLabel()
        // handleEditContactEmailLabelInput()
    });
    // const contactEmailAddress = await getAContactEmailAddresses(user_id, contact_id)
    // console.log(contactEmailAddress)

    const addContactAddressButton = document.querySelector("#create-contact-address");
    const addContactAddressModal = document.querySelector("#create-new-contact-address-modal");
    addContactAddressButton.addEventListener("click", function() {
        console.log("open create new address")

        addContactAddressModal.style.display = "block";
    });

    const closeAddContactAddressModalButton = document.querySelector("#close-create-new-contact-address-modal");
    closeAddContactAddressModalButton.addEventListener("click", function() {
        addContactAddressModal.style.display = "none";
    });

    const createNewContactAddressLabelSelect = document.querySelector("#create-new-contact-address-label-select");
     const addressLabelOpitonsData = [
        { text: "None", value: "None"},
        { text: "Home", value: "Home" },
        { text: "Work", value: "Work" },
        { text: "School", value: "School" },
        { text: "Other", value: "Other" }
      ];

    for (let i = 0; i < addressLabelOpitonsData.length; i++) {
        const option = document.createElement("option");
        // addressLabelOpitonsData[0].style.borderBottom = "1px solid gray"
        option.text = addressLabelOpitonsData[i].text;
        option.value = addressLabelOpitonsData[i].value;

        if (option.text === contactAddresses.addresslabel) {
            option.setAttribute("selected", true)
        }

        createNewContactAddressLabelSelect.appendChild(option);
    };

    const createNewContactAddressLabelInputElement = document.querySelector("#create-new-contact-address-label-input");
      createNewContactAddressLabelSelect.addEventListener('click', function(event) {
        const selectedOptionValue = event.target.value;
        const selectedOptionText = event.target.options[event.target.selectedIndex].text;
        createNewContactAddressLabelInputElement.value = selectedOptionText;
        // editContactGenderInputElement.style.display = "block"
        // selectGenderElement.style.display = "none"
      
        // Perform actions based on the selected option
        console.log('Selected option value:', selectedOptionValue);
        console.log('Selected option text:', selectedOptionText);
        const enterCustomGenderInputElement = document.querySelector("#enter-custom-gender")
    });

    const createNewContactAddressLabelSecondInputElement = document.querySelector("#create-new-contact-address-label-second-input");
    createNewContactAddressLabelInputElement.addEventListener("click", function() {
        createNewContactAddressLabelInputElement.style.display = "none";
        createNewContactAddressLabelSelect.style.display = "block";
        createNewContactAddressLabelSecondInputElement.value = ""
        createNewContactAddressLabelInputElement.setAttribute("autocomplete", "off")
        createNewContactAddressLabelSelect.setAttribute("autocomplete", "off")
    });

    createNewContactAddressLabelSecondInputElement.addEventListener("click", function() {
    createNewContactAddressLabelSelect.value = createNewContactAddressLabelSelect.options[0].text;
        createNewContactAddressLabelInputElement.style.display = "block";
        createNewContactAddressLabelInputElement.value = "";
        createNewContactAddressLabelSelect.style.display = "none";
    });

    const createContactAddressButton = document.querySelector("#create-contact-address-button");
    createContactAddressButton.addEventListener("click", function(event) {
        postAddNewContactAddress()
        // handleAddNewContactAddressInput()
    });

    const updateContactAddressButton = document.querySelector("#update-contact-address");
    updateContactAddressButton.addEventListener("click", function() {
        updateContactAddress()
        // handleUpdateContactAddressInput
    });

    const deleteContactAddressButton = document.querySelector("#remove-contact-address");
    deleteContactAddressButton.addEventListener("click", function() {
        deleteContactAddress()
        // handleDeleteContactAddress()
    });

    const updateContactOrganizationButton = document.querySelector("#update-contact-organization-button");
    updateContactOrganizationButton.addEventListener("click", function() {
        updateContactOrganization();
    });

    const updateContactOrganizationRoleButton = document.querySelector("#update-contact-organization-role-button");
    updateContactOrganizationRoleButton.addEventListener("click", function() {
        updateContactOrganizationRole()
    });

    const updateContactNotesButton = document.querySelector("#update-contact-notes-button");
    updateContactNotesButton.addEventListener("click", function() {
        updateContactNotes()
    });

    ////

    const contactWebsites = await getAContactWebsite(user_id, contact_id);
    console.log(contactWebsites)
    const editContactWebsiteSelectElement = document.querySelector("#select-edit-contact-website");
    let editContactWebsitesLabelOptionsData = []
    contactWebsites.forEach(contactWebsiteObj => {
        const websiteLabelOptionsDataObj = {
            text: contactWebsiteObj.websitelabel,
            value: contactWebsiteObj.websitelabel,
            id: contactWebsiteObj.websiteid
        }
        editContactWebsitesLabelOptionsData.push(websiteLabelOptionsDataObj)
    });
    console.log(editContactWebsitesLabelOptionsData)

    for (let i = 0; i < editContactWebsitesLabelOptionsData.length; i++) {
        const option = document.createElement("option");
        // editContactEmailLabelOptionsData[0].style.borderBottom = "1px solid gray"
        option.text = editContactWebsitesLabelOptionsData[i].text;
        option.value = editContactWebsitesLabelOptionsData[i].value;
        option.setAttribute("id", editContactWebsitesLabelOptionsData[i].id)

        if (option.getAttribute("id") === 1) {
            option.setAttribute("selected", true)
        };

        editContactWebsiteSelectElement.appendChild(option);
    };

    const editContactWebsiteLabelModal = document.querySelector("#edit-contact-website-label-modal");
    const editWebsiteLabelIcon = document.querySelector("#edit-website-label-icon");
    editWebsiteLabelIcon.addEventListener("click", function() {

        editContactWebsiteLabelModal.style.display = "block";
        // console.log("open edit email label modal")
        const selectEditContactWebsiteElement = document.querySelector("#select-edit-contact-website");
        const selectedEditContactWebsiteOptionIndex = selectEditContactWebsiteElement.selectedIndex;
        const selectedEditContactWebsiteOptionElement = selectEditContactWebsiteElement.options[selectedEditContactWebsiteOptionIndex];
        const selectedEditContactWebsiteOptionElementId = selectedEditContactWebsiteOptionElement.getAttribute("id");
        console.log(selectedEditContactWebsiteOptionElement)

        const editContactWebsiteLabelCurrentValueElement = document.querySelector("#edit-contact-website-label-current-value");
        editContactWebsiteLabelCurrentValueElement.value = selectEditContactWebsiteElement.value
    });

    const editContactWebsiteLabelSelectElement = document.querySelector("#edit-contact-website-label-select");
    const editWebsiteLabelOpitonsData = [
        { text: "None", value: "None"},
        { text: "Home", value: "Home" },
        { text: "Work", value: "Work" },
        { text: "School", value: "School" },
        { text: "Other", value: "Other" }
      ];

    for (let i = 0; i < editWebsiteLabelOpitonsData.length; i++) {
        const option = document.createElement("option");
        // editWebsiteLabelOpitonsData[0].style.borderBottom = "1px solid gray"
        option.text = editWebsiteLabelOpitonsData[i].text;
        option.value = editWebsiteLabelOpitonsData[i].value;

        if (option.text === contactWebsites.websitelabel) {
            option.setAttribute("selected", true)
        }

        editContactWebsiteLabelSelectElement.appendChild(option);
    };

      const editContactWebsiteLabelInputElement = document.querySelector("#edit-contact-website-label-input");
      editContactWebsiteLabelSelectElement.addEventListener('click', function(event) {
        const selectedOptionValue = event.target.value;
        const selectedOptionText = event.target.options[event.target.selectedIndex].text;
        editContactWebsiteLabelInputElement.value = selectedOptionText;
        // editContactGenderInputElement.style.display = "block"
        // selectGenderElement.style.display = "none"
      
        // Perform actions based on the selected option
        console.log('Selected option value:', selectedOptionValue);
        console.log('Selected option text:', selectedOptionText);
        const enterCustomGenderInputElement = document.querySelector("#enter-custom-gender")
      });

      const editContactWebsiteLabelSecondInputElement = document.querySelector("#edit-contact-website-label-second-input");
      editContactWebsiteLabelInputElement.addEventListener("click", function() {
          editContactWebsiteLabelInputElement.style.display = "none";
          editContactWebsiteLabelSelectElement.style.display = "block";
          editContactWebsiteLabelSecondInputElement.value = ""
          editContactWebsiteLabelInputElement.setAttribute("autocomplete", "off")
          editContactWebsiteLabelSelectElement.setAttribute("autocomplete", "off")
      });

      editContactWebsiteLabelSecondInputElement.addEventListener("click", function() {
         editContactWebsiteLabelSelectElement.value = editContactWebsiteLabelSelectElement.options[0].text;
         editContactWebsiteLabelInputElement.style.display = "block";
         editContactWebsiteLabelInputElement.value = "";
         editContactWebsiteLabelSelectElement.style.display = "none";
      });

    // const createContactEmailButton = document.querySelector("#create-contact-email-button");
    // createContactEmailButton.addEventListener("click", function(event) {
    //     postAddNewContactEmailAddress()
    // });

    // const updateContactEmailButton = document.querySelector("#update-contact-emailaddress");
    // updateContactEmailButton.addEventListener("click", function() {
    //     updateContactEmailAddress()
    //     // handleUpdateContactEmailInput()
    // });

    // const deleteContactEmailButton = document.querySelector("#remove-contact-emailaddress");
    // deleteContactEmailButton.addEventListener("click", function() {
    //     deleteContactEmailAddress()
    //     // handleDeleteContactEmail()
    // });

    const closeEditContactWebsiteLabelModalIcon = document.querySelector("#close-edit-contact-website-label-modal")
    closeEditContactWebsiteLabelModalIcon.addEventListener("click", function() {
        editContactWebsiteLabelModal.style.display = "none";
    });

    const editContactWebsiteLabelButton = document.querySelector("#edit-contact-website-label-button");
    editContactWebsiteLabelButton.addEventListener("click", function() {
        updateContactWebsiteLabel()
        // updateContactEmailAddressLabel()
        // handleEditContactEmailLabelInput()
    });
    // const contactEmailAddress = await getAContactEmailAddresses(user_id, contact_id)
    // console.log(contactEmailAddress)


    const addContactWebsiteButton = document.querySelector("#create-contact-website");
    const addContactWebsiteModal = document.querySelector("#create-new-contact-website-modal");
    addContactWebsiteButton.addEventListener("click", function() {
        console.log("open create new website")

        addContactWebsiteModal.style.display = "block";
    });

    const closeAddContactWebsiteModalButton = document.querySelector("#close-create-new-contact-website-modal");
    closeAddContactWebsiteModalButton.addEventListener("click", function() {
        addContactWebsiteModal.style.display = "none";
    });

    const createNewContactWebsiteLabelSelect = document.querySelector("#create-new-contact-website-label-select");
     const websiteLabelOpitonsData = [
        { text: "None", value: "None"},
        { text: "Facebook", value: "Facebook" },
        { text: "Instagram", value: "Instagram" },
        { text: "X", value: "X" },
        { text: "Business", value: "Business" },
        { text: "Personal", value: "Personal" }
      ];

    for (let i = 0; i < websiteLabelOpitonsData.length; i++) {
        const option = document.createElement("option");
        // websiteLabelOpitonsData[0].style.borderBottom = "1px solid gray"
        option.text = websiteLabelOpitonsData[i].text;
        option.value = websiteLabelOpitonsData[i].value;

        if (option.text === contactWebsites.websitelabel) {
            option.setAttribute("selected", true)
        }

        createNewContactWebsiteLabelSelect.appendChild(option);
    };

    const createNewContactWebsiteLabelInputElement = document.querySelector("#create-new-contact-website-label-input");
      createNewContactWebsiteLabelSelect.addEventListener('click', function(event) {
        const selectedOptionValue = event.target.value;
        const selectedOptionText = event.target.options[event.target.selectedIndex].text;
        createNewContactWebsiteLabelInputElement.value = selectedOptionText;
        // editContactGenderInputElement.style.display = "block"
        // selectGenderElement.style.display = "none"
      
        // Perform actions based on the selected option
        console.log('Selected option value:', selectedOptionValue);
        console.log('Selected option text:', selectedOptionText);
        const enterCustomGenderInputElement = document.querySelector("#enter-custom-gender")
    });

    const createNewContactWebsiteLabelSecondInputElement = document.querySelector("#create-new-contact-website-label-second-input");
    createNewContactWebsiteLabelInputElement.addEventListener("click", function() {
        createNewContactWebsiteLabelInputElement.style.display = "none";
        createNewContactWebsiteLabelSelect.style.display = "block";
        createNewContactWebsiteLabelSecondInputElement.value = ""
        createNewContactWebsiteLabelInputElement.setAttribute("autocomplete", "off")
        createNewContactWebsiteLabelSelect.setAttribute("autocomplete", "off")
    });

    createNewContactWebsiteLabelSecondInputElement.addEventListener("click", function() {
    createNewContactWebsiteLabelSelect.value = createNewContactWebsiteLabelSelect.options[0].text;
        createNewContactWebsiteLabelInputElement.style.display = "block";
        createNewContactWebsiteLabelInputElement.value = "";
        createNewContactWebsiteLabelSelect.style.display = "none";
    });

    const createContactWebsiteButton = document.querySelector("#create-contact-website-button");
    createContactWebsiteButton.addEventListener("click", function(event) {
        postAddNewContactWebsite()
        // handleAddNewContactWebsiteInput()
    });

    const updateContactWebsiteButton = document.querySelector("#update-contact-website");
    updateContactWebsiteButton.addEventListener("click", function() {
        updateContactWebsite()
        // handleUpdateContactWebsiteInput
    });

    const deleteContactWebsiteButton = document.querySelector("#remove-contact-website");
    deleteContactWebsiteButton.addEventListener("click", function() {
        deleteContactWebsite()
        // handleDeleteContactAddress()
    });

    ///
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
    // editContactEmailAddressElement.value = contact.emailaddress;
    editContactPhoneNumberElement.value = contact.phonenumber;
    editContactAddressElement.value = contact.address;
    editContactOrganizationElement.value = contact.organization;
    editContactRoleElement.value = contact.organization_role;
    editContactSocialMediaElement.value = contact.website;
    editContactNotesElement.value = contact.notes;
    editContactNotesElement.style.fontFamily = "sans-serif";

    const editContactEmailSelect = document.querySelector("#select-edit-contact-email");
    const editContactEmailLabelSelectedIndex = editContactEmailSelect.selectedIndex;
    if (editContactEmailLabelSelectedIndex !== -1) {
    let selectedEditContactEmailLabel = editContactEmailSelect.options[editContactEmailLabelSelectedIndex].text
    console.log(editContactEmailSelect.options[editContactEmailLabelSelectedIndex].text)
    const firstSelectedIndexId = Number(editContactEmailSelect.options[editContactEmailLabelSelectedIndex].getAttribute("id"))
    const firstSelectedIndex = editContactEmailSelect.options[editContactEmailLabelSelectedIndex].text
    // const firstSelectedIndexId = editContactEmailSelect.options[editContactEmailLabelSelectedIndex].getAttribute("id")
    // console.log(firstSelectedIndexId)
    contactEmailAddresses.forEach(contactEmailAddressObj => {
            if (firstSelectedIndexId === contactEmailAddressObj.emailid && firstSelectedIndex === contactEmailAddressObj.emailaddresslabel) {
                editContactEmailAddressElement.value = contactEmailAddressObj.emailaddress;
            }
        })
    } else {
        const option = document.createElement("option");
        option.text = "None available"
        option.value = "None available"
        editContactEmailSelect.appendChild(option)
    }
    editContactEmailSelect.addEventListener("change", function() {
        const selectedId = Number(this.options[this.selectedIndex].getAttribute("id"));
        const selectedText = this.options[this.selectedIndex].text;
        // console.log(selectedId)
        console.log('Selected text:', selectedText);
        // if (editContactEmailLabelSelectedIndex !== -1) {
        //     console.log(editContactEmailLabelSelectedIndex)
        // }
        contactEmailAddresses.forEach(contactEmailAddressObj => {
            // console.log(contactEmailAddressObj.emailid)
            if (selectedId === contactEmailAddressObj.emailid && selectedText === contactEmailAddressObj.emailaddresslabel) {
                editContactEmailAddressElement.value = contactEmailAddressObj.emailaddress
            }
        });
    });
    
    const editContactPhoneNumberSelect = document.querySelector("#select-edit-contact-phonenumber");
    const editContactPhoneNumberLabelSelectedIndex = editContactPhoneNumberSelect.selectedIndex;
    console.log(editContactPhoneNumberLabelSelectedIndex)
    if (editContactPhoneNumberLabelSelectedIndex !== -1) {
    let selectedEditContactPhoneNumberLabel = editContactPhoneNumberSelect.options[editContactPhoneNumberLabelSelectedIndex].text
    console.log(editContactPhoneNumberSelect.options[editContactPhoneNumberLabelSelectedIndex].text)
    const firstSelectedIndexId = Number(editContactPhoneNumberSelect.options[editContactPhoneNumberLabelSelectedIndex].getAttribute("id"))
    const firstSelectedPhoneNumberIndex = editContactPhoneNumberSelect.options[editContactPhoneNumberLabelSelectedIndex].text
    contactPhoneNumbers.forEach(contactPhoneNumberAddressObj => {
            if (firstSelectedIndexId === contactPhoneNumberAddressObj.phonenumberid && firstSelectedPhoneNumberIndex === contactPhoneNumberAddressObj.phonenumberlabel) {
                editContactPhoneNumberElement.value = contactPhoneNumberAddressObj.phonenumber;
            }
        })
    } else {
        const option = document.createElement("option");
        option.text = "None available"
        option.value = "None available"
        editContactPhoneNumberSelect.appendChild(option)
    }
    editContactPhoneNumberSelect.addEventListener("change", function() {
        const selectedId = Number(this.options[this.selectedIndex].getAttribute("id"));
        const selectedText = this.options[this.selectedIndex].text;
        // console.log('Selected text:', selectedText);
        contactPhoneNumbers.forEach(contactPhoneNumberObj => {
            if (selectedId === contactPhoneNumberObj.phonenumberid && selectedText === contactPhoneNumberObj.phonenumberlabel) {
                editContactPhoneNumberElement.value = contactPhoneNumberObj.phonenumber
                formatPhoneNumberForData(editContactPhoneNumberElement)
            };
        });     
    });

    const editContactAddressSelect = document.querySelector("#select-edit-contact-address");
    const editContactAddressLabelSelectedIndex = editContactAddressSelect.selectedIndex;
    if (editContactAddressLabelSelectedIndex !== -1) {
    let selectedEditContactAddressLabel = editContactAddressSelect.options[editContactAddressLabelSelectedIndex].text
    console.log(editContactAddressSelect.options[editContactAddressLabelSelectedIndex].text);
    const firstSelectedIndexId = Number(editContactAddressSelect.options[editContactAddressLabelSelectedIndex].getAttribute("id"))
    const firstSelectedIndex = editContactAddressSelect.options[editContactAddressLabelSelectedIndex].text
    contactAddresses.forEach(contactAddressObj => {
            if (firstSelectedIndexId === contactAddressObj.addressid && firstSelectedIndex === contactAddressObj.addresslabel) {
                editContactAddressElement.value = contactAddressObj.address;
            };
        });
    } else {
        const option = document.createElement("option");
        option.text = "None available"
        option.value = "None available"
        editContactAddressSelect.appendChild(option)
    };
    editContactAddressSelect.addEventListener("change", function() {
        const selectedId = Number(this.options[this.selectedIndex].getAttribute("id"));
        const selectedText = this.options[this.selectedIndex].text;
        console.log('Selected text:', selectedText);
        // if (editContactEmailLabelSelectedIndex !== -1) {
        //     console.log(editContactEmailLabelSelectedIndex)
        // }
        contactAddresses.forEach(contactAddressObj => {
            if (selectedId === contactAddressObj.addressid && selectedText === contactAddressObj.addresslabel) {
                editContactAddressElement.value = contactAddressObj.address
            }
        });
    });

    const editContactWebsiteSelect = document.querySelector("#select-edit-contact-website");
    const editContactWebsiteLabelSelectedIndex = editContactWebsiteSelect.selectedIndex;
    if (editContactWebsiteLabelSelectedIndex !== -1) {
    let selectedEditContactWebsiteLabel = editContactWebsiteSelect.options[editContactWebsiteLabelSelectedIndex].text
    console.log(editContactWebsiteSelect.options[editContactWebsiteLabelSelectedIndex].text)
    const firstSelectedIndexId = Number(editContactWebsiteSelect.options[editContactWebsiteLabelSelectedIndex].getAttribute("id"))
    const firstSelectedIndex = editContactWebsiteSelect.options[editContactWebsiteLabelSelectedIndex].text
    contactWebsites.forEach(contactWebsiteObj => {
        // console.log(contactWebsiteObj.websiteid)
            if (firstSelectedIndexId === contactWebsiteObj.websiteid && firstSelectedIndex === contactWebsiteObj.websitelabel) {
                editContactSocialMediaElement.value = contactWebsiteObj.website;
            }
        })
    } else {
        const option = document.createElement("option");
        option.text = "None available"
        option.value = "None available"
        editContactWebsiteSelect.appendChild(option)
    }
    editContactWebsiteSelect.addEventListener("change", function() {
        const selectedId = Number(this.options[this.selectedIndex].getAttribute("id"));
        const selectedText = this.options[this.selectedIndex].text;
        console.log('Selected text:', selectedText);
        console.log(selectedId)
        // if (editContactEmailLabelSelectedIndex !== -1) {
        //     console.log(editContactEmailLabelSelectedIndex)
        // }
        contactWebsites.forEach(contactWebsiteObj => {
            if (selectedId === contactWebsiteObj.websiteid && selectedText === contactWebsiteObj.websitelabel) {
                editContactSocialMediaElement.value = contactWebsiteObj.website
            }
        });
    });

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

    // const editContactButton = document.querySelector("#edit-contact-button");
    // editContactButton.addEventListener("click", updateContact, false);

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

    const deleteContactButton = document.querySelector("#delete-contact-button");
    deleteContactButton.addEventListener("click", function() {
        deleteContactEmailAddresses();
        deleteContactPhoneNumbers();
        deleteContactAddresses();
        deleteContactWebsites();
        deleteContactImages();
        deleteContact()
        removeContactDeleteContactGroupings(removeContactGroupingsArr)
    }, false);
};

async function handleEditContactImage() {
    // let imageFile;
    // let image;

    const editContactImageElement = document.querySelector("#edit-contact-image");
    let editContactImageFile;
    let editContactImage;
    const editContactAddPhotoInputElement = document.querySelector("#edit-contact-add-photo")

        editContactImageFile = editContactAddPhotoInputElement.files[0];
        let reader = new FileReader()

        console.log(editContactImageFile)

        reader.onload = function () {
            base64string = reader.result.split(',')[1]
            editContactImage = reader.result;
            editContactImageElement.setAttribute("src", reader.result);
            if (editContactAddPhotoInputElement.files[0] !== undefined) {
                editContactImageElement.setAttribute("name", editContactAddPhotoInputElement.files[0].name)
            };
            editContactImageElement.style.borderRadius = "50%"
        };

        // if (newContactImageFile !== undefined) {
            reader.readAsDataURL(editContactImageFile)
        // } else {
        //     newContactImageElement.setAttribute("src", './images/user-2-svgrepo-com.svg')
        // }

    // const editUserAddPhotoFormElement = document.querySelector("#edit-user-add-photo-form");
    // const editUserAddPhotoInputElement = document.querySelector("#edit-user-add-photo");
    // console.log(editUserAddPhotoFormElement)
    // let imageFile = newContactAddPhotoInputElement.files[0];

    editContactAddPhotoInputElement.value = "";
}

async function handleEditContactUploadImageInput() {

    async function createImageFile() {
    const editContactImageElement = document.querySelector("#edit-contact-image")
    const editContactImageUrl = editContactImageElement.getAttribute("src")
    let editContactImageFile;
        return fetch(editContactImageUrl)
            .then(response => response.blob()) // Get the image as a Blob
            .then(async (blob) => {
            // Now 'blob' contains the image data as a Blob object
            // You can then create a File object from the blob if necessary:
            const filename = editContactImageUrl.substring(editContactImageUrl.lastIndexOf('/') + 1); // Extract filename from URL
            editContactImageFile = new File([blob], filename, { type: blob.type });

            console.log(editContactImageFile); // This is your image file object

            return editContactImageFile
        })
    }

    async function base64ToFile(base64DataUrl, filename) {
  // 1. Fetch the data URL and convert to a Blob
  const response = await fetch(base64DataUrl);
  const blob = await response.blob();

  // 2. Create a File object from the Blob
  // The 'type' is automatically inferred by the browser from the data URL's MIME type
  const file = new File([blob], filename, { type: blob.type });

  return file;
}

let imageFile;


    if (imageFile === undefined) {
       imageFile = await createImageFile()
    } else {
       imageFile = await base64ToFile(editContactImageElement.getAttribute("src"), editContactImageElement.getAttribute("name"))
    }
        
    // newContactAddPhotoInputElement.value = ""

    return imageFile
};

// async function handleEditContactUploadImageInput() {
//     // let imageFile;
//     // let image;
//     // const newUserImageElement = document.querySelector("#edit-user-image");

//     const editContactImageElement = document.querySelector("#edit-contact-image");
//     let editContactImageFile;
//     let editContactImage;
//     const editContactAddPhotoInputElement = document.querySelector("#edit-contact-add-photo")

//         editContactImageFile = editContactAddPhotoInputElement.files[0];
//         let reader = new FileReader()

//         console.log(editContactImageFile)

//         reader.onload = function () {
//             base64string = reader.result.split(',')[1]
//             editContactImage = reader.result;
//             editContactImageElement.setAttribute("src", reader.result);
//             editContactImageElement.style.borderRadius = "50%"
//         };

//         if (editContactImageFile !== undefined) {
//             reader.readAsDataURL(editContactImageFile)
//         } else {
//             editContactImageElement.setAttribute("src", './images/user-2-svgrepo-com.svg')
//         }

//     // const editUserAddPhotoFormElement = document.querySelector("#edit-user-add-photo-form");
//     // const editUserAddPhotoInputElement = document.querySelector("#edit-user-add-photo");
//     // console.log(editUserAddPhotoFormElement)
//     let imageFile = editContactAddPhotoInputElement.files[0];

//     async function createIconImageFile() {
//     const editContactImageElement = document.querySelector("#edit-contact-image")
//     const editContactImageUrl = editContactImageElement.getAttribute("src")
//     let editContactImageFile;
//         return fetch(editContactImageUrl)
//             .then(response => response.blob()) // Get the image as a Blob
//             .then(async (blob) => {
//             // Now 'blob' contains the image data as a Blob object
//             // You can then create a File object from the blob if necessary:
//             const filename = editContactImageUrl.substring(editContactImageUrl.lastIndexOf('/') + 1); // Extract filename from URL
//             editContactImageFile = new File([blob], filename, { type: blob.type });

//             console.log(editContactImageFile); // This is your image file object

//             return editContactImageFile
//         })
//     }

//     if (imageFile === undefined) {
//         imageFile = await createIconImageFile()
//     }
        
//     console.log(imageFile)

//     // editUserAddPhotoInputElement.value = ""

//     return imageFile
// };

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
};

async function handleEditContactEmailLabelInput() {
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
    const contact_id = Number(urlBeforeQuery.split('contact_')[1])
    const contact = await getUserContact(user_id, contact_id);

    const contactEmailAddresses = await getAContactEmailAddresses(user_id, contact_id);

    const selectEditContactEmailElement = document.querySelector("#select-edit-contact-email");
    const selectedEditContactEmailOptionIndex = selectEditContactEmailElement.selectedIndex;
    const selectedEditContactEmailOptionElement = selectEditContactEmailElement.options[selectedEditContactEmailOptionIndex];
    const selectedEditContactEmailOptionElementId = selectedEditContactEmailOptionElement.getAttribute("id");
    console.log(selectedEditContactEmailOptionElement)

    const editContactEmailLabelCurrentValueElement = document.querySelector("#edit-contact-email-label-current-value");
    editContactEmailLabelCurrentValueElement.value = selectEditContactEmailElement.value

    const editContactEmailLabelSelect = document.querySelector("#edit-contact-email-label-select");
    const editContactEmailLabelSelectInputSelectedIndex = editContactEmailLabelSelect.selectedIndex;
    const editContactEmailLabelInputElement = document.querySelector("#edit-contact-email-label-input");
    const editContactEmailLabelSecondInputElement = document.querySelector("#edit-contact-email-label-second-input");
    let emailAddressLabel = '';
    // const createNewContactEmailInputElement = document.querySelector("#create-new-contact-email-input")
    // const emailAddress = createNewContactEmailInputElement.value;

    if (editContactEmailLabelSelectInputSelectedIndex !== -1 && editContactEmailLabelSelect.style.display !== "none") {
        emailAddressLabel = editContactEmailLabelSelect.options[editContactEmailLabelSelectInputSelectedIndex].text;
    } else {
        emailAddressLabel = editContactEmailLabelSecondInputElement.value;
    };

    // console.log(selectedEditContactEmailOptionElementId)

    let emailaddress;

    for (let i = 0; i < contactEmailAddresses.length; i++) {
        // console.log(contactEmailAddresses[i].emailid.toString())
        // console.log(selectedEditContactEmailOptionElementId)
        if (contactEmailAddresses[i].emailid.toString() === selectedEditContactEmailOptionElementId) {
            emailaddress = contactEmailAddresses[i].emailaddress;
        }
    }

    let newContactEmailLabelObj = {
        userId: user_id,
        contactId: contact_id,
        emailId: selectedEditContactEmailOptionElementId,
        emailaddresslabel: emailAddressLabel,
        emailaddress: emailaddress
    };

    if (newContactEmailLabelObj.emailaddresslabel === '') {
        alert("Please enter a label before updating.");
        return;
    };

    return newContactEmailLabelObj;
}

async function handleAddNewContactEmailInput(event) {
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
    const contact_id = Number(urlBeforeQuery.split('contact_')[1])
    const contact = await getUserContact(user_id, contact_id);

    const contactEmailAddresses = await getAContactEmailAddresses(user_id, contact_id);

    const createNewContactEmailLabelSelect = document.querySelector("#create-new-contact-email-label-select");
    const createNewContactEmailLabelSelectInputSelectedIndex = createNewContactEmailLabelSelect.selectedIndex;
    const createNewContactEmailLabelInputElement = document.querySelector("#create-new-contact-email-label-input");
    const createNewContactEmailLabelSecondInputElement = document.querySelector("#create-new-contact-email-label-second-input");
    let emailAddressLabel = '';
    const createNewContactEmailInputElement = document.querySelector("#create-new-contact-email-input")
    const emailAddress = createNewContactEmailInputElement.value;

    if (createNewContactEmailLabelSelectInputSelectedIndex !== -1 && createNewContactEmailLabelSelect.style.display !== "none") {
        emailAddressLabel = createNewContactEmailLabelSelect.options[createNewContactEmailLabelSelectInputSelectedIndex].text;
    } else {
        emailAddressLabel = createNewContactEmailLabelSecondInputElement.value;
    };

    let contactEmailIdsArr = []
    for (let i = 0; i < contactEmailAddresses.length; i++) {
        contactEmailIdsArr.push(contactEmailAddresses[i].emailid)
    };

    let maxId = -Infinity;
    for (let i = 0; i < contactEmailIdsArr.length; i++) {
        if (contactEmailIdsArr[i] > maxId) {
            maxId = contactEmailIdsArr[i];
        }
    };

    if (maxId === -Infinity) {
        maxId = 0
    };

    const newContactEmailObj = {
        userId: user_id,
        contactId: contact_id,
        emailId: maxId + 1,
        emailaddresslabel: emailAddressLabel,
        emailaddress: emailAddress
    };

    return newContactEmailObj
};

async function handleUpdateContactEmailInput() {
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
    const contact_id = Number(urlBeforeQuery.split('contact_')[1])


    const updateContactEmailLabelSelect = document.querySelector("#select-edit-contact-email");
    const updateContactEmailLabelSelectInputSelectedIndex = updateContactEmailLabelSelect.selectedIndex;
    let emailAddressLabel = '';
    let emailId;

    if (updateContactEmailLabelSelectInputSelectedIndex !== -1) {
        emailAddressLabel = updateContactEmailLabelSelect.options[updateContactEmailLabelSelectInputSelectedIndex].text;
        emailId = updateContactEmailLabelSelect.options[updateContactEmailLabelSelectInputSelectedIndex].getAttribute("id")
    };

    const editContactEmailAddressElement = document.querySelector("#edit-contact-emailaddress");
    const editContactEmailAddressValue = editContactEmailAddressElement.value;


     const editContactEmailObj = {
        userId: user_id,
        contactId: contact_id,
        emailid: emailId,
        emailaddresslabel: emailAddressLabel,
        emailaddress: editContactEmailAddressValue
    };

    // console.log(editContactEmailObj)

    return editContactEmailObj
};

async function handleDeleteContactEmail() {
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
    const contact_id = Number(urlBeforeQuery.split('contact_')[1])

    const updateContactEmailLabelSelect = document.querySelector("#select-edit-contact-email");
    const updateContactEmailLabelSelectInputSelectedIndex = updateContactEmailLabelSelect.selectedIndex;
    let emailAddressLabel = '';
    let emailAddressId;

    if (updateContactEmailLabelSelectInputSelectedIndex !== -1) {
        emailAddressLabel = updateContactEmailLabelSelect.options[updateContactEmailLabelSelectInputSelectedIndex].text;
        emailAddressId = updateContactEmailLabelSelect.options[updateContactEmailLabelSelectInputSelectedIndex].getAttribute("id")
    };

    const editContactEmailAddressElement = document.querySelector("#edit-contact-emailaddress");
    const editContactEmailAddressValue = editContactEmailAddressElement.value

      const deleteContactEmailObj = {
        userId: user_id,
        contactId: contact_id,
        emailAddressId: emailAddressId,
        emailaddresslabel: emailAddressLabel,
        emailaddress: editContactEmailAddressValue
    };

    console.log(deleteContactEmailObj)

    return deleteContactEmailObj
};

async function handleEditContactPhoneNumberLabelInput() {
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
    const contact_id = Number(urlBeforeQuery.split('contact_')[1])
    const contact = await getUserContact(user_id, contact_id);

    const contactPhoneNumbers = await getAContactPhoneNumber(user_id, contact_id);

    const selectEditContactPhoneNumberElement = document.querySelector("#select-edit-contact-phonenumber");
    const selectedEditContactPhoneNumberOptionIndex = selectEditContactPhoneNumberElement.selectedIndex;
    const selectedEditContactPhoneNumberOptionElement = selectEditContactPhoneNumberElement.options[selectedEditContactPhoneNumberOptionIndex];
    const selectedEditContactPhoneNumberOptionElementId = selectedEditContactPhoneNumberOptionElement.getAttribute("id");
    console.log(selectedEditContactPhoneNumberOptionElement)

    const editContactPhoneNumberLabelCurrentValueElement = document.querySelector("#edit-contact-phonenumber-label-current-value");
    editContactPhoneNumberLabelCurrentValueElement.value = selectEditContactPhoneNumberElement.value

    const editContactPhoneNumberLabelSelect = document.querySelector("#edit-contact-phonenumber-label-select");
    const editContactPhoneNumberLabelSelectInputSelectedIndex = editContactPhoneNumberLabelSelect.selectedIndex;
    const editContactPhoneNumberLabelInputElement = document.querySelector("#edit-contact-phonenumber-label-input");
    const editContactPhoneNumberLabelSecondInputElement = document.querySelector("#edit-contact-phonenumber-label-second-input");
    let phoneNumberLabel = '';
    // const createNewContactEmailInputElement = document.querySelector("#create-new-contact-email-input")
    // const emailAddress = createNewContactEmailInputElement.value;

    if (editContactPhoneNumberLabelSelectInputSelectedIndex !== -1 && editContactPhoneNumberLabelSelect.style.display !== "none") {
        phoneNumberLabel = editContactPhoneNumberLabelSelect.options[editContactPhoneNumberLabelSelectInputSelectedIndex].text;
    } else {
        phoneNumberLabel = editContactPhoneNumberLabelSecondInputElement.value;
    };

    // console.log(selectedEditContactEmailOptionElementId)

    let phonenumber;

    for (let i = 0; i < contactPhoneNumbers.length; i++) {
        // console.log(contactPhoneNumbers[i].emailid.toString())
        // console.log(selectedEditContactEmailOptionElementId)
        if (contactPhoneNumbers[i].phonenumberid.toString() === selectedEditContactPhoneNumberOptionElementId) {
            phonenumber = contactPhoneNumbers[i].phonenumber;
        }
    }

    let newContactPhoneNumberLabelObj = {
        userId: user_id,
        contactId: contact_id,
        phoneNumberId: selectedEditContactPhoneNumberOptionElementId,
        phonenumberlabel: phoneNumberLabel,
        phonenumber: phonenumber
    };

    console.log(newContactPhoneNumberLabelObj)

    return newContactPhoneNumberLabelObj
};

async function handleEditContactAddressLabelInput() {
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
    const contact_id = Number(urlBeforeQuery.split('contact_')[1])
    const contact = await getUserContact(user_id, contact_id);

    const contactAddresses = await getAContactAddress(user_id, contact_id);

    const selectEditContactAddressElement = document.querySelector("#select-edit-contact-address");
    const selectedEditContactAddressOptionIndex = selectEditContactAddressElement.selectedIndex;
    const selectedEditContactAddressOptionElement = selectEditContactAddressElement.options[selectedEditContactAddressOptionIndex];
    const selectedEditContactAddressOptionElementId = selectedEditContactAddressOptionElement.getAttribute("id");
    console.log(selectedEditContactAddressOptionElement)

    const editContactAddressLabelCurrentValueElement = document.querySelector("#edit-contact-address-label-current-value");
    editContactAddressLabelCurrentValueElement.value = selectEditContactAddressElement.value

    const editContactAddressLabelSelect = document.querySelector("#edit-contact-address-label-select");
    const editContactAddressLabelSelectInputSelectedIndex = editContactAddressLabelSelect.selectedIndex;
    const editContactAddressLabelInputElement = document.querySelector("#edit-contact-address-label-input");
    const editContactAddressLabelSecondInputElement = document.querySelector("#edit-contact-address-label-second-input");
    let addressLabel = '';
    // const createNewContactEmailInputElement = document.querySelector("#create-new-contact-email-input")
    // const emailAddress = createNewContactEmailInputElement.value;

    if (editContactAddressLabelSelectInputSelectedIndex !== -1 && editContactAddressLabelSelect.style.display !== "none") {
        addressLabel = editContactAddressLabelSelect.options[editContactAddressLabelSelectInputSelectedIndex].text;
    } else {
        addressLabel = editContactAddressLabelSecondInputElement.value;
    };

    // console.log(selectedEditContactEmailOptionElementId)

    let address;

    for (let i = 0; i < contactAddresses.length; i++) {
        // console.log(contactAddresses[i].emailid.toString())
        // console.log(selectedEditContactEmailOptionElementId)
        if (contactAddresses[i].addressid.toString() === selectedEditContactAddressOptionElementId) {
            address = contactAddresses[i].address;
        }
    }

    let newContactAddressLabelObj = {
        userId: user_id,
        contactId: contact_id,
        addressId: selectedEditContactAddressOptionElementId,
        addresslabel: addressLabel,
        address: address
    };

    console.log(newContactAddressLabelObj)

    return newContactAddressLabelObj
};

async function handleAddNewContactPhoneNumberInput(event) {
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
    const contact_id = Number(urlBeforeQuery.split('contact_')[1])
    const contact = await getUserContact(user_id, contact_id);

    console.log(contact_id)

    const contactPhoneNumbers = await getAContactPhoneNumber(user_id, contact_id);
    console.log(contactPhoneNumbers)

    const createNewContactPhoneNumberLabelSelect = document.querySelector("#create-new-contact-phonenumber-label-select");
    const createNewContactPhoneNumberLabelSelectInputSelectedIndex = createNewContactPhoneNumberLabelSelect.selectedIndex;
    const createNewContactPhoneNumberLabelInputElement = document.querySelector("#create-new-contact-phonenumber-label-input");
    const createNewContactPhoneNumberLabelSecondInputElement = document.querySelector("#create-new-contact-phonenumber-label-second-input");
    let phoneNumberLabel = '';
    const createNewContactPhoneNumberInputElement = document.querySelector("#create-new-contact-phonenumber-input")
    const phoneNumber = formatPhoneNumberForData(createNewContactPhoneNumberInputElement);
    console.log(phoneNumber)

    if (createNewContactPhoneNumberLabelSelectInputSelectedIndex !== -1 && createNewContactPhoneNumberLabelSelect.style.display !== "none") {
        phoneNumberLabel = createNewContactPhoneNumberLabelSelect.options[createNewContactPhoneNumberLabelSelectInputSelectedIndex].text;
    } else {
        phoneNumberLabel = createNewContactPhoneNumberLabelSecondInputElement.value;
    };

    let contactPhoneNumberIdsArr = [];
    for (let i = 0; i < contactPhoneNumbers.length; i++) {
        contactPhoneNumberIdsArr.push(contactPhoneNumbers[i].phonenumberid)
    };

    let maxId = -Infinity;
    for (let i = 0; i < contactPhoneNumberIdsArr.length; i++) {
        if (contactPhoneNumberIdsArr[i] > maxId) {
            maxId = contactPhoneNumberIdsArr[i];
        }
    };

    if (maxId === -Infinity) {
        maxId = 0
    };

    const newContactPhoneNumberObj = {
        userId: user_id,
        contactId: contact_id,
        phonenumberId: maxId + 1,
        phonenumberlabel: phoneNumberLabel,
        phonenumber: phoneNumber
    };

    return newContactPhoneNumberObj;
};

async function handleUpdateContactPhoneNumberInput() {
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
    const contact_id = Number(urlBeforeQuery.split('contact_')[1]);

    
    const updateContactPhoneNumberLabelSelect = document.querySelector("#select-edit-contact-phonenumber");
    const updateContactPhoneNumberLabelSelectInputSelectedIndex = updateContactPhoneNumberLabelSelect.selectedIndex;
    let phoneNumberLabel = '';
    let phoneNumberId;

    if (updateContactPhoneNumberLabelSelectInputSelectedIndex !== -1) {
        phoneNumberLabel = updateContactPhoneNumberLabelSelect.options[updateContactPhoneNumberLabelSelectInputSelectedIndex].text;
        phoneNumberId = updateContactPhoneNumberLabelSelect.options[updateContactPhoneNumberLabelSelectInputSelectedIndex].getAttribute("id");
    };

    const editContactPhoneNumberElement = document.querySelector("#edit-contact-phonenumber");
    const editContactPhoneNumberValue = editContactPhoneNumberElement.value;

     const editContactPhoneNumberObj = {
        userId: user_id,
        contactId: contact_id,
        phonenumberid: phoneNumberId,
        phonenumberlabel: phoneNumberLabel,
        phonenumber: editContactPhoneNumberValue
    };

    console.log(editContactPhoneNumberObj)

    return editContactPhoneNumberObj
};

async function handleDeleteContactPhoneNumber() {
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
    const contact_id = Number(urlBeforeQuery.split('contact_')[1])

    const updateContactPhoneNumberLabelSelect = document.querySelector("#select-edit-contact-phonenumber");
    const updateContactPhoneNumberLabelSelectInputSelectedIndex = updateContactPhoneNumberLabelSelect.selectedIndex;
    let phoneNumberLabel = '';
    let phoneNumberId;

    if (updateContactPhoneNumberLabelSelectInputSelectedIndex !== -1) {
        phoneNumberLabel = updateContactPhoneNumberLabelSelect.options[updateContactPhoneNumberLabelSelectInputSelectedIndex].text;
        phoneNumberId = updateContactPhoneNumberLabelSelect.options[updateContactPhoneNumberLabelSelectInputSelectedIndex].getAttribute("id")
    };

    const editContactPhoneNumberElement = document.querySelector("#edit-contact-phonenumber");
    const editContactPhoneNumberValue = editContactPhoneNumberElement.value

      const deleteContactPhoneNumberObj = {
        userId: user_id,
        contactId: contact_id,
        phoneNumberId: phoneNumberId,
        phonenumberlabel: phoneNumberLabel,
        phonenumber: editContactPhoneNumberValue
    };

    console.log(deleteContactPhoneNumberObj)

    return deleteContactPhoneNumberObj
};

async function handleAddNewContactAddressInput(event) {
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
    const contact_id = Number(urlBeforeQuery.split('contact_')[1])
    const contact = await getUserContact(user_id, contact_id);

    const contactAddresses = await getAContactAddress(user_id, contact_id);

    const createNewContactAddressLabelSelect = document.querySelector("#create-new-contact-address-label-select");
    const createNewContactAddressLabelSelectInputSelectedIndex = createNewContactAddressLabelSelect.selectedIndex;
    const createNewContactAddressLabelInputElement = document.querySelector("#create-new-contact-address-label-input");
    const createNewContactAddressLabelSecondInputElement = document.querySelector("#create-new-contact-address-label-second-input");
    let addressLabel = '';
    const createNewContactAddressInputElement = document.querySelector("#create-new-contact-address-input")
    const address = createNewContactAddressInputElement.value;

    if (createNewContactAddressLabelSelectInputSelectedIndex !== -1 && createNewContactAddressLabelSelect.style.display !== "none") {
        addressLabel = createNewContactAddressLabelSelect.options[createNewContactAddressLabelSelectInputSelectedIndex].text;
    } else {
        addressLabel = createNewContactAddressLabelSecondInputElement.value;
    };

    let contactAddressIdsArr = []
    for (let i = 0; i < contactAddresses.length; i++) {
        contactAddressIdsArr.push(contactAddresses[i].addressid)
    };

    let maxId = -Infinity;
    for (let i = 0; i < contactAddressIdsArr.length; i++) {
        if (contactAddressIdsArr[i] > maxId) {
            maxId = contactAddressIdsArr[i];
        }
    };

    if (maxId === -Infinity) {
        maxId = 0
    };

    const newContactAddressObj = {
        userId: user_id,
        contactId: contact_id,
        addressId: maxId + 1,
        addresslabel: addressLabel,
        address: address
    };

    return newContactAddressObj
};

async function handleUpdateContactAddressInput() {
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
    const contact_id = Number(urlBeforeQuery.split('contact_')[1])


    const updateContactAddressLabelSelect = document.querySelector("#select-edit-contact-address");
    const updateContactAddressLabelSelectInputSelectedIndex = updateContactAddressLabelSelect.selectedIndex;
    let addressLabel = '';
    let addressId;

    if (updateContactAddressLabelSelectInputSelectedIndex !== -1) {
        addressLabel = updateContactAddressLabelSelect.options[updateContactAddressLabelSelectInputSelectedIndex].text;
        addressId = updateContactAddressLabelSelect.options[updateContactAddressLabelSelectInputSelectedIndex].getAttribute("id");
    };

    const editContactAddressElement = document.querySelector("#edit-contact-address");
    const editContactAddressValue = editContactAddressElement.value;


     const editContactAddressObj = {
        userId: user_id,
        contactId: contact_id,
        addressid: addressId,
        addresslabel: addressLabel,
        address: editContactAddressValue
    };

    return editContactAddressObj;
};

async function handleDeleteContactAddress() {
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
    const contact_id = Number(urlBeforeQuery.split('contact_')[1])

    const updateContactAddressLabelSelect = document.querySelector("#select-edit-contact-address");
    const updateContactAddressLabelSelectInputSelectedIndex = updateContactAddressLabelSelect.selectedIndex;
    let addressLabel = '';
    let addressId;

    if (updateContactAddressLabelSelectInputSelectedIndex !== -1) {
        addressLabel = updateContactAddressLabelSelect.options[updateContactAddressLabelSelectInputSelectedIndex].text;
        addressId = updateContactAddressLabelSelect.options[updateContactAddressLabelSelectInputSelectedIndex].getAttribute("id");
    };

    const editContactAddressElement = document.querySelector("#edit-contact-address");
    const editContactAddressValue = editContactAddressElement.value

      const deleteContactAddressObj = {
        userId: user_id,
        contactId: contact_id,
        addressId: addressId,
        addresslabel: addressLabel,
        address: editContactAddressValue
    };

    console.log(deleteContactAddressObj)

    return deleteContactAddressObj
};

async function handleEditContactWebsiteLabelInput() {
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
    const contact_id = Number(urlBeforeQuery.split('contact_')[1])
    const contact = await getUserContact(user_id, contact_id);

    const contactWebsites = await getAContactWebsite(user_id, contact_id);

    const selectEditContactWebsiteElement = document.querySelector("#select-edit-contact-website");
    const selectedEditContactWebsiteOptionIndex = selectEditContactWebsiteElement.selectedIndex;
    const selectedEditContactWebsiteOptionElement = selectEditContactWebsiteElement.options[selectedEditContactWebsiteOptionIndex];
    const selectedEditContactWebsiteOptionElementId = selectedEditContactWebsiteOptionElement.getAttribute("id");
    console.log(selectedEditContactWebsiteOptionElement)

    const editContactWebsiteLabelCurrentValueElement = document.querySelector("#edit-contact-website-label-current-value");
    editContactWebsiteLabelCurrentValueElement.value = selectEditContactWebsiteElement.value

    const editContactWebsiteLabelSelect = document.querySelector("#edit-contact-website-label-select");
    const editContactWebsiteLabelSelectInputSelectedIndex = editContactWebsiteLabelSelect.selectedIndex;
    const editContactWebsiteLabelInputElement = document.querySelector("#edit-contact-website-label-input");
    const editContactWebsiteLabelSecondInputElement = document.querySelector("#edit-contact-website-label-second-input");
    let websiteLabel = '';
    // const createNewContactEmailInputElement = document.querySelector("#create-new-contact-email-input")
    // const emailAddress = createNewContactEmailInputElement.value;

    if (editContactWebsiteLabelSelectInputSelectedIndex !== -1 && editContactWebsiteLabelSelect.style.display !== "none") {
        websiteLabel = editContactWebsiteLabelSelect.options[editContactWebsiteLabelSelectInputSelectedIndex].text;
    } else {
        websiteLabel = editContactWebsiteLabelSecondInputElement.value;
    };

    // console.log(selectedEditContactEmailOptionElementId)

    let website;

    for (let i = 0; i < contactWebsites.length; i++) {
        // console.log(contactWebsites[i].emailid.toString())
        // console.log(selectedEditContactEmailOptionElementId)
        if (contactWebsites[i].websiteid.toString() === selectedEditContactWebsiteOptionElementId) {
            website = contactWebsites[i].website;
        }
    }

    let newContactWebsiteLabelObj = {
        userId: user_id,
        contactId: contact_id,
        websiteId: selectedEditContactWebsiteOptionElementId,
        websitelabel: websiteLabel,
        website: website
    };

    console.log(newContactWebsiteLabelObj)

    return newContactWebsiteLabelObj
};

async function handleAddNewContactWebsiteInput(event) {
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
    const contact_id = Number(urlBeforeQuery.split('contact_')[1])
    const contact = await getUserContact(user_id, contact_id);

    const contactWebsites = await getAContactWebsite(user_id, contact_id);

    const createNewContactWebsiteLabelSelect = document.querySelector("#create-new-contact-website-label-select");
    const createNewContactWebsiteLabelSelectInputSelectedIndex = createNewContactWebsiteLabelSelect.selectedIndex;
    const createNewContactWebsiteLabelInputElement = document.querySelector("#create-new-contact-website-label-input");
    const createNewContactWebsiteLabelSecondInputElement = document.querySelector("#create-new-contact-website-label-second-input");
    let websiteLabel = '';
    const createNewContactWebsiteInputElement = document.querySelector("#create-new-contact-website-input")
    const website = createNewContactWebsiteInputElement.value;

    if (createNewContactWebsiteLabelSelectInputSelectedIndex !== -1 && createNewContactWebsiteLabelSelect.style.display !== "none") {
        websiteLabel = createNewContactWebsiteLabelSelect.options[createNewContactWebsiteLabelSelectInputSelectedIndex].text;
    } else {
        websiteLabel = createNewContactWebsiteLabelSecondInputElement.value;
    };

    let contactWebsitesIdsArr = []
    for (let i = 0; i < contactWebsites.length; i++) {
        contactWebsitesIdsArr.push(contactWebsites[i].websiteid)
    };

    let maxId = -Infinity;
    for (let i = 0; i < contactWebsitesIdsArr.length; i++) {
        if (contactWebsitesIdsArr[i] > maxId) {
            maxId = contactWebsitesIdsArr[i];
        }
    };

    if (maxId === -Infinity) {
        maxId = 0
    };

    const newContactWebsiteObj = {
        userId: user_id,
        contactId: contact_id,
        websiteId: maxId + 1,
        websitelabel: websiteLabel,
        website: website
    };

    return newContactWebsiteObj
};

async function handleUpdateContactWebsiteInput() {
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
    const contact_id = Number(urlBeforeQuery.split('contact_')[1])

    const updateContactWebsiteLabelSelect = document.querySelector("#select-edit-contact-website");
    const updateContactWebsiteLabelSelectInputSelectedIndex = updateContactWebsiteLabelSelect.selectedIndex;
    let websiteLabel = '';
    let websiteId;

    if (updateContactWebsiteLabelSelectInputSelectedIndex !== -1) {
        websiteLabel = updateContactWebsiteLabelSelect.options[updateContactWebsiteLabelSelectInputSelectedIndex].text;
        websiteId = updateContactWebsiteLabelSelect.options[updateContactWebsiteLabelSelectInputSelectedIndex].getAttribute("id")
    };

    const editContactWebsiteElement = document.querySelector("#edit-contact-website");
    const editContactWebsiteValue = editContactWebsiteElement.value;


     const editContactWebsiteObj = {
        userId: user_id,
        contactId: contact_id,
        websiteid: websiteId,
        websitelabel: websiteLabel,
        website: editContactWebsiteValue
    };

    return editContactWebsiteObj;
};

async function handleDeleteContactWebsite() {
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
    const contact_id = Number(urlBeforeQuery.split('contact_')[1])

    const updateContactWebsiteLabelSelect = document.querySelector("#select-edit-contact-website");
    const updateContactWebsiteLabelSelectInputSelectedIndex = updateContactWebsiteLabelSelect.selectedIndex;
    let websiteLabel = '';
    let websiteId;

    if (updateContactWebsiteLabelSelectInputSelectedIndex !== -1) {
        websiteLabel = updateContactWebsiteLabelSelect.options[updateContactWebsiteLabelSelectInputSelectedIndex].text;
        websiteId = updateContactWebsiteLabelSelect.options[updateContactWebsiteLabelSelectInputSelectedIndex].getAttribute("id")
    };

    const editContactWebsiteElement = document.querySelector("#edit-contact-website");
    const editContactWebsiteValue = editContactWebsiteElement.value

      const deleteContactWebsiteObj = {
        userId: user_id,
        contactId: contact_id,
        websiteId: websiteId,
        websitelabel: websiteLabel,
        website: editContactWebsiteValue
    };

    console.log(deleteContactWebsiteObj)

    return deleteContactWebsiteObj
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
        // emailaddress: editContactEmailAddressElement.value,
        // phonenumber: editContactPhoneNumberElement.value,
        // address: editContactAddressElement.value,
        organization: editContactOrganizationElement.value,
        role: editContactRoleElement.value,
        // website: editContactSocialMediaElement.value,
        favorite: contact.favorite,
        notes: editContactNotesElement.value,
        // contactImage: editContactImageElement.getAttribute("src")
        contactImage: null
    };

    return editContactObject
};

async function handleEditContactFirstNameInput() {
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

    const editContactFirstNameElement = document.querySelector("#edit-contact-firstname");

    const editContactFirstnameObj = {
        firstname: editContactFirstNameElement.value,
        lastname: contact.lastname,
        gender: contact.gender,
        birthday: contact.birthday,
        organization: contact.organization,
        role: contact.organization_role,
        favorite: contact.favorite,
        notes: contact.notes
    };

    return editContactFirstnameObj
};

async function handleEditContactLastNameInput() {
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

    const editContactLastNameElement = document.querySelector("#edit-contact-lastname");

    const editContactLastNameObj = {
        firstname: contact.firstname,
        lastname: editContactLastNameElement.value,
        gender: contact.gender,
        birthday: contact.birthday,
        organization: contact.organization,
        role: contact.organization_role,
        favorite: contact.favorite,
        notes: contact.notes
    };

    return editContactLastNameObj; 
};

async function handleEditContactGenderInput() {
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

    const editContactGenderElement = document.querySelector("#edit-contact-gender");

    const editContactGenderObj = {
        firstname: contact.firstname,
        lastname: contact.lastname,
        gender: editContactGenderElement.value,
        birthday: contact.birthday,
        organization: contact.organization,
        role: contact.organization_role,
        favorite: contact.favorite,
        notes: contact.notes
    };

    return editContactGenderObj; 
}
async function handleEditContactBirthdayInput() {
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

    const editContactBirthdayElement = document.querySelector("#edit-contact-birthday");

    const editContactBirthdayObj = {
        firstname: contact.firstname,
        lastname: contact.lastname,
        gender: contact.gender,
        birthday: editContactBirthdayElement.value,
        organization: contact.organization,
        role: contact.organization_role,
        favorite: contact.favorite,
        notes: contact.notes
    };

    return editContactBirthdayObj;   
};

async function handleEditContactOrganizationInput() {
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

    const editContactOrganizationElement = document.querySelector("#edit-contact-organization");

    const editContactOrganizationObj = {
        firstname: contact.firstname,
        lastname: contact.lastname,
        gender: contact.gender,
        birthday: contact.birthday,
        organization: editContactOrganizationElement.value,
        role: contact.organization_role,
        favorite: contact.favorite,
        notes: contact.notes
    };

    return editContactOrganizationObj;   
    
}
async function handleEditContactOrganizationRoleInput() {
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

    const editContactOrganizationRoleElement = document.querySelector("#edit-contact-organization-role");

    const editContactOrganizationRoleObj = {
        firstname: contact.firstname,
        lastname: contact.lastname,
        gender: contact.gender,
        birthday: contact.birthday,
        organization: contact.organization,
        role: editContactOrganizationRoleElement.value,
        favorite: contact.favorite,
        notes: contact.notes
    };

    return editContactOrganizationRoleObj;
};

async function handleEditContactNotesInput() {
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

    const editContactNotesElement = document.querySelector("#edit-contact-notes");

    const editContactNotesRoleObj = {
        firstname: contact.firstname,
        lastname: contact.lastname,
        gender: contact.gender,
        birthday: contact.birthday,
        organization: contact.organization,
        role: contact.value,
        favorite: contact.favorite,
        notes: editContactNotesElement.value
    };

    return editContactNotesRoleObj;  
}

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
        for (let i = 0; i < userContacts.length; i++) {
        const contactId = userContacts[i].contact_id
        const contactImage = await getAContactImage(userId, contactId);
        const contactEmailAddresses = await getAContactEmailAddresses(userId, contactId)
        const contactEmailObj = contactEmailAddresses[0];
        let contactEmail;
        if (contactEmailObj !== undefined) {
            contactEmail = contactEmailObj.emailaddress;
        }
        // console.log(contactEmail)
        const contactImageStr = `data:${contactImage.contentType};base64,${contactImage.image}`
        userContacts[i]["email"] = contactEmail;
        userContacts[i]["imageString"] = contactImageStr;
    }

    const userImage = await getAUserImage(userId);
    const imageString = `data:${userImage.contentType};base64,${userImage.image}`
    const favoritesListUserImage = document.querySelector("#favorites-user-image");
    favoritesListUserImage.setAttribute("src", imageString);
    favoritesListUserImage.style.borderRadius = "50%";

    const favoritesHeaderUserName = document.querySelector("#favorites-header-user-name");
    favoritesHeaderUserName.innerHTML = `${user.firstname} ${user.lastname}`;
    const favaoritesHeaderUserEmail = document.querySelector("#favorites-header-user-email");
    favaoritesHeaderUserEmail.innerHTML = user.emailaddress;

    const favoriteContactsUserNameElement = document.querySelector("#favorites-user-name");
    const favoriteContactsUserEmailAddressElement = document.querySelector("#favorits-user-email")
    favoriteContactsUserNameElement.innerHTML = `Favorites List`;
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
    favoriteContactsListContainer.setAttribute("id", "my-favorite-contacts-list-container")
    favoriteContactsListContainer.style.visibility = "hidden";
    const numberOfFavoriteContactsElement = document.querySelector("#my-favorites-number");
    numberOfFavoriteContactsElement.innerHTML = favoriteContacts.length;
    favoriteContactsListContainer.style.position = "absolute";
    favoriteContactsListContainer.style.top = "38.5%";
    favoriteContactsListContainer.style.left = "31.5%";
    favoriteContactsListContainer.style.width = "68.5%";
    const favoriteContactsList = document.createElement("ul");
    favoriteContactsList.setAttribute("id", "my-favorite-contacts-list");
    favoriteContactsList.style.listStyle = "none";
    favoriteContactsList.style.padding = "0";
    favoriteContactsList.style.margin = "0";

    favoriteContacts.sort(function(a, b) {
        const nameA = `${a.firstname} ${a.lastname}`
        const nameB = `${b.firstname} ${b.lastname}`;
        return nameA.localeCompare(nameB)
      });

    favoriteContacts.forEach(contact => {        
        const favoriteContactListItem = document.createElement("div");
        favoriteContactListItem.style.display = "flex";
        favoriteContactListItem.style.flexDirection = "row";
        favoriteContactListItem.style.height = "70px";
        favoriteContactListItem.style.borderTop = "2px solid black";
        favoriteContactListItem.style.borderBlock = "2px solid black";
        favoriteContactListItem.style.backgroundColor = "#fcfcff";
        favoriteContactListItem.style.marginTop = "1px";
        favoriteContactListItem.style.marginBottom = "1px";
        favoriteContactListItem.setAttribute("contactId", contact.contact_id);

        favoriteContactListItem.addEventListener("mouseover", function() {
            favoriteContactListItem.style.backgroundColor = "lightgreen";
        });

        favoriteContactListItem.addEventListener("mouseout", function() {
            favoriteContactListItem.style.backgroundColor = "#fcfcff";
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
            };
        });

        ///
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
        favoriteContactListItemImage.style.border = "1px solid black";
        favoriteContactListItemImage.style.objectFit = "cover"
        favoriteContactListItemImage.setAttribute("src", contact.imageString);
        const favoriteContactListNameContainer = document.createElement("div");
        favoriteContactListNameContainer.style.position = "relative";
        favoriteContactListNameContainer.style.display = "flex";
        favoriteContactListNameContainer.style.flexDirection = "column";
        favoriteContactListNameContainer.style.justifyContent = "space-around";
        favoriteContactListNameContainer.style.alignItems = "center";
        favoriteContactListNameContainer.style.minWidth = "0";
        favoriteContactListNameContainer.style.width = "100%";
        const favoriteContactListNameElementContainer = document.createElement("div");
        favoriteContactListNameElementContainer.style.display = "flex";
        favoriteContactListNameElementContainer.style.justifyContent = "center";
        favoriteContactListNameElementContainer.style.minWidth = "0";
        favoriteContactListNameElementContainer.style.width = "100%";
        const favoriteContactListNameElement = document.createElement("h3");
        favoriteContactListNameElement.style.whiteSpace = "nowrap";
        favoriteContactListNameElement.style.overflow = "hidden";
        favoriteContactListNameElement.style.textOverflow = "ellipsis";
        favoriteContactListNameElement.style.cursor = "default";
        favoriteContactListNameElement.style.margin = "0";
        favoriteContactListNameElement.innerHTML = `${contact.firstname} ${contact.lastname}`;
        const favoriteContactListEmailElementContainer = document.createElement("div");
        favoriteContactListEmailElementContainer.style.display = "flex";
        favoriteContactListEmailElementContainer.style.justifyContent = "center";
        favoriteContactListEmailElementContainer.style.minWidth = "0";
        favoriteContactListEmailElementContainer.style.width = "100%";
        const favoriteContactListEmailElement = document.createElement("p");
        favoriteContactListEmailElement.style.fontStyle = "italic"
        favoriteContactListEmailElement.style.fontSize = "small";
        favoriteContactListEmailElement.style.whiteSpace = "nowrap";
        favoriteContactListEmailElement.style.overflow = "hidden";
        favoriteContactListEmailElement.style.textOverflow = "ellipsis";
        favoriteContactListEmailElement.style.cursor = "default";
        favoriteContactListEmailElement.style.margin = "0";
        const favoriteContactEmail = contact.email;
        favoriteContactListEmailElement.innerHTML = favoriteContactEmail;
        if (favoriteContactListEmailElement.innerHTML === "undefined") {
            favoriteContactListEmailElement.style.visibility = "hidden";
        };
        const favoriteContactListOrganizationAndRoleElementContainer = document.createElement("div");
        favoriteContactListOrganizationAndRoleElementContainer.style.display = "flex";
        favoriteContactListOrganizationAndRoleElementContainer.style.justifyContent = "center";
        favoriteContactListOrganizationAndRoleElementContainer.style.minWidth = "0";
        favoriteContactListOrganizationAndRoleElementContainer.style.width = "100%";
        const favoriteContactListOrganizationAndRoleElement = document.createElement("p");
        favoriteContactListOrganizationAndRoleElement.style.fontWeight = "bolder";
        favoriteContactListOrganizationAndRoleElement.style.fontSize = "smaller"
        favoriteContactListOrganizationAndRoleElement.style.whiteSpace = "nowrap";
        favoriteContactListOrganizationAndRoleElement.style.overflow = "hidden";
        favoriteContactListOrganizationAndRoleElement.style.textOverflow = "ellipsis";
        favoriteContactListOrganizationAndRoleElement.style.cursor = "default";
        favoriteContactListOrganizationAndRoleElement.style.margin = "0";
    
        if (contact.organization !== null && contact.organization !== "" && contact.organization_role !== null && contact.organization_role !== "") {
            favoriteContactListOrganizationAndRoleElement.innerHTML = `${contact.organization} || ${contact.organization_role}`
        } else if (contact.organization !== null && contact.organization !== "" || contact.organization_role === null && contact.organization_role === "") {
            favoriteContactListOrganizationAndRoleElement.innerHTML = `${contact.organization}`
        } else if (contact.organization === null && contact.organization === "" || contact.organization_role !== null && contact.organization_role !== "") {
            favoriteContactListOrganizationAndRoleElement.innerHTML = `${contact.organization_role}`
        } else {
            favoriteContactListOrganizationAndRoleElement.innerHTML = "text";
            favoriteContactListOrganizationAndRoleElement.style.visibility = "hidden";
        }
    
        const favoriteContactListFavoritesStarIconContainer = document.createElement("div");
        favoriteContactListFavoritesStarIconContainer.style.display = "flex";
        favoriteContactListFavoritesStarIconContainer.style.justifyContent = "center";
        favoriteContactListFavoritesStarIconContainer.style.alignItems = "center";
        favoriteContactListFavoritesStarIconContainer.style.padding = "10px";
        const favoriteContactListFavoriteStarImg = document.createElement("img");
        favoriteContactListFavoriteStarImg.classList.add("contact-favorite-icon");
        favoriteContactListFavoriteStarImg.style.width = "50px";
        
        favoriteContactListFavoriteStarImg.setAttribute("src", "./images/star-gold-svgrepo-com.svg");
        if (contact.favorite === null || contact.favorite === false) {
            favoriteContactListFavoriteStarImg.style.visibility = "hidden";
        } else {
            favoriteContactListFavoriteStarImg.style.display = "block";
        };
        
        favoriteContactListItemImageContainer.appendChild(favoriteContactListItemImage);
        favoriteContactListNameElementContainer.appendChild(favoriteContactListNameElement);
        favoriteContactListEmailElementContainer.appendChild(favoriteContactListEmailElement);
        favoriteContactListOrganizationAndRoleElementContainer.appendChild(favoriteContactListOrganizationAndRoleElement);
        favoriteContactListNameContainer.appendChild(favoriteContactListNameElementContainer);
        favoriteContactListNameContainer.appendChild(favoriteContactListEmailElementContainer);
        favoriteContactListNameContainer.appendChild(favoriteContactListOrganizationAndRoleElementContainer);
        favoriteContactListItem.appendChild(favoriteContactListItemImageContainer);
        favoriteContactListItem.appendChild(favoriteContactListNameContainer);
        favoriteContactListFavoritesStarIconContainer.appendChild(favoriteContactListFavoriteStarImg);
        favoriteContactListItem.appendChild(favoriteContactListFavoritesStarIconContainer);
        favoriteContactsList.appendChild(favoriteContactListItem);
    });
    // myFavoriteContactsHeaderElementsContainer.appendChild(myFavoriteContactsHeaderElement);
    // myFavoriteContactsHeaderElementsContainer.appendChild(numberOfFavoriteContactsElement);
    // favoriteContactsHeaderElementsContainer.appendChild(myFavoriteContactsHeaderElementsContainer);
    // searchMyFavoritesContactsElementContainer.appendChild(searchMyFavoriteContactsElement);
    // favoriteContactsHeaderElementsContainer.appendChild(searchMyFavoritesContactsElementContainer);
    // favoriteContactsHeaderElementsContainer.appendChild(myFavoriteContactsHeaderElementsSpacingContainer);
    // favoriteContactsHeaderContainer.append(favoriteContactsHeaderElementsContainer);
    // favoriteContactsListContainer.appendChild(favoriteContactsHeaderContainer);
    favoriteContactsListContainer.appendChild(favoriteContactsList);
    document.body.appendChild(favoriteContactsListContainer);

    const searchFavoriteContactsElement = document.querySelector("#search-my-favorite-contacts-input");
    searchFavoriteContactsElement.addEventListener("input", myFavoriteContactsAutocompleteSearch);

    async function myFavoriteContactsAutocompleteSearch() {
        const favoriteContactsList = document.querySelector("#my-favorite-contacts-list");
        let searchFavoriteContactsInputValue = searchFavoriteContactsElement.value.toLowerCase().trimEnd();
        let filteredContacts = [];

        let favoriteContacts = [];
        userContacts.forEach(contact => {
            if (contact.favorite) {
                favoriteContacts.push(contact)
            };
        });

        favoriteContacts.sort(function(a, b) {
        const nameA = `${a.firstname} ${a.lastname}`;
        const nameB = `${b.firstname} ${b.lastname}`;
        return nameA.localeCompare(nameB);
        });

        favoriteContacts.filter(function(contact) {
        let contactFirstName = contact.firstname;
        let contactLastName = contact.lastname;
        let contactName = `${contact.firstname} ${contact.lastname}`;

        if (searchFavoriteContactsInputValue === "") {
            for (let i = 0; i < favoriteContacts.length; i++) {
                filteredContacts.push(favoriteContacts[i])
            };
        };

        //keep this

        // if (contactFirstName.toLowerCase().startsWith(searchContactsInputValue)) {
        //     for (let i = 0; i < favoriteContacts.length; i++) {
        //         let matchContactName = `${favoriteContacts[i].firstname} ${favoriteContacts[i].lastname}`
        //         if (contactName.toLowerCase() === matchContactName.toLowerCase()) {
        //             filteredContacts.push(favoriteContacts[i])
        //             // console.log(filteredContacts)
        //         }
        //     }
        // }

        // if (contactLastName.toLowerCase().startsWith(searchContactsInputValue)) {
        //     for (let i = 0; i < favoriteContacts.length; i++) {
        //         let matchContactName = `${favoriteContacts[i].firstname} ${favoriteContacts[i].lastname}`
        //         if (contactName.toLowerCase() === matchContactName.toLowerCase()) {
        //             filteredContacts.push(favoriteContacts[i])
        //             // console.log(filteredContacts)
        //         }
        //     }
        // }

        if (contactName.toLowerCase().startsWith(searchFavoriteContactsInputValue)) {
            for (let i = 0; i < favoriteContacts.length; i++) {
                let matchContactName = `${favoriteContacts[i].firstname} ${favoriteContacts[i].lastname}`;
                if (contactName.toLowerCase() === matchContactName.toLowerCase()) {
                    filteredContacts.push(favoriteContacts[i]);
                    // console.log(filteredContacts)
                }
            }
        }
    });

    console.log(searchFavoriteContactsInputValue)

    const searchFavoriteContactsAutocompleteList = document.querySelector("#favorite-contacts-autocomplete-list");
    searchFavoriteContactsAutocompleteList.style.listStyle = "none";
    searchFavoriteContactsAutocompleteList.style.margin = "0";
    searchFavoriteContactsAutocompleteList.style.padding = "0";
    // const searchFavoriteContactsAutocompleteList = document.createElement("div");
    // searchFavoriteContactsAutocompleteList.setAttribute("id", "my-favorite-contacts-autocomplete-list");
   
    searchFavoriteContactsAutocompleteList.innerHTML = '';

    function removeDuplicates(arr) {
        return arr.reduce((unique, item) => {
          if (!unique.includes(item)) {
            unique.push(item);
          }
          return unique;
        }, []);
      };

      const uniqueArray = removeDuplicates(filteredContacts);
      searchFavoriteContactsAutocompleteList.style.display = 'block';
      favoriteContactsList.style.display = "none"
      let elementsArr = [];

            uniqueArray.forEach(contact => {
                const favoriteContactsAutoCompleteListItem = document.createElement("div");
                favoriteContactsAutoCompleteListItem.style.display = "flex";
                favoriteContactsAutoCompleteListItem.style.flexDirection = "row";
                favoriteContactsAutoCompleteListItem.style.height = "70px"
                favoriteContactsAutoCompleteListItem.style.borderTop = "2px solid black";
                favoriteContactsAutoCompleteListItem.style.borderBottom = "2px solid black";
                favoriteContactsAutoCompleteListItem.style.backgroundColor = "#fcfcff";
                favoriteContactsAutoCompleteListItem.style.marginTop = "1px";
                favoriteContactsAutoCompleteListItem.style.marginBottom = "1px";
                favoriteContactsAutoCompleteListItem.setAttribute("contactId", contact.contact_id);

                favoriteContactsAutoCompleteListItem.addEventListener("mouseover", function() {
                favoriteContactsAutoCompleteListItem.style.backgroundColor = "lightgreen";
                });

                favoriteContactsAutoCompleteListItem.addEventListener("mouseout", function() {
                favoriteContactsAutoCompleteListItem.style.backgroundColor = "#fcfcff";
                });

                favoriteContactsAutoCompleteListItem.addEventListener("click", function(event) {
                    
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
                });

                const favoriteContactsAutoCompleteListItemImageContainer = document.createElement("div");
                favoriteContactsAutoCompleteListItemImageContainer.style.display = "flex";
                favoriteContactsAutoCompleteListItemImageContainer.style.alignItems = "center";
                favoriteContactsAutoCompleteListItemImageContainer.style.padding = "10px"
                const favoriteContactsAutoCompleteListItemImage = document.createElement("img");
                favoriteContactsAutoCompleteListItemImage.style.width = "57px";
                favoriteContactsAutoCompleteListItemImage.style.height = "57px";
                favoriteContactsAutoCompleteListItemImage.style.border = "0.5px solid grey";
                favoriteContactsAutoCompleteListItemImage.style.borderRadius = "50%"
                favoriteContactsAutoCompleteListItemImage.style.backgroundColor = "gainsboro";
                favoriteContactsAutoCompleteListItemImage.style.border = "1px solid black";
                favoriteContactsAutoCompleteListItemImage.style.objectFit = "cover";
                favoriteContactsAutoCompleteListItemImage.setAttribute("src", contact.imageString);

                const favoriteContactAutoCompleteListNameContainer = document.createElement("div");
                favoriteContactAutoCompleteListNameContainer.style.position = "relative";
                favoriteContactAutoCompleteListNameContainer.style.display = "flex";
                favoriteContactAutoCompleteListNameContainer.style.flexDirection = "column"
                favoriteContactAutoCompleteListNameContainer.style.justifyContent = "center";
                favoriteContactAutoCompleteListNameContainer.style.alignItems = "center";
                favoriteContactAutoCompleteListNameContainer.style.width = "100%"
                const favoriteContactAutoCompleteListNameElementContainer = document.createElement("div");
                favoriteContactAutoCompleteListNameElementContainer.style.display = "flex";
                favoriteContactAutoCompleteListNameElementContainer.style.justifyContent = "center";
                favoriteContactAutoCompleteListNameElementContainer.style.minWidth = "0";
                favoriteContactAutoCompleteListNameElementContainer.style.width = "100%";
                const favoriteContactAutoCompleteListNameElement = document.createElement("h3");
                favoriteContactAutoCompleteListNameElement.style.whiteSpace = "nowrap";
                favoriteContactAutoCompleteListNameElement.style.overflow = "hidden";
                favoriteContactAutoCompleteListNameElement.style.textOverflow = "ellipsis";
                favoriteContactAutoCompleteListNameElement.style.margin = "0";
                favoriteContactAutoCompleteListNameElement.innerHTML = `${contact.firstname} ${contact.lastname}`;
                const favoriteContactAutoCompleteListEmailElementContainer = document.createElement("div");
                favoriteContactAutoCompleteListEmailElementContainer.style.display = "flex";
                favoriteContactAutoCompleteListEmailElementContainer.style.justifyContent = "center";
                favoriteContactAutoCompleteListEmailElementContainer.style.minWidth = "0";
                favoriteContactAutoCompleteListEmailElementContainer.style.width = "100%";
                const favoriteContactAutoCompleteListEmailElement = document.createElement("p");
                favoriteContactAutoCompleteListEmailElement.style.fontStyle = "italic"
                favoriteContactAutoCompleteListEmailElement.style.fontSize = "small";
                favoriteContactAutoCompleteListEmailElement.style.whiteSpace = "nowrap";
                favoriteContactAutoCompleteListEmailElement.style.overflow = "hidden";
                favoriteContactAutoCompleteListEmailElement.style.textOverflow = "ellipsis";
                favoriteContactAutoCompleteListEmailElement.style.margin = "0"
                const favoriteContactEmail = contact.email;
                favoriteContactAutoCompleteListEmailElement.innerHTML = favoriteContactEmail;
                if (favoriteContactAutoCompleteListEmailElement.innerHTML === "undefined") {
                    favoriteContactAutoCompleteListEmailElement.style.visibility = "hidden";
                };
                const favoriteContactAutoCompleteListOrganizationAndRoleElementContainer = document.createElement("div");
                favoriteContactAutoCompleteListOrganizationAndRoleElementContainer.style.display = "flex";
                favoriteContactAutoCompleteListOrganizationAndRoleElementContainer.style.justifyContent = "center";
                favoriteContactAutoCompleteListOrganizationAndRoleElementContainer.style.minWidth = "0";
                favoriteContactAutoCompleteListOrganizationAndRoleElementContainer.style.width = "100%";
                const favoriteContactAutoCompleteListOrganizationAndRoleElement = document.createElement("p");
                favoriteContactAutoCompleteListOrganizationAndRoleElement.style.fontWeight = "bolder";
                favoriteContactAutoCompleteListOrganizationAndRoleElement.style.fontSize = "smaller";
                favoriteContactAutoCompleteListOrganizationAndRoleElement.style.whiteSpace = "nowrap";
                favoriteContactAutoCompleteListOrganizationAndRoleElement.style.overflow = "hidden";
                favoriteContactAutoCompleteListOrganizationAndRoleElement.style.textOverflow = "ellipsis";
                favoriteContactAutoCompleteListOrganizationAndRoleElement.style.margin = "0";

                if (contact.organization !== null && contact.organization !== "" && contact.organization_role !== null && contact.organization_role !== "") {
                favoriteContactAutoCompleteListOrganizationAndRoleElement.innerHTML = `${contact.organization} || ${contact.organization_role}`
                } else if (contact.organization !== null && contact.organization !== "" || contact.organization_role === null && contact.organization_role === "") {
                favoriteContactAutoCompleteListOrganizationAndRoleElement.innerHTML = `${contact.organization}`
                } else if (contact.organization === null && contact.organization === "" || contact.organization_role !== null && contact.organization_role !== "") {
                favoriteContactAutoCompleteListOrganizationAndRoleElement.innerHTML = `${contact.organization_role}`
                } else {
                favoriteContactAutoCompleteListOrganizationAndRoleElement.innerHTML = "text"
                favoriteContactAutoCompleteListOrganizationAndRoleElement.style.visibility = "hidden"
                };

                const favoriteContactAutoCompleteListFavoritesStarIconContainer = document.createElement("div");
                favoriteContactAutoCompleteListFavoritesStarIconContainer.style.display = "flex";
                favoriteContactAutoCompleteListFavoritesStarIconContainer.style.justifyContent = "center";
                favoriteContactAutoCompleteListFavoritesStarIconContainer.style.alignItems = "center";
                favoriteContactAutoCompleteListFavoritesStarIconContainer.style.padding = "10px";
                const favoriteContactAutoCompleteListFavoriteStarImg = document.createElement("img");
                favoriteContactAutoCompleteListFavoriteStarImg.classList.add("contact-favorite-icon");
                favoriteContactAutoCompleteListFavoriteStarImg.style.width = "50px";
        
                favoriteContactAutoCompleteListFavoriteStarImg.setAttribute("src", "./images/star-gold-svgrepo-com.svg");
                if (contact.favorite === null || contact.favorite === false) {
                favoriteContactAutoCompleteListFavoriteStarImg.style.visibility = "hidden";
                } else {
                favoriteContactAutoCompleteListFavoriteStarImg.style.display = "block";
                };

            favoriteContactsAutoCompleteListItemImageContainer.appendChild(favoriteContactsAutoCompleteListItemImage);
            favoriteContactAutoCompleteListNameElementContainer.appendChild(favoriteContactAutoCompleteListNameElement);
            favoriteContactAutoCompleteListEmailElementContainer.appendChild(favoriteContactAutoCompleteListEmailElement);
            favoriteContactAutoCompleteListOrganizationAndRoleElementContainer.appendChild(favoriteContactAutoCompleteListOrganizationAndRoleElement)
            favoriteContactAutoCompleteListNameContainer.appendChild(favoriteContactAutoCompleteListNameElementContainer);
            favoriteContactAutoCompleteListNameContainer.appendChild(favoriteContactAutoCompleteListEmailElementContainer);
            favoriteContactAutoCompleteListNameContainer.appendChild(favoriteContactAutoCompleteListOrganizationAndRoleElementContainer);
            favoriteContactsAutoCompleteListItem.appendChild(favoriteContactsAutoCompleteListItemImageContainer);
            favoriteContactsAutoCompleteListItem.appendChild(favoriteContactAutoCompleteListNameContainer);
            favoriteContactAutoCompleteListFavoritesStarIconContainer.appendChild(favoriteContactAutoCompleteListFavoriteStarImg);
            favoriteContactsAutoCompleteListItem.appendChild(favoriteContactAutoCompleteListFavoritesStarIconContainer);
            favoriteContactsListContainer.appendChild(searchFavoriteContactsAutocompleteList)
            // searchContactsAutocompleteList.style.marginTop = "51px"
            elementsArr.push(favoriteContactsAutoCompleteListItem)
            // console.log(elementsArr)
            elementsArr.forEach(element => {
                // console.log(element)
                searchFavoriteContactsAutocompleteList.appendChild(element);
            });
        });
    };
};

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

    // const searchGroupsAutocompleteList = document.querySelector("#autocomplete-groups-list");
    const searchGroupsAutocompleteList = document.createElement("ul")
    searchGroupsAutocompleteList.setAttribute("id", "autocomplete-groups-list")
    searchGroupsAutocompleteList.style.listStyle = "none";
    // searchGroupsAutocompleteList.style.height = "100%";
    searchGroupsAutocompleteList.style.margin = "0px 0px 0px 12px";
    searchGroupsAutocompleteList.style.padding = "0px";
    // searchGroupsAutocompleteList.innerHTML = '';

    const groupsListContainer = document.createElement("div");
    groupsListContainer.setAttribute("id", "groups-list-container");
    groupsListContainer.style.position = "absolute";
    groupsListContainer.style.display = "flex";
    groupsListContainer.style.flexDirection = "column";
    groupsListContainer.style.width = "68.5%"
    groupsListContainer.style.top = "18%";
    groupsListContainer.style.left = "31.5%";
    groupsListContainer.style.visibility = "hidden";
    //  requestAnimationFrame(() => {
    //     const screenHeight = window.innerHeight;
    //     const elementHeight = screenHeight * 0.093;
    //     const roundedElementHeightStr = elementHeight.toString() + "px"

    //      console.log(screenHeight)

    //      console.log(elementHeight.toString())
         

    //     groupsListContainer.style.marginTop = roundedElementHeightStr
    // });

    // const groupsList = document.querySelector("#groups-list");
    const groupsList = document.createElement("ul");
    groupsList.setAttribute("id", "groups-list")
    groupsList.style.listStyle = "none";
    // groupsList.style.height = "100%";
    groupsList.style.margin = "0px 0px 0px 12px";
    groupsList.style.padding = "0px";
    // groupsList.style.display = "block";
    // groupsList.style.flexDirection = "row";
    // groupsList.style.justifyContent = "space-around"
    
    userGroups.forEach(group => {
        const groupListItem = document.createElement("div");
        groupListItem.setAttribute("groupId", group.group_id)
        groupListItem.setAttribute("groupName", `${group.groupname}`)
        groupListItem.setAttribute("data", `${rootUrl}/group_${group.group_id}`);
        groupListItem.classList.add("groupListItem");
        groupListItem.style.display = "inline-flex";
        groupListItem.style.flexDirection = "column";
        groupListItem.style.width = "30%";
        groupListItem.style.height = "150px";
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
            // console.log("open edit modal")
            const groupListItemEditModalHeaderElement = document.querySelector("#group-list-item-edit-modal-header-element");
            groupListItemEditModalHeaderElement.style.pointerEvents = "none";
            const largeSidepanelSearchContactsInput = document.querySelector("#search-contacts-input");
            largeSidepanelSearchContactsInput.style.pointerEvents = "none";
            const smallSidePanelNavElements = document.querySelectorAll(".smallSidebarNavElement");
            const smallSidePanelNavElementsHTMLArr = Array.from(smallSidePanelNavElements);
            const smallSidePanelNavTextElements = document.querySelectorAll(".smallSidebarNavTextElement");
            const smallSidePanelNavTextElementsHTMLArr = Array.from(smallSidePanelNavTextElements);
            // console.log(smallSidePanelNavTextElementsHTMLArr)
            // console.log(smallSidePanelNavElementsHTMLArr)
            smallSidePanelNavElementsHTMLArr.forEach(element => {
                element.addEventListener("mouseover", function() {
                    element.style.backgroundColor = "";
                        smallSidePanelNavTextElementsHTMLArr.forEach(element => {
                            element.style.color = "black"
                        });
                });
            });
            smallSidePanelNavElementsHTMLArr.forEach(element => {
                element.addEventListener("mouseout", function() {
                    element.style.backgroundColor = "";
                        smallSidePanelNavTextElementsHTMLArr.forEach(element => {
                            element.style.color = "black"
                        });
                });
            });
            // const smallSidePanelNavTextElements = document.querySelectorAll(".smallSidebarNavTextElement");
            // const smallSidePanelNavTextElementsHTMLArr = Array.from(smallSidePanelNavTextElements);
            // console.log(smallSidePanelNavTextElementsHTMLArr)
            const sidePanelContactListItems = document.querySelectorAll(".contact-list-item");
            const sidePanelContactListItemsHTMLArr = Array.from(sidePanelContactListItems)
            // console.log(sidePanelContactListItemsHTMLArr)
            sidePanelContactListItemsHTMLArr.forEach(element => {
                element.addEventListener("mouseover", function() {
                    element.style.backgroundColor = "#fcfcfc"
                });
                element.addEventListener("mouseout", function() {
                    element.style.backgroundColor = "#fcfcfc"
                });
            });
            navigateCreateGroupPageButton.style.pointerEvents = "none";
            const groupsListSearchInput = document.querySelector("#search-groups-input");
            groupsListSearchInput.style.pointerEvents = "none";
            const groupListItems = document.querySelectorAll(".groupListItem");
            const groupListItemsHTMLArr = Array.from(groupListItems);
            groupListItemsHTMLArr.forEach(element => {
                element.style.backgroundColor = "#ededed";
                element.addEventListener("mouseover", function() {
                    element.style.backgroundColor = "#ededed";
                });
                element.addEventListener("mouseout", function() {
                    element.style.backgroundColor = "#ededed";
                });
            });
            // console.log(groupListItemsHTMLArr)
            groupListItemEditModalContainer.style.display = "flex"
        });
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
        numberOfContactsInGroupElement.style.pointerEvents = "none";
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
        groupsListContainer.appendChild(groupsList)
        document.body.appendChild(groupsListContainer)
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
        groupListItemEditModalContainer.style.border = "1px solid black";
        groupListItemEditModalContainer.style.boxShadow = "2px 2px 2px";
        groupListItemEditModalContainer.style.display = "none";
        groupListItemEditModalContainer.style.padding = "10px";
        groupListItemEditModalContainer.style.zIndex = "1"
        const groupListItemEditModalHeaderContainer = document.createElement("div");
        groupListItemEditModalHeaderContainer.setAttribute("id", "group-list-item-edit-modal-header-container")
        groupListItemEditModalHeaderContainer.style.display = "flex";
        groupListItemEditModalHeaderContainer.style.justifyContent = "space-between";
        groupListItemEditModalHeaderContainer.style.alignItems = "center";
        groupListItemEditModalHeaderContainer.style.width = "100%";
        groupListItemEditModalHeaderContainer.style.height = "15%";
        groupListItemEditModalHeaderContainer.style.backgroundColor = "grey";
        groupListItemEditModalHeaderContainer.style.borderRadius = "2px"
        groupListItemEditModalHeaderContainer.style.padding = "3px";
        const groupListItemEditModalHeaderElement = document.createElement("h4");
        groupListItemEditModalHeaderElement.setAttribute("id", "group-list-item-edit-modal-header-element");
        groupListItemEditModalHeaderElement.style.margin = "0px"
        groupListItemEditModalHeaderElement.innerHTML = "Edit Group Name";
        const groupListItemEditModalCloseIcon = document.createElement("img");
        groupListItemEditModalCloseIcon.setAttribute("id", "group-list-item-modal-close-icon");
        groupListItemEditModalCloseIcon.setAttribute("src", "./images/close-md-svgrepo-com.svg");
        groupListItemEditModalCloseIcon.style.width = "20px";
        groupListItemEditModalCloseIcon.style.backgroundColor = "red";
        groupListItemEditModalCloseIcon.addEventListener("click", function() {
        const largeSidepanelSearchContactsInput = document.querySelector("#search-contacts-input");
        largeSidepanelSearchContactsInput.style.pointerEvents = "auto";
        navigateCreateGroupPageButton.style.pointerEvents = "auto";
        const smallSidePanelNavElements = document.querySelectorAll(".smallSidebarNavElement");
        const smallSidePanelNavElementsHTMLArr = Array.from(smallSidePanelNavElements);
        const smallSidePanelNavTextElements = document.querySelectorAll(".smallSidebarNavTextElement");
        const smallSidePanelNavTextElementsHTMLArr = Array.from(smallSidePanelNavTextElements);
        // console.log(smallSidePanelNavTextElementsHTMLArr)

            smallSidePanelNavElementsHTMLArr.forEach(element => {
                element.addEventListener("mouseover", function() {
                    element.style.backgroundColor = "rgb(115, 147, 179)";
                    element.children[1].style.color = "white";
                });
            });
            smallSidePanelNavElementsHTMLArr.forEach(element => {
                element.addEventListener("mouseout", function() {
                    element.style.backgroundColor = "";
                    element.children[1].style.color = "black";
                });
            });
            const sidePanelContactListItems = document.querySelectorAll(".contact-list-item");
            const sidePanelContactListItemsHTMLArr = Array.from(sidePanelContactListItems)
            // console.log(sidePanelContactListItemsHTMLArr)
            sidePanelContactListItemsHTMLArr.forEach(element => {
                element.addEventListener("mouseover", function() {
                    element.style.backgroundColor = "lightgreen"
                });
                element.addEventListener("mouseout", function() {
                    element.style.backgroundColor = "#fcfcfc"
                });
            });
            const groupsListSearchInput = document.querySelector("#search-groups-input");
            groupsListSearchInput.style.pointerEvents = "auto";
            const groupListItems = document.querySelectorAll(".groupListItem");
            const groupListItemsHTMLArr = Array.from(groupListItems);
            groupListItemsHTMLArr.forEach(element => {
                element.addEventListener("mouseover", function() {
                    element.style.backgroundColor = "lightgreen";
                });
                element.addEventListener("mouseout", function() {
                    element.style.backgroundColor = "#ededed";
                });
            });
            groupListItemEditModalContainer.style.display = "none";
        });
        const groupListItemEditModalInputContainer = document.createElement("div");
        groupListItemEditModalInputContainer.setAttribute("id", "group-list-item-edit-modal-input-container")
        groupListItemEditModalInputContainer.style.display = "flex";
        groupListItemEditModalInputContainer.style.flexDirection = "column";
        groupListItemEditModalInputContainer.style.height = "50%";
        groupListItemEditModalInputContainer.style.marginTop = "20px";
        groupListItemEditModalInputContainer.style.padding = "3px";
        const groupListItemEditModalInputLabelElement = document.createElement("label");
        groupListItemEditModalInputLabelElement.setAttribute("id", "group-list-item-edit-modal-input-label-element")
        groupListItemEditModalInputLabelElement.style.fontWeight = "bold";
        groupListItemEditModalInputLabelElement.innerHTML = "Enter Name";
        const groupListItemEditModalInputElement = document.createElement("input");
        groupListItemEditModalInputElement.setAttribute("id", "group-list-item-edit-modal-input-element");
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
                && event.target.id !== "group-list-item-modal-close-icon"
            ) {
                // groupListItemEditModalContainer.style.display = "none";
                event.stopPropagation()
                event.preventDefault()
            }
        }, {capture: true});

    groupListItemEditModalButtonElement.addEventListener("click", function(event) {
        console.log(event.target)
    })

    const searchGroupsElement = document.querySelector("#search-groups-input");
    searchGroupsElement.addEventListener("input", groupsAutocompleteSearch)
    async function groupsAutocompleteSearch() {
    const groupsList = document.querySelector("#groups-list");
    let searchGroupsInputValue = searchGroupsElement.value.toLowerCase().trimEnd();
    let filteredGroups = [];

    
    // // const searchGroupsAutocompleteList = document.querySelector("#autocomplete-groups-list");
    // const searchGroupsAutocompleteList = document.createElement("ul")
    // searchGroupsAutocompleteList.setAttribute("id", "autocomplete-groups-list")
    // searchGroupsAutocompleteList.style.listStyle = "none";
    // // searchGroupsAutocompleteList.style.height = "100%";
    // searchGroupsAutocompleteList.style.margin = "0px";
    // searchGroupsAutocompleteList.style.padding = "0px";
    // // searchGroupsAutocompleteList.innerHTML = '';

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

    // const searchGroupsAutocompleteList = document.querySelector("#autocomplete-groups-list");

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
            groupsAutoCompleteListItem.classList.add("groupListItem")
            groupsAutoCompleteListItem.setAttribute("groupId", group.group_id)
            groupsAutoCompleteListItem.setAttribute("groupName", `${group.groupname}`)
            groupsAutoCompleteListItem.setAttribute("data", `${rootUrl}/group_${group.group_id}`);
            groupsAutoCompleteListItem.setAttribute("groupId", group.group_id)
            groupsAutoCompleteListItem.style.display = "inline-flex";
            groupsAutoCompleteListItem.style.flexDirection = "column";
            groupsAutoCompleteListItem.style.width = "30%";
            groupsAutoCompleteListItem.style.height = "150px";
            groupsAutoCompleteListItem.style.margin = "10px 10px 10px 10px";
            groupsAutoCompleteListItem.style.backgroundColor = "#ededed"
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
                // console.log("open edit modal")
                const largeSidepanelSearchContactsInput = document.querySelector("#search-contacts-input");
                largeSidepanelSearchContactsInput.style.pointerEvents = "none";
                const smallSidePanelNavElements = document.querySelectorAll(".smallSidebarNavElement");
                const smallSidePanelNavElementsHTMLArr = Array.from(smallSidePanelNavElements);
                const smallSidePanelNavTextElements = document.querySelectorAll(".smallSidebarNavTextElement");
                const smallSidePanelNavTextElementsHTMLArr = Array.from(smallSidePanelNavTextElements);
                // console.log(smallSidePanelNavTextElementsHTMLArr)
                // console.log(smallSidePanelNavElementsHTMLArr)
                smallSidePanelNavElementsHTMLArr.forEach(element => {
                    element.addEventListener("mouseover", function() {
                        element.style.backgroundColor = "";
                            smallSidePanelNavTextElementsHTMLArr.forEach(element => {
                                element.style.color = "black"
                            });
                    });
                });
                smallSidePanelNavElementsHTMLArr.forEach(element => {
                    element.addEventListener("mouseout", function() {
                        element.style.backgroundColor = "";
                            smallSidePanelNavTextElementsHTMLArr.forEach(element => {
                                element.style.color = "black"
                            });
                    });
                });
                const sidePanelContactListItems = document.querySelectorAll(".contact-list-item");
                const sidePanelContactListItemsHTMLArr = Array.from(sidePanelContactListItems)
                // console.log(sidePanelContactListItemsHTMLArr)
                sidePanelContactListItemsHTMLArr.forEach(element => {
                    element.addEventListener("mouseover", function() {
                        element.style.backgroundColor = "#fcfcfc"
                    });
                    element.addEventListener("mouseout", function() {
                        element.style.backgroundColor = "#fcfcfc"
                    });
                });
                navigateCreateGroupPageButton.style.pointerEvents = "none";
                const groupsListSearchInput = document.querySelector("#search-groups-input");
                groupsListSearchInput.style.pointerEvents = "none";
                const groupListItems = document.querySelectorAll(".groupListItem");
                const groupListItemsHTMLArr = Array.from(groupListItems);
                groupListItemsHTMLArr.forEach(element => {
                    element.style.backgroundColor = "#ededed";
                    element.addEventListener("mouseover", function() {
                        element.style.backgroundColor = "#ededed";
                    });
                    element.addEventListener("mouseout", function() {
                        element.style.backgroundColor = "#ededed";
                    });
                });
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
        autoCompleteNumberOfContactsInGroupElement.style.pointerEvents = "none";
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
           
            searchGroupsAutocompleteList.appendChild(groupsAutoCompleteListItem);
        });
    };
    groupsListContainer.appendChild(searchGroupsAutocompleteList)

    groupListItemEditModalButtonElement.addEventListener("click", editUserGroup)

    const navigateCreateGroupPageButton = document.querySelector("#navigate-create-group-page-button")
    navigateCreateGroupPageButton.addEventListener("click", function() {
        window.location.href = `${rootUrl}/create-group`
    })
};

async function renderMobileGroupsListContent() {
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

    // const searchGroupsAutocompleteList = document.querySelector("#autocomplete-groups-list");
    const searchGroupsAutocompleteList = document.createElement("ul")
    searchGroupsAutocompleteList.setAttribute("id", "mobile-autocomplete-groups-list");
    searchGroupsAutocompleteList.style.display = "flex";
    searchGroupsAutocompleteList.style.flexDirection = "column";
    searchGroupsAutocompleteList.style.alignItems = "center";
    searchGroupsAutocompleteList.style.listStyle = "none";
    // searchGroupsAutocompleteList.style.height = "100%";
    searchGroupsAutocompleteList.style.margin = "0px";
    searchGroupsAutocompleteList.style.padding = "0px";
    // searchGroupsAutocompleteList.innerHTML = '';

    const groupsListContainer = document.createElement("div");
    // const groupsListContainer = document.querySelector("#groups-list-container");
    groupsListContainer.style.position = "absolute";
    groupsListContainer.style.display = "flex";
    groupsListContainer.style.flexDirection = "column";
    groupsListContainer.style.width = "100%"
    groupsListContainer.style.top = "18%";
    // groupsListContainer.style.left = "50%";

    //  requestAnimationFrame(() => {
    //     const groupsListContainer = document.querySelector("#mobile-groups-list-container");
    //     const screenHeight = window.innerHeight;
    //     const elementHeight = screenHeight * 0.093;
    //     const roundedElementHeightStr = elementHeight.toString() + "px"

    //      console.log(screenHeight)

    //      console.log(elementHeight.toString())
         

    //     groupsListContainer.style.marginTop = roundedElementHeightStr
    // });

    const groupsList = document.createElement("ul");
    groupsList.setAttribute("id", "mobile-groups-list")
    groupsList.style.listStyle = "none";
    // groupsList.style.height = "100%";
    groupsList.style.margin = "0px";
    groupsList.style.padding = "0px";
    groupsList.style.display = "flex";
    groupsList.style.flexDirection = "column";
    groupsList.style.alignItems = "center";
    // groupsList.style.justifyContent = "space-around"
    
    userGroups.forEach(group => {
        const groupListItem = document.createElement("div");
        groupListItem.setAttribute("groupId", group.group_id)
        groupListItem.setAttribute("mobileGroupName", `${group.groupname}`)
        groupListItem.setAttribute("data", `${rootUrl}/group_${group.group_id}`);
        groupListItem.style.display = "inline-flex";
        groupListItem.style.flexDirection = "column";
        groupListItem.style.width = "210px";
        groupListItem.style.height = "145px";
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
            if (event.target.id === "mobile-group-list-item-edit-icon") {
                event.preventDefault()
                return
            };

            if (event.target.id === "mobile-group-list-item-delete-icon") {
                event.preventDefault()
                return
            };

            const groupListItemEditModalContainer = document.querySelector("#mobile-group-list-item-edit-modal-container")
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
                    name: groupListItem.getAttribute("mobileGroupName"),
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
        groupListItemEditIcon.setAttribute("id", "mobile-group-list-item-edit-icon")
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
        groupListItemTextElement.setAttribute("id", "mobile-group-list-item-text-element");
        groupListItemTextElement.style.margin = "0px"
        groupListItemTextElement.innerHTML = group.groupname;
        const groupListItemDeleteIcon = document.createElement("img");
        groupListItemDeleteIcon.setAttribute("id", "mobile-group-list-item-delete-icon")
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
        groupsList.appendChild(groupListItem);
        groupsListContainer.appendChild(groupsList)
        document.body.appendChild(groupsListContainer);
    });

    const groupsListViewElement = document.querySelector("#mobile-groups-list-view")
        const groupListItemEditModalContainer = document.createElement("div");
        groupListItemEditModalContainer.setAttribute("id", "mobile-group-list-item-edit-modal-container");
        groupListItemEditModalContainer.classList.add("edit-inactive");
        groupListItemEditModalContainer.style.position = "absolute";
        groupListItemEditModalContainer.style.flexDirection = "column";
        groupListItemEditModalContainer.style.width = "40%";
        groupListItemEditModalContainer.style.height = "25%";
        groupListItemEditModalContainer.style.top = "40%";
        groupListItemEditModalContainer.style.left = "50%";
        groupListItemEditModalContainer.style.transform = "translate(-50%, -50%)"
        groupListItemEditModalContainer.style.backgroundColor = "lightgrey";
        groupListItemEditModalContainer.style.border = "1px solid black";
        groupListItemEditModalContainer.style.boxShadow = "2px 2px 2px";
        groupListItemEditModalContainer.style.display = "none";
        groupListItemEditModalContainer.style.padding = "10px";
        groupListItemEditModalContainer.style.zIndex = "1"

    window.addEventListener('scroll', function() {
        let scrollYPosition = this.window.pageYOffset;
        let windowHeight = this.window.innerHeight;
        let viewportCenterY = windowHeight / 2;
        let pageCenterY = scrollYPosition + viewportCenterY;
        // console.log(pageCenterY)

        groupListItemEditModalContainer.style.top = pageCenterY.toString() + 'px'
    });

        const groupListItemEditModalHeaderContainer = document.createElement("div");
        groupListItemEditModalHeaderContainer.setAttribute("id", "mobile-group-list-item-edit-modal-header-container")
        groupListItemEditModalHeaderContainer.style.display = "flex";
        groupListItemEditModalHeaderContainer.style.justifyContent = "space-between";
        groupListItemEditModalHeaderContainer.style.alignItems = "center";
        groupListItemEditModalHeaderContainer.style.width = "100%";
        groupListItemEditModalHeaderContainer.style.height = "15%";
        groupListItemEditModalHeaderContainer.style.backgroundColor = "grey";
        groupListItemEditModalHeaderContainer.style.borderRadius = "2px"
        groupListItemEditModalHeaderContainer.style.padding = "3px";
        const groupListItemEditModalHeaderElement = document.createElement("h4");
        groupListItemEditModalHeaderElement.setAttribute("id", "mobile-group-list-item-edit-modal-header-element");
        groupListItemEditModalHeaderElement.style.margin = "0px"
        groupListItemEditModalHeaderElement.innerHTML = "Edit Group Name";
        const groupListItemEditModalCloseIcon = document.createElement("img");
        groupListItemEditModalCloseIcon.setAttribute("src", "./images/close-md-svgrepo-com.svg");
        groupListItemEditModalCloseIcon.style.width = "20px";
        groupListItemEditModalCloseIcon.style.backgroundColor = "red";
        groupListItemEditModalCloseIcon.addEventListener("click", function() {
            groupListItemEditModalContainer.style.display = "none";
        });
        const groupListItemEditModalInputContainer = document.createElement("div");
        groupListItemEditModalInputContainer.setAttribute("id", "mobile-group-list-item-edit-modal-input-container")
        groupListItemEditModalInputContainer.style.display = "flex";
        groupListItemEditModalInputContainer.style.flexDirection = "column";
        groupListItemEditModalInputContainer.style.height = "50%";
        groupListItemEditModalInputContainer.style.marginTop = "20px";
        groupListItemEditModalInputContainer.style.padding = "3px";
        const groupListItemEditModalInputLabelElement = document.createElement("label");
        groupListItemEditModalInputLabelElement.setAttribute("id", "mobile-group-list-item-edit-modal-input-label-element")
        groupListItemEditModalInputLabelElement.style.fontWeight = "bold";
        groupListItemEditModalInputLabelElement.innerHTML = "Enter Name";
        const groupListItemEditModalInputElement = document.createElement("input");
        groupListItemEditModalInputElement.setAttribute("id", "mobile-group-list-item-edit-modal-input-element");
        const groupListItemEditModalButtonContainer = document.createElement("div");
        groupListItemEditModalButtonContainer.setAttribute("id", "mobile-group-list-item-edit-modal-button-container");
        groupListItemEditModalButtonContainer.style.display = "flex";
        groupListItemEditModalButtonContainer.style.justifyContent = "flex-end";
        groupListItemEditModalButtonContainer.style.width = "100%";
        groupListItemEditModalButtonContainer.style.height = "15%";
        const groupListItemEditModalButtonElement = document.createElement("button");
        groupListItemEditModalButtonElement.setAttribute("id", "mobile-group-list-item-edit-modal-button-element")
        groupListItemEditModalButtonElement.innerHTML = "Done";
        groupListItemEditModalHeaderContainer.appendChild(groupListItemEditModalHeaderElement);
        groupListItemEditModalHeaderContainer.appendChild(groupListItemEditModalCloseIcon);
        groupListItemEditModalInputContainer.appendChild(groupListItemEditModalInputLabelElement);
        groupListItemEditModalInputContainer.appendChild(groupListItemEditModalInputElement);
        groupListItemEditModalButtonContainer.appendChild(groupListItemEditModalButtonElement);
        groupListItemEditModalContainer.appendChild(groupListItemEditModalHeaderContainer);
        groupListItemEditModalContainer.appendChild(groupListItemEditModalInputContainer);
        groupListItemEditModalContainer.appendChild(groupListItemEditModalButtonContainer)
        document.body.appendChild(groupListItemEditModalContainer)
        
        window.addEventListener("click", function(event) {
            if (groupListItemEditModalContainer.style.display !== "none" && event.target.id !== 
                "mobile-group-list-item-edit-icon" && event.target.id !== "mobile-group-autocomplete-list-item-edit-icon" 
                && event.target.id !== "mobile-group-list-item-edit-modal-container" 
                && event.target.id !== "mobile-group-list-item-edit-modal-header-container"
                && event.target.id !== "mobile-group-list-item-edit-modal-header-element" 
                && event.target.id !== "mobile-group-list-item-edit-modal-input-container"
                && event.target.id !== "mobile-group-list-item-edit-modal-input-label-element"
                && event.target.id !== "mobile-group-list-item-edit-modal-input-element"
                && event.target.id !== "mobile-group-list-item-edit-modal-button-container"
                && event.target.id !== "mobile-group-list-item-edit-modal-button-element"
            ) {
                groupListItemEditModalContainer.style.display = "none";
            }
        })

    groupListItemEditModalButtonElement.addEventListener("click", function(event) {
        console.log(event.target)
    })

    const searchGroupsElement = document.querySelector("#mobile-search-groups-input");
    searchGroupsElement.addEventListener("input", groupsAutocompleteSearch)
    async function groupsAutocompleteSearch() {
    const groupsList = document.querySelector("#mobile-groups-list");
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

    // const searchGroupsAutocompleteList = document.querySelector("#mobile-autocomplete-groups-list");

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
        searchGroupsAutocompleteList.style.display = 'flex';
        groupsList.style.display = "none"
        uniqueArray.forEach(group => {
            const groupsAutoCompleteListItem = document.createElement('div');
            groupsAutoCompleteListItem.setAttribute("groupId", group.group_id)
            groupsAutoCompleteListItem.setAttribute("mobileGroupName", `${group.groupname}`)
            groupsAutoCompleteListItem.setAttribute("data", `${rootUrl}/group_${group.group_id}`);
            groupsAutoCompleteListItem.setAttribute("groupId", group.group_id)
            groupsAutoCompleteListItem.style.display = "inline-flex";
            groupsAutoCompleteListItem.style.flexDirection = "column";
            groupsAutoCompleteListItem.style.width = "210px";
            groupsAutoCompleteListItem.style.height = "145px";
            groupsAutoCompleteListItem.style.margin = "10px 10px 10px 10px";
            groupsAutoCompleteListItem.style.backgroundColor = "#ededed";
            groupsAutoCompleteListItem.style.border = "2px solid black";

        groupsAutoCompleteListItem.addEventListener("mouseover", function() {
            groupsAutoCompleteListItem.style.backgroundColor = "lightgreen"
        });
        
        groupsAutoCompleteListItem.addEventListener("mouseout", function() {
            groupsAutoCompleteListItem.style.backgroundColor = "#ededed"
        });

            groupsAutoCompleteListItem.addEventListener("click", (event) => {

            if (event.target.id === "mobile-group-autocomplete-list-item-edit-icon") {
                event.preventDefault()
                return
            };

                if (event.target.id === "mobile-group-autocomplete-list-item-delete-icon") {
                event.preventDefault()
                return
            };

            const groupListItemEditModalContainer = document.querySelector("#mobile-group-list-item-edit-modal-container")
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
                    name: groupsAutoCompleteListItem.getAttribute("mobileGroupName"),
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
            groupAutoCompleteListItemEditIcon.setAttribute("id", "mobile-group-autocomplete-list-item-edit-icon")
            groupAutoCompleteListItemEditIcon.setAttribute("src", "./images/edit-svgrepo-com.svg")
            groupAutoCompleteListItemEditIcon.style.width = "20px"
            const groupListItemEditModalContainer = document.querySelector("#mobile-group-list-item-edit-modal-container")
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
            groupAutoCompleteListItemDeleteIcon.setAttribute("id", "mobile-group-autocomplete-list-item-delete-icon")
            groupAutoCompleteListItemDeleteIcon.setAttribute("src", "./images/delete-2-svgrepo-com.svg")
            groupAutoCompleteListItemDeleteIcon.style.width = "20px"
            groupAutoCompleteListItemDeleteIcon.addEventListener("click", function() {
                mobileDeleteUserGroup(group.group_id)
                mobileDeleteContactGrouping(group.group_id)
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

    groupsListContainer.appendChild(searchGroupsAutocompleteList)

    groupListItemEditModalButtonElement.addEventListener("click", mobileEditUserGroup)

    const mobileNavigateCreateGroupsPageButton = document.querySelector("#mobile-navigate-create-group-page-button");
    mobileNavigateCreateGroupsPageButton.addEventListener("click", function() {
        window.location.href = `${rootUrl}/create-group`
    })
}

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

async function mobileHandleEditGroupNameInput() {
    const allUsers = await getAllUsers();
    const sessionId = sessionStorage.getItem("user");
    let matchingUser;
    for (let i = 0; i < allUsers.length; i++) {
        if (allUsers[i].session_id === sessionId) {
            matchingUser = allUsers[i]
        }
    }
    const userId = matchingUser.user_id;
    const groupListItemEditModalInputElement = document.querySelector("#mobile-group-list-item-edit-modal-input-element");
    const groupListItemEditModalInputElementValue = groupListItemEditModalInputElement.value;
    console.log(groupListItemEditModalInputElementValue)

        const groupsList = document.querySelector("#mobile-groups-list");
        const groupsListChildren = groupsList.children;
        const groupsListArr = Array.from(groupsListChildren)
        const searchGroupsAutocompleteList = document.querySelector("#mobile-autocomplete-groups-list");
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
    const allUsers = await getAllUsers(); //correct
    const sessionId = sessionStorage.getItem("user"); //correct
    const currentUrl = window.location.href.toString();
    let matchingUser; //correct
    for (let i = 0; i < allUsers.length; i++) { //correct
        if (allUsers[i].session_id === sessionId) { //correct
            matchingUser = allUsers[i] //correct
        } //correct
    } //correct
    const userId = matchingUser.user_id; //correct
    const user = await getUser(userId); //correct
    const userContacts = await getUserContacts(userId); //correct
    // const allUserContacts = await getUserContacts(userId); //fine
    for (let i = 0; i < userContacts.length; i++) { //correct
        const contactId = userContacts[i].contact_id //correct
        const contactImage = await getAContactImage(userId, contactId); //correct
        const contactEmailAddresses = await getAContactEmailAddresses(userId, contactId) //correct
        const contactEmailObj = contactEmailAddresses[0]; //correct
        let contactEmail; //correct
        if (contactEmailObj !== undefined) { //correct
            contactEmail = contactEmailObj.emailaddress; //correct
        } //correct
        // console.log(contactEmail)
        const contactImageStr = `data:${contactImage.contentType};base64,${contactImage.image}` //correct
        userContacts[i]["email"] = contactEmail; //correct
        userContacts[i]["imageString"] = contactImageStr; //correct
    }; //correct

    //code below fine
    const userGroupContacts = await getUserContactGroupings(userId);
    const groupIdUrl = currentUrl.split("group_")[1];
    const queryCharIndex = groupIdUrl.indexOf("?")
    const groupId = Number(groupIdUrl.slice(0, queryCharIndex));
    const group = await getAUserGroup(userId, groupId)

    const groupContacts = [];
    for (let i = 0; i < userGroupContacts.length; i++) {
        if (userGroupContacts[i].group_id === groupId) {
            groupContacts.push(userGroupContacts[i])
        }
    };

    // console.log(groupContacts)

    const finalGroupContacts = []
    groupContacts.forEach(contact => {
        // console.log(allUserContacts)
        for (let i = 0; i < userContacts.length; i++) {
            if (userContacts[i].contact_id === contact.contact_id) {
                finalGroupContacts.push(userContacts[i])
            }
        }
    })

    // console.log(finalGroupContacts)

    const userImage = await getAUserImage(userId);
    const imageString = `data:${userImage.contentType};base64,${userImage.image}`
    const groupsContactsListUserImage = document.querySelector("#groups-contacts-list-user-image");
    groupsContactsListUserImage.setAttribute("src", imageString);
    groupsContactsListUserImage.style.borderRadius = "50%";

    const groupsContactsListUserHeaderNameContainer = document.querySelector("#groups-contacts-list-user-header-name-container");
    // groupContactsUserHeaderNameContainer.style.margin = "0px 0px 0px 10px"
    const groupsContactsListHeaderUserNameElement = document.querySelector("#groups-contacts-list-header-user-name");
    groupsContactsListHeaderUserNameElement.style.margin = "0px";
    const groupsContactsListHeaderUserEmailAddressElement = document.querySelector("#groups-contacts-list-header-user-email");
    // groupsContactsHeaderUserEmailAddressElement.style.margin = "0px 0px 16px 0px";

    const groupsContactsListUserNameElement = document.querySelector("#groups-contacts-list-user-name");
    groupsContactsListUserNameElement.style.margin = "0px";
    const groupsContactsListUserEmailAddressElement = document.querySelector("#groups-contacts-list-user-email");
    groupsContactsListUserEmailAddressElement.style.margin = "0px";
    groupsContactsListUserNameElement.innerHTML = `${group.groupname} Contacts`;
    // contactsUserNameElement.style.fontSize = "xx-large"
    groupsContactsListUserNameElement.style.fontFamily = "Arial";
    // contactsUserEmailAddressElement.innerHTML = `${user.emailaddress}`

    groupsContactsListHeaderUserNameElement.innerHTML = `${matchingUser.firstname} ${matchingUser.lastname}`;
    groupsContactsListHeaderUserEmailAddressElement.innerHTML = matchingUser.emailaddress;

    const groupContactsListContainer = document.createElement("div");
    groupContactsListContainer.setAttribute("id", "group-contacts-list-container");
    groupContactsListContainer.style.visibility = "hidden";
    const groupContactsHeaderContainer = document.createElement("div");
    groupContactsHeaderContainer.style.display = "flex";
    groupContactsHeaderContainer.style.alignItems = "center";
    groupContactsHeaderContainer.style.backgroundColor = "ghostwhite";
    groupContactsHeaderContainer.style.borderTop = "3px solid black";
    groupContactsHeaderContainer.style.borderBottom = "3px solid black";
    groupContactsHeaderContainer.style.padding = "5px";
    const groupContactsHeaderElementsContainer = document.createElement("div");
    groupContactsHeaderElementsContainer.style.display = "flex";
    groupContactsHeaderElementsContainer.style.justifyContent = "space-between";
    groupContactsHeaderElementsContainer.style.alignItems = "center";
    groupContactsHeaderElementsContainer.style.width = "100%";
    groupContactsHeaderElementsContainer.style.height = "100%";
    const myGroupContactsHeaderElementsContainer = document.createElement("div");
    myGroupContactsHeaderElementsContainer.style.display = "flex"
    myGroupContactsHeaderElementsContainer.style.alignItems = "center";
    myGroupContactsHeaderElementsContainer.style.width = "33%";
    const myGroupContactsHeaderElement = document.createElement("h2");
    myGroupContactsHeaderElement.innerHTML = `${group.groupname} Contacts`;
    myGroupContactsHeaderElement.style.width = "140px";
    myGroupContactsHeaderElement.style.margin = "0";
    myGroupContactsHeaderElement.style.marginLeft = "5px";
    const numberOfGroupContactsElement = document.createElement("h2");
    numberOfGroupContactsElement.innerHTML = finalGroupContacts.length;
    numberOfGroupContactsElement.style.display = "inline-flex";
    numberOfGroupContactsElement.style.justifyContent = "center";
    numberOfGroupContactsElement.style.alignItems = "center";
    numberOfGroupContactsElement.style.width = "15px";
    numberOfGroupContactsElement.style.height = "15px";
    numberOfGroupContactsElement.style.backgroundColor = "navy";
    numberOfGroupContactsElement.style.color = "white";
    numberOfGroupContactsElement.style.padding = "10px";
    numberOfGroupContactsElement.style.borderRadius = "50%";
    numberOfGroupContactsElement.style.margin = "0";
    const searchMyGroupContactsElementContainer = document.createElement("div");
    searchMyGroupContactsElementContainer.style.display = "flex";
    searchMyGroupContactsElementContainer.style.justifyContent = "center";
    searchMyGroupContactsElementContainer.style.width = "34%";
    const searchMyGroupContactsElement = document.createElement("input");
    searchMyGroupContactsElement.setAttribute("id", "search-my-group-contacts-input");
    searchMyGroupContactsElement.name = "search-my-group-contacts"
    searchMyGroupContactsElement.type = "search";
    searchMyGroupContactsElement.placeholder = `Search ${group.groupname} Contacts`;
    searchMyGroupContactsElement.style.width = "100%";
    searchMyGroupContactsElement.style.height = "22.5px";
    searchMyGroupContactsElement.style.border = "1px solid black";
    searchMyGroupContactsElement.style.textIndent = "20px";
    searchMyGroupContactsElement.style.backgroundImage = "url(./images/search-svgrepo-com.svg)";
    searchMyGroupContactsElement.style.backgroundRepeat = "no-repeat";
    searchMyGroupContactsElement.style.backgroundSize = "16px";
    searchMyGroupContactsElement.style.backgroundPositionY = "2px";
    searchMyGroupContactsElement.style.backgroundPositionX = "0.8%";
    searchMyGroupContactsElement.style.outline = "none";
    const myGroupContactsHeaderElementsSpacingContainer = document.createElement("div");
    myGroupContactsHeaderElementsSpacingContainer.style.display = "flex";
    myGroupContactsHeaderElementsSpacingContainer.style.alignItems = "center";
    myGroupContactsHeaderElementsSpacingContainer.style.width = "33%";
    groupContactsListContainer.style.position = "absolute";
    groupContactsListContainer.style.top = "28.5%";
    groupContactsListContainer.style.left = "31.5%";
    groupContactsListContainer.style.width = "68.5%";
    const groupContactsList = document.createElement("ul");
    groupContactsList.setAttribute("id", "group-contacts-list");
    groupContactsList.style.listStyle = "none";
    groupContactsList.style.padding = "0";
    groupContactsList.style.margin = "0";

    // finalGroupContacts.sort(function(a, b) {
    //     if (a.firstname < b.firstname) {
    //         return -1;
    //     }
    //     if (a.firstname < b.firstname) {
    //         return 1;
    //     }
        
    //     var aFirstChar = a.firstname.charAt(0);
    //     var bFirstChar = b.firstname.charAt(0);
    //     if (aFirstChar > bFirstChar) {
    //       return 1;
    //     } else if (aFirstChar < bFirstChar) {
    //       return -1;
    //     } else {
    //       var aLastChar = a.lastname.charAt(0);
    //       var bLastChar = b.lastname.charAt(0);
    //       if (aLastChar === "") {
    //         aLastChar = "z"
    //       }
    //       if (bLastChar === "") {
    //         bLastChar = "z"
    //       }
    //       if (aLastChar > bLastChar) {
    //         return 1;
    //       } else if (aLastChar < bLastChar) {
    //         return -1;
    //       } else {
    //         return 0;
    //       }    
    //     }
    //   });

    finalGroupContacts.sort(function(a, b) { //correct
        const nameA = `${a.firstname} ${a.lastname}`; //correct
        const nameB = `${b.firstname} ${b.lastname}`; //correct
        return nameA.localeCompare(nameB); //correct
      }); //correct

    finalGroupContacts.forEach(contact => { //correct
        const groupContactListItem = document.createElement("div"); //correct
        groupContactListItem.style.display = "flex"; //correct
        groupContactListItem.style.flexDirection = "row"; //correct
        groupContactListItem.style.height = "70px"; //correct
        groupContactListItem.style.borderTop = "2px solid black"; //correct
        groupContactListItem.style.borderBottom = "2px solid black"; //correct
        groupContactListItem.style.backgroundColor = "#fcfcff"; //correct
        groupContactListItem.style.marginTop = "1px"; //correct
        groupContactListItem.style.marginBottom = "1px"; //correct
        groupContactListItem.setAttribute("contactId", contact.contact_id) //correct

        //code through click event is correct
        groupContactListItem.addEventListener("mouseover", function() { //correct
            groupContactListItem.style.backgroundColor = "lightgreen"; //correct
        });

        groupContactListItem.addEventListener("mouseout", function() { //correct
            groupContactListItem.style.backgroundColor = "#fcfcff"; //correct
        });

        groupContactListItem.addEventListener("click", function(event) {
                
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

        const groupContactListItemImageContainer = document.createElement("div"); //correct
        groupContactListItemImageContainer.style.display = "flex"; //correct
        groupContactListItemImageContainer.style.alignItems = "center"; //correct
        groupContactListItemImageContainer.style.padding = "10px"; //correct
        const groupContactListItemImage = document.createElement("img"); //correct
        groupContactListItemImage.style.width = "57px"; //correct
        groupContactListItemImage.style.height = "57px"; //correct
        groupContactListItemImage.style.border = "0.5px solid grey"; //correct
        groupContactListItemImage.style.borderRadius = "50%"; //correct
        groupContactListItemImage.style.backgroundColor = "gainsboro"; //correct
        groupContactListItemImage.style.border = "1px solid black"; //correct
        groupContactListItemImage.style.objectFit = "cover"; //correct
        groupContactListItemImage.setAttribute("src", contact.imageString) //correct
        const contact_id = contact.contact_id;
        // const contactImage = await getAContactImage(userId, contact_id)
        // const imageString = `data:${contactImage.contentType};base64,${contactImage.image}`
        // groupContactListItemImage.setAttribute("src", imageString);
        // groupContactListItemImage.style.borderRadius = "50%";

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
        groupContactListEmailElement.style.fontStyle = "italic";
        groupContactListEmailElement.style.fontSize = "small";
        groupContactListEmailElement.style.margin = "0";
        const contactEmail = contact.emailaddress;
        groupContactListEmailElement.innerHTML = contactEmail;
        //code above is correct        

        const groupContactListOrganizationAndRoleElement = document.createElement("p"); //correct
        groupContactListOrganizationAndRoleElement.style.fontWeight = "bolder"; //correct
        groupContactListOrganizationAndRoleElement.style.fontSize = "smaller"; //correct
        groupContactListOrganizationAndRoleElement.style.margin = "0"; //correct
    
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
        //code above is correct

        const contactListFavoritesStarIconContainer = document.createElement("div");
        contactListFavoritesStarIconContainer.style.display = "flex";
        contactListFavoritesStarIconContainer.style.justifyContent = "center";
        contactListFavoritesStarIconContainer.style.alignItems = "center"
        contactListFavoritesStarIconContainer.style.padding = "10px"
        const contactListFavoriteStarImg = document.createElement("img");
        contactListFavoriteStarImg.classList.add("contact-favorite-icon")
        contactListFavoriteStarImg.style.width = "50px"
        //code above is correct
        
        contactListFavoriteStarImg.setAttribute("src", "./images/star-gold-svgrepo-com.svg");
        if (contact.favorite === null || contact.favorite === false) {
            contactListFavoriteStarImg.style.visibility = "hidden"
        } else {
            contactListFavoriteStarImg.style.display = "block"
        }
        //code above is correct

        requestAnimationFrame(() => {
            const ellipsis = '...'

            const groupContactListNameElementWidth = groupContactListNameElement.clientWidth; //correct
            const groupContactListNameElementText = groupContactListNameElement.innerHTML; //correct
            const groupContactListNameElementTextLength = groupContactListNameElementText.length; //correct
            const groupContactListNameElementTextSlice = groupContactListNameElementText.slice(0, 22); //correct
            const secondGroupContactListNameElementTextSlice = groupContactListNameElementText.slice(0, 26); //correct
            const thirdGroupContactListNameElementTextSlice = groupContactListNameElementText.slice(0, 21); //correct
            const fourthGroupContactListNameElementTextSlice = groupContactListNameElementText.slice(0, 16); //correct
            const groupContactListEmailElementWidth = groupContactListEmailElement.clientWidth; //correct
            const groupContactListEmailElementText = groupContactListEmailElement.innerHTML; //correct
            const groupContactListEmailElementTextLength = groupContactListEmailElementText.length; //correct
            const groupContactListEmailElementTextSlice = groupContactListEmailElementText.slice(0, 38); //correct
            const groupContactListEmailElementSecondSlice = groupContactListEmailElementText.slice(0, 50); //correct
            const groupContactListOrganizationAndRoleElementWidth = groupContactListOrganizationAndRoleElement.clientWidth
            const groupContactListOrganizationAndRoleElementText = groupContactListOrganizationAndRoleElement.innerHTML; //correct
            const groupContactListOrganizationAndRoleElementTextLength = groupContactListOrganizationAndRoleElementText.length; //correct
            const groupContactListOrganizationAndRoleElementTextSlice = groupContactListOrganizationAndRoleElementText.slice(0, 35); //correct

            if (groupContactListNameElementTextLength > 22) {
                groupContactListNameElement.innerHTML = groupContactListNameElementTextSlice + ellipsis;
            };

            if (groupContactListEmailElementTextLength > 38) {
                groupContactListEmailElement.innerHTML = groupContactListEmailElementTextSlice + ellipsis;
            };

            if (groupContactListOrganizationAndRoleElementTextLength > 35) {
                groupContactListOrganizationAndRoleElement.innerHTML = groupContactListOrganizationAndRoleElementTextSlice + ellipsis;
            };
        });
        //code above is correct
        
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
    myGroupContactsHeaderElementsContainer.appendChild(myGroupContactsHeaderElement);
    myGroupContactsHeaderElementsContainer.appendChild(numberOfGroupContactsElement);
    groupContactsHeaderElementsContainer.appendChild(myGroupContactsHeaderElementsContainer);
    searchMyGroupContactsElementContainer.appendChild(searchMyGroupContactsElement);
    groupContactsHeaderElementsContainer.appendChild(searchMyGroupContactsElementContainer);
    groupContactsHeaderElementsContainer.appendChild(myGroupContactsHeaderElementsSpacingContainer);
    groupContactsHeaderContainer.appendChild(groupContactsHeaderElementsContainer);
    groupContactsListContainer.appendChild(groupContactsHeaderContainer);
    groupContactsListContainer.appendChild(groupContactsList);
    document.body.appendChild(groupContactsListContainer)

    // console.log(groupContacts)

    const searchGroupContactsElement = document.querySelector("#search-my-group-contacts-input")
    searchGroupContactsElement.addEventListener("input", myGroupContactsAutocompleteSearch);

    async function myGroupContactsAutocompleteSearch() {
        const groupContactsList = document.querySelector("#group-contacts-list");
        let searchGroupContactsInputValue = searchGroupContactsElement.value.toLowerCase().trimEnd();
        let filteredGroupContacts = [];

        finalGroupContacts.filter(function(contact) {
        let contactFirstName = contact.firstname;
        let contactLastName = contact.lastname;
        let contactName = `${contact.firstname} ${contact.lastname}`

        // console.log(searchGroupContactsInputValue.length)

        if (searchGroupContactsInputValue === "") {
            for (let i = 0; i < finalGroupContacts.length; i++) {
                filteredGroupContacts.push(finalGroupContacts[i])
            }
        }

        // console.log(searchContactsInputValue.length)

        if (searchGroupContactsInputValue === "") {
            for (let i = 0; i < finalGroupContacts.length; i++) {
                filteredGroupContacts.push(finalGroupContacts[i])
            }
        }

        // if (contactFirstName.toLowerCase().startsWith(searchContactsInputValue)) {
        //     for (let i = 0; i < finalGroupContacts.length; i++) {
        //         let matchContactName = `${finalGroupContacts[i].firstname} ${finalGroupContacts[i].lastname}`
        //         if (contactName.toLowerCase() === matchContactName.toLowerCase()) {
        //             filteredContacts.push(finalGroupContacts[i])
        //             // console.log(filteredContacts)
        //         }
        //     }
        // }

        // if (contactLastName.toLowerCase().startsWith(searchContactsInputValue)) {
        //     for (let i = 0; i < finalGroupContacts.length; i++) {
        //         let matchContactName = `${finalGroupContacts[i].firstname} ${finalGroupContacts[i].lastname}`
        //         if (contactName.toLowerCase() === matchContactName.toLowerCase()) {
        //             filteredContacts.push(finalGroupContacts[i])
        //             // console.log(filteredContacts)
        //         }
        //     }
        // }

        if (contactName.toLowerCase().startsWith(searchGroupContactsInputValue)) {
            for (let i = 0; i < finalGroupContacts.length; i++) {
                let matchContactName = `${finalGroupContacts[i].firstname} ${finalGroupContacts[i].lastname}`
                if (contactName.toLowerCase() === matchContactName.toLowerCase()) {
                    filteredGroupContacts.push(finalGroupContacts[i])
                    // console.log(filteredContacts)
                }
            }
        }
    });

    // console.log(searchContactsInputValue)

    const searchGroupContactsAutocompleteList = document.querySelector("#group-contacts-autocomplete-list");
    // const searchGroupContactsAutocompleteList = document.createElement("div");
    // searchGroupContactsAutocompleteList.setAttribute("id", "my-contacts-autocomplete-list");
   
    searchGroupContactsAutocompleteList.innerHTML = '';

    function removeDuplicates(arr) {
        return arr.reduce((unique, item) => {
          if (!unique.includes(item)) {
            unique.push(item);
          }
          return unique;
        }, []);
      }

      const uniqueArray = removeDuplicates(filteredGroupContacts);
      searchGroupContactsAutocompleteList.style.display = 'block';
      groupContactsList.style.display = "none"
      let elementsArr = [];

       uniqueArray.forEach(contact => {
            const groupContactsAutoCompleteListItem = document.createElement("div");
            groupContactsAutoCompleteListItem.style.display = "flex";
            groupContactsAutoCompleteListItem.style.flexDirection = "row";
            groupContactsAutoCompleteListItem.style.height = "70px"
            groupContactsAutoCompleteListItem.style.borderTop = "2px solid black";
            groupContactsAutoCompleteListItem.style.borderBottom = "2px solid black";
            groupContactsAutoCompleteListItem.style.backgroundColor = "#fcfcff"
            groupContactsAutoCompleteListItem.style.marginTop = "1px";
            groupContactsAutoCompleteListItem.style.marginBottom = "1px";
            groupContactsAutoCompleteListItem.setAttribute("contactId", contact.contact_id)

            groupContactsAutoCompleteListItem.addEventListener("mouseover", function() {
            groupContactsAutoCompleteListItem.style.backgroundColor = "lightgreen";
            });

            groupContactsAutoCompleteListItem.addEventListener("mouseout", function() {
            groupContactsAutoCompleteListItem.style.backgroundColor = "#fcfcff";
            });

            groupContactsAutoCompleteListItem.addEventListener("click", function(event) {
            
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
        });

        const groupContactsAutoCompleteListItemImageContainer = document.createElement("div");
        groupContactsAutoCompleteListItemImageContainer.style.display = "flex";
        groupContactsAutoCompleteListItemImageContainer.style.alignItems = "center";
        groupContactsAutoCompleteListItemImageContainer.style.padding = "10px"
        const groupContactsAutoCompleteListItemImage = document.createElement("img");
        groupContactsAutoCompleteListItemImage.style.width = "57px";
        groupContactsAutoCompleteListItemImage.style.height = "57px";
        groupContactsAutoCompleteListItemImage.style.border = "0.5px solid grey";
        groupContactsAutoCompleteListItemImage.style.borderRadius = "50%"
        groupContactsAutoCompleteListItemImage.style.backgroundColor = "gainsboro";
        groupContactsAutoCompleteListItemImage.style.border = "1px solid black";
        groupContactsAutoCompleteListItemImage.style.objectFit = "cover";
        groupContactsAutoCompleteListItemImage.setAttribute("src", contact.imageString);

        ///
        const groupContactAutoCompleteListNameContainer = document.createElement("div");
        groupContactAutoCompleteListNameContainer.style.position = "relative";
        groupContactAutoCompleteListNameContainer.style.display = "flex";
        groupContactAutoCompleteListNameContainer.style.flexDirection = "column"
        groupContactAutoCompleteListNameContainer.style.justifyContent = "center";
        groupContactAutoCompleteListNameContainer.style.alignItems = "center";
        groupContactAutoCompleteListNameContainer.style.width = "100%"
        const groupContactAutoCompleteListNameElement = document.createElement("h3");
        groupContactAutoCompleteListNameElement.style.margin = "0";
        groupContactAutoCompleteListNameElement.innerHTML = `${contact.firstname} ${contact.lastname}`;
        const groupContactAutoCompleteListEmailElement = document.createElement("p");
        groupContactAutoCompleteListEmailElement.style.fontStyle = "italic"
        groupContactAutoCompleteListEmailElement.style.fontSize = "small";
        groupContactAutoCompleteListEmailElement.style.margin = "0"
        const contactEmail = contact.emailaddress;
        groupContactAutoCompleteListEmailElement.innerHTML = contactEmail;

        const groupContactAutoCompleteListOrganizationAndRoleElement = document.createElement("p");
        groupContactAutoCompleteListOrganizationAndRoleElement.style.fontWeight = "bolder";
        groupContactAutoCompleteListOrganizationAndRoleElement.style.fontSize = "smaller"
        groupContactAutoCompleteListOrganizationAndRoleElement.style.margin = "0";

        if (contact.organization !== null && contact.organization !== "" && contact.organization_role !== null && contact.organization_role !== "") {
        groupContactAutoCompleteListOrganizationAndRoleElement.innerHTML = `${contact.organization} || ${contact.organization_role}`
        } else if (contact.organization !== null && contact.organization !== "" || contact.organization_role === null && contact.organization_role === "") {
        groupContactAutoCompleteListOrganizationAndRoleElement.innerHTML = `${contact.organization}`
        } else if (contact.organization === null && contact.organization === "" || contact.organization_role !== null && contact.organization_role !== "") {
        groupContactAutoCompleteListOrganizationAndRoleElement.innerHTML = `${contact.organization_role}`
        } else {
        groupContactAutoCompleteListOrganizationAndRoleElement.innerHTML = "text"
        groupContactAutoCompleteListOrganizationAndRoleElement.style.visibility = "hidden"
        };

        const groupContactAutoCompleteListFavoritesStarIconContainer = document.createElement("div");
        groupContactAutoCompleteListFavoritesStarIconContainer.style.display = "flex";
        groupContactAutoCompleteListFavoritesStarIconContainer.style.justifyContent = "center";
        groupContactAutoCompleteListFavoritesStarIconContainer.style.alignItems = "center"
        groupContactAutoCompleteListFavoritesStarIconContainer.style.padding = "10px"
        const groupContactAutoCompleteListFavoriteStarImg = document.createElement("img");
        groupContactAutoCompleteListFavoriteStarImg.classList.add("contact-favorite-icon")
        groupContactAutoCompleteListFavoriteStarImg.style.width = "50px"

        groupContactAutoCompleteListFavoriteStarImg.setAttribute("src", "./images/star-gold-svgrepo-com.svg");
        if (contact.favorite === null || contact.favorite === false) {
        groupContactAutoCompleteListFavoriteStarImg.style.visibility = "hidden"
        } else {
        groupContactAutoCompleteListFavoriteStarImg.style.display = "block"
        };

         requestAnimationFrame(() => {
                const contactListNameElementWidth = groupContactAutoCompleteListNameElement.clientWidth;
                const contactListNameElementText = groupContactAutoCompleteListNameElement.innerHTML;
                const contactListNameElementTextLength = contactListNameElementText.length;
                const contactListNameElementSlice = contactListNameElementText.slice(0, 22);
                const secondContactListNameElementSlice = contactListNameElementText.slice(0, 26);
                const thirdContactListNameElementSlice = contactListNameElementText.slice(0, 21);
                const fourthContactListNameElementSlice = contactListNameElementText.slice(0, 16);
                const contactListEmailElementWidth = groupContactAutoCompleteListEmailElement.clientWidth;
                const contactListEmailElementText = groupContactAutoCompleteListEmailElement.innerHTML;
                const contactListEmailElementTextLength = contactListEmailElementText.length;
                const contactListEmailElementTextSlice = contactListEmailElementText.slice(0, 38);
                const contactListEmailElementTextSecondSlice = contactListEmailElementText.slice(0, 50);
                let contactListOrganizationAndRoleElementWidth = groupContactAutoCompleteListOrganizationAndRoleElement.clientWidth;
                const contactListOrganizationAndRoleElementText = groupContactAutoCompleteListOrganizationAndRoleElement.innerHTML;
                const contactListOrganizationAndRoleElementTextLength = contactListOrganizationAndRoleElementText.length;
                const contactListOrganizationAndRoleElementTextSlice = contactListOrganizationAndRoleElementText.slice(0, 35);

                const ellipsis = '...'

                // console.log(contactListNameElementTextLength)
                if (contactListNameElementTextLength > 22) {
                    groupContactAutoCompleteListNameElement.innerHTML = contactListNameElementSlice + ellipsis;
                }

                if (contactListEmailElementTextLength > 38) {
                    groupContactAutoCompleteListEmailElement.innerHTML = contactListEmailElementTextSlice + ellipsis;
                }

                // console.log(contactListOrganizationAndRoleElementTextSlice)
                if (contactListOrganizationAndRoleElementTextLength > 35) {
                    groupContactAutoCompleteListOrganizationAndRoleElement.innerHTML = contactListOrganizationAndRoleElementTextSlice + ellipsis;
                }
                });
                ///  

            // const contactsList = document.querySelector("#my-contacts-list-container")
            groupContactsAutoCompleteListItemImageContainer.appendChild(groupContactsAutoCompleteListItemImage);
            groupContactAutoCompleteListNameContainer.appendChild(groupContactAutoCompleteListNameElement);
            groupContactAutoCompleteListNameContainer.appendChild(groupContactAutoCompleteListEmailElement);
            groupContactAutoCompleteListNameContainer.appendChild(groupContactAutoCompleteListOrganizationAndRoleElement);
            groupContactsAutoCompleteListItem.appendChild(groupContactsAutoCompleteListItemImageContainer);
            groupContactsAutoCompleteListItem.appendChild(groupContactAutoCompleteListNameContainer);
            groupContactAutoCompleteListFavoritesStarIconContainer.appendChild(groupContactAutoCompleteListFavoriteStarImg);
            groupContactsAutoCompleteListItem.appendChild(groupContactAutoCompleteListFavoritesStarIconContainer);
            groupContactsListContainer.appendChild(searchGroupContactsAutocompleteList)
            // searchContactsAutocompleteList.style.marginTop = "51px"
            elementsArr.push(groupContactsAutoCompleteListItem)
            // console.log(elementsArr)
            elementsArr.forEach(element => {
                // console.log(element)
                searchGroupContactsAutocompleteList.appendChild(element);
            });
      });
    }
};


async function renderMobileGroupContactsListContent() {
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

    const currentUrl = window.location.href.toString();

    const userGroupContacts = await getUserContactGroupings(userId);
    const groupIdUrl = currentUrl.split("group_")[1];
    const queryCharIndex = groupIdUrl.indexOf("?")
    const groupId = Number(groupIdUrl.slice(0, queryCharIndex));
    const group = await getAUserGroup(userId, groupId)

    const groupContacts = [];
    for (let i = 0; i < userGroupContacts.length; i++) {
        if (userGroupContacts[i].group_id === groupId) {
            groupContacts.push(userGroupContacts[i])
        }
    };

    const userImage = await getAUserImage(userId);
    const imageString = `data:${userImage.contentType};base64,${userImage.image}`
    const groupsContactsListUserImage = document.querySelector("#mobile-group-contacts-list-user-image");
    groupsContactsListUserImage.setAttribute("src", imageString);
    groupsContactsListUserImage.style.borderRadius = "50%";
    
    // const userId = matchingUser.user_id;
    // const userContacts = await getUserContacts(userId);

    // const groupContactsListListUserImage = document.querySelector("#mobile-group-contacts-list-user-image");
    // if (user.user_image !== null && user.user_image !== './images/user-5-svgrepo-com.svg') {
    //     groupContactsListListUserImage.setAttribute("src", user.user_image);
    //     groupContactsListListUserImage.style.borderRadius = "50%"
    // }

    // const favoritesHeaderUserName = document.querySelector("#mobile-favorites-header-user-name");
    // favoritesHeaderUserName.innerHTML = `${user.firstname} ${user.lastname}`;
    // const favaoritesHeaderUserEmail = document.querySelector("#mobile-favorites-header-user-email");
    // favaoritesHeaderUserEmail.innerHTML = user.emailaddress;

    const mobileGroupContactsListUserNameElement = document.querySelector("#mobile-group-contacts-list-user-name");
    const mobileGroupContactsListUserEmailAddressElement = document.querySelector("#mobile-group-contacts-list-user-email")
    mobileGroupContactsListUserNameElement.innerHTML = `${user.firstname} ${user.lastname}`;
    mobileGroupContactsListUserNameElement.style.fontFamily = "Arial";
    // favoriteContactsUserNameElement.style.fontSize = "xx-large"
    // favoriteContactsUserEmailAddressElement.innerHTML = `${user.emailaddress}`

       requestAnimationFrame(() => {
        const screenWidth = window.innerWidth;
        const screenHeight = window.innerHeight;
        const mobileGroupContactsListHeaderElement = document.querySelector("#mobile-group-contacts-list-header-user-container");
        const mobileGroupContactsListHeaderElementHeight = mobileGroupContactsListHeaderElement.clientHeight;
        const mobileGroupContactsListImageCircleElement = document.querySelector("#mobile-group-contacts-list-header-user-image-circle");
        const mobileGroupContactsListSquareElement = document.querySelector("#mobile-group-contacts-list-header-user-favorite-square")
        const derivedHeight = screenHeight * 13.6160714;
        const newWidth = (80 / 100) * derivedHeight
        const newWidthStr = newWidth.toString() + "px"
        console.log(screenHeight)
        mobileGroupContactsListImageCircleElement.style.width = newWidthStr
        mobileGroupContactsListSquareElement.style.width = newWidthStr
    });

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
    const groupContactsListContactsHeaderContainer = document.createElement("div");
    groupContactsListContactsHeaderContainer.style.display = "flex";
    // groupContactsListContactsHeaderContainer.style.justifyContent = "space-between"
    groupContactsListContactsHeaderContainer.style.alignItems = "center"
    // groupContactsListContactsHeaderContainer.style.width = "25%";
    groupContactsListContactsHeaderContainer.style.backgroundColor = "ghostwhite"
    // groupContactsListContactsHeaderContainer.style.marginBottom = "5px"
    groupContactsListContactsHeaderContainer.style.padding = "5px"
    const myGroupContactsHeaderElement = document.createElement("h2");
    myGroupContactsHeaderElement.innerHTML = `${group.groupname} Contacts`;
    // myGroupContactsHeaderElement.style.width = "140px"
    myGroupContactsHeaderElement.style.margin = "0"
    myGroupContactsHeaderElement.style.marginLeft = "5px"
    // myGroupContactsHeaderElement.style.marginRight = "10px"
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
    numberOfGroupContactsElement.style.margin = "0"
    groupContactsListContainer.style.position = "absolute";
    groupContactsListContainer.style.top = "23.2%"
    // groupContactsListContainer.style.left = "31.5%"
    groupContactsListContainer.style.width = "100%"
    const groupContactsList = document.createElement("ul");
    groupContactsList.style.position = "relative";
    groupContactsList.style.listStyle = "none";
    groupContactsList.style.padding = "0"
    groupContactsList.style.margin = "0px 0px 2px 0px"
    finalGroupContacts.forEach(async (contact) => {
        const groupContactListItem = document.createElement("div");
        groupContactListItem.style.display = "flex";
        groupContactListItem.style.flexDirection = "row";
        groupContactListItem.style.justifyContent = "space-between";
        groupContactListItem.style.height = "80px"
        groupContactListItem.style.borderTop = "1px solid gray";
        groupContactListItem.style.borderBottom = "1px solid gray";
        groupContactListItem.style.backgroundColor = "ghostwhite"
        groupContactListItem.style.marginTop = "1px";
        // groupContactListItem.style.marginBottom = "2px";
        groupContactListItem.setAttribute("contactId", contact.contact_id)

        groupContactListItem.addEventListener("mouseover", function() {
            groupContactListItem.style.backgroundColor = "lightgreen";
        });

        groupContactListItem.addEventListener("mouseout", function() {
            groupContactListItem.style.backgroundColor = "ghostwhite";
        });

        groupContactListItem.addEventListener("click", function(event) {
            
            if (!event.target.classList.contains("contact-favorite-icon")) {
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
            }
        })

        const groupContactListItemImageContainer = document.createElement("div");
        groupContactListItemImageContainer.style.display = "flex";
        groupContactListItemImageContainer.style.alignItems = "center";
        groupContactListItemImageContainer.style.width = "20%"
        groupContactListItemImageContainer.style.padding = "5px"
        const groupContactListItemImage = document.createElement("img");
        groupContactListItemImage.style.width = "60px";
        groupContactListItemImage.style.height = "60px";
        groupContactListItemImage.style.border = "0.5px solid grey";
        groupContactListItemImage.style.borderRadius = "50%";
        groupContactListItemImage.style.backgroundColor = "gainsboro"
        groupContactListItemImage.style.objectFit = "cover";

        const contact_id = contact.contact_id;
        const contactImage = await getAContactImage(userId, contact_id)
        const imageString = `data:${contactImage.contentType};base64,${contactImage.image}`
        groupContactListItemImage.setAttribute("src", imageString);
        groupContactListItemImage.style.borderRadius = "50%";

        // contactListItem.innerHTML = `${contact.firstname} ${contact.lastname}`;
        const groupContactListNameContainer = document.createElement("div");
        groupContactListNameContainer.style.display = "flex";
        groupContactListNameContainer.style.flexDirection = "column"
        groupContactListNameContainer.style.justifyContent = "center";
        groupContactListNameContainer.style.alignItems = "center";
        groupContactListNameContainer.style.width = "54.5%"
        const groupContactListNameElement = document.createElement("h3");
        groupContactListNameElement.style.margin = "0";
        groupContactListNameElement.innerHTML = `${contact.firstname} ${contact.lastname}`;
        const groupContactListEmailElement = document.createElement("p");
        groupContactListEmailElement.style.fontStyle = "italic"
        groupContactListEmailElement.style.margin = "0"
        
        console.log(contact)
        if (contact.emailaddress !== null && contact.emailaddress !== "") {
            groupContactListEmailElement.innerHTML = contact.emailaddress;
        } else {
            groupContactListEmailElement.innerHTML = "text";
            groupContactListEmailElement.style.visibility = "hidden";
        }

        console.log(contact)

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

    requestAnimationFrame(() => {     
    const ellipsis = "..."
    const groupContactListItemNameElementText = groupContactListNameElement.textContent;
    const groupContactListItemNameElementHeight = groupContactListNameElement.clientHeight;
    // console.log(contactListNameElementHeight)
    const groupContactListNameTextSlice = groupContactListItemNameElementText.slice(0, 12) + ellipsis;
    if (groupContactListItemNameElementHeight > 22) {
        groupContactListNameElement.innerHTML = groupContactListNameTextSlice
    }

    const groupContactListNameContainerWidth = groupContactListNameContainer.clientWidth;
    const contactEmailAddressText = contact.emailaddress;
    const groupContactEmailAddressElementWidth = groupContactListEmailElement.clientWidth;
    let groupContactEmailAddressTextSlice = contactEmailAddressText.slice(0, 25) + ellipsis
    if (groupContactEmailAddressElementWidth > groupContactListNameContainerWidth) {
        groupContactListEmailElement.innerHTML = groupContactEmailAddressTextSlice
    } else {
        groupContactListEmailElement.innerHTML = contact.emailaddress
    }

    const elOrg = groupContactListOrganizationAndRoleElement;
    const elOrgHeight = elOrg.clientHeight;
    const elOrgText = elOrg.innerText;
    const elOrgTextSlice = elOrgText.slice(0, 22) + ellipsis
    if (elOrgHeight > 22) {
        elOrg.innerHTML = elOrgTextSlice
    }
});
    
        const groupContactListFavoritesStarIconContainer = document.createElement("div");
        groupContactListFavoritesStarIconContainer.style.display = "flex";
        groupContactListFavoritesStarIconContainer.style.justifyContent = "flex-end";
        groupContactListFavoritesStarIconContainer.style.alignItems = "center"
        groupContactListFavoritesStarIconContainer.style.padding = "5px"
        groupContactListFavoritesStarIconContainer.style.width = "20%";
        const groupContactListFavoriteStarImg = document.createElement("img");
        groupContactListFavoriteStarImg.classList.add("contact-favorite-icon")
        groupContactListFavoriteStarImg.style.width = "60px"

        // console.log(contact.favorite)

        // contactListFavoriteStarImg.addEventListener("click", function(event) {
        //     // event.preventDefault()
        //     updateContactFavorite()
        // }, false)
        
        groupContactListFavoriteStarImg.setAttribute("src", "./images/star-gold-svgrepo-com.svg");
        if (contact.favorite === null || contact.favorite === false) {
            groupContactListFavoriteStarImg.style.display = "none"
        } else {
            groupContactListFavoriteStarImg.style.display = "block"
        }
        
        groupContactListItemImageContainer.appendChild(groupContactListItemImage);
        groupContactListNameContainer.appendChild(groupContactListNameElement);
        groupContactListNameContainer.appendChild(groupContactListEmailElement);
        groupContactListNameContainer.appendChild(groupContactListOrganizationAndRoleElement);
        groupContactListItem.appendChild(groupContactListItemImageContainer);
        groupContactListItem.appendChild(groupContactListNameContainer);
        groupContactListFavoritesStarIconContainer.appendChild(groupContactListFavoriteStarImg);
        groupContactListItem.appendChild(groupContactListFavoritesStarIconContainer);
        groupContactsList.appendChild(groupContactListItem);
    });
    groupContactsListContactsHeaderContainer.append(myGroupContactsHeaderElement)
    groupContactsListContactsHeaderContainer.appendChild(numberOfGroupContactsElement)
    groupContactsListContainer.appendChild(groupContactsListContactsHeaderContainer)
    groupContactsListContainer.appendChild(groupContactsList)
    document.body.appendChild(groupContactsListContainer)
}

async function renderCreateGroupsContent() {

    const groupsSelectionList = document.querySelector("#groups-selection-list");
    const groupsSelectionListChildren = groupsSelectionList.children;
    const groupsSelectionListArr = Array.from(groupsSelectionListChildren);
    // console.log(groupsSelectionListArr)

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
    
        const customGroupInputContainer = document.querySelector("#custom-group-input-container");
        customGroupInputContainer.classList.remove("active");
        customGroupInputContainer.classList.add("inactive");
        customGroupInputContainer.style.backgroundColor = "ghostwhite"

        groupsSelectionListArr.forEach(item => {
            const itemInputElement = item.children[1]
            console.log(itemInputElement)
            if (item !== event.target && itemInputElement !== event.target) {
                item.classList.remove("active");
                item.classList.add("inactive")
                item.style.backgroundColor = "ghostwhite"
                itemInputElement.checked = false
            }
            if (itemInputElement.checked === true) {
                item.classList.remove("inactive");
                item.classList.add("active")
                item.style.backgroundColor = "lightgreen"
            }
        })

        const clickedInputElement = clickedItem.children[1];
        // console.log(clickedInputElement)

        if (clickedItem.classList.contains("inactive")) {
                clickedItem.classList.remove("inactive")
                clickedItem.classList.add("active")
                clickedItem.style.backgroundColor = "lightgreen"
                clickedInputElement.checked = true
            } else if(clickedItem.classList.contains("active")) {
                clickedItem.classList.remove("active")
                clickedItem.classList.add("inactive")
                clickedItem.style.backgroundColor = "ghostwhite"
                clickedInputElement.checked = false
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
            customGroupInputElement.value = "";
            customGroupInputContainer.style.backgroundColor = "ghostwhite";
        }
    })

    const createGroupButton = document.querySelector("#create-group-button")
    document.addEventListener("click", function(event) {
        console.log(event.target.tagName)
        if (event.target.tagName !== "DIV" && event.target.classList.contains("groupNameInput") === false && event.target !== createGroupButton) {
            groupsSelectionListArr.forEach(item => {
                item.classList.remove("active");
                item.classList.add("inactive")
                item.style.backgroundColor = "ghostwhite"
                item.children[1].checked = false;
            })
        };
    });

    createGroupButton.addEventListener("click", postNewUserGroup)
};

async function renderMobileCreateGroupsContent() {
    const groupsSelectionList = document.querySelector("#mobile-groups-selection-list");
    const groupsSelectionListChildren = groupsSelectionList.children;
    const groupsSelectionListArr = Array.from(groupsSelectionListChildren);
    // console.log(groupsSelectionListArr)

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
    
        const customGroupInputContainer = document.querySelector("#mobile-custom-group-input-container");
        customGroupInputContainer.classList.remove("active");
        customGroupInputContainer.classList.add("inactive");
        customGroupInputContainer.style.backgroundColor = "ghostwhite"

        groupsSelectionListArr.forEach(item => {
            const itemInputElement = item.children[1]
            console.log(itemInputElement)
            if (item !== event.target && itemInputElement !== event.target) {
                item.classList.remove("active");
                item.classList.add("inactive")
                item.style.backgroundColor = "ghostwhite"
                itemInputElement.checked = false
            }
            if (itemInputElement.checked === true) {
                item.classList.remove("inactive");
                item.classList.add("active")
                item.style.backgroundColor = "lightgreen"
            }
        })

        const clickedInputElement = clickedItem.children[1];
        // console.log(clickedInputElement)

        if (clickedItem.classList.contains("inactive")) {
                clickedItem.classList.remove("inactive")
                clickedItem.classList.add("active")
                clickedItem.style.backgroundColor = "lightgreen"
                clickedInputElement.checked = true
            } else if(clickedItem.classList.contains("active")) {
                clickedItem.classList.remove("active")
                clickedItem.classList.add("inactive")
                clickedItem.style.backgroundColor = "ghostwhite"
                clickedInputElement.checked = false
            }
        })
    });

    const customGroupInputContainer = document.querySelector("#mobile-custom-group-input-container");
    const customGroupInputElement = document.querySelector("#mobile-custom-group-input-element");
    customGroupInputElement.addEventListener("focus", function() {
        customGroupInputContainer.classList.remove("inactive")
        customGroupInputContainer.classList.add("active")
        customGroupInputContainer.style.backgroundColor = "lightgreen";
    });
    customGroupInputElement.addEventListener("blur", function(event) {
        const createGroupButton = document.querySelector("#mobile-create-group-button")
        if (event.relatedTarget !== createGroupButton) {
            customGroupInputContainer.classList.remove("active")
            customGroupInputContainer.classList.add("inactive")
            customGroupInputContainer.style.backgroundColor = "ghostwhite";
        }
    })

    const createGroupButton = document.querySelector("#mobile-create-group-button")
    document.addEventListener("click", function(event) {
        console.log(event.target.tagName)
        if (event.target.tagName !== "DIV" && event.target.classList.contains("mobileGroupNameInput") === false && event.target !== createGroupButton) {
            groupsSelectionListArr.forEach(item => {
                item.classList.remove("active");
                item.classList.add("inactive")
                item.style.backgroundColor = "ghostwhite"
                item.children[1].checked = false;
            })
        };
    });

    createGroupButton.addEventListener("click", mobilePostNewUserGroup)
}

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
        groupName = activeElement.children[0].innerHTML 
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

async function mobileHandleCreateGroupInput() {
    const allUsers = await getAllUsers();
    const sessionId = sessionStorage.getItem("user");
    let matchingUser;
    for (let i = 0; i < allUsers.length; i++) {
        if (allUsers[i].session_id === sessionId) {
            matchingUser = allUsers[i]
        }
    }
    const userId = matchingUser.user_id;
    console.log(userId)

    const userGroups = await getUserGroups(userId)

    const groupsSelectionList = document.querySelector("#mobile-groups-selection-list");
    const groupsSelectionListChildren = groupsSelectionList.children;
    const groupsSelectionListArr = Array.from(groupsSelectionListChildren);
    console.log(groupsSelectionListArr)
    const customGroupInputContainer = document.querySelector("#mobile-custom-group-input-container");
    const customGroupInputElement = document.querySelector("#mobile-custom-group-input-element");

    // console.log(groupsSelectionListArr)
    let activeElement;
    groupsSelectionListArr.forEach(item => {
        console.log(item)
        if (item.classList.contains("active")) {
            activeElement = item;
        }
    });

    if (activeElement === undefined && customGroupInputContainer.classList.contains("active")) {
        activeElement = customGroupInputElement;
    }

    console.log(activeElement)
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
    console.log(activeElement)
    console.log(groupName)

    if (activeElement === undefined) {
        alert("Please select a group or enter a custom group name before creating a group.")
        return
    }

    if (activeElement === customGroupInputElement) {
        groupName = activeElement.value
    } else {
        groupName = activeElement.children[0].innerHTML 
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

async function renderMobileManageContactGroupsContent() {
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
        const manageContactGroupsSelectionList = document.querySelector("#mobile-manage-contact-groups-selection-list");
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

    const contactGroupsSelectionList = document.querySelector("#mobile-manage-contact-groups-selection-list");
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

      const addContactToGroupsButton = document.querySelector("#mobile-add-contact-to-groups-button");
      addContactToGroupsButton.addEventListener("click", async function(event) {
        await mobileDeleteAContactGrouping()
        await mobilePostNewContactGrouping()

      const manageContactGroupsSelectionList = document.querySelector("#mobile-manage-contact-groups-selection-list");
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

}

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

async function mobileHandleManageContactGroupsInput(event) {
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
    const manageContactGroupsSelectionList = document.querySelector("#mobile-manage-contact-groups-selection-list");
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
    const newContactAddPhotoInputElement = document.querySelector("#new-contact-add-photo")
    newContactRemovePhotoButton.addEventListener("click", function() {
        newContactAddPhotoInputElement.value = "";
        newContactAddPhotoButton.innerHTML = "Add Photo"
        newContactImage.setAttribute("src", "./images/user-2-svgrepo-com.svg");
    });

    const newContactAddPhotoButton = document.querySelector("#new-contact-add-photo-button");
    const newContactAddPhotoInputContainerElement = document.querySelector("#new-contact-add-photo-input-container")
    newContactAddPhotoButton.addEventListener("click", function() {
        // console.log("add new contact photo")
        newContactAddPhotoInputContainerElement.style.display = "flex";
    });
    const closeNewContactAddPhotoIcon = document.querySelector("#close-new-contact-add-photo-icon");
    closeNewContactAddPhotoIcon.addEventListener("click", function() {
        newContactAddPhotoInputContainerElement.style.display = "none";
        newContactAddPhotoInputElement.value = ""
    })
    const newContactAddPhotoSaveButton = document.querySelector("#new-contact-add-photo-insert-button");
    newContactAddPhotoSaveButton.addEventListener("click", function() {
        // newContactAddPhotoInputContainerElement.style.display = "none";
        newContactAddPhotoButton.innerHTML = "Change Photo"
        if (newContactAddPhotoInputElement.files[0] !== undefined) {
            handleNewContactImage();
        } else {
            alert("Please choose an image before inserting.")
        }
        // handleUploadNewContactImageInput();
    }, false);

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

    const selectEmailLabelElement = document.querySelector("#new-contact-select-emailaddress");
    const emailLabelOptions = [
        { text: "Primary", value: "Primary"},
        { text: "Home", value: "Home"},
        { text: "Work", value: "Work"},
        { text: "School", value: "School"},
        { text: "Custom", value: "Custom"},
    ];

    for (let i = 0; i < emailLabelOptions.length; i++) {
        const option = document.createElement("option");
        option.text = emailLabelOptions[i].text;
        option.value = emailLabelOptions[i].value;
        selectEmailLabelElement.appendChild(option)
    };

    const createCustomContactEmailLabelModal = document.querySelector("#create-new-contact-email-custom-label-modal")
    selectEmailLabelElement.addEventListener("change", function(event) {
        if (event.target.value === "Custom") {
            // console.log("Open custom modal")
            createCustomContactEmailLabelModal.style.display = "flex";
        };

        if (selectEmailLabelElement.options.length > 5 && event.target.value === "Custom") {
            selectEmailLabelElement.options[4].remove()
        }
    });

    const closeCustomContactEmailLabelModalIcon = document.querySelector("#close-create-new-contact-email-label-modal");
    closeCustomContactEmailLabelModalIcon.addEventListener("click", function() {
        createCustomContactEmailLabelModal.style.display = "none";
          selectEmailLabelElement.options.selectedIndex = 0;
    })

    const createNewContactEmailLabelButton = document.querySelector("#create-new-contact-email-label-button");
    createNewContactEmailLabelButton.addEventListener("click", function() {
        const customEmailLabelInputElement = document.querySelector("#create-new-contact-emailaddress-label-input");
        const customEmailLabelOption = document.createElement("option");
        customEmailLabelOption.text = customEmailLabelInputElement.value;
        customEmailLabelOption.value = customEmailLabelInputElement.value;
        const firstOption = selectEmailLabelElement.options[0];
        selectEmailLabelElement.insertBefore(customEmailLabelOption, firstOption)
        selectEmailLabelElement.options.selectedIndex = 0;
        createCustomContactEmailLabelModal.style.display = "none";
    });

    selectEmailLabelElement.addEventListener("click", function() {
        const selectEmailLabelOptions = selectEmailLabelElement.options;
        // console.log(selectEmailLabelOptions)
        const optionToMove = selectEmailLabelElement.options[0];
        const referenceOption = selectEmailLabelElement.options[5];

        if (selectEmailLabelOptions.length > 5 && selectEmailLabelElement.options[0].text !== "Primary") {
            selectEmailLabelElement.insertBefore(optionToMove, referenceOption)
        }
    });

    const selectPhoneNumberLabelElement = document.querySelector("#new-contact-select-phonenumber");
    const phoneNumberLabelOptions = [
        { text: "Mobile", value: "Mobile"},
        { text: "Home", value: "Home"},
        { text: "Work", value: "Work"},
        { text: "School", value: "School"},
        { text: "Custom", value: "Custom"},
    ];

    for (let i = 0; i < phoneNumberLabelOptions.length; i++) {
        const option = document.createElement("option");
        option.text = phoneNumberLabelOptions[i].text;
        option.value = phoneNumberLabelOptions[i].value;
        selectPhoneNumberLabelElement.appendChild(option)
    };

    const createCustomContactPhoneNumberLabelModal = document.querySelector("#create-new-contact-phonenumber-custom-label-modal")
    selectPhoneNumberLabelElement.addEventListener("change", function(event) {
        if (event.target.value === "Custom") {
            // console.log("Open custom modal")
            createCustomContactPhoneNumberLabelModal.style.display = "flex";
        };

        if (selectPhoneNumberLabelElement.options.length > 5 && event.target.value === "Custom") {
            selectPhoneNumberLabelElement.options[4].remove()
        };
    });

    const closeCustomContactPhoneNumberLabelModalIcon = document.querySelector("#close-create-new-contact-phonenumber-label-modal");
    closeCustomContactPhoneNumberLabelModalIcon.addEventListener("click", function() {
        createCustomContactPhoneNumberLabelModal.style.display = "none";
          selectPhoneNumberLabelElement.options.selectedIndex = 0;
    });

    const createNewContactPhoneNumberLabelButton = document.querySelector("#create-new-contact-phonenumber-label-button");
    createNewContactPhoneNumberLabelButton.addEventListener("click", function() {
        const customPhoneNumberLabelInputElement = document.querySelector("#create-new-contact-phone-label-input");
        const customPhoneNumberLabelOption = document.createElement("option");
        customPhoneNumberLabelOption.text = customPhoneNumberLabelInputElement.value;
        customPhoneNumberLabelOption.value = customPhoneNumberLabelInputElement.value;
        const firstOption = selectPhoneNumberLabelElement.options[0];
        selectPhoneNumberLabelElement.insertBefore(customPhoneNumberLabelOption, firstOption)
        selectPhoneNumberLabelElement.options.selectedIndex = 0;
        createCustomContactPhoneNumberLabelModal.style.display = "none";
    });

    selectPhoneNumberLabelElement.addEventListener("click", function() {
        const selectPhoneNumberLabelOptions = selectPhoneNumberLabelElement.options;
        // console.log(selectPhoneNumberLabelOptions)
        const optionToMove = selectPhoneNumberLabelElement.options[0];
        const referenceOption = selectPhoneNumberLabelElement.options[5];

        if (selectPhoneNumberLabelOptions.length > 5 && selectPhoneNumberLabelElement.options[0].text !== "Mobile") {
            selectPhoneNumberLabelElement.insertBefore(optionToMove, referenceOption)
        }
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

    const selectAddressLabelElement = document.querySelector("#new-contact-select-address");
    const addressLabelOptions = [
        { text: "Home", value: "Home"},
        { text: "Work", value: "Work"},
        { text: "School", value: "Work"},
        { text: "Custom", value: "Custom"},
    ];

    for (let i = 0; i < addressLabelOptions.length; i++) {
        const option = document.createElement("option");
        option.text = addressLabelOptions[i].text;
        option.value = addressLabelOptions[i].value;
        selectAddressLabelElement.appendChild(option)
    };

    const createCustomContactAddressLabelModal = document.querySelector("#create-new-contact-address-custom-label-modal")
    selectAddressLabelElement.addEventListener("change", function(event) {
        if (event.target.value === "Custom") {
            // console.log("Open custom modal")
            createCustomContactAddressLabelModal.style.display = "flex"
        };

        if (selectAddressLabelElement.options.length > 4 && event.target.value === "Custom") {
            selectAddressLabelElement.options[3].remove()
        };
    });

    const closeCustomContactAddressLabelModalIcon = document.querySelector("#close-create-new-contact-address-label-modal");
    closeCustomContactAddressLabelModalIcon.addEventListener("click", function() {
        createCustomContactAddressLabelModal.style.display = "none";
          selectAddressLabelElement.options.selectedIndex = 0;
    })

    const createNewContactAddressLabelButton = document.querySelector("#create-new-contact-address-label-button");
    createNewContactAddressLabelButton.addEventListener("click", function() {
        const customAddressLabelInputElement = document.querySelector("#create-new-contact-physaddress-label-input");
        const customAddressLabelOption = document.createElement("option");
        customAddressLabelOption.text = customAddressLabelInputElement.value;
        customAddressLabelOption.value = customAddressLabelInputElement.value;
        const firstOption = selectAddressLabelElement.options[0];
        selectAddressLabelElement.insertBefore(customAddressLabelOption, firstOption)
        selectAddressLabelElement.options.selectedIndex = 0;
        createCustomContactAddressLabelModal.style.display = "none";
    });

    selectAddressLabelElement.addEventListener("click", function() {
        const selectAddressLabelOptions = selectAddressLabelElement.options;
        // console.log(selectAddressLabelOptions)
        const optionToMove = selectAddressLabelElement.options[0];
        const referenceOption = selectAddressLabelElement.options[4];

        if (selectAddressLabelOptions.length > 4 && selectAddressLabelElement.options[0].text !== "Home") {
            selectAddressLabelElement.insertBefore(optionToMove, referenceOption)
        };
    });

    const selectWebsiteLabelElement = document.querySelector("#new-contact-select-website");
    const websiteLabelOptions = [
        { text: "Personal", value: "Personal"},
        { text: "Business", value: "Business"},
        { text: "Blog", value: "Blog"},
        { text: "Custom", value: "Custom"},
    ];

    for (let i = 0; i < websiteLabelOptions.length; i++) {
        const option = document.createElement("option");
        option.text = websiteLabelOptions[i].text;
        option.value = websiteLabelOptions[i].value;
        selectWebsiteLabelElement.appendChild(option)
    };

    const createCustomContactWebsiteLabelModal = document.querySelector("#create-new-contact-website-custom-label-modal")
    selectWebsiteLabelElement.addEventListener("change", function(event) {
        if (event.target.value === "Custom") {
            // console.log("Open custom modal")
            createCustomContactWebsiteLabelModal.style.display = "block"
        };

        if (selectWebsiteLabelElement.options.length > 4 && event.target.value === "Custom") {
            selectWebsiteLabelElement.options[3].remove()
        };
    });

    const closeCustomContactWebsiteLabelModalIcon = document.querySelector("#close-create-new-contact-website-label-modal");
    closeCustomContactWebsiteLabelModalIcon.addEventListener("click", function() {
        createCustomContactWebsiteLabelModal.style.display = "none";
          selectWebsiteLabelElement.options.selectedIndex = 0;
    });

    const createNewContactWebsiteLabelButton = document.querySelector("#create-new-contact-website-label-button");
    createNewContactWebsiteLabelButton.addEventListener("click", function() {
        const customWebsiteLabelInputElement = document.querySelector("#create-new-contact-site-label-input");
        const customWebsiteLabelOption = document.createElement("option");
        customWebsiteLabelOption.text = customWebsiteLabelInputElement.value;
        customWebsiteLabelOption.value = customWebsiteLabelInputElement.value;
        const firstOption = selectWebsiteLabelElement.options[0];
        selectWebsiteLabelElement.insertBefore(customWebsiteLabelOption, firstOption)
        selectWebsiteLabelElement.options.selectedIndex = 0;
        createCustomContactWebsiteLabelModal.style.display = "none";
    });

    selectWebsiteLabelElement.addEventListener("click", function() {
        const selectWebsiteLabelOptions = selectWebsiteLabelElement.options;
        // console.log(selectWebsiteLabelOptions)
        const optionToMove = selectWebsiteLabelElement.options[0];
        const referenceOption = selectWebsiteLabelElement.options[4];

        if (selectWebsiteLabelOptions.length > 4 && selectWebsiteLabelElement.options[0].text !== "Personal") {
            selectWebsiteLabelElement.insertBefore(optionToMove, referenceOption)
        }
    });

    const createNewContactButton = document.querySelector("#create-new-contact-button")
    createNewContactButton.addEventListener("click", async function() {
        try { 
            await Promise.all([
                postNewContactImage(),
                postNewContactEmailAddress(),
                postNewContactPhoneNumber(),
                postNewContactAddress(),
                postNewContactWebsite(),
                postNewContact()
            ])
            console.log("all posts finished")
            alert("New contact succesfully created.")
            window.location.href = `${rootUrl}/contacts`
        } catch (error) {
            console.error("at least one post failed")
        }
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
    // let imageFile;
    // let image;

    const newContactImageElement = document.querySelector("#new-contact-image");
    let newContactImageFile;
    let newContactImage;
    const newContactAddPhotoInputElement = document.querySelector("#new-contact-add-photo")

        newContactImageFile = newContactAddPhotoInputElement.files[0];
        let reader = new FileReader()

        console.log(newContactImageFile)

        reader.onload = function () {
            // base64string = reader.result.split(',')[1]
            newContactImage = reader.result;
            newContactImageElement.setAttribute("src", reader.result);
            if (newContactAddPhotoInputElement.files[0] !== undefined) {
                newContactImageElement.setAttribute("name", newContactAddPhotoInputElement.files[0].name)
            }
            newContactImageElement.style.borderRadius = "50%"
        };

        // if (newContactImageFile !== undefined) {
            reader.readAsDataURL(newContactImageFile)
        // } else {
        //     newContactImageElement.setAttribute("src", './images/user-2-svgrepo-com.svg')
        // }

    // const editUserAddPhotoFormElement = document.querySelector("#edit-user-add-photo-form");
    // const editUserAddPhotoInputElement = document.querySelector("#edit-user-add-photo");
    // console.log(editUserAddPhotoFormElement)
    // let imageFile = newContactAddPhotoInputElement.files[0];

    // const newContactAddPhotoButton = document.querySelector("#new-contact-add-photo-button");
    // if (newContactImage.getAttribute("src") !== "./images/user-2-svgrepo-com.svg") {
    //         newContactAddPhotoButton.innerHTML = "Change Photo"
    //     }

    newContactAddPhotoInputElement.value = "";

    const newContactAddPhotoInputModal = document.querySelector("#new-contact-add-photo-input-container");
    newContactAddPhotoInputModal.style.display = "none";
};

async function handleUploadNewContactImageInput() {

    //write code to create an id for the contactimage

    const allUsers = await getAllUsers();
    const sessionId = sessionStorage.getItem("user");
    let matchingUser;
    for (let i = 0; i < allUsers.length; i++) {
        if (allUsers[i].session_id === sessionId) {
            matchingUser = allUsers[i]
        }
    }
    const userId = matchingUser.user_id;
    console.log(userId)
    const userContactImages = await getContactImages(userId);
    console.log(userContactImages)

    let contactImageIdsArr = []
    for (let i = 0; i < userContactImages.length; i++) {
        contactImageIdsArr.push(userContactImages[i].contact_id)
    }

    let maxId = -Infinity;
    for (let i = 0; i < contactImageIdsArr.length; i++) {
        if (contactImageIdsArr[i] > maxId) {
            maxId = contactImageIdsArr[i];
        }
    }

    console.log(maxId)
    if (maxId === -Infinity) {
        maxId = 0
    }

    const contactImageObj = {
        contactImageId: maxId + 1,
        imageFile: null
    }

    async function createImageFile() {
    const newContactImageElement = document.querySelector("#new-contact-image")
    const newContactImageUrl = newContactImageElement.getAttribute("src")
    let newContactImageFile;
        return fetch(newContactImageUrl)
            .then(response => response.blob()) // Get the image as a Blob
            .then(async (blob) => {
            // Now 'blob' contains the image data as a Blob object
            // You can then create a File object from the blob if necessary:
            const filename = newContactImageUrl.substring(newContactImageUrl.lastIndexOf('/') + 1); // Extract filename from URL
            newContactImageFile = new File([blob], filename, { type: blob.type });

            console.log(newContactImageFile); // This is your image file object

            return newContactImageFile
        })
    }

    async function base64ToFile(base64DataUrl, filename) {
  // 1. Fetch the data URL and convert to a Blob
  const response = await fetch(base64DataUrl);
  const blob = await response.blob();

  // 2. Create a File object from the Blob
  // The 'type' is automatically inferred by the browser from the data URL's MIME type
  const file = new File([blob], filename, { type: blob.type });

  return file;
}

let imageFile;


    if (imageFile === undefined) {
       imageFile = await createImageFile()
    } else {
       imageFile = await base64ToFile(newContactImageElement.getAttribute("src"), newContactImageElement.getAttribute("name"))
    }
        
    // newContactAddPhotoInputElement.value = ""
    contactImageObj.imageFile = imageFile;

    // console.log(contactImageObj)

    return contactImageObj;
};

// async function handleNewContactImage() {
//     const newContactImageElement = document.querySelector("#new-contact-image");
//     let newContactImageFile;
//     let newContactImage;
//     const newContactAddPhotoInputElement = document.querySelector("#new-contact-add-photo")
//     // editUserAddPhotoInputElement.addEventListener("change", function(event) {
//         // event.preventDefault();

//         newContactImageFile = newContactAddPhotoInputElement.files[0];
//         let reader = new FileReader()

//         reader.onload = function () {
//             base64string = reader.result.split(',')[1]
//             newContactImage = reader.result;
//             newContactImageElement.setAttribute("src", reader.result);
//             newContactImageElement.style.borderRadius = "50%";
//         };

//         reader.readAsDataURL(newContactImageFile)
//     // })
// };

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
};

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
    const newContactBirthdayElement = document.querySelector("#new-contact-birthday");
    const newContactEmailAddressLabelElement = document.querySelector("#new-contact-select-emailaddress");
    const newContactEmailAddressElement = document.querySelector("#new-contact-email");
    const newContactPhonenumberLabelElement = document.querySelector("#new-contact-select-phonenumber");
    const newContactPhonenumberElement = document.querySelector("#new-contact-phonenumber");
    const newContactAddressLabelElement = document.querySelector("#new-contact-select-address");
    const newContactAddressElement = document.querySelector("#new-contact-address");
    const newContactWebsiteLabelElement = document.querySelector("#new-contact-select-website");
    const newContactWebsiteElement = document.querySelector("#new-contact-social-media");
    const newContactOrganizationElement = document.querySelector("#new-contact-organization");
    const newContactRoleElement = document.querySelector("#new-contact-role")
    const newContactNotesElement = document.querySelector("#new-contact-notes")

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
        emailAddressLabel: newContactEmailAddressLabelElement.value,
        emailAddress: newContactEmailAddressElement.value,
        phonenumberLabel: newContactPhonenumberLabelElement.value,
        phonenumber: newContactPhonenumberElement.value,
        addressLabel: newContactAddressLabelElement.value,
        address: newContactAddressElement.value,
        websiteLabel: newContactWebsiteLabelElement.value,
        website: newContactWebsiteElement.value,
        organization: newContactOrganizationElement.value,
        role: newContactRoleElement.value,
        notes: newContactNotesElement.value,
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

async function getAnImage(id) {
    try {
    const response = await fetch(`/images/${id}`);
    const jsonData = await response.json();
    return jsonData;   
    } catch (err) {
    console.error(err.message)
    }
};

async function getAUserImage(user_id) {
    try {
    const response = await fetch(`/user_images/${user_id}`);
    const jsonData = await response.json();
    return jsonData;   
    } catch (err) {
    console.error(err.message)
    }
};

// async function postImage() {
//     const imageFile = await handleUploadImageInput();

//     console.log(imageFile)

//     const body = { imageFile };
//     try {
//         const response = await fetch(`/images`, {
//             method: "POST",
//             headers: { "Content-Type": "application/json" },
//             body: JSON.stringify(body)
//         });
//         console.log(response)
//     } catch (err) {
//         console.error(err)
//     }
// };
   

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
    const user_image = registerUserObject.userImage

    console.log(registerUserObject)

    const body = { user_id, session_id, firstname, lastname, emailaddress, phonenumber, user_password, user_image };
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

    // alert("You have registered a new account.")
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
    const user_image = registerUserObject.userImage

    console.log(registerUserObject)

    const body = { user_id, session_id, firstname, lastname, emailaddress, phonenumber, user_password, user_image };
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

async function postNewUserImage() {
    const registerUserObject = await handleRegisterInput();
    const user_id = registerUserObject.userId;

    const registerUserImageInputElement = document.querySelector("#register-user-image-input")

    const newUserImageElement = document.querySelector("#register-user-image");
    const newUserImageInputElement = document.querySelector("#register-user-image-input")
    const newUserImageUrl = newUserImageElement.getAttribute("src")
    fetch(newUserImageUrl)
        .then(response => response.blob()) // Get the image as a Blob
        .then(async (blob) => {
            // Now 'blob' contains the image data as a Blob object
            // You can then create a File object from the blob if necessary:
            const filename = newUserImageUrl.substring(newUserImageUrl.lastIndexOf('/') + 1); // Extract filename from URL
            const imageFile = new File([blob], filename, { type: blob.type });

            console.log(imageFile); // This is your image file object
            const formData = new FormData();
            formData.append('id', user_id)
            formData.append('imageFile', imageFile); // 'image' matches the input name
        
            try {
                const response = await fetch(`/user_images`, {
                    method: 'POST',
                    body: formData,
                });
                const result = await response.json();
                console.log(result);
            } catch (error) {
                console.error('Error uploading image:', error);
            }
        })
        // .catch(error => console.error('Error fetching image:', error));
};

async function mobilePostNewUserImage() {
    const registerUserObject = await handleMobileRegisterInput();
    const user_id = registerUserObject.userId;

    const registerUserImageInputElement = document.querySelector("#register-user-image-input")

    const newUserImageElement = document.querySelector("#register-user-image");
    const newUserImageInputElement = document.querySelector("#register-user-image-input")
    const newUserImageUrl = newUserImageElement.getAttribute("src")
    fetch(newUserImageUrl)
        .then(response => response.blob()) // Get the image as a Blob
        .then(async (blob) => {
            // Now 'blob' contains the image data as a Blob object
            // You can then create a File object from the blob if necessary:
            const filename = newUserImageUrl.substring(newUserImageUrl.lastIndexOf('/') + 1); // Extract filename from URL
            const imageFile = new File([blob], filename, { type: blob.type });

            console.log(imageFile); // This is your image file object
            const formData = new FormData();
            formData.append('id', user_id)
            formData.append('imageFile', imageFile); // 'image' matches the input name
        
            try {
                const response = await fetch(`/user_images`, {
                    method: 'POST',
                    body: formData,
                });
                const result = await response.json();
                console.log(result);
            } catch (error) {
                console.error('Error uploading image:', error);
            }
        })
        // .catch(error => console.error('Error fetching image:', error));
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

        alert("Updated your information.")
    
        window.location.href = newURL;
    }
};

async function updateUserFirstName() {
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

    const editUserFirstNameObj = await handleUpdateUserFirstnameInput()

    const userId = editUserFirstNameObj.userId;
    const firstname = editUserFirstNameObj.firstname;
    const lastname = editUserFirstNameObj.lastname;
    const emailaddress = editUserFirstNameObj.emailaddress;
    const phonenumber = editUserFirstNameObj.phonenumber;
    const password = editUserFirstNameObj.password;
    const session_id = editUserFirstNameObj.sessionId;

    if (user.firstname === editUserFirstNameObj.firstname) {
        alert("Input matches stored name. Please make a change before saving.")
        return
    }

    const body = { firstname, lastname, emailaddress, phonenumber, password, session_id };
    try {
        const response = await fetch(`/users/${userId}`, {
            method: "PUT",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(body)
        });
        console.log(response)
    } catch (error) {
        console.error(error)
    }

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
            name: `${firstname} ${lastname}`,
            // age: 30,
            // city: "New York"
        };
        
        let newURL = saveDataToURL(myURL, myData);
    
        if (newURL.charAt(newURL.length - 1) === '+') {
            console.log(newURL)
            let editedurl = newURL.slice(0, -1)
            newURL = editedurl
        }

        alert("Updated your first name.")
    
        window.location.href = newURL;
};

async function updateUserLastName() {
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

    const editUserLastNameObj = await handleUpdateUserLastnameInput()

    const userId = editUserLastNameObj.userId;
    const firstname = editUserLastNameObj.firstname;
    const lastname = editUserLastNameObj.lastname;
    const emailaddress = editUserLastNameObj.emailaddress;
    const phonenumber = editUserLastNameObj.phonenumber;
    const password = editUserLastNameObj.password;
    const session_id = editUserLastNameObj.sessionId;

    if (user.lastname === editUserLastNameObj.lastname) {
        alert("Input matches stored name. Please make a change before saving.")
        return
    }

    const body = { firstname, lastname, emailaddress, phonenumber, password, session_id };
    try {
        const response = await fetch(`/users/${userId}`, {
            method: "PUT",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(body)
        });
        console.log(response)
    } catch (error) {
        console.error(error)
    }

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
            name: `${firstname} ${lastname}`,
            // age: 30,
            // city: "New York"
        };
        
        let newURL = saveDataToURL(myURL, myData);
    
        if (newURL.charAt(newURL.length - 1) === '+') {
            console.log(newURL)
            let editedurl = newURL.slice(0, -1)
            newURL = editedurl
        }

        alert("Updated your last name.")
        window.location.href = newURL;
        // window.history.replaceState(null, "", newURL)
        // window.location.reload(true)
};

async function updateUserEmail() {
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

    const editUserEmailObj = await handleUpdateUserEmailInput()

    const userId = editUserEmailObj.userId;
    const firstname = editUserEmailObj.firstname;
    const lastname = editUserEmailObj.lastname;
    const emailaddress = editUserEmailObj.emailaddress;
    const phonenumber = editUserEmailObj.phonenumber;
    const password = editUserEmailObj.password;
    const session_id = editUserEmailObj.sessionId;

    if (user.emailaddress === editUserEmailObj.emailaddress) {
        alert("Input matches stored email address. Please make a change before saving.")
        return
    }

    const body = { firstname, lastname, emailaddress, phonenumber, password, session_id };
    try {
        const response = await fetch(`/users/${userId}`, {
            method: "PUT",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(body)
        });
        console.log(response)
    } catch (error) {
        console.error(error)
    }

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
            name: `${firstname} ${lastname}`,
            // age: 30,
            // city: "New York"
        };
        
        let newURL = saveDataToURL(myURL, myData);
    
        if (newURL.charAt(newURL.length - 1) === '+') {
            console.log(newURL)
            let editedurl = newURL.slice(0, -1)
            newURL = editedurl
        }

        alert("Updated your email address.")
    
        window.location.href = newURL;
};

async function updateUserPhonenumber() {
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

    const editUserPhonenumberObj = await handleUpdateUserPhonenumberInput()

    const userId = editUserPhonenumberObj.userId;
    const firstname = editUserPhonenumberObj.firstname;
    const lastname = editUserPhonenumberObj.lastname;
    const emailaddress = editUserPhonenumberObj.emailaddress;
    const phonenumber = editUserPhonenumberObj.phonenumber;
    const password = editUserPhonenumberObj.password;
    const session_id = editUserPhonenumberObj.sessionId;

    if (user.phonenumber === editUserPhonenumberObj.phonenumber) {
        alert("Input matches stored phone number. Please make a change before saving.")
        return
    }

    const body = { firstname, lastname, emailaddress, phonenumber, password, session_id };
    try {
        const response = await fetch(`/users/${userId}`, {
            method: "PUT",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(body)
        });
        console.log(response)
    } catch (error) {
        console.error(error)
    }

    const myURL = `${rootUrl}/user?user_id=${userId}&name=${firstname}+${lastname}`
    
        if (myURL.charAt(myURL.length - 1) === '+') {
            console.log(myURL)
            let editedurl = myURL.slice(0, -1)
            myURL = editedurl
        }

        alert("Updated your phone number.")
    
        window.location.href = myURL;
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

    
   alert("Updated your profile picture.")
//    window.location.reload()

};

async function putNewUserImage() {
    const allUsers = await getAllUsers();
    const sessionId = sessionStorage.getItem("user");
    let matchingUser;
    for (let i = 0; i < allUsers.length; i++) {
        if (allUsers[i].session_id === sessionId) {
            matchingUser = allUsers[i]
        }
    }
    const user_id = matchingUser.user_id;
    const imageFile = await handleUploadImageInput();
    console.log(imageFile)

        //   if (imageFile) {
            const formData = new FormData();
            formData.append('id', user_id)
            formData.append('editUserAddPhoto', imageFile); // 'image' matches the input name

            try {
                const response = await fetch(`/user_images/${user_id}`, {
                    method: 'PUT',
                    body: formData,
                });
                const result = await response.json();
                console.log(result);
            } catch (error) {
                console.error('Error uploading image:', error);
            }
        // }

         const editUserAddPhotoInputElement = document.querySelector("#edit-user-add-photo");
         editUserAddPhotoInputElement.value = ""

         alert("Updated your profile picture.")
         window.location.reload()
};

async function mobilePutNewUserImage() {
    const allUsers = await getAllUsers();
    const sessionId = sessionStorage.getItem("user");
    let matchingUser;
    for (let i = 0; i < allUsers.length; i++) {
        if (allUsers[i].session_id === sessionId) {
            matchingUser = allUsers[i]
        }
    }
    const user_id = matchingUser.user_id;
    const imageFile = await mobileHandleUploadImageInput();
    console.log(imageFile)

        //   if (imageFile) {
            const formData = new FormData();
            formData.append('id', user_id)
            formData.append('editUserAddPhoto', imageFile); // 'image' matches the input name

            try {
                const response = await fetch(`/user_images/${user_id}`, {
                    method: 'PUT',
                    body: formData,
                });
                const result = await response.json();
                console.log(result);
            } catch (error) {
                console.error('Error uploading image:', error);
            }
        // }

         const editUserAddPhotoInputElement = document.querySelector("#mobile-edit-user-add-photo");
         editUserAddPhotoInputElement.value = ""

         alert("Updated your profile picture.")
         window.location.reload()
};

async function deleteUserImage() {
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
        const response = await fetch(`/user_images/${user_id}`, {
            method: "DELETE",
            headers: { "Content-Type": "application/json" },
        });
        console.log(response)
    } catch (error) {
        console.error(error)
    }
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
    // const user_image = user.user_image;

    const body = { firstname, lastname, emailaddress, phonenumber, password, session_id };
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
await deleteAllUserGroups()
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
    const gender = newContactObject.gender;
    const birthday = newContactObject.birthday;
    const organization = newContactObject.organization;
    const organization_role = newContactObject.role;
    const notes = newContactObject.notes;
    // const contact_image = newContactObject.contactImage;

    if (firstname === null || firstname.toString().trim().length === 0) {
        alert("First Name is a required input field. Please enter a first name.");
        return
    }

    // if (emailaddress === null || emailaddress.toString().trim().length === 0) {
    //     alert("Email is a required input field. Please enter an email.");
    //     return
    // }

    const body = { user_id, contact_id, firstname, lastname, gender, birthday, organization, organization_role, notes};
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
};

async function getContactImages(user_id) {
    try {
    const response = await fetch(`/contact_images/${user_id}`);
    const jsonData = await response.json();
    return jsonData;   
    } catch (err) {
    console.error(err.message)
    }
};

async function getAContactImage(user_id, contact_id) {
    try {
    const response = await fetch(`/contact_images/${user_id}/${contact_id}`);
    const jsonData = await response.json();
    return jsonData;   
    } catch (err) {
    console.error(err.message)
    }
};

async function getAContactEmailAddresses(user_id, contact_id) {
    try {
    const response = await fetch(`/contactEmailAddresses/${user_id}/${contact_id}`);
    const jsonData = await response.json();
    return jsonData;   
    } catch (err) {
    console.error(err.message)
    }
};

async function getAContactPhoneNumber(user_id, contact_id) {
    try {
    const response = await fetch(`/contactPhoneNumbers/${user_id}/${contact_id}`);
    const jsonData = await response.json();
    return jsonData;   
    } catch (err) {
    console.error(err.message)
    }
};

async function getAContactAddress(user_id, contact_id) {
    try {
    const response = await fetch(`/contactAddresses/${user_id}/${contact_id}`);
    const jsonData = await response.json();
    return jsonData;   
    } catch (err) {
    console.error(err.message)
    }
};

async function getAContactWebsite(user_id, contact_id) {
    try {
    const response = await fetch(`/contactWebsites/${user_id}/${contact_id}`);
    const jsonData = await response.json();
    return jsonData;   
    } catch (err) {
    console.error(err.message)
    }
};

async function postNewContactImage() {
    const allUsers = await getAllUsers();
    const sessionId = sessionStorage.getItem("user");
    let matchingUser;
    for (let i = 0; i < allUsers.length; i++) {
        if (allUsers[i].session_id === sessionId) {
            matchingUser = allUsers[i]
        }
    }
    // const newContactObject = await handleNewContactInput();
    // const contact_id = newContactObject.contactId;

    const user_id = matchingUser.user_id;
    // const imageFile = await handleUploadNewContactImageInput();
    const contactImageObj = await handleUploadNewContactImageInput()
    const contact_id = contactImageObj.contactImageId;
    const imageFile = contactImageObj.imageFile;
    console.log(imageFile)


        //   if (imageFile) {
            const formData = new FormData();
            formData.append('id', user_id);
            formData.append('contact_id', contact_id)
            formData.append('newContactAddPhoto', imageFile); // 'image' matches the input name

            try {
                const response = await fetch(`/contact_images`, {
                    method: 'POST',
                    body: formData,
                });
                const result = await response.json();
                console.log(result);
            } catch (error) {
                console.error('Error uploading image:', error);
            }
        // }

         const newContactAddPhotoInputElement = document.querySelector("#new-contact-add-photo");
         newContactAddPhotoInputElement.value = ""

        //  alert("Updated your profile picture.")
        //  window.location.reload()
};

async function deleteContactImages() {
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
    
    try {
        const response = await fetch(`/contact_images/${user_id}/${contact_id}`, {
            method: "DELETE",
            headers: { "Content-Type": "application/json" },
        });
        console.log(response)
    } catch (error) {
        console.error(error)
    }
};

async function putContactImage() {
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

    console.log(contact_id)

    const imageFile = await handleEditContactUploadImageInput();
    console.log(imageFile)

        //   if (imageFile) {
            const formData = new FormData();
            formData.append('id', contact_id)
            formData.append('editContactAddPhoto', imageFile); // 'image' matches the input name

            try {
                const response = await fetch(`/contact_images/${user_id}/${contact_id}`, {
                    method: 'PUT',
                    body: formData,
                });
                const result = await response.json();
                console.log(result);
            } catch (error) {
                console.error('Error uploading image:', error);
            }
        // }

         const editContactAddPhotoInputElement = document.querySelector("#edit-contact-add-photo");
         editContactAddPhotoInputElement.value = "";

         alert("Updated contact image.")
         window.location.reload();
};

async function postNewContactEmailAddress() {
    const newContactObj = await handleNewContactInput();

    const user_id = newContactObj.userId;
    const contact_id = newContactObj.contactId;
    const email_id = 1;
    const emailAddressLabel = newContactObj.emailAddressLabel;
    const emailaddress = newContactObj.emailAddress;

    if (emailaddress === '') {
        return
    };

    const body = { user_id, contact_id, email_id, emailAddressLabel, emailaddress };
    try {
        const response = await fetch(`/contactEmailAddresses`, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(body)
        });
        console.log(response)
    } catch (err) {
        console.error(err)
    }
};

async function postNewContactPhoneNumber() {
    const newContactObj = await handleNewContactInput();

    const user_id = newContactObj.userId;
    const contact_id = newContactObj.contactId;
    const phonenumber_id = 1;
    const phoneNumberLabel = newContactObj.phonenumberLabel;
    const phonenumber = newContactObj.phonenumber;

    if (phonenumber === '') {
        return
    };

    const body = { user_id, contact_id, phonenumber_id, phoneNumberLabel, phonenumber };
    try {
        const response = await fetch(`/contactPhoneNumbers`, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(body)
        });
        console.log(response)
    } catch (err) {
        console.error(err)
    }
};

async function postNewContactAddress() {
    const newContactObj = await handleNewContactInput();

    const user_id = newContactObj.userId;
    const contact_id = newContactObj.contactId;
    const address_id = 1;
    const addressLabel = newContactObj.addressLabel;
    const address = newContactObj.address;

    if (address === '') {
        return
    };

    const body = { user_id, contact_id, address_id, addressLabel, address };
    try {
        const response = await fetch(`/contactAddresses`, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(body)
        });
        console.log(response)
    } catch (err) {
        console.error(err)
    }
};

async function updateContactEmailAddress() {
    const editContactEmailObj = await handleUpdateContactEmailInput();

    const userid = editContactEmailObj.userId;
    const contactid = editContactEmailObj.contactId;
    const emailid = editContactEmailObj.emailid;
    const emailAddressLabel = editContactEmailObj.emailaddresslabel;
    const emailaddress = editContactEmailObj.emailaddress;

    const body = { userid, contactid, emailid, emailAddressLabel, emailaddress };
    try {
        const response = await fetch(`/contactEmailAddresses/${userid}/${contactid}/${emailid}`, {
            method: "PUT",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(body)
        });
        console.log(response)
    } catch (err) {
        console.error(err)
    };

    alert("Updated contact email address");
    window.location.reload();
};

async function updateContactEmailAddressLabel() {
    const editContactEmailLabelObj = await handleEditContactEmailLabelInput();

    console.log(editContactEmailLabelObj)

    const userid = editContactEmailLabelObj.userId;
    const contactid = editContactEmailLabelObj.contactId;
    const emailid = editContactEmailLabelObj.emailId;
    const emailAddressLabel = editContactEmailLabelObj.emailaddresslabel;
    const emailaddress = editContactEmailLabelObj.emailaddress;

    const body = { userid, contactid, emailid, emailAddressLabel, emailaddress };
    try {
        const response = await fetch(`/contactEmailAddresses/${userid}/${contactid}/${emailid}`, {
            method: "PUT",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(body)
        });
        console.log(response)
    } catch (err) {
        console.error(err)
    };

    alert("Updated contact's email label.")
    window.location.reload()
};

async function deleteContactEmailAddresses() {
    const deleteContactEmailObj = await handleDeleteContactEmail();

    const userid = deleteContactEmailObj.userId;
    const contactid = deleteContactEmailObj.contactId;
    const emailId = deleteContactEmailObj.emailAddressId;
    const emailAddressLabel = deleteContactEmailObj.emailaddresslabel;
    const emailaddress = deleteContactEmailObj.emailaddress;

    const body = { userid, contactid };
    try {
        const response = await fetch(`/contactEmailAddresses/${userid}/${contactid}`, {
            method: "DELETE",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(body)
        });
        console.log(response)
    } catch (err) {
        console.error(err)
    };

    // alert("Removed contact email address.");
    // window.location.reload();
};

async function deleteContactEmailAddress() {
    const deleteContactEmailObj = await handleDeleteContactEmail();

    const userid = deleteContactEmailObj.userId;
    const contactid = deleteContactEmailObj.contactId;
    const emailId = deleteContactEmailObj.emailAddressId;
    const emailAddressLabel = deleteContactEmailObj.emailaddresslabel;
    const emailaddress = deleteContactEmailObj.emailaddress;

    const body = { userid, contactid, emailId, emailAddressLabel, emailaddress };
    try {
        const response = await fetch(`/contactEmailAddresses/${userid}/${contactid}/${emailId}`, {
            method: "DELETE",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(body)
        });
        console.log(response)
    } catch (err) {
        console.error(err)
    };

    alert("Removed contact email address.");
    window.location.reload();
};

async function postAddNewContactEmailAddress() {
    const newContactEmailObj = await handleAddNewContactEmailInput();

    const user_id = newContactEmailObj.userId;
    const contact_id = newContactEmailObj.contactId;
    const email_id = newContactEmailObj.emailId;
    const emailAddressLabel = newContactEmailObj.emailaddresslabel;
    const emailaddress = newContactEmailObj.emailaddress;

    const contactEmailAddresses = await getAContactEmailAddresses(user_id, contact_id)

    if (contactEmailAddresses.length === 6) {
        alert("Contact's cannot have more than six emails listed.");
        return
    }

    const body = { user_id, contact_id, email_id, emailAddressLabel, emailaddress };
    try {
        const response = await fetch(`/contactEmailAddresses`, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(body)
        });
        console.log(response)
    } catch (err) {
        console.error(err)
    };

    alert("Added new emailaddress for contact.")
    window.location.reload()
};

async function postAddNewContactPhoneNumber() {
    const newContactPhoneNumberObj = await handleAddNewContactPhoneNumberInput();

    const user_id = newContactPhoneNumberObj.userId;
    const contact_id = newContactPhoneNumberObj.contactId;
    const phonenumber_id = newContactPhoneNumberObj.phonenumberId;
    const phoneNumberLabel = newContactPhoneNumberObj.phonenumberlabel;
    const phonenumber = newContactPhoneNumberObj.phonenumber;

    const contactPhoneNumbers = await getAContactPhoneNumber(user_id, contact_id);

    if (contactPhoneNumbers.length === 6) {
        alert("Contacts cannot have more than six phone numbers listed.");
        return
    }

    const body = { user_id, contact_id, phonenumber_id, phoneNumberLabel, phonenumber };
    try {
        const response = await fetch(`/contactPhoneNumbers`, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(body)
        });
        console.log(response)
    } catch (err) {
        console.error(err)
    };

    alert("Added new phone number for contact.");
    window.location.reload();
};

async function updateContactPhoneNumberLabel() {
    const editContactPhoneNumberLabelObj = await handleEditContactPhoneNumberLabelInput();

    console.log(editContactPhoneNumberLabelObj)

    const userid = editContactPhoneNumberLabelObj.userId;
    const contactid = editContactPhoneNumberLabelObj.contactId;
    const phonenumberid = editContactPhoneNumberLabelObj.phoneNumberId;
    const phoneNumberLabel = editContactPhoneNumberLabelObj.phonenumberlabel;
    const phonenumber = editContactPhoneNumberLabelObj.phonenumber;

    const body = { userid, contactid, phonenumberid, phoneNumberLabel, phonenumber };
    try {
        const response = await fetch(`/contactPhoneNumbers/${userid}/${contactid}/${phonenumberid}`, {
            method: "PUT",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(body)
        });
        console.log(response)
    } catch (err) {
        console.error(err)
    };

    alert("Updated contact's phone number label.");
    window.location.reload()
};


async function updateContactPhoneNumber() {
    const editContactPhoneNumberObj = await handleUpdateContactPhoneNumberInput();

    const userid = editContactPhoneNumberObj.userId;
    const contactid = editContactPhoneNumberObj.contactId;
    const phonenumberid = editContactPhoneNumberObj.phonenumberid;
    const phoneNumberLabel = editContactPhoneNumberObj.phonenumberlabel;
    const phonenumber = editContactPhoneNumberObj.phonenumber;

    if (phonenumber.length < 10) {
        alert("Please enter at least 10 digits for a phone number.");
        return
    }

    const body = { userid, contactid, phonenumberid, phoneNumberLabel, phonenumber };
    try {
        const response = await fetch(`/contactPhoneNumbers/${userid}/${contactid}/${phonenumberid}`, {
            method: "PUT",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(body)
        });
        console.log(response)
    } catch (err) {
        console.error(err)
    };

    alert("Updated contact phone number.")
    window.location.reload()
};

async function deleteContactPhoneNumber() {
    const deleteContactPhoneNumberObj = await handleDeleteContactPhoneNumber();

    console.log(deleteContactPhoneNumberObj)

    const userid = deleteContactPhoneNumberObj.userId;
    const contactid = deleteContactPhoneNumberObj.contactId;
    const phonenumberid = deleteContactPhoneNumberObj.phoneNumberId;
    const phoneNumberLabel = deleteContactPhoneNumberObj.phonenumberlabel;
    const phonenumber = deleteContactPhoneNumberObj.phonenumber;

    const body = { userid, contactid, phonenumberid, phoneNumberLabel, phonenumber };
    try {
        const response = await fetch(`/contactPhoneNumbers/${userid}/${contactid}/${phonenumberid}`, {
            method: "DELETE",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(body)
        });
        console.log(response)
    } catch (err) {
        console.error(err)
    };

    alert("Removed contact phone number.");
    window.location.reload();
};

async function deleteContactPhoneNumbers() {
    const deleteContactPhoneNumberObj = await handleDeleteContactPhoneNumber();

    console.log(deleteContactPhoneNumberObj)

    const userid = deleteContactPhoneNumberObj.userId;
    const contactid = deleteContactPhoneNumberObj.contactId;
    const phonenumberid = deleteContactPhoneNumberObj.phoneNumberId;
    const phoneNumberLabel = deleteContactPhoneNumberObj.phonenumberlabel;
    const phonenumber = deleteContactPhoneNumberObj.phonenumber;

    const body = { userid, contactid };
    try {
        const response = await fetch(`/contactPhoneNumbers/${userid}/${contactid}`, {
            method: "DELETE",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(body)
        });
        console.log(response)
    } catch (err) {
        console.error(err)
    };

    // alert("Removed contact phone number.");
    // window.location.reload();
};

async function postAddNewContactAddress() {
    const newContactAddressObj = await handleAddNewContactAddressInput();

    const user_id = newContactAddressObj.userId;
    const contact_id = newContactAddressObj.contactId;
    const address_id = newContactAddressObj.addressId;
    const addressLabel = newContactAddressObj.addresslabel;
    const address = newContactAddressObj.address;

    const contactAddresses = await getAContactAddress(user_id, contact_id);

    if (contactAddresses.length === 6) {
        alert("Contact cannot have more than six addresses listed");
        return
    }

    const body = { user_id, contact_id, address_id, addressLabel, address };
    try {
        const response = await fetch(`/contactAddresses`, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(body)
        });
        console.log(response)
    } catch (err) {
        console.error(err)
    };

    alert("Added new address for contact.");
    window.location.reload();
};

async function updateContactAddress() {
    const editContactAddressObj = await handleUpdateContactAddressInput();

    const userid = editContactAddressObj.userId;
    const contactid = editContactAddressObj.contactId;
    const addressid = editContactAddressObj.addressid;
    const addressLabel = editContactAddressObj.addresslabel;
    const address = editContactAddressObj.address;

    const body = { userid, contactid, addressid, addressLabel, address };
    try {
        const response = await fetch(`/contactAddresses/${userid}/${contactid}/${addressid}`, {
            method: "PUT",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(body)
        });
        console.log(response)
    } catch (err) {
        console.error(err)
    }

    alert("Updated contact address.");
    window.location.reload();
};

async function updateContactAddressLabel() {
    const editContactAddressLabelObj = await handleEditContactAddressLabelInput();

    console.log(editContactAddressLabelObj)

    const userid = editContactAddressLabelObj.userId;
    const contactid = editContactAddressLabelObj.contactId;
    const addressid = editContactAddressLabelObj.addressId;
    const addressLabel = editContactAddressLabelObj.addresslabel;
    const address = editContactAddressLabelObj.address;

    const body = { userid, contactid, addressid, addressLabel, address };
    try {
        const response = await fetch(`/contactAddresses/${userid}/${contactid}/${addressid}`, {
            method: "PUT",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(body)
        });
        console.log(response)
    } catch (err) {
        console.error(err)
    };

    alert("Updated contact's address label.");
    window.location.reload();
};


async function deleteContactAddress() {
    const deleteContactAddressObj = await handleDeleteContactAddress();

    const userid = deleteContactAddressObj.userId;
    const contactid = deleteContactAddressObj.contactId;
    const addressid = deleteContactAddressObj.addressId;
    const addressLabel = deleteContactAddressObj.addresslabel;
    const address = deleteContactAddressObj.address;

    const body = { userid, contactid, addressid, addressLabel, address };
    try {
        const response = await fetch(`/contactAddresses/${userid}/${contactid}/${addressid}`, {
            method: "DELETE",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(body)
        });
        console.log(response)
    } catch (err) {
        console.error(err)
    };

    alert("Removed contact address.");
    window.location.reload();
};

async function deleteContactAddresses() {
    const deleteContactAddressObj = await handleDeleteContactAddress();

    const userid = deleteContactAddressObj.userId;
    const contactid = deleteContactAddressObj.contactId;
    const addressid = deleteContactAddressObj.addressId;
    const addressLabel = deleteContactAddressObj.addresslabel;
    const address = deleteContactAddressObj.address;

    const body = { userid, contactid };
    try {
        const response = await fetch(`/contactAddresses/${userid}/${contactid}`, {
            method: "DELETE",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(body)
        });
        console.log(response)
    } catch (err) {
        console.error(err)
    };

    // alert("Removed contact address.");
    // window.location.reload();
};

async function postNewContactWebsite() {
    const newContactObj = await handleNewContactInput();
    console.log(newContactObj)

    const user_id = newContactObj.userId;
    const contact_id = newContactObj.contactId;
    const website_id = 1;
    const websiteLabel = newContactObj.websiteLabel;
    const website = newContactObj.website;

    if (website === '') {
        return
    };

    const body = { user_id, contact_id, website_id, websiteLabel, website };
    try {
        const response = await fetch(`/contactWebsites`, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(body)
        });
        console.log(response)
    } catch (err) {
        console.error(err)
    }
};

async function postAddNewContactWebsite() {
    const newContactWebsiteObj = await handleAddNewContactWebsiteInput();

    const user_id = newContactWebsiteObj.userId;
    const contact_id = newContactWebsiteObj.contactId;
    const website_id = newContactWebsiteObj.websiteId;
    const websiteLabel = newContactWebsiteObj.websitelabel;
    const website = newContactWebsiteObj.website;

    const contactWebsites = await getAContactWebsite(user_id, contact_id);

    if (contactWebsites.length === 6) {
        alert("Contact cannot have more than six websites listed.");
        return
    }

    const body = { user_id, contact_id, website_id, websiteLabel, website };
    try {
        const response = await fetch(`/contactWebsites`, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(body)
        });
        console.log(response)
    } catch (err) {
        console.error(err)
    };

    alert("Added new website for contact.")
    window.location.reload()

};

async function updateContactWebsiteLabel() {
    const editContactWebsiteLabelObj = await handleEditContactWebsiteLabelInput();

    console.log(editContactWebsiteLabelObj)

    const userid = editContactWebsiteLabelObj.userId;
    const contactid = editContactWebsiteLabelObj.contactId;
    const websiteid = editContactWebsiteLabelObj.websiteId;
    const websiteLabel = editContactWebsiteLabelObj.websitelabel;
    const website = editContactWebsiteLabelObj.website;

    const body = { userid, contactid, websiteid, websiteLabel, website };
    try {
        const response = await fetch(`/contactWebsites/${userid}/${contactid}/${websiteid}`, {
            method: "PUT",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(body)
        });
        console.log(response)
    } catch (err) {
        console.error(err)
    };

    alert("Updated contact's website label.");
    window.location.reload();
};

async function updateContactWebsite() {
    const editContactWebsiteObj = await handleUpdateContactWebsiteInput();

    const userid = editContactWebsiteObj.userId;
    const contactid = editContactWebsiteObj.contactId;
    const websiteid = editContactWebsiteObj.websiteid;
    const websiteLabel = editContactWebsiteObj.websitelabel;
    const website = editContactWebsiteObj.website;

    console.log(websiteid)

    const body = { userid, contactid, websiteid, websiteLabel, website };
    try {
        const response = await fetch(`/contactWebsites/${userid}/${contactid}/${websiteid}`, {
            method: "PUT",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(body)
        });
        console.log(response)
    } catch (err) {
        console.error(err)
    };

    alert("Updated contact website.");
    window.location.reload();
};

async function deleteContactWebsite() {
    const deleteContactWebsiteObj = await handleDeleteContactWebsite();

    const userid = deleteContactWebsiteObj.userId;
    const contactid = deleteContactWebsiteObj.contactId;
    const websiteid = deleteContactWebsiteObj.websiteId;
    const websiteLabel = deleteContactWebsiteObj.websitelabel;
    const website = deleteContactWebsiteObj.website;

    const body = { userid, contactid, websiteid, websiteLabel, website };
    try {
        const response = await fetch(`/contactWebsites/${userid}/${contactid}/${websiteid}`, {
            method: "DELETE",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(body)
        });
        console.log(response)
    } catch (err) {
        console.error(err)
    };

    alert("Removed contact website.");
    window.location.reload();
};

async function deleteContactWebsites() {
    const deleteContactWebsiteObj = await handleDeleteContactWebsite();

    const userid = deleteContactWebsiteObj.userId;
    const contactid = deleteContactWebsiteObj.contactId;
    const websiteid = deleteContactWebsiteObj.websiteId;
    const websiteLabel = deleteContactWebsiteObj.websitelabel;
    const website = deleteContactWebsiteObj.website;

    const body = { userid, contactid };
    try {
        const response = await fetch(`/contactWebsites/${userid}/${contactid}`, {
            method: "DELETE",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(body)
        });
        console.log(response)
    } catch (err) {
        console.error(err)
    };

    // alert("Removed contact website.");
    // window.location.reload();
};

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
    const website = editContactObject.website;
    const favorite = editContactObject.favorite;
    const notes = editContactObject.notes;
    const contact_image = editContactObject.contactImage;

    const body = { firstname, lastname, emailaddress, phonenumber, birthday, gender, birthday, homeaddress, organization, organization_role, website, favorite, notes, contact_image };
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

    alert("Contact updated.")
    window.location.href = newURL
};

async function updateContactFirstName() {
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
    const editContactFirstNameObject = await handleEditContactFirstNameInput();
    // console.log(user_id)
    // console.log(contact_id)

    const firstname = editContactFirstNameObject.firstname;
    const lastname = editContactFirstNameObject.lastname;
    // const emailaddress = editContactFirstNameObject.emailaddress;
    // const phonenumber = editContactFirstNameObject.phonenumber;
    const birthday = editContactFirstNameObject.birthday;
    // const homeaddress = editContactFirstNameObject.address;
    const gender = editContactFirstNameObject.gender;
    const organization = editContactFirstNameObject.organization;
    const organization_role = editContactFirstNameObject.role;
    // const website = editContactFirstNameObject.website;
    const favorite = editContactFirstNameObject.favorite;
    const notes = editContactFirstNameObject.notes;
    // const contact_image = editContactFirstNameObject.contactImage;

    const body = { firstname, lastname, birthday, gender, organization, organization_role, favorite, notes };
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

    alert("Contact first name updated.")
    window.location.href = newURL
};

async function updateContactLastName() {
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
    const editContactLastNameObject = await handleEditContactLastNameInput();
    // console.log(user_id)
    // console.log(contact_id)

    const firstname = editContactLastNameObject.firstname;
    const lastname = editContactLastNameObject.lastname;
    // const emailaddress = editContactLastNameObject.emailaddress;
    // const phonenumber = editContactLastNameObject.phonenumber;
    const birthday = editContactLastNameObject.birthday;
    // const homeaddress = editContactLastNameObject.address;
    const gender = editContactLastNameObject.gender;
    const organization = editContactLastNameObject.organization;
    const organization_role = editContactLastNameObject.role;
    // const website = editContactLastNameObject.website;
    const favorite = editContactLastNameObject.favorite;
    const notes = editContactLastNameObject.notes;
    // const contact_image = editContactLastNameObject.contactImage;

    const body = { firstname, lastname, birthday, gender, organization, organization_role, favorite, notes };
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

    alert("Contact last name updated.")
    window.location.href = newURL
};

async function updateContactGender() {
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
    const editContactGenderObj = await handleEditContactGenderInput();
    // console.log(user_id)
    // console.log(contact_id)

    const firstname = editContactGenderObj.firstname;
    const lastname = editContactGenderObj.lastname;
    // const emailaddress = editContactGenderObj.emailaddress;
    // const phonenumber = editContactGenderObj.phonenumber;
    const birthday = editContactGenderObj.birthday;
    // const homeaddress = editContactGenderObj.address;
    const gender = editContactGenderObj.gender;
    const organization = editContactGenderObj.organization;
    const organization_role = editContactGenderObj.role;
    // const website = editContactGenderObj.website;
    const favorite = editContactGenderObj.favorite;
    const notes = editContactGenderObj.notes;
    // const contact_image = editContactGenderObj.contactImage;

    const body = { firstname, lastname, birthday, gender, organization, organization_role, favorite, notes };
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

    alert("Contact gender updated.")
    window.location.reload()
};

async function updateContactBirthday() {
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
    const editContactBirthdayObj = await handleEditContactBirthdayInput();
    // console.log(user_id)
    // console.log(contact_id)

    const firstname = editContactBirthdayObj.firstname;
    const lastname = editContactBirthdayObj.lastname;
    // const emailaddress = editContactBirthdayObj.emailaddress;
    // const phonenumber = editContactBirthdayObj.phonenumber;
    const birthday = editContactBirthdayObj.birthday;
    // const homeaddress = editContactBirthdayObj.address;
    const gender = editContactBirthdayObj.gender;
    const organization = editContactBirthdayObj.organization;
    const organization_role = editContactBirthdayObj.role;
    // const website = editContactBirthdayObj.website;
    const favorite = editContactBirthdayObj.favorite;
    const notes = editContactBirthdayObj.notes;
    // const contact_image = editContactBirthdayObj.contactImage;

    const body = { firstname, lastname, birthday, gender, organization, organization_role, favorite, notes };
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

    alert("Contact birthday updated.")
    window.location.reload()
};

async function updateContactOrganization() {
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
    const editContactOrganizationObj = await handleEditContactOrganizationInput();
    // console.log(user_id)
    // console.log(contact_id)

    const firstname = editContactOrganizationObj.firstname;
    const lastname = editContactOrganizationObj.lastname;
    // const emailaddress = editContactOrganizationObj.emailaddress;
    // const phonenumber = editContactOrganizationObj.phonenumber;
    const birthday = editContactOrganizationObj.birthday;
    // const homeaddress = editContactOrganizationObj.address;
    const gender = editContactOrganizationObj.gender;
    const organization = editContactOrganizationObj.organization;
    const organization_role = editContactOrganizationObj.role;
    // const website = editContactOrganizationObj.website;
    const favorite = editContactOrganizationObj.favorite;
    const notes = editContactOrganizationObj.notes;
    // const contact_image = editContactOrganizationObj.contactImage;

    const body = { firstname, lastname, birthday, gender, organization, organization_role, favorite, notes };
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

    alert("Contact organization updated.")
    window.location.reload()
};

async function updateContactOrganizationRole() {
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
    const editContactOrganizationRoleObj = await handleEditContactOrganizationRoleInput();
    // console.log(user_id)
    // console.log(contact_id)

    const firstname = editContactOrganizationRoleObj.firstname;
    const lastname = editContactOrganizationRoleObj.lastname;
    // const emailaddress = editContactOrganizationRoleObj.emailaddress;
    // const phonenumber = editContactOrganizationRoleObj.phonenumber;
    const birthday = editContactOrganizationRoleObj.birthday;
    // const homeaddress = editContactOrganizationRoleObj.address;
    const gender = editContactOrganizationRoleObj.gender;
    const organization = editContactOrganizationRoleObj.organization;
    const organization_role = editContactOrganizationRoleObj.role;
    // const website = editContactOrganizationRoleObj.website;
    const favorite = editContactOrganizationRoleObj.favorite;
    const notes = editContactOrganizationRoleObj.notes;
    // const contact_image = editContactOrganizationRoleObj.contactImage;

    const body = { firstname, lastname, birthday, gender, organization, organization_role, favorite, notes };
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

    alert("Contact role updated.")
    window.location.reload()
};

async function updateContactNotes() {
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
    const editContacNotesObj = await handleEditContactNotesInput();
    // console.log(user_id)
    // console.log(contact_id)

    const firstname = editContacNotesObj.firstname;
    const lastname = editContacNotesObj.lastname;
    // const emailaddress = editContacNotesObj.emailaddress;
    // const phonenumber = editContacNotesObj.phonenumber;
    const birthday = editContacNotesObj.birthday;
    // const homeaddress = editContacNotesObj.address;
    const gender = editContacNotesObj.gender;
    const organization = editContacNotesObj.organization;
    const organization_role = editContacNotesObj.role;
    // const website = editContacNotesObj.website;
    const favorite = editContacNotesObj.favorite;
    const notes = editContacNotesObj.notes;
    // const contact_image = editContacNotesObj.contactImage;

    const body = { firstname, lastname, birthday, gender, organization, organization_role, favorite, notes };
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

    alert("Contact notes updated.")
    window.location.reload()
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

// async function updateContactImage() {
// const allUsers = await getAllUsers();
//     const sessionId = sessionStorage.getItem("user");
//     let matchingUser;
//     for (let i = 0; i < allUsers.length; i++) {
//         if (allUsers[i].session_id === sessionId) {
//             matchingUser = allUsers[i]
//         }
//     }
//     const user_id = matchingUser.user_id;
//     const url = window.location.href.toString()
//     const urlBeforeQuery = url.split('?')[0];
//     const contact_id = urlBeforeQuery.split('contact_')[1]
//     // const contact_id = urlBeforeQuery.charAt(urlBeforeQuery.length - 1);
//     const editContactImageObject = await handleEditContactImage()

//     const firstname = editContactImageObject.firstname;
//     const lastname = editContactImageObject.lastname;
//     const emailaddress = editContactImageObject.emailaddress;
//     const phonenumber = editContactImageObject.phonenumber;
//     const birthday = editContactImageObject.birthday;
//     const homeaddress = editContactImageObject.address;
//     const gender = editContactImageObject.gender;
//     const organization = editContactImageObject.organization;
//     const organization_role = editContactImageObject.role;
//     const social_media = editContactImageObject.socialMedia;
//     const notes = editContactImageObject.notes
//     const favorite = editContactImageObject.favorite;
//     const contact_image = editContactImageObject.contactImage;

//     const body = { firstname, lastname, emailaddress, phonenumber, birthday, gender, birthday, homeaddress, organization, organization_role, social_media, notes, favorite, contact_image };
//     try {
//         const response = await fetch(`/contacts/${user_id}/${contact_id}`, {
//             method: "PUT",
//             headers: { "Content-Type": "application/json" },
//             body: JSON.stringify(body)
//         });
//         console.log(response)
//     } catch (error) {
//         console.error(error)
//     };

// //    window.location.reload()
// };

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

    if (favoriteValue === true) {
        alert("Added contact as a favorite.")
    } else {
        alert("Removed contact as favorite.")
    }

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

    alert("Contact removed.")
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

    alert("New group")
    window.location.href = `${rootUrl}/groups`
};

async function mobilePostNewUserGroup() {
    const newUserGroup = await mobileHandleCreateGroupInput();
    console.log(newUserGroup)

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

    alert("New group")
    window.location.href = `${rootUrl}/groups`
};

async function editUserGroup() {
    const editedUserGroup = await handleEditGroupNameInput();

    const user_id = editedUserGroup.userId;
    const group_id = editedUserGroup.groupId;
    const groupName = editedUserGroup.groupName

    if (groupName === "") {
        alert("Updating group name requires a value. Please enter a value to continue.")
        return
    }

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

    alert("Group name updated.")
    window.location.href = `${rootUrl}/groups`
};

async function mobileEditUserGroup() {
    const editedUserGroup = await mobileHandleEditGroupNameInput();

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

    alert("Group name updated.")
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
    alert("Group removed.")
    // window.location.href = `${rootUrl}/groups`
};

async function mobileDeleteUserGroup(group_id) {
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
    alert("Group removed.")
    // window.location.href = `${rootUrl}/groups`
};

async function deleteAllUserGroups() {
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
        const response = await fetch(`/groups/${user_id}`, {
            method: "DELETE",
            headers: { "Content-Type": "application/json" },
        });
        console.log(response)
    } catch (error) {
        console.error(error)
    }

    localStorage.clear()
}

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

    alert("Contact groupings updated.")
    // window.location.href = `${rootUrl}/groups`
};

async function mobilePostNewContactGrouping() {
    const newContactGroupings = await mobileHandleManageContactGroupsInput();
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

    alert("Contact groupings updated.")
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

async function mobileDeleteContactGrouping(group_id) {
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

async function mobileDeleteAContactGrouping() {
// const allUsers = await getAllUsers();
//     const sessionId = sessionStorage.getItem("user");
//     let matchingUser;
//     for (let i = 0; i < allUsers.length; i++) {
//         if (allUsers[i].session_id === sessionId) {
//             matchingUser = allUsers[i]
//         }
//     }
//     const user_id = matchingUser.user_id;

    const removeContactGroupings = await mobileHandleManageContactGroupsInput();
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

async function deleteAllUserContactGroupings() {
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
        const response = await fetch(`/contactGroups/${user_id}`, {
            method: "DELETE",
            headers: { "Content-Type": "application/json" },
        });
        console.log(response)
    } catch (error) {
        console.error(error)
    }
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
    // console.log(phonenumber)

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

// async function domReady(cb) {
//     // if (document.readyState === 'loading') {
//     //     document.body.style.visibility = "hidden";
//     //     document.body.style.opacity = "0"
//     // }

//     document.readyState === 'interactive' || document.readyState === 'complete' || document.readyState === 'loading'
//     ? cb
//     : document.addEventListener("DOMContentLoaded", cb)
// };

async function showPages() {
    // console.log("show pages")
    const offsetwidth = document.body.offsetwidth;
    const clientwidth = window.innerWidth;

    // console.log(offsetwidth);
    // console.log(clientwidth);
    await setInitialURLAsLogin()

    const allUsers = await getAllUsers();
    const sessionId = sessionStorage.getItem("user");
    let matchingUser;
    for (let i = 0; i < allUsers.length; i++) {
        if (allUsers[i].session_id === sessionId) {
            matchingUser = allUsers[i]
        }
    }

    const loginViewElement = document.querySelector("#login-view");
    const registerViewElement = document.querySelector("#register-view");
    const recoverPasswordViewElement = document.querySelector("#recover-password-view");
    if (matchingUser === undefined && window.location.href === `${rootUrl}/login` && clientwidth > 1070) {
        loginViewElement.style.display = "block"
        await renderLoginContent()
        return
    } else if (matchingUser === undefined && window.location.href === `${rootUrl}/register` && clientwidth > 1070) {
        registerViewElement.style.display = "block"
        await renderRegisterContent()
        return
    } else if (matchingUser === undefined && window.location.href === `${rootUrl}/recover-password` && clientwidth > 1070) {
        recoverPasswordViewElement.style.display = "block"
        await renderRecoverPassword()
        return
    }
    // console.log(matchingUser)
    const userId = matchingUser.user_id;
    // const user = await getUser(userId);

    const userImage = await getAUserImage(userId)

    const imageString = `data:${userImage.contentType};base64,${userImage.image}`


    const appName = document.querySelector("#app-name");
    appName.style.pointerEvents = "none";
    
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
    if (clientwidth < 1025) {
        smallSidebar.style.display = "none";
        largeSidebar.style.display = "none";
    }

    const mobileSmallSidebar = document.querySelector("#mobile-footer");
    if (clientwidth >= 1025) {
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
        // loadingEl.style.display = "none"
        await renderContactsListContent()
    } else {
        contactsListViewElement.style.display = "none";
    };

    const mobileContactsListViewElement = document.querySelector("#mobile-contacts-list-view")
    if (window.location.href === `${rootUrl}/contacts` && clientwidth <= 1070) {
        mobileContactsListViewElement.style.display = "block";
        // appName.style.left = "32%"
        await renderMobileContactsListContent()
    } else {
        mobileContactsListViewElement.style.display = "none";
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
    }
    else {
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
    if (window.location.href.startsWith(`${rootUrl}/edit_user`) && clientwidth >= 1025) {
        editUserViewElement.style.display = "block";
        appName.style.left = "32%"
        await renderEditUserContent()
    } else {
        editUserViewElement.style.display = "none"
    };

    const mobileEditUserViewElement = document.querySelector("#mobile-edit-user-view");
    if (window.location.href.startsWith(`${rootUrl}/edit_user`) && clientwidth < 1025) {
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

    const mobileGroupsListViewElement = document.querySelector("#mobile-groups-list-view");
        if (window.location.href === (`${rootUrl}/groups`) && clientwidth < 1070) {
        mobileGroupsListViewElement.style.display = "block";
        await renderMobileGroupsListContent()
    } else {
        mobileGroupsListViewElement.style.display = "none"
    };

    const createGroupsViewElement = document.querySelector("#create-groups-view");
        if (window.location.href === (`${rootUrl}/create-group`) && clientwidth > 1070) {
            createGroupsViewElement.style.display = "block";
            appName.style.left = "32%"
            await renderCreateGroupsContent()

    } else {
        createGroupsViewElement.style.display = "none"
    };

     const mobileCreateGroupsViewElement = document.querySelector("#mobile-create-groups-view");
        if (window.location.href === (`${rootUrl}/create-group`) && clientwidth < 1070) {
            mobileCreateGroupsViewElement.style.display = "block";
            await renderMobileCreateGroupsContent()

    } else {
        mobileCreateGroupsViewElement.style.display = "none"
    };

    const manageGroupsViewElement = document.querySelector("#manage-groups-view");
        if (window.location.href.startsWith(`${rootUrl}/manage_groups_contact`) && clientwidth > 1070) {
            manageGroupsViewElement.style.display = "block";
            appName.style.left = "32%"
            await renderManageContactGroupsContent()
    } else {
        manageGroupsViewElement.style.display = "none"
    };

    const mobileManageGroupsViewElement = document.querySelector("#mobile-manage-contact-groups-view");
        if (window.location.href.startsWith(`${rootUrl}/manage_groups_contact`) && clientwidth < 1070) {
            mobileManageGroupsViewElement.style.display = "block";
            // appName.style.left = "32%"
            // await renderManageContactGroupsContent()
            await renderMobileManageContactGroupsContent()
    } else {
        mobileManageGroupsViewElement.style.display = "none";
    };

    const groupContactsListView = document.querySelector("#group-contacts-list-view");
        if (window.location.href.startsWith(`${rootUrl}/group_`) && clientwidth > 1070) {
            groupContactsListView.style.display = "block";
            appName.style.left = "32%"
            // await renderManageContactGroupsContent()
            await renderGroupContactsListContent()
    } else {
        groupContactsListView.style.display = "none";
    };

    const mobileGroupContactsListView = document.querySelector("#mobile-group-contacts-list-view");
        if (window.location.href.startsWith(`${rootUrl}/group_`) && clientwidth < 1070) {
            mobileGroupContactsListView.style.display = "block";
            // appName.style.left = "32%"
            // await renderManageContactGroupsContent()
            // await renderGroupContactsListContent()
            await renderMobileGroupContactsListContent()
    } else {
        mobileGroupContactsListView.style.display = "none";
    };

    const newContactViewElement = document.querySelector("#new-contact-view");
    if (window.location.href === (`${rootUrl}/new_contact`) && clientwidth > 1070) {
        await renderNewContactContent()
        appName.style.left = "32%"
        newContactViewElement.style.display = "block";
    } else {
        newContactViewElement.style.display = "none";
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

    document.addEventListener('DOMContentLoaded', () => {
    const inputs = document.querySelectorAll('input'); // Selects all input elements

    inputs.forEach(input => {
        input.setAttribute('autocomplete', 'off'); // Sets the autocomplete attribute to "off"
    // Optional: You might also want to disable autocorrect and spellcheck for some inputs
    // input.setAttribute('autocorrect', 'off');
    // input.setAttribute('spellcheck', 'false');
        });
    });
};

async function loadingBar() {
     //loading code
    // const loadingElementContainer = document.createElement("div");
    // loadingElementContainer.setAttribute("id", "loading-element-container");
    // loadingElementContainer.style.position = "absolute";
    // loadingElementContainer.style.display = "flex";
    // loadingElementContainer.style.justifyContent = "space-between";
    // loadingElementContainer.style.alignItems = "center";
    // loadingElementContainer.style.width = "165px";
    // loadingElementContainer.style.top = "50%";
    // loadingElementContainer.style.left = "50%";
    // loadingElementContainer.style.transform = "translate(-50%, -50%)";
    // loadingElementContainer.style.margin = 0;
    // loadingElementContainer.style.display = "flex";
    const loadingEl = document.createElement("h2");
    loadingEl.setAttribute("id", "loading-element");
    loadingEl.style.margin = "10px"
    loadingEl.innerHTML = "Loading..."
    loadingEl.style.position = "absolute";
    loadingEl.style.display = "flex";
    loadingEl.style.top = "50%";
    loadingEl.style.left = "65%";
    loadingEl.style.transform = "translate(-50%, -50%)";
    const loadingProgressBarContainer = document.createElement("div");
    loadingProgressBarContainer.setAttribute("id", "loading-progress-bar-container");
    loadingProgressBarContainer.style.width = "50%";
    loadingProgressBarContainer.style.backgroundColor = "#ddd";
    loadingProgressBarContainer.style.position = "absolute";
    loadingProgressBarContainer.style.display = "flex";
    loadingProgressBarContainer.style.top = "60%";
    loadingProgressBarContainer.style.left = "65%";
    loadingProgressBarContainer.style.transform = "translate(-50%, -50%)";
    const loadingProgressBarElement = document.createElement("div");
    loadingProgressBarElement.setAttribute("id", "loading-progress-bar-element");
    loadingProgressBarElement.style.width = "0%";
    loadingProgressBarElement.style.height = "30px";
    loadingProgressBarElement.style.backgroundColor = "#04AA6D";
    loadingProgressBarElement.style.transition = "width 1.5s linear";
    // const loadingSpinner = document.createElement("div");
    // loadingSpinner.setAttribute("id", "loading-spinner");
    // loadingSpinner.style.border = "8px solid #f3f3f3";
    // loadingSpinner.style.borderTop = "8px solid #3498db";
    // loadingSpinner.style.borderRadius = "50%";
    // loadingSpinner.style.width = "22px";
    // loadingSpinner.style.height = "22px";
    // loadingSpinner.style.marginBottom = "2px"
    // loadingSpinner.style.animation = "spin 1s linear infinite";
    // const spinKeyframes = [
    //     { transform: 'rotate(0deg)' },
    //     { transform: 'rotate(360deg)' }
    // ];
    // const spinTiming = {
    //     duration: 300,
    //     iterations: Infinity,
    //     easing: 'linear'
    // };
    // loadingSpinner.animate(spinKeyframes, spinTiming)

    loadingEl.style.visibility = "hidden";
    loadingProgressBarContainer.style.visibility = "hidden"

    // loadingElementContainer.appendChild(loadingEl);
    // loadingElementContainer.appendChild(loadingSpinner);
    loadingProgressBarElement.style.width = "0%"
    loadingProgressBarContainer.appendChild(loadingProgressBarElement)

    document.body.appendChild(loadingEl)
    document.body.appendChild(loadingProgressBarContainer)

    const bar = document.getElementById("loading-progress-bar-element");

    // Trigger animation
        function startLoading() {
            bar.style.width = "0%"; // Reset
            setTimeout(() => {
                bar.style.width = "100%"; // Fill
            }, 10); // Small delay to ensure reset is registered
    }

    if (window.location.href !== `${rootUrl}/login` && window.location.href !== `${rootUrl}/register`
         && document.body.style.backgroundColor === "beige" && document.body.style.visibility !== "hidden") {
    // document.body.style.opacity = 0.5
    loadingEl.style.visibility = "visible";
    loadingProgressBarContainer.style.visibility = "visible";
    startLoading();
        // loadingEl.style.display = "block";
    };
}

async function loadingPage() {
    const allUsers = await getAllUsers();
    const sessionId = sessionStorage.getItem("user");
    let matchingUser;
    for (let i = 0; i < allUsers.length; i++) {
        if (allUsers[i].session_id === sessionId) {
            matchingUser = allUsers[i]
        }
    }

    // console.log(matchingUser)
    const userId = matchingUser.user_id;
    // const user = await getUser(userId);

    const userImage = await getAUserImage(userId)

    const imageString = `data:${userImage.contentType};base64,${userImage.image}`
   
    const loadingTopBar = document.createElement("div");
    loadingTopBar.setAttribute("id", "loading-topbar")
    loadingTopBar.style.position = "absolute";
    loadingTopBar.style.display = "flex";
    loadingTopBar.style.justifyContent = "space-between";
    loadingTopBar.style.alignItems = "center";
    loadingTopBar.style.width = "100%";
    loadingTopBar.style.height = "9.5%";
    loadingTopBar.style.backgroundColor = "darkcyan";
    loadingTopBar.style.boxShadow = "2px 2px 2px";
    loadingTopBar.style.backdropFilter = "blur(10px)";
    loadingTopBar.style.zIndex = "2";
    const loadingTopBarText = document.createElement("h2");
    loadingTopBarText.setAttribute("id", "loading-topbar-text")
    loadingTopBarText.style.position = "relative";
    loadingTopBarText.style.fontSize = "xx-large";
    loadingTopBarText.style.fontFamily = "system-ui";
    loadingTopBarText.style.color = "white";
    loadingTopBarText.style.margin = "0px 0px 0px 12px";
    loadingTopBarText.style.left = "32%"
    document.body.style.overflowX = "hidden"
    loadingTopBarText.innerHTML = "Contactkeeper";
    const loadingSmallSidebar = document.createElement("div");
    loadingSmallSidebar.setAttribute("id", "loading-small-sidebar");
    loadingSmallSidebar.style.position = "fixed";
    loadingSmallSidebar.style.width = "6.5%";
    loadingSmallSidebar.style.height = "100%";
    loadingSmallSidebar.style.top = "0%";
    loadingSmallSidebar.style.left = "0%";
    loadingSmallSidebar.style.backgroundColor = "white";
    loadingSmallSidebar.style.borderRight = "1px solid black";
    loadingSmallSidebar.style.boxShadow = "2px 2px 2px";
    loadingSmallSidebar.style.overflow = "hidden";
    loadingSmallSidebar.style.zIndex = "4";
    const loadingSmallSidebarContainer = document.createElement("div");
    loadingSmallSidebarContainer.setAttribute("id", "loading-small-sidebar-container")
    loadingSmallSidebarContainer.style.display = "flex";
    loadingSmallSidebarContainer.style.flexDirection = "column";
    loadingSmallSidebarContainer.style.width = "100%";
    loadingSmallSidebarContainer.style.height = "100%";
    const loadingSmallSidebarElementsContainer = document.createElement("div");
    loadingSmallSidebarElementsContainer.setAttribute("id", "loading-small-sidebar-elements-container");
    loadingSmallSidebarElementsContainer.style.display = "flex";
    loadingSmallSidebarElementsContainer.style.flexDirection = "column";
    loadingSmallSidebarElementsContainer.style.justifyContent = "space-between";
    loadingSmallSidebarElementsContainer.style.alignItems = "center";
    loadingSmallSidebarElementsContainer.style.width = "84%";
    loadingSmallSidebarElementsContainer.style.height = "70%";
    loadingSmallSidebarElementsContainer.style.marginLeft = "8%";
    loadingSmallSidebarElementsContainer.style.marginTop = "7px";
    const loadingNavigateUserIconContainer = document.createElement("div");
    loadingNavigateUserIconContainer.setAttribute("id", "loading-navigate-icon-container");
    loadingNavigateUserIconContainer.style.display = "flex";
    loadingNavigateUserIconContainer.style.flexDirection = "column";
    loadingNavigateUserIconContainer.style.alignItems = "center";
    loadingNavigateUserIconContainer.style.width = "100%";
    loadingNavigateUserIconContainer.style.height = "70px";
    loadingNavigateUserIconContainer.style.cursor = "default";
    loadingNavigateUserIconContainer.style.padding = "2.5px";
    loadingNavigateUserIconContainer.style.borderRadius = "5px";
    const loadingNavigateUserPageIcon = document.createElement("img");
    loadingNavigateUserPageIcon.setAttribute("id", "loading-navigate-user-page-icon");
    loadingNavigateUserPageIcon.style.width = "50px";
    loadingNavigateUserPageIcon.style.height = "50px";
    loadingNavigateUserPageIcon.style.border = "1px solid black";
    loadingNavigateUserPageIcon.style.borderRadius = "50%";
    loadingNavigateUserPageIcon.style.backgroundColor = "gainsboro";
    loadingNavigateUserPageIcon.setAttribute("src", imageString);
    const loadingNavigateUserPageIconText = document.createElement("p");
    loadingNavigateUserPageIconText.setAttribute("id", "loading-navigate-user-page-icon-text");
    loadingNavigateUserPageIconText.classList.add("sidebar-icon-text");
    loadingNavigateUserPageIconText.style.fontFamily = "sans-serif";
    loadingNavigateUserPageIconText.style.fontWeight = "bolder";
    loadingNavigateUserPageIconText.style.margin = "0";
    loadingNavigateUserPageIconText.innerHTML = "Account";
    const loadingNavigateContactsIconContainer = document.createElement("div");
    loadingNavigateContactsIconContainer.setAttribute("id", "loading-navigate-contacts-list-page-icon-container");
    loadingNavigateContactsIconContainer.style.display = "flex";
    loadingNavigateContactsIconContainer.style.flexDirection = "column";
    loadingNavigateContactsIconContainer.style.alignItems = "center";
    loadingNavigateContactsIconContainer.style.width = "100%";
    loadingNavigateContactsIconContainer.style.height = "70px";
    loadingNavigateContactsIconContainer.style.cursor = "default";
    loadingNavigateContactsIconContainer.style.padding = "2.5px";
    loadingNavigateContactsIconContainer.style.borderRadius = "5px";
    const loadingNavigateContactsListPageIcon = document.createElement("img");
    loadingNavigateContactsListPageIcon.setAttribute("id", "loading-navigate-contacts-list-page-icon");
    loadingNavigateContactsListPageIcon.style.width = "50px";
    loadingNavigateContactsListPageIcon.style.height = "50px";
    // loadingNavigateContactsListPageIcon.style.border = "1px solid black";
    // loadingNavigateContactsListPageIcon.style.borderRadius = "50%";
    // loadingNavigateContactsListPageIcon.style.backgroundColor = "gainsboro";
    loadingNavigateContactsListPageIcon.setAttribute("src", "./images/contacts-svgrepo-com.svg");
    const loadingNavigateContactsPageIconText = document.createElement("p");
    loadingNavigateContactsPageIconText.setAttribute("id", "loading-navigate-contacts-page-icon-text");
    loadingNavigateContactsPageIconText.classList.add("sidebar-icon-text");
    loadingNavigateContactsPageIconText.style.fontFamily = "sans-serif";
    loadingNavigateContactsPageIconText.style.fontWeight = "bolder";
    loadingNavigateContactsPageIconText.style.margin = "0";
    loadingNavigateContactsPageIconText.innerHTML = "Contacts";
    const loadingNavigateFavoritesIconContainer = document.createElement("div");
    loadingNavigateFavoritesIconContainer.setAttribute("id", "loading-navigate-favorites-icon-container");
    loadingNavigateFavoritesIconContainer.style.display = "flex";
    loadingNavigateFavoritesIconContainer.style.flexDirection = "column";
    loadingNavigateFavoritesIconContainer.style.alignItems = "center";
    loadingNavigateFavoritesIconContainer.style.width = "100%";
    loadingNavigateFavoritesIconContainer.style.height = "70px";
    loadingNavigateFavoritesIconContainer.style.cursor = "default";
    loadingNavigateFavoritesIconContainer.style.padding = "2.5px";
    loadingNavigateFavoritesIconContainer.style.borderRadius = "5px";
    const loadingNavigateFavoritesPageIcon = document.createElement("img");
    loadingNavigateFavoritesPageIcon.setAttribute("id", "loading-navigate-favorites-page-icon");
    loadingNavigateFavoritesPageIcon.style.width = "50px";
    loadingNavigateFavoritesPageIcon.style.height = "50px";
    // loadingNavigateFavoritesPageIcon.style.border = "1px solid black";
    loadingNavigateFavoritesPageIcon.style.borderRadius = "50%";
    // loadingNavigateFavoritesPageIcon.style.backgroundColor = "gainsboro";
    loadingNavigateFavoritesPageIcon.setAttribute("src", "./images/star-svgrepo-com.svg");
    const loadingNavigateFavoritesPageIconText = document.createElement("p");
    loadingNavigateFavoritesPageIconText.setAttribute("id", "loading-navigate-favorites-page-icon-text");
    loadingNavigateFavoritesPageIconText.classList.add("sidebar-icon-text");
    loadingNavigateFavoritesPageIconText.style.fontFamily = "sans-serif";
    loadingNavigateFavoritesPageIconText.style.fontWeight = "bolder";
    loadingNavigateFavoritesPageIconText.style.margin = "0";
    loadingNavigateFavoritesPageIconText.innerHTML = "Favorites";
    const loadingNavigateGroupsIconContainer = document.createElement("div");
    loadingNavigateGroupsIconContainer.setAttribute("id", "loading-navigate-groups-icon-container");
    loadingNavigateGroupsIconContainer.style.display = "flex";
    loadingNavigateGroupsIconContainer.style.flexDirection = "column";
    loadingNavigateGroupsIconContainer.style.alignItems = "center";
    loadingNavigateGroupsIconContainer.style.width = "100%";
    loadingNavigateGroupsIconContainer.style.height = "70px";
    loadingNavigateGroupsIconContainer.style.cursor = "default";
    loadingNavigateGroupsIconContainer.style.padding = "2.5px";
    loadingNavigateGroupsIconContainer.style.borderRadius = "5px";
    const loadingNavigateGroupsPageIcon = document.createElement("img");
    loadingNavigateGroupsPageIcon.setAttribute("id", "loading-navigate-groups-page-icon");
    loadingNavigateGroupsPageIcon.style.width = "50px";
    loadingNavigateGroupsPageIcon.style.height = "50px";
    // loadingNavigateGroupsPageIcon.style.border = "1px solid black";
    loadingNavigateGroupsPageIcon.style.borderRadius = "50%";
    // loadingNavigateGroupsPageIcon.style.backgroundColor = "gainsboro";
    loadingNavigateGroupsPageIcon.setAttribute("src", "./images/group-svgrepo-com.svg");
    const loadingNavigateGroupsPageIconText = document.createElement("p");
    loadingNavigateGroupsPageIconText.setAttribute("id", "loading-navigate-groups-page-icon-text");
    loadingNavigateGroupsPageIconText.classList.add("sidebar-icon-text");
    loadingNavigateGroupsPageIconText.style.fontFamily = "sans-serif";
    loadingNavigateGroupsPageIconText.style.fontWeight = "bolder";
    loadingNavigateGroupsPageIconText.style.margin = "0";
    loadingNavigateGroupsPageIconText.innerHTML = "Groups";
    const loadingNavigateNewContactIconContainer = document.createElement("div");
    loadingNavigateNewContactIconContainer.setAttribute("id", "loading-navigate-new-contact-icon-container");
    loadingNavigateNewContactIconContainer.style.display = "flex";
    loadingNavigateNewContactIconContainer.style.flexDirection = "column";
    loadingNavigateNewContactIconContainer.style.alignItems = "center";
    loadingNavigateNewContactIconContainer.style.width = "100%";
    loadingNavigateNewContactIconContainer.style.height = "70px";
    loadingNavigateNewContactIconContainer.style.cursor = "default";
    loadingNavigateNewContactIconContainer.style.padding = "2.5px";
    loadingNavigateNewContactIconContainer.style.borderRadius = "5px";
    const loadingNavigateNewContactPageIcon = document.createElement("img");
    loadingNavigateNewContactPageIcon.setAttribute("id", "loading-navigate-new-contact-page-icon");
    loadingNavigateNewContactPageIcon.style.width = "50px";
    loadingNavigateNewContactPageIcon.style.height = "50px";
    // loadingNavigateNewContactPageIcon.style.border = "1px solid black";
    loadingNavigateNewContactPageIcon.style.borderRadius = "50%";
    // loadingNavigateNewContactPageIcon.style.backgroundColor = "gainsboro";
    loadingNavigateNewContactPageIcon.setAttribute("src", "./images/add-circle-svgrepo-com.svg");
    const loadingNavigateNewContactPageIconText = document.createElement("p");
    loadingNavigateNewContactPageIconText.setAttribute("id", "loading-navigate-new-contact-page-icon-text");
    loadingNavigateNewContactPageIconText.classList.add("sidebar-icon-text");
    loadingNavigateNewContactPageIconText.style.fontFamily = "sans-serif";
    loadingNavigateNewContactPageIconText.style.fontWeight = "bolder";
    loadingNavigateNewContactPageIconText.style.margin = "0";
    loadingNavigateNewContactPageIconText.innerHTML = "New";
    const loadingSmallSidebarSecondElementsContainer = document.createElement("div");
    loadingSmallSidebarSecondElementsContainer.style.display = "flex";
    loadingSmallSidebarSecondElementsContainer.style.flexDirection = "column";
    loadingSmallSidebarSecondElementsContainer.style.justifyContent = "flex-end";
    loadingSmallSidebarSecondElementsContainer.style.alignItems = "center";
    loadingSmallSidebarSecondElementsContainer.style.width = "84%";
    loadingSmallSidebarSecondElementsContainer.style.height = "30%";
    loadingSmallSidebarSecondElementsContainer.style.marginLeft = "8%";
    loadingSmallSidebarSecondElementsContainer.style.marginTop = "5px";
    loadingSmallSidebarSecondElementsContainer.style.marginBottom = "5px";
    const loadingSmallSidebarLogoutButtonContainer = document.createElement("div");
    loadingSmallSidebarLogoutButtonContainer.style.display = "flex";
    loadingSmallSidebarLogoutButtonContainer.style.flexDirection = "column";
    loadingSmallSidebarLogoutButtonContainer.style.alignItems = "center";
    loadingSmallSidebarLogoutButtonContainer.style.width = "100%";
    loadingSmallSidebarLogoutButtonContainer.style.height = "70px";
    loadingSmallSidebarLogoutButtonContainer.style.cursor = "default";
    loadingSmallSidebarLogoutButtonContainer.style.padding = "2.5px";
    const loadingSmallSidebarLogoutButton = document.createElement("button");
    loadingSmallSidebarLogoutButton.setAttribute("id", "loading-small-sidebar-logout-button");
    loadingSmallSidebarLogoutButton.style.width = "65px";
    loadingSmallSidebarLogoutButton.style.height = "30px";
    loadingSmallSidebarLogoutButton.style.backgroundColor = "red";
    loadingSmallSidebarLogoutButton.style.border = "none";
    loadingSmallSidebarLogoutButton.style.color = "white";
    loadingSmallSidebarLogoutButton.innerHTML = "Logout";

    //loading large side panel code...
    const loadingLargeSideBar = document.createElement("div");
    loadingLargeSideBar.setAttribute("id", "loading-large-sidebar");
    loadingLargeSideBar.style.position = "fixed";
    loadingLargeSideBar.style.width = "25%";
    loadingLargeSideBar.style.height = "100%";
    loadingLargeSideBar.style.top = "0%";
    loadingLargeSideBar.style.left = "6.5%";
    loadingLargeSideBar.style.backgroundColor = "lightslategrey";
    loadingLargeSideBar.style.borderRight = "3px solid black";
    loadingLargeSideBar.style.boxShadow = "0px 2.5px 5px";
    loadingLargeSideBar.style.overflowY = "scroll";
    loadingLargeSideBar.style.overflowX = "hidden";
    loadingLargeSideBar.style.scrollbarWidth = "thin";
    loadingLargeSideBar.style.overscrollBehavior = "contain";
    loadingLargeSideBar.style.zIndex = "3";
    const loadingSearchContactsElementsContainer = document.createElement("div");
    loadingSearchContactsElementsContainer.setAttribute("id", "loading-search-contacts-elements-container");
    loadingSearchContactsElementsContainer.style.position = "absolute";
    loadingSearchContactsElementsContainer.style.display = "flex";
    loadingSearchContactsElementsContainer.style.flexDirection = "column";
    loadingSearchContactsElementsContainer.style.justifyContent = "center";
    loadingSearchContactsElementsContainer.style.alignItems = "center";
    loadingSearchContactsElementsContainer.style.width = "100%";
    loadingSearchContactsElementsContainer.style.height = "9.3%";
    loadingSearchContactsElementsContainer.style.borderBottom = "2px solid black";
    loadingSearchContactsElementsContainer.style.backgroundColor = "grey";
    const searchContactsInput = document.createElement("input");
    searchContactsInput.type = "search";
    searchContactsInput.name = "search-contacts";
    searchContactsInput.setAttribute("id", "search-contacts-input");
    searchContactsInput.placeholder = "Search My Contacts";
    searchContactsInput.style.width = "91%";
    searchContactsInput.style.height = "22.5px";
    searchContactsInput.style.textIndent = "20px";
    searchContactsInput.style.border = "1px solid black";
    searchContactsInput.style.backgroundImage = "url(./images/search-svgrepo-com.svg)";
    searchContactsInput.style.backgroundRepeat = "no-repeat";
    searchContactsInput.style.backgroundSize = "16px";
    searchContactsInput.style.backgroundPositionY = "2px";
    searchContactsInput.style.backgroundPositionX = "0.8%";
    searchContactsInput.style.outline = "none";
    searchContactsInput.style.pointerEvents = "none";
    searchContactsInput.style.userSelect = "none";
    const loadingSidebarContactsListContainer = document.createElement("div");
    loadingSidebarContactsListContainer.setAttribute("id", "loading-sidebar-contacts-list-container")
    loadingSidebarContactsListContainer.style.margin = "60px 0px 1px 0px";
    const sidebarContactsList = document.createElement("ul");
    sidebarContactsList.setAttribute("id", "loading-sidebar-contacts-list")
    sidebarContactsList.style.margin = "0px";
    sidebarContactsList.style.padding = "10px 10px 0px 12px";
    // const autocompleteContactsList = document.createElement("ul");
    // autocompleteContactsList.style.display = "none";
    // autocompleteContactsList.style.margin = "0px";
    // autocompleteContactsList.style.padding = "10px 10px 0px 12px";

    const userContacts = await getUserContacts(userId);
    for (let i = 0; i < userContacts.length; i++) {
        const contactId = userContacts[i].contact_id
        const contactImage = await getAContactImage(userId, contactId);
        const contactEmailAddresses = await getAContactEmailAddresses(userId, contactId)
        const contactEmailObj = contactEmailAddresses[0];
        let contactEmail;
        if (contactEmailObj !== undefined) {
            contactEmail = contactEmailObj.emailaddress;
        }
        console.log(contactImage)
        const contactImageStr = `data:${contactImage.contentType};base64,${contactImage.image}`
        userContacts[i]["email"] = contactEmail;
        userContacts[i]["imageString"] = contactImageStr;
    }

    loadingSearchContactsElementsContainer.appendChild(searchContactsInput)
    loadingSidebarContactsListContainer.appendChild(sidebarContactsList)
    loadingLargeSideBar.appendChild(loadingSearchContactsElementsContainer)
    loadingLargeSideBar.appendChild(loadingSidebarContactsListContainer)
    document.body.appendChild(loadingLargeSideBar)

    requestAnimationFrame(() => {
        const contactsListContainer = document.querySelector("#loading-sidebar-contacts-list-container");
        const searchContactsElementContainer = document.querySelector("#loading-search-contacts-elements-container")
        const searchContactsElementContainerHeight = searchContactsElementContainer.clientHeight;
        // console.log(searchContactsElementContainer.clientHeight)
        const computedStyle = window.getComputedStyle(searchContactsElementContainer);
        const heightInPx = computedStyle.height
        // console.log(heightInPx)

         const screenHeight = window.innerHeight;
        //  console.log(screenHeight)

         const elementHeight = screenHeight * 0.093;
         const roundedElementHeightStr = elementHeight.toString() + "px"
        //  console.log(elementHeight.toString())
        
        const contactsListContainerMarginTop = searchContactsElementContainerHeight + 10;
        const contactsListContainerMarginTopStr = contactsListContainerMarginTop.toString() + "px"

        contactsListContainer.style.marginTop = roundedElementHeightStr
    });

    const contactsListElement = document.querySelector("#loading-sidebar-contacts-list");

      userContacts.sort(function(a, b) {
        const nameA = `${a.firstname} ${a.lastname}`
        const nameB = `${b.firstname} ${b.lastname}`;
        return nameA.localeCompare(nameB)
      });

        userContacts.forEach(contact => {
        const contactListItem = document.createElement("div");
        contactListItem.style.display = "flex";
        contactListItem.style.flexDirection = "row";
        contactListItem.style.height = "38px";
        contactListItem.style.marginBottom = "4px";
        contactListItem.style.padding = "5px";
        contactListItem.style.backgroundColor = "#fcfcff";
        contactListItem.style.border = "2px solid black";
        contactListItem.style.pointerEvents = "none";
        contactListItem.setAttribute("imageString", contact.imageString)
        contactListItem.setAttribute("contactEmailValue", contact.email)

        contactListItem.addEventListener("mouseover", function() {
            contactListItem.style.backgroundColor = "lightgreen";
        });
        contactListItem.addEventListener("mouseout", function() {
            contactListItem.style.backgroundColor = "#fcfcff";
        });
        
        const contactImageItemContainer = document.createElement("div");
        contactImageItemContainer.style.display = "flex";
        contactImageItemContainer.style.alignItems = "center";
        const contactImageItem = document.createElement("img");
        contactImageItem.style.width = "35px";
        contactImageItem.style.height = "35px";
        contactImageItem.style.border = "0.5px solid black";
        contactImageItem.style.borderRadius = "50%";
        contactImageItem.style.backgroundColor = "gainsboro";
        contactImageItem.style.objectFit = "cover";
        contactImageItem.style.userSelect = "none";

        const contactListItemInformationContainer = document.createElement("div");
        contactListItemInformationContainer.style.position = "relative";
        contactListItemInformationContainer.style.display = "flex";
        contactListItemInformationContainer.style.flexDirection = "column";
        contactListItemInformationContainer.style.justifyContent = "center";
        contactListItemInformationContainer.style.alignItems = "center";
        contactListItemInformationContainer.style.minWidth = "0px";
        contactListItemInformationContainer.style.width = "100%";

        const contactListItemNameElementContainer = document.createElement("div");
        contactListItemNameElementContainer.style.display = "flex";
        contactListItemNameElementContainer.style.justifyContent = "flex-start";
        contactListItemNameElementContainer.style.minWidth = "0px";
        contactListItemNameElementContainer.style.width = "100%";

        const contactNameElement = document.createElement("p");
        contactNameElement.style.fontSize = "small";
        contactNameElement.style.fontWeight = "bolder";
        contactNameElement.style.whiteSpace = "nowrap";
        contactNameElement.style.overflow = "hidden";
        contactNameElement.style.textOverflow = "ellipsis";
        contactNameElement.style.margin = "0px 0px 0px 10px"
        contactNameElement.style.userSelect = "none";
        contactNameElement.innerHTML = `${contact.firstname} ${contact.lastname}`;

        const contactListItemEmailElementContainer = document.createElement("div");
        contactListItemEmailElementContainer.style.display = "flex";
        contactListItemEmailElementContainer.style.justifyContent = "flex-start";
        // contactListItemEmailElementContainer.style.height = "100%";
        contactListItemEmailElementContainer.style.minWidth = "0px";
        contactListItemEmailElementContainer.style.width = "100%";
        const contactEmailElement = document.createElement("p");
        contactEmailElement.setAttribute("id", `contact-email-element-${contact.contact_id}`)
        contactListItem.setAttribute("contactEmailValue", contact.email)
        contactEmailElement.classList.add("contact-email-element");
        contactEmailElement.style.fontSize = "x-small";
        contactEmailElement.style.fontWeight = "normal";
        contactEmailElement.style.whiteSpace = "nowrap";
        contactEmailElement.style.overflow = "hidden";
        contactEmailElement.style.textOverflow = "ellipsis";
        contactEmailElement.style.margin = "0px 0px 0px 10px";
        contactEmailElement.style.userSelect = "none";
        if (contact.email !== null && contact.email !== undefined) {
            contactEmailElement.innerHTML = contact.email;
        } else {
            contactEmailElement.innerHTML = "text";
        }
        if (contactEmailElement.innerHTML === "text") {
                contactEmailElement.style.visibility = "hidden";
        };

        const contactFavoriteIconContainer = document.createElement("div");
        contactFavoriteIconContainer.style.display = "flex";
        contactFavoriteIconContainer.style.justifyContent = "center";
        contactFavoriteIconContainer.style.alignItems = "center";
        // contactFavoriteIconContainer.style.padding = "4px"
        const contactFavoriteIcon = document.createElement("img");
        contactFavoriteIcon.setAttribute("src", "./images/star-gold-svgrepo-com.svg");
        contactFavoriteIcon.style.width = "25px";
        contactFavoriteIcon.style.userSelect = "none";
        // contactFavoriteIcon.style.display = "none";
        if (contact.favorite !== true) {
            contactFavoriteIcon.style.visibility = "hidden"
        };

        contactListItem.classList.add("contact-list-item");
        contactListItem.style.cursor = "default"
        // contactListItem.style.height = "200px"
        const contactId = contact.contact_id.toString();
        contactListItem.setAttribute("id", `${contactId}`);
        contactListItem.setAttribute("data", `${rootUrl}/contact_${contactId}`);
        contactListItem.setAttribute("name", `${contact.firstname} ${contact.lastname}`);

        contactImageItemContainer.appendChild(contactImageItem);
        contactListItemNameElementContainer.appendChild(contactNameElement);
        contactListItemEmailElementContainer.appendChild(contactEmailElement)
        contactListItemInformationContainer.appendChild(contactListItemNameElementContainer)
        contactListItemInformationContainer.appendChild(contactListItemEmailElementContainer)
        contactListItem.appendChild(contactImageItemContainer)
        contactListItem.appendChild(contactListItemInformationContainer)
        contactFavoriteIconContainer.appendChild(contactFavoriteIcon);
        contactListItem.appendChild(contactFavoriteIconContainer)
        contactsListElement.appendChild(contactListItem)
    });

    const contactListItems = Array.from(contactsListElement.children);
    // console.log(contactsListElement.children)

    // const contactsListElementHTMLArr = contactsListElement.children;
    // const contactListItems = [];

    // contactsListElementHTMLArr.forEach(element => {
    //     if (element.classList.contains('contact-list-item')) {
    //         contactListItems.push(element)
    //     }
    // })

    // for (let i = 0; i < contactsListElementHTMLArr.length; i++) {
    //     console.log(contactsListElementHTMLArr[i])
    //      if (contactsListElementHTMLArr[i].classList.contains('contact-list-item')) {
    //         contactListItems.push(contactsListElementHTMLArr[i])
    //     }
    // }

    // console.log(contactsListElementHTMLArr.length)

    contactListItems.forEach(element => {
        // console.log(element.firstChild.firstChild)
        const contactImageElement = element.firstChild.firstChild;
        const contactId = element.getAttribute('id');
        // const contact_id = contact.contact_id;
        // const contactImage = await getAContactImage(userId, contactId)
        // const imageString = `data:${contactImage.contentType};base64,${contactImage.image}`
        contactImageElement.setAttribute("src", element.getAttribute("imageString"));
        contactImageElement.style.borderRadius = "50%";
        const contactEmailElement = element.children[1].children[1].firstChild;
        // const contactEmailAddresses = await getAContactEmailAddresses(userId, contactId)
        // console.log(contactEmailAddresses)
        if (element.getAttribute("contactEmailValue").innerHTML !== "undefined") {
            contactEmailElement.innerHTML = element.getAttribute("contactEmailValue");
        } else {
            contactEmailElement.innerHTML = "Text";
            contactEmailElement.style.visibility = "hidden"
        };
    });

    //

    // const loadingEl = document.createElement("h3");
    // loadingTopBar.style.visibility = "hidden"; //mega parent
    // loadingSmallSidebar.style.visibility = "hidden"; //mega parent
   
    loadingTopBar.appendChild(loadingTopBarText);
    loadingNavigateUserIconContainer.appendChild(loadingNavigateUserPageIcon);
    loadingNavigateUserIconContainer.appendChild(loadingNavigateUserPageIconText);
    loadingNavigateContactsIconContainer.appendChild(loadingNavigateContactsListPageIcon);
    loadingNavigateContactsIconContainer.appendChild(loadingNavigateContactsPageIconText);
    loadingNavigateFavoritesIconContainer.appendChild(loadingNavigateFavoritesPageIcon);
    loadingNavigateFavoritesIconContainer.appendChild(loadingNavigateFavoritesPageIconText);
    loadingNavigateGroupsIconContainer.appendChild(loadingNavigateGroupsPageIcon);
    loadingNavigateGroupsIconContainer.appendChild(loadingNavigateGroupsPageIconText);
    loadingNavigateNewContactIconContainer.appendChild(loadingNavigateNewContactPageIcon);
    loadingNavigateNewContactIconContainer.appendChild(loadingNavigateNewContactPageIconText);
    loadingSmallSidebarElementsContainer.appendChild(loadingNavigateUserIconContainer);
    loadingSmallSidebarElementsContainer.appendChild(loadingNavigateContactsIconContainer);
    loadingSmallSidebarElementsContainer.appendChild(loadingNavigateFavoritesIconContainer);
    loadingSmallSidebarElementsContainer.appendChild(loadingNavigateGroupsIconContainer);
    loadingSmallSidebarElementsContainer.appendChild(loadingNavigateNewContactIconContainer);
    loadingSmallSidebarLogoutButtonContainer.appendChild(loadingSmallSidebarLogoutButton)
    loadingSmallSidebarSecondElementsContainer.appendChild(loadingSmallSidebarLogoutButtonContainer);
    loadingSmallSidebarContainer.appendChild(loadingSmallSidebarElementsContainer);
    loadingSmallSidebarContainer.appendChild(loadingSmallSidebarSecondElementsContainer);
    loadingSmallSidebar.appendChild(loadingSmallSidebarContainer);
    // loadingSearchContactsElementsContainer.appendChild(searchContactsInput)
    // loadingLargeSideBar.appendChild(loadingSearchContactsElementsContainer)
    // loadingLargeSideBar.appendChild(loadingSidebarContactsListContainer)
    
    document.body.appendChild(loadingTopBar)
    document.body.appendChild(loadingSmallSidebar)
    document.body.appendChild(loadingLargeSideBar)


if (window.location.href !== `${rootUrl}/login` && window.location.href !== `${rootUrl}/register` && document.body.style.backgroundColor === "beige") {
    // document.body.style.opacity = 0.5
    loadingTopBar.style.visibility = "visible";
    loadingSmallSidebar.style.visibility = "visible";
    loadingLargeSideBar.style.visibility = "visible";
    // loadingEl.style.visibility = "visible";
    // loadingProgressBarContainer.style.visibility = "visible";
    // startLoading();
        // loadingEl.style.display = "block";
    };

    const sectionTags = document.getElementsByTagName("SECTION");
    const sectionTagsArr = Array.from(sectionTags);
    sectionTagsArr.forEach(element => {
        element.style.visibility = "hidden";
    });

//    document.body.style.opacity = "1"
//    document.body.style.visibility = "visible";
}
 
// domReady(async function() {
//     await showPages()
//     //  document.body.style.visibility = "hidden";
//     //  document.body.style.opacity = "0"
// });
    
// window.addEventListener("DOMContentLoaded", function() {
//      document.body.style.visibility = "hidden";
//      document.body.style.opacity = "0"
// })

window.addEventListener("visibiltychange", function() {
    this.document.body.style.visibility = "hidden"
    this.document.body.style.opacity = "0"
})

window.addEventListener("beforeunload", function () {
    const loadingEl = this.document.querySelector("#loading-element");
    // loadingEl.style.visibility = "visible";
    const loadingTopBar = this.document.querySelector("#loading-topbar");
    // loadingTopBar.style.visibility = "hidden";
    const loadingSmallSidebar = this.document.querySelector("#loading-small-sidebar");
    // loadingSmallSidebar.style.visibility = "hidden";

    const loadingBar = document.getElementById("loading-progress-bar-element");
    loadingBar.style.width = "0%"

    document.body.style.visibility = "hidden";
    document.body.style.opacity = "0";

    const sectionTags = document.getElementsByTagName("SECTION");
    const sectionTagsArr = Array.from(sectionTags);
     sectionTagsArr.forEach(element => {
            element.style.visibility = "hidden";
    });

    if (window.location.href.startsWith(`${rootUrl}/contacts`)) {
        const myContactsListContainer = document.querySelector("#my-contacts-list-container");
        myContactsListContainer.style.visibility = "hidden";
    };

    if (window.location.href.startsWith(`${rootUrl}/favorite_contacts`)) {
        const myFavoriteContactsListContainer = document.querySelector("#my-favorite-contacts-list-container");
        myFavoriteContactsListContainer.style.visibility = "hidden";
    };

    if (window.location.href.startsWith(`${rootUrl}/groups`)) {
        const groupsListContainer = document.querySelector("#groups-list-container");
        groupsListContainer.style.visibility = "hidden";
    };

    if (window.location.href.startsWith(`${rootUrl}/group_`)) {
        const groupContactsListContainer = document.querySelector("#group-contacts-list-container");
        groupContactsListContainer.style.visibility = "hidden";
    };

    // this.document.body.style.backgroundColor = "beige";

    // const parentToExclude = this.document.querySelector("#loading-view");
    // const allElements = this.document.querySelectorAll("body *:not(script, style)");
    // const elementsNotInParent = Array.from(allElements).filter(el => {
    //     return !el.closest("#loading-view")
    // });
    // elementsNotInParent.forEach(el => {
    //     if (el.getAttribute("id") !== "topbar") {
    //         el.style.visibility = "hidden";
    //     }
    // })

    // const loadingEl = this.document.querySelector("#loading-view");
    // loadingEl.style.visibility = "visible"
});

window.addEventListener("pagehide", function() {
    this.document.body.visibility = "hidden"
    this.document.body.style.opacity = "0"
    // window.history.replaceState({}, '', currentUrl);
})

window.addEventListener("popstate", function(event) {
    // event.preventDefault()
    this.document.body.visibility = "hidden"
    this.document.body.style.opacity = "0"
})

window.addEventListener("pageshow", function() {
    // this.document.body.style.opacity = "1"
    document.body.visibility = "hidden"
    // document.body.style.opacity = "0"
})

// window.addEventListener('pageshow', (event) => {
//   // event.persisted is true when the page is loaded from the Back/Forward cache
//   if (event.persisted) {
    
//     // Check if the current URL contains old or stale data
//     const currentUrl = new URL(window.location.href);
//     if (currentUrl.searchParams.has('outdated_param')) {
      
//       // Update the URL silently without a page reload
//       currentUrl.searchParams.set('updated_param', 'fresh_data');
//       history.replaceState(null, '', currentUrl.toString());
      
//       // Call your function to update the stale UI data
//       fetchFreshData();
//     }
//   }
// });

// function fetchFreshData() {
//   console.log("Fetching new data for the updated URL...");
// }


window.addEventListener("DOMContentLoaded", function() {
    // this.document.body.style.visibility = "hidden";
    this.document.body.style.opacity = "1"
})

window.addEventListener("load", async function() {
    const previousPage = document.referrer;
    document.body.style.opacity = "1";

    if (window.location.href !== `${rootUrl}/login` && window.location.href !== `${rootUrl}/register` 
        && window.location.href !== `${rootUrl}/recover-password` && previousPage !== `${rootUrl}/login`) {
        await loadingPage()
        document.body.style.visibility = "visible";
    }

    // const bar = document.getElementById("loading-progress-bar-element");

    this.setTimeout(async function() {
        await loadingBar()
        // bar.style.width = "0%"
    }, 500)  

    
    // document.body.style.opacity = "1"; 
    // event.preventDefault()
    // this.document.body.style.backgroundColor = "beige";
    
    //load pages
    //load bar
    //complete
    
    
    // document.body.style.visibility = "visible";
    // this.setTimeout(async function() {
        //     await loadingPage()
        // }, 100)
        
        await showPages();
        
        const sectionTags = document.getElementsByTagName("SECTION");
        const sectionTagsArr = Array.from(sectionTags);
        
        if (window.location.href !== `${rootUrl}/login` && window.location.href !== `${rootUrl}/register` && window.location.href !== `${rootUrl}/recover-password` && previousPage !== `${rootUrl}/login`) {
        this.setTimeout(function() {
        const loadingEl = this.document.querySelector("#loading-element");
        loadingEl.style.visibility = "hidden";
        const loadingTopBar = this.document.querySelector("#loading-topbar");
        loadingTopBar.style.visibility = "hidden";
        const loadingSmallSidebar = this.document.querySelector("#loading-small-sidebar");
        loadingSmallSidebar.style.visibility = "hidden";
        const loadingLargeSideBar = document.querySelector("#loading-large-sidebar");
        loadingLargeSideBar.style.visibility = "hidden";
        const loadingProgressBarContainer = document.querySelector("#loading-progress-bar-container");
        loadingProgressBarContainer.style.visibility = "hidden";
        loadingProgressBarContainer.remove()
        // document.body.style.backgroundColor = "beige";
        
        // const loadingTopBarText = document.querySelector("#loading-topbar-text")
        // loadingTopBarText.stye.visibility = "visible";
        sectionTagsArr.forEach(element => {
            element.style.visibility = "visible";
        });

        if (window.location.href.startsWith(`${rootUrl}/contacts`)) {
            const myContactsListContainer = document.querySelector("#my-contacts-list-container");
            myContactsListContainer.style.visibility = "visible";
        };

        if (window.location.href.startsWith(`${rootUrl}/favorite_contacts`)) {
            const myFavoriteContactsListContainer = document.querySelector("#my-favorite-contacts-list-container");
            myFavoriteContactsListContainer.style.visibility = "visible";
        };

        if (window.location.href.startsWith(`${rootUrl}/groups`)) {
            const groupsListContainer = document.querySelector("#groups-list-container");
            groupsListContainer.style.visibility = "visible";
        };

        if (window.location.href.startsWith(`${rootUrl}/group_`)) {
            const groupContactsListContainer = document.querySelector("#group-contacts-list-container");
            groupContactsListContainer.style.visibility = "visible";
        };

    }, 1400)
    } else if (window.location.href !== `${rootUrl}/login` && window.location.href !== `${rootUrl}/register` && window.location.href !== `${rootUrl}/recover-password` && previousPage === `${rootUrl}/login`) {
        // if (window.location.href.startsWith(`${rootUrl}/contacts`)) {
        this.setTimeout(function() {
            sectionTagsArr.forEach(element => {
                element.style.visibility = "visible";
            });
            
            const myContactsListContainer = document.querySelector("#my-contacts-list-container");
            myContactsListContainer.style.visibility = "visible";
            // console.log("logged in")

            document.body.style.visibility = "visible"

        }, 500)
        // };
    } else {
    this.setTimeout(function() {
        document.body.style.visibility = "visible";
        // document.body.style.backgroundColor = "beige";
    }, 500)

    // const loadingBar = document.getElementById("loading-progress-bar-element");
    // loadingBar.style.width = "0%"
}


    // setTimeout(function() {
    // }, 500);

    // const loadingEl = this.document.querySelector("#loading-view");
    // loadingEl.style.visibility = "visible"

    // const parentToExclude = this.document.querySelector("#loading-view");
    // const allElements = this.document.querySelectorAll("body *:not(script, style)");
    // const elementsNotInParent = Array.from(allElements).filter(el => {
    //     return !el.closest("#loading-view")
    // });
    // elementsNotInParent.forEach(el => {
    //     if (el.getAttribute("id") !== "topbar" || el.getAttribute("id") !== "small-sidebar" || el.getAttribute("id") !== "large-sidebar") {
    //         el.style.visibility = "hidden";
    //     }
    // })

    // this.setTimeout(async function() {
    //     await showPages()
    // }, 200)

    // this.setTimeout(function() {
    //     const parentToExclude = this.document.querySelector("#loading-view");
    //     const allElements = this.document.querySelectorAll("body *:not(script, style)");
    //     const elementsNotInParent = Array.from(allElements).filter(el => {
    //         return !el.closest("#loading-view")
    //     });
    //     elementsNotInParent.forEach(el => {
    //         el.style.visibility = "visible";
    //     })
    //     parentToExclude.style.visibility = "hidden"
    // }, 200)
});

document.addEventListener("keydown", function(event) {
    if (event.key === "Enter") {
        event.preventDefault()
    }
});

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
};