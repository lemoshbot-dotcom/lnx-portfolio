# Como Atualizar Projetos

## Passo a passo para adicionar ou editar projetos

### 1. Abra o arquivo de dados
Abra o arquivo: `/data/projects.ts`

### 2. Para ADICIONAR um novo projeto:

Copie e cole este template no array `projects`:

```typescript
{
  id: "nome-do-projeto", // URL amigável (ex: vivo-campaign)
  title: "Nome do Projeto", // Título exibido
  description: "Breve descrição", // Subtítulo
  thumbnail: "/projects/thumb.jpg", // Imagem thumbnail (não obrigatório agora)
  gradient: "from-blue-600/20 to-purple-600/20", // Cor de fundo

  // Informações da página individual
  client: "Nome do Cliente",
  agency: "Nome da Agência", // Opcional
  production: "Nome da Produtora", // Opcional
  duration: "00:01:30", // Duração do vídeo (ex: "00:01:30" ou "1:30")
  year: "2024",
  fullDescription: "Descrição completa do projeto aqui. Pode ser longa.",

  // VÍDEO - escolha UMA das opções:
  video: "/projects/video.mp4", // Opção 1: Vídeo local
  vimeoId: "987654321", // Opção 2: Vimeo (mais recomendado!)

  images: ["/projects/img1.jpg", "/projects/img2.jpg"], // Imagens extras (opcional)
  credits: [
    { role: "AI Artist", name: "Seu Nome" },
    { role: "Director", name: "Nome do Diretor" }
  ]
},
```

### 3. Para EDITAR um projeto existente:

Encontre o projeto pelo `id` e modifique os campos que quiser.

### 4. Para REMOVER um projeto:

Delete o objeto inteiro do array (incluindo as chaves `{` e `}`).

### 5. Salve o arquivo

As mudanças aparecerão automaticamente no site!

---

## Como usar Vimeo (RECOMENDADO!)

### Por que Vimeo?
✅ Sem limite de tamanho de arquivo
✅ Melhor qualidade de vídeo
✅ Player profissional e elegante
✅ Mais rápido que hospedar localmente

### Como pegar o ID do Vimeo:

1. Faça upload do seu vídeo no Vimeo (vimeo.com)
2. Abra o vídeo no Vimeo
3. Olhe a URL, será algo como: `https://vimeo.com/987654321`
4. O número é o ID: `987654321`
5. Cole no campo `vimeoId` do projeto

**Exemplo:**
```typescript
{
  id: "meu-projeto",
  title: "Meu Projeto",
  // ... outros campos ...
  vimeoId: "987654321", // ← Cole o ID aqui
}
```

**Pronto!** O vídeo vai aparecer automaticamente na página do projeto.

---

## Estrutura de pastas para mídia

Crie a pasta `public/projects/` e coloque seus arquivos lá:

```
public/
└── projects/
    ├── vivo-thumb.jpg      # Thumbnail na grid
    ├── vivo-full.mp4       # Vídeo da página individual
    ├── vivo-1.jpg          # Imagem extra 1
    └── vivo-2.jpg          # Imagem extra 2
```

---

## Cores de gradiente disponíveis

Use estas combinações ou crie as suas:

- `from-blue-600/20 to-purple-600/20` (azul → roxo)
- `from-green-600/20 to-blue-600/20` (verde → azul)
- `from-orange-600/20 to-red-600/20` (laranja → vermelho)
- `from-cyan-600/20 to-blue-600/20` (ciano → azul)
- `from-purple-600/20 to-pink-600/20` (roxo → rosa)
- `from-yellow-600/20 to-orange-600/20` (amarelo → laranja)
- `from-red-600/20 to-yellow-600/20` (vermelho → amarelo)
- `from-indigo-600/20 to-purple-600/20` (índigo → roxo)
- `from-pink-600/20 to-rose-600/20` (rosa → rosa intenso)

---

## Exemplo prático

**Adicionar projeto "Coca-Cola Campaign":**

```typescript
{
  id: "coca-cola-campaign",
  title: "Coca-Cola Campaign",
  description: "AI-Powered Brand Experience",
  thumbnail: "/projects/coca-cola-thumb.jpg",
  gradient: "from-red-600/20 to-pink-600/20",

  client: "Coca-Cola",
  agency: "WMcCann",
  production: "Landia",
  duration: "00:02:15",
  year: "2024",
  fullDescription: "Created an immersive AI-powered brand experience for Coca-Cola's summer campaign, combining real-time generative visuals with traditional advertising.",
  vimeoId: "123456789", // ← Use seu ID do Vimeo aqui
  credits: [
    { role: "AI Artist", name: "LNX" },
    { role: "Agency", name: "WMcCann" }
  ]
}
```

Pronto! Agora vá até `http://localhost:3000/projects/coca-cola-campaign` para ver a página.
