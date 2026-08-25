export default async (request) => {
const url = new URL(request.url);
const slug = decodeURIComponent(url.pathname.replace(/^\/archivo\//, "").replace(/\/+$/, "").replace(/\.html$/, ""));
if (!slug) return Response.redirect("https://powerdiesel.pro/#tienda", 302);
const upstream = "https://kohpsobftjrxdjtnclpx.supabase.co/functions/v1/pd-product?slug=" + encodeURIComponent(slug);
const res = await fetch(upstream, { headers: { accept: "text/html" } });
const body = await res.text();
return new Response(body, { status: res.status, headers: { "content-type": "text/html; charset=utf-8", "cache-control": "public, max-age=300", "x-robots-tag": "index, follow" } });
};
export const config = { path: "/archivo/*" };
