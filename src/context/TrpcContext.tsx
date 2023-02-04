import { JSX } from "solid-js/jsx-runtime";
import { trpc, queryClient } from "~/utils/trpc";

export default function TrpcContext(props: { children: JSX.Element }) {
	return <trpc.Provider queryClient={queryClient}>{props.children}</trpc.Provider>;
}
