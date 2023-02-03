import { createEffect } from "solid-js";
import { unstable_island, useLocation } from "solid-start";
const ButtonPost = unstable_island(() => import("../../components/ButtonPost"));

export default function Page() {
	const location = useLocation();

	console.log(location);
	console.log(location.hash);
	console.log(location.pathname);
	console.log(location.key);
	console.log(location.query);
	console.log(location.search);

	createEffect(() => console.log(location));
	return (
		<div>
			<h1>Page</h1>
			<ButtonPost />
		</div>
	);
}
