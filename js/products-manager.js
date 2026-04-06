const defaultData = [
    { id: 1, name: "Lập trình C", status: "active" },
    { id: 2, name: "Lập trình Frontend với ReactJS", status: "inactive" },
    { id: 3, name: "Lập trình Backend với Spring boot", status: "active" },
    { id: 4, name: "Lập trình Frontend với VueJS", status: "inactive" },
    { id: 5, name: "Cấu trúc dữ liệu và giải thuật", status: "inactive" },
    { id: 6, name: "Phân tích và thiết kế hệ thống", status: "inactive" },
    { id: 7, name: "Toán cao cấp", status: "active" },
    { id: 8, name: "Tiếng anh chuyên ngành", status: "inactive" }
];

const savedData = JSON.parse(localStorage.getItem('subjects'));
const data = (savedData && savedData.length > 0) ? savedData : defaultData;

let editId = null; 

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

// 3. hiển thị dữ liệu 
function renderTable(displayData = data) {
    if (!listTable) return;
    
    listTable.innerHTML = '';
    displayData.forEach((item) => {
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
    localStorage.setItem('subjects', JSON.stringify(data));
}

// 4. Mở Modal Thêm mới
btnAdd.onclick = () => {
    editId = null;
    modal.style.display = 'flex';
    document.getElementById('modal-title').innerText = 'Thêm mới môn học';
    btnSave.innerText = 'Thêm';
    resetForm();
};

// 5. Mở Modal Chỉnh sửa
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

// 6. Lưu (Thêm/Sửa)
btnSave.onclick = () => {
    const name = subjectNameInput.value.trim();
    const status = document.querySelector('input[name="status"]:checked').value;

    if (!name) {
        errorMsg.style.display = 'block';
        subjectNameInput.style.borderColor = 'red';
        return;
    }

    if (editId) {
        const index = data.findIndex(s => s.id === editId);
        if (index !== -1) data[index] = { ...data[index], name, status };
    } else {
        data.push({ id: Date.now(), name, status });
    }

    renderTable();
    closeModalFunc();
};

// 7. Xóa
window.deleteSubject = (id) => {
    if (confirm('Bạn có chắc chắn muốn xóa môn học này?')) {
        const index = data.findIndex(s => s.id === id);
        if (index !== -1) {
            data.splice(index, 1);
            renderTable();
        }
    }
};

// 8. Tìm kiếm và Lọc
function handleFilter() {
    const keyword = searchInput.value.toLowerCase();
    const filterValue = filterSelect.value;

    const filteredData = data.filter(item => {
        const matchSearch = item.name.toLowerCase().includes(keyword);
        const matchFilter = filterValue === 'all' || item.status === filterValue;
        return matchSearch && matchFilter;
    });

    renderTable(filteredData);
}

searchInput.oninput = handleFilter;
filterSelect.onchange = handleFilter;

// 9. Đóng modal và Reset
function closeModalFunc() {
    modal.style.display = 'none';
    resetForm();
}

function resetForm() {
    subjectNameInput.value = '';
    errorMsg.style.display = 'none';
    subjectNameInput.style.borderColor = '#ddd';
}

closeModal.onclick = closeModalFunc;
btnCancel.onclick = closeModalFunc;
window.onclick = (e) => { if (e.target == modal) closeModalFunc(); };



renderTable();