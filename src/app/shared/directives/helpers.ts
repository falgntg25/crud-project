/**
 * It returns true if the key pressed is a number, and false if it's not
 * @param {any} event - any - The event that is being fired.
 * @returns a boolean value.
 */

export function keyOnlyNumber(event:any) {
    return event.charCode > 47 && event.charCode <= 57 && event.charCode !== 69;
  }
  
