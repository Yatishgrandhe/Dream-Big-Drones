/**
 * A calm, stable image stage for inner-route mastheads. The previous flight
 * path illustration competed with the photography and made the hero feel busy.
 */
export function MastheadImageReveal({ src, alt }) {
  return (
    <div className="masthead-image-route">
      <img src={src} alt={alt} />
      <div className="masthead-image-shade" aria-hidden="true" />
    </div>
  );
}
