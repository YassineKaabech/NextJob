import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity()
export class PhoneNumberVerification {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  phoneNumber: string;

  @Column()
  verificationKey: string;
}
