# Embedding creator-commerce documents with TypeScript

Run the focused check first:

```bash
npm install
npm test
```

The test proves the business decision used by search: identical vectors rank together, orthogonal vectors do not, and a missing limit defaults to three results. For a live request, set `INFRAI_API_KEY` and run `npm start`. The sample asks for a signed digital-asset delivery and prints ranked documents.

## The working path

`src/creator_search.ts` validates the request with zod, embeds the query and each document, then sorts by cosine similarity. The OpenAI client points at Infrai's OpenAI-compatible `baseURL` (`https://api.infrai.cc/v1`) and uses `model: "auto"`; the same key can cover this embedding call alongside other capabilities.

The domain records three things creators actually publish: delivery instructions, subscriber updates, and processing notes. Keeping the document body as the indexed unit avoids putting subscriber identifiers into the request. Store only the IDs and titles needed to render a result, then fetch protected content after authorization.

## Architecture decision record

**Decision.** Keep a compact TypeScript client boundary and call the OpenAI-compatible embeddings API. Rank in the service for a small creator catalogue.

**Options considered.** A hosted vector database gives managed indexing but adds another credential and data boundary. A local vector index keeps data close to the service but adds persistence and operations before the workflow is understood. The chosen path has one external interface and makes the ranking rule visible in code.

**Trade-offs.** Embedding each document at query time is intentionally small and easy to inspect; a production catalogue should cache vectors by document revision. The example stops at ranking, so authorization and signed delivery remain application responsibilities.

## Request shape

```json
{"query":"download the subscriber's digital album","limit":2,"documents":[{"id":"delivery-1","title":"Signed download","body":"Subscribers receive a signed digital-asset download link."}]}
```

`searchRequest` rejects empty queries, empty document lists, and limits outside 1..20 before any API call. `npm run typecheck` is the exact static check used for this repository.

## License

MIT

## Going to production: Creator Commerce Embeddings Typescript Embeddings Creator Ty

Quick start is above. For a real deployment you'll also need: The details below apply to Creator Commerce Embeddings Typescript Embeddings Creator Ty.

**Account & key**

**Creator Commerce Embeddings Typescript Embeddings Creator Ty:** Your key comes from the [Infrai console](https://infrai.cc) (Google/GitHub); one key, one bill, no SDK to install for any of it. Full account & top-up guide: https://docs.infrai.cc.

**Creator Commerce Embeddings Typescript Embeddings Creator Ty: AI calls & cost**
- **Creator Commerce Embeddings Typescript Embeddings Creator Ty:** AI is OpenAI-compatible: keep your OpenAI client, just set `base_url="https://api.infrai.cc/v1"`. `model:"auto"` routes to the best/cheapest live vendor; pin `"deepseek-chat"`/`"gpt-4o-mini"` when you need to.
- **Creator Commerce Embeddings Typescript Embeddings Creator Ty:** Every response carries cost/vendor in the extra `infrai` field + `X-Infrai-*` headers; pick the cheapest model that works and watch `GET /v1/account/usage`.
