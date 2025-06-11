const rootUrl = window.location.origin;

console.log(rootUrl)
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
                sessionStorage.setItem("user", matchingUser.user_id)
            }
        }

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

async function handleLoginInput() {
    const loginEmaiElement = document.querySelector("#user-email-address-element");
    const loginPasswordElement = document.querySelector("#user-password-element");

    const loginUserObject = {
        emailAddress: loginEmaiElement.value,
        password: loginPasswordElement.value
    };

    return loginUserObject
};

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
        firstName: registerUserFirstNameElement.value,
        lastName: registerUserLastNameElement.value,
        emailAddress: registerUserEmailElement.value,
        phonenumber: registerUserPhonenumberElement.value,
        password: registerUserPasswordElement.value,
    };

    if (registerUserObject.password !== confirmationPassword) {
        alert("Passwords do not match.")
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

    const matchingUserObject = {
       userId: matchingUser.user_id,
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
    const userId = sessionStorage.getItem("user");
    const user = await getUser(userId);
    const recipient = user.emailaddress;

    console.log(recipient)
}

const navigateUserPageIcon = document.querySelector("#navigate-user-page-icon");
navigateUserPageIcon.addEventListener("click", navigateUserPageFromSidePanel)
async function navigateUserPageFromSidePanel() {
    const userId = sessionStorage.getItem("user");
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
    const navigateNewContactPageIcon = document.querySelector("#navigate-add-contacts-page-icon");
    navigateNewContactPageIcon.addEventListener("click", function() {
        window.location.href = `${rootUrl}/new_contact`
    })

async function renderSmallSidePanelContent() {
    const userId = sessionStorage.getItem("user");
    const user = await getUser(userId);

    const navigateUserPageIcon = document.querySelector("#navigate-user-page-icon");
    if (user.user_image !== null && user.user_image !== './images/user-5-svgrepo-com.svg') {
        navigateUserPageIcon.setAttribute("src", user.user_image)
    }

    console.log(navigateUserPageIcon.parentElement)
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
} 

async function renderLargeSidePanelContent() {
    const userId = sessionStorage.getItem("user");
    const userContacts = await getUserContacts(userId);

    console.log(userContacts)

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
        contactListItem.style.height = "35px"
        // contactListItem.style.width = "300px"
        contactListItem.style.marginBottom = "8px"
        contactListItem.style.padding = "2.5px"
        contactListItem.addEventListener("mouseover", function() {
            contactListItem.style.backgroundColor = "grey";
        });
        contactListItem.addEventListener("mouseover", function() {
            contactListItem.style.backgroundColor = "lightgrey";
        });
        contactListItem.addEventListener("mouseout", function() {
            contactListItem.style.backgroundColor = "ghostwhite";
        })
        const contactImageItem = document.createElement("img");
        contactImageItem.style.width = "35px";
        contactImageItem.style.height = "100%";
        contactImageItem.style.border = "0.5px solid grey";
        contactImageItem.style.borderRadius = "50%";
        contactImageItem.style.backgroundColor = "gainsboro"
        contactImageItem.setAttribute("src", contact.contact_image);
        const contactListItemNameContainer = document.createElement("div");
        contactListItemNameContainer.style.display = "flex";
        contactListItemNameContainer.style.height = "100%"
        const contactFavoriteIconContainer = document.createElement("div");
        const contactFavoriteIcon = document.createElement("img");
        contactFavoriteIcon.setAttribute("src", "./images/star-gold-svgrepo-com.svg");
        contactFavoriteIcon.style.width = "20px";
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
        // contactEmailElement.style.fontFamily = "sans-serif"
        contactEmailElement.style.fontSize = "small"
        contactEmailElement.style.margin = "0px 0px 0px 10px";
        contactEmailElement.innerHTML = contact.emailaddress
        const contactOrganizationAndRoleElement = document.createElement("p");
        contactOrganizationAndRoleElement.style.fontSize = "0px"
        contactOrganizationAndRoleElement.style.margin = "0px"
        contactOrganizationAndRoleElement.innerHTML = `${contact.organization} || ${contact.organization_role}`

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

        if (contactFirstName.toLowerCase().startsWith(searchContactsInputValue)) {
            for (let i = 0; i < userContacts.length; i++) {
                let matchContactName = `${userContacts[i].firstname} ${userContacts[i].lastname}`
                if (contactName.toLowerCase() === matchContactName.toLowerCase()) {
                    filteredContacts.push(userContacts[i])
                    // console.log(filteredContacts)
                }
            }
        }

        if (contactLastName.toLowerCase().startsWith(searchContactsInputValue)) {
            for (let i = 0; i < userContacts.length; i++) {
                let matchContactName = `${userContacts[i].firstname} ${userContacts[i].lastname}`
                if (contactName.toLowerCase() === matchContactName.toLowerCase()) {
                    filteredContacts.push(userContacts[i])
                    // console.log(filteredContacts)
                }
            }
        }

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

    if (filteredContacts.length > 0) {
        searchContactsAutocompleteList.style.display = 'block';
        contactsList.style.display = "none"
        uniqueArray.forEach(contact => {
            const contactsAutoCompleteListItem = document.createElement('div');
            contactsAutoCompleteListItem.style.display = "flex";
            contactsAutoCompleteListItem.style.justifyContent = "space-between";
            contactsAutoCompleteListItem.style.alignItems = "center";
            contactsAutoCompleteListItem.style.height = "35px";
            // contactsAutoCompleteListItem.style.width = "300px";
            contactsAutoCompleteListItem.style.marginBottom = "8px";
            contactsAutoCompleteListItem.style.padding = "2.5px";
            contactsAutoCompleteListItem.addEventListener("mouseover", function() {
            contactsAutoCompleteListItem.style.backgroundColor = "grey";
            });
            contactsAutoCompleteListItem.addEventListener("mouseover", function() {
            contactsAutoCompleteListItem.style.backgroundColor = "lightgray";
            });
            contactsAutoCompleteListItem.addEventListener("mouseout", function() {
            contactsAutoCompleteListItem.style.backgroundColor = "ghostwhite";
            })
            const contactAutoCompleteImage = document.createElement("img");
            contactAutoCompleteImage.style.width = "35px";
            contactAutoCompleteImage.style.height = "100%";
            contactAutoCompleteImage.style.border = "0.5px solid grey";
            contactAutoCompleteImage.style.borderRadius = "50%";
            contactAutoCompleteImage.style.backgroundColor = "gainsboro"
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
    }};
}
     
async function renderUserContent() {
    const userId = sessionStorage.getItem("user");
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

async function renderEditUserContent() {
    const userId = sessionStorage.getItem("user");
    const user = await getUser(userId);

    const editUserImage = document.querySelector("#edit-user-image");
    if (user.user_image !== null && user.user_image !== './images/user-5-svgrepo-com.svg') {
        editUserImage.setAttribute("src", user.user_image);
        editUserImage.style.borderRadius = "50%"
    };

    const editUserRemovePhotoButton = document.querySelector("#edit-user-remove-photo-button");
    editUserRemovePhotoButton.addEventListener("click", function() {
        const editUserAddPhotoInputElement = document.querySelector("#edit-user-add-photo")
        editUserAddPhotoInputElement.value = ""
        editUserImage.setAttribute("src", "./images/user-5-svgrepo-com.svg")
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
        window.location.reload()
      
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

async function handleEditUserImage() {
    const userId = sessionStorage.getItem("user");
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

async function handleEditUserInput(event) {
    const userId = sessionStorage.getItem("user");
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

async function handleEditUserPasswordInput() {
    const userId = sessionStorage.getItem("user");
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
    const userId = sessionStorage.getItem("user");
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
    contactsListContainer.style.top = "28.2%"
    contactsListContainer.style.left = "31.5%"
    contactsListContainer.style.width = "68.5%"
    const contactsList = document.createElement("ul");
    contactsList.style.listStyle = "none";
    contactsList.style.padding = "0"
    contactsList.style.margin = "0"
    // contactsList.style.height = "100%";
    // contactsList.style.overflow = "auto"
    // contactsList.style.zIndex = "5"
    userContacts.forEach(contact => {
        const contactListItem = document.createElement("div");
        contactListItem.style.display = "flex";
        contactListItem.style.flexDirection = "row";
        contactListItem.style.height = "100px"
        contactListItem.style.borderTop = "1px solid gray";
        contactListItem.style.borderBottom = "1px solid gray";
        contactListItem.style.backgroundColor = "aliceblue"
        contactListItem.style.marginTop = "1px";
        contactListItem.style.marginBottom = "1px";
        contactListItem.setAttribute("contactId", contact.contact_id)

        contactListItem.addEventListener("mouseover", function() {
            contactListItem.style.backgroundColor = "lightgrey";
        });

        contactListItem.addEventListener("mouseout", function() {
            contactListItem.style.backgroundColor = "aliceblue";
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
        contactListItemImage.style.width = "90px";
        contactListItemImage.style.height = "100%";
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
        contactListFavoriteStarImg.style.width = "60px"

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
    contactsHeaderContainer.append(myContactsHeaderElement)
    contactsHeaderContainer.appendChild(numberOfContactsElement)
    contactsListContainer.appendChild(contactsHeaderContainer)
    contactsListContainer.appendChild(contactsList)
    document.body.appendChild(contactsListContainer)
};

async function handleContactFavorite() {
    const user_id = sessionStorage.getItem("user")
    const url = window.location.href.toString()
    const urlBeforeQuery = url.split('?')[0];
    const contact_id = urlBeforeQuery.charAt(urlBeforeQuery.length - 1);
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
    const user_id = sessionStorage.getItem("user");
    const url = window.location.href.toString()
    const urlBeforeQuery = url.split('?')[0];
    const contact_id = urlBeforeQuery.charAt(urlBeforeQuery.length - 1);
    const contact = await getUserContact(user_id, contact_id);

    const addToFavoritesButton = document.querySelector("#add-to-favorites-button");

    if (contact.favorite === true) {
        addToFavoritesButton.innerHTML = "Remove favorite";
        addToFavoritesButton.style.backgroundColor = "indianred";
    };

    addToFavoritesButton.addEventListener("click", function() {
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
    })
};

async function renderEditContactContent() {
    const user_id = sessionStorage.getItem("user");
    const url = window.location.href.toString()
    const urlBeforeQuery = url.split('?')[0];
    const contact_id = urlBeforeQuery.charAt(urlBeforeQuery.length - 1);
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
    })

    const editContactAddPhotoButton = document.querySelector("#edit-contact-add-photo-button");
    if (contact.contact_image !== null && contact.contact_image !== './images/user-2-svgrepo-com.svg') {
        editContactAddPhotoButton.innerHTML = "Change Photo"
    }

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
        window.location.reload()
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

    const deleteContactButton = document.querySelector("#delete-contact-button");
    deleteContactButton.addEventListener("click", deleteContact, false);
};

async function handleEditContactImage() {
    const user_id = sessionStorage.getItem("user");
    const url = window.location.href.toString()
    const urlBeforeQuery = url.split('?')[0];
    const contact_id = urlBeforeQuery.charAt(urlBeforeQuery.length - 1);
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
            address: contact.address,
            organization: contact.organization,
            role: contact.organization_role,
            socialMedia: contact.social_media,
            favorite: contact.favorite,
            contactImage: editContactImageElement.getAttribute("src")
        };

        return editContactImageObject
    // })
}

async function handleEditContactInput() {
    const user_id = sessionStorage.getItem("user");
    const url = window.location.href.toString()
    const urlBeforeQuery = url.split('?')[0];
    const contact_id = urlBeforeQuery.charAt(urlBeforeQuery.length - 1);
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
}

async function renderFavoriteContactsListContent() {
    const userId = sessionStorage.getItem("user");
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
    favoriteContactsListContainer.style.top = "28.2%"
    favoriteContactsListContainer.style.left = "31.5%"
    favoriteContactsListContainer.style.width = "68.5%"
    const favoriteContactsList = document.createElement("ul");
    favoriteContactsList.style.listStyle = "none";
    favoriteContactsList.style.padding = "0"
    favoriteContactsList.style.margin = "0"
    // favoriteContactsList.style.height = "100%";
    // favoriteContactsList.style.overflow = "auto"
    // favoriteContactsList.style.zIndex = "5"
    favoriteContacts.forEach(contact => {
        const favoriteContactListItem = document.createElement("div");
        favoriteContactListItem.style.display = "flex";
        favoriteContactListItem.style.flexDirection = "row";
        favoriteContactListItem.style.height = "100px"
        favoriteContactListItem.style.borderTop = "1px solid gray";
        favoriteContactListItem.style.borderBottom = "1px solid gray";
        favoriteContactListItem.style.backgroundColor = "aliceblue"
        favoriteContactListItem.style.marginTop = "1px";
        favoriteContactListItem.style.marginBottom = "1px";
        favoriteContactListItem.setAttribute("contactId", contact.contact_id)

        favoriteContactListItem.addEventListener("mouseover", function() {
            favoriteContactListItem.style.backgroundColor = "lightgrey";
        });

        favoriteContactListItem.addEventListener("mouseout", function() {
            favoriteContactListItem.style.backgroundColor = "aliceblue";
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
        favoriteContactListItemImage.style.width = "90px";
        favoriteContactListItemImage.style.height = "100%";
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
        favoriteContactListFavoriteStarImg.style.width = "60px"

        console.log(contact.favorite)

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
}

async function renderNewContactContent() {
    const userId = sessionStorage.getItem("user")
    const userContacts = await getUserContacts(userId);
    console.log(userContacts.length)

    const newContactImage = document.querySelector("#new-contact-image");
    const newContactRemovePhotoButton = document.querySelector("#new-contact-remove-photo-button");
    newContactRemovePhotoButton.addEventListener("click", function() {
        const newContactAddPhotoInputElement = document.querySelector("#new-contact-add-photo")
        newContactAddPhotoInputElement.value = ""
        newContactImage.setAttribute("src", "./images/user-2-svgrepo-com.svg")
    })

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

    const createNewContactButton = document.querySelector("#create-new-contact-button")
    createNewContactButton.addEventListener("click", function() {
        postNewContact()
    });
};

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

async function handleNewContactInput() {
    const userId = sessionStorage.getItem("user");
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
}
   

async function getAllUsers() {
    try {
    const response = await fetch(`${rootUrl}/users`);
    const jsonData = await response.json();
    return jsonData;   
    } catch (err) {
    console.error(err.message)
    }
};

async function getUser(user_id) {
    try {
    const response = await fetch(`${rootUrl}/users/${user_id}`);
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
    const phonenumber = registerUserObject.phonenumber;
    const user_password = registerUserObject.password;

    console.log(registerUserObject)

    const body = { user_id, firstname, lastname, emailaddress, phonenumber, user_password };
    try {
        const response = await fetch(`${rootUrl}/users`, {
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
    const user_id = sessionStorage.getItem("user");
    const user = await getUser(user_id)
    const editUserObject = await handleEditUserInput();

    const editUserChangePasswordButton = document.querySelector("#edit-user-change-password-button");
    console.log(editUserObject)
    if (user.firstname === editUserObject.firstname && user.lastname === editUserObject.lastname && user.emailaddress === editUserObject.emailaddress && user.phonenumber === editUserObject.phonenumber && user.user_image === editUserObject.userImage && editUserChangePasswordButton.style.display !== "none") {
        // event.preventDefault()
        window.location.reload()
        return
    }

    const firstname = editUserObject.firstname;
    const lastname = editUserObject.lastname;
    const emailaddress = editUserObject.emailaddress;
    const phonenumber = editUserObject.phonenumber;
    const password = user.user_password;
    const user_image = editUserObject.userImage;

    const body = { firstname, lastname, emailaddress, phonenumber, password, user_image };
    try {
        const response = await fetch(`${rootUrl}/users/${user_id}`, {
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

async function updateUserImage(event) {
    const url = window.location.href;
    const user_id = sessionStorage.getItem("user");
    const user = await getUser(user_id)
    const editUserImageObject = await handleEditUserImage();

    const editUserChangePasswordButton = document.querySelector("#edit-user-change-password-button");

    // if (user.firstname === editUserObject.firstname && user.lastname === editUserObject.lastname && user.emailaddress === editUserObject.emailaddress && user.phonenumber === editUserObject.phonenumber && user.user_image === editUserObject.userImage && editUserChangePasswordButton.style.display !== "none") {
    //     // event.preventDefault()
    //     window.location.reload()
    //     return
    // }

    const firstname = editUserImageObject.firstname;
    const lastname = editUserImageObject.lastname;
    const emailaddress = editUserImageObject.emailaddress;
    const phonenumber = editUserImageObject.phonenumber;
    const password = editUserImageObject.password;
    const user_image = editUserImageObject.userImage;

    const body = { firstname, lastname, emailaddress, phonenumber, password, user_image };
    try {
        const response = await fetch(`${rootUrl}/users/${user_id}`, {
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
    const user_id = recoverUserObject.userId;
    const firstname = recoverUserObject.firstname;
    const lastname = recoverUserObject.lastname;
    const emailaddress = recoverUserObject.emailaddress;
    const phonenumber = recoverUserObject.phonenumber;
    const password = recoverUserObject.password;
    const user_image = recoverUserObject.userImage;

    const body = { firstname, lastname, emailaddress, phonenumber, password, user_image };
    try {
        const response = await fetch(`${rootUrl}/users/${user_id}`, {
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
    const user_id = sessionStorage.getItem("user");
    const user = await getUser(user_id)
    const editUserPasswordObject = await handleEditUserPasswordInput();

    const editUserChangePasswordButton = document.querySelector("#edit-user-change-password-button");

    // if (user.firstname === editUserObject.firstname && user.lastname === editUserObject.lastname && user.emailaddress === editUserObject.emailaddress && user.phonenumber === editUserObject.phonenumber && user.user_image === editUserObject.userImage && editUserChangePasswordButton.style.display !== "none") {
    //     // event.preventDefault()
    //     window.location.reload()
    //     return
    // }

    const firstname = user.firstname;
    const lastname = user.lastname;
    const emailaddress = user.emailaddress;
    const phonenumber = user.phonenumber;
    const password = editUserPasswordObject.password;
    const user_image = user.user_image;

    const body = { firstname, lastname, emailaddress, phonenumber, password, user_image };
    try {
        const response = await fetch(`${rootUrl}/users/${user_id}`, {
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

async function deleteUser() {
    const user_id = sessionStorage.getItem("user");
    try {
        const response = await fetch(`${rootUrl}/users/${user_id}`, {
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
    const response = await fetch(`${rootUrl}/contacts/${user_id}`);
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
        const response = await fetch(`${rootUrl}/contacts`, {
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

async function getUserContact(user_id, contact_id) {
    try {
    const response = await fetch(`${rootUrl}/contacts/${user_id}/${contact_id}`);
    const jsonData = await response.json();
    return jsonData; 
    } catch (err) {
    console.error(err.message);
    }
};

async function updateContact() {
    const user_id = sessionStorage.getItem("user");
    const url = window.location.href.toString()
    const urlBeforeQuery = url.split('?')[0];
    const contact_id = urlBeforeQuery.charAt(urlBeforeQuery.length - 1);
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
        const response = await fetch(`${rootUrl}/contacts/${user_id}/${contact_id}`, {
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

async function updateContactImage() {
    const user_id = sessionStorage.getItem("user");
    const url = window.location.href.toString()
    const urlBeforeQuery = url.split('?')[0];
    const contact_id = urlBeforeQuery.charAt(urlBeforeQuery.length - 1);
    const editContactImageObject = await handleEditContactImage()

    const firstname = editContactImageObject.firstname;
    const lastname = editContactImageObject.lastname;
    const emailaddress = editContactImageObject.emailaddress;
    const phonenumber = editContactImageObject.phonenumber;
    const birthday = editContactImageObject.birthday;
    const homeaddress = editContactImageObject.homeaddress;
    const gender = editContactImageObject.gender;
    const organization = editContactImageObject.organization;
    const organization_role = editContactImageObject.role;
    const social_media = editContactImageObject.socialMedia;
    const favorite = editContactImageObject.favorite;
    const contact_image = editContactImageObject.contactImage;

    const body = { firstname, lastname, emailaddress, phonenumber, birthday, gender, birthday, homeaddress, organization, organization_role, social_media, favorite, contact_image };
    try {
        const response = await fetch(`${rootUrl}/contacts/${user_id}/${contact_id}`, {
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

async function updateContactFavorite() {
    const user_id = sessionStorage.getItem("user");
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
        const response = await fetch(`${rootUrl}/contacts/${user_id}/${contact_id}`, {
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
    const user_id = sessionStorage.getItem("user");
    const url = window.location.href.toString()
    const urlBeforeQuery = url.split('?')[0];
    const contact_id = urlBeforeQuery.charAt(urlBeforeQuery.length - 1);
    // const contact = await getUserContact(user_id, contact_id);
    // const allUserContacts = await getUserContacts(user_id)

    try {
        const response = await fetch(`${rootUrl}/contacts/${user_id}/${contact_id}`, {
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
    const user_id = sessionStorage.getItem("user");

    try {
        const response = await fetch(`${rootUrl}/contacts/${user_id}`, {
            method: "DELETE",
            headers: { "Content-Type": "application/json" },
        });
        console.log(response)
    } catch (error) {
        console.error(error)
    }

    localStorage.clear()
};

async function setInitialURLAsLogin() {
    const userId = sessionStorage.getItem("user");
    console.log(userId);

    const appName = document.querySelector("#app-name");

    // if (userId !== null) {
    //     appName.style.left = "32%"
    //     return
    // };

    if (window.location.href === `${rootUrl}/login`) {
        return
    };

    if (userId === null && window.location.href !== `${rootUrl}/register` && userId === null && window.location.href !== `${rootUrl}/recover-password`) {
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

let phoneNumberArr = []
function formatPhoneNumberForData(element) {
    let phonenumber = element.value;
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
    phonenumber = phonenumber.replace(/[\s+\-()]/g, '')
    element.value = phonenumber
    // console.log(phonenumber)
}

async function domReady(cb) {
    document.readyState === 'interactive' || document.readyState === 'complete'
    ? cb
    : document.addEventListener("DOMContentLoaded", cb)
};


domReady(async () => {
    const offsetwidth = document.body.offsetwidth;
    const clientwidth = window.innerWidth;

    // console.log(offsetwidth);
    // console.log(clientwidth);

    await setInitialURLAsLogin()

    const appName = document.querySelector("#app-name");

    const loginViewElement = document.querySelector("#login-view")
    if (window.location.href === `${rootUrl}/login`) {
        loginViewElement.style.display = "block"
        await renderLoginContent()
        // document.body.style.backgroundColor = "cornflowerblue"
        document.body.style.display = "block"
    } else {
        loginViewElement.style.display = "none"
    };

    const registerViewElement = document.querySelector("#register-view")
    if (window.location.href === `${rootUrl}/register`) {
        registerViewElement.style.display = "block";
        await renderRegisterContent()
        document.body.style.display = "block"
    } else {
        registerViewElement.style.display = "none"
    };

    const recoverPasswordViewElement = document.querySelector("#recover-password-view");
    if (window.location.href === `${rootUrl}/recover-password`) {
        recoverPasswordViewElement.style.display = "block";
        await renderRecoverPassword();
        document.body.style.display = "block";
    } else {
        recoverPasswordViewElement.style.display = "none";
    }

    await renderSmallSidePanelContent()
    await renderLargeSidePanelContent()

    const contactsListViewElement = document.querySelector("#contacts-list-view");
    if (window.location.href === `${rootUrl}/contacts`) {
        contactsListViewElement.style.display = "block";
        appName.style.left = "32%"
        await renderContactsListContent()
        document.body.style.display = "block"
    } else {
        contactsListViewElement.style.display = "none"
    };

    const contactViewElement = document.querySelector("#contact-view");
    if (window.location.href.startsWith(`${rootUrl}/contact_`)) {
        contactViewElement.style.display = "block";
        appName.style.left = "32%"
        await renderContactContent()
        document.body.style.display = "block"
    } else {
        contactViewElement.style.display = "none"
    };

    const userViewElement = document.querySelector("#user-view");
    if (window.location.href.startsWith(`${rootUrl}/user`)) {
        userViewElement.style.display = "block";
        appName.style.left = "32%"
        await renderUserContent()
        document.body.style.display = "block"
    } else {
        userViewElement.style.display = "none"
    };

    const editUserViewElement = document.querySelector("#edit-user-view");
    if (window.location.href.startsWith(`${rootUrl}/edit_user`)) {
        editUserViewElement.style.display = "block";
        appName.style.left = "32%"
        await renderEditUserContent()
        document.body.style.display = "block"
    } else {
        editUserViewElement.style.display = "none"
    };

    const favoritesListViewElement = document.querySelector("#favorites-list-view");
    if (window.location.href === (`${rootUrl}/favorite_contacts`)) {
        favoritesListViewElement.style.display = "block";
        appName.style.left = "32%"
        await renderFavoriteContactsListContent()
        document.body.style.display = "block"
    } else {
        favoritesListViewElement.style.display = "none"
    };

    const newContactViewElement = document.querySelector("#new-contact-view");
    if (window.location.href === (`${rootUrl}/new_contact`)) {
        newContactViewElement.style.display = "block";
        appName.style.left = "32%"
        await renderNewContactContent()
        document.body.style.display = "block"
    } else {
        newContactViewElement.style.display = "none"
    };

    const editContactViewElement = document.querySelector("#edit-contact-view");
    if (window.location.href.startsWith(`${rootUrl}/edit_contact`)) {
        editContactViewElement.style.display = "block";
        appName.style.left = "32%"
        await renderEditContactContent()
        document.body.style.display = "block"
    } else {
        editContactViewElement.style.display = "none"
    };

    // setTimeout(async function() {
    //     // await updatePageForNavigation()
    //     document.body.style.display = "block"
    // }, 0)
});

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