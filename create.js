'use strict';

var taskOpts = require('./tasks');
var _ = require('lodash');

module.exports = function(kbox, drupal, appName) {

  var phpVersions = _.pluck(drupal, 'php');

  // Add an option
  kbox.create.add(appName, {
    option: {
      name: 'php-version',
      task: taskOpts.phpVersion,
      inquire: {
        type: 'list',
        message: 'Php version?',
        default: function(answers) {
          if (answers['drupal-version']) {
            return drupal[answers['drupal-version']].php;
          }
          else {
            return '5.4.36';
          }
        },
        choices: phpVersions
      },
      conf: {
        type: 'plugin',
        plugin: 'kalabox-plugin-php',
        key: 'php-version'
      }
    }
  });

};
