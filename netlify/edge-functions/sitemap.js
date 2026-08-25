export default async () => {
const res = await fetch("https://kohpsobftjrxdjtnclpx.supabase.co/functions/v1/pd-sitemap");
const body = await res.text();
return new Response(body, { status: res.status, headers: { "content-type": "application/xml; charset=utf-8", "cache-control": "public, max-age=600" } });
};
export const config = { path: "/sitemap.xml" };
