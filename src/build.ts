import { loadConfig } from './conf';
import { createParcelBundlerForProject } from './parcel';

interface BuildOpts {
  file: string;
  outDir: string;
}

export async function build({ file, outDir }: BuildOpts) {
  const pluginConf = loadConfig();
  const bundler = createParcelBundlerForProject([file], outDir, pluginConf);
  await bundler.bundle();
}
