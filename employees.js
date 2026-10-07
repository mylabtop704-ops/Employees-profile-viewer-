const employees = [
    {
        id: 1,
        name: 'kia',
        job: 'front-end',
        department: 'it',
        email: 'sara@isValidElement.com',
        img: "img/8bc94ac11389f76a8ff5f367be64a319.jpg"
    }
    ,
    {
        id: 2,
        name: 'doly',
        job: 'react-developer',
        department: 'devloper',
        email: 'doly@isValidElement.com',
        img: 'img/356b7db724d83d984426ac84dc17ada6.jpg'
    }
    ,
    {
        id: 3,
        name: 'jessy',
        job: 'ui-developer',
        department: 'developer',
        email: 'jessey@isValidElement.com',
        img: 'img/8bc94ac11389f76a8ff5f367be64a319.jpg'
    }
    ,
    {
        id: 4,
        name: 'kanan',
        job: 'back-end',
        department: 'it',
        email: 'kanan@isValidElement.com',
        img: 'img/7392c2de8f61b41617680e5e2829c843.jpg'
    }
    ,
    {
        id: 5,
        name: 'morco',
        job: 'gemmers',
        department: 'developer',
        email: 'morco@isValidElement.com',
        img: 'img/8717e10f1de9cece362988c51616a4cd.jpg'
    }
    ,
    {
        id: 6,
        name: 'james',
        job: 'software-engineering',
        department: 'it',
        email: 'james@isValidElement.com',
        img: 'img/e8098a3d487b4fd7b8d591d7d9db32bb.jpg'

    }
    ,
    {
        id: 7,
        name: 'jake',
        job: 'flutter',
        department: 'it',
        email: 'jake@isValidElement.com',
        img: 'img/e692151bfc86c7d523697aa0dbd1a5d0.jpg'

    }
]

// Elements (must match employees.html IDs)
const body = document.getElementById('employeesbody');
const search = document.getElementById('search');
const model = document.getElementById('model');
const closeModel = document.getElementById('close-model');
const pPhoto = document.getElementById('pPhoto');
const pName = document.getElementById('pName');
const pJob = document.getElementById('pJob');
const pDept = document.getElementById('pDept');
const pEmail = document.getElementById('pEmail');

function render(list) {
    if (!body) return;
    body.innerHTML = list.map(e => `
        <tr>
          <td><img src="${e.img}" alt="${e.name}" class="avatar" width="42" height="42" onerror="this.onerror=null;this.src='img/default.jpg'"/></td>
          <td>${e.name}</td>
          <td>${e.job}</td>
          <td><span class="badge">${e.department}</span></td>
          <td><a href="mailto:${e.email}">${e.email}</a></td>
          <td><button class="view-btn" onclick="viewProfile(${e.id})">View</button></td>
        </tr>
    `).join('');
}

if (search) {
    search.addEventListener('input', () => {
        const q = search.value.trim().toLowerCase();
        render(employees.filter(e => e.name.toLowerCase().includes(q)));
    });
}

render(employees);

function showModal() { if (model) model.classList.remove('hidden'); }
function hideModal() { if (model) model.classList.add('hidden'); }

function viewProfile(id) {
    const e = employees.find(emp => emp.id === id);
    if (!e) return;
    if (pPhoto) { pPhoto.src = e.img || 'img/default.jpg'; pPhoto.onerror = function () { this.onerror = null; this.src = 'img/default.jpg'; } }
    if (pName) pName.textContent = e.name;
    if (pJob) pJob.textContent = e.job;
    if (pDept) pDept.textContent = e.department;
    if (pEmail) pEmail.textContent = e.email;
    showModal();
}

// Register close listeners once
if (closeModel) closeModel.addEventListener('click', hideModal);
if (model) model.addEventListener('click', (ev) => { if (ev.target === model) hideModal(); });
document.addEventListener('keydown', (ev) => { if (ev.key === 'Escape') hideModal(); });

// Expose for inline onclick
window.viewProfile = viewProfile;
