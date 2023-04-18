// find the longest word
// find the longest line
// find the ten most common words

import * as fs from "node:fs/promises";

console.log("read file");
const files = [
  //   "/Users/derickolson/Documents/90dn.txt",
  //   "/Users/derickolson/Documents/Bikepath.txt",
  "/Users/derickolson/Documents/cadaveric lyrics.txt",
  "/Users/derickolson/Documents/excav.txt",
  //   "/Users/derickolson/Documents/scratch.txt",
];
const allFiles = await Promise.all(
  files.map((file) => fs.readFile(file, { encoding: "ascii" }))
);

allFiles.forEach((f, i) => {
  const lines = f.split(`\n`).filter((a) => a);

  let max = -Infinity;
  let target = 0;
  for (let i = 0; i < lines.length; i++) {
    const line = lines[i];
    if (line.length > max) {
      max = line.length;
      target = i;
    }
  }
  console.log({
    name: files[i],
    length: f.length,
    lineCount: lines.length,
  });
  console.log(`Max length on line ${target}: ${max}\n${lines[target]}`);
});
