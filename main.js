const closeBtn = document.getElementById('closeBtn')
const NextBtn = document.getElementById('NextBtn')
const PrevBtn = document.getElementById('PrevBtn')
const viewerjob = document.getElementById('viewerjob')
const viewerName = document.getElementById('viewerName')
const ViewerImg = document.getElementById('ViewerImg')
const ProfileViewer = document.getElementById('ProfileViewer')
const employyesContainer = document.getElementById('employyesContainer')
const employeeFilter = document.getElementById('employeeFilter')
const filterDropdown = document.getElementById('filterDropdown')
const filterButtons = Array.from(document.querySelectorAll('.filter-btn'))

const employees = [{
    name: 'kia',
    job: 'front-end',
    salary: '10k',
    rating: 1,
    img: "img/8bc94ac11389f76a8ff5f367be64a319.jpg"

},
{
    name: 'doly',
    job: 'react developer',
    salary: '15k',
    rating: 2,
    img: 'img/356b7db724d83d984426ac84dc17ada6.jpg'
},
{
    name: 'jesey',
    job: 'ui-developer',
    salary: '12k',
    rating: 3,
    img: 'img/529fcf561ff326d95d51a95ff655f1b2.jpg'

},
{
    name: 'kanan',
    job: 'back-end',
    salary: '15k',
    rating: 4,
    img: 'img/7392c2de8f61b41617680e5e2829c843.jpg'
},
{
    name: 'morco',
    job: 'gammers',
    salary: '20',
    rating: 5,
    img: 'img/8717e10f1de9cece362988c51616a4cd.jpg'
},
{
    name: 'james',
    job: 'soft-ware engineering',
    salary: '25k',
    rating: 6,
    img: 'img/e8098a3d487b4fd7b8d591d7d9db32bb.jpg'
},
{
    name: 'jake',
    job: 'flutter',
    salary: '30k',
    rating: 7,
    img: 'img/e692151bfc86c7d523697aa0dbd1a5d0.jpg'
},

]

let currentIndex = 0
let filteredEmployees = [...employees]
let activeFilter = null

function getActiveEmployees() {
    return filteredEmployees.length ? filteredEmployees : []
}

function setButtonLabel(button, type, selectedValue) {
    const label = type.charAt(0).toUpperCase() + type.slice(1)
    button.textContent = selectedValue ? `${label}: ${selectedValue}` : label
}

function getFilterOptions(type) {
    const values = employees.map(emp => {
        if (type === 'job') return emp.job
        if (type === 'rating') return String(emp.rating)
        return emp.salary
    })

    return [...new Set(values)]
}

function closeDropdown() {
    filterDropdown.classList.add('hidden')
    filterDropdown.setAttribute('aria-hidden', 'true')
    filterDropdown.innerHTML = ''
    filterDropdown.removeAttribute('data-type')
}

function renderFilterOptions(type, button) {
    const options = getFilterOptions(type)
    filterDropdown.innerHTML = ''

    const allOption = document.createElement('button')
    allOption.type = 'button'
    allOption.className = 'filter-option'
    allOption.textContent = 'All'
    allOption.addEventListener('click', function (event) {
        event.stopPropagation()
        activeFilter = null
        setButtonLabel(button, type, null)
        closeDropdown()
        renderEmployees()
    })
    filterDropdown.appendChild(allOption)

    options.forEach(optionValue => {
        const option = document.createElement('button')
        option.type = 'button'
        option.className = 'filter-option'
        option.textContent = optionValue
        option.addEventListener('click', function (event) {
            event.stopPropagation()
            activeFilter = { type, value: optionValue }
            setButtonLabel(button, type, optionValue)
            closeDropdown()
            renderEmployees()
        })
        filterDropdown.appendChild(option)
    })

    const rect = button.getBoundingClientRect()
    filterDropdown.style.left = `${rect.left}px`
    filterDropdown.style.top = `${rect.bottom + 8}px`
    filterDropdown.classList.remove('hidden')
    filterDropdown.setAttribute('aria-hidden', 'false')
    filterDropdown.setAttribute('data-type', type)
}

function toggleFilterDropdown(event) {
    const button = event.currentTarget
    const type = button.dataset.filterType
    const isOpen = filterDropdown.getAttribute('data-type') === type && !filterDropdown.classList.contains('hidden')

    if (isOpen) {
        closeDropdown()
        return
    }

    closeDropdown()
    renderFilterOptions(type, button)
}

filterButtons.forEach(button => {
    const type = button.dataset.filterType
    setButtonLabel(button, type, null)
    button.addEventListener('click', function (event) {
        event.stopPropagation()
        toggleFilterDropdown(event)
    })
})

document.addEventListener('click', function (event) {
    if (!event.target.closest('.filter-btn') && !event.target.closest('.filter-option')) {
        closeDropdown()
    }
})

function matchesActiveFilter(emp) {
    if (!activeFilter) return true
    if (activeFilter.type === 'job') return emp.job === activeFilter.value
    if (activeFilter.type === 'rating') return String(emp.rating) === activeFilter.value
    if (activeFilter.type === 'salary') return emp.salary === activeFilter.value
    return true
}

function renderEmployees() {
    const searchTerm = employeeFilter.value.trim().toLowerCase()
    filteredEmployees = employees.filter(emp => (
        emp.name.toLowerCase().includes(searchTerm) && matchesActiveFilter(emp)
    ))
    employyesContainer.innerHTML = ''

    if (!filteredEmployees.length) {
        ProfileViewer.style.display = 'none'
        return
    }

    filteredEmployees.forEach((emp, index) => {
        const card = document.createElement('div')
        card.classList.add('employee-card')
        card.innerHTML = `
            <img class='col-avatar employee-img' src='${emp.img}' alt='${emp.name}'>
            <div class='col-name'>${emp.name}</div>
            <div class='col-job'>${emp.job}</div>
            <div class='col-rating'>${emp.rating}</div>
            <div class='col-salary'>${emp.salary}</div>
        `

        const employeeImg = card.querySelector('.employee-img')
        employeeImg.addEventListener('click', function () {
            currentIndex = index
            showEmployee(currentIndex)
            ProfileViewer.style.display = 'flex'
        })

        employyesContainer.appendChild(card)
    })

    if (currentIndex >= filteredEmployees.length) {
        currentIndex = 0
    }
}

function showEmployee(index) {
    const activeEmployees = getActiveEmployees()
    if (!activeEmployees.length) {
        ProfileViewer.style.display = 'none'
        return
    }

    const emp = activeEmployees[index]
    ViewerImg.src = emp.img
    viewerName.textContent = emp.name
    viewerjob.textContent = emp.job
}

employeeFilter.addEventListener('input', function () {
    currentIndex = 0
    renderEmployees()
})

renderEmployees()

NextBtn.addEventListener('click', function () {
    const activeEmployees = getActiveEmployees()
    if (!activeEmployees.length) return
    currentIndex = (currentIndex + 1) % activeEmployees.length
    showEmployee(currentIndex)
})
PrevBtn.addEventListener('click', function () {
    const activeEmployees = getActiveEmployees()
    if (!activeEmployees.length) return
    currentIndex = (currentIndex - 1 + activeEmployees.length) % activeEmployees.length
    showEmployee(currentIndex)
})

closeBtn.addEventListener('click', function () {
    ProfileViewer.style.display = 'none'
})

document.addEventListener('keydown', function (e) {
    const activeEmployees = getActiveEmployees()
    if (!activeEmployees.length) return

    if (e.key === 'ArrowRight') {
        currentIndex = (currentIndex + 1) % activeEmployees.length
        showEmployee(currentIndex)
    }
    if (e.key === 'ArrowLeft') {
        currentIndex = (currentIndex - 1 + activeEmployees.length) % activeEmployees.length
        showEmployee(currentIndex)
    }
    if (e.key === 'Escape') {
        ProfileViewer.style.display = 'none'
    }
})