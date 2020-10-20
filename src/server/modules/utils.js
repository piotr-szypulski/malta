import { networkInterfaces } from "os";
import chalk from "chalk";

/**
 * Returns current server IP address.
 */
export const getIp = () => Array.prototype.concat.apply([], Object.values(networkInterfaces()))
  .filter(address => address.family === "IPv4" && !address.internal)[0].address;

/**
 * Console log wrapper with colors.
 */
export const log = {
  /* eslint-disable no-console */
  success: message => {
    console.log(chalk.green(message));
  },
  error: message => {
    console.log(chalk.red(message));
  }
};
