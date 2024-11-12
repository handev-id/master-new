import { NextResponse } from "next/server";
import puppeteer from "puppeteer";
import * as cheerio from "cheerio";

export const dynamic = "force-dynamic";

export async function GET() {
  let browser;

  try {
    let data: any = [];
    browser = await puppeteer.launch({ headless: "shell" });
    const page = await browser.newPage();
    await page.goto(
      "https://id.tradingview.com/markets/currencies/rates-major/"
    );

    const html = await page.content();
    const $ = cheerio.load(html);

    const table = $("table");
    const rows = table.find("tr");

    const US = "https://s3-symbol-logo.tradingview.com/country/US.svg";

    rows.each(function (i, row) {
      const cells = $(row).find("a");
      const td = $(row).find("td");
      const title = $(cells[0]).text();
      const price = $(td[1]).text();
      const changePercent = $(td[2]).text();
      const change = $(td[3]).text();
      const image = $(td[0]).find("img").attr("src");
      data.push({
        title,
        price,
        changePercent,
        change,
        image: [
          US,
          image === US
            ? `https://s3-symbol-logo.tradingview.com/country/${title.substring(
                0,
                2
              )}.svg`
            : image,
        ],
      });
    });

    await page.close();

    return NextResponse.json({ result: data }, { status: 200 });
  } catch (error: any) {
    return NextResponse.json(
      { error: `An error occurred: ${error.message}` },
      { status: 200 }
    );
  } finally {
    if (browser) {
      await browser.close();
    }
  }
}
