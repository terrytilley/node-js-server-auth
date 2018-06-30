import http from 'http';
import app from './app';
import models from './models';

const port = process.env.PORT || 8000;
const server = http.createServer(app);

server.close();

models.sequelize.sync({ force: true }).then(() => {
  server.listen(port, () => {
    console.log(`Server running on http://localhost:${port}`);
  });
});
