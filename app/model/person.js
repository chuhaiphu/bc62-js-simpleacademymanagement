export default class Person{
    constructor(_code, _email, _hoTen, _diaChi) {
        this.hoTen = _hoTen;
        this.diaChi = _diaChi;
        this.code = _code;
        this.email = _email;
        this.type = this.constructor.name; 
    }
}