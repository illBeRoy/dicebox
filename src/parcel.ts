import * as Bundler from 'parcel-bundler';
import * as fs from 'fs';
import { PluginConf } from './types';
import { createDocsForPlugin } from './docs';

export function createParcelBundlerForProject(inputFiles: string[], outDir: string, pluginConf: PluginConf, { watch = false } = {}) {
  const outFile = `${pluginConf.pluginFilename}.js`;
  const pluginDocs = createDocsForPlugin(pluginConf);

  const bundler = new Bundler(inputFiles, {
    outDir,
    outFile,
    watch,
    minify: true,
    hmr: false,
    sourceMaps: false
  });

  bundler.on('bundled', bundle => {
    const bundles = Array.from<any>(bundle.childBundles).concat([bundle]);
    const jsBundle = bundles.find(bundle => bundle.entryAsset && bundle.entryAsset.type === 'js');
    const jsCode = fs.readFileSync(jsBundle.name);
    fs.writeFileSync(jsBundle.name, `${pluginDocs}\n${jsCode}`);
  });

  return bundler;
}
