(function() { this.JST || (this.JST = {}); this.JST["templates/tag"] = function(__obj) {
    if (!__obj) __obj = {};
    var __out = [], __capture = function(callback) {
      var out = __out, result;
      __out = [];
      callback.call(this);
      result = __out.join('');
      __out = out;
      return __safe(result);
    }, __sanitize = function(value) {
      if (value && value.ecoSafe) {
        return value;
      } else if (typeof value !== 'undefined' && value != null) {
        return __escape(value);
      } else {
        return '';
      }
    }, __safe, __objSafe = __obj.safe, __escape = __obj.escape;
    __safe = __obj.safe = function(value) {
      if (value && value.ecoSafe) {
        return value;
      } else {
        if (!(typeof value !== 'undefined' && value != null)) value = '';
        var result = new String(value);
        result.ecoSafe = true;
        return result;
      }
    };
    if (!__escape) {
      __escape = __obj.escape = function(value) {
        return ('' + value)
          .replace(/&/g, '&amp;')
          .replace(/</g, '&lt;')
          .replace(/>/g, '&gt;')
          .replace(/"/g, '&quot;');
      };
    }
    (function() {
      (function() {
        __out.push('<div class=\'tag\'>\n  <div class=\'label ');
      
        __out.push(__sanitize(this.options.labelClass));
      
        __out.push('\'>\n    ');
      
        __out.push(__sanitize(this.model.name));
      
        __out.push('\n    <button type="button" class="close bootstrap-tags-label-close" aria-hidden="true">&times;</button>\n  </div>\n</div>\n');
      
      }).call(this);
      
    }).call(__obj);
    __obj.safe = __objSafe, __obj.escape = __escape;
    return __out.join('');
  };
}).call(this);
(function() { this.JST || (this.JST = {}); this.JST["templates/tagger"] = function(__obj) {
    if (!__obj) __obj = {};
    var __out = [], __capture = function(callback) {
      var out = __out, result;
      __out = [];
      callback.call(this);
      result = __out.join('');
      __out = out;
      return __safe(result);
    }, __sanitize = function(value) {
      if (value && value.ecoSafe) {
        return value;
      } else if (typeof value !== 'undefined' && value != null) {
        return __escape(value);
      } else {
        return '';
      }
    }, __safe, __objSafe = __obj.safe, __escape = __obj.escape;
    __safe = __obj.safe = function(value) {
      if (value && value.ecoSafe) {
        return value;
      } else {
        if (!(typeof value !== 'undefined' && value != null)) value = '';
        var result = new String(value);
        result.ecoSafe = true;
        return result;
      }
    };
    if (!__escape) {
      __escape = __obj.escape = function(value) {
        return ('' + value)
          .replace(/&/g, '&amp;')
          .replace(/</g, '&lt;')
          .replace(/>/g, '&gt;')
          .replace(/"/g, '&quot;');
      };
    }
    (function() {
      (function() {
        __out.push('<div class=\'tagger\'><div class=\'tags\'></div></div>\n');
      
      }).call(this);
      
    }).call(__obj);
    __obj.safe = __objSafe, __obj.escape = __escape;
    return __out.join('');
  };
}).call(this);
(function() {
  var BaseModel, BaseView, Models, TaggerCollection, Views,
    __hasProp = {}.hasOwnProperty,
    __extends = function(child, parent) { for (var key in parent) { if (__hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; },
    __bind = function(fn, me){ return function(){ return fn.apply(me, arguments); }; };

  BaseModel = (function() {
    function BaseModel() {}

    return BaseModel;

  })();

  Models = {
    Base: BaseModel
  };

  Models.Tag = (function(_super) {
    __extends(Tag, _super);

    function Tag(name) {
      this.name = name;
    }

    return Tag;

  })(Models.Base);

  Models.TagsCollection = (function() {
    function TagsCollection(models) {
      this.tags = models || [];
    }

    TagsCollection.prototype.each = function(fn) {
      var tag, _i, _len, _ref, _results;
      _ref = this.tags;
      _results = [];
      for (_i = 0, _len = _ref.length; _i < _len; _i++) {
        tag = _ref[_i];
        _results.push(fn(tag));
      }
      return _results;
    };

    TagsCollection.prototype.addTag = function(tagName) {
      var model;
      model = new Models.Tag(tagName);
      this.tags.push(model);
      return model;
    };

    TagsCollection.prototype.removeTag = function(tagName) {
      var newTags, removedTags;
      newTags = [];
      removedTags = [];
      this.each(function(tag) {
        if (tag.name === tagName) {
          return removedTags.push(tag);
        } else {
          return newTags.push(tag);
        }
      });
      this.tags = newTags;
      return removedTags;
    };

    return TagsCollection;

  })();

  BaseView = (function() {
    BaseView.prototype.tagName = 'div';

    BaseView.prototype.classes = '';

    function BaseView() {
      this.$el = $("<" + this.tagName + " class='" + this.classes + "'></" + this.tagName + ">");
      this.el = this.$el[0];
    }

    BaseView.prototype.$ = function(selector) {
      return this.$el.find(selector);
    };

    BaseView.prototype.$template = function(o) {
      return $(this.template(o));
    };

    return BaseView;

  })();

  Views = {
    Base: BaseView
  };

  Views.Tag = (function(_super) {
    __extends(Tag, _super);

    Tag.prototype.template = JST["templates/tag"];

    function Tag(options) {
      if (options == null) {
        options = {};
      }
      this.destroy = __bind(this.destroy, this);
      Tag.__super__.constructor.call(this);
      $.extend(this, options);
    }

    Tag.prototype.destroy = function() {
      return this.$el.html('');
    };

    Tag.prototype.render = function(options) {
      this.$el.html(this.$template({
        options: options,
        model: this.model
      }));
      this.$('.close').click(this.destroy);
      return this;
    };

    return Tag;

  })(Views.Base);

  window.Tag = Views.Tag;

  Views.Tagger = (function(_super) {
    __extends(Tagger, _super);

    Tagger.prototype.template = JST["templates/tagger"];

    Tagger.prototype.defaultOptions = {
      readOnly: false,
      suggestions: [],
      restrictTo: [],
      exclude: [],
      displayPopovers: false,
      popoverTrigger: 'hover',
      tagClass: 'btn-info',
      promptText: 'Enter tags...',
      readOnlyEmptyMessage: 'No tags to display...',
      labelClass: 'label-default',
      beforeAddingTag: function() {},
      afterAddingTag: function() {},
      beforeDeletingTag: function() {},
      afterDeletingTag: function() {},
      excludesTags: function() {
        return false;
      },
      onTagRemoved: function() {}
    };

    function Tagger(element, options) {
      if (options == null) {
        options = {};
      }
      Tagger.__super__.constructor.call(this);
      this.$el = $(element);
      this.tagsCollection = new Models.TagsCollection;
      this.tagViews = [];
      $.extend(this.options = {}, this.defaultOptions, options);
    }

    Tagger.prototype.updateOptions = function(options) {
      if (options == null) {
        options = {};
      }
      $.extend(this.options, options);
      return this;
    };

    Tagger.prototype.addTag = function(tagName) {
      var model, tagView;
      model = this.tagsCollection.addTag(tagName);
      tagView = new Views.Tag({
        model: model
      });
      this.tagViews.push(tagView);
      this.renderTag(tagView);
      return this;
    };

    Tagger.prototype.removeTag = function(tagName) {
      var i, index, indicesToDelete, model, models, tagView, _i, _j, _k, _len, _len1, _len2, _ref;
      models = this.tagsCollection.removeTag(tagName);
      indicesToDelete = [];
      for (_i = 0, _len = models.length; _i < _len; _i++) {
        model = models[_i];
        _ref = this.tagViews;
        for (i = _j = 0, _len1 = _ref.length; _j < _len1; i = ++_j) {
          tagView = _ref[i];
          if (tagView.model === model) {
            indicesToDelete.unshift(i);
            tagView.destroy();
          }
        }
      }
      for (_k = 0, _len2 = indicesToDelete.length; _k < _len2; _k++) {
        index = indicesToDelete[_k];
        this.tagViews.splice(index, 1);
      }
      this.render();
      return this;
    };

    Tagger.prototype.renderTag = function(tagView) {
      console.log(tagView.model.name);
      return this.$('.tags').append(tagView.render({
        labelClass: this.options.labelClass
      }).el);
    };

    Tagger.prototype.renderTags = function() {
      var tagView, _i, _len, _ref;
      console.log("rendering");
      _ref = this.tagViews;
      for (_i = 0, _len = _ref.length; _i < _len; _i++) {
        tagView = _ref[_i];
        this.renderTag(tagView);
      }
      return this;
    };

    Tagger.prototype.render = function() {
      this.$el.html(this.$template(this));
      this.renderTags();
      return this;
    };

    return Tagger;

  })(Views.Base);

  TaggerCollection = (function() {
    var key, value, _fn, _ref,
      _this = this;

    function TaggerCollection(items) {
      this.items = items;
    }

    _ref = Views.Tagger.prototype;
    _fn = function(key, value) {
      return TaggerCollection.prototype[key] = function() {
        var element, _i, _len, _ref1;
        _ref1 = this.items;
        for (_i = 0, _len = _ref1.length; _i < _len; _i++) {
          element = _ref1[_i];
          value.apply($(element).data('tags'), arguments);
        }
        return this;
      };
    };
    for (key in _ref) {
      value = _ref[key];
      _fn(key, value);
    }

    return TaggerCollection;

  }).call(this);

  (function($, window, document) {
    return $.fn.tags = function(options) {
      this.each(function(i, el) {
        var $el;
        $el = $(el);
        if ($el.data('tags') == null) {
          return $el.data('tags', new Views.Tagger(el, options));
        } else {
          return $el.data('tags').updateOptions(options);
        }
      });
      return new TaggerCollection(this);
    };
  })($, window, document);

}).call(this);
