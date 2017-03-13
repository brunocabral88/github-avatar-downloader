var request = require('request');
var fs = require('fs');

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

function downloadImageByURL(url, filePath) {
	var options = {
		url: url,
		headers: {
			'User-Agent': 'GitHub Avatar Downloader - Student Project'
		}
	}
	var fileOptions = {
		flags: 'w',
		defaultEncoding: 'utf8',
		fd: null,
		mode: 0o666,
		autoClose: true
	}
	if (!fs.existsSync('avatars'))
			fs.mkdirSync('avatars');
	request.get(options).pipe(fs.createWriteStream(filePath,fileOptions));
}

getRepoContributors("jquery","jquery",(err,contributors) => {
	if (err) throw err;
	contributors.forEach((contributor) => {
		downloadImageByURL(contributor.avatar_url,`avatars/${contributor.login}.jpg`);
	})
});
