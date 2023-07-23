import { configDotenv } from 'dotenv';
import express from 'express';

import { routes } from './routes/index.routes';

configDotenv();

const app = express();

app.use(express.json());
app.use(routes);

app.listen(8080, () => console.log('Server running on port 8080...'));
