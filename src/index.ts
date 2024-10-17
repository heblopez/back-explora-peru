import cors from 'cors';
import express, { type Request, type Response } from 'express';

const HOSTNAME = process.env.HOSTNAME || 'localhost';
const PORT = Number(process.env.PORT) || 3000;

const app = express();
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

app.listen(PORT, () => {
  console.log(`✅ Explora Peru API is running on http://${HOSTNAME}:${PORT}`);
});
