//import fetch from 'ember-fetch';
import fetch from 'node-fetch';
import Repo from '../repo.js';

async function listRepos(user='mu-semtech') {
    let response = await fetch(`https://api.github.com/orgs/${user}/repos`);
    let data = await response.json();
    return data;
}


export default async function getRepos(username) {

    let unparsedRepos = await listRepos(username);
    let repos = [];
    unparsedRepos.forEach((repo) => {
        if (repo.archived) {
            return;
        }

        let name = repo.name;
        let owner = repo.owner.login;
        let mainBranch = repo.default_branch;
        let contentBaseUrl = `https://raw.githubusercontent.com/${owner}/${name}/${mainBranch}/`;

        repos.push(new Repo(name, owner, repo.html_url, mainBranch, contentBaseUrl));
    });
    return repos;

}