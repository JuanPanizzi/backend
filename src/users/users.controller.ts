import { Controller, Get, Post, Body, Patch, Param, Delete, Put, UseGuards, Request } from '@nestjs/common';
import { UsersService } from './users.service';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { JwtAuthGuard } from 'src/auth/strategies/jwt.auth.guard';
// import { UserInt } from './interfaces/userInt';

@Controller('usuarios')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Post()
  create(@Body() createUserDto: CreateUserDto) {
    return this.usersService.create(createUserDto);
  }

  @UseGuards(JwtAuthGuard)
  @Patch('/updates')
  updateDate(@Param('id') id: string, @Body() updateUserDto: UpdateUserDto,  @Request() req) {
   
    //Acá puedo recibir el id del usuario que hace la peticion desde la jwtStrategy (que recibe el token que manda)
    console.log('abajo req.user en jwt')
    console.log(req.user)
    // console.log('abajo req en jwt')
    // console.log(req)
    // aca se actualiza la fecha de inicio
    console.log('abajo updateUserDto')
    console.log(updateUserDto) //fecha --> { '2024-02-10T21:22:51.515Z': '' }

    // return 'Esta es la respuesta capo. Se hizo el patch correctamente'
    return this.usersService.updateDate(req.user._id, updateUserDto);
  }

  @Post('/registro')

  async createUser(@Body() userData: CreateUserDto): Promise<any> {

    const {username, password} = userData
    
    console.log('abajo es userData')
    console.log(userData)

    try {
      
      const createdUser = await this.usersService.create(userData);

      if(!createdUser){
        throw new Error('Error al crear un usuario nuevo')
      }
      const response = {respuesta: `Felicidades ${username}, te has registrado correctamente`} 
      
      return JSON.stringify(response);

     }catch (error) {
      console.error(error)
      return {respuesta: 'Error al crear usuario'}
     }



  }
  


  @Get()
  findAll() {
    return this.usersService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.usersService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateUserDto: UpdateUserDto) {
    return this.usersService.update(+id, updateUserDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.usersService.remove(+id);
  }
}
