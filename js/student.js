window.onload = function() {
    var userDetsString = localStorage.getItem("currentUserDetails");
    var userDets = JSON.parse(userDetsString);
    console.log(userDets);
    if (userDets[0].registrationnum.substring(0, 2) == "AP") {
        console.log("student view 1");
        SView(userDets);
        console.log("student view 2s")
    } else if(userDets[0].registrationnum=="Admin"){
        AView();
    } else if(userDets[0].registrationnum.substring(0,1)=="W"){
        WView();
    }
    hideAndUnhide();
};

function hideAndUnhide() {
    var inactiveDivs = document.getElementsByClassName('inactiveView');
    var activeDivs=document.getElementsByClassName('activeView');

    for (var i = 0; i < inactiveDivs.length; i++) {
        inactiveDivs[i].style.display = 'none';
    }
    for (let i = 0; i < activeDivs.length; i++) {
        activeDivs[i].style.display=''
    }
}

function setActive(event, view) {
    var clickedID = event.target.id; // Get the ID of the clicked element
    document.getElementsByClassName('active')[0].classList.remove('active'); // Get all elements with 'activeView' class
    document.getElementsByClassName('activeView')[0].classList.add('inactiveView');
    document.getElementsByClassName('activeView')[0].classList.remove('activeView');

    document.getElementById(clickedID).classList.add('active');
    document.getElementById(view).classList.remove('inactiveView'); // Remove the 'inactiveView' class
    document.getElementById(view).classList.add('activeView');
    hideAndUnhide();
}

function SView(userDets) {
    removeAddStudent();
    removeDeleteStudent();
    removeCollectFine();
    removeAllRoomDetails();

    document.getElementById('studentName').innerText = userDets[0].name;
    document.getElementById('studentID').innerText = userDets[0].registrationnum;
    document.getElementById('studentDept').innerText = userDets[0].department;
    document.getElementById('studentCGPA').innerText = userDets[0].cgpa;
    document.getElementById('studentYear').innerText = userDets[0].yearofstudy;
    // document.getElementById('studentName').innerText = userDets[0].name;
    

}


function WView() {
    removeAddStudent();
    removeBookingDetails();
    removePayment();
    removeDeleteStudent();
    removeStudentDets();
    removeSelectRoom();
    removeRoomDetails();
    document.getElementById('studentView').classList.add("inactiveView");
    document.getElementById('AllroomDetailsView').classList.add("activeView");
    document.getElementById('studentView').classList.remove("activeView");
    hideAndUnhide();
}

function AView() {
    removeBookingDetails();
    removePayment();
    removeStudentDets();
    removeSelectRoom();
    removeRoomDetails();
    removeCollectFine();
    removeAllRoomDetails();
    document.getElementById('studentView').classList.add("inactiveView");
    document.getElementById('AllroomDetailsView').classList.add("activeView");
    document.getElementById('studentView').classList.remove("activeView");
    hideAndUnhide();
}

function removeStudentDets() {
    document.getElementById("student").style.display='none';
}

function removePayment(){
    document.getElementById("makpayment").style.display='none';
}

function removeSelectRoom(){
    document.getElementById("SelRoom").style.display='none';
}

function removeRoomDetails(){
    document.getElementById("details").style.display='none';
}

function removeAllRoomDetails() {
    document.getElementById("AllroomDetailsView").style.display = "none";
}

function removeBookingDetails(){
    document.getElementById("bookingDetails").style.display='none';
}

function removeCollectFine(){
    document.getElementById('paymentDetails').style.display='none';
}
function removeAddStudent(){
    document.getElementById('addStudent').style.display='none';
}
function removeDeleteStudent(){
    document.getElementById('deletestudent').style.display='none';
}

function isValidName(name) {
    if (name.length > 0 && name.length <= 50) {
        return /^[a-zA-Z\s'-]+$/.test(name);
    } else {
        return false; // Return false if the name is empty or exceeds 50 characters
    }
}

function validateName() {
    var nameInput = document.getElementById("newUserFullName");
    var validationMessage = document.getElementById("nameInvalid");

    if (isValidName(nameInput.value)) {
        validationMessage.innerText = "";
        return true;
    } else {
        validationMessage.innerText = "Invalid Name";
        return false;
    }
}

function logoutandclearstorage() {
    sessionStorage.clear();
    localStorage.clear();
    window.location.href = "index.html";
}

