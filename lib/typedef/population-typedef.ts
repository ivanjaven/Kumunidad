import { z } from 'zod'

export const PopulationTypedef = z.object({
  id: z.number(),
  name: z.string(),
  gender: z.string(),
  age: z.number(),
  age_category: z.string(),
  status: z.string(),
  street: z.string(),
  occupation: z.string(),
})

export type Population = z.infer<typeof PopulationTypedef>
