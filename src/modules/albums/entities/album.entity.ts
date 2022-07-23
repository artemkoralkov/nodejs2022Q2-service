import { Exclude } from 'class-transformer';
import { ArtistEntity } from 'src/modules/artists/entities/artist.entity';
import { TrackEntity } from 'src/modules/tracks/entities/track.entity';
import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  ManyToOne,
  OneToMany,
} from 'typeorm';

@Entity('album')
export class AlbumEntity {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  name: string;

  @Column()
  year: number;

  @Column({ nullable: true })
  artistId: string | null;

  @ManyToOne(() => ArtistEntity, (artist) => artist.albums, {
    nullable: true,
    onDelete: 'SET NULL',
  })
  @Exclude()
  artist: ArtistEntity;

  @OneToMany(() => TrackEntity, (track) => track.album, { cascade: true })
  @Exclude()
  tracks: TrackEntity[];
}
