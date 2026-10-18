/** hrefs that look like links but go nowhere. */
export const PLACEHOLDER_HREF = /^(#|TODO|javascript:)$/i;

export const EMAIL_ADDRESS = /^[^@\s]+@[^@\s]+\.[a-z]{2,}$/i;

/**
 * Set CHECK_EXTERNAL_LINKS=1 to also request external URLs. Off by default:
 * sites like LinkedIn block automated requests, which would make CI flaky.
 */
export const CHECK_EXTERNAL_LINKS = process.env.CHECK_EXTERNAL_LINKS === "1";
