import { Application } from "https://deno.land/x/oak/mod.ts";
import { revalidate } from './presentation/lib/revalidate.ts';

const app = new Application();

app.use(async (ctx) => {
    const path = `./presentation${ctx.request.url.pathname}`;
    console.log(path);
    const stats = await Deno.stat(path) || {};
    ctx.response.headers.set("Content-Length", String(stats.size));
    ctx.response.headers.set("Cache-control", "no-cache");
    ctx.response.body = await Deno.readFile(path);
    if (stats.mtime) {
        ctx.response.headers.set("Last-Modified", stats.mtime.toUTCString());
    }
    revalidate(ctx.request, ctx.response);
});

await app.listen({ port: 8000 });
