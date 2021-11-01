import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity('cities')
class City {
	@PrimaryGeneratedColumn('uuid')
	id: string;

	@Column()
	name: string;

	@Column()
	state: string;
}

export default City;
