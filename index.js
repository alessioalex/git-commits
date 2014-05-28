"use strict";

var streamCommits = require('./lib/parser');
var gitSpawnedStream = require('git-spawned-stream');

function streamHistory(repoPath, opts) {
  opts = opts || {};
  var searchIn = '';
  var rev = opts.rev || 'HEAD';
  var limit = (opts.limit) ? ("--max-count=" + opts.limit) : '';
  var skip = (opts.skip) ? ("--skip=" + opts.skip) : '';
  var file = opts.file || '';
  var since = (since = ((opts.since || opts.after) || null)) ? ('--since=' + since) : null;
  var until = (until = ((opts.until || opts.before) || null)) ? ('--until=' + until) : null;

  if (opts.searchTerm) {
    var searchType  = (opts.regex == false) ? "--fixed-strings" : "--extended-regexp";
    var term = opts.searchTerm.replace(/'/g, '').replace(/"/g, '');

    if (!opts.searchIn || opts.searchIn === 'messages') {
      searchIn = '--grep';
    } else {
      if (opts.searchIn === 'authors') {
        searchIn = '--author';
      } else if (opts.searchIn === 'committers') {
        searchIn = '--committer';
      } else {
        searchIn = '--grep';
      }
    }

    searchIn += "=" + term;
  }

  var args = ['rev-list', '--header', '--regexp-ignore-case'];
  [searchIn, searchType, since, until, limit, skip, rev, '--', file].forEach(function(el) {
    if (el) { args.push(el); }
  });

  return streamCommits(gitSpawnedStream(repoPath, args));
}

module.exports = streamHistory;
