export interface Product {
  title: string;
  variant: string;
  sku: string;
  stock: number;
	price?: string;
} 

export enum LabelOptions {
	WAREHOUSE = "warehouse",
	SELL = "sell",
}

type LabelOptionsCss = {
	skuLabel: {
		height: number;
		fontSize: number;
	};
};

export const LabelOptionsCss: Record<LabelOptions, LabelOptionsCss> = {
	[LabelOptions.WAREHOUSE]: {
		skuLabel: {
				height: 80,
				fontSize: 30,
			}
		},
		[LabelOptions.SELL]: {
		skuLabel: {
				height: 30,
				fontSize: 20,
			}
	},
};