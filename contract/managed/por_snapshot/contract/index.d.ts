import type * as __compactRuntime from '@midnight-ntwrk/compact-runtime';

export type Witnesses<PS> = {
  getSchnorrReduction(context: __compactRuntime.WitnessContext<Ledger, PS>,
                      challengeHash_0: bigint): [PS, [bigint, bigint]];
  callerSecretKey(context: __compactRuntime.WitnessContext<Ledger, PS>): [PS, Uint8Array];
}

export type ImpureCircuits<PS> = {
  publishSnapshot(context: __compactRuntime.CircuitContext<PS>,
                  sid_0: Uint8Array,
                  rref_0: Uint8Array,
                  root_0: { field: bigint },
                  signature_0: { announcement: __compactRuntime.JubjubPoint,
                                 response: bigint
                               }): __compactRuntime.CircuitResults<PS, []>;
  attestInclusion(context: __compactRuntime.CircuitContext<PS>,
                  path_0: { leaf: Uint8Array,
                            path: { sibling: { field: bigint },
                                    goes_left: boolean
                                  }[]
                          }): __compactRuntime.CircuitResults<PS, []>;
}

export type ProvableCircuits<PS> = {
  publishSnapshot(context: __compactRuntime.CircuitContext<PS>,
                  sid_0: Uint8Array,
                  rref_0: Uint8Array,
                  root_0: { field: bigint },
                  signature_0: { announcement: __compactRuntime.JubjubPoint,
                                 response: bigint
                               }): __compactRuntime.CircuitResults<PS, []>;
  attestInclusion(context: __compactRuntime.CircuitContext<PS>,
                  path_0: { leaf: Uint8Array,
                            path: { sibling: { field: bigint },
                                    goes_left: boolean
                                  }[]
                          }): __compactRuntime.CircuitResults<PS, []>;
}

export type PureCircuits = {
  derivePublicKey(sk_0: Uint8Array): Uint8Array;
  encodeSnapshotMessage(sid_0: Uint8Array,
                        rref_0: Uint8Array,
                        root_0: { field: bigint }): bigint[];
  schnorrChallenge(ann_x_0: bigint,
                   ann_y_0: bigint,
                   pk_x_0: bigint,
                   pk_y_0: bigint,
                   msg_0: bigint[]): bigint;
}

export type Circuits<PS> = {
  derivePublicKey(context: __compactRuntime.CircuitContext<PS>, sk_0: Uint8Array): __compactRuntime.CircuitResults<PS, Uint8Array>;
  encodeSnapshotMessage(context: __compactRuntime.CircuitContext<PS>,
                        sid_0: Uint8Array,
                        rref_0: Uint8Array,
                        root_0: { field: bigint }): __compactRuntime.CircuitResults<PS, bigint[]>;
  schnorrChallenge(context: __compactRuntime.CircuitContext<PS>,
                   ann_x_0: bigint,
                   ann_y_0: bigint,
                   pk_x_0: bigint,
                   pk_y_0: bigint,
                   msg_0: bigint[]): __compactRuntime.CircuitResults<PS, bigint>;
  publishSnapshot(context: __compactRuntime.CircuitContext<PS>,
                  sid_0: Uint8Array,
                  rref_0: Uint8Array,
                  root_0: { field: bigint },
                  signature_0: { announcement: __compactRuntime.JubjubPoint,
                                 response: bigint
                               }): __compactRuntime.CircuitResults<PS, []>;
  attestInclusion(context: __compactRuntime.CircuitContext<PS>,
                  path_0: { leaf: Uint8Array,
                            path: { sibling: { field: bigint },
                                    goes_left: boolean
                                  }[]
                          }): __compactRuntime.CircuitResults<PS, []>;
}

export type Ledger = {
  readonly publisherPk: __compactRuntime.JubjubPoint;
  readonly snapshotId: Uint8Array;
  readonly reportRef: Uint8Array;
  readonly merkleRoot: { field: bigint };
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
               pk_0: __compactRuntime.JubjubPoint): __compactRuntime.ConstructorResult<PS>;
}

export declare function ledger(state: __compactRuntime.StateValue | __compactRuntime.ChargedState): Ledger;
export declare const pureCircuits: PureCircuits;
