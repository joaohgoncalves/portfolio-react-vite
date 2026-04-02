# 🏗️ Architecture Documentation

Este documento explica as decisões arquiteturais do projeto e como escalar de forma sustentável.

## 📐 Filosofia de Design

**Princípio**: Separação de responsabilidades — cada camada faz uma coisa, bem feita.

```
User Interface (Dumb Components)
         ↓
Custom Hooks (Business Logic)
         ↓
State Management (Zustand)
         ↓
Services (API/Data Layer)
         ↓
Data Models (Types)
```

---

## 🏢 Estrutura de Pastas

### `src/app/`

**Responsabilidade**: Configuração global da aplicação.

- `App.tsx` — Componente raiz
- `i18n.ts` — Inicialização de internacionalização
- `providers.tsx` — Context providers (HelmetProvider, etc)
- `routes.tsx` — Configuração de rotas (expandir conforme cresça)

**Por quê separado?** Evita poluir raiz. Centraliza setup.

### `src/components/`

**Responsabilidade**: Componentes **dumb/presentacional** (sem lógica de negócio).

```
components/
  ├── Navigation.tsx       # Só renderiza, recebe props
  ├── Hero.tsx             # Zero lógica
  ├── Work.tsx             # Delegue filtragem pra hook
  └── ...
```

**Regra**: Se precisa estado complexo → move pra hook/store.

### `src/features/`

**Responsabilidade**: Domícnios de negócio isolados. **Feature = setor autônomo**.

```
features/projects/
  ├── components/         # Componentes específicos de Projects
  │   ├── ProjectCard.tsx      # Renderiza um projeto
  │   ├── ProjectFilter.tsx    # UI de filtros (smart)
  │   └── index.ts             # Re-exporta tudo
  ├── hooks/               # Lógica de Projects
  │   ├── useProjects.ts      # Fetch + state
  │   └── useProjectFilter.ts # Filtros específicos
  ├── services/            # APIs de Projects
  │   ├── api.ts              # GitHub/DB queries
  │   └── transform.ts        # Mapeamento de dados
  ├── types.ts             # Types exclusivos
  └── index.ts             # Export limpo
```

**Vantagem**: Copiar `features/projects` para outro projeto = funciona igual.

### `src/store/`

**Responsabilidade**: Estado global com Zustand.

```
store/
  └── projectStore.ts
      ├── Interface ProjectStore (shape do estado)
      ├── useProjectStore() — Hook do Zustand
      └── filterProjects() — Lógica pura de filtragem
```

**Por quê Zustand ao invés de Redux/Context?**

- ✅ Simples
- ✅ Sem boilerplate
- ✅ Performático (subscriptions seletivas)
- ✅ TypeScript first

### `src/services/`

**Responsabilidade**: Abstrair API/data sources.

```
services/
  └── projects.ts
      ├── fetchProjects()    # HTTP → Project[]
      ├── getProjectById()   # HTTP → Project
      └── mapGitHubAPItoProject() # Transform logic
```

**Regra dourada**: Componentes não fazem fetch. Sempre via service + hook.

### `src/hooks/`

**Responsabilidade**: Lógica reutilizável separada de componentes.

```
hooks/
  └── useProjects.ts
      ├── Carrega dados (fetchProjects)
      ├── Integra store (useProjectStore)
      ├── Maneja loading/error
      └── Expõe interface simples
```

**Exemplo de uso**:

```tsx
const { filteredProjects, filters, updateFilter } = useProjects();
```

### `src/types/`

**Responsabilidade**: Type definitions por domínio.

```
types/
  ├── project.ts
  ├── experience.ts
  ├── navigation.ts
  └── index.ts        # Re-exporta para `@/types`
```

### `src/data/`

**Responsabilidade**: Dados estáticos (não mudam em runtime).

```
data/
  ├── projects.ts    # PROJECTS array
  ├── navigation.ts  # NAV_ITEMS, SOCIALS
  └── experience.ts  # EXPERIENCE array
```

---

## 🔄 Fluxo de Dados

### Cenário: Usuário filtra projetos por tech stack

```
1. User clicks "React" tag
   ↓
2. ProjectFilter component → updateFilter("tags", ["React"])
   ↓
3. Hook (useProjects) dispatches store action
   ↓
4. Zustand store:
   - Atualiza `filters.tags`
   - Re-computa `filteredProjects` (lógica pura)
   ↓
5. Component re-renderiza com `filteredProjects`
   ↓
6. UI reflete mudança
```

**Key points**:

- ✅ Componente só dispara ação, não faz lógica
- ✅ Store centraliza estado
- ✅ Hook expõe interface limpa
- ✅ Lógica de filtro = função pura (testável)

---

## 🎯 Por que cada decisão?

### 1. Zustand vs Redux

**Redux**: muito boilerplate para o tamanho do projeto.  
**Zustand**: minimalista, direto ao ponto, 0 boilerplate.

### 2. Separar componentes vs features

**Componente**: Button, Card, Navigation (genéricos).  
**Feature**: Projects (domínio específico com lógica).

**Benefício**: Features são **exportáveis**. Copia `features/projects` pra outro projeto, funciona.

### 3. Service layer

**Sem service**: `useEffect(...fetch...)` espalhado pelos componentes.  
**Com service**: Centralizad, testável, fácil de mock.

### 4. Hooks customizados

**Sem hook**: Lógica de filtro misturada em componente.  
**Com hook**: Lógica isolada, reutilizável, testável.

---

## 🚀 Como Adicionar Feature Nova

### Passo 1: Criar estrutura

```bash
mkdir -p src/features/nova-feature/{components,hooks,services}
touch src/features/nova-feature/{types.ts,index.ts}
```

### Passo 2: Definir types

`src/features/nova-feature/types.ts`:

```ts
export interface NovaCoisa {
  id: string;
  name: string;
  // ...
}
```

### Passo 3: Criar service

`src/features/nova-feature/services/api.ts`:

```ts
export async function fetchNovaCoisas(): Promise<NovaCoisa[]> {
  // API call ou mock
}
```

### Passo 4: Criar hook

`src/features/nova-feature/hooks/useNovaCoisas.ts`:

```ts
export function useNovaCoisas() {
  const [data, setData] = useState<NovaCoisa[]>([]);

  useEffect(() => {
    fetchNovaCoisas().then(setData);
  }, []);

  return { data };
}
```

### Passo 5: Criar componentes

`src/features/nova-feature/components/NovaCoisa.tsx`:

```tsx
export default function NovaCoisa() {
  const { data } = useNovaCoisas();
  return <div>{/* render data */}</div>;
}
```

### Passo 6: Re-exportar em index.ts

`src/features/nova-feature/index.ts`:

```ts
export { default as NovaCoisa } from './components/NovaCoisa';
export { useNovaCoisas } from './hooks/useNovaCoisas';
export * from './types';
```

### Pronto!

```tsx
import { NovaCoisa, useNovaCoisas } from '@/features/nova-feature';
```

---

## 📊 Performance Considerations

### Code Splitting

- Features lazy-loaded via dynamic imports
- `src/app/routes.tsx` aplica React.lazy()

### Bundle

```
npm run build
# Analisa dist/ — vendors separados via rollupOptions.manualChunks
```

### State Efficiency

- Zustand apenas suscribe ao que muda
- FilterProjects = função pura (sem re-renders desnecessários)

---

## 🧪 Testing Strategy

### Unit Tests

- `store/projectStore.test.ts` — filterProjects logic
- `services/projects.test.ts` — mock API

### Integration Tests

- `hooks/useProjects.test.ts` — hook com store + service

### E2E

- Cypress: "User filters projects and sees result"

---

## 📝 Conclusão

Esta arquitetura escala porque:
✅ Cada layer tem responsabilidade clara  
✅ Fácil mudar API source (GitHub, DB, File)  
✅ Features são independentes e reutilizáveis  
✅ Lógica é testável (funções puras)  
✅ Componentes são dumb e simples  
✅ Estado é centralizado e predicível

**Resultado**: Código profissional que cresce sem virar bagunça.
