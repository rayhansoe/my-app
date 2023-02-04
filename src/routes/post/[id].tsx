import { A, useParams } from "solid-start";

export default function PostPage() {
	const params = useParams();
	return (
		<div>
			<h1>Post {params.id}</h1>
			<A href='/'>back to Home</A>
		</div>
	);
}
