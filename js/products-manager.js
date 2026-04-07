const defaultData = [
    { id: 1, name: "Lập trình C", status: "active" },
    { id: 2, name: "Lập trình Frontend với ReactJS", status: "inactive" },
    { id: 3, name: "Lập trình Backend với Spring boot", status: "active" },
    { id: 4, name: "Lập trình Frontend với VueJS", status: "inactive" },
    { id: 5, name: "Cấu trúc dữ liệu và giải thuật", status: "inactive" },
    { id: 6, name: "Phân tích và thiết kế hệ thống", status: "inactive" },
    { id: 7, name: "Toán cao cấp", status: "active" },
    { id: 8, name: "Tiếng anh chuyên ngành", status: "inactive" },
    { id: 9, name: "Cơ sở dữ liệu", status: "active" },
    { id: 10, name: "Mạng máy tính", status: "active" },
    { id: 11, name: "Kỹ năng mềm", status: "inactive" }
];

let savedData = JSON.parse(localStorage.getItem('subjects'));
let data = (savedData && savedData.length > 0) ? savedData : defaultData;

// Biến quản lý trạng thái
let editId = null; 
let idToDelete = null;
let currentPage = 1;
const rowsPerPage = 8; 
let isAscending = null;

// DOM Elements
const listTable = document.getElementById('list');
const modal = document.getElementById('modal');
const btnAdd = document.querySelector('.btn-add');
const btnSave = document.getElementById('btn-save');
const btnCancel = document.getElementById('btn-cancel');
const closeModal = document.querySelector('.close-modal');
const subjectNameInput = document.getElementById('subject-name');
const errorMsg = document.getElementById('error-msg');
const searchInput = document.getElementById('search');
const filterSelect = document.getElementById('filter');
const deleteModal = document.getElementById('delete-modal');
const btnConfirmDelete = document.getElementById('btn-confirm-delete');
const btnCancelDelete = document.getElementById('btn-cancel-delete');
const paginationContainer = document.querySelector('.pagination');

function showToast(message, type = 'success') {
    let container = document.getElementById('toast-container');
    if (!container) {
        container = document.createElement('div');
        container.id = 'toast-container';
        container.style.cssText = "position: fixed; top: 20px; right: 20px; z-index: 9999;";
        document.body.appendChild(container);
    }

    const toast = document.createElement('div');
    toast.className = `toast ${type}`;
    const icon = type === 'success' ? 'fa-check-circle' : 'fa-circle-exclamation';
    
    toast.innerHTML = `
        <i class="fa-solid ${icon}"></i>
        <span style="margin-left: 10px;">${message}</span>
    `;

    container.appendChild(toast);

    setTimeout(() => {
        toast.style.opacity = '0';
        toast.style.transform = 'translateX(100%)';
        toast.style.transition = 'all 0.5s ease';
        setTimeout(() => toast.remove(), 500);
    }, 3000);
}

// Hàm hiển thị bảng 
function renderTable(displayData = data) {
    if (!listTable) return;
    
    const startIndex = (currentPage - 1) * rowsPerPage;
    const endIndex = startIndex + rowsPerPage;
    const paginatedData = displayData.slice(startIndex, endIndex);

    listTable.innerHTML = '';
    
    if (paginatedData.length === 0) {
        listTable.innerHTML = '<tr><td colspan="3" style="text-align:center">Không có dữ liệu</td></tr>';
    } else {
        paginatedData.forEach((item) => {
            listTable.innerHTML += `
                <tr>
                    <td>${item.name}</td>
                    <td>
                        <span class="status ${item.status === 'active' ? 'active-st' : 'inactive-st'}">
                            ● ${item.status === 'active' ? 'Đang hoạt động' : 'Ngừng hoạt động'}
                        </span>
                    </td>
                    <td>
                        <i class="fa-solid fa-trash btn-del" onclick="deleteSubject(${item.id})"></i>
                        <i class="fa-solid fa-pen-to-square btn-edit" onclick="openEditModal(${item.id})"></i>
                    </td>
                </tr>
            `;
        });
    }

    localStorage.setItem('subjects', JSON.stringify(data));
    renderPagination(displayData);
}

// Xử lý thêm và Sửa
btnAdd.onclick = () => {
    editId = null;
    modal.style.display = 'flex';
    document.getElementById('modal-title').innerText = 'Thêm mới môn học';
    btnSave.innerText = 'Thêm';
    resetForm();
};

window.openEditModal = (id) => {
    editId = id;
    const item = data.find(s => s.id === id);
    if (item) {
        subjectNameInput.value = item.name;
        document.querySelector(`input[name="status"][value="${item.status}"]`).checked = true;
        modal.style.display = 'flex';
        document.getElementById('modal-title').innerText = 'Cập nhật môn học';
        btnSave.innerText = 'Lưu';
    }
};

// Lưu (Thêm và suwar)
btnSave.onclick = function() {
    var name = subjectNameInput.value.trim();
    var statusInput = document.querySelector('input[name="status"]:checked');
    var status = statusInput.value;

    if (name === "") {
        errorMsg.style.display = 'block';
        subjectNameInput.style.borderColor = 'red';
        return; 
    }

    if (editId !== null) {
        //  Sửa môn học
        for (var i = 0; i < data.length; i++) {
            if (data[i].id === editId) {
                data[i].name = name;
                data[i].status = status;
                break;
            }
        }
        showToast("Cập nhật môn học thành công!", "success");
    } else {
        //  Thêm mới
        var newSubject = {
            id: Date.now(),
            name: name,
            status: status
        };
        data.unshift(newSubject);
        currentPage = 1;
        showToast("Thêm mới môn học thành công!", "success");
    }

    renderTable();
    closeModalFunc();
};

// Xóa 
window.deleteSubject = (id) => {
    idToDelete = id; 
    deleteModal.style.display = 'flex'; 
};

btnConfirmDelete.onclick = () => {
    if (idToDelete !== null) {
        const index = data.findIndex(s => s.id === idToDelete);
        if (index !== -1) {
            data.splice(index, 1);
            const totalPages = Math.ceil(data.length / rowsPerPage);
            if (currentPage > totalPages && totalPages > 0) currentPage = totalPages;
            
            renderTable();
            showToast("Xóa môn học thành công!", "success");
        }
        closeDeleteModal();
    }
};

function closeDeleteModal() {
    deleteModal.style.display = 'none';
    idToDelete = null;
}

// Tìm kiếm, Lọc và Sắp xếp
function handleFilter() {
    currentPage = 1;
    const keyword = searchInput.value.toLowerCase();
    const filterValue = filterSelect.value;
    const filteredData = data.filter(item => {
        const matchSearch = item.name.toLowerCase().includes(keyword);
        const matchFilter = filterValue === 'all' || item.status === filterValue;
        return matchSearch && matchFilter;
    });
    renderTable(filteredData);
}

function handleSort() {
    isAscending = isAscending === true ? false : true;
    const icon = document.getElementById('sort-icon');
    icon.className = isAscending ? 'fa-solid fa-sort-up' : 'fa-solid fa-sort-down';
    icon.style.color = '#3182ce';

    data.sort((a, b) => {
        const nameA = a.name.trim().toLowerCase();
        const nameB = b.name.trim().toLowerCase();
        return isAscending 
            ? nameA.localeCompare(nameB, 'vi') 
            : nameB.localeCompare(nameA, 'vi');
    });

    currentPage = 1; 
    renderTable(); 
}

searchInput.oninput = handleFilter;
filterSelect.onchange = handleFilter;
document.getElementById('sort-name').addEventListener('click', handleSort);

// Đóng modal và Reset form
function closeModalFunc() {
    modal.style.display = 'none';
    resetForm();
}

function resetForm() {
    subjectNameInput.value = '';
    errorMsg.style.display = 'none';
    subjectNameInput.style.borderColor = '#ddd';
    document.querySelector('input[name="status"][value="active"]').checked = true;
}

closeModal.onclick = closeModalFunc;
btnCancel.onclick = closeModalFunc;
btnCancelDelete.onclick = closeDeleteModal;

window.onclick = (e) => { 
    if (e.target == modal) closeModalFunc(); 
    if (e.target == deleteModal) closeDeleteModal();
};

renderTable();