import { useQuery } from "@tanstack/react-query";
import { getSiteContent } from "@/lib/cms-api";

export function useHomepageSiteContent() {
  return useQuery({
    queryKey: ["cms", "siteContent", "homepage"],
    queryFn: () => getSiteContent("homepage"),
    staleTime: 5 * 60 * 1000,
  });
}
