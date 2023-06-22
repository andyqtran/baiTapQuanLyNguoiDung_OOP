export default class ListPerson {
    constructor() {
        this.arr = [];
    }

    themND(nd) {
        this.arr.push(nd);
    }

    xoaND(id) {
        var index = this.findIndex(id);
        if (index > -1) {
            this.arr.splice(index, 1);
        }
    }

    findIndex(id) {
        return this.arr.findIndex((nd) => nd.id == id);
    }

    findND(id) {
        var index = this.findIndex(id);
        if (index > -1) {
            return this.arr[index];
        }

        return null;
    }

    updateND(nd) {
        var index = this.findIndex(nd.id);
        if (index > -1) {
            this.arr[index] = nd;
        }
    }

    filterND(loaiND) {
        return this.arr.filter((nd) => nd.type == loaiND);
    }

    sort() {
        return this.arr.sort((a, b) => {
            let tenSPTiepTheo = b.firstName.toUpperCase();
            let tenSP = a.firstName.toUpperCase();
            if (tenSPTiepTheo > tenSP) {
                return 1;
            } else if (tenSPTiepTheo < tenSP) {
                return -1;
            }

            return 1;
        });
    }
}
