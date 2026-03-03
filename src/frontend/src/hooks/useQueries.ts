import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import type { ExternalBlob } from "../backend";
import type { Candidate, MLA, Supporter } from "../backend.d";
import { useActor } from "./useActor";

// Re-export types for convenience
export type { MLA, Candidate, Supporter };

// ─── MLAs ────────────────────────────────────────────────────────────────────

export function useGetAllMLAs() {
  const { actor, isFetching } = useActor();
  return useQuery<MLA[]>({
    queryKey: ["mlas"],
    queryFn: async () => {
      if (!actor) return [];
      return actor.getAllMLAs();
    },
    enabled: !!actor && !isFetching,
  });
}

export function useAddMLA() {
  const { actor } = useActor();
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async ({
      name,
      constituency,
      bio,
      photo,
    }: {
      name: string;
      constituency: string;
      bio: string;
      photo: ExternalBlob;
    }) => {
      if (!actor) throw new Error("Actor not available");
      return actor.addMLA(name, constituency, bio, photo);
    },
    onSuccess: () => queryClient.invalidateQueries({ queryKey: ["mlas"] }),
  });
}

export function useUpdateMLA() {
  const { actor } = useActor();
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async ({
      id,
      name,
      constituency,
      bio,
      photo,
    }: {
      id: bigint;
      name: string;
      constituency: string;
      bio: string;
      photo: ExternalBlob;
    }) => {
      if (!actor) throw new Error("Actor not available");
      return actor.updateMLA(id, name, constituency, bio, photo);
    },
    onSuccess: () => queryClient.invalidateQueries({ queryKey: ["mlas"] }),
  });
}

export function useDeleteMLA() {
  const { actor } = useActor();
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async (id: bigint) => {
      if (!actor) throw new Error("Actor not available");
      return actor.deleteMLA(id);
    },
    onSuccess: () => queryClient.invalidateQueries({ queryKey: ["mlas"] }),
  });
}

// ─── Candidates ──────────────────────────────────────────────────────────────

export function useGetAllCandidates() {
  const { actor, isFetching } = useActor();
  return useQuery<Candidate[]>({
    queryKey: ["candidates"],
    queryFn: async () => {
      if (!actor) return [];
      return actor.getAllCandidates();
    },
    enabled: !!actor && !isFetching,
  });
}

export function useAddCandidate() {
  const { actor } = useActor();
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async ({
      name,
      constituency,
      bio,
      photo,
    }: {
      name: string;
      constituency: string;
      bio: string;
      photo: ExternalBlob;
    }) => {
      if (!actor) throw new Error("Actor not available");
      return actor.addCandidate(name, constituency, bio, photo);
    },
    onSuccess: () =>
      queryClient.invalidateQueries({ queryKey: ["candidates"] }),
  });
}

export function useUpdateCandidate() {
  const { actor } = useActor();
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async ({
      id,
      name,
      constituency,
      bio,
      photo,
    }: {
      id: bigint;
      name: string;
      constituency: string;
      bio: string;
      photo: ExternalBlob;
    }) => {
      if (!actor) throw new Error("Actor not available");
      return actor.updateCandidate(id, name, constituency, bio, photo);
    },
    onSuccess: () =>
      queryClient.invalidateQueries({ queryKey: ["candidates"] }),
  });
}

export function useDeleteCandidate() {
  const { actor } = useActor();
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async (id: bigint) => {
      if (!actor) throw new Error("Actor not available");
      return actor.deleteCandidate(id);
    },
    onSuccess: () =>
      queryClient.invalidateQueries({ queryKey: ["candidates"] }),
  });
}

// ─── Supporters ───────────────────────────────────────────────────────────────

export function useGetAllSupporters() {
  const { actor, isFetching } = useActor();
  return useQuery<Supporter[]>({
    queryKey: ["supporters"],
    queryFn: async () => {
      if (!actor) return [];
      return actor.getAllSupporters();
    },
    enabled: !!actor && !isFetching,
  });
}

export function useAddSupporter() {
  const { actor } = useActor();
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async ({
      name,
      phone,
      address,
      photo,
    }: {
      name: string;
      phone: string;
      address: string;
      photo: ExternalBlob;
    }) => {
      if (!actor) throw new Error("Actor not available");
      return actor.addSupporter(
        name,
        phone,
        address,
        photo,
        BigInt(Date.now()),
      );
    },
    onSuccess: () =>
      queryClient.invalidateQueries({ queryKey: ["supporters"] }),
  });
}

export function useDeleteSupporter() {
  const { actor } = useActor();
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async (id: bigint) => {
      if (!actor) throw new Error("Actor not available");
      return actor.deleteSupporter(id);
    },
    onSuccess: () =>
      queryClient.invalidateQueries({ queryKey: ["supporters"] }),
  });
}

// ─── Admin ────────────────────────────────────────────────────────────────────

export function useVerifyAdmin() {
  const { actor } = useActor();
  return useMutation({
    mutationFn: async ({
      username,
      password,
    }: {
      username: string;
      password: string;
    }) => {
      if (!actor) throw new Error("Actor not available");
      return actor.verifyAdmin(username, password);
    },
  });
}
