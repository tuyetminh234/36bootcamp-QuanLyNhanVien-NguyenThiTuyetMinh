var staffList = [];

function createStaff() {
  var staffAcount = document.getElementById("tknv").value;
  var staffName = document.getElementById("name").value;
  var staffEmail = document.getElementById("email").value;
  var staffPassword = document.getElementById("password").value;
  var staffWorkDay = document.getElementById("datepicker").value;
  var staffSalary = +document.getElementById("luongCB").value;
  var staffPosition = document.getElementById("chucvu").value;
  var staffWorkHours = +document.getElementById("gioLam").value;

  for (var i = 0; i < staffList.length; i++) {
    if (staffList[i].staffAcount === staffAcount) {
      alert("tài khoản đã tồn tại");
      return;
    }
  }
  var staff = new Staff(
    staffAcount,
    staffName,
    staffEmail,
    staffPassword,
    staffWorkDay,
    staffSalary,
    staffPosition,
    staffWorkHours
  );
  staffList.push(staff);
  // in ds nhân viên ra
  renderStaffs();
  // lưu ds nhân viên ra localStorage
  saveData();
}

function renderStaffs(data) {
  if(!data) data = staffList;
  var html = "";
  for (var i = 0; i < data.length; i++) {
    html += `
      <tr>
        <td>${data[i].acount}</td>
        <td>${data[i].fullName}</td>
        <td>${data[i].email}</td>
        <td>${data[i].workDay}</td>
        <td>${data[i].position}</td>
        <td>${data[i].totalSalary}</td>
        <td>${data[i].rating}</td>
        <td>
        <button onclick="deleteStaff( '${data[i].acount}' )" class="btn btn-danger">Xóa</button>
        </td>
        <td>
        <button onclick="getStaffDetail( '${data[i].acount}' )" class="btn btn-info">Sửa</button>
        </td>

      </tr>`;
  }
  document.getElementById("tableDanhSach").innerHTML = html;
}

function saveData() {
  // chuyển từ một mảng object sang định dạng JSON
  var staffListJSON = JSON.stringify(staffList);
  localStorage.setItem("SL", staffListJSON);
}

function getData() {
  var staffListJSON = localStorage.getItem("SL");

  if (!staffListJSON) return;

  var staffListLocal = JSON.parse(staffListJSON);
  staffList = mapData(staffListLocal);
  renderStaffs();
}

function mapData(dataFromLocal) {
  var result = [];
  for (var i = 0; i < dataFromLocal.length; i++) {
    var oldStaff = dataFromLocal[i];
    var newStaff = new Staff(
      oldStaff.acount,
      oldStaff.fullName,
      oldStaff.email,
      oldStaff.password,
      oldStaff.password,
      oldStaff.workDay,
      oldStaff.salary,
      oldStaff.position,
      oldStaff.workHours
    );
    result.push(newStaff);
  }
 
  return result;
}

function deleteStaff(acount) {
  var index = findByAcount(acount)
if(index ===  -1 ){
  alert("không tìm thấy acount phù hợp")
  return;
}

staffList.splice(index, 1);
renderStaffs();
saveData();
}

function findByAcount(acount){
for (var i = 0; i < staffList.length; i++){
  if(staffList[i].acount === acount){
    return i;
  }
}
return -1;
}

function searchStaffs () {
  var result = [];
var keyword = document.getElementById("searchName").value;
for (var i= 0; i< staffList.length; i++ ) {
  var currentStaffRating = staffList[i].Rating
  if (currentStaffRating === keyword ) {
    result.push(staffList[i]);
  }
}

renderStaffs(result);
}


// đưa thông tin của nhân viên muốn update lên form
function getStaffDetail(staffAcount){
var index = findByAcount(staffAcount);
if(index === -1) {
  alert("Không tìm thấy acount hợp lệ");
  return;
}
var staff = staffList[index];
  document.getElementById("tknv").value = staff.acount;
  document.getElementById("name").value = staff.fullName;
  document.getElementById("email").value = staff.email;
  document.getElementById("password").value = staff.password;
  document.getElementById("datepicker").value = staff.workDay;
  document.getElementById("luongCB").value = staff.salary;
  document.getElementById("chucvu").value = staff.position;
  document.getElementById("gioLam").value = staff.workHours;

  document.getElementById("tknv").disable = true;

}
// cho phép người dùng sửa trên form, người dùng nhất nút cập nhật => cập nhật
function updateStaff (){

  var staffAcount = document.getElementById("tknv").value;
  var staffName = document.getElementById("name").value;
  var staffEmail = document.getElementById("email").value;
  var staffPassword = document.getElementById("password").value;
  var staffWorkDay = document.getElementById("datepicker").value;
  var staffSalary = +document.getElementById("luongCB").value;
  var staffPosition = document.getElementById("chucvu").value;
  var staffWorkHours = +document.getElementById("gioLam").value;

  var index = findByAcount(staffAcount);
  if (index === -1) {
    alert("không tìm thấy acount phù hợp")
    return;
  }
  var staff = staffList[index];
  staff.fullName = staffName;
  staff.email = staffEmail;
  staff.password = staffPassword;
  staff.workDay = staffWorkDay;
  staff.salary = staffSalary;
  staff.position = staffPosition;
  staff.workHours = staffWorkHours;

  renderStaffs();
  saveData();
  document.getElementById("formQLNV").reset();
}


window.onload = function () {
  console.log("window onload");
  getData();
};
