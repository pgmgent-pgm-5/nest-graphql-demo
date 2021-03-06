import { Module } from '@nestjs/common';
import { GraphQLModule } from '@nestjs/graphql';
import { TypeOrmModule } from '@nestjs/typeorm';
import { join } from 'path';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { PetsModule } from './pets/pets.module';
import { OwnersModule } from './owners/owners.module';
import { DateScalar } from './scalars/date.scalar';

@Module({
  imports: [
    PetsModule,
    GraphQLModule.forRoot({
      autoSchemaFile: join(process.cwd(), 'src/schema.gql'),
      playground: true,
      introspection: true,
      buildSchemaOptions: {
        dateScalarMode: 'timestamp',
      },
    }),
    // TypeOrmModule.forRoot({
    //   type: 'sqlite', // type of database
    //   database: ':memory', // runs the database in memory
    //   entities: ['dist/**/*.entity{.ts,.js}'], // looks for al the files with entity in the name
    //   synchronize: true, // synchronize database schema, in production use migrations
    // }),
    TypeOrmModule.forRoot({
      type: 'postgres', // type of database
      host: 'localhost',
      port: 5432,
      username: '',
      password: '',
      database: 'graphqldemo',
      entities: ['dist/**/*.entity{.ts,.js}'], // looks for al the files with entity in the name
      synchronize: true, // synchronize database schema, in production use migrations
    }),
    OwnersModule,
  ],
  controllers: [AppController],
  providers: [AppService, DateScalar],
})
export class AppModule {}
