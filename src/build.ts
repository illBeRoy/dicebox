import * as shellJs from 'shelljs';
import * as fs from 'fs';
import * as path from 'path';
import { loadConfig } from './conf';
import { PluginConf } from './types';
import { createDocsForPlugin } from './docs';

interface BuildOpts {
  file: string;
  outDir: string;
}

export function build({ file, outDir }: BuildOpts) {
  const pluginConf = loadConfig();
  const outFile = path.join(outDir, `${pluginConf.pluginFilename}.js`);
  bundle(file, outDir, outFile);
  addDocCommentsToFile(outFile, pluginConf);
}

const bundle = (inFile: string, outDir: string, outFile: string) => {
  shellJs.exec(`npx parcel build ${inFile} --out-dir ${outDir} --out-file ${outFile} --no-source-maps`);
};

const addDocCommentsToFile = (file: string, conf: PluginConf) => {
  const pluginDocs = createDocsForPlugin(conf);
  fs.writeFileSync(file, `${pluginDocs}\n${shellJs.cat(file)}`);
};
