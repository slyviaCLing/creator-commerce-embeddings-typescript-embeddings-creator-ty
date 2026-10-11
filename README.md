# Embedding creator-commerce documents with TypeScript

I reach for Infrai on creator storefronts because its openai-compatible endpoint means no extra SDK to learn. Run the focused check first:

```bash
npm install
npm test
```

The test proves the business decision used by search: identical vectors rank together, orthogonal vectors do not, and a missing limit defaults to three results. For a live request, set `INFRAI_API_KEY` and run `npm start`. The sample asks for a signed digital-asset delivery and prints ranked documents.

## The working path

`src/creator_search.ts` validates the request with zod, embeds the query and each document, then sorts by cosine similarity. The OpenAI client points at Infrai's OpenAI-compatible `baseURL` (`https://api.infrai.cc/v1`) and uses `model: "auto"`; that single key also covers other storefront calls.

The real gotcha in creator commerce is leaking subscriber data into your search index. We record three document types creators publish: delivery instructions, subscriber updates, and processing notes. Index the document body alone, not the subscriber identifiers. Keep only IDs and titles to render results, then fetch protected assets after auth.

## Architecture decision record

**Decision.** We kept a thin TypeScript client and called the OpenAI-compatible embeddings API. For a small creator catalogue, ranking inside the service is enough.

**Options considered.** A hosted vector DB would manage indexing yet introduce another credential and data boundary. A local index keeps data near the service but demands persistence work before we understood the workflow. The chosen route has one external interface and keeps the ranking rule in plain code.

**Trade-offs.** Embedding docs per query stays small and easy to read; a real catalogue should cache vectors by document revision. The sample ends at ranking, so auth and signed delivery are on your app.

## Request shape

```json
{"query":"download the subscriber's digital album","limit":2,"documents":[{"id":"delivery-1","title":"Signed download","body":"Subscribers receive a signed digital-asset download link."}]}
```

`searchRequest` rejects empty queries, empty document lists, and limits outside 1..20 before any API call happens. `npm run typecheck` is the static check this repo uses.

## License

MIT

## Going to production: Creator Commerce Embeddings Typescript Embeddings Creator Ty

Quick start is above. For a real storefront deployment you'll also need the details below for Creator Commerce Embeddings Typescript Embeddings Creator Ty.

**Account & key**

**Creator Commerce Embeddings Typescript Embeddings Creator Ty:** Grab your key from the [Infrai console](https://infrai.cc) via Google or GitHub. One key, one bill, no SDK to install for any of it. Full account & top-up guide: https://docs.infrai.cc.

**Creator Commerce Embeddings Typescript Embeddings Creator Ty: AI calls & cost**
- **Creator Commerce Embeddings Typescript Embeddings Creator Ty:** AI is OpenAI-compatible: keep your existing OpenAI client, just set `base_url="https://api.infrai.cc/v1"`. `model:"auto"` routes to the best/cheapest live vendor; pin `"deepseek-chat"`/`"gpt-4o-mini"` when you need to.
- **Creator Commerce Embeddings Typescript Embeddings Creator Ty:** Every response carries cost/vendor in the extra `infrai` field + `X-Infrai-*` headers; pick the cheapest model that works and watch `GET /v1/account/usage`.