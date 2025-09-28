import express, { Application, Request, Response } from 'express';
import router from './app/routes';
import globalErrorHandler from './app/middlewares/globalErrorHandler';
import cors from 'cors';
const app: Application = express();

app.use(
  cors({
    origin: [
      'https://brhex-inventory-management-client.vercel.app/',
      'http://localhost:3000',
    ],
  }),
);
app.use(express.json());

app.get('/', (req: Request, res: Response) => {
  res.send('The server is up and running!🤖');
});

app.use('/api/v1', router);

app.use(globalErrorHandler);

export default app;
