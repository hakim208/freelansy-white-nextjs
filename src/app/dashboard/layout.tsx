import { cn } from "@/lib/utils";

export default function DashboardLayout({ children }: { children: React.ReactNode }) {
    return (
        <div>
            <nav>
                <h1 className={cn("md:text-[30px] text-[20px] text-purple-500 font-medium ")}>
                    Список задач
                </h1>
            </nav>
            <main>{children}</main>
        </div>
    )
} 