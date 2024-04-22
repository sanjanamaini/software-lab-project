window.onload = function() {
    var userType=localStorage.getItem("userType");
    if (userType=="S") {
        SView();
    } else if(userType=="A"){
        AView();
    } else if(userType=="W"){
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

function SView() {
    removeAddStudent();
    removeDeleteStudent();
    removeCollectFine();
    removeAllRoomDetails();
}

function WView() {
    removeAddStudent();
    removeBookingDetails();
    removePayment();
    removeDeleteStudent();
    removeStudentDets();
    removeSelectRoom();
    removeRoomDetails();
}

function AView() {
    removeBookingDetails();
    removePayment();
    removeStudentDets();
    removeSelectRoom();
    removeRoomDetails();
    removeCollectFine();
    removeAllRoomDetails();
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