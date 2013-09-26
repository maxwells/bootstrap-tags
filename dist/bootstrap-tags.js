/*!
 * bootstrap-tags 0.1.1
 * https://github.com/maxwells/bootstrap-tags
 * Copyright 2013 Max Lahey; Licensed MIT
 */

(function($) {
    this["JST"] = this["JST"] || {};
    this["JST"]["templates/tag"] = function(obj) {
        obj || (obj = {});
        var __t, __p = "", __e = _.escape;
        with (obj) {
            __p += "<div class='tag-label " + ((__t = options.labelClass) == null ? "" : __t) + "'>\n  <div class='text'>\n    " + ((__t = model.name) == null ? "" : __t) + '\n  </div>\n  <div class=\'\'>\n    <button type="button" class="close bootstrap-tags-label-close" aria-hidden="true">&times;</button>\n  </div>\n</div>';
        }
        return __p;
    };
    this["JST"]["templates/tagger"] = function(obj) {
        obj || (obj = {});
        var __t, __p = "", __e = _.escape;
        with (obj) {
            __p += "<div class='tagger'>\n  <div class='tags'></div>\n  <input type='text' class='form-control tags-input input-sm'>\n</div>";
        }
        return __p;
    };
    (function() {
        var Events;
        Events = function() {
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
        }();
        window.Events = Events;
    }).call(this);
    (function() {
        var BaseModel, _ref, __hasProp = {}.hasOwnProperty, __extends = function(child, parent) {
            for (var key in parent) {
                if (__hasProp.call(parent, key)) child[key] = parent[key];
            }
            function ctor() {
                this.constructor = child;
            }
            ctor.prototype = parent.prototype;
            child.prototype = new ctor();
            child.__super__ = parent.prototype;
            return child;
        };
        BaseModel = function(_super) {
            __extends(BaseModel, _super);
            function BaseModel() {
                _ref = BaseModel.__super__.constructor.apply(this, arguments);
                return _ref;
            }
            return BaseModel;
        }(Events);
        window.Tags || (window.Tags = {});
        window.Tags.Models = {
            Base: BaseModel
        };
    }).call(this);
    (function() {
        var __hasProp = {}.hasOwnProperty, __extends = function(child, parent) {
            for (var key in parent) {
                if (__hasProp.call(parent, key)) child[key] = parent[key];
            }
            function ctor() {
                this.constructor = child;
            }
            ctor.prototype = parent.prototype;
            child.prototype = new ctor();
            child.__super__ = parent.prototype;
            return child;
        };
        Tags.Models.Tag = function(_super) {
            __extends(Tag, _super);
            function Tag(name) {
                this.name = name;
            }
            return Tag;
        }(Tags.Models.Base);
    }).call(this);
    (function() {
        Tags.Models.TagsCollection = function() {
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
        }();
    }).call(this);
    (function() {
        var BaseView, __hasProp = {}.hasOwnProperty, __extends = function(child, parent) {
            for (var key in parent) {
                if (__hasProp.call(parent, key)) child[key] = parent[key];
            }
            function ctor() {
                this.constructor = child;
            }
            ctor.prototype = parent.prototype;
            child.prototype = new ctor();
            child.__super__ = parent.prototype;
            return child;
        };
        BaseView = function(_super) {
            __extends(BaseView, _super);
            BaseView.prototype.tagName = "div";
            BaseView.prototype.classes = "";
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
        }(Events);
        window.Tags || (window.Tags = {});
        window.Tags.Views = {
            Base: BaseView
        };
    }).call(this);
    (function() {
        var __bind = function(fn, me) {
            return function() {
                return fn.apply(me, arguments);
            };
        }, __hasProp = {}.hasOwnProperty, __extends = function(child, parent) {
            for (var key in parent) {
                if (__hasProp.call(parent, key)) child[key] = parent[key];
            }
            function ctor() {
                this.constructor = child;
            }
            ctor.prototype = parent.prototype;
            child.prototype = new ctor();
            child.__super__ = parent.prototype;
            return child;
        };
        Tags.Views.Tag = function(_super) {
            __extends(Tag, _super);
            Tag.prototype.template = JST["templates/tag"];
            Tag.prototype.classes = "tag";
            function Tag(options) {
                if (options == null) {
                    options = {};
                }
                this.destroy = __bind(this.destroy, this);
                Tag.__super__.constructor.call(this);
                $.extend(this, options);
            }
            Tag.prototype.destroy = function() {
                return this.trigger("destroyed", this.model);
            };
            Tag.prototype.render = function(options) {
                this.$el.html(this.$template({
                    options: options,
                    model: this.model
                }));
                this.$(".close").click(this.destroy);
                return this;
            };
            return Tag;
        }(Tags.Views.Base);
        window.Tag = Tags.Views.Tag;
    }).call(this);
    (function() {
        var __bind = function(fn, me) {
            return function() {
                return fn.apply(me, arguments);
            };
        }, __hasProp = {}.hasOwnProperty, __extends = function(child, parent) {
            for (var key in parent) {
                if (__hasProp.call(parent, key)) child[key] = parent[key];
            }
            function ctor() {
                this.constructor = child;
            }
            ctor.prototype = parent.prototype;
            child.prototype = new ctor();
            child.__super__ = parent.prototype;
            return child;
        };
        Tags.Views.Tagger = function(_super) {
            __extends(Tagger, _super);
            Tagger.prototype.template = JST["templates/tagger"];
            Tagger.prototype.defaultOptions = {
                readOnly: false,
                suggestions: [],
                restrictTo: [],
                exclude: [],
                displayPopovers: false,
                popoverTrigger: "hover",
                tagClass: "btn-info",
                promptText: "Enter tags...",
                readOnlyEmptyMessage: "No tags to display...",
                labelClass: "label-default",
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
                this.tagsCollection = new Tags.Models.TagsCollection();
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
                this.$(".tags").append(tagView.render({
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
                return this.$(".tags-input").css({
                    "padding-left": this.$(".tags").outerWidth()
                });
            };
            Tagger.prototype.keyDownHandler = function(e) {
                var k;
                k = e.keyCode != null ? e.keyCode : e.which;
                switch (k) {
                  case 13:
                    this.addTag(e.target.value);
                    return this.$(".tags-input").val("");

                  case 46:
                  case 8:
                    if (e.target.value === "") {
                        return this.removeTagView(this.tagViews[this.tagViews.length - 1]);
                    }
                }
            };
            Tagger.prototype.setupListeners = function() {
                return this.$(".tags-input").keydown(this.keyDownHandler);
            };
            Tagger.prototype.render = function() {
                this.$el.html(this.$template(this));
                this.renderTags();
                this.setupListeners();
                return this;
            };
            return Tagger;
        }(Tags.Views.Base);
    }).call(this);
    (function() {
        var TaggerCollection;
        TaggerCollection = function() {
            var key, value, _fn, _ref, _this = this;
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
                        returnVals.push(value.apply($(element).data("tags"), arguments));
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
        }.call(this);
        (function($, window, document) {
            return $.fn.tags = function(options) {
                this.each(function(i, el) {
                    var $el;
                    $el = $(el);
                    if ($el.data("tags") == null) {
                        return $el.data("tags", new Tags.Views.Tagger(el, options));
                    } else {
                        return $el.data("tags").updateOptions(options);
                    }
                });
                return new TaggerCollection(this);
            };
        })($, window, document);
    }).call(this);
})(window.jQuery);