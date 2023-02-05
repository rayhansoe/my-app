/* eslint-disable @typescript-eslint/no-explicit-any */
import { debounce } from "@solid-primitives/scheduled";
import { createEffect, createSignal } from "solid-js";
import { unwrap } from "solid-js/store";
import { A, useLocation } from "solid-start";
import { trpc } from "~/utils/trpc";
export default function Page(props: { name: string }) {
	let aRef: HTMLAnchorElement | ((el: HTMLAnchorElement) => void) | any;

	const [value, setValue] = createSignal<string>("");
	const [nextValue, setNextValue] = createSignal<string>("");
	const location = useLocation();

	const navigate = () => aRef.click();

	const debouncedNavigate = debounce(navigate, 50);

	const mutation = trpc.example.createPost.useMutation(() => ({
		onSuccess: (data: {
			user: {
				name: string;
				createdAt: Date;
			};
		}) => {
			setNextValue(data.user.name);
			debouncedNavigate();
		},
	}));

	const update = (newValue: string) => {
		if (newValue.length && newValue !== value()) {
			setValue(`${location.pathname}/${newValue}`);
			mutation.mutate({ name: value() });
		}
	};

	// eslint-disable-next-line solid/reactivity
	const debouncedUpdate = debounce(update, 500);

	// createEffect(() => {
	// 	if (mutation.data?.user.name) {
	// 		setNextValue(unwrap(mutation.data?.user.name));
	// 		debouncedNavigate();
	// 	}
	// });

	createEffect(() => {
		console.log(mutation.data?.user, "trpc");
		console.log(value(), "value");
		console.log(nextValue(), "nextvalue");
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

			<h1>Mutation Data: {JSON.stringify(mutation.data?.user.name)}</h1>

			<A ref={aRef} href={nextValue()}>
				{props.name}
			</A>
		</>
	);
}
