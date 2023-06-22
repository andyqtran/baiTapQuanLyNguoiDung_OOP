export default class Validation {
    true(errorId) {
        document.getElementById(errorId).style.display = "none";
        document.getElementById(errorId).innerHTML = "";
        return true;
    }

    false(errorId, mess) {
        document.getElementById(errorId).style.display = "block";
        document.getElementById(errorId).innerHTML = mess;
        return false;
    }

    kiemTraRong(value, errorId) {
        if (value == "") {
            // false
            return this.false(errorId, "(*) Vui lòng không nhập rỗng");
        }

        // true
        return this.true(errorId);
    }

    kiemTraMinMaxKiTu(value, errorId, mess, min, max) {
        if (value.length < min || value.length > max) {
            // false
            return this.false(errorId, mess);
        }

        // true
        return this.true(errorId);
    }

    kiemTraMinMax(value, errorId, mess, min, max) {
        if (value < min || value > max) {
            // false
            return this.false(errorId, mess);
        }

        // true
        return this.true(errorId);
    }

    kiemTraPattern(value, errorId, mess, pattern) {
        if (value.match(pattern)) {
            // true
            return this.true(errorId);
        }

        // false
        return this.false(errorId, mess);
    }

    kiemTraSelect(selectedId, errorId, mess) {
        if (document.getElementById(selectedId).selectedIndex != 0) {
            // true
            return this.true(errorId);
        }

        // False
        return this.false(errorId, mess);
    }

    kiemTraTrungID(value, errorId, mess, arr) {
        if (arr.every((nv) => nv.id != value)) {
            // true
            return this.true(errorId);
        }

        // false
        return this.false(errorId, mess);
    }
}
