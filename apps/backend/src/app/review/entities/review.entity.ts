import { Entity, Property, PrimaryKey } from '@mikro-orm/core';

@Entity({ tableName: 'tab_reviews' })
export class Review {
    @PrimaryKey()
    id!: number;

    @Property({ columnType: 'varchar', nullable: true })
    authorName?: string;

    @Property({ columnType: 'varchar', nullable: true })
    authorUrl?: string;

    @Property({ columnType: 'varchar', nullable: true })
    profilePhotoUrl?: string;

    @Property()
    rating!: number;

    @Property({ columnType: 'varchar', nullable: true })
    relativeTimeDescription?: string;

    @Property({ columnType: 'text', nullable: true })
    text?: string;

    @Property()
    time!: number;

    @Property({ columnType: 'varchar', nullable: true })
    placeId?: string;
}