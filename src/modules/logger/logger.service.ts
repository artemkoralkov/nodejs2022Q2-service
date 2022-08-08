import { ConsoleLogger, Injectable } from '@nestjs/common';

import { LOGGER_LEVELS } from 'src/utils/loggerLevels';
import { writeLogsToFile } from './wrtiteLogsToFile';

@Injectable()
export class MyLogger extends ConsoleLogger {
  static currentDate = new Date();
  static counter = 1;

  constructor() {
    super();
    this.setLogLevels(LOGGER_LEVELS[process.env.LOGGING_LEVEL || 1]);
  }

  log(message: any, context?: string): void {
    super.log(message, context);
    writeLogsToFile(message, context);
  }

  error(message: any, stack?: string, context?: string): void {
    super.error(message, stack, context);
    writeLogsToFile(message, context, stack);
  }

  warn(message: any, context?: string): void {
    super.warn(message, context);
    writeLogsToFile(message, context);
  }

  debug(message: any, context?: string): void {
    super.debug(message, context);
    writeLogsToFile(message, context);
  }

  verbose(message: any, context?: string): void {
    super.verbose(message, context);
    writeLogsToFile(message, context);
  }
}
