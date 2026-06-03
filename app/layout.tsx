import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Glass Box — AI DLP for SAP",
  description: "Attack an SAP S/4HANA copilot, then flip the shield and watch it hold.",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
