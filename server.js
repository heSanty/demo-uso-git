const http = require("node:http");
const fs = require("node:fs");
const path = require("node:path");

const hostname = "127.0.0.1";
const port = Number(process.env.PORT) || 3000;

const pages = {
  "/": "index.html",
  "/index.html": "index.html",
  "/pili.html": "pili.html",
  "/lucy.html": "lucy.html",
  "/vic.html": "vic.html",
};

const server = http.createServer((request, response) => {
  const fileName = pages[request.url];

  if (!fileName) {
    response.writeHead(404, { "Content-Type": "text/plain; charset=utf-8" });
    response.end("Página no encontrada");
    return;
  }

  fs.readFile(path.join(__dirname, fileName), (error, content) => {
    if (error) {
      response.writeHead(500, { "Content-Type": "text/plain; charset=utf-8" });
      response.end("No se pudo cargar la página");
      return;
    }

    response.writeHead(200, { "Content-Type": "text/html; charset=utf-8" });
    response.end(content);
  });
});

server.listen(port, hostname, () => {
  console.log(`Servidor disponible en http://${hostname}:${port}`);
});
