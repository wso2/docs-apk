# check-md

[![NPM version][npm-image]][npm-url]
[![build status][travis-image]][travis-url]
[![Test coverage][codecov-image]][codecov-url]
[![David deps][david-image]][david-url]
[![Known Vulnerabilities][snyk-image]][snyk-url]
[![NPM download][download-image]][download-url]

[npm-image]: https://img.shields.io/npm/v/check-md.svg?style=flat-square
[npm-url]: https://npmjs.org/package/check-md
[travis-image]: https://img.shields.io/travis/whxaxes/check-md.svg?style=flat-square
[travis-url]: https://travis-ci.org/whxaxes/check-md
[codecov-image]: https://codecov.io/gh/whxaxes/check-md/branch/master/graph/badge.svg
[codecov-url]: https://codecov.io/gh/whxaxes/check-md
[david-image]: https://img.shields.io/david/whxaxes/check-md.svg?style=flat-square
[david-url]: https://david-dm.org/whxaxes/check-md
[snyk-image]: https://snyk.io/test/npm/check-md/badge.svg?style=flat-square
[snyk-url]: https://snyk.io/test/npm/check-md
[download-image]: https://img.shields.io/npm/dm/check-md.svg?style=flat-square
[download-url]: https://npmjs.org/package/check-md

A simple cli for checking dead links of markdown.

## Usage

```bash
$ npm i check-md --save
$ npx check-md
```

## Options

```
Usage: check-md [options]

Options:
  -v, --version            output the version number
  -f, --fix                Check and try to fix
  -c, --cwd [path]         Working directory of check-md, default to process.cwd()
  -r, --root [path]        Checking url root, default to ./
  -p, --preset [name]      Preset config(eg vuepress, default)
  -P, --pattern [pattern]  Glob patterns, default to **/*.md
  -i, --ignore [pattern]   Ignore patterns, will merge to pattern, default to **/node_modules
  --exit-level [level]     Process exit level, default to error, other choice is warn and none, it will not exit if setting to none
  --default-index [index]  Default index in directory, default to README.md,readme.md
  -h, --help               output usage information
```

configure in `package.json`

```json
{
  "check-md": {
    "cwd": "./",
    "defaultIndex": [ "index.md" ],
    "exitLevel": "warn",
  }
}
```

##  Example

Running cli in directory of [test.md](https://github.com/whxaxes/check-md/blob/master/test/fixtures/docs1/test.md)

The result is

```
Checking markdown...

1 warning was found

  Should use .md instead of .html: [test6](./other.html#ctx-get-name) (/Users/Workspace/check-md/test/fixtures/docs1/test.md:15:1)


5 dead links was found

  Url link is empty: [test1]() (/Users/Workspace/check-md/test/fixtures/docs1/test.md:5:5)
  Hash is not found: [test8](/other#cccc) (/Users/Workspace/check-md/test/fixtures/docs1/test.md:19:1)
  File is not found: [test9](/123.md#cccc) (/Users/Workspace/check-md/test/fixtures/docs1/test.md:21:1)
  Hash should slugify: [test12](./other.md#ctx.get(name) (/Users/Workspace/check-md/test/fixtures/docs1/test.md:27:1)
  File is not found: [test16](./123.md#ctx.get(name) (/Users/Workspace/check-md/test/fixtures/docs1/test.md:39:1)

Executes with --fix to fix automatically

Checking failed
```