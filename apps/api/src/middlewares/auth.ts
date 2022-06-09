import { Req } from "@andyjessop/cf-worker-server";
import { KV } from "@runestone/kv";

export async function authMiddlware(req: Req, kv: KV): Promise<Response | undefined> {
  if (!req.url.includes('/api/')) {
    return;
  }

  const apiKeyHeader = req.headers.get('X-RUNESTONE-API-KEY');
  const apiKeyState = (await kv.get('API_KEY'));

  if (apiKeyHeader !== apiKeyState) {
    throw {
      code: 403,
      message: 'Incorrect API key. Set X-RUNESTONE-API-KEY header. ',
    };
  }
}