import { Req } from "@andyjessop/cf-worker-server";

const extensions = {
  css: 'text/css',
  csv: 'text/csv',
  gif: 'image/gif',
  htm: 'text/html',
  html: 'text/html',
  ico: 'image/vnd.microsoft.icon',
  jpg: 'image/jpeg',
  jpeg: 'image/jpeg',
  js: 'text/javascript',
  json: 'application/json',
  mjs: 'text/javascript',
  mp3: 'audio/mpeg',
  mp4: 'video/mp4',
  mpeg: 'video/mpeg',
  png: 'image/png',
  svg: 'image/svg+xml',
  webp: 'image/webp',
  webm: 'video/webm'
};

export async function withSupportedContentType(req: Req) {
  const url = req.url;

  const extensionMatch = url.match(/\.[0-9a-z]+$/i);

  if (!extensionMatch) {
    throw {
      code: 400,
      message: `No file extension found for url ${url}`,
    };
  }

  const extension = extensionMatch[0]?.slice(1);

  const contentType = extensions[extension];

  if (!contentType) {
    throw {
      code: 400,
      message: `Extension ${extension} is not supported.`,
    };
  }

  req.meta.contentType = contentType;
}