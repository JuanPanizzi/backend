import { Injectable, NotFoundException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { UserInt } from 'src/users/interfaces/userInt';
import { User } from 'src/users/schemas/user.schema';
import { UsersService } from 'src/users/users.service';

@Injectable()
export class AuthService {


    constructor(
        private userService: UsersService,
        private jwtService: JwtService
        ) {}

    async validateUser(username: string, password: string){

        // const users: UserInt[] = await this.userService.findAll();
        // const user = users.find(user => user.username == username && user.password == password);
        const user = await this.userService.findOneUser(username, password);

        if(!user){
            console.log('user en !user. User not found')
            console.log(user)
            
            throw new NotFoundException('Usuario no encontrado');
        }else{
            console.log('user en user. User found')
            return user; //Este se guarda en el Req.user
        }

    }


    async login(user: UserInt){

        console.log('Abajo el user que llega en login')
        console.log(user)
        // const userDB = await this.userService.findOneUser(user.username, user.password);


        const payload = {
            _id: user._id,
            username: user.username,
            fechaInicio: user.fechaInicio
        }

        console.log('Abajo el payload.userId que llega en login')
        console.log(payload._id)
        return {access_token: this.jwtService.sign(payload)}
        
    }
}
