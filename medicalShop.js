const form = document.querySelector("form")

form.addEventListener("submit", (e) => {
    e.preventDefault()

    const username = form.username.value
    const password = form.password.value

    const authenticated = authentication(username, password)

    if (authenticated) {
        window.location.href = "Login.html"
    } else {
        alert("wrong")
    }
})

const medicine = {
    name: "Saiful",
    Password: "123"
};
// localStorage.setItem('medicine', JSON.stringify(medicine));
// localStorage.getItem('medicine', JSON.parse(medicine));

// function for checking username and password

function authentication(username, password) {
    if (username === medicine.name && password === medicine.Password) {
        return true
    } else {
        return false
    }
}