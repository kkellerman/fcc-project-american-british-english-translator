"use strict";

const Translator = require("../components/translator.js");
module.exports = function (app) {
  const translator = new Translator();

  app.route("/api/translate").post((req, res) => {
    const { text, locale } = req.body;
    const locales = ["american-to-british", "british-to-american"];
    const requiredFields = ["text", "locale"];

    const missingFields = requiredFields.filter(
      (field) => !Object.prototype.hasOwnProperty.call(req.body, field)
    );

    //If one or more of the required fields is missing, return { error: 'Required field(s) missing' }.
    if (missingFields.length > 0) {
      return res.status(400).json({
        error: "Required field(s) missing",
      });
    }

    //If locale does not match one of the two specified locales, return { error: 'Invalid value for locale field' }.
    if (!locale || !locales.includes(locale)) {
      return res.status(400).json({
        error: "Invalid value for locale field",
      });
    }

    //If text is empty, return { error: 'No text to translate' }
    if (!text) {
      return res.status(400).json({
        error: "No text to translate",
      });
    }

    // The returned object should contain the submitted text and translation with the translated text.
    const translatedWord = translator.translate(text, locale);
    res.json({ text, translation: translatedWord });
  });
};