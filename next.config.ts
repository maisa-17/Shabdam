import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    // YouTube video thumbnails
    remotePatterns: [new URL("https://i.ytimg.com/vi/**")],
  },
  // There is no booking page yet: every "Book Appointment" link goes to the enquiry form on the contact page.
  // Temporary (307) so it can point at a real booking page later.
  async redirects() {
    return [{ source: "/book-appointment", destination: "/contact#enquiry", permanent: false }];
  },
};

export default nextConfig;
