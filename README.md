# Bootstrap Tags

Bootstrap Tags is a jQuery plugin meant to extend Twitter Bootstrap to include tagging functionality. It supports Bootstrap 2.3.2 and ≥ 3.0.

[![Build Status](https://travis-ci.org/maxwells/bootstrap-tags.png?branch=master)](https://travis-ci.org/maxwells/bootstrap-tags)

## Demo
[http://maxwells.github.com/bootstrap-tags.html](http://maxwells.github.com/bootstrap-tags.html)

## Installation

	$ bower install bootstrap-tags
	
or

	$ git clone https://github.com/maxwells/bootstrap-tags.git
	--> js files are located in dist/js, CSS in dist/css

## Features
- Support for Bootstrap 2.3.2 and 3+
- Autosuggest (for typing or activated by pressing the down key when empty)
- Bootstrap Popovers (for extended information on a tag)
- Exclusions (denial of a specified list)
- Filters (allowance of only a specified list)
- Placeholder prompts
- Uses bootstrap button-[type] class styling (customizing your bootstrap will change tag styles accordingly)
- Extensible with custom functions (eg, before/after tag addition/deletion, key presses, exclusions)

## Usage

	<!-- include bootstrap tags js, css files -->
	<script src='path/to/bootstrap-tags/dist/js/bootstrap-tags.min.js'></script>
	<link rel="stylesheet" type="text/css" href="path/to/bootstrap-tags/dist/css/bootstrap-tags.css" />

	<div id="my-tag-list" class="tag-list"></div>
	<script>
		$(function() {
			// If using Bootstrap 2, be sure to include:
			// Tags.bootstrapVersion = "2";
			$('#my-tag-list').tags({
				tagData:["boilerplate", "tags"],
				suggestions:["basic", "suggestions"],
				excludeList:["not", "these", "words"]
			});
		});
	</script>

## Documentation

### Settings

The following options are supported. Pass them as a javascript object to the `tags` jQuery function:

```javascript
$('selector').tags({
    readOnly: true,
    tagData: ["a", "prepopulated", "list", "of", tags],
    beforeAddingTag: function(tag){ console.log(tag); }
});
```

option | type | description | default
-------|------|-------------|---------
`bootstrapVersion` | `String` | specify which version of bootstrap to format generated HTML for. Acceptable values are "2", "3" | `3`
`tagData` | `Array` | a list of tags to initialize the tagging interace with | `[]`
`tagSize` | `String` | describes what size input to use. Acceptable values are "lg", "md", or "sm" | `md`
`readOnly` | `boolean` | whether or not to disable user input | `false`
`suggestions` | `Array` | a list of terms that will populate the autosuggest feature when a user types in the first character. | `[]`
`caseInsensitive` | `Boolean` | whether or not autosuggest should ignore case sensitivity | `false`
`restrictTo` | `Array` | a list of allowed tags (will be combined with suggestions, if provided). User inputted tags that aren't included in this list will be ignored | `[]`
`exclude` | `Array` | a list of case insensitive disallowed tags. Supports wildcarding (eg. `['*offensive*']` will ignore any word that has `offensive` in it) | `[]`
`popoverData` | `Array` | a list of popover data. The index of each element should match the index of corresponding tag in `tagData` array | `null`
`popovers` | `Boolean` | whether or not to enable bootstrap popovers on tag mouseover | whether `popoverData` was provided
`popoverTrigger` | `String` | indicates how popovers should be triggered. Acceptable values are 'click', 'hover', 'hoverShowClickHide' | `hover`
`tagClass` | `String` | which class the tag div will have for styling | `btn-info`
`promptText` | `String` | placeholder string when there are no tags and nothing typed in | `Enter tags…`
`maxNumTags` | `Integer` | Maximum number of allowable (user-added) tags. All tags that are initialized in the tagData property are retained. If set, then input is disabled when the number of tags exceeds this value. | `-1` (no limit)
`readOnlyEmptyMessage` | `String` | text to be displayed if there are no tags in readonly mode. Can be HTML | `No tags to display...`
`beforeAddingTag` | `function(String tag)` | anything external you'd like to do with the tag before adding it. Returning false will stop tag from being added | `null`
`afterAddingTag` | `function(String tag)` | anything external you'd like to do with the tag after adding it | `null`
`beforeDeletingTag` | `function(String tag)` | find out which tag is about to be deleted. Returning false will stop tag from being deleted | `null`
`afterDeletingTag` | `function(String tag)` | find out which tag was removed by either pressing delete key or clicking the (x) | `null`
`definePopover` | `function(String tag)` | must return the popover content for the tag that is being added. (eg "Content for [tag]") | `null`
`excludes` | `function(String tag)` | return true if you want the tag to be excluded, false if allowed | `null`

### Controlling tags
Some functions are chainable (returns a `Tagger` object), and can be used to move the data around outside of the plugin.

function | return type | description
---------|-------------|-------------
`hasTag(tag:string)` | `Boolean` | whether tag is in tag list
`getTags()` | `Array` | a list of tags currently in the interface
`getTagsWithContent()` | `Array` | a list of javascript objects with a `tag` property and `content` property
`getTag(tag:string)` | `String` | returns tag as string
`getTagWithContent(tag:string)` | `Object` | returns object with `tag` and `content` property (popover)
`addTag(tag:string)` | `Tagger` | add a tag
`renameTag(tag:string, newTag:string)` | `Tagger` | rename one tag to another value
`removeLastTag()` | `Tagger` | removes last tag if it exists
`removeTag(tag:string)` | `Tagger` | removes tag specified by string if it exists
`addTagWithContent(tag:string, popoverContent:string)` | `Tagger` | Add a tag with associated popover content
`setPopover(tag:string, popoverContent:string)` | `Tagger` | update a tag's associated popover content, if that tag exists

Example:

```javascript
var tags = $('#one').tags( {
	suggestions : ["here", "are", "some", "suggestions"],
	popoverData : ["What a wonderful day", "to make some stuff", "up so that I", "can show it works"],
	tagData: ["tag a", "tag b", "tag c", "tag d"],
	excludeList : ["excuse", "my", "vulgarity"],
} );
tags.addTag("tag e!!").removeTag("tag b").setPopover("tag c", "Changed popover content");
console.log(tags.getTags());
```

To reference a tags instance that you've already attached to a selector, (eg. $(selector).tags(options)) you can use $(selector).tags() or $(selector).tags(index)

### Building

For a one off:

	$ grunt build

_To build continously_:
	
	$ grunt watch
	
### Testing

	$ grunt test

### Contributing

If you spot a bug, experience browser incompatibility, or have feature requests, please submit them [here](https://github.com/maxwells/bootstrap-tags/issues).

If you want to hack away to provide a new feature/bug-fix, please follow these guidelines:

- Make changes to the coffeescript and sass files, not js/css. This is to ensure that the next person who comes in and edits upstream from js/css will not overwrite your changes.
- Create a pull request for your feature branch, updating README documentation if necessary

### License

This project rocks and uses the MIT-LICENSE.

### Author

Max Lahey
