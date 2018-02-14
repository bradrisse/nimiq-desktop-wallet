import '../assets/css/App.css';
import React, { Component } from 'react';
import {connect} from "react-redux";
import {bindActionCreators} from "redux";
import {actions as nimiqActions} from "./ducks/nimiq";
import Drawer from './Drawer';
import Loading from './Loading';
import FullHeight from './FullHeight';
import _ from 'lodash';


const $ = {};

class App extends React.Component {

    state = {
        clientType: "light",
        _pendingElapsed: 0,
        _pendingInterval: null,
        _receivingElapsed: 0,
        _receivingInterval: null,
        isReceiving: false,
        soundToPlay: "",
        isPlaying: false,
        walletCreated: false,
        walletLocked: false,
        mute: true
    };

    componentWillMount() {
        this._startInstance();
    }

    componentWillReceiveProps(nextProps) {
        if (nextProps.nimiq.isMining !== this.props.nimiq.isMining) {
            if (nextProps.nimiq.isMining) {
                $.miner.startWork();
            }

            if (!nextProps.nimiq.isMining) {
                $.miner.stopWork();
            }
        }

        if (nextProps.nimiq.walletCreated && !this.state.walletCreated) {
            this.setState(
                {
                    walletCreated: true
                },
                () => {
                    this._startInstance();
                }
            );
        }

        if (nextProps.nimiq.walletLocked && !this.state.walletLocked) {
            this.setState(
                {
                    walletLocked: true
                },
                () => {
                    console.log("locking wallet");
                    // $.wallet.lock('secret').then(() => {
                    //     $.wallet.persist();
                    //     $.miner.stopWork();
                    // });
                }
            );
        }
    }

    _onConsensusEstablished() {
        const {nimiqActions} = this.props;
        console.log("Consensus Established...");
        nimiqActions.updateMessage("Consensus Established...");
        nimiqActions.updateConsensus(true);
        //nimiqActions.updateAddress($.wallet.address.toUserFriendlyAddress());
        this._updateBalance();

        $.blockchain.on("head-changed", this._updateBalance);
        this.props.nimiqActions.updateBlockHeight($.blockchain.height);
        nimiqActions.updateBlockReward(window.Nimiq.Policy.blockRewardAt($.blockchain.height));

        // $.miner.startWork();
    }

    _updateBalance = () => {
        if (this.state.clientType !== "nano") {
            // console.log("$.wallet.address ", $.wallet.address.toUserFriendlyAddress());
            //
            // $.accounts.get($.wallet.address).then(account => this._onBalanceChanged(account));
        } else {
            // $.consensus.getAccount($.wallet.address).then(account => this._onBalanceChanged(account));
        }
    };

    _onBalanceChanged(account) {
        account = account || window.Nimiq.BasicAccount.INITIAL;
        const balance = window.Nimiq.Policy.satoshisToCoins(account.balance).toFixed(2);
        this.props.nimiqActions.updateBalance(balance);
    }

    _onHeadChanged = () => {
        const height = $.blockchain.height;
        console.log('head changed ', height)
        const globalHashRate = this._getGlobalHashrate();
        this.props.nimiqActions.updateHashRate({
            hashRate: this._setHashrate($.miner.hashrate),
            globalHashRate: globalHashRate
        });
        this.props.nimiqActions.updateBlockHeight(height);
    };

    _getGlobalHashrate = (raw = false) => {
        const nBits = $.blockchain.head.header.nBits;
        const difficulty = window.Nimiq.BlockUtils.compactToDifficulty(nBits);
        if (raw) {
            return difficulty * Math.pow(2, 16) / window.Nimiq.Policy.BLOCK_TIME;
        } else {
            return this._setHashrate(difficulty * Math.pow(2, 16) / window.Nimiq.Policy.BLOCK_TIME);
        }
    };

    _setHashrate(hashrate) {
        let steps = ["k", "M", "G", "T", "P", "E"]; // kilo, mega, giga, tera, peta, exa
        let prefix = "";
        for (let i = 0, step; (step = steps[i]); ++i) {
            if (hashrate / 1000 < 1) {
                break;
            } else {
                hashrate /= 1000;
                prefix = step;
            }
        }
        let unit = prefix + "H/s";
        return hashrate.toFixed(2) + " " + unit;
    }

    _pendingTransactionConfirmed = () => {
        console.log('_pendingTransactionConfirmed >>> ')
        if (_pendingInterval) {
            clearInterval(_pendingInterval);
        }
        this.props.nimiqActions.updatePendingTransaction({tx: null, isSending: false});
        this.props.nimiqActions.updateTransaction({estimatedTime: null});

        this.setState({
            isSending: false
        })
    }

    _onPeersChanged = () => {
        this.props.nimiqActions.updatePeers($.network.peerCount);
    };

    _onMinerStarted = () => {
        this.props.nimiqActions.updateMessage("");
        this.props.nimiqActions.toggleMining(true);
    };

    _onMinerStopped = () => {
        this.props.nimiqActions.toggleMining(false);
    };

    _onBlockMined = block => {
        this.setState({
            soundToPlay: BlockMinedSound,
            isPlaying: true
        });
    };

    _onHashrateChanged() {
        this._onExpectedHashTimeChanged();
    }

    _onExpectedHashTimeChanged() {
        const globalHashRate = this._getGlobalHashrate(true);
        const myWinProbability = $.miner.hashrate / globalHashRate;
        this.props.nimiqActions.updateHashRate({
            hashRate: this._setHashrate($.miner.hashrate),
            globalHashRate: this._setHashrate(globalHashRate)
        });
        const expectedHashTime = 1 / myWinProbability * window.Nimiq.Policy.BLOCK_TIME;
        this.props.nimiqActions.updateExpectedBlockReward(expectedHashTime);
    }

    _onConsensusSyncing() {
        this.props.nimiqActions.updateMessage("Synchronizing...");
    }

    _updateSyncProgress(state) {
        console.log('_updateSyncProgress ', state)
        //if (!$.consensus.established) {
            var msg = "";
            switch (state) {
                case "sync-chain-proof":
                    msg = "Downloading chain...";
                    break;
                case "verify-chain-proof":
                    msg = "Verifying chain...";
                    break;
                case "sync-accounts-tree":
                    msg = "Downloading Accounts...";
                    break;
                case "verify-accounts-tree":
                    msg = "Verifying Accounts...";
                    break;
                case "sync-finalize":
                    msg = "Synchronization Complete";
                    break;
                default:
                    msg = "Connecting";
                    break;
            }
            this.props.nimiqActions.updateMessage(msg);
        //}
    }

    _onTxsProcessed = () => {
        console.log('_onTxsProcessed >>>')
        const { nimiq } = this.props;
        if (nimiq.pendingTransaction) {
            nimiq.pendingTransaction.hash().then(hash => {
                if (!$.mempool.getTransaction(hash)) {
                    this._pendingTransactionConfirmed();
                }
            });
        }

        if (nimiq.receivingTransaction) {
            nimiq.receivingTransaction.hash().then(hash => {
                if (!$.mempool.getTransaction(hash)) {
                    this._receivingTransactionConfirmed();
                }
            });
        }
    };

    addAccount(address) {
        console.log('addAccount ', address)
        $.miner = new Nimiq.Miner($.blockchain, $.accounts, $.mempool, $.network.time, address);
    }

    _addWallet() {
        let wallet;
        Nimiq.Wallet.generate()
            .then(wlt => {
                wallet = wlt;
                console.log('wallet', wallet)
                return $.walletStore.put(wallet);
            })
            .then(() => $.walletStore.list())
            .then(walletAddresses => {
                if (walletAddresses.length === 1) {
                    // the newly created wallet is the only one, make it the default
                    return this.$.walletStore.setDefault(wallet.address);
                }
                return Promise.resolve();
            })
            .then(() => this.addAccount(wallet.address));
    }

  // init() {
  //     const {nimiq, nimiqActions} = this.props;
  //     nimiqActions.updateMessage("Connecting...");
  //
  //     let self = this;
  //
  //     window.Nimiq.init(
  //         async function () {
  //             window.$ = $;
  //             $.consensus = await window.Nimiq.Consensus.full();
  //
  //             console.log('$.consensus ', $.consensus)
  //
  //             $.blockchain = $.consensus.blockchain;
  //             $.mempool = $.consensus.mempool;
  //             $.network = $.consensus.network;
  //
  //             var _hasWallet = $.walletStore.hasDefault().then(hasDefault => {
  //                 if (!hasDefault) return Promise.resolve();
  //                 return this.$.walletStore.getDefault().then(wallet => this._selectAddressWithoutWaiting(wallet.address));
  //             });
  //             console.log("_hasWallet ", _hasWallet);
  //
  //             if (_hasWallet || nimiq.wallet) {
  //                 if (_hasWallet) {
  //                     $.wallet = await window.Nimiq.WalletStore.getDefault();
  //                 }
  //
  //                 // if (!nimiq.wallet) {
  //                 //     self.props.nimiqActions.setWallet(window.$.wallet);
  //                 // }
  //                 //
  //                 // console.log("isLocked ", $.wallet.isLocked);
  //                 // if ($.wallet.isLocked) {
  //                 //     self.props.nimiqActions.toggleWalletLock(true);
  //                 // } else {
  //                 //     self.props.nimiqActions.toggleWalletLock(false);
  //                 // }
  //                 //
  //                 // if (self.state.clientType !== "nano") {
  //                 //     // the nano client does not sync the full account info and can not mine.
  //                 //     $.accounts = $.blockchain.accounts;
  //                 //     $.miner = new window.Nimiq.Miner($.blockchain, $.mempool, $.wallet.address);
  //                 // }
  //                 //
  //                 // console.log("miner", $.miner);
  //                 // if ($.miner._blockchain) {
  //                 //     console.log($.miner._blockchain.height);
  //                 //     self.props.nimiqActions.updateBlockHeight($.miner._blockchain.height);
  //                 // }
  //                 //
  //                 // // Put the object into storage
  //                 // if (window.localStorage.getItem("threadCount")) {
  //                 //     console.log("thread count exists");
  //                 //     self.props.nimiqActions.updateThreadCount(window.localStorage.getItem("threadCount"));
  //                 // } else {
  //                 //     console.log("thread count does not exists");
  //                 //     var threadCount = navigator.hardwareConcurrency / 2 || 4;
  //                 //     self.props.nimiqActions.updateThreadCount(threadCount);
  //                 //     $.miner.threads = threadCount;
  //                 //     window.localStorage.setItem("threadCount", threadCount.toString());
  //                 // }
  //
  //                 $.consensus.on("established", () => self._onConsensusEstablished());
  //                 $.consensus.on("lost", () => console.error("Consensus lost"));
  //                 $.consensus.on("sync-chain-proof", () => self._updateSyncProgress("sync-chain-proof"));
  //                 $.consensus.on("verify-chain-proof", () => self._updateSyncProgress("verify-chain-proof"));
  //                 $.consensus.on("sync-accounts-tree", () => self._updateSyncProgress("sync-accounts-tree"));
  //                 $.consensus.on("verify-accounts-tree", () => self._updateSyncProgress("verify-accounts-tree"));
  //                 $.consensus.on("sync-finalize", () => self._updateSyncProgress("sync-finalize"));
  //
  //                 $.blockchain.on("head-changed", () => self._onHeadChanged());
  //                 $.network.on("peers-changed", () => self._onPeersChanged());
  //
  //                 // $.miner.on("start", () => self._onMinerStarted());
  //                 // $.miner.on("stop", () => self._onMinerStopped());
  //                 // $.miner.on("block-mined", block => self._onBlockMined(block));
  //                 // $.miner.on("hashrate-changed", () => self._onHashrateChanged());
  //
  //                 // $.mempool.on("transaction-added", tx => self._onTxReceived(tx));
  //                 // $.mempool.on("transactions-ready", () => self._onTxsProcessed());
  //                 $.consensus.on("syncing", () => self._onConsensusSyncing());
  //
  //                 $.network.connect();
  //             } else {
  //                 nimiqActions.updateMessage("Create or Load a Wallet");
  //
  //                 const wallet = await window.Nimiq.Wallet.createVolatile();
  //                 //const wallet2 = await Wallet.load(wallet.exportPlain());
  //                 console.log("address ", wallet.address.toUserFriendlyAddress());
  //                 console.log("seed ", wallet.dump());
  //
  //                 nimiqActions.updateVolatileWallet({
  //                     address: wallet.address.toUserFriendlyAddress(),
  //                     seed: wallet.dump()
  //                 });
  //             }
  //         },
  //         function (code) {
  //             switch (code) {
  //                 case window.Nimiq.ERR_WAIT:
  //                     console.error("Error: Already open in another tab or window.");
  //                     break;
  //                 case window.Nimiq.ERR_UNSUPPORTED:
  //                     console.error("Error: Browser not supported");
  //                     break;
  //                 default:
  //                     console.error("Error: Nimiq initialization error");
  //                     break;
  //             }
  //         }
  //     );
  // }

    setAddresses = (addresses) => {
        let self = this;
        var _addressPromises = [];
        var wallets = JSON.parse(localStorage.getItem('wallets'));
        _.each(addresses, (address) => {
            var existingWallet = _.find(wallets, (wallet) => {
                return wallet.address === address.toUserFriendlyAddress()
            })
            console.log('existingWallet ', existingWallet)
            _addressPromises.push($.accounts.get(address).then((_account) => {
                var _account = {
                    name: existingWallet ? existingWallet.name : '',
                    address: address.toUserFriendlyAddress(),
                    balance: Nimiq.Policy.satoshisToCoins(_account.balance),
                    transactions: []
                }
                return $.blockchain.getTransactionReceiptsByAddress(address).then((transactions) => {
                    if (transactions.length > 0) {
                        _.each(transactions, (transaction) => {
                            $.consensus.blockchain.getBlock(transaction.blockHash).then((block) => {
                                console.log('block ', block)
                                _.each(block.body.transactions, (transaction) => {
                                    var _recipient = transaction.recipient.toUserFriendlyAddress();
                                    var _sender = transaction.sender.toUserFriendlyAddress();
                                    var currentAddress = address.toUserFriendlyAddress();
                                    if (_recipient === currentAddress || _sender === currentAddress) {
                                        _account.transactions.push( {
                                            sender: _sender,
                                            recipient: _recipient,
                                            value: Nimiq.Policy.satoshisToCoins(transaction.value),
                                            fee: Nimiq.Policy.satoshisToCoins(transaction.fee),
                                            data: Nimiq.BufferUtils.toHex(transaction.data),
                                            blockHeight: block.height,
                                            hash: transaction.hash().toHex(),
                                            timestamp: block.timestamp
                                        })
                                    }
                                })
                            })
                        })

                        return _account;
                    } else {
                        return _account;
                    }
                })

            }))
        })

        Promise.all(_addressPromises).then(promiseResults => {
            self.props.nimiqActions.setWallets(promiseResults)
            self.props.nimiqActions.setSelectedWallet(promiseResults[0])
        })

    }

    _startInstance() {
        let self = this;
        return new Promise(resolve => {
            Nimiq.init(() => {
                $.clientType = this.clientType;
                Promise.all([
                    Nimiq.Consensus['full'](),
                    new Nimiq.WalletStore()
                ]).then(promiseResults => {
                    $.consensus = promiseResults[0];

                    // XXX Legacy API
                    $.blockchain = $.consensus.blockchain;
                    $.mempool = $.consensus.mempool;
                    $.network = $.consensus.network;

                    $.accounts = $.blockchain.accounts;

                    $.walletStore = promiseResults[1];
                    $.network.connect();

                    $.walletStore.list().then(addresses => {
                        this.setAddresses(addresses)
                    });

                    $.walletStore.hasDefault().then(hasDefault => {
                        console.log('hasDefault ', hasDefault)
                        if (hasDefault) {
                            this.$.walletStore.getDefault().then(defaultWallet => {
                                //this._setAddress(defaultWallet.address);
                                //this.$addressInput.setAttribute('placeholder', defaultWallet.address.toUserFriendlyAddress());
                            });
                        } else {
                            this._addWallet();
                        }
                    });

                    $.consensus.on("established", () => this._onConsensusEstablished());
                    $.consensus.on("lost", () => this.props.nimiqActions.updateConsensus(false));
                    // $.consensus.on("sync-chain-proof", () => this._updateSyncProgress("sync-chain-proof"));
                    // $.consensus.on("verify-chain-proof", () => this._updateSyncProgress("verify-chain-proof"));
                    // $.consensus.on("sync-accounts-tree", () => this._updateSyncProgress("sync-accounts-tree"));
                    // $.consensus.on("verify-accounts-tree", () => this._updateSyncProgress("verify-accounts-tree"));
                    // $.consensus.on("sync-finalize", () => this._updateSyncProgress("sync-finalize"));

                    $.blockchain.on("head-changed", () => this._onHeadChanged());

                    resolve($);
                });
            }, function(code) {
                switch (code) {
                    case Nimiq.ERR_WAIT:
                        console.log('error wait')
                        break;
                    case Nimiq.ERR_UNSUPPORTED:
                        alert('Browser not supported');
                        break;
                    default:
                        alert('Nimiq initialization error');
                        break;
                }
            });
        });
    }

  render() {
      const {nimiq} = this.props
    return (
      <FullHeight>
          {!nimiq.isConsensusEstablished && <Loading /> }
          {nimiq.isConsensusEstablished && <Drawer /> }
      </FullHeight>
    );
  }
}

function mapStateToProps(state) {
    return {
        nimiq: state.nimiq
    };
}

function mapPropsToDispatch(dispatch) {
    return {
        nimiqActions: bindActionCreators(nimiqActions, dispatch)
    };
}

export default connect(mapStateToProps, mapPropsToDispatch)(App);
