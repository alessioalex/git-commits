# git-commits

Get the commit history of a repo in a Node streamy way (shelling out to git-rev-list(1)).

## Usage

```js
gitCommits(repoPath, options)
```

Where `options` can contain a lot of properties (read ./index.js) for limiting the number of commits, or filtering the commits based on a search term etc.

Example:

```js
var gitCommits = require('git-commits');
var path = require('path');
var repoPath = path.resolve(process.env.REPO || (__dirname + '/.git'));

gitCommits(repoPath, {
  limit: 2
}).on('data', function(commit) {
  console.log(commit);
  console.log('\n------------------\n');
}).on('error', function(err) {
  throw err;
}).on('end', function() {
  console.log("That's all, folks!");
});
```

Sample output:

```
$ REPO=../www2/rails/.git node example.js

{ parents: [ '3baaedb2b61cad3cae60b0c5546214a0e8cd637b' ],
  hash: 'fb0df8e3edc8732b71bd88df5d9d17f0f1d4f58f',
  author:
   { name: 'Alexandru Vladutu',
     email: 'alessio.ijoomla@gmail.com',
     timestamp: 1372795642,
     timezone: '+0300' },
  committer:
   { name: 'Alexandru Vladutu',
     email: 'alessio.ijoomla@gmail.com',
     timestamp: 1372795642,
     timezone: '+0300' },
  title: 'asasa',
  description: '' }

------------------

{ parents: [ '40f33824dd17b154e58837cad526d177daf134d1' ],
  hash: '3baaedb2b61cad3cae60b0c5546214a0e8cd637b',
  author:
   { name: 'Alexandru Vladutu',
     email: 'alessio.ijoomla@gmail.com',
     timestamp: 1371056733,
     timezone: '+0300' },
  committer:
   { name: 'Alexandru Vladutu',
     email: 'alessio.ijoomla@gmail.com',
     timestamp: 1371056733,
     timezone: '+0300' },
  title: 'stufffffff',
  description: '' }

------------------

That's all, folks!
```

## Tests

```
npm test
```

## License

MIT
