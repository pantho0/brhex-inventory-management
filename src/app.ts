import express, { Application, Request, Response } from 'express';
import router from './app/routes';
import globalErrorHandler from './app/middlewares/globalErrorHandler';
import cors from 'cors';
const app: Application = express();

app.use(cors());
app.use(express.json());

app.get('/', (req: Request, res: Response) => {
  res.send('The server is up and running!🤖');
});

app.use('/api/v1', router);

app.use(globalErrorHandler);

export default app;
