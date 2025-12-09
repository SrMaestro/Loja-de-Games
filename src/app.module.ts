import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Produto } from './produto/entities/produto.entity';


@Module({
   imports: [
    TypeOrmModule.forRoot({
      type:'mysql',
      host:'localhost',
      port: 3306,
      username: 'root',
      password: '',
      database: 'db_lojaDeGames',
      entities: [Produto],
      synchronize : true,
    }),
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
