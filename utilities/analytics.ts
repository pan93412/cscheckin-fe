// Mostly from https://github.com/vercel/next.js/blob/canary/examples/with-google-analytics/lib/gtag.js
// Thanks to vercel/next.js!

export const GA_TRACKING_ID = process.env["NEXT_PUBLIC_GA_ID"];

if (!GA_TRACKING_ID) {
  throw new Error("you should specify NEXT_PUBLIC_GA_ID envvar.");
}

// https://developers.google.com/analytics/devguides/collection/gtagjs/pages
export const pageview = (url: string) => {
  window.gtag("config", GA_TRACKING_ID, {
    page_path: url,
  });
};

// https://developers.google.com/analytics/devguides/collection/gtagjs/events
export const event = ({
  action,
  category,
  label,
  value,
}: {
  action: string;
  category?: string;
  label?: string;
  value?: number;
}) => {
  window.gtag("event", action, {
    event_category: category,
    event_label: label,
    value,
  });
};
