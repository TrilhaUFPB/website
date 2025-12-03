import MaterialViewer from '@/components/MaterialViewer';
import { getMarkdownByPath, getAllPaths } from '@/data/markdown-manifest';

export default function MaterialPage() {
  // Get all available paths
  const allPaths = getAllPaths();
  
  // Default to first markdown file if available
  const defaultPath = allPaths.length > 0 ? allPaths[0] : null;
  const defaultContent = defaultPath 
    ? getMarkdownByPath(defaultPath) || '# Arquivo não encontrado\n\nO arquivo solicitado não foi encontrado.'
    : '# Nenhum conteúdo disponível\n\nNenhum arquivo markdown foi encontrado na pasta `markdown/`.';

  return (
    <MaterialViewer 
      content={defaultContent} 
      currentPath={defaultPath}
      allPaths={allPaths}
    />
  );
}
