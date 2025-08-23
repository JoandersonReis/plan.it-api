export class Password {
  private readonly value: string;

  constructor(value: string) {
    this.value = this.verify(value);
  }

  private verify(value: string): string {
    const regex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*[^a-zA-Z0-9]).{8,59}$/;

    if (!regex.test(value)) {
      throw new Error(
        'Senha deve conter ao menos uma letra maiúscula, uma minúscula, um número e um caractere especial',
      );
    }

    return value;
  }

  public getValue(): string {
    return this.value;
  }
}
