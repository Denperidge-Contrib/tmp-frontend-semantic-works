import { Category, assignRepoToCategories } from './category';
import github from './sources/github';
import data from './data';
// imports didn't work, falling back on require
//const { Category, assignRepoToCategories } = require('./category');
//const github = require('./sources/github')


export default async function getRepos() {
    // Get repo data 
    let repos = await github('mu-semtech');
    
    let categories = [];
    data.categories.forEach((category) => {
        let { name, id, regex, regexPriority } = category;
        categories.push(new Category(name, id, regex, regexPriority));
    });
    repos.forEach((repo) => {assignRepoToCategories(repo, categories)});

    console.log(categories.forEach((category) => {
        console.log(category.name);
        console.log(category.repos)
        console.log('---')
    }));

    return categories;
}
