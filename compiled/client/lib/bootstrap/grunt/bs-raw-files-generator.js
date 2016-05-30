/*!
 * Bootstrap Grunt task for generating raw-files.min.js for the Customizer
 * http://getbootstrap.com
 * Copyright 2014-2015 Twitter, Inc.
 * Licensed under MIT (https://github.com/twbs/bootstrap/blob/master/LICENSE)
 */

'use strict';

var fs = require('fs');
var btoa = require('btoa');
var glob = require('glob');

function getFiles(type) {
  var files = {};
  var recursive = type === 'less';
  var globExpr = recursive ? '/**/*' : '/*';
  glob.sync(type + globExpr).filter(function (path) {
    return type === 'fonts' ? true : new RegExp('\\.' + type + '$').test(path);
  }).forEach(function (fullPath) {
    var relativePath = fullPath.replace(/^[^/]+\//, '');
    files[relativePath] = type === 'fonts' ? btoa(fs.readFileSync(fullPath)) : fs.readFileSync(fullPath, 'utf8');
  });
  return 'var __' + type + ' = ' + JSON.stringify(files) + '\n';
}

module.exports = function generateRawFilesJs(grunt, banner) {
  if (!banner) {
    banner = '';
  }
  var dirs = ['js', 'less', 'fonts'];
  var files = banner + dirs.map(getFiles).reduce(function (combined, file) {
    return combined + file;
  }, '');
  var rawFilesJs = 'docs/assets/js/raw-files.min.js';
  try {
    fs.writeFileSync(rawFilesJs, files);
  } catch (err) {
    grunt.fail.warn(err);
  }
  grunt.log.writeln('File ' + rawFilesJs.cyan + ' created.');
};
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uLy4uLy4uLy4uL2NsaWVudC9saWIvYm9vdHN0cmFwL2dydW50L2JzLXJhdy1maWxlcy1nZW5lcmF0b3IuanMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7OztBQU9BOztBQUVBLElBQUksS0FBSyxRQUFRLElBQVIsQ0FBVDtBQUNBLElBQUksT0FBTyxRQUFRLE1BQVIsQ0FBWDtBQUNBLElBQUksT0FBTyxRQUFRLE1BQVIsQ0FBWDs7QUFFQSxTQUFTLFFBQVQsQ0FBa0IsSUFBbEIsRUFBd0I7QUFDdEIsTUFBSSxRQUFRLEVBQVo7QUFDQSxNQUFJLFlBQVksU0FBUyxNQUF6QjtBQUNBLE1BQUksV0FBVyxZQUFZLE9BQVosR0FBc0IsSUFBckM7QUFDQSxPQUFLLElBQUwsQ0FBVSxPQUFPLFFBQWpCLEVBQ0csTUFESCxDQUNVLFVBQVUsSUFBVixFQUFnQjtBQUN0QixXQUFPLFNBQVMsT0FBVCxHQUFtQixJQUFuQixHQUEwQixJQUFJLE1BQUosQ0FBVyxRQUFRLElBQVIsR0FBZSxHQUExQixFQUErQixJQUEvQixDQUFvQyxJQUFwQyxDQUFqQztBQUNELEdBSEgsRUFJRyxPQUpILENBSVcsVUFBVSxRQUFWLEVBQW9CO0FBQzNCLFFBQUksZUFBZSxTQUFTLE9BQVQsQ0FBaUIsVUFBakIsRUFBNkIsRUFBN0IsQ0FBbkI7QUFDQSxVQUFNLFlBQU4sSUFBc0IsU0FBUyxPQUFULEdBQW1CLEtBQUssR0FBRyxZQUFILENBQWdCLFFBQWhCLENBQUwsQ0FBbkIsR0FBcUQsR0FBRyxZQUFILENBQWdCLFFBQWhCLEVBQTBCLE1BQTFCLENBQTNFO0FBQ0QsR0FQSDtBQVFBLFNBQU8sV0FBVyxJQUFYLEdBQWtCLEtBQWxCLEdBQTBCLEtBQUssU0FBTCxDQUFlLEtBQWYsQ0FBMUIsR0FBa0QsSUFBekQ7QUFDRDs7QUFFRCxPQUFPLE9BQVAsR0FBaUIsU0FBUyxrQkFBVCxDQUE0QixLQUE1QixFQUFtQyxNQUFuQyxFQUEyQztBQUMxRCxNQUFJLENBQUMsTUFBTCxFQUFhO0FBQ1gsYUFBUyxFQUFUO0FBQ0Q7QUFDRCxNQUFJLE9BQU8sQ0FBQyxJQUFELEVBQU8sTUFBUCxFQUFlLE9BQWYsQ0FBWDtBQUNBLE1BQUksUUFBUSxTQUFTLEtBQUssR0FBTCxDQUFTLFFBQVQsRUFBbUIsTUFBbkIsQ0FBMEIsVUFBVSxRQUFWLEVBQW9CLElBQXBCLEVBQTBCO0FBQ3ZFLFdBQU8sV0FBVyxJQUFsQjtBQUNELEdBRm9CLEVBRWxCLEVBRmtCLENBQXJCO0FBR0EsTUFBSSxhQUFhLGlDQUFqQjtBQUNBLE1BQUk7QUFDRixPQUFHLGFBQUgsQ0FBaUIsVUFBakIsRUFBNkIsS0FBN0I7QUFDRCxHQUZELENBRUUsT0FBTyxHQUFQLEVBQVk7QUFDWixVQUFNLElBQU4sQ0FBVyxJQUFYLENBQWdCLEdBQWhCO0FBQ0Q7QUFDRCxRQUFNLEdBQU4sQ0FBVSxPQUFWLENBQWtCLFVBQVUsV0FBVyxJQUFyQixHQUE0QixXQUE5QztBQUNELENBZkQiLCJmaWxlIjoiYnMtcmF3LWZpbGVzLWdlbmVyYXRvci5qcyIsInNvdXJjZXNDb250ZW50IjpbIi8qIVxuICogQm9vdHN0cmFwIEdydW50IHRhc2sgZm9yIGdlbmVyYXRpbmcgcmF3LWZpbGVzLm1pbi5qcyBmb3IgdGhlIEN1c3RvbWl6ZXJcbiAqIGh0dHA6Ly9nZXRib290c3RyYXAuY29tXG4gKiBDb3B5cmlnaHQgMjAxNC0yMDE1IFR3aXR0ZXIsIEluYy5cbiAqIExpY2Vuc2VkIHVuZGVyIE1JVCAoaHR0cHM6Ly9naXRodWIuY29tL3R3YnMvYm9vdHN0cmFwL2Jsb2IvbWFzdGVyL0xJQ0VOU0UpXG4gKi9cblxuJ3VzZSBzdHJpY3QnO1xuXG52YXIgZnMgPSByZXF1aXJlKCdmcycpO1xudmFyIGJ0b2EgPSByZXF1aXJlKCdidG9hJyk7XG52YXIgZ2xvYiA9IHJlcXVpcmUoJ2dsb2InKTtcblxuZnVuY3Rpb24gZ2V0RmlsZXModHlwZSkge1xuICB2YXIgZmlsZXMgPSB7fTtcbiAgdmFyIHJlY3Vyc2l2ZSA9IHR5cGUgPT09ICdsZXNzJztcbiAgdmFyIGdsb2JFeHByID0gcmVjdXJzaXZlID8gJy8qKi8qJyA6ICcvKic7XG4gIGdsb2Iuc3luYyh0eXBlICsgZ2xvYkV4cHIpXG4gICAgLmZpbHRlcihmdW5jdGlvbiAocGF0aCkge1xuICAgICAgcmV0dXJuIHR5cGUgPT09ICdmb250cycgPyB0cnVlIDogbmV3IFJlZ0V4cCgnXFxcXC4nICsgdHlwZSArICckJykudGVzdChwYXRoKTtcbiAgICB9KVxuICAgIC5mb3JFYWNoKGZ1bmN0aW9uIChmdWxsUGF0aCkge1xuICAgICAgdmFyIHJlbGF0aXZlUGF0aCA9IGZ1bGxQYXRoLnJlcGxhY2UoL15bXi9dK1xcLy8sICcnKTtcbiAgICAgIGZpbGVzW3JlbGF0aXZlUGF0aF0gPSB0eXBlID09PSAnZm9udHMnID8gYnRvYShmcy5yZWFkRmlsZVN5bmMoZnVsbFBhdGgpKSA6IGZzLnJlYWRGaWxlU3luYyhmdWxsUGF0aCwgJ3V0ZjgnKTtcbiAgICB9KTtcbiAgcmV0dXJuICd2YXIgX18nICsgdHlwZSArICcgPSAnICsgSlNPTi5zdHJpbmdpZnkoZmlsZXMpICsgJ1xcbic7XG59XG5cbm1vZHVsZS5leHBvcnRzID0gZnVuY3Rpb24gZ2VuZXJhdGVSYXdGaWxlc0pzKGdydW50LCBiYW5uZXIpIHtcbiAgaWYgKCFiYW5uZXIpIHtcbiAgICBiYW5uZXIgPSAnJztcbiAgfVxuICB2YXIgZGlycyA9IFsnanMnLCAnbGVzcycsICdmb250cyddO1xuICB2YXIgZmlsZXMgPSBiYW5uZXIgKyBkaXJzLm1hcChnZXRGaWxlcykucmVkdWNlKGZ1bmN0aW9uIChjb21iaW5lZCwgZmlsZSkge1xuICAgIHJldHVybiBjb21iaW5lZCArIGZpbGU7XG4gIH0sICcnKTtcbiAgdmFyIHJhd0ZpbGVzSnMgPSAnZG9jcy9hc3NldHMvanMvcmF3LWZpbGVzLm1pbi5qcyc7XG4gIHRyeSB7XG4gICAgZnMud3JpdGVGaWxlU3luYyhyYXdGaWxlc0pzLCBmaWxlcyk7XG4gIH0gY2F0Y2ggKGVycikge1xuICAgIGdydW50LmZhaWwud2FybihlcnIpO1xuICB9XG4gIGdydW50LmxvZy53cml0ZWxuKCdGaWxlICcgKyByYXdGaWxlc0pzLmN5YW4gKyAnIGNyZWF0ZWQuJyk7XG59O1xuIl19