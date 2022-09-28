import logger from "../logger/logger";
class Helper {
  /**
   * track the occurrence of a perfect cycle in a list.
   *  The perfect cycle has two conditions needed to arise in a list, and they are as follows:
   *    1-All elements of the list must be visited.
   *    2-The last element to be visited takes you back to position zero.
   * @param arr : array of mumbers
   * @param visited : array of boolean
   * @param index   : current index
   * @param counter  : counter for count of calls
   * @param length  : array length
   * @returns true/false
   */
  perfectCycle(
    arr: number[],
    visited: boolean[],
    index: number,
    counter: number,
    length: number
  ): boolean {
    // check if emapty
    if (length == 0) return true;

    // validate index out of range
    if (index >= length) return false;

    // check if current index visisted before
    if (visited[index]) {
      // if all visted elements == array length => perfectCycle
      if (counter == length) {
        return true;
      } else {
        //=> Not perfectCycle
        return false;
      }
    } else {
      //tag current index as visited
      visited[index] = true;
      // call for next index
      return this.perfectCycle(arr, visited, arr[index], counter + 1, length);
    }
  }

  /**
   *
   * @param fcm mock function to notify the user when resolving his request
   * @param payload notifictation body && type
   */
  notify(userId: string, payload: any): void {
    logger.logObj("payload", payload);
  }
}

export default new Helper();
