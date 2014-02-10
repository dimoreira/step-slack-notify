# step-slack-notify

[![wercker status](https://app.wercker.com/status/4c6285fa5dfd3e7c587a43c217ca75cf "wercker status")](https://app.wercker.com/project/bykey/4c6285fa5dfd3e7c587a43c217ca75cf)

Send a message to a Slack channel after build or deploy

## Options

### required

> Set the `webhook-url` as property of the step or as deploy target or application environment variable

- `subdomain` - Your Slack team subdomain.
- `token` - Your slack integration token.
- `channel` - The Slack channel you want to push messages for.

### optional

- `passed-message` - Use this option to override the default passed message
- `failed-message` - Use this option to override the default failed message

## Example

```yml
build:
	after-steps:
		- slack-notify:
			subdomain: "testapp"
			token: "YOUR SLACK TOKEN"
			channel: "general"
```