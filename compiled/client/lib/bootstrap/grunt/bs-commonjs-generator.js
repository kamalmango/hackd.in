/*!
 * Bootstrap Grunt task for the CommonJS module generation
 * http://getbootstrap.com
 * Copyright 2014-2015 Twitter, Inc.
 * Licensed under MIT (https://github.com/twbs/bootstrap/blob/master/LICENSE)
 */

'use strict';

var fs = require('fs');
var path = require('path');

var COMMONJS_BANNER = '// This file is autogenerated via the `commonjs` Grunt task. You can require() this file in a CommonJS environment.\n';

module.exports = function generateCommonJSModule(grunt, srcFiles, destFilepath) {
  var destDir = path.dirname(destFilepath);

  function srcPathToDestRequire(srcFilepath) {
    var requirePath = path.relative(destDir, srcFilepath).replace(/\\/g, '/');
    return 'require(\'' + requirePath + '\')';
  }

  var moduleOutputJs = COMMONJS_BANNER + srcFiles.map(srcPathToDestRequire).join('\n');
  try {
    fs.writeFileSync(destFilepath, moduleOutputJs);
  } catch (err) {
    grunt.fail.warn(err);
  }
  grunt.log.writeln('File ' + destFilepath.cyan + ' created.');
};
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uLy4uLy4uLy4uL2NsaWVudC9saWIvYm9vdHN0cmFwL2dydW50L2JzLWNvbW1vbmpzLWdlbmVyYXRvci5qcyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7Ozs7O0FBT0E7O0FBRUEsSUFBSSxLQUFLLFFBQVEsSUFBUixDQUFUO0FBQ0EsSUFBSSxPQUFPLFFBQVEsTUFBUixDQUFYOztBQUVBLElBQUksa0JBQWtCLHVIQUF0Qjs7QUFFQSxPQUFPLE9BQVAsR0FBaUIsU0FBUyxzQkFBVCxDQUFnQyxLQUFoQyxFQUF1QyxRQUF2QyxFQUFpRCxZQUFqRCxFQUErRDtBQUM5RSxNQUFJLFVBQVUsS0FBSyxPQUFMLENBQWEsWUFBYixDQUFkOztBQUVBLFdBQVMsb0JBQVQsQ0FBOEIsV0FBOUIsRUFBMkM7QUFDekMsUUFBSSxjQUFjLEtBQUssUUFBTCxDQUFjLE9BQWQsRUFBdUIsV0FBdkIsRUFBb0MsT0FBcEMsQ0FBNEMsS0FBNUMsRUFBbUQsR0FBbkQsQ0FBbEI7QUFDQSxXQUFPLGVBQWUsV0FBZixHQUE2QixLQUFwQztBQUNEOztBQUVELE1BQUksaUJBQWlCLGtCQUFrQixTQUFTLEdBQVQsQ0FBYSxvQkFBYixFQUFtQyxJQUFuQyxDQUF3QyxJQUF4QyxDQUF2QztBQUNBLE1BQUk7QUFDRixPQUFHLGFBQUgsQ0FBaUIsWUFBakIsRUFBK0IsY0FBL0I7QUFDRCxHQUZELENBRUUsT0FBTyxHQUFQLEVBQVk7QUFDWixVQUFNLElBQU4sQ0FBVyxJQUFYLENBQWdCLEdBQWhCO0FBQ0Q7QUFDRCxRQUFNLEdBQU4sQ0FBVSxPQUFWLENBQWtCLFVBQVUsYUFBYSxJQUF2QixHQUE4QixXQUFoRDtBQUNELENBZkQiLCJmaWxlIjoiYnMtY29tbW9uanMtZ2VuZXJhdG9yLmpzIiwic291cmNlc0NvbnRlbnQiOlsiLyohXG4gKiBCb290c3RyYXAgR3J1bnQgdGFzayBmb3IgdGhlIENvbW1vbkpTIG1vZHVsZSBnZW5lcmF0aW9uXG4gKiBodHRwOi8vZ2V0Ym9vdHN0cmFwLmNvbVxuICogQ29weXJpZ2h0IDIwMTQtMjAxNSBUd2l0dGVyLCBJbmMuXG4gKiBMaWNlbnNlZCB1bmRlciBNSVQgKGh0dHBzOi8vZ2l0aHViLmNvbS90d2JzL2Jvb3RzdHJhcC9ibG9iL21hc3Rlci9MSUNFTlNFKVxuICovXG5cbid1c2Ugc3RyaWN0JztcblxudmFyIGZzID0gcmVxdWlyZSgnZnMnKTtcbnZhciBwYXRoID0gcmVxdWlyZSgncGF0aCcpO1xuXG52YXIgQ09NTU9OSlNfQkFOTkVSID0gJy8vIFRoaXMgZmlsZSBpcyBhdXRvZ2VuZXJhdGVkIHZpYSB0aGUgYGNvbW1vbmpzYCBHcnVudCB0YXNrLiBZb3UgY2FuIHJlcXVpcmUoKSB0aGlzIGZpbGUgaW4gYSBDb21tb25KUyBlbnZpcm9ubWVudC5cXG4nO1xuXG5tb2R1bGUuZXhwb3J0cyA9IGZ1bmN0aW9uIGdlbmVyYXRlQ29tbW9uSlNNb2R1bGUoZ3J1bnQsIHNyY0ZpbGVzLCBkZXN0RmlsZXBhdGgpIHtcbiAgdmFyIGRlc3REaXIgPSBwYXRoLmRpcm5hbWUoZGVzdEZpbGVwYXRoKTtcblxuICBmdW5jdGlvbiBzcmNQYXRoVG9EZXN0UmVxdWlyZShzcmNGaWxlcGF0aCkge1xuICAgIHZhciByZXF1aXJlUGF0aCA9IHBhdGgucmVsYXRpdmUoZGVzdERpciwgc3JjRmlsZXBhdGgpLnJlcGxhY2UoL1xcXFwvZywgJy8nKTtcbiAgICByZXR1cm4gJ3JlcXVpcmUoXFwnJyArIHJlcXVpcmVQYXRoICsgJ1xcJyknO1xuICB9XG5cbiAgdmFyIG1vZHVsZU91dHB1dEpzID0gQ09NTU9OSlNfQkFOTkVSICsgc3JjRmlsZXMubWFwKHNyY1BhdGhUb0Rlc3RSZXF1aXJlKS5qb2luKCdcXG4nKTtcbiAgdHJ5IHtcbiAgICBmcy53cml0ZUZpbGVTeW5jKGRlc3RGaWxlcGF0aCwgbW9kdWxlT3V0cHV0SnMpO1xuICB9IGNhdGNoIChlcnIpIHtcbiAgICBncnVudC5mYWlsLndhcm4oZXJyKTtcbiAgfVxuICBncnVudC5sb2cud3JpdGVsbignRmlsZSAnICsgZGVzdEZpbGVwYXRoLmN5YW4gKyAnIGNyZWF0ZWQuJyk7XG59O1xuIl19