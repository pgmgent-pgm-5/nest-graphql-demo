import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Owner } from 'src/owners/entities/owner.entity';
import { OwnersService } from 'src/owners/owners.service';
import { Repository } from 'typeorm';
import { CreatePetInput } from './dto/create-pet.input';
import { Pet } from './pet.entity';

@Injectable()
export class PetsService {
  constructor(
    @InjectRepository(Pet) private petRepository: Repository<Pet>,
    private ownerService: OwnersService,
  ) {}

  async createPet(createPetInput: CreatePetInput): Promise<Pet> {
    const newPet = this.petRepository.create(createPetInput); // newPet = new Pet(); newPet.name = "test"
    return this.petRepository.save(newPet); // insert
  }

  async findAll(): Promise<Pet[]> {
    // const pet = new Pet();
    // pet.id = 1;
    // pet.name = 'Mambo';
    // return [pet];
    return this.petRepository.find();
  }

  async findOne(id: number): Promise<Pet> {
    return this.petRepository.findOneOrFail(id);
  }

  getOwner(ownerId: number): Promise<Owner> {
    return this.ownerService.findOne(ownerId);
  }
}
