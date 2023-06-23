const express = require("express");
const puppeteer = require("puppeteer");
const cheerio = require("cheerio");

var page;

const app = express();
app.listen(8080, () => {
  console.log("Server started ...");
});

async function clickKey(key) {
  var index;

  switch (key) {
    case "A":
      index = 1;
      break;
    case "Z":
      index = 2;
      break;
    case "E":
      index = 3;
      break;
    case "R":
      index = 4;
      break;
    case "T":
      index = 5;
      break;
    case "Y":
      index = 6;
      break;
    case "U":
      index = 7;
      break;
    case "I":
      index = 8;
      break;
    case "O":
      index = 9;
      break;
    case "P":
      index = 10;
      break;
    case "Q":
      index = 11;
      break;
    case "S":
      index = 12;
      break;
    case "D":
      index = 13;
      break;
    case "F":
      index = 14;
      break;
    case "G":
      index = 15;
      break;
    case "H":
      index = 16;
      break;
    case "J":
      index = 17;
      break;
    case "K":
      index = 18;
      break;
    case "L":
      index = 19;
      break;
    case "M":
      index = 20;
      break;
    case "W":
      index = 21;
      break;
    case "X":
      index = 22;
      break;
    case "C":
      index = 23;
      break;
    case "V":
      index = 24;
      break;
    case "B":
      index = 25;
      break;
    case "N":
      index = 26;
      break;
  }

  var searchResultSelector;
  if (index < 11) {
    searchResultSelector = `.key-row:nth-child(1) .key:nth-child(${index})`;
  } else if (index < 21) {
    index -= 10;
    searchResultSelector = `.key-row:nth-child(2) .key:nth-child(${index})`;
  } else {
    index -= 19;
    searchResultSelector = `.key-row:nth-child(3) .key:nth-child(${index})`;
  }
  await page.waitForSelector(searchResultSelector);
  await page.click(searchResultSelector);

  console.log("TOP");
  setTimeout(async () => {}, 1000, "funky");
}

async function clickEnter() {
  // const searchResultSelector = `.key-row:nth-child(3) .key:nth-child(8)`;
  // await page.waitForSelector(searchResultSelector);
  // await page.click(searchResultSelector);
  await page.keyboard.press('Enter');
  setTimeout(async () => {}, 1000, "pwet");
}

async function typeWord(word) {
  const chars = word.split("");
  for (let index = 1; index < chars.length; index++) {
    // await clickKey(chars[index].toUpperCase());
  await page.keyboard.press(`Key${chars[index].toUpperCase()}`);

  }
}

app.get("/", async (req, res) => {
  // Créer une instance du navigateur
  //   const browser = await puppeteer.launch();
  const browser = await puppeteer.launch({
    headless: "false",
    executablePath: "C:/Program Files/Google/Chrome/Application/chrome.exe",
  });

  // Ouvrir une nouvelle page
  page = await browser.newPage();

  // Naviguer vers une URL spécifique
  await page.goto("https://www.tusmo.xyz/daily/dc71c5cb");

  const htmlContent = await page.content();
  // Charger le contenu HTML avec cheerio
  const $ = cheerio.load(htmlContent);

  // Trouver tous les éléments de classe "motus-grid"
  const elements = $(".motus-grid");

  // Parcourir les éléments trouvés
  elements.each((index, element) => {
    // Faites quelque chose avec chaque élément trouvé
    console.log($(element).text());
  });

  await typeWord("piscine");
  // await typeWord("piscine");

  
  // const [response] = await Promise.all([
    //   page.waitForNavigation(), // The promise resolves after navigation has finished
    //   page.click(".fa-home")
    // ]);
    
  //   setTimeout(
  //     async () => {
  //       console.log("THE ENTERKEEEY");
  //     await clickEnter();
  //   },
  //   1000,
  //   "funky"
  // );
    console.log("GOGOGOGO");
    setTimeout(
      async () => {
        console.log("Q LQ VQCHGette");
        
        // Prendre une capture d'écran de la page après le clic
        await page.screenshot({ path: "capture.png" });
      
      // Fermer le navigateur Puppeteer
      // await browser.close();

      // Répondre avec la capture d'écran générée
      res.sendFile("capture.png", { root: "./" });
    },
    2000,
    "pwet"
  );

  // const keys = $(".key:has(span)")
  // keys.each((index, key) => {
  //   // Faites quelque chose avec chaque élément trouvé
  //   var letter = $(key).text()
  //   console.log("awi" + letter);
  //   if (letter != "Z"){
  //     console.log("awi newt is " + String.fromCharCode(letter.charCodeAt(0) + 1));
  //   }
  // });

  // const searchString = 'class="key"';
  // const occurrences = htmlContent.split(searchString).length - 1;

  // console.log("Nombre d'occurrences de la chaîne:", occurrences);

  // await page.evaluate(async () => {
  //   const keyElements = $(".key").filter((index, el) => {
  //     const classes = $(el).attr("class").split(" ");
  //     return classes.length === 1 && classes[0] === "key";
  //   }).toArray();

  //   console.log(keyElements.length);
  // });
});
