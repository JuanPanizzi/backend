import { Controller, Post, Request, UseGuards } from '@nestjs/common';
import { AuthService } from './auth.service';
import { LocalAuthGuard } from './strategies/local.auth.guard';
import { DataUser } from 'src/users/interfaces/dataUser';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @UseGuards(LocalAuthGuard)
  @Post('login')
  async login (@Request() req){

    //Aca llega el user que se retorna en la funcion validateUser del auth.service y que se guarda en req

    //Luego se le pasa a la función login para que arme y retorne el token

    console.log('abajo req.user en local guard')
    console.log(req.user)

    const token = await this.authService.login(req.user) //retorna el token
    
    const dataUser: DataUser = {
      token: token, 
      userProps: {
        username: req.user.username,
        fechaInicio: req.user.fechaInicio
      }
    }

    return dataUser;
    

}

}