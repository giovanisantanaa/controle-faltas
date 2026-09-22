# Controle de Faltas

Aplicacao web para acompanhamento de faltas academicas por disciplina.

## Visao geral

O **Controle de Faltas** ajuda estudantes a monitorar rapidamente a quantidade de faltas em cada disciplina e a situacao em relacao ao limite permitido.

Problema que resolve:
- Centraliza o controle de faltas em uma interface simples.
- Evita calculos manuais para saber quando a disciplina entra em risco.
- Mantem os dados no navegador do proprio usuario.

Persistencia:
- Os dados sao salvos em `localStorage` (chave `controle-faltas:disciplines`), sem backend.

## Funcionalidades

Funcionalidades atualmente presentes no projeto:

- Cadastro de disciplinas.
- Definicao da carga horaria por disciplina.
- Controle de faltas por disciplina.
- Adicao e remocao de faltas.
- Controles rapidos `-2`, `-1`, `+1` e `+2`.
- Limite de faltas calculado conforme a carga horaria.
- Indicador de situacao da disciplina.
- Resumo com total de disciplinas e disciplinas em atencao.
- Persistencia local dos dados no navegador.
- Interface responsiva para diferentes tamanhos de tela.

## Regras de faltas

Tabela de limites utilizada:

| Carga horaria | Limite de faltas |
| --- | --- |
| 30h | 9 |
| 45h | 13 |
| 60h | 18 |
| 75h | 22 |
| 90h | 27 |
| 120h | 36 |

Estados de situacao implementados:

| Estado interno | Descricao |
| --- | --- |
| `safe` | Dentro do limite |
| `warning` | Proximo do limite (a partir de 80% do limite) |
| `limit` | Limite atingido |
| `failed` | Reprovado por faltas (acima do limite) |

## Tecnologias

- React
- TypeScript
- Vite
- Tailwind CSS
- ESLint

## Como executar localmente

### Requisitos

- Node.js (LTS recomendada)
- npm

### Comandos principais

```bash
npm install
npm run dev
```

Aplicacao em desenvolvimento: `http://localhost:5173/`

### Build de producao

```bash
npm run build
```

### Outros comandos disponiveis

```bash
npm run lint
npm run preview
```

## Estrutura do projeto

```text
src/
  components/   # componentes de interface (cards, formulario, resumo, etc.)
  hooks/        # regras de estado e persistencia (useDisciplines)
  utils/        # funcoes utilitarias de calculo de faltas
  data/         # regras estaticas de negocio (limites por carga horaria)
  types/        # tipos TypeScript da aplicacao
  App.tsx       # composicao principal da tela
```

## CI/CD e GitHub Pages

Este repositorio possui:

- **CI automatica** (lint + build) em push para `main` e em `pull_request`.
- **Deploy automatico no GitHub Pages** em push para `main`.

URL publica configurada:

- https://giovanisantanaa.github.io/controle-faltas/

## Desenvolvimento

Para contribuir:

1. Crie uma branch a partir de `main`.
2. Faca as alteracoes necessarias.
3. Rode `npm run lint` e `npm run build`.
4. Abra um Pull Request com a descricao das mudancas.

## Licenca

Licenca ainda nao definida neste repositorio.
