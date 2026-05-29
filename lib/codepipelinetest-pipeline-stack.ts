import * as cdk from 'aws-cdk-lib';
import { Construct } from 'constructs';
import { CodePipeline, CodePipelineSource, ShellStep } from 'aws-cdk-lib/pipelines';
import * as assert from "node:assert";
import { CodepipelinetestStack } from './codepipelinetest-stack';

// Define a Stage to hold your application stack
class AppStage extends cdk.Stage {
  constructor(scope: Construct, id: string, props?: cdk.StageProps) {
    super(scope, id, props);
    new CodepipelinetestStack(this, 'AppLayer');
  }
}

export class CodepipelinetestPipelineStack extends cdk.Stack {
  constructor(scope: Construct, id: string, props?: cdk.StackProps) {
    super(scope, id, props);

    const githubRepo = this.node.tryGetContext('github_repo') || assert.fail('github_repo context must be provided');

    const pipeline = new CodePipeline(this, 'Pipeline', {
      pipelineName: 'githubtest',
      synth: new ShellStep('Synth', {
        input: CodePipelineSource.gitHub(githubRepo, 'main'),
        commands: ['npm ci', 'npm run build', 'npx cdk synth'],
      }),
    });

    // 4. Add the deployment stage to the pipeline
    pipeline.addStage(new AppStage(this, 'Deploy'));
  }
}
