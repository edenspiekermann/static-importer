# WordPress to Static importer

This Node.js script helps importing data from the WordPress API and generating files to use in a static website configuration.

```js
const wpImporter = require('wpImporter');

wpImporter(options);
```

## Options

**`handle`** — The `handle` option is the name of your WordPress website. It is being used to retrieve the API URL, and perform the requests to the API. It is mandatory.

```js
wpImporter({
  handle: 'mywordpresshandle'
});
```

**`dest`** — The `dest` option is the directory in which files should be created. It is being wiped out, so make sure it does not contain any sensitive data. Defaults to `./wpimporter`.

```js
wpImporter({
  dest: './'
});
```

**`contentTypes`** — The `contentTypes` option defines which content types should be imported and how. It is mandatory for any import to happen.

**`contentTypes{}.dest`** — The `contentTypes{}.dest` option defines where to output files for the currenty content type in the top-level `dest` directory option. Defaults to the name of the type (e.g. `posts`).

```js
wpImporter({
  contentTypes: {
    posts: {
      dest: '_posts'
    }
  }
});
```

**`contentTypes{}.name`** — The `contentTypes{}.name` option defines how to compute the name of a file. It accepts either string with `{tokens}` (e.g. `{slug}.md`), or a function exposing the data response for current item. Defaults to `{slug}.md`.

```js
const moment = require('moment')

wpImporter({
  contentTypes: {
    posts: {
      dest: '_posts',
      name: function (data) {
        const date = moment(data.date);
        const ext = 'md';
        return date.format('YYYY-MM-DD')
          + '-' + data.slug
          + '.' + extension ;
      }
    }
  }
});
```

**`contentTypes{}.frontMatter`** — The `contentTypes{}.frontMatter` options defines the shape (and possible default values) of the YAML Front Matter for the file. Each key from this object will end up in the YAML front matter, knowing that if its value is:
- falsey (e.g. `undefined`), the resulting value will be looked up in the API response based on the key name;
- a string (e.g. `foo`), the resulting value will be set to this same string.
- a function (exposing the API response), the resulting value will be the returned value from the function.


```js
const moment = require('moment');

wpImporter({
  contentTypes: {
    posts: {
      dest: '_posts',
      name: '{slug}.md',
      frontMatter: {
        title: undefined,
        layout: 'post',
        author: function (data) {
          return data.author.login;
        }
      }
    }
  }
});
```
