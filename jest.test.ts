import { it } from "@jest/globals";
import { parseQuery } from "libpg-query";

it("should not throw segfault", async () => {
    await parseQuery("SELECT 1");
})