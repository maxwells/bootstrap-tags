# Bootstrap Tags
# Max Lahey
# November, 2012

jQuery ->
  $.tags = (element, options) ->

    @suggestions = (if options.suggestions? then options.suggestions else [])
    @restrictTo = (if options.restrictTo? then options.restrictTo.concat @suggestions else false)
    @exclude = (if options.excludeList? then options.excludeList else false)
    @displayPopovers = (if options.popovers? then true else options.popoverData?)
    @tagClass = (if options.tagClass? then options.tagClass else 'btn-info')
    @promptText = (if options.promptText? then options.promptText else 'Enter tags...')

    # override-able functions
    @whenAddingTag = (if options.whenAddingTag? then options.whenAddingTag else (tag) -> )
    @definePopover = (if options.definePopover then options.definePopover else (tag) -> "associated content for \""+tag+"\"" )
    @excludes = (if options.excludes then options.excludes else -> false)
    @tagRemoved = (if options.tagRemoved then options.tagRemoved else (tag) -> )
    # override-able key press functions
    @pressedReturn = (if options.pressedReturn? then options.pressedReturn else (e) -> )
    @pressedDelete = (if options.pressedDelete? then options.pressedDelete else (e) -> )
    @pressedDown = (if options.pressedDown? then options.pressedDown else (e) -> )
    @pressedUp = (if options.pressedUp? then options.pressedUp else (e) -> )

    # hang on to so we know what we are
    @$element = $ element

    # tagsArray is list of tags
    if options.tagData?
      @tagsArray = options.tagData
    else
      tagData = $('.tag-data', @$element).html()
      @tagsArray = (if tagData? then tagData.split ',' else [])
  
    if @displayPopovers
      @popoverArray = options.popoverData

    # returns list of tags
    @getTags = =>
      @tagsArray

    # add/remove methods
    @removeTagClicked = (e) => # clicked remove tag anchor
      if e.currentTarget.tagName == "A"
        @removeTag e.currentTarget.previousSibling.textContent
        $(e.currentTarget.parentNode).remove()
      @

    @removeLastTag = => # pressed delete on empty string in input.
      el = $('.tag', @$element).last()
      el.remove()
      @removeTag @tagsArray[@tagsArray.length-1]
      @

    @removeTag = (tag) => # removes specified tag 
      if @tagsArray.indexOf(tag) > -1
        if @displayPopovers
          @popoverArray.splice(@tagsArray.indexOf(tag),1)
        @tagsArray.splice(@tagsArray.indexOf(tag), 1)
        @renderTags()
        @tagRemoved(tag)
      @

    @addTag = (tag) => # adds specified tag
      if (@restrictTo == false or @restrictTo.indexOf(tag) != -1) and @tagsArray.indexOf(tag) < 0 and tag.length > 0 and (@exclude == false || @exclude.indexOf(tag) == -1) and !@excludes(tag)
        @whenAddingTag(tag)
        if @displayPopovers
          associatedContent = @definePopover(tag)
          @popoverArray.push associatedContent
        @tagsArray.push tag
        @renderTags()
      @

    @addTagWithContent = (tag, content) => # adds tag with associated popover content
      if (@restrictTo == false or @restrictTo.indexOf(tag) != -1) and @tagsArray.indexOf(tag) < 0 and tag.length > 0
        @whenAddingTag(tag)
        @tagsArray.push tag
        @popoverArray.push content
        @renderTags()
      @

    @renameTag = (name, newName) =>
      @tagsArray[@tagsArray.indexOf name] = newName
      @renderTags()
      @

    @setPopover = (tag, popoverContent) =>
      @popoverArray[@tagsArray.indexOf tag] = popoverContent
      @renderTags()     
      @ 

    # toggles remove button opacity for a tag when moused over or out
    @toggleCloseColor = (e) ->
      tagAnchor = $ e.currentTarget
      opacity = tagAnchor.css('opacity')
      opacity = (if opacity < 0.8 then 1.0 else 0.6)
      tagAnchor.css opacity:opacity 

    # Key handlers
    @keyDownHandler = (e) =>
      k = (if e.keyCode? then e.keyCode else e.which)
      switch k
        when 13 # enter (submit tag or selected suggestion)
          @pressedReturn(e)
          tag = e.target.value
          if @suggestedIndex != -1
            tag = @suggestionList[@suggestedIndex]
          @addTag tag
          e.target.value = ''
          @renderTags()
          @hideSuggestions()
        when 46, 8 # delete
          @pressedDelete(e)
          if e.target.value == ''
            @removeLastTag()
          if e.target.value.length == 1 # is one (which will be deleted after JS processing)
            @hideSuggestions()
        when 40 # down
          @pressedDown(e)
          if @input.val() == '' and (@suggestedIndex == -1 || !@suggestedIndex?)
            @makeSuggestions e, true
          numSuggestions = @suggestionList.length
          @suggestedIndex = (if @suggestedIndex < numSuggestions-1 then @suggestedIndex+1 else numSuggestions-1)
          @selectSuggested @suggestedIndex
          @scrollSuggested @suggestedIndex if @suggestedIndex >= 0
        when 38 # up
          @pressedUp(e)
          @suggestedIndex = (if @suggestedIndex > 0 then @suggestedIndex-1 else 0)
          @selectSuggested @suggestedIndex
          @scrollSuggested @suggestedIndex if @suggestedIndex >= 0
        when 9, 27 # tab, escape
          @hideSuggestions()
          @suggestedIndex = -1
        else

    # makeSuggestions creates auto suggestions that match the value in the input
    # if overrideLengthCheck is set to true, then if the input value is empty (''), return all possible suggestions
    @makeSuggestions = (e, overrideLengthCheck) =>
      val = (if e.target.value? then e.target.value else e.target.textContent)
      @suggestedIndex = -1
      @$suggestionList.html ''
      @suggestionList = []
      $.each @suggestions, (i, suggestion) =>
        if @tagsArray.indexOf(suggestion) < 0 and suggestion.substring(0, val.length) == val and (val.length > 0 or overrideLengthCheck)
          @$suggestionList.append '<li class="tags-suggestion">'+suggestion+'</li>'
          @suggestionList.push suggestion
      $('.tags-suggestion', @$element).mouseover @selectSuggestedMouseOver
      $('.tags-suggestion', @$element).click @suggestedClicked
      if @suggestionList.length > 0
        @showSuggestions()
      else
        @hideSuggestions() # so the rounded parts on top & bottom of dropdown do not show up

    @suggestedClicked = (e) => # clicked on a suggestion
      tag = e.target.textContent
      if @suggestedIndex != -1
        tag = @suggestionList[@suggestedIndex]
      @addTag tag
      @input.val ''
      @makeSuggestions e, false
      @input.focus() # return focus to input so user can continue typing
      @hideSuggestions()

    @keyUpHandler = (e) =>
      k = (if e.keyCode? then e.keyCode else e.which)
      if k != 40 and k != 38 and k != 27
        @makeSuggestions e, false

    # display methods
    @hideSuggestions = =>
      $('.tags-suggestion-list', @$element).css display: "none"

    @showSuggestions = =>
      $('.tags-suggestion-list', @$element).css display: "block"

    @selectSuggestedMouseOver = (e) =>
      $('.tags-suggestion').removeClass('tags-suggestion-highlighted')
      $(e.target).addClass('tags-suggestion-highlighted')
      $(e.target).mouseout @selectSuggestedMousedOut
      @suggestedIndex = $('.tags-suggestion', @$element).index($(e.target))

    @selectSuggestedMousedOut = (e) =>
      $(e.target).removeClass('tags-suggestion-highlighted')

    @selectSuggested = (i) => # shows the provided index of suggestion list for this element as highlighted (exclusion of others)
      $('.tags-suggestion').removeClass('tags-suggestion-highlighted')
      tagElement = $('.tags-suggestion', @$element).eq(i)
      tagElement.addClass 'tags-suggestion-highlighted'

    @scrollSuggested = (i) =>
      tagElement = $('.tags-suggestion', @$element).eq i
      topElement = $('.tags-suggestion', @$element).eq 0
      pos = tagElement.position()
      topPos = topElement.position()
      #if pos? and topPos?
      $('.tags-suggestion-list', @$element).scrollTop pos.top - topPos.top

    # adjust padding on input so that what user types shows up next to last tag (or on new line if insufficient space)
    @adjustInputPosition = =>
      tagElement = $('.tag', @$element).last()
      tagPosition = tagElement.position()
      pLeft = if tagPosition? then tagPosition.left + tagElement.outerWidth(true) else 0
      pTop = if tagPosition? then tagPosition.top else 0
      $('.tags-input', @$element).css
        paddingLeft : pLeft
        paddingTop  : pTop
      pBottom = if tagPosition? then tagPosition.top + tagElement.outerHeight(true) else 22  
      @$element.css height : pBottom

    @renderTags = =>
      tagList = $('.tags',@$element)
      tagList.html('')
      @input.attr 'placeholder', (if @tagsArray.length == 0 then @promptText else '')
      $.each @tagsArray, (i, tag) =>
        tag = $(@formatTag i, tag)
        $('a', tag).click @removeTagClicked
        $('a', tag).mouseover @toggleCloseColor
        $('a', tag).mouseout @toggleCloseColor
        if @displayPopovers
          $('span', tag).mouseover ->
            tag.popover('show')
          $('span', tag).mouseout ->
            tag.popover('hide')
        tagList.append tag
      @adjustInputPosition()

    @formatTag = (i, tag) =>
      if @displayPopovers == true # then attach popover data
        popoverContent = @popoverArray[@tagsArray.indexOf tag]
        "<div class='tag label "+@tagClass+"' rel='popover' data-placement='bottom' data-content='"+popoverContent+"' data-original-title='"+tag+"'><span>"+tag+"</span><a> <i class='icon-remove-sign icon-white'></i></a></div>"
      else
        "<div class='tag label "+@tagClass+"'><span>"+tag+"</span><a> <i class='icon-remove-sign icon-white'></i></a></div>"

    @addDocumentListeners = =>
      $(document).mouseup (e) =>
        container = $('.tags-suggestion-list', @$element)
        if container.has(e.target).length == 0
          @hideSuggestions()

    @init = ->
      # build out tags from specified markup
      @input = $ "<input type='text' class='tags-input'>"
      @input.keydown @keyDownHandler
      @input.keyup @keyUpHandler
      @$element.append @input
      @$suggestionList = $ '<ul class="tags-suggestion-list dropdown-menu"></ul>'
      @$element.append @$suggestionList
      # show it
      @renderTags()

      @addDocumentListeners()
      
    @init()

    @

  $.fn.tags = (options) ->
    tags = {}
    this.each ->
      tags = new $.tags this, options
    tags