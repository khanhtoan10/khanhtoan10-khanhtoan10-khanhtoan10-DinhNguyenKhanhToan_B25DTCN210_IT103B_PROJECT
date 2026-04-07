let lessons = [
    { id: 1, name: "Session 01 - Tổng quan về HTML", time: 45, status: "done", subject: "HTML/CSS" },
    { id: 2, name: "Session 02 - Thẻ Inline và Block", time: 60, status: "wait", subject: "HTML/CSS" },
    { id: 3, name: "Session 03 - Form và table", time: 40, status: "done", subject: "Lập trình C" },
    { id: 4, name: "Session 04 - CSS cơ bản", time: 45, status: "wait", subject: "Lập trình C" },
    { id: 5, name: "Session 05 - CSS layout", time: 60, status: "wait", subject: "Lập trình C" },
    { id: 6, name: "Session 06 - CSS flex box", time: 45, status: "wait", subject: "Lập trình C" },
    { id: 7, name: "Session 12 - Con trỏ trong C", time: 45, status: "done", subject: "Lập trình C" },
    { id: 8, name: "Session 15 - Đọc và ghi file", time: 60, status: "wait", subject: "Lập trình C" },
];

let editId = null;

function render() {
    const list = document.getElementById("list");

    list.innerHTML = "";

    lessons.forEach(item => {
        list.innerHTML += `
            <tr>
                <td><input type="checkbox"></td>
                <td>${item.name}</td>
                <td>${item.time}</td>
                <td class="${item.status === 'done' ? 'status-done' : 'status-wait'}">
                    ● ${item.status === 'done' ? 'Đã hoàn thành' : 'Chưa hoàn thành'}
                </td>
                <td>
                    <i class="fa-solid fa-trash btn-del" onclick="del(${item.id})"></i>
                    <i class="fa-solid fa-pen btn-edit" onclick="openModal('edit', ${item.id})"></i>
                </td>
            </tr>`;
    });
}

function openModal(mode, id = null) {
    const modal = document.getElementById("lessonModal");
    modal.style.display = "flex";

    if (mode === 'edit') {
        editId = id;
        const item = lessons.find(l => l.id === id);
        document.getElementById("modalTitle").innerText = "Cập nhật bài học";
        document.getElementById("btnSave").innerText = "Lưu";
        document.getElementById("lessonName").value = item.name;
        document.getElementById("lessonSubject").value = item.subject;
        document.getElementById("lessonTime").value = item.time;
    } else {
        editId = null;
        document.getElementById("modalTitle").innerText = "Thêm mới bài học";
        document.getElementById("btnSave").innerText = "Thêm";
        document.getElementById("lessonName").value = "";
        document.getElementById("lessonSubject").value = "";
        document.getElementById("lessonTime").value = "";
    }
}

function closeModal() {
    document.getElementById("lessonModal").style.display = "none";
}

function validate() {
    let isValid = true;
    const name = document.getElementById("lessonName");
    const sub = document.getElementById("lessonSubject");
    const time = document.getElementById("lessonTime");

    [name, sub, time].forEach(el => el.classList.remove("invalid"));
    document.querySelectorAll(".error").forEach(el => el.innerText = "");

    if (!name.value.trim()) {
        document.getElementById("nameError").innerText = "Tên bài học không được để trống";
        name.classList.add("invalid");
        isValid = false;
    }
    if (!sub.value) {
        document.getElementById("subjectError").innerText = "Loại môn học không được để trống";
        sub.classList.add("invalid");
        isValid = false;
    }
    if (!time.value || time.value <= 0) {
        document.getElementById("timeError").innerText = "Thời gian học không được để trống";
        time.classList.add("invalid");
        isValid = false;
    }
    return isValid;
}

function save() {
    if (!validate()) return;

    const name = document.getElementById("lessonName").value;
    const subject = document.getElementById("lessonSubject").value;
    const time = document.getElementById("lessonTime").value;

    if (editId) {
        const index = lessons.findIndex(l => l.id === editId);
        lessons[index] = { ...lessons[index], name, subject, time };
    } else {
        lessons.push({ id: Date.now(), name, subject, time, status: "wait" });
    }

    closeModal();
    render();
}

function del(id) {
    if (confirm("Xác nhận xóa bài học này?")) {
        lessons = lessons.filter(l => l.id !== id);
        render();
    }
}

render();