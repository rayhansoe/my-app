import { type VoidComponent } from "solid-js";
import { A, unstable_island, useSearchParams } from "solid-start";
import { trpc } from "../utils/trpc";
const Button = unstable_island(() => import("../components/button"));
const ButtonLink = unstable_island(() => import("../components/ButtonLink"));
const HaloDeck = unstable_island(() => import("../components/HaloDeck"));

const Home: VoidComponent = () => {
	const [params] = useSearchParams();
	const hello = trpc.example.hello.useQuery(() => ({ name: params.q }));
	return (
		<main class='flex min-h-screen flex-col items-center justify-center bg-gradient-to-b from-[#026d56] to-[#152a2c]'>
			<div class='container flex flex-col items-center justify-center gap-12 px-4 py-16 '>
				<h1 class='text-5xl font-extrabold tracking-tight text-white sm:text-[5rem]'>
					Create <span class='text-[hsl(88, 77%, 78%)]'>JD</span> App
				</h1>
				<div class='grid grid-cols-1 gap-4 sm:grid-cols-2 md:gap-8'>
					{/* <A
            class="flex max-w-xs flex-col gap-4 rounded-xl bg-white/10 p-4 text-white hover:bg-white/20"
            href="https://start.solidjs.com"
            target="_blank"
          >
						<h3 class='text-2xl font-bold'>Solid Start →</h3>
						<div class='text-lg'>Learn more about Solid Start and the basics.</div>
					</A> */}
					<Button value={params.q} />
					{/* <A
						class='flex max-w-xs flex-col gap-4 rounded-xl bg-white/10 p-4 text-white hover:bg-white/20'
						href='https://github.com/orjdev/create-jd-app'
						target='_blank'
					>
						<h3 class='text-2xl font-bold'>JD End →</h3>
						<div class='text-lg'>
							Learn more about Create JD App, the libraries it uses, and how to deploy it
						</div>
					</A> */}
					<ButtonLink />
				</div>
				<HaloDeck />
				<p class='text-2xl text-white'>{hello.data ?? "Loading tRPC query"}</p>
			</div>
		</main>
	);
};

export default Home;
