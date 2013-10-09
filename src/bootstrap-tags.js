(function() {
  var Events;

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

}).call(this);

(function() {
  var BaseModel, _ref,
    __hasProp = {}.hasOwnProperty,
    __extends = function(child, parent) { for (var key in parent) { if (__hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; };

  BaseModel = (function(_super) {
    __extends(BaseModel, _super);

    function BaseModel() {
      _ref = BaseModel.__super__.constructor.apply(this, arguments);
      return _ref;
    }

    return BaseModel;

  })(Events);

  window.Tags || (window.Tags = {});

  window.Tags.Models = {
    Base: BaseModel
  };

}).call(this);

(function() {
  var __hasProp = {}.hasOwnProperty,
    __extends = function(child, parent) { for (var key in parent) { if (__hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; };

  Tags.Models.Tag = (function(_super) {
    __extends(Tag, _super);

    function Tag(name) {
      this.name = name;
    }

    return Tag;

  })(Tags.Models.Base);

}).call(this);

(function() {
  Tags.Models.TagsCollection = (function() {
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

    TagsCollection.prototype.create = function(tagName) {
      var model;
      model = new Tags.Models.Tag(tagName);
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
      var i, tag, _i, _len, _ref, _results;
      _ref = this.tags;
      _results = [];
      for (i = _i = 0, _len = _ref.length; _i < _len; i = ++_i) {
        tag = _ref[i];
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

}).call(this);

(function() {
  var BaseView,
    __hasProp = {}.hasOwnProperty,
    __extends = function(child, parent) { for (var key in parent) { if (__hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; };

  BaseView = (function(_super) {
    __extends(BaseView, _super);

    BaseView.prototype.tagName = 'div';

    BaseView.prototype.classes = '';

    function BaseView(options) {
      if (options == null) {
        options = {};
      }
      this.options = options;
      this.$el = $("<" + this.tagName + " class='" + this.classes + "'></" + this.tagName + ">");
      this.el = this.$el[0];
      if (this.initialize != null) {
        this.initialize(options);
      }
    }

    BaseView.prototype.$ = function(selector) {
      return this.$el.find(selector);
    };

    BaseView.prototype.$template = function(o) {
      return $(this.template(o));
    };

    return BaseView;

  })(Events);

  window.Tags || (window.Tags = {});

  window.Tags.Views = {
    Base: BaseView
  };

}).call(this);

(function() {
  var _ref,
    __hasProp = {}.hasOwnProperty,
    __extends = function(child, parent) { for (var key in parent) { if (__hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; };

  Tags.Views.AutoComplete = (function(_super) {
    __extends(AutoComplete, _super);

    function AutoComplete() {
      _ref = AutoComplete.__super__.constructor.apply(this, arguments);
      return _ref;
    }

    AutoComplete.prototype.template = JST["templates/auto_complete"];

    AutoComplete.prototype.initialize = function(options) {
      this.index = 0;
      this.matches = [];
      return this.suggestionViews = [];
    };

    AutoComplete.prototype.update = function(text, match) {
      var suggestion, _i, _len, _ref1;
      if (match == null) {
        match = true;
      }
      this.matches = [];
      if (match) {
        _ref1 = this.options.suggestions;
        for (_i = 0, _len = _ref1.length; _i < _len; _i++) {
          suggestion = _ref1[_i];
          if (suggestion.indexOf(text) > -1) {
            this.matches.push(suggestion);
          }
        }
      }
      return this.updateView();
    };

    AutoComplete.prototype.updateView = function() {
      var match, view, _i, _len, _ref1;
      this.$('.tags-autocomplete-suggestions').html('');
      this.suggestionViews = [];
      _ref1 = this.matches;
      for (_i = 0, _len = _ref1.length; _i < _len; _i++) {
        match = _ref1[_i];
        view = new Tags.Views.AutoCompleteRow({
          title: match
        });
        this.suggestionViews.push(view);
        this.$('.tags-autocomplete-suggestions').append(view.render().el);
      }
      return this.updateSelected();
    };

    AutoComplete.prototype.updateSelected = function() {
      var view, _i, _len, _ref1;
      if (!(this.suggestionViews.length > 0)) {
        return;
      }
      _ref1 = this.suggestionViews;
      for (_i = 0, _len = _ref1.length; _i < _len; _i++) {
        view = _ref1[_i];
        view.deselect();
      }
      if (this.index !== -1) {
        return this.suggestionViews[this.index].select();
      }
    };

    AutoComplete.prototype.up = function() {
      this.index = Math.max(0, this.index - 1);
      return this.updateSelected();
    };

    AutoComplete.prototype.down = function() {
      this.index = Math.min(this.matches.length - 1, this.index + 1);
      return this.updateSelected();
    };

    AutoComplete.prototype.escape = function() {
      this.index = -1;
      return this.update('', false);
    };

    AutoComplete.prototype["delete"] = function(text) {
      return this.update(text, text.length > 0);
    };

    AutoComplete.prototype.enter = function() {
      if (this.index > -1) {
        return this.suggestionViews[this.index].getTitle();
      }
      return null;
    };

    AutoComplete.prototype.reset = function() {
      this.index = -1;
      return this.update('', false);
    };

    AutoComplete.prototype.render = function() {
      this.$el.html(this.$template());
      return this;
    };

    return AutoComplete;

  })(Tags.Views.Base);

}).call(this);

(function() {
  var _ref,
    __hasProp = {}.hasOwnProperty,
    __extends = function(child, parent) { for (var key in parent) { if (__hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; };

  Tags.Views.AutoCompleteRow = (function(_super) {
    __extends(AutoCompleteRow, _super);

    function AutoCompleteRow() {
      _ref = AutoCompleteRow.__super__.constructor.apply(this, arguments);
      return _ref;
    }

    AutoCompleteRow.prototype.template = JST['templates/auto_complete_row'];

    AutoCompleteRow.prototype.select = function() {
      return this.$('.tags-autocomplete-suggestion').addClass('selected');
    };

    AutoCompleteRow.prototype.deselect = function() {
      return this.$('.tags-autocomplete-suggestion').removeClass('selected');
    };

    AutoCompleteRow.prototype.getTitle = function() {
      return this.options.title;
    };

    AutoCompleteRow.prototype.render = function() {
      this.$el.html(this.$template(this.options));
      return this;
    };

    return AutoCompleteRow;

  })(Tags.Views.Base);

}).call(this);

(function() {
  var __bind = function(fn, me){ return function(){ return fn.apply(me, arguments); }; },
    __hasProp = {}.hasOwnProperty,
    __extends = function(child, parent) { for (var key in parent) { if (__hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; };

  Tags.Views.Tag = (function(_super) {
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

  })(Tags.Views.Base);

  window.Tag = Tags.Views.Tag;

}).call(this);

(function() {
  var __bind = function(fn, me){ return function(){ return fn.apply(me, arguments); }; },
    __hasProp = {}.hasOwnProperty,
    __extends = function(child, parent) { for (var key in parent) { if (__hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; };

  Tags.Views.Tagger = (function(_super) {
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
      this.keyUpHandler = __bind(this.keyUpHandler, this);
      this.keyDownHandler = __bind(this.keyDownHandler, this);
      Tagger.__super__.constructor.call(this);
      this.$el = $(element);
      this.tagsCollection = new Tags.Models.TagsCollection;
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
      tagView = new Tags.Views.Tag({
        model: model
      });
      tagView.on("destroyed", this.removeTagByModel, this);
      this.tagViews.push(tagView);
      this.renderTag(tagView);
      return this;
    };

    Tagger.prototype.removeTagByModel = function(model) {
      var i, index, indicesToDelete, tagView, _i, _j, _len, _len1, _ref;
      indicesToDelete = [];
      _ref = this.tagViews;
      for (i = _i = 0, _len = _ref.length; _i < _len; i = ++_i) {
        tagView = _ref[i];
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
      var i, tagView, _i, _len, _ref;
      this.$(tagViewToRemove.el).remove();
      this.updateTextInputPosition();
      _ref = this.tagViews;
      for (i = _i = 0, _len = _ref.length; _i < _len; i = ++_i) {
        tagView = _ref[i];
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
        this.removeTagByModel(model);
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
      var tagView, _i, _len, _ref;
      _ref = this.tagViews;
      for (_i = 0, _len = _ref.length; _i < _len; _i++) {
        tagView = _ref[_i];
        this.renderTag(tagView);
      }
      return this;
    };

    Tagger.prototype.getTags = function() {
      return this.tagsCollection.getTags();
    };

    Tagger.prototype.updateTextInputPosition = function() {
      return this.$('input').css({
        'padding-left': this.$('.tags').outerWidth()
      });
    };

    Tagger.prototype.keyDownHandler = function(e) {
      var k;
      k = (e.keyCode != null ? e.keyCode : e.which);
      switch (k) {
        case 13:
          this.addTag(this.autoComplete.enter() || e.target.value);
          this.autoComplete.reset();
          return this.$('.tags-input').val('');
        case 46:
        case 8:
          if (e.target.value === '') {
            return this.removeTagView(this.tagViews[this.tagViews.length - 1]);
          }
          break;
        case 40:
          return this.autoComplete.down();
        case 38:
          return this.autoComplete.up();
        case 27:
          return this.autoComplete.escape();
      }
    };

    Tagger.prototype.keyUpHandler = function(e) {
      var k;
      k = (e.keyCode != null ? e.keyCode : e.which);
      switch (k) {
        case 27:
        case 13:
          break;
        case 46:
        case 8:
          return this.autoComplete["delete"](e.target.value);
        default:
          return this.autoComplete.update(e.target.value);
      }
    };

    Tagger.prototype.setupListeners = function() {
      this.$('.tags-input').keydown(this.keyDownHandler);
      return this.$('.tags-input').keyup(this.keyUpHandler);
    };

    Tagger.prototype.initializeAutoComplete = function() {
      this.autoComplete = new Tags.Views.AutoComplete({
        suggestions: this.options.suggestions
      });
      return this.$el.append(this.autoComplete.render().el);
    };

    Tagger.prototype.render = function() {
      this.$el.html(this.$template(this));
      this.renderTags();
      this.setupListeners();
      this.initializeAutoComplete();
      return this;
    };

    return Tagger;

  })(Tags.Views.Base);

}).call(this);

(function() {
  var TaggerCollection;

  TaggerCollection = (function() {
    var key, value, _fn, _ref,
      _this = this;

    function TaggerCollection(items) {
      this.items = items;
    }

    _ref = Tags.Views.Tagger.prototype;
    _fn = function(key, value) {
      return TaggerCollection.prototype[key] = function() {
        var element, returnVals, _i, _len, _ref1;
        returnVals = [];
        _ref1 = this.items;
        for (_i = 0, _len = _ref1.length; _i < _len; _i++) {
          element = _ref1[_i];
          returnVals.push(value.apply($(element).data('tags'), arguments));
        }
        if (returnVals[0] instanceof Tags.Views.Tagger) {
          return this;
        }
        if (this.items.length > 1) {
          return returnVals;
        } else {
          return returnVals[0];
        }
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
          return $el.data('tags', new Tags.Views.Tagger(el, options));
        } else {
          return $el.data('tags').updateOptions(options);
        }
      });
      return new TaggerCollection(this);
    };
  })($, window, document);

}).call(this);
