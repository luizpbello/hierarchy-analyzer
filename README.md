# Projeto CLI

Este é o repositório do projeto CLI. O projeto CLI é uma ferramenta de linha de comando que permite realizar análise de uma frase fornecida pelo usuário, identificar a
profundidade associada a uma palavra mencionada na frase, e então exibir os itens mais próximos dessa profundidade

## Instalação

Para instalar o projeto CLI, siga as instruções abaixo:

2. Navegue até o diretório do projeto CLI. Execute o comando `cd cli`.
3. Execute o comando `npm install` para instalar as dependências.
4. Rode o comando `npm start -- analyze --depth=<n> "<frase>" --verbose (optional)`
6. Insira a frase desejada e substitua `<n>` pelo valor da profundidade desejada. Por exemplo, para obter o seguinte output:

```
aves = 3
mamiferos = 2
┌────────────────────────────────────────┬───────────────┐
│ Descrição                              │ Tempo (ms)    │
├────────────────────────────────────────┼───────────────┤
│ Tempo de carregamento dos parâmetros   │ 0.841         │
├────────────────────────────────────────┼───────────────┤
│ Tempo de verificação da frase          │ 1.297         │
```

Você pode executar o seguinte comando:

```
npm start -- analyze --depth=1 "Eu amo papagaios leoes canários falcões e gorilas" --verbose
```

Certifique-se de substituir "frase" pelo texto que você deseja analisar e ajustar o valor da profundidade conforme necessário.

## Testes CLI

1. Navegue até o diretório do projeto CLI. Execute o comando `cd cli`.
2. Execute o comando `npm test` para rodar os testes unitários.


# Projeto Hierarchy Creator(React)

Este projeto fornece uma interface web para criar e visualizar uma hierarquia de palavras, além de gerar um arquivo JSON compatível com a CLI.

1. Navegue até o diretório do projeto CLI. Execute o comando `cd hierarchy-creator`.
2. Execute o comando `npm install` para instalar as dependências.
3. Rode o comando `npm start` para iniciar o projeto
4. O aplicativo será iniciado e acessível em http://localhost:3000 (ou a porta configurada).



## Funcionalidades do Frontend

- Adicionar Níveis: Permite ao usuário adicionar múltiplos níveis de palavras à hierarquia.
- Visualização da Hierarquia: Exibe a hierarquia de palavras de forma visual e intuitiva.
- Salvar JSON: Gera um arquivo JSON com a hierarquia criada compativel com o programa de CLI.


