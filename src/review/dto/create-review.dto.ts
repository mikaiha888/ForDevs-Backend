import { Length, Max, Min } from "class-validator";
import { Unique } from "typeorm";

export class CreateReviewDto {
    @Min(1)
    @Max(5)
    rating: number;

    @Length(10, 1000)
    comment?: string;
}
