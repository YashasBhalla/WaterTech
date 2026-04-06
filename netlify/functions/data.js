exports.handler = async () => {
  try {
    const CHANNEL_ID = process.env.THINGSPEAK_CHANNEL_ID;
    const READ_API_KEY = process.env.THINGSPEAK_READ_API_KEY;

    const url = `https://api.thingspeak.com/channels/${CHANNEL_ID}/feeds/last.json?api_key=${READ_API_KEY}`;
    const response = await fetch(url);
    const d = await response.json();

    return {
      statusCode: 200,
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        temp: d.field1 || "--",
        humidity: d.field2 || "--",
        ph: d.field3 || "--",
        do: d.field4 || "--",
        tds: d.field5 || "--",
        created_at: d.created_at || null
      })
    };
  } catch (err) {
    return {
      statusCode: 500,
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ error: "Failed to fetch live data" })
    };
  }
};