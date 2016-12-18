# ![Blitz Static Site Generator](https://getblitz.io/assets/img/blitz-logo-small.png)

[![npm version](https://badge.fury.io/js/blitz-ssg.svg)](https://badge.fury.io/js/blitz-ssg)
[![npm](https://img.shields.io/npm/dm/blitz-ssg.svg)](https://www.npmjs.com/package/blitz-ssg)
[![David](https://img.shields.io/david/TimboKZ/blitz.svg)](https://www.npmjs.com/package/blitz-ssg)
[![Travis](https://img.shields.io/travis/TimboKZ/blitz.svg?label=Linux%20%26%20OS%20X)]()
[![AppVeyor](https://img.shields.io/appveyor/ci/timbokz/blitz.svg?label=Windows)]()
[![Coverage Status](https://coveralls.io/repos/github/TimboKZ/blitz/badge.svg?branch=development)](https://coveralls.io/github/TimboKZ/blitz?branch=development)

Blitz is a dead simple yet powerful static site generator using Node.js, Pug and bits of YAML here and there.

Documentation can be found on [Blitz's website](https://getblitz.io/). You might also be interested in the
[quick start guide](https://getblitz.io/docs/0.1/getting-started-template/).

## Super quick start

Install Blitz once you have [Node.js and npm](https://docs.npmjs.com/getting-started/installing-node) ready:

```bash
npm install -g blitz-ssg
```

Create a new directory, enter it and initialise a Blitz project using the `portfolio` template:

```bash
mkdir blitz-example
cd blitz-example
blitz init -t portfolio
```

Build the static site using Blitz:

```bash
blitz build
```

And you're done! Open `index.html` from the newly generated `build` directory in your favourite browser to view the
website you've just generated. For more templates, check out [this page](https://getblitz.io/docs/0.1/getting-started-template/).

## Developers

This repository contains the source code of Blitz app, do **not** clone it if you want to use Blitz as opposed to
helping developing it. For an example website built using Blitz, consider [the source code](https://github.com/TimboKZ/blitz-website)
of Blitz's official website.

I suggest you make use of `tslint.json` provided in this repository to ensure consistent coding style.