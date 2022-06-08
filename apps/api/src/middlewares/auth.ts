import { Req } from "../app/req";
import { KV } from "../kv";

export async function authMiddlware(req: Req, kv: KV): Promise<Response | undefined> {
  if (!req.url.includes('/api/')) {
    return;
  }

  const apiKeyHeader = await req.header('X-RUNESTONE-API-KEY');
  const apiKeyState = (await kv.get('API_KEY'));

  if (apiKeyHeader !== apiKeyState) {
    throw {
      code: 403,
      message: 'Incorrect API key. Set X-RUNESTONE-API-KEY header. ',
    };
  }
}