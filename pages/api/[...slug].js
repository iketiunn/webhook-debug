// Next.js API route support: https://nextjs.org/docs/api-routes/introduction

let data = [];

export default function webhook(req, res) {
  if (req.method === "POST") {
    data.push({
      timestamp: new Date(),
      headers: req.headers,
      path: req.url,
      body: req.body,
    });
    data = data.slice(0, 10);

    res.status(200).json({ ok: true });
  } else if (req.method === "GET") {
    res.status(200).json({ ok: true, data });
  } else {
    res.status(405).json({ ok: false });
  }
}
