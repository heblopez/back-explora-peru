import http from 'node:http';

const hostname = '127.0.0.1';
const port = 3000;

const requestListener = (
  _req: http.IncomingMessage,
  res: http.ServerResponse
) => {
  res.statusCode = 200;
  res.setHeader('Content-Type', 'text/html; charset=utf-8');
  res.end(
    `<h1>Explora Peru API 🚀</h1>
    <p>This is the backend of the Explora Peru project.</p>`
  );
};

const server = http.createServer(requestListener);

server.listen(port, hostname, () => {
  console.log(`Server running at http://${hostname}:${port}/`);
});
