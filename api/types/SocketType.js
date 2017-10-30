var g = require('./graphql');

var SocketType = module.exports = new g.GraphQLObjectType({
    name: 'SocketType',
    description: 'Type for socket status',
    fields: function(model) {
        return {
            light: model.attr({
                type: g.GraphQLLong
            }),
            status: model.attr({
                type: g.GraphQLBoolean
            })
        };
    }
});