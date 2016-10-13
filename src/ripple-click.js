(function ($, window, document, undefined) {
    'use strict';

    var pluginName = "rippleClick",
        PluginConstructor = RippleClick,
        defaults = {
            cssClass: 'ripple-container'
        };

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
            this.setupElement()
                .bindEvents();
        },
        setupElement: function () {
            this.initialPosition = $(this.$element).css('position');
            this.$rippleContainer = $('<div class="' + this.settings.cssClass + '"></div>').
                prependTo(this.element);

            if (!this.initialPosition || this.initialPosition === 'static') {
                this.$element.css({position: 'relative'});
            }

            return this;
        },
        bindEvents: function () {
            var self = this;
            this.$element.on('click.'+this._name, function (e) {
                RippleClick.prototype.addRippleElement.call(self, e);
            });
            return this;
        },
        addRippleElement: function (e) {
            var d = (Math.max(this.$rippleContainer.outerHeight(), this.$rippleContainer.outerWidth())),
                x = e.pageX - this.$rippleContainer.offset().left - d/2,
                y = e.pageY - this.$rippleContainer.offset().top - d/2,
                css = {
                    height: d,
                    width: d,
                    left: x,
                    top: y
                };

            if (this.settings.backgroundColor) {
                css['background-color'] = this.settings.backgroundColor;
            }
            if (this.$rippleElement) {
                this.$rippleElement.remove();
            }
            this.$rippleElement = $('<span class="ripple"></span>')
                .appendTo(this.$rippleContainer)
                .css(css)
                .addClass('animate');

            return this;
        },
        destroy:  function () {
            this.$element.off('.'+this._name);
            if (this.$rippleContainer) {
                this.$rippleContainer.remove();
                this.$rippleContainer = null;
                this.$rippleElement = null;
            }
        }
    });

    $.makePlugin(pluginName, RippleClick);

    $(document).ready(function () {
        $('[data-ripple-click]').each(function () {
            var element = $(this);
            element[pluginName](element.data(pluginName));
        });
    });
})(jQuery, window, document);