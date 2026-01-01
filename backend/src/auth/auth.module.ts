// import { Module } from '@nestjs/common';
// import { JwtModule } from '@nestjs/jwt';
// import { PassportModule } from '@nestjs/passport';
// import { UsersModule } from '../users/user.module';
// import { AuthService } from './auth.service';
// import { AuthController } from './auth.controller';
// import { JwtStrategy } from './jwt.strategy';

// @Module({
//   imports: [
//     UsersModule,
//     PassportModule,
//     JwtModule.register({
//       secret: process.env.JWT_SECRET || 'super-secret',
//       signOptions: { expiresIn: '7d' },
//     }),
//   ],
//   providers: [AuthService, JwtStrategy],
//   controllers: [AuthController],
//   exports: [AuthService, JwtModule],
// })
// export class AuthModule {}








import { Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import { UsersModule } from '../users/user.module';

@Module({
  imports: [
    UsersModule,
    JwtModule.register({
      secret: process.env.JWT_SECRET || 'dev_secret_key',
      signOptions: { expiresIn: '7d' },
    }),
  ],
  providers: [AuthService],
  controllers: [AuthController],
  exports: [JwtModule], // 👈 REQUIRED for ChatGateway
})
export class AuthModule {}
