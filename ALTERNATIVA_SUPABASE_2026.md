# 🚀 Alternativa Moderna: Supabase (2026)

## Solução Mais Simples e Atualizada

---

## Por Que Supabase em 2026?

- ✅ **Interface mais intuitiva** que Firebase
- ✅ **PostgreSQL** (banco de dados SQL familiar)
- ✅ **Dashboard visual** para gerenciar dados
- ✅ **Autenticação integrada** pronta
- ✅ **API REST automática** - sem código extra
- ✅ **Gratuito** para começar (500MB database, 1GB storage)
- ✅ **Documentação atualizada** para 2026

---

## 🎯 Tutorial Supabase - Passo a Passo

### PASSO 1: Criar Conta (2 min)

1. Acesse: **https://supabase.com**
2. Clique em **"Start your project"**
3. Faça login com:
   - GitHub (recomendado)
   - OU Google
   - OU E-mail

✅ **Conta criada!**

---

### PASSO 2: Criar Projeto (3 min)

1. Clique em **"New project"**

2. Preencha:
   ```
   Organization: [Sua organização ou crie nova]
   Project name: joaovcantuaria
   Database Password: [Crie uma senha forte]
   Region: South America (São Paulo)
   ```

3. Clique em **"Create new project"**

4. **Aguarde 2 minutos** - projeto sendo criado

✅ **Projeto criado!**

---

### PASSO 3: Criar Tabelas (5 min)

#### 3.1 Acessar Table Editor

1. No menu lateral: **"Table Editor"**
2. Clique em **"Create a new table"**

#### 3.2 Criar Tabela de Usuários

```
Table name: usuarios

Colunas (clique em "Add column" para cada):

1. id (já vem criado - deixe como está)
   - Type: uuid
   - Default: gen_random_uuid()
   - Primary key: ✓

2. email
   - Type: text
   - Is nullable: unchecked

3. nome_completo
   - Type: text
   - Is nullable: unchecked

4. telefone
   - Type: text
   - Is nullable: checked

5. empresa
   - Type: text
   - Is nullable: checked

6. created_at (já vem criado - deixe como está)
   - Type: timestamp
   - Default: now()
```

Clique em **"Save"**

#### 3.3 Criar Tabela de Projetos

Repita o processo para criar:

```
Table name: projetos

Colunas:
1. id (uuid, primary key, auto)
2. cliente_id (uuid) - referência ao usuário
3. titulo (text)
4. descricao (text, nullable)
5. status (text)
6. progresso (int4) - 0 a 100
7. created_at (timestamp, now())
```

#### 3.4 Criar Tabela de Provas de Fotos

```
Table name: provas_fotos

Colunas:
1. id (uuid, primary key, auto)
2. projeto_id (uuid)
3. foto_url (text)
4. selecionada (boolean, default: false)
5. created_at (timestamp, now())
```

✅ **Tabelas criadas!**

---

### PASSO 4: Configurar Autenticação (2 min)

1. Menu lateral: **"Authentication"**
2. Já vem ativado! ✅
3. Veja as configurações em **"Settings"** → **"Auth"**
4. **Email confirmação:** Pode desativar para testes
   - Vá em: Authentication → Providers → Email
   - Desmarque "Confirm email"

✅ **Auth configurada!**

---

### PASSO 5: Obter Credenciais (1 min)

1. Menu lateral: **"Settings"** (ícone de engrenagem)
2. Clique em **"API"**

3. **Copie estas 2 informações:**

```
Project URL: https://seu-projeto.supabase.co
anon public key: eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...
```

✅ **Credenciais obtidas!**

---

### PASSO 6: Integrar no Site (10 min)

#### 6.1 Criar Arquivo de Configuração

Crie: `supabase-config.js`

```javascript
// ========================================
// CONFIGURAÇÃO DO SUPABASE
// ========================================

// SUAS CREDENCIAIS (cole aqui)
const SUPABASE_URL = 'https://seu-projeto.supabase.co';
const SUPABASE_ANON_KEY = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...';

// Inicializar Supabase
const supabase = window.supabase.createClient(SUPABASE_URL, SUPABASE_ANON_KEY);

console.log('✅ Supabase conectado!');
```

#### 6.2 Adicionar SDK ao HTML

**Em `login.html`, `cadastro.html` e `area-cliente.html`:**

Adicione ANTES do `</body>`:

```html
<!-- Supabase SDK -->
<script src="https://cdn.jsdelivr.net/npm/@supabase/supabase-js@2"></script>

<!-- Sua configuração -->
<script src="supabase-config.js"></script>

<!-- Seus scripts -->
<script src="auth.js"></script>
```

#### 6.3 Atualizar auth.js

Substitua as funções no `auth.js`:

```javascript
// ========================================
// CADASTRO COM SUPABASE
// ========================================
async function registerUser(userData) {
    try {
        // 1. Criar usuário na autenticação
        const { data: authData, error: authError } = await supabase.auth.signUp({
            email: userData.email,
            password: userData.password
        });

        if (authError) throw authError;

        // 2. Salvar dados adicionais na tabela usuarios
        const { error: dbError } = await supabase
            .from('usuarios')
            .insert([{
                id: authData.user.id,
                email: userData.email,
                nome_completo: `${userData.firstName} ${userData.lastName}`,
                telefone: userData.phone,
                empresa: userData.company || ''
            }]);

        if (dbError) throw dbError;

        return {
            success: true,
            message: 'Cadastro realizado! Você pode fazer login.'
        };

    } catch (error) {
        console.error('Erro no cadastro:', error);
        return {
            success: false,
            message: error.message || 'Erro ao criar conta'
        };
    }
}

// ========================================
// LOGIN COM SUPABASE
// ========================================
async function loginUser(email, password) {
    try {
        // Fazer login
        const { data: authData, error: authError } = await supabase.auth.signInWithPassword({
            email: email,
            password: password
        });

        if (authError) throw authError;

        // Buscar dados do usuário
        const { data: userData, error: userError } = await supabase
            .from('usuarios')
            .select('*')
            .eq('id', authData.user.id)
            .single();

        if (userError) throw userError;

        return {
            success: true,
            user: {
                id: authData.user.id,
                email: authData.user.email,
                name: userData.nome_completo,
                phone: userData.telefone,
                company: userData.empresa
            },
            token: authData.session.access_token
        };

    } catch (error) {
        console.error('Erro no login:', error);
        return {
            success: false,
            message: error.message || 'Erro ao fazer login'
        };
    }
}

// ========================================
// RECUPERAR SENHA
// ========================================
async function sendPasswordReset(email) {
    try {
        const { error } = await supabase.auth.resetPasswordForEmail(email, {
            redirectTo: window.location.origin + '/reset-password.html'
        });

        if (error) throw error;

        return {
            success: true,
            message: 'E-mail de recuperação enviado!'
        };

    } catch (error) {
        return {
            success: false,
            message: error.message
        };
    }
}

// ========================================
// LOGOUT
// ========================================
async function logout() {
    await supabase.auth.signOut();
    localStorage.clear();
    sessionStorage.clear();
    window.location.href = 'login.html';
}

// ========================================
// VERIFICAR SE ESTÁ LOGADO
// ========================================
async function checkAuth() {
    const { data: { session } } = await supabase.auth.getSession();
    
    if (!session && window.location.pathname.includes('area-cliente.html')) {
        window.location.href = 'login.html';
        return false;
    }
    
    return !!session;
}

// Executar verificação
checkAuth();
```

---

### PASSO 7: Testar (5 min)

#### 7.1 Teste de Cadastro

1. Abra `cadastro.html` no navegador
2. Preencha o formulário
3. Use um e-mail real
4. Crie uma senha (6+ caracteres)
5. Clique em "Criar Conta"

**Verificar:**
- No Supabase: Authentication → Users
- Deve aparecer o novo usuário!

#### 7.2 Teste de Login

1. Abra `login.html`
2. Use o e-mail e senha cadastrados
3. Clique em "Entrar"

**Deve:**
- Fazer login com sucesso
- Redirecionar para área do cliente

#### 7.3 Ver Dados no Supabase

1. Supabase: Table Editor
2. Clique na tabela **"usuarios"**
3. Veja seus dados cadastrados!

✅ **Tudo funcionando!**

---

## 🎨 Vantagens do Supabase

### Dashboard Visual

Você pode:
- ✅ Ver todos os dados em tabelas
- ✅ Adicionar/editar/excluir registros manualmente
- ✅ Fazer queries SQL
- ✅ Ver logs em tempo real

### API Automática

```javascript
// Buscar projetos do usuário
const { data } = await supabase
    .from('projetos')
    .select('*')
    .eq('cliente_id', userId);

// Adicionar projeto
const { data } = await supabase
    .from('projetos')
    .insert([{
        cliente_id: userId,
        titulo: 'Ensaio Corporativo',
        status: 'em_andamento',
        progresso: 0
    }]);

// Atualizar projeto
const { data } = await supabase
    .from('projetos')
    .update({ progresso: 50 })
    .eq('id', projectId);
```

### Storage para Fotos

```javascript
// Upload de foto
const { data, error } = await supabase.storage
    .from('fotos')
    .upload('projeto/foto.jpg', file);

// URL pública
const { data: publicUrl } = supabase.storage
    .from('fotos')
    .getPublicUrl('projeto/foto.jpg');
```

---

## 🔒 Configurar Segurança (Row Level Security)

### Passo 1: Ativar RLS

1. Table Editor → Selecione tabela
2. Clique em **"RLS disabled"**
3. Ative: **"Enable RLS"**

### Passo 2: Criar Políticas

**Para tabela `usuarios`:**

```sql
-- Usuários só veem seus próprios dados
CREATE POLICY "Usuários veem apenas seus dados"
ON usuarios FOR SELECT
USING (auth.uid() = id);

-- Usuários só atualizam seus próprios dados
CREATE POLICY "Usuários atualizam apenas seus dados"
ON usuarios FOR UPDATE
USING (auth.uid() = id);
```

**Para tabela `projetos`:**

```sql
-- Usuários veem apenas seus projetos
CREATE POLICY "Usuários veem apenas seus projetos"
ON projetos FOR SELECT
USING (auth.uid() = cliente_id);
```

---

## 📊 Exemplo Completo: Gerenciar Projetos

```javascript
// ========================================
// CRIAR PROJETO (Admin)
// ========================================
async function criarProjeto(dadosProjeto) {
    const { data, error } = await supabase
        .from('projetos')
        .insert([{
            cliente_id: dadosProjeto.clienteId,
            titulo: dadosProjeto.titulo,
            descricao: dadosProjeto.descricao,
            status: 'aguardando',
            progresso: 0
        }])
        .select();
    
    if (error) {
        console.error('Erro:', error);
        return null;
    }
    
    return data[0];
}

// ========================================
// LISTAR PROJETOS DO CLIENTE
// ========================================
async function listarMeusProjetos() {
    const { data: { user } } = await supabase.auth.getUser();
    
    const { data, error } = await supabase
        .from('projetos')
        .select('*')
        .eq('cliente_id', user.id)
        .order('created_at', { ascending: false });
    
    if (error) {
        console.error('Erro:', error);
        return [];
    }
    
    return data;
}

// ========================================
// ATUALIZAR PROGRESSO
// ========================================
async function atualizarProgresso(projectId, novoProgresso) {
    const { data, error } = await supabase
        .from('projetos')
        .update({ progresso: novoProgresso })
        .eq('id', projectId)
        .select();
    
    if (error) {
        console.error('Erro:', error);
        return false;
    }
    
    return true;
}
```

---

## 💰 Custo Supabase (2026)

### Plano Gratuito:
- ✅ 500 MB Database
- ✅ 1 GB Storage
- ✅ 2 GB Bandwidth
- ✅ 50.000 usuários ativos/mês
- ✅ **Suficiente para começar!**

### Plano Pro ($25/mês):
- 8 GB Database
- 100 GB Storage
- Sem limite de bandwidth
- Backups diários

---

## ✅ Checklist Final

- [ ] Conta Supabase criada
- [ ] Projeto criado
- [ ] Tabelas criadas (usuarios, projetos, provas_fotos)
- [ ] Credenciais copiadas
- [ ] SDK adicionado nos HTMLs
- [ ] `supabase-config.js` criado
- [ ] `auth.js` atualizado
- [ ] Teste de cadastro funcionou
- [ ] Teste de login funcionou
- [ ] Dados aparecem no Supabase

---

## 🎉 Pronto!

Agora você tem um backend **moderno, simples e funcional** em 2026!

**Vantagens:**
- ✅ Mais fácil que Firebase
- ✅ Interface visual intuitiva
- ✅ SQL familiar
- ✅ Documentação atualizada
- ✅ API REST automática

---

## 📞 Próximo Passo

Teste agora:
1. Crie conta no Supabase
2. Siga os passos acima
3. **Me avise se tiver alguma dúvida!**

Posso te ajudar com:
- Criar as queries SQL
- Configurar upload de fotos
- Implementar funcionalidades específicas
- Resolver erros

**Supabase é MUITO mais simples que Firebase em 2026!** 🚀

---

*Tutorial atualizado para Junho de 2026* ✨
