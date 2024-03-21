import person from "../model/person.js";

export default class employee extends person{
    constructor(_hoTen, _diaChi, _code, _email, _soNgayLamViec, _luongTheoNgay) {
        super(_hoTen, _diaChi, _code, _email);
        this.soNgayLamViec = _soNgayLamViec;
        this.luongTheoNgay = _luongTheoNgay;
    }

    calculateSalary() {
        return this.soNgayLamViec * this.luongTheoNgay;
    }
}