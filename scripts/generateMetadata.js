import fs from 'fs';
import path from 'path';
import matter from 'gray-matter';

const blogDir = path.join(process.cwd(), 'blog');
const metadataFile = path.join(blogDir, 'metadata.json');

const files = fs.readdirSync(blogDir).filter((file) => file.endsWith('.md'));

const metadata = files.map((filename) => {
  const fileContent = fs.readFileSync(path.join(blogDir, filename), 'utf-8');
  const { data } = matter(fileContent);

  return {
    ...data,
    slug: filename.replace('.md', ''),
  };
});

fs.writeFileSync(metadataFile, JSON.stringify(metadata, null, 2));

console.log('✅ metadata.json berhasil di-generate!');
