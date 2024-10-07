import { Entity, PrimaryKey, Property } from '@mikro-orm/core';

@Entity({ tableName: 'tab_users' })
export class User {
    @PrimaryKey()
    id!: number;

    @Property({ unique: true })
    email!: string;

    @Property()
    password!: string;

    @Property()
    createdAt: Date = new Date();

    @Property({ onUpdate: () => new Date() })
    updatedAt: Date = new Date();

    @Property({ nullable: true })
    deletedAt?: Date;

    @Property()
    accountStatus: string;

}