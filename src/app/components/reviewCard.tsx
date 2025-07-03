"use client";

import React, { useEffect, useState } from "react";
import { cn } from "@/lib/utils";
import { Marquee } from "@/components/magicui/marquee";
import axios from "axios";
import Image from "next/image";

interface Review {
    name: string;
    roleUser: string;
    body: string;
    surname: string
}

const ReviewCard = ({
    name,
    roleUser,
    body,
    surname
}: Review) => {
    return (
        <figure
            className={cn(
                "relative h-full w-64 cursor-pointer overflow-hidden rounded-xl border p-4",
                "border-gray-950/[.1] bg-gray-950/[.01] hover:bg-gray-950/[.05]",
                "dark:border-gray-50/[.1] dark:bg-gray-50/[.10] dark:hover:bg-gray-50/[.15]"
            )}
        >
            <div className="flex flex-row items-center gap-2">
                <Image className="rounded-full" width={32} height={32} alt="photo" src="https://avatar.vercel.sh/samira" />
                <div className="flex w-full justify-between items-start ">
                    <div className="flex items-start flex-col ">
                        <figcaption className="text-[12px] font-medium dark:text-white">
                            {name}
                        </figcaption>
                        <figcaption className="text-[10px] font-medium dark:text-white">
                            {surname}
                        </figcaption>
                    </div>
                    <p className="text-xs font-medium dark:text-white/40 " style={{ color: roleUser == "client" ? "#5046e6" : "red" }} >{roleUser}</p>
                </div>
            </div>
            <blockquote className="mt-2 text-sm">{body}</blockquote>
        </figure>
    );
};

export function MarqueeDemo() {
    const [reviews, setReviews] = useState<Review[]>([]);

    useEffect(() => {
        const fetchReviews = async () => {
            try {
                const res = await axios.get<Review[]>("https://43baa55b08d805d5.mokky.dev/user");
                setReviews(res.data);
            } catch (error) {
                console.error("Error fetching reviews:", error);
            }
        };

        fetchReviews();
    }, []);

    const half = Math.ceil(reviews.length / 2);
    const firstRow = reviews.slice(0, half);
    const secondRow = reviews.slice(half);

    return (
        <div className="relative flex w-full flex-col items-center justify-center overflow-hidden">
            <Marquee pauseOnHover className="[--duration:20s]">
                {firstRow.map((review) => (
                    <ReviewCard {...review} />
                ))}
            </Marquee>
            <Marquee reverse pauseOnHover className="[--duration:20s]">
                {secondRow.map((review) => (
                    <ReviewCard{...review} />
                ))}
            </Marquee>
            <div className="pointer-events-none absolute inset-y-0 left-0 w-1/4 bg-gradient-to-r from-background"></div>
            <div className="pointer-events-none absolute inset-y-0 right-0 w-1/4 bg-gradient-to-l from-background"></div>
        </div>
    );
}
