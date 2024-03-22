import person from "../model/person.js";

export default class customer extends person{
    constructor(_code, _email, _hoTen, _diaChi, _tenCongTy, _triGiaHoaDon, _danhGia) {
        super(_code, _email, _hoTen, _diaChi);
        this.tenCongTy = _tenCongTy;
        this.triGiaHoaDon = _triGiaHoaDon;
        this.danhGia = _danhGia;
        this.type = "customer";
    }
}