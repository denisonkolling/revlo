import { EntityManager } from '@mikro-orm/postgresql';
import { ConflictException, Injectable, InternalServerErrorException } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UserResponseDto } from './dto/user-response.dto';
import { User } from './entities/user.entity';
import * as bcrypt from 'bcrypt';

@Injectable()
export class UserService {

    constructor(private readonly em: EntityManager) { }

    async createUser(createUserDto: CreateUserDto): Promise<UserResponseDto> {
        const { email, password } = createUserDto;

        try {
            await this.ensureEmailIsUnique(email);
            const hashedPassword = await this.hashPassword(password);
            const newUser = await this.persistUser(createUserDto, hashedPassword);
            return new UserResponseDto(newUser);
        } catch (error) {
            this.handleCreationError(error);
        }
    }

    private async ensureEmailIsUnique(email: string): Promise<void> {
        const existingUser = await this.em.findOne(User, { email });

        if (existingUser) {
            throw new ConflictException(`A user with email ${email} already exists.`);
        }
    }

    private async persistUser(createUserDto: CreateUserDto, hashedPassword: string): Promise<User> {
        const user = this.em.create(User, {
            ...createUserDto,
            password: hashedPassword,
            accountStatus: 'pending'
        });

        await this.em.persistAndFlush(user);
        return user;
    }

    private hashPassword = async (password: string): Promise<string> => {
        const saltRounds = 10;
        return bcrypt.hash(password, saltRounds);
    };

    private handleCreationError(error: Error): never {

        if (error instanceof ConflictException) {
            throw error;
        }

        throw new InternalServerErrorException('An error occurred while creating the user.');
    }
}
