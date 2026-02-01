import { NextRequest, NextResponse } from "next/server";
import fs from "fs";
import path from "path";

export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ path: string[] }> }
) {
  try {
    // Await params no Next.js 15
    const resolvedParams = await params;
    
    // Construir o caminho para o arquivo
    const filePath = path.join(
      process.cwd(),
      "src/content/materiais",
      ...resolvedParams.path
    );

    // Verificar se o arquivo existe
    if (!fs.existsSync(filePath)) {
      return new NextResponse("Arquivo não encontrado", { status: 404 });
    }

    // Verificar se é um arquivo (não um diretório)
    const stats = fs.statSync(filePath);
    if (!stats.isFile()) {
      return new NextResponse("Não é um arquivo", { status: 400 });
    }

    // Ler o arquivo
    const fileBuffer = fs.readFileSync(filePath);

    // Determinar o tipo de conteúdo baseado na extensão
    const ext = path.extname(filePath).toLowerCase();
    const contentTypes: Record<string, string> = {
      ".png": "image/png",
      ".jpg": "image/jpeg",
      ".jpeg": "image/jpeg",
      ".gif": "image/gif",
      ".webp": "image/webp",
      ".svg": "image/svg+xml",
      ".pdf": "application/pdf",
    };

    const contentType = contentTypes[ext] || "application/octet-stream";

    // Retornar o arquivo com cache headers
    return new NextResponse(fileBuffer, {
      status: 200,
      headers: {
        "Content-Type": contentType,
        "Cache-Control": "public, max-age=31536000, immutable",
      },
    });
  } catch (error) {
    console.error("Erro ao servir arquivo:", error);
    return new NextResponse("Erro interno", { status: 500 });
  }
}
