/**
 * Specify content to put in the clipboard when the user presses the
 * keyboard shortcut, Ctrl + C.
 *
 * Adapted from Trello.com:
 * http://stackoverflow.com/questions/17527870/how-does-trello-access-the-users-clipboard/17528590#17528590
 *
 * @author Jared Flack
 */

var Copyboard = new ((function() {

    return function() {

        'use strict';

        /**
         * Private Variables
         */

        var _this = this,
            copyboard,
            copyboardContainer;

        /**
         * Public Variables
         */

        _this.value = null;
        _this.debug = false;
        _this.prepared = false;

        /**
         * Public Functions
         */

         /**
          * Set the value that will be copied to the clipboard
          * @param mixed value What should be placed in the clipboard
          */
        _this.set = function(value) {

            debug('Copyboard value set: ' + value);

            if (typeof value == 'string') {

                _this.value = value;

            } else if (typeof value == 'number') {

                _this.value = value;
            }
        };

        /**
         * Private Functions
         */

        /**
         * Sends debug information to the JS console if debug mode is on
         * @param  string msg Debug message
         */
        function debug(msg) {

            if(_this.debug) {

                console.debug('Copyboard: ' + msg);
            }
        }

        function prepareCopy(event) {

            // Ensure that either Ctrl or Command is being pressed
            if (!(event.ctrlKey || event.metaKey)) {

                debug('Key pressed, but it\'s not the command or ctrl.');
                return;
            }

            // We can stop here if we've allready prepared the copyboard. This
            // will be be true when the user has pressed Ctrl and then presses
            // another key.
            if(_this.prepared) {

                return;
            }

            // Ensure the suer isn't trying to utilize a text input
            if(event.target.tagName == "TEXTAREA" || event.target.tagName == "INPUT" || event.target.contentEditable == "true") {

                debug('User is using a text input.');
                console.log(event);
                return;
            }

            // Ensure we have something to copy
            if (_this.value === null) {

                debug('No value prepared to copy. Use Copyboard.set().');
                return;
            }

            // Make sure the user hasn't selected some text
            if (typeof window.getSelection == 'function') {

                copyboard.value = '';

                var selection = window.getSelection().toString();

                if (selection) {

                    debug('Some text, "' + selection + '", has been selected that the user is probaly trying to copy.');
                    return;
                }
            }

            debug('Preparing copyboard');

            document.onkeyup = function() {

                debug('Copyboard finish.');

                // Reset ready state
                _this.prepared = false;
                document.removeEventListener('onkeyup');
                copyboardContainer.style.display = 'none';
            };

            // Show conatiner
            copyboardContainer.style.display = 'block';
            // Set value we're going to select
            copyboard.value = _this.value;
            // Focus the textarea
            copyboard.focus();
            // Select it's text
            copyboard.select();
            //
            _this.prepared = true;
            // Now, if the user presses "c", they'll be copying the text
        }

        /**
         * Event Listeners
         */

        document.onkeydown = prepareCopy;

        /**
         * Initialize!
         */
        (function init() {

            debug('Inintializing Copyboard.');

            copyboard = document.createElement('textarea');
            copyboardContainer = document.createElement('div');
            copyboardContainer.style.cssText = 'top: 0; left: 0; width: 0; height: 0; opacity: 0; display: none; position: fixed';
            copyboardContainer.appendChild(copyboard);
            document.getElementsByTagName('body')[0].appendChild(copyboardContainer);
        })();
    };
})());