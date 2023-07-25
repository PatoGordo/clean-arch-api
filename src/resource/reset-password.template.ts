export const resetPasswordTemplate = (path: string) => {
  return `
      <h2>Click in the link down below to reset your password!</h2>
      <p>This link will expires in one hour (1h).</p>
      <br />
      <a href="${path}">Reset Password</a>
    `;
};
