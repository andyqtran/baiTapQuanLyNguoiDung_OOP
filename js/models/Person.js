export default class Person {
    constructor(id, ten, diaChi, email) {
        this.id = id;
        this.ten = ten;
        this.firstName = "";
        this.diaChi = diaChi;
        this.email = email;
    }

    getFirstName() {
        let nameArray = this.ten.split(" ");
        this.firstName = nameArray[nameArray.length - 1];
    }
}
