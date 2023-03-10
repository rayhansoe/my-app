// @refresh reload
import "./root.css";
import { Suspense } from "solid-js";
import {
	Body,
	ErrorBoundary,
	FileRoutes,
	Head,
	Html,
	Meta,
	Routes,
	Scripts,
	Title,
	Link,
	unstable_island,
} from "solid-start";

const TrpcContext = unstable_island(() => import("./context/TrpcContext"));

export default function Root() {
	return (
		<Html lang='en'>
			<Head>
				<Title>Create JD App</Title>
				<Meta charset='utf-8' />
				<Meta name='viewport' content='width=device-width, initial-scale=1' />
				<Meta name='theme-color' content='#026d56' />
				<Meta name='description' content='Generated by create-jd-app' />
				<Link rel='icon' href='/favicon.ico' />
			</Head>
			<Body>
				{/* <trpc.Provider queryClient={queryClient}> */}
				<TrpcContext>
					<Suspense>
						<ErrorBoundary>
							<Routes>
								<FileRoutes />
							</Routes>
						</ErrorBoundary>
					</Suspense>
				</TrpcContext>
				{/* </trpc.Provider> */}
				<Scripts />
			</Body>
		</Html>
	);
}
