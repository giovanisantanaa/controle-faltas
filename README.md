# Controle de Faltas

Aplicação web para acompanhamento de faltas acadêmicas por disciplina.

[![Demo](https://img.shields.io/badge/🚀_Demo-Acessar%20aplicação-2ea44f)](https://giovanisantanaa.github.io/controle-faltas/)

## Visão geral

O **Controle de Faltas** ajuda estudantes a monitorar rapidamente a quantidade de faltas em cada disciplina e a situação em relação ao limite permitido.

### Problema que resolve

* Centraliza o controle de faltas em uma interface simples.
* Evita cálculos manuais para saber quando a disciplina entra em risco.
* Mantém os dados no navegador do próprio usuário.

### Persistência

Os dados são salvos no `localStorage` do navegador, utilizando a chave `controle-faltas:disciplines`, sem necessidade de backend ou banco de dados.

## Funcionalidades

Funcionalidades atualmente presentes no projeto:

* Cadastro de disciplinas.
* Definição da carga horária por disciplina.
* Controle de faltas por disciplina.
* Adição e remoção de faltas.
* Controles rápidos `-2`, `-1`, `+1` e `+2`.
* Limite de faltas calculado conforme a carga horária.
* Indicador de situação da disciplina.
* Resumo com total de disciplinas e disciplinas em atenção.
* Persistência local dos dados no navegador.
* Interface responsiva para diferentes tamanhos de tela.

## Regras de faltas

Tabela de limites utilizada:

| Carga horária | Limite de faltas |
| ------------- | ---------------- |
| 30h           | 9                |
| 45h           | 13               |
| 60h           | 18               |
| 75h           | 22               |
| 90h           | 27               |
| 120h          | 36               |

### Estados de situação

| Estado interno | Descrição                                     |
| -------------- | --------------------------------------------- |
| `safe`         | Dentro do limite                              |
| `warning`      | Próximo do limite (a partir de 80% do limite) |
| `limit`        | Limite atingido                               |
| `failed`       | Reprovado por faltas (acima do limite)        |

## Tecnologias

* React
* TypeScript
* Vite
* Tailwind CSS
* ESLint

## Como executar localmente

### Requisitos

* Node.js (LTS recomendada)
* npm

### Instalação

Clone o repositório e instale as dependências:

```bash
npm install
```

### Desenvolvimento

Inicie o servidor de desenvolvimento:

```bash
npm run dev
```

A aplicação estará disponível em:

```text
http://localhost:5173/
```

### Build de produção

Para gerar a versão de produção:

```bash
npm run build
```

### Outros comandos disponíveis

Verificar problemas de lint:

```bash
npm run lint
```

Visualizar a build de produção localmente:

```bash
npm run preview
```

## Estrutura do projeto

```text
src/
  components/   # Componentes de interface
  hooks/        # Regras de estado e persistência
  utils/        # Funções utilitárias de cálculo de faltas
  data/         # Regras estáticas de negócio
  types/        # Tipos TypeScript da aplicação
  App.tsx       # Composição principal da tela
```

## CI/CD e GitHub Pages

Este repositório possui automações com **GitHub Actions** para garantir a qualidade do código e realizar o deploy da aplicação.

### CI

A integração contínua é executada:

* Em `push` para a branch `main`.
* Em `pull_request`.

A pipeline executa:

1. Instalação das dependências.
2. Verificação do ESLint.
3. Build da aplicação.

### Deploy

O deploy no **GitHub Pages** é realizado automaticamente a cada `push` para a branch `main`.

Após uma alteração ser enviada para a `main`, o GitHub executa o processo de build e publica automaticamente a nova versão da aplicação.

## Desenvolvimento

Para contribuir:

1. Crie uma branch a partir de `main`.
2. Faça as alterações necessárias.
3. Execute `npm run lint`.
4. Execute `npm run build`.
5. Abra um Pull Request com uma descrição das alterações realizadas.

## Licença

Este projeto está licenciado sob a [MIT License](LICENSE).

Você é livre para usar, copiar, modificar, distribuir e utilizar este projeto, inclusive para fins comerciais, desde que os termos da licença sejam respeitados.
