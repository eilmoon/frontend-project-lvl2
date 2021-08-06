import treeRender from './treeRender.js';

const renderers = {
  tree: treeRender,
};

const getRenderer = format => ({ toString: renderers[format] });

export default getRenderer;
