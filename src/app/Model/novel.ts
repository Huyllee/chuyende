export class Categories {
  category_id!: number;
  category_name!: string;
  created_at!: string;
  updated_at!: string
}

export class Novel {
  novel_id!: number;
  title!: string;
  author!: string;
  artist!: string;
  description!: string;
  cover_image!: string;
  category_name!: novelByGenre[];
  created_at!: string;
  updated_at!: string
}

export class novelByGenre {
  novel_id!: number;
  category_id!: number;
  category_name!: string;
  title!: string;
  author!: string;
  artist!: string;
  cover_image!: string;
}
