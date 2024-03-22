const customerCodeRegex = /^(?!\s*$).+/;
const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
const hoTenRegex = /^[A-Za-z\s]+$/;
const diaChiRegex = /^(?!\s*$).+/;
const tenCongTyRegex = /^(?!\s*$).+/;
const triGiaHoaDonRegex = /^[0-9]+$/;


export default class CustomerValidation {
    
    validateCustomerCode() {
        let customerCodeInput = document.getElementById("code").value;
        if (!customerCodeRegex.test(customerCodeInput)) {
            document.getElementById("invalid-code").innerHTML = "Mã khách hàng không được để trống";
            document.getElementById("invalid-code").style.display = 'block';
            return false;
        } else {
            document.getElementById("invalid-code").style.display = 'none';
        }
        return true;
    }

    validateEmail() {
        let emailInput = document.getElementById("email").value;
        if (!emailRegex.test(emailInput)) {
            document.getElementById("invalid-email").innerHTML = "Email không đúng định dạng";
            document.getElementById("invalid-email").style.display = 'block';
            return false;
        } else {
            document.getElementById("invalid-email").style.display = 'none';
        }
        return true;
    }

    validateHoTen() {
        let hoTenInput = document.getElementById("hoTen").value;
        if (!hoTenRegex.test(hoTenInput)) {
            document.getElementById("invalid-hoTen").innerHTML = "Họ tên chỉ được chứa chữ cái và khoảng trắng";
            document.getElementById("invalid-hoTen").style.display = 'block';
            return false;
        } else {
            document.getElementById("invalid-hoTen").style.display = 'none';
        }
        return true;
    }

    validateDiaChi() {
        let diaChiInput = document.getElementById("diaChi").value;
        if (!diaChiRegex.test(diaChiInput)) {
            document.getElementById("invalid-diaChi").innerHTML = "Địa chỉ không được để trống";
            document.getElementById("invalid-diaChi").style.display = 'block';
            return false;
        } else {
            document.getElementById("invalid-diaChi").style.display = 'none';
        }
        return true;
    }

    validateTenCongTy() {
        let tenCongTyInput = document.getElementById("tenCongTy").value;
        if (!tenCongTyRegex.test(tenCongTyInput)) {
            document.getElementById("invalid-tenCongTy").innerHTML = "Tên công ty không được để trống";
            document.getElementById("invalid-tenCongTy").style.display = 'block';
            return false;
        } else {
            document.getElementById("invalid-tenCongTy").style.display = 'none';
        }
        return true;
    }

    validateTriGiaHoaDon() {
        let triGiaHoaDonInput = document.getElementById("triGiaHoaDon").value;
        if (!triGiaHoaDonRegex.test(triGiaHoaDonInput)) {
            document.getElementById("invalid-triGiaHoaDon").innerHTML = "Trị giá hóa đơn phải là số";
            document.getElementById("invalid-triGiaHoaDon").style.display = 'block';
            return false;
        } else {
            document.getElementById("invalid-triGiaHoaDon").style.display = 'none';
        }
        return true;
    }

    validateDanhGia() {
        let danhGiaInput = document.querySelector('input[name="danhGia"]:checked');
        if (danhGiaInput == null) {
            document.getElementById("invalid-danhGia").innerHTML = "Bạn chưa đánh giá công ty";
            document.getElementById("invalid-danhGia").style.display = 'block';
            return false;
        }
        else{
            document.getElementById("invalid-danhGia").style.display = 'none';
        }
        return true;
    }
    

    initialValidation() {
        let isValid = true;
        isValid &= this.validateCustomerCode();
        isValid &= this.validateEmail();
        isValid &= this.validateHoTen();
        isValid &= this.validateTenCongTy();
        isValid &= this.validateTriGiaHoaDon();
        isValid &= this.validateDiaChi();
        isValid &= this.validateDanhGia();
        return isValid;
    }
}
