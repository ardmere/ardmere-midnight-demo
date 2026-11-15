import type * as __compactRuntime from '@midnight-ntwrk/compact-runtime';

export type Witnesses<PS> = {
  batchUserIds(context: __compactRuntime.WitnessContext<Ledger, PS>): [PS, Uint8Array[]];
  batchBtcPos(context: __compactRuntime.WitnessContext<Ledger, PS>): [PS, bigint[]];
  batchBtcNeg(context: __compactRuntime.WitnessContext<Ledger, PS>): [PS, bigint[]];
  batchEthPos(context: __compactRuntime.WitnessContext<Ledger, PS>): [PS, bigint[]];
  batchEthNeg(context: __compactRuntime.WitnessContext<Ledger, PS>): [PS, bigint[]];
  batchUsdtPos(context: __compactRuntime.WitnessContext<Ledger, PS>): [PS, bigint[]];
  batchUsdtNeg(context: __compactRuntime.WitnessContext<Ledger, PS>): [PS, bigint[]];
}

export type ImpureCircuits<PS> = {
  submitSnapshot(context: __compactRuntime.CircuitContext<PS>,
                 seq_0: bigint,
                 ts_0: bigint,
                 priceBtcArg_0: bigint,
                 priceEthArg_0: bigint,
                 priceUsdtArg_0: bigint,
                 declaredReservesBtcArg_0: bigint,
                 declaredReservesEthArg_0: bigint,
                 declaredReservesUsdtArg_0: bigint,
                 rootHash_0: Uint8Array): __compactRuntime.CircuitResults<PS, []>;
}

export type ProvableCircuits<PS> = {
  submitSnapshot(context: __compactRuntime.CircuitContext<PS>,
                 seq_0: bigint,
                 ts_0: bigint,
                 priceBtcArg_0: bigint,
                 priceEthArg_0: bigint,
                 priceUsdtArg_0: bigint,
                 declaredReservesBtcArg_0: bigint,
                 declaredReservesEthArg_0: bigint,
                 declaredReservesUsdtArg_0: bigint,
                 rootHash_0: Uint8Array): __compactRuntime.CircuitResults<PS, []>;
}

export type PureCircuits = {
}

export type Circuits<PS> = {
  submitSnapshot(context: __compactRuntime.CircuitContext<PS>,
                 seq_0: bigint,
                 ts_0: bigint,
                 priceBtcArg_0: bigint,
                 priceEthArg_0: bigint,
                 priceUsdtArg_0: bigint,
                 declaredReservesBtcArg_0: bigint,
                 declaredReservesEthArg_0: bigint,
                 declaredReservesUsdtArg_0: bigint,
                 rootHash_0: Uint8Array): __compactRuntime.CircuitResults<PS, []>;
}

export type Ledger = {
  readonly authorityPk: Uint8Array;
  readonly snapshotSeq: bigint;
  readonly timestamp: bigint;
  readonly mstRoot: Uint8Array;
  readonly priceBtc: bigint;
  readonly priceEth: bigint;
  readonly priceUsdt: bigint;
  readonly declaredReservesBtc: bigint;
  readonly declaredReservesEth: bigint;
  readonly declaredReservesUsdt: bigint;
  readonly liabilitiesBtcPos: bigint;
  readonly liabilitiesBtcNeg: bigint;
  readonly liabilitiesEthPos: bigint;
  readonly liabilitiesEthNeg: bigint;
  readonly liabilitiesUsdtPos: bigint;
  readonly liabilitiesUsdtNeg: bigint;
  readonly published: boolean;
}

export type ContractReferenceLocations = any;

export declare const contractReferenceLocations : ContractReferenceLocations;

export declare class Contract<PS = any, W extends Witnesses<PS> = Witnesses<PS>> {
  witnesses: W;
  circuits: Circuits<PS>;
  impureCircuits: ImpureCircuits<PS>;
  provableCircuits: ProvableCircuits<PS>;
  constructor(witnesses: W);
  initialState(context: __compactRuntime.ConstructorContext<PS>,
               pk_0: Uint8Array): __compactRuntime.ConstructorResult<PS>;
}

export declare function ledger(state: __compactRuntime.StateValue | __compactRuntime.ChargedState): Ledger;
export declare const pureCircuits: PureCircuits;
