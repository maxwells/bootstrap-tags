class Events
  on: (eventName, callback, context = window) ->
    @callbacks ||= {}
    @callbacks[eventName] ||= []
    @callbacks[eventName].push
      callback: callback
      context: context

  off: (eventName, callback) ->
    @callbacks ||= {}
    @callbacks[eventName] ||= []
    indicesToDelete = []
    for callbackObject, i in @callbacks[eventName]
      indicesToDelete.unshift i if callback == callbackObject.callback
    for i in indicesToDelete
      @callbacks[eventName].splice i, 1

  trigger: (eventName) ->
    args = Array.prototype.slice.call(arguments, 1)
    @callbacks ||= {}
    @callbacks[eventName] ||= []
    for callbackObject in @callbacks[eventName]
      callbackObject.callback.apply(callbackObject.context, args)

window.Events = Events