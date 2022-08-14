import type { NextApiRequest, NextApiResponse } from "next";

export default function handler(
  req: NextApiRequest,
  res: NextApiResponse<any>
) {
  const { method } = req;

  if (method === "GET") {
    var scope =
      "streaming user-read-email user-read-private user-read-playback-state user-modify-playback-state";

    var auth_query_parameters = new URLSearchParams({
      response_type: "code",
      client_id: process.env.CLIENT_ID,
      scope: scope,
      redirect_uri: process.env.REDIRECT_URL as string,
    } as any);

    res
      .status(200)
      .redirect(
        "https://accounts.spotify.com/authorize/?" +
          auth_query_parameters.toString()
      );
  }
}
