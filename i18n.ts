import { getRequestConfig } from "next-intl/server";

export default getRequestConfig(async () => ({
  // Return the resolved locale for each request. Use 'en' for this app.
  locale: "en",
  // Load messages for the returned locale.
  messages: (await import("./messages/en.json")).default,
}));