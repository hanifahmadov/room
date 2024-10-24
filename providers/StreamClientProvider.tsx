"use client";
import { tokenProvider } from "@/actions/stream.actions";
import Loader from "@/app/components/Loader";
import { useUser } from "@clerk/nextjs";
import { StreamVideo, StreamVideoClient } from "@stream-io/video-react-sdk";
import { ReactNode, useEffect, useState } from "react";

const apiKey = process.env.NEXT_PUBLIC_STREAM_API_KEY;

const StreamVideoProvider = ({ children }: { children: ReactNode }) => {
	const [videoClient, setVieoClient] = useState<StreamVideoClient>();

	const { user, isLoaded } = useUser();

	useEffect(() => {
		if (!user || !isLoaded) return;
		if (!apiKey) throw new Error("Stream API-Key missing");

		const client = new StreamVideoClient({
			apiKey,
			user: {
				id: user?.id,
				name: user?.username || user?.id,
				image: user?.imageUrl,
			},

			tokenProvider,
		});

		setVieoClient(client);
	}, [user, isLoaded]);

	return !videoClient ? <Loader /> : <StreamVideo client={videoClient}>{children}</StreamVideo>;
};

export default StreamVideoProvider;
