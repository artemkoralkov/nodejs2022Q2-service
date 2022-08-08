import {
  appendFileSync,
  existsSync,
  mkdirSync,
  statSync,
  writeFileSync,
} from 'fs';
import { MyLogger } from './logger.service';

export function writeLogsToFile(
  message: any,
  context?: string,
  stack?: string,
) {
  if (!existsSync('./logs')) {
    mkdirSync('./logs');
  }
  const messageSize: number = new TextEncoder().encode(message).length / 1000;
  let fileName = `${MyLogger.currentDate.getFullYear()}-${MyLogger.currentDate.getMonth()}-${MyLogger.currentDate.getDate()}-${
    MyLogger.counter
  }`;
  if (stack) {
    fileName = `${fileName} ${stack}`;
  }
  const data = `[${MyLogger.currentDate.getHours()}:${MyLogger.currentDate.getMinutes()}:${MyLogger.currentDate.getSeconds()}] [${context}] ${message}\n`;
  if (existsSync(`./logs/${fileName}.log`)) {
    const fileSize = statSync(`./logs/${fileName}.log`).size / 1000;
    if (fileSize + messageSize >= +process.env.MAX_LOG_FILE_SIZE) {
      MyLogger.counter++;
      fileName = `${MyLogger.currentDate.getFullYear()}-${MyLogger.currentDate.getMonth()}-${MyLogger.currentDate.getDate()}-${
        MyLogger.counter
      }`;
      if (stack) {
        fileName = `${fileName} ${stack}`;
      }
      writeFileSync(`./logs/${fileName}.log`, data);
    } else {
      appendFileSync(`./logs/${fileName}.log`, data);
    }
  } else {
    writeFileSync(`./logs/${fileName}.log`, data);
  }
}
