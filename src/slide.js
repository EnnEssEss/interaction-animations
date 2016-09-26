(function ($, window, document, undefined) {
    'use strict';

    var pluginName = "animateSlideIn",
        defaults = {
            direction: 'left'
        };

    function SlideIn (element, options) {
        this.element = element;
        this.settings = $.extend({}, defaults, options);
        this._defaults = defaults;
        this._name = pluginName;
        this.init();
    }

    $.extend(SlideIn.prototype, {
        init: function () {
            $(this.element).addClass('out slide-' + this.settings.direction);
        },
        slideIn: function () {
            $(this.element).addClass('in');
        },
        slideOut: function () {
            $(this.element).removeClass('in');
        }
    });

    $.fn[pluginName] = function (options, arg) {
        return this.each(function() {
            var instance = $.data(this, 'plugin_' + pluginName);
            if (!instance) {
                $.data(this, 'plugin_' + pluginName, new SlideIn(this, options));
            } else if (typeof options === 'string' && typeof instance[options] === 'function') {
                instance[options](arg);
            }
        });
    };

    $(document).ready(function () {
        $('[data-animate-slide-in]').each(function () {
            var element = $(this);
            element[pluginName]({direction: element.data(pluginName)});
        });
    });
})(jQuery, window, document);