'use strict';

var LazyWrapper = require('./_LazyWrapper'),
    arrayPush = require('./_arrayPush'),
    arrayReduce = require('./_arrayReduce');

/**
 * The base implementation of `wrapperValue` which returns the result of
 * performing a sequence of actions on the unwrapped `value`, where each
 * successive action is supplied the return value of the previous.
 *
 * @private
 * @param {*} value The unwrapped value.
 * @param {Array} actions Actions to perform to resolve the unwrapped value.
 * @returns {*} Returns the resolved value.
 */
function baseWrapperValue(value, actions) {
  var result = value;
  if (result instanceof LazyWrapper) {
    result = result.value();
  }
  return arrayReduce(actions, function (result, action) {
    return action.func.apply(action.thisArg, arrayPush([result], action.args));
  }, result);
}

module.exports = baseWrapperValue;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uLy4uLy4uL2NsaWVudC9saWIvbG9kYXNoL19iYXNlV3JhcHBlclZhbHVlLmpzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7O0FBQUEsSUFBSSxjQUFjLFFBQVEsZ0JBQVIsQ0FBbEI7SUFDSSxZQUFZLFFBQVEsY0FBUixDQURoQjtJQUVJLGNBQWMsUUFBUSxnQkFBUixDQUZsQjs7Ozs7Ozs7Ozs7O0FBY0EsU0FBUyxnQkFBVCxDQUEwQixLQUExQixFQUFpQyxPQUFqQyxFQUEwQztBQUN4QyxNQUFJLFNBQVMsS0FBYjtBQUNBLE1BQUksa0JBQWtCLFdBQXRCLEVBQW1DO0FBQ2pDLGFBQVMsT0FBTyxLQUFQLEVBQVQ7QUFDRDtBQUNELFNBQU8sWUFBWSxPQUFaLEVBQXFCLFVBQVMsTUFBVCxFQUFpQixNQUFqQixFQUF5QjtBQUNuRCxXQUFPLE9BQU8sSUFBUCxDQUFZLEtBQVosQ0FBa0IsT0FBTyxPQUF6QixFQUFrQyxVQUFVLENBQUMsTUFBRCxDQUFWLEVBQW9CLE9BQU8sSUFBM0IsQ0FBbEMsQ0FBUDtBQUNELEdBRk0sRUFFSixNQUZJLENBQVA7QUFHRDs7QUFFRCxPQUFPLE9BQVAsR0FBaUIsZ0JBQWpCIiwiZmlsZSI6Il9iYXNlV3JhcHBlclZhbHVlLmpzIiwic291cmNlc0NvbnRlbnQiOlsidmFyIExhenlXcmFwcGVyID0gcmVxdWlyZSgnLi9fTGF6eVdyYXBwZXInKSxcbiAgICBhcnJheVB1c2ggPSByZXF1aXJlKCcuL19hcnJheVB1c2gnKSxcbiAgICBhcnJheVJlZHVjZSA9IHJlcXVpcmUoJy4vX2FycmF5UmVkdWNlJyk7XG5cbi8qKlxuICogVGhlIGJhc2UgaW1wbGVtZW50YXRpb24gb2YgYHdyYXBwZXJWYWx1ZWAgd2hpY2ggcmV0dXJucyB0aGUgcmVzdWx0IG9mXG4gKiBwZXJmb3JtaW5nIGEgc2VxdWVuY2Ugb2YgYWN0aW9ucyBvbiB0aGUgdW53cmFwcGVkIGB2YWx1ZWAsIHdoZXJlIGVhY2hcbiAqIHN1Y2Nlc3NpdmUgYWN0aW9uIGlzIHN1cHBsaWVkIHRoZSByZXR1cm4gdmFsdWUgb2YgdGhlIHByZXZpb3VzLlxuICpcbiAqIEBwcml2YXRlXG4gKiBAcGFyYW0geyp9IHZhbHVlIFRoZSB1bndyYXBwZWQgdmFsdWUuXG4gKiBAcGFyYW0ge0FycmF5fSBhY3Rpb25zIEFjdGlvbnMgdG8gcGVyZm9ybSB0byByZXNvbHZlIHRoZSB1bndyYXBwZWQgdmFsdWUuXG4gKiBAcmV0dXJucyB7Kn0gUmV0dXJucyB0aGUgcmVzb2x2ZWQgdmFsdWUuXG4gKi9cbmZ1bmN0aW9uIGJhc2VXcmFwcGVyVmFsdWUodmFsdWUsIGFjdGlvbnMpIHtcbiAgdmFyIHJlc3VsdCA9IHZhbHVlO1xuICBpZiAocmVzdWx0IGluc3RhbmNlb2YgTGF6eVdyYXBwZXIpIHtcbiAgICByZXN1bHQgPSByZXN1bHQudmFsdWUoKTtcbiAgfVxuICByZXR1cm4gYXJyYXlSZWR1Y2UoYWN0aW9ucywgZnVuY3Rpb24ocmVzdWx0LCBhY3Rpb24pIHtcbiAgICByZXR1cm4gYWN0aW9uLmZ1bmMuYXBwbHkoYWN0aW9uLnRoaXNBcmcsIGFycmF5UHVzaChbcmVzdWx0XSwgYWN0aW9uLmFyZ3MpKTtcbiAgfSwgcmVzdWx0KTtcbn1cblxubW9kdWxlLmV4cG9ydHMgPSBiYXNlV3JhcHBlclZhbHVlO1xuIl19