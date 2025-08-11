import { NextRequest, NextResponse } from 'next/server';

export async function GET(request: NextRequest) {
  const appUrl = process.env.NEXT_PUBLIC_URL || 'https://localhost:3000';

  const accountAssociation = {
    header: 'eyJmaWQiOjg2OTk5OSwidHlwZSI6ImN1c3RvZHkiLCJrZXkiOiIweDc2ZDUwQjBFMTQ3OWE5QmEyYkQ5MzVGMUU5YTI3QzBjNjQ5QzhDMTIifQ',
    payload: 'eyJkb21haW4iOiJoZWxsbm8td2FybWJlYWNobmZ0Y3VzdG9tLnZlcmNlbC5hcHAifQ',
    signature: 'MHhjYWE5OTk4MTU3OTExYTdmNzQ0MjczZWZkNDc2MjQwOWM1MWZmMDc0Zjk1NjZlODk2ZTJkM2VkZjA3ODg5NDA2M2YxZTlmMTA2ZTkxNTI5NDIzNjYxZjIyMGFiMzUzNzJiOGNiNGMzMTE3ODViNjNkMWE0Yjk2MzYxNDc0YzE5OTFj'
  };

  const frame = {
    version: "1",
    name: "NFT Minting Collection",
    iconUrl: `${appUrl}/icon.png`,
    homeUrl: appUrl,
    imageUrl: `${appUrl}/og.png`,
    buttonTitle: "Open",
    webhookUrl: `${appUrl}/api/webhook`,
    splashImageUrl: `${appUrl}/splash.png`,
    splashBackgroundColor: "#555555",
    primaryCategory: "art-creativity",
    tags: ["nft", "mint", "collection", "art", "blockchain"]
  };

  return NextResponse.json({
    accountAssociation,
    frame
  });
}
