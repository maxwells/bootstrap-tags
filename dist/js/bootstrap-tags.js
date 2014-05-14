/*!
 * bootstrap-tags 1.1.5
 * https://github.com/maxwells/bootstrap-tags
 * Copyright 2013 Max Lahey; Licensed MIT
 */

(function($) {
    (function() {
        window.Tags || (window.Tags = {});
        jQuery(function() {
            $.tags = function(element, options) {
                var key, tag, tagData, value, _i, _len, _ref;
                if (options == null) {
                    options = {};
                }
                for (key in options) {
                    value = options[key];
                    this[key] = value;
                }
                this.bootstrapVersion || (this.bootstrapVersion = "3");
                this.readOnly || (this.readOnly = false);
                this.suggestOnClick || (this.suggestOnClick = false);
                this.suggestions || (this.suggestions = []);
                this.restrictTo = options.restrictTo != null ? options.restrictTo.concat(this.suggestions) : false;
                this.exclude || (this.exclude = false);
                this.displayPopovers = options.popovers != null ? true : options.popoverData != null;
                this.popoverTrigger || (this.popoverTrigger = "hover");
                this.tagClass || (this.tagClass = "btn-info");
                this.tagSize || (this.tagSize = "md");
                this.promptText || (this.promptText = "Enter tags...");
                this.caseInsensitive || (this.caseInsensitive = false);
                this.readOnlyEmptyMessage || (this.readOnlyEmptyMessage = "No tags to display...");
                this.maxNumTags || (this.maxNumTags = -1);
                this.beforeAddingTag || (this.beforeAddingTag = function(tag) {});
                this.afterAddingTag || (this.afterAddingTag = function(tag) {});
                this.beforeDeletingTag || (this.beforeDeletingTag = function(tag) {});
                this.afterDeletingTag || (this.afterDeletingTag = function(tag) {});
                this.definePopover || (this.definePopover = function(tag) {
                    return 'associated content for "' + tag + '"';
                });
                this.excludes || (this.excludes = function() {
                    return false;
                });
                this.tagRemoved || (this.tagRemoved = function(tag) {});
                this.pressedReturn || (this.pressedReturn = function(e) {});
                this.pressedDelete || (this.pressedDelete = function(e) {});
                this.pressedDown || (this.pressedDown = function(e) {});
                this.pressedUp || (this.pressedUp = function(e) {});
                this.$element = $(element);
                if (options.tagData != null) {
                    this.tagsArray = options.tagData;
                } else {
                    tagData = $(".tag-data", this.$element).html();
                    this.tagsArray = tagData != null ? tagData.split(",") : [];
                }
                if (options.popoverData) {
                    this.popoverArray = options.popoverData;
                } else {
                    this.popoverArray = [];
                    _ref = this.tagsArray;
                    for (_i = 0, _len = _ref.length; _i < _len; _i++) {
                        tag = _ref[_i];
                        this.popoverArray.push(null);
                    }
                }
                this.getTags = function(_this) {
                    return function() {
                        return _this.tagsArray;
                    };
                }(this);
                this.getTagsContent = function(_this) {
                    return function() {
                        return _this.popoverArray;
                    };
                }(this);
                this.getTagsWithContent = function(_this) {
                    return function() {
                        var combined, i, _j, _ref1;
                        combined = [];
                        for (i = _j = 0, _ref1 = _this.tagsArray.length - 1; 0 <= _ref1 ? _j <= _ref1 : _j >= _ref1; i = 0 <= _ref1 ? ++_j : --_j) {
                            combined.push({
                                tag: _this.tagsArray[i],
                                content: _this.popoverArray[i]
                            });
                        }
                        return combined;
                    };
                }(this);
                this.getTag = function(_this) {
                    return function(tag) {
                        var index;
                        index = _this.tagsArray.indexOf(tag);
                        if (index > -1) {
                            return _this.tagsArray[index];
                        } else {
                            return null;
                        }
                    };
                }(this);
                this.getTagWithContent = function(_this) {
                    return function(tag) {
                        var index;
                        index = _this.tagsArray.indexOf(tag);
                        return {
                            tag: _this.tagsArray[index],
                            content: _this.popoverArray[index]
                        };
                    };
                }(this);
                this.hasTag = function(_this) {
                    return function(tag) {
                        return _this.tagsArray.indexOf(tag) > -1;
                    };
                }(this);
                this.removeTagClicked = function(_this) {
                    return function(e) {
                        if (e.currentTarget.tagName === "A") {
                            _this.removeTag($("span", e.currentTarget.parentElement).html());
                            $(e.currentTarget.parentNode).remove();
                        }
                        return _this;
                    };
                }(this);
                this.removeLastTag = function(_this) {
                    return function() {
                        if (_this.tagsArray.length > 0) {
                            _this.removeTag(_this.tagsArray[_this.tagsArray.length - 1]);
                            if (_this.canAddByMaxNum()) {
                                _this.enableInput();
                            }
                        }
                        return _this;
                    };
                }(this);
                this.removeTag = function(_this) {
                    return function(tag) {
                        if (_this.tagsArray.indexOf(tag) > -1) {
                            if (_this.beforeDeletingTag(tag) === false) {
                                return;
                            }
                            _this.popoverArray.splice(_this.tagsArray.indexOf(tag), 1);
                            _this.tagsArray.splice(_this.tagsArray.indexOf(tag), 1);
                            _this.renderTags();
                            _this.afterDeletingTag(tag);
                            if (_this.canAddByMaxNum()) {
                                _this.enableInput();
                            }
                        }
                        return _this;
                    };
                }(this);
                this.canAddByRestriction = function(tag) {
                    return this.restrictTo === false || this.restrictTo.indexOf(tag) !== -1;
                };
                this.canAddByExclusion = function(tag) {
                    return (this.exclude === false || this.exclude.indexOf(tag) === -1) && !this.excludes(tag);
                };
                this.canAddByMaxNum = function() {
                    return this.maxNumTags === -1 || this.tagsArray.length < this.maxNumTags;
                };
                this.addTag = function(_this) {
                    return function(tag) {
                        var associatedContent;
                        if (_this.canAddByRestriction(tag) && !_this.hasTag(tag) && tag.length > 0 && _this.canAddByExclusion(tag) && _this.canAddByMaxNum()) {
                            if (_this.beforeAddingTag(tag) === false) {
                                return;
                            }
                            associatedContent = _this.definePopover(tag);
                            _this.popoverArray.push(associatedContent || null);
                            _this.tagsArray.push(tag);
                            _this.afterAddingTag(tag);
                            _this.renderTags();
                            if (!_this.canAddByMaxNum()) {
                                _this.disableInput();
                            }
                        }
                        return _this;
                    };
                }(this);
                this.addTagWithContent = function(_this) {
                    return function(tag, content) {
                        if (_this.canAddByRestriction(tag) && !_this.hasTag(tag) && tag.length > 0) {
                            if (_this.beforeAddingTag(tag) === false) {
                                return;
                            }
                            _this.tagsArray.push(tag);
                            _this.popoverArray.push(content);
                            _this.afterAddingTag(tag);
                            _this.renderTags();
                        }
                        return _this;
                    };
                }(this);
                this.renameTag = function(_this) {
                    return function(name, newName) {
                        _this.tagsArray[_this.tagsArray.indexOf(name)] = newName;
                        _this.renderTags();
                        return _this;
                    };
                }(this);
                this.setPopover = function(_this) {
                    return function(tag, popoverContent) {
                        _this.popoverArray[_this.tagsArray.indexOf(tag)] = popoverContent;
                        _this.renderTags();
                        return _this;
                    };
                }(this);
                this.clickHandler = function(_this) {
                    return function(e) {
                        return _this.makeSuggestions(e, true);
                    };
                }(this);
                this.keyDownHandler = function(_this) {
                    return function(e) {
                        var k, numSuggestions;
                        k = e.keyCode != null ? e.keyCode : e.which;
                        switch (k) {
                          case 13:
                            e.preventDefault();
                            _this.pressedReturn(e);
                            tag = e.target.value;
                            if (_this.suggestedIndex !== -1) {
                                tag = _this.suggestionList[_this.suggestedIndex];
                            }
                            _this.addTag(tag);
                            e.target.value = "";
                            _this.renderTags();
                            return _this.hideSuggestions();

                          case 46:
                          case 8:
                            _this.pressedDelete(e);
                            if (e.target.value === "") {
                                _this.removeLastTag();
                            }
                            if (e.target.value.length === 1) {
                                return _this.hideSuggestions();
                            }
                            break;

                          case 40:
                            _this.pressedDown(e);
                            if (_this.input.val() === "" && (_this.suggestedIndex === -1 || _this.suggestedIndex == null)) {
                                _this.makeSuggestions(e, true);
                            }
                            numSuggestions = _this.suggestionList.length;
                            _this.suggestedIndex = _this.suggestedIndex < numSuggestions - 1 ? _this.suggestedIndex + 1 : numSuggestions - 1;
                            _this.selectSuggested(_this.suggestedIndex);
                            if (_this.suggestedIndex >= 0) {
                                return _this.scrollSuggested(_this.suggestedIndex);
                            }
                            break;

                          case 38:
                            _this.pressedUp(e);
                            _this.suggestedIndex = _this.suggestedIndex > 0 ? _this.suggestedIndex - 1 : 0;
                            _this.selectSuggested(_this.suggestedIndex);
                            if (_this.suggestedIndex >= 0) {
                                return _this.scrollSuggested(_this.suggestedIndex);
                            }
                            break;

                          case 9:
                          case 27:
                            _this.hideSuggestions();
                            return _this.suggestedIndex = -1;
                        }
                    };
                }(this);
                this.keyUpHandler = function(_this) {
                    return function(e) {
                        var k;
                        k = e.keyCode != null ? e.keyCode : e.which;
                        if (k !== 40 && k !== 38 && k !== 27) {
                            return _this.makeSuggestions(e, false);
                        }
                    };
                }(this);
                this.getSuggestions = function(str, overrideLengthCheck) {
                    this.suggestionList = [];
                    if (this.caseInsensitive) {
                        str = str.toLowerCase();
                    }
                    $.each(this.suggestions, function(_this) {
                        return function(i, suggestion) {
                            var suggestionVal;
                            suggestionVal = _this.caseInsensitive ? suggestion.substring(0, str.length).toLowerCase() : suggestion.substring(0, str.length);
                            if (_this.tagsArray.indexOf(suggestion) < 0 && suggestionVal === str && (str.length > 0 || overrideLengthCheck)) {
                                return _this.suggestionList.push(suggestion);
                            }
                        };
                    }(this));
                    return this.suggestionList;
                };
                this.makeSuggestions = function(_this) {
                    return function(e, overrideLengthCheck, val) {
                        if (val == null) {
                            val = e.target.value != null ? e.target.value : e.target.textContent;
                        }
                        _this.suggestedIndex = -1;
                        _this.$suggestionList.html("");
                        $.each(_this.getSuggestions(val, overrideLengthCheck), function(i, suggestion) {
                            return _this.$suggestionList.append(_this.template("tags_suggestion", {
                                suggestion: suggestion
                            }));
                        });
                        _this.$(".tags-suggestion").mouseover(_this.selectSuggestedMouseOver);
                        _this.$(".tags-suggestion").click(_this.suggestedClicked);
                        if (_this.suggestionList.length > 0) {
                            return _this.showSuggestions();
                        } else {
                            return _this.hideSuggestions();
                        }
                    };
                }(this);
                this.suggestedClicked = function(_this) {
                    return function(e) {
                        tag = e.target.textContent;
                        if (_this.suggestedIndex !== -1) {
                            tag = _this.suggestionList[_this.suggestedIndex];
                        }
                        _this.addTag(tag);
                        _this.input.val("");
                        _this.makeSuggestions(e, false, "");
                        _this.input.focus();
                        return _this.hideSuggestions();
                    };
                }(this);
                this.hideSuggestions = function(_this) {
                    return function() {
                        return _this.$(".tags-suggestion-list").css({
                            display: "none"
                        });
                    };
                }(this);
                this.showSuggestions = function(_this) {
                    return function() {
                        return _this.$(".tags-suggestion-list").css({
                            display: "block"
                        });
                    };
                }(this);
                this.selectSuggestedMouseOver = function(_this) {
                    return function(e) {
                        $(".tags-suggestion").removeClass("tags-suggestion-highlighted");
                        $(e.target).addClass("tags-suggestion-highlighted");
                        $(e.target).mouseout(_this.selectSuggestedMousedOut);
                        return _this.suggestedIndex = _this.$(".tags-suggestion").index($(e.target));
                    };
                }(this);
                this.selectSuggestedMousedOut = function(_this) {
                    return function(e) {
                        return $(e.target).removeClass("tags-suggestion-highlighted");
                    };
                }(this);
                this.selectSuggested = function(_this) {
                    return function(i) {
                        var tagElement;
                        $(".tags-suggestion").removeClass("tags-suggestion-highlighted");
                        tagElement = _this.$(".tags-suggestion").eq(i);
                        return tagElement.addClass("tags-suggestion-highlighted");
                    };
                }(this);
                this.scrollSuggested = function(_this) {
                    return function(i) {
                        var pos, tagElement, topElement, topPos;
                        tagElement = _this.$(".tags-suggestion").eq(i);
                        topElement = _this.$(".tags-suggestion").eq(0);
                        pos = tagElement.position();
                        topPos = topElement.position();
                        if (pos != null) {
                            return _this.$(".tags-suggestion-list").scrollTop(pos.top - topPos.top);
                        }
                    };
                }(this);
                this.adjustInputPosition = function(_this) {
                    return function() {
                        var pBottom, pLeft, pTop, pWidth, tagElement, tagPosition;
                        tagElement = _this.$(".tag").last();
                        tagPosition = tagElement.position();
                        pLeft = tagPosition != null ? tagPosition.left + tagElement.outerWidth(true) : 0;
                        pTop = tagPosition != null ? tagPosition.top : 0;
                        pWidth = _this.$element.width() - pLeft;
                        $(".tags-input", _this.$element).css({
                            paddingLeft: Math.max(pLeft, 0),
                            paddingTop: Math.max(pTop, 0),
                            width: pWidth
                        });
                        pBottom = tagPosition != null ? tagPosition.top + tagElement.outerHeight(true) : 22;
                        return _this.$element.css({
                            paddingBottom: pBottom - _this.$element.height()
                        });
                    };
                }(this);
                this.renderTags = function(_this) {
                    return function() {
                        var tagList;
                        tagList = _this.$(".tags");
                        tagList.html("");
                        _this.input.attr("placeholder", _this.tagsArray.length === 0 ? _this.promptText : "");
                        $.each(_this.tagsArray, function(i, tag) {
                            tag = $(_this.formatTag(i, tag));
                            $("a", tag).click(_this.removeTagClicked);
                            $("a", tag).mouseover(_this.toggleCloseColor);
                            $("a", tag).mouseout(_this.toggleCloseColor);
                            if (_this.displayPopovers) {
                                _this.initializePopoverFor(tag, _this.tagsArray[i], _this.popoverArray[i]);
                            }
                            return tagList.append(tag);
                        });
                        return _this.adjustInputPosition();
                    };
                }(this);
                this.renderReadOnly = function(_this) {
                    return function() {
                        var tagList;
                        tagList = _this.$(".tags");
                        tagList.html(_this.tagsArray.length === 0 ? _this.readOnlyEmptyMessage : "");
                        return $.each(_this.tagsArray, function(i, tag) {
                            tag = $(_this.formatTag(i, tag, true));
                            if (_this.displayPopovers) {
                                _this.initializePopoverFor(tag, _this.tagsArray[i], _this.popoverArray[i]);
                            }
                            return tagList.append(tag);
                        });
                    };
                }(this);
                this.disableInput = function() {
                    return this.$("input").prop("disabled", true);
                };
                this.enableInput = function() {
                    return this.$("input").prop("disabled", false);
                };
                this.initializePopoverFor = function(_this) {
                    return function(tag, title, content) {
                        options = {
                            title: title,
                            content: content,
                            placement: "bottom"
                        };
                        if (_this.popoverTrigger === "hoverShowClickHide") {
                            $(tag).mouseover(function() {
                                $(tag).popover("show");
                                return $(".tag").not(tag).popover("hide");
                            });
                            $(document).click(function() {
                                return $(tag).popover("hide");
                            });
                        } else {
                            options.trigger = _this.popoverTrigger;
                        }
                        return $(tag).popover(options);
                    };
                }(this);
                this.toggleCloseColor = function(e) {
                    var opacity, tagAnchor;
                    tagAnchor = $(e.currentTarget);
                    opacity = tagAnchor.css("opacity");
                    opacity = opacity < .8 ? 1 : .6;
                    return tagAnchor.css({
                        opacity: opacity
                    });
                };
                this.formatTag = function(_this) {
                    return function(i, tag, isReadOnly) {
                        var escapedTag;
                        if (isReadOnly == null) {
                            isReadOnly = false;
                        }
                        escapedTag = tag.replace("<", "&lt;").replace(">", "&gt;");
                        return _this.template("tag", {
                            tag: escapedTag,
                            tagClass: _this.tagClass,
                            isPopover: _this.displayPopovers,
                            isReadOnly: isReadOnly,
                            tagSize: _this.tagSize
                        });
                    };
                }(this);
                this.addDocumentListeners = function(_this) {
                    return function() {
                        return $(document).mouseup(function(e) {
                            var container;
                            container = _this.$(".tags-suggestion-list");
                            if (container.has(e.target).length === 0) {
                                return _this.hideSuggestions();
                            }
                        });
                    };
                }(this);
                this.template = function(name, options) {
                    return Tags.Templates.Template(this.getBootstrapVersion(), name, options);
                };
                this.$ = function(selector) {
                    return $(selector, this.$element);
                };
                this.getBootstrapVersion = function() {
                    return Tags.bootstrapVersion || this.bootstrapVersion;
                };
                this.initializeDom = function() {
                    return this.$element.append(this.template("tags_container"));
                };
                this.init = function() {
                    this.$element.addClass("bootstrap-tags").addClass("bootstrap-" + this.getBootstrapVersion());
                    this.initializeDom();
                    if (this.readOnly) {
                        this.renderReadOnly();
                        this.removeTag = function() {};
                        this.removeTagClicked = function() {};
                        this.removeLastTag = function() {};
                        this.addTag = function() {};
                        this.addTagWithContent = function() {};
                        this.renameTag = function() {};
                        return this.setPopover = function() {};
                    } else {
                        this.input = $(this.template("input", {
                            tagSize: this.tagSize
                        }));
                        if (this.suggestOnClick) {
                            this.input.click(this.clickHandler);
                        }
                        this.input.keydown(this.keyDownHandler);
                        this.input.keyup(this.keyUpHandler);
                        this.$element.append(this.input);
                        this.$suggestionList = $(this.template("suggestion_list"));
                        this.$element.append(this.$suggestionList);
                        this.renderTags();
                        if (!this.canAddByMaxNum()) {
                            this.disableInput();
                        }
                        return this.addDocumentListeners();
                    }
                };
                this.init();
                return this;
            };
            return $.fn.tags = function(options) {
                var stopOn, tagsObject;
                tagsObject = {};
                stopOn = typeof options === "number" ? options : -1;
                this.each(function(i, el) {
                    var $el;
                    $el = $(el);
                    if ($el.data("tags") == null) {
                        $el.data("tags", new $.tags(this, options));
                    }
                    if (stopOn === i || i === 0) {
                        return tagsObject = $el.data("tags");
                    }
                });
                return tagsObject;
            };
        });
    }).call(this);
    (function() {
        window.Tags || (window.Tags = {});
        Tags.Helpers || (Tags.Helpers = {});
        Tags.Helpers.addPadding = function(string, amount, doPadding) {
            if (amount == null) {
                amount = 1;
            }
            if (doPadding == null) {
                doPadding = true;
            }
            if (!doPadding) {
                return string;
            }
            if (amount === 0) {
                return string;
            }
            return Tags.Helpers.addPadding("&nbsp" + string + "&nbsp", amount - 1);
        };
    }).call(this);
    (function() {
        var _base;
        window.Tags || (window.Tags = {});
        Tags.Templates || (Tags.Templates = {});
        (_base = Tags.Templates)["2"] || (_base["2"] = {});
        Tags.Templates["2"].input = function(options) {
            var tagSize;
            if (options == null) {
                options = {};
            }
            tagSize = function() {
                switch (options.tagSize) {
                  case "sm":
                    return "small";

                  case "md":
                    return "medium";

                  case "lg":
                    return "large";
                }
            }();
            return "<input type='text' class='tags-input input-" + tagSize + "' />";
        };
    }).call(this);
    (function() {
        var _base;
        window.Tags || (window.Tags = {});
        Tags.Templates || (Tags.Templates = {});
        (_base = Tags.Templates)["2"] || (_base["2"] = {});
        Tags.Templates["2"].tag = function(options) {
            if (options == null) {
                options = {};
            }
            return "<div class='tag label " + options.tagClass + " " + options.tagSize + "' " + (options.isPopover ? "rel='popover'" : "") + "> <span>" + Tags.Helpers.addPadding(options.tag, 2, options.isReadOnly) + "</span> " + (options.isReadOnly ? "" : "<a><i class='remove icon-remove-sign icon-white' /></a>") + " </div>";
        };
    }).call(this);
    (function() {
        var _base;
        window.Tags || (window.Tags = {});
        Tags.Templates || (Tags.Templates = {});
        (_base = Tags.Templates)["3"] || (_base["3"] = {});
        Tags.Templates["3"].input = function(options) {
            if (options == null) {
                options = {};
            }
            return "<input type='text' class='form-control tags-input input-" + options.tagSize + "' />";
        };
    }).call(this);
    (function() {
        var _base;
        window.Tags || (window.Tags = {});
        Tags.Templates || (Tags.Templates = {});
        (_base = Tags.Templates)["3"] || (_base["3"] = {});
        Tags.Templates["3"].tag = function(options) {
            if (options == null) {
                options = {};
            }
            return "<div class='tag label " + options.tagClass + " " + options.tagSize + "' " + (options.isPopover ? "rel='popover'" : "") + "> <span>" + Tags.Helpers.addPadding(options.tag, 2, options.isReadOnly) + "</span> " + (options.isReadOnly ? "" : "<a><i class='remove glyphicon glyphicon-remove-sign glyphicon-white' /></a>") + " </div>";
        };
    }).call(this);
    (function() {
        var _base;
        window.Tags || (window.Tags = {});
        Tags.Templates || (Tags.Templates = {});
        (_base = Tags.Templates).shared || (_base.shared = {});
        Tags.Templates.shared.suggestion_list = function(options) {
            if (options == null) {
                options = {};
            }
            return '<ul class="tags-suggestion-list dropdown-menu"></ul>';
        };
    }).call(this);
    (function() {
        var _base;
        window.Tags || (window.Tags = {});
        Tags.Templates || (Tags.Templates = {});
        (_base = Tags.Templates).shared || (_base.shared = {});
        Tags.Templates.shared.tags_container = function(options) {
            if (options == null) {
                options = {};
            }
            return '<div class="tags"></div>';
        };
    }).call(this);
    (function() {
        var _base;
        window.Tags || (window.Tags = {});
        Tags.Templates || (Tags.Templates = {});
        (_base = Tags.Templates).shared || (_base.shared = {});
        Tags.Templates.shared.tags_suggestion = function(options) {
            if (options == null) {
                options = {};
            }
            return "<li class='tags-suggestion'>" + options.suggestion + "</li>";
        };
    }).call(this);
    (function() {
        window.Tags || (window.Tags = {});
        Tags.Templates || (Tags.Templates = {});
        Tags.Templates.Template = function(version, templateName, options) {
            if (Tags.Templates[version] != null) {
                if (Tags.Templates[version][templateName] != null) {
                    return Tags.Templates[version][templateName](options);
                }
            }
            return Tags.Templates.shared[templateName](options);
        };
    }).call(this);
})(window.jQuery);