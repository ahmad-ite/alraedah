class Helper {
  perfectCycle(
    arr: number[],
    visited: boolean[],
    index: number,
    counter: number,
    length: number
  ): boolean {
    if (length == 0) return true;
    if (index >= length) return false;
    if (visited[index]) {
      if (counter == length) {
        return true;
      } else {
        return false;
      }
    } else {
      visited[index] = true;
      return this.perfectCycle(arr, visited, arr[index], counter + 1, length);
    }
  }


  /**
   * 
   * @param fcm mock function to notify the user when resolving his request
   * @param payload notifictation body && type
   */
  notify(userId: string, payload: any): void {

    console.log('payload',payload)
  }
}

export default new Helper();
