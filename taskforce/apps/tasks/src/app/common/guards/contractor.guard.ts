import { AuthGuard } from '@nestjs/passport';
import { Injectable } from '@nestjs/common';

@Injectable()
export class ContractorGuard extends AuthGuard('contractor') {}
