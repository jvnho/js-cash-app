let entity = require('./entity')
let Company = entity.company;
let Catalog = entity.catalog;
let Article = entity.article;


function read(JSONObject){
    const str = JSON.stringify(JSONObject); 
    console.log(str);
    const data = JSON.parse(str);
    const catalog = new Catalog();
    for (let i = 0; i < data.articles; i++){
        let obj = data.articles[i];
        const article = new Article(obj.name, obj.price, obj.quantity);
        catalog.add(article);
    }
    const company = new Company(
        data.companyName,
        data.companyAddress,
        data.companyPhoneNumber,
        data.companyMail
    );
    company.setCatalog(catalog)
    return [company, catalog];
}

module.exports = {read};