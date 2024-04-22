function isValidUsername(username) {
    const alphanumericRegex = /^[a-zA-Z0-9]+$/;

    return alphanumericRegex.test(username);
}
function isValidPassword(password) {
    const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%^&*()_+])[A-Za-z\d!@#$%^&*()_+]{8,}$/;

    return passwordRegex.test(password);
}
function validateUsername() {
    var usernameInput = document.getElementById("username");
    var validationMessage = document.getElementById("usernameInvalid");

    if (isValidUsername(usernameInput.value)) {
        validationMessage.innerText = "";
        return true;
    } else {
        validationMessage.innerText = "Invalid Username";
        return false;
    }
}


function validatePassword(){
    var  passwordInput = document.getElementById("password");
    var validationMessage = document.getElementById("passwordInvalid");

    if (isValidPassword(passwordInput.value)) {
        validationMessage.innerText="";
        return true;
    } else {
        validationMessage.innerText="Invalid Password";
        return false;
    }
}
// function validateRole(){
//     var roleSelect=document.getElementById("role");
//     var validationMessage=document.getElementById("roleInvalid");
//     if(roleSelect!=''){
//         validationMessage.innerText="";
//         return true;
//     } else{
//         validationMessage.innerText="Kindly select your role.";
//         return false;
//     }
// }
// function validateLoginCreds() {
//     if (validateUsername() && validatePassword()) {
//         document.getElementById("logincredsub").innerText = "Validating User...";
//         localStorage.setItem("userType", "S");
//         window.location.href = "student.html";
//     }
// }

async function validateLoginCreds() {
	if (validateUsername() && validatePassword()) {
		document.getElementById("logincredsub").innerText = "Validating User...";
        const username=document.getElementById("username").value;
        const password=document.getElementById("password").value;
        console.log(username,password);
        const details=await fetchDetails(username,password);
        if(details==0){
            alert("Incorrect USERNAME or PASSWORD");
            return;
        }
		localStorage.setItem("currentUserDetails", details);
		window.location.href = "student.html";
	}
}

// // validateLogin()

const fetchDetails = async (registrationnum, password) => {
	const response = await fetch("/api/login", {
		method: "GET",
		headers: {
			registrationnum: registrationnum,
			password: password,
		},
	});
	const data = await response.json();
    if (data.length==0){
        return 0;
    }else{
        return data;
    }
};