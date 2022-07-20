/* eslint-disable @typescript-eslint/no-unused-vars */

import { Mapper } from '@automapper/core';

/* eslint-disable @typescript-eslint/no-namespace */
export interface IMapInstaller {
  // add some methods or something to distinguish from {}
  CreateMappings(mapper : Mapper): void;
}
