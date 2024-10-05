class Translator {
    // constructor function for Translator
  constructor() {
    this.americanOnly = require("./american-only.js");
    this.americanToBritishSpelling = require("./american-to-british-spelling.js");
    this.americanToBritishTitles = require("./american-to-british-titles.js");
    this.britishOnly = require("./british-only.js");

    // get keys and values from imported objects
    this.americanWord = Object.keys(this.americanToBritishSpelling);
    this.britishWord = Object.values(this.americanToBritishSpelling);
    this.americanOnlyWord = Object.keys(this.americanOnly);
    this.toBritish = Object.values(this.americanOnly);
    this.britishOnlyWord = Object.keys(this.britishOnly);
    this.toAmerican = Object.values(this.britishOnly);
    this.americanTitlesOnly = Object.keys(this.americanToBritishTitles);
    this.britishTitlesOnly = Object.values(this.americanToBritishTitles);
  }

  translate(str, locale) {
    let string = str;

    //Wrap any translated spelling or terms with <span class="highlight">...</span> tags so they appear in green.
    const replaceWordsAndTitle = (words, replaced, str, capitalize) => {
      words.forEach((word, i) => {
        const regex = new RegExp(`(?<=^|[.'"\\s])${word}(?=[.'"\\s]|$)`, "gi");
        const replacement = capitalize
          ? replaced[i][0].toUpperCase() + replaced[i].slice(1)
          : replaced[i];
        str = str.replace(
          regex,
          `<span class="highlight">${replacement}</span>`
        );
      });
      return str;
    };

    // replace clock with dots + The span element should wrap the entire time string, i.e. <span class="highlight">10:30</span>.
    const replaceClock = (sym, replaced, str) => {
      const regex = new RegExp(`(\\d{1,2})${sym}(\\d{1,2})`, "g");
      return str.replace(
        regex,
        `<span class="highlight">$1${replaced}$2</span>`
      );
    };

    // Replace strings (text) based on locale (american <-> british)
    if (locale === "american-to-british") {
      string = replaceWordsAndTitle(
        this.americanWord,
        this.britishWord,
        string,
        false
      );
      string = replaceWordsAndTitle(
        this.americanOnlyWord,
        this.toBritish,
        string,
        false
      );
      string = replaceWordsAndTitle(
        this.americanTitlesOnly,
        this.britishTitlesOnly,
        string,
        true
      );
      string = replaceClock(":", ".", string);
    } else if (locale === "british-to-american") {
      string = replaceWordsAndTitle(
        this.britishWord,
        this.americanWord,
        string,
        false
      );
      string = replaceWordsAndTitle(
        this.britishOnlyWord,
        this.toAmerican,
        string,
        false
      );
      string = replaceWordsAndTitle(
        this.britishTitlesOnly,
        this.americanTitlesOnly,
        string,
        true
      );
      string = replaceClock(".", ":", string);
    }

    return string !== str ? string : "Everything looks good to me!";
  }
}

module.exports = Translator;