(function ($, window, document, undefined) {
    'use strict';

    var pluginName = "pingable",
        allowedAnimations = ['ping', 'pulse'],
        defaults = {
            height: 40,
            width: 40,
            doHide: false,
            color: null,
            animationType: 'ping'
        };

    function Pingable (element, options) {
        this.element = element;
        this.settings = $.extend({}, defaults, options);
        this._defaults = defaults;
        this._name = pluginName;
        this.init();
    }

    $.extend(Pingable.prototype, {
        init: function () {
            this.setupElement()
                .update()
                .toggle(!this.settings.doHide);
        },
        setupElement: function () {
            var animationType = allowedAnimations.indexOf(this.settings.animationType) > 0 ? this.settings.animationType : this._defaults.animationType;

            this.initialPosition = $(this.$element).css('position');
            this.$pingElement = $('<div style="display:none;" class="' + animationType + '-animation"></div>')
                .appendTo(this.element);
            if (this.settings.color) {
                this.$pingElement.css({
                    'border-color': this.settings.color
                });
            }
            if (!this.initialPosition || this.initialPosition === 'static') {
                $(this.element).css({position: 'relative'});
            }
            return this;
        },
        update: function () {
            var elemWidth = $(this.element).outerWidth(),
                elemHeight = $(this.element).outerHeight(),
                y = elemHeight/2 - this.settings.height/2,
                x = elemWidth/2 - this.settings.width/2;
            this.$pingElement.css({
                top: y,
                left: x,
                height: this.settings.height,
                width: this.settings.width
            });
            return this;
        },
        toggle: function (doShow) {
            if (doShow === true || doShow === false) {
                this.isShowing = doShow;
            } else {
                this.isShowing = !this.isShowing;
            }
            this.$pingElement.toggle(this.isShowing);
            return this;
        },
        destroy: function () {
            this.$pingElement.remove();
            this.$pingElement = null;
        }
    });

    $.makePlugin(pluginName, Pingable);

    $(document).ready(function () {
        $('[data-pingable]').each(function () {
            var element = $(this);
            element[pluginName](element.data(pluginName));
        });
    });
})(jQuery, window, document);