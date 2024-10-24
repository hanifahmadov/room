"use client";
import { cn } from "@/lib/utils";
import React from "react";

interface HomeCardProps {
	className: string;
	image: string;
	title: string;
	description: string;
	handleClick: () => void;
}

export default function HomeCard({ className, image, handleClick, title, description }: HomeCardProps) {
	return (
		<div
			onClick={handleClick}
			className={cn(
				`h-[5rem] w-full sm:h-[11.5rem] sm:w-[11.5rem] rounded-md cursor-pointer 
                px-2 pt-2 pb-0 sm:pb-3
                flex justify-evenly items-center sm:flex-col sm:justify-between sm:items-start
                `,
				className
			)}
		>
			<div className='glassmorphism inline-block rounded-md h-[2rem] w-[2rem] flex-center-center'>
				<img src={image} alt='meeting' width={14} height={14} />
			</div>
 
			<div className='flex-start-start w-[12rem] sm:w-full'>
				<p className='font-bold'>{title}</p>
				<p className='text-[14px] font-[500]'>{description}</p>
			</div>
		</div>
	);
}
