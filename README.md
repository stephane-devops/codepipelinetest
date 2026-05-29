# Welcome to your CDK TypeScript project

This is a blank project for CDK development with TypeScript.

The `cdk.json` file tells the CDK Toolkit how to execute your app.

## GitHub Setup

To connect this pipeline to your GitHub repository, follow these steps:

1.  **Create a GitHub Personal Access Token (Classic)**:
    - Go to your GitHub [Developer Settings](https://github.com/settings/tokens).
    - Generate a new token (classic) with `repo` and `admin:repo_hook` scopes.
2.  **Store the token in AWS Secrets Manager**:
    - Use the AWS CLI to store the token:
      ```bash
      aws secretsmanager create-secret --name github-token --secret-string <YOUR_TOKEN>
      ```
    - Alternatively, use the AWS Console to create a secret named `github-token`.
3.  **Update the repository info**:
    - Open `cdk.json`.
    - Replace the value of `"github_repo"` with your actual GitHub username and repository name (e.g., `"myuser/myrepo"`).
4.  **Deploy the pipeline**:
    - Run `npx cdk deploy`. This will create the pipeline and start the first execution.

## Useful commands

* `npm run build`   compile typescript to js
* `npm run watch`   watch for changes and compile
* `npm run test`    perform the jest unit tests
* `npx cdk deploy`  deploy this stack to your default AWS account/region
* `npx cdk diff`    compare deployed stack with current state
* `npx cdk synth`   emits the synthesized CloudFormation template
