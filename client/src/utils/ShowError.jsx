export const showError = (errors, name) => {
  if (Array.isArray(errors) && errors.length > 0) {
    const exist = errors.find(err => err.path === name);
    if (exist) {
      return exist.msg;
    }
  }
  return false;
};
