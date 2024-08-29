import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { ContractService } from './contract.service';
import { CreateContractDto } from './dto/create-contract.dto';
import { UpdateContractDto } from './dto/update-contract.dto';
import { ApiOperation, ApiTags } from '@nestjs/swagger';

@Controller('contracts')
@ApiTags('Contract')
export class ContractController {
  constructor(private readonly contractService: ContractService) {}

  @Post()
  @ApiOperation({summary: 'create contract'})
  create(@Body() createContractDto: CreateContractDto) {
    return this.contractService.create(createContractDto);
  }

  @Get()
  @ApiOperation({summary: 'get all contracts'})
  findAll() {
    return this.contractService.findAll();
  }

  @Get(':id')
  @ApiOperation({summary: 'get contract by id'})
  findOne(@Param('id') id: string) {
    return this.contractService.findOne(id);
  }

  @Patch(':id')
  @ApiOperation({summary: 'update contract by id'})
  update(@Param('id') id: string, @Body() updateContractDto: UpdateContractDto) {
    return this.contractService.update(id, updateContractDto);
  }

  @Delete(':id')
  @ApiOperation({summary: 'delete contract by id'})
  remove(@Param('id') id: string) {
    return this.contractService.remove(id);
  }
}
