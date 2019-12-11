const Koa = require('koa');
const cors = require('@koa/cors');
const serve = require('koa-static');
const path = require('path');

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

// 将webpack打包好的项目目录作为Koa静态文件服务的目录
app.use(serve(path.resolve('dist')));

// response
app.use(async ctx=>{
    ctx.body = 'Hi, you are accessing the API server.';
});


app.listen(3000);
console.log('running on http://localhost:3000');