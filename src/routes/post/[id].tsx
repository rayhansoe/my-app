import { useParams } from "solid-start";

export default function UserPage() {
	const params = useParams();
	return <div>User {params.id}</div>;
}
