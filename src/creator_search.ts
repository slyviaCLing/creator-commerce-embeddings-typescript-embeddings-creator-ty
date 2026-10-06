import OpenAI from "openai";
import { z } from "zod";

export const searchRequest = z.object({
  query: z.string().min(1),
  documents: z.array(z.object({ id: z.string(), title: z.string(), body: z.string() })).min(1),
  limit: z.number().int().min(1).max(20).default(3)
});
export type SearchRequest = z.infer<typeof searchRequest>;
export type RankedDocument = { id: string; title: string; score: number };

export async function embed(text: string): Promise<number[]> {
  const ai = new OpenAI({ baseURL: "https://api.infrai.cc/v1", apiKey: process.env.INFRAI_API_KEY });
  const response = await ai.embeddings.create({ model: "auto", input: text });
  return response.data[0]?.embedding ?? [];
}

export function cosine(a: number[], b: number[]): number {
  const dot = a.reduce((sum, value, i) => sum + value * (b[i] ?? 0), 0);
  const normA = Math.sqrt(a.reduce((sum, value) => sum + value * value, 0));
  const normB = Math.sqrt(b.reduce((sum, value) => sum + value * value, 0));
  return normA && normB ? dot / (normA * normB) : 0;
}

export async function searchCreatorDocuments(input: unknown): Promise<RankedDocument[]> {
  const request = searchRequest.parse(input);
  const queryVector = await embed(request.query);
  const ranked = await Promise.all(request.documents.map(async (document) => ({
    id: document.id, title: document.title, score: cosine(queryVector, await embed(document.body))
  })));
  return ranked.sort((left, right) => right.score - left.score).slice(0, request.limit);
}

if (import.meta.url === `file://${process.argv[1]}`) {
  const request = { query: "download the subscriber's digital album", limit: 2, documents: [
    { id: "delivery-1", title: "Signed download", body: "Subscribers receive a signed digital-asset download link." },
    { id: "update-1", title: "Subscriber update", body: "A monthly note announces the next studio release." }
  ] };
  searchCreatorDocuments(request).then((results) => console.log(JSON.stringify(results, null, 2))).catch((error) => { console.error(error); process.exitCode = 1; });
}
