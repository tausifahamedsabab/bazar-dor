import { Suspense } from "react";
import { Toaster } from "react-hot-toast";
import "./globals.css";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";

function NavbarFallback() {
  return <div className="h-24 w-full animate-pulse bg-gray-100" />;
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="bn">
      <body className="bg-[#f4f7f2] text-gray-900">
        <Suspense fallback={<NavbarFallback />}>
          <Navbar />
        </Suspense>
        <main className="mx-auto max-w-7xl px-4 py-6">{children}</main>
        <Footer />
        <Toaster position="top-center" />
      </body>
    </html>
  );
}
