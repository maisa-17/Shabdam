import Script from "next/script";

// Google Analytics 4, same setup as @next/third-parties' <GoogleAnalytics>, but loaded with `lazyOnload`:
// the 170 KB gtag script waits until the page has finished loading instead of being preloaded in <head>,
// where on 2G/3G it competed with the page's own CSS and fonts. Page views are still recorded once it loads.
export default function Analytics({ gaId }: { gaId: string }) {
  return (
    <>
      <Script id="ga-init" strategy="lazyOnload">
        {`window.dataLayer=window.dataLayer||[];function gtag(){dataLayer.push(arguments);}gtag('js',new Date());gtag('config','${gaId}');`}
      </Script>
      <Script id="ga" src={`https://www.googletagmanager.com/gtag/js?id=${gaId}`} strategy="lazyOnload" />
    </>
  );
}
