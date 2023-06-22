import Person from "./Person.js";
export default class Employee extends Person {
    constructor(id, ten, diaChi, email, soNgayLV, luongNgay) {
        super(id, ten, diaChi, email);
        this.type = "Nhân viên";
        this.soNgayLV = soNgayLV;
        this.luongNgay = luongNgay;
        this.luong = 0;
    }

    tinhLuong() {
        this.luong = this.soNgayLV * this.luongNgay;
    }
}
