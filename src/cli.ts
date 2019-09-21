#!/usr/bin/env node
import { ArgumentParser } from 'argparse';
import { build } from './build';
import { init } from './init';

async function main() {
  const argparser = new ArgumentParser();
  const command = argparser.addSubparsers({ title: 'command', dest: 'command' });

  const initCmd = command.addParser('init', { description: 'create a new rmmv plugin project' });

  const buildCmd = command.addParser('build', { description: 'build plugin file in project directory' });
  buildCmd.addArgument(['-o', '--out-dir'], {
    help: 'output directory to put the generated files in',
    defaultValue: 'dist'
  });

  buildCmd.addArgument('file', {
    help: 'entry point file',
    defaultValue: 'src/index.ts'
  });

  const args = argparser.parseArgs();

  switch (args.command) {
    case 'init': {
      await init();
      break;
    }

    case 'build': {
      await build({
        file: args.file,
        outDir: args.out_dir
      });

      break;
    }
  }
}

main()
  .then(() => process.exit(0))
  .catch(err => {
    console.error(err); // tslint:disable-line
    process.exit(1);
  });
