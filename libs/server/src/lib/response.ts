function createResponseType(format = 'text/plain; charset=utf-8') {
  return (body: any, options: { headers?: Record<string, string>, status?: number } = {}) => {
    const { headers = {}, ...rest } = options

    if (typeof body === 'object') {
      return new Response(JSON.stringify(body), {
        headers: {
          'Content-Type': format,
          ...headers,
        },
        ...rest,
      })
    }

    return new Response(body, options)
  }
}
  
export const json = createResponseType('application/json; charset=utf-8');

export const error = (
  status = 500,
  content = 'Internal Server Error.',
): Response => json({
  ...(typeof content === 'object'
    ? content
    : {
        status,
        error: content,
      }),
}, { status });

export function status(status: number, message: Record<string, string> | string): Response {
  return message
    ? json({
        ...(typeof message === 'object'
          ? message
          : {
              status,
              message,
            }),
      }, { status })
    : new Response(null, { status });
}

export const text = (message: string, options = {}): Response => new Response(message, options);

export const missing = (message = 'Not found.'): Response => error(404, message);