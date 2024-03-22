import Customer from "../model/customer.js";
import PersonService from "../service/personService.js";
import CustomerValidation from '../config/validation.js';
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
        onclick="resetForm()"
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
        onclick="resetForm()"
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
        onclick="resetForm()"
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
    })
    
    // Append the generated HTML to the table body
    document.querySelector('#customerTableContent tbody').innerHTML = customersHTML;
};

window.onload = function() {
    renderCustomers();
};

const customerValidator = new CustomerValidation();
let submitValidation = true;
let email = document.getElementById('email');
let code = document.getElementById('code');
let hoTen = document.getElementById('hoTen');
let diaChi = document.getElementById('diaChi');
let tenCongTy = document.getElementById('tenCongTy');
let triGiaHoaDon = document.getElementById('triGiaHoaDon');

email.oninput = function () {
    submitValidation &= customerValidator.validateEmail();
}
code.oninput = function () {
    submitValidation &= customerValidator.validateCustomerCode();
}
hoTen.oninput = function () {
    submitValidation &= customerValidator.validateHoTen();
}
diaChi.oninput = function () {
    submitValidation &= customerValidator.validateDiaChi();
}
tenCongTy.oninput = function () {
    submitValidation &= customerValidator.validateTenCongTy();
}
triGiaHoaDon.oninput = function () {
    submitValidation &= customerValidator.validateTriGiaHoaDon();
}

window.updateCustomerInfo = (customerCode) => {
    const customer = personService.listPersons.find(customer => customer.code === customerCode);
    if (customer) {
        document.getElementById("btnUpdate").style.display = "inline-block";
        document.getElementById("btnAdd").style.display = "none";

        document.getElementById('code').value = customer.code;
        document.getElementById('code').disabled = true;
        document.getElementById('email').value = customer.email;
        document.getElementById('hoTen').value = customer.hoTen;
        document.getElementById('tenCongTy').value = customer.tenCongTy;
        document.getElementById('diaChi').value = customer.diaChi;
        document.getElementById('triGiaHoaDon').value = customer.triGiaHoaDon;
    }
};

window.deleteCustomer = async (customerCode) => {
    let promptMsg = await CustomAlert.alertDelete(
        `This phone will be deleted, you can't undo this action`
    );
    if (promptMsg.isConfirmed){
        personService.deletePersonByCode(customerCode);
        renderCustomers();
        CustomAlert.alertSuccess(`Customer deleted successfully!`);
    }
};

document.getElementById("btnAdd").addEventListener('click', function(event) {
    event.preventDefault(); // Prevent form submission if needed
    submitValidation = customerValidator.initialValidation();
    console.log(submitValidation);
    if (!submitValidation) return;
    // Get form values
    const form = document.getElementById('customerForm');
    const code = form.elements.code.value;
    if (personService.listPersons.find(customer => customer.code === code)) {
        document.getElementById("invalid-code").innerHTML = "Mã khách hàng đã tồn tại";
        document.getElementById("invalid-code").style.display = 'block';
        return;
    }
    const email = form.elements.email.value;
    const hoTen = form.elements.hoTen.value;
    const diaChi = form.elements.diaChi.value;
    const tenCongTy = form.elements.tenCongTy.value;
    const triGiaHoaDon = form.elements.triGiaHoaDon.value;
    const danhGia = form.elements.danhGia.value;

    // * Create new customer
    const newCustomer = new Customer(code, email, hoTen, diaChi, tenCongTy, triGiaHoaDon, danhGia);
    personService.addPerson(newCustomer);
    CustomAlert.alertSuccess(`Customer added successfully!`);
    renderCustomers();
});

document.getElementById("btnUpdate").addEventListener('click', function(event) {
    event.preventDefault(); // Prevent form submission if needed
    submitValidation = customerValidator.initialValidation();
    console.log(submitValidation);
    if (!submitValidation) return;
    const form = document.getElementById('customerForm');
    const code = form.elements.code.value;
    const email = form.elements.email.value;
    const hoTen = form.elements.hoTen.value;
    const diaChi = form.elements.diaChi.value;
    const tenCongTy = form.elements.tenCongTy.value;
    const triGiaHoaDon = form.elements.triGiaHoaDon.value;
    const danhGia = form.elements.danhGia.value;

    // * Update existed Customer base on new Customer Info
    const newCustomerInfo = new Customer(code, email, hoTen, diaChi, tenCongTy, triGiaHoaDon, danhGia);
    personService.updatePerson(code, newCustomerInfo);
    CustomAlert.alertSuccess(`Customer updated successfully!`);
    renderCustomers();
});

window.resetForm = () => {
    document.getElementById("btnAdd").style.display = "inline-block";
    document.getElementById("btnUpdate").style.display = "none";
    document.getElementById('code').value = "";
    document.getElementById('code').disabled = false;
    document.getElementById('email').value = "";
    document.getElementById('hoTen').value = "";
    document.getElementById('tenCongTy').value = "";
    document.getElementById('diaChi').value = "";
}
