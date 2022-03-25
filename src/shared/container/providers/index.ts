import { container } from 'tsyringe'
import { IDateProvider } from './DateProvider/IDateProvider'
import { DayJsDateProvider } from './DateProvider/Implementations/DayJsDateProvider'

container.registerSingleton<IDateProvider>(
  "DayJsDateProvider",
  DayJsDateProvider
)