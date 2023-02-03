import { createEffect } from "solid-js";
import { useLocation } from "solid-start";

export default function PostId() {
	const location = useLocation();

	createEffect(() => console.log(location));

	return <div>PostId</div>;
}
