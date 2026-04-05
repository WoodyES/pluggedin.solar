// Reads all Blog/*.md files, parses frontmatter + markdown, writes src/data/posts.js
import { readdirSync, readFileSync, writeFileSync } from "fs";
import { join, dirname } from "path";
import { fileURLToPath } from "url";
import { marked } from "marked";

const __dirname = dirname(fileURLToPath(import.meta.url));
const blogDir = join(__dirname, "..", "Blog");
const outFile = join(__dirname, "..", "src", "data", "posts.js");

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

const files = readdirSync(blogDir).filter(f => f.endsWith(".md")).sort();
const posts = [];

for (const file of files) {
  const raw = readFileSync(join(blogDir, file), "utf-8");
  const { meta, body } = parseFrontmatter(raw);
  if (!meta.title || !meta.slug) continue;
  const html = marked.parse(body, { gfm: true, breaks: false });
  posts.push({
    slug: meta.slug,
    title: meta.title,
    excerpt: meta.excerpt || "",
    date: meta.date || "2026-04-05",
    category: meta.category || "Guide",
    html,
  });
}

// Sort by date descending (newest first)
posts.sort((a, b) => b.date.localeCompare(a.date));

const output = `// AUTO-GENERATED — do not edit. Run "npm run posts" to rebuild from Blog/*.md
const posts = ${JSON.stringify(posts, null, 2)};
export default posts;
`;

writeFileSync(outFile, output, "utf-8");
console.log(`Built ${posts.length} posts → src/data/posts.js`);
