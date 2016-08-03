# JSON API to Static importer

This Node.js script helps importing data from a JSON API and generating files to use in a static website setup.

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

**`contentTypes`** — The `contentTypes` mandatory option defines which content types should be imported and how.

```js
importer({
  contentTypes: [
    { … },
    { … }
  ]
});
```

**`<contentType>.name`** — The `<contentType>.name` mandatory option defines the name of the content type. It acts as a unique identifier for each type.

```js
{
  name: 'posts'
}
```

**`<contentType>.endpoint`** — The `<contentType>.endpoint` mandatory option determines which API endpoint will be requested for the current type.

```js
{
  name: 'posts',
  endpoint: 'https://api.example.com/1.1/posts'
}
```

**`<contentType>.dest`** — The `<contentType>.dest` option defines where to output files for the content type. Defaults to `./.import`.

```js
{
  name: 'posts',
  endpoint: 'https://api.example.com/1.1/posts',
  dest: '_posts'
}
```


**`<contentType>.filename`** — The `<contentType>.filename` option defines the filename pattern to output files for the content type.
It accepts either string with `{tokens}` (e.g. `{slug}.md`), or a function exposing the data response for current item. Defaults to `{slug}.md`.

```js
{
  name: 'posts',
  endpoint: 'https://api.example.com/1.1/posts',
  filename: ({ date, slug }) =>
    `${moment(date).format('YYYY-MM-DD')}-${slug}.md`
}
```

**`<contentType>.responsePath`** — The `<contentType>.responsePath` option defines the path to the relevant collection in the API response. Any unfound, falsey or `true` value will result into using the root of the response. Defaults to `null`.

```js
{
  name: 'posts',
  endpoint: 'https://api.example.com/1.1/posts',
  responsePath: 'data.posts'
}
```

**`<contentType>.yfm`** — The `<contentType>.yfm` options defines the shape (and possible default values) of the YAML Front Matter for the file. Each key from this object will end up in the YAML front matter, knowing that if its value is:
- falsey or `true` (e.g. `undefined`), the resulting value will be looked up in the API response based on the key name;
- a string (e.g. `foo`), the resulting value will be set to this same string.
- a function (exposing the API response), the resulting value will be the returned value from the function.

```js
{
  name: 'posts',
  endpoint: 'https://api.example.com/1.1/posts',
  yfm: {
    title: true,
    layout: 'post',
    author: (data) => data.author.login;
  }
}
```

## Example

* [WordPress to Jekyll](https://github.com/edenspiekermann/wp-importer/blob/master/example/wordpress-to-jekyll.js)
