import { debounce } from "@solid-primitives/scheduled";
import { createEffect, createSignal } from "solid-js";
import { A, useLocation } from "solid-start";
import { trpc } from "~/utils/trpc";
export default function Page(props: { name: string }) {
	const mutation = trpc.example.createPost.useMutation();
	// eslint-disable-next-line @typescript-eslint/no-explicit-any
	let aRef: HTMLAnchorElement | ((el: HTMLAnchorElement) => void) | any;

	const [value, setValue] = createSignal<string>("");
	const [nextValue, setNextValue] = createSignal<string>("");
	const location = useLocation();

	const navigate = () => aRef.click();

	const debouncedNavigate = debounce(navigate, 50);

	const update = (newValue: string) => {
		if (newValue.length && newValue !== value()) {
			setValue(`${location.pathname}/${newValue}`);
			mutation.mutate({ name: value() });
			mutation.data?.user.name && setNextValue(mutation.data?.user.name);
			debouncedNavigate();
		}
	};

	// eslint-disable-next-line solid/reactivity
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

			<A ref={aRef} href={nextValue()}>
				{props.name}
			</A>
		</>
	);
}
