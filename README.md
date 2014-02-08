# step-slack-notify

Send a message to a Slack channel after build or deploy

## Options

### required

> Set the `webhook-url` as property of the step or as deploy target or application environment variable

- `webhook-url` - Slack webhook integration url.

### optional

- `passed-message` - Use this option to override the default passed message
- `failed-message` - Use this option to override the default failed message

## Example

```yml
build:
	after-steps:
		- slack-notify:
			webhook-url: "PUT YOUR SLACK WEBHOOK URL HERE"
```