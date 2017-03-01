'use strict';

var streamCommits = require('./lib/parser');
var gitSpawnedStream = require('git-spawned-stream');

function addFlag(args, flag, value) {
  if (!value || !flag) {
    return args.length;
  }

  if (Array.isArray(value)) {
    return value.map(function addItem(item) {
      return addFlag(args, flag, item);
    }).pop();
  }

  if (value === true) {
    return args.push(flag);
  }

  return args.push(flag + '=' + value);
}

function searchType(opts) {
  switch (opts.searchIn) {

  case 'author':
  case 'authors':
    return '--author';

  case 'committer':
  case 'committers':
    return '--committer';

  default:
    return '--grep';

  }
}

function escapeTerm(term) {
  return term.replace(/'/g, '').replace(/"/g, '');
}

function streamHistory(repoPath, ops) {
  var opts = ops || {};
  var args = ['rev-list', '--header'];

  addFlag(args, '--max-count', opts.limit);
  addFlag(args, '--skip', opts.skip);
  addFlag(args, '--since', opts.since || opts.after);
  addFlag(args, '--until', opts.until || opts.before);

  if (opts.searchTerm) {
    var terms = [].concat(opts.searchTerm).map(escapeTerm);
    var searchIn = searchType(opts);
    var isRegex = Boolean(opts.regex);

    addFlag(args, '--extended-regexp', isRegex);
    addFlag(args, '--fixed-strings', !isRegex);
    addFlag(args, '--regexp-ignore-case', true);
    addFlag(args, searchIn, terms);
  }

  var posArgs = [].concat(
    opts.rev || 'HEAD',
    '--',
    opts.path || opts.file || []
  );

  Array.prototype.push.apply(args, posArgs);

  return streamCommits(gitSpawnedStream(repoPath, args));
}

module.exports = streamHistory;
