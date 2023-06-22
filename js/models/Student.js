import Person from "./Person.js";
export default class Student extends Person {
    constructor(id, ten, diaChi, email, toan, ly, hoa) {
        super(id, ten, diaChi, email);
        this.type = "Sinh viên";
        this.toan = toan * 1;
        this.ly = ly * 1;
        this.hoa = hoa * 1;
        this.DTB = 0;
    }

    tinhDTB() {
        this.DTB = Math.round((this.toan + this.ly + this.hoa) / 3);
    }
}
