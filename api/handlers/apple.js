

var x = module.exports = {
    
    handleWebHook: function(req, res) {
        console.log('handleWebHook')
        console.log(req.body)
        const eventData = JSON.parse(req.body)
        console.log(eventData);
        response.send(200);
    },
    
};