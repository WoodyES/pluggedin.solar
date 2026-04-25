// Generates sitemap.xml from all routes + blog post slugs
import { readdirSync, readFileSync, writeFileSync, existsSync } from "fs";
import { join, dirname } from "path";
import { fileURLToPath } from "url";

const __dirname = dirname(fileURLToPath(import.meta.url));
const root = join(__dirname, "..");
const outFile = join(root, "public", "sitemap.xml");
const DOMAIN = "https://pluggedin.solar";
const today = new Date().toISOString().split("T")[0];

function getSlugs(dir) {
  if (!existsSync(dir)) return [];
  return readdirSync(dir)
    .filter(f => f.endsWith(".md"))
    .map(f => {
      const raw = readFileSync(join(dir, f), "utf-8");
      const match = raw.match(/^---\n([\s\S]*?)\n---/);
      if (!match) return null;
      const slugLine = match[1].split("\n").find(l => l.startsWith("slug:"));
      if (!slugLine) return null;
      let slug = slugLine.split(":").slice(1).join(":").trim();
      if (slug.startsWith('"') && slug.endsWith('"')) slug = slug.slice(1, -1);
      const dateLine = match[1].split("\n").find(l => l.startsWith("date:"));
      let date = today;
      if (dateLine) {
        date = dateLine.split(":").slice(1).join(":").trim().replace(/"/g, "");
      }
      return { slug, date };
    })
    .filter(Boolean);
}

const urls = [];

// Static pages
urls.push({ loc: "/", priority: "1.0", changefreq: "weekly" });
urls.push({ loc: "/calculator", priority: "0.9", changefreq: "monthly" });
urls.push({ loc: "/report", priority: "0.9", changefreq: "monthly" });
urls.push({ loc: "/quiz", priority: "0.8", changefreq: "monthly" });
urls.push({ loc: "/blog", priority: "0.8", changefreq: "daily" });
urls.push({ loc: "/about", priority: "0.6", changefreq: "monthly" });
urls.push({ loc: "/faq", priority: "0.7", changefreq: "monthly" });

// UK blog posts
for (const { slug, date } of getSlugs(join(root, "Blog"))) {
  urls.push({ loc: `/blog/${slug}`, lastmod: date, priority: "0.7", changefreq: "monthly" });
}

// US routes + blog posts
urls.push({ loc: "/us/blog", priority: "0.8", changefreq: "daily" });
for (const { slug, date } of getSlugs(join(root, "Blog", "US"))) {
  urls.push({ loc: `/us/blog/${slug}`, lastmod: date, priority: "0.6", changefreq: "monthly" });
}

// AU routes + blog posts
urls.push({ loc: "/au/blog", priority: "0.8", changefreq: "daily" });
for (const { slug, date } of getSlugs(join(root, "Blog", "AU"))) {
  urls.push({ loc: `/au/blog/${slug}`, lastmod: date, priority: "0.6", changefreq: "monthly" });
}

const xml = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${urls.map(u => `  <url>
    <loc>${DOMAIN}${u.loc}</loc>${u.lastmod ? `\n    <lastmod>${u.lastmod}</lastmod>` : `\n    <lastmod>${today}</lastmod>`}
    <changefreq>${u.changefreq}</changefreq>
    <priority>${u.priority}</priority>
  </url>`).join("\n")}
</urlset>
`;

writeFileSync(outFile, xml, "utf-8");
console.log(`Sitemap: ${urls.length} URLs → public/sitemap.xml`);
