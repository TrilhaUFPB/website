import assert from "node:assert/strict";
const landing = process.env.TRILHA_TEST_URL || "http://localhost:4318";
const campus = process.env.UFPB_TEST_URL || "http://localhost:4319";
for (const [base, routes] of [
  [landing, ["/", "/historia", "/equipe", "/ufpe"]],
  [campus, ["/", "/aulas", "/materiais", "/turmas/2024.1"]],
]) {
  for (const route of routes) {
    const response = await fetch(base + route);
    assert.equal(response.status, 200, base + route);
    const body = await response.text();
    for (const match of body.matchAll(
      /<img[^>]+src="(\/(?:assets|community|campus)\/[^"?]+)"/g,
    )) {
      assert.equal(
        (await fetch(base + match[1], { method: "HEAD" })).status,
        200,
        match[1],
      );
    }
  }
}
for (const route of [
  "/ufpb",
  "/aulas",
  "/materiais",
  "/turmas/2024.1",
  "/admin",
]) {
  const response = await fetch(landing + route, { redirect: "manual" });
  assert.equal(response.status, 307, route);
  const target = new URL(response.headers.get("location"));
  assert.equal(target.origin, new URL(campus).origin);
  assert.equal(target.pathname, route === "/ufpb" ? "/" : route);
}
const admin = await fetch(campus + "/admin", { redirect: "manual" });
assert.equal(admin.status, 307);
assert.equal(
  new URL(admin.headers.get("location"), campus).pathname,
  "/admin/login",
);
console.log(
  "Both sites, image assets, legacy redirects and admin protection passed.",
);
