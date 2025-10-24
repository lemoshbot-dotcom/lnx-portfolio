# Resumo da Sessão - LNX Portfolio Site

## 🎯 Estado Atual (24/10/2025)

### ✅ Completo
- Site buildado e deployado no Vercel
- Domínio lnx.art configurado (DNS propagando)
- **Página de manutenção ativa** ("Under Construction")
- Backup do site completo salvo

### 🌐 URLs
- **Produção**: https://lnx.art (propagando DNS)
- **Vercel**: https://lnx-portfolio-gim89uu5y-lemoshs-projects.vercel.app
- **Projeto Vercel**: https://vercel.com/lemoshs-projects/lnx-portfolio
- **GitHub**: https://github.com/lemoshbot-dotcom/lnx-portfolio.git

---

## 📁 Arquivos Importantes

### Site Completo (Backup)
```
/Users/lnx/claude-projects/LNX_SITE/app/page.backup.tsx
```
↑ Site completo com layout ComfyUI workflow

### Site Atual (Manutenção)
```
/Users/lnx/claude-projects/LNX_SITE/app/page.tsx
```
↑ Página "Under Construction"

### Documentação
- `CLAUDE.md` - Instruções gerais do projeto
- `COMO_ATUALIZAR_PROJETOS.md` - Guia de atualização de projetos
- `data/projects.ts` - Dados dos projetos

---

## 🚀 Comandos Essenciais

### Restaurar Site Completo
```bash
cd /Users/lnx/claude-projects/LNX_SITE
cp app/page.backup.tsx app/page.tsx
npm run build
npx vercel --prod --yes
```

### Dev Local
```bash
cd /Users/lnx/claude-projects/LNX_SITE
npm run dev
# http://localhost:3000
```

### Deploy Manual
```bash
npm run build
npx vercel --prod --yes
```

### Git
```bash
git add .
git commit -m "mensagem"
# Push manual (precisa credenciais GitHub)
git push -u origin main
```

---

## 🌍 Configuração DNS (GoDaddy → Vercel)

### Registros Configurados
```
Tipo: A
Name: @
Value: 216.198.79.1
TTL: 600 segundos

Tipo: CNAME
Name: www
Value: cname.vercel-dns.com
TTL: 600 segundos
```

### ⚠️ IMPORTANTE
- **NÃO mexer em MX records** (email Google Workspace)
- **NÃO mexer em NS records** (nameservers)
- Só editar A e CNAME acima

---

## 🎨 Design: Layout ComfyUI Workflow

### Conceito
Site em formato de workflow/nodes (inspirado em ComfyUI):

**Estrutura por trabalho:**
```
[Load Work] → [Skills] → [Video/Output]
   (info)      (3 skills)   (preview+link)
```

### Features
- Grid de pontos no background
- 3 trabalhos em linhas horizontais
- Conectores SVG com plugs (•) e setas
- Nodes com bordas técnicas
- Hover effects

### Seções
1. Hero: "Push Beyond Creativity"
2. Workflow: 3 works com skills
3. Skills: 4 cards
4. Client Logos: 12 marcas
5. About
6. Contact

---

## 📦 Estrutura do Projeto

```
LNX_SITE/
├── app/
│   ├── page.tsx              # Manutenção ATIVA
│   ├── page.backup.tsx       # Site completo BACKUP
│   ├── all-works/page.tsx    # Página com todos os projetos
│   ├── projects/[id]/page.tsx # Páginas individuais de projetos
│   └── globals.css           # Animações (floatingPoint, etc)
├── components/
│   ├── Header.tsx            # Navegação
│   └── ClientLogos.tsx       # 12 logos de clientes
├── data/
│   └── projects.ts           # DADOS DOS PROJETOS (editar aqui)
├── public/
│   ├── logos/                # Logos de clientes
│   └── icon/                 # Ícones customizados (back, go)
└── vercel.json               # Config Vercel
```

---

## 🔧 Adicionar/Editar Projetos

### Arquivo
```
/Users/lnx/claude-projects/LNX_SITE/data/projects.ts
```

### Exemplo
```typescript
{
  id: "projeto-teste",
  title: "Projeto Teste",
  description: "Descrição curta",
  gradient: "from-blue-600 to-purple-600",
  client: "Cliente X",
  agency: "Agência Y",
  year: "2025",
  vimeoId: "123456789",  // ID do Vimeo
  fullDescription: "Descrição completa...",
  credits: [
    { role: "Director", name: "Nome" }
  ]
}
```

### Deploy Após Editar
```bash
npm run build
npx vercel --prod --yes
```

---

## 🎯 Logos de Clientes (12)

### Localização
```
/Users/lnx/claude-projects/LNX_SITE/public/logos/
```

### Lista Atual
1. Vivo
2. Bradesco
3. Itaú
4. Santander
5. Nubank
6. Intel (filtro especial: invert)
7. McDonald's
8. Natura (filtro especial: invert)
9. Jeep
10. Nivea
11. Petronas
12. iFood

### Editar Logos
```
/Users/lnx/claude-projects/LNX_SITE/components/ClientLogos.tsx
```

---

## 🐛 Troubleshooting

### Build Error
```bash
npm run build
# Se falhar, verifica erros de tipo
```

### Vercel Deploy Fail
```bash
# Verifica logs
npx vercel inspect URL --logs
```

### DNS Não Propaga
- Aguarda 30min-2h
- Verifica: https://dnschecker.org
- Confirma registros no GoDaddy

### Localhost Not Working
```bash
# Limpa e reinstala
rm -rf .next node_modules
npm install
npm run dev
```

---

## 📝 Próximos Passos

### Quando Tirar Manutenção
1. Restaura site completo (comando acima)
2. Testa local: `npm run dev`
3. Build: `npm run build`
4. Deploy: `npx vercel --prod --yes`

### Melhorias Futuras
- [ ] Adicionar imagens reais aos projetos
- [ ] Testar responsividade mobile
- [ ] Adicionar mais projetos em `data/projects.ts`
- [ ] Conectar Google Analytics
- [ ] SEO: meta tags, sitemap

---

## 💡 Dicas para Nova Conversa

### Ao Iniciar Nova Conversa com Claude
1. Diz: "Estou trabalhando no projeto LNX_SITE"
2. Referencia: `/Users/lnx/claude-projects/LNX_SITE`
3. Menciona: "Lê RESUMO_SESSAO.md para contexto"
4. Economiza tokens = conversa mais longa

### Comandos Úteis
- "Restaura site completo" → copia backup
- "Adiciona projeto X" → edita projects.ts
- "Deploy no Vercel" → build + vercel --prod

---

## ⚙️ Configurações Técnicas

### Next.js
- Versão: 15.5.6
- App Router (não Pages Router)
- TypeScript
- Tailwind CSS
- ESLint ignorado no build (next.config.ts)

### Vercel
- CLI instalado globalmente
- Auto-deploy habilitado
- Project: lemoshs-projects/lnx-portfolio

### Git
- Branch: main
- Remote: https://github.com/lemoshbot-dotcom/lnx-portfolio.git
- Commits com Co-Authored-By: Claude

---

## 📞 Contato

**Email**: contact@lnx.art
**Domínio**: lnx.art (GoDaddy)
**Email Provider**: Google Workspace (MX records protegidos)

---

**Última atualização**: 24/10/2025
**Criado por**: Claude Code (Anthropic)
**Status**: ✅ Site de manutenção ativo, pronto para lançamento completo
