import {
  IsNumber,
  IsString,
  IsOptional,
  IsNotEmpty,
  IsUUID,
} from 'class-validator';

export class CreateAlbumDto {
  @IsNotEmpty()
  @IsString()
  name: string;

  @IsNumber()
  year: number;

  @IsOptional()
  @IsUUID('4')
  artistId: string | null;
}
