export class CreateUserDto {

    readonly username: string;
    readonly password: string;
    readonly fechaInicio?: Date | null | string;
}
