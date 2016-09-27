$.makePlugin = function (pluginName, PluginConstructor) {
    $.fn[pluginName] = function (options) {
        var args = $.makeArray(arguments),
            after = args.slice(1);

        return this.each(function() {
            var instance = $.data(this, 'plugin_' + pluginName);
            if (!instance) {
                $.data(this, 'plugin_' + pluginName, new PluginConstructor(this, options));
            } else if (typeof options === 'string') {
                if (options === 'destroy') {
                    if (typeof instance.destroy === 'function') {
                       instance.destroy();
                    }
                    $.removeData(this, 'plugin_'+pluginName);
                } else if (typeof instance[options] === 'function') {
                    instance[options].apply(instance, after);
                }
            }
        });
    };
};