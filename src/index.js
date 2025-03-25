var head = document.getElementsByTagName("head")[0];

for (const weight of ["regular"]) {
  var link = document.createElement("link");
  link.rel = "stylesheet";
  link.type = "text/css";
  link.href =
    "https://unpkg.com/@ino-labs/ino-icons@1.0.3/src/font/" + weight + "/ino-icons.css";
  head.appendChild(link);
}