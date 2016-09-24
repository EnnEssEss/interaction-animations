(function ($, window, document, undefined) {
    'use strict';

    var pluginName = "rippleClick",
        defaults = {};

    function RippleClick (element, options) {
        this.element = element;
        this.settings = $.extend({}, defaults, options);
        this._defaults = defaults;
        this._name = pluginName;
        this.init();
    }

    $.extend(RippleClick.prototype, {
        init: function() {
            this.bindEvents();
        },
        bindEvents: function () {
            var self = this;
            $(this.element).on('click.'+this._name, function (e) {
                RippleClick.prototype._addRippleElement.call(self, e);
            });
        },
        _addRippleElement: function (e) {
            var $container = $(this.element),
                d = (Math.max($container.outerHeight(), $(this.element).outerWidth())),
                x = e.pageX - $container.offset().left - d/2,
                y = e.pageY - $container.offset().top - d/2,
                rippleElement;

            if (this.rippleElement) {
                rippleElement = this.rippleElement.removeClass('animate');
            } else {
                rippleElement = $('<span class="ripple"></span>')
                    .appendTo(this.element);
            }

            rippleElement
                .css({height: d, width: d, left: x, top: y})
                .addClass('animate');
        }
    } );

    // A really lightweight plugin wrapper around the constructor,
    // preventing against multiple instantiations
    $.fn[pluginName] = function( options ) {
        return this.each(function() {
            if (!$.data(this, "plugin_" + pluginName)) {
                $.data(this, "plugin_" + pluginName, new RippleClick(this, options));
            }
        });
    };

    $(document).ready(function () {
        $('[data-ripple-click]').rippleClick();
    });
})(jQuery, window, document);