const fs = require('fs');
const path = require('path');

const markdownDir = path.join(process.cwd(), 'markdown');
const outputFile = path.join(process.cwd(), 'src', 'data', 'markdown-manifest.ts');

// Ensure data directory exists
const dataDir = path.dirname(outputFile);
if (!fs.existsSync(dataDir)) {
  fs.mkdirSync(dataDir, { recursive: true });
}

function extractNumberFromFilename(filename) {
  // Extract number from filename like "1. example.md" or "11. tutorial.md"
  const match = filename.match(/^(\d+)\.\s*/);
  return match ? parseInt(match[1], 10) : Infinity; // Files without numbers go to the end
}

function getAllMarkdownFiles(dir, basePath = '') {
  const files = [];
  const items = fs.readdirSync(dir, { withFileTypes: true });

  for (const item of items) {
    const fullPath = path.join(dir, item.name);
    const relativePath = path.join(basePath, item.name);

    if (item.isDirectory()) {
      // Recursively get files from subdirectories
      files.push(...getAllMarkdownFiles(fullPath, relativePath));
    } else if (item.isFile() && (item.name.endsWith('.md') || item.name.endsWith('.markdown'))) {
      const content = fs.readFileSync(fullPath, 'utf8');
      const number = extractNumberFromFilename(item.name);
      files.push({
        path: relativePath,
        name: item.name,
        content: content,
        order: number,
      });
    }
  }

  // Sort by number prefix (ascending), then alphabetically for files without numbers
  files.sort((a, b) => {
    if (a.order !== b.order) {
      return a.order - b.order;
    }
    return a.name.localeCompare(b.name);
  });

  return files;
}

try {
  if (!fs.existsSync(markdownDir)) {
    console.warn(`Markdown directory not found: ${markdownDir}`);
    fs.writeFileSync(
      outputFile,
      `// Auto-generated file - do not edit manually
export const markdownFiles: Array<{ path: string; name: string; content: string; order: number }> = [];
export const markdownMap: Record<string, string> = {};
`
    );
    process.exit(0);
  }

  const markdownFiles = getAllMarkdownFiles(markdownDir);

  // Generate TypeScript file
  const filesArray = markdownFiles.map(
    (file) => `  { path: ${JSON.stringify(file.path)}, name: ${JSON.stringify(file.name)}, content: ${JSON.stringify(file.content)}, order: ${file.order} }`
  );

  const mapEntries = markdownFiles.map(
    (file) => `  ${JSON.stringify(file.path)}: ${JSON.stringify(file.content)}`
  );

  const content = `// Auto-generated file - do not edit manually
// Generated at: ${new Date().toISOString()}
// Total files: ${markdownFiles.length}

export const markdownFiles: Array<{ path: string; name: string; content: string; order: number }> = [
${filesArray.join(',\n')}
];

export const markdownMap: Record<string, string> = {
${mapEntries.join(',\n')}
};

// Helper function to get markdown by path
export function getMarkdownByPath(path: string): string | undefined {
  return markdownMap[path];
}

// Helper function to get all paths
export function getAllPaths(): string[] {
  return markdownFiles.map(f => f.path);
}

// Helper function to get next/previous paths
export function getNavigationPaths(currentPath: string | null): { prev: string | null; next: string | null } {
  const paths = getAllPaths();
  if (!currentPath) {
    return { prev: null, next: paths[0] || null };
  }
  const currentIndex = paths.indexOf(currentPath);
  if (currentIndex === -1) {
    return { prev: null, next: paths[0] || null };
  }
  return {
    prev: currentIndex > 0 ? paths[currentIndex - 1] : null,
    next: currentIndex < paths.length - 1 ? paths[currentIndex + 1] : null,
  };
}
`;

  fs.writeFileSync(outputFile, content, 'utf8');
  console.log(`✓ Generated markdown manifest with ${markdownFiles.length} files`);
  console.log(`  Output: ${outputFile}`);
} catch (error) {
  console.error('Error generating markdown manifest:', error);
  process.exit(1);
}

