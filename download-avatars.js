var request = require('request');

var GITHUB_USER = 'bruno.cabral88@hotmail.com';
var GITHUB_TOKEN = '07761747cb01295b5346c5bb5aba07f5c8d35a55';

function getRepoContributors(repoOwner, repoName, callback) {
	var options = {
	  url: `https://${GITHUB_USER}:${GITHUB_TOKEN}@api.github.com/repos/${repoOwner}/${repoName}/contributors`,
	  headers: {
	    'User-Agent': 'GitHub Avatar Downloader - Student Project'
		}
	};
	request.get(options,(err,response,body) => {
		callback(err,JSON.parse(body));
	});
}

getRepoContributors("jquery","jquery",(err,contributors) => {
	if (err) throw err;
	contributors.forEach((contributor) => {
		console.log(contributor.avatar_url);
	})
});