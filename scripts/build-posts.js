// Reads Blog/*.md, Blog/US/*.md, Blog/AU/*.md — parses frontmatter + markdown, writes src/data/posts.js
import { readdirSync, readFileSync, writeFileSync, existsSync } from "fs";
import { join, dirname } from "path";
import { fileURLToPath } from "url";
import { marked } from "marked";

const __dirname = dirname(fileURLToPath(import.meta.url));
const root = join(__dirname, "..");
const outFile = join(root, "src", "data", "posts.js");

function parseFrontmatter(content) {
  const match = content.match(/^---\n([\s\S]*?)\n---\n([\s\S]*)$/);
  if (!match) return { meta: {}, body: content };
  const meta = {};
  for (const line of match[1].split("\n")) {
    const idx = line.indexOf(":");
    if (idx === -1) continue;
    const key = line.slice(0, idx).trim();
    let val = line.slice(idx + 1).trim();
    if (val.startsWith('"') && val.endsWith('"')) val = val.slice(1, -1);
    meta[key] = val;
  }
  return { meta, body: match[2] };
}

function readPosts(dir, market) {
  if (!existsSync(dir)) return [];
  const files = readdirSync(dir).filter(f => f.endsWith(".md")).sort();
  const posts = [];
  for (const file of files) {
    const raw = readFileSync(join(dir, file), "utf-8");
    const { meta, body } = parseFrontmatter(raw);
    if (!meta.title || !meta.slug) continue;
    const html = marked.parse(body, { gfm: true, breaks: false });
    posts.push({
      slug: meta.slug,
      title: meta.title,
      excerpt: meta.excerpt || "",
      date: meta.date || "2026-04-05",
      category: meta.category || "Guide",
      market,
      wordcount: parseInt(meta.wordcount) || 0,
      cluster: meta.cluster || "",
      priority: meta.priority || "",
      author: meta.author || "Pluggedin.solar",
      html,
    });
  }
  return posts;
}

const ukPosts = readPosts(join(root, "Blog"), "uk");
const usPosts = readPosts(join(root, "Blog", "US"), "us");
const auPosts = readPosts(join(root, "Blog", "AU"), "au");
const allPosts = [...ukPosts, ...usPosts, ...auPosts];

// Sort by date descending (newest first)
allPosts.sort((a, b) => b.date.localeCompare(a.date));

const output = `// AUTO-GENERATED — do not edit. Run "npm run posts" to rebuild from Blog/**/*.md
const posts = ${JSON.stringify(allPosts, null, 2)};
export default posts;
`;

writeFileSync(outFile, output, "utf-8");
console.log(`Built ${allPosts.length} posts (${ukPosts.length} UK, ${usPosts.length} US, ${auPosts.length} AU) → src/data/posts.js`);
