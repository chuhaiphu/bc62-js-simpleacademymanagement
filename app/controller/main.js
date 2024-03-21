document.querySelectorAll(".nav-link").forEach(button => {
    button.addEventListener("click", function() {
        renderButtonAdd(this.id);
    });
});

function renderButtonAdd(type){
    let content = document.getElementById("addBtn");
    if (type === "customer-tab"){
        content.innerHTML =
            `<button id="btnThemCustomer" type="button" class="btn btn-warning mb-3 text-white" data-toggle="modal" data-target="#exampleModal">
                Add Customer
            </button>`
    }
    if (type === "employee-tab"){
        content.innerHTML =
            `<button id="btnThemEmployee" type="button" class="btn btn-warning mb-3 text-white" data-toggle="modal" data-target="#exampleModal">
                Add Employee
            </button>`
    }
    if (type === "student-tab"){
        content.innerHTML =
            `<button id="btnThemStudent" type="button" class="btn btn-warning mb-3 text-white" data-toggle="modal" data-target="#exampleModal">
                Add Student
            </button>`
    }
}