import Person from "./Person.js";
export default class Customer extends Person {
    constructor(id, ten, diaChi, email, tenCongTy, triGiaHopDong, danhGia) {
        super(id, ten, diaChi, email);
        this.type = "Khách hàng";
        this.tenCongTy = tenCongTy;
        this.triGiaHopDong = triGiaHopDong;
        this.danhGia = danhGia;
    }
}
