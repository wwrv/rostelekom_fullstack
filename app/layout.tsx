import type { Metadata } from "next";
import 'bootstrap/dist/css/bootstrap.css';
import '../app/globalStyles/globals.css'
import '../app/globalStyles/menu.css'
import './globalStyles/mobile-navbar.css'
import './globalStyles/search-modal.css'
import './globalStyles/cart-popup.css'
import './globalStyles/footer.css'



import Layout from "@/components/layouts/Layout";




export const metadata: Metadata = {
  title: "Create Next App",
  description: "Generated by create next app",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body><Layout> {children} </Layout></body>
    </html>
  );
}
