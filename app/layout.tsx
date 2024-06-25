import PagesLayout from "@/components/layouts/PagesLayout";
import type { Metadata } from "next";
import 'bootstrap/dist/css/bootstrap.css';
import '../app/globalStyles/globals.css'
import '../app/globalStyles/menu.css'
import './globalStyles/mobile-navbar.css'
import './globalStyles/search-modal.css'
import './globalStyles/footer.css'
import './globalStyles/slick.css'
import './globalStyles/slick-theme.css'
import './globalStyles/auth-popup.css'
import './globalStyles/header-profile.css'
import './globalStyles/cart-popup.css'






export const metadata: Metadata = {
  title: "Create Next App",
  description: "Generated by create next app",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return <PagesLayout>{ children }</PagesLayout>
}
