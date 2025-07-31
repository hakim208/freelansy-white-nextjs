// app/profil/layout.tsx (ё ProfileLayout.tsx дар ҳар ҷо ки иcтифода мешавад)

import LayoutWrapper from "@/components/layoutWrapper";
import Sidebar from "../components/sidebar"; // <-- Sidebar is client component

export default function ProfileLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <LayoutWrapper>
      <div className="pt-[70px] md:pt-[100px] flex min-h-screen w-[95%] md:justify-between pb-[50px] md:w-[80%] m-auto">
        {/* Sidebar */}
          <div className="md:w-[20%]">
            <Sidebar />
          </div>
          <main className="flex-1 ml-[0%] md:ml-[5%]">
            {children}
          </main>
      </div>
    </LayoutWrapper>
  );
}