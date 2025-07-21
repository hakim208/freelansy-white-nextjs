"use client";

import { usePathname, useRouter } from 'next/navigation';
import React, { useEffect } from 'react';

interface ProtectedRouteProps {
  children: React.ReactNode;
}

const ProtectedRoute: React.FC<ProtectedRouteProps> = ({ children }) => {
  const router = useRouter();
  const pathname = usePathname();

  useEffect(() => {
    if (typeof window === "undefined") return;

    const token = localStorage.getItem("acssec_token");

    const allowedRoutesWithToken = ["/orders", "/create-order","/create-order/addOrders","/create-order/completedOrder","/profile"];
    const allowedRoutesWithoutToken = ["/", "/category", "/about", "/login", "/register"];

    if (token) {
      if (!allowedRoutesWithToken.includes(pathname)) {
        router.push("/orders");
      }
    } else {
      if (!allowedRoutesWithoutToken.includes(pathname)) {
        router.push("/");
      }
    }
  }, [router, pathname]);

  return <>{children}</>;
};

export default ProtectedRoute;