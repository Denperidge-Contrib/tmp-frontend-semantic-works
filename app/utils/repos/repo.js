//import fetch from 'fetch';

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
}
