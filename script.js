document.addEventListener("DOMContentLoaded", function() {
    checkAuth();
});

function register() {
    let email = document.getElementById("email").value;
    let username = document.getElementById("username").value;
    let password = document.getElementById("password").value;
    let confirmPassword = document.getElementById("confirmPassword").value;

    if (!email || !username || !password || !confirmPassword) {
        alert("Заполните все поля!");
        return;
    }

    if (password !== confirmPassword) {
        alert("Пароли не совпадают!");
        return;
    }

    let users = JSON.parse(localStorage.getItem("users") || "[]");

    if (users.some(user => user.username === username)) {
        alert("Такой ник уже существует!");
        return;
    }

    users.push({ email, username, password });
    localStorage.setItem("users", JSON.stringify(users));

    alert("Регистрация успешна!");
    localStorage.setItem("loggedInUser", username);
    window.location.href = "home.html";
}

function login() {
    let username = document.getElementById("loginUsername").value;
    let password = document.getElementById("loginPassword").value;

    let users = JSON.parse(localStorage.getItem("users") || "[]");
    let user = users.find(u => u.username === username && u.password === password);

    if (!user) {
        alert("Неверный ник или пароль!");
        return;
    }

    localStorage.setItem("loggedInUser", username);
    window.location.href = "home.html";
}

function checkAuth() {
    let currentPage = window.location.pathname.split("/").pop();
    let username = localStorage.getItem("loggedInUser");

    if (["home.html", "account.html"].includes(currentPage) && !username) {
        window.location.href = "index.html";
    }

    if (currentPage === "home.html" && username) {
        document.getElementById("userWelcome").innerText = username;
    }

    if (currentPage === "account.html" && username) {
        let users = JSON.parse(localStorage.getItem("users") || "[]");
        let user = users.find(u => u.username === username);
        document.getElementById("accountEmail").innerText = user.email;
        document.getElementById("accountUsername").innerText = user.username;
    }
}

function logout() {
    localStorage.removeItem("loggedInUser");
    window.location.href = "index.html";
}
