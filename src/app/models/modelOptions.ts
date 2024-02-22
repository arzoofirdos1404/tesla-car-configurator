export class configsModel {
  id!: number;
  description!: string;
  range!: number;
  speed!: number;
  price!: number;
}

export class CarConfigOptions {
  configs!: configsModel[];
  towHitch!: boolean;
  yoke!: boolean;
}

export class colorsModel {
  code!: string;
  description!: string;
  price!: number;
}

export class CarModelOptions {
  code!: string;
  description!: string;
  colors!: colorsModel[];
}

export class selectedConfigModel {
  id: number = 0;
  description: string = '';
  range: number = 0;
  speed: number = 0;
  price: number = 0
}

export class selectedcolorModel {
  code: string = '';
  description: string = '';
  price: number = 0
}
