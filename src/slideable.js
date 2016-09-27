(function ($, window, document, undefined) {
    'use strict';

    var pluginName = "slideable",
        defaults = {
            direction: 'left'
        };

    function Slidable (element, options) {
        this.element = element;
        this.settings = $.extend({}, defaults, options);
        this._defaults = defaults;
        this._name = pluginName;
        this.init();
    }

    $.extend(Slidable.prototype, {
        init: function () {
            $(this.element).addClass('out slide-' + this.settings.direction);
        },
        slideIn: function () {
            $(this.element).addClass('in');
            return this;
        },
        slideOut: function () {
            $(this.element).removeClass('in');
            return this;
        }
    });

    $.makePlugin(pluginName, Slidable);

    $(document).ready(function () {
        $('[data-slideable]').each(function () {
            var element = $(this);
            element[pluginName]({direction: element.data(pluginName)});
        });
    });
})(jQuery, window, document);