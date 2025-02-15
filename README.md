# Oni❌Server

**Oni❌Server** é uma aplicação web intuitiva e fácil de usar que permite gerenciar seu servidor AWS de forma simples e prática. Com **Oni❌Server**, você pode se conectar ao seu servidor via SSH, executar comandos no terminal e controlar o status das suas aplicações com apenas alguns cliques.

## Requisitos

- Credenciais válidas para se conectar ao servidor AWS via SSH (host, port, user, pem).
- Navegador moderno com suporte a JavaScript.

## Licença

**Oni❌Server** é gratuito para uso pessoal e não cobra por nenhum dos serviços. Ele não coleta dados do usuário e não exige nenhuma autenticação.

## Funcionalidades

- **Conexão SSH via Credenciais Locais**: O **Oni❌Server** utiliza suas credenciais (host, port, user, pem) para se autenticar no servidor, garantindo uma conexão segura e sem a necessidade de salvar dados sensíveis. Após a autenticação, as credenciais ficam salvas apenas localmente no seu navegador e são criptografadas.
  
- **Controle das Unidades**: A partir do aplicativo, você tem acesso a controles essenciais de suas aplicações, como:
  - **Start**: Iniciar suas aplicações.
  - **Stop**: Parar suas aplicações.
  - **Reload**: Recarregar suas aplicações.
  - **Logs PM2**: Acessar os logs gerados pelo PM2 usando o ID da aplicação.

- **Monitoramento com PM2**: Visualize o status das suas aplicações diretamente na interface com o comando `pm2 list`, oferecendo uma visão clara de quais serviços estão ativos ou inativos.

- **Modo Terminal**: A funcionalidade terminal permite que você execute comandos no seu servidor AWS como se estivesse utilizando diretamente o terminal SSH, mas em um ambiente web prático.

- **Design Intuitivo**: A interface foi projetada para ser simples e de fácil navegação, com um único campo de entrada e apenas 4 botões principais para gerenciar sua aplicação e servidor com facilidade.

- **Privacidade e Segurança**: A aplicação **Oni❌Server** não armazena dados sensíveis em nenhum lugar. Ela não exige autenticação ou coleta de credenciais. Tudo é feito de forma local no navegador, e os dados de autenticação são armazenados de maneira segura, criptografados e apenas temporariamente para a duração da sessão.

## Benefícios

- **Simplicidade**: Com uma interface simples e funcional, você pode gerenciar seu servidor e aplicações AWS sem complicação.
- **Segurança**: Nenhuma informação pessoal ou credencial é armazenada nos servidores, mantendo seu servidor e dados totalmente protegidos.
- **Acessibilidade**: Acesse e controle seu servidor a partir de qualquer lugar, com uma aplicação web leve e de fácil uso.

## Como Funciona

1. **Autenticação SSH**: Na primeira vez que você se conectar ao seu servidor AWS, será necessário inserir as credenciais (host, port, user, pem).
2. **Conexão Local**: As credenciais são criptografadas e armazenadas localmente no navegador, garantindo que você não precise digitar as informações a cada acesso.
3. **Gestão do Servidor**: A partir do painel, você pode iniciar, parar, recarregar e monitorar suas aplicações em tempo real.
4. **Terminal Web**: Acesse um terminal diretamente na interface da aplicação para executar comandos diretamente no seu servidor, com resultados sendo exibidos imediatamente.

## Não Se Preocupe Com Suas Credenciais

**Oni❌Server** não armazena suas credenciais em nenhum servidor. Tudo é feito localmente no navegador de maneira segura e temporária. Isso significa que você tem total controle sobre seus dados e sua segurança.