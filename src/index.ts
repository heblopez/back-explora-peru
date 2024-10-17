import cors from 'cors';
import express, { type Request, type Response } from 'express';
import { HOSTNAME, PORT } from './config';
import authRouter from './routes/auth.routes';

const app = express();
app.use(express.json());
app.use(cors());

const welcomeListener = (_req: Request, res: Response) => {
  res
    .status(200)
    .setHeader('Content-Type', 'text/html; charset=utf-8')
    .send(
      `<h1>Explora Peru API 🚀</h1>
    <p>This is the backend of the Explora Peru project.</p>`
    );
};

app.get('/', welcomeListener);
app.use('/api/auth', authRouter);

app.listen(PORT, () => {
  console.log(`✅ Explora Peru API is running on http://${HOSTNAME}:${PORT}`);
});
