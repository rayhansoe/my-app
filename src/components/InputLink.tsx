import { debounce } from "@solid-primitives/scheduled";
import { createSignal, Show } from "solid-js";
import { A, useLocation } from "solid-start";
import { trpc } from "../utils/trpc";

export default function Page(props: { name: string }) {
	const hello = trpc.example.hello.useQuery(() => ({ name: props.name }));
	let aRef: HTMLAnchorElement | ((el: HTMLAnchorElement) => void) | any;

	const [value, setValue] = createSignal<string>("");
	const location = useLocation();

	const navigate = () => aRef.click();

	const debouncedNavigate = debounce(navigate, 50);

	const update = (newValue: string) => {
		if (newValue.length && newValue !== value()) {
			setValue(`${location.pathname}/${newValue}`);
			debouncedNavigate();
		}
	};

	const debouncedUpdate = debounce(update, 500);

	return (
		<>
			<input
				type='text'
				onInput={(e) => debouncedUpdate(e.currentTarget.value)}
				onKeyUp={(e) => {
					e.preventDefault();
					if (e.key === "Enter") {
						debouncedUpdate.clear();
						update(e.currentTarget.value);
					}
				}}
				value={value()}
			/>

			<A ref={aRef} href={value()}>
				{props.name}
			</A>

			<Show when={hello.data}>
				<p class='text-2xl text-white'>{hello.data ?? "Loading tRPC query insid Link"}</p>
			</Show>
		</>
	);
}
