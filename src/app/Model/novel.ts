export class Categories {
  category_id!: number;
  category_name!: string;
  description!: string;
  created_at!: string;
  updated_at!: string;
  ok!: boolean
}

export class Novel {
  novel_id!: number;
  favorite_id!: number;
  title!: string;
  author!: string;
  artist!: string;
  avg_rating!: number;
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
  novels!: string;
  volume_title!: string;
  cover_image!: string;
  created_at!: string;
  updated_at!: string;
  ok!: boolean
}

export class chaptersById {
  chapter_id!: number;
  volume_id!: number;
  novel_id!: number;
  volume_title!: string;
  novel_title!: string;
  title!: string;
  cover_image!: string;
  content!: string;
  volume!: number;
  audio!: string;
  created_at!: string;
  updated_at!: string;
  ok!: boolean
}

export class Audio {
  audio_id!: number;
  chapter_id!: number;
  title!: string;
  url!: string;
  created_at!: string;
  updated_at!: string;
  ok!: boolean
}

export class favorites {
  user_id!: number;
  novel_id!: number;
  created_at!: string;
  updated_at!: string;
  ok!: boolean
}

export class rating {
  rating_id!: number;
  user_id!: number;
  novel_id!: number;
  rating_value!: number;
  created_at!: string;
  updated_at!: string;
  ok!: boolean
}
