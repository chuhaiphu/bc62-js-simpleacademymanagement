import PersonService from "../service/personService.js";
import Customer from "../model/customer.js";
import Employee from "../model/employee.js";
import Student from "../model/student.js";
import { CustomerValidation, EmployeeValidation, StudentValidation } from '../config/validation.js';
import CustomAlert from '../utils/alert.js';



document.querySelectorAll(".nav-link").forEach(button => {
    button.addEventListener("click", () => {
        renderButtonAdd(button.id);
    });
});


const renderButtonAdd = (type) => {
    const content = document.getElementById("addBtn");

    if (type === "customer-tab") {
        content.innerHTML = `
        <button 
        id="btnThemCustomer" 
        type="button" 
        onclick="resetCustomerForm()"
        class="btn btn-warning btn-hover mb-3 text-white d-flex align-items-center" 
        data-bs-toggle="modal" 
        data-bs-target="#addCustomerModal"
        >
            <i class="fas fa-plus me-2"></i>
            ADD CUSTOMER
        </button>
    
        `;
    }

    if (type === "employee-tab") {
        content.innerHTML = `
        <button 
        id="btnThemEmployee" 
        type="button"
        onclick="resetEmployeeForm()"
        class="btn btn-warning btn-hover mb-3 text-white d-flex align-items-center" 
        data-bs-toggle="modal" 
        data-bs-target="#addEmployeeModal"
        >
            <i class="fas fa-plus me-2"></i>
            ADD EMPLOYEE
        </button>
        `;
    }

    if (type === "student-tab") {
        content.innerHTML = `
        <button 
        id="btnThemStudent" 
        type="button" 
        onclick="resetStudentForm()"
        class="btn btn-warning btn-hover mb-3 text-white d-flex align-items-center" 
        data-bs-toggle="modal" 
        data-bs-target="#addStudentModal"
        >
            <i class="fas fa-plus me-2"></i>
            ADD STUDENT
        </button>
        `;
    }
}

const personService = new PersonService();

// !! CUSTOMER MANAGEMENT
const renderCustomers = () => {
    const customers = personService.filterPersons(Customer);
    const customersHTML = customers.map((customer) => {
        return `
        <tr>
            <td>${customer.code}</td>
            <td>${customer.email}</td>
            <td>${customer.hoTen}</td>
            <td>${customer.diaChi}</td>
            <td>${customer.tenCongTy}</td>
            <td>${customer.triGiaHoaDon}</td>
            <td>${customer.danhGia}</td>
            <td class="d-flex">
                <div>
                    <button class="btn btn-primary" data-bs-toggle="modal" data-bs-target="#addCustomerModal" onclick="updateCustomerInfo('${customer.code}')">
                        <i class="fa fa-wrench"></i>
                    </button>
                </div>
                <div><button class="btn btn-danger ms-2" onclick="deleteCustomer('${customer.code}')"><i class="fa fa-trash"></i></button></div>
            </td>
        </tr>
        `;
    }).join('');
    
    // Append the generated HTML to the table body
    document.querySelector('#customerTableContent tbody').innerHTML = customersHTML;
};

window.onload = function() {
    renderCustomers();
};

const customerValidator = new CustomerValidation();
let submitValidation = true;
let customerEmail = document.getElementById('customer-email');
let customerCode = document.getElementById('customer-code');
let customerHoTen = document.getElementById('customer-hoTen');
let customerDiaChi = document.getElementById('customer-diaChi');
let customerTenCongTy = document.getElementById('customer-tenCongTy');
let customerTriGiaHoaDon = document.getElementById('customer-triGiaHoaDon');

customerEmail.oninput = function () {
    submitValidation &= customerValidator.validateEmail();
}
customerCode.oninput = function () {
    submitValidation &= customerValidator.validateCustomerCode();
}
customerHoTen.oninput = function () {
    submitValidation &= customerValidator.validateHoTen();
}
customerDiaChi.oninput = function () {
    submitValidation &= customerValidator.validateDiaChi();
}
customerTenCongTy.oninput = function () {
    submitValidation &= customerValidator.validateTenCongTy();
}
customerTriGiaHoaDon.oninput = function () {
    submitValidation &= customerValidator.validateTriGiaHoaDon();
}

window.updateCustomerInfo = (customerCode) => {
    const customer = personService.listPersons.find(customer => customer.code === customerCode);
    if (customer) {
        document.getElementById("btnUpdateCustomer").style.display = "inline-block";
        document.getElementById("btnAddCustomer").style.display = "none";

        document.getElementById('customer-code').value = customer.code;
        document.getElementById('customer-code').disabled = true;
        document.getElementById('customer-email').value = customer.email;
        document.getElementById('customer-hoTen').value = customer.hoTen;
        document.getElementById('customer-tenCongTy').value = customer.tenCongTy;
        document.getElementById('customer-diaChi').value = customer.diaChi;
        document.getElementById('customer-triGiaHoaDon').value = customer.triGiaHoaDon;
    }
    document.querySelectorAll('#addCustomerModal .invalid-msg').forEach(msg => {
        msg.style.display = 'none';
    });
};

window.deleteCustomer = async (customerCode) => {
    let promptMsg = await CustomAlert.alertDelete(
        `This customer will be deleted, you can't undo this action`
    );
    if (promptMsg.isConfirmed){
        personService.deletePersonByCode(customerCode);
        renderCustomers();
        CustomAlert.alertSuccess(`Customer deleted successfully!`);
    }
};

document.getElementById("btnAddCustomer").addEventListener('click', function(event) {
    event.preventDefault(); // Prevent form submission if needed
    submitValidation = customerValidator.initialValidation();
    console.log(submitValidation);
    if (!submitValidation) return;
    // Get form values
    const form = document.getElementById('customerForm');
    const code = form.elements['customer-code'].value;
    if (personService.listPersons.find(customer => customer.code === code)) {
        document.getElementById("invalid-customer-code").innerHTML = "Mã người này đã tồn tại";
        document.getElementById("invalid-customer-code").style.display = 'block';
        return;
    }
    const email = form.elements['customer-email'].value;
    const hoTen = form.elements['customer-hoTen'].value;
    const diaChi = form.elements['customer-diaChi'].value;
    const tenCongTy = form.elements['customer-tenCongTy'].value;
    const triGiaHoaDon = form.elements['customer-triGiaHoaDon'].value;
    const danhGia = document.querySelector('#customer-danhGia input[name="danhGia"]:checked').value;

    // * Create new customer
    const newCustomer = new Customer(code, email, hoTen, diaChi, tenCongTy, triGiaHoaDon, danhGia);
    personService.addPerson(newCustomer);
    CustomAlert.alertSuccess(`Customer added successfully!`);
    const customerModal = document.getElementById('addCustomerModal');
    const modal = bootstrap.Modal.getInstance(customerModal);
    modal.hide();
    renderCustomers();
});

document.getElementById("btnUpdateCustomer").addEventListener('click', function(event) {
    event.preventDefault(); // Prevent form submission if needed
    submitValidation = customerValidator.initialValidation();
    console.log(submitValidation);
    if (!submitValidation) return;
    const form = document.getElementById('customerForm');
    const code = form.elements['customer-code'].value;
    const email = form.elements['customer-email'].value;
    const hoTen = form.elements['customer-hoTen'].value;
    const diaChi = form.elements['customer-diaChi'].value;
    const tenCongTy = form.elements['customer-tenCongTy'].value;
    const triGiaHoaDon = form.elements['customer-triGiaHoaDon'].value;
    const danhGia = document.querySelector('#customer-danhGia input[name="danhGia"]:checked').value;

    // * Update existed Customer base on new Customer Info
    const newCustomerInfo = new Customer(code, email, hoTen, diaChi, tenCongTy, triGiaHoaDon, danhGia);
    personService.updatePerson(code, newCustomerInfo);
    CustomAlert.alertSuccess(`Customer updated successfully!`);
    const customerModal = document.getElementById('addCustomerModal');
    const modal = bootstrap.Modal.getInstance(customerModal);
    modal.hide();
    renderCustomers();
});

window.resetCustomerForm = () => {
    document.getElementById("btnAddCustomer").style.display = "inline-block";
    document.getElementById("btnUpdateCustomer").style.display = "none";
    document.getElementById('customer-code').value = "";
    document.getElementById('customer-code').disabled = false;
    document.getElementById('customer-email').value = "";
    document.getElementById('customer-hoTen').value = "";
    document.getElementById('customer-tenCongTy').value = "";
    document.getElementById('customer-diaChi').value = "";
    document.getElementById('customer-triGiaHoaDon').value = "";
}


// !! EMPLOYEE MANAGEMENT
const renderEmployees = () => {
    const employees = personService.filterPersons(Employee);
    const employeesHTML = employees.map((employee) => {
        return `
        <tr>
            <td>${employee.code}</td>
            <td>${employee.email}</td>
            <td>${employee.hoTen}</td>
            <td>${employee.diaChi}</td>
            <td>${employee.calculateSalary()}</td>
            <td class="d-flex">
                <div>
                    <button class="btn btn-primary" data-bs-toggle="modal" data-bs-target="#addEmployeeModal" onclick="updateEmployeeInfo('${employee.code}')">
                        <i class="fa fa-wrench"></i>
                    </button>
                </div>
                <div><button class="btn btn-danger ms-2" onclick="deleteEmployee('${employee.code}')"><i class="fa fa-trash"></i></button></div>
            </td>
        </tr>
        `;
    }).join('');
    
    // Append the generated HTML to the table body
    document.querySelector('#employeeTableContent tbody').innerHTML = employeesHTML;
};

document.getElementById("employee-tab").addEventListener('click', function(event) {
    renderEmployees();
});

const employeeValidator = new EmployeeValidation();
let employeeSubmitValidation = true;
let employeeEmail = document.getElementById('employee-email');
let employeeCode = document.getElementById('employee-code');
let employeeHoTen = document.getElementById('employee-hoTen');
let employeeDiaChi = document.getElementById('employee-diaChi');
let employeeLuongTheoNgay = document.getElementById('employee-luongTheoNgay');
let employeeSoNgayLamViec = document.getElementById('employee-soNgayLamViec');

employeeEmail.oninput = function () {
    employeeSubmitValidation &= employeeValidator.validateEmail();
}
employeeCode.oninput = function () {
    employeeSubmitValidation &= employeeValidator.validateEmployeeCode();
}
employeeHoTen.oninput = function () {
    employeeSubmitValidation &= employeeValidator.validateHoTen();
}
employeeDiaChi.oninput = function () {
    employeeSubmitValidation &= employeeValidator.validateDiaChi();
}
employeeLuongTheoNgay.oninput = function () {
    employeeSubmitValidation &= employeeValidator.validateLuongTheoNgay();
}
employeeSoNgayLamViec.oninput = function () {
    employeeSubmitValidation &= employeeValidator.validateSoNgayLamViec();
}

window.updateEmployeeInfo = (employeeCode) => {
    const employee = personService.listPersons.find(employee => employee.code === employeeCode);
    if (employee) {
        document.getElementById("btnUpdateEmployee").style.display = "inline-block";
        document.getElementById("btnAddEmployee").style.display = "none";

        document.getElementById('employee-code').value = employee.code;
        document.getElementById('employee-code').disabled = true;
        document.getElementById('employee-email').value = employee.email;
        document.getElementById('employee-hoTen').value = employee.hoTen;
        document.getElementById('employee-diaChi').value = employee.diaChi;
        document.getElementById('employee-luongTheoNgay').value = employee.luongTheoNgay;
        document.getElementById('employee-soNgayLamViec').value = employee.soNgayLamViec;
    }
    document.querySelectorAll('#addEmployeeModal .invalid-msg').forEach(msg => {
        msg.style.display = 'none';
    });
};

window.deleteEmployee = async (employeeCode) => {
    let promptMsg = await CustomAlert.alertDelete(
        `This employee will be deleted, you can't undo this action`
    );
    if (promptMsg.isConfirmed){
        personService.deletePersonByCode(employeeCode);
        renderEmployees();
        CustomAlert.alertSuccess(`Employee deleted successfully!`);
    }
};

document.getElementById("btnAddEmployee").addEventListener('click', function(event) {
    event.preventDefault(); // Prevent form submission if needed
    employeeSubmitValidation = employeeValidator.initialValidation();
    console.log(employeeSubmitValidation);
    if (!employeeSubmitValidation) return;
    // Get form values
    const form = document.getElementById('employeeForm');
    const code = form.elements['employee-code'].value;
    if (personService.listPersons.find(employee => employee.code === code)) {
        document.getElementById("invalid-employee-code").innerHTML = "Mã người này đã tồn tại";
        document.getElementById("invalid-employee-code").style.display = 'block';
        return;
    }
    const email = form.elements['employee-email'].value;
    const hoTen = form.elements['employee-hoTen'].value;
    const diaChi = form.elements['employee-diaChi'].value;
    const luongTheoNgay = form.elements['employee-luongTheoNgay'].value;
    const soNgayLamViec = form.elements['employee-soNgayLamViec'].value;

    // * Create new customer
    const newEmployee = new Employee(code, email, hoTen, diaChi, soNgayLamViec, luongTheoNgay);
    personService.addPerson(newEmployee);
    CustomAlert.alertSuccess(`Employee added successfully!`);
    const employeeModal = document.getElementById('addEmployeeModal');
    const modal = bootstrap.Modal.getInstance(employeeModal);
    modal.hide();
    renderEmployees();
});

document.getElementById("btnUpdateEmployee").addEventListener('click', function(event) {
    event.preventDefault(); // Prevent form submission if needed
    submitValidation = employeeValidator.initialValidation();
    console.log(submitValidation);
    if (!submitValidation) return;
    const form = document.getElementById('employeeForm');
    const code = form.elements['employee-code'].value;
    const email = form.elements['employee-email'].value;
    const hoTen = form.elements['employee-hoTen'].value;
    const diaChi = form.elements['employee-diaChi'].value;
    const luongTheoNgay = form.elements['employee-luongTheoNgay'].value;
    const soNgayLamViec = form.elements['employee-soNgayLamViec'].value;

    // * Update existed Customer base on new Customer Info
    const newEmployeeInfo = new Employee(code, email, hoTen, diaChi, soNgayLamViec, luongTheoNgay);
    personService.updatePerson(code, newEmployeeInfo);
    CustomAlert.alertSuccess(`Employee updated successfully!`);
    const employeeModal = document.getElementById('addEmployeeModal');
    const modal = bootstrap.Modal.getInstance(employeeModal);
    modal.hide();
    renderEmployees();
});

window.resetEmployeeForm = () => {
    document.getElementById("btnAddEmployee").style.display = "inline-block";
    document.getElementById("btnUpdateEmployee").style.display = "none";
    document.getElementById('employee-code').value = "";
    document.getElementById('employee-code').disabled = false;
    document.getElementById('employee-email').value = "";
    document.getElementById('employee-hoTen').value = "";
    document.getElementById('employee-diaChi').value = "";
    document.getElementById('employee-luongTheoNgay').value = "";
    document.getElementById('employee-soNgayLamViec').value = "";
}


// !! STUDENT MANAGEMENT
const renderStudents = () => {
    const students = personService.filterPersons(Student);
    const studentsHTML = students.map((student) => {
        return `
        <tr>
            <td>${student.code}</td>
            <td>${student.email}</td>
            <td>${student.hoTen}</td>
            <td>${student.diaChi}</td>
            <td>${student.calculateDiemTrungBinh()}</td>
            <td class="d-flex">
                <div>
                    <button class="btn btn-primary" data-bs-toggle="modal" data-bs-target="#addStudentModal" onclick="updateStudentInfo('${student.code}')">
                        <i class="fa fa-wrench"></i>
                    </button>
                </div>
                <div><button class="btn btn-danger ms-2" onclick="deleteStudent('${student.code}')"><i class="fa fa-trash"></i></button></div>
            </td>
        </tr>
        `;
    }).join('');
    
    // Append the generated HTML to the table body
    document.querySelector('#studentTableContent tbody').innerHTML = studentsHTML;
};

document.getElementById("student-tab").addEventListener('click', function(event) {
    renderStudents();
});

const studentValidator = new StudentValidation();
let studentSubmitValidation = true;
let studentEmail = document.getElementById('student-email');
let studentCode = document.getElementById('student-code');
let studentHoTen = document.getElementById('student-hoTen');
let studentDiaChi = document.getElementById('student-diaChi');
let studentDiemToan = document.getElementById('student-diemToan');
let studentDiemLy = document.getElementById('student-diemLy');
let studentDiemHoa = document.getElementById('student-diemHoa');

studentEmail.oninput = function () {
    studentSubmitValidation &= studentValidator.validateEmail();
}
studentCode.oninput = function () {
    studentSubmitValidation &= studentValidator.validateStudentCode();
}
studentHoTen.oninput = function () {
    studentSubmitValidation &= studentValidator.validateHoTen();
}
studentDiaChi.oninput = function () {
    studentSubmitValidation &= studentValidator.validateDiaChi();
}
studentDiemToan.oninput = function () {
    studentSubmitValidation &= studentValidator.validateDiemToan();
}
studentDiemLy.oninput = function () {
    studentSubmitValidation &= studentValidator.validateDiemLy();
}
studentDiemHoa.oninput = function () {
    studentSubmitValidation &= studentValidator.validateDiemHoa();
}

window.updateStudentInfo = (studentCode) => {
    const student = personService.listPersons.find(student => student.code === studentCode);
    if (student) {
        document.getElementById("btnUpdateStudent").style.display = "inline-block";
        document.getElementById("btnAddStudent").style.display = "none";

        document.getElementById('student-code').value = student.code;
        document.getElementById('student-code').disabled = true;
        document.getElementById('student-email').value = student.email;
        document.getElementById('student-hoTen').value = student.hoTen;
        document.getElementById('student-diaChi').value = student.diaChi;
        document.getElementById('student-diemToan').value = student.diemToan;
        document.getElementById('student-diemLy').value = student.diemLy;
        document.getElementById('student-diemHoa').value = student.diemHoa;
    }

    document.querySelectorAll('#addStudentModal .invalid-msg').forEach(msg => {
        msg.style.display = 'none';
    });
};

window.deleteStudent = async (studentCode) => {
    let promptMsg = await CustomAlert.alertDelete(
        `This student will be deleted, you can't undo this action`
    );
    if (promptMsg.isConfirmed){
        personService.deletePersonByCode(studentCode);
        renderStudents();
        CustomAlert.alertSuccess(`Student deleted successfully!`);
    }
};

document.getElementById("btnAddStudent").addEventListener('click', function(event) {
    event.preventDefault(); // Prevent form submission if needed
    studentSubmitValidation = studentValidator.initialValidation();
    console.log(studentSubmitValidation);
    if (!studentSubmitValidation) return;
    // Get form values
    const form = document.getElementById('studentForm');
    const code = form.elements['student-code'].value;
    if (personService.listPersons.find(student => student.code === code)) {
        document.getElementById("invalid-student-code").innerHTML = "Mã người này đã tồn tại";
        document.getElementById("invalid-student-code").style.display = 'block';
        return;
    }
    const email = form.elements['student-email'].value;
    const hoTen = form.elements['student-hoTen'].value;
    const diaChi = form.elements['student-diaChi'].value;
    const diemToan = form.elements['student-diemToan'].value;
    const diemLy = form.elements['student-diemLy'].value;
    const diemHoa = form.elements['student-diemHoa'].value;

    // * Create new customer
    const newStudent = new Student(code, email, hoTen, diaChi, diemToan, diemLy, diemHoa);
    personService.addPerson(newStudent);
    CustomAlert.alertSuccess(`Student added successfully!`);
    const studentModal = document.getElementById('addStudentModal');
    const modal = bootstrap.Modal.getInstance(studentModal);
    modal.hide();
    renderStudents();
});

document.getElementById("btnUpdateStudent").addEventListener('click', function(event) {
    event.preventDefault(); // Prevent form submission if needed
    submitValidation = studentValidator.initialValidation();
    console.log(submitValidation);
    if (!submitValidation) return;
    const form = document.getElementById('studentForm');
    const code = form.elements['student-code'].value;
    const email = form.elements['student-email'].value;
    const hoTen = form.elements['student-hoTen'].value;
    const diaChi = form.elements['student-diaChi'].value;
    const diemToan = form.elements['student-diemToan'].value;
    const diemLy = form.elements['student-diemLy'].value;
    const diemHoa = form.elements['student-diemHoa'].value;

    // * Update existed Customer base on new Customer Info
    const newStudentInfo = new Student(code, email, hoTen, diaChi, diemToan, diemLy, diemHoa);
    personService.updatePerson(code, newStudentInfo);
    CustomAlert.alertSuccess(`Student updated successfully!`);
    const studentModal = document.getElementById('addStudentModal');
    const modal = bootstrap.Modal.getInstance(studentModal);
    modal.hide();
    renderStudents();
});

window.resetStudentForm = () => {
    document.getElementById("btnAddStudent").style.display = "inline-block";
    document.getElementById("btnUpdateStudent").style.display = "none";
    document.getElementById('student-code').value = "";
    document.getElementById('student-code').disabled = false;
    document.getElementById('student-email').value = "";
    document.getElementById('student-hoTen').value = "";
    document.getElementById('student-diaChi').value = "";
    document.getElementById('student-diemToan').value = "";
    document.getElementById('student-diemLy').value = "";
    document.getElementById('student-diemHoa').value = "";
}