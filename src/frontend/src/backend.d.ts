import type { Principal } from "@icp-sdk/core/principal";
export interface Some<T> {
    __kind__: "Some";
    value: T;
}
export interface None {
    __kind__: "None";
}
export type Option<T> = Some<T> | None;
export class ExternalBlob {
    getBytes(): Promise<Uint8Array<ArrayBuffer>>;
    getDirectURL(): string;
    static fromURL(url: string): ExternalBlob;
    static fromBytes(blob: Uint8Array<ArrayBuffer>): ExternalBlob;
    withUploadProgress(onProgress: (percentage: number) => void): ExternalBlob;
}
export interface Candidate {
    id: bigint;
    bio: string;
    name: string;
    constituency: string;
    photo: ExternalBlob;
}
export interface MLA {
    id: bigint;
    bio: string;
    name: string;
    constituency: string;
    photo: ExternalBlob;
}
export interface Supporter {
    id: bigint;
    name: string;
    joinedAt: bigint;
    address: string;
    phone: string;
    photo: ExternalBlob;
}
export interface backendInterface {
    addCandidate(name: string, constituency: string, bio: string, photo: ExternalBlob): Promise<bigint>;
    addMLA(name: string, constituency: string, bio: string, photo: ExternalBlob): Promise<bigint>;
    addSupporter(name: string, phone: string, address: string, photo: ExternalBlob, joinedAt: bigint): Promise<bigint>;
    deleteCandidate(id: bigint): Promise<void>;
    deleteMLA(id: bigint): Promise<void>;
    deleteSupporter(id: bigint): Promise<void>;
    getAllCandidates(): Promise<Array<Candidate>>;
    getAllMLAs(): Promise<Array<MLA>>;
    getAllSupporters(): Promise<Array<Supporter>>;
    getCandidate(id: bigint): Promise<Candidate>;
    getMLA(id: bigint): Promise<MLA>;
    getSupporter(id: bigint): Promise<Supporter>;
    updateCandidate(id: bigint, name: string, constituency: string, bio: string, photo: ExternalBlob): Promise<void>;
    updateMLA(id: bigint, name: string, constituency: string, bio: string, photo: ExternalBlob): Promise<void>;
    verifyAdmin(username: string, password: string): Promise<boolean>;
}
