import { json } from "@andyjessop/cf-worker-server";

export async function ok() {  
  return json('ok');
}