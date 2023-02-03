import { useNavigate } from "solid-start";

export default function button() {
	const navigate = useNavigate();
	const handleClick = () => navigate("/post");
	return (
		<button
			onClick={handleClick}
			class='flex max-w-xs flex-col gap-4 rounded-xl bg-white/10 p-4 text-white hover:bg-white/20'
		>
			<h3 class='text-2xl font-bold'>Solid Start →</h3>
			<div class='text-lg'>Learn more about Solid Start and the basics.</div>
		</button>
	);
}
