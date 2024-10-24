"use client";
import React, { useState, useEffect } from "react";
import { DeviceSettings, useCall, useCallStateHooks, VideoPreview, StreamCall, Call } from "@stream-io/video-react-sdk";
import { Mic, MicOff, User, Video, VideoOff } from "lucide-react";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { useUser } from "@clerk/nextjs";

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

const MeetingSetup = ({ setSetupCompleted }: { setSetupCompleted: (val: boolean) => void }) => {
	const [micToggle, setMicToggle] = useState(false);
	const [camToggle, setCamToggle] = useState(false);

	const [avatar, setAvatar] = useState("");

	const { user, isLoaded } = useUser();
	const call = useCall();

	if (!call) {
		throw new Error("useCall() => No Call");
	}

	useEffect(() => {
		const toggleDevices = async () => {
			try {
				if (micToggle) {
					await call?.microphone.enable();
				} else {
					await call?.microphone.disable();
				}

				if (camToggle) {
					await call?.camera.enable();
				} else {
					await call?.camera.disable();
				}
			} catch (error) {
				console.error("Error toggling devices:", error);
			}
		};

		toggleDevices();
	}, [micToggle, camToggle, call?.camera, call?.microphone]);

	useEffect(() => {
		if (!user || !user.imageUrl) return;

		setAvatar(user.imageUrl);
	}, [isLoaded]);

	const handleJoin = async () => {
		await call.join();
		setSetupCompleted(true);
	};

	return (
		<div className='flex-center-center p-5 w-full h-full rounded-xl'>
			<div className='flex-center-center flex-col gap-3 p-5 sm:p-10 rounded-xl '>
				<div className='title w-full'>
					<h1 className='font-[600] bg-neutral-950 text-neutral-200  w-full p-2 flex-center-center rounded-lg'>
						Join Meeting Settings
					</h1>
				</div>
				<div className='w-[20rem] h-auto min-h-[178px] rounded-md overflow-hidden border border-neutral-800 flex-center-center flex-col'>
					{camToggle ? (
						<VideoPreview />
					) : user ? (
						<Avatar>
							<AvatarImage
								src={avatar}
								alt='@shadcn'
								height={40}
								width={40}
								className='object-fit cover'
							/>
							<AvatarFallback>CN</AvatarFallback>
						</Avatar>
					) : (
						<User height={40} width={40} color='white' />
					)}
				</div>

				<div className='flex-center-center gap-4 mt-1 w-full'>
					<div
						onClick={() => setMicToggle((prev) => !prev)}
						className='group bg-neutral-900  hover:bg-opacity-80 p-2 rounded-lg cursor-pointer w-full flex-center-center'
					>
						{micToggle ? (
							<Mic height={18} width={50} color='white' />
						) : (
							<MicOff height={18} width={50} color='red' />
						)}
					</div>

					<div
						onClick={() => setCamToggle((prev) => !prev)}
						className='bg-neutral-900 hover:bg-opacity-80 p-2 rounded-lg cursor-pointer w-full flex-center-center'
					>
						{camToggle ? (
							<Video height={18} width={50} color='white' />
						) : (
							<VideoOff height={18} width={50} color='red' />
						)}
					</div>
				</div>

				{/* <div className='w-full'>
					<StreamCall call={call}>
						<DeviceSettings />
					</StreamCall>
				</div> */}

				<Button onClick={handleJoin} className='w-full mt-2 font-[600] text-neutral-200'>
					Join Meeting
				</Button>
			</div>
		</div>
	);
};

export default MeetingSetup;
