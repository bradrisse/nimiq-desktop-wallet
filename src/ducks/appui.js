export const types = {
    SET_WALLET_TAB: "SET_WALLET_TAB"
};

export const initial = {
    walletTab: 0
};

export default function (state = initial, action) {
    switch (action.type) {
        case `${types.SET_WALLET_TAB}`:
            return {...state, walletTab: action.payload};
        default:
            return state;
    }
}

export const actions = {
    setWalletTab: data => ({
        type: types.SET_WALLET_TAB,
        payload: data
    })
};
