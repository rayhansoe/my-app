import { Show, type VoidComponent } from "solid-js";
import { A, unstable_island, useRouteData } from "solid-start";
import { createServerData$ } from "solid-start/server";
const ButtonLink = unstable_island(() => import("../components/ButtonLink"));

export function routeData() {
	const data = createServerData$(async () => {
		return {
			data: "hello from server data",
		};
	});
	return data;
}

const Home: VoidComponent = () => {
	const data = useRouteData<typeof routeData>();
	return (
		<main class='flex min-h-screen flex-col items-center justify-center bg-gradient-to-b from-[#026d56] to-[#152a2c]'>
			<div class='container flex flex-col items-center justify-center gap-12 px-4 py-16 '>
				<h1 class='text-5xl font-extrabold tracking-tight text-white sm:text-[5rem]'>
					Create <span class='text-[hsl(88, 77%, 78%)]'>JD</span> App
				</h1>
				<div class='grid grid-cols-1 gap-4 sm:grid-cols-2 md:gap-8'>
					<A
						class='flex max-w-xs flex-col gap-4 rounded-xl bg-white/10 p-4 text-white hover:bg-white/20'
						href='https://start.solidjs.com'
						target='_blank'
					>
						<h3 class='text-2xl font-bold'>Solid Start →</h3>
						<div class='text-lg'>Learn more about Solid Start and the basics.</div>
					</A>
					<ButtonLink name={"from rayhan"} />
					{/* <A
            class="flex max-w-xs flex-col gap-4 rounded-xl bg-white/10 p-4 text-white hover:bg-white/20"
            href="https://github.com/orjdev/create-jd-app"
            target="_blank"
          >
            <h3 class="text-2xl font-bold">JD End →</h3>
            <div class="text-lg">
              Learn more about Create JD App, the libraries it uses, and how to
              deploy it
            </div>
          </A> */}
				</div>

				<Show when={data()?.data}>
					<p class='text-2xl text-white'>{data()?.data ?? "Loading tRPC query on Route Data"}</p>
				</Show>
			</div>
		</main>
	);
};

export default Home;
