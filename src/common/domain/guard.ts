export interface GuardResult {
  succeeded: boolean;
  message?: string;
}

export interface GuardArgument {
  argument: any;
  argumentName: string;
}

export class Guard {
  public static combine(guardResults: GuardResult[]): GuardResult {
    const failedResult = guardResults.find((result) => result.succeeded === false);
    if (failedResult) return failedResult;

    return { succeeded: true };
  }

  public static greaterThan(minValue: number, actualValue: number): GuardResult {
    return actualValue > minValue
      ? { succeeded: true }
      : {
          succeeded: false,
          message: `Number given {${actualValue}} is not greater than {${minValue}}`,
        };
  }

  public static againstAtLeast(numberOfCharacters: number, text: string): GuardResult {
    return text.length >= numberOfCharacters
      ? { succeeded: true }
      : {
          succeeded: false,
          message: `Text is not at least ${numberOfCharacters} characters.`,
        };
  }

  public static againstAtMost(numberOfCharacters: number, text: string): GuardResult {
    return text.length <= numberOfCharacters
      ? { succeeded: true }
      : {
          succeeded: false,
          message: `Text is greater than ${numberOfCharacters} characters.`,
        };
  }

  public static againstNullOrUndefined(argument: any, argumentName: string): GuardResult {
    if (argument === null || argument === undefined) {
      return { succeeded: false, message: `${argumentName} is null or undefined` };
    }
    return { succeeded: true };
  }

  public static againstNullOrUndefinedBulk(guardArguments: GuardArgument[]): GuardResult {
    let failedResult: GuardResult;
    guardArguments.forEach((guardArgument) => {
      const result = this.againstNullOrUndefined(
        guardArgument.argument,
        guardArgument.argumentName,
      );
      if (!result.succeeded) failedResult = result;
    });

    if (failedResult) return failedResult;
    return { succeeded: true };
  }

  public static inRange(
    number: number,
    minimum: number,
    maximum: number,
    argumentName: string,
  ): GuardResult {
    const isInRange = number >= minimum && number <= maximum;
    if (!isInRange) {
      return {
        succeeded: false,
        message: `${argumentName} is not within range ${minimum} to ${maximum}.`,
      };
    }
    return { succeeded: true };
  }

  public static allInRange(
    numbers: number[],
    minimum: number,
    maximum: number,
    argumentName: string,
  ): GuardResult {
    let failingResult: GuardResult = null;
    numbers.forEach((number) => {
      const numberIsInRangeResult = this.inRange(number, minimum, maximum, argumentName);
      if (!numberIsInRangeResult.succeeded) failingResult = numberIsInRangeResult;
    });

    if (failingResult)
      return { succeeded: false, message: `${argumentName} is not within the range.` };

    return { succeeded: true };
  }
}
