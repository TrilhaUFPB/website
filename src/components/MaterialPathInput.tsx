"use client";

import { useSearchParams } from "next/navigation";
import { useState, useEffect } from "react";

interface MaterialPathInputProps {
  allPaths?: string[];
  onPathChange?: (path: string) => void;
}

export default function MaterialPathInput({ allPaths = [], onPathChange }: MaterialPathInputProps) {
  const searchParams = useSearchParams();
  const currentPath = searchParams.get("path") || "";
  const [path, setPath] = useState(currentPath);

  useEffect(() => {
    const urlPath = searchParams.get("path") || "";
    setPath(urlPath);
  }, [searchParams]);

  const handleLoad = () => {
    const url = new URL(window.location.href);
    if (path.trim()) {
      url.searchParams.set("path", path.trim());
    } else {
      url.searchParams.delete("path");
    }
    window.history.pushState({}, "", url.toString());
    if (onPathChange) {
      onPathChange(path.trim());
    }
    // Trigger a custom event to notify MaterialViewer
    window.dispatchEvent(new CustomEvent('pathChange', { detail: path.trim() }));
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === "Enter") {
      handleLoad();
    }
  };

  return (
    <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md p-6 mb-6 border border-gray-200 dark:border-gray-700">
      <h3 className="text-lg font-semibold text-AzulMeiaNoite mb-4 font-poppins">Carregar Markdown</h3>
      
      <div className="space-y-4">
        <div>
          <label htmlFor="path-input" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
            Caminho do Markdown {allPaths.length > 0 && `(${allPaths.length} arquivos disponíveis)`}
          </label>
          <div className="flex gap-2">
            <select
              value={path}
              onChange={(e) => setPath(e.target.value)}
              className="flex-1 px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-md focus:ring-2 focus:ring-AzulCeu focus:border-AzulCeu dark:bg-gray-700 dark:text-white"
            >
              <option value="">Selecione um arquivo...</option>
              {allPaths.map((p) => (
                <option key={p} value={p}>
                  {p}
                </option>
              ))}
            </select>
            <input
              id="path-input"
              type="text"
              value={path}
              onChange={(e) => setPath(e.target.value)}
              onKeyPress={handleKeyPress}
              placeholder="example.md ou pasta/arquivo.md"
              className="flex-1 px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-md focus:ring-2 focus:ring-AzulCeu focus:border-AzulCeu dark:bg-gray-700 dark:text-white"
            />
            <button
              onClick={handleLoad}
              className="px-6 py-2 bg-AzulEletrico text-white rounded-md hover:bg-AzulCeu transition-colors font-semibold whitespace-nowrap"
            >
              Carregar
            </button>
          </div>
          <p className="mt-1 text-xs text-gray-500 dark:text-gray-400">
            Caminho relativo ao diretório markdown/ ({allPaths.length} arquivos disponíveis)
          </p>
        </div>
      </div>
    </div>
  );
}

