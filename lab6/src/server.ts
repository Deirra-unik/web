import 'dotenv/config';
import Koa from 'koa';
import serve from 'koa-static';
import bodyParser from 'koa-bodyparser';
import path from 'path';
import router from './router';

const app = new Koa();
const PORT: number = parseInt(process.env.PORT ?? '3000', 10);

app.use(bodyParser());
app.use(router.routes()).use(router.allowedMethods());
app.use(serve(path.join(__dirname, '..', 'public')));

app.listen(PORT, () => {
    console.log(`Сервер запущено: http://localhost:${PORT}`);
});