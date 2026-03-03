import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { useAddSupporter } from "@/hooks/useQueries";
import { CheckCircle2, Heart, Loader2, Upload, User, X } from "lucide-react";
import { AnimatePresence, motion } from "motion/react";
import { useRef, useState } from "react";
import { toast } from "sonner";
import { ExternalBlob } from "../backend";

export function JoinPage() {
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [address, setAddress] = useState("");
  const [photoFile, setPhotoFile] = useState<File | null>(null);
  const [photoPreview, setPhotoPreview] = useState<string | null>(null);
  const [submitted, setSubmitted] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const addSupporter = useAddSupporter();

  const handlePhotoChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    setPhotoFile(file);
    const reader = new FileReader();
    reader.onloadend = () => setPhotoPreview(reader.result as string);
    reader.readAsDataURL(file);
  };

  const handleRemovePhoto = () => {
    setPhotoFile(null);
    setPhotoPreview(null);
    if (fileInputRef.current) fileInputRef.current.value = "";
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!name.trim() || !phone.trim() || !address.trim()) {
      toast.error("Please fill in all required fields.");
      return;
    }

    try {
      let photo: ExternalBlob;
      if (photoFile) {
        const bytes = new Uint8Array(await photoFile.arrayBuffer());
        photo = ExternalBlob.fromBytes(bytes);
      } else {
        photo = ExternalBlob.fromBytes(new Uint8Array(0));
      }

      await addSupporter.mutateAsync({ name, phone, address, photo });
      setSubmitted(true);
      toast.success("Welcome to BOROLA Party!");
    } catch {
      toast.error("Failed to join. Please try again.");
    }
  };

  const handleReset = () => {
    setName("");
    setPhone("");
    setAddress("");
    setPhotoFile(null);
    setPhotoPreview(null);
    setSubmitted(false);
    if (fileInputRef.current) fileInputRef.current.value = "";
  };

  return (
    <main className="min-h-screen bg-background">
      {/* Page Header */}
      <div className="party-gradient py-14 md:py-20 relative overflow-hidden">
        <div className="absolute top-0 left-0 right-0 h-1 saffron-gradient" />
        <div className="absolute inset-0 opacity-5">
          <div
            className="absolute inset-0"
            style={{
              backgroundImage:
                "repeating-linear-gradient(45deg, white 0, white 1px, transparent 0, transparent 50%)",
              backgroundSize: "24px 24px",
            }}
          />
        </div>
        <div className="relative container mx-auto px-4 md:px-6 text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            <div className="flex items-center justify-center gap-2 mb-3">
              <Heart className="w-5 h-5 text-accent fill-accent" />
              <span className="text-accent font-body text-sm font-semibold uppercase tracking-wider">
                Become a Member
              </span>
            </div>
            <h1 className="font-display font-black text-4xl md:text-5xl text-white mb-3">
              Join BOROLA Party
            </h1>
            <p className="text-white/70 font-body text-lg max-w-xl mx-auto">
              Be part of the movement. Register as a supporter and stand with us
              in building a better future for our communities.
            </p>
          </motion.div>
        </div>
      </div>

      {/* Form Section */}
      <div className="container mx-auto px-4 md:px-6 py-14">
        <div className="max-w-xl mx-auto">
          <AnimatePresence mode="wait">
            {submitted ? (
              <motion.div
                key="success"
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.95 }}
                transition={{ duration: 0.4 }}
                data-ocid="join.success_state"
                className="text-center bg-card rounded-xl border border-border shadow-party p-10"
              >
                <motion.div
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  transition={{ delay: 0.15, type: "spring", stiffness: 200 }}
                  className="w-20 h-20 rounded-full bg-accent/10 flex items-center justify-center mx-auto mb-5"
                >
                  <CheckCircle2 className="w-10 h-10 text-accent" />
                </motion.div>
                <h2 className="font-display font-black text-2xl text-foreground mb-2">
                  Welcome to BOROLA Party!
                </h2>
                <p className="text-muted-foreground font-body mb-6">
                  Thank you, <strong>{name}</strong>! You've successfully joined
                  the BOROLA Party. We're proud to have you on our side.
                </p>
                <Button
                  onClick={handleReset}
                  className="bg-primary text-primary-foreground font-display font-bold"
                >
                  Register Another Member
                </Button>
              </motion.div>
            ) : (
              <motion.div
                key="form"
                initial={{ opacity: 0, y: 24 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -24 }}
                transition={{ duration: 0.4 }}
                className="bg-card rounded-xl border border-border shadow-party p-6 md:p-8"
              >
                <h2 className="font-display font-bold text-xl text-foreground mb-6">
                  Supporter Registration Form
                </h2>
                <form onSubmit={handleSubmit} className="space-y-5">
                  {/* Name */}
                  <div className="space-y-1.5">
                    <Label
                      htmlFor="name"
                      className="font-body font-semibold text-sm"
                    >
                      Full Name <span className="text-destructive">*</span>
                    </Label>
                    <Input
                      id="name"
                      data-ocid="join.name.input"
                      placeholder="e.g., Rajendra Singh"
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                      required
                      className="font-body"
                    />
                  </div>

                  {/* Phone */}
                  <div className="space-y-1.5">
                    <Label
                      htmlFor="phone"
                      className="font-body font-semibold text-sm"
                    >
                      Phone Number <span className="text-destructive">*</span>
                    </Label>
                    <Input
                      id="phone"
                      data-ocid="join.phone.input"
                      type="tel"
                      placeholder="e.g., +91 98765 43210"
                      value={phone}
                      onChange={(e) => setPhone(e.target.value)}
                      required
                      className="font-body"
                    />
                  </div>

                  {/* Address */}
                  <div className="space-y-1.5">
                    <Label
                      htmlFor="address"
                      className="font-body font-semibold text-sm"
                    >
                      Address <span className="text-destructive">*</span>
                    </Label>
                    <Textarea
                      id="address"
                      data-ocid="join.address.input"
                      placeholder="Enter your full address including city, district, and state"
                      value={address}
                      onChange={(e) => setAddress(e.target.value)}
                      required
                      rows={3}
                      className="font-body resize-none"
                    />
                  </div>

                  {/* Photo */}
                  <div className="space-y-1.5">
                    <Label className="font-body font-semibold text-sm">
                      Profile Photo{" "}
                      <span className="text-muted-foreground text-xs font-normal">
                        (optional)
                      </span>
                    </Label>
                    <input
                      ref={fileInputRef}
                      type="file"
                      accept="image/*"
                      onChange={handlePhotoChange}
                      className="hidden"
                      id="photo-upload"
                    />
                    {photoPreview ? (
                      <div className="relative w-28 h-28 rounded-lg overflow-hidden border border-border">
                        <img
                          src={photoPreview}
                          alt="Preview"
                          className="w-full h-full object-cover"
                        />
                        <button
                          type="button"
                          onClick={handleRemovePhoto}
                          className="absolute top-1 right-1 w-6 h-6 rounded-full bg-black/60 flex items-center justify-center text-white hover:bg-black/80 transition-colors"
                        >
                          <X className="w-3.5 h-3.5" />
                        </button>
                      </div>
                    ) : (
                      <label
                        htmlFor="photo-upload"
                        data-ocid="join.photo.upload_button"
                        className="flex items-center gap-3 px-4 py-3 border-2 border-dashed border-border rounded-lg cursor-pointer hover:border-primary hover:bg-secondary/50 transition-all"
                      >
                        <div className="w-10 h-10 rounded-full bg-secondary flex items-center justify-center flex-shrink-0">
                          <User className="w-5 h-5 text-muted-foreground" />
                        </div>
                        <div>
                          <p className="text-sm font-body font-semibold text-foreground flex items-center gap-1.5">
                            <Upload className="w-4 h-4" />
                            Upload your photo
                          </p>
                          <p className="text-xs text-muted-foreground mt-0.5">
                            JPG, PNG or GIF up to 10MB
                          </p>
                        </div>
                      </label>
                    )}
                  </div>

                  {/* Submit */}
                  <Button
                    type="submit"
                    data-ocid="join.submit_button"
                    disabled={addSupporter.isPending}
                    className="w-full bg-primary text-primary-foreground font-display font-bold text-base h-11 mt-2"
                  >
                    {addSupporter.isPending ? (
                      <>
                        <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                        Registering...
                      </>
                    ) : (
                      <>
                        <Heart className="w-4 h-4 mr-2" />
                        Join BOROLA Party
                      </>
                    )}
                  </Button>
                </form>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>
    </main>
  );
}
