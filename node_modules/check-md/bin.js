#! /usr/bin/env node

const path = require('path');
const fs = require('fs');
const { Command } = require('commander');
const { checkAndThrow, presetConfig } = require('./');
const packInfo = require('./package.json');
const program = new Command()
  .version(packInfo.version, '-v, --version')
  .usage('[options]')
  .option('-f, --fix', 'Check and try to fix')
  .option('-c, --cwd [path]', 'Working directory of check-md, default to process.cwd()')
  .option('-r, --root [path]', `Checking url root, default to ${presetConfig.default.root.join(',')}`)
  .option('-p, --preset [name]', `Preset config(eg ${Object.keys(presetConfig).join(', ')})`)
  .option('-P, --pattern [pattern]', `Glob patterns, default to ${presetConfig.default.pattern}`)
  .option('-i, --ignore [pattern]', `Ignore patterns, will merge to pattern, default to ${presetConfig.default.ignore.join(',')}`)
  .option('--exit-level [level]', `Process exit level, default to ${presetConfig.default.exitLevel}, other choice is warn and none, it will not exit if setting to none`)
  .option('--default-index [index]', `Default index in directory, default to ${presetConfig.default.defaultIndex.join(',')}`);

program.parse(process.argv);

const options = {
  fix: !!program.fix,
  cwd: program.cwd,
  preset: program.preset,
  exitLevel: program.exitLevel,
  pattern: program.pattern ? program.pattern.split(',') : undefined,
  ignore: program.ignore ? program.ignore.split(',') : undefined,
  defaultIndex: program.defaultIndex ? program.defaultIndex.split(',') : undefined,
};

Object.keys(options).forEach(k => {
  if (options[k] === undefined) delete options[k];
});

const packageInfoPath = path.resolve(process.cwd(), 'package.json');
const packageInfo = fs.existsSync(packageInfoPath) ? JSON.parse(fs.readFileSync(packageInfoPath, { encoding: 'utf-8' })) : {};
if (packageInfo['check-md']) {
  // read from package.json
  Object.assign(options, packageInfo['check-md']);
}

checkAndThrow(options);
