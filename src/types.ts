export interface PluginConf {
  name: string;
  pluginFilename: string;
  author?: string;
  description?: string;
  parameters?: ParamDescription[];
}

export interface ParamDescription {
  name: string;
  description?: string;
  default?: string;
}
