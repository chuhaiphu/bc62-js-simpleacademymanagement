const customerCodeRegex = /^(?!\s*$).+/;
const employeeCodeRegex = /^(?!\s*$).+/;
const studentCodeRegex = /^(?!\s*$).+/;
const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
const hoTenRegex = /^[A-Za-z\s]+$/;
const diaChiRegex = /^(?!\s*$).+/;
const tenCongTyRegex = /^(?!\s*$).+/;
const triGiaHoaDonRegex = /^[0-9]+$/;
const soNgayLamViecRegex = /^[0-9]+$/;
const luongTheoNgayRegex = /^[0-9]+$/;
const diemToanRegex = /^[0-9]+$/;
const diemLyRegex = /^[0-9]+$/;
const diemHoaRegex = /^[0-9]+$/;

export class CustomerValidation {
    
    validateCustomerCode() {
        let customerCodeInput = document.getElementById("customer-code").value;
        if (!customerCodeRegex.test(customerCodeInput)) {
            document.getElementById("invalid-customer-code").innerHTML = "Mã khách hàng không được để trống";
            document.getElementById("invalid-customer-code").style.display = 'block';
            return false;
        } else {
            document.getElementById("invalid-customer-code").style.display = 'none';
        }
        return true;
    }

    validateEmail() {
        let emailInput = document.getElementById("customer-email").value;
        if (!emailRegex.test(emailInput)) {
            document.getElementById("invalid-customer-email").innerHTML = "Email không đúng định dạng";
            document.getElementById("invalid-customer-email").style.display = 'block';
            return false;
        } else {
            document.getElementById("invalid-customer-email").style.display = 'none';
        }
        return true;
    }

    validateHoTen() {
        let hoTenInput = document.getElementById("customer-hoTen").value;
        if (!hoTenRegex.test(hoTenInput)) {
            document.getElementById("invalid-customer-hoTen").innerHTML = "Họ tên chỉ được chứa chữ cái và khoảng trắng";
            document.getElementById("invalid-customer-hoTen").style.display = 'block';
            return false;
        } else {
            document.getElementById("invalid-customer-hoTen").style.display = 'none';
        }
        return true;
    }

    validateDiaChi() {
        let diaChiInput = document.getElementById("customer-diaChi").value;
        if (!diaChiRegex.test(diaChiInput)) {
            document.getElementById("invalid-customer-diaChi").innerHTML = "Địa chỉ không được để trống";
            document.getElementById("invalid-customer-diaChi").style.display = 'block';
            return false;
        } else {
            document.getElementById("invalid-customer-diaChi").style.display = 'none';
        }
        return true;
    }

    validateTenCongTy() {
        let tenCongTyInput = document.getElementById("customer-tenCongTy").value;
        if (!tenCongTyRegex.test(tenCongTyInput)) {
            document.getElementById("invalid-customer-tenCongTy").innerHTML = "Tên công ty không được để trống";
            document.getElementById("invalid-customer-tenCongTy").style.display = 'block';
            return false;
        } else {
            document.getElementById("invalid-customer-tenCongTy").style.display = 'none';
        }
        return true;
    }

    validateTriGiaHoaDon() {
        let triGiaHoaDonInput = document.getElementById("customer-triGiaHoaDon").value;
        if (!triGiaHoaDonRegex.test(triGiaHoaDonInput)) {
            document.getElementById("invalid-customer-triGiaHoaDon").innerHTML = "Trị giá hóa đơn phải là số";
            document.getElementById("invalid-customer-triGiaHoaDon").style.display = 'block';
            return false;
        } else {
            document.getElementById("invalid-customer-triGiaHoaDon").style.display = 'none';
        }
        return true;
    }

    validateDanhGia() {
        let danhGiaInput = document.querySelector('input[name="danhGia"]:checked');
        if (danhGiaInput == null) {
            document.getElementById("invalid-customer-danhGia").innerHTML = "Bạn chưa đánh giá công ty";
            document.getElementById("invalid-customer-danhGia").style.display = 'block';
            return false;
        }
        else{
            document.getElementById("invalid-customer-danhGia").style.display = 'none';
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


export class EmployeeValidation {
    
    validateEmployeeCode() {
        let employeeCodeInput = document.getElementById("employee-code").value;
        if (!employeeCodeRegex.test(employeeCodeInput)) {
            document.getElementById("invalid-employee-code").innerHTML = "Mã nhân viên không được để trống";
            document.getElementById("invalid-employee-code").style.display = 'block';
            return false;
        } else {
            document.getElementById("invalid-employee-code").style.display = 'none';
        }
        return true;
    }

    validateEmail() {
        let emailInput = document.getElementById("employee-email").value;
        if (!emailRegex.test(emailInput)) {
            document.getElementById("invalid-employee-email").innerHTML = "Email không đúng định dạng";
            document.getElementById("invalid-employee-email").style.display = 'block';
            return false;
        } else {
            document.getElementById("invalid-employee-email").style.display = 'none';
        }
        return true;
    }

    validateHoTen() {
        let hoTenInput = document.getElementById("employee-hoTen").value;
        if (!hoTenRegex.test(hoTenInput)) {
            document.getElementById("invalid-employee-hoTen").innerHTML = "Họ tên chỉ được chứa chữ cái và khoảng trắng";
            document.getElementById("invalid-employee-hoTen").style.display = 'block';
            return false;
        } else {
            document.getElementById("invalid-employee-hoTen").style.display = 'none';
        }
        return true;
    }

    validateDiaChi() {
        let diaChiInput = document.getElementById("employee-diaChi").value;
        if (!diaChiRegex.test(diaChiInput)) {
            document.getElementById("invalid-employee-diaChi").innerHTML = "Địa chỉ không được để trống";
            document.getElementById("invalid-employee-diaChi").style.display = 'block';
            return false;
        } else {
            document.getElementById("invalid-employee-diaChi").style.display = 'none';
        }
        return true;
    }

    validateSoNgayLamViec() {
        let soNgayLamViecInput = document.getElementById("employee-soNgayLamViec").value;
        if (!soNgayLamViecRegex.test(soNgayLamViecInput)) {
            document.getElementById("invalid-employee-soNgayLamViec").innerHTML = "Số ngày làm việc phải là số";
            document.getElementById("invalid-employee-soNgayLamViec").style.display = 'block';
            return false;
        } else {
            document.getElementById("invalid-employee-soNgayLamViec").style.display = 'none';
        }
        return true;
    }

    validateLuongTheoNgay() {
        let luongTheoNgayInput = document.getElementById("employee-luongTheoNgay").value;
        if (!luongTheoNgayRegex.test(luongTheoNgayInput)) {
            document.getElementById("invalid-employee-luongTheoNgay").innerHTML = "Lương theo ngày phải là số";
            document.getElementById("invalid-employee-luongTheoNgay").style.display = 'block';
            return false;
        } else {
            document.getElementById("invalid-employee-luongTheoNgay").style.display = 'none';
        }
        return true;
    }
    

    initialValidation() {
        let isValid = true;
        isValid &= this.validateEmployeeCode();
        isValid &= this.validateEmail();
        isValid &= this.validateHoTen();
        isValid &= this.validateDiaChi();
        isValid &= this.validateLuongTheoNgay();
        isValid &= this.validateSoNgayLamViec();
        return isValid;
    }
}

export class StudentValidation {
    
    validateStudentCode() {
        let studentCodeInput = document.getElementById("student-code").value;
        if (!studentCodeRegex.test(studentCodeInput)) {
            document.getElementById("invalid-student-code").innerHTML = "Mã học sinh không được để trống";
            document.getElementById("invalid-student-code").style.display = 'block';
            return false;
        } else {
            document.getElementById("invalid-student-code").style.display = 'none';
        }
        return true;
    }

    validateEmail() {
        let emailInput = document.getElementById("student-email").value;
        if (!emailRegex.test(emailInput)) {
            document.getElementById("invalid-student-email").innerHTML = "Email không đúng định dạng";
            document.getElementById("invalid-student-email").style.display = 'block';
            return false;
        } else {
            document.getElementById("invalid-student-email").style.display = 'none';
        }
        return true;
    }

    validateHoTen() {
        let hoTenInput = document.getElementById("student-hoTen").value;
        if (!hoTenRegex.test(hoTenInput)) {
            document.getElementById("invalid-student-hoTen").innerHTML = "Họ tên chỉ được chứa chữ cái và khoảng trắng";
            document.getElementById("invalid-student-hoTen").style.display = 'block';
            return false;
        } else {
            document.getElementById("invalid-student-hoTen").style.display = 'none';
        }
        return true;
    }

    validateDiaChi() {
        let diaChiInput = document.getElementById("student-diaChi").value;
        if (!diaChiRegex.test(diaChiInput)) {
            document.getElementById("invalid-student-diaChi").innerHTML = "Địa chỉ không được để trống";
            document.getElementById("invalid-student-diaChi").style.display = 'block';
            return false;
        } else {
            document.getElementById("invalid-student-diaChi").style.display = 'none';
        }
        return true;
    }

    validateDiemToan() {
        let diemToanInput = document.getElementById("student-diemToan").value;
        if (!diemToanRegex.test(diemToanInput)) {
            document.getElementById("invalid-student-diemToan").innerHTML = "Điểm Toán phải là số";
            document.getElementById("invalid-student-diemToan").style.display = 'block';
            return false;
        } else {
            document.getElementById("invalid-student-diemToan").style.display = 'none';
        }
        return true;
    }

    validateDiemLy() {
        let diemLyInput = document.getElementById("student-diemLy").value;
        if (!diemLyRegex.test(diemLyInput)) {
            document.getElementById("invalid-student-diemLy").innerHTML = "Điểm Lý phải là số";
            document.getElementById("invalid-student-diemLy").style.display = 'block';
            return false;
        } else {
            document.getElementById("invalid-student-diemLy").style.display = 'none';
        }
        return true;
    }
    
    validateDiemHoa() {
        let diemHoaInput = document.getElementById("student-diemHoa").value;
        if (!diemHoaRegex.test(diemHoaInput)) {
            document.getElementById("invalid-student-diemHoa").innerHTML = "Điểm Hóa phải là số";
            document.getElementById("invalid-student-diemHoa").style.display = 'block';
            return false;
        } else {
            document.getElementById("invalid-student-diemHoa").style.display = 'none';
        }
        return true;
    }
    

    initialValidation() {
        let isValid = true;
        isValid &= this.validateStudentCode();
        isValid &= this.validateEmail();
        isValid &= this.validateHoTen();
        isValid &= this.validateDiaChi();
        isValid &= this.validateDiemToan();
        isValid &= this.validateDiemLy();
        isValid &= this.validateDiemHoa();
        return isValid;
    }
}