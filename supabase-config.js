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

const SUPABASE_URL = 'https://gzetvnqnqmjrkcfsjxyk.supabase.co'; // ← COLE SUA URL AQUI
const SUPABASE_ANON_KEY = 'sb_publishable_i5bIlH9xOl7Oeh3MEVnuXg_F7Zp3aZ5'; // ← COLE SUA KEY AQUI

// Verificar se as credenciais foram alteradas
if (SUPABASE_URL === 'https://gzetvnqnqmjrkcfsjxyk.supabase.co') {
    console.error('⚠️ ERRO: Você precisa configurar suas credenciais do Supabase!');
    console.error('📝 Edite o arquivo supabase-config.js e cole suas credenciais.');
    alert('Configure suas credenciais do Supabase no arquivo supabase-config.js');
}

// Inicializar cliente Supabase
const supabase = window.supabase.createClient(SUPABASE_URL, SUPABASE_ANON_KEY);

console.log('✅ Supabase inicializado!');
console.log('🔗 URL do projeto:', SUPABASE_URL);

// Exportar para uso global (opcional)
window.supabaseClient = supabase;
