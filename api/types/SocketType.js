var g = require('./graphql');

var SocketType = module.exports = new g.GraphQLInputObjectType({
    name: 'SocketType',
    description: 'Type for socket status',
    fields: function(model) {
        return {
            light:{
                type: new g.GraphQLNonNull(g.GraphQLLong)
            },
            status:{
                type: new g.GraphQLNonNull(g.GraphQLBoolean)
            }
        };
    }
});