import type { MockMethod } from "vite-plugin-mock";
import { mock, Random } from "mockjs";
export default [
  {
    url: "/api/get",
    method: "get",
    response: () =>
      mock({
        page: Random.integer(1, 150),
        "list|20-50": [
          {
            "id|+1": 10,
            title: () => Random.string("lower", 10, 30),
          },
        ],
      }),
  },
  {
    url: "/api/text",
    method: "post",
    rawResponse: async (req, res) => {
      let reqbody = "";
      await new Promise((resolve) => {
        req.on("data", (chunk) => {
          reqbody += chunk;
        });
        req.on("end", () => resolve(undefined));
      });

      res.setHeader("Content-Type", "text/plain");
      res.statusCode = 200;
      res.end(`hello, ${reqbody}`);
    },
  },
] as MockMethod[];
