Copyboard.js
============

Use copyboard.js to be able to set a value that will be placed into the clipboard when the user hits **Ctrl + C** (or **Command + C**).

## Demo

[http://flackend.github.io/Copyboard.js/](http://flackend.github.io/Copyboard.js/)

## Example scenario

Trello is the inspiration for this. View their implementation on StackOverflow: [http://stackoverflow.com/questions/17527870/how-does-trello-access-the-users-clipboard/17528590#17528590](http://stackoverflow.com/questions/17527870/how-does-trello-access-the-users-clipboard/17528590#17528590).

## Usage

Include the javascript:

	<script src="copyboard.js"></script>

Set the value:

	Copyboard.set("Hello, World!");

Now, when the user hits **Ctrl + C**, "Hello, World" will be placed in their clipboard.