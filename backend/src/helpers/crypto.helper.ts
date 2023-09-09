import bcrypt from 'bcryptjs';

export function hashPassword(password: string): string {
  let hashedPassword: string;

  // Encryption of the string password
  bcrypt.genSalt(10, (_err, Salt) => {
    // The bcrypt is used for encrypting password.
    bcrypt.hash(password, Salt, (err, hash) => {
      if (err) {
        console.error(err);
        return 'Cannot encrypt';
      }

      hashedPassword = hash;

      // confirm password was encrypted correctly
      bcrypt.compare(
        password,
        hashedPassword,
        async (error, isMatch) => {
          if (!isMatch) {
            // If password doesn't match the following
            // message will be sent
            throw new Error(`${hashedPassword} is not encryption of ${password}`);
          }
        },
      );
    });
  });
}
