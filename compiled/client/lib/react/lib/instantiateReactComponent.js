/**
 * Copyright 2013-2015, Facebook, Inc.
 * All rights reserved.
 *
 * This source code is licensed under the BSD-style license found in the
 * LICENSE file in the root directory of this source tree. An additional grant
 * of patent rights can be found in the PATENTS file in the same directory.
 *
 * @providesModule instantiateReactComponent
 * @typechecks static-only
 */

'use strict';

var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol ? "symbol" : typeof obj; };

var ReactCompositeComponent = require('./ReactCompositeComponent');
var ReactEmptyComponent = require('./ReactEmptyComponent');
var ReactNativeComponent = require('./ReactNativeComponent');

var assign = require('./Object.assign');
var invariant = require('fbjs/lib/invariant');
var warning = require('fbjs/lib/warning');

// To avoid a cyclic dependency, we create the final class in this module
var ReactCompositeComponentWrapper = function ReactCompositeComponentWrapper() {};
assign(ReactCompositeComponentWrapper.prototype, ReactCompositeComponent.Mixin, {
  _instantiateReactComponent: instantiateReactComponent
});

function getDeclarationErrorAddendum(owner) {
  if (owner) {
    var name = owner.getName();
    if (name) {
      return ' Check the render method of `' + name + '`.';
    }
  }
  return '';
}

/**
 * Check if the type reference is a known internal type. I.e. not a user
 * provided composite type.
 *
 * @param {function} type
 * @return {boolean} Returns true if this is a valid internal type.
 */
function isInternalComponentType(type) {
  return typeof type === 'function' && typeof type.prototype !== 'undefined' && typeof type.prototype.mountComponent === 'function' && typeof type.prototype.receiveComponent === 'function';
}

/**
 * Given a ReactNode, create an instance that will actually be mounted.
 *
 * @param {ReactNode} node
 * @return {object} A new instance of the element's constructor.
 * @protected
 */
function instantiateReactComponent(node) {
  var instance;

  if (node === null || node === false) {
    instance = new ReactEmptyComponent(instantiateReactComponent);
  } else if ((typeof node === 'undefined' ? 'undefined' : _typeof(node)) === 'object') {
    var element = node;
    !(element && (typeof element.type === 'function' || typeof element.type === 'string')) ? process.env.NODE_ENV !== 'production' ? invariant(false, 'Element type is invalid: expected a string (for built-in components) ' + 'or a class/function (for composite components) but got: %s.%s', element.type == null ? element.type : _typeof(element.type), getDeclarationErrorAddendum(element._owner)) : invariant(false) : undefined;

    // Special case string values
    if (typeof element.type === 'string') {
      instance = ReactNativeComponent.createInternalComponent(element);
    } else if (isInternalComponentType(element.type)) {
      // This is temporarily available for custom components that are not string
      // representations. I.e. ART. Once those are updated to use the string
      // representation, we can drop this code path.
      instance = new element.type(element);
    } else {
      instance = new ReactCompositeComponentWrapper();
    }
  } else if (typeof node === 'string' || typeof node === 'number') {
    instance = ReactNativeComponent.createInstanceForText(node);
  } else {
    !false ? process.env.NODE_ENV !== 'production' ? invariant(false, 'Encountered invalid React node of type %s', typeof node === 'undefined' ? 'undefined' : _typeof(node)) : invariant(false) : undefined;
  }

  if (process.env.NODE_ENV !== 'production') {
    process.env.NODE_ENV !== 'production' ? warning(typeof instance.construct === 'function' && typeof instance.mountComponent === 'function' && typeof instance.receiveComponent === 'function' && typeof instance.unmountComponent === 'function', 'Only React Components can be mounted.') : undefined;
  }

  // Sets up the instance. This can probably just move into the constructor now.
  instance.construct(node);

  // These two fields are used by the DOM and ART diffing algorithms
  // respectively. Instead of using expandos on components, we should be
  // storing the state needed by the diffing algorithms elsewhere.
  instance._mountIndex = 0;
  instance._mountImage = null;

  if (process.env.NODE_ENV !== 'production') {
    instance._isOwnerNecessary = false;
    instance._warnedAboutRefsInRender = false;
  }

  // Internal instances should fully constructed at this point, so they should
  // not get any new fields added to them at this point.
  if (process.env.NODE_ENV !== 'production') {
    if (Object.preventExtensions) {
      Object.preventExtensions(instance);
    }
  }

  return instance;
}

module.exports = instantiateReactComponent;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uLy4uLy4uLy4uL2NsaWVudC9saWIvcmVhY3QvbGliL2luc3RhbnRpYXRlUmVhY3RDb21wb25lbnQuanMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7O0FBWUE7Ozs7QUFFQSxJQUFJLDBCQUEwQixRQUFRLDJCQUFSLENBQTlCO0FBQ0EsSUFBSSxzQkFBc0IsUUFBUSx1QkFBUixDQUExQjtBQUNBLElBQUksdUJBQXVCLFFBQVEsd0JBQVIsQ0FBM0I7O0FBRUEsSUFBSSxTQUFTLFFBQVEsaUJBQVIsQ0FBYjtBQUNBLElBQUksWUFBWSxRQUFRLG9CQUFSLENBQWhCO0FBQ0EsSUFBSSxVQUFVLFFBQVEsa0JBQVIsQ0FBZDs7O0FBR0EsSUFBSSxpQ0FBaUMsU0FBakMsOEJBQWlDLEdBQVksQ0FBRSxDQUFuRDtBQUNBLE9BQU8sK0JBQStCLFNBQXRDLEVBQWlELHdCQUF3QixLQUF6RSxFQUFnRjtBQUM5RSw4QkFBNEI7QUFEa0QsQ0FBaEY7O0FBSUEsU0FBUywyQkFBVCxDQUFxQyxLQUFyQyxFQUE0QztBQUMxQyxNQUFJLEtBQUosRUFBVztBQUNULFFBQUksT0FBTyxNQUFNLE9BQU4sRUFBWDtBQUNBLFFBQUksSUFBSixFQUFVO0FBQ1IsYUFBTyxrQ0FBa0MsSUFBbEMsR0FBeUMsSUFBaEQ7QUFDRDtBQUNGO0FBQ0QsU0FBTyxFQUFQO0FBQ0Q7Ozs7Ozs7OztBQVNELFNBQVMsdUJBQVQsQ0FBaUMsSUFBakMsRUFBdUM7QUFDckMsU0FBTyxPQUFPLElBQVAsS0FBZ0IsVUFBaEIsSUFBOEIsT0FBTyxLQUFLLFNBQVosS0FBMEIsV0FBeEQsSUFBdUUsT0FBTyxLQUFLLFNBQUwsQ0FBZSxjQUF0QixLQUF5QyxVQUFoSCxJQUE4SCxPQUFPLEtBQUssU0FBTCxDQUFlLGdCQUF0QixLQUEyQyxVQUFoTDtBQUNEOzs7Ozs7Ozs7QUFTRCxTQUFTLHlCQUFULENBQW1DLElBQW5DLEVBQXlDO0FBQ3ZDLE1BQUksUUFBSjs7QUFFQSxNQUFJLFNBQVMsSUFBVCxJQUFpQixTQUFTLEtBQTlCLEVBQXFDO0FBQ25DLGVBQVcsSUFBSSxtQkFBSixDQUF3Qix5QkFBeEIsQ0FBWDtBQUNELEdBRkQsTUFFTyxJQUFJLFFBQU8sSUFBUCx5Q0FBTyxJQUFQLE9BQWdCLFFBQXBCLEVBQThCO0FBQ25DLFFBQUksVUFBVSxJQUFkO0FBQ0EsTUFBRSxZQUFZLE9BQU8sUUFBUSxJQUFmLEtBQXdCLFVBQXhCLElBQXNDLE9BQU8sUUFBUSxJQUFmLEtBQXdCLFFBQTFFLENBQUYsSUFBeUYsUUFBUSxHQUFSLENBQVksUUFBWixLQUF5QixZQUF6QixHQUF3QyxVQUFVLEtBQVYsRUFBaUIsMEVBQTBFLCtEQUEzRixFQUE0SixRQUFRLElBQVIsSUFBZ0IsSUFBaEIsR0FBdUIsUUFBUSxJQUEvQixXQUE2QyxRQUFRLElBQXJELENBQTVKLEVBQXVOLDRCQUE0QixRQUFRLE1BQXBDLENBQXZOLENBQXhDLEdBQThTLFVBQVUsS0FBVixDQUF2WSxHQUEwWixTQUExWjs7O0FBR0EsUUFBSSxPQUFPLFFBQVEsSUFBZixLQUF3QixRQUE1QixFQUFzQztBQUNwQyxpQkFBVyxxQkFBcUIsdUJBQXJCLENBQTZDLE9BQTdDLENBQVg7QUFDRCxLQUZELE1BRU8sSUFBSSx3QkFBd0IsUUFBUSxJQUFoQyxDQUFKLEVBQTJDOzs7O0FBSWhELGlCQUFXLElBQUksUUFBUSxJQUFaLENBQWlCLE9BQWpCLENBQVg7QUFDRCxLQUxNLE1BS0E7QUFDTCxpQkFBVyxJQUFJLDhCQUFKLEVBQVg7QUFDRDtBQUNGLEdBZk0sTUFlQSxJQUFJLE9BQU8sSUFBUCxLQUFnQixRQUFoQixJQUE0QixPQUFPLElBQVAsS0FBZ0IsUUFBaEQsRUFBMEQ7QUFDL0QsZUFBVyxxQkFBcUIscUJBQXJCLENBQTJDLElBQTNDLENBQVg7QUFDRCxHQUZNLE1BRUE7QUFDTCxLQUFDLEtBQUQsR0FBUyxRQUFRLEdBQVIsQ0FBWSxRQUFaLEtBQXlCLFlBQXpCLEdBQXdDLFVBQVUsS0FBVixFQUFpQiwyQ0FBakIsU0FBcUUsSUFBckUseUNBQXFFLElBQXJFLEVBQXhDLEdBQXFILFVBQVUsS0FBVixDQUE5SCxHQUFpSixTQUFqSjtBQUNEOztBQUVELE1BQUksUUFBUSxHQUFSLENBQVksUUFBWixLQUF5QixZQUE3QixFQUEyQztBQUN6QyxZQUFRLEdBQVIsQ0FBWSxRQUFaLEtBQXlCLFlBQXpCLEdBQXdDLFFBQVEsT0FBTyxTQUFTLFNBQWhCLEtBQThCLFVBQTlCLElBQTRDLE9BQU8sU0FBUyxjQUFoQixLQUFtQyxVQUEvRSxJQUE2RixPQUFPLFNBQVMsZ0JBQWhCLEtBQXFDLFVBQWxJLElBQWdKLE9BQU8sU0FBUyxnQkFBaEIsS0FBcUMsVUFBN0wsRUFBeU0sdUNBQXpNLENBQXhDLEdBQTRSLFNBQTVSO0FBQ0Q7OztBQUdELFdBQVMsU0FBVCxDQUFtQixJQUFuQjs7Ozs7QUFLQSxXQUFTLFdBQVQsR0FBdUIsQ0FBdkI7QUFDQSxXQUFTLFdBQVQsR0FBdUIsSUFBdkI7O0FBRUEsTUFBSSxRQUFRLEdBQVIsQ0FBWSxRQUFaLEtBQXlCLFlBQTdCLEVBQTJDO0FBQ3pDLGFBQVMsaUJBQVQsR0FBNkIsS0FBN0I7QUFDQSxhQUFTLHdCQUFULEdBQW9DLEtBQXBDO0FBQ0Q7Ozs7QUFJRCxNQUFJLFFBQVEsR0FBUixDQUFZLFFBQVosS0FBeUIsWUFBN0IsRUFBMkM7QUFDekMsUUFBSSxPQUFPLGlCQUFYLEVBQThCO0FBQzVCLGFBQU8saUJBQVAsQ0FBeUIsUUFBekI7QUFDRDtBQUNGOztBQUVELFNBQU8sUUFBUDtBQUNEOztBQUVELE9BQU8sT0FBUCxHQUFpQix5QkFBakIiLCJmaWxlIjoiaW5zdGFudGlhdGVSZWFjdENvbXBvbmVudC5qcyIsInNvdXJjZXNDb250ZW50IjpbIi8qKlxuICogQ29weXJpZ2h0IDIwMTMtMjAxNSwgRmFjZWJvb2ssIEluYy5cbiAqIEFsbCByaWdodHMgcmVzZXJ2ZWQuXG4gKlxuICogVGhpcyBzb3VyY2UgY29kZSBpcyBsaWNlbnNlZCB1bmRlciB0aGUgQlNELXN0eWxlIGxpY2Vuc2UgZm91bmQgaW4gdGhlXG4gKiBMSUNFTlNFIGZpbGUgaW4gdGhlIHJvb3QgZGlyZWN0b3J5IG9mIHRoaXMgc291cmNlIHRyZWUuIEFuIGFkZGl0aW9uYWwgZ3JhbnRcbiAqIG9mIHBhdGVudCByaWdodHMgY2FuIGJlIGZvdW5kIGluIHRoZSBQQVRFTlRTIGZpbGUgaW4gdGhlIHNhbWUgZGlyZWN0b3J5LlxuICpcbiAqIEBwcm92aWRlc01vZHVsZSBpbnN0YW50aWF0ZVJlYWN0Q29tcG9uZW50XG4gKiBAdHlwZWNoZWNrcyBzdGF0aWMtb25seVxuICovXG5cbid1c2Ugc3RyaWN0JztcblxudmFyIFJlYWN0Q29tcG9zaXRlQ29tcG9uZW50ID0gcmVxdWlyZSgnLi9SZWFjdENvbXBvc2l0ZUNvbXBvbmVudCcpO1xudmFyIFJlYWN0RW1wdHlDb21wb25lbnQgPSByZXF1aXJlKCcuL1JlYWN0RW1wdHlDb21wb25lbnQnKTtcbnZhciBSZWFjdE5hdGl2ZUNvbXBvbmVudCA9IHJlcXVpcmUoJy4vUmVhY3ROYXRpdmVDb21wb25lbnQnKTtcblxudmFyIGFzc2lnbiA9IHJlcXVpcmUoJy4vT2JqZWN0LmFzc2lnbicpO1xudmFyIGludmFyaWFudCA9IHJlcXVpcmUoJ2ZianMvbGliL2ludmFyaWFudCcpO1xudmFyIHdhcm5pbmcgPSByZXF1aXJlKCdmYmpzL2xpYi93YXJuaW5nJyk7XG5cbi8vIFRvIGF2b2lkIGEgY3ljbGljIGRlcGVuZGVuY3ksIHdlIGNyZWF0ZSB0aGUgZmluYWwgY2xhc3MgaW4gdGhpcyBtb2R1bGVcbnZhciBSZWFjdENvbXBvc2l0ZUNvbXBvbmVudFdyYXBwZXIgPSBmdW5jdGlvbiAoKSB7fTtcbmFzc2lnbihSZWFjdENvbXBvc2l0ZUNvbXBvbmVudFdyYXBwZXIucHJvdG90eXBlLCBSZWFjdENvbXBvc2l0ZUNvbXBvbmVudC5NaXhpbiwge1xuICBfaW5zdGFudGlhdGVSZWFjdENvbXBvbmVudDogaW5zdGFudGlhdGVSZWFjdENvbXBvbmVudFxufSk7XG5cbmZ1bmN0aW9uIGdldERlY2xhcmF0aW9uRXJyb3JBZGRlbmR1bShvd25lcikge1xuICBpZiAob3duZXIpIHtcbiAgICB2YXIgbmFtZSA9IG93bmVyLmdldE5hbWUoKTtcbiAgICBpZiAobmFtZSkge1xuICAgICAgcmV0dXJuICcgQ2hlY2sgdGhlIHJlbmRlciBtZXRob2Qgb2YgYCcgKyBuYW1lICsgJ2AuJztcbiAgICB9XG4gIH1cbiAgcmV0dXJuICcnO1xufVxuXG4vKipcbiAqIENoZWNrIGlmIHRoZSB0eXBlIHJlZmVyZW5jZSBpcyBhIGtub3duIGludGVybmFsIHR5cGUuIEkuZS4gbm90IGEgdXNlclxuICogcHJvdmlkZWQgY29tcG9zaXRlIHR5cGUuXG4gKlxuICogQHBhcmFtIHtmdW5jdGlvbn0gdHlwZVxuICogQHJldHVybiB7Ym9vbGVhbn0gUmV0dXJucyB0cnVlIGlmIHRoaXMgaXMgYSB2YWxpZCBpbnRlcm5hbCB0eXBlLlxuICovXG5mdW5jdGlvbiBpc0ludGVybmFsQ29tcG9uZW50VHlwZSh0eXBlKSB7XG4gIHJldHVybiB0eXBlb2YgdHlwZSA9PT0gJ2Z1bmN0aW9uJyAmJiB0eXBlb2YgdHlwZS5wcm90b3R5cGUgIT09ICd1bmRlZmluZWQnICYmIHR5cGVvZiB0eXBlLnByb3RvdHlwZS5tb3VudENvbXBvbmVudCA9PT0gJ2Z1bmN0aW9uJyAmJiB0eXBlb2YgdHlwZS5wcm90b3R5cGUucmVjZWl2ZUNvbXBvbmVudCA9PT0gJ2Z1bmN0aW9uJztcbn1cblxuLyoqXG4gKiBHaXZlbiBhIFJlYWN0Tm9kZSwgY3JlYXRlIGFuIGluc3RhbmNlIHRoYXQgd2lsbCBhY3R1YWxseSBiZSBtb3VudGVkLlxuICpcbiAqIEBwYXJhbSB7UmVhY3ROb2RlfSBub2RlXG4gKiBAcmV0dXJuIHtvYmplY3R9IEEgbmV3IGluc3RhbmNlIG9mIHRoZSBlbGVtZW50J3MgY29uc3RydWN0b3IuXG4gKiBAcHJvdGVjdGVkXG4gKi9cbmZ1bmN0aW9uIGluc3RhbnRpYXRlUmVhY3RDb21wb25lbnQobm9kZSkge1xuICB2YXIgaW5zdGFuY2U7XG5cbiAgaWYgKG5vZGUgPT09IG51bGwgfHwgbm9kZSA9PT0gZmFsc2UpIHtcbiAgICBpbnN0YW5jZSA9IG5ldyBSZWFjdEVtcHR5Q29tcG9uZW50KGluc3RhbnRpYXRlUmVhY3RDb21wb25lbnQpO1xuICB9IGVsc2UgaWYgKHR5cGVvZiBub2RlID09PSAnb2JqZWN0Jykge1xuICAgIHZhciBlbGVtZW50ID0gbm9kZTtcbiAgICAhKGVsZW1lbnQgJiYgKHR5cGVvZiBlbGVtZW50LnR5cGUgPT09ICdmdW5jdGlvbicgfHwgdHlwZW9mIGVsZW1lbnQudHlwZSA9PT0gJ3N0cmluZycpKSA/IHByb2Nlc3MuZW52Lk5PREVfRU5WICE9PSAncHJvZHVjdGlvbicgPyBpbnZhcmlhbnQoZmFsc2UsICdFbGVtZW50IHR5cGUgaXMgaW52YWxpZDogZXhwZWN0ZWQgYSBzdHJpbmcgKGZvciBidWlsdC1pbiBjb21wb25lbnRzKSAnICsgJ29yIGEgY2xhc3MvZnVuY3Rpb24gKGZvciBjb21wb3NpdGUgY29tcG9uZW50cykgYnV0IGdvdDogJXMuJXMnLCBlbGVtZW50LnR5cGUgPT0gbnVsbCA/IGVsZW1lbnQudHlwZSA6IHR5cGVvZiBlbGVtZW50LnR5cGUsIGdldERlY2xhcmF0aW9uRXJyb3JBZGRlbmR1bShlbGVtZW50Ll9vd25lcikpIDogaW52YXJpYW50KGZhbHNlKSA6IHVuZGVmaW5lZDtcblxuICAgIC8vIFNwZWNpYWwgY2FzZSBzdHJpbmcgdmFsdWVzXG4gICAgaWYgKHR5cGVvZiBlbGVtZW50LnR5cGUgPT09ICdzdHJpbmcnKSB7XG4gICAgICBpbnN0YW5jZSA9IFJlYWN0TmF0aXZlQ29tcG9uZW50LmNyZWF0ZUludGVybmFsQ29tcG9uZW50KGVsZW1lbnQpO1xuICAgIH0gZWxzZSBpZiAoaXNJbnRlcm5hbENvbXBvbmVudFR5cGUoZWxlbWVudC50eXBlKSkge1xuICAgICAgLy8gVGhpcyBpcyB0ZW1wb3JhcmlseSBhdmFpbGFibGUgZm9yIGN1c3RvbSBjb21wb25lbnRzIHRoYXQgYXJlIG5vdCBzdHJpbmdcbiAgICAgIC8vIHJlcHJlc2VudGF0aW9ucy4gSS5lLiBBUlQuIE9uY2UgdGhvc2UgYXJlIHVwZGF0ZWQgdG8gdXNlIHRoZSBzdHJpbmdcbiAgICAgIC8vIHJlcHJlc2VudGF0aW9uLCB3ZSBjYW4gZHJvcCB0aGlzIGNvZGUgcGF0aC5cbiAgICAgIGluc3RhbmNlID0gbmV3IGVsZW1lbnQudHlwZShlbGVtZW50KTtcbiAgICB9IGVsc2Uge1xuICAgICAgaW5zdGFuY2UgPSBuZXcgUmVhY3RDb21wb3NpdGVDb21wb25lbnRXcmFwcGVyKCk7XG4gICAgfVxuICB9IGVsc2UgaWYgKHR5cGVvZiBub2RlID09PSAnc3RyaW5nJyB8fCB0eXBlb2Ygbm9kZSA9PT0gJ251bWJlcicpIHtcbiAgICBpbnN0YW5jZSA9IFJlYWN0TmF0aXZlQ29tcG9uZW50LmNyZWF0ZUluc3RhbmNlRm9yVGV4dChub2RlKTtcbiAgfSBlbHNlIHtcbiAgICAhZmFsc2UgPyBwcm9jZXNzLmVudi5OT0RFX0VOViAhPT0gJ3Byb2R1Y3Rpb24nID8gaW52YXJpYW50KGZhbHNlLCAnRW5jb3VudGVyZWQgaW52YWxpZCBSZWFjdCBub2RlIG9mIHR5cGUgJXMnLCB0eXBlb2Ygbm9kZSkgOiBpbnZhcmlhbnQoZmFsc2UpIDogdW5kZWZpbmVkO1xuICB9XG5cbiAgaWYgKHByb2Nlc3MuZW52Lk5PREVfRU5WICE9PSAncHJvZHVjdGlvbicpIHtcbiAgICBwcm9jZXNzLmVudi5OT0RFX0VOViAhPT0gJ3Byb2R1Y3Rpb24nID8gd2FybmluZyh0eXBlb2YgaW5zdGFuY2UuY29uc3RydWN0ID09PSAnZnVuY3Rpb24nICYmIHR5cGVvZiBpbnN0YW5jZS5tb3VudENvbXBvbmVudCA9PT0gJ2Z1bmN0aW9uJyAmJiB0eXBlb2YgaW5zdGFuY2UucmVjZWl2ZUNvbXBvbmVudCA9PT0gJ2Z1bmN0aW9uJyAmJiB0eXBlb2YgaW5zdGFuY2UudW5tb3VudENvbXBvbmVudCA9PT0gJ2Z1bmN0aW9uJywgJ09ubHkgUmVhY3QgQ29tcG9uZW50cyBjYW4gYmUgbW91bnRlZC4nKSA6IHVuZGVmaW5lZDtcbiAgfVxuXG4gIC8vIFNldHMgdXAgdGhlIGluc3RhbmNlLiBUaGlzIGNhbiBwcm9iYWJseSBqdXN0IG1vdmUgaW50byB0aGUgY29uc3RydWN0b3Igbm93LlxuICBpbnN0YW5jZS5jb25zdHJ1Y3Qobm9kZSk7XG5cbiAgLy8gVGhlc2UgdHdvIGZpZWxkcyBhcmUgdXNlZCBieSB0aGUgRE9NIGFuZCBBUlQgZGlmZmluZyBhbGdvcml0aG1zXG4gIC8vIHJlc3BlY3RpdmVseS4gSW5zdGVhZCBvZiB1c2luZyBleHBhbmRvcyBvbiBjb21wb25lbnRzLCB3ZSBzaG91bGQgYmVcbiAgLy8gc3RvcmluZyB0aGUgc3RhdGUgbmVlZGVkIGJ5IHRoZSBkaWZmaW5nIGFsZ29yaXRobXMgZWxzZXdoZXJlLlxuICBpbnN0YW5jZS5fbW91bnRJbmRleCA9IDA7XG4gIGluc3RhbmNlLl9tb3VudEltYWdlID0gbnVsbDtcblxuICBpZiAocHJvY2Vzcy5lbnYuTk9ERV9FTlYgIT09ICdwcm9kdWN0aW9uJykge1xuICAgIGluc3RhbmNlLl9pc093bmVyTmVjZXNzYXJ5ID0gZmFsc2U7XG4gICAgaW5zdGFuY2UuX3dhcm5lZEFib3V0UmVmc0luUmVuZGVyID0gZmFsc2U7XG4gIH1cblxuICAvLyBJbnRlcm5hbCBpbnN0YW5jZXMgc2hvdWxkIGZ1bGx5IGNvbnN0cnVjdGVkIGF0IHRoaXMgcG9pbnQsIHNvIHRoZXkgc2hvdWxkXG4gIC8vIG5vdCBnZXQgYW55IG5ldyBmaWVsZHMgYWRkZWQgdG8gdGhlbSBhdCB0aGlzIHBvaW50LlxuICBpZiAocHJvY2Vzcy5lbnYuTk9ERV9FTlYgIT09ICdwcm9kdWN0aW9uJykge1xuICAgIGlmIChPYmplY3QucHJldmVudEV4dGVuc2lvbnMpIHtcbiAgICAgIE9iamVjdC5wcmV2ZW50RXh0ZW5zaW9ucyhpbnN0YW5jZSk7XG4gICAgfVxuICB9XG5cbiAgcmV0dXJuIGluc3RhbmNlO1xufVxuXG5tb2R1bGUuZXhwb3J0cyA9IGluc3RhbnRpYXRlUmVhY3RDb21wb25lbnQ7Il19