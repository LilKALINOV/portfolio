import { test, describe } from "node:test";
import assert from "node:assert/strict";

describe("Projects data", () => {
  test("has 6 featured projects", async () => {
    const { projects } = await import("../src/lib/projects.ts");
    const featured = projects.filter((p) => p.featured);
    assert.equal(featured.length, 6, "Expected 6 featured projects");
  });

  test("all projects have required fields", async () => {
    const { projects } = await import("../src/lib/projects.ts");
    for (const project of projects) {
      assert.ok(project.id, `Missing id for ${project.title.en}`);
      assert.ok(project.title.en, `Missing en title for ${project.id}`);
      assert.ok(project.title.ru, `Missing ru title for ${project.id}`);
      assert.ok(project.description.en, `Missing en description for ${project.id}`);
      assert.ok(project.description.ru, `Missing ru description for ${project.id}`);
      assert.ok(project.role.en, `Missing en role for ${project.id}`);
      assert.ok(project.role.ru, `Missing ru role for ${project.id}`);
      assert.ok(project.tech, `Missing tech for ${project.id}`);
      assert.ok(project.url, `Missing url for ${project.id}`);
    }
  });

  test("all projects have valid URLs", async () => {
    const { projects } = await import("../src/lib/projects.ts");
    for (const project of projects) {
      assert.ok(
        project.url.startsWith("http"),
        `Invalid URL for ${project.id}: ${project.url}`
      );
    }
  });
});