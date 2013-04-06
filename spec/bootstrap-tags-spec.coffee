describe "Bootstrap Tags", ->

  describe "Read only tag system", ->

    beforeEach ->
      @$domElement = $('body').append '<div id="tagger" class="tag-list"><div class="tags"></div></div>'
      @initTagData = ['one', 'two', 'three']
      @tags = $('#tagger', @$domElement).tags
        tagData: @initTagData
        readOnly: true
      
    afterEach ->
      $('#tagger').remove()

    it "can't add tags", ->
      tagLength = @tags.getTags().length
      @tags.addTag('new tag')
      expect(@tags.getTags().length).toEqual tagLength

    it "can't remove tags", ->
      tagLength = @tags.getTags().length
      @tags.removeTag('one')
      expect(@tags.hasTag('one')).toBeTruthy()

    it "can't rename tag", ->
      @tags.renameTag('one', 'new name')
      expect(@tags.hasTag('new name')).toBeFalsy()
      expect(@tags.hasTag('one')).toBeTruthy()

    it "can get the list of tags", -> 
      expect(@tags.getTags()).toEqual @initTagData

  describe "Full tag system", ->

    beforeEach ->
      @$domElement = $('body').append '<div id="tagger" class="tag-list"><div class="tags"></div></div>'
      @initTagData = ['one', 'two', 'three']
      @tags = $('#tagger', @$domElement).tags
        tagData: @initTagData

    afterEach ->
      $('#tagger').remove()

    it "can add tag", ->
      tagLength = @tags.getTags().length
      @tags.addTag('new tag')
      expect(@tags.getTags().length).toEqual tagLength + 1
      expect(@tags.hasTag('new tag')).toBeTruthy()

    it "can get the list of tags", ->
      expect(@tags.getTags()).toEqual @initTagData

    it "can remove tag, specified by string", ->
      expect(@tags.hasTag('one')).toBeTruthy()
      @tags.removeTag('one')
      expect(@tags.hasTag('one')).toBeFalsy()

    it "can remove the last tag", ->
      tagList = @tags.getTags()
      lastTag = tagList[tagList.length-1]
      @tags.removeLastTag()
      expect(@tags.hasTag(lastTag)).toBeFalsy()

    it "can add tag with popover content", ->
      @tags.addTagWithContent('new tag', 'new content')
      tagsWithContent = @tags.getTagsWithContent()
      console.log tagsWithContent
      expect(tagsWithContent[tagsWithContent.length-1].content).toEqual 'new content'

    it "can change the popover content for a tag", ->
      content = 'new tag content for the first tag'
      @tags.setPopover('one', content)
      expect(@tags.getTagWithContent('one').content).toEqual content

    it "can rename tag", ->
      @tags.renameTag('one', 'new name')
      expect(@tags.hasTag('new name')).toBeTruthy()
      expect(@tags.hasTag('one')).toBeFalsy()

    it "calls before/after adding/deleting tags callbacks in the right order", ->
      $domElement = $('body').append '<div id="tagger2" class="tag-list"><div class="tags"></div></div>'
      initTagData = ['one', 'two', 'three']
      beforeAddingTagCalled = false
      afterAddingTagCalled = false
      beforeDeletingTagCalled = false
      afterDeletingTagCalled = false
      beforeAddingTag = -> beforeAddingTagCalled = true
      afterAddingTag = -> afterAddingTagCalled = true
      beforeDeletingTag = -> beforeDeletingTagCalled = true
      afterDeletingTag = -> afterDeletingTagCalled = true
      tags = $('#tagger2', @$domElement).tags
        tagData: @initTagData
        beforeAddingTag: beforeAddingTag
        afterAddingTag: afterAddingTag
        beforeDeletingTag: beforeDeletingTag
        afterDeletingTag: afterDeletingTag
      expect(beforeAddingTag and afterAddingTag and beforeDeletingTag and afterDeletingTag).toBeTruthy()
      $('#tagger2').remove()