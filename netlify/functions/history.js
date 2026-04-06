exports.handler = async () => {
  try {
    const CHANNEL_ID = process.env.THINGSPEAK_CHANNEL_ID;
    const READ_API_KEY = process.env.THINGSPEAK_READ_API_KEY;

    const url = `https://api.thingspeak.com/channels/${CHANNEL_ID}/feeds.json?results=20&api_key=${READ_API_KEY}`;
    const response = await fetch(url);
    const json = await response.json();
    const feeds = json.feeds || [];

    const toNum = (v) => {
      const n = Number(v);
      return Number.isFinite(n) ? n : 0;
    };

    return {
      statusCode: 200,
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        labels: feeds.map((f, i) => {
          const t = new Date(f.created_at);
          return isNaN(t.getTime())
            ? `#${i + 1}`
            : t.toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" });
        }),
        temp: feeds.map(f => toNum(f.field1)),
        humidity: feeds.map(f => toNum(f.field2)),
        ph: feeds.map(f => toNum(f.field3)),
        do: feeds.map(f => toNum(f.field4)),
        tds: feeds.map(f => toNum(f.field5))
      })
    };
  } catch (err) {
    return {
      statusCode: 500,
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ error: "Failed to fetch history data" })
    };
  }
};