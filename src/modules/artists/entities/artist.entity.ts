import { Exclude } from 'class-transformer';
import { AlbumEntity } from 'src/modules/albums/entities/album.entity';
import { TrackEntity } from 'src/modules/tracks/entities/track.entity';
import { Entity, Column, PrimaryGeneratedColumn, OneToMany } from 'typeorm';

@Entity('artist')
export class ArtistEntity {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  name: string;

  @Column()
  grammy: boolean;

  @OneToMany(() => AlbumEntity, (album) => album.artist, { cascade: true })
  @Exclude()
  albums: AlbumEntity[];

  @OneToMany(() => TrackEntity, (track) => track.artist, { cascade: true })
  @Exclude()
  tracks: TrackEntity[];
}
