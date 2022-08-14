import { getCookie } from "cookies-next";
import type { NextApiRequest, NextApiResponse } from "next";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<any>
) {
  const { query, method } = req;

  if (method === "GET") {
    const { id, device_id } = query;

    const token = getCookie("AUTH_TOKEN", { req, res });

    try {
      const response = await fetch(
        `https://api.spotify.com/v1/me/player/play?device_id=${device_id}`,
        {
          method: "PUT",
          headers: {
            "Content-Type": "application.json",
            Authorization: "Bearer " + token,
            Accept: "application/json",
          },
          body: JSON.stringify({
            uris: [`spotify:track:${id}`],
          } as any),
        }
      );

      console.log(await response.status);

      res.json({ PLAYED: "PLAYED" });
    } catch (err) {
      console.log(err);
    }
  }
}
