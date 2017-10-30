var apiModules = require('./modules');
var models = require('./models');
var types = require('./types');
var kick = require('./api/handlers/kick');

var g = types.graphql;

var apiSchema = new g.GraphQLSchema(
    {
        mutation: new g.GraphQLObjectType({
            name: 'RootMutationType',

            description: 'Endpoints with POST, PUT, and DELETE functionality go here',

            fields: {
                executeRoute: {
                    args: {
                        requiredArgument: {
                            description: 'This argument is required to execute this route',
                            type: new g.GraphQLNonNull(g.GraphQLString)
                        },
                        optionalArgument: {
                            description: 'This argument is not necessary. Be sure to handle null cases.',
                            type: g.GraphQLString
                        }
                    },

                    description: 'A sample mutation route executed. Whenever possible, name mutation routes as a grammatical combination of action verb and direct object. (ex: confirmOrder, sendInvoice, registerCustomer) ',

                    type: g.GraphQLString,

                    resolve: function(root, args) {
                        return apiModules.sampleModule.publicFunction1(args);
                    }
                }
            }
        }),

        query: new g.GraphQLObjectType({
            name: 'RootQueryType',

            description: 'Endpoints with GET functionality go here',

            fields: {
                toggleLights:  {
                    type: g.GraphQLString,
                    description: 'Toggle the state of any of the lights',
                    args: {
                        socket: {
                            description: 'Array of Socket types to toggle lights with',
                            type:  new g.GraphQLNonNull(g.GraphQLList(types.SocketType)),
                        }
                    },
                    resolve: function(root, args) {
                        return kick.toggleLights(args);
                    }
                },
                
                sampleModels: {
                    type: new g.GraphQLList(types.SampleModelType),
                    description: 'Same as the above query, but returns an array of objects',
                    args: {
                        property: {
                            description: 'If multiple data models match the same specified property, they will all be returned in an array',
                            type: g.GraphQLString
                        }
                    },

                    resolve: function(root, args) {
                        return apiModules.sampleModule.publicFunction3(args);
                    }
                }
            }
        })
    }
);

module.exports = apiSchema;