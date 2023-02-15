import Kalkulator from "./kalkulator.js";
// debugger;
const Obj1 = new Kalkulator();
let przyciski = document.getElementsByClassName("przyc");
let ekran = document.getElementById("ekran");
let lista = document.getElementById("lista");
let wynik = document.querySelectorAll("p");
let box = document.querySelector("input");
let przycSpecjalne = document.getElementsByClassName("spec");
const tab1 = [
  "0",
  "1",
  "2",
  "3",
  "4",
  "5",
  "6",
  "7",
  "8",
  "9",
  "+",
  "-",
  "*",
  "/",
  ":",
  ".",
  "Enter",
  "=",
  "Backspace",
];
let tab2 = ["-", "*", "/", ":", "+"];
function boxLenght() {
  return wynik[1].textContent.length;
}
//SPRAWDZ CIAG
function sprawdzCiag(ciag) {
  let wynik = 0;
  let str = ciag.split("");
  for (let item of tab2) {
    if (str.at(-1) === item) {
      return (wynik = item);
    }
  }
  return wynik;
}
function maxLengthHTML(obiekt) {
  if (obiekt.textContent.length <= 15) {
    return 1;
  } else {
    return 0;
  }
}
function sprawdzCiag2(ciag) {
  let wynik = 0;
  const reg2 = /[1-9]/g;
  const temp = ciag.match(reg2);
  return temp !== null ? (wynik = 1) : wynik;
}
function backspaceButton() {
  {
    if (wynik[1].textContent !== "0") {
      wynik[1].textContent = wynik[1].textContent.slice(0, -1);
    }
    if (wynik[1].textContent == "" || wynik[1].textContent == " ") {
      wynik[1].textContent = "0";
    }
  }
}
function drukEkran(element) {
  // wynik[2].textContent = `${wynik[2].textContent}${element.textContent}`;
  wynik[1].textContent = `${wynik[1].textContent}${element.textContent}`;
}
//WYNIK PO ENTERZE
//KLAWIATURA NA KOMPIE
function addNumAfterKey(event) {
  // console.log(event.key);
  let znak = tab1.filter((element) => event.key === element);
  logika(znak);
}
document.addEventListener("keydown", addNumAfterKey);
for (let i = 0; i < przyciski.length; i++) {
  przyciski[i].addEventListener("click", addNumAfterClick);
}
//KLAWIATURA NA KALKULATORZE
function addNumAfterClick(event) {
  let znak = tab1.filter((element) => event.target.textContent === element);
  logika(znak);
  if (event.target === przycSpecjalne[0]) {
    if (wynik[1] !== "" || wynik[1] !== " ") {
      wynik[1].textContent = "0";
    }
  }
  if (event.target === przycSpecjalne[1]) {
    Obj1.ciag = "";
    wynik[0].textContent = "";
    wynik[1].textContent = "0";
  }
  if (event.target === przycSpecjalne[2]) {
    backspaceButton();
  }
}
//wypisywanie na ekran liczby (wynik[0]) oraz operacja z wynikiem (wynik[1]). Operacje na obiekcie typu Kalkulator Obj1.
function logika(znak) {
  let stan = 0;
  if (znak[0] !== undefined) {
    stan = 1;
    if (
      (Number.isInteger(parseInt(znak[0])) || znak[0] === ".") &&
      maxLengthHTML(wynik[1]) === 1
    ) {
      if (wynik[1].textContent === "0") {
        wynik[1].textContent = "";
      }
      wynik[1].textContent += znak[0];
    } else if (
      znak[0] === "+" ||
      znak[0] === "-" ||
      znak[0] === "/" ||
      znak[0] === "*" ||
      znak[0] === ":"
    ) {
      Obj1.dodaj(wynik[1].textContent);
      if (sprawdzCiag2(wynik[1].textContent) === 1) {
        if (sprawdzCiag(wynik[0].textContent) !== 0) {
          Obj1.dodaj(wynik[0].textContent + wynik[1].textContent);
          wynik[0].textContent = Obj1.licz() + znak[0];
          wynik[1].textContent = "0";
        } else {
          wynik[1].textContent += znak[0];
          wynik[0].textContent = wynik[1].textContent;
          wynik[1].textContent = "0";
        }
      }
      if (sprawdzCiag2(wynik[0].textContent) === 1) {
        if (sprawdzCiag(wynik[0].textContent) === 0) {
          wynik[0].textContent += znak[0];
        }
      }
    } else if (znak[0] === "Enter" || znak[0] === "=") {
      if (sprawdzCiag(wynik[0].textContent) !== 0) {
        Obj1.dodaj(wynik[0].textContent + wynik[1].textContent);
        wynik[0].textContent = Obj1.licz();
        wynik[1].textContent = "0";
      }
    } else if (znak[0] === "Backspace") {
      backspaceButton();
    }
  }
  return stan;
}
//TO DO:
//ZNAKI MUSZA MIESCIC SIE WEWNATRZ EKRANU --done
//NAPRAWIC KLAWIATURE --done
//DODAJ PAMIEC KALKULATORA!! --to do
