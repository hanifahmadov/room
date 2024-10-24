import React, { ReactNode } from "react";

import { Loader2, Check } from "lucide-react";

import { Button } from "@/components/ui/button";

import {
	Dialog,
	DialogContent,
	DialogDescription,
	DialogHeader,
	DialogTitle,
	DialogTrigger,
} from "@/components/ui/dialog";


interface MeetingModalProps {
	isOpen: boolean;
	title?: string;
	className?: string;
	textButton?: string;
	iconButton?: string;
	children?: ReactNode;
	image?: string;
	loading: number;
	handleLoading: () => void;
	handleClick?: () => void;
	onClose?: () => void;
}

export default function MeetingModal({
	isOpen,
	title,
	className,
	textButton,
	iconButton,
	handleClick,
	onClose,
	children,
	image,
	loading,
	handleLoading,
}: MeetingModalProps) {
	const delay = (ms: number) => new Promise((resolve) => setTimeout(() => resolve(true), ms));

	const handleClose = (open: boolean) => {
		if (loading === 1) {
			return; // Prevent closing when loading
		}

		if (!open && onClose) {
			onClose(); // Call the onClose function if the dialog is closing

			setTimeout(() => {
				handleLoading();
			}, 4000);
		}
	};
	return (
		<Dialog open={isOpen} onOpenChange={handleClose}>
			<DialogContent className='bg-black border-neutral-800 w-[90%] sm:w-full rounded-lg'>
				<DialogHeader className=' flex justify-center items-center'>
					<DialogTitle>
						<div className='flex flex-col justify-center items-center'>
							{image && (
								<div>
									<img src={image} alt='modal-logo' height={18} width={18} />
								</div>
							)}

							<h2 className='text-xl font-bold'>{title}</h2>
						</div>
					</DialogTitle>
					<DialogDescription asChild>
						<div className='flex flex-col justify-end  items-center text-neutral-300 mt-3'>
							<div className='modal-text'>{children}</div>

							<div className='flex-center-center flex-col'>
								<p className='text-[14px] text-neutral-300'>
									You are about to start an instant meeting now.
								</p>
								<p className='text-[14px] text-neutral-300'>Please click the button below to start.</p>
							</div>

							{loading == 0 && (
								<div
									onClick={handleClick}
									className='bg-slate-900 hover:bg-opacity-90 cursor-pointer  
                                             w-[15rem] mt-5 border-[0.1px] border-neutral-800  p-[10px] 
                                             font-bold flex-center-center gap-3 rounded-md  '
								>
									{iconButton && (
										<div className='flex-center-center glassmorphism inline-block rounded-full p-[5px]'>
											<img src={iconButton} alt='icon-button' height={8} width={8} />
										</div>
									)}
									<div className='text-[14px] font-[550]'>{textButton || "Schedule Meeting"}</div>
								</div>
							)}

							{loading == 1 && (
								<Button
									disabled
									className='w-[15rem] mt-5 text-[14px] font-[550] flex-center-center gap-2'
								>
									<Loader2 className='mr-2 h-4 w-4 animate-spin' />
									Please wait
								</Button>
							)}

							{/* {loading == 2 && (
								<Button className='w-[15rem] mt-5 text-[14px] font-[550] flex-center-center gap-2 pointer-events-none'>
									<Image src='/icons/success.svg' alt='icon-button' height={20} width={20} />
									Redirecting ...
								</Button>
							)} */}
						</div>
					</DialogDescription>
				</DialogHeader>
			</DialogContent>
		</Dialog>
	);
}
