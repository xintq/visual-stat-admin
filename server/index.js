const Koa = require('koa');
const cors = require('@koa/cors');

const app = new Koa();

const encodeDecode = require('./encode-decode');
const articles = require('./article-routes');

// logger
app.use(async (ctx, next) =>{
    await next();
    const rt = ctx.response.get('X-Response-Time');
    console.log(`${ctx.method} ${ctx.url} - ${rt}`);
});

// x-response-time
app.use(async (ctx, next)=>{
    const start = Date.now();
    await next();
    const ms = Date.now() - start;
    ctx.set('X-Response-Time', `${ms}ms`);
});

app.use(cors());
app.use(require('koa-body')({
    formidable: {
        uploadDir: './uploads'
    },
    multipart: true,
    urlencoded: true,
}));

app.use(encodeDecode());
app.use(articles.routes());

// response
app.use(async ctx=>{
    ctx.body = 'Helllo World';
});

app.listen(3000);
console.log('running on http://localhost:3000');