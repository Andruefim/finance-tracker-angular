const { env } = require('process');

//const target = process.env.BACKEND_URL ?? env.ASPNETCORE_HTTPS_PORT ? `https://localhost:${env.ASPNETCORE_HTTPS_PORT}` :
//    env.ASPNETCORE_URLS ? env.ASPNETCORE_URLS.split(';')[0] : 'https://localhost:7040';


const PROXY_CONFIG = [
  {
    context: [
      "/api/Authenticate/user"
    ],
    target: "http://localhost:7040",
    secure: false,
    //"start": "ng serve --proxy-config src/proxy.conf.js"
  }
]

module.exports = PROXY_CONFIG;
