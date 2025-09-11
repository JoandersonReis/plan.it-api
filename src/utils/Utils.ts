import * as path from 'path';

export class Utils {
  static convertCentsToReal(value: string) {
    const formater = new Intl.NumberFormat('pt-BR', {
      style: 'currency',
      currency: 'BRL',
      currencySign: 'standard',
    });

    const valueConverted =
      Number(value) >= 100 ? Number(value) / 100 : Number(value);

    const formated = formater.format(valueConverted);

    return formated;
  }

  static getTemplatePath(fileName: string) {
    return path.resolve(process.cwd(), 'src', 'utils', 'html', fileName);
  }

  static convertDate(dateValue: Date) {
    const date = new Date(dateValue);
    const month = date.getMonth() + 1;
    const day =
      date.getDate() < 10 ? `0${date.getDate()}` : `${date.getDate()}`;
    const monthFormated = month < 10 ? `0${month}` : `${month}`;
    const year = date.getFullYear();

    return `${day}/${monthFormated}/${year}`;
  }
}
