import { ExecutorContext } from '@nrwl/devkit';
import { exec } from 'child_process';
import { BuildExecutorSchema } from './schema';

export default async function* runExecutor(options: BuildExecutorSchema, context: ExecutorContext) {
  console.log('Executor ran for Build', options, context);
  if (!context) {
    yield { success: false };
  }
  const { root } = context.workspace.projects[context.projectName];
  await exec(`./${root}/`);
  return {
    success: true,
  };
}
