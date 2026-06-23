export abstract class ValueObject<TValue> {
  protected constructor(protected readonly value: TValue) {}

  public getValue(): TValue {
    return this.value;
  }
}
