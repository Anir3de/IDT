const http = require("http");
const fs = require("fs");
const path = require("path");

const port = Number(process.env.PORT) || 3000;
const root = __dirname;

const mimeTypes = {
  ".css": "text/css; charset=utf-8",
  ".html": "text/html; charset=utf-8",
  ".js": "application/javascript; charset=utf-8",
  ".json": "application/json; charset=utf-8",
  ".png": "image/png",
  ".jpg": "image/jpeg",
  ".jpeg": "image/jpeg",
  ".mp4": "video/mp4",
  ".mov": "video/quicktime",
  ".svg": "image/svg+xml",
  ".webp": "image/webp",
  ".ico": "image/x-icon",
  ".txt": "text/plain; charset=utf-8"
};

function sendError(res, statusCode, message) {
  res.writeHead(statusCode, { "Content-Type": "text/plain; charset=utf-8" });
  res.end(message);
}

function resolveRequest(urlPath) {
  const cleanPath = decodeURIComponent((urlPath || "/").split("?")[0]);
  const requested = cleanPath === "/" ? "/index.html" : cleanPath;
  const resolved = path.normalize(path.join(root, requested));

  if (!resolved.startsWith(root)) {
    return null;
  }

  return resolved;
}

function sendFallback(res) {
  const fallback = path.join(root, "index.html");
  fs.createReadStream(fallback)
    .on("error", () => sendError(res, 500, "Server error"))
    .pipe(res.writeHead(200, { "Content-Type": mimeTypes[".html"] }));
}

function sendFile(filePath, req, res) {
  fs.stat(filePath, (error, stats) => {
    if (error) {
      if (error.code === "ENOENT") {
        sendFallback(res);
        return;
      }

      sendError(res, 500, "Server error");
      return;
    }

    if (!stats.isFile()) {
      sendError(res, 404, "Not found");
      return;
    }

    const extension = path.extname(filePath).toLowerCase();
    const contentType = mimeTypes[extension] || "application/octet-stream";
    const cacheControl = extension === ".html" ? "no-cache" : "public, max-age=3600";
    const range = req.headers.range;

    if (range) {
      const match = /bytes=(\d*)-(\d*)/.exec(range);
      if (!match) {
        sendError(res, 416, "Requested range not satisfiable");
        return;
      }

      const start = match[1] ? Number(match[1]) : 0;
      const end = match[2] ? Number(match[2]) : stats.size - 1;

      if (Number.isNaN(start) || Number.isNaN(end) || start > end || end >= stats.size) {
        res.writeHead(416, {
          "Content-Range": `bytes */${stats.size}`
        });
        res.end();
        return;
      }

      res.writeHead(206, {
        "Content-Type": contentType,
        "Content-Length": end - start + 1,
        "Content-Range": `bytes ${start}-${end}/${stats.size}`,
        "Accept-Ranges": "bytes",
        "Cache-Control": cacheControl
      });

      fs.createReadStream(filePath, { start, end })
        .on("error", () => sendError(res, 500, "Server error"))
        .pipe(res);
      return;
    }

    res.writeHead(200, {
      "Content-Type": contentType,
      "Content-Length": stats.size,
      "Accept-Ranges": "bytes",
      "Cache-Control": cacheControl
    });

    fs.createReadStream(filePath)
      .on("error", () => sendError(res, 500, "Server error"))
      .pipe(res);
  });
}

const server = http.createServer((req, res) => {
  const filePath = resolveRequest(req.url);

  if (!filePath) {
    res.writeHead(403, { "Content-Type": "text/plain; charset=utf-8" });
    res.end("Forbidden");
    return;
  }

  sendFile(filePath, req, res);
});

server.listen(port, () => {
  console.log(`Ani & Pari site running on http://localhost:${port}`);
});
