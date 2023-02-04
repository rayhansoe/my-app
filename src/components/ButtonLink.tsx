import { A } from "solid-start";

export default function Page(props: { name: string }) {
	// eslint-disable-next-line @typescript-eslint/no-explicit-any
	let aRef: HTMLAnchorElement | ((el: HTMLAnchorElement) => void) | any;

	return (
		<>
			<button
				onClick={() => {
					if (aRef) {
						aRef?.click();
					}
				}}
				class='flex max-w-xs flex-col gap-4 rounded-xl bg-white/10 p-4 text-white hover:bg-white/20'
			>
				<h3 class='text-2xl font-bold'>Post</h3>
				<div class='text-lg'>
					Learn more about Create JD App, the libraries it uses, and how to deploy it
				</div>
			</button>

			<A ref={aRef} href='/post'>
				{props.name}
			</A>
		</>
	);
}
