//import fetch from 'fetch';
import data from './data';

export default class Repo {
    constructor(name, owner, repoUrl, mainBranch, contentBaseUrl) {
        this.name = name;
        this.owner = owner;
        this.repoUrl = repoUrl;
        this.mainBranch = mainBranch;
        this.contentBaseUrl = contentBaseUrl;
    }

    fileUrl(filename) {
        return this.contentBaseUrl + filename;
    }

    async fileContents(filename) {
        return await fetch(this.fileUrl(filename));
    }

    get displayName() {
        return unslug(this.name);
    }
}

function unslug(slug) {
    let removePrefix = slug;
    data.prefixes.forEach((prefix) => {
        let regex = new RegExp(`^${prefix}`, 'i')
        removePrefix = removePrefix.replace(regex, '');
    }) 
    /*
    console.log(slug.indexOf('mu-'))
    console.log(slug.substring(3))
    console.log(removePrefix)
    */
    let removeDashes = removePrefix.replace(/-/g, ' ');
    let capitalise = removeDashes[0].toUpperCase() + removeDashes.substring(1);

    return capitalise;

}
