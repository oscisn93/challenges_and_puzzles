import express from 'express';
import cors from 'cors';

const PORT = 6969;

const app = express();
app.use(cors());

app.listen(PORT, () => console.log('Server is up!'));
