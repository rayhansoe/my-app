import { A } from "solid-start";
import { Show } from "solid-js";
import { trpc } from "../utils/trpc";
export default function Page() {
	const hello = trpc.example.hello.useQuery(() => ({ name: "from Yowww" }));
	return (
		<>
			<A href='/'>back</A>
			<div>Page</div>

			<Show when={hello.data}>
				<p class='text-2xl '>{hello.data ?? "Loading tRPC query insid Link"}</p>
			</Show>
		</>
	);
}
