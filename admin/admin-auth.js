// ========================================
// AUTENTICAÇÃO DO ADMIN
// ========================================

// E-mail e senha do administrador (ALTERE PARA SUAS CREDENCIAIS)
const ADMIN_CREDENTIALS = {
    email: 'admin@joaovcantuaria.com',
    password: 'Admin@2026' // ALTERE ESTA SENHA!
};

// Elementos do DOM
const adminLoginForm = document.getElementById('adminLoginForm');
const adminMessage = document.getElementById('adminMessage');

// Toggle password
const togglePasswordButtons = document.querySelectorAll('.toggle-password');
togglePasswordButtons.forEach(button => {
    button.addEventListener('click', () => {
        const targetId = button.getAttribute('data-target');
        const input = document.getElementById(targetId);
        const icon = button.querySelector('i');
        
        if (input.type === 'password') {
            input.type = 'text';
            icon.classList.remove('fa-eye');
            icon.classList.add('fa-eye-slash');
        } else {
            input.type = 'password';
            icon.classList.remove('fa-eye-slash');
            icon.classList.add('fa-eye');
        }
    });
});

// Mostrar mensagem
function showAdminMessage(message, type = 'error') {
    adminMessage.textContent = message;
    adminMessage.className = `auth-message ${type} show`;
    
    setTimeout(() => {
        adminMessage.classList.remove('show');
    }, 5000);
}

// Login do Admin
if (adminLoginForm) {
    adminLoginForm.addEventListener('submit', async (e) => {
        e.preventDefault();
        
        const email = document.getElementById('adminEmail').value.trim();
        const password = document.getElementById('adminPassword').value;
        const remember = document.getElementById('rememberAdmin').checked;
        
        // Validar credenciais
        if (email === ADMIN_CREDENTIALS.email && password === ADMIN_CREDENTIALS.password) {
            showAdminMessage('Login realizado! Redirecionando...', 'success');
            
            // Salvar sessão
            const adminData = {
                email: email,
                role: 'admin',
                loginTime: new Date().toISOString()
            };
            
            if (remember) {
                localStorage.setItem('adminToken', 'admin-token-' + Date.now());
                localStorage.setItem('adminData', JSON.stringify(adminData));
            } else {
                sessionStorage.setItem('adminToken', 'admin-token-' + Date.now());
                sessionStorage.setItem('adminData', JSON.stringify(adminData));
            }
            
            // Redirecionar para dashboard
            setTimeout(() => {
                window.location.href = 'admin-dashboard.html';
            }, 1000);
        } else {
            showAdminMessage('E-mail ou senha incorretos!', 'error');
        }
    });
}

// Verificar se admin está logado
function checkAdminAuth() {
    const token = localStorage.getItem('adminToken') || sessionStorage.getItem('adminToken');
    
    if (!token && window.location.pathname.includes('admin-dashboard.html')) {
        window.location.href = 'admin-login.html';
        return false;
    }
    
    return true;
}

// Verificar ao carregar a página
checkAdminAuth();

console.log('Sistema de autenticação admin carregado! 🔐');
console.log('⚠️ IMPORTANTE: Altere as credenciais padrão em admin-auth.js');
