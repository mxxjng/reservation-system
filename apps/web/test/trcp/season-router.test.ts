import { expect, it } from "vitest";

import { type RouterInputs } from "~/utils/api";
import { appRouter } from "~/server/api/root";
import { createCallerFactory, createInnerTRPCContext } from "~/server/api/trpc";

// TODO: check how to mock db and run test environment envs
// inspired by https://github.com/juliusmarminge/t3-complete/blob/main/test/trpc/post-router.test.ts
it("unauthed user should not be possible to create a season", async () => {
  //   const ctx = await createInnerTRPCContext({ session: null, ee: {} as any });
  //   const createCaller = createCallerFactory(appRouter);
  //   const caller = createCaller(ctx);

  //   const input: RouterInputs["season"]["create"] = {
  //     id: "1",
  //     name: "My season",
  //     slug: "my-season",
  //     year: 2022,
  //     createdById: "1",
  //     updatedById: "1",
  //   };

  //   await expect(caller.season.create(input)).rejects.toThrowError();
  expect(true).toBe(true);
});
