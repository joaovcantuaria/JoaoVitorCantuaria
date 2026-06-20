// ========================================
// AUTENTICAÇÃO DO ADMIN COM SUPABASE
// ========================================

// ⚠️ IMPORTANTE: Após o primeiro login, altere sua senha na área de configurações
// E-mail padrão do admin (você pode alterar depois)
const DEFAULT_ADMIN_EMAIL = 'admin@joaovcantuaria.com';

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

// Verificar se usuário é admin
async function isUserAdmin(userId) {
    try {
        // Buscar dados do usuário
        const { data: userData, error } = await supabase
            .from('usuarios')
            .select('is_admin')
            .eq('id', userId)
            .single();
        
        if (error) {
            console.error('Erro ao verificar admin:', error);
            return false;
        }
        
        return userData?.is_admin === true;
    } catch (error) {
        console.error('Erro ao verificar admin:', error);
        return false;
    }
}

// Login do Admin com Supabase
if (adminLoginForm) {
    adminLoginForm.addEventListener('submit', async (e) => {
        e.preventDefault();
        
        const email = document.getElementById('adminEmail').value.trim();
        const password = document.getElementById('adminPassword').value;
        const remember = document.getElementById('rememberAdmin').checked;
        
        try {
            showAdminMessage('Validando credenciais...', 'success');
            
            // 1. Fazer login no Supabase
            const { data: authData, error: authError } = await supabase.auth.signInWithPassword({
                email: email,
                password: password
            });
            
            if (authError) {
                throw new Error('E-mail ou senha incorretos');
            }
            
            // 2. Verificar se é admin
            const isAdmin = await isUserAdmin(authData.user.id);
            
            if (!isAdmin) {
                // Fazer logout se não for admin
                await supabase.auth.signOut();
                throw new Error('Acesso negado. Esta área é restrita ao administrador.');
            }
            
            // 3. Salvar sessão de admin
            const adminData = {
                id: authData.user.id,
                email: authData.user.email,
                role: 'admin',
                loginTime: new Date().toISOString()
            };
            
            if (remember) {
                localStorage.setItem('adminToken', authData.session.access_token);
                localStorage.setItem('adminData', JSON.stringify(adminData));
            } else {
                sessionStorage.setItem('adminToken', authData.session.access_token);
                sessionStorage.setItem('adminData', JSON.stringify(adminData));
            }
            
            showAdminMessage('Login realizado! Redirecionando...', 'success');
            
            // 4. Redirecionar para dashboard
            setTimeout(() => {
                window.location.href = 'admin-dashboard.html';
            }, 1000);
            
        } catch (error) {
            console.error('Erro no login admin:', error);
            showAdminMessage(error.message || 'Erro ao fazer login', 'error');
        }
    });
}

// Verificar se admin está logado
async function checkAdminAuth() {
    const token = localStorage.getItem('adminToken') || sessionStorage.getItem('adminToken');
    
    if (!token && window.location.pathname.includes('admin-dashboard.html')) {
        window.location.href = 'admin-login.html';
        return false;
    }
    
    // Verificar sessão ativa no Supabase
    if (token) {
        const { data: { session } } = await supabase.auth.getSession();
        
        if (!session) {
            // Token expirado, fazer logout
            localStorage.removeItem('adminToken');
            localStorage.removeItem('adminData');
            sessionStorage.removeItem('adminToken');
            sessionStorage.removeItem('adminData');
            
            if (window.location.pathname.includes('admin-dashboard.html')) {
                window.location.href = 'admin-login.html';
            }
            return false;
        }
    }
    
    return true;
}

// Verificar ao carregar a página
checkAdminAuth();

console.log('Sistema de autenticação admin com Supabase carregado! 🔐');
console.log('📧 E-mail admin padrão:', DEFAULT_ADMIN_EMAIL);
console.log('⚠️ LEMBRE-SE: Criar usuário admin no banco de dados com is_admin = true');
