import Route from '@ember/routing/route';
import { tracked } from '@glimmer/tracking';
import { action } from '@ember/object';
import { htmlSafe } from '@ember/template';
import getRepos from 'semantic-works/utils/repos';


export default class DocsDocRoute extends Route {
    //@tracked currentDoc = "me"; //htmlSafe("<zero-md src='https://raw.githubusercontent.com/mu-semtech/mu-project/master/README.md'></zero-md>");

    
    async model(params){
        let repoName = params.name;

        
        let repos = await getRepos();
        
        let allRepos = [];
        repos.map((category) => allRepos = allRepos.concat(category.repos))
        let repo = allRepos.find((repo) => repo.name == repoName)
        return htmlSafe(`<zero-md src='${repo.contentBaseUrl}README.md'></zero-md>`);

    }
}
