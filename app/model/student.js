import person from "../model/person.js";

export default class student extends person{
    constructor(_hoTen, _diaChi, _code, _email, _diemToan, _diemLy, _diemHoa) {
        super(_hoTen, _diaChi, _code, _email);
        this.diemToan = _diemToan;
        this.diemLy = _diemLy;
        this.diemHoa = _diemHoa;
    }

    calculateDiemTrungBinh() {
        return (this.diemToan + this.diemLy + this.diemHoa) / 3;
    }

}