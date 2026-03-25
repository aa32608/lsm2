import { Buffer } from 'node:buffer';

const FIREBASE_BASE_URL = 'https://tetovo-lms-default-rtdb.europe-west1.firebasedatabase.app';
const SITE_URL = 'https://bizcall.mk';
const FALLBACK_IMAGE_URL = `${SITE_URL}/og-image.png`;

function toAbsoluteUrl(url) {
  if (!url || typeof url !== 'string') {
    return null;
  }

  try {
    const parsed = new URL(url, SITE_URL);
    if (parsed.protocol !== 'http:' && parsed.protocol !== 'https:' && parsed.protocol !== 'data:') {
      return null;
    }
    return parsed.toString();
  } catch {
    return null;
  }
}

function normalizeImageValue(value) {
  if (!value) return null;
  if (typeof value === 'string') return toAbsoluteUrl(value);
  if (typeof value === 'object') {
    return (
      toAbsoluteUrl(value.url) ||
      toAbsoluteUrl(value.src) ||
      toAbsoluteUrl(value.image) ||
      toAbsoluteUrl(value.data) ||
      null
    );
  }
  return null;
}

function extractListingImages(listing) {
  if (!listing || typeof listing !== 'object') return [];

  const imageCandidates = [];
  const fields = [listing.images, listing.imageData, listing.imagePreview];

  fields.forEach((field) => {
    if (Array.isArray(field)) {
      field.forEach((item) => {
        const normalized = normalizeImageValue(item);
        if (normalized) imageCandidates.push(normalized);
      });
      return;
    }

    if (field && typeof field === 'object') {
      Object.values(field).forEach((item) => {
        const normalized = normalizeImageValue(item);
        if (normalized) imageCandidates.push(normalized);
      });
      return;
    }

    const normalized = normalizeImageValue(field);
    if (normalized) imageCandidates.push(normalized);
  });

  return [...new Set(imageCandidates)];
}

async function getListing(id) {
  const res = await fetch(`${FIREBASE_BASE_URL}/listings/${encodeURIComponent(id)}.json`, {
    cache: 'no-store',
    headers: {
      Accept: 'application/json',
    },
  });

  if (!res.ok) {
    return null;
  }

  const data = await res.json();
  return data || null;
}

function parseDataUrl(dataUrl) {
  const match = dataUrl.match(/^data:([^;,]+)?(;base64)?,(.*)$/i);
  if (!match) return null;

  const mimeType = (match[1] || '').toLowerCase();
  const isBase64 = Boolean(match[2]);
  const dataPart = match[3] || '';

  return {
    mimeType,
    isBase64,
    dataPart,
  };
}

function isSupportedMimeType(mimeType) {
  return [
    'image/jpeg',
    'image/jpg',
    'image/png',
    'image/webp',
    'image/gif',
    'image/svg+xml',
    'image/avif',
  ].includes(mimeType);
}

export async function GET(_request, { params }) {
  const resolvedParams = await params;
  const listingId = resolvedParams?.id ? String(resolvedParams.id) : null;

  if (!listingId) {
    return Response.redirect(FALLBACK_IMAGE_URL, 302);
  }

  try {
    const listing = await getListing(listingId);
    const images = extractListingImages(listing);
    const firstImage = images[0];

    if (!firstImage) {
      return Response.redirect(FALLBACK_IMAGE_URL, 302);
    }

    if (firstImage.startsWith('http://') || firstImage.startsWith('https://')) {
      return Response.redirect(firstImage, 302);
    }

    if (firstImage.startsWith('data:')) {
      const parsedData = parseDataUrl(firstImage);
      if (!parsedData || !parsedData.mimeType || !isSupportedMimeType(parsedData.mimeType)) {
        return Response.redirect(FALLBACK_IMAGE_URL, 302);
      }

      const bytes = parsedData.isBase64
        ? Buffer.from(parsedData.dataPart, 'base64')
        : Buffer.from(decodeURIComponent(parsedData.dataPart), 'utf-8');

      return new Response(bytes, {
        status: 200,
        headers: {
          'Content-Type': parsedData.mimeType,
          'Cache-Control': 'public, max-age=300, s-maxage=300',
        },
      });
    }

    return Response.redirect(FALLBACK_IMAGE_URL, 302);
  } catch {
    return Response.redirect(FALLBACK_IMAGE_URL, 302);
  }
}
