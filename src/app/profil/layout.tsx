
import Sidebar from "../components/sidebar"; 

export default function ProfileLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
      <div className="pt-[70px] md:pt-[100px] flex min-h-screen w-[95%] md:justify-between pb-[50px] md:w-[80%] m-auto">
        {/* Sidebar */}
          <div className="md:w-[20%]">
            <Sidebar />
          </div>
          <main className="flex-1 ml-[0%] md:ml-[5%]">
            {children}
          </main>
      </div>
  );
}