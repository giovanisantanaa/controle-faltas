import type { Discipline } from "../types/discipline";
import type { Semester } from "../types/semester";

type ExportPayload = {
  semesters: Semester[];
  disciplines: Discipline[];
};

export function exportData(semesters: Semester[], disciplines: Discipline[]) {
  const payload: ExportPayload = { semesters, disciplines };
  const blob = new Blob([JSON.stringify(payload, null, 2)], {
    type: "application/json",
  });
  const url = URL.createObjectURL(blob);

  const link = document.createElement("a");
  link.href = url;
  link.download = `controle-faltas-${new Date().toISOString().slice(0, 10)}.json`;
  link.click();

  URL.revokeObjectURL(url);
}

export async function parseImportFile(file: File): Promise<ExportPayload> {
  const text = await file.text();
  const parsed: unknown = JSON.parse(text);

  if (
    typeof parsed !== "object" ||
    parsed === null ||
    !Array.isArray((parsed as ExportPayload).semesters) ||
    !Array.isArray((parsed as ExportPayload).disciplines)
  ) {
    throw new Error("Arquivo inválido");
  }

  return parsed as ExportPayload;
}
