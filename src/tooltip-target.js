(function ($, window, document, undefined) {
    'use strict';

    var pluginName = "tooltipTarget",
        defaults = {
            offset: {
                top: 0,
                left: 0
            },
            cssClass: 'tooltip-container'
        };

    function TooltipTarget (element, options) {
        this._defaults = defaults;
        this._name = pluginName;
        this.element = element;
        this.settings = $.extend({}, defaults, options);

        this.isActive = true;
        this.$tooltipContainer = null;
        this.originalToolTipSibling = null;

        this.init();
    }

    $.extend(TooltipTarget.prototype, {
        init: function () {
            this.$tooltipContainer = $('<div class="' + this.settings.cssClass + '"></div>')
                .appendTo('body')
                .html($(this.settings.selector).html());

            this.bindEvents();
        },
        bindEvents: function () {
            $(this.element)
                .on('mouseover.'+this._name, TooltipTarget.prototype.showToolTip.bind(this))
                .on('mouseout.'+this._name, TooltipTarget.prototype.hideToolTip.bind(this));
        },
        unbindEvents: function () {
            $(this.element)
                .off('.'+this._name);
        },
        showToolTip: function () {
            if (!this.isActive) {
                return;
            }

            var elemOffset = $(this.element).offset(),
                elemHeight = $(this.element).height();
            this.$tooltipContainer
                .css({
                    top: elemOffset.top + elemHeight + this.settings.offset.top,
                    left: elemOffset.left + this.settings.offset.left
                })
                .show();
        },
        hideToolTip: function () {
            this.$tooltipContainer.hide();
        },
        setActive: function (isActive) {
            this.isActive = isActive;
        },
        destroy: function () {
            this.unbindEvents();
            this.$tooltipContainer.remove();
            this.$tooltipContainer = null;
        }
    });

    $.makePlugin(pluginName, TooltipTarget);

    $(document).ready(function () {
        $('[data-tooltip-target]').each(function () {
            var element = $(this);
            element[pluginName]({selector: element.data(pluginName)});
        });
    });
})(jQuery, window, document);