import { createEffect } from "solid-js";
import { createSignal } from "solid-js";
import { useLocation, useNavigate, useSearchParams } from "solid-start";

export default function button(props: { value: string }) {
	const [value, setValue] = createSignal(props.value || "");
	const navigate = useNavigate();
	const location = useLocation();
	const [params] = useSearchParams();

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

			{location.pathname}
		</div>
	);
}
