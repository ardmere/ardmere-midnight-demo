import * as __compactRuntime from '@midnight-ntwrk/compact-runtime';
__compactRuntime.checkRuntimeVersion('0.16.0');

const _descriptor_0 = new __compactRuntime.CompactTypeBytes(32);

const _descriptor_1 = new __compactRuntime.CompactTypeUnsignedInteger(340282366920938463463374607431768211455n, 16);

class _MstNode_0 {
  alignment() {
    return _descriptor_0.alignment().concat(_descriptor_1.alignment().concat(_descriptor_1.alignment().concat(_descriptor_1.alignment().concat(_descriptor_1.alignment().concat(_descriptor_1.alignment().concat(_descriptor_1.alignment()))))));
  }
  fromValue(value_0) {
    return {
      hash: _descriptor_0.fromValue(value_0),
      btcPosSum: _descriptor_1.fromValue(value_0),
      btcNegSum: _descriptor_1.fromValue(value_0),
      ethPosSum: _descriptor_1.fromValue(value_0),
      ethNegSum: _descriptor_1.fromValue(value_0),
      usdtPosSum: _descriptor_1.fromValue(value_0),
      usdtNegSum: _descriptor_1.fromValue(value_0)
    }
  }
  toValue(value_0) {
    return _descriptor_0.toValue(value_0.hash).concat(_descriptor_1.toValue(value_0.btcPosSum).concat(_descriptor_1.toValue(value_0.btcNegSum).concat(_descriptor_1.toValue(value_0.ethPosSum).concat(_descriptor_1.toValue(value_0.ethNegSum).concat(_descriptor_1.toValue(value_0.usdtPosSum).concat(_descriptor_1.toValue(value_0.usdtNegSum)))))));
  }
}

const _descriptor_2 = new _MstNode_0();

const _descriptor_3 = new __compactRuntime.CompactTypeVector(64, _descriptor_0);

const _descriptor_4 = new __compactRuntime.CompactTypeUnsignedInteger(18446744073709551615n, 8);

const _descriptor_5 = new __compactRuntime.CompactTypeVector(64, _descriptor_4);

class _LeafPreimage_0 {
  alignment() {
    return _descriptor_0.alignment().concat(_descriptor_0.alignment().concat(_descriptor_4.alignment().concat(_descriptor_4.alignment().concat(_descriptor_4.alignment().concat(_descriptor_4.alignment().concat(_descriptor_4.alignment().concat(_descriptor_4.alignment())))))));
  }
  fromValue(value_0) {
    return {
      domain: _descriptor_0.fromValue(value_0),
      userIdHash: _descriptor_0.fromValue(value_0),
      btcPos: _descriptor_4.fromValue(value_0),
      btcNeg: _descriptor_4.fromValue(value_0),
      ethPos: _descriptor_4.fromValue(value_0),
      ethNeg: _descriptor_4.fromValue(value_0),
      usdtPos: _descriptor_4.fromValue(value_0),
      usdtNeg: _descriptor_4.fromValue(value_0)
    }
  }
  toValue(value_0) {
    return _descriptor_0.toValue(value_0.domain).concat(_descriptor_0.toValue(value_0.userIdHash).concat(_descriptor_4.toValue(value_0.btcPos).concat(_descriptor_4.toValue(value_0.btcNeg).concat(_descriptor_4.toValue(value_0.ethPos).concat(_descriptor_4.toValue(value_0.ethNeg).concat(_descriptor_4.toValue(value_0.usdtPos).concat(_descriptor_4.toValue(value_0.usdtNeg))))))));
  }
}

const _descriptor_6 = new _LeafPreimage_0();

class _ParentPreimage_0 {
  alignment() {
    return _descriptor_0.alignment().concat(_descriptor_0.alignment().concat(_descriptor_0.alignment().concat(_descriptor_1.alignment().concat(_descriptor_1.alignment().concat(_descriptor_1.alignment().concat(_descriptor_1.alignment().concat(_descriptor_1.alignment().concat(_descriptor_1.alignment()))))))));
  }
  fromValue(value_0) {
    return {
      domain: _descriptor_0.fromValue(value_0),
      leftHash: _descriptor_0.fromValue(value_0),
      rightHash: _descriptor_0.fromValue(value_0),
      btcPosSum: _descriptor_1.fromValue(value_0),
      btcNegSum: _descriptor_1.fromValue(value_0),
      ethPosSum: _descriptor_1.fromValue(value_0),
      ethNegSum: _descriptor_1.fromValue(value_0),
      usdtPosSum: _descriptor_1.fromValue(value_0),
      usdtNegSum: _descriptor_1.fromValue(value_0)
    }
  }
  toValue(value_0) {
    return _descriptor_0.toValue(value_0.domain).concat(_descriptor_0.toValue(value_0.leftHash).concat(_descriptor_0.toValue(value_0.rightHash).concat(_descriptor_1.toValue(value_0.btcPosSum).concat(_descriptor_1.toValue(value_0.btcNegSum).concat(_descriptor_1.toValue(value_0.ethPosSum).concat(_descriptor_1.toValue(value_0.ethNegSum).concat(_descriptor_1.toValue(value_0.usdtPosSum).concat(_descriptor_1.toValue(value_0.usdtNegSum)))))))));
  }
}

const _descriptor_7 = new _ParentPreimage_0();

const _descriptor_8 = __compactRuntime.CompactTypeBoolean;

class _Either_0 {
  alignment() {
    return _descriptor_8.alignment().concat(_descriptor_0.alignment().concat(_descriptor_0.alignment()));
  }
  fromValue(value_0) {
    return {
      is_left: _descriptor_8.fromValue(value_0),
      left: _descriptor_0.fromValue(value_0),
      right: _descriptor_0.fromValue(value_0)
    }
  }
  toValue(value_0) {
    return _descriptor_8.toValue(value_0.is_left).concat(_descriptor_0.toValue(value_0.left).concat(_descriptor_0.toValue(value_0.right)));
  }
}

const _descriptor_9 = new _Either_0();

class _ContractAddress_0 {
  alignment() {
    return _descriptor_0.alignment();
  }
  fromValue(value_0) {
    return {
      bytes: _descriptor_0.fromValue(value_0)
    }
  }
  toValue(value_0) {
    return _descriptor_0.toValue(value_0.bytes);
  }
}

const _descriptor_10 = new _ContractAddress_0();

const _descriptor_11 = new __compactRuntime.CompactTypeUnsignedInteger(255n, 1);

export class Contract {
  witnesses;
  constructor(...args_0) {
    if (args_0.length !== 1) {
      throw new __compactRuntime.CompactError(`Contract constructor: expected 1 argument, received ${args_0.length}`);
    }
    const witnesses_0 = args_0[0];
    if (typeof(witnesses_0) !== 'object') {
      throw new __compactRuntime.CompactError('first (witnesses) argument to Contract constructor is not an object');
    }
    this.witnesses = witnesses_0;
    this.circuits = {
      leafHash(context, ...args_1) {
        return { result: pureCircuits.leafHash(...args_1), context };
      },
      parentHash(context, ...args_1) {
        return { result: pureCircuits.parentHash(...args_1), context };
      },
      mstRootFromLeaves(context, ...args_1) {
        return { result: pureCircuits.mstRootFromLeaves(...args_1), context };
      }
    };
    this.impureCircuits = {};
    this.provableCircuits = {};
  }
  initialState(...args_0) {
    if (args_0.length !== 1) {
      throw new __compactRuntime.CompactError(`Contract state constructor: expected 1 argument (as invoked from Typescript), received ${args_0.length}`);
    }
    const constructorContext_0 = args_0[0];
    if (typeof(constructorContext_0) !== 'object') {
      throw new __compactRuntime.CompactError(`Contract state constructor: expected 'constructorContext' in argument 1 (as invoked from Typescript) to be an object`);
    }
    if (!('initialZswapLocalState' in constructorContext_0)) {
      throw new __compactRuntime.CompactError(`Contract state constructor: expected 'initialZswapLocalState' in argument 1 (as invoked from Typescript)`);
    }
    if (typeof(constructorContext_0.initialZswapLocalState) !== 'object') {
      throw new __compactRuntime.CompactError(`Contract state constructor: expected 'initialZswapLocalState' in argument 1 (as invoked from Typescript) to be an object`);
    }
    const state_0 = new __compactRuntime.ContractState();
    let stateValue_0 = __compactRuntime.StateValue.newArray();
    state_0.data = new __compactRuntime.ChargedState(stateValue_0);
    const context = __compactRuntime.createCircuitContext(__compactRuntime.dummyContractAddress(), constructorContext_0.initialZswapLocalState.coinPublicKey, state_0.data, constructorContext_0.initialPrivateState);
    const partialProofData = {
      input: { value: [], alignment: [] },
      output: undefined,
      publicTranscript: [],
      privateTranscriptOutputs: []
    };
    state_0.data = new __compactRuntime.ChargedState(context.currentQueryContext.state.state);
    return {
      currentContractState: state_0,
      currentPrivateState: context.currentPrivateState,
      currentZswapLocalState: context.currentZswapLocalState
    }
  }
  _persistentHash_0(value_0) {
    const result_0 = __compactRuntime.persistentHash(_descriptor_7, value_0);
    return result_0;
  }
  _persistentHash_1(value_0) {
    const result_0 = __compactRuntime.persistentHash(_descriptor_6, value_0);
    return result_0;
  }
  _leafHash_0(userIdHash_0,
              btcPos_0,
              btcNeg_0,
              ethPos_0,
              ethNeg_0,
              usdtPos_0,
              usdtNeg_0)
  {
    return this._persistentHash_1({ domain:
                                      new Uint8Array([97, 114, 100, 109, 101, 114, 101, 58, 109, 115, 116, 58, 108, 101, 97, 102, 58, 118, 51, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0]),
                                    userIdHash: userIdHash_0,
                                    btcPos: btcPos_0,
                                    btcNeg: btcNeg_0,
                                    ethPos: ethPos_0,
                                    ethNeg: ethNeg_0,
                                    usdtPos: usdtPos_0,
                                    usdtNeg: usdtNeg_0 });
  }
  _rootFrom64_0(userIds_0,
                btcPos_0,
                btcNeg_0,
                ethPos_0,
                ethNeg_0,
                usdtPos_0,
                usdtNeg_0)
  {
    const L1_0_0 = this._parentHash_0({ hash:
                                          this._leafHash_1(userIds_0[0],
                                                           btcPos_0[0],
                                                           btcNeg_0[0],
                                                           ethPos_0[0],
                                                           ethNeg_0[0],
                                                           usdtPos_0[0],
                                                           usdtNeg_0[0]),
                                        btcPosSum: btcPos_0[0],
                                        btcNegSum: btcNeg_0[0],
                                        ethPosSum: ethPos_0[0],
                                        ethNegSum: ethNeg_0[0],
                                        usdtPosSum: usdtPos_0[0],
                                        usdtNegSum: usdtNeg_0[0] },
                                      { hash:
                                          this._leafHash_1(userIds_0[1],
                                                           btcPos_0[1],
                                                           btcNeg_0[1],
                                                           ethPos_0[1],
                                                           ethNeg_0[1],
                                                           usdtPos_0[1],
                                                           usdtNeg_0[1]),
                                        btcPosSum: btcPos_0[1],
                                        btcNegSum: btcNeg_0[1],
                                        ethPosSum: ethPos_0[1],
                                        ethNegSum: ethNeg_0[1],
                                        usdtPosSum: usdtPos_0[1],
                                        usdtNegSum: usdtNeg_0[1] });
    const L1_1_0 = this._parentHash_0({ hash:
                                          this._leafHash_1(userIds_0[2],
                                                           btcPos_0[2],
                                                           btcNeg_0[2],
                                                           ethPos_0[2],
                                                           ethNeg_0[2],
                                                           usdtPos_0[2],
                                                           usdtNeg_0[2]),
                                        btcPosSum: btcPos_0[2],
                                        btcNegSum: btcNeg_0[2],
                                        ethPosSum: ethPos_0[2],
                                        ethNegSum: ethNeg_0[2],
                                        usdtPosSum: usdtPos_0[2],
                                        usdtNegSum: usdtNeg_0[2] },
                                      { hash:
                                          this._leafHash_1(userIds_0[3],
                                                           btcPos_0[3],
                                                           btcNeg_0[3],
                                                           ethPos_0[3],
                                                           ethNeg_0[3],
                                                           usdtPos_0[3],
                                                           usdtNeg_0[3]),
                                        btcPosSum: btcPos_0[3],
                                        btcNegSum: btcNeg_0[3],
                                        ethPosSum: ethPos_0[3],
                                        ethNegSum: ethNeg_0[3],
                                        usdtPosSum: usdtPos_0[3],
                                        usdtNegSum: usdtNeg_0[3] });
    const L1_2_0 = this._parentHash_0({ hash:
                                          this._leafHash_1(userIds_0[4],
                                                           btcPos_0[4],
                                                           btcNeg_0[4],
                                                           ethPos_0[4],
                                                           ethNeg_0[4],
                                                           usdtPos_0[4],
                                                           usdtNeg_0[4]),
                                        btcPosSum: btcPos_0[4],
                                        btcNegSum: btcNeg_0[4],
                                        ethPosSum: ethPos_0[4],
                                        ethNegSum: ethNeg_0[4],
                                        usdtPosSum: usdtPos_0[4],
                                        usdtNegSum: usdtNeg_0[4] },
                                      { hash:
                                          this._leafHash_1(userIds_0[5],
                                                           btcPos_0[5],
                                                           btcNeg_0[5],
                                                           ethPos_0[5],
                                                           ethNeg_0[5],
                                                           usdtPos_0[5],
                                                           usdtNeg_0[5]),
                                        btcPosSum: btcPos_0[5],
                                        btcNegSum: btcNeg_0[5],
                                        ethPosSum: ethPos_0[5],
                                        ethNegSum: ethNeg_0[5],
                                        usdtPosSum: usdtPos_0[5],
                                        usdtNegSum: usdtNeg_0[5] });
    const L1_3_0 = this._parentHash_0({ hash:
                                          this._leafHash_1(userIds_0[6],
                                                           btcPos_0[6],
                                                           btcNeg_0[6],
                                                           ethPos_0[6],
                                                           ethNeg_0[6],
                                                           usdtPos_0[6],
                                                           usdtNeg_0[6]),
                                        btcPosSum: btcPos_0[6],
                                        btcNegSum: btcNeg_0[6],
                                        ethPosSum: ethPos_0[6],
                                        ethNegSum: ethNeg_0[6],
                                        usdtPosSum: usdtPos_0[6],
                                        usdtNegSum: usdtNeg_0[6] },
                                      { hash:
                                          this._leafHash_1(userIds_0[7],
                                                           btcPos_0[7],
                                                           btcNeg_0[7],
                                                           ethPos_0[7],
                                                           ethNeg_0[7],
                                                           usdtPos_0[7],
                                                           usdtNeg_0[7]),
                                        btcPosSum: btcPos_0[7],
                                        btcNegSum: btcNeg_0[7],
                                        ethPosSum: ethPos_0[7],
                                        ethNegSum: ethNeg_0[7],
                                        usdtPosSum: usdtPos_0[7],
                                        usdtNegSum: usdtNeg_0[7] });
    const L1_4_0 = this._parentHash_0({ hash:
                                          this._leafHash_1(userIds_0[8],
                                                           btcPos_0[8],
                                                           btcNeg_0[8],
                                                           ethPos_0[8],
                                                           ethNeg_0[8],
                                                           usdtPos_0[8],
                                                           usdtNeg_0[8]),
                                        btcPosSum: btcPos_0[8],
                                        btcNegSum: btcNeg_0[8],
                                        ethPosSum: ethPos_0[8],
                                        ethNegSum: ethNeg_0[8],
                                        usdtPosSum: usdtPos_0[8],
                                        usdtNegSum: usdtNeg_0[8] },
                                      { hash:
                                          this._leafHash_1(userIds_0[9],
                                                           btcPos_0[9],
                                                           btcNeg_0[9],
                                                           ethPos_0[9],
                                                           ethNeg_0[9],
                                                           usdtPos_0[9],
                                                           usdtNeg_0[9]),
                                        btcPosSum: btcPos_0[9],
                                        btcNegSum: btcNeg_0[9],
                                        ethPosSum: ethPos_0[9],
                                        ethNegSum: ethNeg_0[9],
                                        usdtPosSum: usdtPos_0[9],
                                        usdtNegSum: usdtNeg_0[9] });
    const L1_5_0 = this._parentHash_0({ hash:
                                          this._leafHash_1(userIds_0[10],
                                                           btcPos_0[10],
                                                           btcNeg_0[10],
                                                           ethPos_0[10],
                                                           ethNeg_0[10],
                                                           usdtPos_0[10],
                                                           usdtNeg_0[10]),
                                        btcPosSum: btcPos_0[10],
                                        btcNegSum: btcNeg_0[10],
                                        ethPosSum: ethPos_0[10],
                                        ethNegSum: ethNeg_0[10],
                                        usdtPosSum: usdtPos_0[10],
                                        usdtNegSum: usdtNeg_0[10] },
                                      { hash:
                                          this._leafHash_1(userIds_0[11],
                                                           btcPos_0[11],
                                                           btcNeg_0[11],
                                                           ethPos_0[11],
                                                           ethNeg_0[11],
                                                           usdtPos_0[11],
                                                           usdtNeg_0[11]),
                                        btcPosSum: btcPos_0[11],
                                        btcNegSum: btcNeg_0[11],
                                        ethPosSum: ethPos_0[11],
                                        ethNegSum: ethNeg_0[11],
                                        usdtPosSum: usdtPos_0[11],
                                        usdtNegSum: usdtNeg_0[11] });
    const L1_6_0 = this._parentHash_0({ hash:
                                          this._leafHash_1(userIds_0[12],
                                                           btcPos_0[12],
                                                           btcNeg_0[12],
                                                           ethPos_0[12],
                                                           ethNeg_0[12],
                                                           usdtPos_0[12],
                                                           usdtNeg_0[12]),
                                        btcPosSum: btcPos_0[12],
                                        btcNegSum: btcNeg_0[12],
                                        ethPosSum: ethPos_0[12],
                                        ethNegSum: ethNeg_0[12],
                                        usdtPosSum: usdtPos_0[12],
                                        usdtNegSum: usdtNeg_0[12] },
                                      { hash:
                                          this._leafHash_1(userIds_0[13],
                                                           btcPos_0[13],
                                                           btcNeg_0[13],
                                                           ethPos_0[13],
                                                           ethNeg_0[13],
                                                           usdtPos_0[13],
                                                           usdtNeg_0[13]),
                                        btcPosSum: btcPos_0[13],
                                        btcNegSum: btcNeg_0[13],
                                        ethPosSum: ethPos_0[13],
                                        ethNegSum: ethNeg_0[13],
                                        usdtPosSum: usdtPos_0[13],
                                        usdtNegSum: usdtNeg_0[13] });
    const L1_7_0 = this._parentHash_0({ hash:
                                          this._leafHash_1(userIds_0[14],
                                                           btcPos_0[14],
                                                           btcNeg_0[14],
                                                           ethPos_0[14],
                                                           ethNeg_0[14],
                                                           usdtPos_0[14],
                                                           usdtNeg_0[14]),
                                        btcPosSum: btcPos_0[14],
                                        btcNegSum: btcNeg_0[14],
                                        ethPosSum: ethPos_0[14],
                                        ethNegSum: ethNeg_0[14],
                                        usdtPosSum: usdtPos_0[14],
                                        usdtNegSum: usdtNeg_0[14] },
                                      { hash:
                                          this._leafHash_1(userIds_0[15],
                                                           btcPos_0[15],
                                                           btcNeg_0[15],
                                                           ethPos_0[15],
                                                           ethNeg_0[15],
                                                           usdtPos_0[15],
                                                           usdtNeg_0[15]),
                                        btcPosSum: btcPos_0[15],
                                        btcNegSum: btcNeg_0[15],
                                        ethPosSum: ethPos_0[15],
                                        ethNegSum: ethNeg_0[15],
                                        usdtPosSum: usdtPos_0[15],
                                        usdtNegSum: usdtNeg_0[15] });
    const L1_8_0 = this._parentHash_0({ hash:
                                          this._leafHash_1(userIds_0[16],
                                                           btcPos_0[16],
                                                           btcNeg_0[16],
                                                           ethPos_0[16],
                                                           ethNeg_0[16],
                                                           usdtPos_0[16],
                                                           usdtNeg_0[16]),
                                        btcPosSum: btcPos_0[16],
                                        btcNegSum: btcNeg_0[16],
                                        ethPosSum: ethPos_0[16],
                                        ethNegSum: ethNeg_0[16],
                                        usdtPosSum: usdtPos_0[16],
                                        usdtNegSum: usdtNeg_0[16] },
                                      { hash:
                                          this._leafHash_1(userIds_0[17],
                                                           btcPos_0[17],
                                                           btcNeg_0[17],
                                                           ethPos_0[17],
                                                           ethNeg_0[17],
                                                           usdtPos_0[17],
                                                           usdtNeg_0[17]),
                                        btcPosSum: btcPos_0[17],
                                        btcNegSum: btcNeg_0[17],
                                        ethPosSum: ethPos_0[17],
                                        ethNegSum: ethNeg_0[17],
                                        usdtPosSum: usdtPos_0[17],
                                        usdtNegSum: usdtNeg_0[17] });
    const L1_9_0 = this._parentHash_0({ hash:
                                          this._leafHash_1(userIds_0[18],
                                                           btcPos_0[18],
                                                           btcNeg_0[18],
                                                           ethPos_0[18],
                                                           ethNeg_0[18],
                                                           usdtPos_0[18],
                                                           usdtNeg_0[18]),
                                        btcPosSum: btcPos_0[18],
                                        btcNegSum: btcNeg_0[18],
                                        ethPosSum: ethPos_0[18],
                                        ethNegSum: ethNeg_0[18],
                                        usdtPosSum: usdtPos_0[18],
                                        usdtNegSum: usdtNeg_0[18] },
                                      { hash:
                                          this._leafHash_1(userIds_0[19],
                                                           btcPos_0[19],
                                                           btcNeg_0[19],
                                                           ethPos_0[19],
                                                           ethNeg_0[19],
                                                           usdtPos_0[19],
                                                           usdtNeg_0[19]),
                                        btcPosSum: btcPos_0[19],
                                        btcNegSum: btcNeg_0[19],
                                        ethPosSum: ethPos_0[19],
                                        ethNegSum: ethNeg_0[19],
                                        usdtPosSum: usdtPos_0[19],
                                        usdtNegSum: usdtNeg_0[19] });
    const L1_10_0 = this._parentHash_0({ hash:
                                           this._leafHash_1(userIds_0[20],
                                                            btcPos_0[20],
                                                            btcNeg_0[20],
                                                            ethPos_0[20],
                                                            ethNeg_0[20],
                                                            usdtPos_0[20],
                                                            usdtNeg_0[20]),
                                         btcPosSum: btcPos_0[20],
                                         btcNegSum: btcNeg_0[20],
                                         ethPosSum: ethPos_0[20],
                                         ethNegSum: ethNeg_0[20],
                                         usdtPosSum: usdtPos_0[20],
                                         usdtNegSum: usdtNeg_0[20] },
                                       { hash:
                                           this._leafHash_1(userIds_0[21],
                                                            btcPos_0[21],
                                                            btcNeg_0[21],
                                                            ethPos_0[21],
                                                            ethNeg_0[21],
                                                            usdtPos_0[21],
                                                            usdtNeg_0[21]),
                                         btcPosSum: btcPos_0[21],
                                         btcNegSum: btcNeg_0[21],
                                         ethPosSum: ethPos_0[21],
                                         ethNegSum: ethNeg_0[21],
                                         usdtPosSum: usdtPos_0[21],
                                         usdtNegSum: usdtNeg_0[21] });
    const L1_11_0 = this._parentHash_0({ hash:
                                           this._leafHash_1(userIds_0[22],
                                                            btcPos_0[22],
                                                            btcNeg_0[22],
                                                            ethPos_0[22],
                                                            ethNeg_0[22],
                                                            usdtPos_0[22],
                                                            usdtNeg_0[22]),
                                         btcPosSum: btcPos_0[22],
                                         btcNegSum: btcNeg_0[22],
                                         ethPosSum: ethPos_0[22],
                                         ethNegSum: ethNeg_0[22],
                                         usdtPosSum: usdtPos_0[22],
                                         usdtNegSum: usdtNeg_0[22] },
                                       { hash:
                                           this._leafHash_1(userIds_0[23],
                                                            btcPos_0[23],
                                                            btcNeg_0[23],
                                                            ethPos_0[23],
                                                            ethNeg_0[23],
                                                            usdtPos_0[23],
                                                            usdtNeg_0[23]),
                                         btcPosSum: btcPos_0[23],
                                         btcNegSum: btcNeg_0[23],
                                         ethPosSum: ethPos_0[23],
                                         ethNegSum: ethNeg_0[23],
                                         usdtPosSum: usdtPos_0[23],
                                         usdtNegSum: usdtNeg_0[23] });
    const L1_12_0 = this._parentHash_0({ hash:
                                           this._leafHash_1(userIds_0[24],
                                                            btcPos_0[24],
                                                            btcNeg_0[24],
                                                            ethPos_0[24],
                                                            ethNeg_0[24],
                                                            usdtPos_0[24],
                                                            usdtNeg_0[24]),
                                         btcPosSum: btcPos_0[24],
                                         btcNegSum: btcNeg_0[24],
                                         ethPosSum: ethPos_0[24],
                                         ethNegSum: ethNeg_0[24],
                                         usdtPosSum: usdtPos_0[24],
                                         usdtNegSum: usdtNeg_0[24] },
                                       { hash:
                                           this._leafHash_1(userIds_0[25],
                                                            btcPos_0[25],
                                                            btcNeg_0[25],
                                                            ethPos_0[25],
                                                            ethNeg_0[25],
                                                            usdtPos_0[25],
                                                            usdtNeg_0[25]),
                                         btcPosSum: btcPos_0[25],
                                         btcNegSum: btcNeg_0[25],
                                         ethPosSum: ethPos_0[25],
                                         ethNegSum: ethNeg_0[25],
                                         usdtPosSum: usdtPos_0[25],
                                         usdtNegSum: usdtNeg_0[25] });
    const L1_13_0 = this._parentHash_0({ hash:
                                           this._leafHash_1(userIds_0[26],
                                                            btcPos_0[26],
                                                            btcNeg_0[26],
                                                            ethPos_0[26],
                                                            ethNeg_0[26],
                                                            usdtPos_0[26],
                                                            usdtNeg_0[26]),
                                         btcPosSum: btcPos_0[26],
                                         btcNegSum: btcNeg_0[26],
                                         ethPosSum: ethPos_0[26],
                                         ethNegSum: ethNeg_0[26],
                                         usdtPosSum: usdtPos_0[26],
                                         usdtNegSum: usdtNeg_0[26] },
                                       { hash:
                                           this._leafHash_1(userIds_0[27],
                                                            btcPos_0[27],
                                                            btcNeg_0[27],
                                                            ethPos_0[27],
                                                            ethNeg_0[27],
                                                            usdtPos_0[27],
                                                            usdtNeg_0[27]),
                                         btcPosSum: btcPos_0[27],
                                         btcNegSum: btcNeg_0[27],
                                         ethPosSum: ethPos_0[27],
                                         ethNegSum: ethNeg_0[27],
                                         usdtPosSum: usdtPos_0[27],
                                         usdtNegSum: usdtNeg_0[27] });
    const L1_14_0 = this._parentHash_0({ hash:
                                           this._leafHash_1(userIds_0[28],
                                                            btcPos_0[28],
                                                            btcNeg_0[28],
                                                            ethPos_0[28],
                                                            ethNeg_0[28],
                                                            usdtPos_0[28],
                                                            usdtNeg_0[28]),
                                         btcPosSum: btcPos_0[28],
                                         btcNegSum: btcNeg_0[28],
                                         ethPosSum: ethPos_0[28],
                                         ethNegSum: ethNeg_0[28],
                                         usdtPosSum: usdtPos_0[28],
                                         usdtNegSum: usdtNeg_0[28] },
                                       { hash:
                                           this._leafHash_1(userIds_0[29],
                                                            btcPos_0[29],
                                                            btcNeg_0[29],
                                                            ethPos_0[29],
                                                            ethNeg_0[29],
                                                            usdtPos_0[29],
                                                            usdtNeg_0[29]),
                                         btcPosSum: btcPos_0[29],
                                         btcNegSum: btcNeg_0[29],
                                         ethPosSum: ethPos_0[29],
                                         ethNegSum: ethNeg_0[29],
                                         usdtPosSum: usdtPos_0[29],
                                         usdtNegSum: usdtNeg_0[29] });
    const L1_15_0 = this._parentHash_0({ hash:
                                           this._leafHash_1(userIds_0[30],
                                                            btcPos_0[30],
                                                            btcNeg_0[30],
                                                            ethPos_0[30],
                                                            ethNeg_0[30],
                                                            usdtPos_0[30],
                                                            usdtNeg_0[30]),
                                         btcPosSum: btcPos_0[30],
                                         btcNegSum: btcNeg_0[30],
                                         ethPosSum: ethPos_0[30],
                                         ethNegSum: ethNeg_0[30],
                                         usdtPosSum: usdtPos_0[30],
                                         usdtNegSum: usdtNeg_0[30] },
                                       { hash:
                                           this._leafHash_1(userIds_0[31],
                                                            btcPos_0[31],
                                                            btcNeg_0[31],
                                                            ethPos_0[31],
                                                            ethNeg_0[31],
                                                            usdtPos_0[31],
                                                            usdtNeg_0[31]),
                                         btcPosSum: btcPos_0[31],
                                         btcNegSum: btcNeg_0[31],
                                         ethPosSum: ethPos_0[31],
                                         ethNegSum: ethNeg_0[31],
                                         usdtPosSum: usdtPos_0[31],
                                         usdtNegSum: usdtNeg_0[31] });
    const L1_16_0 = this._parentHash_0({ hash:
                                           this._leafHash_1(userIds_0[32],
                                                            btcPos_0[32],
                                                            btcNeg_0[32],
                                                            ethPos_0[32],
                                                            ethNeg_0[32],
                                                            usdtPos_0[32],
                                                            usdtNeg_0[32]),
                                         btcPosSum: btcPos_0[32],
                                         btcNegSum: btcNeg_0[32],
                                         ethPosSum: ethPos_0[32],
                                         ethNegSum: ethNeg_0[32],
                                         usdtPosSum: usdtPos_0[32],
                                         usdtNegSum: usdtNeg_0[32] },
                                       { hash:
                                           this._leafHash_1(userIds_0[33],
                                                            btcPos_0[33],
                                                            btcNeg_0[33],
                                                            ethPos_0[33],
                                                            ethNeg_0[33],
                                                            usdtPos_0[33],
                                                            usdtNeg_0[33]),
                                         btcPosSum: btcPos_0[33],
                                         btcNegSum: btcNeg_0[33],
                                         ethPosSum: ethPos_0[33],
                                         ethNegSum: ethNeg_0[33],
                                         usdtPosSum: usdtPos_0[33],
                                         usdtNegSum: usdtNeg_0[33] });
    const L1_17_0 = this._parentHash_0({ hash:
                                           this._leafHash_1(userIds_0[34],
                                                            btcPos_0[34],
                                                            btcNeg_0[34],
                                                            ethPos_0[34],
                                                            ethNeg_0[34],
                                                            usdtPos_0[34],
                                                            usdtNeg_0[34]),
                                         btcPosSum: btcPos_0[34],
                                         btcNegSum: btcNeg_0[34],
                                         ethPosSum: ethPos_0[34],
                                         ethNegSum: ethNeg_0[34],
                                         usdtPosSum: usdtPos_0[34],
                                         usdtNegSum: usdtNeg_0[34] },
                                       { hash:
                                           this._leafHash_1(userIds_0[35],
                                                            btcPos_0[35],
                                                            btcNeg_0[35],
                                                            ethPos_0[35],
                                                            ethNeg_0[35],
                                                            usdtPos_0[35],
                                                            usdtNeg_0[35]),
                                         btcPosSum: btcPos_0[35],
                                         btcNegSum: btcNeg_0[35],
                                         ethPosSum: ethPos_0[35],
                                         ethNegSum: ethNeg_0[35],
                                         usdtPosSum: usdtPos_0[35],
                                         usdtNegSum: usdtNeg_0[35] });
    const L1_18_0 = this._parentHash_0({ hash:
                                           this._leafHash_1(userIds_0[36],
                                                            btcPos_0[36],
                                                            btcNeg_0[36],
                                                            ethPos_0[36],
                                                            ethNeg_0[36],
                                                            usdtPos_0[36],
                                                            usdtNeg_0[36]),
                                         btcPosSum: btcPos_0[36],
                                         btcNegSum: btcNeg_0[36],
                                         ethPosSum: ethPos_0[36],
                                         ethNegSum: ethNeg_0[36],
                                         usdtPosSum: usdtPos_0[36],
                                         usdtNegSum: usdtNeg_0[36] },
                                       { hash:
                                           this._leafHash_1(userIds_0[37],
                                                            btcPos_0[37],
                                                            btcNeg_0[37],
                                                            ethPos_0[37],
                                                            ethNeg_0[37],
                                                            usdtPos_0[37],
                                                            usdtNeg_0[37]),
                                         btcPosSum: btcPos_0[37],
                                         btcNegSum: btcNeg_0[37],
                                         ethPosSum: ethPos_0[37],
                                         ethNegSum: ethNeg_0[37],
                                         usdtPosSum: usdtPos_0[37],
                                         usdtNegSum: usdtNeg_0[37] });
    const L1_19_0 = this._parentHash_0({ hash:
                                           this._leafHash_1(userIds_0[38],
                                                            btcPos_0[38],
                                                            btcNeg_0[38],
                                                            ethPos_0[38],
                                                            ethNeg_0[38],
                                                            usdtPos_0[38],
                                                            usdtNeg_0[38]),
                                         btcPosSum: btcPos_0[38],
                                         btcNegSum: btcNeg_0[38],
                                         ethPosSum: ethPos_0[38],
                                         ethNegSum: ethNeg_0[38],
                                         usdtPosSum: usdtPos_0[38],
                                         usdtNegSum: usdtNeg_0[38] },
                                       { hash:
                                           this._leafHash_1(userIds_0[39],
                                                            btcPos_0[39],
                                                            btcNeg_0[39],
                                                            ethPos_0[39],
                                                            ethNeg_0[39],
                                                            usdtPos_0[39],
                                                            usdtNeg_0[39]),
                                         btcPosSum: btcPos_0[39],
                                         btcNegSum: btcNeg_0[39],
                                         ethPosSum: ethPos_0[39],
                                         ethNegSum: ethNeg_0[39],
                                         usdtPosSum: usdtPos_0[39],
                                         usdtNegSum: usdtNeg_0[39] });
    const L1_20_0 = this._parentHash_0({ hash:
                                           this._leafHash_1(userIds_0[40],
                                                            btcPos_0[40],
                                                            btcNeg_0[40],
                                                            ethPos_0[40],
                                                            ethNeg_0[40],
                                                            usdtPos_0[40],
                                                            usdtNeg_0[40]),
                                         btcPosSum: btcPos_0[40],
                                         btcNegSum: btcNeg_0[40],
                                         ethPosSum: ethPos_0[40],
                                         ethNegSum: ethNeg_0[40],
                                         usdtPosSum: usdtPos_0[40],
                                         usdtNegSum: usdtNeg_0[40] },
                                       { hash:
                                           this._leafHash_1(userIds_0[41],
                                                            btcPos_0[41],
                                                            btcNeg_0[41],
                                                            ethPos_0[41],
                                                            ethNeg_0[41],
                                                            usdtPos_0[41],
                                                            usdtNeg_0[41]),
                                         btcPosSum: btcPos_0[41],
                                         btcNegSum: btcNeg_0[41],
                                         ethPosSum: ethPos_0[41],
                                         ethNegSum: ethNeg_0[41],
                                         usdtPosSum: usdtPos_0[41],
                                         usdtNegSum: usdtNeg_0[41] });
    const L1_21_0 = this._parentHash_0({ hash:
                                           this._leafHash_1(userIds_0[42],
                                                            btcPos_0[42],
                                                            btcNeg_0[42],
                                                            ethPos_0[42],
                                                            ethNeg_0[42],
                                                            usdtPos_0[42],
                                                            usdtNeg_0[42]),
                                         btcPosSum: btcPos_0[42],
                                         btcNegSum: btcNeg_0[42],
                                         ethPosSum: ethPos_0[42],
                                         ethNegSum: ethNeg_0[42],
                                         usdtPosSum: usdtPos_0[42],
                                         usdtNegSum: usdtNeg_0[42] },
                                       { hash:
                                           this._leafHash_1(userIds_0[43],
                                                            btcPos_0[43],
                                                            btcNeg_0[43],
                                                            ethPos_0[43],
                                                            ethNeg_0[43],
                                                            usdtPos_0[43],
                                                            usdtNeg_0[43]),
                                         btcPosSum: btcPos_0[43],
                                         btcNegSum: btcNeg_0[43],
                                         ethPosSum: ethPos_0[43],
                                         ethNegSum: ethNeg_0[43],
                                         usdtPosSum: usdtPos_0[43],
                                         usdtNegSum: usdtNeg_0[43] });
    const L1_22_0 = this._parentHash_0({ hash:
                                           this._leafHash_1(userIds_0[44],
                                                            btcPos_0[44],
                                                            btcNeg_0[44],
                                                            ethPos_0[44],
                                                            ethNeg_0[44],
                                                            usdtPos_0[44],
                                                            usdtNeg_0[44]),
                                         btcPosSum: btcPos_0[44],
                                         btcNegSum: btcNeg_0[44],
                                         ethPosSum: ethPos_0[44],
                                         ethNegSum: ethNeg_0[44],
                                         usdtPosSum: usdtPos_0[44],
                                         usdtNegSum: usdtNeg_0[44] },
                                       { hash:
                                           this._leafHash_1(userIds_0[45],
                                                            btcPos_0[45],
                                                            btcNeg_0[45],
                                                            ethPos_0[45],
                                                            ethNeg_0[45],
                                                            usdtPos_0[45],
                                                            usdtNeg_0[45]),
                                         btcPosSum: btcPos_0[45],
                                         btcNegSum: btcNeg_0[45],
                                         ethPosSum: ethPos_0[45],
                                         ethNegSum: ethNeg_0[45],
                                         usdtPosSum: usdtPos_0[45],
                                         usdtNegSum: usdtNeg_0[45] });
    const L1_23_0 = this._parentHash_0({ hash:
                                           this._leafHash_1(userIds_0[46],
                                                            btcPos_0[46],
                                                            btcNeg_0[46],
                                                            ethPos_0[46],
                                                            ethNeg_0[46],
                                                            usdtPos_0[46],
                                                            usdtNeg_0[46]),
                                         btcPosSum: btcPos_0[46],
                                         btcNegSum: btcNeg_0[46],
                                         ethPosSum: ethPos_0[46],
                                         ethNegSum: ethNeg_0[46],
                                         usdtPosSum: usdtPos_0[46],
                                         usdtNegSum: usdtNeg_0[46] },
                                       { hash:
                                           this._leafHash_1(userIds_0[47],
                                                            btcPos_0[47],
                                                            btcNeg_0[47],
                                                            ethPos_0[47],
                                                            ethNeg_0[47],
                                                            usdtPos_0[47],
                                                            usdtNeg_0[47]),
                                         btcPosSum: btcPos_0[47],
                                         btcNegSum: btcNeg_0[47],
                                         ethPosSum: ethPos_0[47],
                                         ethNegSum: ethNeg_0[47],
                                         usdtPosSum: usdtPos_0[47],
                                         usdtNegSum: usdtNeg_0[47] });
    const L1_24_0 = this._parentHash_0({ hash:
                                           this._leafHash_1(userIds_0[48],
                                                            btcPos_0[48],
                                                            btcNeg_0[48],
                                                            ethPos_0[48],
                                                            ethNeg_0[48],
                                                            usdtPos_0[48],
                                                            usdtNeg_0[48]),
                                         btcPosSum: btcPos_0[48],
                                         btcNegSum: btcNeg_0[48],
                                         ethPosSum: ethPos_0[48],
                                         ethNegSum: ethNeg_0[48],
                                         usdtPosSum: usdtPos_0[48],
                                         usdtNegSum: usdtNeg_0[48] },
                                       { hash:
                                           this._leafHash_1(userIds_0[49],
                                                            btcPos_0[49],
                                                            btcNeg_0[49],
                                                            ethPos_0[49],
                                                            ethNeg_0[49],
                                                            usdtPos_0[49],
                                                            usdtNeg_0[49]),
                                         btcPosSum: btcPos_0[49],
                                         btcNegSum: btcNeg_0[49],
                                         ethPosSum: ethPos_0[49],
                                         ethNegSum: ethNeg_0[49],
                                         usdtPosSum: usdtPos_0[49],
                                         usdtNegSum: usdtNeg_0[49] });
    const L1_25_0 = this._parentHash_0({ hash:
                                           this._leafHash_1(userIds_0[50],
                                                            btcPos_0[50],
                                                            btcNeg_0[50],
                                                            ethPos_0[50],
                                                            ethNeg_0[50],
                                                            usdtPos_0[50],
                                                            usdtNeg_0[50]),
                                         btcPosSum: btcPos_0[50],
                                         btcNegSum: btcNeg_0[50],
                                         ethPosSum: ethPos_0[50],
                                         ethNegSum: ethNeg_0[50],
                                         usdtPosSum: usdtPos_0[50],
                                         usdtNegSum: usdtNeg_0[50] },
                                       { hash:
                                           this._leafHash_1(userIds_0[51],
                                                            btcPos_0[51],
                                                            btcNeg_0[51],
                                                            ethPos_0[51],
                                                            ethNeg_0[51],
                                                            usdtPos_0[51],
                                                            usdtNeg_0[51]),
                                         btcPosSum: btcPos_0[51],
                                         btcNegSum: btcNeg_0[51],
                                         ethPosSum: ethPos_0[51],
                                         ethNegSum: ethNeg_0[51],
                                         usdtPosSum: usdtPos_0[51],
                                         usdtNegSum: usdtNeg_0[51] });
    const L1_26_0 = this._parentHash_0({ hash:
                                           this._leafHash_1(userIds_0[52],
                                                            btcPos_0[52],
                                                            btcNeg_0[52],
                                                            ethPos_0[52],
                                                            ethNeg_0[52],
                                                            usdtPos_0[52],
                                                            usdtNeg_0[52]),
                                         btcPosSum: btcPos_0[52],
                                         btcNegSum: btcNeg_0[52],
                                         ethPosSum: ethPos_0[52],
                                         ethNegSum: ethNeg_0[52],
                                         usdtPosSum: usdtPos_0[52],
                                         usdtNegSum: usdtNeg_0[52] },
                                       { hash:
                                           this._leafHash_1(userIds_0[53],
                                                            btcPos_0[53],
                                                            btcNeg_0[53],
                                                            ethPos_0[53],
                                                            ethNeg_0[53],
                                                            usdtPos_0[53],
                                                            usdtNeg_0[53]),
                                         btcPosSum: btcPos_0[53],
                                         btcNegSum: btcNeg_0[53],
                                         ethPosSum: ethPos_0[53],
                                         ethNegSum: ethNeg_0[53],
                                         usdtPosSum: usdtPos_0[53],
                                         usdtNegSum: usdtNeg_0[53] });
    const L1_27_0 = this._parentHash_0({ hash:
                                           this._leafHash_1(userIds_0[54],
                                                            btcPos_0[54],
                                                            btcNeg_0[54],
                                                            ethPos_0[54],
                                                            ethNeg_0[54],
                                                            usdtPos_0[54],
                                                            usdtNeg_0[54]),
                                         btcPosSum: btcPos_0[54],
                                         btcNegSum: btcNeg_0[54],
                                         ethPosSum: ethPos_0[54],
                                         ethNegSum: ethNeg_0[54],
                                         usdtPosSum: usdtPos_0[54],
                                         usdtNegSum: usdtNeg_0[54] },
                                       { hash:
                                           this._leafHash_1(userIds_0[55],
                                                            btcPos_0[55],
                                                            btcNeg_0[55],
                                                            ethPos_0[55],
                                                            ethNeg_0[55],
                                                            usdtPos_0[55],
                                                            usdtNeg_0[55]),
                                         btcPosSum: btcPos_0[55],
                                         btcNegSum: btcNeg_0[55],
                                         ethPosSum: ethPos_0[55],
                                         ethNegSum: ethNeg_0[55],
                                         usdtPosSum: usdtPos_0[55],
                                         usdtNegSum: usdtNeg_0[55] });
    const L1_28_0 = this._parentHash_0({ hash:
                                           this._leafHash_1(userIds_0[56],
                                                            btcPos_0[56],
                                                            btcNeg_0[56],
                                                            ethPos_0[56],
                                                            ethNeg_0[56],
                                                            usdtPos_0[56],
                                                            usdtNeg_0[56]),
                                         btcPosSum: btcPos_0[56],
                                         btcNegSum: btcNeg_0[56],
                                         ethPosSum: ethPos_0[56],
                                         ethNegSum: ethNeg_0[56],
                                         usdtPosSum: usdtPos_0[56],
                                         usdtNegSum: usdtNeg_0[56] },
                                       { hash:
                                           this._leafHash_1(userIds_0[57],
                                                            btcPos_0[57],
                                                            btcNeg_0[57],
                                                            ethPos_0[57],
                                                            ethNeg_0[57],
                                                            usdtPos_0[57],
                                                            usdtNeg_0[57]),
                                         btcPosSum: btcPos_0[57],
                                         btcNegSum: btcNeg_0[57],
                                         ethPosSum: ethPos_0[57],
                                         ethNegSum: ethNeg_0[57],
                                         usdtPosSum: usdtPos_0[57],
                                         usdtNegSum: usdtNeg_0[57] });
    const L1_29_0 = this._parentHash_0({ hash:
                                           this._leafHash_1(userIds_0[58],
                                                            btcPos_0[58],
                                                            btcNeg_0[58],
                                                            ethPos_0[58],
                                                            ethNeg_0[58],
                                                            usdtPos_0[58],
                                                            usdtNeg_0[58]),
                                         btcPosSum: btcPos_0[58],
                                         btcNegSum: btcNeg_0[58],
                                         ethPosSum: ethPos_0[58],
                                         ethNegSum: ethNeg_0[58],
                                         usdtPosSum: usdtPos_0[58],
                                         usdtNegSum: usdtNeg_0[58] },
                                       { hash:
                                           this._leafHash_1(userIds_0[59],
                                                            btcPos_0[59],
                                                            btcNeg_0[59],
                                                            ethPos_0[59],
                                                            ethNeg_0[59],
                                                            usdtPos_0[59],
                                                            usdtNeg_0[59]),
                                         btcPosSum: btcPos_0[59],
                                         btcNegSum: btcNeg_0[59],
                                         ethPosSum: ethPos_0[59],
                                         ethNegSum: ethNeg_0[59],
                                         usdtPosSum: usdtPos_0[59],
                                         usdtNegSum: usdtNeg_0[59] });
    const L1_30_0 = this._parentHash_0({ hash:
                                           this._leafHash_1(userIds_0[60],
                                                            btcPos_0[60],
                                                            btcNeg_0[60],
                                                            ethPos_0[60],
                                                            ethNeg_0[60],
                                                            usdtPos_0[60],
                                                            usdtNeg_0[60]),
                                         btcPosSum: btcPos_0[60],
                                         btcNegSum: btcNeg_0[60],
                                         ethPosSum: ethPos_0[60],
                                         ethNegSum: ethNeg_0[60],
                                         usdtPosSum: usdtPos_0[60],
                                         usdtNegSum: usdtNeg_0[60] },
                                       { hash:
                                           this._leafHash_1(userIds_0[61],
                                                            btcPos_0[61],
                                                            btcNeg_0[61],
                                                            ethPos_0[61],
                                                            ethNeg_0[61],
                                                            usdtPos_0[61],
                                                            usdtNeg_0[61]),
                                         btcPosSum: btcPos_0[61],
                                         btcNegSum: btcNeg_0[61],
                                         ethPosSum: ethPos_0[61],
                                         ethNegSum: ethNeg_0[61],
                                         usdtPosSum: usdtPos_0[61],
                                         usdtNegSum: usdtNeg_0[61] });
    const L1_31_0 = this._parentHash_0({ hash:
                                           this._leafHash_1(userIds_0[62],
                                                            btcPos_0[62],
                                                            btcNeg_0[62],
                                                            ethPos_0[62],
                                                            ethNeg_0[62],
                                                            usdtPos_0[62],
                                                            usdtNeg_0[62]),
                                         btcPosSum: btcPos_0[62],
                                         btcNegSum: btcNeg_0[62],
                                         ethPosSum: ethPos_0[62],
                                         ethNegSum: ethNeg_0[62],
                                         usdtPosSum: usdtPos_0[62],
                                         usdtNegSum: usdtNeg_0[62] },
                                       { hash:
                                           this._leafHash_1(userIds_0[63],
                                                            btcPos_0[63],
                                                            btcNeg_0[63],
                                                            ethPos_0[63],
                                                            ethNeg_0[63],
                                                            usdtPos_0[63],
                                                            usdtNeg_0[63]),
                                         btcPosSum: btcPos_0[63],
                                         btcNegSum: btcNeg_0[63],
                                         ethPosSum: ethPos_0[63],
                                         ethNegSum: ethNeg_0[63],
                                         usdtPosSum: usdtPos_0[63],
                                         usdtNegSum: usdtNeg_0[63] });
    const L2_0_0 = this._parentHash_0(L1_0_0, L1_1_0);
    const L2_1_0 = this._parentHash_0(L1_2_0, L1_3_0);
    const L2_2_0 = this._parentHash_0(L1_4_0, L1_5_0);
    const L2_3_0 = this._parentHash_0(L1_6_0, L1_7_0);
    const L2_4_0 = this._parentHash_0(L1_8_0, L1_9_0);
    const L2_5_0 = this._parentHash_0(L1_10_0, L1_11_0);
    const L2_6_0 = this._parentHash_0(L1_12_0, L1_13_0);
    const L2_7_0 = this._parentHash_0(L1_14_0, L1_15_0);
    const L2_8_0 = this._parentHash_0(L1_16_0, L1_17_0);
    const L2_9_0 = this._parentHash_0(L1_18_0, L1_19_0);
    const L2_10_0 = this._parentHash_0(L1_20_0, L1_21_0);
    const L2_11_0 = this._parentHash_0(L1_22_0, L1_23_0);
    const L2_12_0 = this._parentHash_0(L1_24_0, L1_25_0);
    const L2_13_0 = this._parentHash_0(L1_26_0, L1_27_0);
    const L2_14_0 = this._parentHash_0(L1_28_0, L1_29_0);
    const L2_15_0 = this._parentHash_0(L1_30_0, L1_31_0);
    const L3_0_0 = this._parentHash_0(L2_0_0, L2_1_0);
    const L3_1_0 = this._parentHash_0(L2_2_0, L2_3_0);
    const L3_2_0 = this._parentHash_0(L2_4_0, L2_5_0);
    const L3_3_0 = this._parentHash_0(L2_6_0, L2_7_0);
    const L3_4_0 = this._parentHash_0(L2_8_0, L2_9_0);
    const L3_5_0 = this._parentHash_0(L2_10_0, L2_11_0);
    const L3_6_0 = this._parentHash_0(L2_12_0, L2_13_0);
    const L3_7_0 = this._parentHash_0(L2_14_0, L2_15_0);
    const L4_0_0 = this._parentHash_0(L3_0_0, L3_1_0);
    const L4_1_0 = this._parentHash_0(L3_2_0, L3_3_0);
    const L4_2_0 = this._parentHash_0(L3_4_0, L3_5_0);
    const L4_3_0 = this._parentHash_0(L3_6_0, L3_7_0);
    const L5_0_0 = this._parentHash_0(L4_0_0, L4_1_0);
    const L5_1_0 = this._parentHash_0(L4_2_0, L4_3_0);
    const L6_0_0 = this._parentHash_0(L5_0_0, L5_1_0); return L6_0_0;
  }
  _leafHash_1(userIdHash_0,
              btcPos_0,
              btcNeg_0,
              ethPos_0,
              ethNeg_0,
              usdtPos_0,
              usdtNeg_0)
  {
    return this._persistentHash_1({ domain:
                                      new Uint8Array([97, 114, 100, 109, 101, 114, 101, 58, 109, 115, 116, 58, 108, 101, 97, 102, 58, 118, 51, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0]),
                                    userIdHash: userIdHash_0,
                                    btcPos: btcPos_0,
                                    btcNeg: btcNeg_0,
                                    ethPos: ethPos_0,
                                    ethNeg: ethNeg_0,
                                    usdtPos: usdtPos_0,
                                    usdtNeg: usdtNeg_0 });
  }
  _parentHash_0(left_0, right_0) {
    const btcPosSum_0 = ((t1) => {
                          if (t1 > 340282366920938463463374607431768211455n) {
                            throw new __compactRuntime.CompactError('contract/././mst_hash.compact line 76 char 34: cast from Field or Uint value to smaller Uint value failed: ' + t1 + ' is greater than 340282366920938463463374607431768211455');
                          }
                          return t1;
                        })(left_0.btcPosSum + right_0.btcPosSum);
    const btcNegSum_0 = ((t1) => {
                          if (t1 > 340282366920938463463374607431768211455n) {
                            throw new __compactRuntime.CompactError('contract/././mst_hash.compact line 77 char 34: cast from Field or Uint value to smaller Uint value failed: ' + t1 + ' is greater than 340282366920938463463374607431768211455');
                          }
                          return t1;
                        })(left_0.btcNegSum + right_0.btcNegSum);
    const ethPosSum_0 = ((t1) => {
                          if (t1 > 340282366920938463463374607431768211455n) {
                            throw new __compactRuntime.CompactError('contract/././mst_hash.compact line 78 char 34: cast from Field or Uint value to smaller Uint value failed: ' + t1 + ' is greater than 340282366920938463463374607431768211455');
                          }
                          return t1;
                        })(left_0.ethPosSum + right_0.ethPosSum);
    const ethNegSum_0 = ((t1) => {
                          if (t1 > 340282366920938463463374607431768211455n) {
                            throw new __compactRuntime.CompactError('contract/././mst_hash.compact line 79 char 34: cast from Field or Uint value to smaller Uint value failed: ' + t1 + ' is greater than 340282366920938463463374607431768211455');
                          }
                          return t1;
                        })(left_0.ethNegSum + right_0.ethNegSum);
    const usdtPosSum_0 = ((t1) => {
                           if (t1 > 340282366920938463463374607431768211455n) {
                             throw new __compactRuntime.CompactError('contract/././mst_hash.compact line 80 char 35: cast from Field or Uint value to smaller Uint value failed: ' + t1 + ' is greater than 340282366920938463463374607431768211455');
                           }
                           return t1;
                         })(left_0.usdtPosSum + right_0.usdtPosSum);
    const usdtNegSum_0 = ((t1) => {
                           if (t1 > 340282366920938463463374607431768211455n) {
                             throw new __compactRuntime.CompactError('contract/././mst_hash.compact line 81 char 35: cast from Field or Uint value to smaller Uint value failed: ' + t1 + ' is greater than 340282366920938463463374607431768211455');
                           }
                           return t1;
                         })(left_0.usdtNegSum + right_0.usdtNegSum);
    const hash_0 = this._persistentHash_0({ domain:
                                              new Uint8Array([97, 114, 100, 109, 101, 114, 101, 58, 109, 115, 116, 58, 112, 97, 114, 101, 110, 116, 58, 118, 51, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0]),
                                            leftHash: left_0.hash,
                                            rightHash: right_0.hash,
                                            btcPosSum: btcPosSum_0,
                                            btcNegSum: btcNegSum_0,
                                            ethPosSum: ethPosSum_0,
                                            ethNegSum: ethNegSum_0,
                                            usdtPosSum: usdtPosSum_0,
                                            usdtNegSum: usdtNegSum_0 });
    return { hash: hash_0,
             btcPosSum: btcPosSum_0,
             btcNegSum: btcNegSum_0,
             ethPosSum: ethPosSum_0,
             ethNegSum: ethNegSum_0,
             usdtPosSum: usdtPosSum_0,
             usdtNegSum: usdtNegSum_0 };
  }
  _leafHash_2(userIdHash_0,
              btcPos_0,
              btcNeg_0,
              ethPos_0,
              ethNeg_0,
              usdtPos_0,
              usdtNeg_0)
  {
    return this._leafHash_0(userIdHash_0,
                            btcPos_0,
                            btcNeg_0,
                            ethPos_0,
                            ethNeg_0,
                            usdtPos_0,
                            usdtNeg_0);
  }
  _parentHash_1(left_0, right_0) {
    const btcPosSum_0 = ((t1) => {
                          if (t1 > 340282366920938463463374607431768211455n) {
                            throw new __compactRuntime.CompactError('mst_bundle.compact line 52 char 32: cast from Field or Uint value to smaller Uint value failed: ' + t1 + ' is greater than 340282366920938463463374607431768211455');
                          }
                          return t1;
                        })(left_0.btcPosSum + right_0.btcPosSum);
    const btcNegSum_0 = ((t1) => {
                          if (t1 > 340282366920938463463374607431768211455n) {
                            throw new __compactRuntime.CompactError('mst_bundle.compact line 53 char 32: cast from Field or Uint value to smaller Uint value failed: ' + t1 + ' is greater than 340282366920938463463374607431768211455');
                          }
                          return t1;
                        })(left_0.btcNegSum + right_0.btcNegSum);
    const ethPosSum_0 = ((t1) => {
                          if (t1 > 340282366920938463463374607431768211455n) {
                            throw new __compactRuntime.CompactError('mst_bundle.compact line 54 char 32: cast from Field or Uint value to smaller Uint value failed: ' + t1 + ' is greater than 340282366920938463463374607431768211455');
                          }
                          return t1;
                        })(left_0.ethPosSum + right_0.ethPosSum);
    const ethNegSum_0 = ((t1) => {
                          if (t1 > 340282366920938463463374607431768211455n) {
                            throw new __compactRuntime.CompactError('mst_bundle.compact line 55 char 32: cast from Field or Uint value to smaller Uint value failed: ' + t1 + ' is greater than 340282366920938463463374607431768211455');
                          }
                          return t1;
                        })(left_0.ethNegSum + right_0.ethNegSum);
    const usdtPosSum_0 = ((t1) => {
                           if (t1 > 340282366920938463463374607431768211455n) {
                             throw new __compactRuntime.CompactError('mst_bundle.compact line 56 char 33: cast from Field or Uint value to smaller Uint value failed: ' + t1 + ' is greater than 340282366920938463463374607431768211455');
                           }
                           return t1;
                         })(left_0.usdtPosSum + right_0.usdtPosSum);
    const usdtNegSum_0 = ((t1) => {
                           if (t1 > 340282366920938463463374607431768211455n) {
                             throw new __compactRuntime.CompactError('mst_bundle.compact line 57 char 33: cast from Field or Uint value to smaller Uint value failed: ' + t1 + ' is greater than 340282366920938463463374607431768211455');
                           }
                           return t1;
                         })(left_0.usdtNegSum + right_0.usdtNegSum);
    const hash_0 = this._persistentHash_0({ domain:
                                              new Uint8Array([97, 114, 100, 109, 101, 114, 101, 58, 109, 115, 116, 58, 112, 97, 114, 101, 110, 116, 58, 118, 51, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0]),
                                            leftHash: left_0.hash,
                                            rightHash: right_0.hash,
                                            btcPosSum: btcPosSum_0,
                                            btcNegSum: btcNegSum_0,
                                            ethPosSum: ethPosSum_0,
                                            ethNegSum: ethNegSum_0,
                                            usdtPosSum: usdtPosSum_0,
                                            usdtNegSum: usdtNegSum_0 });
    return { hash: hash_0,
             btcPosSum: btcPosSum_0,
             btcNegSum: btcNegSum_0,
             ethPosSum: ethPosSum_0,
             ethNegSum: ethNegSum_0,
             usdtPosSum: usdtPosSum_0,
             usdtNegSum: usdtNegSum_0 };
  }
  _mstRootFromLeaves_0(userIds_0,
                       btcPos_0,
                       btcNeg_0,
                       ethPos_0,
                       ethNeg_0,
                       usdtPos_0,
                       usdtNeg_0)
  {
    const n_0 = this._rootFrom64_0(userIds_0,
                                   btcPos_0,
                                   btcNeg_0,
                                   ethPos_0,
                                   ethNeg_0,
                                   usdtPos_0,
                                   usdtNeg_0);
    return { hash: n_0.hash,
             btcPosSum: n_0.btcPosSum,
             btcNegSum: n_0.btcNegSum,
             ethPosSum: n_0.ethPosSum,
             ethNegSum: n_0.ethNegSum,
             usdtPosSum: n_0.usdtPosSum,
             usdtNegSum: n_0.usdtNegSum };
  }
}
export function ledger(stateOrChargedState) {
  const state = stateOrChargedState instanceof __compactRuntime.StateValue ? stateOrChargedState : stateOrChargedState.state;
  const chargedState = stateOrChargedState instanceof __compactRuntime.StateValue ? new __compactRuntime.ChargedState(stateOrChargedState) : stateOrChargedState;
  const context = {
    currentQueryContext: new __compactRuntime.QueryContext(chargedState, __compactRuntime.dummyContractAddress()),
    costModel: __compactRuntime.CostModel.initialCostModel()
  };
  const partialProofData = {
    input: { value: [], alignment: [] },
    output: undefined,
    publicTranscript: [],
    privateTranscriptOutputs: []
  };
  return {
  };
}
const _emptyContext = {
  currentQueryContext: new __compactRuntime.QueryContext(new __compactRuntime.ContractState().data, __compactRuntime.dummyContractAddress())
};
const _dummyContract = new Contract({ });
export const pureCircuits = {
  leafHash: (...args_0) => {
    if (args_0.length !== 7) {
      throw new __compactRuntime.CompactError(`leafHash: expected 7 arguments (as invoked from Typescript), received ${args_0.length}`);
    }
    const userIdHash_0 = args_0[0];
    const btcPos_0 = args_0[1];
    const btcNeg_0 = args_0[2];
    const ethPos_0 = args_0[3];
    const ethNeg_0 = args_0[4];
    const usdtPos_0 = args_0[5];
    const usdtNeg_0 = args_0[6];
    if (!(userIdHash_0.buffer instanceof ArrayBuffer && userIdHash_0.BYTES_PER_ELEMENT === 1 && userIdHash_0.length === 32)) {
      __compactRuntime.typeError('leafHash',
                                 'argument 1',
                                 'mst_bundle.compact line 36 char 1',
                                 'Bytes<32>',
                                 userIdHash_0)
    }
    if (!(typeof(btcPos_0) === 'bigint' && btcPos_0 >= 0n && btcPos_0 <= 18446744073709551615n)) {
      __compactRuntime.typeError('leafHash',
                                 'argument 2',
                                 'mst_bundle.compact line 36 char 1',
                                 'Uint<0..18446744073709551616>',
                                 btcPos_0)
    }
    if (!(typeof(btcNeg_0) === 'bigint' && btcNeg_0 >= 0n && btcNeg_0 <= 18446744073709551615n)) {
      __compactRuntime.typeError('leafHash',
                                 'argument 3',
                                 'mst_bundle.compact line 36 char 1',
                                 'Uint<0..18446744073709551616>',
                                 btcNeg_0)
    }
    if (!(typeof(ethPos_0) === 'bigint' && ethPos_0 >= 0n && ethPos_0 <= 18446744073709551615n)) {
      __compactRuntime.typeError('leafHash',
                                 'argument 4',
                                 'mst_bundle.compact line 36 char 1',
                                 'Uint<0..18446744073709551616>',
                                 ethPos_0)
    }
    if (!(typeof(ethNeg_0) === 'bigint' && ethNeg_0 >= 0n && ethNeg_0 <= 18446744073709551615n)) {
      __compactRuntime.typeError('leafHash',
                                 'argument 5',
                                 'mst_bundle.compact line 36 char 1',
                                 'Uint<0..18446744073709551616>',
                                 ethNeg_0)
    }
    if (!(typeof(usdtPos_0) === 'bigint' && usdtPos_0 >= 0n && usdtPos_0 <= 18446744073709551615n)) {
      __compactRuntime.typeError('leafHash',
                                 'argument 6',
                                 'mst_bundle.compact line 36 char 1',
                                 'Uint<0..18446744073709551616>',
                                 usdtPos_0)
    }
    if (!(typeof(usdtNeg_0) === 'bigint' && usdtNeg_0 >= 0n && usdtNeg_0 <= 18446744073709551615n)) {
      __compactRuntime.typeError('leafHash',
                                 'argument 7',
                                 'mst_bundle.compact line 36 char 1',
                                 'Uint<0..18446744073709551616>',
                                 usdtNeg_0)
    }
    return _dummyContract._leafHash_2(userIdHash_0,
                                      btcPos_0,
                                      btcNeg_0,
                                      ethPos_0,
                                      ethNeg_0,
                                      usdtPos_0,
                                      usdtNeg_0);
  },
  parentHash: (...args_0) => {
    if (args_0.length !== 2) {
      throw new __compactRuntime.CompactError(`parentHash: expected 2 arguments (as invoked from Typescript), received ${args_0.length}`);
    }
    const left_0 = args_0[0];
    const right_0 = args_0[1];
    if (!(typeof(left_0) === 'object' && left_0.hash.buffer instanceof ArrayBuffer && left_0.hash.BYTES_PER_ELEMENT === 1 && left_0.hash.length === 32 && typeof(left_0.btcPosSum) === 'bigint' && left_0.btcPosSum >= 0n && left_0.btcPosSum <= 340282366920938463463374607431768211455n && typeof(left_0.btcNegSum) === 'bigint' && left_0.btcNegSum >= 0n && left_0.btcNegSum <= 340282366920938463463374607431768211455n && typeof(left_0.ethPosSum) === 'bigint' && left_0.ethPosSum >= 0n && left_0.ethPosSum <= 340282366920938463463374607431768211455n && typeof(left_0.ethNegSum) === 'bigint' && left_0.ethNegSum >= 0n && left_0.ethNegSum <= 340282366920938463463374607431768211455n && typeof(left_0.usdtPosSum) === 'bigint' && left_0.usdtPosSum >= 0n && left_0.usdtPosSum <= 340282366920938463463374607431768211455n && typeof(left_0.usdtNegSum) === 'bigint' && left_0.usdtNegSum >= 0n && left_0.usdtNegSum <= 340282366920938463463374607431768211455n)) {
      __compactRuntime.typeError('parentHash',
                                 'argument 1',
                                 'mst_bundle.compact line 48 char 1',
                                 'struct MstNode<hash: Bytes<32>, btcPosSum: Uint<0..340282366920938463463374607431768211456>, btcNegSum: Uint<0..340282366920938463463374607431768211456>, ethPosSum: Uint<0..340282366920938463463374607431768211456>, ethNegSum: Uint<0..340282366920938463463374607431768211456>, usdtPosSum: Uint<0..340282366920938463463374607431768211456>, usdtNegSum: Uint<0..340282366920938463463374607431768211456>>',
                                 left_0)
    }
    if (!(typeof(right_0) === 'object' && right_0.hash.buffer instanceof ArrayBuffer && right_0.hash.BYTES_PER_ELEMENT === 1 && right_0.hash.length === 32 && typeof(right_0.btcPosSum) === 'bigint' && right_0.btcPosSum >= 0n && right_0.btcPosSum <= 340282366920938463463374607431768211455n && typeof(right_0.btcNegSum) === 'bigint' && right_0.btcNegSum >= 0n && right_0.btcNegSum <= 340282366920938463463374607431768211455n && typeof(right_0.ethPosSum) === 'bigint' && right_0.ethPosSum >= 0n && right_0.ethPosSum <= 340282366920938463463374607431768211455n && typeof(right_0.ethNegSum) === 'bigint' && right_0.ethNegSum >= 0n && right_0.ethNegSum <= 340282366920938463463374607431768211455n && typeof(right_0.usdtPosSum) === 'bigint' && right_0.usdtPosSum >= 0n && right_0.usdtPosSum <= 340282366920938463463374607431768211455n && typeof(right_0.usdtNegSum) === 'bigint' && right_0.usdtNegSum >= 0n && right_0.usdtNegSum <= 340282366920938463463374607431768211455n)) {
      __compactRuntime.typeError('parentHash',
                                 'argument 2',
                                 'mst_bundle.compact line 48 char 1',
                                 'struct MstNode<hash: Bytes<32>, btcPosSum: Uint<0..340282366920938463463374607431768211456>, btcNegSum: Uint<0..340282366920938463463374607431768211456>, ethPosSum: Uint<0..340282366920938463463374607431768211456>, ethNegSum: Uint<0..340282366920938463463374607431768211456>, usdtPosSum: Uint<0..340282366920938463463374607431768211456>, usdtNegSum: Uint<0..340282366920938463463374607431768211456>>',
                                 right_0)
    }
    return _dummyContract._parentHash_1(left_0, right_0);
  },
  mstRootFromLeaves: (...args_0) => {
    if (args_0.length !== 7) {
      throw new __compactRuntime.CompactError(`mstRootFromLeaves: expected 7 arguments (as invoked from Typescript), received ${args_0.length}`);
    }
    const userIds_0 = args_0[0];
    const btcPos_0 = args_0[1];
    const btcNeg_0 = args_0[2];
    const ethPos_0 = args_0[3];
    const ethNeg_0 = args_0[4];
    const usdtPos_0 = args_0[5];
    const usdtNeg_0 = args_0[6];
    if (!(Array.isArray(userIds_0) && userIds_0.length === 64 && userIds_0.every((t) => t.buffer instanceof ArrayBuffer && t.BYTES_PER_ELEMENT === 1 && t.length === 32))) {
      __compactRuntime.typeError('mstRootFromLeaves',
                                 'argument 1',
                                 'mst_bundle.compact line 82 char 1',
                                 'Vector<64, Bytes<32>>',
                                 userIds_0)
    }
    if (!(Array.isArray(btcPos_0) && btcPos_0.length === 64 && btcPos_0.every((t) => typeof(t) === 'bigint' && t >= 0n && t <= 18446744073709551615n))) {
      __compactRuntime.typeError('mstRootFromLeaves',
                                 'argument 2',
                                 'mst_bundle.compact line 82 char 1',
                                 'Vector<64, Uint<0..18446744073709551616>>',
                                 btcPos_0)
    }
    if (!(Array.isArray(btcNeg_0) && btcNeg_0.length === 64 && btcNeg_0.every((t) => typeof(t) === 'bigint' && t >= 0n && t <= 18446744073709551615n))) {
      __compactRuntime.typeError('mstRootFromLeaves',
                                 'argument 3',
                                 'mst_bundle.compact line 82 char 1',
                                 'Vector<64, Uint<0..18446744073709551616>>',
                                 btcNeg_0)
    }
    if (!(Array.isArray(ethPos_0) && ethPos_0.length === 64 && ethPos_0.every((t) => typeof(t) === 'bigint' && t >= 0n && t <= 18446744073709551615n))) {
      __compactRuntime.typeError('mstRootFromLeaves',
                                 'argument 4',
                                 'mst_bundle.compact line 82 char 1',
                                 'Vector<64, Uint<0..18446744073709551616>>',
                                 ethPos_0)
    }
    if (!(Array.isArray(ethNeg_0) && ethNeg_0.length === 64 && ethNeg_0.every((t) => typeof(t) === 'bigint' && t >= 0n && t <= 18446744073709551615n))) {
      __compactRuntime.typeError('mstRootFromLeaves',
                                 'argument 5',
                                 'mst_bundle.compact line 82 char 1',
                                 'Vector<64, Uint<0..18446744073709551616>>',
                                 ethNeg_0)
    }
    if (!(Array.isArray(usdtPos_0) && usdtPos_0.length === 64 && usdtPos_0.every((t) => typeof(t) === 'bigint' && t >= 0n && t <= 18446744073709551615n))) {
      __compactRuntime.typeError('mstRootFromLeaves',
                                 'argument 6',
                                 'mst_bundle.compact line 82 char 1',
                                 'Vector<64, Uint<0..18446744073709551616>>',
                                 usdtPos_0)
    }
    if (!(Array.isArray(usdtNeg_0) && usdtNeg_0.length === 64 && usdtNeg_0.every((t) => typeof(t) === 'bigint' && t >= 0n && t <= 18446744073709551615n))) {
      __compactRuntime.typeError('mstRootFromLeaves',
                                 'argument 7',
                                 'mst_bundle.compact line 82 char 1',
                                 'Vector<64, Uint<0..18446744073709551616>>',
                                 usdtNeg_0)
    }
    return _dummyContract._mstRootFromLeaves_0(userIds_0,
                                               btcPos_0,
                                               btcNeg_0,
                                               ethPos_0,
                                               ethNeg_0,
                                               usdtPos_0,
                                               usdtNeg_0);
  }
};
export const contractReferenceLocations =
  { tag: 'publicLedgerArray', indices: { } };
//# sourceMappingURL=index.js.map
