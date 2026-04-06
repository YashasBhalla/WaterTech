exports.handler = async (event) => {
  if (event.httpMethod !== "POST") {
    return {
      statusCode: 200,
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ success: false, message: "Use POST" })
    };
  }

  try {
    const body = JSON.parse(event.body || "{}");
    const username = body.username || "";
    const password = body.password || "";

    const USER = process.env.APP_USERNAME || "admin";
    const PASS = process.env.APP_PASSWORD || "1234";

    return {
      statusCode: 200,
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ success: username === USER && password === PASS })
    };
  } catch (err) {
    return {
      statusCode: 200,
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ success: false })
    };
  }
};