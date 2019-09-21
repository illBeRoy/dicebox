![dicebox logo](./dicebox.svg)
# dicebox
> build tool for typescript based RPG Maker MV plugins

## About
Dicebox is a tool that allows you to program [RPG Maker MV](https://www.rpgmakerweb.com/products/programs/rpg-maker-mv) plugins. By default, RMMV plugins are plain JS files that are simply loaded as is into your game. Using dicebox you can actually leverage all ES6 + Typescript goodness, with type declarations for the RMMV runtime library and easily manageable editor config.

## Usage
### Creating a New Project
Create an empty directory, and run the `init` command:

```bash
npx dicebox init
```

After asking you a small set of questions, a new plugin project will be created in the current working directory.

### Structure of a Plugin Project
Once your project is created, it will contain the following files and directories:
1. `src` - the directory with the source code for your plugin
2. `plugin.conf.ts` - the config file for your plugin project
3. `rmmv.d.ts` - type declarations for RMMV runtime library

You can start working on `src/index.ts`. This is the default entrypoint.

### Building Your Project
In order to build your project, run `npm run build`. This will generate a single `.js` file in a new directory called `dist`.

Once this file is generated, you can put it in your game's `JS/plugins` directory, and then add and configure it using the RMMV editor interface.

### Configuring How Your Plugin Looks In The Editor
One of the perks of RMMV plugins is the fact that you can integrate with the editor, so you can interact with it via the RMMV editor GUI. If you wish to define it, you can use the information in the `plugin.conf.ts` file:

#### Adding Plugin Parameters to the Editor
If you want to add parameters which you'll be able to set via the editor, head over to your `plugin.conf.ts` file. Under the `parameters` property, you can list all the parameters that will be interactive via the editor:
```diff
import { PluginConf } from 'dicebox/conf';

export const config: PluginConf = {
  name: 'My Plugin',
  author: 'Me',
  pluginFilename: 'MyPlugin',
  description: 'This is my Plugin',
  parameters: [
+    {
+      name: 'Some Parameter',
+      description: 'This is an example parameter. Try modifying this or adding new ones!',
+      default: 'Hello, World!'
+    }
  ]
};
```

Once saved, open the plugin manager in your RMMV editor, and you'll see the parameter right there for you to play with.

## Attributions
### RMMV RTL Type Definitions
The type definitions used for RMMV runtime library are taken from AsterAtwood's [rmmv.d.ts](https://github.com/AsterAtwood/rmmv.d.ts) project.

