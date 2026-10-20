import { Role } from '@prisma/client';
import bcrypt from 'bcryptjs';
import { prisma } from '../src/db';

async function main() {
  const username = 'admin';
  const password = 'adminpassword123';

  // Check if admin already exists
  const existingAdmin = await prisma.user.findUnique({
    where: { username }
  });

  if (existingAdmin) {
    console.log('Admin account already exists.');
    return;
  }

  const salt = await bcrypt.genSalt(10);
  const passwordHash = await bcrypt.hash(password, salt);

  await prisma.user.create({
    data: {
      username,
      passwordHash,
      role: Role.ADMIN,
    }
  });

  console.log('Admin account created successfully!');
  console.log(`Username: ${username}`);
  console.log(`Password: ${password}`);
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
