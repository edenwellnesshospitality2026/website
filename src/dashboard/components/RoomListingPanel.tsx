import { useEffect, useMemo, useState } from "react";
import {
  MoreHorizontal,
  Pencil,
  Plus,
  Settings2,
  Trash2,
  Eye,
  PackageCheck,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Switch } from "@/components/ui/switch";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from "@/components/ui/dialog";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Sheet, SheetContent, SheetHeader, SheetTitle } from "@/components/ui/sheet";
import { Separator } from "@/components/ui/separator";
import {
  type RoomListing,
  type RatePlan,
  type RatePlanCode,
  RATE_PLANS,
  formatINR,
} from "../lib/mock-data";
import { toast } from "sonner";

interface Props {
  rooms: RoomListing[];
}

type ListingMode = "create" | "edit" | "view";

const emptyRatePlan = (): RatePlan => ({
  id: `rp-${Math.random().toString(36).slice(2, 8)}`,
  code: "EP",
  title: "",
  description: "",
  mealInclusion: "",
  pricePerNight: 0,
  discountedPrice: undefined,
  availability: "Available",
  cancellationPolicy: "",
  taxesInfo: "+ 18% GST",
  totalInventory: 1,
  availableInventory: 1,
  status: "active",
});

const emptyListing = (): RoomListing => ({
  id: `lst-${Math.random().toString(36).slice(2, 8)}`,
  name: "",
  slug: "",
  listingType: "Room",
  category: "",
  shortDescription: "",
  fullDescription: "",
  maxGuests: 2,
  baseOccupancy: 2,
  amenities: [],
  thumbnail: "",
  galleryImages: [],
  basePrice: 0,
  discountPrice: undefined,
  taxesInfo: "+ 18% GST",
  availableRooms: 0,
  totalRooms: 0,
  status: "active",
  createdAt: new Date().toISOString().slice(0, 10),
  ratePlans: [],
});

export const RoomListingPanel = ({ rooms: initial }: Props) => {
  const [rooms, setRooms] = useState(initial);
  const [search, setSearch] = useState("");
  const [statusFilter, setStatusFilter] = useState<"all" | "active" | "inactive">("all");
  const [typeFilter, setTypeFilter] = useState("all");

  const [listingOpen, setListingOpen] = useState(false);
  const [listingMode, setListingMode] = useState<ListingMode>("create");
  const [activeListing, setActiveListing] = useState<RoomListing | null>(null);

  const [ratePlansOpen, setRatePlansOpen] = useState(false);
  const [ratePlanListing, setRatePlanListing] = useState<RoomListing | null>(null);

  const filtered = useMemo(() => {
    return rooms.filter((room) => {
      const s = search.toLowerCase();
      if (
        s &&
        ![room.id, room.name, room.category, room.listingType]
          .some((v) => v.toLowerCase().includes(s))
      ) {
        return false;
      }
      if (statusFilter !== "all" && room.status !== statusFilter) return false;
      if (typeFilter !== "all" && room.listingType !== typeFilter) return false;
      return true;
    });
  }, [rooms, search, statusFilter, typeFilter]);

  const listingTypes = useMemo(
    () => Array.from(new Set(rooms.map((r) => r.listingType))),
    [rooms]
  );

  const openCreate = () => {
    setListingMode("create");
    setActiveListing(null);
    setListingOpen(true);
  };

  const openEdit = (room: RoomListing) => {
    setListingMode("edit");
    setActiveListing(room);
    setListingOpen(true);
  };

  const openView = (room: RoomListing) => {
    setListingMode("view");
    setActiveListing(room);
    setListingOpen(true);
  };

  const openRatePlans = (room: RoomListing) => {
    setRatePlanListing(room);
    setRatePlansOpen(true);
  };

  const saveListing = (payload: RoomListing) => {
    setRooms((curr) => {
      const idx = curr.findIndex((x) => x.id === payload.id);
      if (idx >= 0) {
        const next = [...curr];
        next[idx] = payload;
        return next;
      }
      return [payload, ...curr];
    });
  };

  const deleteListing = (id: string) => {
    setRooms((curr) => curr.filter((r) => r.id !== id));
    toast.success("Listing deleted");
  };

  const updateInventory = (id: string, availableRooms: number) => {
    setRooms((curr) =>
      curr.map((r) =>
        r.id === id ? { ...r, availableRooms } : r
      )
    );
    toast.success("Inventory updated");
  };

  const updateRatePlans = (listingId: string, nextPlans: RatePlan[]) => {
    setRooms((curr) =>
      curr.map((r) =>
        r.id === listingId ? { ...r, ratePlans: nextPlans } : r
      )
    );
  };

  return (
    <section className="space-y-4">
      <div className="luxe-card p-5">
        <div className="flex flex-col gap-3 lg:flex-row lg:items-center lg:justify-between">
          <div className="flex flex-1 gap-3">
            <Input
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder="Search listing by id, name, type..."
              className="max-w-md"
            />
            <Select value={typeFilter} onValueChange={setTypeFilter}>
              <SelectTrigger className="w-[180px]">
                <SelectValue placeholder="Listing type" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All types</SelectItem>
                {listingTypes.map((type) => (
                  <SelectItem key={type} value={type}>{type}</SelectItem>
                ))}
              </SelectContent>
            </Select>
            <Select value={statusFilter} onValueChange={(v: "all" | "active" | "inactive") => setStatusFilter(v)}>
              <SelectTrigger className="w-[160px]">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All status</SelectItem>
                <SelectItem value="active">Active</SelectItem>
                <SelectItem value="inactive">Inactive</SelectItem>
              </SelectContent>
            </Select>
          </div>
          <Button onClick={openCreate} className="bg-gradient-gold text-ivory shadow-gold hover:opacity-95">
            <Plus className="h-4 w-4" /> Add Listing
          </Button>
        </div>
      </div>

      <div className="luxe-card overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead className="bg-muted/40">
              <tr className="text-left text-xs uppercase tracking-wider text-muted-foreground">
                {[
                  "Listing ID",
                  "Listing Name",
                  "Listing Type",
                  "Category",
                  "Max Guests",
                  "Base Occupancy",
                  "Rate Plans",
                  "Base Price",
                  "Discount",
                  "Inventory",
                  "Status",
                  "Created",
                  "Actions",
                ].map((h) => (
                  <th key={h} className="px-4 py-3 font-medium">{h}</th>
                ))}
              </tr>
            </thead>
            <tbody>
              {filtered.map((room) => (
                <tr key={room.id} className="border-t border-border/60 hover:bg-muted/20 transition-colors">
                  <td className="px-4 py-3 font-mono text-xs text-gold-deep">{room.id}</td>
                  <td className="px-4 py-3">
                    <p className="font-medium text-espresso">{room.name}</p>
                    <p className="text-xs text-muted-foreground line-clamp-1">{room.shortDescription}</p>
                  </td>
                  <td className="px-4 py-3">{room.listingType}</td>
                  <td className="px-4 py-3">{room.category}</td>
                  <td className="px-4 py-3">{room.maxGuests}</td>
                  <td className="px-4 py-3">{room.baseOccupancy}</td>
                  <td className="px-4 py-3">{room.ratePlans.length}</td>
                  <td className="px-4 py-3">{formatINR(room.basePrice)}</td>
                  <td className="px-4 py-3">{room.discountPrice ? formatINR(room.discountPrice) : "-"}</td>
                  <td className="px-4 py-3">
                    <Select
                      value={String(room.availableRooms)}
                      onValueChange={(v) => updateInventory(room.id, Number(v))}
                    >
                      <SelectTrigger className="h-8 w-[120px]">
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        {Array.from({ length: room.totalRooms + 1 }).map((_, i) => (
                          <SelectItem key={i} value={String(i)}>
                            {i}/{room.totalRooms}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </td>
                  <td className="px-4 py-3">
                    <Badge
                      variant="outline"
                      className={room.status === "active" ? "text-success border-success/40" : ""}
                    >
                      {room.status}
                    </Badge>
                  </td>
                  <td className="px-4 py-3">{room.createdAt}</td>
                  <td className="px-4 py-3">
                    <DropdownMenu>
                      <DropdownMenuTrigger asChild>
                        <Button variant="ghost" size="icon" className="h-8 w-8">
                          <MoreHorizontal className="h-4 w-4" />
                        </Button>
                      </DropdownMenuTrigger>
                      <DropdownMenuContent align="end">
                        <DropdownMenuLabel>Listing actions</DropdownMenuLabel>
                        <DropdownMenuSeparator />
                        <DropdownMenuItem onClick={() => openView(room)}>
                          <Eye className="h-3.5 w-3.5 mr-2" /> View Listing
                        </DropdownMenuItem>
                        <DropdownMenuItem onClick={() => openEdit(room)}>
                          <Pencil className="h-3.5 w-3.5 mr-2" /> Edit Listing
                        </DropdownMenuItem>
                        <DropdownMenuItem onClick={() => openRatePlans(room)}>
                          <Settings2 className="h-3.5 w-3.5 mr-2" /> Manage Rate Plans
                        </DropdownMenuItem>
                        <DropdownMenuSeparator />
                        <DropdownMenuItem
                          className="text-destructive focus:text-destructive"
                          onClick={() => deleteListing(room.id)}
                        >
                          <Trash2 className="h-3.5 w-3.5 mr-2" /> Delete Listing
                        </DropdownMenuItem>
                      </DropdownMenuContent>
                    </DropdownMenu>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      <ListingDrawer
        open={listingOpen}
        onOpenChange={setListingOpen}
        mode={listingMode}
        listing={activeListing}
        onSave={saveListing}
      />

      <RatePlanDialog
        open={ratePlansOpen}
        onOpenChange={setRatePlansOpen}
        listing={ratePlanListing}
        onSave={updateRatePlans}
      />
    </section>
  );
};

const ListingDrawer = ({
  open,
  onOpenChange,
  mode,
  listing,
  onSave,
}: {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  mode: ListingMode;
  listing: RoomListing | null;
  onSave: (listing: RoomListing) => void;
}) => {
  const readOnly = mode === "view";
  const [form, setForm] = useState<RoomListing>(emptyListing());

  useEffect(() => {
    setForm(listing ? { ...listing } : emptyListing());
  }, [listing, open]);

  const current = listing ? { ...listing } : emptyListing();
  const safeForm = form.id ? form : current;

  const setField = <K extends keyof RoomListing>(key: K, value: RoomListing[K]) =>
    setForm((prev) => ({ ...prev, [key]: value }));

  const submit = (e: React.FormEvent) => {
    e.preventDefault();
    if (readOnly) return;
    onSave(safeForm);
    toast.success(mode === "create" ? "Listing created" : "Listing updated");
    onOpenChange(false);
  };

  return (
    <Sheet open={open} onOpenChange={onOpenChange}>
      <SheetContent side="right" className="w-full sm:max-w-2xl p-0 overflow-y-auto">
        <form onSubmit={submit}>
          <SheetHeader className="px-6 py-5 border-b border-border/60">
            <SheetTitle className="font-display text-2xl text-espresso">
              {mode === "create" ? "Add Listing" : mode === "edit" ? "Edit Listing" : "View Listing"}
            </SheetTitle>
          </SheetHeader>
          <div className="px-6 py-5 space-y-6">
            <Field label="Listing Name">
              <Input
                value={safeForm.name}
                onChange={(e) => setField("name", e.target.value)}
                disabled={readOnly}
              />
            </Field>
            <div className="grid grid-cols-2 gap-4">
              <Field label="Listing Slug">
                <Input value={safeForm.slug || ""} onChange={(e) => setField("slug", e.target.value)} disabled={readOnly} />
              </Field>
              <Field label="Listing Type">
                <Input value={safeForm.listingType} onChange={(e) => setField("listingType", e.target.value)} disabled={readOnly} />
              </Field>
            </div>
            <div className="grid grid-cols-2 gap-4">
              <Field label="Category">
                <Input value={safeForm.category} onChange={(e) => setField("category", e.target.value)} disabled={readOnly} />
              </Field>
              <Field label="Thumbnail URL">
                <Input value={safeForm.thumbnail} onChange={(e) => setField("thumbnail", e.target.value)} disabled={readOnly} />
              </Field>
            </div>
            <Field label="Short Description">
              <Textarea value={safeForm.shortDescription} onChange={(e) => setField("shortDescription", e.target.value)} disabled={readOnly} />
            </Field>
            <Field label="Full Description">
              <Textarea value={safeForm.fullDescription || ""} onChange={(e) => setField("fullDescription", e.target.value)} disabled={readOnly} />
            </Field>
            <div className="grid grid-cols-3 gap-4">
              <Field label="Max Guests">
                <Input type="number" value={safeForm.maxGuests} onChange={(e) => setField("maxGuests", Number(e.target.value))} disabled={readOnly} />
              </Field>
              <Field label="Base Occupancy">
                <Input type="number" value={safeForm.baseOccupancy} onChange={(e) => setField("baseOccupancy", Number(e.target.value))} disabled={readOnly} />
              </Field>
              <Field label="Total Inventory">
                <Input
                  type="number"
                  value={safeForm.totalRooms}
                  onChange={(e) => {
                    const total = Number(e.target.value);
                    setField("totalRooms", total);
                    if (safeForm.availableRooms > total) {
                      setField("availableRooms", total);
                    }
                  }}
                  disabled={readOnly}
                />
              </Field>
            </div>
            <div className="grid grid-cols-3 gap-4">
              <Field label="Available Inventory">
                <Input type="number" value={safeForm.availableRooms} onChange={(e) => setField("availableRooms", Number(e.target.value))} disabled={readOnly} />
              </Field>
              <Field label="Base Price">
                <Input type="number" value={safeForm.basePrice} onChange={(e) => setField("basePrice", Number(e.target.value))} disabled={readOnly} />
              </Field>
              <Field label="Discount Price">
                <Input type="number" value={safeForm.discountPrice || 0} onChange={(e) => setField("discountPrice", Number(e.target.value))} disabled={readOnly} />
              </Field>
              <Field label="Taxes / Fees">
                <Input value={safeForm.taxesInfo || ""} onChange={(e) => setField("taxesInfo", e.target.value)} disabled={readOnly} />
              </Field>
            </div>
            <Field label="Amenities (comma separated)">
              <Textarea
                value={safeForm.amenities.join(", ")}
                onChange={(e) =>
                  setField(
                    "amenities",
                    e.target.value.split(",").map((x) => x.trim()).filter(Boolean)
                  )
                }
                disabled={readOnly}
              />
            </Field>

            <div className="rounded-lg border border-border/60 p-4">
              <p className="text-xs uppercase tracking-wider text-muted-foreground mb-3">
                Rate Plan Pricing Snapshot
              </p>
              <div className="space-y-2">
                {safeForm.ratePlans.map((plan) => (
                  <div key={plan.id} className="grid grid-cols-[60px_1fr_1fr_1fr_1fr] gap-2 items-center">
                    <span className="text-sm font-medium text-espresso">{plan.code}</span>
                    <Input
                      type="number"
                      value={plan.pricePerNight}
                      disabled={readOnly}
                      onChange={(e) => {
                        const next = safeForm.ratePlans.map((rp) =>
                          rp.id === plan.id
                            ? { ...rp, pricePerNight: Number(e.target.value) }
                            : rp
                        );
                        setField("ratePlans", next);
                      }}
                    />
                    <Input
                      type="number"
                      value={plan.discountedPrice || 0}
                      disabled={readOnly}
                      onChange={(e) => {
                        const next = safeForm.ratePlans.map((rp) =>
                          rp.id === plan.id
                            ? { ...rp, discountedPrice: Number(e.target.value) }
                            : rp
                        );
                        setField("ratePlans", next);
                      }}
                    />
                    <Input
                      type="number"
                      value={plan.availableInventory}
                      disabled={readOnly}
                      onChange={(e) => {
                        const next = safeForm.ratePlans.map((rp) =>
                          rp.id === plan.id
                            ? { ...rp, availableInventory: Number(e.target.value) }
                            : rp
                        );
                        setField("ratePlans", next);
                      }}
                    />
                    <Input
                      type="number"
                      value={plan.totalInventory}
                      disabled={readOnly}
                      onChange={(e) => {
                        const next = safeForm.ratePlans.map((rp) =>
                          rp.id === plan.id
                            ? { ...rp, totalInventory: Number(e.target.value) }
                            : rp
                        );
                        setField("ratePlans", next);
                      }}
                    />
                  </div>
                ))}
              </div>
              <div className="mt-2 grid grid-cols-[60px_1fr_1fr_1fr_1fr] gap-2 text-[10px] uppercase tracking-wider text-muted-foreground">
                <span>Code</span>
                <span>Base</span>
                <span>Discount</span>
                <span>Available</span>
                <span>Total</span>
              </div>
            </div>
            <div className="flex items-center justify-between rounded-lg border border-border/60 px-4 py-3">
              <div>
                <p className="text-sm font-medium text-espresso">Listing status</p>
                <p className="text-xs text-muted-foreground">Toggle active/inactive visibility</p>
              </div>
              <Switch
                checked={safeForm.status === "active"}
                disabled={readOnly}
                onCheckedChange={(v) => setField("status", v ? "active" : "inactive")}
              />
            </div>
          </div>
          <Separator />
          <div className="px-6 py-4 flex justify-end gap-3">
            <Button type="button" variant="outline" onClick={() => onOpenChange(false)}>Close</Button>
            {!readOnly ? (
              <Button type="submit" className="bg-gradient-gold text-ivory shadow-gold hover:opacity-95">
                {mode === "create" ? "Add Listing" : "Save Changes"}
              </Button>
            ) : null}
          </div>
        </form>
      </SheetContent>
    </Sheet>
  );
};

const RatePlanDialog = ({
  open,
  onOpenChange,
  listing,
  onSave,
}: {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  listing: RoomListing | null;
  onSave: (listingId: string, plans: RatePlan[]) => void;
}) => {
  const [plans, setPlans] = useState<RatePlan[]>([]);
  const [editingId, setEditingId] = useState<string | null>(null);

  useEffect(() => {
    setPlans(listing?.ratePlans || []);
    setEditingId(null);
  }, [listing, open]);

  const addPlan = () => {
    const next = emptyRatePlan();
    setPlans((curr) => [next, ...curr]);
    setEditingId(next.id);
  };

  const removePlan = (id: string) => setPlans((curr) => curr.filter((p) => p.id !== id));

  const updatePlan = (id: string, patch: Partial<RatePlan>) => {
    setPlans((curr) => curr.map((p) => (p.id === id ? { ...p, ...patch } : p)));
  };

  const submit = () => {
    if (!listing) return;
    onSave(listing.id, plans);
    toast.success("Rate plans updated");
    onOpenChange(false);
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-4xl">
        <DialogHeader>
          <DialogTitle className="font-display text-2xl text-espresso">
            Manage Rate Plans · {listing?.name}
          </DialogTitle>
          <DialogDescription>
            Add, update, delete and control pricing availability for EP/CP/MAP plans.
          </DialogDescription>
        </DialogHeader>
        <div className="space-y-3 max-h-[60vh] overflow-y-auto pr-1">
          {plans.map((plan) => {
            const editing = editingId === plan.id;
            return (
              <div key={plan.id} className="rounded-xl border border-border/60 p-4 space-y-3">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <Badge className="bg-gradient-gold text-ivory">{plan.code}</Badge>
                    <p className="font-medium text-espresso">{plan.title || "New Rate Plan"}</p>
                  </div>
                  <div className="flex items-center gap-1">
                    <Button size="sm" variant="ghost" onClick={() => setEditingId(editing ? null : plan.id)}>
                      {editing ? "Done" : "Edit"}
                    </Button>
                    <Button size="icon" variant="ghost" className="h-8 w-8 text-destructive" onClick={() => removePlan(plan.id)}>
                      <Trash2 className="h-3.5 w-3.5" />
                    </Button>
                  </div>
                </div>

                {editing ? (
                  <div className="grid grid-cols-2 gap-3">
                    <Field label="Rate Plan Code">
                      <Select value={plan.code} onValueChange={(v: RatePlanCode) => updatePlan(plan.id, { code: v })}>
                        <SelectTrigger><SelectValue /></SelectTrigger>
                        <SelectContent>
                          {RATE_PLANS.map((r) => <SelectItem key={r.code} value={r.code}>{r.label}</SelectItem>)}
                        </SelectContent>
                      </Select>
                    </Field>
                    <Field label="Status">
                      <Select value={plan.status} onValueChange={(v: "active" | "inactive") => updatePlan(plan.id, { status: v })}>
                        <SelectTrigger><SelectValue /></SelectTrigger>
                        <SelectContent>
                          <SelectItem value="active">Active</SelectItem>
                          <SelectItem value="inactive">Inactive</SelectItem>
                        </SelectContent>
                      </Select>
                    </Field>
                    <Field label="Title">
                      <Input value={plan.title} onChange={(e) => updatePlan(plan.id, { title: e.target.value })} />
                    </Field>
                    <Field label="Meal Inclusion">
                      <Input value={plan.mealInclusion} onChange={(e) => updatePlan(plan.id, { mealInclusion: e.target.value })} />
                    </Field>
                    <Field label="Price Per Night">
                      <Input type="number" value={plan.pricePerNight} onChange={(e) => updatePlan(plan.id, { pricePerNight: Number(e.target.value) })} />
                    </Field>
                    <Field label="Discounted Price">
                      <Input type="number" value={plan.discountedPrice || 0} onChange={(e) => updatePlan(plan.id, { discountedPrice: Number(e.target.value) })} />
                    </Field>
                    <Field label="Availability">
                      <Input value={plan.availability || ""} onChange={(e) => updatePlan(plan.id, { availability: e.target.value })} />
                    </Field>
                    <Field label="Available Inventory">
                      <Input type="number" value={plan.availableInventory} onChange={(e) => updatePlan(plan.id, { availableInventory: Number(e.target.value) })} />
                    </Field>
                    <Field label="Description" className="col-span-2">
                      <Textarea value={plan.description} onChange={(e) => updatePlan(plan.id, { description: e.target.value })} />
                    </Field>
                    <Field label="Cancellation Policy Snippet" className="col-span-2">
                      <Textarea value={plan.cancellationPolicy} onChange={(e) => updatePlan(plan.id, { cancellationPolicy: e.target.value })} />
                    </Field>
                  </div>
                ) : (
                  <div className="grid grid-cols-2 md:grid-cols-4 gap-2 text-xs text-muted-foreground">
                    <p>Meal: <span className="text-foreground">{plan.mealInclusion || "-"}</span></p>
                    <p>Price: <span className="text-foreground">{formatINR(plan.pricePerNight)}</span></p>
                    <p>Discount: <span className="text-foreground">{plan.discountedPrice ? formatINR(plan.discountedPrice) : "-"}</span></p>
                    <p>Inventory: <span className="text-foreground">{plan.availableInventory}/{plan.totalInventory}</span></p>
                  </div>
                )}
              </div>
            );
          })}
        </div>
        <div className="flex items-center justify-between pt-2">
          <Button variant="outline" onClick={addPlan}>
            <PackageCheck className="h-4 w-4" /> Add Rate Plan
          </Button>
          <div className="flex gap-2">
            <Button variant="outline" onClick={() => onOpenChange(false)}>Cancel</Button>
            <Button onClick={submit} className="bg-gradient-gold text-ivory shadow-gold hover:opacity-95">Save Plans</Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};

const Field = ({
  label,
  children,
  className = "",
}: {
  label: string;
  children: React.ReactNode;
  className?: string;
}) => (
  <div className={`space-y-1.5 ${className}`}>
    <Label className="text-xs uppercase tracking-wider text-muted-foreground">{label}</Label>
    {children}
  </div>
);
