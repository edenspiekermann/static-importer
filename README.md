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

**`<contentType>.name`** — The `<contentType>.name` option defines the name of the content type. It is mandatory for it not to be considered invalid and discarded.

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

**`<contentType>.dest`** — The `<contentType>.dest` option defines where to output files and under which name for the currenty content type. Defaults to `./.import/{slug}.md`. It accepts either string with `{tokens}` (e.g. `{slug}.md`), or a function exposing the data response for current item.

```js
{
  name: 'posts',
  endpoint: 'https://api.example.com/1.1/posts',
  dest: ({ date, slug }) =>
    moment(date).format('YYYY-MM-DD') + '-' + slug + '.md'
}
```

**`<contentType>.yfm`** — The `<contentType>.yfm` options defines the shape (and possible default values) of the YAML Front Matter for the file. Each key from this object will end up in the YAML front matter, knowing that if its value is:
- falsey (e.g. `undefined`), the resulting value will be looked up in the API response based on the key name;
- a string (e.g. `foo`), the resulting value will be set to this same string.
- a function (exposing the API response), the resulting value will be the returned value from the function.

```js
{
  name: 'posts',
  endpoint: 'https://api.example.com/1.1/posts',
  yfm: {
    title: undefined,
    layout: 'post',
    author: (data) => data.author.login;
  }
}
```
