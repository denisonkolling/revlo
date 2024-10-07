import { Expose } from 'class-transformer';

export class ReviewDto {
  @Expose()
  authorName: string;

  @Expose()
  authorUrl: string;

  @Expose()
  profilePhotoUrl: string;

  @Expose()
  rating: number;

  @Expose()
  relativeTimeDescription: string;

  @Expose()
  text: string;

  @Expose()
  time: number;

  @Expose()
  placeId: string;
}