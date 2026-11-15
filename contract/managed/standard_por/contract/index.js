import * as __compactRuntime from '@midnight-ntwrk/compact-runtime';
__compactRuntime.checkRuntimeVersion('0.16.0');

const _descriptor_0 = new __compactRuntime.CompactTypeUnsignedInteger(18446744073709551615n, 8);

const _descriptor_1 = new __compactRuntime.CompactTypeVector(64, _descriptor_0);

const _descriptor_2 = __compactRuntime.CompactTypeBoolean;

const _descriptor_3 = new __compactRuntime.CompactTypeBytes(32);

const _descriptor_4 = new __compactRuntime.CompactTypeUnsignedInteger(340282366920938463463374607431768211455n, 16);

const _descriptor_5 = new __compactRuntime.CompactTypeVector(64, _descriptor_3);

class _MstNode_0 {
  alignment() {
    return _descriptor_3.alignment().concat(_descriptor_4.alignment().concat(_descriptor_4.alignment().concat(_descriptor_4.alignment().concat(_descriptor_4.alignment().concat(_descriptor_4.alignment().concat(_descriptor_4.alignment()))))));
  }
  fromValue(value_0) {
    return {
      hash: _descriptor_3.fromValue(value_0),
      btcPosSum: _descriptor_4.fromValue(value_0),
      btcNegSum: _descriptor_4.fromValue(value_0),
      ethPosSum: _descriptor_4.fromValue(value_0),
      ethNegSum: _descriptor_4.fromValue(value_0),
      usdtPosSum: _descriptor_4.fromValue(value_0),
      usdtNegSum: _descriptor_4.fromValue(value_0)
    }
  }
  toValue(value_0) {
    return _descriptor_3.toValue(value_0.hash).concat(_descriptor_4.toValue(value_0.btcPosSum).concat(_descriptor_4.toValue(value_0.btcNegSum).concat(_descriptor_4.toValue(value_0.ethPosSum).concat(_descriptor_4.toValue(value_0.ethNegSum).concat(_descriptor_4.toValue(value_0.usdtPosSum).concat(_descriptor_4.toValue(value_0.usdtNegSum)))))));
  }
}

const _descriptor_6 = new _MstNode_0();

class _ZswapCoinPublicKey_0 {
  alignment() {
    return _descriptor_3.alignment();
  }
  fromValue(value_0) {
    return {
      bytes: _descriptor_3.fromValue(value_0)
    }
  }
  toValue(value_0) {
    return _descriptor_3.toValue(value_0.bytes);
  }
}

const _descriptor_7 = new _ZswapCoinPublicKey_0();

class _ParentPreimage_0 {
  alignment() {
    return _descriptor_3.alignment().concat(_descriptor_3.alignment().concat(_descriptor_3.alignment().concat(_descriptor_4.alignment().concat(_descriptor_4.alignment().concat(_descriptor_4.alignment().concat(_descriptor_4.alignment().concat(_descriptor_4.alignment().concat(_descriptor_4.alignment()))))))));
  }
  fromValue(value_0) {
    return {
      domain: _descriptor_3.fromValue(value_0),
      leftHash: _descriptor_3.fromValue(value_0),
      rightHash: _descriptor_3.fromValue(value_0),
      btcPosSum: _descriptor_4.fromValue(value_0),
      btcNegSum: _descriptor_4.fromValue(value_0),
      ethPosSum: _descriptor_4.fromValue(value_0),
      ethNegSum: _descriptor_4.fromValue(value_0),
      usdtPosSum: _descriptor_4.fromValue(value_0),
      usdtNegSum: _descriptor_4.fromValue(value_0)
    }
  }
  toValue(value_0) {
    return _descriptor_3.toValue(value_0.domain).concat(_descriptor_3.toValue(value_0.leftHash).concat(_descriptor_3.toValue(value_0.rightHash).concat(_descriptor_4.toValue(value_0.btcPosSum).concat(_descriptor_4.toValue(value_0.btcNegSum).concat(_descriptor_4.toValue(value_0.ethPosSum).concat(_descriptor_4.toValue(value_0.ethNegSum).concat(_descriptor_4.toValue(value_0.usdtPosSum).concat(_descriptor_4.toValue(value_0.usdtNegSum)))))))));
  }
}

const _descriptor_8 = new _ParentPreimage_0();

class _LeafPreimage_0 {
  alignment() {
    return _descriptor_3.alignment().concat(_descriptor_3.alignment().concat(_descriptor_0.alignment().concat(_descriptor_0.alignment().concat(_descriptor_0.alignment().concat(_descriptor_0.alignment().concat(_descriptor_0.alignment().concat(_descriptor_0.alignment())))))));
  }
  fromValue(value_0) {
    return {
      domain: _descriptor_3.fromValue(value_0),
      userIdHash: _descriptor_3.fromValue(value_0),
      btcPos: _descriptor_0.fromValue(value_0),
      btcNeg: _descriptor_0.fromValue(value_0),
      ethPos: _descriptor_0.fromValue(value_0),
      ethNeg: _descriptor_0.fromValue(value_0),
      usdtPos: _descriptor_0.fromValue(value_0),
      usdtNeg: _descriptor_0.fromValue(value_0)
    }
  }
  toValue(value_0) {
    return _descriptor_3.toValue(value_0.domain).concat(_descriptor_3.toValue(value_0.userIdHash).concat(_descriptor_0.toValue(value_0.btcPos).concat(_descriptor_0.toValue(value_0.btcNeg).concat(_descriptor_0.toValue(value_0.ethPos).concat(_descriptor_0.toValue(value_0.ethNeg).concat(_descriptor_0.toValue(value_0.usdtPos).concat(_descriptor_0.toValue(value_0.usdtNeg))))))));
  }
}

const _descriptor_9 = new _LeafPreimage_0();

class _Either_0 {
  alignment() {
    return _descriptor_2.alignment().concat(_descriptor_3.alignment().concat(_descriptor_3.alignment()));
  }
  fromValue(value_0) {
    return {
      is_left: _descriptor_2.fromValue(value_0),
      left: _descriptor_3.fromValue(value_0),
      right: _descriptor_3.fromValue(value_0)
    }
  }
  toValue(value_0) {
    return _descriptor_2.toValue(value_0.is_left).concat(_descriptor_3.toValue(value_0.left).concat(_descriptor_3.toValue(value_0.right)));
  }
}

const _descriptor_10 = new _Either_0();

class _ContractAddress_0 {
  alignment() {
    return _descriptor_3.alignment();
  }
  fromValue(value_0) {
    return {
      bytes: _descriptor_3.fromValue(value_0)
    }
  }
  toValue(value_0) {
    return _descriptor_3.toValue(value_0.bytes);
  }
}

const _descriptor_11 = new _ContractAddress_0();

const _descriptor_12 = new __compactRuntime.CompactTypeUnsignedInteger(255n, 1);

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
    if (typeof(witnesses_0.batchUserIds) !== 'function') {
      throw new __compactRuntime.CompactError('first (witnesses) argument to Contract constructor does not contain a function-valued field named batchUserIds');
    }
    if (typeof(witnesses_0.batchBtcPos) !== 'function') {
      throw new __compactRuntime.CompactError('first (witnesses) argument to Contract constructor does not contain a function-valued field named batchBtcPos');
    }
    if (typeof(witnesses_0.batchBtcNeg) !== 'function') {
      throw new __compactRuntime.CompactError('first (witnesses) argument to Contract constructor does not contain a function-valued field named batchBtcNeg');
    }
    if (typeof(witnesses_0.batchEthPos) !== 'function') {
      throw new __compactRuntime.CompactError('first (witnesses) argument to Contract constructor does not contain a function-valued field named batchEthPos');
    }
    if (typeof(witnesses_0.batchEthNeg) !== 'function') {
      throw new __compactRuntime.CompactError('first (witnesses) argument to Contract constructor does not contain a function-valued field named batchEthNeg');
    }
    if (typeof(witnesses_0.batchUsdtPos) !== 'function') {
      throw new __compactRuntime.CompactError('first (witnesses) argument to Contract constructor does not contain a function-valued field named batchUsdtPos');
    }
    if (typeof(witnesses_0.batchUsdtNeg) !== 'function') {
      throw new __compactRuntime.CompactError('first (witnesses) argument to Contract constructor does not contain a function-valued field named batchUsdtNeg');
    }
    this.witnesses = witnesses_0;
    this.circuits = {
      submitSnapshot: (...args_1) => {
        if (args_1.length !== 10) {
          throw new __compactRuntime.CompactError(`submitSnapshot: expected 10 arguments (as invoked from Typescript), received ${args_1.length}`);
        }
        const contextOrig_0 = args_1[0];
        const seq_0 = args_1[1];
        const ts_0 = args_1[2];
        const priceBtcArg_0 = args_1[3];
        const priceEthArg_0 = args_1[4];
        const priceUsdtArg_0 = args_1[5];
        const declaredReservesBtcArg_0 = args_1[6];
        const declaredReservesEthArg_0 = args_1[7];
        const declaredReservesUsdtArg_0 = args_1[8];
        const rootHash_0 = args_1[9];
        if (!(typeof(contextOrig_0) === 'object' && contextOrig_0.currentQueryContext != undefined)) {
          __compactRuntime.typeError('submitSnapshot',
                                     'argument 1 (as invoked from Typescript)',
                                     'standard_por.compact line 72 char 1',
                                     'CircuitContext',
                                     contextOrig_0)
        }
        if (!(typeof(seq_0) === 'bigint' && seq_0 >= 0n && seq_0 <= 18446744073709551615n)) {
          __compactRuntime.typeError('submitSnapshot',
                                     'argument 1 (argument 2 as invoked from Typescript)',
                                     'standard_por.compact line 72 char 1',
                                     'Uint<0..18446744073709551616>',
                                     seq_0)
        }
        if (!(typeof(ts_0) === 'bigint' && ts_0 >= 0n && ts_0 <= 18446744073709551615n)) {
          __compactRuntime.typeError('submitSnapshot',
                                     'argument 2 (argument 3 as invoked from Typescript)',
                                     'standard_por.compact line 72 char 1',
                                     'Uint<0..18446744073709551616>',
                                     ts_0)
        }
        if (!(typeof(priceBtcArg_0) === 'bigint' && priceBtcArg_0 >= 0n && priceBtcArg_0 <= 18446744073709551615n)) {
          __compactRuntime.typeError('submitSnapshot',
                                     'argument 3 (argument 4 as invoked from Typescript)',
                                     'standard_por.compact line 72 char 1',
                                     'Uint<0..18446744073709551616>',
                                     priceBtcArg_0)
        }
        if (!(typeof(priceEthArg_0) === 'bigint' && priceEthArg_0 >= 0n && priceEthArg_0 <= 18446744073709551615n)) {
          __compactRuntime.typeError('submitSnapshot',
                                     'argument 4 (argument 5 as invoked from Typescript)',
                                     'standard_por.compact line 72 char 1',
                                     'Uint<0..18446744073709551616>',
                                     priceEthArg_0)
        }
        if (!(typeof(priceUsdtArg_0) === 'bigint' && priceUsdtArg_0 >= 0n && priceUsdtArg_0 <= 18446744073709551615n)) {
          __compactRuntime.typeError('submitSnapshot',
                                     'argument 5 (argument 6 as invoked from Typescript)',
                                     'standard_por.compact line 72 char 1',
                                     'Uint<0..18446744073709551616>',
                                     priceUsdtArg_0)
        }
        if (!(typeof(declaredReservesBtcArg_0) === 'bigint' && declaredReservesBtcArg_0 >= 0n && declaredReservesBtcArg_0 <= 18446744073709551615n)) {
          __compactRuntime.typeError('submitSnapshot',
                                     'argument 6 (argument 7 as invoked from Typescript)',
                                     'standard_por.compact line 72 char 1',
                                     'Uint<0..18446744073709551616>',
                                     declaredReservesBtcArg_0)
        }
        if (!(typeof(declaredReservesEthArg_0) === 'bigint' && declaredReservesEthArg_0 >= 0n && declaredReservesEthArg_0 <= 18446744073709551615n)) {
          __compactRuntime.typeError('submitSnapshot',
                                     'argument 7 (argument 8 as invoked from Typescript)',
                                     'standard_por.compact line 72 char 1',
                                     'Uint<0..18446744073709551616>',
                                     declaredReservesEthArg_0)
        }
        if (!(typeof(declaredReservesUsdtArg_0) === 'bigint' && declaredReservesUsdtArg_0 >= 0n && declaredReservesUsdtArg_0 <= 18446744073709551615n)) {
          __compactRuntime.typeError('submitSnapshot',
                                     'argument 8 (argument 9 as invoked from Typescript)',
                                     'standard_por.compact line 72 char 1',
                                     'Uint<0..18446744073709551616>',
                                     declaredReservesUsdtArg_0)
        }
        if (!(rootHash_0.buffer instanceof ArrayBuffer && rootHash_0.BYTES_PER_ELEMENT === 1 && rootHash_0.length === 32)) {
          __compactRuntime.typeError('submitSnapshot',
                                     'argument 9 (argument 10 as invoked from Typescript)',
                                     'standard_por.compact line 72 char 1',
                                     'Bytes<32>',
                                     rootHash_0)
        }
        const context = { ...contextOrig_0, gasCost: __compactRuntime.emptyRunningCost() };
        const partialProofData = {
          input: {
            value: _descriptor_0.toValue(seq_0).concat(_descriptor_0.toValue(ts_0).concat(_descriptor_0.toValue(priceBtcArg_0).concat(_descriptor_0.toValue(priceEthArg_0).concat(_descriptor_0.toValue(priceUsdtArg_0).concat(_descriptor_0.toValue(declaredReservesBtcArg_0).concat(_descriptor_0.toValue(declaredReservesEthArg_0).concat(_descriptor_0.toValue(declaredReservesUsdtArg_0).concat(_descriptor_3.toValue(rootHash_0))))))))),
            alignment: _descriptor_0.alignment().concat(_descriptor_0.alignment().concat(_descriptor_0.alignment().concat(_descriptor_0.alignment().concat(_descriptor_0.alignment().concat(_descriptor_0.alignment().concat(_descriptor_0.alignment().concat(_descriptor_0.alignment().concat(_descriptor_3.alignment()))))))))
          },
          output: undefined,
          publicTranscript: [],
          privateTranscriptOutputs: []
        };
        const result_0 = this._submitSnapshot_0(context,
                                                partialProofData,
                                                seq_0,
                                                ts_0,
                                                priceBtcArg_0,
                                                priceEthArg_0,
                                                priceUsdtArg_0,
                                                declaredReservesBtcArg_0,
                                                declaredReservesEthArg_0,
                                                declaredReservesUsdtArg_0,
                                                rootHash_0);
        partialProofData.output = { value: [], alignment: [] };
        return { result: result_0, context: context, proofData: partialProofData, gasCost: context.gasCost };
      }
    };
    this.impureCircuits = { submitSnapshot: this.circuits.submitSnapshot };
    this.provableCircuits = { submitSnapshot: this.circuits.submitSnapshot };
  }
  initialState(...args_0) {
    if (args_0.length !== 2) {
      throw new __compactRuntime.CompactError(`Contract state constructor: expected 2 arguments (as invoked from Typescript), received ${args_0.length}`);
    }
    const constructorContext_0 = args_0[0];
    const pk_0 = args_0[1];
    if (typeof(constructorContext_0) !== 'object') {
      throw new __compactRuntime.CompactError(`Contract state constructor: expected 'constructorContext' in argument 1 (as invoked from Typescript) to be an object`);
    }
    if (!('initialPrivateState' in constructorContext_0)) {
      throw new __compactRuntime.CompactError(`Contract state constructor: expected 'initialPrivateState' in argument 1 (as invoked from Typescript)`);
    }
    if (!('initialZswapLocalState' in constructorContext_0)) {
      throw new __compactRuntime.CompactError(`Contract state constructor: expected 'initialZswapLocalState' in argument 1 (as invoked from Typescript)`);
    }
    if (typeof(constructorContext_0.initialZswapLocalState) !== 'object') {
      throw new __compactRuntime.CompactError(`Contract state constructor: expected 'initialZswapLocalState' in argument 1 (as invoked from Typescript) to be an object`);
    }
    if (!(pk_0.buffer instanceof ArrayBuffer && pk_0.BYTES_PER_ELEMENT === 1 && pk_0.length === 32)) {
      __compactRuntime.typeError('Contract state constructor',
                                 'argument 1 (argument 2 as invoked from Typescript)',
                                 'standard_por.compact line 44 char 1',
                                 'Bytes<32>',
                                 pk_0)
    }
    const state_0 = new __compactRuntime.ContractState();
    let stateValue_0 = __compactRuntime.StateValue.newArray();
    let stateValue_2 = __compactRuntime.StateValue.newArray();
    stateValue_2 = stateValue_2.arrayPush(__compactRuntime.StateValue.newNull());
    stateValue_2 = stateValue_2.arrayPush(__compactRuntime.StateValue.newNull());
    stateValue_0 = stateValue_0.arrayPush(stateValue_2);
    let stateValue_1 = __compactRuntime.StateValue.newArray();
    stateValue_1 = stateValue_1.arrayPush(__compactRuntime.StateValue.newNull());
    stateValue_1 = stateValue_1.arrayPush(__compactRuntime.StateValue.newNull());
    stateValue_1 = stateValue_1.arrayPush(__compactRuntime.StateValue.newNull());
    stateValue_1 = stateValue_1.arrayPush(__compactRuntime.StateValue.newNull());
    stateValue_1 = stateValue_1.arrayPush(__compactRuntime.StateValue.newNull());
    stateValue_1 = stateValue_1.arrayPush(__compactRuntime.StateValue.newNull());
    stateValue_1 = stateValue_1.arrayPush(__compactRuntime.StateValue.newNull());
    stateValue_1 = stateValue_1.arrayPush(__compactRuntime.StateValue.newNull());
    stateValue_1 = stateValue_1.arrayPush(__compactRuntime.StateValue.newNull());
    stateValue_1 = stateValue_1.arrayPush(__compactRuntime.StateValue.newNull());
    stateValue_1 = stateValue_1.arrayPush(__compactRuntime.StateValue.newNull());
    stateValue_1 = stateValue_1.arrayPush(__compactRuntime.StateValue.newNull());
    stateValue_1 = stateValue_1.arrayPush(__compactRuntime.StateValue.newNull());
    stateValue_1 = stateValue_1.arrayPush(__compactRuntime.StateValue.newNull());
    stateValue_1 = stateValue_1.arrayPush(__compactRuntime.StateValue.newNull());
    stateValue_0 = stateValue_0.arrayPush(stateValue_1);
    state_0.data = new __compactRuntime.ChargedState(stateValue_0);
    state_0.setOperation('submitSnapshot', new __compactRuntime.ContractOperation());
    const context = __compactRuntime.createCircuitContext(__compactRuntime.dummyContractAddress(), constructorContext_0.initialZswapLocalState.coinPublicKey, state_0.data, constructorContext_0.initialPrivateState);
    const partialProofData = {
      input: { value: [], alignment: [] },
      output: undefined,
      publicTranscript: [],
      privateTranscriptOutputs: []
    };
    __compactRuntime.queryLedgerState(context,
                                      partialProofData,
                                      [
                                       { idx: { cached: false,
                                                pushPath: true,
                                                path: [
                                                       { tag: 'value',
                                                         value: { value: _descriptor_12.toValue(0n),
                                                                  alignment: _descriptor_12.alignment() } }] } },
                                       { push: { storage: false,
                                                 value: __compactRuntime.StateValue.newCell({ value: _descriptor_12.toValue(0n),
                                                                                              alignment: _descriptor_12.alignment() }).encode() } },
                                       { push: { storage: true,
                                                 value: __compactRuntime.StateValue.newCell({ value: _descriptor_3.toValue(new Uint8Array(32)),
                                                                                              alignment: _descriptor_3.alignment() }).encode() } },
                                       { ins: { cached: false, n: 1 } },
                                       { ins: { cached: true, n: 1 } }]);
    __compactRuntime.queryLedgerState(context,
                                      partialProofData,
                                      [
                                       { idx: { cached: false,
                                                pushPath: true,
                                                path: [
                                                       { tag: 'value',
                                                         value: { value: _descriptor_12.toValue(0n),
                                                                  alignment: _descriptor_12.alignment() } }] } },
                                       { push: { storage: false,
                                                 value: __compactRuntime.StateValue.newCell({ value: _descriptor_12.toValue(1n),
                                                                                              alignment: _descriptor_12.alignment() }).encode() } },
                                       { push: { storage: true,
                                                 value: __compactRuntime.StateValue.newCell({ value: _descriptor_0.toValue(0n),
                                                                                              alignment: _descriptor_0.alignment() }).encode() } },
                                       { ins: { cached: false, n: 1 } },
                                       { ins: { cached: true, n: 1 } }]);
    __compactRuntime.queryLedgerState(context,
                                      partialProofData,
                                      [
                                       { idx: { cached: false,
                                                pushPath: true,
                                                path: [
                                                       { tag: 'value',
                                                         value: { value: _descriptor_12.toValue(1n),
                                                                  alignment: _descriptor_12.alignment() } }] } },
                                       { push: { storage: false,
                                                 value: __compactRuntime.StateValue.newCell({ value: _descriptor_12.toValue(0n),
                                                                                              alignment: _descriptor_12.alignment() }).encode() } },
                                       { push: { storage: true,
                                                 value: __compactRuntime.StateValue.newCell({ value: _descriptor_0.toValue(0n),
                                                                                              alignment: _descriptor_0.alignment() }).encode() } },
                                       { ins: { cached: false, n: 1 } },
                                       { ins: { cached: true, n: 1 } }]);
    __compactRuntime.queryLedgerState(context,
                                      partialProofData,
                                      [
                                       { idx: { cached: false,
                                                pushPath: true,
                                                path: [
                                                       { tag: 'value',
                                                         value: { value: _descriptor_12.toValue(1n),
                                                                  alignment: _descriptor_12.alignment() } }] } },
                                       { push: { storage: false,
                                                 value: __compactRuntime.StateValue.newCell({ value: _descriptor_12.toValue(1n),
                                                                                              alignment: _descriptor_12.alignment() }).encode() } },
                                       { push: { storage: true,
                                                 value: __compactRuntime.StateValue.newCell({ value: _descriptor_3.toValue(new Uint8Array(32)),
                                                                                              alignment: _descriptor_3.alignment() }).encode() } },
                                       { ins: { cached: false, n: 1 } },
                                       { ins: { cached: true, n: 1 } }]);
    __compactRuntime.queryLedgerState(context,
                                      partialProofData,
                                      [
                                       { idx: { cached: false,
                                                pushPath: true,
                                                path: [
                                                       { tag: 'value',
                                                         value: { value: _descriptor_12.toValue(1n),
                                                                  alignment: _descriptor_12.alignment() } }] } },
                                       { push: { storage: false,
                                                 value: __compactRuntime.StateValue.newCell({ value: _descriptor_12.toValue(2n),
                                                                                              alignment: _descriptor_12.alignment() }).encode() } },
                                       { push: { storage: true,
                                                 value: __compactRuntime.StateValue.newCell({ value: _descriptor_0.toValue(0n),
                                                                                              alignment: _descriptor_0.alignment() }).encode() } },
                                       { ins: { cached: false, n: 1 } },
                                       { ins: { cached: true, n: 1 } }]);
    __compactRuntime.queryLedgerState(context,
                                      partialProofData,
                                      [
                                       { idx: { cached: false,
                                                pushPath: true,
                                                path: [
                                                       { tag: 'value',
                                                         value: { value: _descriptor_12.toValue(1n),
                                                                  alignment: _descriptor_12.alignment() } }] } },
                                       { push: { storage: false,
                                                 value: __compactRuntime.StateValue.newCell({ value: _descriptor_12.toValue(3n),
                                                                                              alignment: _descriptor_12.alignment() }).encode() } },
                                       { push: { storage: true,
                                                 value: __compactRuntime.StateValue.newCell({ value: _descriptor_0.toValue(0n),
                                                                                              alignment: _descriptor_0.alignment() }).encode() } },
                                       { ins: { cached: false, n: 1 } },
                                       { ins: { cached: true, n: 1 } }]);
    __compactRuntime.queryLedgerState(context,
                                      partialProofData,
                                      [
                                       { idx: { cached: false,
                                                pushPath: true,
                                                path: [
                                                       { tag: 'value',
                                                         value: { value: _descriptor_12.toValue(1n),
                                                                  alignment: _descriptor_12.alignment() } }] } },
                                       { push: { storage: false,
                                                 value: __compactRuntime.StateValue.newCell({ value: _descriptor_12.toValue(4n),
                                                                                              alignment: _descriptor_12.alignment() }).encode() } },
                                       { push: { storage: true,
                                                 value: __compactRuntime.StateValue.newCell({ value: _descriptor_0.toValue(0n),
                                                                                              alignment: _descriptor_0.alignment() }).encode() } },
                                       { ins: { cached: false, n: 1 } },
                                       { ins: { cached: true, n: 1 } }]);
    __compactRuntime.queryLedgerState(context,
                                      partialProofData,
                                      [
                                       { idx: { cached: false,
                                                pushPath: true,
                                                path: [
                                                       { tag: 'value',
                                                         value: { value: _descriptor_12.toValue(1n),
                                                                  alignment: _descriptor_12.alignment() } }] } },
                                       { push: { storage: false,
                                                 value: __compactRuntime.StateValue.newCell({ value: _descriptor_12.toValue(5n),
                                                                                              alignment: _descriptor_12.alignment() }).encode() } },
                                       { push: { storage: true,
                                                 value: __compactRuntime.StateValue.newCell({ value: _descriptor_0.toValue(0n),
                                                                                              alignment: _descriptor_0.alignment() }).encode() } },
                                       { ins: { cached: false, n: 1 } },
                                       { ins: { cached: true, n: 1 } }]);
    __compactRuntime.queryLedgerState(context,
                                      partialProofData,
                                      [
                                       { idx: { cached: false,
                                                pushPath: true,
                                                path: [
                                                       { tag: 'value',
                                                         value: { value: _descriptor_12.toValue(1n),
                                                                  alignment: _descriptor_12.alignment() } }] } },
                                       { push: { storage: false,
                                                 value: __compactRuntime.StateValue.newCell({ value: _descriptor_12.toValue(6n),
                                                                                              alignment: _descriptor_12.alignment() }).encode() } },
                                       { push: { storage: true,
                                                 value: __compactRuntime.StateValue.newCell({ value: _descriptor_0.toValue(0n),
                                                                                              alignment: _descriptor_0.alignment() }).encode() } },
                                       { ins: { cached: false, n: 1 } },
                                       { ins: { cached: true, n: 1 } }]);
    __compactRuntime.queryLedgerState(context,
                                      partialProofData,
                                      [
                                       { idx: { cached: false,
                                                pushPath: true,
                                                path: [
                                                       { tag: 'value',
                                                         value: { value: _descriptor_12.toValue(1n),
                                                                  alignment: _descriptor_12.alignment() } }] } },
                                       { push: { storage: false,
                                                 value: __compactRuntime.StateValue.newCell({ value: _descriptor_12.toValue(7n),
                                                                                              alignment: _descriptor_12.alignment() }).encode() } },
                                       { push: { storage: true,
                                                 value: __compactRuntime.StateValue.newCell({ value: _descriptor_0.toValue(0n),
                                                                                              alignment: _descriptor_0.alignment() }).encode() } },
                                       { ins: { cached: false, n: 1 } },
                                       { ins: { cached: true, n: 1 } }]);
    __compactRuntime.queryLedgerState(context,
                                      partialProofData,
                                      [
                                       { idx: { cached: false,
                                                pushPath: true,
                                                path: [
                                                       { tag: 'value',
                                                         value: { value: _descriptor_12.toValue(1n),
                                                                  alignment: _descriptor_12.alignment() } }] } },
                                       { push: { storage: false,
                                                 value: __compactRuntime.StateValue.newCell({ value: _descriptor_12.toValue(8n),
                                                                                              alignment: _descriptor_12.alignment() }).encode() } },
                                       { push: { storage: true,
                                                 value: __compactRuntime.StateValue.newCell({ value: _descriptor_4.toValue(0n),
                                                                                              alignment: _descriptor_4.alignment() }).encode() } },
                                       { ins: { cached: false, n: 1 } },
                                       { ins: { cached: true, n: 1 } }]);
    __compactRuntime.queryLedgerState(context,
                                      partialProofData,
                                      [
                                       { idx: { cached: false,
                                                pushPath: true,
                                                path: [
                                                       { tag: 'value',
                                                         value: { value: _descriptor_12.toValue(1n),
                                                                  alignment: _descriptor_12.alignment() } }] } },
                                       { push: { storage: false,
                                                 value: __compactRuntime.StateValue.newCell({ value: _descriptor_12.toValue(9n),
                                                                                              alignment: _descriptor_12.alignment() }).encode() } },
                                       { push: { storage: true,
                                                 value: __compactRuntime.StateValue.newCell({ value: _descriptor_4.toValue(0n),
                                                                                              alignment: _descriptor_4.alignment() }).encode() } },
                                       { ins: { cached: false, n: 1 } },
                                       { ins: { cached: true, n: 1 } }]);
    __compactRuntime.queryLedgerState(context,
                                      partialProofData,
                                      [
                                       { idx: { cached: false,
                                                pushPath: true,
                                                path: [
                                                       { tag: 'value',
                                                         value: { value: _descriptor_12.toValue(1n),
                                                                  alignment: _descriptor_12.alignment() } }] } },
                                       { push: { storage: false,
                                                 value: __compactRuntime.StateValue.newCell({ value: _descriptor_12.toValue(10n),
                                                                                              alignment: _descriptor_12.alignment() }).encode() } },
                                       { push: { storage: true,
                                                 value: __compactRuntime.StateValue.newCell({ value: _descriptor_4.toValue(0n),
                                                                                              alignment: _descriptor_4.alignment() }).encode() } },
                                       { ins: { cached: false, n: 1 } },
                                       { ins: { cached: true, n: 1 } }]);
    __compactRuntime.queryLedgerState(context,
                                      partialProofData,
                                      [
                                       { idx: { cached: false,
                                                pushPath: true,
                                                path: [
                                                       { tag: 'value',
                                                         value: { value: _descriptor_12.toValue(1n),
                                                                  alignment: _descriptor_12.alignment() } }] } },
                                       { push: { storage: false,
                                                 value: __compactRuntime.StateValue.newCell({ value: _descriptor_12.toValue(11n),
                                                                                              alignment: _descriptor_12.alignment() }).encode() } },
                                       { push: { storage: true,
                                                 value: __compactRuntime.StateValue.newCell({ value: _descriptor_4.toValue(0n),
                                                                                              alignment: _descriptor_4.alignment() }).encode() } },
                                       { ins: { cached: false, n: 1 } },
                                       { ins: { cached: true, n: 1 } }]);
    __compactRuntime.queryLedgerState(context,
                                      partialProofData,
                                      [
                                       { idx: { cached: false,
                                                pushPath: true,
                                                path: [
                                                       { tag: 'value',
                                                         value: { value: _descriptor_12.toValue(1n),
                                                                  alignment: _descriptor_12.alignment() } }] } },
                                       { push: { storage: false,
                                                 value: __compactRuntime.StateValue.newCell({ value: _descriptor_12.toValue(12n),
                                                                                              alignment: _descriptor_12.alignment() }).encode() } },
                                       { push: { storage: true,
                                                 value: __compactRuntime.StateValue.newCell({ value: _descriptor_4.toValue(0n),
                                                                                              alignment: _descriptor_4.alignment() }).encode() } },
                                       { ins: { cached: false, n: 1 } },
                                       { ins: { cached: true, n: 1 } }]);
    __compactRuntime.queryLedgerState(context,
                                      partialProofData,
                                      [
                                       { idx: { cached: false,
                                                pushPath: true,
                                                path: [
                                                       { tag: 'value',
                                                         value: { value: _descriptor_12.toValue(1n),
                                                                  alignment: _descriptor_12.alignment() } }] } },
                                       { push: { storage: false,
                                                 value: __compactRuntime.StateValue.newCell({ value: _descriptor_12.toValue(13n),
                                                                                              alignment: _descriptor_12.alignment() }).encode() } },
                                       { push: { storage: true,
                                                 value: __compactRuntime.StateValue.newCell({ value: _descriptor_4.toValue(0n),
                                                                                              alignment: _descriptor_4.alignment() }).encode() } },
                                       { ins: { cached: false, n: 1 } },
                                       { ins: { cached: true, n: 1 } }]);
    __compactRuntime.queryLedgerState(context,
                                      partialProofData,
                                      [
                                       { idx: { cached: false,
                                                pushPath: true,
                                                path: [
                                                       { tag: 'value',
                                                         value: { value: _descriptor_12.toValue(1n),
                                                                  alignment: _descriptor_12.alignment() } }] } },
                                       { push: { storage: false,
                                                 value: __compactRuntime.StateValue.newCell({ value: _descriptor_12.toValue(14n),
                                                                                              alignment: _descriptor_12.alignment() }).encode() } },
                                       { push: { storage: true,
                                                 value: __compactRuntime.StateValue.newCell({ value: _descriptor_2.toValue(false),
                                                                                              alignment: _descriptor_2.alignment() }).encode() } },
                                       { ins: { cached: false, n: 1 } },
                                       { ins: { cached: true, n: 1 } }]);
    __compactRuntime.queryLedgerState(context,
                                      partialProofData,
                                      [
                                       { idx: { cached: false,
                                                pushPath: true,
                                                path: [
                                                       { tag: 'value',
                                                         value: { value: _descriptor_12.toValue(0n),
                                                                  alignment: _descriptor_12.alignment() } }] } },
                                       { push: { storage: false,
                                                 value: __compactRuntime.StateValue.newCell({ value: _descriptor_12.toValue(0n),
                                                                                              alignment: _descriptor_12.alignment() }).encode() } },
                                       { push: { storage: true,
                                                 value: __compactRuntime.StateValue.newCell({ value: _descriptor_3.toValue(pk_0),
                                                                                              alignment: _descriptor_3.alignment() }).encode() } },
                                       { ins: { cached: false, n: 1 } },
                                       { ins: { cached: true, n: 1 } }]);
    __compactRuntime.queryLedgerState(context,
                                      partialProofData,
                                      [
                                       { idx: { cached: false,
                                                pushPath: true,
                                                path: [
                                                       { tag: 'value',
                                                         value: { value: _descriptor_12.toValue(1n),
                                                                  alignment: _descriptor_12.alignment() } }] } },
                                       { push: { storage: false,
                                                 value: __compactRuntime.StateValue.newCell({ value: _descriptor_12.toValue(14n),
                                                                                              alignment: _descriptor_12.alignment() }).encode() } },
                                       { push: { storage: true,
                                                 value: __compactRuntime.StateValue.newCell({ value: _descriptor_2.toValue(false),
                                                                                              alignment: _descriptor_2.alignment() }).encode() } },
                                       { ins: { cached: false, n: 1 } },
                                       { ins: { cached: true, n: 1 } }]);
    const tmp_0 = 0n;
    __compactRuntime.queryLedgerState(context,
                                      partialProofData,
                                      [
                                       { idx: { cached: false,
                                                pushPath: true,
                                                path: [
                                                       { tag: 'value',
                                                         value: { value: _descriptor_12.toValue(0n),
                                                                  alignment: _descriptor_12.alignment() } }] } },
                                       { push: { storage: false,
                                                 value: __compactRuntime.StateValue.newCell({ value: _descriptor_12.toValue(1n),
                                                                                              alignment: _descriptor_12.alignment() }).encode() } },
                                       { push: { storage: true,
                                                 value: __compactRuntime.StateValue.newCell({ value: _descriptor_0.toValue(tmp_0),
                                                                                              alignment: _descriptor_0.alignment() }).encode() } },
                                       { ins: { cached: false, n: 1 } },
                                       { ins: { cached: true, n: 1 } }]);
    const tmp_1 = 0n;
    __compactRuntime.queryLedgerState(context,
                                      partialProofData,
                                      [
                                       { idx: { cached: false,
                                                pushPath: true,
                                                path: [
                                                       { tag: 'value',
                                                         value: { value: _descriptor_12.toValue(1n),
                                                                  alignment: _descriptor_12.alignment() } }] } },
                                       { push: { storage: false,
                                                 value: __compactRuntime.StateValue.newCell({ value: _descriptor_12.toValue(0n),
                                                                                              alignment: _descriptor_12.alignment() }).encode() } },
                                       { push: { storage: true,
                                                 value: __compactRuntime.StateValue.newCell({ value: _descriptor_0.toValue(tmp_1),
                                                                                              alignment: _descriptor_0.alignment() }).encode() } },
                                       { ins: { cached: false, n: 1 } },
                                       { ins: { cached: true, n: 1 } }]);
    __compactRuntime.queryLedgerState(context,
                                      partialProofData,
                                      [
                                       { idx: { cached: false,
                                                pushPath: true,
                                                path: [
                                                       { tag: 'value',
                                                         value: { value: _descriptor_12.toValue(1n),
                                                                  alignment: _descriptor_12.alignment() } }] } },
                                       { push: { storage: false,
                                                 value: __compactRuntime.StateValue.newCell({ value: _descriptor_12.toValue(1n),
                                                                                              alignment: _descriptor_12.alignment() }).encode() } },
                                       { push: { storage: true,
                                                 value: __compactRuntime.StateValue.newCell({ value: _descriptor_3.toValue(new Uint8Array([0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0])),
                                                                                              alignment: _descriptor_3.alignment() }).encode() } },
                                       { ins: { cached: false, n: 1 } },
                                       { ins: { cached: true, n: 1 } }]);
    const tmp_2 = 0n;
    __compactRuntime.queryLedgerState(context,
                                      partialProofData,
                                      [
                                       { idx: { cached: false,
                                                pushPath: true,
                                                path: [
                                                       { tag: 'value',
                                                         value: { value: _descriptor_12.toValue(1n),
                                                                  alignment: _descriptor_12.alignment() } }] } },
                                       { push: { storage: false,
                                                 value: __compactRuntime.StateValue.newCell({ value: _descriptor_12.toValue(2n),
                                                                                              alignment: _descriptor_12.alignment() }).encode() } },
                                       { push: { storage: true,
                                                 value: __compactRuntime.StateValue.newCell({ value: _descriptor_0.toValue(tmp_2),
                                                                                              alignment: _descriptor_0.alignment() }).encode() } },
                                       { ins: { cached: false, n: 1 } },
                                       { ins: { cached: true, n: 1 } }]);
    const tmp_3 = 0n;
    __compactRuntime.queryLedgerState(context,
                                      partialProofData,
                                      [
                                       { idx: { cached: false,
                                                pushPath: true,
                                                path: [
                                                       { tag: 'value',
                                                         value: { value: _descriptor_12.toValue(1n),
                                                                  alignment: _descriptor_12.alignment() } }] } },
                                       { push: { storage: false,
                                                 value: __compactRuntime.StateValue.newCell({ value: _descriptor_12.toValue(3n),
                                                                                              alignment: _descriptor_12.alignment() }).encode() } },
                                       { push: { storage: true,
                                                 value: __compactRuntime.StateValue.newCell({ value: _descriptor_0.toValue(tmp_3),
                                                                                              alignment: _descriptor_0.alignment() }).encode() } },
                                       { ins: { cached: false, n: 1 } },
                                       { ins: { cached: true, n: 1 } }]);
    const tmp_4 = 0n;
    __compactRuntime.queryLedgerState(context,
                                      partialProofData,
                                      [
                                       { idx: { cached: false,
                                                pushPath: true,
                                                path: [
                                                       { tag: 'value',
                                                         value: { value: _descriptor_12.toValue(1n),
                                                                  alignment: _descriptor_12.alignment() } }] } },
                                       { push: { storage: false,
                                                 value: __compactRuntime.StateValue.newCell({ value: _descriptor_12.toValue(4n),
                                                                                              alignment: _descriptor_12.alignment() }).encode() } },
                                       { push: { storage: true,
                                                 value: __compactRuntime.StateValue.newCell({ value: _descriptor_0.toValue(tmp_4),
                                                                                              alignment: _descriptor_0.alignment() }).encode() } },
                                       { ins: { cached: false, n: 1 } },
                                       { ins: { cached: true, n: 1 } }]);
    const tmp_5 = 0n;
    __compactRuntime.queryLedgerState(context,
                                      partialProofData,
                                      [
                                       { idx: { cached: false,
                                                pushPath: true,
                                                path: [
                                                       { tag: 'value',
                                                         value: { value: _descriptor_12.toValue(1n),
                                                                  alignment: _descriptor_12.alignment() } }] } },
                                       { push: { storage: false,
                                                 value: __compactRuntime.StateValue.newCell({ value: _descriptor_12.toValue(5n),
                                                                                              alignment: _descriptor_12.alignment() }).encode() } },
                                       { push: { storage: true,
                                                 value: __compactRuntime.StateValue.newCell({ value: _descriptor_0.toValue(tmp_5),
                                                                                              alignment: _descriptor_0.alignment() }).encode() } },
                                       { ins: { cached: false, n: 1 } },
                                       { ins: { cached: true, n: 1 } }]);
    const tmp_6 = 0n;
    __compactRuntime.queryLedgerState(context,
                                      partialProofData,
                                      [
                                       { idx: { cached: false,
                                                pushPath: true,
                                                path: [
                                                       { tag: 'value',
                                                         value: { value: _descriptor_12.toValue(1n),
                                                                  alignment: _descriptor_12.alignment() } }] } },
                                       { push: { storage: false,
                                                 value: __compactRuntime.StateValue.newCell({ value: _descriptor_12.toValue(6n),
                                                                                              alignment: _descriptor_12.alignment() }).encode() } },
                                       { push: { storage: true,
                                                 value: __compactRuntime.StateValue.newCell({ value: _descriptor_0.toValue(tmp_6),
                                                                                              alignment: _descriptor_0.alignment() }).encode() } },
                                       { ins: { cached: false, n: 1 } },
                                       { ins: { cached: true, n: 1 } }]);
    const tmp_7 = 0n;
    __compactRuntime.queryLedgerState(context,
                                      partialProofData,
                                      [
                                       { idx: { cached: false,
                                                pushPath: true,
                                                path: [
                                                       { tag: 'value',
                                                         value: { value: _descriptor_12.toValue(1n),
                                                                  alignment: _descriptor_12.alignment() } }] } },
                                       { push: { storage: false,
                                                 value: __compactRuntime.StateValue.newCell({ value: _descriptor_12.toValue(7n),
                                                                                              alignment: _descriptor_12.alignment() }).encode() } },
                                       { push: { storage: true,
                                                 value: __compactRuntime.StateValue.newCell({ value: _descriptor_0.toValue(tmp_7),
                                                                                              alignment: _descriptor_0.alignment() }).encode() } },
                                       { ins: { cached: false, n: 1 } },
                                       { ins: { cached: true, n: 1 } }]);
    const tmp_8 = 0n;
    __compactRuntime.queryLedgerState(context,
                                      partialProofData,
                                      [
                                       { idx: { cached: false,
                                                pushPath: true,
                                                path: [
                                                       { tag: 'value',
                                                         value: { value: _descriptor_12.toValue(1n),
                                                                  alignment: _descriptor_12.alignment() } }] } },
                                       { push: { storage: false,
                                                 value: __compactRuntime.StateValue.newCell({ value: _descriptor_12.toValue(8n),
                                                                                              alignment: _descriptor_12.alignment() }).encode() } },
                                       { push: { storage: true,
                                                 value: __compactRuntime.StateValue.newCell({ value: _descriptor_4.toValue(tmp_8),
                                                                                              alignment: _descriptor_4.alignment() }).encode() } },
                                       { ins: { cached: false, n: 1 } },
                                       { ins: { cached: true, n: 1 } }]);
    const tmp_9 = 0n;
    __compactRuntime.queryLedgerState(context,
                                      partialProofData,
                                      [
                                       { idx: { cached: false,
                                                pushPath: true,
                                                path: [
                                                       { tag: 'value',
                                                         value: { value: _descriptor_12.toValue(1n),
                                                                  alignment: _descriptor_12.alignment() } }] } },
                                       { push: { storage: false,
                                                 value: __compactRuntime.StateValue.newCell({ value: _descriptor_12.toValue(9n),
                                                                                              alignment: _descriptor_12.alignment() }).encode() } },
                                       { push: { storage: true,
                                                 value: __compactRuntime.StateValue.newCell({ value: _descriptor_4.toValue(tmp_9),
                                                                                              alignment: _descriptor_4.alignment() }).encode() } },
                                       { ins: { cached: false, n: 1 } },
                                       { ins: { cached: true, n: 1 } }]);
    const tmp_10 = 0n;
    __compactRuntime.queryLedgerState(context,
                                      partialProofData,
                                      [
                                       { idx: { cached: false,
                                                pushPath: true,
                                                path: [
                                                       { tag: 'value',
                                                         value: { value: _descriptor_12.toValue(1n),
                                                                  alignment: _descriptor_12.alignment() } }] } },
                                       { push: { storage: false,
                                                 value: __compactRuntime.StateValue.newCell({ value: _descriptor_12.toValue(10n),
                                                                                              alignment: _descriptor_12.alignment() }).encode() } },
                                       { push: { storage: true,
                                                 value: __compactRuntime.StateValue.newCell({ value: _descriptor_4.toValue(tmp_10),
                                                                                              alignment: _descriptor_4.alignment() }).encode() } },
                                       { ins: { cached: false, n: 1 } },
                                       { ins: { cached: true, n: 1 } }]);
    const tmp_11 = 0n;
    __compactRuntime.queryLedgerState(context,
                                      partialProofData,
                                      [
                                       { idx: { cached: false,
                                                pushPath: true,
                                                path: [
                                                       { tag: 'value',
                                                         value: { value: _descriptor_12.toValue(1n),
                                                                  alignment: _descriptor_12.alignment() } }] } },
                                       { push: { storage: false,
                                                 value: __compactRuntime.StateValue.newCell({ value: _descriptor_12.toValue(11n),
                                                                                              alignment: _descriptor_12.alignment() }).encode() } },
                                       { push: { storage: true,
                                                 value: __compactRuntime.StateValue.newCell({ value: _descriptor_4.toValue(tmp_11),
                                                                                              alignment: _descriptor_4.alignment() }).encode() } },
                                       { ins: { cached: false, n: 1 } },
                                       { ins: { cached: true, n: 1 } }]);
    const tmp_12 = 0n;
    __compactRuntime.queryLedgerState(context,
                                      partialProofData,
                                      [
                                       { idx: { cached: false,
                                                pushPath: true,
                                                path: [
                                                       { tag: 'value',
                                                         value: { value: _descriptor_12.toValue(1n),
                                                                  alignment: _descriptor_12.alignment() } }] } },
                                       { push: { storage: false,
                                                 value: __compactRuntime.StateValue.newCell({ value: _descriptor_12.toValue(12n),
                                                                                              alignment: _descriptor_12.alignment() }).encode() } },
                                       { push: { storage: true,
                                                 value: __compactRuntime.StateValue.newCell({ value: _descriptor_4.toValue(tmp_12),
                                                                                              alignment: _descriptor_4.alignment() }).encode() } },
                                       { ins: { cached: false, n: 1 } },
                                       { ins: { cached: true, n: 1 } }]);
    const tmp_13 = 0n;
    __compactRuntime.queryLedgerState(context,
                                      partialProofData,
                                      [
                                       { idx: { cached: false,
                                                pushPath: true,
                                                path: [
                                                       { tag: 'value',
                                                         value: { value: _descriptor_12.toValue(1n),
                                                                  alignment: _descriptor_12.alignment() } }] } },
                                       { push: { storage: false,
                                                 value: __compactRuntime.StateValue.newCell({ value: _descriptor_12.toValue(13n),
                                                                                              alignment: _descriptor_12.alignment() }).encode() } },
                                       { push: { storage: true,
                                                 value: __compactRuntime.StateValue.newCell({ value: _descriptor_4.toValue(tmp_13),
                                                                                              alignment: _descriptor_4.alignment() }).encode() } },
                                       { ins: { cached: false, n: 1 } },
                                       { ins: { cached: true, n: 1 } }]);
    state_0.data = new __compactRuntime.ChargedState(context.currentQueryContext.state.state);
    return {
      currentContractState: state_0,
      currentPrivateState: context.currentPrivateState,
      currentZswapLocalState: context.currentZswapLocalState
    }
  }
  _persistentHash_0(value_0) {
    const result_0 = __compactRuntime.persistentHash(_descriptor_8, value_0);
    return result_0;
  }
  _persistentHash_1(value_0) {
    const result_0 = __compactRuntime.persistentHash(_descriptor_9, value_0);
    return result_0;
  }
  _ownPublicKey_0(context, partialProofData) {
    const result_0 = __compactRuntime.ownPublicKey(context);
    partialProofData.privateTranscriptOutputs.push({
      value: _descriptor_7.toValue(result_0),
      alignment: _descriptor_7.alignment()
    });
    return result_0;
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
                                          this._leafHash_0(userIds_0[0],
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
                                          this._leafHash_0(userIds_0[1],
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
                                          this._leafHash_0(userIds_0[2],
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
                                          this._leafHash_0(userIds_0[3],
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
                                          this._leafHash_0(userIds_0[4],
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
                                          this._leafHash_0(userIds_0[5],
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
                                          this._leafHash_0(userIds_0[6],
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
                                          this._leafHash_0(userIds_0[7],
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
                                          this._leafHash_0(userIds_0[8],
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
                                          this._leafHash_0(userIds_0[9],
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
                                          this._leafHash_0(userIds_0[10],
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
                                          this._leafHash_0(userIds_0[11],
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
                                          this._leafHash_0(userIds_0[12],
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
                                          this._leafHash_0(userIds_0[13],
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
                                          this._leafHash_0(userIds_0[14],
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
                                          this._leafHash_0(userIds_0[15],
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
                                          this._leafHash_0(userIds_0[16],
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
                                          this._leafHash_0(userIds_0[17],
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
                                          this._leafHash_0(userIds_0[18],
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
                                          this._leafHash_0(userIds_0[19],
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
                                           this._leafHash_0(userIds_0[20],
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
                                           this._leafHash_0(userIds_0[21],
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
                                           this._leafHash_0(userIds_0[22],
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
                                           this._leafHash_0(userIds_0[23],
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
                                           this._leafHash_0(userIds_0[24],
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
                                           this._leafHash_0(userIds_0[25],
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
                                           this._leafHash_0(userIds_0[26],
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
                                           this._leafHash_0(userIds_0[27],
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
                                           this._leafHash_0(userIds_0[28],
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
                                           this._leafHash_0(userIds_0[29],
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
                                           this._leafHash_0(userIds_0[30],
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
                                           this._leafHash_0(userIds_0[31],
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
                                           this._leafHash_0(userIds_0[32],
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
                                           this._leafHash_0(userIds_0[33],
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
                                           this._leafHash_0(userIds_0[34],
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
                                           this._leafHash_0(userIds_0[35],
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
                                           this._leafHash_0(userIds_0[36],
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
                                           this._leafHash_0(userIds_0[37],
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
                                           this._leafHash_0(userIds_0[38],
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
                                           this._leafHash_0(userIds_0[39],
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
                                           this._leafHash_0(userIds_0[40],
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
                                           this._leafHash_0(userIds_0[41],
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
                                           this._leafHash_0(userIds_0[42],
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
                                           this._leafHash_0(userIds_0[43],
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
                                           this._leafHash_0(userIds_0[44],
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
                                           this._leafHash_0(userIds_0[45],
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
                                           this._leafHash_0(userIds_0[46],
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
                                           this._leafHash_0(userIds_0[47],
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
                                           this._leafHash_0(userIds_0[48],
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
                                           this._leafHash_0(userIds_0[49],
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
                                           this._leafHash_0(userIds_0[50],
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
                                           this._leafHash_0(userIds_0[51],
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
                                           this._leafHash_0(userIds_0[52],
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
                                           this._leafHash_0(userIds_0[53],
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
                                           this._leafHash_0(userIds_0[54],
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
                                           this._leafHash_0(userIds_0[55],
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
                                           this._leafHash_0(userIds_0[56],
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
                                           this._leafHash_0(userIds_0[57],
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
                                           this._leafHash_0(userIds_0[58],
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
                                           this._leafHash_0(userIds_0[59],
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
                                           this._leafHash_0(userIds_0[60],
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
                                           this._leafHash_0(userIds_0[61],
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
                                           this._leafHash_0(userIds_0[62],
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
                                           this._leafHash_0(userIds_0[63],
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
  _assertNavs_0(btcPos_0,
                btcNeg_0,
                ethPos_0,
                ethNeg_0,
                usdtPos_0,
                usdtNeg_0,
                priceBtc_0,
                priceEth_0,
                priceUsdt_0)
  {
    __compactRuntime.assert(this._signedValid_0(btcPos_0[0], btcNeg_0[0]),
                            'invalid signed btc at 0');
    __compactRuntime.assert(this._signedValid_0(ethPos_0[0], ethNeg_0[0]),
                            'invalid signed eth at 0');
    __compactRuntime.assert(this._signedValid_0(usdtPos_0[0], usdtNeg_0[0]),
                            'invalid signed usdt at 0');
    __compactRuntime.assert(this._isPadding_0(btcPos_0[0],
                                              btcNeg_0[0],
                                              ethPos_0[0],
                                              ethNeg_0[0],
                                              usdtPos_0[0],
                                              usdtNeg_0[0])
                            ||
                            this._navPositive_0(btcPos_0[0],
                                                btcNeg_0[0],
                                                ethPos_0[0],
                                                ethNeg_0[0],
                                                usdtPos_0[0],
                                                usdtNeg_0[0],
                                                priceBtc_0,
                                                priceEth_0,
                                                priceUsdt_0),
                            'negative nav at 0');
    __compactRuntime.assert(this._signedValid_0(btcPos_0[1], btcNeg_0[1]),
                            'invalid signed btc at 1');
    __compactRuntime.assert(this._signedValid_0(ethPos_0[1], ethNeg_0[1]),
                            'invalid signed eth at 1');
    __compactRuntime.assert(this._signedValid_0(usdtPos_0[1], usdtNeg_0[1]),
                            'invalid signed usdt at 1');
    __compactRuntime.assert(this._isPadding_0(btcPos_0[1],
                                              btcNeg_0[1],
                                              ethPos_0[1],
                                              ethNeg_0[1],
                                              usdtPos_0[1],
                                              usdtNeg_0[1])
                            ||
                            this._navPositive_0(btcPos_0[1],
                                                btcNeg_0[1],
                                                ethPos_0[1],
                                                ethNeg_0[1],
                                                usdtPos_0[1],
                                                usdtNeg_0[1],
                                                priceBtc_0,
                                                priceEth_0,
                                                priceUsdt_0),
                            'negative nav at 1');
    __compactRuntime.assert(this._signedValid_0(btcPos_0[2], btcNeg_0[2]),
                            'invalid signed btc at 2');
    __compactRuntime.assert(this._signedValid_0(ethPos_0[2], ethNeg_0[2]),
                            'invalid signed eth at 2');
    __compactRuntime.assert(this._signedValid_0(usdtPos_0[2], usdtNeg_0[2]),
                            'invalid signed usdt at 2');
    __compactRuntime.assert(this._isPadding_0(btcPos_0[2],
                                              btcNeg_0[2],
                                              ethPos_0[2],
                                              ethNeg_0[2],
                                              usdtPos_0[2],
                                              usdtNeg_0[2])
                            ||
                            this._navPositive_0(btcPos_0[2],
                                                btcNeg_0[2],
                                                ethPos_0[2],
                                                ethNeg_0[2],
                                                usdtPos_0[2],
                                                usdtNeg_0[2],
                                                priceBtc_0,
                                                priceEth_0,
                                                priceUsdt_0),
                            'negative nav at 2');
    __compactRuntime.assert(this._signedValid_0(btcPos_0[3], btcNeg_0[3]),
                            'invalid signed btc at 3');
    __compactRuntime.assert(this._signedValid_0(ethPos_0[3], ethNeg_0[3]),
                            'invalid signed eth at 3');
    __compactRuntime.assert(this._signedValid_0(usdtPos_0[3], usdtNeg_0[3]),
                            'invalid signed usdt at 3');
    __compactRuntime.assert(this._isPadding_0(btcPos_0[3],
                                              btcNeg_0[3],
                                              ethPos_0[3],
                                              ethNeg_0[3],
                                              usdtPos_0[3],
                                              usdtNeg_0[3])
                            ||
                            this._navPositive_0(btcPos_0[3],
                                                btcNeg_0[3],
                                                ethPos_0[3],
                                                ethNeg_0[3],
                                                usdtPos_0[3],
                                                usdtNeg_0[3],
                                                priceBtc_0,
                                                priceEth_0,
                                                priceUsdt_0),
                            'negative nav at 3');
    __compactRuntime.assert(this._signedValid_0(btcPos_0[4], btcNeg_0[4]),
                            'invalid signed btc at 4');
    __compactRuntime.assert(this._signedValid_0(ethPos_0[4], ethNeg_0[4]),
                            'invalid signed eth at 4');
    __compactRuntime.assert(this._signedValid_0(usdtPos_0[4], usdtNeg_0[4]),
                            'invalid signed usdt at 4');
    __compactRuntime.assert(this._isPadding_0(btcPos_0[4],
                                              btcNeg_0[4],
                                              ethPos_0[4],
                                              ethNeg_0[4],
                                              usdtPos_0[4],
                                              usdtNeg_0[4])
                            ||
                            this._navPositive_0(btcPos_0[4],
                                                btcNeg_0[4],
                                                ethPos_0[4],
                                                ethNeg_0[4],
                                                usdtPos_0[4],
                                                usdtNeg_0[4],
                                                priceBtc_0,
                                                priceEth_0,
                                                priceUsdt_0),
                            'negative nav at 4');
    __compactRuntime.assert(this._signedValid_0(btcPos_0[5], btcNeg_0[5]),
                            'invalid signed btc at 5');
    __compactRuntime.assert(this._signedValid_0(ethPos_0[5], ethNeg_0[5]),
                            'invalid signed eth at 5');
    __compactRuntime.assert(this._signedValid_0(usdtPos_0[5], usdtNeg_0[5]),
                            'invalid signed usdt at 5');
    __compactRuntime.assert(this._isPadding_0(btcPos_0[5],
                                              btcNeg_0[5],
                                              ethPos_0[5],
                                              ethNeg_0[5],
                                              usdtPos_0[5],
                                              usdtNeg_0[5])
                            ||
                            this._navPositive_0(btcPos_0[5],
                                                btcNeg_0[5],
                                                ethPos_0[5],
                                                ethNeg_0[5],
                                                usdtPos_0[5],
                                                usdtNeg_0[5],
                                                priceBtc_0,
                                                priceEth_0,
                                                priceUsdt_0),
                            'negative nav at 5');
    __compactRuntime.assert(this._signedValid_0(btcPos_0[6], btcNeg_0[6]),
                            'invalid signed btc at 6');
    __compactRuntime.assert(this._signedValid_0(ethPos_0[6], ethNeg_0[6]),
                            'invalid signed eth at 6');
    __compactRuntime.assert(this._signedValid_0(usdtPos_0[6], usdtNeg_0[6]),
                            'invalid signed usdt at 6');
    __compactRuntime.assert(this._isPadding_0(btcPos_0[6],
                                              btcNeg_0[6],
                                              ethPos_0[6],
                                              ethNeg_0[6],
                                              usdtPos_0[6],
                                              usdtNeg_0[6])
                            ||
                            this._navPositive_0(btcPos_0[6],
                                                btcNeg_0[6],
                                                ethPos_0[6],
                                                ethNeg_0[6],
                                                usdtPos_0[6],
                                                usdtNeg_0[6],
                                                priceBtc_0,
                                                priceEth_0,
                                                priceUsdt_0),
                            'negative nav at 6');
    __compactRuntime.assert(this._signedValid_0(btcPos_0[7], btcNeg_0[7]),
                            'invalid signed btc at 7');
    __compactRuntime.assert(this._signedValid_0(ethPos_0[7], ethNeg_0[7]),
                            'invalid signed eth at 7');
    __compactRuntime.assert(this._signedValid_0(usdtPos_0[7], usdtNeg_0[7]),
                            'invalid signed usdt at 7');
    __compactRuntime.assert(this._isPadding_0(btcPos_0[7],
                                              btcNeg_0[7],
                                              ethPos_0[7],
                                              ethNeg_0[7],
                                              usdtPos_0[7],
                                              usdtNeg_0[7])
                            ||
                            this._navPositive_0(btcPos_0[7],
                                                btcNeg_0[7],
                                                ethPos_0[7],
                                                ethNeg_0[7],
                                                usdtPos_0[7],
                                                usdtNeg_0[7],
                                                priceBtc_0,
                                                priceEth_0,
                                                priceUsdt_0),
                            'negative nav at 7');
    __compactRuntime.assert(this._signedValid_0(btcPos_0[8], btcNeg_0[8]),
                            'invalid signed btc at 8');
    __compactRuntime.assert(this._signedValid_0(ethPos_0[8], ethNeg_0[8]),
                            'invalid signed eth at 8');
    __compactRuntime.assert(this._signedValid_0(usdtPos_0[8], usdtNeg_0[8]),
                            'invalid signed usdt at 8');
    __compactRuntime.assert(this._isPadding_0(btcPos_0[8],
                                              btcNeg_0[8],
                                              ethPos_0[8],
                                              ethNeg_0[8],
                                              usdtPos_0[8],
                                              usdtNeg_0[8])
                            ||
                            this._navPositive_0(btcPos_0[8],
                                                btcNeg_0[8],
                                                ethPos_0[8],
                                                ethNeg_0[8],
                                                usdtPos_0[8],
                                                usdtNeg_0[8],
                                                priceBtc_0,
                                                priceEth_0,
                                                priceUsdt_0),
                            'negative nav at 8');
    __compactRuntime.assert(this._signedValid_0(btcPos_0[9], btcNeg_0[9]),
                            'invalid signed btc at 9');
    __compactRuntime.assert(this._signedValid_0(ethPos_0[9], ethNeg_0[9]),
                            'invalid signed eth at 9');
    __compactRuntime.assert(this._signedValid_0(usdtPos_0[9], usdtNeg_0[9]),
                            'invalid signed usdt at 9');
    __compactRuntime.assert(this._isPadding_0(btcPos_0[9],
                                              btcNeg_0[9],
                                              ethPos_0[9],
                                              ethNeg_0[9],
                                              usdtPos_0[9],
                                              usdtNeg_0[9])
                            ||
                            this._navPositive_0(btcPos_0[9],
                                                btcNeg_0[9],
                                                ethPos_0[9],
                                                ethNeg_0[9],
                                                usdtPos_0[9],
                                                usdtNeg_0[9],
                                                priceBtc_0,
                                                priceEth_0,
                                                priceUsdt_0),
                            'negative nav at 9');
    __compactRuntime.assert(this._signedValid_0(btcPos_0[10], btcNeg_0[10]),
                            'invalid signed btc at 10');
    __compactRuntime.assert(this._signedValid_0(ethPos_0[10], ethNeg_0[10]),
                            'invalid signed eth at 10');
    __compactRuntime.assert(this._signedValid_0(usdtPos_0[10], usdtNeg_0[10]),
                            'invalid signed usdt at 10');
    __compactRuntime.assert(this._isPadding_0(btcPos_0[10],
                                              btcNeg_0[10],
                                              ethPos_0[10],
                                              ethNeg_0[10],
                                              usdtPos_0[10],
                                              usdtNeg_0[10])
                            ||
                            this._navPositive_0(btcPos_0[10],
                                                btcNeg_0[10],
                                                ethPos_0[10],
                                                ethNeg_0[10],
                                                usdtPos_0[10],
                                                usdtNeg_0[10],
                                                priceBtc_0,
                                                priceEth_0,
                                                priceUsdt_0),
                            'negative nav at 10');
    __compactRuntime.assert(this._signedValid_0(btcPos_0[11], btcNeg_0[11]),
                            'invalid signed btc at 11');
    __compactRuntime.assert(this._signedValid_0(ethPos_0[11], ethNeg_0[11]),
                            'invalid signed eth at 11');
    __compactRuntime.assert(this._signedValid_0(usdtPos_0[11], usdtNeg_0[11]),
                            'invalid signed usdt at 11');
    __compactRuntime.assert(this._isPadding_0(btcPos_0[11],
                                              btcNeg_0[11],
                                              ethPos_0[11],
                                              ethNeg_0[11],
                                              usdtPos_0[11],
                                              usdtNeg_0[11])
                            ||
                            this._navPositive_0(btcPos_0[11],
                                                btcNeg_0[11],
                                                ethPos_0[11],
                                                ethNeg_0[11],
                                                usdtPos_0[11],
                                                usdtNeg_0[11],
                                                priceBtc_0,
                                                priceEth_0,
                                                priceUsdt_0),
                            'negative nav at 11');
    __compactRuntime.assert(this._signedValid_0(btcPos_0[12], btcNeg_0[12]),
                            'invalid signed btc at 12');
    __compactRuntime.assert(this._signedValid_0(ethPos_0[12], ethNeg_0[12]),
                            'invalid signed eth at 12');
    __compactRuntime.assert(this._signedValid_0(usdtPos_0[12], usdtNeg_0[12]),
                            'invalid signed usdt at 12');
    __compactRuntime.assert(this._isPadding_0(btcPos_0[12],
                                              btcNeg_0[12],
                                              ethPos_0[12],
                                              ethNeg_0[12],
                                              usdtPos_0[12],
                                              usdtNeg_0[12])
                            ||
                            this._navPositive_0(btcPos_0[12],
                                                btcNeg_0[12],
                                                ethPos_0[12],
                                                ethNeg_0[12],
                                                usdtPos_0[12],
                                                usdtNeg_0[12],
                                                priceBtc_0,
                                                priceEth_0,
                                                priceUsdt_0),
                            'negative nav at 12');
    __compactRuntime.assert(this._signedValid_0(btcPos_0[13], btcNeg_0[13]),
                            'invalid signed btc at 13');
    __compactRuntime.assert(this._signedValid_0(ethPos_0[13], ethNeg_0[13]),
                            'invalid signed eth at 13');
    __compactRuntime.assert(this._signedValid_0(usdtPos_0[13], usdtNeg_0[13]),
                            'invalid signed usdt at 13');
    __compactRuntime.assert(this._isPadding_0(btcPos_0[13],
                                              btcNeg_0[13],
                                              ethPos_0[13],
                                              ethNeg_0[13],
                                              usdtPos_0[13],
                                              usdtNeg_0[13])
                            ||
                            this._navPositive_0(btcPos_0[13],
                                                btcNeg_0[13],
                                                ethPos_0[13],
                                                ethNeg_0[13],
                                                usdtPos_0[13],
                                                usdtNeg_0[13],
                                                priceBtc_0,
                                                priceEth_0,
                                                priceUsdt_0),
                            'negative nav at 13');
    __compactRuntime.assert(this._signedValid_0(btcPos_0[14], btcNeg_0[14]),
                            'invalid signed btc at 14');
    __compactRuntime.assert(this._signedValid_0(ethPos_0[14], ethNeg_0[14]),
                            'invalid signed eth at 14');
    __compactRuntime.assert(this._signedValid_0(usdtPos_0[14], usdtNeg_0[14]),
                            'invalid signed usdt at 14');
    __compactRuntime.assert(this._isPadding_0(btcPos_0[14],
                                              btcNeg_0[14],
                                              ethPos_0[14],
                                              ethNeg_0[14],
                                              usdtPos_0[14],
                                              usdtNeg_0[14])
                            ||
                            this._navPositive_0(btcPos_0[14],
                                                btcNeg_0[14],
                                                ethPos_0[14],
                                                ethNeg_0[14],
                                                usdtPos_0[14],
                                                usdtNeg_0[14],
                                                priceBtc_0,
                                                priceEth_0,
                                                priceUsdt_0),
                            'negative nav at 14');
    __compactRuntime.assert(this._signedValid_0(btcPos_0[15], btcNeg_0[15]),
                            'invalid signed btc at 15');
    __compactRuntime.assert(this._signedValid_0(ethPos_0[15], ethNeg_0[15]),
                            'invalid signed eth at 15');
    __compactRuntime.assert(this._signedValid_0(usdtPos_0[15], usdtNeg_0[15]),
                            'invalid signed usdt at 15');
    __compactRuntime.assert(this._isPadding_0(btcPos_0[15],
                                              btcNeg_0[15],
                                              ethPos_0[15],
                                              ethNeg_0[15],
                                              usdtPos_0[15],
                                              usdtNeg_0[15])
                            ||
                            this._navPositive_0(btcPos_0[15],
                                                btcNeg_0[15],
                                                ethPos_0[15],
                                                ethNeg_0[15],
                                                usdtPos_0[15],
                                                usdtNeg_0[15],
                                                priceBtc_0,
                                                priceEth_0,
                                                priceUsdt_0),
                            'negative nav at 15');
    __compactRuntime.assert(this._signedValid_0(btcPos_0[16], btcNeg_0[16]),
                            'invalid signed btc at 16');
    __compactRuntime.assert(this._signedValid_0(ethPos_0[16], ethNeg_0[16]),
                            'invalid signed eth at 16');
    __compactRuntime.assert(this._signedValid_0(usdtPos_0[16], usdtNeg_0[16]),
                            'invalid signed usdt at 16');
    __compactRuntime.assert(this._isPadding_0(btcPos_0[16],
                                              btcNeg_0[16],
                                              ethPos_0[16],
                                              ethNeg_0[16],
                                              usdtPos_0[16],
                                              usdtNeg_0[16])
                            ||
                            this._navPositive_0(btcPos_0[16],
                                                btcNeg_0[16],
                                                ethPos_0[16],
                                                ethNeg_0[16],
                                                usdtPos_0[16],
                                                usdtNeg_0[16],
                                                priceBtc_0,
                                                priceEth_0,
                                                priceUsdt_0),
                            'negative nav at 16');
    __compactRuntime.assert(this._signedValid_0(btcPos_0[17], btcNeg_0[17]),
                            'invalid signed btc at 17');
    __compactRuntime.assert(this._signedValid_0(ethPos_0[17], ethNeg_0[17]),
                            'invalid signed eth at 17');
    __compactRuntime.assert(this._signedValid_0(usdtPos_0[17], usdtNeg_0[17]),
                            'invalid signed usdt at 17');
    __compactRuntime.assert(this._isPadding_0(btcPos_0[17],
                                              btcNeg_0[17],
                                              ethPos_0[17],
                                              ethNeg_0[17],
                                              usdtPos_0[17],
                                              usdtNeg_0[17])
                            ||
                            this._navPositive_0(btcPos_0[17],
                                                btcNeg_0[17],
                                                ethPos_0[17],
                                                ethNeg_0[17],
                                                usdtPos_0[17],
                                                usdtNeg_0[17],
                                                priceBtc_0,
                                                priceEth_0,
                                                priceUsdt_0),
                            'negative nav at 17');
    __compactRuntime.assert(this._signedValid_0(btcPos_0[18], btcNeg_0[18]),
                            'invalid signed btc at 18');
    __compactRuntime.assert(this._signedValid_0(ethPos_0[18], ethNeg_0[18]),
                            'invalid signed eth at 18');
    __compactRuntime.assert(this._signedValid_0(usdtPos_0[18], usdtNeg_0[18]),
                            'invalid signed usdt at 18');
    __compactRuntime.assert(this._isPadding_0(btcPos_0[18],
                                              btcNeg_0[18],
                                              ethPos_0[18],
                                              ethNeg_0[18],
                                              usdtPos_0[18],
                                              usdtNeg_0[18])
                            ||
                            this._navPositive_0(btcPos_0[18],
                                                btcNeg_0[18],
                                                ethPos_0[18],
                                                ethNeg_0[18],
                                                usdtPos_0[18],
                                                usdtNeg_0[18],
                                                priceBtc_0,
                                                priceEth_0,
                                                priceUsdt_0),
                            'negative nav at 18');
    __compactRuntime.assert(this._signedValid_0(btcPos_0[19], btcNeg_0[19]),
                            'invalid signed btc at 19');
    __compactRuntime.assert(this._signedValid_0(ethPos_0[19], ethNeg_0[19]),
                            'invalid signed eth at 19');
    __compactRuntime.assert(this._signedValid_0(usdtPos_0[19], usdtNeg_0[19]),
                            'invalid signed usdt at 19');
    __compactRuntime.assert(this._isPadding_0(btcPos_0[19],
                                              btcNeg_0[19],
                                              ethPos_0[19],
                                              ethNeg_0[19],
                                              usdtPos_0[19],
                                              usdtNeg_0[19])
                            ||
                            this._navPositive_0(btcPos_0[19],
                                                btcNeg_0[19],
                                                ethPos_0[19],
                                                ethNeg_0[19],
                                                usdtPos_0[19],
                                                usdtNeg_0[19],
                                                priceBtc_0,
                                                priceEth_0,
                                                priceUsdt_0),
                            'negative nav at 19');
    __compactRuntime.assert(this._signedValid_0(btcPos_0[20], btcNeg_0[20]),
                            'invalid signed btc at 20');
    __compactRuntime.assert(this._signedValid_0(ethPos_0[20], ethNeg_0[20]),
                            'invalid signed eth at 20');
    __compactRuntime.assert(this._signedValid_0(usdtPos_0[20], usdtNeg_0[20]),
                            'invalid signed usdt at 20');
    __compactRuntime.assert(this._isPadding_0(btcPos_0[20],
                                              btcNeg_0[20],
                                              ethPos_0[20],
                                              ethNeg_0[20],
                                              usdtPos_0[20],
                                              usdtNeg_0[20])
                            ||
                            this._navPositive_0(btcPos_0[20],
                                                btcNeg_0[20],
                                                ethPos_0[20],
                                                ethNeg_0[20],
                                                usdtPos_0[20],
                                                usdtNeg_0[20],
                                                priceBtc_0,
                                                priceEth_0,
                                                priceUsdt_0),
                            'negative nav at 20');
    __compactRuntime.assert(this._signedValid_0(btcPos_0[21], btcNeg_0[21]),
                            'invalid signed btc at 21');
    __compactRuntime.assert(this._signedValid_0(ethPos_0[21], ethNeg_0[21]),
                            'invalid signed eth at 21');
    __compactRuntime.assert(this._signedValid_0(usdtPos_0[21], usdtNeg_0[21]),
                            'invalid signed usdt at 21');
    __compactRuntime.assert(this._isPadding_0(btcPos_0[21],
                                              btcNeg_0[21],
                                              ethPos_0[21],
                                              ethNeg_0[21],
                                              usdtPos_0[21],
                                              usdtNeg_0[21])
                            ||
                            this._navPositive_0(btcPos_0[21],
                                                btcNeg_0[21],
                                                ethPos_0[21],
                                                ethNeg_0[21],
                                                usdtPos_0[21],
                                                usdtNeg_0[21],
                                                priceBtc_0,
                                                priceEth_0,
                                                priceUsdt_0),
                            'negative nav at 21');
    __compactRuntime.assert(this._signedValid_0(btcPos_0[22], btcNeg_0[22]),
                            'invalid signed btc at 22');
    __compactRuntime.assert(this._signedValid_0(ethPos_0[22], ethNeg_0[22]),
                            'invalid signed eth at 22');
    __compactRuntime.assert(this._signedValid_0(usdtPos_0[22], usdtNeg_0[22]),
                            'invalid signed usdt at 22');
    __compactRuntime.assert(this._isPadding_0(btcPos_0[22],
                                              btcNeg_0[22],
                                              ethPos_0[22],
                                              ethNeg_0[22],
                                              usdtPos_0[22],
                                              usdtNeg_0[22])
                            ||
                            this._navPositive_0(btcPos_0[22],
                                                btcNeg_0[22],
                                                ethPos_0[22],
                                                ethNeg_0[22],
                                                usdtPos_0[22],
                                                usdtNeg_0[22],
                                                priceBtc_0,
                                                priceEth_0,
                                                priceUsdt_0),
                            'negative nav at 22');
    __compactRuntime.assert(this._signedValid_0(btcPos_0[23], btcNeg_0[23]),
                            'invalid signed btc at 23');
    __compactRuntime.assert(this._signedValid_0(ethPos_0[23], ethNeg_0[23]),
                            'invalid signed eth at 23');
    __compactRuntime.assert(this._signedValid_0(usdtPos_0[23], usdtNeg_0[23]),
                            'invalid signed usdt at 23');
    __compactRuntime.assert(this._isPadding_0(btcPos_0[23],
                                              btcNeg_0[23],
                                              ethPos_0[23],
                                              ethNeg_0[23],
                                              usdtPos_0[23],
                                              usdtNeg_0[23])
                            ||
                            this._navPositive_0(btcPos_0[23],
                                                btcNeg_0[23],
                                                ethPos_0[23],
                                                ethNeg_0[23],
                                                usdtPos_0[23],
                                                usdtNeg_0[23],
                                                priceBtc_0,
                                                priceEth_0,
                                                priceUsdt_0),
                            'negative nav at 23');
    __compactRuntime.assert(this._signedValid_0(btcPos_0[24], btcNeg_0[24]),
                            'invalid signed btc at 24');
    __compactRuntime.assert(this._signedValid_0(ethPos_0[24], ethNeg_0[24]),
                            'invalid signed eth at 24');
    __compactRuntime.assert(this._signedValid_0(usdtPos_0[24], usdtNeg_0[24]),
                            'invalid signed usdt at 24');
    __compactRuntime.assert(this._isPadding_0(btcPos_0[24],
                                              btcNeg_0[24],
                                              ethPos_0[24],
                                              ethNeg_0[24],
                                              usdtPos_0[24],
                                              usdtNeg_0[24])
                            ||
                            this._navPositive_0(btcPos_0[24],
                                                btcNeg_0[24],
                                                ethPos_0[24],
                                                ethNeg_0[24],
                                                usdtPos_0[24],
                                                usdtNeg_0[24],
                                                priceBtc_0,
                                                priceEth_0,
                                                priceUsdt_0),
                            'negative nav at 24');
    __compactRuntime.assert(this._signedValid_0(btcPos_0[25], btcNeg_0[25]),
                            'invalid signed btc at 25');
    __compactRuntime.assert(this._signedValid_0(ethPos_0[25], ethNeg_0[25]),
                            'invalid signed eth at 25');
    __compactRuntime.assert(this._signedValid_0(usdtPos_0[25], usdtNeg_0[25]),
                            'invalid signed usdt at 25');
    __compactRuntime.assert(this._isPadding_0(btcPos_0[25],
                                              btcNeg_0[25],
                                              ethPos_0[25],
                                              ethNeg_0[25],
                                              usdtPos_0[25],
                                              usdtNeg_0[25])
                            ||
                            this._navPositive_0(btcPos_0[25],
                                                btcNeg_0[25],
                                                ethPos_0[25],
                                                ethNeg_0[25],
                                                usdtPos_0[25],
                                                usdtNeg_0[25],
                                                priceBtc_0,
                                                priceEth_0,
                                                priceUsdt_0),
                            'negative nav at 25');
    __compactRuntime.assert(this._signedValid_0(btcPos_0[26], btcNeg_0[26]),
                            'invalid signed btc at 26');
    __compactRuntime.assert(this._signedValid_0(ethPos_0[26], ethNeg_0[26]),
                            'invalid signed eth at 26');
    __compactRuntime.assert(this._signedValid_0(usdtPos_0[26], usdtNeg_0[26]),
                            'invalid signed usdt at 26');
    __compactRuntime.assert(this._isPadding_0(btcPos_0[26],
                                              btcNeg_0[26],
                                              ethPos_0[26],
                                              ethNeg_0[26],
                                              usdtPos_0[26],
                                              usdtNeg_0[26])
                            ||
                            this._navPositive_0(btcPos_0[26],
                                                btcNeg_0[26],
                                                ethPos_0[26],
                                                ethNeg_0[26],
                                                usdtPos_0[26],
                                                usdtNeg_0[26],
                                                priceBtc_0,
                                                priceEth_0,
                                                priceUsdt_0),
                            'negative nav at 26');
    __compactRuntime.assert(this._signedValid_0(btcPos_0[27], btcNeg_0[27]),
                            'invalid signed btc at 27');
    __compactRuntime.assert(this._signedValid_0(ethPos_0[27], ethNeg_0[27]),
                            'invalid signed eth at 27');
    __compactRuntime.assert(this._signedValid_0(usdtPos_0[27], usdtNeg_0[27]),
                            'invalid signed usdt at 27');
    __compactRuntime.assert(this._isPadding_0(btcPos_0[27],
                                              btcNeg_0[27],
                                              ethPos_0[27],
                                              ethNeg_0[27],
                                              usdtPos_0[27],
                                              usdtNeg_0[27])
                            ||
                            this._navPositive_0(btcPos_0[27],
                                                btcNeg_0[27],
                                                ethPos_0[27],
                                                ethNeg_0[27],
                                                usdtPos_0[27],
                                                usdtNeg_0[27],
                                                priceBtc_0,
                                                priceEth_0,
                                                priceUsdt_0),
                            'negative nav at 27');
    __compactRuntime.assert(this._signedValid_0(btcPos_0[28], btcNeg_0[28]),
                            'invalid signed btc at 28');
    __compactRuntime.assert(this._signedValid_0(ethPos_0[28], ethNeg_0[28]),
                            'invalid signed eth at 28');
    __compactRuntime.assert(this._signedValid_0(usdtPos_0[28], usdtNeg_0[28]),
                            'invalid signed usdt at 28');
    __compactRuntime.assert(this._isPadding_0(btcPos_0[28],
                                              btcNeg_0[28],
                                              ethPos_0[28],
                                              ethNeg_0[28],
                                              usdtPos_0[28],
                                              usdtNeg_0[28])
                            ||
                            this._navPositive_0(btcPos_0[28],
                                                btcNeg_0[28],
                                                ethPos_0[28],
                                                ethNeg_0[28],
                                                usdtPos_0[28],
                                                usdtNeg_0[28],
                                                priceBtc_0,
                                                priceEth_0,
                                                priceUsdt_0),
                            'negative nav at 28');
    __compactRuntime.assert(this._signedValid_0(btcPos_0[29], btcNeg_0[29]),
                            'invalid signed btc at 29');
    __compactRuntime.assert(this._signedValid_0(ethPos_0[29], ethNeg_0[29]),
                            'invalid signed eth at 29');
    __compactRuntime.assert(this._signedValid_0(usdtPos_0[29], usdtNeg_0[29]),
                            'invalid signed usdt at 29');
    __compactRuntime.assert(this._isPadding_0(btcPos_0[29],
                                              btcNeg_0[29],
                                              ethPos_0[29],
                                              ethNeg_0[29],
                                              usdtPos_0[29],
                                              usdtNeg_0[29])
                            ||
                            this._navPositive_0(btcPos_0[29],
                                                btcNeg_0[29],
                                                ethPos_0[29],
                                                ethNeg_0[29],
                                                usdtPos_0[29],
                                                usdtNeg_0[29],
                                                priceBtc_0,
                                                priceEth_0,
                                                priceUsdt_0),
                            'negative nav at 29');
    __compactRuntime.assert(this._signedValid_0(btcPos_0[30], btcNeg_0[30]),
                            'invalid signed btc at 30');
    __compactRuntime.assert(this._signedValid_0(ethPos_0[30], ethNeg_0[30]),
                            'invalid signed eth at 30');
    __compactRuntime.assert(this._signedValid_0(usdtPos_0[30], usdtNeg_0[30]),
                            'invalid signed usdt at 30');
    __compactRuntime.assert(this._isPadding_0(btcPos_0[30],
                                              btcNeg_0[30],
                                              ethPos_0[30],
                                              ethNeg_0[30],
                                              usdtPos_0[30],
                                              usdtNeg_0[30])
                            ||
                            this._navPositive_0(btcPos_0[30],
                                                btcNeg_0[30],
                                                ethPos_0[30],
                                                ethNeg_0[30],
                                                usdtPos_0[30],
                                                usdtNeg_0[30],
                                                priceBtc_0,
                                                priceEth_0,
                                                priceUsdt_0),
                            'negative nav at 30');
    __compactRuntime.assert(this._signedValid_0(btcPos_0[31], btcNeg_0[31]),
                            'invalid signed btc at 31');
    __compactRuntime.assert(this._signedValid_0(ethPos_0[31], ethNeg_0[31]),
                            'invalid signed eth at 31');
    __compactRuntime.assert(this._signedValid_0(usdtPos_0[31], usdtNeg_0[31]),
                            'invalid signed usdt at 31');
    __compactRuntime.assert(this._isPadding_0(btcPos_0[31],
                                              btcNeg_0[31],
                                              ethPos_0[31],
                                              ethNeg_0[31],
                                              usdtPos_0[31],
                                              usdtNeg_0[31])
                            ||
                            this._navPositive_0(btcPos_0[31],
                                                btcNeg_0[31],
                                                ethPos_0[31],
                                                ethNeg_0[31],
                                                usdtPos_0[31],
                                                usdtNeg_0[31],
                                                priceBtc_0,
                                                priceEth_0,
                                                priceUsdt_0),
                            'negative nav at 31');
    __compactRuntime.assert(this._signedValid_0(btcPos_0[32], btcNeg_0[32]),
                            'invalid signed btc at 32');
    __compactRuntime.assert(this._signedValid_0(ethPos_0[32], ethNeg_0[32]),
                            'invalid signed eth at 32');
    __compactRuntime.assert(this._signedValid_0(usdtPos_0[32], usdtNeg_0[32]),
                            'invalid signed usdt at 32');
    __compactRuntime.assert(this._isPadding_0(btcPos_0[32],
                                              btcNeg_0[32],
                                              ethPos_0[32],
                                              ethNeg_0[32],
                                              usdtPos_0[32],
                                              usdtNeg_0[32])
                            ||
                            this._navPositive_0(btcPos_0[32],
                                                btcNeg_0[32],
                                                ethPos_0[32],
                                                ethNeg_0[32],
                                                usdtPos_0[32],
                                                usdtNeg_0[32],
                                                priceBtc_0,
                                                priceEth_0,
                                                priceUsdt_0),
                            'negative nav at 32');
    __compactRuntime.assert(this._signedValid_0(btcPos_0[33], btcNeg_0[33]),
                            'invalid signed btc at 33');
    __compactRuntime.assert(this._signedValid_0(ethPos_0[33], ethNeg_0[33]),
                            'invalid signed eth at 33');
    __compactRuntime.assert(this._signedValid_0(usdtPos_0[33], usdtNeg_0[33]),
                            'invalid signed usdt at 33');
    __compactRuntime.assert(this._isPadding_0(btcPos_0[33],
                                              btcNeg_0[33],
                                              ethPos_0[33],
                                              ethNeg_0[33],
                                              usdtPos_0[33],
                                              usdtNeg_0[33])
                            ||
                            this._navPositive_0(btcPos_0[33],
                                                btcNeg_0[33],
                                                ethPos_0[33],
                                                ethNeg_0[33],
                                                usdtPos_0[33],
                                                usdtNeg_0[33],
                                                priceBtc_0,
                                                priceEth_0,
                                                priceUsdt_0),
                            'negative nav at 33');
    __compactRuntime.assert(this._signedValid_0(btcPos_0[34], btcNeg_0[34]),
                            'invalid signed btc at 34');
    __compactRuntime.assert(this._signedValid_0(ethPos_0[34], ethNeg_0[34]),
                            'invalid signed eth at 34');
    __compactRuntime.assert(this._signedValid_0(usdtPos_0[34], usdtNeg_0[34]),
                            'invalid signed usdt at 34');
    __compactRuntime.assert(this._isPadding_0(btcPos_0[34],
                                              btcNeg_0[34],
                                              ethPos_0[34],
                                              ethNeg_0[34],
                                              usdtPos_0[34],
                                              usdtNeg_0[34])
                            ||
                            this._navPositive_0(btcPos_0[34],
                                                btcNeg_0[34],
                                                ethPos_0[34],
                                                ethNeg_0[34],
                                                usdtPos_0[34],
                                                usdtNeg_0[34],
                                                priceBtc_0,
                                                priceEth_0,
                                                priceUsdt_0),
                            'negative nav at 34');
    __compactRuntime.assert(this._signedValid_0(btcPos_0[35], btcNeg_0[35]),
                            'invalid signed btc at 35');
    __compactRuntime.assert(this._signedValid_0(ethPos_0[35], ethNeg_0[35]),
                            'invalid signed eth at 35');
    __compactRuntime.assert(this._signedValid_0(usdtPos_0[35], usdtNeg_0[35]),
                            'invalid signed usdt at 35');
    __compactRuntime.assert(this._isPadding_0(btcPos_0[35],
                                              btcNeg_0[35],
                                              ethPos_0[35],
                                              ethNeg_0[35],
                                              usdtPos_0[35],
                                              usdtNeg_0[35])
                            ||
                            this._navPositive_0(btcPos_0[35],
                                                btcNeg_0[35],
                                                ethPos_0[35],
                                                ethNeg_0[35],
                                                usdtPos_0[35],
                                                usdtNeg_0[35],
                                                priceBtc_0,
                                                priceEth_0,
                                                priceUsdt_0),
                            'negative nav at 35');
    __compactRuntime.assert(this._signedValid_0(btcPos_0[36], btcNeg_0[36]),
                            'invalid signed btc at 36');
    __compactRuntime.assert(this._signedValid_0(ethPos_0[36], ethNeg_0[36]),
                            'invalid signed eth at 36');
    __compactRuntime.assert(this._signedValid_0(usdtPos_0[36], usdtNeg_0[36]),
                            'invalid signed usdt at 36');
    __compactRuntime.assert(this._isPadding_0(btcPos_0[36],
                                              btcNeg_0[36],
                                              ethPos_0[36],
                                              ethNeg_0[36],
                                              usdtPos_0[36],
                                              usdtNeg_0[36])
                            ||
                            this._navPositive_0(btcPos_0[36],
                                                btcNeg_0[36],
                                                ethPos_0[36],
                                                ethNeg_0[36],
                                                usdtPos_0[36],
                                                usdtNeg_0[36],
                                                priceBtc_0,
                                                priceEth_0,
                                                priceUsdt_0),
                            'negative nav at 36');
    __compactRuntime.assert(this._signedValid_0(btcPos_0[37], btcNeg_0[37]),
                            'invalid signed btc at 37');
    __compactRuntime.assert(this._signedValid_0(ethPos_0[37], ethNeg_0[37]),
                            'invalid signed eth at 37');
    __compactRuntime.assert(this._signedValid_0(usdtPos_0[37], usdtNeg_0[37]),
                            'invalid signed usdt at 37');
    __compactRuntime.assert(this._isPadding_0(btcPos_0[37],
                                              btcNeg_0[37],
                                              ethPos_0[37],
                                              ethNeg_0[37],
                                              usdtPos_0[37],
                                              usdtNeg_0[37])
                            ||
                            this._navPositive_0(btcPos_0[37],
                                                btcNeg_0[37],
                                                ethPos_0[37],
                                                ethNeg_0[37],
                                                usdtPos_0[37],
                                                usdtNeg_0[37],
                                                priceBtc_0,
                                                priceEth_0,
                                                priceUsdt_0),
                            'negative nav at 37');
    __compactRuntime.assert(this._signedValid_0(btcPos_0[38], btcNeg_0[38]),
                            'invalid signed btc at 38');
    __compactRuntime.assert(this._signedValid_0(ethPos_0[38], ethNeg_0[38]),
                            'invalid signed eth at 38');
    __compactRuntime.assert(this._signedValid_0(usdtPos_0[38], usdtNeg_0[38]),
                            'invalid signed usdt at 38');
    __compactRuntime.assert(this._isPadding_0(btcPos_0[38],
                                              btcNeg_0[38],
                                              ethPos_0[38],
                                              ethNeg_0[38],
                                              usdtPos_0[38],
                                              usdtNeg_0[38])
                            ||
                            this._navPositive_0(btcPos_0[38],
                                                btcNeg_0[38],
                                                ethPos_0[38],
                                                ethNeg_0[38],
                                                usdtPos_0[38],
                                                usdtNeg_0[38],
                                                priceBtc_0,
                                                priceEth_0,
                                                priceUsdt_0),
                            'negative nav at 38');
    __compactRuntime.assert(this._signedValid_0(btcPos_0[39], btcNeg_0[39]),
                            'invalid signed btc at 39');
    __compactRuntime.assert(this._signedValid_0(ethPos_0[39], ethNeg_0[39]),
                            'invalid signed eth at 39');
    __compactRuntime.assert(this._signedValid_0(usdtPos_0[39], usdtNeg_0[39]),
                            'invalid signed usdt at 39');
    __compactRuntime.assert(this._isPadding_0(btcPos_0[39],
                                              btcNeg_0[39],
                                              ethPos_0[39],
                                              ethNeg_0[39],
                                              usdtPos_0[39],
                                              usdtNeg_0[39])
                            ||
                            this._navPositive_0(btcPos_0[39],
                                                btcNeg_0[39],
                                                ethPos_0[39],
                                                ethNeg_0[39],
                                                usdtPos_0[39],
                                                usdtNeg_0[39],
                                                priceBtc_0,
                                                priceEth_0,
                                                priceUsdt_0),
                            'negative nav at 39');
    __compactRuntime.assert(this._signedValid_0(btcPos_0[40], btcNeg_0[40]),
                            'invalid signed btc at 40');
    __compactRuntime.assert(this._signedValid_0(ethPos_0[40], ethNeg_0[40]),
                            'invalid signed eth at 40');
    __compactRuntime.assert(this._signedValid_0(usdtPos_0[40], usdtNeg_0[40]),
                            'invalid signed usdt at 40');
    __compactRuntime.assert(this._isPadding_0(btcPos_0[40],
                                              btcNeg_0[40],
                                              ethPos_0[40],
                                              ethNeg_0[40],
                                              usdtPos_0[40],
                                              usdtNeg_0[40])
                            ||
                            this._navPositive_0(btcPos_0[40],
                                                btcNeg_0[40],
                                                ethPos_0[40],
                                                ethNeg_0[40],
                                                usdtPos_0[40],
                                                usdtNeg_0[40],
                                                priceBtc_0,
                                                priceEth_0,
                                                priceUsdt_0),
                            'negative nav at 40');
    __compactRuntime.assert(this._signedValid_0(btcPos_0[41], btcNeg_0[41]),
                            'invalid signed btc at 41');
    __compactRuntime.assert(this._signedValid_0(ethPos_0[41], ethNeg_0[41]),
                            'invalid signed eth at 41');
    __compactRuntime.assert(this._signedValid_0(usdtPos_0[41], usdtNeg_0[41]),
                            'invalid signed usdt at 41');
    __compactRuntime.assert(this._isPadding_0(btcPos_0[41],
                                              btcNeg_0[41],
                                              ethPos_0[41],
                                              ethNeg_0[41],
                                              usdtPos_0[41],
                                              usdtNeg_0[41])
                            ||
                            this._navPositive_0(btcPos_0[41],
                                                btcNeg_0[41],
                                                ethPos_0[41],
                                                ethNeg_0[41],
                                                usdtPos_0[41],
                                                usdtNeg_0[41],
                                                priceBtc_0,
                                                priceEth_0,
                                                priceUsdt_0),
                            'negative nav at 41');
    __compactRuntime.assert(this._signedValid_0(btcPos_0[42], btcNeg_0[42]),
                            'invalid signed btc at 42');
    __compactRuntime.assert(this._signedValid_0(ethPos_0[42], ethNeg_0[42]),
                            'invalid signed eth at 42');
    __compactRuntime.assert(this._signedValid_0(usdtPos_0[42], usdtNeg_0[42]),
                            'invalid signed usdt at 42');
    __compactRuntime.assert(this._isPadding_0(btcPos_0[42],
                                              btcNeg_0[42],
                                              ethPos_0[42],
                                              ethNeg_0[42],
                                              usdtPos_0[42],
                                              usdtNeg_0[42])
                            ||
                            this._navPositive_0(btcPos_0[42],
                                                btcNeg_0[42],
                                                ethPos_0[42],
                                                ethNeg_0[42],
                                                usdtPos_0[42],
                                                usdtNeg_0[42],
                                                priceBtc_0,
                                                priceEth_0,
                                                priceUsdt_0),
                            'negative nav at 42');
    __compactRuntime.assert(this._signedValid_0(btcPos_0[43], btcNeg_0[43]),
                            'invalid signed btc at 43');
    __compactRuntime.assert(this._signedValid_0(ethPos_0[43], ethNeg_0[43]),
                            'invalid signed eth at 43');
    __compactRuntime.assert(this._signedValid_0(usdtPos_0[43], usdtNeg_0[43]),
                            'invalid signed usdt at 43');
    __compactRuntime.assert(this._isPadding_0(btcPos_0[43],
                                              btcNeg_0[43],
                                              ethPos_0[43],
                                              ethNeg_0[43],
                                              usdtPos_0[43],
                                              usdtNeg_0[43])
                            ||
                            this._navPositive_0(btcPos_0[43],
                                                btcNeg_0[43],
                                                ethPos_0[43],
                                                ethNeg_0[43],
                                                usdtPos_0[43],
                                                usdtNeg_0[43],
                                                priceBtc_0,
                                                priceEth_0,
                                                priceUsdt_0),
                            'negative nav at 43');
    __compactRuntime.assert(this._signedValid_0(btcPos_0[44], btcNeg_0[44]),
                            'invalid signed btc at 44');
    __compactRuntime.assert(this._signedValid_0(ethPos_0[44], ethNeg_0[44]),
                            'invalid signed eth at 44');
    __compactRuntime.assert(this._signedValid_0(usdtPos_0[44], usdtNeg_0[44]),
                            'invalid signed usdt at 44');
    __compactRuntime.assert(this._isPadding_0(btcPos_0[44],
                                              btcNeg_0[44],
                                              ethPos_0[44],
                                              ethNeg_0[44],
                                              usdtPos_0[44],
                                              usdtNeg_0[44])
                            ||
                            this._navPositive_0(btcPos_0[44],
                                                btcNeg_0[44],
                                                ethPos_0[44],
                                                ethNeg_0[44],
                                                usdtPos_0[44],
                                                usdtNeg_0[44],
                                                priceBtc_0,
                                                priceEth_0,
                                                priceUsdt_0),
                            'negative nav at 44');
    __compactRuntime.assert(this._signedValid_0(btcPos_0[45], btcNeg_0[45]),
                            'invalid signed btc at 45');
    __compactRuntime.assert(this._signedValid_0(ethPos_0[45], ethNeg_0[45]),
                            'invalid signed eth at 45');
    __compactRuntime.assert(this._signedValid_0(usdtPos_0[45], usdtNeg_0[45]),
                            'invalid signed usdt at 45');
    __compactRuntime.assert(this._isPadding_0(btcPos_0[45],
                                              btcNeg_0[45],
                                              ethPos_0[45],
                                              ethNeg_0[45],
                                              usdtPos_0[45],
                                              usdtNeg_0[45])
                            ||
                            this._navPositive_0(btcPos_0[45],
                                                btcNeg_0[45],
                                                ethPos_0[45],
                                                ethNeg_0[45],
                                                usdtPos_0[45],
                                                usdtNeg_0[45],
                                                priceBtc_0,
                                                priceEth_0,
                                                priceUsdt_0),
                            'negative nav at 45');
    __compactRuntime.assert(this._signedValid_0(btcPos_0[46], btcNeg_0[46]),
                            'invalid signed btc at 46');
    __compactRuntime.assert(this._signedValid_0(ethPos_0[46], ethNeg_0[46]),
                            'invalid signed eth at 46');
    __compactRuntime.assert(this._signedValid_0(usdtPos_0[46], usdtNeg_0[46]),
                            'invalid signed usdt at 46');
    __compactRuntime.assert(this._isPadding_0(btcPos_0[46],
                                              btcNeg_0[46],
                                              ethPos_0[46],
                                              ethNeg_0[46],
                                              usdtPos_0[46],
                                              usdtNeg_0[46])
                            ||
                            this._navPositive_0(btcPos_0[46],
                                                btcNeg_0[46],
                                                ethPos_0[46],
                                                ethNeg_0[46],
                                                usdtPos_0[46],
                                                usdtNeg_0[46],
                                                priceBtc_0,
                                                priceEth_0,
                                                priceUsdt_0),
                            'negative nav at 46');
    __compactRuntime.assert(this._signedValid_0(btcPos_0[47], btcNeg_0[47]),
                            'invalid signed btc at 47');
    __compactRuntime.assert(this._signedValid_0(ethPos_0[47], ethNeg_0[47]),
                            'invalid signed eth at 47');
    __compactRuntime.assert(this._signedValid_0(usdtPos_0[47], usdtNeg_0[47]),
                            'invalid signed usdt at 47');
    __compactRuntime.assert(this._isPadding_0(btcPos_0[47],
                                              btcNeg_0[47],
                                              ethPos_0[47],
                                              ethNeg_0[47],
                                              usdtPos_0[47],
                                              usdtNeg_0[47])
                            ||
                            this._navPositive_0(btcPos_0[47],
                                                btcNeg_0[47],
                                                ethPos_0[47],
                                                ethNeg_0[47],
                                                usdtPos_0[47],
                                                usdtNeg_0[47],
                                                priceBtc_0,
                                                priceEth_0,
                                                priceUsdt_0),
                            'negative nav at 47');
    __compactRuntime.assert(this._signedValid_0(btcPos_0[48], btcNeg_0[48]),
                            'invalid signed btc at 48');
    __compactRuntime.assert(this._signedValid_0(ethPos_0[48], ethNeg_0[48]),
                            'invalid signed eth at 48');
    __compactRuntime.assert(this._signedValid_0(usdtPos_0[48], usdtNeg_0[48]),
                            'invalid signed usdt at 48');
    __compactRuntime.assert(this._isPadding_0(btcPos_0[48],
                                              btcNeg_0[48],
                                              ethPos_0[48],
                                              ethNeg_0[48],
                                              usdtPos_0[48],
                                              usdtNeg_0[48])
                            ||
                            this._navPositive_0(btcPos_0[48],
                                                btcNeg_0[48],
                                                ethPos_0[48],
                                                ethNeg_0[48],
                                                usdtPos_0[48],
                                                usdtNeg_0[48],
                                                priceBtc_0,
                                                priceEth_0,
                                                priceUsdt_0),
                            'negative nav at 48');
    __compactRuntime.assert(this._signedValid_0(btcPos_0[49], btcNeg_0[49]),
                            'invalid signed btc at 49');
    __compactRuntime.assert(this._signedValid_0(ethPos_0[49], ethNeg_0[49]),
                            'invalid signed eth at 49');
    __compactRuntime.assert(this._signedValid_0(usdtPos_0[49], usdtNeg_0[49]),
                            'invalid signed usdt at 49');
    __compactRuntime.assert(this._isPadding_0(btcPos_0[49],
                                              btcNeg_0[49],
                                              ethPos_0[49],
                                              ethNeg_0[49],
                                              usdtPos_0[49],
                                              usdtNeg_0[49])
                            ||
                            this._navPositive_0(btcPos_0[49],
                                                btcNeg_0[49],
                                                ethPos_0[49],
                                                ethNeg_0[49],
                                                usdtPos_0[49],
                                                usdtNeg_0[49],
                                                priceBtc_0,
                                                priceEth_0,
                                                priceUsdt_0),
                            'negative nav at 49');
    __compactRuntime.assert(this._signedValid_0(btcPos_0[50], btcNeg_0[50]),
                            'invalid signed btc at 50');
    __compactRuntime.assert(this._signedValid_0(ethPos_0[50], ethNeg_0[50]),
                            'invalid signed eth at 50');
    __compactRuntime.assert(this._signedValid_0(usdtPos_0[50], usdtNeg_0[50]),
                            'invalid signed usdt at 50');
    __compactRuntime.assert(this._isPadding_0(btcPos_0[50],
                                              btcNeg_0[50],
                                              ethPos_0[50],
                                              ethNeg_0[50],
                                              usdtPos_0[50],
                                              usdtNeg_0[50])
                            ||
                            this._navPositive_0(btcPos_0[50],
                                                btcNeg_0[50],
                                                ethPos_0[50],
                                                ethNeg_0[50],
                                                usdtPos_0[50],
                                                usdtNeg_0[50],
                                                priceBtc_0,
                                                priceEth_0,
                                                priceUsdt_0),
                            'negative nav at 50');
    __compactRuntime.assert(this._signedValid_0(btcPos_0[51], btcNeg_0[51]),
                            'invalid signed btc at 51');
    __compactRuntime.assert(this._signedValid_0(ethPos_0[51], ethNeg_0[51]),
                            'invalid signed eth at 51');
    __compactRuntime.assert(this._signedValid_0(usdtPos_0[51], usdtNeg_0[51]),
                            'invalid signed usdt at 51');
    __compactRuntime.assert(this._isPadding_0(btcPos_0[51],
                                              btcNeg_0[51],
                                              ethPos_0[51],
                                              ethNeg_0[51],
                                              usdtPos_0[51],
                                              usdtNeg_0[51])
                            ||
                            this._navPositive_0(btcPos_0[51],
                                                btcNeg_0[51],
                                                ethPos_0[51],
                                                ethNeg_0[51],
                                                usdtPos_0[51],
                                                usdtNeg_0[51],
                                                priceBtc_0,
                                                priceEth_0,
                                                priceUsdt_0),
                            'negative nav at 51');
    __compactRuntime.assert(this._signedValid_0(btcPos_0[52], btcNeg_0[52]),
                            'invalid signed btc at 52');
    __compactRuntime.assert(this._signedValid_0(ethPos_0[52], ethNeg_0[52]),
                            'invalid signed eth at 52');
    __compactRuntime.assert(this._signedValid_0(usdtPos_0[52], usdtNeg_0[52]),
                            'invalid signed usdt at 52');
    __compactRuntime.assert(this._isPadding_0(btcPos_0[52],
                                              btcNeg_0[52],
                                              ethPos_0[52],
                                              ethNeg_0[52],
                                              usdtPos_0[52],
                                              usdtNeg_0[52])
                            ||
                            this._navPositive_0(btcPos_0[52],
                                                btcNeg_0[52],
                                                ethPos_0[52],
                                                ethNeg_0[52],
                                                usdtPos_0[52],
                                                usdtNeg_0[52],
                                                priceBtc_0,
                                                priceEth_0,
                                                priceUsdt_0),
                            'negative nav at 52');
    __compactRuntime.assert(this._signedValid_0(btcPos_0[53], btcNeg_0[53]),
                            'invalid signed btc at 53');
    __compactRuntime.assert(this._signedValid_0(ethPos_0[53], ethNeg_0[53]),
                            'invalid signed eth at 53');
    __compactRuntime.assert(this._signedValid_0(usdtPos_0[53], usdtNeg_0[53]),
                            'invalid signed usdt at 53');
    __compactRuntime.assert(this._isPadding_0(btcPos_0[53],
                                              btcNeg_0[53],
                                              ethPos_0[53],
                                              ethNeg_0[53],
                                              usdtPos_0[53],
                                              usdtNeg_0[53])
                            ||
                            this._navPositive_0(btcPos_0[53],
                                                btcNeg_0[53],
                                                ethPos_0[53],
                                                ethNeg_0[53],
                                                usdtPos_0[53],
                                                usdtNeg_0[53],
                                                priceBtc_0,
                                                priceEth_0,
                                                priceUsdt_0),
                            'negative nav at 53');
    __compactRuntime.assert(this._signedValid_0(btcPos_0[54], btcNeg_0[54]),
                            'invalid signed btc at 54');
    __compactRuntime.assert(this._signedValid_0(ethPos_0[54], ethNeg_0[54]),
                            'invalid signed eth at 54');
    __compactRuntime.assert(this._signedValid_0(usdtPos_0[54], usdtNeg_0[54]),
                            'invalid signed usdt at 54');
    __compactRuntime.assert(this._isPadding_0(btcPos_0[54],
                                              btcNeg_0[54],
                                              ethPos_0[54],
                                              ethNeg_0[54],
                                              usdtPos_0[54],
                                              usdtNeg_0[54])
                            ||
                            this._navPositive_0(btcPos_0[54],
                                                btcNeg_0[54],
                                                ethPos_0[54],
                                                ethNeg_0[54],
                                                usdtPos_0[54],
                                                usdtNeg_0[54],
                                                priceBtc_0,
                                                priceEth_0,
                                                priceUsdt_0),
                            'negative nav at 54');
    __compactRuntime.assert(this._signedValid_0(btcPos_0[55], btcNeg_0[55]),
                            'invalid signed btc at 55');
    __compactRuntime.assert(this._signedValid_0(ethPos_0[55], ethNeg_0[55]),
                            'invalid signed eth at 55');
    __compactRuntime.assert(this._signedValid_0(usdtPos_0[55], usdtNeg_0[55]),
                            'invalid signed usdt at 55');
    __compactRuntime.assert(this._isPadding_0(btcPos_0[55],
                                              btcNeg_0[55],
                                              ethPos_0[55],
                                              ethNeg_0[55],
                                              usdtPos_0[55],
                                              usdtNeg_0[55])
                            ||
                            this._navPositive_0(btcPos_0[55],
                                                btcNeg_0[55],
                                                ethPos_0[55],
                                                ethNeg_0[55],
                                                usdtPos_0[55],
                                                usdtNeg_0[55],
                                                priceBtc_0,
                                                priceEth_0,
                                                priceUsdt_0),
                            'negative nav at 55');
    __compactRuntime.assert(this._signedValid_0(btcPos_0[56], btcNeg_0[56]),
                            'invalid signed btc at 56');
    __compactRuntime.assert(this._signedValid_0(ethPos_0[56], ethNeg_0[56]),
                            'invalid signed eth at 56');
    __compactRuntime.assert(this._signedValid_0(usdtPos_0[56], usdtNeg_0[56]),
                            'invalid signed usdt at 56');
    __compactRuntime.assert(this._isPadding_0(btcPos_0[56],
                                              btcNeg_0[56],
                                              ethPos_0[56],
                                              ethNeg_0[56],
                                              usdtPos_0[56],
                                              usdtNeg_0[56])
                            ||
                            this._navPositive_0(btcPos_0[56],
                                                btcNeg_0[56],
                                                ethPos_0[56],
                                                ethNeg_0[56],
                                                usdtPos_0[56],
                                                usdtNeg_0[56],
                                                priceBtc_0,
                                                priceEth_0,
                                                priceUsdt_0),
                            'negative nav at 56');
    __compactRuntime.assert(this._signedValid_0(btcPos_0[57], btcNeg_0[57]),
                            'invalid signed btc at 57');
    __compactRuntime.assert(this._signedValid_0(ethPos_0[57], ethNeg_0[57]),
                            'invalid signed eth at 57');
    __compactRuntime.assert(this._signedValid_0(usdtPos_0[57], usdtNeg_0[57]),
                            'invalid signed usdt at 57');
    __compactRuntime.assert(this._isPadding_0(btcPos_0[57],
                                              btcNeg_0[57],
                                              ethPos_0[57],
                                              ethNeg_0[57],
                                              usdtPos_0[57],
                                              usdtNeg_0[57])
                            ||
                            this._navPositive_0(btcPos_0[57],
                                                btcNeg_0[57],
                                                ethPos_0[57],
                                                ethNeg_0[57],
                                                usdtPos_0[57],
                                                usdtNeg_0[57],
                                                priceBtc_0,
                                                priceEth_0,
                                                priceUsdt_0),
                            'negative nav at 57');
    __compactRuntime.assert(this._signedValid_0(btcPos_0[58], btcNeg_0[58]),
                            'invalid signed btc at 58');
    __compactRuntime.assert(this._signedValid_0(ethPos_0[58], ethNeg_0[58]),
                            'invalid signed eth at 58');
    __compactRuntime.assert(this._signedValid_0(usdtPos_0[58], usdtNeg_0[58]),
                            'invalid signed usdt at 58');
    __compactRuntime.assert(this._isPadding_0(btcPos_0[58],
                                              btcNeg_0[58],
                                              ethPos_0[58],
                                              ethNeg_0[58],
                                              usdtPos_0[58],
                                              usdtNeg_0[58])
                            ||
                            this._navPositive_0(btcPos_0[58],
                                                btcNeg_0[58],
                                                ethPos_0[58],
                                                ethNeg_0[58],
                                                usdtPos_0[58],
                                                usdtNeg_0[58],
                                                priceBtc_0,
                                                priceEth_0,
                                                priceUsdt_0),
                            'negative nav at 58');
    __compactRuntime.assert(this._signedValid_0(btcPos_0[59], btcNeg_0[59]),
                            'invalid signed btc at 59');
    __compactRuntime.assert(this._signedValid_0(ethPos_0[59], ethNeg_0[59]),
                            'invalid signed eth at 59');
    __compactRuntime.assert(this._signedValid_0(usdtPos_0[59], usdtNeg_0[59]),
                            'invalid signed usdt at 59');
    __compactRuntime.assert(this._isPadding_0(btcPos_0[59],
                                              btcNeg_0[59],
                                              ethPos_0[59],
                                              ethNeg_0[59],
                                              usdtPos_0[59],
                                              usdtNeg_0[59])
                            ||
                            this._navPositive_0(btcPos_0[59],
                                                btcNeg_0[59],
                                                ethPos_0[59],
                                                ethNeg_0[59],
                                                usdtPos_0[59],
                                                usdtNeg_0[59],
                                                priceBtc_0,
                                                priceEth_0,
                                                priceUsdt_0),
                            'negative nav at 59');
    __compactRuntime.assert(this._signedValid_0(btcPos_0[60], btcNeg_0[60]),
                            'invalid signed btc at 60');
    __compactRuntime.assert(this._signedValid_0(ethPos_0[60], ethNeg_0[60]),
                            'invalid signed eth at 60');
    __compactRuntime.assert(this._signedValid_0(usdtPos_0[60], usdtNeg_0[60]),
                            'invalid signed usdt at 60');
    __compactRuntime.assert(this._isPadding_0(btcPos_0[60],
                                              btcNeg_0[60],
                                              ethPos_0[60],
                                              ethNeg_0[60],
                                              usdtPos_0[60],
                                              usdtNeg_0[60])
                            ||
                            this._navPositive_0(btcPos_0[60],
                                                btcNeg_0[60],
                                                ethPos_0[60],
                                                ethNeg_0[60],
                                                usdtPos_0[60],
                                                usdtNeg_0[60],
                                                priceBtc_0,
                                                priceEth_0,
                                                priceUsdt_0),
                            'negative nav at 60');
    __compactRuntime.assert(this._signedValid_0(btcPos_0[61], btcNeg_0[61]),
                            'invalid signed btc at 61');
    __compactRuntime.assert(this._signedValid_0(ethPos_0[61], ethNeg_0[61]),
                            'invalid signed eth at 61');
    __compactRuntime.assert(this._signedValid_0(usdtPos_0[61], usdtNeg_0[61]),
                            'invalid signed usdt at 61');
    __compactRuntime.assert(this._isPadding_0(btcPos_0[61],
                                              btcNeg_0[61],
                                              ethPos_0[61],
                                              ethNeg_0[61],
                                              usdtPos_0[61],
                                              usdtNeg_0[61])
                            ||
                            this._navPositive_0(btcPos_0[61],
                                                btcNeg_0[61],
                                                ethPos_0[61],
                                                ethNeg_0[61],
                                                usdtPos_0[61],
                                                usdtNeg_0[61],
                                                priceBtc_0,
                                                priceEth_0,
                                                priceUsdt_0),
                            'negative nav at 61');
    __compactRuntime.assert(this._signedValid_0(btcPos_0[62], btcNeg_0[62]),
                            'invalid signed btc at 62');
    __compactRuntime.assert(this._signedValid_0(ethPos_0[62], ethNeg_0[62]),
                            'invalid signed eth at 62');
    __compactRuntime.assert(this._signedValid_0(usdtPos_0[62], usdtNeg_0[62]),
                            'invalid signed usdt at 62');
    __compactRuntime.assert(this._isPadding_0(btcPos_0[62],
                                              btcNeg_0[62],
                                              ethPos_0[62],
                                              ethNeg_0[62],
                                              usdtPos_0[62],
                                              usdtNeg_0[62])
                            ||
                            this._navPositive_0(btcPos_0[62],
                                                btcNeg_0[62],
                                                ethPos_0[62],
                                                ethNeg_0[62],
                                                usdtPos_0[62],
                                                usdtNeg_0[62],
                                                priceBtc_0,
                                                priceEth_0,
                                                priceUsdt_0),
                            'negative nav at 62');
    __compactRuntime.assert(this._signedValid_0(btcPos_0[63], btcNeg_0[63]),
                            'invalid signed btc at 63');
    __compactRuntime.assert(this._signedValid_0(ethPos_0[63], ethNeg_0[63]),
                            'invalid signed eth at 63');
    __compactRuntime.assert(this._signedValid_0(usdtPos_0[63], usdtNeg_0[63]),
                            'invalid signed usdt at 63');
    __compactRuntime.assert(this._isPadding_0(btcPos_0[63],
                                              btcNeg_0[63],
                                              ethPos_0[63],
                                              ethNeg_0[63],
                                              usdtPos_0[63],
                                              usdtNeg_0[63])
                            ||
                            this._navPositive_0(btcPos_0[63],
                                                btcNeg_0[63],
                                                ethPos_0[63],
                                                ethNeg_0[63],
                                                usdtPos_0[63],
                                                usdtNeg_0[63],
                                                priceBtc_0,
                                                priceEth_0,
                                                priceUsdt_0),
                            'negative nav at 63');
    return [];
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
  _isPadding_0(btcPos_0, btcNeg_0, ethPos_0, ethNeg_0, usdtPos_0, usdtNeg_0) {
    return this._equal_0(btcPos_0, 0n) && this._equal_1(btcNeg_0, 0n)
           &&
           this._equal_2(ethPos_0, 0n)
           &&
           this._equal_3(ethNeg_0, 0n)
           &&
           this._equal_4(usdtPos_0, 0n)
           &&
           this._equal_5(usdtNeg_0, 0n);
  }
  _signedValid_0(pos_0, neg_0) {
    return this._equal_6(pos_0, 0n) || this._equal_7(neg_0, 0n);
  }
  _navPositive_0(btcPos_0,
                 btcNeg_0,
                 ethPos_0,
                 ethNeg_0,
                 usdtPos_0,
                 usdtNeg_0,
                 priceBtc_0,
                 priceEth_0,
                 priceUsdt_0)
  {
    const posValue_0 = ((t1) => {
                         if (t1 > 340282366920938463463374607431768211455n) {
                           throw new __compactRuntime.CompactError('contract/././mst_hash.compact line 143 char 33: cast from Field or Uint value to smaller Uint value failed: ' + t1 + ' is greater than 340282366920938463463374607431768211455');
                         }
                         return t1;
                       })(__compactRuntime.addField(__compactRuntime.addField(__compactRuntime.mulField(btcPos_0,
                                                                                                        priceBtc_0),
                                                                              __compactRuntime.mulField(ethPos_0,
                                                                                                        priceEth_0)),
                                                    __compactRuntime.mulField(usdtPos_0,
                                                                              priceUsdt_0)));
    const negValue_0 = ((t1) => {
                         if (t1 > 340282366920938463463374607431768211455n) {
                           throw new __compactRuntime.CompactError('contract/././mst_hash.compact line 148 char 33: cast from Field or Uint value to smaller Uint value failed: ' + t1 + ' is greater than 340282366920938463463374607431768211455');
                         }
                         return t1;
                       })(__compactRuntime.addField(__compactRuntime.addField(__compactRuntime.mulField(btcNeg_0,
                                                                                                        priceBtc_0),
                                                                              __compactRuntime.mulField(ethNeg_0,
                                                                                                        priceEth_0)),
                                                    __compactRuntime.mulField(usdtNeg_0,
                                                                              priceUsdt_0)));
    return posValue_0 > negValue_0;
  }
  _batchUserIds_0(context, partialProofData) {
    const witnessContext_0 = __compactRuntime.createWitnessContext(ledger(context.currentQueryContext.state), context.currentPrivateState, context.currentQueryContext.address);
    const [nextPrivateState_0, result_0] = this.witnesses.batchUserIds(witnessContext_0);
    context.currentPrivateState = nextPrivateState_0;
    if (!(Array.isArray(result_0) && result_0.length === 64 && result_0.every((t) => t.buffer instanceof ArrayBuffer && t.BYTES_PER_ELEMENT === 1 && t.length === 32))) {
      __compactRuntime.typeError('batchUserIds',
                                 'return value',
                                 'standard_por.compact line 36 char 1',
                                 'Vector<64, Bytes<32>>',
                                 result_0)
    }
    partialProofData.privateTranscriptOutputs.push({
      value: _descriptor_5.toValue(result_0),
      alignment: _descriptor_5.alignment()
    });
    return result_0;
  }
  _batchBtcPos_0(context, partialProofData) {
    const witnessContext_0 = __compactRuntime.createWitnessContext(ledger(context.currentQueryContext.state), context.currentPrivateState, context.currentQueryContext.address);
    const [nextPrivateState_0, result_0] = this.witnesses.batchBtcPos(witnessContext_0);
    context.currentPrivateState = nextPrivateState_0;
    if (!(Array.isArray(result_0) && result_0.length === 64 && result_0.every((t) => typeof(t) === 'bigint' && t >= 0n && t <= 18446744073709551615n))) {
      __compactRuntime.typeError('batchBtcPos',
                                 'return value',
                                 'standard_por.compact line 37 char 1',
                                 'Vector<64, Uint<0..18446744073709551616>>',
                                 result_0)
    }
    partialProofData.privateTranscriptOutputs.push({
      value: _descriptor_1.toValue(result_0),
      alignment: _descriptor_1.alignment()
    });
    return result_0;
  }
  _batchBtcNeg_0(context, partialProofData) {
    const witnessContext_0 = __compactRuntime.createWitnessContext(ledger(context.currentQueryContext.state), context.currentPrivateState, context.currentQueryContext.address);
    const [nextPrivateState_0, result_0] = this.witnesses.batchBtcNeg(witnessContext_0);
    context.currentPrivateState = nextPrivateState_0;
    if (!(Array.isArray(result_0) && result_0.length === 64 && result_0.every((t) => typeof(t) === 'bigint' && t >= 0n && t <= 18446744073709551615n))) {
      __compactRuntime.typeError('batchBtcNeg',
                                 'return value',
                                 'standard_por.compact line 38 char 1',
                                 'Vector<64, Uint<0..18446744073709551616>>',
                                 result_0)
    }
    partialProofData.privateTranscriptOutputs.push({
      value: _descriptor_1.toValue(result_0),
      alignment: _descriptor_1.alignment()
    });
    return result_0;
  }
  _batchEthPos_0(context, partialProofData) {
    const witnessContext_0 = __compactRuntime.createWitnessContext(ledger(context.currentQueryContext.state), context.currentPrivateState, context.currentQueryContext.address);
    const [nextPrivateState_0, result_0] = this.witnesses.batchEthPos(witnessContext_0);
    context.currentPrivateState = nextPrivateState_0;
    if (!(Array.isArray(result_0) && result_0.length === 64 && result_0.every((t) => typeof(t) === 'bigint' && t >= 0n && t <= 18446744073709551615n))) {
      __compactRuntime.typeError('batchEthPos',
                                 'return value',
                                 'standard_por.compact line 39 char 1',
                                 'Vector<64, Uint<0..18446744073709551616>>',
                                 result_0)
    }
    partialProofData.privateTranscriptOutputs.push({
      value: _descriptor_1.toValue(result_0),
      alignment: _descriptor_1.alignment()
    });
    return result_0;
  }
  _batchEthNeg_0(context, partialProofData) {
    const witnessContext_0 = __compactRuntime.createWitnessContext(ledger(context.currentQueryContext.state), context.currentPrivateState, context.currentQueryContext.address);
    const [nextPrivateState_0, result_0] = this.witnesses.batchEthNeg(witnessContext_0);
    context.currentPrivateState = nextPrivateState_0;
    if (!(Array.isArray(result_0) && result_0.length === 64 && result_0.every((t) => typeof(t) === 'bigint' && t >= 0n && t <= 18446744073709551615n))) {
      __compactRuntime.typeError('batchEthNeg',
                                 'return value',
                                 'standard_por.compact line 40 char 1',
                                 'Vector<64, Uint<0..18446744073709551616>>',
                                 result_0)
    }
    partialProofData.privateTranscriptOutputs.push({
      value: _descriptor_1.toValue(result_0),
      alignment: _descriptor_1.alignment()
    });
    return result_0;
  }
  _batchUsdtPos_0(context, partialProofData) {
    const witnessContext_0 = __compactRuntime.createWitnessContext(ledger(context.currentQueryContext.state), context.currentPrivateState, context.currentQueryContext.address);
    const [nextPrivateState_0, result_0] = this.witnesses.batchUsdtPos(witnessContext_0);
    context.currentPrivateState = nextPrivateState_0;
    if (!(Array.isArray(result_0) && result_0.length === 64 && result_0.every((t) => typeof(t) === 'bigint' && t >= 0n && t <= 18446744073709551615n))) {
      __compactRuntime.typeError('batchUsdtPos',
                                 'return value',
                                 'standard_por.compact line 41 char 1',
                                 'Vector<64, Uint<0..18446744073709551616>>',
                                 result_0)
    }
    partialProofData.privateTranscriptOutputs.push({
      value: _descriptor_1.toValue(result_0),
      alignment: _descriptor_1.alignment()
    });
    return result_0;
  }
  _batchUsdtNeg_0(context, partialProofData) {
    const witnessContext_0 = __compactRuntime.createWitnessContext(ledger(context.currentQueryContext.state), context.currentPrivateState, context.currentQueryContext.address);
    const [nextPrivateState_0, result_0] = this.witnesses.batchUsdtNeg(witnessContext_0);
    context.currentPrivateState = nextPrivateState_0;
    if (!(Array.isArray(result_0) && result_0.length === 64 && result_0.every((t) => typeof(t) === 'bigint' && t >= 0n && t <= 18446744073709551615n))) {
      __compactRuntime.typeError('batchUsdtNeg',
                                 'return value',
                                 'standard_por.compact line 42 char 1',
                                 'Vector<64, Uint<0..18446744073709551616>>',
                                 result_0)
    }
    partialProofData.privateTranscriptOutputs.push({
      value: _descriptor_1.toValue(result_0),
      alignment: _descriptor_1.alignment()
    });
    return result_0;
  }
  _submitSnapshot_0(context,
                    partialProofData,
                    seq_0,
                    ts_0,
                    priceBtcArg_0,
                    priceEthArg_0,
                    priceUsdtArg_0,
                    declaredReservesBtcArg_0,
                    declaredReservesEthArg_0,
                    declaredReservesUsdtArg_0,
                    rootHash_0)
  {
    __compactRuntime.assert(!_descriptor_2.fromValue(__compactRuntime.queryLedgerState(context,
                                                                                       partialProofData,
                                                                                       [
                                                                                        { dup: { n: 0 } },
                                                                                        { idx: { cached: false,
                                                                                                 pushPath: false,
                                                                                                 path: [
                                                                                                        { tag: 'value',
                                                                                                          value: { value: _descriptor_12.toValue(1n),
                                                                                                                   alignment: _descriptor_12.alignment() } },
                                                                                                        { tag: 'value',
                                                                                                          value: { value: _descriptor_12.toValue(14n),
                                                                                                                   alignment: _descriptor_12.alignment() } }] } },
                                                                                        { popeq: { cached: false,
                                                                                                   result: undefined } }]).value),
                            'already published');
    __compactRuntime.assert(this._equal_8(this._ownPublicKey_0(context,
                                                               partialProofData).bytes,
                                          _descriptor_3.fromValue(__compactRuntime.queryLedgerState(context,
                                                                                                    partialProofData,
                                                                                                    [
                                                                                                     { dup: { n: 0 } },
                                                                                                     { idx: { cached: false,
                                                                                                              pushPath: false,
                                                                                                              path: [
                                                                                                                     { tag: 'value',
                                                                                                                       value: { value: _descriptor_12.toValue(0n),
                                                                                                                                alignment: _descriptor_12.alignment() } },
                                                                                                                     { tag: 'value',
                                                                                                                       value: { value: _descriptor_12.toValue(0n),
                                                                                                                                alignment: _descriptor_12.alignment() } }] } },
                                                                                                     { popeq: { cached: false,
                                                                                                                result: undefined } }]).value)),
                            'not authority');
    __compactRuntime.assert(priceBtcArg_0 > 0n, 'btc price must be positive');
    __compactRuntime.assert(priceEthArg_0 > 0n, 'eth price must be positive');
    __compactRuntime.assert(priceUsdtArg_0 > 0n, 'usdt price must be positive');
    __compactRuntime.assert(priceBtcArg_0 <= 1000000000000n,
                            'btc price too large');
    __compactRuntime.assert(priceEthArg_0 <= 1000000000000n,
                            'eth price too large');
    __compactRuntime.assert(priceUsdtArg_0 <= 1000000000000n,
                            'usdt price too large');
    const userIds_0 = this._batchUserIds_0(context, partialProofData);
    const btcPos_0 = this._batchBtcPos_0(context, partialProofData);
    const btcNeg_0 = this._batchBtcNeg_0(context, partialProofData);
    const ethPos_0 = this._batchEthPos_0(context, partialProofData);
    const ethNeg_0 = this._batchEthNeg_0(context, partialProofData);
    const usdtPos_0 = this._batchUsdtPos_0(context, partialProofData);
    const usdtNeg_0 = this._batchUsdtNeg_0(context, partialProofData);
    this._assertNavs_0(btcPos_0,
                       btcNeg_0,
                       ethPos_0,
                       ethNeg_0,
                       usdtPos_0,
                       usdtNeg_0,
                       priceBtcArg_0,
                       priceEthArg_0,
                       priceUsdtArg_0);
    const root_0 = this._rootFrom64_0(userIds_0,
                                      btcPos_0,
                                      btcNeg_0,
                                      ethPos_0,
                                      ethNeg_0,
                                      usdtPos_0,
                                      usdtNeg_0);
    __compactRuntime.assert(this._equal_9(root_0.hash, rootHash_0),
                            'root mismatch');
    const btcReserve_0 = declaredReservesBtcArg_0;
    const ethReserve_0 = declaredReservesEthArg_0;
    const usdtReserve_0 = declaredReservesUsdtArg_0;
    let t_0;
    __compactRuntime.assert((t_0 = root_0.btcPosSum,
                             t_0 <= root_0.btcNegSum + btcReserve_0),
                            'btc net exposure exceeds reserves');
    let t_1;
    __compactRuntime.assert((t_1 = root_0.ethPosSum,
                             t_1 <= root_0.ethNegSum + ethReserve_0),
                            'eth net exposure exceeds reserves');
    let t_2;
    __compactRuntime.assert((t_2 = root_0.usdtPosSum,
                             t_2 <= root_0.usdtNegSum + usdtReserve_0),
                            'usdt net exposure exceeds reserves');
    __compactRuntime.queryLedgerState(context,
                                      partialProofData,
                                      [
                                       { idx: { cached: false,
                                                pushPath: true,
                                                path: [
                                                       { tag: 'value',
                                                         value: { value: _descriptor_12.toValue(0n),
                                                                  alignment: _descriptor_12.alignment() } }] } },
                                       { push: { storage: false,
                                                 value: __compactRuntime.StateValue.newCell({ value: _descriptor_12.toValue(1n),
                                                                                              alignment: _descriptor_12.alignment() }).encode() } },
                                       { push: { storage: true,
                                                 value: __compactRuntime.StateValue.newCell({ value: _descriptor_0.toValue(seq_0),
                                                                                              alignment: _descriptor_0.alignment() }).encode() } },
                                       { ins: { cached: false, n: 1 } },
                                       { ins: { cached: true, n: 1 } }]);
    __compactRuntime.queryLedgerState(context,
                                      partialProofData,
                                      [
                                       { idx: { cached: false,
                                                pushPath: true,
                                                path: [
                                                       { tag: 'value',
                                                         value: { value: _descriptor_12.toValue(1n),
                                                                  alignment: _descriptor_12.alignment() } }] } },
                                       { push: { storage: false,
                                                 value: __compactRuntime.StateValue.newCell({ value: _descriptor_12.toValue(0n),
                                                                                              alignment: _descriptor_12.alignment() }).encode() } },
                                       { push: { storage: true,
                                                 value: __compactRuntime.StateValue.newCell({ value: _descriptor_0.toValue(ts_0),
                                                                                              alignment: _descriptor_0.alignment() }).encode() } },
                                       { ins: { cached: false, n: 1 } },
                                       { ins: { cached: true, n: 1 } }]);
    __compactRuntime.queryLedgerState(context,
                                      partialProofData,
                                      [
                                       { idx: { cached: false,
                                                pushPath: true,
                                                path: [
                                                       { tag: 'value',
                                                         value: { value: _descriptor_12.toValue(1n),
                                                                  alignment: _descriptor_12.alignment() } }] } },
                                       { push: { storage: false,
                                                 value: __compactRuntime.StateValue.newCell({ value: _descriptor_12.toValue(1n),
                                                                                              alignment: _descriptor_12.alignment() }).encode() } },
                                       { push: { storage: true,
                                                 value: __compactRuntime.StateValue.newCell({ value: _descriptor_3.toValue(rootHash_0),
                                                                                              alignment: _descriptor_3.alignment() }).encode() } },
                                       { ins: { cached: false, n: 1 } },
                                       { ins: { cached: true, n: 1 } }]);
    __compactRuntime.queryLedgerState(context,
                                      partialProofData,
                                      [
                                       { idx: { cached: false,
                                                pushPath: true,
                                                path: [
                                                       { tag: 'value',
                                                         value: { value: _descriptor_12.toValue(1n),
                                                                  alignment: _descriptor_12.alignment() } }] } },
                                       { push: { storage: false,
                                                 value: __compactRuntime.StateValue.newCell({ value: _descriptor_12.toValue(2n),
                                                                                              alignment: _descriptor_12.alignment() }).encode() } },
                                       { push: { storage: true,
                                                 value: __compactRuntime.StateValue.newCell({ value: _descriptor_0.toValue(priceBtcArg_0),
                                                                                              alignment: _descriptor_0.alignment() }).encode() } },
                                       { ins: { cached: false, n: 1 } },
                                       { ins: { cached: true, n: 1 } }]);
    __compactRuntime.queryLedgerState(context,
                                      partialProofData,
                                      [
                                       { idx: { cached: false,
                                                pushPath: true,
                                                path: [
                                                       { tag: 'value',
                                                         value: { value: _descriptor_12.toValue(1n),
                                                                  alignment: _descriptor_12.alignment() } }] } },
                                       { push: { storage: false,
                                                 value: __compactRuntime.StateValue.newCell({ value: _descriptor_12.toValue(3n),
                                                                                              alignment: _descriptor_12.alignment() }).encode() } },
                                       { push: { storage: true,
                                                 value: __compactRuntime.StateValue.newCell({ value: _descriptor_0.toValue(priceEthArg_0),
                                                                                              alignment: _descriptor_0.alignment() }).encode() } },
                                       { ins: { cached: false, n: 1 } },
                                       { ins: { cached: true, n: 1 } }]);
    __compactRuntime.queryLedgerState(context,
                                      partialProofData,
                                      [
                                       { idx: { cached: false,
                                                pushPath: true,
                                                path: [
                                                       { tag: 'value',
                                                         value: { value: _descriptor_12.toValue(1n),
                                                                  alignment: _descriptor_12.alignment() } }] } },
                                       { push: { storage: false,
                                                 value: __compactRuntime.StateValue.newCell({ value: _descriptor_12.toValue(4n),
                                                                                              alignment: _descriptor_12.alignment() }).encode() } },
                                       { push: { storage: true,
                                                 value: __compactRuntime.StateValue.newCell({ value: _descriptor_0.toValue(priceUsdtArg_0),
                                                                                              alignment: _descriptor_0.alignment() }).encode() } },
                                       { ins: { cached: false, n: 1 } },
                                       { ins: { cached: true, n: 1 } }]);
    __compactRuntime.queryLedgerState(context,
                                      partialProofData,
                                      [
                                       { idx: { cached: false,
                                                pushPath: true,
                                                path: [
                                                       { tag: 'value',
                                                         value: { value: _descriptor_12.toValue(1n),
                                                                  alignment: _descriptor_12.alignment() } }] } },
                                       { push: { storage: false,
                                                 value: __compactRuntime.StateValue.newCell({ value: _descriptor_12.toValue(5n),
                                                                                              alignment: _descriptor_12.alignment() }).encode() } },
                                       { push: { storage: true,
                                                 value: __compactRuntime.StateValue.newCell({ value: _descriptor_0.toValue(declaredReservesBtcArg_0),
                                                                                              alignment: _descriptor_0.alignment() }).encode() } },
                                       { ins: { cached: false, n: 1 } },
                                       { ins: { cached: true, n: 1 } }]);
    __compactRuntime.queryLedgerState(context,
                                      partialProofData,
                                      [
                                       { idx: { cached: false,
                                                pushPath: true,
                                                path: [
                                                       { tag: 'value',
                                                         value: { value: _descriptor_12.toValue(1n),
                                                                  alignment: _descriptor_12.alignment() } }] } },
                                       { push: { storage: false,
                                                 value: __compactRuntime.StateValue.newCell({ value: _descriptor_12.toValue(6n),
                                                                                              alignment: _descriptor_12.alignment() }).encode() } },
                                       { push: { storage: true,
                                                 value: __compactRuntime.StateValue.newCell({ value: _descriptor_0.toValue(declaredReservesEthArg_0),
                                                                                              alignment: _descriptor_0.alignment() }).encode() } },
                                       { ins: { cached: false, n: 1 } },
                                       { ins: { cached: true, n: 1 } }]);
    __compactRuntime.queryLedgerState(context,
                                      partialProofData,
                                      [
                                       { idx: { cached: false,
                                                pushPath: true,
                                                path: [
                                                       { tag: 'value',
                                                         value: { value: _descriptor_12.toValue(1n),
                                                                  alignment: _descriptor_12.alignment() } }] } },
                                       { push: { storage: false,
                                                 value: __compactRuntime.StateValue.newCell({ value: _descriptor_12.toValue(7n),
                                                                                              alignment: _descriptor_12.alignment() }).encode() } },
                                       { push: { storage: true,
                                                 value: __compactRuntime.StateValue.newCell({ value: _descriptor_0.toValue(declaredReservesUsdtArg_0),
                                                                                              alignment: _descriptor_0.alignment() }).encode() } },
                                       { ins: { cached: false, n: 1 } },
                                       { ins: { cached: true, n: 1 } }]);
    const tmp_0 = root_0.btcPosSum;
    __compactRuntime.queryLedgerState(context,
                                      partialProofData,
                                      [
                                       { idx: { cached: false,
                                                pushPath: true,
                                                path: [
                                                       { tag: 'value',
                                                         value: { value: _descriptor_12.toValue(1n),
                                                                  alignment: _descriptor_12.alignment() } }] } },
                                       { push: { storage: false,
                                                 value: __compactRuntime.StateValue.newCell({ value: _descriptor_12.toValue(8n),
                                                                                              alignment: _descriptor_12.alignment() }).encode() } },
                                       { push: { storage: true,
                                                 value: __compactRuntime.StateValue.newCell({ value: _descriptor_4.toValue(tmp_0),
                                                                                              alignment: _descriptor_4.alignment() }).encode() } },
                                       { ins: { cached: false, n: 1 } },
                                       { ins: { cached: true, n: 1 } }]);
    const tmp_1 = root_0.btcNegSum;
    __compactRuntime.queryLedgerState(context,
                                      partialProofData,
                                      [
                                       { idx: { cached: false,
                                                pushPath: true,
                                                path: [
                                                       { tag: 'value',
                                                         value: { value: _descriptor_12.toValue(1n),
                                                                  alignment: _descriptor_12.alignment() } }] } },
                                       { push: { storage: false,
                                                 value: __compactRuntime.StateValue.newCell({ value: _descriptor_12.toValue(9n),
                                                                                              alignment: _descriptor_12.alignment() }).encode() } },
                                       { push: { storage: true,
                                                 value: __compactRuntime.StateValue.newCell({ value: _descriptor_4.toValue(tmp_1),
                                                                                              alignment: _descriptor_4.alignment() }).encode() } },
                                       { ins: { cached: false, n: 1 } },
                                       { ins: { cached: true, n: 1 } }]);
    const tmp_2 = root_0.ethPosSum;
    __compactRuntime.queryLedgerState(context,
                                      partialProofData,
                                      [
                                       { idx: { cached: false,
                                                pushPath: true,
                                                path: [
                                                       { tag: 'value',
                                                         value: { value: _descriptor_12.toValue(1n),
                                                                  alignment: _descriptor_12.alignment() } }] } },
                                       { push: { storage: false,
                                                 value: __compactRuntime.StateValue.newCell({ value: _descriptor_12.toValue(10n),
                                                                                              alignment: _descriptor_12.alignment() }).encode() } },
                                       { push: { storage: true,
                                                 value: __compactRuntime.StateValue.newCell({ value: _descriptor_4.toValue(tmp_2),
                                                                                              alignment: _descriptor_4.alignment() }).encode() } },
                                       { ins: { cached: false, n: 1 } },
                                       { ins: { cached: true, n: 1 } }]);
    const tmp_3 = root_0.ethNegSum;
    __compactRuntime.queryLedgerState(context,
                                      partialProofData,
                                      [
                                       { idx: { cached: false,
                                                pushPath: true,
                                                path: [
                                                       { tag: 'value',
                                                         value: { value: _descriptor_12.toValue(1n),
                                                                  alignment: _descriptor_12.alignment() } }] } },
                                       { push: { storage: false,
                                                 value: __compactRuntime.StateValue.newCell({ value: _descriptor_12.toValue(11n),
                                                                                              alignment: _descriptor_12.alignment() }).encode() } },
                                       { push: { storage: true,
                                                 value: __compactRuntime.StateValue.newCell({ value: _descriptor_4.toValue(tmp_3),
                                                                                              alignment: _descriptor_4.alignment() }).encode() } },
                                       { ins: { cached: false, n: 1 } },
                                       { ins: { cached: true, n: 1 } }]);
    const tmp_4 = root_0.usdtPosSum;
    __compactRuntime.queryLedgerState(context,
                                      partialProofData,
                                      [
                                       { idx: { cached: false,
                                                pushPath: true,
                                                path: [
                                                       { tag: 'value',
                                                         value: { value: _descriptor_12.toValue(1n),
                                                                  alignment: _descriptor_12.alignment() } }] } },
                                       { push: { storage: false,
                                                 value: __compactRuntime.StateValue.newCell({ value: _descriptor_12.toValue(12n),
                                                                                              alignment: _descriptor_12.alignment() }).encode() } },
                                       { push: { storage: true,
                                                 value: __compactRuntime.StateValue.newCell({ value: _descriptor_4.toValue(tmp_4),
                                                                                              alignment: _descriptor_4.alignment() }).encode() } },
                                       { ins: { cached: false, n: 1 } },
                                       { ins: { cached: true, n: 1 } }]);
    const tmp_5 = root_0.usdtNegSum;
    __compactRuntime.queryLedgerState(context,
                                      partialProofData,
                                      [
                                       { idx: { cached: false,
                                                pushPath: true,
                                                path: [
                                                       { tag: 'value',
                                                         value: { value: _descriptor_12.toValue(1n),
                                                                  alignment: _descriptor_12.alignment() } }] } },
                                       { push: { storage: false,
                                                 value: __compactRuntime.StateValue.newCell({ value: _descriptor_12.toValue(13n),
                                                                                              alignment: _descriptor_12.alignment() }).encode() } },
                                       { push: { storage: true,
                                                 value: __compactRuntime.StateValue.newCell({ value: _descriptor_4.toValue(tmp_5),
                                                                                              alignment: _descriptor_4.alignment() }).encode() } },
                                       { ins: { cached: false, n: 1 } },
                                       { ins: { cached: true, n: 1 } }]);
    __compactRuntime.queryLedgerState(context,
                                      partialProofData,
                                      [
                                       { idx: { cached: false,
                                                pushPath: true,
                                                path: [
                                                       { tag: 'value',
                                                         value: { value: _descriptor_12.toValue(1n),
                                                                  alignment: _descriptor_12.alignment() } }] } },
                                       { push: { storage: false,
                                                 value: __compactRuntime.StateValue.newCell({ value: _descriptor_12.toValue(14n),
                                                                                              alignment: _descriptor_12.alignment() }).encode() } },
                                       { push: { storage: true,
                                                 value: __compactRuntime.StateValue.newCell({ value: _descriptor_2.toValue(true),
                                                                                              alignment: _descriptor_2.alignment() }).encode() } },
                                       { ins: { cached: false, n: 1 } },
                                       { ins: { cached: true, n: 1 } }]);
    return [];
  }
  _equal_0(x0, y0) {
    if (x0 !== y0) { return false; }
    return true;
  }
  _equal_1(x0, y0) {
    if (x0 !== y0) { return false; }
    return true;
  }
  _equal_2(x0, y0) {
    if (x0 !== y0) { return false; }
    return true;
  }
  _equal_3(x0, y0) {
    if (x0 !== y0) { return false; }
    return true;
  }
  _equal_4(x0, y0) {
    if (x0 !== y0) { return false; }
    return true;
  }
  _equal_5(x0, y0) {
    if (x0 !== y0) { return false; }
    return true;
  }
  _equal_6(x0, y0) {
    if (x0 !== y0) { return false; }
    return true;
  }
  _equal_7(x0, y0) {
    if (x0 !== y0) { return false; }
    return true;
  }
  _equal_8(x0, y0) {
    if (!x0.every((x, i) => y0[i] === x)) { return false; }
    return true;
  }
  _equal_9(x0, y0) {
    if (!x0.every((x, i) => y0[i] === x)) { return false; }
    return true;
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
    get authorityPk() {
      return _descriptor_3.fromValue(__compactRuntime.queryLedgerState(context,
                                                                       partialProofData,
                                                                       [
                                                                        { dup: { n: 0 } },
                                                                        { idx: { cached: false,
                                                                                 pushPath: false,
                                                                                 path: [
                                                                                        { tag: 'value',
                                                                                          value: { value: _descriptor_12.toValue(0n),
                                                                                                   alignment: _descriptor_12.alignment() } },
                                                                                        { tag: 'value',
                                                                                          value: { value: _descriptor_12.toValue(0n),
                                                                                                   alignment: _descriptor_12.alignment() } }] } },
                                                                        { popeq: { cached: false,
                                                                                   result: undefined } }]).value);
    },
    get snapshotSeq() {
      return _descriptor_0.fromValue(__compactRuntime.queryLedgerState(context,
                                                                       partialProofData,
                                                                       [
                                                                        { dup: { n: 0 } },
                                                                        { idx: { cached: false,
                                                                                 pushPath: false,
                                                                                 path: [
                                                                                        { tag: 'value',
                                                                                          value: { value: _descriptor_12.toValue(0n),
                                                                                                   alignment: _descriptor_12.alignment() } },
                                                                                        { tag: 'value',
                                                                                          value: { value: _descriptor_12.toValue(1n),
                                                                                                   alignment: _descriptor_12.alignment() } }] } },
                                                                        { popeq: { cached: false,
                                                                                   result: undefined } }]).value);
    },
    get timestamp() {
      return _descriptor_0.fromValue(__compactRuntime.queryLedgerState(context,
                                                                       partialProofData,
                                                                       [
                                                                        { dup: { n: 0 } },
                                                                        { idx: { cached: false,
                                                                                 pushPath: false,
                                                                                 path: [
                                                                                        { tag: 'value',
                                                                                          value: { value: _descriptor_12.toValue(1n),
                                                                                                   alignment: _descriptor_12.alignment() } },
                                                                                        { tag: 'value',
                                                                                          value: { value: _descriptor_12.toValue(0n),
                                                                                                   alignment: _descriptor_12.alignment() } }] } },
                                                                        { popeq: { cached: false,
                                                                                   result: undefined } }]).value);
    },
    get mstRoot() {
      return _descriptor_3.fromValue(__compactRuntime.queryLedgerState(context,
                                                                       partialProofData,
                                                                       [
                                                                        { dup: { n: 0 } },
                                                                        { idx: { cached: false,
                                                                                 pushPath: false,
                                                                                 path: [
                                                                                        { tag: 'value',
                                                                                          value: { value: _descriptor_12.toValue(1n),
                                                                                                   alignment: _descriptor_12.alignment() } },
                                                                                        { tag: 'value',
                                                                                          value: { value: _descriptor_12.toValue(1n),
                                                                                                   alignment: _descriptor_12.alignment() } }] } },
                                                                        { popeq: { cached: false,
                                                                                   result: undefined } }]).value);
    },
    get priceBtc() {
      return _descriptor_0.fromValue(__compactRuntime.queryLedgerState(context,
                                                                       partialProofData,
                                                                       [
                                                                        { dup: { n: 0 } },
                                                                        { idx: { cached: false,
                                                                                 pushPath: false,
                                                                                 path: [
                                                                                        { tag: 'value',
                                                                                          value: { value: _descriptor_12.toValue(1n),
                                                                                                   alignment: _descriptor_12.alignment() } },
                                                                                        { tag: 'value',
                                                                                          value: { value: _descriptor_12.toValue(2n),
                                                                                                   alignment: _descriptor_12.alignment() } }] } },
                                                                        { popeq: { cached: false,
                                                                                   result: undefined } }]).value);
    },
    get priceEth() {
      return _descriptor_0.fromValue(__compactRuntime.queryLedgerState(context,
                                                                       partialProofData,
                                                                       [
                                                                        { dup: { n: 0 } },
                                                                        { idx: { cached: false,
                                                                                 pushPath: false,
                                                                                 path: [
                                                                                        { tag: 'value',
                                                                                          value: { value: _descriptor_12.toValue(1n),
                                                                                                   alignment: _descriptor_12.alignment() } },
                                                                                        { tag: 'value',
                                                                                          value: { value: _descriptor_12.toValue(3n),
                                                                                                   alignment: _descriptor_12.alignment() } }] } },
                                                                        { popeq: { cached: false,
                                                                                   result: undefined } }]).value);
    },
    get priceUsdt() {
      return _descriptor_0.fromValue(__compactRuntime.queryLedgerState(context,
                                                                       partialProofData,
                                                                       [
                                                                        { dup: { n: 0 } },
                                                                        { idx: { cached: false,
                                                                                 pushPath: false,
                                                                                 path: [
                                                                                        { tag: 'value',
                                                                                          value: { value: _descriptor_12.toValue(1n),
                                                                                                   alignment: _descriptor_12.alignment() } },
                                                                                        { tag: 'value',
                                                                                          value: { value: _descriptor_12.toValue(4n),
                                                                                                   alignment: _descriptor_12.alignment() } }] } },
                                                                        { popeq: { cached: false,
                                                                                   result: undefined } }]).value);
    },
    get declaredReservesBtc() {
      return _descriptor_0.fromValue(__compactRuntime.queryLedgerState(context,
                                                                       partialProofData,
                                                                       [
                                                                        { dup: { n: 0 } },
                                                                        { idx: { cached: false,
                                                                                 pushPath: false,
                                                                                 path: [
                                                                                        { tag: 'value',
                                                                                          value: { value: _descriptor_12.toValue(1n),
                                                                                                   alignment: _descriptor_12.alignment() } },
                                                                                        { tag: 'value',
                                                                                          value: { value: _descriptor_12.toValue(5n),
                                                                                                   alignment: _descriptor_12.alignment() } }] } },
                                                                        { popeq: { cached: false,
                                                                                   result: undefined } }]).value);
    },
    get declaredReservesEth() {
      return _descriptor_0.fromValue(__compactRuntime.queryLedgerState(context,
                                                                       partialProofData,
                                                                       [
                                                                        { dup: { n: 0 } },
                                                                        { idx: { cached: false,
                                                                                 pushPath: false,
                                                                                 path: [
                                                                                        { tag: 'value',
                                                                                          value: { value: _descriptor_12.toValue(1n),
                                                                                                   alignment: _descriptor_12.alignment() } },
                                                                                        { tag: 'value',
                                                                                          value: { value: _descriptor_12.toValue(6n),
                                                                                                   alignment: _descriptor_12.alignment() } }] } },
                                                                        { popeq: { cached: false,
                                                                                   result: undefined } }]).value);
    },
    get declaredReservesUsdt() {
      return _descriptor_0.fromValue(__compactRuntime.queryLedgerState(context,
                                                                       partialProofData,
                                                                       [
                                                                        { dup: { n: 0 } },
                                                                        { idx: { cached: false,
                                                                                 pushPath: false,
                                                                                 path: [
                                                                                        { tag: 'value',
                                                                                          value: { value: _descriptor_12.toValue(1n),
                                                                                                   alignment: _descriptor_12.alignment() } },
                                                                                        { tag: 'value',
                                                                                          value: { value: _descriptor_12.toValue(7n),
                                                                                                   alignment: _descriptor_12.alignment() } }] } },
                                                                        { popeq: { cached: false,
                                                                                   result: undefined } }]).value);
    },
    get liabilitiesBtcPos() {
      return _descriptor_4.fromValue(__compactRuntime.queryLedgerState(context,
                                                                       partialProofData,
                                                                       [
                                                                        { dup: { n: 0 } },
                                                                        { idx: { cached: false,
                                                                                 pushPath: false,
                                                                                 path: [
                                                                                        { tag: 'value',
                                                                                          value: { value: _descriptor_12.toValue(1n),
                                                                                                   alignment: _descriptor_12.alignment() } },
                                                                                        { tag: 'value',
                                                                                          value: { value: _descriptor_12.toValue(8n),
                                                                                                   alignment: _descriptor_12.alignment() } }] } },
                                                                        { popeq: { cached: false,
                                                                                   result: undefined } }]).value);
    },
    get liabilitiesBtcNeg() {
      return _descriptor_4.fromValue(__compactRuntime.queryLedgerState(context,
                                                                       partialProofData,
                                                                       [
                                                                        { dup: { n: 0 } },
                                                                        { idx: { cached: false,
                                                                                 pushPath: false,
                                                                                 path: [
                                                                                        { tag: 'value',
                                                                                          value: { value: _descriptor_12.toValue(1n),
                                                                                                   alignment: _descriptor_12.alignment() } },
                                                                                        { tag: 'value',
                                                                                          value: { value: _descriptor_12.toValue(9n),
                                                                                                   alignment: _descriptor_12.alignment() } }] } },
                                                                        { popeq: { cached: false,
                                                                                   result: undefined } }]).value);
    },
    get liabilitiesEthPos() {
      return _descriptor_4.fromValue(__compactRuntime.queryLedgerState(context,
                                                                       partialProofData,
                                                                       [
                                                                        { dup: { n: 0 } },
                                                                        { idx: { cached: false,
                                                                                 pushPath: false,
                                                                                 path: [
                                                                                        { tag: 'value',
                                                                                          value: { value: _descriptor_12.toValue(1n),
                                                                                                   alignment: _descriptor_12.alignment() } },
                                                                                        { tag: 'value',
                                                                                          value: { value: _descriptor_12.toValue(10n),
                                                                                                   alignment: _descriptor_12.alignment() } }] } },
                                                                        { popeq: { cached: false,
                                                                                   result: undefined } }]).value);
    },
    get liabilitiesEthNeg() {
      return _descriptor_4.fromValue(__compactRuntime.queryLedgerState(context,
                                                                       partialProofData,
                                                                       [
                                                                        { dup: { n: 0 } },
                                                                        { idx: { cached: false,
                                                                                 pushPath: false,
                                                                                 path: [
                                                                                        { tag: 'value',
                                                                                          value: { value: _descriptor_12.toValue(1n),
                                                                                                   alignment: _descriptor_12.alignment() } },
                                                                                        { tag: 'value',
                                                                                          value: { value: _descriptor_12.toValue(11n),
                                                                                                   alignment: _descriptor_12.alignment() } }] } },
                                                                        { popeq: { cached: false,
                                                                                   result: undefined } }]).value);
    },
    get liabilitiesUsdtPos() {
      return _descriptor_4.fromValue(__compactRuntime.queryLedgerState(context,
                                                                       partialProofData,
                                                                       [
                                                                        { dup: { n: 0 } },
                                                                        { idx: { cached: false,
                                                                                 pushPath: false,
                                                                                 path: [
                                                                                        { tag: 'value',
                                                                                          value: { value: _descriptor_12.toValue(1n),
                                                                                                   alignment: _descriptor_12.alignment() } },
                                                                                        { tag: 'value',
                                                                                          value: { value: _descriptor_12.toValue(12n),
                                                                                                   alignment: _descriptor_12.alignment() } }] } },
                                                                        { popeq: { cached: false,
                                                                                   result: undefined } }]).value);
    },
    get liabilitiesUsdtNeg() {
      return _descriptor_4.fromValue(__compactRuntime.queryLedgerState(context,
                                                                       partialProofData,
                                                                       [
                                                                        { dup: { n: 0 } },
                                                                        { idx: { cached: false,
                                                                                 pushPath: false,
                                                                                 path: [
                                                                                        { tag: 'value',
                                                                                          value: { value: _descriptor_12.toValue(1n),
                                                                                                   alignment: _descriptor_12.alignment() } },
                                                                                        { tag: 'value',
                                                                                          value: { value: _descriptor_12.toValue(13n),
                                                                                                   alignment: _descriptor_12.alignment() } }] } },
                                                                        { popeq: { cached: false,
                                                                                   result: undefined } }]).value);
    },
    get published() {
      return _descriptor_2.fromValue(__compactRuntime.queryLedgerState(context,
                                                                       partialProofData,
                                                                       [
                                                                        { dup: { n: 0 } },
                                                                        { idx: { cached: false,
                                                                                 pushPath: false,
                                                                                 path: [
                                                                                        { tag: 'value',
                                                                                          value: { value: _descriptor_12.toValue(1n),
                                                                                                   alignment: _descriptor_12.alignment() } },
                                                                                        { tag: 'value',
                                                                                          value: { value: _descriptor_12.toValue(14n),
                                                                                                   alignment: _descriptor_12.alignment() } }] } },
                                                                        { popeq: { cached: false,
                                                                                   result: undefined } }]).value);
    }
  };
}
const _emptyContext = {
  currentQueryContext: new __compactRuntime.QueryContext(new __compactRuntime.ContractState().data, __compactRuntime.dummyContractAddress())
};
const _dummyContract = new Contract({
  batchUserIds: (...args) => undefined,
  batchBtcPos: (...args) => undefined,
  batchBtcNeg: (...args) => undefined,
  batchEthPos: (...args) => undefined,
  batchEthNeg: (...args) => undefined,
  batchUsdtPos: (...args) => undefined,
  batchUsdtNeg: (...args) => undefined
});
export const pureCircuits = {};
export const contractReferenceLocations =
  { tag: 'publicLedgerArray', indices: { } };
//# sourceMappingURL=index.js.map
