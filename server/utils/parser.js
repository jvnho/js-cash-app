import Company from 'entity.js'
import Catalog from 'entity.js'
import Article from 'entity.js'
import { Catalog } from './entity';

// (Ouvrir le JSON en amont ?)
function read(json){
    const data = JSON.parse(json);
    const company = new Company(
        data.companyName,
        data.companyAddress,
        data.companyPhoneNumber,
        data.companyMail
    );

    const catalog = new Catalog();
    for (let i = 0; i < data.articles; i++){
        let obj = data.articles[i];
        const article = new Article(obj.name, obj.price, obj.quantity);
        catalog.add(article);
    }

    return {company, data};
}