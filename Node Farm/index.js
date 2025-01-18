const fs = require("fs");
const http = require("http");
const PORT = 8000;
const replaceTemplate = require("./modules/replaceTemplate");
const slugify = require("slugify");

///////////////////////////////////
// Files

// Blocking, Synchronous Way
// const textIn = fs.readFileSync("./txt/input.txt", "utf-8");
// console.log(textIn);

// const textOut = `This is what we know about Avocado: ${textIn}\nCreated on ${Date.now()}`;
// fs.writeFileSync("./txt/output.txt", textOut);
// console.log("File Written Successfully");

// Non-Blocking, Asynchronous Way
// fs.readFile("./txt/start.txt", "utf-8", (err, data1) => {
//   if (err) return console.log("Error 💥");
//   fs.readFile(`./txt/${data1}.txt`, "utf-8", (err, data2) => {
//     console.log(data2);
//     fs.readFile("./txt/append.txt", "utf-8", (err, data3) => {
//       console.log(data3);
//       fs.writeFile("./txt/final.txt", `${data2} \n${data3}`, "utf-8", (err) => {
//         console.log("Your file has been written 🤣");
//       });
//     });
//   });
// });

// console.log("will read file");

///////////////////////////////////
// SERVER

const tempCard = fs.readFileSync("./templates/template-card.html", "utf-8");
const tempOverview = fs.readFileSync(
  "./templates/template-overview.html",
  "utf-8"
);
const tempProduct = fs.readFileSync(
  "./templates/template-product.html",
  "utf-8"
);

const data = fs.readFileSync(`${__dirname}/dev-data/data.json`, "utf-8");
const dataObject = JSON.parse(data);
const slugs = dataObject.map((el) => slugify(el.productName, { lower: true }));
console.log(slugs);

const server = http.createServer((req, res) => {
  // const pathName = req.url;
  const base = `http://127.0.0.1:${PORT}`;
  let { pathname: pathName, searchParams: params } = new URL(req.url, base);
  params = Object.fromEntries(params);

  if (pathName === "/overview" || pathName === "/") {
    res.writeHead(200, { "Content-type": "text/html" });

    let cardsHtml = dataObject
      .map((el) => replaceTemplate(tempCard, el))
      .join("");
    const output = tempOverview.replace("{%PRODUCT_CARDS%}", cardsHtml);
    res.end(output);
  } else if (pathName === "/product") {
    if (dataObject[params?.id]) {
      let output = replaceTemplate(tempProduct, dataObject[params?.id]);
      res.writeHead(200, { "Content-type": "text/html" });
      return res.end(output);
    }
    res.end("This is the PRODUCT");
  } else if (pathName === "/api") {
    res.writeHead(200, { "Content-type": "application/json" });
    res.end(data);
  } else {
    res.writeHead(404, {
      "Content-type": "text/html",
    });
    res.end("<h1>Page not Found</h1>");
  }
});

server.listen(PORT, "127.0.0.1", () => {
  console.log("Listening to requests on PORT 8000");
});
