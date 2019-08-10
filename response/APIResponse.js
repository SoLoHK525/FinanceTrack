class APIResponse {
    constructor(payload){
        payload = typeof(payload) === 'undefined' ? true : payload;
        return {
            success: true,
            data: payload,
            server_time: new Date()
        };
    }
}

module.exports = APIResponse;