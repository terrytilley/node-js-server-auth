import cors from 'cors';
import express from 'express';
import bodyParser from 'body-parser';

const app = express();
const port = process.env.PORT || 8000;

app.use(cors());
app.use(bodyParser.json());

app.get('/', (req, res) => {
  res.json({
    message: 'Hello world!',
  });
});

app.listen(port, () =>
  console.log(`Server running on http://localhost:${port}`)
);
