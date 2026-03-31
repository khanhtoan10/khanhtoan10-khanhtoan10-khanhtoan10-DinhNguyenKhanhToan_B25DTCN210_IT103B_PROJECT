const data = [
    { name: "Lập trình C", status: "active" },
    { name: "Frontend với ReactJS", status: "inactive" },
    { name: "Backend với Spring boot", status: "active" },
    { name: "Frontend với VueJS", status: "inactive" },
    { name: "Cấu trúc dữ liệu", status: "inactive" }
];

const list = document.getElementById('list');
const search = document.getElementById('search');
const filter = document.getElementById('filter');

function render(arr) {
    list.innerHTML = arr.map(item => `
        <tr>
            <td>${item.name}</td>
            <td>
                <span class="status ${item.status === 'active' ? 'active-st' : 'inactive-st'}">
                    ● ${item.status === 'active' ? 'Đang hoạt động' : 'Ngừng hoạt động'}
                </span>
            </td>
            <td>
                <i class="fa-regular fa-trash-can btn-del"></i>
                <i class="fa-solid fa-pen btn-edit"></i>
            </td>
        </tr>
    `).join('');
}

function handleFilter() {
    const text = search.value.toLowerCase();
    const st = filter.value;
    const filtered = data.filter(i => 
        i.name.toLowerCase().includes(text) && (st === 'all' || i.status === st)
    );
    render(filtered);
}

search.addEventListener('input', handleFilter);
filter.addEventListener('change', handleFilter);

render(data);