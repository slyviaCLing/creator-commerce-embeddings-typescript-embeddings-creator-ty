import assert from "node:assert/strict";
import { cosine, searchRequest } from "../src/creator_search.js";

assert.equal(cosine([1, 0], [1, 0]), 1);
assert.equal(cosine([1, 0], [0, 1]), 0);
assert.deepEqual(searchRequest.parse({ query: "release", documents: [{ id: "a", title: "A", body: "text" }] }).limit, 3);
console.log("creator search boundary and ranking decision pass");
