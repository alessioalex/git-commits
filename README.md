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

## Tests

```
npm test
```

## License

MIT
