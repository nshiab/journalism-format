import { expect, test } from "vite-plus/test";
import dateToCBCStyle from "../../../src/format/helpers/dateToCBCStyle.ts";

test("should replace AM by a.m.", () => {
  {
    const styledDate = dateToCBCStyle("January 5, 2023, at 11:08 AM", false);
    expect(styledDate).toStrictEqual("January 5, 2023, at 11:08 a.m.");
  }
});
test("should replace PM by p.m.", () => {
  {
    const styledDate = dateToCBCStyle("January 5, 2023, at 11:08 PM", false);
    expect(styledDate).toStrictEqual("January 5, 2023, at 11:08 p.m.");
  }
});
test("should remove :00", () => {
  {
    const styledDate = dateToCBCStyle("January 5, 2023, at 1:00 PM", false);
    expect(styledDate).toStrictEqual("January 5, 2023, at 1 p.m.");
  }
});
test("should replace the full month by an abbreviation", () => {
  {
    const styledDate = dateToCBCStyle("January 5, 2023, at 11:08 PM", true);
    expect(styledDate).toStrictEqual("Jan. 5, 2023, at 11:08 p.m.");
  }
});
