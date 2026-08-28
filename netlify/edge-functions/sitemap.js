// Netlify Edge Function: serves /sitemap.xml as real application/xml.
// Proxies the Supabase pd-sitemap function, injects static pages, fixes Content-Type.
export default async () => {
  const res = await fetch(
    "https://kohpsobftjrxdjtnclpx.supabase.co/functions/v1/pd-sitemap"
  );
  let body = await res.text();
  const extra =
    "<url><loc>https://powerdiesel.pro/roadside</loc><changefreq>weekly</changefreq><priority>0.9</priority></url>" +
    "<url><loc>https://powerdiesel.pro/mechanic</loc><changefreq>weekly</changefreq><priority>0.9</priority></url>" +
    "<url><loc>https://powerdiesel.pro/diesel-mechanic-hialeah</loc><changefreq>weekly</changefreq><priority>0.8</priority></url>" +
    "<url><loc>https://powerdiesel.pro/diesel-mechanic-doral</loc><changefreq>weekly</changefreq><priority>0.8</priority></url>" +
    "<url><loc>https://powerdiesel.pro/diesel-mechanic-fort-lauderdale</loc><changefreq>weekly</changefreq><priority>0.8</priority></url>" +
    "<url><loc>https://powerdiesel.pro/diesel-mechanic-homestead</loc><changefreq>weekly</changefreq><priority>0.8</priority></url>" +
    "<url><loc>https://powerdiesel.pro/diesel-repair-i95-miami</loc><changefreq>weekly</changefreq><priority>0.8</priority></url>" +
    "<url><loc>https://powerdiesel.pro/diesel-repair-i75-miami</loc><changefreq>weekly</changefreq><priority>0.8</priority></url>" +
    "<url><loc>https://powerdiesel.pro/diesel-repair-florida-turnpike-miami</loc><changefreq>weekly</changefreq><priority>0.8</priority></url>";
  if (body.includes("</urlset>")) {
    body = body.replace("</urlset>", extra + "</urlset>");
  }
  return new Response(body, {
    status: res.status,
    headers: {
      "content-type": "application/xml; charset=utf-8",
      "cache-control": "public, max-age=600",
    },
  });
};

export const config = { path: "/sitemap.xml" };
