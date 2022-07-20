import { classes } from '@automapper/classes'
import { createMapper } from '@automapper/core'

// Create and export the mapper
export const Mapper = createMapper({
  strategyInitializer: classes(),
})

// Installation of mappings

