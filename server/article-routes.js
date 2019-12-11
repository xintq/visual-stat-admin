const Router = require('koa-router');
const Article = require('./model/Article');

const router = Router({
    prefix: '/api/articles'
});

router.get('/', async ctx=>{
    ctx.body = await Article.listAll();
});

// create
router.post('/', async ctx=>{
    const article = ctx.request.body;
    try {
        ctx.body = await Article.create(article);
    } catch (err) {
        ctx.status = 400;
        ctx.body = err.toString();
    }
});

// delete
router.delete('/:id', async ctx=>{
    await Article.delete(ctx.params.id);
    ctx.body = {
        status: true
    };
});

// view
router.get('/:id', async ctx=>{
    ctx.body = await Article.get(ctx.params.id);
});

// update
router.put('/:id', async ctx=>{
    const article = ctx.request.body;
    try {
        ctx.body = await Article.update(ctx.params.id, article);
    } catch (err) {
        ctx.status = 400;
        ctx.body = err.toString();
    }
});


module.exports = router;