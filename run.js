var request = require('request');
var exec = require('child_process').exec;
var dotenv = require('dotenv');
dotenv.load();

var failed_message;
var passed_message;
var message;
var icon_url;
var json;
var result;
var app_name = process.env["WERCKER_APPLICATION_NAME"];
var build_url = process.env["WERCKER_BUILD_URL"];
var deploy_url = process.env["WERCKER_DEPLOY_URL"];
var deploy_target = process.env["WERCKER_DEPLOYTARGET_NAME"];
var git_branch = process.env["WERCKER_GIT_BRANCH"];
var started_by = process.env["WERCKER_STARTED_BY"];
var channel = process.env["WERCKER_SLACK_NOTIFY_CHANNEL"];
var token = process.env["WERCKER_SLACK_NOTIFY_TOKEN"];
var subdomain = process.env["WERCKER_SLACK_NOTIFY_SUBDOMAIN"];


if (!process.env["WERCKER_SLACK_NOTIFY_SUBDOMAIN"]) {
	console.log('Please specify the subdomain property');
	process.exit(1);
}

if (!process.env["WERCKER_SLACK_NOTIFY_TOKEN"]) {
	console.log('Please specify the token property');
	process.exit(1);
}

if (!process.env["WERCKER_SLACK_NOTIFY_CHANNEL"]) {
	console.log('Please specify a channel');
	process.exit(1);
}

if (process.env["WERCKER_SLACK_NOTIFY_CHANNEL"] == /#*/) {
	console.log('Please specify the channel without the "#"');
	process.exit(1);
}

if (!process.env["WERCKER_SLACK_NOTIFY_FAILED_MESSAGE"]) {
	if (!process.env["DEPLOY"]) {
		failed_message = app_name+": <"+build_url+"|build> of "+git_branch+" by "+started_by+" failed";
	} else {
		failed_message = app_name+": <"+deploy_url+"|deploy> of "+git_branch+" to "+deploy_target+" by "+started_by+" failed";
	}
}

if (!process.env["WERCKER_SLACK_NOTIFY_PASSED_MESSAGE"]) {
	if (!process.env["DEPLOY"]) {
		passed_message = app_name+": <"+build_url+"|build> of "+git_branch+" by "+started_by+" passed";
	} else {
		passed_message = app_name+": <"+deploy_url+"|deploy> of "+git_branch+" to "+deploy_target+" by "+started_by+" passed";
	}
}

if (process.env["WERCKER_RESULT"] == "passed") {
	if (!process.env["WERCKER_SLACK_NOTIFY_PASSED_MESSAGE"]) {
		message = passed_message;
	} else {
		message = process.env["WERCKER_SLACK_NOTIFY_PASSED_MESSAGE"];
	}
} else
{
	if (!process.env["WERCKER_SLACK_NOTIFY_FAILED_MESSAGE"]) {
		message = failed_message;
	} else {
		message = process.env["WERCKER_SLACK_NOTIFY_FAILED_MESSAGE"];
	}
}

if (process.env["WERCKER_SLACK_NOTIFY_ON"] == "failed") {
	if (process.env["WERCKER_RESULT"] == "passed") {
		console.log('Skipping webhook post...')
		process.exit(0);
	}
}

icon_url = "https://1.gravatar.com/avatar/f777ecfdf484eed89dc6f215b78fef11?d=https%3A%2F%2Fidenticons.github.com%2F0b5ff56f4bd928b6c99d10dba2f1171a.png";

json = 'payload={"channel": "#'+channel+'", "username": "Wercker", "text": "'+message+'", "icon_url": "'+icon_url+'" }';
json = JSON.stringify(json);

command = 'curl -X POST --data '+json+' https://'+subdomain+'.slack.com/services/hooks/incoming-webhook?token='+token;
console.log(command);

exec(command, function(err, stdout, stderr) {
	if (err) { console.log(err) }
	if (stdout) { console.log(stdout) }
	if (stderr) { console.log(stderr) }
});
