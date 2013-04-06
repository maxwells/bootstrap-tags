# Boostrap Tags

Bootstrap tags is a lightweight jQuery plugin meant to extend the Twitter Bootstrap UI to include tagging.

## Demo
[http://maxwells.github.com/bootstrap-tags.html	](http://maxwells.github.com/bootstrap-tags.html)

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

- `readonly`: boolean
- `suggestions`: list of autosuggest terms
- `restrictTo`: list of allowed tags
- `exclude`: list of disallowed tags
- `displayPopovers`: boolean
- `tagClass`: string for what class the tag div will have for styling
- `promptText`: placeholder string when there are no tags and nothing typed in

See Implementation above for example


### Overrideable functions
If you want to override any of the following functions, pass it as an option in the jQuery initialization.

- `beforeAddingTag (tag:string)` : anything external you'd like to do with the tag before adding it
- `afterAddingTag (tag:string)` : anything external you'd like to do with the tag after adding it
- `beforeDeletingTag (tag:string)` : find out which tag is about to be deleted
- `afterDeletingTag (tag:string)` : find out which tag was removed by either presseing delete key or clicking the (x)
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

### Controlling tags
Some functions are chainable, and can be used to move the data around outside of the plugin.

- `hasTag(tag:string)` - boolean; whether tag is in tag list
- `getTags()` - not chainable: returns a list of tags
- `getTagsWithContent()` - not chainable: returns a list of objects with a tag property and content property
- `getTag(tag:string)` - returns tag as string
- `getTagWithContent(tag:string)` - returns object with tag and content property (popover)
- `addTag(tag:string)` - chainable
- `renameTag(tag:string, newTag:string)` - chainable
- `removeLastTag()` - chainable
- `removeTag(tag:string)` - chainable
- `addTagWithContent(tag:string, popoverContent:string)` - chainable
- `setPopover(tag:string, popoverContent:string)` - chainable

Example:

	var tags = $('#one').tags( {
		suggestions : ["here", "are", "some", "suggestions"],
		popoverData : ["What a wonderful day", "to make some stuff", "up so that I", "can show it works"],
		tagData: ["tag a", "tag b", "tag c", "tag d"],
		excludeList : ["excuse", "my", "vulgarity"],
	} );
	tags.addTag("tag e!!").removeTag("tag b").setPopover("tag c", "Changed popover content");
	console.log(tags.getTags());

To reference a tags instance that you've already attached to a selector, (eg. $(selector).tags(options)) you can use $(selector).tags() or $(selector).tags(index)

## Building

For a one off,

	$ rake

_To build continously_, use guard. Install necessary gems with bundler

	$ bundle
	
then start up guard
	
	$ guard
	
	
## Testing

Open SpecRunner.html (powered by Jasmine)