// worker.js

export default {
  // Existing files are served via ASSETS, so we can just return a 410 for all requests to indicate that the content is gone.
  async fetch(request, env) {
    const url = new URL(request.url);
    const pathname = url.pathname;

    const indexResponse = await env.ASSETS.fetch(
      new Request(new URL("/index.html", request.url)),
    );
    const body = await indexResponse.text();

    return new Response(body, {
      status: 410,
      headers: {
        "Content-Type": "text/html; charset=utf-8",
      },
    });
  },
};
