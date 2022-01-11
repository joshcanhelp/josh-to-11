const { v4: uuidv4 } = require("uuid");
const { paramCase } = require("change-case");

const today = new Date();

const getYear = today.getFullYear();
const getMonth = today.getMonth() + 1;
const getDay = today.getDate();

const padLeft = (num) => num < 10 ? "0" + num : "" + num;

const getDate = `${getYear}-${padLeft(getMonth)}-${padLeft(getDay)}`;

const IMAGE_PATH = "/_images/";
const DEFAULT_THUMB = IMAGE_PATH + "default-thumb.png";

module.exports = {
  helpers: {
    getPostFileName: (locals) => {
      if (locals.isDraft === "yes") {
        return `DRAFT-${locals.permalink ? locals.permalink : uuidv4() }`;
      }

      const permalink = locals.permalink || paramCase(locals.title);
      return `${getYear}/${getDate}-${permalink}`;
    },
    getYear,
    IMAGE_PATH,
    DEFAULT_THUMB,
  }
}