import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Skeleton } from "@/components/ui/skeleton";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Textarea } from "@/components/ui/textarea";
import {
  useAddCandidate,
  useAddMLA,
  useDeleteCandidate,
  useDeleteMLA,
  useDeleteSupporter,
  useGetAllCandidates,
  useGetAllMLAs,
  useGetAllSupporters,
  useUpdateCandidate,
  useUpdateMLA,
} from "@/hooks/useQueries";
import { useNavigate } from "@tanstack/react-router";
import {
  Award,
  Loader2,
  LogOut,
  MapPin,
  Pencil,
  Phone,
  Plus,
  Save,
  Trash2,
  Upload,
  User,
  UserCheck,
  Users,
  X,
} from "lucide-react";
import { motion } from "motion/react";
import { useEffect, useRef, useState } from "react";
import { toast } from "sonner";
import { ExternalBlob } from "../../backend";
import type { Candidate, MLA, Supporter } from "../../backend.d";

// ─── Types ────────────────────────────────────────────────────────────────────

type PersonType = "mla" | "candidate";

interface PersonForm {
  name: string;
  constituency: string;
  bio: string;
  photoFile: File | null;
  photoPreview: string | null;
  existingPhotoBlob: ExternalBlob | null;
}

const emptyForm = (): PersonForm => ({
  name: "",
  constituency: "",
  bio: "",
  photoFile: null,
  photoPreview: null,
  existingPhotoBlob: null,
});

// ─── Person Modal ─────────────────────────────────────────────────────────────

interface PersonModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  type: PersonType;
  editing: (MLA | Candidate) | null;
  onSave: (form: PersonForm) => Promise<void>;
  isSaving: boolean;
}

function PersonModal({
  open,
  onOpenChange,
  type,
  editing,
  onSave,
  isSaving,
}: PersonModalProps) {
  const [form, setForm] = useState<PersonForm>(emptyForm());
  const fileInputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (editing) {
      const photoUrl = editing.photo?.getDirectURL?.();
      setForm({
        name: editing.name,
        constituency: editing.constituency,
        bio: editing.bio,
        photoFile: null,
        photoPreview: photoUrl || null,
        existingPhotoBlob: editing.photo as ExternalBlob | null,
      });
    } else {
      setForm(emptyForm());
    }
  }, [editing]);

  const handlePhotoChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    setForm((prev) => ({ ...prev, photoFile: file }));
    const reader = new FileReader();
    reader.onloadend = () =>
      setForm((prev) => ({ ...prev, photoPreview: reader.result as string }));
    reader.readAsDataURL(file);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    await onSave(form);
  };

  const typeLabel = type === "mla" ? "MLA" : "Candidate";

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent
        data-ocid="admin.modal.dialog"
        className="max-w-lg max-h-[90vh] overflow-y-auto"
      >
        <DialogHeader>
          <DialogTitle className="font-display font-bold text-lg">
            {editing ? `Edit ${typeLabel}` : `Add New ${typeLabel}`}
          </DialogTitle>
        </DialogHeader>

        <form onSubmit={handleSubmit} className="space-y-4 py-2">
          {/* Name */}
          <div className="space-y-1.5">
            <Label className="font-body text-sm font-semibold">
              Full Name <span className="text-destructive">*</span>
            </Label>
            <Input
              placeholder={`${typeLabel} full name`}
              value={form.name}
              onChange={(e) => setForm((p) => ({ ...p, name: e.target.value }))}
              required
              className="font-body"
            />
          </div>

          {/* Constituency */}
          <div className="space-y-1.5">
            <Label className="font-body text-sm font-semibold">
              Constituency <span className="text-destructive">*</span>
            </Label>
            <Input
              placeholder="e.g., North Rajpur"
              value={form.constituency}
              onChange={(e) =>
                setForm((p) => ({ ...p, constituency: e.target.value }))
              }
              required
              className="font-body"
            />
          </div>

          {/* Bio */}
          <div className="space-y-1.5">
            <Label className="font-body text-sm font-semibold">
              Biography <span className="text-destructive">*</span>
            </Label>
            <Textarea
              placeholder="Brief biography and achievements..."
              value={form.bio}
              onChange={(e) => setForm((p) => ({ ...p, bio: e.target.value }))}
              required
              rows={3}
              className="font-body resize-none"
            />
          </div>

          {/* Photo */}
          <div className="space-y-1.5">
            <Label className="font-body text-sm font-semibold">Photo</Label>
            <input
              ref={fileInputRef}
              type="file"
              accept="image/*"
              onChange={handlePhotoChange}
              className="hidden"
              id="modal-photo-upload"
            />
            {form.photoPreview ? (
              <div className="flex items-center gap-3">
                <div className="relative w-16 h-16 rounded-lg overflow-hidden border border-border">
                  <img
                    src={form.photoPreview}
                    alt="Preview"
                    className="w-full h-full object-cover"
                  />
                </div>
                <Button
                  type="button"
                  variant="outline"
                  size="sm"
                  onClick={() => {
                    setForm((p) => ({
                      ...p,
                      photoFile: null,
                      photoPreview: null,
                      existingPhotoBlob: null,
                    }));
                    if (fileInputRef.current) fileInputRef.current.value = "";
                  }}
                  className="font-body"
                >
                  <X className="w-3.5 h-3.5 mr-1" />
                  Remove
                </Button>
              </div>
            ) : (
              <label
                htmlFor="modal-photo-upload"
                className="flex items-center gap-2 px-4 py-3 border-2 border-dashed border-border rounded-lg cursor-pointer hover:border-primary hover:bg-secondary/30 transition-all"
              >
                <Upload className="w-4 h-4 text-muted-foreground" />
                <span className="text-sm font-body text-muted-foreground">
                  Click to upload photo
                </span>
              </label>
            )}
          </div>

          <DialogFooter className="pt-2 gap-2">
            <Button
              type="button"
              variant="outline"
              data-ocid="admin.modal.cancel_button"
              onClick={() => onOpenChange(false)}
              className="font-body"
            >
              Cancel
            </Button>
            <Button
              type="submit"
              data-ocid="admin.modal.save_button"
              disabled={isSaving}
              className="bg-primary text-primary-foreground font-display font-bold"
            >
              {isSaving ? (
                <>
                  <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                  Saving...
                </>
              ) : (
                <>
                  <Save className="w-4 h-4 mr-2" />
                  {editing ? "Save Changes" : `Add ${typeLabel}`}
                </>
              )}
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}

// ─── Delete Confirm ───────────────────────────────────────────────────────────

interface DeleteConfirmProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  name: string;
  onConfirm: () => void;
  isDeleting: boolean;
}

function DeleteConfirm({
  open,
  onOpenChange,
  name,
  onConfirm,
  isDeleting,
}: DeleteConfirmProps) {
  return (
    <AlertDialog open={open} onOpenChange={onOpenChange}>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle className="font-display font-bold">
            Confirm Delete
          </AlertDialogTitle>
          <AlertDialogDescription className="font-body">
            Are you sure you want to delete <strong>{name}</strong>? This action
            cannot be undone.
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel className="font-body">Cancel</AlertDialogCancel>
          <AlertDialogAction
            onClick={onConfirm}
            disabled={isDeleting}
            className="bg-destructive text-destructive-foreground hover:bg-destructive/90 font-body"
          >
            {isDeleting ? (
              <Loader2 className="w-4 h-4 animate-spin" />
            ) : (
              "Delete"
            )}
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
}

// ─── MLA Admin Tab ────────────────────────────────────────────────────────────

function MLATab() {
  const { data: mlas, isLoading } = useGetAllMLAs();
  const addMLA = useAddMLA();
  const updateMLA = useUpdateMLA();
  const deleteMLA = useDeleteMLA();

  const [modalOpen, setModalOpen] = useState(false);
  const [editingMLA, setEditingMLA] = useState<MLA | null>(null);
  const [deleteTarget, setDeleteTarget] = useState<MLA | null>(null);

  const getOrUploadPhoto = async (form: PersonForm): Promise<ExternalBlob> => {
    if (form.photoFile) {
      const bytes = new Uint8Array(await form.photoFile.arrayBuffer());
      return ExternalBlob.fromBytes(bytes);
    }
    if (form.existingPhotoBlob) return form.existingPhotoBlob;
    return ExternalBlob.fromBytes(new Uint8Array(0));
  };

  const handleSave = async (form: PersonForm) => {
    try {
      const photo = await getOrUploadPhoto(form);
      if (editingMLA) {
        await updateMLA.mutateAsync({
          id: editingMLA.id,
          name: form.name,
          constituency: form.constituency,
          bio: form.bio,
          photo,
        });
        toast.success("MLA updated successfully.");
      } else {
        await addMLA.mutateAsync({
          name: form.name,
          constituency: form.constituency,
          bio: form.bio,
          photo,
        });
        toast.success("MLA added successfully.");
      }
      setModalOpen(false);
      setEditingMLA(null);
    } catch {
      toast.error("Failed to save MLA.");
    }
  };

  const handleDelete = async () => {
    if (!deleteTarget) return;
    try {
      await deleteMLA.mutateAsync(deleteTarget.id);
      toast.success("MLA deleted.");
      setDeleteTarget(null);
    } catch {
      toast.error("Failed to delete MLA.");
    }
  };

  const isSaving = addMLA.isPending || updateMLA.isPending;

  return (
    <div>
      <div className="flex items-center justify-between mb-4">
        <p className="text-sm text-muted-foreground font-body">
          {isLoading ? "Loading..." : `${mlas?.length ?? 0} MLA(s)`}
        </p>
        <Button
          data-ocid="admin.add_mla.button"
          onClick={() => {
            setEditingMLA(null);
            setModalOpen(true);
          }}
          className="bg-primary text-primary-foreground font-display font-bold"
          size="sm"
        >
          <Plus className="w-4 h-4 mr-1.5" />
          Add MLA
        </Button>
      </div>

      {isLoading ? (
        <div className="space-y-3">
          {[1, 2, 3].map((i) => (
            <Skeleton key={i} className="h-16 w-full rounded-lg" />
          ))}
        </div>
      ) : mlas && mlas.length > 0 ? (
        <div className="space-y-3">
          {mlas.map((mla, i) => {
            const photoUrl = mla.photo?.getDirectURL?.();
            return (
              <div
                key={String(mla.id)}
                className="flex items-center gap-3 bg-card border border-border rounded-lg p-3"
              >
                <div className="w-10 h-10 rounded-full bg-secondary overflow-hidden flex-shrink-0">
                  {photoUrl ? (
                    <img
                      src={photoUrl}
                      alt={mla.name}
                      className="w-full h-full object-cover"
                    />
                  ) : (
                    <div className="w-full h-full flex items-center justify-center">
                      <User className="w-5 h-5 text-muted-foreground" />
                    </div>
                  )}
                </div>
                <div className="flex-1 min-w-0">
                  <p className="font-body font-semibold text-sm text-foreground truncate">
                    {mla.name}
                  </p>
                  <p className="text-xs text-muted-foreground flex items-center gap-1">
                    <MapPin className="w-3 h-3" />
                    {mla.constituency}
                  </p>
                </div>
                <div className="flex items-center gap-1.5 flex-shrink-0">
                  <Button
                    size="sm"
                    variant="outline"
                    data-ocid={`admin.mla.edit_button.${i + 1}`}
                    onClick={() => {
                      setEditingMLA(mla);
                      setModalOpen(true);
                    }}
                    className="h-7 px-2 font-body"
                  >
                    <Pencil className="w-3.5 h-3.5" />
                  </Button>
                  <Button
                    size="sm"
                    variant="outline"
                    data-ocid={`admin.mla.delete_button.${i + 1}`}
                    onClick={() => setDeleteTarget(mla)}
                    className="h-7 px-2 text-destructive border-destructive/30 hover:bg-destructive/10 font-body"
                  >
                    <Trash2 className="w-3.5 h-3.5" />
                  </Button>
                </div>
              </div>
            );
          })}
        </div>
      ) : (
        <div className="text-center py-12 text-muted-foreground">
          <Award className="w-8 h-8 mx-auto mb-3 opacity-40" />
          <p className="font-body text-sm">No MLAs yet. Add your first MLA.</p>
        </div>
      )}

      <PersonModal
        open={modalOpen}
        onOpenChange={setModalOpen}
        type="mla"
        editing={editingMLA}
        onSave={handleSave}
        isSaving={isSaving}
      />

      <DeleteConfirm
        open={!!deleteTarget}
        onOpenChange={(o) => !o && setDeleteTarget(null)}
        name={deleteTarget?.name ?? ""}
        onConfirm={handleDelete}
        isDeleting={deleteMLA.isPending}
      />
    </div>
  );
}

// ─── Candidates Admin Tab ─────────────────────────────────────────────────────

function CandidatesTab() {
  const { data: candidates, isLoading } = useGetAllCandidates();
  const addCandidate = useAddCandidate();
  const updateCandidate = useUpdateCandidate();
  const deleteCandidate = useDeleteCandidate();

  const [modalOpen, setModalOpen] = useState(false);
  const [editingCandidate, setEditingCandidate] = useState<Candidate | null>(
    null,
  );
  const [deleteTarget, setDeleteTarget] = useState<Candidate | null>(null);

  const getOrUploadPhoto = async (form: PersonForm): Promise<ExternalBlob> => {
    if (form.photoFile) {
      const bytes = new Uint8Array(await form.photoFile.arrayBuffer());
      return ExternalBlob.fromBytes(bytes);
    }
    if (form.existingPhotoBlob) return form.existingPhotoBlob;
    return ExternalBlob.fromBytes(new Uint8Array(0));
  };

  const handleSave = async (form: PersonForm) => {
    try {
      const photo = await getOrUploadPhoto(form);
      if (editingCandidate) {
        await updateCandidate.mutateAsync({
          id: editingCandidate.id,
          name: form.name,
          constituency: form.constituency,
          bio: form.bio,
          photo,
        });
        toast.success("Candidate updated successfully.");
      } else {
        await addCandidate.mutateAsync({
          name: form.name,
          constituency: form.constituency,
          bio: form.bio,
          photo,
        });
        toast.success("Candidate added successfully.");
      }
      setModalOpen(false);
      setEditingCandidate(null);
    } catch {
      toast.error("Failed to save candidate.");
    }
  };

  const handleDelete = async () => {
    if (!deleteTarget) return;
    try {
      await deleteCandidate.mutateAsync(deleteTarget.id);
      toast.success("Candidate deleted.");
      setDeleteTarget(null);
    } catch {
      toast.error("Failed to delete candidate.");
    }
  };

  const isSaving = addCandidate.isPending || updateCandidate.isPending;

  return (
    <div>
      <div className="flex items-center justify-between mb-4">
        <p className="text-sm text-muted-foreground font-body">
          {isLoading ? "Loading..." : `${candidates?.length ?? 0} candidate(s)`}
        </p>
        <Button
          data-ocid="admin.add_candidate.button"
          onClick={() => {
            setEditingCandidate(null);
            setModalOpen(true);
          }}
          className="bg-accent text-accent-foreground font-display font-bold"
          size="sm"
        >
          <Plus className="w-4 h-4 mr-1.5" />
          Add Candidate
        </Button>
      </div>

      {isLoading ? (
        <div className="space-y-3">
          {[1, 2, 3].map((i) => (
            <Skeleton key={i} className="h-16 w-full rounded-lg" />
          ))}
        </div>
      ) : candidates && candidates.length > 0 ? (
        <div className="space-y-3">
          {candidates.map((candidate, i) => {
            const photoUrl = candidate.photo?.getDirectURL?.();
            return (
              <div
                key={String(candidate.id)}
                className="flex items-center gap-3 bg-card border border-border rounded-lg p-3"
              >
                <div className="w-10 h-10 rounded-full bg-secondary overflow-hidden flex-shrink-0">
                  {photoUrl ? (
                    <img
                      src={photoUrl}
                      alt={candidate.name}
                      className="w-full h-full object-cover"
                    />
                  ) : (
                    <div className="w-full h-full flex items-center justify-center">
                      <User className="w-5 h-5 text-muted-foreground" />
                    </div>
                  )}
                </div>
                <div className="flex-1 min-w-0">
                  <p className="font-body font-semibold text-sm text-foreground truncate">
                    {candidate.name}
                  </p>
                  <p className="text-xs text-muted-foreground flex items-center gap-1">
                    <MapPin className="w-3 h-3" />
                    {candidate.constituency}
                  </p>
                </div>
                <div className="flex items-center gap-1.5 flex-shrink-0">
                  <Button
                    size="sm"
                    variant="outline"
                    data-ocid={`admin.candidate.edit_button.${i + 1}`}
                    onClick={() => {
                      setEditingCandidate(candidate);
                      setModalOpen(true);
                    }}
                    className="h-7 px-2 font-body"
                  >
                    <Pencil className="w-3.5 h-3.5" />
                  </Button>
                  <Button
                    size="sm"
                    variant="outline"
                    data-ocid={`admin.candidate.delete_button.${i + 1}`}
                    onClick={() => setDeleteTarget(candidate)}
                    className="h-7 px-2 text-destructive border-destructive/30 hover:bg-destructive/10 font-body"
                  >
                    <Trash2 className="w-3.5 h-3.5" />
                  </Button>
                </div>
              </div>
            );
          })}
        </div>
      ) : (
        <div className="text-center py-12 text-muted-foreground">
          <UserCheck className="w-8 h-8 mx-auto mb-3 opacity-40" />
          <p className="font-body text-sm">
            No candidates yet. Add your first candidate.
          </p>
        </div>
      )}

      <PersonModal
        open={modalOpen}
        onOpenChange={setModalOpen}
        type="candidate"
        editing={editingCandidate}
        onSave={handleSave}
        isSaving={isSaving}
      />

      <DeleteConfirm
        open={!!deleteTarget}
        onOpenChange={(o) => !o && setDeleteTarget(null)}
        name={deleteTarget?.name ?? ""}
        onConfirm={handleDelete}
        isDeleting={deleteCandidate.isPending}
      />
    </div>
  );
}

// ─── Supporters Admin Tab ─────────────────────────────────────────────────────

function SupportersTab() {
  const { data: supporters, isLoading } = useGetAllSupporters();
  const deleteSupporter = useDeleteSupporter();
  const [deleteTarget, setDeleteTarget] = useState<Supporter | null>(null);

  const handleDelete = async () => {
    if (!deleteTarget) return;
    try {
      await deleteSupporter.mutateAsync(deleteTarget.id);
      toast.success("Supporter removed.");
      setDeleteTarget(null);
    } catch {
      toast.error("Failed to remove supporter.");
    }
  };

  return (
    <div>
      <div className="flex items-center justify-between mb-4">
        <p className="text-sm text-muted-foreground font-body">
          {isLoading ? "Loading..." : `${supporters?.length ?? 0} supporter(s)`}
        </p>
      </div>

      {isLoading ? (
        <div className="space-y-3">
          {[1, 2, 3].map((i) => (
            <Skeleton key={i} className="h-16 w-full rounded-lg" />
          ))}
        </div>
      ) : supporters && supporters.length > 0 ? (
        <div className="space-y-3">
          {supporters.map((supporter, i) => {
            const photoUrl = supporter.photo?.getDirectURL?.();
            const joinedDate = supporter.joinedAt
              ? new Date(Number(supporter.joinedAt)).toLocaleDateString(
                  "en-IN",
                  {
                    year: "numeric",
                    month: "short",
                    day: "numeric",
                  },
                )
              : null;
            return (
              <div
                key={String(supporter.id)}
                className="flex items-center gap-3 bg-card border border-border rounded-lg p-3"
              >
                <div className="w-10 h-10 rounded-full bg-secondary overflow-hidden flex-shrink-0">
                  {photoUrl ? (
                    <img
                      src={photoUrl}
                      alt={supporter.name}
                      className="w-full h-full object-cover"
                    />
                  ) : (
                    <div className="w-full h-full flex items-center justify-center">
                      <User className="w-5 h-5 text-muted-foreground" />
                    </div>
                  )}
                </div>
                <div className="flex-1 min-w-0">
                  <p className="font-body font-semibold text-sm text-foreground truncate">
                    {supporter.name}
                  </p>
                  <div className="flex items-center gap-3 text-xs text-muted-foreground">
                    {supporter.phone && (
                      <span className="flex items-center gap-1">
                        <Phone className="w-3 h-3" />
                        {supporter.phone}
                      </span>
                    )}
                    {joinedDate && <span>Joined {joinedDate}</span>}
                  </div>
                </div>
                <Button
                  size="sm"
                  variant="outline"
                  data-ocid={`admin.supporter.delete_button.${i + 1}`}
                  onClick={() => setDeleteTarget(supporter)}
                  className="h-7 px-2 text-destructive border-destructive/30 hover:bg-destructive/10 font-body flex-shrink-0"
                >
                  <Trash2 className="w-3.5 h-3.5" />
                </Button>
              </div>
            );
          })}
        </div>
      ) : (
        <div className="text-center py-12 text-muted-foreground">
          <Users className="w-8 h-8 mx-auto mb-3 opacity-40" />
          <p className="font-body text-sm">No supporters yet.</p>
        </div>
      )}

      <DeleteConfirm
        open={!!deleteTarget}
        onOpenChange={(o) => !o && setDeleteTarget(null)}
        name={deleteTarget?.name ?? ""}
        onConfirm={handleDelete}
        isDeleting={deleteSupporter.isPending}
      />
    </div>
  );
}

// ─── Dashboard ─────────────────────────────────────────────────────────────────

export function AdminDashboard() {
  const navigate = useNavigate();

  useEffect(() => {
    const isAdmin = localStorage.getItem("isAdmin");
    if (!isAdmin) {
      navigate({ to: "/admin" });
    }
  }, [navigate]);

  const handleLogout = () => {
    localStorage.removeItem("isAdmin");
    toast.success("Logged out successfully.");
    navigate({ to: "/admin" });
  };

  return (
    <main className="min-h-screen bg-background">
      {/* Dashboard Header */}
      <div className="bg-card border-b border-border py-5">
        <div className="container mx-auto px-4 md:px-6 flex items-center justify-between">
          <div>
            <h1 className="font-display font-black text-2xl text-foreground">
              Admin Dashboard
            </h1>
            <p className="text-sm text-muted-foreground font-body mt-0.5">
              Manage MLAs, Candidates, and Supporters
            </p>
          </div>
          <Button
            data-ocid="admin.logout.button"
            variant="outline"
            onClick={handleLogout}
            className="font-body text-sm gap-2"
          >
            <LogOut className="w-4 h-4" />
            Logout
          </Button>
        </div>
      </div>

      {/* Tabs */}
      <div className="container mx-auto px-4 md:px-6 py-8">
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4 }}
        >
          <Tabs defaultValue="mlas">
            <TabsList className="mb-6 bg-secondary">
              <TabsTrigger
                value="mlas"
                data-ocid="admin.mlas.tab"
                className="font-body font-semibold data-[state=active]:bg-primary data-[state=active]:text-primary-foreground gap-2"
              >
                <Award className="w-4 h-4" />
                MLAs
              </TabsTrigger>
              <TabsTrigger
                value="candidates"
                data-ocid="admin.candidates.tab"
                className="font-body font-semibold data-[state=active]:bg-accent data-[state=active]:text-accent-foreground gap-2"
              >
                <UserCheck className="w-4 h-4" />
                Candidates
              </TabsTrigger>
              <TabsTrigger
                value="supporters"
                data-ocid="admin.supporters.tab"
                className="font-body font-semibold data-[state=active]:bg-navy-700 data-[state=active]:text-white gap-2"
              >
                <Users className="w-4 h-4" />
                Supporters
              </TabsTrigger>
            </TabsList>

            <div className="bg-card rounded-lg border border-border p-5">
              <TabsContent value="mlas">
                <MLATab />
              </TabsContent>
              <TabsContent value="candidates">
                <CandidatesTab />
              </TabsContent>
              <TabsContent value="supporters">
                <SupportersTab />
              </TabsContent>
            </div>
          </Tabs>
        </motion.div>
      </div>
    </main>
  );
}
