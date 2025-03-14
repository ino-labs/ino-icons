var head = document.getElementsByTagName("head")[0];

for (const weight of ["regular"]) {
  var link = document.createElement("link");
  link.rel = "stylesheet";
  link.type = "text/css";
  link.href =
    "https://unpkg.com/@ino-labs/ino-icons@1.0.0/src/font/" + weight + "/icon.css";
  head.appendChild(link);
}