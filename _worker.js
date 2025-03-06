export default {
  async fetch(request, env) {
    return new Response("Static site coming soon", {
      headers: { "content-type": "text/html" },
    });
  },
};
