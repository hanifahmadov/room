"use client";

import React, { useState } from "react";
import HomeCard from "./HomeCard";
import { useRouter } from "next/navigation";
import MeetingModal from "./MeetingModal";
import { useUser } from "@clerk/nextjs";
import { Call, useStreamVideoClient } from "@stream-io/video-react-sdk";
import { toast } from "react-toastify";
import { cn } from "@/lib/utils";

export default function MeetingTypeList() {
	const delay = (ms: number) => new Promise((resolve) => setTimeout(() => resolve(true), ms));

	/* loading for button display */
	const [loading, setLoading] = useState(0);

	/* router  */
	const router = useRouter();
	const [meetingState, setMeetingState] = useState<
		"isScheduleMeeting" | "isJoiningMeeting" | "isInstantMeeting" | undefined
	>();

	const [values, setValues] = useState({
		dateTime: new Date(),
		description: "",
		link: "",
	});

	const [callDetails, setCallDetails] = useState<Call>();

	/* this gets the user from the clerk whuch signed user details from the clerk database */
	const { user } = useUser();

	/* this comes from the Stream that imported in the above please check the code from the import */
	const client = useStreamVideoClient();

	const handleClick = () => {};

	/* handle create meeting from the modal button clicked */
	const createMeeting = async () => {
		// toast("Please select Date and Time");

		if (!client || !user) {
			console.log("No user || client to create a meeting");
			return;
		}

		/* make loading active */
		setLoading(1);

		try {
			if (!values.dateTime) {
				toast(
					<div>
						<h2>Error Occured!</h2>
						<p>Please select Date & Time</p>
					</div>
				);
				return;
			}

			/* calls need a unique id */
			const id = crypto.randomUUID();
			/* drom the docs: https://getstream.io/video/docs/api/ */
			const call = client.call("default", id);
			if (!call) throw new Error("Stream NO call");

			const startsAt = values.dateTime.toISOString() || new Date(Date.now()).toISOString();
			const description = values.description || "Instant Meeting";

			// Upsert behavior
			await call.getOrCreate({
				data: {
					starts_at: startsAt,
					custom: {
						description,
					},
				},
			});

			setCallDetails(call);

			if (!values.description) {
				await delay(4000);

				/* redirect to meeting room */
				router?.push(`/meeting/${call.id}`);

				toast.success(<h2>Meeting Created Success 🎉</h2>);
				setLoading(0);
			}
		} catch (error) {
			setLoading(0);
			toast.error(
				<div>
					<h2>Error Occured!</h2>
					<p>Failed to create a meeting, Try again.</p>
				</div>
			);

			console.log("error creating a meeting", error);
		}
	};
	return (
		<div className='meeting-typelist w-full flex justify-start flex-wrap gap-3 sm:gap-5 py-5 '>
			<HomeCard
				className='bg-orange-600'
				image='/icons/add-meeting.svg'
				title='New Meeting'
				description='Start an instant meeting'
				handleClick={() => setMeetingState("isInstantMeeting")}
			/>
			<HomeCard
				className='bg-sky-600'
				image='/icons/schedule.svg'
				title='Schedule Meeting'
				description='Plan your meeting'
				handleClick={() => setMeetingState("isScheduleMeeting")}
			/>
			<HomeCard
				className='bg-violet-600'
				image='/icons/recordings.svg'
				title='View Recordings'
				description='Check out your records'
				handleClick={() => setMeetingState(undefined)}
			/>
			<HomeCard
				className='bg-rose-600'
				image='/icons/join-meeting.svg'
				title='Join Meeting'
				description='Via invitation link'
				handleClick={() => setMeetingState("isJoiningMeeting")}
			/>

			<MeetingModal
				isOpen={meetingState == "isInstantMeeting"}
				onClose={() => setMeetingState(undefined)}
				title='Start an Instant Meeting'
				className='text-center'
				textButton='Start Meeting'
				handleClick={createMeeting}
				loading={loading}
				handleLoading={() => setLoading(0)}
				iconButton='/icons/add-meeting.svg'
			/>
		</div>
	);
}
