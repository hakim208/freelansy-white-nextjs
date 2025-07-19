export default function DashboardLayout({ children }: { children: React.ReactNode }) {
    return (
        <div>
            <nav>
                <h1 className="mt-[30px] text-4xl font-extrabold text-purple-600  pb-3 inline-block">
                    Список задач
                </h1>
            </nav>
            <main>{children}</main>
        </div>
    )
} 