import { Inter } from "next/font/google";
import { ClerkProvider } from "@clerk/nextjs";
import "./globals.css";
import Navbar from "@/components/Navbar";
import { Toaster } from "react-hot-toast";
import CartModal from "@/components/CartModal";
import PlausibleProvider from "next-plausible";

const inter = Inter({ subsets: ["latin"] });

export const metadata = {
  title: "E-commerce",
  description: "Super Fast E-com",
};

export default function RootLayout({ children }) {
  return (
    <ClerkProvider>
      <html lang="en">
        <head>
          <PlausibleProvider
            domain="test.dev"
            trackLocalhost={true}
            enabled={true}
          />
        </head>
        <body className={inter.className}>
          <Toaster position="top-center " />
          {/* <Navbar /> */}
          {children}
          <CartModal />
        </body>
      </html>
    </ClerkProvider>
  );
}
