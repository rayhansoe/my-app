import { debounce } from "@solid-primitives/scheduled";
import { createEffect, createSignal } from "solid-js";
import { A, useLocation } from "solid-start";
import server$ from "solid-start/server";
import { trpc } from "~/utils/trpc";

const mutation$ = server$(async (params: { name: string }) => {
	return {
		name: params.name,
		createdAt: new Date(),
	};
});

export default function Page(props: { name: string }) {
	const mutation = trpc.example.createPost.useMutation();
	// eslint-disable-next-line @typescript-eslint/no-explicit-any
	let aRef: HTMLAnchorElement | ((el: HTMLAnchorElement) => void) | any;

	const [value, setValue] = createSignal<string>("");
	const [nextValue, setNextValue] = createSignal<string>("");
	const location = useLocation();

	const navigate = () => aRef.click();

	const debouncedNavigate = debounce(navigate, 50);

	const update = async (newValue: string) => {
		if (newValue.length && newValue !== value()) {
			setValue(`${location.pathname}/${newValue}`);
			// mutation.mutate({ name: value() });
			const mutate = await mutation$({ name: value() });
			mutate && setNextValue(mutate.name);
			await debouncedNavigate();
		}
	};

	// eslint-disable-next-line solid/reactivity
	const debouncedUpdate = debounce(update, 500);

	createEffect(() => {
		console.log(mutation.data?.user);
	});

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

			{/* {mutation.data?.user.name ? (
				<A ref={aRef} href={mutation.data?.user.name}>
					{props.name}
				</A>
			) : (
				""
			)} */}
			<A ref={aRef} href={nextValue()}>
				{props.name}
			</A>
		</>
	);
}
