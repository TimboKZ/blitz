# ![Blitz Static Site Generator](https://getblitz.io/assets/img/blitz-logo-small.png)

[![Build Status](https://travis-ci.org/TimboKZ/blitz.svg?branch=master)](https://travis-ci.org/TimboKZ/blitz)

Blitz is a dead simple yet powerful static site generator using Node, Pug and bits of YAML here and there.

As mentioned above, Blitz uses Node and NPM. Check out [this page](https://docs.npmjs.com/getting-started/installing-node)
to find out how to install them. The content files consist of YAML and Markdown, while the page templates are written
using Pug (previously known as )


## Documentation and guides

Blitz documentation can be found on [its website](https://getblitz.io/). Links to quick start guides
will appear soon.

## Super quick start

Install Blitz once you have NPM ready:

```
npm install -g blitz-ssg
```

Create a new directory, enter it and initialise a Blitz project using the `mininmal` template:

```
mkdir blitz-example
cd blitz-example
blitz init -t minimal
```

Build the static site using Blitz:

```
blitz build
```

And you're done! Open the newly generated `build` directory inside `blitz-example` to find your generate static site.

> As the name implies, `minimal` template has the minimum configuration needed to show Blitz in action. There are 2
important things to note:
>
> First of all, a whole bunch of features of Blitz are not displayed in this template. This was done on purpose, to
> show how simple Blitz can be when it matters.
>
> Secondly, Blitz only needs `blitz.yml` to function, so even the `minimal` template has a lot of redundancy.

## Developers

This repository is only used for development of the actual Blitz program, it was not meant to be cloned if you're
planning to use Blitz for static site generation. For that, either use the `Super quick start` section on this page or 
refer to the *quick start guide* links above.

I suggest you make use of `tslint.json` provided in this repository to ensure consistent coding style.