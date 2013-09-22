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
        __out.push('<div class=\'tag-label ');
      
        __out.push(__sanitize(this.options.labelClass));
      
        __out.push('\'>\n  <div class=\'text\'>\n    ');
      
        __out.push(__sanitize(this.model.name));
      
        __out.push('\n  </div>\n  <div class=\'\'>\n    <button type="button" class="close bootstrap-tags-label-close" aria-hidden="true">&times;</button>\n  </div>\n</div>\n');
      
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
        __out.push('<div class=\'tagger\'>\n  <div class=\'tags\'></div>\n  <input type=\'text\' class=\'form-control tags-input input-sm\'>\n</div>\n');
      
      }).call(this);
      
    }).call(__obj);
    __obj.safe = __objSafe, __obj.escape = __escape;
    return __out.join('');
  };
}).call(this);
(function() {
  var BaseModel, BaseView, Events, Models, TaggerCollection, Views, _ref,
    __hasProp = {}.hasOwnProperty,
    __extends = function(child, parent) { for (var key in parent) { if (__hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; },
    __bind = function(fn, me){ return function(){ return fn.apply(me, arguments); }; };

  Events = (function() {
    function Events() {}

    Events.prototype.on = function(eventName, callback, context) {
      var _base;
      if (context == null) {
        context = window;
      }
      this.callbacks || (this.callbacks = {});
      (_base = this.callbacks)[eventName] || (_base[eventName] = []);
      return this.callbacks[eventName].push({
        callback: callback,
        context: context
      });
    };

    Events.prototype.off = function(eventName, callback) {
      var callbackObject, i, indicesToDelete, _base, _i, _j, _len, _len1, _ref, _results;
      this.callbacks || (this.callbacks = {});
      (_base = this.callbacks)[eventName] || (_base[eventName] = []);
      indicesToDelete = [];
      _ref = this.callbacks[eventName];
      for (i = _i = 0, _len = _ref.length; _i < _len; i = ++_i) {
        callbackObject = _ref[i];
        if (callback === callbackObject.callback) {
          indicesToDelete.unshift(i);
        }
      }
      _results = [];
      for (_j = 0, _len1 = indicesToDelete.length; _j < _len1; _j++) {
        i = indicesToDelete[_j];
        _results.push(this.callbacks[eventName].splice(i, 1));
      }
      return _results;
    };

    Events.prototype.trigger = function(eventName) {
      var args, callbackObject, _base, _i, _len, _ref, _results;
      args = Array.prototype.slice.call(arguments, 1);
      this.callbacks || (this.callbacks = {});
      (_base = this.callbacks)[eventName] || (_base[eventName] = []);
      _ref = this.callbacks[eventName];
      _results = [];
      for (_i = 0, _len = _ref.length; _i < _len; _i++) {
        callbackObject = _ref[_i];
        _results.push(callbackObject.callback.apply(callbackObject.context, args));
      }
      return _results;
    };

    return Events;

  })();

  window.Events = Events;

  BaseModel = (function(_super) {
    __extends(BaseModel, _super);

    function BaseModel() {
      _ref = BaseModel.__super__.constructor.apply(this, arguments);
      return _ref;
    }

    return BaseModel;

  })(Events);

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
      var tag, _i, _len, _ref1, _results;
      _ref1 = this.tags;
      _results = [];
      for (_i = 0, _len = _ref1.length; _i < _len; _i++) {
        tag = _ref1[_i];
        _results.push(fn(tag));
      }
      return _results;
    };

    TagsCollection.prototype.create = function(tagName) {
      var model;
      model = new Models.Tag(tagName);
      this.tags.push(model);
      return model;
    };

    TagsCollection.prototype.remove = function(tagName) {
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

    TagsCollection.prototype.removeModel = function(model) {
      var i, tag, _i, _len, _ref1, _results;
      _ref1 = this.tags;
      _results = [];
      for (i = _i = 0, _len = _ref1.length; _i < _len; i = ++_i) {
        tag = _ref1[i];
        if (tag === model) {
          _results.push(this.tags.splice(i, 1));
        } else {
          _results.push(void 0);
        }
      }
      return _results;
    };

    TagsCollection.prototype.getTags = function() {
      return this.each(function(tag) {
        return tag.name;
      });
    };

    return TagsCollection;

  })();

  BaseView = (function(_super) {
    __extends(BaseView, _super);

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

  })(Events);

  Views = {
    Base: BaseView
  };

  Views.Tag = (function(_super) {
    __extends(Tag, _super);

    Tag.prototype.template = JST["templates/tag"];

    Tag.prototype.classes = 'tag';

    function Tag(options) {
      if (options == null) {
        options = {};
      }
      this.destroy = __bind(this.destroy, this);
      Tag.__super__.constructor.call(this);
      $.extend(this, options);
    }

    Tag.prototype.destroy = function() {
      return this.trigger('destroyed', this.model);
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
      this.keyDownHandler = __bind(this.keyDownHandler, this);
      Tagger.__super__.constructor.call(this);
      this.$el = $(element);
      this.tagsCollection = new Models.TagsCollection;
      this.tagViews = [];
      $.extend(this.options = {}, this.defaultOptions, options);
      this.render();
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
      model = this.tagsCollection.create(tagName);
      tagView = new Views.Tag({
        model: model
      });
      tagView.on("destroyed", this.removeTagModel, this);
      this.tagViews.push(tagView);
      this.renderTag(tagView);
      return this;
    };

    Tagger.prototype.removeTagModel = function(model) {
      var i, index, indicesToDelete, tagView, _i, _j, _len, _len1, _ref1;
      indicesToDelete = [];
      _ref1 = this.tagViews;
      for (i = _i = 0, _len = _ref1.length; _i < _len; i = ++_i) {
        tagView = _ref1[i];
        if (tagView.model === model) {
          indicesToDelete.unshift(i);
        }
      }
      for (_j = 0, _len1 = indicesToDelete.length; _j < _len1; _j++) {
        index = indicesToDelete[_j];
        this.removeTagView(this.tagViews[index]);
      }
      return this.tagsCollection.removeModel(model);
    };

    Tagger.prototype.removeTagView = function(tagViewToRemove) {
      var i, tagView, _i, _len, _ref1;
      this.$(tagViewToRemove.el).remove();
      this.updateTextInputPosition();
      _ref1 = this.tagViews;
      for (i = _i = 0, _len = _ref1.length; _i < _len; i = ++_i) {
        tagView = _ref1[i];
        if (tagView === tagViewToRemove) {
          return this.tagViews.splice(i, 1);
        }
      }
    };

    Tagger.prototype.removeTag = function(tagName) {
      var model, models, _i, _len;
      models = this.tagsCollection.remove(tagName);
      for (_i = 0, _len = models.length; _i < _len; _i++) {
        model = models[_i];
        this.removeTagModel(model);
      }
      return this;
    };

    Tagger.prototype.renderTag = function(tagView) {
      this.$('.tags').append(tagView.render({
        labelClass: this.options.labelClass
      }).el);
      return this.updateTextInputPosition();
    };

    Tagger.prototype.renderTags = function() {
      var tagView, _i, _len, _ref1;
      _ref1 = this.tagViews;
      for (_i = 0, _len = _ref1.length; _i < _len; _i++) {
        tagView = _ref1[_i];
        this.renderTag(tagView);
      }
      return this;
    };

    Tagger.prototype.getTags = function() {
      return this.tagsCollection.getTags();
    };

    Tagger.prototype.updateTextInputPosition = function() {
      return this.$('.tags-input').css({
        'padding-left': this.$('.tags').outerWidth()
      });
    };

    Tagger.prototype.keyDownHandler = function(e) {
      var k;
      k = (e.keyCode != null ? e.keyCode : e.which);
      switch (k) {
        case 13:
          this.addTag(e.target.value);
          return this.$('.tags-input').val('');
        case 46:
        case 8:
          if (e.target.value === '') {
            return this.removeTagView(this.tagViews[this.tagViews.length - 1]);
          }
      }
    };

    Tagger.prototype.setupListeners = function() {
      return this.$('.tags-input').keydown(this.keyDownHandler);
    };

    Tagger.prototype.render = function() {
      this.$el.html(this.$template(this));
      this.renderTags();
      this.setupListeners();
      return this;
    };

    return Tagger;

  })(Views.Base);

  TaggerCollection = (function() {
    var key, value, _fn, _ref1,
      _this = this;

    function TaggerCollection(items) {
      this.items = items;
    }

    _ref1 = Views.Tagger.prototype;
    _fn = function(key, value) {
      return TaggerCollection.prototype[key] = function() {
        var element, returnVals, _i, _len, _ref2;
        returnVals = [];
        _ref2 = this.items;
        for (_i = 0, _len = _ref2.length; _i < _len; _i++) {
          element = _ref2[_i];
          returnVals.push(value.apply($(element).data('tags'), arguments));
        }
        if (returnVals[0] instanceof Views.Tagger) {
          return this;
        }
        if (this.items.length > 1) {
          return returnVals;
        } else {
          return returnVals[0];
        }
      };
    };
    for (key in _ref1) {
      value = _ref1[key];
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
