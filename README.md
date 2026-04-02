# 💼 Portfolio React Vite

Projeto de portfólio pessoal com foco em entrega técnica profissional, organização de código, performance e SEO.

## ✅ O que foi ajustado

- Corrigido `git clone` e instruções para `portfolio-react-vite`.
- Fluxo de branches sugerido: `main`, `develop`, `feature/*`, `release/*`, `hotfix/*`.
- Preparado para `vitest` e CI no GitHub Actions.
- Documentação de i18n, SEO e performance atualizada.
- Cuidados de tipagem TypeScript reforçados.

## 📦 Como rodar

```bash
git clone https://github.com/joaohgoncalves/portfolio-react-vite.git
cd portfolio-react-vite
npm install
npm run dev
```

## 🧪 Testes

```bash
npm run test
npm run test:coverage
```

## 🚀 Scripts úteis

- `npm run dev` - servidor local
- `npm run build` - build de produção
- `npm run preview` - preview de build em `localhost`
- `npm run test` - executa Vitest
- `npm run test:coverage` - coverage

## 🌿 Branching & versionamento

1. `main` - produção
2. `develop` - integração contínua
3. `feature/<nome>` - features pequenas
4. `release/<x.y.z>` - lançamento com QA
5. `hotfix/<x.y.z>` - correção emergencial

## 🌐 Internacionalização

- Implementa `react-i18next` com `i18next-browser-languagedetector`
- `en` fallback para idiomas não suportados

## 🧠 SEO

- `index.html` deve conter meta tags dinâmicas e Open Graph (ajuste manual se precisar)
- Use `react-helmet-async` ou `@remix-run/react` para rotas avançadas

## 🧰 Vite

- Alias `@` para raiz
- variáveis de ambiente em `vite.config.ts`

## 🧾 Licença

MIT
