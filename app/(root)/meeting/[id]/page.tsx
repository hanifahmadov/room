"use client";
import React, { useState } from "react";
import { useUser } from "@clerk/nextjs";
import { StreamCall, StreamTheme } from "@stream-io/video-react-sdk";
import MeetingSetup from "@/app/components/MeetingSetup";
import MeetingRoom from "@/app/components/MeetingRoom";
import { useGetCallById } from "@/hooks/useGetCallById";
import Loader from "@/app/components/Loader";

export default function Meeting({ params: { id } }: { params: { id: string } }) {
	/* get current client user from the clerk */
	const { user, isLoaded } = useUser();

	/* is setup completed */
	const [setupCompleted, setSetupCompleted] = useState(false);

	const { call, callLoading } = useGetCallById(id);

	if (!isLoaded || callLoading) return <Loader />;

	return (
		<main className='h-full w-full flex-center-center p-2'>
			<StreamCall call={call}>
				<StreamTheme className='w-full h-full'>
					{!setupCompleted ? <MeetingSetup setSetupCompleted={setSetupCompleted} /> : <MeetingRoom />}
				</StreamTheme>
			</StreamCall>
		</main>
	);
}
