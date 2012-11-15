# Bootstrap Tags
# Max Lahey
# Monday, November 12, 2012

# todos
# [√] make suggestions list scrollable
# [√] popovers for tag data
# [ ] ajax for tags, suggestions, and restrictions
# [√] restyle
# [ ] backbone implementation

jQuery ->
  $.tags = (element, options) ->

    @suggestions = options.suggestions
    @restrictTo = (if options.restrictTo? then options.restrictTo.concat @suggestions else false)

    # tagsArray and tagData store same data, but one is as list and one is as comma joined list (ie. string)
    @tagsArray = []
    @tagData = ""

    # hang on to so we know what we are
    @$element = $ element

    # add/remove methods
    @removeTagClicked = (e) => # clicked remove tag anchor
      if e.currentTarget.tagName == "A"
        @removeTag e.currentTarget.previousSibling.textContent
        $(e.currentTarget.parentNode).remove()

    @removeLastTag = => # pressed delete on empty string in input.
      el = $('.tag', @$element).last()
      el.remove()
      @removeTag @tagsArray[@tagsArray.length-1]

    @removeTag = (tag) => # removes tags from both structures and calls render
      @tagsArray.splice(@tagsArray.indexOf(tag), 1)
      @tagData = @tagsArray.join(',')
      @renderTags @tagsArray

    @addTag = (tag) => # adds specified tag to both structures
      if (@restrictTo == false or @restrictTo.indexOf(tag) != -1) and @tagsArray.indexOf(tag) < 0
        @tagsArray.push tag
        @tagData = @tagsArray.join(',')
        @renderTags @tagsArray

    # toggles remove button color for a tag when moused over or out
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
          tag = e.target.value
          if @suggestedIndex != -1
            tag = @suggestionList[@suggestedIndex]
          @addTag tag
          e.target.value = ''
          @renderTags @tagsArray
          @hideSuggestions()
        when 46, 8 # delete
          if e.target.value == ''
            @removeLastTag()
          if e.target.value.length == 1 # is one (which will be deleted)
            @hideSuggestions()
        when 40 # down
          if @input.val() == '' and (@suggestedIndex == -1 || !@suggestedIndex?)
            @makeSuggestions e, true
          numSuggestions = @suggestionList.length
          @suggestedIndex = (if @suggestedIndex < numSuggestions-1 then @suggestedIndex+1 else numSuggestions-1)
          @selectSuggested @suggestedIndex
          @scrollSuggested @suggestedIndex
        when 38 # up
          @suggestedIndex = (if @suggestedIndex > 0 then @suggestedIndex-1 else 0)
          @selectSuggested @suggestedIndex
          @scrollSuggested @suggestedIndex
        when 9, 27 # tab, escape
          @hideSuggestions()
        else

    # makeSuggestions creates auto suggestions that match the value in the input
    # if overrideLengthCheck is set to true, then if the input value is empty (''), return all possible suggestions
    @makeSuggestions = (e, overrideLengthCheck) =>
      val = (if e.target.value? then e.target.value else e.target.textContent)
      @suggestedIndex = -1
      @$suggestionList.html ''
      @suggestionList = []
      $.each @suggestions, (i, suggestion) =>
        if @tagData.indexOf(suggestion) < 0 and suggestion.substring(0, val.length) == val and (val.length > 0 or overrideLengthCheck)
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
      if (k != 40 and k != 38 and k != 27)
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
      $('.tags-suggestion-list', @$element).scrollTop tagElement.position().top - topElement.position().top


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

    @renderTags = (tags) =>
      tagList = $('.tags',@$element)
      tagList.html('')
      $.each tags, (i, tag) =>
        tag = $(@formatTag i, tag)
        $('a', tag).click @removeTagClicked
        $('a', tag).mouseover @toggleCloseColor
        $('a', tag).mouseout @toggleCloseColor
        $('span', tag).mouseover ->
          tag.popover('show')
        $('span', tag).mouseout ->
          tag.popover('hide')
        tagList.append tag
      @adjustInputPosition()

    @formatTag = (i, tag) ->
      "<div class='tag label btn-info' rel='popover' data-placement='bottom' data-content='content' data-original-title='"+tag+"'><span>"+tag+"</span><a> <i class='icon-remove-sign icon-white'></i></a></div>"

    @addDocumentListeners = =>
      $(document).mouseup (e) =>
        container = $('.tags-suggestion-list', @$element)
        if container.has(e.target).length == 0
          @hideSuggestions()

    @init = ->
      @tagData = $('.tag-data', @$element).html()
      @tagsArray = @tagData.split ','
      @input = $ "<input type='text' class='tags-input'>"
      @input.keydown @keyDownHandler
      @input.keyup @keyUpHandler
      @$element.append @input
      @$suggestionList = $ '<ul class="tags-suggestion-list dropdown-menu"></ul>'
      @$element.append @$suggestionList
      @renderTags @tagsArray
      @addDocumentListeners()
      
    @init()

    @

  $.fn.tags = (options) ->
    return this.each ->
      tags = new $.tags this, options