"use server";

import { StreamClient } from "@stream-io/node-sdk";
import { currentUser } from "@clerk/nextjs/server";

const apiKey = process.env.NEXT_PUBLIC_STREAM_API_KEY;
const apiSecret = process.env.STREAM_SECRET_KEY;

export const tokenProvider = async () => {
	const user = await currentUser();

	if (!user) throw new Error("CLERK NO current user");
	if (!apiKey) throw new Error("Stream NO API-Key");
	if (!apiSecret) throw new Error("Stream  NO Secret-Key Secret");

	const client = new StreamClient(apiKey, apiSecret);

	// validity is optional (by default the token is valid for an hour)

	const vailidity = 60 * 60;

	const token = client.generateUserToken({ user_id: user?.id, validity_in_seconds: vailidity });

	return token;
};
