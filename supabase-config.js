// ========================================
// CONFIGURAÇÃO DO SUPABASE
// João V. Cantuária - Publicidade e Fotografia
// ========================================

// ⚠️ IMPORTANTE: SUBSTITUA COM SUAS CREDENCIAIS DO SUPABASE
// 
// Para obter suas credenciais:
// 1. Acesse: https://supabase.com
// 2. Faça login e vá no seu projeto
// 3. Menu lateral: Settings (ícone de engrenagem)
// 4. Clique em "API"
// 5. Copie "Project URL" e "anon public key"

const SUPABASE_URL = 'https://gzetvnqnqmjrkcfsjxyk.supabase.co';
const SUPABASE_ANON_KEY = 'sb_publishable_i5bIlH9xOl7Oeh3MEVnuXg_F7Zp3aZ5';

// Verificar se o SDK foi carregado
if (typeof window.supabase === 'undefined') {
    console.error('❌ ERRO CRÍTICO: SDK do Supabase não foi carregado!');
    console.error('📝 Certifique-se que o script do SDK está ANTES deste arquivo no HTML');
    alert('ERRO: SDK do Supabase não carregado. Verifique o console (F12).');
}

// Inicializar cliente Supabase
let supabase = null;

try {
    if (window.supabase && window.supabase.createClient) {
        supabase = window.supabase.createClient(SUPABASE_URL, SUPABASE_ANON_KEY);
        console.log('✅ Supabase inicializado com sucesso!');
        console.log('🔗 URL do projeto:', SUPABASE_URL);
    } else {
        console.error('❌ window.supabase.createClient não está disponível');
    }
} catch (error) {
    console.error('❌ Erro ao inicializar Supabase:', error);
    alert('Erro ao conectar com Supabase: ' + error.message);
}

// Exportar para uso global
window.supabaseClient = supabase;
