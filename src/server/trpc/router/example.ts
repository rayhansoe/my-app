import { z } from "zod";
import { procedure, router } from "../utils";

export default router({
	// Create procedure at path 'createPost'
	// The syntax is identical to creating queries
	createPost: procedure
		// using zod schema to validate and infer input values
		.input(
			z.object({
				name: z.string(),
			})
		)
		.mutation(({ input }) => {
			// Here some createPost stuff would happen
			return {
				user: {
					name: input.name,
					createdAt: new Date(),
				},
			};
		}),
});
