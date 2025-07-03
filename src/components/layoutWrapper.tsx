"use client";

import { usePathname } from "next/navigation";
import Header from "./heder/heder";
import Footer from "./footer/footer";
import NProgress from "nprogress";
import { useEffect } from "react";

export default function LayoutWrapper({
  children,
}: {
  children: React.ReactNode;
}) {
  const pathname = usePathname();
  useEffect(() => {
    NProgress.configure({ showSpinner: false });

    NProgress.start();

    const timeout = setTimeout(() => {
      NProgress.done();
    }, 1000);

    return () => {
      clearTimeout(timeout);
      NProgress.done();
    };
  }, [pathname]);
  const hideHeaderFooter = pathname.startsWith("/login") || pathname.startsWith("/register");
  return (
    <>
      {!hideHeaderFooter && <Header />}
      {children}
      {!hideHeaderFooter && <Footer />}
    </>
  );
}