import { Controller, Get, Query } from '@nestjs/common';
import { ReviewService } from './review.service';

@Controller('reviews')
export class ReviewController {
  constructor(private readonly reviewService: ReviewService) { }

  @Get()
  async getReviews(@Query('placeId') placeId: string) {
    return await this.reviewService.getReviews(placeId);
  }

  @Get('save')
  async getAndSaveReviews(@Query('placeId') placeId: string) {
    return await this.reviewService.getAndSaveReviews(placeId);
  }
}
