require("dotenv").config();

const lunr = require("lunr");
const { createClient } = require("@supabase/supabase-js");
const documents = require("../search-documents.json");
const { trimWords } = require("../node-helpers");

const isProduction = process.env.NODE_ENV === "production";

const supabase = createClient(
  process.env.SUPABASE_URL,
  process.env.SUPABASE_SERVICE_KEY
);

const headers = {
  "Access-Control-Allow-Origin": isProduction ? "https://typeitjs.com" : "*",
  "Access-Control-Allow-Headers": "Content-Type",
};

const idx = lunr(function () {
  this.ref("path");
  this.field("content");

  documents.forEach((doc) => {
    this.add(doc);
  });
});

exports.handler = async function (event) {
  if (event.httpMethod !== "GET" || !event.body) {
    return {
      statusCode,
      headers,
      body: "",
    };
  }

  const { query } = event.queryStringParameters;

  const results = idx
    .search(query)
    .filter((d) => d.score > 0)
    .map((doc) => {
      const fullDoc = documents.find((d) => {
        return d.path === doc.ref;
      });

      return {
        url: doc.ref,
        score: doc.score,
        content: trimWords(fullDoc.content, 150),
        heading: fullDoc.heading,
      };
    });

  // Save to DB.
  await supabase.from("typeit_search_queries").insert([
    {
      query,
      environment: process.env.NODE_ENV,
      result_count: results.length,
    },
  ]);

  return {
    statusCode: 200,
    headers,
    body: JSON.stringify({
      documents: results,
    }),
  };
};
