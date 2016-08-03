const staticImporter = require('../src');
const moment = require('moment');

const handle = process.env.HANDLE;
const postsOpts = {
  // Unique identifier for collection
  name: 'posts',
  // API endpoint
  endpoint: `https://public-api.wordpress.com/rest/v1.1/sites/${handle}.wordpress.com/posts`,
  // WordPress returns: { found: …, posts: [ … ], meta: { … } }
  responsePath: 'posts',
  // Destination folder
  dest: '_posts',
  // Filename pattern (YYYY-MM-DD-slug.md)
  filename: ({ date, slug }) =>
    `${moment(date).format('YYYY-MM-DD')}-${slug}.md`,
  contentPath: (data) => data.content.replace('&nbsp;', ''),
  // YAML Front Matter specification
  yfm: {
    title: true,
    layout: 'post',
    author: ({ author }) => author.nice_name
  }
};

// Prepare the importer
const importer = staticImporter({
  contentTypes: [ postsOpts ]
});

// Run the importer
importer()
  .then(() => console.log('Import over.'))
  .catch((err) => console.log('Something went wrong: ', err));
