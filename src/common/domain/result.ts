export default class Result<T> {
  public isSuccess: boolean;

  public isFailure: boolean;

  public error: T | string;

  private readonly value: T;

  private constructor(isSuccess: boolean, error?: T | string, value?: T) {
    if (isSuccess && error) {
      throw new Error('InvalidOperation: A result cannot be successful and contain an error');
    }
    if (!isSuccess && !error) {
      throw new Error('InvalidOperation: A failing result needs to contain an error message');
    }

    this.isSuccess = isSuccess;
    this.isFailure = !isSuccess;
    this.error = error;
    this.value = value;

    Object.freeze(this);
  }

  public getValue(): T {
    if (!this.isSuccess) {
      throw new Error("Can't get the value of an error result. Use 'errorValue' instead.");
    }

    return this.value;
  }

  public errorValue(): T {
    return this.error as T;
  }

  public static ok<U>(value?: U): Result<U> {
    return new Result<U>(true, null, value);
  }

  public static fail<U>(errorMessage: string): Result<U> {
    return new Result<U>(false, errorMessage);
  }

  public static combine(results: Result<any>[]): Result<any> {
    const failedResult = results.find((result) => result.isFailure);
    if (failedResult) return failedResult;
    return Result.ok();
  }
}
