import { config } from '../plugin.conf';

const parameters = PluginManager.parameters(config.pluginFilename);
const someParameter = parameters['Some Parameter'];
console.log(someParameter);
