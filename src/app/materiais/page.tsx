import { getAllMaterials, getMaterialsByArea } from "@/lib/materials";
import Link from "next/link";
import { FileText, ArrowRight, BookOpen, Code, Database, Server, Globe } from "lucide-react";

// Mapeamento de ícones por área
const areaIcons: Record<string, React.ReactNode> = {
  "python-basico": <Code className="w-5 h-5" />,
  "frontend": <Globe className="w-5 h-5" />,
  "backend": <Server className="w-5 h-5" />,
  "dados": <FileText className="w-5 h-5" />,
  "banco-de-dados": <Database className="w-5 h-5" />,
};

export default async function MaterialsIndexPage() {
  const areas = await getMaterialsByArea();
  const allMaterials = await getAllMaterials();

  return (
    <div className="space-y-4">
      {/* Hero section */}
      <div className="bg-gradient-to-br from-AzulCeu/10 to-AzulEletrico/5 dark:from-AzulCeu/5 dark:to-AzulEletrico/10 rounded-xl p-6 md:p-8">
        <h1 className="text-2xl md:text-3xl lg:text-4xl font-bold text-AzulMeiaNoite dark:text-white mb-3 leading-tight">
          Materiais Didáticos
        </h1>
        <p className="text-sm md:text-base text-gray-700 dark:text-gray-300 max-w-none leading-relaxed mb-1">
          Bem-vindo à biblioteca completa de materiais educacionais do Trilha UFPB. Aqui você encontra conteúdos cuidadosamente organizados e estruturados para auxiliar seus estudos e desenvolvimento em computação.
        </p>

        <div className="flex flex-wrap gap-4">
          <div className="flex items-center gap-2 text-xs text-gray-600 dark:text-gray-300 font-medium">
            <FileText className="w-3 h-3 text-AzulCeu flex-shrink-0" />
            <span>{allMaterials.length} materiais disponíveis</span>
          </div>
          <div className="flex items-center gap-2 text-xs text-gray-600 dark:text-gray-300 font-medium">
            <BookOpen className="w-3 h-3 text-AzulCeu flex-shrink-0" />
            <span>{areas.filter(a => a.materials.length > 0).length} áreas</span>
          </div>
        </div>
      </div>

      {/* Quick start */}
      {allMaterials.length > 0 && (
        <div className="bg-white dark:bg-slate-900 rounded-lg border border-gray-200 dark:border-slate-800 p-4">
          <h2 className="text-sm font-semibold text-AzulMeiaNoite dark:text-white mb-2 flex items-center gap-2">
            <ArrowRight className="w-3 h-3 text-AzulCeu" />
            Comece por aqui
          </h2>
          <Link
            href={`/materiais/${allMaterials[0].area}/${allMaterials[0].slug}`}
            className="inline-flex items-center gap-2 px-3 py-1.5 bg-AzulEletrico text-white rounded-lg text-xs hover:bg-AzulEletrico/90 transition-colors"
          >
            <FileText className="w-3 h-3" />
            {allMaterials[0].title}
          </Link>
        </div>
      )}

      {/* Lista por áreas */}
      <div className="space-y-4">
        <h2 className="text-lg font-bold text-AzulMeiaNoite dark:text-white">
          Explorar por área
        </h2>

        {areas.some(a => a.materials.length > 0) ? (
          <div className="grid gap-4 md:grid-cols-2">
            {areas.filter(area => area.materials.length > 0).map((area) => (
              <div
                key={area.slug}
                className="bg-white dark:bg-slate-900 rounded-lg border border-gray-200 dark:border-slate-800 p-4 hover:shadow-md transition-shadow"
              >
                <div className="flex items-center gap-2 mb-3">
                  <div className="p-1.5 bg-AzulCeu/10 dark:bg-AzulCeu/20 rounded-lg text-AzulEletrico dark:text-AzulCeu">
                    {areaIcons[area.slug] || <BookOpen className="w-3 h-3" />}
                  </div>
                  <h3 className="text-sm font-semibold text-AzulMeiaNoite dark:text-white">
                    {area.name}
                  </h3>
                  <span className="ml-auto text-xs text-gray-500 dark:text-gray-400">
                    {area.materials.length} {area.materials.length === 1 ? "material" : "materiais"}
                  </span>
                </div>
                
                <ul className="space-y-1">
                  {area.materials.map((material) => (
                    <li key={material.slug}>
                      <Link
                        href={`/materiais/${material.area}/${material.slug}`}
                        className="flex items-center gap-2 text-xs text-gray-600 dark:text-gray-400 hover:text-AzulEletrico dark:hover:text-AzulCeu transition-colors group"
                      >
                        <FileText className="w-2.5 h-2.5 flex-shrink-0" />
                        <span className="truncate">{material.title}</span>
                        <ArrowRight className="w-2.5 h-2.5 ml-auto opacity-0 group-hover:opacity-100 transition-opacity" />
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        ) : (
          <div className="text-center py-8 bg-gray-50 dark:bg-slate-900 rounded-lg">
            <FileText className="w-10 h-10 mx-auto text-gray-300 dark:text-slate-700 mb-2" />
            <h3 className="text-sm font-medium text-gray-600 dark:text-gray-400 mb-1">
              Nenhum material disponível ainda
            </h3>
            <p className="text-xs text-gray-500 dark:text-gray-500">
              Os materiais serão adicionados em breve.
            </p>
          </div>
        )}
      </div>
    </div>
  );
}
