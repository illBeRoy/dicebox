import * as Bundler from 'parcel-bundler';
import { PluginConf } from './types';
import { createDocsForPlugin } from './docs';

export function createParcelBundlerForProject(inputFiles: string[], outDir: string, pluginConf: PluginConf, { watch = false } = {}) {
  const outFile = `${pluginConf.pluginFilename}.js`;

  class RMMVDocsPackager extends Bundler.Packager {
    readonly dest: any;

    async start() {
      const pluginDocs = createDocsForPlugin(pluginConf);
      await this.dest.write(`${pluginDocs}\n`);
    }

    async addAsset(asset) {
      await this.dest.write(asset.generated.js);
    }
  }

  const bundler = new Bundler(inputFiles, {
    outDir,
    outFile,
    watch,
    sourceMaps: false
  });

  bundler.addPackager('js', RMMVDocsPackager);

  return bundler;
}
