const API_BASE = import.meta.env.VITE_API_BASE_URL || "http://localhost:8090";

export class CmsApiError extends Error {
  status: number;
  body: unknown;
  constructor(message: string, status: number, body: unknown) {
    super(message);
    this.name = "CmsApiError";
    this.status = status;
    this.body = body;
  }
}

async function parseJson<T>(res: Response): Promise<T> {
  const text = await res.text();
  if (!text) return undefined as T;
  try {
    return JSON.parse(text) as T;
  } catch {
    return undefined as T;
  }
}

export async function fetchCms<T>(path: string, init?: RequestInit & { token?: string }): Promise<T> {
  const { token, ...rest } = init ?? {};
  const headers: Record<string, string> = {
    ...((rest.headers as Record<string, string>) ?? {}),
  };
  if (token) headers.Authorization = `Bearer ${token}`;
  if (!headers["Content-Type"] && rest.body && typeof rest.body === "string") {
    headers["Content-Type"] = "application/json";
  }
  const res = await fetch(`${API_BASE}${path}`, { ...rest, headers });
  const data = await parseJson<{ data: T; error?: string }>(res);
  if (!res.ok) {
    throw new CmsApiError(data?.error ?? res.statusText, res.status, data);
  }
  return data?.data as T;
}

export type CmsImage = {
  secureUrl: string;
  publicId: string;
  alt?: string;
};

/** @deprecated use CmsImage */
export type RoomShowcaseImage = CmsImage;

/** Pick Your Room / Suite grid cards only (Eden Haven, Residence, Grand). */
export type RoomCardDoc = {
  _id: string;
  slug: string;
  headline: string;
  description: string;
  sizeLabel?: string;
  images: CmsImage[];
  sortOrder: number;
  published: boolean;
  bookHref?: string;
  startingPrice?: number;
  rateEp?: number;
  rateCp?: number;
  rateMap?: number;
  showPricing?: boolean;
};

/** @deprecated use RoomCardDoc */
export type RoomShowcaseDoc = RoomCardDoc;

/** Presidential Suite section (singleton, separate from room cards). */
export type PresidentialSuiteDoc = {
  _id: string;
  key: string;
  headline: string;
  description: string;
  sizeLabel?: string;
  images: CmsImage[];
  published: boolean;
  bookHref?: string;
  bookButtonLabel?: string;
  startingPrice?: number;
  rateEp?: number;
  rateCp?: number;
  rateMap?: number;
  showPricing?: boolean;
};

/** Default corporate PDF/view link when CMS field is empty */
export const DEFAULT_CORPORATE_LINK_URL =
  "https://drive.google.com/file/d/1Btg8mqTmasHuzdOOdrqXgWM_Ro3Y70VH/view";

export type SiteContentHeroSlide = {
  sortOrder?: number;
  secureUrl: string;
  publicId: string;
  alt?: string;
  title?: string;
  subtitle?: string;
  description?: string;
};

export type SiteContentDoc = {
  key: string;
  pickYourRoomTitle?: string;
  pickYourRoomIntro: string;
  membershipIntro: string;
  guestStoriesIntro: string;
  heroSlides?: SiteContentHeroSlide[];
  corporateLinkUrl?: string;
  corporateLinkVisible?: boolean;
};

export type MembershipTierDoc = {
  _id: string;
  title: string;
  description: string;
  priceLabel?: string;
  features: string[];
  isPopular?: boolean;
  primaryCtaLabel?: string;
  primaryCtaHref?: string;
  secondaryCtaLabel?: string;
  secondaryCtaHref?: string;
  sortOrder: number;
  published: boolean;
};

export type GuestStoryDoc = {
  _id: string;
  headline: string;
  subtitle?: string;
  youtubeUrl: string;
  body?: string;
  sortOrder: number;
  published: boolean;
};

export type GalleryImageDoc = {
  _id: string;
  categoryId: string;
  secureUrl: string;
  publicId: string;
  alt?: string;
  sortOrder?: number;
  published?: boolean;
};

export type GalleryCategoryDoc = {
  _id: string;
  id?: string;
  title: string;
  slug: string;
  sortOrder?: number;
  images: GalleryImageDoc[];
};

export const getPresidentialSuite = () =>
  fetchCms<PresidentialSuiteDoc | null>("/api/cms/presidential-suite");

export const getRoomCards = () => fetchCms<RoomCardDoc[]>("/api/cms/room-cards");

export const getSiteContent = (key = "homepage") =>
  fetchCms<SiteContentDoc>(`/api/cms/site-content?key=${encodeURIComponent(key)}`);

export const getMembershipTiers = () => fetchCms<MembershipTierDoc[]>("/api/cms/membership-tiers");

export const getGuestStories = () => fetchCms<GuestStoryDoc[]>("/api/cms/guest-stories");

export const getGallery = () => fetchCms<GalleryCategoryDoc[]>("/api/cms/gallery");

/** Extract YouTube video id from watch, shorts, or youtu.be URLs. */
export function youtubeVideoIdFromUrl(url: string): string | null {
  try {
    const u = new URL(url.trim());
    const host = u.hostname.replace(/^www\./, "");
    if (host === "youtu.be") {
      const id = u.pathname.replace(/^\//, "").split("/")[0];
      return id || null;
    }
    if (host.includes("youtube.com") || host === "m.youtube.com") {
      const v = u.searchParams.get("v");
      if (v) return v;
      const shorts = u.pathname.match(/\/shorts\/([^/?]+)/);
      if (shorts?.[1]) return shorts[1];
      const embed = u.pathname.match(/\/embed\/([^/?]+)/);
      if (embed?.[1]) return embed[1];
    }
  } catch {
    return null;
  }
  return null;
}

/** Dashboard / manage endpoints */
export const getPresidentialSuiteManage = (token: string) =>
  fetchCms<PresidentialSuiteDoc | null>("/api/cms/presidential-suite/manage", { token });

export const putPresidentialSuite = (token: string, body: unknown) =>
  fetchCms<PresidentialSuiteDoc>("/api/cms/presidential-suite", {
    method: "PUT",
    token,
    body: JSON.stringify(body),
  });

export const getRoomCardsManage = (token: string) =>
  fetchCms<RoomCardDoc[]>("/api/cms/room-cards/manage", { token });

export const postRoomCard = (token: string, body: unknown) =>
  fetchCms<RoomCardDoc>("/api/cms/room-cards", {
    method: "POST",
    token,
    body: JSON.stringify(body),
  });

export const putRoomCard = (token: string, id: string, body: unknown) =>
  fetchCms<RoomCardDoc>(`/api/cms/room-cards/${encodeURIComponent(id)}`, {
    method: "PUT",
    token,
    body: JSON.stringify(body),
  });

export const deleteRoomCard = (token: string, id: string) =>
  fetch(`${API_BASE}/api/cms/room-cards/${encodeURIComponent(id)}`, {
    method: "DELETE",
    headers: { Authorization: `Bearer ${token}` },
  }).then((res) => {
    if (!res.ok) throw new CmsApiError(res.statusText, res.status, null);
  });

export const getSiteContentManage = (token: string, key = "homepage") =>
  fetchCms<SiteContentDoc | null>(
    `/api/cms/site-content/manage?key=${encodeURIComponent(key)}`,
    { token }
  );

export const putSiteContent = (token: string, body: unknown) =>
  fetchCms<SiteContentDoc>("/api/cms/site-content", {
    method: "PUT",
    token,
    body: JSON.stringify(body),
  });

export const getMembershipTiersManage = (token: string) =>
  fetchCms<MembershipTierDoc[]>("/api/cms/membership-tiers/manage", { token });

export const postMembershipTier = (token: string, body: unknown) =>
  fetchCms<MembershipTierDoc>("/api/cms/membership-tiers", {
    method: "POST",
    token,
    body: JSON.stringify(body),
  });

export const putMembershipTier = (token: string, id: string, body: unknown) =>
  fetchCms<MembershipTierDoc>(`/api/cms/membership-tiers/${encodeURIComponent(id)}`, {
    method: "PUT",
    token,
    body: JSON.stringify(body),
  });

export const deleteMembershipTier = (token: string, id: string) =>
  fetch(`${API_BASE}/api/cms/membership-tiers/${encodeURIComponent(id)}`, {
    method: "DELETE",
    headers: { Authorization: `Bearer ${token}` },
  }).then((res) => {
    if (!res.ok) throw new CmsApiError(res.statusText, res.status, null);
  });

export const getGuestStoriesManage = (token: string) =>
  fetchCms<GuestStoryDoc[]>("/api/cms/guest-stories/manage", { token });

export const postGuestStory = (token: string, body: unknown) =>
  fetchCms<GuestStoryDoc>("/api/cms/guest-stories", {
    method: "POST",
    token,
    body: JSON.stringify(body),
  });

export const putGuestStory = (token: string, id: string, body: unknown) =>
  fetchCms<GuestStoryDoc>(`/api/cms/guest-stories/${encodeURIComponent(id)}`, {
    method: "PUT",
    token,
    body: JSON.stringify(body),
  });

export const deleteGuestStory = (token: string, id: string) =>
  fetch(`${API_BASE}/api/cms/guest-stories/${encodeURIComponent(id)}`, {
    method: "DELETE",
    headers: { Authorization: `Bearer ${token}` },
  }).then((res) => {
    if (!res.ok) throw new CmsApiError(res.statusText, res.status, null);
  });

export const getGalleryCategoriesManage = (token: string) =>
  fetchCms<GalleryCategoryDoc[]>("/api/cms/gallery/categories/manage", { token });

export const postGalleryCategory = (token: string, body: unknown) =>
  fetchCms<GalleryCategoryDoc>("/api/cms/gallery/categories", {
    method: "POST",
    token,
    body: JSON.stringify(body),
  });

export const putGalleryCategory = (token: string, id: string, body: unknown) =>
  fetchCms<GalleryCategoryDoc>(`/api/cms/gallery/categories/${encodeURIComponent(id)}`, {
    method: "PUT",
    token,
    body: JSON.stringify(body),
  });

export const deleteGalleryCategory = (token: string, id: string) =>
  fetch(`${API_BASE}/api/cms/gallery/categories/${encodeURIComponent(id)}`, {
    method: "DELETE",
    headers: { Authorization: `Bearer ${token}` },
  }).then((res) => {
    if (!res.ok) throw new CmsApiError(res.statusText, res.status, null);
  });

export const getGalleryImagesManage = (token: string, categoryId?: string) => {
  const q = categoryId ? `?categoryId=${encodeURIComponent(categoryId)}` : "";
  return fetchCms<GalleryImageDoc[]>(`/api/cms/gallery/images/manage${q}`, { token });
};

export const postGalleryImage = (token: string, body: unknown) =>
  fetchCms<GalleryImageDoc>("/api/cms/gallery/images", {
    method: "POST",
    token,
    body: JSON.stringify(body),
  });

export const putGalleryImage = (token: string, id: string, body: unknown) =>
  fetchCms<GalleryImageDoc>(`/api/cms/gallery/images/${encodeURIComponent(id)}`, {
    method: "PUT",
    token,
    body: JSON.stringify(body),
  });

export const deleteGalleryImage = (token: string, id: string) =>
  fetch(`${API_BASE}/api/cms/gallery/images/${encodeURIComponent(id)}`, {
    method: "DELETE",
    headers: { Authorization: `Bearer ${token}` },
  }).then((res) => {
    if (!res.ok) throw new CmsApiError(res.statusText, res.status, null);
  });

export type UploadImageResult = { secureUrl: string; publicId: string };

export const uploadDashboardImage = async (token: string, file: File): Promise<UploadImageResult> => {
  const form = new FormData();
  form.append("file", file);
  const res = await fetch(`${API_BASE}/api/uploads/image`, {
    method: "POST",
    headers: { Authorization: `Bearer ${token}` },
    body: form,
  });
  const payload = await parseJson<{ data: UploadImageResult }>(res);
  if (!res.ok) throw new CmsApiError("Upload failed", res.status, payload);
  if (!payload?.data) throw new CmsApiError("Upload failed", res.status, payload);
  return payload.data;
};
