import * as path from 'path';
import * as tsNode from 'ts-node';
import { PluginConf } from './types';

tsNode.register();

export const loadConfig = (): PluginConf => {
  const configFile = 'plugin.conf.ts';
  const { config } = require(path.join(process.cwd(), configFile));
  return config;
};
