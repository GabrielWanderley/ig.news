# ig.news
O projeto ig.news é um blog onde os usuários podem ter acesso ao conteúdo de cada postagem de acordo com o status de sua assinatura.
#tecnologias 
* ReactJS
* NextJS
* TypeScript
* SASS
* Next-Auth
* Stripe
* FaunaDB
* Prismic

* FaunaDB
O Fauna é o nosso banco de dados onde está salvo todos os usuarios, e atraves deles vemos se o usuario tem uma assinatura ou não, essa é a visão para usuarios
que tentam acessar o post sem assinatura
![sem](https://github.com/GabrielWanderley/ig.news/assets/101371288/c9a4ac93-63ec-4783-b9ff-9ebea1edb438)


* stripe 
 É nossa forma de pagamento 
  ![stripe](https://github.com/GabrielWanderley/ig.news/assets/101371288/594b053b-d1ad-4b47-94e9-fb334c562fdb)

* Prismic
É onde fica armazenado as postagens 
![posts](https://github.com/GabrielWanderley/ig.news/assets/101371288/50703d00-1a68-4603-8347-bd2b3f886e31)

# Configurações necessárias
Voce precisara fazer contas e configuralas nos seguites serviços
*FaunaDB
*Stripe
*Prismic

# Iniciar Projeto 
``` 
# Execute yarn para instalar as dependências
$ yarn

# Na raiz do projeto crie uma copia do arquivo .env.local.example
# Altere o nome da copia para .env.local
# Preencha as variáveis ambiente de acordo com as instruções
$ cp .env.local.example .env.local

# Execute stripe listen para ouvir eventos do webhook
$ stripe listen --forward-to localhost:3000/api/webhooks 

# Para iniciar a aplicação
$ yarn dev

```
