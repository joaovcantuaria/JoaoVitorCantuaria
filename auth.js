// ========================================
// SISTEMA DE AUTENTICAÇÃO
// ========================================

// Configuração (substitua com seu backend real)
const API_URL = 'https://seu-backend.com/api'; // Altere para sua API

// Elementos do DOM
const loginForm = document.getElementById('loginForm');
const registerForm = document.getElementById('registerForm');
const forgotPasswordForm = document.getElementById('forgotPasswordForm');
const forgotPasswordLink = document.getElementById('forgotPasswordLink');
const forgotPasswordModal = document.getElementById('forgotPasswordModal');
const closeForgotModal = document.getElementById('closeForgotModal');

// ========================================
// TOGGLE DE SENHA (Mostrar/Ocultar)
// ========================================
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

// ========================================
// FUNÇÕES DE UTILIDADE
// ========================================

// Mostrar mensagem
function showMessage(message, type = 'error') {
    const messageElement = document.getElementById('authMessage');
    messageElement.textContent = message;
    messageElement.className = `auth-message ${type} show`;
    
    // Auto-ocultar após 5 segundos
    setTimeout(() => {
        messageElement.classList.remove('show');
    }, 5000);
}

// Validar e-mail
function validateEmail(email) {
    const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return re.test(email);
}

// Validar senha
function validatePassword(password) {
    return password.length >= 6;
}

// Validar telefone brasileiro
function validatePhone(phone) {
    const re = /^[\d\s()-]+$/;
    return re.test(phone) && phone.replace(/\D/g, '').length >= 10;
}

// ========================================
// LOGIN
// ========================================
if (loginForm) {
    loginForm.addEventListener('submit', async (e) => {
        e.preventDefault();
        
        const email = document.getElementById('loginEmail').value.trim();
        const password = document.getElementById('loginPassword').value;
        const remember = document.getElementById('rememberMe').checked;
        
        // Validações
        if (!validateEmail(email)) {
            showMessage('Por favor, insira um e-mail válido.', 'error');
            return;
        }
        
        if (!validatePassword(password)) {
            showMessage('A senha deve ter no mínimo 6 caracteres.', 'error');
            return;
        }
        
        // Simulação de login (substitua com chamada real à API)
        try {
            showMessage('Fazendo login...', 'success');
            
            // Simular chamada à API
            const response = await simulateAPICall({
                email,
                password,
                remember
            });
            
            if (response.success) {
                // Salvar token
                if (remember) {
                    localStorage.setItem('authToken', response.token);
                    localStorage.setItem('userData', JSON.stringify(response.user));
                } else {
                    sessionStorage.setItem('authToken', response.token);
                    sessionStorage.setItem('userData', JSON.stringify(response.user));
                }
                
                showMessage('Login realizado com sucesso! Redirecionando...', 'success');
                
                // Redirecionar para área do cliente
                setTimeout(() => {
                    window.location.href = 'area-cliente.html';
                }, 1500);
            } else {
                showMessage(response.message || 'Erro ao fazer login.', 'error');
            }
        } catch (error) {
            showMessage('Erro ao conectar com o servidor. Tente novamente.', 'error');
            console.error('Erro:', error);
        }
    });
}

// ========================================
// CADASTRO
// ========================================
if (registerForm) {
    registerForm.addEventListener('submit', async (e) => {
        e.preventDefault();
        
        const firstName = document.getElementById('firstName').value.trim();
        const lastName = document.getElementById('lastName').value.trim();
        const email = document.getElementById('registerEmail').value.trim();
        const phone = document.getElementById('phone').value.trim();
        const company = document.getElementById('company').value.trim();
        const password = document.getElementById('registerPassword').value;
        const confirmPassword = document.getElementById('confirmPassword').value;
        const acceptTerms = document.getElementById('acceptTerms').checked;
        
        // Validações
        if (!firstName || !lastName) {
            showMessage('Por favor, preencha seu nome completo.', 'error');
            return;
        }
        
        if (!validateEmail(email)) {
            showMessage('Por favor, insira um e-mail válido.', 'error');
            return;
        }
        
        if (!validatePhone(phone)) {
            showMessage('Por favor, insira um telefone válido.', 'error');
            return;
        }
        
        if (!validatePassword(password)) {
            showMessage('A senha deve ter no mínimo 6 caracteres.', 'error');
            return;
        }
        
        if (password !== confirmPassword) {
            showMessage('As senhas não coincidem.', 'error');
            return;
        }
        
        if (!acceptTerms) {
            showMessage('Você precisa aceitar os termos de uso.', 'error');
            return;
        }
        
        // Simulação de cadastro (substitua com chamada real à API)
        try {
            showMessage('Criando sua conta...', 'success');
            
            // Simular chamada à API
            const response = await simulateAPICall({
                firstName,
                lastName,
                email,
                phone,
                company,
                password
            }, 1500);
            
            if (response.success) {
                showMessage('Conta criada com sucesso! Redirecionando para login...', 'success');
                
                // Redirecionar para login
                setTimeout(() => {
                    window.location.href = 'login.html';
                }, 2000);
            } else {
                showMessage(response.message || 'Erro ao criar conta.', 'error');
            }
        } catch (error) {
            showMessage('Erro ao conectar com o servidor. Tente novamente.', 'error');
            console.error('Erro:', error);
        }
    });
}

// ========================================
// RECUPERAÇÃO DE SENHA
// ========================================

// Abrir modal
if (forgotPasswordLink) {
    forgotPasswordLink.addEventListener('click', (e) => {
        e.preventDefault();
        forgotPasswordModal.classList.add('show');
    });
}

// Fechar modal
if (closeForgotModal) {
    closeForgotModal.addEventListener('click', () => {
        forgotPasswordModal.classList.remove('show');
    });
}

// Fechar modal ao clicar fora
if (forgotPasswordModal) {
    forgotPasswordModal.addEventListener('click', (e) => {
        if (e.target === forgotPasswordModal) {
            forgotPasswordModal.classList.remove('show');
        }
    });
}

// Formulário de recuperação
if (forgotPasswordForm) {
    forgotPasswordForm.addEventListener('submit', async (e) => {
        e.preventDefault();
        
        const email = document.getElementById('forgotEmail').value.trim();
        
        if (!validateEmail(email)) {
            alert('Por favor, insira um e-mail válido.');
            return;
        }
        
        try {
            // Simular chamada à API
            const response = await simulateAPICall({ email }, 1000);
            
            if (response.success) {
                alert('Instruções enviadas para seu e-mail!');
                forgotPasswordModal.classList.remove('show');
                forgotPasswordForm.reset();
            } else {
                alert('Erro ao enviar instruções. Verifique o e-mail.');
            }
        } catch (error) {
            alert('Erro ao conectar com o servidor. Tente novamente.');
            console.error('Erro:', error);
        }
    });
}

// ========================================
// LOGIN SOCIAL (Simulado)
// ========================================
const socialButtons = document.querySelectorAll('.btn-social');

socialButtons.forEach(button => {
    button.addEventListener('click', () => {
        const provider = button.classList.contains('btn-google') ? 'Google' : 'Facebook';
        showMessage(`Login com ${provider} será implementado em breve!`, 'success');
        
        // Aqui você implementaria a integração real com Google/Facebook OAuth
        // Exemplo: Google Sign-In, Facebook Login SDK
    });
});

// ========================================
// SIMULAÇÃO DE API (Remova em produção)
// ========================================
function simulateAPICall(data, delay = 1000) {
    return new Promise((resolve) => {
        setTimeout(() => {
            // Simulação: sempre retorna sucesso
            // Em produção, substitua com fetch() real para sua API
            
            if (data.email && data.password) {
                // Login
                resolve({
                    success: true,
                    token: 'fake-jwt-token-' + Date.now(),
                    user: {
                        id: 1,
                        name: 'Usuário Teste',
                        email: data.email
                    }
                });
            } else if (data.firstName) {
                // Cadastro
                resolve({
                    success: true,
                    message: 'Cadastro realizado com sucesso!'
                });
            } else {
                // Recuperação de senha
                resolve({
                    success: true,
                    message: 'E-mail de recuperação enviado!'
                });
            }
        }, delay);
    });
}

// ========================================
// EXEMPLO DE INTEGRAÇÃO REAL COM API
// ========================================
/*
async function loginUser(email, password) {
    try {
        const response = await fetch(`${API_URL}/auth/login`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ email, password })
        });
        
        const data = await response.json();
        
        if (!response.ok) {
            throw new Error(data.message || 'Erro ao fazer login');
        }
        
        return data;
    } catch (error) {
        throw error;
    }
}

async function registerUser(userData) {
    try {
        const response = await fetch(`${API_URL}/auth/register`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(userData)
        });
        
        const data = await response.json();
        
        if (!response.ok) {
            throw new Error(data.message || 'Erro ao criar conta');
        }
        
        return data;
    } catch (error) {
        throw error;
    }
}
*/

// ========================================
// VERIFICAR SE USUÁRIO JÁ ESTÁ LOGADO
// ========================================
function checkAuth() {
    const token = localStorage.getItem('authToken') || sessionStorage.getItem('authToken');
    
    if (token && (window.location.pathname.includes('login.html') || window.location.pathname.includes('cadastro.html'))) {
        // Se já está logado e tenta acessar login/cadastro, redireciona
        window.location.href = 'area-cliente.html';
    }
}

// Verificar ao carregar a página
checkAuth();

console.log('Sistema de autenticação carregado! 🔐');
