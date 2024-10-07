import { Injectable, HttpException, HttpStatus } from '@nestjs/common';
import { HttpService } from '@nestjs/axios';
import { lastValueFrom } from 'rxjs';
import { AxiosError } from 'axios';
import { EntityManager } from '@mikro-orm/postgresql';
import { Review } from './entities/review.entity';

@Injectable()
export class ReviewService {
    private readonly apiKey: string;
    private readonly baseUrl: string;

    constructor(
        private readonly httpService: HttpService,
        private readonly em: EntityManager,
    ) {
        this.apiKey = process.env.GOOGLE_PLACES_API_KEY;
        this.baseUrl = process.env.GOOGLE_PLACES_BASE_URL;

        if (!this.apiKey) {
            throw new Error('GOOGLE_PLACES_API_KEY is not defined');
        }
        if (!this.baseUrl) {
            throw new Error('GOOGLE_PLACES_BASE_URL is not defined');
        }
    }

    async getReviews(placeId: string): Promise<any[]> {
        const params = new URLSearchParams({
            place_id: placeId,
            key: this.apiKey,
            fields: 'reviews',
        });

        try {
            const { data } = await lastValueFrom(
                this.httpService.get(`${this.baseUrl}?${params.toString()}`)
            );

            return data.result.reviews || [];
        } catch (error) {
            if (error instanceof AxiosError) {
                if (error.response) {
                    throw new HttpException(
                        `Error retrieving reviews: ${error.response.data.error_message || error.message}`,
                        error.response.status
                    );
                } else if (error.request) {
                    throw new HttpException(
                        'Error connecting to Google Place API: No response received from server',
                        HttpStatus.SERVICE_UNAVAILABLE
                    );
                }
            }
            throw new HttpException(
                `Error setting up the request: ${error.message}`,
                HttpStatus.INTERNAL_SERVER_ERROR
            );
        }
    }


    async saveReviews(reviews: Review[]): Promise<Review[]> {
        const newReviews = reviews.map(review => this.em.create(Review, review));
        await this.em.persistAndFlush(newReviews);
        return newReviews;
    }

    async getAndSaveReviews(placeId: string): Promise<Review[]> {
        const reviewsData = await this.getReviews(placeId);
        const reviewsWithPlaceId = reviewsData.map(review => ({
            ...review,
            place_id: placeId,
        }));
        return this.saveReviews(reviewsWithPlaceId);
    }

}