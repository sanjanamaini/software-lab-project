// script.js
document.getElementById("login-form").addEventListener("submit", function(event) {
    event.preventDefault();
    const username = document.getElementById("username").value;
    const role = document.getElementsByClassName("role").value;
    const password = document.getElementById("password").value;
    
    // You can use AJAX to send the username and password to the server for authentication
    // and receive the user role in response. For simplicity, we'll use a hardcoded role here.

  ); // Function to get the user role based on the username

    // Redirect user to the appropriate dashboard based on the role
    switch (role) {
        case "student":
            window.location.href = "student_dashboard.html";
            break;
        case "warden":
            window.location.href = "warden_dashboard.html";
            break;
        case "database_manager":
            window.location.href = "database_manager_dashboard.html";
            break;
        default:
            alert("Invalid username or password");
            break;
    }
});

function getRole(username) {
    // Hardcoded user roles for demonstration
    const roles = {
        "student1": "student",
        "warden1": "warden",
        "dbmanager1": "database_manager"
    };
    return roles[username] || null;
}
