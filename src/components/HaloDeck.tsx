import { useSearchParams } from "solid-start";
import { trpc } from "~/utils/trpc";

export default function HaloDeck() {
	const [params] = useSearchParams();
	const hello = trpc.example.hello.useQuery(() => ({ name: params.q }));
	return (
		<>
			<div>HaloDeck</div>

			<p class='text-2xl text-white'>{hello.data ?? "Loading tRPC query"}</p>
		</>
	);
}
