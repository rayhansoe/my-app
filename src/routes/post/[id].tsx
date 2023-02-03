import { createEffect } from "solid-js";
import { unstable_island, useLocation } from "solid-start";

const PostId = unstable_island(() => import("../../components/PostId"));
const Button = unstable_island(() => import("../../components/button"));

export default function Page() {
	const location = useLocation();

	createEffect(() => console.log(location));

	return (
		<div>
			<h1>Post: {location.pathname}</h1>
			<Button />
			<PostId />
		</div>
	);
}
