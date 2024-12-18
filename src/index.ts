import cors from 'cors';
import express, { type Request, type Response } from 'express';
import morgan from 'morgan';
import swaggerUi from 'swagger-ui-express';
import { HOSTNAME, PORT } from './config';
import swaggerJson from './openapi.json';
import authRouter from './routes/auth.routes';
import bookingRouter from './routes/booking.routes';
import sessionRouter from './routes/session.routes';
import tourRouter from './routes/tour.routes';
import userRouter from './routes/user.routes';

const app = express();
app.use(express.json());
app.use(cors());

morgan.token('body', (req: Request) => JSON.stringify(req.body));
app.use(
  morgan(':method :url :status :res[content-length] - :response-time ms :body')
);

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
app.use('/api', tourRouter);
app.use('/api', sessionRouter);
app.use('/api', bookingRouter);
app.use('/api', userRouter);

app.use('/swagger', swaggerUi.serve, swaggerUi.setup(swaggerJson));

app.listen(PORT, () => {
  console.log(`✅ Explora Peru API is running on http://${HOSTNAME}:${PORT}`);
});

export default app;
