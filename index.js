const express = require('express');
const app = express();
const port = 3000 || process.env.PORT;
const postsRouter = require('./routes/posts');
const usersRouter = require('./routes/users');
const path = require("path");

app.use(express.json());

app.use(express.static(path.join(__dirname, "grotto")));

app.get('/', (req, res) => {
  //res.json({message: 'alive'});
  console.log(root+"/grotto.html");
});

app.use('/posts', postsRouter);
app.use('/users', usersRouter);

app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`);
});