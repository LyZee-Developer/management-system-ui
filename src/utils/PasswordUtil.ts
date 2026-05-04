export const PasswordUtil = () => {
  const isWeakPassword = (password: string) => {
    if (!password) return true;

    const minLength = 5;
    const hasUpper = /[A-Z]/.test(password);
    const hasLower = /[a-z]/.test(password);
    const hasNumber = /[0-9]/.test(password);
    const hasSpecial = /[^A-Za-z0-9]/.test(password);

    return (
      password.length < minLength ||
      !hasUpper ||
      !hasLower ||
      !hasNumber ||
      !hasSpecial
    );
  };

  return {
    isWeakPassword,
  };
};
