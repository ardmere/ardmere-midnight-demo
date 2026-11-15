import type * as __compactRuntime from '@midnight-ntwrk/compact-runtime';

export type MstNode = { hash: Uint8Array;
                        btcPosSum: bigint;
                        btcNegSum: bigint;
                        ethPosSum: bigint;
                        ethNegSum: bigint;
                        usdtPosSum: bigint;
                        usdtNegSum: bigint
                      };

export type Witnesses<PS> = {
}

export type ImpureCircuits<PS> = {
}

export type ProvableCircuits<PS> = {
}

export type PureCircuits = {
  leafHash(userIdHash_0: Uint8Array,
           btcPos_0: bigint,
           btcNeg_0: bigint,
           ethPos_0: bigint,
           ethNeg_0: bigint,
           usdtPos_0: bigint,
           usdtNeg_0: bigint): Uint8Array;
  parentHash(left_0: MstNode, right_0: MstNode): MstNode;
  mstRootFromLeaves(userIds_0: Uint8Array[],
                    btcPos_0: bigint[],
                    btcNeg_0: bigint[],
                    ethPos_0: bigint[],
                    ethNeg_0: bigint[],
                    usdtPos_0: bigint[],
                    usdtNeg_0: bigint[]): MstNode;
}

export type Circuits<PS> = {
  leafHash(context: __compactRuntime.CircuitContext<PS>,
           userIdHash_0: Uint8Array,
           btcPos_0: bigint,
           btcNeg_0: bigint,
           ethPos_0: bigint,
           ethNeg_0: bigint,
           usdtPos_0: bigint,
           usdtNeg_0: bigint): __compactRuntime.CircuitResults<PS, Uint8Array>;
  parentHash(context: __compactRuntime.CircuitContext<PS>,
             left_0: MstNode,
             right_0: MstNode): __compactRuntime.CircuitResults<PS, MstNode>;
  mstRootFromLeaves(context: __compactRuntime.CircuitContext<PS>,
                    userIds_0: Uint8Array[],
                    btcPos_0: bigint[],
                    btcNeg_0: bigint[],
                    ethPos_0: bigint[],
                    ethNeg_0: bigint[],
                    usdtPos_0: bigint[],
                    usdtNeg_0: bigint[]): __compactRuntime.CircuitResults<PS, MstNode>;
}

export type Ledger = {
}

export type ContractReferenceLocations = any;

export declare const contractReferenceLocations : ContractReferenceLocations;

export declare class Contract<PS = any, W extends Witnesses<PS> = Witnesses<PS>> {
  witnesses: W;
  circuits: Circuits<PS>;
  impureCircuits: ImpureCircuits<PS>;
  provableCircuits: ProvableCircuits<PS>;
  constructor(witnesses: W);
  initialState(context: __compactRuntime.ConstructorContext<PS>): __compactRuntime.ConstructorResult<PS>;
}

export declare function ledger(state: __compactRuntime.StateValue | __compactRuntime.ChargedState): Ledger;
export declare const pureCircuits: PureCircuits;
