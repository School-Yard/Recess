Recess
=======

A framework for building [Card-Catalog](https://github.com/TxSSC/Card-Catalog) based apps on. Inspired by [Express](https://github.com/visionmedia/express) and [Union](https://github.com/flatiron/union).

[![Build Status](https://secure.travis-ci.org/School-Yard/Recess.png?branch=master)](http://travis-ci.org/School-Yard/Recess)

```js
var recess = require('recess'),
    manager = require('catalog_manager');

var app = recess();

app.set('connection', conn);
app.card(manager);

app.on('ready', function() {
  app.listen(3000);
});

app.create();
```

## Install

```bash
$ npm install schoolyard-recess
```

## Usage

Recess is simply a helper for building an application on top of [Card-Catalog](https://github.com/TxSSC/Card-Catalog). It provides a clean interface to setting up categories and cards as well as some helpers attached to the request and response object.

Available helper methods on a recess object are:

**set:** options for instantiating a Category

```js
app.set('setting', 'value');
```

**before:** middleware function to run before dispatching to a Category instance.

```js
app.before(function(req, res, next) {});
```

**card:** a Card to use in your Card-Catalog app.

```js
app.card(Manager);
```

**create:** initialize a catalog by loading all the available cards and setting up a template cache. Emits a `ready` event when the catalog has been built.

**listen:** create an http server and listen on a given port.

```js
app.listen(process.env.PORT);
```

**For more information view the documentation on the [Card-Catalog](https://github.com/TxSSC/Card-Catalog) project**

## Tests

All tests are written in [mocha](https://github.com/visionmedia/mocha) and should be run with npm.

```bash
$ npm test
```

## Thanks

Recess is heavily based off and inspired by the work done by TJ Holowaychuk and all the other contributers to [Express](https://github.com/visionmedia/express) and [Connect](https://github.com/senchalabs/connect). It borrows code from both the Express and Connect projects and tries to give attribution where code is used.