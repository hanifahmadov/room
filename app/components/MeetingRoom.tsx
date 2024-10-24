import React, { useState } from "react";
import { CallParticipantsList, PaginatedGridLayout, SpeakerLayout } from "@stream-io/video-react-sdk";
import { cn } from "@/lib/utils";

type CallLayoutType = "grid" | "speaker-left" | "speaker-right";

const MeetingRoom = ({}) => {


	/* layout local state */
	const [layout, setLayout] = useState<CallLayoutType>("grid");

	const CallLayout = () => {
		switch (layout) {
			case "speaker-right":
				return <SpeakerLayout participantsBarPosition='right' />;

			case "speaker-left":
				return <SpeakerLayout participantsBarPosition='left' />;

			default:
				return <PaginatedGridLayout />;
		}
	};

	return (
		<div className='meeting-room bg-neutral-900 h-full w-full rounded-xl flex justify-center items-center overflow-hidden'>
			<div className='relative meeting-room bg-neutral-500 rounded-md w-[10rem]'>
				<CallLayout />
			</div>

			<div className='relative w-auto'>
				<CallParticipantsList onClose={() => null} />
			</div>
		</div>
	);
};

export default MeetingRoom;
