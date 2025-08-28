export const directusAsset = (id?: string, params: Record<string,string|number> = {}) => {
  if (!id) return '';
  const base = useRuntimeConfig().public.directusUrl;
  const q = new URLSearchParams(params as any).toString();
  return `${base}/assets/${id}${q ? `?${q}` : ''}`;
};