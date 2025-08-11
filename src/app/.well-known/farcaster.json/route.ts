import { PROJECT_TITLE } from "~/lib/constants";

export async function GET() {
  const appUrl =
    process.env.NEXT_PUBLIC_URL ||
    `https://${process.env.VERCEL_PROJECT_PRODUCTION_URL}`;

  const config = {
    accountAssociation: {
      header:
        "eyJmaWQiOjg2OTk5OSwidHlwZSI6ImN1c3RvZHkiLCJrZXkiOiIweDc2ZDUwQjBFMTQ3OWE5QmEyYkQ5MzVGMUU5YTI3QzBjNjQ5QzhDMTIifQ",
      payload:
        "eyJkb21haW4iOiJoZWxsbm8tamFjcXVlLW1pbnQudmVyY2VsLmFwcCJ9",
      signature:
        "MHgxYThhZThlYjhlNjdmNDFlY2VkYWQ0MzdmZDZmYmM4M2ViYzU5NmEzZTBhZjkxMjFjNDBhYjc1N2Y2ZGQxZGVjN2FhZjA0NmY2ZmY5YWZmYjY1MDc4ZWY1OWVhYjE2ZDIwNjUxODFmOWE5OTg3YmZkNjE4MTgyMTdmZjQ5ODE2NzFi",
    },
    frame: {
      version: "1",
      name: PROJECT_TITLE,
      iconUrl: `${appUrl}/icon.png`,
      homeUrl: appUrl,
      imageUrl: `${appUrl}/frames/hello/opengraph-image`,
      ogImageUrl: `${appUrl}/frames/hello/opengraph-image`,
      buttonTitle: "Open",
      splashImageUrl: `${appUrl}/splash.png`,
      splashBackgroundColor: "#f7f7f7",
      webhookUrl: `${appUrl}/api/webhook`,
    },
  };

  return Response.json(config);
}
