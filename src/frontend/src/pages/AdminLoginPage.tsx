import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useVerifyAdmin } from "@/hooks/useQueries";
import { useNavigate } from "@tanstack/react-router";
import { Eye, EyeOff, Loader2, Lock, Shield } from "lucide-react";
import { motion } from "motion/react";
import { useState } from "react";
import { toast } from "sonner";

export function AdminLoginPage() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [loginError, setLoginError] = useState(false);

  const navigate = useNavigate();
  const verifyAdmin = useVerifyAdmin();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoginError(false);

    try {
      const isValid = await verifyAdmin.mutateAsync({ username, password });
      if (isValid) {
        localStorage.setItem("isAdmin", "true");
        toast.success("Welcome back, Admin!");
        navigate({ to: "/admin/dashboard" });
      } else {
        setLoginError(true);
        toast.error("Invalid credentials. Please try again.");
      }
    } catch {
      setLoginError(true);
      toast.error("Login failed. Please try again.");
    }
  };

  return (
    <main className="min-h-screen bg-background flex items-center justify-center px-4 py-16">
      {/* Background pattern */}
      <div className="fixed inset-0 -z-10 party-gradient opacity-5" />

      <motion.div
        initial={{ opacity: 0, y: 24 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="w-full max-w-sm"
      >
        {/* Logo */}
        <div className="text-center mb-8">
          <div className="w-16 h-16 rounded-full bg-primary flex items-center justify-center mx-auto mb-4 shadow-party">
            <Shield className="w-8 h-8 text-primary-foreground" />
          </div>
          <h1 className="font-display font-black text-2xl text-foreground">
            Admin Login
          </h1>
          <p className="text-muted-foreground font-body text-sm mt-1">
            BOROLA Party Administration Panel
          </p>
        </div>

        {/* Form Card */}
        <div className="bg-card rounded-xl border border-border shadow-party p-6">
          <form onSubmit={handleSubmit} className="space-y-4">
            {/* Username */}
            <div className="space-y-1.5">
              <Label
                htmlFor="username"
                className="font-body font-semibold text-sm"
              >
                Username
              </Label>
              <Input
                id="username"
                data-ocid="admin.username.input"
                placeholder="Enter your username"
                value={username}
                onChange={(e) => {
                  setUsername(e.target.value);
                  setLoginError(false);
                }}
                required
                autoComplete="username"
                className="font-body"
              />
            </div>

            {/* Password */}
            <div className="space-y-1.5">
              <Label
                htmlFor="password"
                className="font-body font-semibold text-sm"
              >
                Password
              </Label>
              <div className="relative">
                <Input
                  id="password"
                  data-ocid="admin.password.input"
                  type={showPassword ? "text" : "password"}
                  placeholder="Enter your password"
                  value={password}
                  onChange={(e) => {
                    setPassword(e.target.value);
                    setLoginError(false);
                  }}
                  required
                  autoComplete="current-password"
                  className="font-body pr-10"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword((v) => !v)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground transition-colors"
                >
                  {showPassword ? (
                    <EyeOff className="w-4 h-4" />
                  ) : (
                    <Eye className="w-4 h-4" />
                  )}
                </button>
              </div>
            </div>

            {/* Error */}
            {loginError && (
              <motion.div
                initial={{ opacity: 0, y: -8 }}
                animate={{ opacity: 1, y: 0 }}
                data-ocid="admin.login.error_state"
                className="flex items-center gap-2 px-3 py-2.5 bg-destructive/10 border border-destructive/20 rounded-md"
              >
                <Lock className="w-4 h-4 text-destructive flex-shrink-0" />
                <p className="text-sm text-destructive font-body">
                  Invalid username or password.
                </p>
              </motion.div>
            )}

            {/* Submit */}
            <Button
              type="submit"
              data-ocid="admin.login.submit_button"
              disabled={verifyAdmin.isPending}
              className="w-full bg-primary text-primary-foreground font-display font-bold h-11 mt-1"
            >
              {verifyAdmin.isPending ? (
                <>
                  <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                  Logging in...
                </>
              ) : (
                <>
                  <Shield className="w-4 h-4 mr-2" />
                  Login to Admin Panel
                </>
              )}
            </Button>
          </form>
        </div>

        <p className="text-center text-xs text-muted-foreground mt-4 font-body">
          Restricted access — authorized personnel only
        </p>
      </motion.div>
    </main>
  );
}
