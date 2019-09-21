import { loadConfig } from './conf';
import { createParcelBundlerForProject } from './parcel';

interface WatchOpts {
  file: string;
  outDir: string;
}

export async function watch({ file, outDir }: WatchOpts) {
  const pluginConf = loadConfig();
  const bundler = createParcelBundlerForProject([file], outDir, pluginConf, { watch: true });
  await bundler.bundle();
  await forever();
}

const forever = (): Promise<void> =>
  new Promise(() => void 0);
