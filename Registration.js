< script >
    let loginPageBtn = document.getElementById("loginPageBtn");

loginPageBtn.onclick = function() {
    window.location.href = "LogIn1.html";
}

// -----------------------------------------------------
class Node {
    constructor(newUsers) {
        this.newUsers = newUsers;
        this.next = null;
    }
}

class LinkedList {
    constructor() {
        this.head = null;
    }

    append(newUsers) {
        const newNode = new Node(newUsers);

        if (!this.head) {
            this.head = newNode;
        } else {
            let current = this.head;
            while (current.next) {
                current = current.next;
            }
            current.next = newNode;
        }
    }

    findEmail(email) {
        let current = this.head;
        while (current) {
            if (current.newUsers.newUserEmail === email) {
                return true;
            }
            current = current.next;
        }
        return false;
    }
}

// Load existing data from localStorage or create a new LinkedList
const storedData = localStorage.getItem('userList');
const userLinkedList = storedData ? JSON.parse(storedData) : new LinkedList();

function handleRegistration() {
    const registerForm = document.getElementById("registration-form");
    const newUsername = document.getElementById('UserName').value;
    const newUserEmail = document.getElementById('UserEmail').value;
    const newPassword = document.getElementById('new-password').value;

    if (!newUsername || !newPassword || !newUserEmail) {
        alert("Please enter username, email, and password.");
        registerForm.reset();
        return;
    }

    const emailExistsInList = userLinkedList.findEmail(newUserEmail);
    if (emailExistsInList) {
        alert("Email Already Exists in List");
        return;
    } else {
        const newUsers = {
            newUsername,
            newPassword,
            newUserEmail
        };
        userLinkedList.append(newUsers);
        // Save updated data to localStorage
        localStorage.setItem('userList', JSON.stringify(userLinkedList));
        alert("Registration successful. You can now login.");
        registerForm.reset();
    }
}