# Bootstrap Tags
# Max Lahey
# Monday, November 12, 2012

# todos
# 1) make suggestions list scrollable
# 2) popovers for tag data
# 3) ajax for tags, suggestions, and restrictions
# 4) restyle
# 5) backbone implementation

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
      if e.target.tagName == "A"
        @removeTag e.target.previousSibling.textContent
        $(e.target.parentNode).remove()

    @removeLastTag = => # pressed delete on empty string in input.
      el = $('.tag', @$element).last()
      el.remove()
      @removeTag @tagsArray[@tagsArray.length-1]

    @removeTag = (tag) => # removes tags from both structures and calls render
      @tagsArray.splice(@tagsArray.indexOf(tag), 1)
      @tagData = @tagsArray.join(',')
      @renderTags @tagsArray

    @addTag = (tag) => # adds specified tag to both structures
      if (@restrictTo == false or @restrictTo.indexOf(tag) != -1) and @tagData.indexOf(tag) < 0
        @tagsArray.push tag
        @tagData = @tagsArray.join(',')
        @renderTags @tagsArray

    # toggles remove button color for a tag when moused over or out
    @toggleCloseColor = (e) ->
      tagAnchor = $ e.target
      color = (if tagAnchor.css('color') == "rgb(255, 255, 255)" then "#bbb" else "#fff")
      tagAnchor.css color:color 

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
            @hideSuggestions()
        when 40 # down
          if @input.val() == '' and (@suggestedIndex == -1 || !@suggestedIndex?)
            @makeSuggestions e, true
          numSuggestions = @suggestionList.length
          @suggestedIndex = (if @suggestedIndex < numSuggestions-1 then @suggestedIndex+1 else numSuggestions-1)
          @selectSuggested @suggestedIndex
          #@showSuggestions()
        when 38 # up
          @suggestedIndex = (if @suggestedIndex > 0 then @suggestedIndex-1 else 0)
          @selectSuggested @suggestedIndex
          #@showSuggestions()
        else
          #if e.keyCode? and @input.val()?
            #@showSuggestions()

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
      if (k != 40 and k != 38)
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

    # adjust padding on input so that what user types shows up next to last tag (or on new line if insufficient space)
    @adjustInputPosition = =>
      tagElement = $('.tag', @$element).last()
      tagPosition = tagElement.position()
      pLeft = if tagPosition? then tagPosition.left + tagElement.width() else 0
      pTop = if tagPosition? then tagPosition.top else 0
      $('.tags-input', @$element).css
        paddingLeft : pLeft
        paddingTop  : pTop
      pBottom = if tagPosition? then tagPosition.top + tagElement.outerHeight() else 20  
      @$element.css height : pBottom

    @renderTags = (tags) =>
      tagList = $('.tags',@$element)
      tagList.html('')
      $.each tags, (i, tag) =>
        tag = $(@formatTag i, tag)
        $('a', tag).click @removeTagClicked
        $('a', tag).mouseover @toggleCloseColor
        $('a', tag).mouseout @toggleCloseColor
        tagList.append tag
      @adjustInputPosition()

    @formatTag = (i, tag) ->
      "<div class='tag'><span class='label btn-primary'>"+tag+"<a> X</a></span></div>"

    @init = ->
      @tagData = $('.tag-data', @$element).html()
      @tagsArray = @tagData.split ','
      @input = $ "<input class='tags-input'>"
      @input.keydown @keyDownHandler
      @input.keyup @keyUpHandler
      @$element.append @input
      @$suggestionList = $ '<ul class="tags-suggestion-list"></ul>'
      @$element.append @$suggestionList
      @renderTags @tagsArray
      
    @init()

    @

  $.fn.tags = (options) ->
    return this.each ->
      tags = new $.tags this, options