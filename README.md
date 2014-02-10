# step-slack-notify

[![wercker status](https://app.wercker.com/status/4c6285fa5dfd3e7c587a43c217ca75cf "wercker status")](https://app.wercker.com/project/bykey/4c6285fa5dfd3e7c587a43c217ca75cf)

Send a message to a Slack channel after build or deploy

## Options

### required

> This variables can be set at the step on your ```wercker.yml``` file or at the deploy targer variables. Just declare them like: ```WERCKER_SLACK_NOTIFY_SUBDOMAIN```, ```WERCKER_SLACK_NOTIFY_TOKEN``` and ```WERCKER_SLACK_NOTIFY_CHANNEL```

- `subdomain` - Your Slack team subdomain.
- `token` - Your slack integration token.
- `channel` - The Slack channel you want to push messages for.

### optional

- `passed-message` - Use this option to override the default passed message
- `failed-message` - Use this option to override the default failed message

## Example with step variables

```yml
build:
	after-steps:
		- slack-notify:
			subdomain: "testapp"
			token: "YOUR SLACK TOKEN"
			channel: "general"
```

## Example with wercker deploy target variables

```yml
build:
	after-steps:
		- slack-notify:
			subdomain: $WERCKER_SLACK_NOTIFY_SUBDOMAIN
			token: $WERCKER_SLACK_NOTIFY_TOKEN
			channel: $WERCKER_SLACK_NOTIFY_CHANNEL
```

