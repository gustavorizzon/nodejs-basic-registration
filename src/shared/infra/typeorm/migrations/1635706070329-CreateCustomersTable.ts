import { MigrationInterface, QueryRunner, Table } from "typeorm";

export class CreateCustomersTable1635706070329 implements MigrationInterface {
	public async up(queryRunner: QueryRunner): Promise<void> {
		await queryRunner.createTable(
			new Table({
				name: 'customers',
				columns: [
					{
						name: 'id',
						type: 'uuid',
						isPrimary: true,
						generationStrategy: 'uuid',
						default: 'uuid_generate_v4()',
					},
					{
						name: 'full_name',
						type: 'varchar',
					},
					{
						name: 'gender',
						type: 'varchar(1)',
					},
					{
						name: 'birth_date',
						type: 'date',
					},
					{
						name: 'city_id',
						type: 'uuid',
					},
				],
				foreignKeys: [
					{
						columnNames: ['city_id'],
						referencedColumnNames: ['id'],
						referencedTableName: 'cities',
						name: 'customer_city_id',
						onDelete: 'SET NULL',
						onUpdate: 'CASCADE'
					}
				]
			})
		);
	}

	public async down(queryRunner: QueryRunner): Promise<void> {
		await queryRunner.dropForeignKey('customers', 'customer_city_id');
		await queryRunner.dropTable('customers');
	}
}
