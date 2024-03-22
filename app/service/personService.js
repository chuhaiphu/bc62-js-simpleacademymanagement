import Employee from "../model/employee.js";
import Customer from "../model/customer.js";
import Student from "../model/student.js";
import Person from "../model/person.js";

export default class personService {
    constructor() {
        this.listPersons = [];
        this.loadPersonsFromLocalStorage();
    }

    addPerson(person) {
        this.listPersons.push(person);
        this.savePersonsToLocalStorage();
    }

    deletePersonByCode(_code) {
        this.listPersons = this.listPersons.filter(person => person.code !== _code);
        this.savePersonsToLocalStorage();
    }

    updatePerson(_code, newPersonInfo) {
        let foundIndex = this.listPersons.findIndex(person => person.code === _code);
        if (foundIndex !== -1) {
            this.listPersons[foundIndex] = { ...this.listPersons[foundIndex], ...newPersonInfo };
            this.savePersonsToLocalStorage();
        }
    }

    sortPersons() {
        this.listPersons.sort((a, b) => a.name.localeCompare(b.name));
        this.savePersonsToLocalStorage();
    }

    filterPersons(type) {
        this.loadPersonsFromLocalStorage();
        return this.listPersons.filter(person => person.constructor.name === type.name);
    }

    savePersonsToLocalStorage() {
        localStorage.setItem('listPersons', JSON.stringify(this.listPersons));
    }

    loadPersonsFromLocalStorage() {
        const storedPersons = localStorage.getItem('listPersons');
        if (storedPersons) {
            const parsedPersons = JSON.parse(storedPersons);
            this.listPersons = parsedPersons.map(personData => {
                switch (personData.type) {
                    case 'customer':
                        return new Customer(
                            personData.code,
                            personData.email,
                            personData.hoTen,
                            personData.diaChi,
                            personData.tenCongTy,
                            personData.triGiaHoaDon,
                            personData.danhGia
                        );
                    case 'employee':
                        return new Employee(
                            personData.hoTen,
                            personData.diaChi,
                            personData.code,
                            personData.email,
                            personData.soNgayLamViec,
                            personData.luongTheoNgay
                        );
                    case 'student':
                        return new Student(
                            personData.hoTen,
                            personData.diaChi,
                            personData.code,
                            personData.email,
                            personData.diemToan,
                            personData.diemLy,
                            personData.diemHoa
                        );
                    default:
                        return new Person(
                            personData.hoTen,
                            personData.diaChi,
                            personData.code,
                            personData.email
                        );
                }
            });
        }
    }
}
