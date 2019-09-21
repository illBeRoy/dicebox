import * as path from 'path';
import * as fs from 'fs';
import * as prompts from 'prompts';
import * as kebabCase from 'lodash.kebabcase';
import * as shellJs from 'shelljs';
import * as ejs from 'ejs';

interface InitialProjectSettings {
  projectName: string;
  projectAuthor: string;
  pluginDescription: string;
  pluginFilename: string;

  projectNameKebabCase: string;
}

export async function init() {
  const initialProjectSettings = await askForInitialProjectSettings();

  const boilerplateDir = path.join(__dirname, '..', '..', 'boilerplate');
  shellJs.cp('-r', `${boilerplateDir}/**/*`, '.');

  const ejsFiles = shellJs.ls('./**/*.ejs');
  ejsFiles.forEach(ejsFile => {
    const outputFilename = ejsFile.split('.').slice(0, -1).join('.');
    const renderedContent = ejs.render(shellJs.cat(ejsFile), initialProjectSettings);
    fs.writeFileSync(outputFilename, renderedContent);
    shellJs.rm(ejsFile);
  });

  shellJs.exec('npm install');
}

const askForInitialProjectSettings = async (): Promise<InitialProjectSettings> => {
  const abort = () => {
    console.log('aborted...') // tslint:disable-line
    process.exit();
  };

  const { projectName } = await prompts({
    message: 'Plugin Display Name (can include spaces)',
    type: 'text',
    name: 'projectName',
  }, { onCancel: abort });
  const projectNameKebabCase = kebabCase(projectName);

  const { pluginFilename } = await prompts({
    message: 'Plugin File Name',
    type: 'text',
    name: 'pluginFilename',
    validate: n => /^[a-zA-Z0-9]+$/.test(n) || 'Filename must be PascalCase, e.g.: MyPlugin'
  }, { onCancel: abort });

  const { projectAuthor } = await prompts({
    message: 'Author Name',
    type: 'text',
    name: 'projectAuthor'
  }, { onCancel: abort });

  const { pluginDescription } = await prompts({
    message: 'Plugin Description',
    type: 'text',
    name: 'pluginDescription'
  }, { onCancel: abort });

  return {
    projectName,
    projectNameKebabCase,
    pluginFilename,
    projectAuthor,
    pluginDescription
  };
};
