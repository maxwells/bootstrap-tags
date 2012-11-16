# Boostrap Tags

Bootstrap tags is a lightweight jQuery plugin meant to extend the Twitter Bootstrap UI to include tagging. 

## Demo
[http://jsfiddle.net/cjFZW/2/](http://jsfiddle.net/cjFZW/2/)
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
				excludeList:["not", "these", "words"],
			})
		}
	</script>

## Documentation

### Settings

- `suggestions`: list of autosuggest terms
- `restrictTo`: list of allowed tags
- `exclude`: list of disallowed tags
- `displayPopovers`: boolean
- `tagClass`: string for what class the tag div will have for styling
- `promptText`: placeholder string when there are no tags and nothing typed in

See Implementation above for example


### Overrideable functions
If you want to override any of the following functions, pass it as an option in the jQuery initialization.

- `whenAddingTag (tag:string)` : anything external you'd like to do with the tag
- `definePopover (tag:string)` : must return the popover content for the tag that is being added. (eg "Content for [tag]")
- `excludes (tag:string)` : returns true if you want the tag to be excluded, false if allowed
- `pressedReturn (e:triggering event)` 
- `pressedDelete (e:triggering event)`
- `pressedDown (e:triggering event)`
- `pressedUp (e:triggering event)`

Example:

	pressedUp = function(e) { console.log('pressed up'); };
	whenAddingTag = function (tag) {
		console.log(tag);
		// maybe fetch some content for the tag popover (can be HTML)
	};
	excludes = function (tag) {
		// return false if this tagger does *not* exclude
		// -> returns true if tagger should exclude this tag
		// --> this will exclude anything with !
		return (tag.indexOf("!") != -1);
	};
	$('#two').tags( {
		suggestions : ["there", "were", "some", "suggested", "terms", "super", "secret", "stuff"],
		restrictTo : ["restrict", "to", "these"],
		whenAddingTag : whenAddingTag,
		pressedUp : pressedUp,
		tagClass : 'btn-warning' }
	);