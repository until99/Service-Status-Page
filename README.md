# Service Status Page

## Descrição do Sistema
Sistema para monitoramento de serviços online, exibindo o status atual e histórico de indisponibilidades, com cálculo da disponibilidade por dia, semana e mês.

## Integrantes do Grupo
- Lucas Mendes Israel
- Gustavo Henrique Costa
- Gabriel Kasten
- Gustavo William Larsen
- Luis Felipe Mondini
- João Antonio David

## Links Importantes
- **Jira:** [Acessar Jira](https://catolicasc-team-su0hhztv.atlassian.net/jira/software/projects/SSP/list)
- **UML:**
  ![UML](https://github.com/user-attachments/assets/09a4313d-a6e7-4b9d-a90e-431222168963)

---

## Requisitos Funcionais

1. **Exibição de Status de Serviços:**  
   O sistema deve exibir uma lista de serviços com os seguintes detalhes:
   - ID
   - Nome da página
   - Data/hora de acesso
   - Status da página (Pageup)
   - Mensagem de erro, se aplicável

2. **Paginação:**  
   O sistema deve suportar a paginação, permitindo que o usuário navegue entre as páginas de registros usando os botões "Previous" e "Next".

3. **Filtragem por Status de Serviço:**  
   O sistema deve permitir a filtragem dos serviços por data (dia, semana, mês).

4. **Registro de Erros:**  
   O sistema deve exibir mensagens de erro correspondentes aos serviços problemáticos, como "Database error" ou "Network issue".

5. **Atualização em Tempo Real:**  
   O sistema deve atualizar os dados em tempo real, exibindo novos registros ou mudanças no status dos serviços.

6. **Data e Hora do Registro:**  
   O sistema deve registrar a data e hora de cada evento de status, mostrando quando um serviço foi verificado.

---

## Requisitos Não Funcionais

1. **Performance:**  
   O sistema deve carregar e exibir os registros rapidamente, mesmo com grande volume de dados. A paginação deve ser eficiente.

2. **Confiabilidade:**  
   O sistema deve garantir a precisão das informações exibidas, especialmente os status de serviço e as mensagens de erro.

3. **Usabilidade:**  
   A interface deve ser simples e intuitiva, com navegação clara entre as páginas de registros e exibição dos status.

---

## Casos de Uso

### 1. Introdução

#### 1.1 Objetivo
Descrever os casos de uso para um sistema de monitoramento de serviços online, permitindo a visualização do status de disponibilidade de serviços, consulta ao histórico de erros e aplicação de filtros.

#### 1.2 Escopo
Utilização do sistema por usuários que monitoram vários serviços online (YouTube, ChatGPT, Jira). O sistema exibirá histórico de erros e gráfico com a quantidade de erros por mês.

#### 1.3 Definições, Acrônimos e Abreviações
- **Sistema:** A aplicação que exibe o status dos serviços online.
- **Usuário:** A pessoa que utiliza o sistema.

### 2. Atores

#### 2.1 Usuário
O Usuário é o ator principal que pode visualizar o status atual dos serviços, acessar o histórico de erros e aplicar filtros.

---

## Casos de Uso Detalhados

### Caso de Uso 1: Filtrar Histórico de Erros por Tipo de Serviço, Mês e Ano

- **Ator Principal:** Usuário
- **Descrição:** O usuário filtra o histórico de erros baseado no tipo de serviço, mês e ano.
- **Pré-condição:** O usuário está autenticado e na tela de status de serviços online.
- **Pós-condição:** O sistema exibe os erros filtrados e atualiza o gráfico de erros.

**Fluxo Principal:**
1. O usuário acessa a tela de status dos serviços.
2. Seleciona o filtro de Tipo de Serviço (YouTube, ChatGPT, Jira).
3. Seleciona o filtro de Mês e/ou Ano.
4. O sistema exibe os resultados filtrados e atualiza o gráfico.

**Critérios de Aceitação:**
- Filtragem simultânea por Tipo de Serviço, Mês e Ano.
- Gráfico e tabela refletem corretamente os filtros aplicados.

---

### Caso de Uso 2: Visualizar Tipos de Erros por Serviço

- **Ator Principal:** Usuário
- **Descrição:** O usuário visualiza detalhes do erro ocorrido em um serviço específico.
- **Pré-condição:** O usuário acessa a tela de status de serviços.
- **Pós-condição:** O sistema exibe os detalhes do erro selecionado.

**Fluxo Principal:**
1. O usuário visualiza a tabela de erros.
2. Clica em um erro específico.
3. O sistema exibe uma janela com mais informações.

**Critérios de Aceitação:**
- Tipo de Erro exibido claramente na tabela.
- Detalhes do erro visíveis ao clicar no erro.

---

### Caso de Uso 3: Exibir Gráfico com a Quantidade de Erros por Serviço

- **Ator Principal:** Usuário
- **Descrição:** O sistema exibe um gráfico interativo mostrando a quantidade de erros registrados por mês.
- **Pré-condição:** O usuário acessou a tela de status dos serviços.
- **Pós-condição:** O gráfico é atualizado com base nos filtros aplicados.

**Fluxo Principal:**
1. O sistema exibe um gráfico com a quantidade de erros por mês.
2. O usuário aplica filtros de Tipo de Serviço, Mês e Ano.
3. O gráfico atualiza em tempo real.

**Critérios de Aceitação:**
- Gráfico exibe corretamente o número de erros por mês.
- Interatividade e atualização dinâmica do gráfico com base nos filtros.

--- 

Essa estrutura deve facilitar a leitura e compreensão do seu projeto! Se precisar de mais ajustes, é só avisar.
