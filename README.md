# JSON API to Static importer

This Node.js script helps importing data a JSON API and generating files to use in a static website setup.

```js
const importer = require('static-importer')({
  // Options…
});

// Import all content types
importer()
  .then(() => console.log('All data successfully imported.'))
  .catch((err) => console.log('Something went wrong: ', err));

// Import a specific content type
importer('posts')
  .then(() => console.log('All posts successfully imported.'))
  .catch((err) => console.log('Something went wrong: ', err));
```

## Options

**`endpoint`** — The `endpoint` option is the API endpoint (WordPress, Contentful…). It is mandatory as it is being used to perform the requests to the API. Type-specific endpoints are computed by appending the type (e.g. `posts`) to the end of this URL.

```js
importer({
  endpoint: 'https://public-api.wordpress.com/rest/v1.1/mywordpresshandle.wordpress.com'
});
```

**`dest`** — The `dest` option is the directory in which files should be created. It is being wiped out, so make sure it does not contain any sensitive data. Defaults to `__dirname`.

```js
importer({
  dest: './'
});
```

**`contentTypes`** — The `contentTypes` option defines which content types should be imported and how. It is mandatory for any import to happen.

```js
importer({
  contentTypes: [
    { … },
    { … }
  ]
});
```

**`<contentType>.type`** — The `<contentType>.type` option defines the name of the content type. It is mandatory for it not to be considered invalid and discarded.

```js
{
  type: 'posts'
}
```

**`<contentType>.dest`** — The `<contentType>.dest` option defines where to output files for the currenty content type in the top-level `dest` directory option. Defaults to the name of the type (e.g. `posts`).

```js
{
  type: 'posts',
  dest: '_posts'
}
```


**`<contentType>.endpoint`** — The `<contentType>.endpoint` option overwrites the base endpoint for the type. Defaults to base `endpoint` joined with content name with a `/`.

```js
{
  type: 'posts',
  endpoint: 'https://something.different.com/'
}
```

**`<contentType>.name`** — The `<contentType>.name` option defines how to compute the name of a file. It accepts either string with `{tokens}` (e.g. `{slug}.md`), or a function exposing the data response for current item. Defaults to `{slug}.md`.

```js
{
  type: 'posts',
  name: ({ date, slug }) =>
    moment(date).format('YYYY-MM-DD') + '-' + slug + '.md'
}
```

**`<contentType>.yfm`** — The `<contentType>.yfm` options defines the shape (and possible default values) of the YAML Front Matter for the file. Each key from this object will end up in the YAML front matter, knowing that if its value is:
- falsey (e.g. `undefined`), the resulting value will be looked up in the API response based on the key name;
- a string (e.g. `foo`), the resulting value will be set to this same string.
- a function (exposing the API response), the resulting value will be the returned value from the function.

```js
{
  type: 'posts',
  yfm: {
    title: undefined,
    layout: 'post',
    author: (data) => data.author.login;
  }
}
```
