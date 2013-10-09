(function() {
  describe("Bootstrap Tags", function() {
    beforeEach(function() {
      $('body').append('<div id="#one"></div>');
      return this.tags = $("#one").tags();
    });
    afterEach(function() {
      return $("#one").remove();
    });
    it("can be tested", function() {
      return expect(true).toBeTruthy();
    });
    it("loads jQuery", function() {
      return $('#one');
    });
    return describe("getTags method", function() {
      it("returns an empty array when there are no tags", function() {
        return expect($("#one").tags().getTags()).toEqual([]);
      });
      return it("returns an array with a single element when there is a single tag", function() {
        expect($("#one").tags().addTag("hello").getTags()).toEqual(["hello"]);
        return $("#one").tags().removeTag("hello");
      });
    });
  });

}).call(this);
