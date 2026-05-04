import { useCallback, useEffect, useState } from "react";
import { RefreshCw } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { toast } from "sonner";
import { getToken } from "../auth/auth-service";
import {
  getContactEnquiriesManage,
  patchContactEnquiryStatus,
  type ContactEnquiryDoc,
} from "@/lib/cms-api";
import { DashboardShell } from "../components/DashboardShell";
import { CmsSectionCard, CMS_TABLE_HEADER_CLASS } from "../components/cms";
import { cn } from "@/lib/utils";

function formatWhen(iso?: string) {
  if (!iso) return "—";
  const d = new Date(iso);
  return Number.isNaN(d.getTime()) ? iso : d.toLocaleString();
}

function truncate(s: string | undefined, n: number) {
  if (!s) return "—";
  const t = s.trim();
  if (t.length <= n) return t;
  return `${t.slice(0, n)}…`;
}

const DashboardContactEnquiriesPage = () => {
  const token = getToken() ?? "";
  const [rows, setRows] = useState<ContactEnquiryDoc[]>([]);
  const [loading, setLoading] = useState(true);
  const [expanded, setExpanded] = useState<Set<string>>(() => new Set());

  const load = useCallback(async () => {
    if (!token) return;
    setLoading(true);
    try {
      const data = await getContactEnquiriesManage(token);
      setRows(data);
    } catch (e) {
      toast.error(e instanceof Error ? e.message : "Failed to load enquiries");
    } finally {
      setLoading(false);
    }
  }, [token]);

  useEffect(() => {
    void load();
  }, [load]);

  const setStatus = async (id: string, status: ContactEnquiryDoc["status"]) => {
    if (!token) return;
    try {
      await patchContactEnquiryStatus(token, id, status);
      toast.success("Status updated");
      await load();
    } catch (e) {
      toast.error(e instanceof Error ? e.message : "Update failed");
    }
  };

  const toggleExpand = (id: string) => {
    setExpanded((prev) => {
      const next = new Set(prev);
      if (next.has(id)) next.delete(id);
      else next.add(id);
      return next;
    });
  };

  return (
    <DashboardShell
      title="Contact enquiries"
      subtitle="Submissions from the Book a Table / enquiry form (public site)."
    >
      <CmsSectionCard
        title="Enquiries"
        description="Newest first. Update status as you follow up."
        actions={
          <Button type="button" variant="outline" size="sm" onClick={() => void load()} disabled={loading}>
            <RefreshCw className={cn("h-4 w-4 mr-1.5", loading && "animate-spin")} />
            Refresh
          </Button>
        }
      >
        {loading ? (
          <p className="text-sm text-muted-foreground py-6">Loading…</p>
        ) : rows.length === 0 ? (
          <p className="text-sm text-muted-foreground py-6">No enquiries yet.</p>
        ) : (
          <div className="overflow-x-auto rounded-md border">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead className={CMS_TABLE_HEADER_CLASS}>When</TableHead>
                  <TableHead className={CMS_TABLE_HEADER_CLASS}>Name</TableHead>
                  <TableHead className={CMS_TABLE_HEADER_CLASS}>Email</TableHead>
                  <TableHead className={CMS_TABLE_HEADER_CLASS}>Phone</TableHead>
                  <TableHead className={CMS_TABLE_HEADER_CLASS}>Booking type</TableHead>
                  <TableHead className={CMS_TABLE_HEADER_CLASS}>Message</TableHead>
                  <TableHead className={CMS_TABLE_HEADER_CLASS}>Source</TableHead>
                  <TableHead className={CMS_TABLE_HEADER_CLASS}>Status</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {rows.map((row) => {
                  const isOpen = expanded.has(row.id);
                  const msg = row.message ?? "";
                  return (
                    <TableRow key={row.id}>
                      <TableCell className="whitespace-nowrap text-xs align-top">
                        {formatWhen(row.createdAt)}
                      </TableCell>
                      <TableCell className="align-top max-w-[140px]">{row.name}</TableCell>
                      <TableCell className="align-top max-w-[180px] break-all text-sm">{row.email}</TableCell>
                      <TableCell className="align-top whitespace-nowrap text-sm">{row.phone}</TableCell>
                      <TableCell className="align-top text-sm">{row.bookingType ?? "—"}</TableCell>
                      <TableCell className="align-top max-w-[280px] text-sm">
                        <span className="whitespace-pre-wrap">
                          {isOpen ? msg || "—" : truncate(msg, 100)}
                        </span>
                        {msg.length > 100 ? (
                          <button
                            type="button"
                            className="ml-1 text-xs text-espresso underline"
                            onClick={() => toggleExpand(row.id)}
                          >
                            {isOpen ? "Less" : "More"}
                          </button>
                        ) : null}
                      </TableCell>
                      <TableCell className="align-top max-w-[200px] break-all text-xs">
                        {row.sourceUrl ? (
                          <a
                            href={row.sourceUrl}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="text-espresso hover:underline"
                          >
                            {truncate(row.sourceUrl, 48)}
                          </a>
                        ) : (
                          "—"
                        )}
                      </TableCell>
                      <TableCell className="align-top w-[140px]">
                        <Select
                          value={row.status}
                          onValueChange={(v) =>
                            setStatus(row.id, v as ContactEnquiryDoc["status"])
                          }
                        >
                          <SelectTrigger className="h-9">
                            <SelectValue />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="new">New</SelectItem>
                            <SelectItem value="contacted">Contacted</SelectItem>
                            <SelectItem value="closed">Closed</SelectItem>
                          </SelectContent>
                        </Select>
                      </TableCell>
                    </TableRow>
                  );
                })}
              </TableBody>
            </Table>
          </div>
        )}
      </CmsSectionCard>
    </DashboardShell>
  );
};

export default DashboardContactEnquiriesPage;
