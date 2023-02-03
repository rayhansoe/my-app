import { createSignal } from "solid-js";
import { useLocation, useNavigate } from "solid-start";

export default function button(props: any) {
	const [value, setValue] = createSignal(props.value || "");
	const navigate = useNavigate();
	const location = useLocation();

	const update = (newValue: string) => {
		if (newValue.length && newValue !== value()) {
			setValue(newValue);
			navigate(`${location.pathname}post?q=${newValue}`);
		}
	};

	return (
		<input
			onInput={(e) => update(e.currentTarget.value)}
			class='flex max-w-xs flex-col gap-4 rounded-xl bg-white/10 p-4 text-white hover:bg-white/20'
		/>
	);
}
