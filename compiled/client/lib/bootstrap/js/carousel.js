'use strict';

var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol ? "symbol" : typeof obj; };

/* ========================================================================
 * Bootstrap: carousel.js v3.3.6
 * http://getbootstrap.com/javascript/#carousel
 * ========================================================================
 * Copyright 2011-2015 Twitter, Inc.
 * Licensed under MIT (https://github.com/twbs/bootstrap/blob/master/LICENSE)
 * ======================================================================== */

+function ($) {
  'use strict';

  // CAROUSEL CLASS DEFINITION
  // =========================

  var Carousel = function Carousel(element, options) {
    this.$element = $(element);
    this.$indicators = this.$element.find('.carousel-indicators');
    this.options = options;
    this.paused = null;
    this.sliding = null;
    this.interval = null;
    this.$active = null;
    this.$items = null;

    this.options.keyboard && this.$element.on('keydown.bs.carousel', $.proxy(this.keydown, this));

    this.options.pause == 'hover' && !('ontouchstart' in document.documentElement) && this.$element.on('mouseenter.bs.carousel', $.proxy(this.pause, this)).on('mouseleave.bs.carousel', $.proxy(this.cycle, this));
  };

  Carousel.VERSION = '3.3.6';

  Carousel.TRANSITION_DURATION = 600;

  Carousel.DEFAULTS = {
    interval: 5000,
    pause: 'hover',
    wrap: true,
    keyboard: true
  };

  Carousel.prototype.keydown = function (e) {
    if (/input|textarea/i.test(e.target.tagName)) return;
    switch (e.which) {
      case 37:
        this.prev();break;
      case 39:
        this.next();break;
      default:
        return;
    }

    e.preventDefault();
  };

  Carousel.prototype.cycle = function (e) {
    e || (this.paused = false);

    this.interval && clearInterval(this.interval);

    this.options.interval && !this.paused && (this.interval = setInterval($.proxy(this.next, this), this.options.interval));

    return this;
  };

  Carousel.prototype.getItemIndex = function (item) {
    this.$items = item.parent().children('.item');
    return this.$items.index(item || this.$active);
  };

  Carousel.prototype.getItemForDirection = function (direction, active) {
    var activeIndex = this.getItemIndex(active);
    var willWrap = direction == 'prev' && activeIndex === 0 || direction == 'next' && activeIndex == this.$items.length - 1;
    if (willWrap && !this.options.wrap) return active;
    var delta = direction == 'prev' ? -1 : 1;
    var itemIndex = (activeIndex + delta) % this.$items.length;
    return this.$items.eq(itemIndex);
  };

  Carousel.prototype.to = function (pos) {
    var that = this;
    var activeIndex = this.getItemIndex(this.$active = this.$element.find('.item.active'));

    if (pos > this.$items.length - 1 || pos < 0) return;

    if (this.sliding) return this.$element.one('slid.bs.carousel', function () {
      that.to(pos);
    }); // yes, "slid"
    if (activeIndex == pos) return this.pause().cycle();

    return this.slide(pos > activeIndex ? 'next' : 'prev', this.$items.eq(pos));
  };

  Carousel.prototype.pause = function (e) {
    e || (this.paused = true);

    if (this.$element.find('.next, .prev').length && $.support.transition) {
      this.$element.trigger($.support.transition.end);
      this.cycle(true);
    }

    this.interval = clearInterval(this.interval);

    return this;
  };

  Carousel.prototype.next = function () {
    if (this.sliding) return;
    return this.slide('next');
  };

  Carousel.prototype.prev = function () {
    if (this.sliding) return;
    return this.slide('prev');
  };

  Carousel.prototype.slide = function (type, next) {
    var $active = this.$element.find('.item.active');
    var $next = next || this.getItemForDirection(type, $active);
    var isCycling = this.interval;
    var direction = type == 'next' ? 'left' : 'right';
    var that = this;

    if ($next.hasClass('active')) return this.sliding = false;

    var relatedTarget = $next[0];
    var slideEvent = $.Event('slide.bs.carousel', {
      relatedTarget: relatedTarget,
      direction: direction
    });
    this.$element.trigger(slideEvent);
    if (slideEvent.isDefaultPrevented()) return;

    this.sliding = true;

    isCycling && this.pause();

    if (this.$indicators.length) {
      this.$indicators.find('.active').removeClass('active');
      var $nextIndicator = $(this.$indicators.children()[this.getItemIndex($next)]);
      $nextIndicator && $nextIndicator.addClass('active');
    }

    var slidEvent = $.Event('slid.bs.carousel', { relatedTarget: relatedTarget, direction: direction }); // yes, "slid"
    if ($.support.transition && this.$element.hasClass('slide')) {
      $next.addClass(type);
      $next[0].offsetWidth; // force reflow
      $active.addClass(direction);
      $next.addClass(direction);
      $active.one('bsTransitionEnd', function () {
        $next.removeClass([type, direction].join(' ')).addClass('active');
        $active.removeClass(['active', direction].join(' '));
        that.sliding = false;
        setTimeout(function () {
          that.$element.trigger(slidEvent);
        }, 0);
      }).emulateTransitionEnd(Carousel.TRANSITION_DURATION);
    } else {
      $active.removeClass('active');
      $next.addClass('active');
      this.sliding = false;
      this.$element.trigger(slidEvent);
    }

    isCycling && this.cycle();

    return this;
  };

  // CAROUSEL PLUGIN DEFINITION
  // ==========================

  function Plugin(option) {
    return this.each(function () {
      var $this = $(this);
      var data = $this.data('bs.carousel');
      var options = $.extend({}, Carousel.DEFAULTS, $this.data(), (typeof option === 'undefined' ? 'undefined' : _typeof(option)) == 'object' && option);
      var action = typeof option == 'string' ? option : options.slide;

      if (!data) $this.data('bs.carousel', data = new Carousel(this, options));
      if (typeof option == 'number') data.to(option);else if (action) data[action]();else if (options.interval) data.pause().cycle();
    });
  }

  var old = $.fn.carousel;

  $.fn.carousel = Plugin;
  $.fn.carousel.Constructor = Carousel;

  // CAROUSEL NO CONFLICT
  // ====================

  $.fn.carousel.noConflict = function () {
    $.fn.carousel = old;
    return this;
  };

  // CAROUSEL DATA-API
  // =================

  var clickHandler = function clickHandler(e) {
    var href;
    var $this = $(this);
    var $target = $($this.attr('data-target') || (href = $this.attr('href')) && href.replace(/.*(?=#[^\s]+$)/, '')); // strip for ie7
    if (!$target.hasClass('carousel')) return;
    var options = $.extend({}, $target.data(), $this.data());
    var slideIndex = $this.attr('data-slide-to');
    if (slideIndex) options.interval = false;

    Plugin.call($target, options);

    if (slideIndex) {
      $target.data('bs.carousel').to(slideIndex);
    }

    e.preventDefault();
  };

  $(document).on('click.bs.carousel.data-api', '[data-slide]', clickHandler).on('click.bs.carousel.data-api', '[data-slide-to]', clickHandler);

  $(window).on('load', function () {
    $('[data-ride="carousel"]').each(function () {
      var $carousel = $(this);
      Plugin.call($carousel, $carousel.data());
    });
  });
}(jQuery);
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uLy4uLy4uLy4uL2NsaWVudC9saWIvYm9vdHN0cmFwL2pzL2Nhcm91c2VsLmpzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7OztBQVNBLENBQUMsVUFBVSxDQUFWLEVBQWE7QUFDWjs7Ozs7QUFLQSxNQUFJLFdBQVcsU0FBWCxRQUFXLENBQVUsT0FBVixFQUFtQixPQUFuQixFQUE0QjtBQUN6QyxTQUFLLFFBQUwsR0FBbUIsRUFBRSxPQUFGLENBQW5CO0FBQ0EsU0FBSyxXQUFMLEdBQW1CLEtBQUssUUFBTCxDQUFjLElBQWQsQ0FBbUIsc0JBQW5CLENBQW5CO0FBQ0EsU0FBSyxPQUFMLEdBQW1CLE9BQW5CO0FBQ0EsU0FBSyxNQUFMLEdBQW1CLElBQW5CO0FBQ0EsU0FBSyxPQUFMLEdBQW1CLElBQW5CO0FBQ0EsU0FBSyxRQUFMLEdBQW1CLElBQW5CO0FBQ0EsU0FBSyxPQUFMLEdBQW1CLElBQW5CO0FBQ0EsU0FBSyxNQUFMLEdBQW1CLElBQW5COztBQUVBLFNBQUssT0FBTCxDQUFhLFFBQWIsSUFBeUIsS0FBSyxRQUFMLENBQWMsRUFBZCxDQUFpQixxQkFBakIsRUFBd0MsRUFBRSxLQUFGLENBQVEsS0FBSyxPQUFiLEVBQXNCLElBQXRCLENBQXhDLENBQXpCOztBQUVBLFNBQUssT0FBTCxDQUFhLEtBQWIsSUFBc0IsT0FBdEIsSUFBaUMsRUFBRSxrQkFBa0IsU0FBUyxlQUE3QixDQUFqQyxJQUFrRixLQUFLLFFBQUwsQ0FDL0UsRUFEK0UsQ0FDNUUsd0JBRDRFLEVBQ2xELEVBQUUsS0FBRixDQUFRLEtBQUssS0FBYixFQUFvQixJQUFwQixDQURrRCxFQUUvRSxFQUYrRSxDQUU1RSx3QkFGNEUsRUFFbEQsRUFBRSxLQUFGLENBQVEsS0FBSyxLQUFiLEVBQW9CLElBQXBCLENBRmtELENBQWxGO0FBR0QsR0FmRDs7QUFpQkEsV0FBUyxPQUFULEdBQW9CLE9BQXBCOztBQUVBLFdBQVMsbUJBQVQsR0FBK0IsR0FBL0I7O0FBRUEsV0FB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RUFDb0MsY0FEcEMsRUFDb0QsWUFEcEQsRUFFRyxFQUZILENBRU0sNEJBRk4sRUFFb0MsaUJBRnBDLEVBRXVELFlBRnZEOztBQUlBLElBQUUsTUFBRixFQUFVLEVBQVYsQ0FBYSxNQUFiLEVBQXFCLFlBQVk7QUFDL0IsTUFBRSx3QkFBRixFQUE0QixJQUE1QixDQUFpQyxZQUFZO0FBQzNDLFVBQUksWUFBWSxFQUFFLElBQUYsQ0FBaEI7QUFDQSxhQUFPLElBQVAsQ0FBWSxTQUFaLEVBQXVCLFVBQVUsSUFBVixFQUF2QjtBQUNELEtBSEQ7QUFJRCxHQUxEO0FBT0QsQ0FuT0EsQ0FtT0MsTUFuT0QsQ0FBRCIsImZpbGUiOiJjYXJvdXNlbC5qcyIsInNvdXJjZXNDb250ZW50IjpbIi8qID09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PVxuICogQm9vdHN0cmFwOiBjYXJvdXNlbC5qcyB2My4zLjZcbiAqIGh0dHA6Ly9nZXRib290c3RyYXAuY29tL2phdmFzY3JpcHQvI2Nhcm91c2VsXG4gKiA9PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT1cbiAqIENvcHlyaWdodCAyMDExLTIwMTUgVHdpdHRlciwgSW5jLlxuICogTGljZW5zZWQgdW5kZXIgTUlUIChodHRwczovL2dpdGh1Yi5jb20vdHdicy9ib290c3RyYXAvYmxvYi9tYXN0ZXIvTElDRU5TRSlcbiAqID09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PSAqL1xuXG5cbitmdW5jdGlvbiAoJCkge1xuICAndXNlIHN0cmljdCc7XG5cbiAgLy8gQ0FST1VTRUwgQ0xBU1MgREVGSU5JVElPTlxuICAvLyA9PT09PT09PT09PT09PT09PT09PT09PT09XG5cbiAgdmFyIENhcm91c2VsID0gZnVuY3Rpb24gKGVsZW1lbnQsIG9wdGlvbnMpIHtcbiAgICB0aGlzLiRlbGVtZW50ICAgID0gJChlbGVtZW50KVxuICAgIHRoaXMuJGluZGljYXRvcnMgPSB0aGlzLiRlbGVtZW50LmZpbmQoJy5jYXJvdXNlbC1pbmRpY2F0b3JzJylcbiAgICB0aGlzLm9wdGlvbnMgICAgID0gb3B0aW9uc1xuICAgIHRoaXMucGF1c2VkICAgICAgPSBudWxsXG4gICAgdGhpcy5zbGlkaW5nICAgICA9IG51bGxcbiAgICB0aGlzLmludGVydmFsICAgID0gbnVsbFxuICAgIHRoaXMuJGFjdGl2ZSAgICAgPSBudWxsXG4gICAgdGhpcy4kaXRlbXMgICAgICA9IG51bGxcblxuICAgIHRoaXMub3B0aW9ucy5rZXlib2FyZCAmJiB0aGlzLiRlbGVtZW50Lm9uKCdrZXlkb3duLmJzLmNhcm91c2VsJywgJC5wcm94eSh0aGlzLmtleWRvd24sIHRoaXMpKVxuXG4gICAgdGhpcy5vcHRpb25zLnBhdXNlID09ICdob3ZlcicgJiYgISgnb250b3VjaHN0YXJ0JyBpbiBkb2N1bWVudC5kb2N1bWVudEVsZW1lbnQpICYmIHRoaXMuJGVsZW1lbnRcbiAgICAgIC5vbignbW91c2VlbnRlci5icy5jYXJvdXNlbCcsICQucHJveHkodGhpcy5wYXVzZSwgdGhpcykpXG4gICAgICAub24oJ21vdXNlbGVhdmUuYnMuY2Fyb3VzZWwnLCAkLnByb3h5KHRoaXMuY3ljbGUsIHRoaXMpKVxuICB9XG5cbiAgQ2Fyb3VzZWwuVkVSU0lPTiAgPSAnMy4zLjYnXG5cbiAgQ2Fyb3VzZWwuVFJBTlNJVElPTl9EVVJBVElPTiA9IDYwMFxuXG4gIENhcm91c2VsLkRFRkFVTFRTID0ge1xuICAgIGludGVydmFsOiA1MDAwLFxuICAgIHBhdXNlOiAnaG92ZXInLFxuICAgIHdyYXA6IHRydWUsXG4gICAga2V5Ym9hcmQ6IHRydWVcbiAgfVxuXG4gIENhcm91c2VsLnByb3RvdHlwZS5rZXlkb3duID0gZnVuY3Rpb24gKGUpIHtcbiAgICBpZiAoL2lucHV0fHRleHRhcmVhL2kudGVzdChlLnRhcmdldC50YWdOYW1lKSkgcmV0dXJuXG4gICAgc3dpdGNoIChlLndoaWNoKSB7XG4gICAgICBjYXNlIDM3OiB0aGlzLnByZXYoKTsgYnJlYWtcbiAgICAgIGNhc2UgMzk6IHRoaXMubmV4dCgpOyBicmVha1xuICAgICAgZGVmYXVsdDogcmV0dXJuXG4gICAgfVxuXG4gICAgZS5wcmV2ZW50RGVmYXVsdCgpXG4gIH1cblxuICBDYXJvdXNlbC5wcm90b3R5cGUuY3ljbGUgPSBmdW5jdGlvbiAoZSkge1xuICAgIGUgfHwgKHRoaXMucGF1c2VkID0gZmFsc2UpXG5cbiAgICB0aGlzLmludGVydmFsICYmIGNsZWFySW50ZXJ2YWwodGhpcy5pbnRlcnZhbClcblxuICAgIHRoaXMub3B0aW9ucy5pbnRlcnZhbFxuICAgICAgJiYgIXRoaXMucGF1c2VkXG4gICAgICAmJiAodGhpcy5pbnRlcnZhbCA9IHNldEludGVydmFsKCQucHJveHkodGhpcy5uZXh0LCB0aGlzKSwgdGhpcy5vcHRpb25zLmludGVydmFsKSlcblxuICAgIHJldHVybiB0aGlzXG4gIH1cblxuICBDYXJvdXNlbC5wcm90b3R5cGUuZ2V0SXRlbUluZGV4ID0gZnVuY3Rpb24gKGl0ZW0pIHtcbiAgICB0aGlzLiRpdGVtcyA9IGl0ZW0ucGFyZW50KCkuY2hpbGRyZW4oJy5pdGVtJylcbiAgICByZXR1cm4gdGhpcy4kaXRlbXMuaW5kZXgoaXRlbSB8fCB0aGlzLiRhY3RpdmUpXG4gIH1cblxuICBDYXJvdXNlbC5wcm90b3R5cGUuZ2V0SXRlbUZvckRpcmVjdGlvbiA9IGZ1bmN0aW9uIChkaXJlY3Rpb24sIGFjdGl2ZSkge1xuICAgIHZhciBhY3RpdmVJbmRleCA9IHRoaXMuZ2V0SXRlbUluZGV4KGFjdGl2ZSlcbiAgICB2YXIgd2lsbFdyYXAgPSAoZGlyZWN0aW9uID09ICdwcmV2JyAmJiBhY3RpdmVJbmRleCA9PT0gMClcbiAgICAgICAgICAgICAgICB8fCAoZGlyZWN0aW9uID09ICduZXh0JyAmJiBhY3RpdmVJbmRleCA9PSAodGhpcy4kaXRlbXMubGVuZ3RoIC0gMSkpXG4gICAgaWYgKHdpbGxXcmFwICYmICF0aGlzLm9wdGlvbnMud3JhcCkgcmV0dXJuIGFjdGl2ZVxuICAgIHZhciBkZWx0YSA9IGRpcmVjdGlvbiA9PSAncHJldicgPyAtMSA6IDFcbiAgICB2YXIgaXRlbUluZGV4ID0gKGFjdGl2ZUluZGV4ICsgZGVsdGEpICUgdGhpcy4kaXRlbXMubGVuZ3RoXG4gICAgcmV0dXJuIHRoaXMuJGl0ZW1zLmVxKGl0ZW1JbmRleClcbiAgfVxuXG4gIENhcm91c2VsLnByb3RvdHlwZS50byA9IGZ1bmN0aW9uIChwb3MpIHtcbiAgICB2YXIgdGhhdCAgICAgICAgPSB0aGlzXG4gICAgdmFyIGFjdGl2ZUluZGV4ID0gdGhpcy5nZXRJdGVtSW5kZXgodGhpcy4kYWN0aXZlID0gdGhpcy4kZWxlbWVudC5maW5kKCcuaXRlbS5hY3RpdmUnKSlcblxuICAgIGlmIChwb3MgPiAodGhpcy4kaXRlbXMubGVuZ3RoIC0gMSkgfHwgcG9zIDwgMCkgcmV0dXJuXG5cbiAgICBpZiAodGhpcy5zbGlkaW5nKSAgICAgICByZXR1cm4gdGhpcy4kZWxlbWVudC5vbmUoJ3NsaWQuYnMuY2Fyb3VzZWwnLCBmdW5jdGlvbiAoKSB7IHRoYXQudG8ocG9zKSB9KSAvLyB5ZXMsIFwic2xpZFwiXG4gICAgaWYgKGFjdGl2ZUluZGV4ID09IHBvcykgcmV0dXJuIHRoaXMucGF1c2UoKS5jeWNsZSgpXG5cbiAgICByZXR1cm4gdGhpcy5zbGlkZShwb3MgPiBhY3RpdmVJbmRleCA/ICduZXh0JyA6ICdwcmV2JywgdGhpcy4kaXRlbXMuZXEocG9zKSlcbiAgfVxuXG4gIENhcm91c2VsLnByb3RvdHlwZS5wYXVzZSA9IGZ1bmN0aW9uIChlKSB7XG4gICAgZSB8fCAodGhpcy5wYXVzZWQgPSB0cnVlKVxuXG4gICAgaWYgKHRoaXMuJGVsZW1lbnQuZmluZCgnLm5leHQsIC5wcmV2JykubGVuZ3RoICYmICQuc3VwcG9ydC50cmFuc2l0aW9uKSB7XG4gICAgICB0aGlzLiRlbGVtZW50LnRyaWdnZXIoJC5zdXBwb3J0LnRyYW5zaXRpb24uZW5kKVxuICAgICAgdGhpcy5jeWNsZSh0cnVlKVxuICAgIH1cblxuICAgIHRoaXMuaW50ZXJ2YWwgPSBjbGVhckludGVydmFsKHRoaXMuaW50ZXJ2YWwpXG5cbiAgICByZXR1cm4gdGhpc1xuICB9XG5cbiAgQ2Fyb3VzZWwucHJvdG90eXBlLm5leHQgPSBmdW5jdGlvbiAoKSB7XG4gICAgaWYgKHRoaXMuc2xpZGluZykgcmV0dXJuXG4gICAgcmV0dXJuIHRoaXMuc2xpZGUoJ25leHQnKVxuICB9XG5cbiAgQ2Fyb3VzZWwucHJvdG90eXBlLnByZXYgPSBmdW5jdGlvbiAoKSB7XG4gICAgaWYgKHRoaXMuc2xpZGluZykgcmV0dXJuXG4gICAgcmV0dXJuIHRoaXMuc2xpZGUoJ3ByZXYnKVxuICB9XG5cbiAgQ2Fyb3VzZWwucHJvdG90eXBlLnNsaWRlID0gZnVuY3Rpb24gKHR5cGUsIG5leHQpIHtcbiAgICB2YXIgJGFjdGl2ZSAgID0gdGhpcy4kZWxlbWVudC5maW5kKCcuaXRlbS5hY3RpdmUnKVxuICAgIHZhciAkbmV4dCAgICAgPSBuZXh0IHx8IHRoaXMuZ2V0SXRlbUZvckRpcmVjdGlvbih0eXBlLCAkYWN0aXZlKVxuICAgIHZhciBpc0N5Y2xpbmcgPSB0aGlzLmludGVydmFsXG4gICAgdmFyIGRpcmVjdGlvbiA9IHR5cGUgPT0gJ25leHQnID8gJ2xlZnQnIDogJ3JpZ2h0J1xuICAgIHZhciB0aGF0ICAgICAgPSB0aGlzXG5cbiAgICBpZiAoJG5leHQuaGFzQ2xhc3MoJ2FjdGl2ZScpKSByZXR1cm4gKHRoaXMuc2xpZGluZyA9IGZhbHNlKVxuXG4gICAgdmFyIHJlbGF0ZWRUYXJnZXQgPSAkbmV4dFswXVxuICAgIHZhciBzbGlkZUV2ZW50ID0gJC5FdmVudCgnc2xpZGUuYnMuY2Fyb3VzZWwnLCB7XG4gICAgICByZWxhdGVkVGFyZ2V0OiByZWxhdGVkVGFyZ2V0LFxuICAgICAgZGlyZWN0aW9uOiBkaXJlY3Rpb25cbiAgICB9KVxuICAgIHRoaXMuJGVsZW1lbnQudHJpZ2dlcihzbGlkZUV2ZW50KVxuICAgIGlmIChzbGlkZUV2ZW50LmlzRGVmYXVsdFByZXZlbnRlZCgpKSByZXR1cm5cblxuICAgIHRoaXMuc2xpZGluZyA9IHRydWVcblxuICAgIGlzQ3ljbGluZyAmJiB0aGlzLnBhdXNlKClcblxuICAgIGlmICh0aGlzLiRpbmRpY2F0b3JzLmxlbmd0aCkge1xuICAgICAgdGhpcy4kaW5kaWNhdG9ycy5maW5kKCcuYWN0aXZlJykucmVtb3ZlQ2xhc3MoJ2FjdGl2ZScpXG4gICAgICB2YXIgJG5leHRJbmRpY2F0b3IgPSAkKHRoaXMuJGluZGljYXRvcnMuY2hpbGRyZW4oKVt0aGlzLmdldEl0ZW1JbmRleCgkbmV4dCldKVxuICAgICAgJG5leHRJbmRpY2F0b3IgJiYgJG5leHRJbmRpY2F0b3IuYWRkQ2xhc3MoJ2FjdGl2ZScpXG4gICAgfVxuXG4gICAgdmFyIHNsaWRFdmVudCA9ICQuRXZlbnQoJ3NsaWQuYnMuY2Fyb3VzZWwnLCB7IHJlbGF0ZWRUYXJnZXQ6IHJlbGF0ZWRUYXJnZXQsIGRpcmVjdGlvbjogZGlyZWN0aW9uIH0pIC8vIHllcywgXCJzbGlkXCJcbiAgICBpZiAoJC5zdXBwb3J0LnRyYW5zaXRpb24gJiYgdGhpcy4kZWxlbWVudC5oYXNDbGFzcygnc2xpZGUnKSkge1xuICAgICAgJG5leHQuYWRkQ2xhc3ModHlwZSlcbiAgICAgICRuZXh0WzBdLm9mZnNldFdpZHRoIC8vIGZvcmNlIHJlZmxvd1xuICAgICAgJGFjdGl2ZS5hZGRDbGFzcyhkaXJlY3Rpb24pXG4gICAgICAkbmV4dC5hZGRDbGFzcyhkaXJlY3Rpb24pXG4gICAgICAkYWN0aXZlXG4gICAgICAgIC5vbmUoJ2JzVHJhbnNpdGlvbkVuZCcsIGZ1bmN0aW9uICgpIHtcbiAgICAgICAgICAkbmV4dC5yZW1vdmVDbGFzcyhbdHlwZSwgZGlyZWN0aW9uXS5qb2luKCcgJykpLmFkZENsYXNzKCdhY3RpdmUnKVxuICAgICAgICAgICRhY3RpdmUucmVtb3ZlQ2xhc3MoWydhY3RpdmUnLCBkaXJlY3Rpb25dLmpvaW4oJyAnKSlcbiAgICAgICAgICB0aGF0LnNsaWRpbmcgPSBmYWxzZVxuICAgICAgICAgIHNldFRpbWVvdXQoZnVuY3Rpb24gKCkge1xuICAgICAgICAgICAgdGhhdC4kZWxlbWVudC50cmlnZ2VyKHNsaWRFdmVudClcbiAgICAgICAgICB9LCAwKVxuICAgICAgICB9KVxuICAgICAgICAuZW11bGF0ZVRyYW5zaXRpb25FbmQoQ2Fyb3VzZWwuVFJBTlNJVElPTl9EVVJBVElPTilcbiAgICB9IGVsc2Uge1xuICAgICAgJGFjdGl2ZS5yZW1vdmVDbGFzcygnYWN0aXZlJylcbiAgICAgICRuZXh0LmFkZENsYXNzKCdhY3RpdmUnKVxuICAgICAgdGhpcy5zbGlkaW5nID0gZmFsc2VcbiAgICAgIHRoaXMuJGVsZW1lbnQudHJpZ2dlcihzbGlkRXZlbnQpXG4gICAgfVxuXG4gICAgaXNDeWNsaW5nICYmIHRoaXMuY3ljbGUoKVxuXG4gICAgcmV0dXJuIHRoaXNcbiAgfVxuXG5cbiAgLy8gQ0FST1VTRUwgUExVR0lOIERFRklOSVRJT05cbiAgLy8gPT09PT09PT09PT09PT09PT09PT09PT09PT1cblxuICBmdW5jdGlvbiBQbHVnaW4ob3B0aW9uKSB7XG4gICAgcmV0dXJuIHRoaXMuZWFjaChmdW5jdGlvbiAoKSB7XG4gICAgICB2YXIgJHRoaXMgICA9ICQodGhpcylcbiAgICAgIHZhciBkYXRhICAgID0gJHRoaXMuZGF0YSgnYnMuY2Fyb3VzZWwnKVxuICAgICAgdmFyIG9wdGlvbnMgPSAkLmV4dGVuZCh7fSwgQ2Fyb3VzZWwuREVGQVVMVFMsICR0aGlzLmRhdGEoKSwgdHlwZW9mIG9wdGlvbiA9PSAnb2JqZWN0JyAmJiBvcHRpb24pXG4gICAgICB2YXIgYWN0aW9uICA9IHR5cGVvZiBvcHRpb24gPT0gJ3N0cmluZycgPyBvcHRpb24gOiBvcHRpb25zLnNsaWRlXG5cbiAgICAgIGlmICghZGF0YSkgJHRoaXMuZGF0YSgnYnMuY2Fyb3VzZWwnLCAoZGF0YSA9IG5ldyBDYXJvdXNlbCh0aGlzLCBvcHRpb25zKSkpXG4gICAgICBpZiAodHlwZW9mIG9wdGlvbiA9PSAnbnVtYmVyJykgZGF0YS50byhvcHRpb24pXG4gICAgICBlbHNlIGlmIChhY3Rpb24pIGRhdGFbYWN0aW9uXSgpXG4gICAgICBlbHNlIGlmIChvcHRpb25zLmludGVydmFsKSBkYXRhLnBhdXNlKCkuY3ljbGUoKVxuICAgIH0pXG4gIH1cblxuICB2YXIgb2xkID0gJC5mbi5jYXJvdXNlbFxuXG4gICQuZm4uY2Fyb3VzZWwgICAgICAgICAgICAgPSBQbHVnaW5cbiAgJC5mbi5jYXJvdXNlbC5Db25zdHJ1Y3RvciA9IENhcm91c2VsXG5cblxuICAvLyBDQVJPVVNFTCBOTyBDT05GTElDVFxuICAvLyA9PT09PT09PT09PT09PT09PT09PVxuXG4gICQuZm4uY2Fyb3VzZWwubm9Db25mbGljdCA9IGZ1bmN0aW9uICgpIHtcbiAgICAkLmZuLmNhcm91c2VsID0gb2xkXG4gICAgcmV0dXJuIHRoaXNcbiAgfVxuXG5cbiAgLy8gQ0FST1VTRUwgREFUQS1BUElcbiAgLy8gPT09PT09PT09PT09PT09PT1cblxuICB2YXIgY2xpY2tIYW5kbGVyID0gZnVuY3Rpb24gKGUpIHtcbiAgICB2YXIgaHJlZlxuICAgIHZhciAkdGhpcyAgID0gJCh0aGlzKVxuICAgIHZhciAkdGFyZ2V0ID0gJCgkdGhpcy5hdHRyKCdkYXRhLXRhcmdldCcpIHx8IChocmVmID0gJHRoaXMuYXR0cignaHJlZicpKSAmJiBocmVmLnJlcGxhY2UoLy4qKD89I1teXFxzXSskKS8sICcnKSkgLy8gc3RyaXAgZm9yIGllN1xuICAgIGlmICghJHRhcmdldC5oYXNDbGFzcygnY2Fyb3VzZWwnKSkgcmV0dXJuXG4gICAgdmFyIG9wdGlvbnMgPSAkLmV4dGVuZCh7fSwgJHRhcmdldC5kYXRhKCksICR0aGlzLmRhdGEoKSlcbiAgICB2YXIgc2xpZGVJbmRleCA9ICR0aGlzLmF0dHIoJ2RhdGEtc2xpZGUtdG8nKVxuICAgIGlmIChzbGlkZUluZGV4KSBvcHRpb25zLmludGVydmFsID0gZmFsc2VcblxuICAgIFBsdWdpbi5jYWxsKCR0YXJnZXQsIG9wdGlvbnMpXG5cbiAgICBpZiAoc2xpZGVJbmRleCkge1xuICAgICAgJHRhcmdldC5kYXRhKCdicy5jYXJvdXNlbCcpLnRvKHNsaWRlSW5kZXgpXG4gICAgfVxuXG4gICAgZS5wcmV2ZW50RGVmYXVsdCgpXG4gIH1cblxuICAkKGRvY3VtZW50KVxuICAgIC5vbignY2xpY2suYnMuY2Fyb3VzZWwuZGF0YS1hcGknLCAnW2RhdGEtc2xpZGVdJywgY2xpY2tIYW5kbGVyKVxuICAgIC5vbignY2xpY2suYnMuY2Fyb3VzZWwuZGF0YS1hcGknLCAnW2RhdGEtc2xpZGUtdG9dJywgY2xpY2tIYW5kbGVyKVxuXG4gICQod2luZG93KS5vbignbG9hZCcsIGZ1bmN0aW9uICgpIHtcbiAgICAkKCdbZGF0YS1yaWRlPVwiY2Fyb3VzZWxcIl0nKS5lYWNoKGZ1bmN0aW9uICgpIHtcbiAgICAgIHZhciAkY2Fyb3VzZWwgPSAkKHRoaXMpXG4gICAgICBQbHVnaW4uY2FsbCgkY2Fyb3VzZWwsICRjYXJvdXNlbC5kYXRhKCkpXG4gICAgfSlcbiAgfSlcblxufShqUXVlcnkpO1xuIl19