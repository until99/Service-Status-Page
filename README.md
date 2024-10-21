# Service-Status-Page
Sistema para monitoramento de serviços online, exibindo o status atual e histórico de indisponibilidades, com cálculo da disponibilidade por dia, semana, mês
## UML:

![status_service_page drawio](https://github.com/user-attachments/assets/09a4313d-a6e7-4b9d-a90e-431222168963)

## Casos de Uso:

#### ~ Introdução

1.1 Objetivo

Este documento descreve os casos de uso para um sistema de monitoramento de serviços online, onde o usuário pode visualizar o status de disponibilidade de serviços, consultar o histórico de erros e aplicar filtros de data e serviço. O objetivo do sistema é fornecer uma visão clara e interativa da disponibilidade dos serviços, permitindo que os usuários identifiquem rapidamente problemas e tendências de falhas.

1.2 Escopo

Este sistema será utilizado por usuários que desejam monitorar o status de vários serviços online (como YouTube, ChatGPT e Jira). O sistema exibirá um histórico de erros e um gráfico com a quantidade de erros por mês. Além disso, os usuários poderão aplicar filtros por serviço, mês e ano para refinar as informações apresentadas.

1.3 Definições, Acrônimos e Abreviações

Sistema: A aplicação que exibe o status dos serviços online.

Usuário: A pessoa que utiliza o sistema para visualizar o status dos serviços.

#### ~ Atores

2.1 Usuário

O Usuário é o ator principal do sistema. Ele pode visualizar o status atual dos serviços, acessar o histórico de erros e aplicar filtros para analisar a quantidade de falhas por serviço e por período de tempo.

#### ~ Casos de Uso

#### Caso de Uso 1: Filtrar Histórico de Erros por Tipo de Serviço, Mês e Ano

Ator Principal: Usuário

Descrição: O usuário filtra o histórico de erros com base no tipo de serviço, mês e ano, para visualizar apenas os erros relacionados a essas opções.

Pré-condição: O usuário está autenticado e acessou a tela de status de serviços online.

Pós-condição: O sistema exibe os erros filtrados e atualiza o gráfico de erros.

Fluxo Principal:

O usuário acessa a tela de status dos serviços.

O usuário seleciona o filtro de Tipo de Serviço, escolhendo entre opções como YouTube, ChatGPT e Jira.

O usuário seleciona o filtro de Mês e/ou Ano.

O sistema exibe os resultados filtrados na tabela de erros e atualiza o gráfico com a quantidade de erros para o período e serviço selecionados.

Critérios de Aceitação:

O usuário deve ser capaz de filtrar o histórico por Tipo de Serviço, Mês e Ano simultaneamente.

O gráfico e a tabela de erros devem refletir corretamente os filtros aplicados, mostrando a quantidade de erros e detalhes dos erros filtrados.

#### Caso de Uso 2: Visualizar Tipos de Erros por Serviço

Ator Principal: Usuário

Descrição: O usuário visualiza o tipo de erro ocorrido em um serviço específico, com detalhes como a mensagem de erro, a data e o status do serviço no momento do erro.

Pré-condição: O usuário acessa a tela de status de serviços.

Pós-condição: O sistema exibe os detalhes do erro selecionado.

Fluxo Principal:

O usuário visualiza a tabela de erros que contém colunas para Serviço, Data e Hora e Tipo de Erro.

O usuário clica em um erro específico na tabela.

O sistema exibe uma janela com mais informações sobre o erro, incluindo a mensagem completa, o timestamp e o status do serviço na hora do erro.

Critérios de Aceitação:

O sistema deve exibir claramente o Tipo de Erro na tabela de erros.

O usuário deve poder clicar em um erro e visualizar seus detalhes, incluindo a mensagem completa e o status do serviço.

#### Caso de Uso 3: Exibir Gráfico com a Quantidade de Erros por Serviço

Ator Principal: Usuário

Descrição: O sistema exibe um gráfico interativo que mostra a quantidade de erros registrados por mês para cada serviço filtrado.

Pré-condição: O usuário acessou a tela de status dos serviços.

Pós-condição: O gráfico é atualizado com base nos filtros aplicados.

Fluxo Principal:

O sistema exibe um gráfico com a quantidade de erros por mês, segmentado por serviço.

O usuário pode aplicar filtros de Tipo de Serviço, Mês e Ano.

O gráfico é atualizado em tempo real para refletir a quantidade de erros dos serviços filtrados.

Critérios de Aceitação:

O gráfico deve exibir corretamente o número de erros por mês.

O gráfico deve ser interativo e atualizar dinamicamente com base nos filtros aplicados.

O gráfico deve conter eixos e legendas bem definidos, facilitando a interpretação dos dados.
