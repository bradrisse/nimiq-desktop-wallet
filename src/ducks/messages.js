export const types = {
    UPDATE_MESSAGE: "UPDATE_MESSAGE",
    ADD_MESSAGE: "ADD_MESSAGE",
    REMOVE_MESSAGE: "REMOVE_MESSAGE"
};

export const initial = {
    message: '',
    messages: []
};

export default function (state = initial, action) {
    switch (action.type) {
        case `${types.ADD_MESSAGE}`:
            var _messages = state.messages;
            _messages.push(action.payload)
            return {...state, messages: _messages};
        case `${types.REMOVE_MESSAGE}`:
            var _messages1 = state.messages;
            _messages1.splice(0, 1)
            return {...state, messages: _messages1};
        case `${types.UPDATE_MESSAGE}`:
            return {...state, message: action.payload}
        default:
            return state;
    }
}

export const actions = {
    addMessage: data => ({
        type: types.ADD_MESSAGE,
        payload: data
    }),
    removeMessage: data => ({
        type: types.REMOVE_MESSAGE,
        payload: data
    }),
    updateMessage: data => ({
        type: types.UPDATE_MESSAGE,
        payload: data
    })
};
