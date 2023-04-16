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
  category_name!: string[];
  categories!: string[];
  categories_id!: number[];
  created_at!: string;
  updated_at!: string;
  ok!: boolean;
}

export class newNovel {
  novel_id!: number;
  title!: string;
  author!: string;
  artist!: string;
  description!: string;
  cover_image!: string;
  categories_id!: number[];
  created_at!: string;
  updated_at!: string
}

export class novelById {
  novel_id!: number;
  title!: string;
  author!: string;
  artist!: string;
  description!: string;
  cover_image!: string;
  created_at!: string;
  updated_at!: string
}

export class tagById {
  category_id!: number;
  category_name!: string;
}

export class volumeById {
  volume_id!: number;
  volume_title!: string;
  cover_image!: string;
  chapter_id!: number;
  title!: string;
  updated_at!: string
}

export class volumes {
  volume_id!: number;
  novel_id!: number;
  volume_title!: string;
  cover_image!: string;
}

export class chaptersById {
  chapter_id!: number;
  volume_id!: number;
  title!: string;
  content!: string;
  created_at!: string;
  updated_at!: string
}

export class favorites {
  user_id!: number;
  novel_id!: number;
  created_at!: string;
  updated_at!: string
}

