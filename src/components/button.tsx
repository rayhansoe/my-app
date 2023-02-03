import { createEffect } from "solid-js";
import { createSignal } from "solid-js";
import { useLocation, useNavigate, useSearchParams } from "solid-start";
import { trpc } from "~/utils/trpc";

export default function button(props: { value: string }) {
	const [value, setValue] = createSignal(props.value || "");
	const navigate = useNavigate();
	const location = useLocation();
	const [params] = useSearchParams();
	const hello = trpc.example.hello.useQuery(() => ({ name: params.q }));

	const update = (newValue: string) => {
		if (newValue.length && newValue !== value()) {
			setValue(newValue);
			navigate(`${location.pathname}?q=${newValue}`);
		}
	};

	createEffect(() => setValue(props.value));

	return (
		<div>
			<input
				onInput={(e) => update(e.currentTarget.value)}
				class='flex max-w-xs flex-col gap-4 rounded-xl bg-white/10 p-4 text-white hover:bg-white/20'
			/>

			{params.q}

			<p class='text-2xl text-white'>{hello.data ?? "Loading tRPC query"}</p>
		</div>
	);
}
