const http = require('http');
const app = require('./app');

/*
  СЛУШАТЬ ПОРТ
  РАБОТА С ЗАПРОСАМИ (СЛУШАТЬ/ОТВЕЧАТЬ)
  РАБОТА С БД
*/

const server = http.createServer(app);

const port = process.env.PORT || 3000

server.listen(port, () => {
  console.log(`App started on port ${port}`);
});

/*
  Model: Task
  userId:INTEGER NOT NULL
  body:VARCHAR(512) NOT NULL, != ''
  isDone:BOOLEAN NOT NULL, DEFAULT false
  deadline:DATE

  npx sequelize-cli model:generate --name User --attributes firstName:string,lastName:string,email:string
*/