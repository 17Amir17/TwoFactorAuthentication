import express, { Request } from 'express';
import cors from 'cors';
import morgan from 'morgan';
import path from 'path';
import errorHandler from './middleware/errorHanlder';
import loginRouter from './routers/loginRouter';
import registerRouter from './routers/registerRouter';

const PORT = process.env.PORT || 3001;

//App setup
const app = express();
app.use(cors());
app.use(express.json());
//Morgan setup
morgan.token('body', (req: Request, _res) => {
  return JSON.stringify(req.body);
});
app.use(morgan(':method :url :body'));
//Routers
app.use('/login', loginRouter);
app.use('/register', registerRouter);
//Static files
app.use(express.static(path.join(__dirname, '../../front/build/')));
app.get('*', (_req, res) => {
  res.sendFile(path.join(__dirname, '../../front/build/index.html'));
});
//Error Handler
app.use(errorHandler);
app.listen(PORT, () => {
  console.log(`listening on ${PORT}`);
});
