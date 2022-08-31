import init, { greet } from "../../lib/pkg/hello_wasm";
import { NextApiRequest, NextApiResponse } from "next";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  init("http://localhost:3000/hello_wasm_bg.wasm").then(() => {
    greet("test");
  });

  res.status(200).json({ name: "John Doe" });
}
