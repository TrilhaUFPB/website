import { parse } from "yaml";
import { z } from "zod";

const QuizOptionSchema = z.object({
  texto: z.string().min(1, 'O campo "texto" da opção não pode ser vazio'),
  correta: z.boolean().optional().default(false),
  explicacao: z.string().optional(),
});

const QuizSchema = z
  .object({
    tipo: z.enum(["single", "multiple"]).optional().default("single"),
    pergunta: z.string().min(1, 'O campo "pergunta" é obrigatório'),
    opcoes: z.array(QuizOptionSchema).min(2, "O quiz precisa de pelo menos 2 opções"),
  })
  .superRefine((data, ctx) => {
    const correctCount = data.opcoes.filter((o) => o.correta).length;
    if (correctCount === 0) {
      ctx.addIssue({
        code: z.ZodIssueCode.custom,
        message: 'Pelo menos uma opção precisa ter "correta: true"',
      });
    }
    if (data.tipo === "single" && correctCount > 1) {
      ctx.addIssue({
        code: z.ZodIssueCode.custom,
        message: "Um quiz de seleção única deve ter exatamente uma opção correta",
      });
    }
  });

export type QuizData = z.infer<typeof QuizSchema>;
export type QuizOption = z.infer<typeof QuizOptionSchema>;

export type ParseResult =
  | { success: true; data: QuizData }
  | { success: false; error: string };

export function parseQuiz(rawYaml: string): ParseResult {
  try {
    const parsed = parse(rawYaml);
    const result = QuizSchema.safeParse(parsed);
    if (!result.success) {
      const messages = result.error.issues.map((i) => i.message).join("; ");
      return { success: false, error: `Dados inválidos: ${messages}` };
    }
    return { success: true, data: result.data };
  } catch (e) {
    return {
      success: false,
      error: `YAML inválido: ${e instanceof Error ? e.message : "erro de sintaxe"}`,
    };
  }
}
