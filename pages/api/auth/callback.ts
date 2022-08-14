import type { NextApiRequest, NextApiResponse } from "next";
import { setCookie } from "cookies-next";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<any>
) {
  const { query, method } = req;

  if (method === "GET") {
    const { code } = query;

    const response = await fetch("https://accounts.spotify.com/api/token", {
      method: "POST",
      headers: {
        "Content-Type": "application/x-www-form-urlencoded",
        Authorization:
          "Basic " +
          Buffer.from(
            process.env.CLIENT_ID + ":" + process.env.CLIENT_SECRET
          ).toString("base64"),
        Accept: "application/json",
      },
      body: new URLSearchParams({
        code: code as string,
        redirect_uri: process.env.REDIRECT_URL as string,
        grant_type: "authorization_code",
      }).toString(),
    });

    const data = await response.json();
    console.log(data);
    const token = data?.access_token;
    setCookie("AUTH_TOKEN", token, { req, res, maxAge: 60 * 60 });

    // res.setHeader("Set-Cookie", serialize("token", token, { path: "/" }));
    res.redirect("/");
  }
}
