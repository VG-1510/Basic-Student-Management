class Student {
    constructor(id, name, age, gender, rollNo) {
        this.id = id;
        this.name = name;
        this.age = age;
        this.gender = gender;
        this.rollNo = rollNo;
    }
}

class StudentManagement {
    constructor() {
        this.allStudents = [];
    }

    addStudent(student) {
        this.allStudents.push(student);
    }

    deleteStudent(id) {
        this.allStudents = this.allStudents.filter(student => student.id !== id);
    }

    getStudent(id) {
        return this.allStudents.find(student => student.id === id);
    }

    updateStudent(id, updatedStudent) {
        const index = this.allStudents.findIndex(student => student.id === id);
        if (index !== -1) {
            this.allStudents[index] = updatedStudent;
        }
    }

    getAllStudents() {
        return this.allStudents;
    }
}

const studentManagement = new StudentManagement();
let editMode = false;
let currentEditId = null;
let idCounter = 1;

document.getElementById('submitBtn').addEventListener('click', () => {
    const name = document.getElementById('sName').value;
    const age = document.getElementById('sAge').value;
    const gender = document.getElementById('sGender').value;
    const rollNo = document.getElementById('sRoll').value;

    if (editMode) {
        const updatedStudent = new Student(currentEditId, name, age, gender, rollNo);
        studentManagement.updateStudent(currentEditId, updatedStudent);
        editMode = false;
        currentEditId = null;
    } else {
        const newStudent = new Student(idCounter++, name, age, gender, rollNo);
        studentManagement.addStudent(newStudent);
    }

    displayStudents();
    clearForm();
});

document.getElementById('searchBtn').addEventListener('click', () => {
    const name = document.getElementById('sName').value;
    const student = studentManagement.getAllStudents().find(student => student.name.toLowerCase() === name.toLowerCase());
    if (student) {
        alert(`Student found: ${student.name}, ${student.age}, ${student.gender}, ${student.rollNo}`);
    } else {
        alert(`Student with name ${name} not found`);
    }
});

function displayStudents() {
    const studentTableBody = document.getElementById('studentTable').querySelector('tbody');
    studentTableBody.innerHTML = '';

    studentManagement.getAllStudents().forEach(student => {
        const row = document.createElement('tr');
        row.innerHTML = `
            <td>${student.name}</td>
            <td>${student.age}</td>
            <td>${student.gender}</td>
            <td>${student.rollNo}</td>
            <td>
                <button onclick="editStudent(${student.id})">Edit</button>
                <button onclick="deleteStudent(${student.id})">Delete</button>
            </td>
        `;
        studentTableBody.appendChild(row);
    });
}

function editStudent(id) {
    const student = studentManagement.getStudent(id);
    document.getElementById('sName').value = student.name;
    document.getElementById('sAge').value = student.age;
    document.getElementById('sGender').value = student.gender;
    document.getElementById('sRoll').value = student.rollNo;

    editMode = true;
    currentEditId = id;
}

function deleteStudent(id) {
    studentManagement.deleteStudent(id);
    displayStudents();
}

function clearForm() {
    document.getElementById('sName').value = '';
    document.getElementById('sAge').value = '';
    document.getElementById('sGender').value = '';
    document.getElementById('sRoll').value = '';
}

// Initial display
displayStudents();
