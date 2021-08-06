import lodash from 'lodash';

const { isObject, flattenDeep } = lodash;

const indent = tab => '  '.repeat(tab);

const stringify = (value, tab) => {
  if (!isObject(value)) {
    return value;
  }
  return JSON.stringify(value, null, 2)
    .split('\n')
    .map((str, index, arr) => {
      if (index === 0) {
        return str;
      }
      if (index === arr.length - 1) {
        return `${indent(tab + 1)}${str}`;
      }
      return `${indent(tab + 2)}${str}`;
    })
    .join('\n')
    .replace(/"/g, '');
};

const getDiffString = (name, value, tab, mod) =>
  `${indent(tab)}${mod}${name}: ${stringify(value, tab)}`;

const builders = {
  unchanged: ({ name, oldValue }, tab) => getDiffString(name, oldValue, tab, '  '),
  deleted: ({ name, oldValue }, tab) => getDiffString(name, oldValue, tab, '- '),
  added: ({ name, newValue }, tab) => getDiffString(name, newValue, tab, '+ '),
  changed: ({ name, oldValue, newValue }, tab) => [
    getDiffString(name, oldValue, tab, '- '),
    getDiffString(name, newValue, tab, '+ '),
  ],
  merged: ({ name, children }, tab, cb) => [
    `${indent(tab + 1)}${name}: {`,
    cb(children, tab + 1),
    `${indent(tab + 1)}}`,
  ],
};

const buildMerged = (tree, tab) =>
  tree.map((node) => {
    const build = builders[node.type];
    return build(node, tab + 1, buildMerged);
  });

export default (ast) => {
  const builded = ['{', buildMerged(ast, 0), '}'];
  return flattenDeep(builded).join('\n');
};
