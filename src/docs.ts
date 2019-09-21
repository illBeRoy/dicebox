import { PluginConf } from './types';

export function createDocsForPlugin(conf: PluginConf): string {
  let comment = '/*:';
  const addCommentParam = (param: string, value: string) =>
    comment = `${comment}\n` +
      ` * @${param} ${value}`;
  const addCommentSpace = () =>
    comment = `${comment}\n *`;

  addCommentParam('plugindesc', conf.name);

  if (conf.author) {
    addCommentParam('author', conf.author);
  }

  if (conf.description) {
    addCommentParam('help', conf.author);
  }

  if (conf.parameters) {
    addCommentSpace();
    conf.parameters.forEach(param => {
      addCommentParam('param', param.name);

      if (param.description) {
        addCommentParam('desc', param.description);
      }

      if (param.default) {
        addCommentParam('default', param.default);
      }
    });
  }

  comment = `${comment}\n */`;

  return comment;
}
