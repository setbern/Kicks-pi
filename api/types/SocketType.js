var g = require('./graphql');

var SocketType = module.exports = new g.GraphQLInputObjectType({
    name: 'SocketType',
    description: 'Type for socket status',
    fields: function(model) {
        return {
            light: model.attr({

                type: new GraphQLNonNull(g.GraphQLLong)
            }),
            status: model.attr({
                type: new GraphQLNonNull(g.GraphQLBoolean)
            })
        };
    }
});