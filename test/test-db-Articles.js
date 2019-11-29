// import { Articles, Article } from '../model/Articles'
const Article = require('../model/Article');

const main = async () => {
    console.log("--- create table ---")
    await Article.createTableIfNotExists();

    console.log("--- save 10 ---")
    for (let i = 0; i < 10; i++) {
        const article = new Article(i, `title${i}`, `aaa${i}bbbcccdddeeefff`);
        const insertedObj = await Article.saveOrUpdate(article);
        console.log(insertedObj);
    }

    console.log("--- count after saving ---")
    let count = await Article.count()
    console.log(count);

    console.log("--- update 3 ---")
    for (let i = 3; i < 6; i++) {
        const article = new Article(i, `new-title${i}`, `new-xxx${i}xxxyyyzzz`);
        await Article.save(article);
    }

    console.log("--- list ---")
    let start = 0
    const limit = 3
    let articles = []
    while (true) {
        articles = articles.concat(await Article.list(start, limit))
        start = start + limit
        if (start >= count) break
    }
    console.log(articles)

    console.log("--- delete 10  ---")
    articles.forEach(article => { Article.delete(article) })

    console.log("--- count after deleting ---")
    count = await Article.count()
    console.log(count)
}

main();