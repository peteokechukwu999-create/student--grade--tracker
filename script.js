// ARRAY TO STORE STUDENTS
let students = [];

// SELECT HTML ELEMENTS
const studentName = document.getElementById("studentName");
const studentGrade = document.getElementById("studentGrade");
const addBtn = document.getElementById("addBtn");
const clearBtn = document.getElementById("clearBtn");
const studentList = document.getElementById("studentList");
const averageGrade = document.getElementById("averageGrade");
const errorMessage = document.getElementById("errorMessage");

// LOAD LOCAL STORAGE
window.onload = function () {

    const savedStudents = localStorage.getItem("students");

    if (savedStudents) {
        students = JSON.parse(savedStudents);
        displayStudents();
        calculateAverage();
    }
};

// ADD BUTTON EVENT
addBtn.addEventListener("click", function () {

    const name = studentName.value.trim();
    const gradeValue = studentGrade.value.trim();
    const grade = Number(gradeValue);

    // VALIDATION
    if (name === "") {
        showError("Student name cannot be empty.");
        return;
    }

    if (gradeValue === "" || isNaN(grade) || grade < 0 || grade > 100) {
        showError("Grade must be a number between 0 and 100.");
        return;
    }

    clearError();

    // CREATE STUDENT OBJECT
    const student = {
        id: Date.now(),
        name: name,
        grade: grade
    };

    // ADD TO ARRAY
    students.push(student);

    // SAVE TO LOCAL STORAGE
    saveToLocalStorage();

    // DISPLAY STUDENTS
    displayStudents();

    // CALCULATE AVERAGE
    calculateAverage();

    // CLEAR INPUTS
    studentName.value = "";
    studentGrade.value = "";
});

function showError(message) {
    errorMessage.textContent = message;
}

function clearError() {
    errorMessage.textContent = "";
}

clearBtn.addEventListener("click", function () {
    if (students.length === 0) {
        return;
    }

    if (!confirm("Are you sure you want to clear all students?")) {
        return;
    }

    students = [];
    saveToLocalStorage();
    displayStudents();
    calculateAverage();
});

// DISPLAY STUDENTS FUNCTION
function displayStudents() {

    studentList.innerHTML = "";

    const average = getAverage();

    students.forEach(function(student) {

        const row = document.createElement("tr");

        // BONUS FEATURE
        if (student.grade > average) {
            row.classList.add("above-average");
        }

        row.innerHTML = `
            <td>${student.id}</td>
            <td>${student.name}</td>
            <td>${student.grade}</td>
            <td>${getLetterGrade(student.grade)}</td>
            <td>
                <button onclick="deleteStudent(${student.id})">
                    Delete
                </button>
            </td>
        `;

        studentList.appendChild(row);
    });

    clearBtn.disabled = students.length === 0;
}

// DELETE STUDENT FUNCTION
function deleteStudent(id) {

    students = students.filter(function(student) {
        return student.id !== id;
    });

    saveToLocalStorage();

    displayStudents();

    calculateAverage();
}

// CALCULATE AVERAGE FUNCTION
function calculateAverage() {

    const average = getAverage();

    averageGrade.textContent =
    `Average Grade: ${average.toFixed(2)}`;
}

// GET AVERAGE FUNCTION
function getAverage() {

    if (students.length === 0) {
        return 0;
    }

    let total = 0;

    students.forEach(function(student) {
        total += student.grade;
    });

    return total / students.length;
}

// SAVE TO LOCAL STORAGE
function saveToLocalStorage() {

    localStorage.setItem(
        "students",
        JSON.stringify(students)
    );
}