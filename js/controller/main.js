import Person from "../models/Person.js";
import Student from "../models/Student.js";
import Employee from "../models/Employee.js";
import Customer from "../models/Customer.js";
import Validation from "../models/Validation.js";
import ListPerson from "../models/ListPerson.js";

function domId(id) {
    return document.getElementById(id);
}
// Set local storage
function setLocalStorage() {
    localStorage.setItem("listPerson", JSON.stringify(listPerson.arr));
}

// get local storage
function getLocalStorage() {
    if (localStorage.getItem("listPerson")) {
        listPerson.arr = JSON.parse(localStorage.getItem("listPerson"));
        // renderTable(listPerson.arr);
    }
}

let listPerson = new ListPerson();
let validation = new Validation();
getLocalStorage();

// Render TableHeader
function renderTableHeader(type) {
    const tableHeader = domId("tableHeader");
    if (type == "Sinh viên") {
        tableHeader.innerHTML = `
                <tr>
                    <th class="nowrap">
                        <span class="mr-1">ID</span>
                    </th>
                    <th>Tên</th>
                    <th>Địa chỉ</th>
                    <th>email</th>
                    <th>Toán</th>
                    <th>Lý</th>
                    <th>Hóa</th>
                    <th>Điểm TB</th>
                    <th><em class="fa fa-cog"></em></th>
                </tr>
        `;
    } else if (type == "Nhân viên") {
        tableHeader.innerHTML = `
        <tr>
            <th class="nowrap">
                <span class="mr-1">ID</span>
            </th>
            <th>Tên</th>
            <th>Địa chỉ</th>
            <th>email</th>
            <th>Số ngày LV</th>
            <th>Lương ngày</th>
            <th>Lương</th>
            <th><em class="fa fa-cog"></em></th>
        </tr>
`;
    } else if (type == "Khách hàng") {
        tableHeader.innerHTML = `
        <tr>
            <th class="nowrap">
                <span class="mr-1">ID</span>
            </th>
            <th>Tên</th>
            <th>Địa chỉ</th>
            <th>email</th>
            <th>Tên công ty</th>
            <th>Trị giá hợp đồng</th>
            <th>Đánh giá</th>
            <th><em class="fa fa-cog"></em></th>
        </tr>
`;
    } else {
        tableHeader.innerHTML = "";
    }
}

// Handle onchange filterLoaiND
domId("filterLoaiND").onchange = function () {
    renderTableHeader(this.value);
    renderTable(listPerson.arr);
};

// Clear thông báo validation
function clearValid() {
    let list = document.querySelectorAll("span.sp-thongbao");
    list.forEach((item) => {
        item.innerHTML = "";
    });
}
// Handle onclick btnThem
domId("btnThem").onclick = function () {
    domId("btnCapNhat").classList.add("none");
    domId("btnThemND").classList.remove("none");
    domId("id").disabled = false;
    domId("type").disabled = false;
    domId("modalForm").reset();
    renderModal();
    clearValid();
};

// Handle onchange loại người dùng modal
function renderModal() {
    let type = domId("type");
    if (type.value == "Sinh viên") {
        domId("modalSV").classList.remove("none");
        domId("modalNV").classList.add("none");
        domId("modalKH").classList.add("none");
    } else if (type.value == "Nhân viên") {
        domId("modalNV").classList.remove("none");
        domId("modalSV").classList.add("none");
        domId("modalKH").classList.add("none");
    } else if (type.value == "Khách hàng") {
        domId("modalKH").classList.remove("none");
        domId("modalSV").classList.add("none");
        domId("modalNV").classList.add("none");
    } else {
        domId("modalKH").classList.add("none");
        domId("modalSV").classList.add("none");
        domId("modalNV").classList.add("none");
    }
}
let typeTag = domId("type");
typeTag.addEventListener("change", renderModal);
typeTag.addEventListener("change", clearValid);

// Hàm lấy thông tin người dùng
function getInfo(isAdd) {
    let type = domId("type").value;
    let id = domId("id").value;
    let ten = domId("name").value;
    let diaChi = domId("diaChi").value;
    let email = domId("email").value;

    // Validation type
    let isValid = true;
    isValid &= validation.kiemTraSelect(
        "type",
        "tbType",
        "(*) Vui lòng chọn loại người dùng"
    );

    // Validation ID
    if (isAdd) {
        isValid &=
            validation.kiemTraRong(id, "tbID") &&
            validation.kiemTraMinMaxKiTu(
                id,
                "tbID",
                "(*) Vui lòng nhập từ 2 đến 4 kí tự",
                2,
                4
            ) &&
            validation.kiemTraTrungID(
                id,
                "tbID",
                "(*) ID đã tồn tại",
                listPerson.arr
            );
    }

    // Validation tên
    isValid &=
        validation.kiemTraRong(ten, "tbTen") &&
        validation.kiemTraPattern(
            ten,
            "tbTen",
            "(*) Vui lòng nhập tên hợp lệ",
            "^[a-zA-Z_ÀÁÂÃÈÉÊẾÌÍÒÓÔÕÙÚĂĐĨŨƠàáâãèéêìíòóôõùúăđĩũơƯĂẠẢẤẦẨẪẬẮẰẲẴẶ" +
                "ẸẺẼỀỀỂưăạảấầẩẫậắằẳẵặẹẻẽềềểếỄỆỈỊỌỎỐỒỔỖỘỚỜỞỠỢỤỦỨỪễệỉịọỏốồổỗộớờởỡợ" +
                "ụủứừỬỮỰỲỴÝỶỸửữựỳỵỷỹ\\s]+$"
        );

    // Validation diaChi
    isValid &=
        validation.kiemTraRong(diaChi, "tbdiaChi") &&
        validation.kiemTraPattern(
            diaChi,
            "tbdiaChi",
            "(*) Vui lòng nhập địa chỉ hợp lệ",
            "^[a-zA-Z_ÀÁÂÃÈÉÊẾÌÍÒÓÔÕÙÚĂĐĨŨƠàáâãèéêìíòóôõùúăđĩũơƯĂẠẢẤẦẨẪẬẮẰẲẴẶ" +
                "ẸẺẼỀỀỂưăạảấầẩẫậắằẳẵặẹẻẽềềểếỄỆỈỊỌỎỐỒỔỖỘỚỜỞỠỢỤỦỨỪễệỉịọỏốồổỗộớờởỡợ" +
                "ụủứừỬỮỰỲỴÝỶỸửữựỳỵỷỹ\\s]+$"
        );

    // Validation email
    isValid &=
        validation.kiemTraRong(email, "tbEmail") &&
        validation.kiemTraPattern(
            email,
            "tbEmail",
            "(*) Vui lòng nhập email hợp lệ",
            /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/
        );

    if (type == "Sinh viên") {
        return getInfoSV(id, ten, diaChi, email, isValid);
    } else if (type == "Nhân viên") {
        return getInfoNV(id, ten, diaChi, email, isValid);
    } else if (type == "Khách hàng") {
        return getInfoKH(id, ten, diaChi, email, isValid);
    } else {
        return;
    }
}
// Hàm lấy thông tin sinh viên
function getInfoSV(id, ten, diaChi, email, isValid) {
    let toan = domId("toan").value;
    let ly = domId("ly").value;
    let hoa = domId("hoa").value;
    // Validation toan
    isValid &=
        validation.kiemTraRong(toan, "tbToan") &&
        validation.kiemTraPattern(
            toan,
            "tbToan",
            "(*) Vui lòng nhập điểm hợp lệ",
            /^[+-]?\d+(\.\d+)?$/
        ) &&
        validation.kiemTraMinMax(
            toan,
            "tbToan",
            "(*) Vui lòng nhập điểm hợp lệ",
            0,
            10
        );

    // Validation ly
    isValid &=
        validation.kiemTraRong(ly, "tbLy") &&
        validation.kiemTraPattern(
            ly,
            "tbLy",
            "(*) Vui lòng nhập điểm hợp lệ",
            /^[+-]?\d+(\.\d+)?$/
        ) &&
        validation.kiemTraMinMax(
            ly,
            "tbLy",
            "(*) Vui lòng nhập điểm hợp lệ",
            0,
            10
        );

    // Validation Hoa
    isValid &=
        validation.kiemTraRong(hoa, "tbHoa") &&
        validation.kiemTraPattern(
            hoa,
            "tbHoa",
            "(*) Vui lòng nhập điểm hợp lệ",
            /^[+-]?\d+(\.\d+)?$/
        ) &&
        validation.kiemTraMinMax(
            hoa,
            "tbHoa",
            "(*) Vui lòng nhập điểm hợp lệ",
            0,
            10
        );

    if (isValid) {
        let student = new Student(id, ten, diaChi, email, toan, ly, hoa);
        student.tinhDTB();
        student.getFirstName();
        return student;
    }
}
// Hàm lấy thông tin nhân viên
function getInfoNV(id, ten, diaChi, email, isValid) {
    let soNgayLV = domId("soNgayLV").value;
    let luongNgay = domId("luongNgay").value;

    // Validation soNgayLV
    isValid &=
        validation.kiemTraRong(soNgayLV, "tbSoNgayLV") &&
        validation.kiemTraPattern(
            soNgayLV,
            "tbSoNgayLV",
            "(*) Vui lòng nhập số ngày hợp lệ",
            /^[0-9]+$/
        ) &&
        validation.kiemTraMinMax(
            soNgayLV,
            "tbSoNgayLV",
            "(*) Vui lòng nhập số ngày hợp lệ",
            0,
            30
        );

    // Validation luongNgay
    isValid &=
        validation.kiemTraRong(luongNgay, "tbLuongNgay") &&
        validation.kiemTraPattern(
            luongNgay,
            "tbLuongNgay",
            "(*) Vui lòng nhập lương ngày hợp lệ",
            /^[+-]?\d+(\.\d+)?$/
        ) &&
        validation.kiemTraMinMax(
            luongNgay,
            "tbLuongNgay",
            "(*) Vui lòng nhập lương ngày hợp lệ",
            0,
            1000000
        );

    if (isValid) {
        let employee = new Employee(
            id,
            ten,
            diaChi,
            email,
            soNgayLV,
            luongNgay
        );
        employee.getFirstName();
        employee.tinhLuong();
        return employee;
    }
}

// Hàm lấy thông tin khách hàng
function getInfoKH(id, ten, diaChi, email, isValid) {
    let tenCongTy = domId("tenCongTy").value;
    let triGiaHopDong = domId("triGiaHopDong").value;
    let danhGia = domId("danhGia").value;

    // Validation tenCongTy
    isValid &=
        validation.kiemTraRong(tenCongTy, "tbtenCongTy") &&
        validation.kiemTraPattern(
            tenCongTy,
            "tbtenCongTy",
            "(*) Vui lòng nhập tên công ty hợp lệ",
            "^[a-zA-Z_ÀÁÂÃÈÉÊẾÌÍÒÓÔÕÙÚĂĐĨŨƠàáâãèéêìíòóôõùúăđĩũơƯĂẠẢẤẦẨẪẬẮẰẲẴẶ" +
                "ẸẺẼỀỀỂưăạảấầẩẫậắằẳẵặẹẻẽềềểếỄỆỈỊỌỎỐỒỔỖỘỚỜỞỠỢỤỦỨỪễệỉịọỏốồổỗộớờởỡợ" +
                "ụủứừỬỮỰỲỴÝỶỸửữựỳỵỷỹ\\s]+$"
        );

    // Validation triGiaHopDong
    isValid &=
        validation.kiemTraRong(triGiaHopDong, "tbTriGiaHopDong") &&
        validation.kiemTraPattern(
            triGiaHopDong,
            "tbTriGiaHopDong",
            "(*) Vui lòng nhập trị giá hợp đồng hợp lệ",
            /^[+-]?\d+(\.\d+)?$/
        ) &&
        validation.kiemTraMinMax(
            triGiaHopDong,
            "tbTriGiaHopDong",
            "(*) Vui lòng nhập giá trị hợp đồng hợp lệ",
            0,
            10000000000
        );

    // Validation danhGia
    isValid &=
        validation.kiemTraRong(danhGia, "tbDanhGia") &&
        validation.kiemTraPattern(
            danhGia,
            "tbDanhGia",
            "(*) Vui lòng nhập đánh giá hợp lệ",
            "^[a-zA-Z_ÀÁÂÃÈÉÊẾÌÍÒÓÔÕÙÚĂĐĨŨƠàáâãèéêìíòóôõùúăđĩũơƯĂẠẢẤẦẨẪẬẮẰẲẴẶ" +
                "ẸẺẼỀỀỂưăạảấầẩẫậắằẳẵặẹẻẽềềểếỄỆỈỊỌỎỐỒỔỖỘỚỜỞỠỢỤỦỨỪễệỉịọỏốồổỗộớờởỡợ" +
                "ụủứừỬỮỰỲỴÝỶỸửữựỳỵỷỹ\\s]+$"
        );

    if (isValid) {
        let customer = new Customer(
            id,
            ten,
            diaChi,
            email,
            tenCongTy,
            triGiaHopDong,
            danhGia
        );
        customer.getFirstName();
        return customer;
    }
}

// Handle btnThemND
domId("btnThemND").onclick = function () {
    let nd = getInfo(true);
    if (nd) {
        listPerson.themND(nd);
        setLocalStorage();
        renderTable(listPerson.arr);
    }
};

// renderTable
function renderTable(array) {
    let loaiND = domId("filterLoaiND").value;
    let tableBody = document.getElementById("tableDanhSach");

    if (array) {
        let filterArray = array.filter((nd) => nd.type == loaiND);
        let content = "";
        if (loaiND == "Sinh viên") {
            content = filterArray.map(
                (sv) =>
                    `<tr>
                <td>${sv.id}</td>
                <td>${sv.ten.toUpperCase()}</td>
                <td>${sv.diaChi}</td>
                <td>${sv.email}</td>
                <td>${sv.toan}</td>
                <td>${sv.ly}</td>
                <td>${sv.hoa}</td>
                <td>${sv.DTB}</td>
                <td class="d-flex">
                <button class="btn btn-warning mr-1"onclick="editND('${
                    sv.id
                }')" data-toggle="modal"
                data-target="#myModal"><i class="fa-solid fa-pencil"></i></button>
                <button class="btn btn-danger" onclick="xoaND('${
                    sv.id
                }')"><i class="fa-solid fa-trash-can"></i></button>
                </td>
                </tr>`
            );
            tableBody.innerHTML = content.join("");
        } else if (loaiND == "Nhân viên") {
            content = filterArray.map(
                (nv) =>
                    `<tr>
                <td>${nv.id}</td>
                <td>${nv.ten.toUpperCase()}</td>
                <td>${nv.diaChi}</td>
                <td>${nv.email}</td>
                <td>${nv.soNgayLV}</td>
                <td>${nv.luongNgay}</td>
                <td>${nv.luong}</td>
                <td class="d-flex">
                <button class="btn btn-warning mr-1"onclick="editND('${
                    nv.id
                }')" data-toggle="modal"
                data-target="#myModal"><i class="fa-solid fa-pencil"></i></button>
                <button class="btn btn-danger" onclick="xoaND('${
                    nv.id
                }')"><i class="fa-solid fa-trash-can"></i></button>
                </td>
                </tr>`
            );
            tableBody.innerHTML = content.join("");
        } else if (loaiND == "Khách hàng") {
            content = filterArray.map(
                (kh) =>
                    `<tr>
                <td>${kh.id}</td>
                <td>${kh.ten.toUpperCase()}</td>
                <td>${kh.diaChi}</td>
                <td>${kh.email}</td>
                <td>${kh.tenCongTy}</td>
                <td>${kh.triGiaHopDong}</td>
                <td>${kh.danhGia}</td>
                <td class="d-flex">
                <button class="btn btn-warning mr-1"onclick="editND('${
                    kh.id
                }')" data-toggle="modal"
                data-target="#myModal"><i class="fa-solid fa-pencil"></i></button>
                <button class="btn btn-danger" onclick="xoaND('${
                    kh.id
                }')"><i class="fa-solid fa-trash-can"></i></button>
                </td>
                </tr>`
            );
            tableBody.innerHTML = content.join("");
        } else {
            tableBody.innerHTML = "";
        }
    }
}

// xoaND
function xoaND(id) {
    listPerson.xoaND(id);
    setLocalStorage();
    renderTable(listPerson.arr);
}

window.xoaND = xoaND;

// editND
function editND(id) {
    clearValid();
    let person = listPerson.findND(id);
    if (person) {
        domId("type").value = person.type;
        domId("type").disabled = true;
        renderModal();
        domId("btnThemND").classList.add("none");
        domId("id").value = person.id;
        domId("id").disabled = true;
        domId("name").value = person.ten;
        domId("diaChi").value = person.diaChi;
        domId("email").value = person.email;

        if (person.type == "Sinh viên") {
            domId("toan").value = person.toan;
            domId("ly").value = person.ly;
            domId("hoa").value = person.hoa;
        } else if (person.type == "Nhân viên") {
            domId("soNgayLV").value = person.soNgayLV;
            domId("luongNgay").value = person.luongNgay;
        } else if (person.type == "Khách hàng") {
            domId("tenCongTy").value = person.tenCongTy;
            domId("triGiaHopDong").value = person.triGiaHopDong;
            domId("danhGia").value = person.danhGia;
        }
    }

    domId("btnCapNhat").classList.remove("none");
    domId("btnThemND").classList.add("none");
}

window.editND = editND;

// Update ND
domId("btnCapNhat").onclick = function () {
    let person = getInfo(false);
    if (person) {
        listPerson.updateND(person);
        renderTable(listPerson.arr);
        setLocalStorage();
    }
};

// Handle sort btn
domId("btnSort").onclick = function () {
    let sortArray = listPerson.sort().reverse();
    renderTable(sortArray);
};
