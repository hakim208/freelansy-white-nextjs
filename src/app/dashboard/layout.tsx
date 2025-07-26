"use client"

import { cn } from "@/lib/utils";

export default function DashboardLayout({ children }: { children: React.ReactNode }) {
    const condition = true;
    return (
        <div>
            <nav>
                <h1 className={cn("p-4 text-white", condition && "bg-red-500", !condition && "bg-green-500")}>
                    Список задач
                </h1>
            </nav>
            <main>{children}</main>
        </div>
    )
} 