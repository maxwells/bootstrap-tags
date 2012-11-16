# Boostrap Tags

Bootstrap tags is a lightweight jQuery plugin meant to extend the Twitter Bootstrap UI to include tagging. 

## Demo
[http://jsfiddle.net/cjFZW/2/](http://jsfiddle.net/cjFZW/)
Note: for whatever reason the width and height of the text boxes in jsFiddle aren't cooporating, so please imagine that the box isn't resizing.

## Features
- Autosuggest (for typing or activated by pressing the down key when empty)
- Bootstrap Popovers (for extended information on a tag)
- Exclusions (denial of a specified list)
- Filters (allowance of only a specified list)
- Placeholder prompts
- Uses bootstrap button-[type] class styling (customizing your bootstrap will change tag styles accordingly)
- Extendable with custom functions (eg, on successful tag addition, key presses, exclusions)
- Not tested on many browsers yet. Uses some HTML5 stuff, so no promises

## Implementation
	<div id="my-tag-list" class="tag-list"><div class="tags"></div></div>
	<script>
		$(function()) {
			$('#my-tag-list').tags({
				tagData:["boilerplate", "tags"],
				suggestions:["basic", "suggestions"],
				excludeList:["not", "these", "words"]
			})
		}
	</script>