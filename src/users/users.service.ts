import { Injectable } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { InjectModel } from '@nestjs/mongoose';
import { User } from './schemas/user.schema';
import { Model } from 'mongoose';

@Injectable()
export class UsersService {

constructor(@InjectModel(User.name) private userModel: Model<User>){}


  async create(createUserDto: CreateUserDto) {

    const createdUser = await new this.userModel(createUserDto)
    return createdUser.save()

  }

  async findAll(): Promise<User[]> {

    return this.userModel.find().lean()
  }

  //Esta funcion actualiza la fecha de inicio del contador
  async updateDate(id: string | number, updateUserDto: UpdateUserDto){
    
    return this.userModel.updateOne({_id:id}, updateUserDto)
  }

  findOne(id: number) {
    return `This action returns a #${id} user`;
  }

  async findOneUser(username:string, password: string): Promise<User | User[]> {
    console.log('findOneUser se ejecutó')
    return this.userModel.findOne({username: username, password: password})
    
  }
  
  async update(id: number, updateUserDto: UpdateUserDto) {
    return `This action updates a #${id} user`;
  }

  async remove(id: number) {
    return `This action removes a #${id} user`;
  }

  


}
