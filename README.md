# ![Blitz Static Site Generator](https://getblitz.io/assets/img/blitz-logo-small.png)

[![npm version](https://badge.fury.io/js/blitz-ssg.svg)](https://badge.fury.io/js/blitz-ssg)
[![npm](https://img.shields.io/npm/dm/blitz-ssg.svg)](https://www.npmjs.com/package/blitz-ssg)
[![Build Status](https://travis-ci.org/TimboKZ/blitz.svg?branch=master)](https://travis-ci.org/TimboKZ/blitz)
[![Coverage Status](https://coveralls.io/repos/github/TimboKZ/blitz/badge.svg?branch=development)](https://coveralls.io/github/TimboKZ/blitz?branch=development)

Blitz is a dead simple yet powerful static site generator using Node.js, Pug and bits of YAML here and there.

Documentation can be found on [Blitz's website](https://getblitz.io/). You might also be interested in the
[quick start guide.](https://getblitz.io/docs/0.1/getting-started-template/).

## Super quick start

Install Blitz once you have [Node.js and npm](https://docs.npmjs.com/getting-started/installing-node) ready:

```bash
npm install -g blitz-ssg
```

Create a new directory, enter it and initialise a Blitz project using the `mininmal` template:

```bash
mkdir blitz-example
cd blitz-example
blitz init -t minimal
```

Build the static site using Blitz:

```bash
blitz build
```

And you're done! Open `index.html` from the newly generated `build` directory in your favourite browsers to view the
website you've just generated.

As the name implies, the minimal template only shows off the basic features of Blitz. To find out more about it, head to
[the docs](https://getblitz.io/docs/) or read [the quick start guide](https://getblitz.io/docs/0.1/getting-started-template/).

## Developers

This repository is only used for development of the actual Blitz program, it was not meant to be cloned if you're
planning to use Blitz for static site generation. For that, either use the `Super quick start` section on this page or 
refer to the *quick start guide* links above.

I suggest you make use of `tslint.json` provided in this repository to ensure consistent coding style.