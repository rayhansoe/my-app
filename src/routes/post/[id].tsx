import { useParams } from "solid-start";

export default function PostPage() {
	const params = useParams();
	return <div>Post {params.id}</div>;
}
