'use client'
import { useEffect, useState } from "react";
import { Call, useStreamVideoClient } from "@stream-io/video-react-sdk";

export const useGetCallById = (id: string | string[]) => {
	/* get call */
	const [call, setCall] = useState<Call>();

	/* loading */
	const [callLoading, setCallLoading] = useState<boolean>(true);

	/* get client */
	const client = useStreamVideoClient();

	useEffect(() => {
		if (!client) return;

		const loadCall = async () => {
			const { calls } = await client.queryCalls({
				filter_conditions: { id },
			});

			if (calls.length > 0) {
				setCall(calls[0]);
			}

			setCallLoading(false);
		};

		loadCall();
	}, [client, id]);

	return { call, callLoading };
};
