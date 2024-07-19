# Inicialização do projeto

## Instalar as dependências
```
npm install
```

## Configurar as variáveis de ambiente
Crie um arquivo .env com o seguinte conteúdo: 
```
DATABASE_DATABASE = 'notas_db'
DATABASE_USERNAME = 'root'
DATABASE_PASSWORD = 'root'
DATABASE_HOST = 'localhost'
DATABASE_PORT = '5432'

DATABASE_URL='postgresql://${DATABASE_USERNAME}:${DATABASE_PASSWORD}@${DATABASE_HOST}:${DATABASE_PORT}/${DATABASE_DATABASE}'
```
Modifique as variáveis de DATABASE conforme necessário

## Criar a imagem do docker
```
npm run dockerup
```
Caso o comando anterior falhe use:
```
docker-compose --env-file .env up -d
```

## Iniciar o projeto
```
npm run dev
```
