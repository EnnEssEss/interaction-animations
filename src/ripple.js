(function ($, window, document, undefined) {
    'use strict';

    var pluginName = "rippleClick",
        defaults = {};

    function RippleClick (element, options) {
        this.element = element;
        this.$element = $(this.element);
        this.settings = $.extend({}, defaults, options);
        this._defaults = defaults;
        this._name = pluginName;
        this.init();
    }

    $.extend(RippleClick.prototype, {
        init: function() {
            this.setupElement();
            this.bindEvents();
        },
        setupElement: function () {
            this.initialPosition = $(this.$element).css('position');
            this.$rippleContainer = $('<div class="ripple-container"></div>').
                prependTo(this.element);

            if (!this.initialPosition || this.initialPosition === 'static') {
                this.$element.css({position: 'relative'});
            }
        },
        bindEvents: function () {
            var self = this;
            $(this.element).on('click.'+this._name, function (e) {
                RippleClick.prototype.addRippleElement.call(self, e);
            });
        },
        addRippleElement: function (e) {
            var d = (Math.max(this.$rippleContainer.outerHeight(), this.$rippleContainer.outerWidth())),
                x = e.pageX - this.$rippleContainer.offset().left - d/2,
                y = e.pageY - this.$rippleContainer.offset().top - d/2;

            if (this.$rippleElement) {
                this.$rippleElement.remove();
            }

            this.$rippleElement = $('<span class="ripple"></span>')
                .appendTo(this.$rippleContainer)
                .css({height: d, width: d, left: x, top: y});

            if (this.settings.backgroundColor) {
                this.$rippleElement.css({'background-color': this.settings.backgroundColor});
            }

            this.$rippleElement.addClass('animate');
        }
    });

    // A really lightweight plugin wrapper around the constructor,
    // preventing against multiple instantiations
    $.fn[pluginName] = function (options, arg) {
        return this.each(function() {
            var instance = $.data(this, 'plugin_' + pluginName);
            if (!instance) {
                $.data(this, 'plugin_' + pluginName, new RippleClick(this, options));
            } else if (typeof options === 'string' && typeof instance[options] === 'function') {
                instance[options](arg);
            }
        });
    };

    $(document).ready(function () {
        $('[data-ripple-click]').each(function () {
            var element = $(this);
            element[pluginName](element.data(pluginName));
        });
    });
})(jQuery, window, document);