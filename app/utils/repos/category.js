import data from './data';
//const data = require('./data.json');
const overrides = data.overrides;

export class Category {
    constructor(id, name, regex) {
        this.id = id;
        this.name = name;
        this.regex = regex;
        this.repos = [];
    }
}



function checkForOverrides(repo, categories) {
    let overrideMatched = false;

    overrides.forEach((override) => {
        // If an override 
        if (overrideMatched) { return; }
        let regex = new RegExp(override.regex);

        if (repo.name.match(regex)) {

            overrideMatched = true;
            
            // category can be set to false to not add to docs
            if (override.category != false) {
                categories
                    .find(category => category.id.toLowerCase() == override.category.toLowerCase())
                    .repos.push(repo);
            }
        }
    });

    return overrideMatched;

    
}


export function assignRepoToCategories(repo, categories) {
    if (checkForOverrides(repo, categories)) return;

    console.log("Regular assigning " + repo.name)

    for (let i = 0; i < categories.length; i++) {
        let category = categories[i];

        if (repo.name.match(category.regex)) {
            category.repos.push(repo);
            return;
        }
    }
}