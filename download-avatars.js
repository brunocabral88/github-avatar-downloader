var request = require('request');
var fs = require('fs');
var env = require('env').config();
var GITHUB_USER = process.env.GITHUB_USER;
var GITHUB_TOKEN = process.env.GITHUB_TOKEN;

var user = process.argv[2];
var repo = process.argv[3];

if (!user || !repo) {
	console.error('Please provide both a user and the repo!');
	return -1;
}

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

getRepoContributors(user,repo,(err,contributors) => {
	if (err) throw err;
	contributors.forEach((contributor) => {
		downloadImageByURL(contributor.avatar_url,`avatars/${contributor.login}.jpg`);
	})
});
