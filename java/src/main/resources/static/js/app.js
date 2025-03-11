// Global variables
let currentPage = 0;
let pageSize = 12;
let totalPages = 0;

// Event Listeners
document.addEventListener('DOMContentLoaded', () => {
    loadItems();
    setupEventListeners();
});

function setupEventListeners() {
    // Filter and sort event listeners
    document.getElementById('categoryFilter').addEventListener('change', loadItems);
    document.getElementById('seasonFilter').addEventListener('change', loadItems);
    document.getElementById('sortBy').addEventListener('change', loadItems);
    document.getElementById('sortDirection').addEventListener('change', loadItems);

    // Add item button
    document.getElementById('addItemBtn').addEventListener('click', () => {
        if (!checkAuth()) {
            document.getElementById('loginBtn').click();
            return;
        }
        document.getElementById('addItemModal').style.display = 'block';
    });

    // Add item form submission
    document.getElementById('addItemForm').addEventListener('submit', handleAddItem);
    document.getElementById('cancelAdd').addEventListener('click', () => {
        document.getElementById('addItemModal').style.display = 'none';
        document.getElementById('addItemForm').reset();
        document.getElementById('imagePreview').innerHTML = '';
    });

    // Image preview
    document.getElementById('image').addEventListener('change', handleImagePreview);
}

async function loadItems(page = 0) {
    const category = document.getElementById('categoryFilter').value;
    const season = document.getElementById('seasonFilter').value;
    const sortBy = document.getElementById('sortBy').value;
    const sortDir = document.getElementById('sortDirection').value;

    try {
        const token = localStorage.getItem('token');
        const headers = {
            'Content-Type': 'application/json'
        };
        if (token) {
            headers['Authorization'] = `Bearer ${token}`;
        }

        const response = await fetch(`/api/items?page=${page}&size=${pageSize}&category=${category}&season=${season}&sortBy=${sortBy}&sortDir=${sortDir}`, {
            headers: headers
        });

        if (response.ok) {
            const data = await response.json();
            displayItems(data.content);
            updatePagination(data);
        } else {
            showToast('Error loading items', 'error');
        }
    } catch (error) {
        showToast('Error connecting to server', 'error');
    }
}

function displayItems(items) {
    const grid = document.getElementById('itemsGrid');
    grid.innerHTML = '';

    items.forEach(item => {
        const card = createItemCard(item);
        grid.appendChild(card);
    });
}

function createItemCard(item) {
    const card = document.createElement('div');
    card.className = 'item-card';
    
    const imageUrl = item.imageUrl || '/images/placeholder.png';
    
    card.innerHTML = `
        <div class="item-image" style="background-image: url('${imageUrl}')"></div>
        <div class="item-details">
            <h3>${item.name}</h3>
            <p class="brand">${item.brand}</p>
            <p class="category">${item.category}</p>
            <div class="item-meta">
                <span class="size">${item.size}</span>
                <span class="color" style="background-color: ${item.color}"></span>
                <span class="season">${item.season}</span>
            </div>
        </div>
    `;

    if (currentUser) {
        const actions = document.createElement('div');
        actions.className = 'item-actions';
        actions.innerHTML = `
            <button class="button" onclick="editItem(${item.id})">Edit</button>
            <button class="button button-danger" onclick="deleteItem(${item.id})">Delete</button>
        `;
        card.appendChild(actions);
    }

    return card;
}

async function handleAddItem(e) {
    e.preventDefault();

    if (!checkAuth()) {
        document.getElementById('loginBtn').click();
        return;
    }

    const formData = new FormData();
    formData.append('name', document.getElementById('name').value);
    formData.append('category', document.getElementById('category').value);
    formData.append('color', document.getElementById('color').value);
    formData.append('size', document.getElementById('size').value);
    formData.append('season', document.getElementById('season').value);
    formData.append('brand', document.getElementById('brand').value);
    formData.append('description', document.getElementById('description').value);

    const imageFile = document.getElementById('image').files[0];
    if (imageFile) {
        formData.append('image', imageFile);
    }

    try {
        const token = localStorage.getItem('token');
        const response = await fetch('/api/items', {
            method: 'POST',
            headers: {
                'Authorization': `Bearer ${token}`
            },
            body: formData
        });

        if (response.ok) {
            document.getElementById('addItemModal').style.display = 'none';
            document.getElementById('addItemForm').reset();
            document.getElementById('imagePreview').innerHTML = '';
            loadItems();
            showToast('Item added successfully!', 'success');
        } else {
            const error = await response.text();
            showToast(error, 'error');
        }
    } catch (error) {
        showToast('Error adding item', 'error');
    }
}

function handleImagePreview(e) {
    const file = e.target.files[0];
    if (file) {
        const reader = new FileReader();
        reader.onload = function(e) {
            document.getElementById('imagePreview').innerHTML = `
                <img src="${e.target.result}" alt="Preview" style="max-width: 200px; max-height: 200px;">
            `;
        };
        reader.readAsDataURL(file);
    }
}

function updatePagination(data) {
    const pagination = document.getElementById('pagination');
    pagination.innerHTML = '';

    if (data.totalPages <= 1) return;

    const createPageButton = (pageNum, text) => {
        const button = document.createElement('button');
        button.className = `page-button ${pageNum === data.number ? 'active' : ''}`;
        button.textContent = text || (pageNum + 1);
        button.onclick = () => loadItems(pageNum);
        return button;
    };

    // Previous button
    if (!data.first) {
        pagination.appendChild(createPageButton(data.number - 1, '←'));
    }

    // First page
    pagination.appendChild(createPageButton(0));

    // Ellipsis and middle pages
    if (data.totalPages > 2) {
        if (data.number > 2) {
            pagination.appendChild(document.createTextNode('...'));
        }
        
        for (let i = Math.max(1, data.number - 1); i <= Math.min(data.number + 1, data.totalPages - 2); i++) {
            pagination.appendChild(createPageButton(i));
        }

        if (data.number < data.totalPages - 3) {
            pagination.appendChild(document.createTextNode('...'));
        }
    }

    // Last page
    if (data.totalPages > 1) {
        pagination.appendChild(createPageButton(data.totalPages - 1));
    }

    // Next button
    if (!data.last) {
        pagination.appendChild(createPageButton(data.number + 1, '→'));
    }
}

async function editItem(itemId) {
    // Implementation for editing items
    console.log('Edit item:', itemId);
}

async function deleteItem(itemId) {
    if (!confirm('Are you sure you want to delete this item?')) {
        return;
    }

    try {
        const token = localStorage.getItem('token');
        const response = await fetch(`/api/items/${itemId}`, {
            method: 'DELETE',
            headers: {
                'Authorization': `Bearer ${token}`
            }
        });

        if (response.ok) {
            loadItems();
            showToast('Item deleted successfully!', 'success');
        } else {
            const error = await response.text();
            showToast(error, 'error');
        }
    } catch (error) {
        showToast('Error deleting item', 'error');
    }
}

function showToast(message, type = 'info') {
    const toast = document.createElement('div');
    toast.className = `toast toast-${type}`;
    toast.textContent = message;
    
    document.body.appendChild(toast);
    
    setTimeout(() => {
        toast.classList.add('show');
        setTimeout(() => {
            toast.classList.remove('show');
            setTimeout(() => {
                document.body.removeChild(toast);
            }, 300);
        }, 3000);
    }, 100);
}

// State management
let currentSort = 'name';
let currentDirection = 'asc';
let currentCategory = '';
let currentSeason = '';

// DOM Elements
const itemsGrid = document.getElementById('itemsGrid');
const pagination = document.getElementById('pagination');
const addItemBtn = document.getElementById('addItemBtn');
const addItemModal = document.getElementById('addItemModal');
const addItemForm = document.getElementById('addItemForm');
const cancelAddBtn = document.getElementById('cancelAdd');
const categoryFilter = document.getElementById('categoryFilter');
const seasonFilter = document.getElementById('seasonFilter');
const sortBySelect = document.getElementById('sortBy');
const sortDirectionSelect = document.getElementById('sortDirection');
const imageInput = document.getElementById('image');
const imagePreview = document.getElementById('imagePreview');

// Event Listeners
addItemBtn.addEventListener('click', () => addItemModal.style.display = 'block');
cancelAddBtn.addEventListener('click', () => {
    addItemModal.style.display = 'none';
    resetForm();
});
categoryFilter.addEventListener('change', handleFiltersChange);
seasonFilter.addEventListener('change', handleFiltersChange);
sortBySelect.addEventListener('change', handleSortChange);
sortDirectionSelect.addEventListener('change', handleSortChange);
addItemForm.addEventListener('submit', handleAddItem);
imageInput.addEventListener('change', handleImagePreview);

// Initialize
loadItems();

function handleImagePreview(e) {
    const file = e.target.files[0];
    if (file) {
        const reader = new FileReader();
        reader.onload = function(e) {
            imagePreview.style.backgroundImage = `url(${e.target.result})`;
            imagePreview.classList.add('has-image');
        }
        reader.readAsDataURL(file);
    } else {
        imagePreview.style.backgroundImage = '';
        imagePreview.classList.remove('has-image');
    }
}

function resetForm() {
    addItemForm.reset();
    imagePreview.style.backgroundImage = '';
    imagePreview.classList.remove('has-image');
}

function handleFiltersChange() {
    currentCategory = categoryFilter.value;
    currentSeason = seasonFilter.value;
    currentPage = 0;
    loadItems();
}

function handleSortChange() {
    currentSort = sortBySelect.value;
    currentDirection = sortDirectionSelect.value;
    loadItems();
}

async function loadItems() {
    itemsGrid.innerHTML = '<div class="loading"></div>';
    
    let url = `/api/clothes?page=${currentPage}&size=${pageSize}&sortBy=${currentSort}&direction=${currentDirection}`;
    
    if (currentCategory) {
        url = `/api/clothes/category/${currentCategory}?page=${currentPage}&size=${pageSize}&sortBy=${currentSort}&direction=${currentDirection}`;
    } else if (currentSeason) {
        url = `/api/clothes/season/${currentSeason}?page=${currentPage}&size=${pageSize}&sortBy=${currentSort}&direction=${currentDirection}`;
    }

    try {
        const response = await fetch(url);
        const data = await response.json();
        renderItems(data.content);
        renderPagination(data);
    } catch (error) {
        showToast('Error loading items', 'error');
    }
}

function renderItems(items) {
    itemsGrid.innerHTML = items.map(item => `
        <div class="card">
            ${item.imageUrl ? `<img src="${item.imageUrl}" alt="${item.name}" class="card-image">` : ''}
            <h3>${item.name}</h3>
            <p><span class="badge badge-primary">${item.category}</span></p>
            <p>
                <strong>Color:</strong> ${item.color}<br>
                <strong>Size:</strong> ${item.size}<br>
                <strong>Brand:</strong> ${item.brand}<br>
                <strong>Season:</strong> <span class="badge badge-warning">${item.season}</span>
            </p>
            ${item.description ? `<p class="description">${item.description}</p>` : ''}
            <div class="card-actions">
                <button class="button" onclick="deleteItem(${item.id})">Delete</button>
            </div>
        </div>
    `).join('');
}

function renderPagination(data) {
    const totalPages = data.totalPages;
    let buttons = '';
    
    // Previous button
    buttons += `<button ${currentPage === 0 ? 'disabled' : ''} 
        onclick="changePage(${currentPage - 1})">Previous</button>`;
    
    // Page numbers
    for (let i = 0; i < totalPages; i++) {
        buttons += `<button class="${currentPage === i ? 'active' : ''}" 
            onclick="changePage(${i})">${i + 1}</button>`;
    }
    
    // Next button
    buttons += `<button ${currentPage === totalPages - 1 ? 'disabled' : ''} 
        onclick="changePage(${currentPage + 1})">Next</button>`;
    
    pagination.innerHTML = buttons;
}

function changePage(page) {
    currentPage = page;
    loadItems();
}

async function handleAddItem(e) {
    e.preventDefault();
    
    const imageFile = document.getElementById('image').files[0];
    let imageUrl = '';

    if (imageFile) {
        const formData = new FormData();
        formData.append('file', imageFile);
        try {
            const uploadResponse = await fetch('/api/files/upload', {
                method: 'POST',
                body: formData
            });
            imageUrl = await uploadResponse.text();
        } catch (error) {
            showToast('Error uploading image', 'error');
            return;
        }
    }

    const newItem = {
        name: document.getElementById('name').value,
        category: document.getElementById('category').value,
        color: document.getElementById('color').value,
        size: document.getElementById('size').value,
        season: document.getElementById('season').value,
        brand: document.getElementById('brand').value,
        description: document.getElementById('description').value,
        imageUrl: imageUrl
    };

    try {
        const response = await fetch('/api/clothes', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(newItem)
        });

        if (response.ok) {
            addItemModal.style.display = 'none';
            resetForm();
            loadItems();
            showToast('Item added successfully!', 'success');
        } else {
            const error = await response.json();
            showToast(Object.values(error).join(', '), 'error');
        }
    } catch (error) {
        showToast('Error adding item', 'error');
    }
}

async function deleteItem(id) {
    if (!confirm('Are you sure you want to delete this item?')) return;

    try {
        const response = await fetch(`/api/clothes/${id}`, {
            method: 'DELETE'
        });

        if (response.ok) {
            loadItems();
            showToast('Item deleted successfully!', 'success');
        } else {
            showToast('Error deleting item', 'error');
        }
    } catch (error) {
        showToast('Error deleting item', 'error');
    }
}

function showToast(message, type = 'info') {
    const toast = document.createElement('div');
    toast.className = `toast toast-${type}`;
    toast.textContent = message;
    document.body.appendChild(toast);

    setTimeout(() => {
        toast.remove();
    }, 3000);
}
