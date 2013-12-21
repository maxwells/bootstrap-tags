(function() {
  var newTagger;

  newTagger = function(id, options) {
    $('body').append("<div id='" + id + "' class='tagger'></div>");
    return $("#" + id).tags(options);
  };

  describe("Bootstrap Tags", function() {
    afterEach(function() {
      return $('.tagger').remove();
    });
    it("defaults to bootstrap 3", function() {
      var tags;
      tags = newTagger("tagger2");
      return expect(tags.bootstrapVersion).toEqual("3");
    });
    describe("when templating", function() {
      it("uses appropriate version", function() {
        var tags, tagsInputHtml, version2Html;
        tags = newTagger("tagger2", {
          bootstrapVersion: "2"
        });
        tagsInputHtml = tags.template("input", {
          tagSize: "sm"
        });
        version2Html = Tags.Templates["2"].input({
          tagSize: "sm"
        });
        return expect(tagsInputHtml).toEqual(version2Html);
      });
      return it("defaults to shared when template by name is not available in a version", function() {
        var tags, tagsInputHtml, version2Html;
        tags = newTagger("tagger2", {
          bootstrapVersion: "2"
        });
        tagsInputHtml = tags.template("suggestion_list");
        version2Html = Tags.Templates.shared.suggestion_list();
        return expect(tagsInputHtml).toEqual(version2Html);
      });
    });
    describe("when using readOnly", function() {
      beforeEach(function() {
        this.initTagData = ['one', 'two', 'three'];
        return this.tags = newTagger("tagger", {
          tagData: this.initTagData,
          readOnly: true
        });
      });
      it("can't add tags", function() {
        var tagLength;
        tagLength = this.tags.getTags().length;
        this.tags.addTag('new tag');
        return expect(this.tags.getTags().length).toEqual(tagLength);
      });
      it("can't remove tags", function() {
        var tagLength;
        tagLength = this.tags.getTags().length;
        this.tags.removeTag('one');
        return expect(this.tags.hasTag('one')).toBeTruthy();
      });
      it("can't rename tag", function() {
        this.tags.renameTag('one', 'new name');
        expect(this.tags.hasTag('new name')).toBeFalsy();
        return expect(this.tags.hasTag('one')).toBeTruthy();
      });
      it("can get the list of tags", function() {
        return expect(this.tags.getTags()).toEqual(this.initTagData);
      });
      return describe("when no tags are provided", function() {
        it("sets readOnlyEmptyMessage to tags body if provided", function() {
          this.tags = newTagger("tagger2", {
            readOnly: true,
            readOnlyEmptyMessage: "foo"
          });
          return expect($('#tagger2 .tags', this.$domElement).html()).toEqual("foo");
        });
        return it("sets default empty message to tags body if readOnlyEmptyMessage is not provided", function() {
          this.tags = newTagger("tagger2", {
            readOnly: true
          });
          return expect($('#tagger2 .tags').html()).toEqual($('#tagger2').tags().readOnlyEmptyMessage);
        });
      });
    });
    return describe("when normally operating", function() {
      beforeEach(function() {
        this.initTagData = ['one', 'two', 'three'];
        return this.tags = newTagger("tagger", {
          tagData: this.initTagData
        });
      });
      it("can add tag", function() {
        var tagLength;
        tagLength = this.tags.getTags().length;
        this.tags.addTag('new tag');
        expect(this.tags.getTags().length).toEqual(tagLength + 1);
        return expect(this.tags.hasTag('new tag')).toBeTruthy();
      });
      it("can get the list of tags", function() {
        return expect(this.tags.getTags()).toEqual(this.initTagData);
      });
      it("can remove tag, specified by string", function() {
        expect(this.tags.hasTag('one')).toBeTruthy();
        this.tags.removeTag('one');
        return expect(this.tags.hasTag('one')).toBeFalsy();
      });
      it("can remove the last tag", function() {
        var lastTag, tagList;
        tagList = this.tags.getTags();
        lastTag = tagList[tagList.length - 1];
        this.tags.removeLastTag();
        return expect(this.tags.hasTag(lastTag)).toBeFalsy();
      });
      it("can add tag with popover content", function() {
        var tagsWithContent;
        this.tags.addTagWithContent('new tag', 'new content');
        tagsWithContent = this.tags.getTagsWithContent();
        return expect(tagsWithContent[tagsWithContent.length - 1].content).toEqual('new content');
      });
      it("can change the popover content for a tag", function() {
        var content;
        content = 'new tag content for the first tag';
        this.tags.setPopover('one', content);
        return expect(this.tags.getTagWithContent('one').content).toEqual(content);
      });
      it("can rename tag", function() {
        this.tags.renameTag('one', 'new name');
        expect(this.tags.hasTag('new name')).toBeTruthy();
        return expect(this.tags.hasTag('one')).toBeFalsy();
      });
      it("can getTagWithContent", function() {
        this.tags.addTagWithContent('new tag', 'new content');
        return expect(this.tags.getTagWithContent('new tag').content).toEqual('new content');
      });
      describe("when defining popover for an existing tag", function() {
        return it("should set the associated content", function() {
          var tags;
          tags = newTagger("tagger2", {
            definePopover: function(tag) {
              return "popover for " + tag;
            }
          });
          tags.addTag("foo");
          return expect(tags.getTagWithContent("foo").content).toEqual("popover for foo");
        });
      });
      describe("when provided a promptText option", function() {
        it("applies it to the input placeholder when there are no tags", function() {
          var tags;
          tags = newTagger("tagger2", {
            promptText: "foo"
          });
          return expect($("#tagger2 input").attr("placeholder")).toEqual("foo");
        });
        return it("does not apply it to input placeholder when there are tags", function() {
          var tags;
          tags = newTagger("tagger2", {
            promptText: "foo",
            tagData: ["one"]
          });
          return expect($("#tagger2 input").attr("placeholder")).toEqual("");
        });
      });
      describe("when provided with a tagClass option", function() {
        return it("uses it to style tags", function() {
          this.tags = newTagger("tagger2", {
            tagClass: "btn-warning",
            tagData: ["a", "b"]
          });
          return expect($('#tagger2 .tag').hasClass("btn-warning")).toBeTruthy();
        });
      });
      describe("when provided a tagSize option", function() {
        it("defaults to md", function() {
          var tags;
          tags = newTagger("tagger2", {});
          return expect(tags.tagSize).toEqual("md");
        });
        it("applies it to tags", function() {
          var tags;
          tags = newTagger("tagger2", {
            tagSize: "sm",
            tagData: ["one", "two"]
          });
          return expect($("#tagger2 .tag").hasClass("sm")).toBeTruthy();
        });
        return it("applies it to input", function() {
          var tags;
          tags = newTagger("tagger2", {
            tagSize: "lg"
          });
          return expect($("#tagger2 input").hasClass("input-lg")).toBeTruthy();
        });
      });
      describe("when providing before/after adding/deleting callbacks", function() {
        describe("when adding tags", function() {
          it("calls beforeAddingTag before a tag is added, providing the tag as first parameter", function() {
            var tagAdded, tags, wasCalled;
            wasCalled = false;
            tagAdded = "not this";
            tags = newTagger("tagger2", {
              beforeAddingTag: function(tag) {
                wasCalled = true;
                return tagAdded = tag;
              }
            });
            tags.addTag("this");
            return expect(wasCalled && tagAdded === "this").toBeTruthy();
          });
          it("will not add a tag if beforeAddingTag returns false", function() {
            var tags;
            tags = newTagger("tagger2", {
              beforeAddingTag: function(tag) {
                return false;
              }
            });
            tags.addTag("this");
            return expect(tags.getTags()).toEqual([]);
          });
          return it("calls afterAddingTag after a tag is added, providing the tag as first parameter", function() {
            var tagAdded, tags, wasCalled;
            wasCalled = false;
            tagAdded = "not this";
            tags = newTagger("tagger2", {
              afterAddingTag: function(tag) {
                wasCalled = true;
                return tagAdded = tag;
              }
            });
            tags.addTag("this");
            return expect(wasCalled && tagAdded === "this").toBeTruthy();
          });
        });
        return describe("when deleting tags", function() {
          it("calls beforeDeletingTag before a tag is removed, providing the tag as first parameter", function() {
            var tags, wasCalled;
            wasCalled = false;
            tags = newTagger("tagger2", {
              tagData: ["a", "b", "c"],
              beforeDeletingTag: function(tag) {
                wasCalled = true;
                return expect(tag).toEqual("a");
              }
            });
            tags.removeTag("a");
            return expect(wasCalled).toBeTruthy();
          });
          it("will not add a tag if beforeDeletingTag returns false", function() {
            var tags;
            tags = newTagger("tagger2", {
              tagData: ["a", "b", "c"],
              beforeDeletingTag: function(tag) {
                return false;
              }
            });
            tags.removeTag("a");
            return expect(tags.getTags()).toEqual(["a", "b", "c"]);
          });
          return it("calls afterDeletingTag after a tag is removed, providing the tag as first parameter", function() {
            var tags, wasCalled;
            wasCalled = false;
            tags = newTagger("tagger2", {
              tagData: ["a", "b", "c"],
              afterDeletingTag: function(tag) {
                wasCalled = true;
                return expect(tag).toEqual("a");
              }
            });
            tags.removeTag("a");
            return expect(wasCalled).toBeTruthy();
          });
        });
      });
      describe("when restricting tags using restrictTo option", function() {
        return it("will not add any tags that aren't approved", function() {
          var tags;
          tags = newTagger("tagger2", {
            restrictTo: ["a", "b", "c"]
          });
          tags.addTag('foo').addTag('bar').addTag('baz').addTag('a');
          expect(tags.getTags()).toEqual(['a']);
          return $('#tagger2').remove();
        });
      });
      describe("when providing exclusion options", function() {
        it("can exclude tags via the excludes function option", function() {
          var excludesFunction, tags;
          excludesFunction = function(tag) {
            if (tag.indexOf('foo') > -1) {
              return false;
            }
            return true;
          };
          tags = newTagger("tagger2", {
            excludes: excludesFunction
          });
          tags.addTag('foo').addTag('bar').addTag('baz').addTag('foobarbaz');
          expect(tags.getTags()).toEqual(['foo', 'foobarbaz']);
          return $('#tagger2').remove();
        });
        return it("can exclude tags via the exclude option", function() {
          var tags;
          tags = newTagger("tagger2", {
            exclude: ["a", "b", "c"]
          });
          tags.addTag('a').addTag('b').addTag('c').addTag('d');
          expect(tags.getTags()).toEqual(['d']);
          return $('#tagger2').remove();
        });
      });
      return describe("when auto-suggesting", function() {
        describe("and caseInsensitive is true", function() {
          return it("finds suggestion regardless of case", function() {
            var tags;
            tags = newTagger("tagger2", {
              caseInsensitive: true,
              suggestions: ["alpha", "bravo", "charlie"]
            });
            return expect(tags.getSuggestions("A", true)).toEqual(["alpha"]);
          });
        });
        return describe("and caseInsensitive is false", function() {
          return it("only finds suggestions that match case", function() {
            var tags;
            tags = newTagger("tagger2", {
              suggestions: ["alpha", "bravo", "charlie"]
            });
            expect(tags.getSuggestions("A", true)).toEqual([]);
            return expect(tags.getSuggestions("b", true)).toEqual(["bravo"]);
          });
        });
      });
    });
  });

}).call(this);
