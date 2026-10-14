import { expect, test } from "vite-plus/test";
import dateToRCStyle from "../../../src/format/helpers/dateToRCStyle.ts";

test("should translate in French", () => {
  {
    const styledDate = dateToRCStyle("5 January 2023 à 11 h 08", false);
    expect(styledDate).toStrictEqual("5 janvier 2023 à 11 h 08");
  }
});
test("should translate in French with an abbreviation", () => {
  {
    const styledDate = dateToRCStyle("5 January 2023 à 11 h 08", true);
    expect(styledDate).toStrictEqual("5 janv. 2023 à 11 h 08");
  }
});
test("should remove ' h 00'", () => {
  {
    const styledDate = dateToRCStyle("5 January 2023 à 11 h 00", true);
    expect(styledDate).toStrictEqual("5 janv. 2023 à 11 h");
  }
});
