import { Category, assignRepoToCategories } from './category';
import github from './sources/github';
// imports didn't work, falling back on require
//const { Category, assignRepoToCategories } = require('./category');
//const github = require('./sources/github')


export default async function getRepos() {
    // Get repo data 
    let repos = await github('mu-semtech');

    // Define categories  TODO: move to data.json
    let categories = [
        new Category('Templates', 'templates', /.*-template/),
        new Category("Microservices", "microservices", /.*-service/),
        new Category("Ember Addons", "ember-addons", /ember-.*/),
        new Category("Core", "core", /mu-.*/),
        new Category("Tools", "tools"),
    ]

    repos.forEach((repo) => {assignRepoToCategories(repo, categories)});

    console.log(categories.forEach((category) => {
        console.log(category.name);
        console.log(category.repos)
        console.log('---')
    }));

    return categories;
}
