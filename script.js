// Array to store student objects
let students = JSON.parse(localStorage.getItem("students")) || [];

// Select DOM elements
const studentName = document.getElementById("studentName");
const studentGrade = document.getElementById("studentGrade");
const addBtn = document.getElementById("addBtn");
const studentList = document.getElementById("studentList");
const averageGrade = document.getElementById("averageGrade");
const errorMessage = document.getElementById("errorMessage");

// Display students when page loads
displayStudents();

// Add Student Event
addBtn.addEventListener("click", function () {
  const name = studentName.value.trim();
  const gradeValue = studentGrade.value.trim();
  const grade = Number(gradeValue);

  // Validation
  if (name === "") {
    showError("Student name cannot be empty.");
    studentName.focus();
    return;
  }

  if (gradeValue === "" || isNaN(grade) || grade < 0 || grade > 100) {
    showError("Grade must be a number between 0 and 100.");
    studentGrade.focus();
    return;
  }

  // Clear error
  errorMessage.textContent = "";

  // Create student object
  const student = {
    id: Date.now(),
    name: name,
    grade: grade
  };

  // Add student to array
  students.push(student);

  // Save to localStorage
  saveToLocalStorage();

  // Update UI
  displayStudents();

  // Clear input fields
  studentName.value = "";
  studentGrade.value = "";
});

// Function to display students
function displayStudents() {
  studentList.innerHTML = "";

  const average = calculateAverage();

  students.forEach(function(student) {

    const row = document.createElement("tr");

    // Highlight above-average students
    if (student.grade > average) {
      row.classList.add("above-average");
    }

    row.innerHTML = `
      <td>${student.name}</td>
      <td>${student.grade}</td>
      <td>
        <button class="delete-btn" onclick="deleteStudent(${student.id})">
          Delete
        </button>
      </td>
    `;

    studentList.appendChild(row);
  });

  averageGrade.textContent =
    `Average Grade: ${average.toFixed(2)}`;
}

// Function to calculate average grade
function calculateAverage() {

  if (students.length === 0) {
    return 0;
  }

  let total = 0;

  students.forEach(function(student) {
    total += student.grade;
  });

  return total / students.length;
}

// Function to delete student
function deleteStudent(id) {

  students = students.filter(function(student) {
    return student.id !== id;
  });

  // Save updated data
  saveToLocalStorage();

  // Refresh UI
  displayStudents();
}

// Function to save data
function saveToLocalStorage() {
  localStorage.setItem("students", JSON.stringify(students));
}

// Function to show error
function showError(message) {
  errorMessage.textContent = message;
  alert(message);
}