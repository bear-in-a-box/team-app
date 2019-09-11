import { isProduction } from "../env";

function topLevelErrorHandler(error: Error) {
  if (isProduction()) {
    console.error(error.message);
  } else {
    console.trace(error);
  }
}

function registerTopLevelErrorHandler(process: NodeJS.Process) {
  process.on('uncaughtException', topLevelErrorHandler);
  process.on('unhandledRejection', topLevelErrorHandler);
}

export { registerTopLevelErrorHandler as register };
