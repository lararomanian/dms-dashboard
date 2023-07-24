import NepaliDate from "nepali-date-converter";

export const toAd = (date) => {
  let ad_date = new NepaliDate(date).getAD();
  return ad_date["year"] + "-" + (parseInt(ad_date["month"])+1) + "-" + ad_date["date"];
};
