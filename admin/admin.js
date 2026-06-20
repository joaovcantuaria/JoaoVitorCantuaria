// ========================================
// PAINEL ADMINISTRATIVO - JAVASCRIPT
// ========================================

// Verificar autenticação
function checkAdminAuthentication() {
    const token = localStorage.getItem('adminToken') || sessionStorage.getItem('adminToken');
    
    if (!token) {
        window.location.href = 'admin-login.html';
        return false;
    }
    
    return true;
}

// Executar verificação
if (!checkAdminAuthentication()) {
    throw new Error('Não autenticado');
}

// ========================================
// ELEMENTOS DO DOM
// ========================================
const sidebar = document.getElementById('sidebar');
const sidebarToggle = document.getElementById('sidebarToggle');
const mobileMenuBtn = document.getElementById('mobileMenuBtn');
const navItems = document.querySelectorAll('.nav-item');
const contentSections = document.querySelectorAll('.content-section');
const logoutBtn = document.getElementById('logoutBtn');
const pageTitle = document.querySelector('.page-title');

// ========================================
// NAVEGAÇÃO
// ========================================

// Toggle sidebar mobile
if (mobileMenuBtn) {
    mobileMenuBtn.addEventListener('click', () => {
        sidebar.classList.toggle('active');
    });
}

if (sidebarToggle) {
    sidebarToggle.addEventListener('click', () => {
        sidebar.classList.remove('active');
    });
}

// Navegação entre seções
navItems.forEach(item => {
    item.addEventListener('click', (e) => {
        e.preventDefault();
        
        const sectionName = item.getAttribute('data-section');
        
        // Atualizar menu ativo
        navItems.forEach(nav => nav.classList.remove('active'));
        item.classList.add('active');
        
        // Mostrar seção correspondente
        contentSections.forEach(section => {
            section.classList.remove('active');
        });
        
        const targetSection = document.getElementById(`${sectionName}-section`);
        if (targetSection) {
            targetSection.classList.add('active');
        }
        
        // Atualizar título
        const titles = {
            'dashboard': 'Dashboard Admin',
            'clientes': 'Gerenciar Clientes',
            'projetos': 'Gerenciar Projetos',
            'provas': 'Provas de Fotos',
            'financeiro': 'Gestão Financeira',
            'portfolio': 'Portfólio do Site',
            'depoimentos': 'Depoimentos',
            'configuracoes': 'Configurações'
        };
        
        if (pageTitle) {
            pageTitle.textContent = titles[sectionName] || 'Dashboard Admin';
        }
        
        // Fechar sidebar no mobile
        if (window.innerWidth <= 1024) {
            sidebar.classList.remove('active');
        }
        
        window.scrollTo({ top: 0, behavior: 'smooth' });
    });
});

// ========================================
// LOGOUT
// ========================================
if (logoutBtn) {
    logoutBtn.addEventListener('click', () => {
        if (confirm('Deseja realmente sair do painel admin?')) {
            localStorage.removeItem('adminToken');
            localStorage.removeItem('adminData');
            sessionStorage.removeItem('adminToken');
            sessionStorage.removeItem('adminData');
            window.location.href = 'admin-login.html';
        }
    });
}

// ========================================
// TABS
// ========================================
const tabButtons = document.querySelectorAll('.tab-button');
const tabContents = document.querySelectorAll('.tab-content');

tabButtons.forEach(button => {
    button.addEventListener('click', () => {
        const tabName = button.getAttribute('data-tab');
        
        // Atualizar botões
        tabButtons.forEach(btn => btn.classList.remove('active'));
        button.classList.add('active');
        
        // Mostrar conteúdo
        tabContents.forEach(content => {
            content.classList.remove('active');
        });
        
        const targetContent = document.getElementById(`tab-${tabName}`);
        if (targetContent) {
            targetContent.classList.add('active');
        }
    });
});

// ========================================
// MODAIS
// ========================================

function openModal(modalId) {
    const modal = document.getElementById(modalId);
    if (modal) {
        modal.classList.add('show');
    }
}

function closeModal(modalId) {
    const modal = document.getElementById(modalId);
    if (modal) {
        modal.classList.remove('show');
    }
}

// Fechar modal ao clicar fora
document.addEventListener('click', (e) => {
    if (e.target.classList.contains('modal-overlay')) {
        e.target.classList.remove('show');
    }
});

// Botões para abrir modais
document.getElementById('addProjectBtn')?.addEventListener('click', () => {
    openModal('addProjectModal');
});

document.getElementById('addProofBtn')?.addEventListener('click', () => {
    openModal('addProofModal');
});

document.getElementById('addClientBtn')?.addEventListener('click', () => {
    alert('Modal de adicionar cliente será implementado');
});

document.getElementById('addTransactionBtn')?.addEventListener('click', () => {
    alert('Modal de adicionar transação será implementado');
});

// ========================================
// UPLOAD DE PROVAS DE FOTOS
// ========================================

const uploadZone = document.getElementById('uploadZone');
const fileInput = document.getElementById('fileInput');
const imagePreviewGrid = document.getElementById('imagePreviewGrid');
const watermarkEnabled = document.getElementById('watermarkEnabled');
const watermarkSettings = document.getElementById('watermarkSettings');
let selectedFiles = [];

// Click na zona de upload
if (uploadZone) {
    uploadZone.addEventListener('click', () => {
        fileInput.click();
    });
    
    // Drag & Drop
    uploadZone.addEventListener('dragover', (e) => {
        e.preventDefault();
        uploadZone.classList.add('dragover');
    });
    
    uploadZone.addEventListener('dragleave', () => {
        uploadZone.classList.remove('dragover');
    });
    
    uploadZone.addEventListener('drop', (e) => {
        e.preventDefault();
        uploadZone.classList.remove('dragover');
        
        const files = Array.from(e.dataTransfer.files).filter(file => 
            file.type.startsWith('image/')
        );
        
        handleFileSelect(files);
    });
}

// Seleção de arquivos
if (fileInput) {
    fileInput.addEventListener('change', (e) => {
        const files = Array.from(e.target.files);
        handleFileSelect(files);
    });
}

// Processar arquivos selecionados
function handleFileSelect(files) {
    selectedFiles = [...selectedFiles, ...files];
    displayImagePreviews();
}

// Exibir previews das imagens
function displayImagePreviews() {
    imagePreviewGrid.innerHTML = '';
    
    selectedFiles.forEach((file, index) => {
        const reader = new FileReader();
        
        reader.onload = (e) => {
            const preview = document.createElement('div');
            preview.className = 'image-preview-item';
            preview.innerHTML = `
                <img src="${e.target.result}" alt="Preview ${index + 1}">
                <button class="image-preview-remove" onclick="removeImage(${index})">
                    <i class="fas fa-times"></i>
                </button>
            `;
            imagePreviewGrid.appendChild(preview);
        };
        
        reader.readAsDataURL(file);
    });
}

// Remover imagem
function removeImage(index) {
    selectedFiles.splice(index, 1);
    displayImagePreviews();
}

// Toggle marca d'água
if (watermarkEnabled) {
    watermarkEnabled.addEventListener('change', () => {
        if (watermarkSettings) {
            watermarkSettings.style.display = watermarkEnabled.checked ? 'block' : 'none';
        }
    });
}

// Upload das fotos
document.getElementById('uploadProofBtn')?.addEventListener('click', async () => {
    const client = document.getElementById('proofClient').value;
    const project = document.getElementById('proofProject').value;
    const watermark = watermarkEnabled.checked;
    const watermarkText = document.getElementById('watermarkText').value;
    
    if (!client || !project) {
        alert('Por favor, selecione cliente e projeto.');
        return;
    }
    
    if (selectedFiles.length === 0) {
        alert('Por favor, selecione pelo menos uma foto.');
        return;
    }
    
    // Aqui você implementaria o upload real para o Firebase Storage
    // Por enquanto, vamos simular
    alert(`Upload simulado:\n\nCliente: ${client}\nProjeto: ${project}\nFotos: ${selectedFiles.length}\nMarca d'água: ${watermark ? 'Sim' : 'Não'}\n\nEm produção, as fotos seriam enviadas para o Firebase Storage com proteção contra download.`);
    
    // Limpar e fechar
    selectedFiles = [];
    imagePreviewGrid.innerHTML = '';
    fileInput.value = '';
    closeModal('addProofModal');
});

// ========================================
// PROTEÇÃO DAS PROVAS DE FOTOS
// ========================================

// Prevenir clique direito nas imagens de prova
function protectProofImages() {
    const proofImages = document.querySelectorAll('.proof-image');
    
    proofImages.forEach(img => {
        // Desabilitar clique direito
        img.addEventListener('contextmenu', (e) => {
            e.preventDefault();
            return false;
        });
        
        // Desabilitar drag
        img.setAttribute('draggable', 'false');
        
        // Adicionar marca d'água via CSS
        img.style.position = 'relative';
    });
}

// ========================================
// DADOS DE EXEMPLO (SIMULAÇÃO)
// ========================================

// Carregar clientes de exemplo
function loadSampleClients() {
    // Em produção, isso viria do Firebase
    const clients = [
        {
            nome: 'Maria Silva',
            email: 'maria@email.com',
            telefone: '(11) 98765-4321',
            projetos: 3,
            cadastro: '15/06/2026'
        },
        {
            nome: 'João Santos',
            email: 'joao@email.com',
            telefone: '(11) 91234-5678',
            projetos: 2,
            cadastro: '10/06/2026'
        }
    ];
    
    return clients;
}

// ========================================
// INICIALIZAÇÃO
// ========================================

console.log('Painel administrativo carregado! 🎨');
console.log('Admin logado:', sessionStorage.getItem('adminData'));

// Carregar dados iniciais
protectProofImages();
