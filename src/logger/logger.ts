class Logger {
  log(log: string) {
    console.log(log);
  }

  logInfo(tag: string, log: string) {
    console.log(`Info :: ${tag} :: ${log}`);
  }

  logObj(tag: string, obj: any) {
    console.log(`Info :: ${tag} ::`, obj);
  }

  logDebug(tag: string, log: string) {
    console.log(`Debug :: ${tag} :: ${log}`);
  }

  logError(tag: string, log: string) {
    console.error(`Error :: ${tag} :: ${log}`);
  }

  logWarn(tag: string, log: string) {
    console.error(`Warn :: ${tag} :: ${log}`);
  }

  warn(log: string) {
    console.warn(log);
  }

  error(log: string) {
    console.error(log);
  }
}

export default new Logger();
