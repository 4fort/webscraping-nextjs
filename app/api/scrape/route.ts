import { NextRequest } from "next/server";
import * as cheerio from "cheerio";
import { ScrapeData } from "@/types/ScrapeData";

export async function GET(request: NextRequest) {
  const searchParams = request.nextUrl.searchParams;
  const url = searchParams.get("url");

  if (!url) {
    return Response.json(
      { error: "URL parameter is required" },
      { status: 400 }
    );
  }

  // Validate URL format
  try {
    new URL(url);
  } catch (error) {
    return Response.json({ error: "Invalid URL format" }, { status: 400 });
  }

  const response = await fetch(url);

  const html = await response.text();

  const $ = cheerio.load(html);

  const headline =
    $('meta[property="og:title"]').attr("content") ||
    $("title").text() ||
    $("title").text() ||
    $("h1").first().text() ||
    "No headline found";
  const author =
    $('meta[name="author"]').attr("content") ||
    $('meta[property="article:author"]').attr("content") ||
    "No author found";
  const publicationDate =
    $('meta[property="article:published_time"]').attr("content") ||
    $('meta[name="date"]').attr("content") ||
    "No publication date found";
  const source = new URL(url).hostname;
  const image =
    $('meta[property="og:image"]').attr("content") ||
    $('meta[name="twitter:image"]').attr("content") ||
    $("img").first().attr("src") ||
    "No image found";
  const tags =
    $('meta[name="keywords"]')
      .attr("content")
      ?.split(",")
      .map((tag) => tag.trim())
      .filter(Boolean) || [];

  const contentText = $("body").text().toLowerCase();
  const wordCount = contentText.split(/\s+/).length;

  let score = Math.min(wordCount / 1000, 1) * 50;

  if ($('meta[property="og:title"]').attr("content")) score += 10;
  if ($('meta[property="og:description"]').attr("content")) score += 10;
  if ($('meta[name="keywords"]').attr("content")) score += 10;
  if ($('meta[property="article:published_time"]').attr("content")) score += 10;
  if ($('meta[name="author"]').attr("content")) score += 10;

  const relevance = Math.round(Math.min(score, 100));

  const scrapeData = {
    headline,
    author,
    publication_date: publicationDate,
    source,
    image,
    tags,
    relevance,
  } satisfies ScrapeData;

  return Response.json(scrapeData);
}
