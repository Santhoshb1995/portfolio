import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Santhosh Burugupally",
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
