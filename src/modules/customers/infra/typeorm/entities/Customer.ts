import { Expose } from "class-transformer";
import { Column, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn } from "typeorm";
import { differenceInYears, parse } from "date-fns";
import City from "./City";

@Entity('customers')
class Customer {
	@PrimaryGeneratedColumn('uuid')
	id: string;

	@Column({ name: 'full_name' })
	fullName: string;

	@Column()
	gender: string;

	@Column({ name: 'birth_date',  type: 'date' })
	birthDate: Date;

	@Column({ name: 'city_id' })
	cityId: string;

	@ManyToOne(() => City)
	@JoinColumn({ name: 'city_id' })
	city: City;

	@Expose({ name: 'age' })
	getAge(): number {
		const parsedBirthDate = parse(String(this.birthDate), 'yyyy-MM-dd', new Date());

		return differenceInYears(new Date(), parsedBirthDate);
	}
}

export default Customer;
