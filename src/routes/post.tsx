import { A } from "solid-start";
import { trpc } from "../utils/trpc";
export default function Page() {
	const hello = trpc.example.hello.useQuery(() => ({ name: "from Yowww" }));
	return (
		<>
			<A href='/'>back</A>
			<div>Page</div>

			<p class='text-2xl text-white'>{hello.data ?? "Loading tRPC query insid Link"}</p>
		</>
	);
}
