import _ from 'lodash';

export const types = {
    UPDATE_HASHRATE: "UPDATE_HASHRATE",
    UPDATE_PEERS: "UPDATE_PEERS",
    UPDATE_BLOCK_HEIGHT: "UPDATE_BLOCK_HEIGHT",
    TOGGLE_MINING: "TOGGLE_MINING",
    UPDATE_BALANCE: "UPDATE_BALANCE",
    UPDATE_CONSENSUS: "UPDATE_CONSENSUS",
    UPDATE_EXPECTED_BLOCK_REWARD: "UPDATE_EXPECTED_BLOCK_REWARD",
    UPDATE_BLOCK_REWARD: "UPDATE_BLOCK_REWARD",
    ADD_ADDRESS: "ADD_ADDRESS",
    UPDATE_MESSAGE: "UPDATE_MESSAGE",
    UPDATE_VOLATILE_WALLET: "UPDATE_VOLATILE_WALLET",
    CREATE_WALLET: "CREATE_WALLET",
    CLEAR_VOLATILE: "CLEAR_VOLATILE",
    TOGGLE_WALLET_LOCK: "TOGGLE_WALLET_LOCK",
    SET_WALLET: "SET_WALLET",
    UPDATE_THREAD_COUNT: "UPDATE_THREAD_COUNT",
    TOGGLE_RECOVER_WALLET: "TOGGLE_RECOVER_WALLET",
    TOGGLE_CREATE_WALLET: "TOGGLE_CREATE_WALLET",
    TOGGLE_IS_RUNNING_IN_ANOTHER_INSTANCE: "TOGGLE_IS_RUNNING_IN_ANOTHER_INSTANCE",
    SET_WALLETS: "SET_WALLETS",
    SET_WALLET_NAME: "SET_WALLET_NAME",
    SET_SELECTED_WALLET: "SET_SELECTED_WALLET",
    ADD_WALLET: "ADD_WALLET",
    REMOVE_WALLET: "REMOVE_WALLET",
    COMPLETE_SETUP: "COMPLETE_SETUP",
    ADD_MESSAGE: "ADD_MESSAGE",
    REMOVE_MESSAGE: "REMOVE_MESSAGE",
    SET_MINING_WALLET: "SET_MINING_WALLET",
    UPDATE_AVERAGE_BLOCKTIME: "UPDATE_AVERAGE_BLOCKTIME",
    UPDATE_LAST_BLOCKTIME: "UPDATE_LAST_BLOCKTIME",
    ADD_MINED_BLOCK: "ADD_MINED_BLOCK",
    ADD_NIM: "ADD_NIM",
    ADD_RECEIVING_TRANSACTION: "ADD_RECEIVING_TRANSACTION",
    ADD_PENDING_TRANSACTION: "ADD_PENDING_TRANSACTION",
    UPDATE_PENDING_TRANSACTION: "UPDATE_PENDING_TRANSACTION",
    UPDATE_RECIEVING_TRANSACTION: "UPDATE_RECIEVING_TRANSACTION"
};

export const initial = {
    hashRate: 0,
    globalHashRate: 0,
    targetHash: 500000,
    peers: 0,
    hashCount: 0,
    progress: 0,
    totalElapsed: 0,
    threadCount: 4,
    blockHeight: 0,
    isMining: false,
    totalHashCount: 0,
    isConsensusEstablished: false,
    balance: 0,
    expectedBlockReward: null,
    blockReward: null,
    address: null,
    message: '',
    volatileWallet: null,
    walletCreated: false,
    walletLocked: false,
    wallet: null,
    wallets: [],
    pin: null,
    showCreateWallet: false,
    showRecoverWallet: false,
    isRunningInAnother: false,
    selectedWallet: null,
    miningWallet: null,
    setupComplete: false,
    messages: [],
    averageBlockTime: null,
    lastBockTime: null,
    pendingTransaction: null,
    receivingTransaction: null
};



export default function (state = initial, action) {
    var _existingWallet, _selectedWallet, _wallets;

    switch (action.type) {
        case `${types.UPDATE_HASHRATE}`:
            return {...state, hashRate: action.payload['hashRate'], globalHashRate: action.payload['globalHashRate']};
        case `${types.UPDATE_PEERS}`:
            return {...state, peers: action.payload};
        case `${types.SET_MINING_WALLET}`:
            return {...state, miningWallet: action.payload};
        case `${types.UPDATE_AVERAGE_BLOCKTIME}`:
            return {...state, averageBlockTime: action.payload};
        case `${types.UPDATE_LAST_BLOCKTIME}`:
            return {...state, lastBlockTime: action.payload};
        case `${types.ADD_ADDRESS}`:
            return {...state, address: action.payload};
        case `${types.ADD_MESSAGE}`:
            var _messages = state.messages;
            _messages.push(action.payload)
            return {...state, messages: _messages};
        case `${types.REMOVE_MESSAGE}`:
            var _messages1 = state.messages;
            _messages1.splice(0, 1)
            return {...state, messages: _messages1};
        case `${types.SET_WALLETS}`:
            return {...state, wallets: action.payload};
        case `${types.SET_WALLET}`:
            return {...state, wallet: action.payload};
        case `${types.SET_SELECTED_WALLET}`:
            return {...state, selectedWallet: action.payload};
        case `${types.SEND_TRANSACTION}`:
            return {...state, transaction: action.payload, transactionStatus: 'sending'};
        case `${types.COMPLETE_TRANSACTION}`:
            return {...state, transaction: null, transactionStatus: 'complete'};
        case `${types.UPDATE_BLOCK_HEIGHT}`:
            return {...state, blockHeight: action.payload};
        case `${types.TOGGLE_MINING}`:
            return {...state, isMining: action.payload};
        case `${types.UPDATE_BALANCE}`:
            return {...state, balance: action.payload}
        case `${types.UPDATE_THREAD_COUNT}`:
            return {...state, threadCount: action.payload}
        case `${types.UPDATE_CONSENSUS}`:
            return {...state, isConsensusEstablished: action.payload}
        case `${types.TOGGLE_IS_RECEIVING}`:
            return {...state, isReceiving: action.payload}
        case `${types.UPDATE_VOLATILE_WALLET}`:
            return {...state, volatileWallet: action.payload}

        case `${types.UPDATE_EXPECTED_BLOCK_REWARD}`:
            return {...state, expectedBlockReward: action.payload}
        case `${types.UPDATE_BLOCK_REWARD}`:
            return {...state, blockReward: action.payload}
        case `${types.UPDATE_MESSAGE}`:
            return {...state, message: action.payload}
        case `${types.UPDATE_PENDING_TRANSACTION}`:
            return {...state, pendingTransaction: action.payload}
        case `${types.UPDATE_RECIEVING_TRANSACTION}`:
            return {...state, receivingTransaction: action.payload}
        case `${types.CREATE_WALLET}`:
            return {...state, walletCreated: true, pin: action.payload}
        case `${types.CLEAR_VOLATILE}`:
            return {...state, volatileWallet: null, pin: null}
        case `${types.TOGGLE_RECOVER_WALLET}`:
            return {...state, showRecoverWallet: action.payload}
        case `${types.TOGGLE_CREATE_WALLET}`:
            return {...state, showCreateWallet: action.payload}
        case `${types.COMPLETE_SETUP}`:
            return {...state, setupComplete: action.payload}
        case `${types.ADD_WALLET}`:
            _wallets = state.wallets;
            _wallets.push(action.payload)
            return {...state, wallets: _wallets, selectedWallet: action.payload}
        case `${types.REMOVE_WALLET}`:
            _wallets = state.wallets;
            _existingWallet = _.findIndex(_wallets, (wallet) => {
                return wallet.address === action.payload
            })
            if (_existingWallet >= 0) {
                _wallets.splice(_existingWallet, 1)
            }
            _selectedWallet = ((_existingWallet - 1) > 0 ? (_existingWallet - 1) : 0 );
            if (_wallets.length <= 0) {
                _selectedWallet = null;
            }
            return {...state, wallets: _wallets, selectedWallet: _selectedWallet}
        case `${types.SET_WALLET_NAME}`:
            _wallets = state.wallets;
            _selectedWallet = state.selectedWallet;
            _existingWallet = _.find(_wallets, (wallet) => {
                return wallet.address === action.payload.address
            })
            if (_existingWallet) {
                _existingWallet.name = action.payload.name
            }
            if (_selectedWallet.address === action.payload.address) {
                _selectedWallet.name = action.payload.name
            }
            return {...state, wallets: _wallets, selectedWallet: _selectedWallet}
        case `${types.TOGGLE_WALLET_LOCK}`:
            return {...state, walletLocked: action.payload}
        case `${types.TOGGLE_IS_RUNNING_IN_ANOTHER_INSTANCE}`:
            return {...state, isRunningInAnother: action.payload}
        case `${types.ADD_MINED_BLOCK}`:
            _wallets = state.wallets;

            _existingWallet = _.find(_wallets, (wallet) => {
                return wallet.address === action.payload.addr
            })

            if (_existingWallet) {
                _existingWallet.minedBlocks.push(action.payload.height)
            }

            return {...state, wallets: _wallets}
        case `${types.ADD_NIM}`:
            _wallets = state.wallets;

            _existingWallet = _.find(_wallets, (wallet) => {
                return wallet.address === action.payload.addr
            })

            if (_existingWallet) {
                _existingWallet.balance += action.payload.nim
            }

            return {...state, wallets: _wallets}
        case `${types.ADD_RECEIVING_TRANSACTION}`:
            _wallets = state.wallets;

            _existingWallet = _.find(_wallets, (wallet) => {
                return wallet.address === action.payload.recipient
            })

            if (_existingWallet) {
                _existingWallet.transactions.push(action.payload);
                _existingWallet.balance += action.payload.value;
            }
            return {...state, wallets: _wallets}
        case `${types.ADD_PENDING_TRANSACTION}`:
            _wallets = state.wallets;

            _existingWallet = _.find(_wallets, (wallet) => {
                return wallet.address === action.payload.sender
            })

            if (_existingWallet) {
                _existingWallet.transactions.push(action.payload);
                _existingWallet.balance -= (action.payload.value + action.payload.fee);
            }

            return {...state, wallets: _wallets}
        default:
            return state;
    }
}

export const actions = {
    updatePendingTransaction: data => ({
        type: types.UPDATE_PENDING_TRANSACTION,
        payload: data
    }),
    updateReceivingTransaction: data => ({
        type: types.UPDATE_RECIEVING_TRANSACTION,
        payload: data
    }),
    addReceivingTransaction: data => ({
        type: types.ADD_RECEIVING_TRANSACTION,
        payload: data
    }),
    addPendingTransaction: data => ({
        type: types.ADD_PENDING_TRANSACTION,
        payload: data
    }),
    addNim: data => ({
        type: types.ADD_NIM,
        payload: data
    }),
    addMinedBlock: data => ({
        type: types.ADD_MINED_BLOCK,
        payload: data
    }),
    updateAverageBlockTime: data => ({
        type: types.UPDATE_AVERAGE_BLOCKTIME,
        payload: data
    }),
    updateLastBlockTime: data => ({
        type: types.UPDATE_LAST_BLOCKTIME,
        payload: data
    }),
    setMiningWallet: data => ({
        type: types.SET_MINING_WALLET,
        payload: data
    }),
    addMessage: data => ({
        type: types.ADD_MESSAGE,
        payload: data
    }),
    removeMessage: data => ({
        type: types.REMOVE_MESSAGE,
        payload: data
    }),
    completeSetup: data => ({
        type: types.COMPLETE_SETUP,
        payload: data
    }),
    removeWallet: data => ({
        type: types.REMOVE_WALLET,
        payload: data
    }),
    addWallet: data => ({
        type: types.ADD_WALLET,
        payload: data
    }),
    setSelectedWallet: data => ({
        type: types.SET_SELECTED_WALLET,
        payload: data
    }),
    toggleRecoverWallet: data => ({
        type: types.TOGGLE_RECOVER_WALLET,
        payload: data
    }),
    toggleCreateWallet: data => ({
        type: types.TOGGLE_CREATE_WALLET,
        payload: data
    }),
    updateThreadCount: data => ({
        type: types.UPDATE_THREAD_COUNT,
        payload: data
    }),
    setWallet: data => ({
        type: types.SET_WALLET,
        payload: data
    }),
    setWallets: data => ({
        type: types.SET_WALLETS,
        payload: data
    }),
    setWalletName: data => ({
        type: types.SET_WALLET_NAME,
        payload: data
    }),
    toggleWalletLock: (isLocked) => ({
        type: types.TOGGLE_WALLET_LOCK,
        payload: isLocked
    }),
    clearVolatile: () => ({
        type: types.CLEAR_VOLATILE,
        payload: true
    }),
    updateMessage: data => ({
        type: types.UPDATE_MESSAGE,
        payload: data
    }),
    updateAddress: data => ({
        type: types.ADD_ADDRESS,
        payload: data
    }),
    updateBlockReward: data => ({
        type: types.UPDATE_BLOCK_REWARD,
        payload: data
    }),
    updateExpectedBlockReward: data => ({
        type: types.UPDATE_EXPECTED_BLOCK_REWARD,
        payload: data
    }),
    updatePendingTransaction: data => ({
        type: types.UPDATE_PENDING_TRANSACTION,
        payload: data
    }),
    updateTransaction: data => ({
        type: types.UPDATE_TRANSACTION,
        payload: data
    }),
    updateHashRate: data => ({
        type: types.UPDATE_HASHRATE,
        payload: data
    }),
    toggleMining: data => ({
        type: types.TOGGLE_MINING,
        payload: data
    }),
    updateBlockHeight: data => ({
        type: types.UPDATE_BLOCK_HEIGHT,
        payload: data
    }),
    updatePeers: _peers => ({
        type: types.UPDATE_PEERS,
        payload: _peers
    }),
    updateBalance: data => ({
        type: types.UPDATE_BALANCE,
        payload: data
    }),
    updateConsensus: data => ({
        type: types.UPDATE_CONSENSUS,
        payload: data
    }),
    updateVolatileWallet: data => ({
        type: types.UPDATE_VOLATILE_WALLET,
        payload: data
    }),
    createWallet: (pin) => ({
        type: types.CREATE_WALLET,
        payload: pin
    }),
    toggleIsRunningInAnotherInstance: (boolean) => ({
        type: types.TOGGLE_IS_RUNNING_IN_ANOTHER_INSTANCE,
        payload: boolean
    })
};
