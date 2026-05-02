import { useEffect, useState } from "react";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { DashboardShell } from "../components/DashboardShell";
import { CmsSectionCard } from "../components/cms";
import { changeEmail, changePassword } from "../auth/auth-service";
import { useAuth } from "../auth/AuthContext";

const DashboardAccountPage = () => {
  const { user, setSession } = useAuth();
  const [pwCurrent, setPwCurrent] = useState("");
  const [pwNew, setPwNew] = useState("");
  const [pwConfirm, setPwConfirm] = useState("");
  const [pwSaving, setPwSaving] = useState(false);

  const [emailNew, setEmailNew] = useState(user?.email ?? "");
  const [emailPassword, setEmailPassword] = useState("");
  const [emailSaving, setEmailSaving] = useState(false);

  useEffect(() => {
    if (user?.email) setEmailNew(user.email);
  }, [user?.email]);

  const submitPassword = async () => {
    if (pwNew.length < 6) {
      toast.error("New password must be at least 6 characters.");
      return;
    }
    if (pwNew !== pwConfirm) {
      toast.error("New passwords do not match.");
      return;
    }
    setPwSaving(true);
    try {
      await changePassword(pwCurrent, pwNew);
      toast.success("Password updated");
      setPwCurrent("");
      setPwNew("");
      setPwConfirm("");
    } catch (e) {
      toast.error(e instanceof Error ? e.message : "Failed to update password");
    } finally {
      setPwSaving(false);
    }
  };

  const submitEmail = async () => {
    const trimmed = emailNew.trim().toLowerCase();
    if (!trimmed) {
      toast.error("Enter an email address.");
      return;
    }
    setEmailSaving(true);
    try {
      const result = await changeEmail(trimmed, emailPassword);
      setSession(result.token, result.user);
      toast.success("Email updated — you stay signed in.");
      setEmailPassword("");
      setEmailNew(result.user.email);
    } catch (e) {
      toast.error(e instanceof Error ? e.message : "Failed to update email");
    } finally {
      setEmailSaving(false);
    }
  };

  return (
    <DashboardShell
      kicker="Content"
      title="Account"
      subtitle="Sign-in email and password for this dashboard."
    >
      <div className="mx-auto max-w-3xl space-y-8">
        <CmsSectionCard title="Email address" description="Used to log in to the operations dashboard.">
          <div className="space-y-4">
            <div className="grid gap-2">
              <Label htmlFor="account-email">Email</Label>
              <Input
                id="account-email"
                type="email"
                autoComplete="email"
                value={emailNew}
                onChange={(e) => setEmailNew(e.target.value)}
              />
            </div>
            <div className="grid gap-2">
              <Label htmlFor="email-current-pw">Current password</Label>
              <Input
                id="email-current-pw"
                type="password"
                autoComplete="current-password"
                value={emailPassword}
                onChange={(e) => setEmailPassword(e.target.value)}
              />
              <p className="text-xs text-muted-foreground">
                Required to confirm it&apos;s you before changing the login email.
              </p>
            </div>
            <Button
              type="button"
              disabled={emailSaving}
              className="bg-gradient-gold text-ivory shadow-gold"
              onClick={() => void submitEmail()}
            >
              {emailSaving ? "Saving…" : "Update email"}
            </Button>
          </div>
        </CmsSectionCard>

        <CmsSectionCard title="Password" description="Choose a strong password you don’t use elsewhere.">
          <div className="space-y-4">
            <div className="grid gap-2">
              <Label htmlFor="pw-current">Current password</Label>
              <Input
                id="pw-current"
                type="password"
                autoComplete="current-password"
                value={pwCurrent}
                onChange={(e) => setPwCurrent(e.target.value)}
              />
            </div>
            <div className="grid gap-2">
              <Label htmlFor="pw-new">New password</Label>
              <Input
                id="pw-new"
                type="password"
                autoComplete="new-password"
                value={pwNew}
                onChange={(e) => setPwNew(e.target.value)}
              />
            </div>
            <div className="grid gap-2">
              <Label htmlFor="pw-confirm">Confirm new password</Label>
              <Input
                id="pw-confirm"
                type="password"
                autoComplete="new-password"
                value={pwConfirm}
                onChange={(e) => setPwConfirm(e.target.value)}
              />
            </div>
            <Button
              type="button"
              disabled={pwSaving}
              variant="outline"
              className="border-gold/40"
              onClick={() => void submitPassword()}
            >
              {pwSaving ? "Saving…" : "Change password"}
            </Button>
          </div>
        </CmsSectionCard>
      </div>
    </DashboardShell>
  );
};

export default DashboardAccountPage;
