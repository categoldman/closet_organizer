// Auth state management
let currentUser = null;

// Check if user is logged in
function checkAuth() {
    const token = localStorage.getItem('token');
    if (token) {
        const user = JSON.parse(localStorage.getItem('user'));
        currentUser = user;
        updateAuthUI(true);
        return true;
    }
    updateAuthUI(false);
    return false;
}

// Update UI based on auth state
function updateAuthUI(isLoggedIn) {
    const authButtons = document.getElementById('authButtons');
    const userInfo = document.getElementById('userInfo');
    const addItemBtn = document.getElementById('addItemBtn');

    if (isLoggedIn && currentUser) {
        authButtons.style.display = 'none';
        userInfo.style.display = 'flex';
        userInfo.querySelector('.username').textContent = currentUser.username;
        addItemBtn.style.display = 'block';
    } else {
        authButtons.style.display = 'flex';
        userInfo.style.display = 'none';
        addItemBtn.style.display = 'none';
    }
}

// Handle login
async function handleLogin(e) {
    e.preventDefault();
    const loginModal = document.getElementById('loginModal');
    
    try {
        const response = await fetch('/api/auth/login', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                usernameOrEmail: document.getElementById('loginUsername').value,
                password: document.getElementById('loginPassword').value
            })
        });

        if (response.ok) {
            const data = await response.json();
            localStorage.setItem('token', data.accessToken);
            localStorage.setItem('user', JSON.stringify({
                username: data.username,
                email: data.email
            }));
            currentUser = {
                username: data.username,
                email: data.email
            };
            loginModal.style.display = 'none';
            document.getElementById('loginForm').reset();
            updateAuthUI(true);
            loadItems(); // Reload items with auth token
            showToast('Successfully logged in!', 'success');
        } else {
            const error = await response.text();
            showToast(error, 'error');
        }
    } catch (error) {
        showToast('Error during login', 'error');
    }
}

// Handle signup
async function handleSignup(e) {
    e.preventDefault();
    const signupModal = document.getElementById('signupModal');
    
    try {
        const response = await fetch('/api/auth/signup', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                username: document.getElementById('signupUsername').value,
                email: document.getElementById('signupEmail').value,
                password: document.getElementById('signupPassword').value
            })
        });

        if (response.ok) {
            signupModal.style.display = 'none';
            document.getElementById('signupForm').reset();
            showToast('Successfully registered! Please log in.', 'success');
            document.getElementById('loginBtn').click(); // Open login modal
        } else {
            const error = await response.text();
            showToast(error, 'error');
        }
    } catch (error) {
        showToast('Error during signup', 'error');
    }
}

// Handle logout
function handleLogout() {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    currentUser = null;
    updateAuthUI(false);
    loadItems(); // Reload items without auth token
    showToast('Successfully logged out!', 'success');
}

// Event listeners
document.getElementById('loginForm').addEventListener('submit', handleLogin);
document.getElementById('signupForm').addEventListener('submit', handleSignup);
document.getElementById('logoutBtn').addEventListener('click', handleLogout);

// Initialize auth state
checkAuth();
