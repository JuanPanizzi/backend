import { Injectable } from "@nestjs/common";
import { PassportStrategy } from "@nestjs/passport";
import { ExtractJwt, Strategy } from "passport-jwt";
import { UserInt } from "src/users/interfaces/userInt";


@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy){

    constructor(){
        super({
            jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
            ignoreExpiration: false,
            secretOrKey: "palabrasecreta"
        })
    }
    async validate(payload: UserInt): Promise<UserInt | UserInt[]>{

        return {_id: payload._id, username: payload.username, fechaInicio: payload.fechaInicio}
    
    }
}