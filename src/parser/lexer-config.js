module.exports = function (deps) {
    return {
        ignore: /\s+/,
        creators: [{
            regexp: /\w+/,
            transform: deps.sets,
            type: 'set'
        }, {
            regexp: /[\(\[\{][\w.,\s-+]+[\)\]\}](\s*U\s*[\(\[\{][\w.,\s-+]+[\)\]\}])*/,
            transform: function (key) {
                return new deps.RealSet(key)
            },
            type: 'set'
        }, {
            regexp: /\d+/,
            transform: parseInt,
            type: 'number'
        }, {
            regexp: /[x()^]/
        }]
    }
}
