const PHONE = process.env.NEXT_PUBLIC_WHATSAPP_PHONE;

/** Builds a wa.me deep link with a pre-filled message. Returns "#" and warns if the phone isn't configured yet. */
export function waLink(message: string): string {
  if (!PHONE) {
    if (process.env.NODE_ENV !== "production") {
      console.warn(
        "NEXT_PUBLIC_WHATSAPP_PHONE is not set — WhatsApp links will not work until it is."
      );
    }
    return "#";
  }
  return `https://wa.me/${PHONE}?text=${encodeURIComponent(message)}`;
}
