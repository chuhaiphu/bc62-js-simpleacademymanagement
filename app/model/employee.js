import person from "../model/person.js";

export default class employee extends person{
    constructor(_code, _email, _hoTen, _diaChi, _soNgayLamViec, _luongTheoNgay) {
        super(_code, _email, _hoTen, _diaChi);
        this.soNgayLamViec = _soNgayLamViec;
        this.luongTheoNgay = _luongTheoNgay;
    }

    calculateSalary() {
        return this.soNgayLamViec * this.luongTheoNgay;
    }
}