import { A, useParams } from "solid-start";

export default function UserPage() {
	const params = useParams();
	return (
		<div>
			<h1>User {params.id}</h1>
			<A href='/'>back to Home</A>
		</div>
	);
}
