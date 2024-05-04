var userDets;

window.onload = function () {
	var userDetsString = localStorage.getItem("currentUserDetails");
	userDets = JSON.parse(userDetsString);
	console.log(userDets);
	if (userDets[0].registrationnum.substring(0, 2) == "AP") {
		console.log("student view 1");
		SView(userDets);
		console.log("student view 2s");
	} else if (userDets[0].registrationnum == "Admin") {
		AView();
	} else if (userDets[0].registrationnum.substring(0, 1) == "W") {
		WView();
	}
	hideAndUnhide();
};

function hideAndUnhide() {
	var inactiveDivs = document.getElementsByClassName("inactiveView");
	var activeDivs = document.getElementsByClassName("activeView");

	for (var i = 0; i < inactiveDivs.length; i++) {
		inactiveDivs[i].style.display = "none";
	}
	for (let i = 0; i < activeDivs.length; i++) {
		activeDivs[i].style.display = "";
	}
}

function setActive(event, view) {
	var clickedID = event.target.id; // Get the ID of the clicked element
	document.getElementsByClassName("active")[0].classList.remove("active"); // Get all elements with 'activeView' class
	document
		.getElementsByClassName("activeView")[0]
		.classList.add("inactiveView");
	document
		.getElementsByClassName("activeView")[0]
		.classList.remove("activeView");

        document.getElementById(clickedID).classList.add("active");
        document.getElementById(view).classList.remove("activeView"); // Remove the 'inactiveView' class
        document.getElementById(view).classList.add("activeView");
	hideAndUnhide();
}

function SView(userDets) {
	removeAddStudent();
	removeDeleteStudent();
	removeCollectFine();
	removeAllRoomDetails();

	document.getElementById("studentName").innerText = userDets[0].name;
	document.getElementById("studentID").innerText = userDets[0].registrationnum;
	document.getElementById("studentDept").innerText = userDets[0].department;
	document.getElementById("studentCGPA").innerText = userDets[0].cgpa;
	document.getElementById("studentYear").innerText = userDets[0].yearofstudy;
    // document.getElementById('studentName').innerText = userDets[0].name;
    
    document.getElementById('RoomNo').innerText=userDets[0].room;
    document.getElementById('FloorNo').innerText=userDets[0].floor;
    document.getElementById('TowerNo').innerText=userDets[0].tower;
}

function WView() {
	removeAddStudent();
	removeBookingDetails();
	// removePayment();
	removeDeleteStudent();
	removeStudentDets();
	removeSelectRoom();
	// removeRoomDetails();
	document.getElementById("studentView").classList.add("inactiveView");
	document.getElementById("AllroomDetailsView").classList.add("activeView");
	document.getElementById("studentView").classList.remove("activeView");
	hideAndUnhide();
}

function AView() {
	removeBookingDetails();
	// removePayment();
	removeStudentDets();
	removeSelectRoom();
	// removeRoomDetails();
	removeCollectFine();
	removeAllRoomDetails();
	document.getElementById("studentView").classList.add("inactiveView");
	document.getElementById("addStudentView").classList.add("activeView");
	document.getElementById("studentView").classList.remove("activeView");
	hideAndUnhide();
}

function removeStudentDets() {
	document.getElementById("student").style.display = "none";
}

// function removePayment() {
// 	document.getElementById("makpayment").style.display = "none";
// }

function removeSelectRoom() {
	document.getElementById("SelRoom").style.display = "none";
}

// function removeRoomDetails() {
// 	document.getElementById("details").style.display = "none";
// }

function removeAllRoomDetails() {
	document.getElementById("allroomdetails").style.display = "none";
}

function removeBookingDetails() {
	document.getElementById("bookingDetails").style.display = "none";
}

function removeCollectFine() {
	document.getElementById("paymentDetails").style.display = "none";
}
function removeAddStudent() {
	document.getElementById("addStudent").style.display = "none";
}
function removeDeleteStudent() {
	document.getElementById("deletestudent").style.display = "none";
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

//Creating room selection
async function createRoomSelection() {
	const id = userDets[0].registrationnum;
	const tower = document.getElementById("setTower").value;
	const floor = document.getElementById("setFloor").value;
	const roomNo = document.getElementById("setRoom").value;
	console.log(id, tower, floor, roomNo);
	document.getElementById("roomSel").innerText = "Updating ...";
	const detailUpdateStatus = await updateRoomDetails(
		id,
		tower,
		floor,
		roomNo
	);
}

const updateRoomDetails = async (registrationnum, tower, floor, room) => {
	console.log(registrationnum, tower, floor, room);
	const response = await fetch("http://localhost:3000/api/room/update", {
		method: "POST",
		headers: {
			registrationnum: registrationnum,
			tower: tower,
			floor: floor,
			room: room,
		},
    });
    const res = await response.json();
    document.getElementById('roomSel').innerText = 'Updated Successfully!';
};

// fetching booking details from DB
async function fetchRoomSelection() {
	const id = userDets[0].registrationnum;
	
	// console.log(id, tower, floor, roomNo);
	document.getElementById("submitReq").innerText = "Fetching ...";
    const detailUpdateStatus = await fetchRoomDetails(id);
    console.log(detailUpdateStatus);
    userDets[0] = detailUpdateStatus[0];
    document.getElementById('RoomNo').innerText=userDets[0].room;
    document.getElementById('FloorNo').innerText=userDets[0].floor;
    document.getElementById('TowerNo').innerText=userDets[0].tower;

}

const fetchRoomDetails = async (registrationnum) => {
	// console.log(registrationnum);
	const response = await fetch("http://localhost:3000/api/fetch/booking", {
		method: "GET",
		headers: {
			registrationnum: registrationnum
		},
    });
    const res = await response.json();
    document.getElementById('submitReq').innerText = 'Fetched Successfully!';
    return res;
};


async function fetchAllRooms() {
    try {
        const response = await fetch("http://localhost:3000/api/all/room/details");
        const data = await response.json();
        const tableBody = document.getElementById("bookingData");
        
        // Clear previous items
        console.log(data);
        tableBody.innerHTML = "";

        data.forEach((item) => {
            const row = document.createElement("tr");
            row.innerHTML = `
                <td>${item.roomnumber}</td>
                <td>${item.floor}</td>
                <td>${item.tower}</td>
                <td>${item.occupied}</td>
                <td>${item.studentregno}</td>
            `;
            tableBody.appendChild(row);
        });
    } catch (error) {
        console.error("Error fetching data:", error);
    }
}

//collecting fine
async function collectFine() {
    const id = document.getElementById("fineRegNo").value;
    const amount = document.getElementById("fineAmt").value;
    const reason = document.getElementById("finersn").value;
    console.log(id, amount, reason);
    
    const sendFine = await updateFine(
		id,
		amount,
		reason
	);
}
const updateFine = async (id, amount, reason) => {
	// console.log(registrationnum, tower, floor, room);
	const response = await fetch("http://localhost:3000/api/fine", {
		method: "POST",
		headers: {
			registrationnum: id,
			amt: amount,
			rsn: reason,
		},
    });
    const res = await response.json();
    document.getElementById('detailsConfirm').innerText = 'Sent Successfully!';
};

//add student
async function addStudent() {
    const name = document.getElementById("addStudName").value;
    const id = document.getElementById("addregno").value;
    const password = document.getElementById("addpwd").value;
    const dept = document.getElementById("addDept").value;
    const sem = document.getElementById("addSem").value;
    const cgpa = document.getElementById("addCgpa").value;
    const year = document.getElementById("addYear").value;
    // console.log(name,id,dept,sem,cgpa,year);
    document.getElementById('addStudentConfirm').innerText="Adding Student...";

    const addstud = await updateAddStud(
        name,
        id,
        password,
		dept,
        sem,
        cgpa,
        year
    );
    console.log("working");
    // document.getElementById('addStudentConfirm').innerText="Added Successfully!";

}
// const updateAddStud = async (name,registrationnum,password,department,semester,cgpa,yearofstudy) => {
// 	// console.log(registrationnum, tower, floor, room);
// 	const response = await fetch("http://localhost:3000/api/add/student", {
// 		method: "POST",
//         headers: {
//             name:name,
//             registrationnum: registrationnum,
//             password:password,
// 			department: department,
//             semester: semester,
//             cgpa: cgpa,
//             yearofstudy:yearofstudy,
// 		},
//     });
//     console.log("out of 1");
//     document.getElementById('addStudentConfirm').innerText = "Added Successfully";
//     console.log("out of 2");
//     const res = await response.json();
//     console.log("out of 3");

// };

const updateAddStud = async (name, registrationnum, password, department, semester, cgpa, yearofstudy) => {
    const response = await fetch("http://localhost:3000/api/add/student", {
        method: "POST",
        headers: {
            name: name,
            registrationnum: registrationnum,
            password: password,
            department: department,
            semester: semester,
            cgpa: cgpa,
            yearofstudy: yearofstudy,
        },
    });

    if (response.status === 400) {
        document.getElementById('addStudentConfirm').innerText = "Student with this registration number already exists";
        return;
    }

    if (response.ok) {
        document.getElementById('addStudentConfirm').innerText = "Added Successfully";
    } else {
        document.getElementById('addStudentConfirm').innerText = "Failed to add student";
    }
};


//delete student
async function delStudent() {
    document.getElementById('delStudentConfirm').innerText="Deleting Student...";

    const id = document.getElementById("delregno").value;
    console.log(id);

    // document.getElementById('delStudentConfirm').innerText="Deleting Student...";

    const del = await updateDelStud(
		id
    );
    
}
// const updateDelStud = async (registrationnum) => {
// 	// console.log(registrationnum, tower, floor, room);
// 	const response = await fetch("http://localhost:3000/api/del/student", {
// 		method: "POST",
// 		headers: {
// 			registrationnum: registrationnum,
// 		},
//     });
    
//     const res = await response.json();
//     document.getElementById('delStudentConfirm').innerText = 'Deleted Successfully!';
// };
const updateDelStud = async (registrationnum) => {
    const response = await fetch("http://localhost:3000/api/del/student", {
        method: "POST",
        headers: {
            registrationnum: registrationnum,
        },
    });

    if (response.status === 404) {
        // Student not found
        alert("Student not found");
    } else if (response.ok) {
        // Student deleted successfully
        document.getElementById('delStudentConfirm').innerText = 'Deleted Successfully!';
    } else {
        // Other errors
        alert("An error occurred while deleting the student");
    }
};

