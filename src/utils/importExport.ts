import type { Discipline } from "../types/discipline";
import type { Semester } from "../types/semester";

type ExportPayload = {
  semesters: Semester[];
  disciplines: Discipline[];
};

export function serializeData(semesters: Semester[], disciplines: Discipline[]) {
  const payload: ExportPayload = { semesters, disciplines };
  return JSON.stringify(payload, null, 2);
}

export function exportData(semesters: Semester[], disciplines: Discipline[]) {
  const blob = new Blob([serializeData(semesters, disciplines)], {
    type: "application/json",
  });
  const url = URL.createObjectURL(blob);

  const link = document.createElement("a");
  link.href = url;
  link.download = `controle-faltas-${new Date().toISOString().slice(0, 10)}.json`;
  link.click();

  URL.revokeObjectURL(url);
}

export function parseImportText(text: string): ExportPayload {
  const parsed: unknown = JSON.parse(text);

  if (
    typeof parsed !== "object" ||
    parsed === null ||
    !Array.isArray((parsed as ExportPayload).semesters) ||
    !Array.isArray((parsed as ExportPayload).disciplines)
  ) {
    throw new Error("Dados inválidos");
  }

  return parsed as ExportPayload;
}

export async function parseImportFile(file: File): Promise<ExportPayload> {
  return parseImportText(await file.text());
}
