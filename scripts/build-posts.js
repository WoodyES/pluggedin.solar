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
    // Calculate wordcount from body text (strip HTML tags and count words)
    const plainText = body.replace(/<[^>]+>/g, " ").replace(/[#*_\[\]()>`~|\\-]/g, " ");
    const wordcount = plainText.split(/\s+/).filter(w => w.length > 0).length;
    // Extract FAQ pairs from question-style headings (## or ### ending with ?)
    const faq = [];
    const lines = body.split("\n");
    for (let i = 0; i < lines.length; i++) {
      const hMatch = lines[i].match(/^#{2,3}\s+(.+\?)\s*$/);
      if (hMatch) {
        const question = hMatch[1].replace(/^\d+\.\s*/, "").trim();
        // Collect answer lines until next heading or end
        const answerLines = [];
        for (let j = i + 1; j < lines.length; j++) {
          if (/^#{1,3}\s/.test(lines[j])) break;
          const line = lines[j].trim();
          if (line && !line.startsWith("<div class=\"product-card")) {
            answerLines.push(line);
          }
          if (answerLines.length >= 4) break; // Cap at ~4 lines for a concise answer
        }
        if (answerLines.length > 0) {
          // Strip markdown formatting for plain text answer
          const answer = answerLines.join(" ")
            .replace(/\[([^\]]+)\]\([^)]+\)/g, "$1")
            .replace(/\*\*([^*]+)\*\*/g, "$1")
            .replace(/\*([^*]+)\*/g, "$1")
            .replace(/<[^>]+>/g, "")
            .substring(0, 300);
          faq.push({ q: question, a: answer });
        }
      }
    }
    posts.push({
      slug: meta.slug,
      title: meta.title,
      excerpt: meta.excerpt || "",
      date: meta.date || "2026-04-05",
      category: meta.category || "Guide",
      market,
      wordcount,
      cluster: meta.cluster || "",
      priority: meta.priority || "",
      lastmod: meta.lastmod || meta.date || "2026-04-05",
      author: meta.author || "Pluggedin.solar",
      faq: faq.length >= 3 ? faq : [],
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
