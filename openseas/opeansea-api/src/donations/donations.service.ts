import { Injectable } from '@nestjs/common';
import { CreateDonationInput } from './dto/create-donation.input';

@Injectable()
export class DonationsService {
  create(createDonationInput: CreateDonationInput) {
    return 'This action adds a new donation';
  }

  findAll() {
    return `This action returns all donations`;
  }

  findOne(id: number) {
    return `This action returns a #${id} donation`;
  }
}
