# 🎛️ Guia Completo - Painel Administrativo

## Como Usar o Painel Admin - João V. Cantuária

---

## 🔐 **IMPORTANTE - SEGURANÇA**

### Credenciais Padrão (ALTERE IMEDIATAMENTE!)

```
E-mail: admin@joaovcantuaria.com
Senha: Admin@2026
```

**⚠️ ESTAS SÃO CREDENCIAIS TEMPORÁRIAS!**

### Como Alterar a Senha

1. Abra o arquivo: `admin/admin-auth.js`
2. Localize as linhas 6-9:
```javascript
const ADMIN_CREDENTIALS = {
    email: 'admin@joaovcantuaria.com',
    password: 'Admin@2026' // ALTERE ESTA SENHA!
};
```
3. Substitua pelo seu e-mail e senha segura
4. Salve o arquivo

**Dica de Senha Segura:**
- Mínimo 12 caracteres
- Letras maiúsculas e minúsculas
- Números e símbolos
- Exemplo: `JVc@2026#Secure!`

---

## 🚀 Acessando o Painel

### Passo 1: Abrir o Painel
```
Arquivo: admin/admin-login.html
```

### Passo 2: Fazer Login
1. Digite seu e-mail admin
2. Digite sua senha
3. Marque "Manter conectado" (opcional)
4. Clique em "Acessar Painel"

### Passo 3: Dashboard
Você será redirecionado para o dashboard com todas as funcionalidades.

---

## 📊 Funcionalidades do Painel

### 1. 📈 **Dashboard (Visão Geral)**

**O que você vê:**
- Receita do mês
- Total de clientes
- Projetos ativos
- Provas pendentes
- Atividades recentes

**Como usar:**
- Acesse diariamente para visão geral
- Clique em "Atualizar" para dados mais recentes

---

### 2. 👥 **Gerenciar Clientes**

**Funcionalidades:**
- ✅ Ver lista de todos os clientes
- ✅ Buscar cliente por nome/e-mail
- ✅ Ver detalhes do cliente
- ✅ Editar informações
- ✅ Excluir cliente (com confirmação)

**Como adicionar cliente:**
1. Clique em "Adicionar Cliente"
2. Preencha: Nome, E-mail, Telefone, Empresa
3. Clique em "Salvar"

**Dica:** Clientes também podem se cadastrar pelo site!

---

### 3. 📁 **Gerenciar Projetos**

**Funcionalidades:**
- ✅ Criar novo projeto
- ✅ Atribuir a um cliente
- ✅ Upload de fotos do projeto
- ✅ Atualizar status e progresso
- ✅ Marcar como concluído

**Como criar projeto:**
1. Clique em "Novo Projeto"
2. Selecione o cliente
3. Preencha:
   - Título (ex: "Ensaio Corporativo")
   - Descrição
   - Status (Aguardando/Em Andamento/Revisão/Concluído)
   - Progresso (0-100%)
4. Clique em "Salvar Projeto"

**Status disponíveis:**
- 🟡 Aguardando Início
- 🔵 Em Andamento
- 🟠 Em Revisão
- 🟢 Concluído

**Como atualizar projeto:**
1. Clique no projeto
2. Clique em "Editar Projeto"
3. Atualize as informações
4. Salve

---

### 4. 📸 **Provas de Fotos** (DESTAQUE!)

**O que são provas de fotos?**
São as fotos que você mostra para o cliente escolher quais quer receber editadas.

**Proteções implementadas:**
- ✅ Marca d'água em todas as fotos
- ✅ Desabilitação de clique direito
- ✅ Proteção contra download
- ✅ Impossível arrastar a imagem

**Como enviar prova:**
1. Clique em "Nova Prova"
2. Selecione:
   - Cliente
   - Projeto relacionado
3. Upload das fotos:
   - Arraste e solte múltiplas fotos OU
   - Clique para selecionar
4. Configure marca d'água:
   - Deixe marcado "Aplicar marca d'água"
   - Texto padrão: "João V. Cantuária"
   - Você pode personalizar o texto
5. Clique em "Upload Fotos"

**O que acontece:**
1. Fotos são enviadas com marca d'água
2. Cliente recebe notificação
3. Cliente acessa área dele e vê as fotos
4. Cliente seleciona as fotos desejadas
5. Você vê quais fotos foram selecionadas
6. Cliente pode comprar fotos extras

**Status das provas:**
- 🟠 Aguardando Seleção (cliente ainda não escolheu)
- 🔵 Em Análise (cliente selecionando)
- 🟢 Finalizado (cliente confirmou escolha)

**Funcionalidade de Compra de Fotos Extras:**
- Cliente vê quantas fotos tem no pacote
- Pode selecionar mais fotos
- Sistema calcula valor extra automaticamente
- Cliente faz pagamento
- Você recebe notificação

---

### 5. 💰 **Gestão Financeira** (PRIVADO - Só Admin)

**⚠️ Esta seção é visível APENAS para você!**
Clientes não têm acesso a estas informações.

**O que você gerencia:**

#### **Receitas:**
- Pagamentos recebidos de clientes
- Métodos: PIX, Cartão, Transferência, Dinheiro
- Por projeto ou adicional

**Como registrar receita:**
1. Clique em "Nova Transação"
2. Tipo: Receita
3. Preencha:
   - Data
   - Cliente
   - Descrição (ex: "Ensaio Corporativo")
   - Método de pagamento
   - Valor
4. Salve

#### **Despesas:**
- Equipamentos
- Software/Assinaturas
- Transporte
- Marketing
- Outras despesas

**Como registrar despesa:**
1. Clique em "Nova Transação"
2. Tipo: Despesa
3. Preencha:
   - Data
   - Categoria
   - Descrição
   - Método de pagamento
   - Valor
4. Salve

#### **Relatórios:**
- Receita vs Despesa
- Lucro líquido
- Gráficos por mês
- Comparativo de períodos

**Categorias de Despesas:**
- Equipamentos
- Software
- Marketing
- Transporte
- Educação
- Outros

**Métodos de Pagamento:**
- PIX
- Cartão de Crédito
- Cartão de Débito
- Transferência Bancária
- Dinheiro

---

### 6. 🎨 **Portfólio do Site**

**Gerenciar o carrossel do site principal:**

**Como adicionar item:**
1. Clique em "Adicionar Item"
2. Upload da imagem
3. Preencha:
   - Título
   - Descrição
4. Define ordem de exibição
5. Salve

**Como editar:**
1. Clique no item
2. Edite informações ou troque imagem
3. Salve

**Como reordenar:**
- Arraste e solte os itens
- Nova ordem salva automaticamente

---

### 7. 💬 **Depoimentos do Site**

**Gerenciar depoimentos da landing page:**

**Como adicionar:**
1. Clique em "Adicionar Depoimento"
2. Preencha:
   - Nome do cliente
   - Empresa
   - Texto do depoimento
   - Foto (opcional)
3. Marque como "Ativo"
4. Salve

**Status:**
- ✅ Ativo - Aparece no site
- ❌ Inativo - Não aparece

---

### 8. ⚙️ **Configurações**

**O que você pode editar:**

- **Contato:**
  - Número do WhatsApp
  - E-mail
  - Telefone

- **Redes Sociais:**
  - Instagram
  - TikTok
  - Facebook
  - YouTube

- **Logo:**
  - Upload de nova logo
  - Tamanho recomendado: 300x300px

- **Textos do Site:**
  - Título hero
  - Subtítulo
  - Descrição "Sobre"

---

## 🔒 Recursos de Segurança

### Proteção de Provas de Fotos

```javascript
// O sistema implementa:
1. Marca d'água automática
2. Desabilita clique direito
3. Desabilita arrastar imagem
4. Desabilita save as
5. CSS para prevenir seleção
```

### Marca D'água

**Características:**
- Texto transparente (40% opacidade)
- Rotação de -45 graus
- Tamanho grande
- Sobre toda a imagem
- Dificulta remoção

**Personalização:**
```
Padrão: "João V. Cantuária"
Cor: Branca com sombra
Opacidade: 40%
Tamanho: 2rem (responsivo)
```

---

## 📱 Acessando pelo Celular

O painel é **totalmente responsivo**!

**Recursos mobile:**
- ✅ Menu hambúrguer
- ✅ Cards adaptados
- ✅ Tabelas com scroll horizontal
- ✅ Upload de fotos pelo celular
- ✅ Touch-friendly

**Como usar no celular:**
1. Abra `admin/admin-login.html`
2. Faça login
3. Menu aparece ao clicar no ☰
4. Todas as funções disponíveis

---

## 💾 Backup e Dados

### Onde os Dados Ficam (Atualmente)

**Modo Atual:** Simulação/Local Storage

**Para Produção:** Firebase/Supabase

### Como Fazer Backup

**Quando usar Firebase:**
1. Acesse Firebase Console
2. Vá em Firestore Database
3. Clique em "Exportar"
4. Escolha destino
5. Faça export regular

---

## 🐛 Solução de Problemas

### Não Consigo Fazer Login

**Verifique:**
1. E-mail está correto?
2. Senha está correta?
3. Credenciais foram alteradas em `admin-auth.js`?

### Fotos Não Estão Protegidas

**Solução:**
1. Verifique se JavaScript está carregado
2. Veja console (F12) para erros
3. Confirme que `protectProofImages()` está sendo executada

### Modal Não Abre

**Solução:**
1. Verifique console (F12)
2. Confirme que `admin.js` está carregando
3. Limpe cache (CTRL + SHIFT + DELETE)

### Upload de Fotos Não Funciona

**Lembre-se:**
- Modo simulação - não envia para servidor
- Para produção, configure Firebase Storage
- Veja `GUIA_PAINEL_ADMINISTRATIVO.md`

---

## 🚀 Próximos Passos

### Para Usar em Produção:

1. **Configure Firebase** (veja guia)
2. **Altere credenciais** do admin
3. **Configure Storage** para upload real
4. **Ative autenticação** real
5. **Configure e-mails** transacionais
6. **Implemente pagamentos** (opcional)

---

## 📊 Fluxo de Trabalho Recomendado

### Diariamente:
1. ✅ Acessar dashboard
2. ✅ Ver novos clientes
3. ✅ Verificar provas pendentes
4. ✅ Responder mensagens

### Por Projeto:
1. ✅ Criar projeto no sistema
2. ✅ Fazer o trabalho (fotos)
3. ✅ Upload da prova com marca d'água
4. ✅ Cliente seleciona fotos
5. ✅ Editar e entregar fotos finais
6. ✅ Registrar pagamento
7. ✅ Marcar projeto como concluído

### Mensalmente:
1. ✅ Revisar financeiro
2. ✅ Exportar relatórios
3. ✅ Atualizar portfólio do site
4. ✅ Adicionar depoimentos novos

---

## 💡 Dicas Pro

### Organização:
- Use categorias consistentes
- Nomeie projetos claramente
- Mantenha status atualizados

### Financeiro:
- Registre TODAS as transações
- Categorize corretamente
- Faça backup mensal dos dados

### Provas de Fotos:
- Use marca d'água sempre
- Oriente o cliente sobre processo
- Defina prazo para seleção

### Cliente:
- Mantenha comunicação clara
- Atualize progresso regularmente
- Seja transparente sobre prazos

---

## 📞 Atalhos Úteis

```
CTRL + S        = Salvar (em formulários)
ESC             = Fechar modal
CTRL + F        = Buscar
F5              = Atualizar dados
```

---

## ✅ Checklist de Primeiro Uso

- [ ] Alterei as credenciais de admin
- [ ] Testei fazer login
- [ ] Explorei todas as seções
- [ ] Adicionei um cliente de teste
- [ ] Criei um projeto de teste
- [ ] Testei upload de prova de fotos
- [ ] Verifiquei marca d'água
- [ ] Registrei uma transação financeira
- [ ] Atualizei configurações de contato
- [ ] Testei no celular

---

## 🎉 Pronto para Usar!

O painel está **100% funcional em modo simulação**.

Para produção, configure o Firebase seguindo o guia principal.

**Qualquer dúvida, consulte os arquivos de documentação!** 📚

---

*Desenvolvido com ❤️ para João V. Cantuária*
*"Estratégias Visuais que Transformam"*
