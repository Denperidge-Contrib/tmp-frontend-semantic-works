import data from './data';
//const data = require('./data.json');
const overrides = data.overrides;

export class Category {
    constructor(id, name, regex, regexPriority) {
        this.id = id;
        this.name = name;
        this.regex = new RegExp(regex, 'i');
        this.regexPriority = regexPriority
        this.repos = [];
    }
}



function checkForOverrides(repo, categories) {
    let overrideMatched = false;

    overrides.forEach((override) => {
        // If an override 
        if (overrideMatched) { return; }
        let regex = new RegExp(override.regex, 'i');

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


    // Lower priority is better
    let selectedCategory = {regexPriority: 99};
    categories.forEach((checkingCategory) => {
        if (repo.name.match(checkingCategory.regex)) {
            if (checkingCategory.regexPriority < selectedCategory.regexPriority) {
                selectedCategory = checkingCategory;
            }
        }
    });
    
    selectedCategory.repos.push(repo);
}