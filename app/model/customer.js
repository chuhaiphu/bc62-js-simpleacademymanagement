import person from "../model/person.js";

export default class customer extends person{
    constructor(_hoTen, _diaChi, _code, _email, _tenCongTy, _triGiaHoaDon, _danhGia) {
        super(_hoTen, _diaChi, _code, _email);
        this.tenCongTy = _tenCongTy;
        this.triGiaHoaDon = _triGiaHoaDon;
        this.danhGia = _danhGia;
    }
}