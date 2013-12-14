/**
 * Specify content to put in the clipboard when the user presses the
 * keyboard shortcut, Ctrl + C.
 *
 * Adapted from Trello.com:
 * http://stackoverflow.com/questions/17527870/how-does-trello-access-the-users-clipboard/17528590#17528590
 *
 * @author Jared Flack
 */

var CopyBoard = new ((function() {

    return function() {

        'use strict';

        /**
         * Private Variables
         */

        var _this = this,
            $document = $(document),
            $clipboard,
            $clipboardContainer;

        /**
         * Public Variables
         */

        _this.value = null;
        _this.debug = false;

        /**
         * Public Functions
         */

         /**
          * Set the value that will be copied to the clipboard
          * @param mixed value What should be placed in the clipboard
          */
        _this.set = function(value) {

            debug('Clipboard value set: ' + value);

            if (typeof value == 'string') {

                _this.value = value;

            } else if (typeof value == 'number') {

                _this.value = value;
            }
        };

        /**
         * Private Functions
         */

        var debug;

        // This ensures that if we're not in debug mode, debug messages are
        // silenced.
        if (_this.debug) {

            debug = function(msg) { console.debug(msg) }

        } else {

            debug = function() {}
        }

        function prepareCopy(event) {

            // Ensure that either Ctrl or Command is being pressed
            if (!(event.ctrlKey || event.metaKey)) {

                debug('Key pressed, but it\'s not the command or ctrl.');
                return;
            }

            // Ensure we have something to copy
            if (_this.value === null) {

                debug('No value prepared to copy. Use Clipboard.set().');
                return;
            }

            // Make sure the user hasn't selected some text
            if (typeof window.getSelection == 'function') {

                $clipboard.val('');

                var selection = window.getSelection().toString();

                if (selection) {

                    debug('Some text, "' + selection + '", has been selected that the user is probaly trying to copy.');
                    return;
                }
            }

            debug('Preparing clipboard');

            $clipboard.val(_this.value).focus().select();
        }

        /**
         * Event Listeners
         */

        $document.on('keydown', prepareCopy);

        /**
         * Initialize!
         */
        (function init() {

            debug('Inintializing Clipboard');

            $clipboard = $('<textarea>');
            $clipboardContainer = $('<div>');
            $clipboardContainer
                .css({
                    'position': 'fixed',
                    'top': 0,
                    'left': 0,
                    'width': 0,
                    'height': 0,
                    'opacity': 0,
                })
                .append($clipboard);

            $('body').append($clipboardContainer);
        })();
    };
})());