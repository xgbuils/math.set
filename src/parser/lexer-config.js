const RealSet = require('math.real-set')

module.exports = function (sets) {
    return {
        ignore: /\s+/,
        creators: [{
            regexp: /\w+/,
            transform: sets,
            type: 'set'
        }, {
            regexp: /[\(\[\{][\w.,\s-+]+[\)\]\}](\s*U\s*[\(\[\{][\w.,\s-+]+[\)\]\}])*/,
            transform: function (key) {
                return new RealSet(key)
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
