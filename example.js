"use strict";

var gitCommits = require('./');
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
