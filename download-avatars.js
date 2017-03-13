var request = require('request');

function getRepoContributors(repoOwner, repoName, callback) {
	var options = {
	  url: `https://api.github.com/repos/${repoOwner}/${repoName}/contributors`,
	  headers: {
	    'User-Agent': 'request'
		}
	};
	request.get(options,(err,response,body) => {
		callback(err,body);
	});
}

getRepoContributors("jquery","jquery");