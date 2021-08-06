#!/usr/bin/env node
import program from 'commander';
import genDiff from '../index.js';

program
  .arguments('<filepath1> <filepath2>')
  .description('Compares two configuration files and shows a difference.')
  .version('0.0.1')
  .option('-f, --format [type]', 'Output format')
  .action((filepath1, filepath2) => {
    console.log(genDiff(filepath1, filepath2, program.format));
  });

program.parse(process.argv);
