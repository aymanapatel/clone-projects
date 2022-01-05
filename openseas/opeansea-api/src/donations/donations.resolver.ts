import { Resolver, Query, Mutation, Args } from '@nestjs/graphql';
import { DonationsService } from './donations.service';
import { CreateDonationInput } from './dto/create-donation.input';

@Resolver('Donation')
export class DonationsResolver {
  constructor(private readonly donationsService: DonationsService) {}

  @Mutation('createDonation')
  create(
    @Args('createDonationInput') createDonationInput: CreateDonationInput,
  ) {
    return this.donationsService.create(createDonationInput);
  }

  @Query('donations')
  findAll() {
    return this.donationsService.findAll();
  }

  @Query('donation')
  findOne(@Args('id') id: number) {
    return this.donationsService.findOne(id);
  }
}
